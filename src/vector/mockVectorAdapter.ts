/**
 * Mock Vector Adapter
 *
 * 完整实现 VectorAdapter 接口，使用内存数组 + fake embeddings。
 * 支持 cosine similarity 搜索 + keyword fallback。
 *
 * 切换方式：
 *   setVectorAdapter(pineconeAdapter)  或  setVectorAdapter(pgvectorAdapter)
 */

import type { VectorAdapter, KnowledgeDocument, VectorSearchResult } from './types'
import { getEmbeddingProvider, cosineSimilarity } from './embeddingProvider'

// ── In-memory stores ───────────────────────────────────

const documents: KnowledgeDocument[] = []

// ── Adapter ────────────────────────────────────────────

export const mockVectorAdapter: VectorAdapter = {
  name: 'mock-vector',

  async upsert(docs: KnowledgeDocument[]) {
    const embedder = getEmbeddingProvider()

    for (const doc of docs) {
      // Generate embedding if not provided
      if (!doc.embedding || doc.embedding.length === 0) {
        const result = await embedder.embed(doc.content)
        doc.embedding = result.embedding
      }

      // Upsert: replace if exists, otherwise add
      const existing = documents.findIndex((d) => d.id === doc.id)
      if (existing >= 0) {
        documents[existing] = doc
      } else {
        documents.push(doc)
      }
    }
  },

  async search(query: string, options = {}) {
    const { topK = 5, namespace, filter, minScore = 0 } = options
    const embedder = getEmbeddingProvider()

    // Generate query embedding
    const queryEmbed = await embedder.embed(query)

    // Score all documents
    const scored: VectorSearchResult[] = []

    for (const doc of documents) {
      // Namespace filter
      if (namespace && doc.namespace !== namespace) continue

      // Metadata filter
      if (filter) {
        let match = true
        for (const [key, val] of Object.entries(filter)) {
          if (val !== undefined && (doc.metadata as Record<string, unknown>)[key] !== val) {
            match = false; break
          }
        }
        if (!match) continue
      }

      // Vector similarity
      let vectorScore = 0
      if (doc.embedding.length > 0) {
        vectorScore = cosineSimilarity(queryEmbed.embedding, doc.embedding)
      }

      // Keyword boost: boost if query terms appear in content/tags
      const keywords = query.toLowerCase().split(/\s+/).filter(Boolean)
      let keywordBoost = 0
      for (const kw of keywords) {
        if (doc.content.toLowerCase().includes(kw)) keywordBoost += 0.05
        if (doc.tags.some((t) => t.toLowerCase().includes(kw))) keywordBoost += 0.08
      }

      // Final score: 70% vector + 20% keyword + 10% importance
      const score = vectorScore * 0.7 + keywordBoost * 0.2 + doc.importance * 0.1

      if (score >= minScore) {
        scored.push({ document: doc, score: Math.round(score * 100) / 100 })
      }
    }

    // Sort by score descending
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
  },

  async deleteNamespace(namespace: string) {
    for (let i = documents.length - 1; i >= 0; i--) {
      if (documents[i].namespace === namespace) {
        documents.splice(i, 1)
      }
    }
  },

  async stats() {
    const namespaces: Record<string, number> = {}
    for (const doc of documents) {
      namespaces[doc.namespace] = (namespaces[doc.namespace] || 0) + 1
    }
    return { namespaces, totalDocuments: documents.length }
  },
}

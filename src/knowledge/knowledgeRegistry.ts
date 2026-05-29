/**
 * Knowledge Registry —— 知识源注册中心
 *
 * 管理所有知识源，负责：
 *   1. 注册知识源（教材、题库、方法库、校本资料...）
 *   2. 将文档 upsert 到 vector adapter
 *   3. 支持动态添加新知识
 */

import type { KnowledgeDocument } from '../vector/types'
import { getVectorAdapter } from '../vector'
import { allKnowledgeDocuments } from './knowledgeDocuments'

// ── Registry ───────────────────────────────────────────

interface KnowledgeSource {
  name: string
  description: string
  namespace: string
  documents: KnowledgeDocument[]
}

const sources = new Map<string, KnowledgeSource>()

// ── Registration ───────────────────────────────────────

export function registerKnowledgeSource(source: KnowledgeSource) {
  sources.set(source.name, source)
}

export function getKnowledgeSource(name: string): KnowledgeSource | undefined {
  return sources.get(name)
}

export function getAllSources(): KnowledgeSource[] {
  return Array.from(sources.values())
}

// ── Initialization ─────────────────────────────────────

let initialized = false

/**
 * Initialize the knowledge base: upsert all registered documents to vector store.
 * Call once at app startup.
 */
export async function initKnowledgeBase() {
  if (initialized) return
  initialized = true

  const vectorAdapter = getVectorAdapter()

  // Register built-in sources
  registerKnowledgeSource({
    name: 'syllabus',
    description: '教材大纲与教学重点',
    namespace: 'syllabus',
    documents: allKnowledgeDocuments.filter((d) => d.namespace === 'syllabus'),
  })

  registerKnowledgeSource({
    name: 'strategy',
    description: '教学方法与策略库',
    namespace: 'strategy',
    documents: allKnowledgeDocuments.filter((d) => d.namespace === 'strategy'),
  })

  registerKnowledgeSource({
    name: 'common_error',
    description: '高频错误与分析',
    namespace: 'common_error',
    documents: allKnowledgeDocuments.filter((d) => d.namespace === 'common_error'),
  })

  registerKnowledgeSource({
    name: 'exam',
    description: '考试信息与评分标准',
    namespace: 'exam',
    documents: allKnowledgeDocuments.filter((d) => d.namespace === 'exam'),
  })

  // Upsert all documents to vector store
  console.log(`📚 Initializing knowledge base: ${allKnowledgeDocuments.length} documents across ${sources.size} sources`)

  await vectorAdapter.upsert(allKnowledgeDocuments)

  const stats = await vectorAdapter.stats()
  console.log(`📚 Knowledge base ready: ${stats.totalDocuments} documents in ${Object.keys(stats.namespaces).length} namespaces`)
  for (const [ns, count] of Object.entries(stats.namespaces)) {
    console.log(`   ${ns}: ${count} docs`)
  }
}

// ── Dynamic document addition ──────────────────────────

/**
 * Add a new document to the knowledge base at runtime.
 * E.g., when a teacher creates a custom note.
 */
export async function addKnowledgeDocument(doc: KnowledgeDocument) {
  const vectorAdapter = getVectorAdapter()
  await vectorAdapter.upsert([doc])
}

export async function addKnowledgeDocuments(docs: KnowledgeDocument[]) {
  const vectorAdapter = getVectorAdapter()
  await vectorAdapter.upsert(docs)
}

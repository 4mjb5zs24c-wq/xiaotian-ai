/**
 * Vector & Knowledge Retrieval Types
 *
 * VectorAdapter 是向量数据库的抽象接口。
 * Pinecone / pgvector / Milvus / Weaviate 都实现此接口。
 * 上层代码完全不知道底层是哪个向量库。
 */

// ── Knowledge Document ─────────────────────────────────

export interface KnowledgeDocument {
  /** Unique ID */
  id: string
  /** Document text content */
  content: string
  /** Rich metadata for filtering */
  metadata: KnowledgeMetadata
  /** Vector embedding (populated by embedder) */
  embedding: number[]
  /** Namespace for logical isolation (e.g. "textbook", "exam", "method") */
  namespace: string
  /** Tags for filtering */
  tags: string[]
  /** Creation timestamp */
  createdAt: number
  /** Importance score 0-1 */
  importance: number
}

export interface KnowledgeMetadata {
  /** Subject: 'english', 'math', etc. */
  subject: string
  /** Grade: '七年级上', '中考', etc. */
  grade: string
  /** Unit: 'Unit 3', etc. */
  unit?: string
  /** Source: 'teacher-book', 'exam-bank', 'method-library', etc. */
  source: string
  /** Content type */
  type: 'syllabus' | 'strategy' | 'common_error' | 'vocabulary' | 'grammar' | 'exam' | 'method'
  /** Additional key-value pairs */
  [key: string]: string | undefined
}

// ── Search Result ──────────────────────────────────────

export interface VectorSearchResult {
  document: KnowledgeDocument
  /** Similarity score 0-1 */
  score: number
}

// ── Embedding ──────────────────────────────────────────

export interface EmbeddingResult {
  embedding: number[]
  dimensions: number
  tokens: number
  provider: string
  mock: boolean
}

// ── Embedding Provider ─────────────────────────────────

export interface EmbeddingProvider {
  readonly name: string
  readonly dimensions: number
  readonly model: string

  /**
   * Generate an embedding vector for the given text.
   */
  embed(text: string): Promise<EmbeddingResult>

  /**
   * Batch embed multiple texts.
   */
  embedBatch(texts: string[]): Promise<EmbeddingResult[]>
}

// ── Vector Adapter ─────────────────────────────────────

export interface VectorAdapter {
  readonly name: string

  /**
   * Insert or update documents (with embeddings).
   */
  upsert(documents: KnowledgeDocument[]): Promise<void>

  /**
   * Search for documents similar to the query.
   * Returns topK results sorted by relevance.
   */
  search(
    query: string,
    options?: {
      topK?: number
      namespace?: string
      filter?: Partial<KnowledgeMetadata>
      minScore?: number
    },
  ): Promise<VectorSearchResult[]>

  /**
   * Delete all documents in a namespace.
   */
  deleteNamespace(namespace: string): Promise<void>

  /**
   * Get document count per namespace.
   */
  stats(): Promise<{ namespaces: Record<string, number>; totalDocuments: number }>
}

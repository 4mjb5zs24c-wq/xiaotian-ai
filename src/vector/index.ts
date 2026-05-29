// ── Adapter ──
import type { VectorAdapter } from './types'
import { mockVectorAdapter } from './mockVectorAdapter'

let currentAdapter: VectorAdapter = mockVectorAdapter

export function setVectorAdapter(adapter: VectorAdapter) {
  currentAdapter = adapter
}

export function getVectorAdapter(): VectorAdapter {
  return currentAdapter
}

// ── Embedding ──
export {
  setEmbeddingProvider,
  getEmbeddingProvider,
  mockEmbeddingProvider,
  cosineSimilarity,
} from './embeddingProvider'

// ── Adapters ──
export { mockVectorAdapter } from './mockVectorAdapter'

// ── Types ──
export type {
  VectorAdapter,
  KnowledgeDocument,
  KnowledgeMetadata,
  VectorSearchResult,
  EmbeddingProvider,
  EmbeddingResult,
} from './types'

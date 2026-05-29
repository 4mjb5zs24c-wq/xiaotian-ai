/**
 * Embedding Provider —— 向量嵌入抽象层
 *
 * 与 LLM Provider 解耦。embedding 和 chat 使用不同模型。
 *
 * 支持：
 *   - Mock embedding (默认，fake vectors)
 *   - OpenAI text-embedding-3-small
 *   - Voyage AI voyage-3
 *   - Jina embeddings
 */

import type { EmbeddingProvider, EmbeddingResult } from './types'

// ── Mock Embedding Provider ────────────────────────────

/**
 * Mock embedding: generates deterministic fake vectors from text hash.
 * Dimensions: 128 (small enough for demo, real embeddings are 1024-3072).
 */
export const mockEmbeddingProvider: EmbeddingProvider = {
  name: 'mock',
  dimensions: 128,
  model: 'mock-embedding-v1',

  async embed(text: string): Promise<EmbeddingResult> {
    await sleep(10)
    return {
      embedding: fakeEmbed(text, 128),
      dimensions: 128,
      tokens: Math.ceil(text.length / 4),
      provider: 'mock',
      mock: true,
    }
  },

  async embedBatch(texts: string[]): Promise<EmbeddingResult[]> {
    return Promise.all(texts.map((t) => this.embed(t)))
  },
}

// ── OpenAI Embedding Provider (future) ─────────────────

/*
export const openaiEmbeddingProvider: EmbeddingProvider = {
  name: 'openai',
  dimensions: 1536,
  model: 'text-embedding-3-small',

  async embed(text: string): Promise<EmbeddingResult> {
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({ model: 'text-embedding-3-small', input: text }),
    })
    const data = await res.json()
    return {
      embedding: data.data[0].embedding,
      dimensions: 1536,
      tokens: data.usage.total_tokens,
      provider: 'openai',
      mock: false,
    }
  },

  async embedBatch(texts: string[]): Promise<EmbeddingResult[]> {
    // OpenAI supports batch up to 2048 texts
    ...
  },
}
*/

// ── Singleton ──────────────────────────────────────────

let currentEmbeddingProvider: EmbeddingProvider = mockEmbeddingProvider

export function setEmbeddingProvider(provider: EmbeddingProvider) {
  currentEmbeddingProvider = provider
}

export function getEmbeddingProvider(): EmbeddingProvider {
  return currentEmbeddingProvider
}

// ── Fake embedding generator ───────────────────────────

/**
 * Generate a deterministic pseudo-embedding from text.
 * Uses character codes and positional weighting to create
 * a vector suitable for cosine similarity approximation.
 *
 * NOT cryptographically secure. For demo/testing only.
 */
function fakeEmbed(text: string, dims: number): number[] {
  const vec = new Array(dims).fill(0)
  const lower = text.toLowerCase()

  for (let i = 0; i < lower.length; i++) {
    const code = lower.charCodeAt(i)
    // Hash character into a position in the vector
    const pos = (code * 31 + i * 7) % dims
    vec[pos] += 1
    // Spread influence to neighbors
    vec[(pos + 1) % dims] += 0.5
    vec[(pos + 2) % dims] += 0.25
  }

  // L2 normalize
  const magnitude = Math.sqrt(vec.reduce((s, v) => s + v * v, 0))
  if (magnitude > 0) {
    for (let i = 0; i < dims; i++) vec[i] /= magnitude
  }

  return vec
}

/**
 * Compute cosine similarity between two vectors.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0
  let dot = 0, magA = 0, magB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    magA += a[i] * a[i]
    magB += b[i] * b[i]
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB)
  return denom > 0 ? dot / denom : 0
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

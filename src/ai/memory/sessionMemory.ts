/**
 * Session Memory (v2 — Storage-backed)
 *
 * 通过 storageAdapter 持久化会话消息。
 * 不再使用内存 Map，而是委托给存储层。
 */

import type { MemoryEntry } from '../context/types'
import { getStorageAdapter } from '../../storage'

let idCounter = 0
function nextId(): string {
  return `mem-${Date.now()}-${++idCounter}`
}

// ── API ────────────────────────────────────────────────

export async function appendMessage(params: {
  sessionId: string
  type: MemoryEntry['type']
  data: Record<string, unknown>
  summary: string
  importance?: number
}): Promise<MemoryEntry> {
  const storage = getStorageAdapter()

  const entry: MemoryEntry = {
    id: nextId(),
    type: params.type,
    timestamp: Date.now(),
    sessionId: params.sessionId,
    data: params.data,
    summary: params.summary,
    importance: params.importance ?? 0.5,
  }

  // Ensure session exists
  const existing = await storage.loadSession(params.sessionId)
  if (!existing) {
    await storage.saveSession({
      sessionId: params.sessionId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messageCount: 0,
      metadata: {},
    })
  }

  await storage.saveMessage({
    id: entry.id,
    sessionId: entry.sessionId,
    type: entry.type,
    timestamp: entry.timestamp,
    data: entry.data,
    summary: entry.summary,
    importance: entry.importance,
  })

  return entry
}

export async function getRecentMessages(
  sessionId: string,
  limit = 20,
): Promise<MemoryEntry[]> {
  const storage = getStorageAdapter()
  const msgs = await storage.getMessages(sessionId, limit)
  return msgs.map((m) => ({
    id: m.id,
    type: m.type,
    timestamp: m.timestamp,
    sessionId: m.sessionId,
    data: m.data,
    summary: m.summary,
    importance: m.importance,
  }))
}

export async function getContextWindow(
  sessionId: string,
  maxTokens = 4000,
): Promise<MemoryEntry[]> {
  const messages = await getRecentMessages(sessionId, 50)
  const result: MemoryEntry[] = []
  let tokenEstimate = 0

  for (let i = messages.length - 1; i >= 0; i--) {
    const tokens = estimateTokens(messages[i].summary)
    if (tokenEstimate + tokens > maxTokens) break
    result.unshift(messages[i])
    tokenEstimate += tokens
  }
  return result
}

export async function clearSession(sessionId: string) {
  const storage = getStorageAdapter()
  await storage.deleteSession(sessionId)
}

export async function getAllSessions(): Promise<string[]> {
  const storage = getStorageAdapter()
  const list = await storage.listSessions()
  return list.map((s) => s.sessionId)
}

export async function getSessionMessageCount(sessionId: string): Promise<number> {
  const msgs = await getRecentMessages(sessionId, 200)
  return msgs.length
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 2)
}

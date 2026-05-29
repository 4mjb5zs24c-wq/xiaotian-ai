/**
 * Memory Storage —— 基于 Map 的内存存储实现
 *
 * 完整实现 StorageAdapter 接口。
 * 默认 adapter。开发阶段无需外部依赖。
 * 生产环境替换为 SqliteStorage / PostgresStorage 等。
 */

import type {
  StorageAdapter,
  StoredSession,
  StoredMessage,
  StoredWorkflowRun,
  StoredToolResult,
  StoredMemoryEntry,
} from './types'

// ── In-Memory Stores ───────────────────────────────────

const sessions = new Map<string, StoredSession>()
const messages = new Map<string, StoredMessage[]>()
const workflowRuns = new Map<string, StoredWorkflowRun>()
const toolResults = new Map<string, StoredToolResult[]>()
const memoryEntries = new Map<string, StoredMemoryEntry>()

// ── Adapter Implementation ─────────────────────────────

export const memoryStorage: StorageAdapter = {
  name: 'memory',

  // ── Session ───────────────────────────────────────
  async saveSession(session: StoredSession) {
    sessions.set(session.sessionId, {
      ...session,
      updatedAt: Date.now(),
    })
  },

  async loadSession(sessionId: string) {
    return sessions.get(sessionId) || null
  },

  async listSessions() {
    return Array.from(sessions.values()).sort(
      (a, b) => b.updatedAt - a.updatedAt,
    )
  },

  async deleteSession(sessionId: string) {
    sessions.delete(sessionId)
    messages.delete(sessionId)
  },

  // ── Messages ──────────────────────────────────────
  async saveMessage(msg: StoredMessage) {
    const list = messages.get(msg.sessionId) || []
    list.push(msg)
    messages.set(msg.sessionId, list)

    // Keep max 200 messages per session
    if (list.length > 200) list.shift()

    // Update session
    const session = sessions.get(msg.sessionId)
    if (session) {
      session.messageCount = list.length
      session.updatedAt = Date.now()
    }
  },

  async getMessages(sessionId: string, limit = 50) {
    const list = messages.get(sessionId) || []
    return list.slice(-limit)
  },

  async clearMessages(sessionId: string) {
    messages.delete(sessionId)
  },

  // ── Workflow Runs ─────────────────────────────────
  async saveWorkflowRun(run: StoredWorkflowRun) {
    workflowRuns.set(run.id, run)
    // Keep max 100 runs
    if (workflowRuns.size > 100) {
      const first = workflowRuns.keys().next().value
      if (first) workflowRuns.delete(first)
    }
  },

  async getWorkflowHistory(sessionId?: string, limit = 20) {
    let runs = Array.from(workflowRuns.values())
    if (sessionId) runs = runs.filter((r) => r.sessionId === sessionId)
    return runs
      .sort((a, b) => b.startedAt - a.startedAt)
      .slice(0, limit)
  },

  async getWorkflowRun(id: string) {
    return workflowRuns.get(id) || null
  },

  // ── Tool Results ──────────────────────────────────
  async saveToolResult(result: StoredToolResult) {
    const list = toolResults.get(result.sessionId) || []
    list.push(result)
    toolResults.set(result.sessionId, list)
    if (list.length > 100) list.shift()
  },

  async getToolHistory(sessionId?: string, limit = 50) {
    let all: StoredToolResult[] = []
    if (sessionId) {
      all = toolResults.get(sessionId) || []
    } else {
      for (const list of toolResults.values()) all.push(...list)
    }
    return all
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit)
  },

  // ── Memory ────────────────────────────────────────
  async saveMemory(entry: StoredMemoryEntry) {
    memoryEntries.set(entry.id, entry)
    if (memoryEntries.size > 500) {
      const first = memoryEntries.keys().next().value
      if (first) memoryEntries.delete(first)
    }
  },

  async searchMemory(query: string, limit = 10) {
    const keywords = query.toLowerCase().split(/\s+/).filter(Boolean)
    if (keywords.length === 0) return []

    const scored: Array<{ entry: StoredMemoryEntry; score: number }> = []

    for (const entry of memoryEntries.values()) {
      let score = 0
      const text = `${entry.content} ${entry.keywords.join(' ')}`.toLowerCase()

      for (const kw of keywords) {
        if (text.includes(kw)) score += 1
        // Exact keyword match bonus
        if (entry.keywords.some((k) => k.toLowerCase() === kw)) score += 2
      }

      // Importance boosts score
      score *= (0.5 + entry.importance)

      if (score > 0) scored.push({ entry, score })
    }

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((s) => s.entry)
  },

  // ── Admin ─────────────────────────────────────────
  async clearAll() {
    sessions.clear()
    messages.clear()
    workflowRuns.clear()
    toolResults.clear()
    memoryEntries.clear()
  },
}

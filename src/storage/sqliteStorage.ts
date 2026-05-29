/**
 * SQLite Storage Adapter (Future)
 *
 * 与 memoryStorage 实现完全相同的 StorageAdapter 接口。
 * 不同之处：数据持久化到 SQLite 文件，而非内存 Map。
 *
 * 当前为 stub 实现（与 memoryStorage 行为一致）。
 * 未来替换为真实 SQLite 库（如 better-sqlite3 或 sql.js）。
 *
 * 切换方式：
 *   setStorageAdapter(sqliteStorage)
 *
 * SQL Schema (planned):
 *
 *   CREATE TABLE sessions (
 *     session_id TEXT PRIMARY KEY,
 *     created_at INTEGER, updated_at INTEGER,
 *     message_count INTEGER, metadata TEXT
 *   );
 *
 *   CREATE TABLE messages (
 *     id TEXT PRIMARY KEY, session_id TEXT, type TEXT,
 *     timestamp INTEGER, data TEXT, summary TEXT,
 *     importance REAL
 *   );
 *
 *   CREATE TABLE workflow_runs (
 *     id TEXT PRIMARY KEY, workflow_id TEXT, session_id TEXT,
 *     trigger TEXT, status TEXT, steps TEXT, result TEXT,
 *     tool_call_count INTEGER, started_at INTEGER, completed_at INTEGER
 *   );
 *
 *   CREATE TABLE tool_results (
 *     id TEXT PRIMARY KEY, tool_name TEXT, session_id TEXT,
 *     args TEXT, result TEXT, timestamp INTEGER, summary TEXT
 *   );
 *
 *   CREATE VIRTUAL TABLE memory_fts USING fts5(
 *     content, keywords, metadata
 *   );
 */

import type {
  StorageAdapter,
  StoredSession,
  StoredMessage,
  StoredWorkflowRun,
  StoredToolResult,
  StoredMemoryEntry,
} from './types'

// ── In-memory fallback (replace with SQLite when available) ──

const sessions = new Map<string, StoredSession>()
const messages = new Map<string, StoredMessage[]>()
const workflowRuns = new Map<string, StoredWorkflowRun>()
const toolResults = new Map<string, StoredToolResult[]>()
const memoryEntries = new Map<string, StoredMemoryEntry>()

export const sqliteStorage: StorageAdapter = {
  name: 'sqlite',

  async saveSession(session: StoredSession) {
    sessions.set(session.sessionId, { ...session, updatedAt: Date.now() })
    // Future: INSERT OR REPLACE INTO sessions VALUES (...)
  },

  async loadSession(sessionId: string) {
    return sessions.get(sessionId) || null
    // Future: SELECT * FROM sessions WHERE session_id = ?
  },

  async listSessions() {
    return Array.from(sessions.values()).sort((a, b) => b.updatedAt - a.updatedAt)
  },

  async deleteSession(sessionId: string) {
    sessions.delete(sessionId)
    messages.delete(sessionId)
  },

  async saveMessage(msg: StoredMessage) {
    const list = messages.get(msg.sessionId) || []
    list.push(msg)
    messages.set(msg.sessionId, list)
    if (list.length > 200) list.shift()
  },

  async getMessages(sessionId: string, limit = 50) {
    return (messages.get(sessionId) || []).slice(-limit)
  },

  async clearMessages(sessionId: string) {
    messages.delete(sessionId)
  },

  async saveWorkflowRun(run: StoredWorkflowRun) {
    workflowRuns.set(run.id, run)
    if (workflowRuns.size > 100) {
      const first = workflowRuns.keys().next().value
      if (first) workflowRuns.delete(first)
    }
  },

  async getWorkflowHistory(sessionId?: string, limit = 20) {
    let runs = Array.from(workflowRuns.values())
    if (sessionId) runs = runs.filter((r) => r.sessionId === sessionId)
    return runs.sort((a, b) => b.startedAt - a.startedAt).slice(0, limit)
  },

  async getWorkflowRun(id: string) {
    return workflowRuns.get(id) || null
  },

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
    return all.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit)
  },

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
        if (entry.keywords.some((k) => k.toLowerCase() === kw)) score += 2
      }
      score *= (0.5 + entry.importance)
      if (score > 0) scored.push({ entry, score })
    }
    return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.entry)
  },

  async clearAll() {
    sessions.clear()
    messages.clear()
    workflowRuns.clear()
    toolResults.clear()
    memoryEntries.clear()
  },
}

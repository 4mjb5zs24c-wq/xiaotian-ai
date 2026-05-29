/**
 * Storage Adapter —— 数据持久化抽象接口
 *
 * 所有上层（memory / context / agent）通过此接口操作数据。
 * 禁止直接操作 DB。切换后端只需 setStorageAdapter()。
 *
 * 实现：
 *   - MemoryStorage  (Map-based, 默认)
 *   - SqliteStorage   (结构化, future)
 *   - IndexedDBStorage (浏览器端, future)
 *   - PostgresStorage (服务端, future)
 */

// ── Data Transfer Objects ──────────────────────────────

export interface StoredSession {
  sessionId: string
  createdAt: number
  updatedAt: number
  messageCount: number
  metadata: Record<string, unknown>
}

export interface StoredMessage {
  id: string
  sessionId: string
  type: 'message' | 'tool_result' | 'workflow_result' | 'insight' | 'preference'
  timestamp: number
  data: Record<string, unknown>
  summary: string
  importance: number
}

export interface StoredWorkflowRun {
  id: string
  workflowId: string
  workflowName: string
  sessionId: string
  trigger: string
  status: 'completed' | 'failed'
  steps: Array<{ name: string; status: string; summary: string }>
  result: Record<string, unknown>
  toolCallCount: number
  startedAt: number
  completedAt: number
}

export interface StoredToolResult {
  id: string
  toolName: string
  sessionId: string
  args: Record<string, unknown>
  result: Record<string, unknown>
  timestamp: number
  summary: string
}

export interface StoredMemoryEntry {
  id: string
  sessionId: string
  type: string
  content: string
  keywords: string[]
  timestamp: number
  importance: number
  metadata: Record<string, unknown>
}

// ── Storage Adapter Interface ──────────────────────────

export interface StorageAdapter {
  readonly name: string

  // Session
  saveSession(session: StoredSession): Promise<void>
  loadSession(sessionId: string): Promise<StoredSession | null>
  listSessions(): Promise<StoredSession[]>
  deleteSession(sessionId: string): Promise<void>

  // Messages
  saveMessage(msg: StoredMessage): Promise<void>
  getMessages(sessionId: string, limit?: number): Promise<StoredMessage[]>
  clearMessages(sessionId: string): Promise<void>

  // Workflow Runs
  saveWorkflowRun(run: StoredWorkflowRun): Promise<void>
  getWorkflowHistory(sessionId?: string, limit?: number): Promise<StoredWorkflowRun[]>
  getWorkflowRun(id: string): Promise<StoredWorkflowRun | null>

  // Tool Results
  saveToolResult(result: StoredToolResult): Promise<void>
  getToolHistory(sessionId?: string, limit?: number): Promise<StoredToolResult[]>

  // Memory (for RAG / semantic search)
  saveMemory(entry: StoredMemoryEntry): Promise<void>
  searchMemory(query: string, limit?: number): Promise<StoredMemoryEntry[]>

  // Admin
  clearAll(): Promise<void>
}

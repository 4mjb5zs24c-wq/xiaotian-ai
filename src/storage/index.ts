/**
 * Storage Layer —— 持久化入口
 *
 * 全局单例 storageAdapter。上层模块通过此 adapter 读写数据。
 * 切换后端：setStorageAdapter(sqliteStorage)
 */

import type { StorageAdapter } from './types'
import { memoryStorage } from './memoryStorage'

// ── Singleton ──────────────────────────────────────────

let currentAdapter: StorageAdapter = memoryStorage

export function setStorageAdapter(adapter: StorageAdapter) {
  currentAdapter = adapter
  console.log(`💾 Storage adapter set to: ${adapter.name}`)
}

export function getStorageAdapter(): StorageAdapter {
  return currentAdapter
}

// ── Re-export ──────────────────────────────────────────

export { memoryStorage } from './memoryStorage'
export { sqliteStorage } from './sqliteStorage'
export type {
  StorageAdapter,
  StoredSession,
  StoredMessage,
  StoredWorkflowRun,
  StoredToolResult,
  StoredMemoryEntry,
} from './types'

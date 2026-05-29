/**
 * Shared Agent Memory —— 跨 Agent 共享上下文
 *
 * 所有 Agent 通过 sharedMemory 读写共享数据。
 * Planner 写入执行计划，各 Agent 写入执行结果。
 */

import type { SharedMemory } from './types'

export function createSharedMemory(): SharedMemory {
  const store = new Map<string, unknown>()

  return {
    store,
    set(key: string, value: unknown) {
      store.set(key, value)
    },
    get<T = unknown>(key: string): T | undefined {
      return store.get(key) as T | undefined
    },
    keys() {
      return Array.from(store.keys())
    },
    clear() {
      store.clear()
    },
  }
}

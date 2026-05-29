/**
 * AI Insight V1 — Status State Machine
 *
 * Tracks insight lifecycle: unread → viewed → action_clicked → ... → resolved
 * V1 uses in-memory Map; real persistence comes in P2.
 */

export type InsightStatus =
  | 'unread'
  | 'viewed'
  | 'action_clicked'
  | 'generated'
  | 'added_to_basket'
  | 'assigned'
  | 'ignored'
  | 'remind_later'
  | 'resolved'

const store = new Map<string, InsightStatus>()

// ── CRUD ──

export function getInsightStatus(id: string): InsightStatus {
  return store.get(id) || 'unread'
}

export function setInsightStatus(id: string, status: InsightStatus): void {
  store.set(id, status)
}

export function getAllStatuses(): Record<string, InsightStatus> {
  const result: Record<string, InsightStatus> = {}
  store.forEach((v, k) => { result[k] = v })
  return result
}

export function resetAllStatuses(): void {
  store.clear()
}

// ── Status Labels ──

export const STATUS_LABELS: Record<InsightStatus, string> = {
  unread: '未读',
  viewed: '已查看',
  action_clicked: '已点击操作',
  generated: '已生成',
  added_to_basket: '已加入练习篮',
  assigned: '已布置',
  ignored: '已忽略',
  remind_later: '稍后提醒',
  resolved: '已处理',
}

// ── Self-check helpers ──

export function _insightStatusStoreForTest(): Map<string, InsightStatus> {
  return store
}

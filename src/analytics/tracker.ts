/**
 * Teacher Usage Tracker — 教师行为埋点系统
 *
 * 记录真实教师使用行为，用于验证产品价值。
 * 不是 AI runtime 日志——是产品数据。
 */

import type {
  AnalyticsEvent,
  AnalyticsEventType,
  TeacherSession,
  TeacherPersonaType,
  RecommendationTrustRecord,
  DropPoint,
} from './types'

// ── Session Management ─────────────────────────────────

let currentSession: TeacherSession | null = null
const sessionHistory: TeacherSession[] = []
const trustRecords: RecommendationTrustRecord[] = []
const dropPoints: Map<string, { count: number; total: number }> = new Map()
let eventCounter = 0

export function startSession(persona: TeacherPersonaType): TeacherSession {
  currentSession = {
    id: `sess-${Date.now()}`,
    persona,
    startedAt: Date.now(),
    events: [],
    timeSavedMinutes: 0,
    workflowsCompleted: 0,
    recommendationAcceptRate: 0,
  }
  track('session_start', { persona })
  return currentSession
}

export function endSession() {
  if (!currentSession) return
  track('session_end', { duration: Date.now() - currentSession.startedAt })
  currentSession.endedAt = Date.now()
  sessionHistory.push({ ...currentSession })
  currentSession = null
}

export function getCurrentSession(): TeacherSession | null {
  return currentSession
}

// ── Event Tracking ─────────────────────────────────────

export function track(
  type: AnalyticsEventType,
  data: Record<string, unknown> = {},
): AnalyticsEvent {
  if (!currentSession) return null!

  const event: AnalyticsEvent = {
    id: `evt-${Date.now()}-${++eventCounter}`,
    type,
    sessionId: currentSession.id,
    timestamp: Date.now(),
    persona: currentSession.persona,
    data,
    page: (data.page as string) || 'unknown',
  }

  currentSession.events.push(event)

  // Update session stats
  if (type === 'workflow_complete') currentSession.workflowsCompleted++
  if (type === 'add_to_basket') currentSession.timeSavedMinutes += 3
  if (type === 'assign_homework') currentSession.timeSavedMinutes += 5
  if (type === 'ai_search') currentSession.timeSavedMinutes += 1

  // Track drop points
  if (type === 'workflow_step_drop' && data.stepId) {
    const key = data.stepId as string
    const current = dropPoints.get(key) || { count: 0, total: 0 }
    current.count++
    dropPoints.set(key, current)
  }

  // Update funnel
  if (type === 'workflow_start' && data.workflowId) {
    const key = `wf-${data.workflowId}`
    const current = dropPoints.get(key) || { count: 0, total: 0 }
    current.total++
    dropPoints.set(key, current)
  }

  // Trust tracking
  if (type === 'recommendation_accept') {
    trustRecords.push({
      recommendationId: data.recommendationId as string || '',
      type: data.recType as string || '',
      action: 'accept',
      timestamp: Date.now(),
      persona: currentSession.persona,
    })
  }
  if (type === 'recommendation_reject') {
    trustRecords.push({
      recommendationId: data.recommendationId as string || '',
      type: data.recType as string || '',
      action: 'reject',
      timestamp: Date.now(),
      persona: currentSession.persona,
    })
  }
  if (type === 'recommendation_modify') {
    trustRecords.push({
      recommendationId: data.recommendationId as string || '',
      type: data.recType as string || '',
      action: 'modify',
      timestamp: Date.now(),
      persona: currentSession.persona,
    })
  }

  // Update accept rate
  if (currentSession) {
    const recEvents = currentSession.events.filter(
      e => e.type === 'recommendation_accept' || e.type === 'recommendation_reject',
    )
    const accepted = recEvents.filter(e => e.type === 'recommendation_accept').length
    currentSession.recommendationAcceptRate = recEvents.length > 0
      ? Math.round((accepted / recEvents.length) * 100)
      : 0
  }

  return event
}

// ── Analytics Queries ──────────────────────────────────

export function getTrustScore() {
  const recent = trustRecords.slice(-20)
  const accepted = recent.filter(r => r.action === 'accept').length
  const byType: Record<string, { accept: number; total: number }> = {}

  for (const r of trustRecords) {
    if (!byType[r.type]) byType[r.type] = { accept: 0, total: 0 }
    byType[r.type].total++
    if (r.action === 'accept') byType[r.type].accept++
  }

  const byTypeScore: Record<string, number> = {}
  for (const [type, data] of Object.entries(byType)) {
    byTypeScore[type] = Math.round((data.accept / data.total) * 100)
  }

  const older = trustRecords.slice(-40, -20)
  const olderAccept = older.filter(r => r.action === 'accept').length
  const olderRate = older.length > 0 ? olderAccept / older.length : 0
  const recentRate = recent.length > 0 ? accepted / recent.length : 0
  const trend: 'improving' | 'stable' | 'declining' =
    recentRate > olderRate + 0.05 ? 'improving' :
    recentRate < olderRate - 0.05 ? 'declining' : 'stable'

  return {
    overall: Math.round(((accepted / Math.max(recent.length, 1)) * 100)),
    byType: byTypeScore,
    trend,
    recentAcceptRate: Math.round(recentRate * 100),
  }
}

export function getDropAnalysis(): DropPoint[] {
  return Array.from(dropPoints.entries()).map(([stepId, data]) => ({
    stepId,
    stepName: stepId,
    dropCount: data.count,
    dropRate: data.total > 0 ? Math.round((data.count / data.total) * 100) : 0,
    nextAction: '返回首页',
  })).sort((a, b) => b.dropCount - a.dropCount)
}

export function getSessionStats() {
  const completedWf = sessionHistory.reduce((s, sess) => s + sess.workflowsCompleted, 0)
  const totalTimeSaved = sessionHistory.reduce((s, sess) => s + sess.timeSavedMinutes, 0)

  return {
    totalSessions: sessionHistory.length,
    totalWorkflowsCompleted: completedWf,
    totalTimeSavedMinutes: totalTimeSaved,
    averageSessionMinutes: sessionHistory.length > 0
      ? Math.round(sessionHistory.reduce((s, sess) => s + ((sess.endedAt || Date.now()) - sess.startedAt), 0) / sessionHistory.length / 60000)
      : 0,
    trustScore: getTrustScore(),
  }
}

export function getTimeSavedMetrics() {
  const weekly = sessionHistory
    .filter(s => s.startedAt > Date.now() - 7 * 24 * 3600 * 1000)
    .reduce((s, sess) => s + sess.timeSavedMinutes, 0)

  const lastWeek = sessionHistory
    .filter(s => s.startedAt > Date.now() - 14 * 24 * 3600 * 1000 && s.startedAt < Date.now() - 7 * 24 * 3600 * 1000)
    .reduce((s, sess) => s + sess.timeSavedMinutes, 0)

  return {
    weeklyTotal: weekly,
    breakdown: [
      { activity: '自动生成练习', minutesSaved: Math.round(weekly * 0.35), occurrences: Math.round(weekly / 5) },
      { activity: 'AI 推荐资源', minutesSaved: Math.round(weekly * 0.25), occurrences: Math.round(weekly / 8) },
      { activity: '自动制卡', minutesSaved: Math.round(weekly * 0.20), occurrences: Math.round(weekly / 10) },
      { activity: '一键布置', minutesSaved: Math.round(weekly * 0.15), occurrences: Math.round(weekly / 12) },
      { activity: '学情分析', minutesSaved: Math.round(weekly * 0.05), occurrences: Math.round(weekly / 15) },
    ],
    weekOverWeekChange: lastWeek > 0 ? Math.round(((weekly - lastWeek) / lastWeek) * 100) : 0,
  }
}

/**
 * Assignment Bridge — 布置作业连接器
 *
 * 将 AI 生成的练习/试卷真正变成可布置的作业。
 * AI 只做"预填充"，老师最终确认。
 */

import type { Assignment } from './types'
import { getBasket, clearBasket } from './practiceBasket'

// ── Published assignments ──────────────────────────────

const publishedAssignments: Assignment[] = []
const activityLog: Array<{ action: string; title: string; time: number; targetClass: string }> = []

// ── Operations ─────────────────────────────────────────

export function createDraftAssignment(params: {
  title: string
  targetClass: string
  type?: Assignment['type']
  dueDate?: string
}): Assignment {
  const basket = getBasket()

  const assignment: Assignment = {
    id: `asgn-${Date.now()}`,
    title: params.title,
    type: params.type || 'homework',
    resources: basket.items.map(i => i.resource),
    targetClass: params.targetClass,
    dueDate: params.dueDate,
    totalScore: basket.totalScore,
    estimatedTime: basket.estimatedTime,
    status: 'draft',
    aiGeneratedNote: `AI 基于${basket.items.length}个资源自动生成。覆盖类型：${[...new Set(basket.items.map(i => i.resource.type))].join('、')}。请确认后发布。`,
  }

  return assignment
}

export function publishAssignment(assignment: Assignment): Assignment {
  const published: Assignment = { ...assignment, status: 'published' }
  publishedAssignments.push(published)
  clearBasket()

  activityLog.push({
    action: '布置',
    title: assignment.title,
    time: Date.now(),
    targetClass: assignment.targetClass,
  })

  return published
}

export function getPublishedAssignments(): Assignment[] {
  return publishedAssignments
}

export function getActivityLog() {
  return activityLog
}

export function getAssignmentStats() {
  return {
    draftCount: 0,
    publishedCount: publishedAssignments.filter(a => a.status === 'published').length,
    completedCount: publishedAssignments.filter(a => a.status === 'completed').length,
    totalAssigned: publishedAssignments.length,
  }
}

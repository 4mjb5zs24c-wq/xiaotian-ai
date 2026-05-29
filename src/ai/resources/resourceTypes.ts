/**
 * Resource Types — 推荐资源数据结构
 *
 * Used by ResourceRecommendationPanel and ResourceDetailPreviewPanel.
 * V1: mock data. Real resource types in P2.
 */

// ── Resource Question ─────────────────────────────────────

export interface ResourceQuestion {
  questionId: string
  questionType: string
  stem: string
  options?: string[]
  answer: string
  analysis: string
  score: number
  difficulty: 'basic' | 'medium' | 'advanced'
  selected: boolean
  removed: boolean
}

// ── Recommended Resource ─────────────────────────────────

export interface RecommendedResource {
  resourceId: string
  title: string
  type: string
  difficulty: string
  estimatedTime: string
  reason: string
  selected: boolean
  removed: boolean
  questions: ResourceQuestion[]
  tags: string[]
  totalScore: number
  sourceInsightId?: string
  sourceActionId?: string
}

// ── Helpers ───────────────────────────────────────────────

export function getActiveQuestions(r: RecommendedResource): ResourceQuestion[] {
  return r.questions.filter((q) => !q.removed)
}

export function getActiveScore(r: RecommendedResource): number {
  return getActiveQuestions(r).reduce((sum, q) => sum + q.score, 0)
}

export function getActiveCount(r: RecommendedResource): number {
  return getActiveQuestions(r).length
}

export function hasActiveContent(r: RecommendedResource): boolean {
  return getActiveQuestions(r).length > 0
}

export function removeQuestion(r: RecommendedResource, questionId: string): RecommendedResource {
  return {
    ...r,
    questions: r.questions.map((q) =>
      q.questionId === questionId ? { ...q, removed: true, selected: false } : q
    ),
  }
}

export function restoreQuestion(r: RecommendedResource, questionId: string): RecommendedResource {
  return {
    ...r,
    questions: r.questions.map((q) =>
      q.questionId === questionId ? { ...q, removed: false, selected: true } : q
    ),
  }
}

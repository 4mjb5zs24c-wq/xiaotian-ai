/**
 * AI Insight V1 — Type Definitions
 *
 * Frozen per docs/ai-insight-v1-freeze.md
 */

// ── Insight Item ───────────────────────────────────────

export type InsightModule =
  | 'home_wrong_word'
  | 'home_listening_speaking'
  | 'home_writing'
  | 'exam_reminder'
  | 'vocabulary_insight'
  | 'writing_insight'

export interface InsightScope {
  className: string
  unit?: string
  questionType?: string
  period?: string
}

export interface InsightEvidenceDetail {
  label: string
  value: string
  trend?: 'up' | 'down' | 'stable'
}

export interface InsightEvidence {
  summary: string
  details: InsightEvidenceDetail[]
}

export interface InsightAction {
  actionId: string
  label: string
  type: 'navigate' | 'workflow' | 'panel' | 'alert'
  target: string
  requiresConfirm: boolean
  workflowId?: string
  payload?: Record<string, string>
}

export interface SampleInfo {
  totalStudents: number
  sampleCount: number
  sampleRatio: number
  isSampleTooSmall: boolean
}

export interface ExamInfo {
  examName: string
  examDate: string
  daysToExam: number
  isExamWithin30Days: boolean
  hasEnded: boolean
}

export interface InsightItem {
  insightId: string
  module: InsightModule
  title: string
  riskLevel: 'high' | 'medium' | 'low'
  priority: number
  scope: InsightScope
  evidence: InsightEvidence
  analysis: string
  suggestion: string
  actions: InsightAction[]
  sourceData: Record<string, unknown>
  sampleInfo: SampleInfo
  examInfo?: ExamInfo
  createdAt: string
  expiresAt?: string
  status: 'active' | 'dismissed' | 'expired'
}

// ── Writing Model Output (V1 placeholder) ──────────────

export interface WritingModelOutput {
  totalScore: number
  dimensionScores: {
    content: number
    language: number
    structure: number
    format: number
    highlights: number
  }
  contentDiagnosis: string
  languageDiagnosis: string
  structureDiagnosis: string
  commonErrors: Array<{
    type: string
    count: number
    students: string[]
  }>
  highlights: string[]
  modelEssayRecommendations: Array<{
    student: string
    score: number
    highlight: string
  }>
  revisionSuggestions: string[]
}

// ── Insight History ────────────────────────────────────

export interface InsightHistory {
  recentInsights: string[]
  recentActions: string[]
  dismissedInsights: string[]
  lastGeneratedAt: Record<string, string>
}

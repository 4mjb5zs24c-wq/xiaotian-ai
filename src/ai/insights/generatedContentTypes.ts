/**
 * AI Insight V1 — Generated Content Types
 *
 * Defines the structure of content generated from insight recommended actions.
 * All data is mock in V1.
 */

// ── Content Type Enum ────────────────────────────────────

export type GeneratedContentType =
  | 'vocab_practice'
  | 'wrong_word_practice'
  | 'speaking_practice'
  | 'listening_practice'
  | 'writing_review'
  | 'model_essay'
  | 'writing_revision'
  | 'exam_mock'
  | 'special_practice'

// ── Content Item (generic unit, e.g. a word / question / topic) ─

export interface ContentItem {
  id: string
  label: string
  sublabel?: string
  /** For vocab: error rate; for questions: difficulty */
  meta?: string
  /** Whether this item is editable */
  editable?: boolean
  /** Whether this item is selected (for checklists) */
  selected?: boolean
}

// ── Generated Content ─────────────────────────────────────

export interface GeneratedContent {
  contentId: string
  sourceInsightId: string
  sourceActionId: string
  type: GeneratedContentType
  title: string
  summary: string
  /** Items (words, questions, topics, etc.) */
  items: ContentItem[]
  difficulty: 'basic' | 'medium' | 'advanced'
  estimatedTime: string
  score: number
  editable: boolean
  previewable: boolean
  assignable: boolean
  basketable: boolean
  createdAt: string
  status: 'draft' | 'edited' | 'basket' | 'assigned'
  /** Type-specific data */
  extra?: Record<string, unknown>
}

// ── Vocab Practice Extra ──────────────────────────────────

export interface VocabPracticeExtra {
  words: Array<{
    word: string
    chinese: string
    errorRate: number
    recommendedQuestionType: string
  }>
  totalQuestions: number
  questionTypes: string[]
}

// ── Speaking Practice Extra ───────────────────────────────

export interface SpeakingPracticeExtra {
  materialTitle: string
  questionType: string
  duration: string
  focusSkill: string
  recommendReason: string
}

// ── Writing Review Extra ─────────────────────────────────

export interface WritingReviewExtra {
  essayTopic: string
  commonIssues: string[]
  reviewPoints: string[]
  modelEssaySuggestion: string
  revisionSuggestion: string
  totalSubmissions: number
  avgScore: number
}

// ── Model Essay Extra ────────────────────────────────────

export interface ModelEssayExtra {
  essayTitle: string
  topic: string
  highlights: string[]
  reusableStructures: string[]
  essayExcerpt: string
  estimatedScore: number
}

// ── Exam Mock Extra ──────────────────────────────────────

export interface ExamMockExtra {
  paperName: string
  questionConfig: Array<{ type: string; count: number; score: number }>
  difficulty: string
  estimatedTime: string
  recommendReason: string
}

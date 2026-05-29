/**
 * AI Insight V1 — Rule Functions
 *
 * Frozen per docs/ai-insight-v1-freeze.md
 * All rules use mock data only.
 */

import type { InsightItem, InsightHistory } from './insightTypes'
import {
  allMockInsights,
  mockInsightExamReminder,
  mockInsightSmallSample,
  mockInsightWrongWord,
  mockInsightListening,
  mockInsightWriting,
  mockInsightPracticeReport,
  mockInsightWrongQuestion,
  mockInsightWrongWordPage,
} from './mockInsights'

// ── 1. isSampleTooSmall ────────────────────────────────

export function isSampleTooSmall(totalStudents: number, sampleCount: number): boolean {
  if (totalStudents >= 45) {
    return sampleCount <= 15
  }
  return sampleCount / totalStudents <= 0.3
}

// ── 2. isExamWithin30Days ──────────────────────────────

export function isExamWithin30Days(examDate: string, currentDate?: string): boolean {
  const exam = new Date(examDate)
  const today = currentDate ? new Date(currentDate) : new Date()
  const diffMs = exam.getTime() - today.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  return diffDays > 0 && diffDays <= 30
}

// ── 3. rankInsights ────────────────────────────────────

export function rankInsights(insights: InsightItem[]): InsightItem[] {
  const hasExamReminder = insights.some(
    (i) => i.module === 'exam_reminder' && i.examInfo?.isExamWithin30Days && !i.examInfo?.hasEnded,
  )

  const sorted = [...insights].sort((a, b) => {
    // Exam reminder always first
    if (a.module === 'exam_reminder' && b.module !== 'exam_reminder') return -1
    if (b.module === 'exam_reminder' && a.module !== 'exam_reminder') return 1
    // Then by priority
    if (a.priority !== b.priority) return a.priority - b.priority
    // Then by riskLevel
    const riskOrder = { high: 0, medium: 1, low: 2 }
    return riskOrder[a.riskLevel] - riskOrder[b.riskLevel]
  })

  // In exam period: exam reminder + 2 more
  if (hasExamReminder) {
    const reminder = sorted.find((i) => i.module === 'exam_reminder')!
    const rest = sorted.filter((i) => i.module !== 'exam_reminder').slice(0, 2)
    return [reminder, ...rest]
  }

  // Non-exam: max 3, by priority
  return sorted.slice(0, 3)
}

// ── 4. shouldSuppressInsight ────────────────────────────

export function shouldSuppressInsight(insight: InsightItem, history: InsightHistory): boolean {
  // Suppress high-risk if sample too small
  if (insight.sampleInfo.isSampleTooSmall && insight.riskLevel === 'high') {
    return true
  }
  // Suppress if same module already shown today
  if (history.recentInsights.some((id) => id.startsWith(insight.module))) {
    return true
  }
  // Suppress exam reminder if exam has ended
  if (insight.module === 'exam_reminder' && insight.examInfo?.hasEnded) {
    return true
  }
  // Suppress if dismissed
  if (history.dismissedInsights.includes(insight.insightId)) {
    return true
  }
  return false
}

// ── 5. generateHomeInsights ─────────────────────────────

export interface HomeInsightContext {
  /** Set true to enable exam reminder (mock exam within 30 days) */
  enableExamReminder?: boolean
  /** Set true to enable small sample mode */
  enableSmallSample?: boolean
  /** Set true to disable specific module types */
  disabledModules?: string[]
}

export function generateHomeInsights(ctx: HomeInsightContext = {}): InsightItem[] {
  const candidates: InsightItem[] = []

  // Exam reminder
  if (ctx.enableExamReminder && !ctx.disabledModules?.includes('exam_reminder')) {
    candidates.push(mockInsightExamReminder)
  }

  // Small sample overrides everything else
  if (ctx.enableSmallSample) {
    candidates.push(mockInsightSmallSample)
    return rankInsights(candidates)
  }

  // Regular insights
  if (!ctx.disabledModules?.includes('home_wrong_word')) {
    candidates.push(mockInsightWrongWord)
  }
  if (!ctx.disabledModules?.includes('home_listening_speaking')) {
    candidates.push(mockInsightListening)
  }
  if (!ctx.disabledModules?.includes('home_writing')) {
    candidates.push(mockInsightWriting)
  }

  return rankInsights(candidates)
}

// ── 6. getInsightById ──────────────────────────────────

export function getInsightById(id: string): InsightItem | undefined {
  return allMockInsights.find((i) => i.insightId === id)
}

// ── 7. Filter unsafe text ──────────────────────────────

const UNSAFE_TERMS = [
  'AI', '模型', '算法', 'workflow', 'agent', 'tool', 'provider',
  '稳定性不足', '普通班', '差生', '低水平学生', 'runtime',
  'debug', 'execution trace', 'model logs',
]

export function isSafeText(text: string): boolean {
  const lower = text.toLowerCase()
  return !UNSAFE_TERMS.some((term) => lower.includes(term.toLowerCase()))
}

export function validateInsightText(insight: InsightItem): string[] {
  const issues: string[] = []
  const fields = [insight.title, insight.analysis, insight.suggestion]
  for (const field of fields) {
    for (const term of UNSAFE_TERMS) {
      if (field.toLowerCase().includes(term.toLowerCase())) {
        issues.push(`包含禁止词"${term}": ${field.substring(0, 50)}...`)
      }
    }
  }
  return issues
}

// ── 8. generatePracticeReportInsights ──────────────────

export function generatePracticeReportInsights(): InsightItem[] {
  return [mockInsightPracticeReport]
}

// ── 9. generateWrongQuestionInsights ───────────────────

export function generateWrongQuestionInsights(): InsightItem[] {
  return [mockInsightWrongQuestion]
}

// ── 10. generateWrongWordPageInsights ──────────────────

export function generateWrongWordPageInsights(): InsightItem[] {
  return [mockInsightWrongWordPage]
}

/**
 * TeachingInsight — Unified AI insight types
 *
 * Replaces ad-hoc mock data in stage insight views with a single
 * data structure shared by HomePage, report pages, and all insight callers.
 */

// ── Insight Type ────────────────────────────────────────

export type TeachingInsightType =
  | 'practiceStage'
  | 'vocabulary'
  | 'listeningSpeaking'
  | 'writing'

export type InsightPriority =
  | 'needs_attention'   // 需关注 — severe
  | 'suggest_attention'  // 建议关注 — medium
  | 'continue_observe'   // 持续观察 — normal
  | 'improving'          // 表现提升 — positive

export type TrendDirection = 'up' | 'down' | 'stable'

// ── Key Metric ──────────────────────────────────────────

export interface KeyMetric {
  label: string
  value: string
  trend?: TrendDirection
  sub?: string
  alert?: boolean
}

// ── Trend Comparison ────────────────────────────────────

export interface TrendPoint {
  label: string
  completionRate?: number
  accuracyRate?: number
  value?: number
}

export interface TrendAnalysis {
  title: string
  periods: TrendPoint[]
  summary: string
}

// ── Comparison (class vs reference) ─────────────────────

export interface ComparisonItem {
  label: string
  ours: string | number
  reference: string | number
  gap: number
  alert?: boolean
  oursBetter?: boolean
}

export interface ReferenceComparison {
  vertical?: {
    title: string
    items: ComparisonItem[]
  }
  horizontal?: {
    title: string
    items: ComparisonItem[]
  }
}

// ── Problem Diagnosis ───────────────────────────────────

export interface ProblemItem {
  rank: number
  title: string
  data: string
  impact: string
  severe: boolean
  actionLabel?: string
}

// ── Student Segments ────────────────────────────────────

export interface StudentSegment {
  label: string
  count: number
  description: string
  color: 'blue' | 'emerald' | 'red' | 'amber'
}

// ── Recommended Action ──────────────────────────────────

export interface RecommendedAction {
  label: string
  desc: string
  primary?: boolean
  confirm?: boolean
  onClickKey: string // key for action handler mapping
}

// ── Related Item ────────────────────────────────────────

export interface RelatedItem {
  title: string
  meta: string
  issue?: string
  actions: string[]
}

// ── Error Type Distribution ─────────────────────────────

export interface ErrorTypeItem {
  type: string
  count: number
  words: string
  borderColor: string
}

// ── High Frequency Item ─────────────────────────────────

export interface HighFreqItem {
  name: string
  rate: string
  bar: number
}

// ── Radar Dimension ─────────────────────────────────────

export interface RadarDimension {
  label: string
  ours: number
  avg: number
}

// ── Main TeachingInsight ────────────────────────────────

export interface TeachingInsight {
  id: string
  type: TeachingInsightType
  priority: InsightPriority

  // Core text
  title: string
  summary: string
  conclusion: string

  // Scope
  analysisScope: {
    className: string
    unit?: string
    period?: string
    questionType?: string
  }

  // Metrics
  keyMetrics: KeyMetric[]

  // Trend
  trendAnalysis?: TrendAnalysis

  // Comparison
  referenceComparison?: ReferenceComparison

  // Problem diagnosis
  problemDiagnosis?: {
    title?: string
    items: ProblemItem[]
  }

  // Impact
  impactScope?: {
    studentCount?: number
    itemCount?: number
    description: string
  }

  // Student segments
  studentSegments?: StudentSegment[]

  // Actions
  recommendedActions: RecommendedAction[]

  // Related items
  relatedItems?: RelatedItem[]

  // Type-specific data
  errorTypes?: ErrorTypeItem[]
  highFreqItems?: HighFreqItem[]
  radarDimensions?: RadarDimension[]
}

/**
 * AI 写作洞察 — Type Definitions
 *
 * 一期不做自由问答、不做导出、不做作文讲评/讲评素材池/写作提升方案。
 * 重点：结构化洞察、真实证据、作文订正、资源推荐、范文生成、干预记录闭环。
 */

// ── Home Teaching Concern Card ──────────────────────────

export type WritingConcernCardType = 'writing_insight'

export interface HomeWritingConcernCard {
  id: string
  type: WritingConcernCardType
  status: '需关注' | '建议关注'
  summary: string
  targetPage: string
}

// ── Time Range ──────────────────────────────────────────

export type TimeRange = '7d' | '14d' | '30d' | 'semester' | 'current_unit' | 'custom'

export const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  '7d': '近 7 天',
  '14d': '近 14 天',
  '30d': '近 30 天',
  semester: '本学期',
  current_unit: '当前单元',
  custom: '自定义时间范围',
}

// ── Writing Types ───────────────────────────────────────

export type WritingType = 'practical' | 'continuation' | 'sync_composition' | 'custom_correction' | 'comprehensive_expression'

export const WRITING_TYPE_LABELS: Record<WritingType, string> = {
  practical: '应用文',
  continuation: '读后续写',
  sync_composition: '同步作文',
  custom_correction: '自定义批改',
  comprehensive_expression: '书面表达',
}

// ── Problem Types (7 fixed categories) ─────────────────

export type WritingProblemType =
  | 'content_incomplete'
  | 'structure_unclear'
  | 'language_accuracy'
  | 'vocabulary_weak'
  | 'sentence_monotony'
  | 'logic_cohesion'
  | 'format_issue'

export const PROBLEM_TYPE_META: Record<WritingProblemType, { label: string; borderColor: string; bgColor: string }> = {
  content_incomplete:    { label: '内容不完整 / 要点缺失',     borderColor: '#e55',    bgColor: '#fef0f0' },
  structure_unclear:     { label: '结构不清 / 段落组织弱',     borderColor: '#f0a060', bgColor: '#fef8f0' },
  language_accuracy:     { label: '语言准确性弱 / 语法错误多', borderColor: '#7b9cd6', bgColor: '#f0f4fc' },
  vocabulary_weak:       { label: '词汇表达弱 / 用词单一',     borderColor: '#8e7cc3', bgColor: '#f6f0fc' },
  sentence_monotony:     { label: '句式单一 / 句子衔接弱',     borderColor: '#4b9fe8', bgColor: '#f0f6fc' },
  logic_cohesion:        { label: '逻辑衔接弱 / 情节不连贯',   borderColor: '#4caf50', bgColor: '#f0faf0' },
  format_issue:          { label: '格式规范问题 / 应用文格式', borderColor: '#9ab3cc', bgColor: '#f5f7fa' },
}

// ── Core Metrics ────────────────────────────────────────

export interface WritingMetrics {
  averageScore: number
  averageLevel: string
  reviewedEssayCount: number
  mainProblemType: string
  weakStudentCount: number
  excellentEssayCount: number
}

// ── Problem Type Item ───────────────────────────────────

export interface ProblemTypeItem {
  id: string
  type: WritingProblemType
  label: string
  borderColor: string
  bgColor: string
  percent: number
  affectedStudentCount: number
  typicalPerformance: string
  aiReason: string
  recommendedActions: string[]
  examples: string[]
}

// ── High Frequency Issue (typical writing segment) ──────

export interface WritingIssueItem {
  id: string
  studentId: string
  studentName: string
  essayTitle: string
  taskName: string
  writingType: WritingType
  originalText: string
  issueExplanation: string
  revisionSuggestion: string
  improvedExample: string
  score: number
  answerSheetImageUrl: string
  fullEssayId: string
}

export interface HighFrequencyIssueGroup {
  problemType: WritingProblemType
  items: WritingIssueItem[]
}

// ── Weak Student ────────────────────────────────────────

export interface WeakWritingStudent {
  id: string
  name: string
  averageScore: number
  level: string
  mainProblemTypes: string[]
  typicalSentence: string
  relatedTasks: string[]
  scoreTrend: 'declining' | 'stable' | 'improving'
  problemDistribution: { type: WritingProblemType; label: string; percent: number }[]
  answerSheetImageUrl: string
  fullEssayIds: string[]
  recentScores: { taskName: string; score: number; date: string }[]
  revisionSuggestions: string[]
}

// ── Excellent Writing ───────────────────────────────────

export interface ExcellentWriting {
  id: string
  studentId: string
  studentName: string
  essayTitle: string
  taskName: string
  writingType: WritingType
  score: number
  level: string
  highlights: string
  excerpt: string
  fullEssayId: string
  answerSheetImageUrl: string
}

// ── Recommended Writing Resource ────────────────────────

export interface RecommendedWritingResource {
  id: string
  title: string
  resourceType: string
  tags: string[]
  questionCount?: number
  duration?: string
  difficulty: 'basic' | 'medium' | 'advanced'
  grade: string
  source?: string
  recommendReason: string
  canPreview?: boolean
  canAssign?: boolean
  canAddToPaperBasket?: boolean
}

// ── Generated Sample Essay ──────────────────────────────

export type SampleLevel = 'basic' | 'improved' | 'excellent'

export const SAMPLE_LEVEL_META: Record<SampleLevel, { label: string; className: string }> = {
  basic:     { label: '基础版', className: 'bg-blue-50 text-blue-600 border-blue-200' },
  improved:  { label: '提升版', className: 'bg-purple-50 text-purple-600 border-purple-200' },
  excellent: { label: '优秀版', className: 'bg-amber-50 text-amber-600 border-amber-200' },
}

export interface GeneratedSample {
  id: string
  level: SampleLevel
  title: string
  content: string
  highlights: string
  suitableFor: string
  editable?: boolean
}

// ── Intervention Record ─────────────────────────────────

export type InterventionType = 'essay_revision' | 'resource_assigned' | 'sample_generated'

export const INTERVENTION_TYPE_LABELS: Record<InterventionType, string> = {
  essay_revision: '作文订正',
  resource_assigned: '资源布置',
  sample_generated: '范文生成',
}

export interface WritingEffectSummary {
  beforeAverageScore: number
  afterAverageScore: number
  problemReductionRate: number
  improvedStudents: number
  stillNeedAttention: number
  suggestion: string
}

export interface WritingInterventionRecord {
  id: string
  time: string
  type: InterventionType
  name: string
  relatedProblemTypes: string[]
  target: string
  status: '进行中' | '已完成' | '部分完成'
  summary: string
  effectSummary?: WritingEffectSummary
}

// ── Top-Level Data Structure ────────────────────────────

export interface WritingInsightData {
  classId: string
  className: string
  unitId: string
  unitName: string
  timeRange: TimeRange
  updatedAt: string
  summary: string
  metrics: WritingMetrics
  problemTypes: ProblemTypeItem[]
  highFrequencyIssues: HighFrequencyIssueGroup[]
  weakStudents: WeakWritingStudent[]
  excellentWritings: ExcellentWriting[]
  recommendedResources: RecommendedWritingResource[]
  generatedSamples: GeneratedSample[]
  interventionRecords: WritingInterventionRecord[]
}

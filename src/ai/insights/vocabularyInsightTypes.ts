/**
 * AI 词汇洞察 — Type Definitions
 *
 * 一期不做自由问答、不做导出。
 * 重点：结构化洞察、数据下钻、干预动作、词汇复习方案闭环。
 */

// ── Home Teaching Concern Card ──────────────────────────

export type HomeConcernCardType = 'vocabulary_insight'

export interface HomeTeachingConcernCard {
  id: string
  type: HomeConcernCardType
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

// ── Error Types (7 fixed categories) ───────────────────

export type VocabularyErrorType =
  | 'listening_recognition'
  | 'spelling'
  | 'en_to_cn'
  | 'cn_to_en_confusion'
  | 'contextual_usage'
  | 'pronunciation'
  | 'phrase_chunk'

export interface ErrorTypeItem {
  type: VocabularyErrorType
  label: string
  percent: number
  affectedStudentCount: number
  exampleWords: string[]
  aiReason: string
  recommendedActions: string[]
  borderColor: string
  bgColor: string
}

export const ERROR_TYPE_META: Record<VocabularyErrorType, { label: string; borderColor: string; bgColor: string }> = {
  listening_recognition: { label: '听不准 / 听音识词弱', borderColor: '#e55', bgColor: '#fef0f0' },
  spelling: { label: '拼不对 / 默写错误', borderColor: '#f0a060', bgColor: '#fef8f0' },
  en_to_cn: { label: '认不出 / 英中匹配弱', borderColor: '#7b9cd6', bgColor: '#f0f4fc' },
  cn_to_en_confusion: { label: '词义混淆 / 中英匹配弱', borderColor: '#8e7cc3', bgColor: '#f6f0fc' },
  contextual_usage: { label: '不会用 / 语境应用弱', borderColor: '#4b9fe8', bgColor: '#f0f6fc' },
  pronunciation: { label: '读不准 / 跟读发音弱', borderColor: '#4caf50', bgColor: '#f0faf0' },
  phrase_chunk: { label: '语块掌握弱', borderColor: '#9ab3cc', bgColor: '#f5f7fa' },
}

// ── Core Metrics ────────────────────────────────────────

export interface VocabularyMetrics {
  masteryRate: number
  practicedWordCount: number
  weakWordCount: number
  weakStudentCount: number
  mainWeakType: string
}

// ── Weak Word / Chunk Item ──────────────────────────────

export interface WeakWordItem {
  id: string
  text: string
  itemType: 'word' | 'chunk'
  masteryRate: number
  errorRate: number
  affectedStudentCount: number
  mainErrorType: VocabularyErrorType
  errorTypes: { type: VocabularyErrorType; label: string; percent: number }[]
  typicalMistakes: TypicalMistake[]
  sourceTasks: string[]
  aiReason: string
  recommendedActions: string[]
  priorityScore: number
}

// ── Typical Mistake Detail ──────────────────────────────

export interface TypicalMistake {
  studentId: string
  studentName: string
  questionContext: string
  studentAnswer: string
  correctAnswer: string
  errorType: VocabularyErrorType
  sourceTaskName: string
  sourceTime: string
}

// ── Student Insight ─────────────────────────────────────

export interface WeakStudentItem {
  id: string
  name: string
  masteryRate: number
  weakWords: string[]
  mainErrorTypes: string[]
  typicalContext: string
  recentTrend: 'declining' | 'stable' | 'improving'
  recommendedActions: string[]
  weaknessPriorityScore: number
  errorTypeDistribution: { type: VocabularyErrorType; label: string; percent: number }[]
  weakWordDetails: WeakWordItem[]
}

export interface GoodStudentItem {
  id: string
  name: string
  masteryRate: number
  masteredCount: number
  highlight: string
  stability: 'stable' | 'improving'
}

// ── Intervention Record ─────────────────────────────────

export interface InterventionRecord {
  id: string
  time: string
  type: string
  name: string
  target: string
  taskCount: number
  status: '进行中' | '已完成' | '部分完成'
  completionSummary: string
  effectSummary: EffectSummary
}

export interface EffectSummary {
  beforeMasteryRate: number
  afterMasteryRate: number
  stillWeakWords: string[]
  improvedStudents: number
  needMorePracticeStudents: number
  suggestion: string
}

// ── Review Plan ─────────────────────────────────────────

export type ReviewGoal = 'quick_fix' | 'current_unit' | 'stage_exam' | 'weak_student' | 'custom'

export const REVIEW_GOAL_META: Record<ReviewGoal, { label: string; desc: string; defaultDays: number; defaultWordCount: number }> = {
  quick_fix: { label: '快速巩固近期错词', desc: '集中巩固近期的薄弱词汇和语块，快速提升掌握率。', defaultDays: 3, defaultWordCount: 30 },
  current_unit: { label: '当前单元词汇复习', desc: '针对当前教学单元的课标词和非课标词进行系统复习。', defaultDays: 7, defaultWordCount: 50 },
  stage_exam: { label: '阶段 / 考前词汇复习', desc: '覆盖多单元和课标词汇的阶段性综合复习，适合期中期末或考前冲刺。', defaultDays: 14, defaultWordCount: 80 },
  weak_student: { label: '薄弱学生补练', desc: '针对词汇掌握率偏低的学生进行个性化补练和强化训练。', defaultDays: 7, defaultWordCount: 30 },
  custom: { label: '自定义复习规划', desc: '自由组合词汇范围、练习频次和复习策略，满足个性化教学需求。', defaultDays: 7, defaultWordCount: 50 },
}

// ── Vocabulary Scope ────────────────────────────────────

export type VocabScopeId = 'error_words' | 'sync_unit' | 'platform_extended'

export const VOCAB_SCOPE_OPTIONS: { id: VocabScopeId; label: string; desc: string }[] = [
  { id: 'error_words',       label: '错词时间范围',  desc: '基于选定时间段内的错词' },
  { id: 'sync_unit',         label: '同步单元词汇',  desc: '选择教学单元对应的课标词及非课标词' },
  { id: 'platform_extended', label: '拓展词汇',      desc: '平台上的词汇专题和考纲词表' },
]

// ── Extended Vocab Sub-Options ─────────────────────────

export const EXTENDED_VOCAB_OPTIONS = [
  '不规则动词',
  '中考必会词汇和短语',
  '中考课标1600词话题分类',
  '课标3500词',
] as const

export type ExtendedVocabItem = typeof EXTENDED_VOCAB_OPTIONS[number]

// ── Sync Units ─────────────────────────────────────────

export const SYNC_UNITS = [
  'Unit 1', 'Unit 2', 'Unit 3', 'Unit 4',
  'Unit 5', 'Unit 6', 'Unit 7', 'Unit 8',
] as const

export type SyncUnit = typeof SYNC_UNITS[number]

export interface ReviewPlanConfig {
  goal: ReviewGoal
  dayCount: number
  wordsPerDay: number
  reviewScope: string
  targetStudents: string
  strategy: string
  aiReason: string
}

export interface ReviewPlanTask {
  id: string
  checked: boolean
  name: string
  contentScope: string
  taskType: string
  targetType: 'class' | 'group' | 'student'
  targetName: string
  scheduledTime: string
  deadline: string
  editable: boolean
}

// ── Top-Level Data Structure ────────────────────────────

export interface VocabularyInsightData {
  classId: string
  className: string
  unitId: string
  unitName: string
  timeRange: TimeRange
  updatedAt: string
  summary: string
  metrics: VocabularyMetrics
  errorTypes: ErrorTypeItem[]
  weakWords: WeakWordItem[]
  weakStudents: WeakStudentItem[]
  goodStudents: GoodStudentItem[]
  interventionRecords: InterventionRecord[]
}

// ── Low-value word types to filter out ──────────────────

export const LOW_VALUE_WORD_TYPES = [
  'pronoun',
  'preposition',
  'article',
  'numeral',
  'proper_noun',
  'interjection',
  'abbreviation',
  'affix',
  'letter',
  'other_low_value',
] as const

export type LowValueWordType = typeof LOW_VALUE_WORD_TYPES[number]

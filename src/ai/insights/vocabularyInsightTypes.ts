/**
 * AI 词汇洞察 — Type Definitions（规则引擎版）
 *
 * 一期不接大模型，所有洞察/归因/推荐均由规则引擎+统计规则实现。
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

/** PRD §6.2 仅定义 4 个时间范围选项 */
export type TimeRange = '7d' | '14d' | '30d' | 'current_unit'

export const TIME_RANGE_LABELS: Record<TimeRange, string> = {
  '7d': '近7天', '14d': '近14天', '30d': '近30天',
  current_unit: '当前单元',
}

// ── 4 类平台归因 ───────────────────────────────────────

export type VocabularyErrorType = 'new_word' | 'pronunciation' | 'spelling' | 'contextual_usage'

export const ERROR_TYPE_META: Record<VocabularyErrorType, { label: string; borderColor: string; bgColor: string; desc: string }> = {
  spelling:          { label: '不会写', borderColor: '#f0a060', bgColor: '#fef8f0', desc: '拼写错误、漏写、默写错误、格式不规范' },
  pronunciation:     { label: '读不准', borderColor: '#e55',    bgColor: '#fef0f0', desc: '听辨困难、发音不准、跟读或听写场景中识别错误' },
  new_word:          { label: '生词',   borderColor: '#7b9cd6', bgColor: '#f0f4fc', desc: '不认识词义、英汉匹配错误、词义理解不稳定' },
  contextual_usage:  { label: '不会用', borderColor: '#4b9fe8', bgColor: '#f0f6fc', desc: '语境使用错误、搭配不当、词形变化不准确' },
}

export type IssueType = '生词' | '读不准' | '不会写' | '不会用'

// ══════════════════════════════════════════════════════════════
// Rule Engine Configuration
// ══════════════════════════════════════════════════════════════

export const VOCAB_ISSUE_RULES = {
  issueTypes: ['生词', '读不准', '不会写', '不会用'] as IssueType[],

  typeDescriptions: {
    '生词':   '不认识 / 不熟悉词义',
    '读不准': '发音问题 / 辨音问题',
    '不会写': '拼写错误 / 漏写 / 默写错误 / 格式错误',
    '不会用': '语用问题 / 语境使用问题 / 搭配问题',
  } as Record<IssueType, string>,

  /** 题型 → 归因映射 */
  taskTypeMapping: {
    '生词':   ['英汉匹配', '中英互译', '词义选择', '单词认读', '词义理解题'],
    '读不准': ['听力题', '听取信息题', '跟读题', '配音题', '语音识别练习'],
    '不会写': ['默写', '听写', '单词填空', '英文输入题', '单词拼写'],
    '不会用': ['语篇填空', '选词填空', '完形填空', '写作', '句子翻译', '词形变化题', '固定搭配题'],
  } as Record<IssueType, string[]>,

  /** 答案比对辅助规则 */
  answerComparisonRules: [
    { condition: '答案为空或完全不相关', rule: '按题型归因' },
    { condition: '相似但有字母缺失/替换/顺序错误', rule: '不会写' },
    { condition: '忽略大小写/空格/标点后接近正确答案', rule: '不会写' },
    { condition: '写成另一个词库内英文词但语境不正确', rule: '不会用' },
    { condition: '听力/跟读来源中出现音近词或听辨错误', rule: '读不准' },
  ],

  /** 严重程度规则 — 按错误率划分（PRD §8.9） */
  severityRules: {
    '极高': { minErrorRate: 70, desc: '错误率 ≥ 70%' },
    '高':   { minErrorRate: 50, desc: '错误率 50–70%' },
    '中':   { minErrorRate: 30, desc: '错误率 30–50%' },
    '低':   { minErrorRate: 0,  desc: '错误率 < 30%' },
  },

  /** 归因分析文案模板 */
  reasonTemplates: {
    '生词':   '该词在词义理解类题目中错误较多，学生对词义不熟悉，建议先进行认读和释义巩固。',
    '读不准': '该词主要来自听力、听取信息或跟读类练习，学生在听辨或发音环节错误较多，建议结合音频进行跟读和辨音训练。',
    '不会写': '该词在默写、听写或英文输入类题目中错误较多，主要表现为拼写错误、漏写或格式不规范，建议进行默写和拼写巩固。',
    '不会用': '该词在语境应用类题目中错误较多，学生对搭配、词形或语境使用掌握不稳定，建议结合例句和语篇练习巩固。',
  } as Record<IssueType, string>,

  /** 推荐干预动作规则 */
  recommendationRules: {
    '生词':   ['加入复习方案', '词义认读练习'],
    '读不准': ['发起课后PK', '布置跟读练习', '加入复习方案'],
    '不会写': ['生成默写单', '加入复习方案', '听写巩固'],
    '不会用': ['布置语境练习', '加入复习方案', '例句语篇巩固'],
  } as Record<IssueType, string[]>,
}

// ── Helper ──────────────────────────────────────────────

export function getIssueTypeFromErrorType(et: VocabularyErrorType): IssueType {
  return ERROR_TYPE_META[et]?.label as IssueType || '不会写'
}

export function getReasonForIssue(et: VocabularyErrorType): string {
  const issue = getIssueTypeFromErrorType(et)
  return VOCAB_ISSUE_RULES.reasonTemplates[issue] || ''
}

// ── Severity ──────────────────────────────────────────

export type Severity = '极高' | '高' | '中' | '低'

/** 按错误率计算严重程度（PRD §8.9） */
export function calcSeverity(errorRate: number): Severity {
  const rules = VOCAB_ISSUE_RULES.severityRules
  if (errorRate >= rules['极高'].minErrorRate) return '极高'
  if (errorRate >= rules['高'].minErrorRate) return '高'
  if (errorRate >= rules['中'].minErrorRate) return '中'
  return '低'
}

export const SEVERITY_STYLES: Record<Severity, { bg: string; text: string; border: string }> = {
  '极高': { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
  '高':   { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
  '中':   { bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-200' },
  '低':   { bg: 'bg-slate-50', text: 'text-slate-400', border: 'border-slate-200' },
}

// ── Error Type Item ─────────────────────────────────────

export interface ErrorTypeItem {
  type: VocabularyErrorType
  label: string
  percent: number
  desc?: string
  affectedStudentCount: number
  exampleWords: string[]
  aiReason: string
  recommendedActions: string[]
  borderColor: string
  bgColor: string
}

// ── Wrong Form / Evidence ──────────────────────────────

export interface WrongForm {
  text: string
  students: number
  count: number
}

/** 错音（PRD §9.2）— 与常见错误写法分开展示 */
export interface MispronunciationItem {
  /** 错误读音 / 错读形式 */
  text: string
  /** 涉及学生数 */
  students: number
  /** 出现次数 */
  count: number
}

export interface ErrorEvidence {
  studentName: string
  /** 学生 ID — 查看原题接口入参 */
  studentId?: string
  source: string
  wrongAnswer: string
  correctAnswer: string
  question?: string
  questionId?: string
  questionType?: string
  date?: string
  /** 作答记录 ID — 查看原题接口优先使用，避免同一学生同一题多次作答时取错记录 */
  answerRecordId?: string
  /** 关联词汇 ID — 查看原题接口入参 */
  wordId?: string
}

// ── Intervention Recommendation ───────────────────────

export interface InterventionRecommendation {
  id: string
  title: string
  content: string
  actionLabel: string
  actionDesc: string
  targetWords?: string[]
}

// ── Core Metrics ──────────────────────────────────────

export interface VocabularyMetrics {
  practicedWordCount: number
  weakWordCount: number
  weakStudentCount: number
  mainWeakType: string
}

// ── Weak Word Item ────────────────────────────────────

export interface WeakWordItem {
  id: string
  /** 平台词汇唯一标识 — 用于去重，由后端返回 */
  wordId?: string
  text: string
  itemType: 'word' | 'chunk'
  scoreRate: number
  errorRate: number
  errorCount?: number
  affectedStudentCount: number
  mainErrorType: VocabularyErrorType
  /** 多标签：可能同时涉及多个归因类型 */
  issueTypes?: VocabularyErrorType[]
  errorTypes: { type: VocabularyErrorType; label: string; percent: number }[]
  typicalMistakes: TypicalMistake[]
  sourceTasks: string[]
  aiReason: string
  recommendedActions: string[]
  priorityScore: number
  severity?: Severity
  wrongForms?: WrongForm[]
  /** 错音列表（PRD §9.2）— 与常见错误写法分开展示 */
  mispronunciations?: MispronunciationItem[]
  evidences?: ErrorEvidence[]
  /** 练习来源类型 */
  source?: string
  /** 该词所有有效作答小题实际得分之和（聚合用） */
  totalActualScore?: number
  /** 该词所有有效作答小题满分之和（聚合用） */
  totalFullScore?: number
}

// ── Typical Mistake Detail ────────────────────────────

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

// ── Student Insight ───────────────────────────────────

export interface WeakStudentItem {
  id: string
  name: string
  scoreRate: number
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
  scoreRate: number
  masteredCount: number
  highlight: string
  stability: 'stable' | 'improving'
}

// ── Intervention Record ───────────────────────────────

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
  beforeScoreRate: number
  afterScoreRate: number
  stillWeakWords: string[]
  improvedStudents: number
  needMorePracticeStudents: number
  suggestion: string
}

// ── Review Plan ────────────────────────────────────────

export type ReviewGoal = 'quick_fix' | 'current_unit' | 'stage_exam' | 'weak_student' | 'custom'

export const REVIEW_GOAL_META: Record<ReviewGoal, { label: string; desc: string; defaultDays: number; defaultWordCount: number; defaultRollback: number; masteryRule: string; defaultReviewDays: number[] }> = {
  quick_fix:    { label: '快速巩固近期错词', desc: '基于当前页面筛选范围内的高频错词，优先复习错误率高、影响学生多、错误次数多的词。', defaultDays: 5,  defaultWordCount: 30, defaultRollback: 2, masteryRule: '连续答对 2 次', defaultReviewDays: [1, 3, 5] },
  current_unit: { label: '当前单元词汇复习', desc: '围绕当前教材单元词汇进行系统复习，包含课标词、非课标词和当前单元易错词。', defaultDays: 7,  defaultWordCount: 50, defaultRollback: 2, masteryRule: '连续答对 2 次', defaultReviewDays: [1, 3, 5, 7] },
  stage_exam:   { label: '阶段 / 考前复习',   desc: '支持选择多个单元或阶段范围，结合阶段高频错词和重点词进行复习。',               defaultDays: 14, defaultWordCount: 50, defaultRollback: 2, masteryRule: '累计答对 3 次', defaultReviewDays: [1, 3, 5, 7, 9, 11, 13] },
  weak_student: { label: '薄弱学生补练',     desc: '面向薄弱学生生成个性化补练，不默认生成全班统一复习计划。',                       defaultDays: 7,  defaultWordCount: 30, defaultRollback: 2, masteryRule: '连续答对 2 次', defaultReviewDays: [1, 3, 5, 7] },
  custom:       { label: '自定义复习规划',    desc: '自由组合词汇来源、练习频次和复习策略。',                                         defaultDays: 7,  defaultWordCount: 50, defaultRollback: 2, masteryRule: '连续答对 2 次', defaultReviewDays: [1, 3, 5, 7] },
}

export type VocabScopeId = 'error_words' | 'sync_unit' | 'platform_extended'

export const VOCAB_SCOPE_OPTIONS: { id: VocabScopeId; label: string; desc: string }[] = [
  { id: 'error_words',       label: '错词范围',      desc: '基于选定时间段内的错词' },
  { id: 'sync_unit',         label: '同步单元词汇',  desc: '选择教学单元对应的课标词及非课标词' },
  { id: 'platform_extended', label: '拓展词汇',      desc: '平台上的词汇专题和考纲词表' },
]

export const EXTENDED_VOCAB_OPTIONS = [
  '不规则动词', '中考必会词汇和短语', '中考课标1600词话题分类', '课标3500词',
] as const

export type ExtendedVocabItem = typeof EXTENDED_VOCAB_OPTIONS[number]

export const SYNC_UNITS = ['Unit 1','Unit 2','Unit 3','Unit 4','Unit 5','Unit 6','Unit 7','Unit 8'] as const
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
  id: string; checked: boolean; name: string; contentScope: string; taskType: string
  targetType: 'class' | 'group' | 'student'; targetName: string
  scheduledTime: string; deadline: string; editable: boolean
}

// ── Top-Level Data Structure ────────────────────────────

export interface VocabularyInsightData {
  classId: string; className: string; unitId: string; unitName: string
  timeRange: TimeRange; updatedAt: string; summary: string
  metrics: VocabularyMetrics
  errorTypes: ErrorTypeItem[]
  weakWords: WeakWordItem[]
  weakStudents: WeakStudentItem[]
  goodStudents: GoodStudentItem[]
  interventionRecords: InterventionRecord[]
  recommendations?: InterventionRecommendation[]
  summaryStats?: {
    studentCount: number; errorRecordCount: number; practicedWordCount: number
    highFrequencyWordCount: number; weakStudentCount: number; mainWeakType: string
  }
  /** 4 大词汇能力维度得分 (0-100) */
  abilityScores?: Record<string, number>
}

// ── Low-value word types to filter out ──────────────────

export const LOW_VALUE_WORD_TYPES = [
  'pronoun','preposition','article','numeral','proper_noun',
  'interjection','abbreviation','affix','letter','other_low_value',
] as const

export type LowValueWordType = typeof LOW_VALUE_WORD_TYPES[number]

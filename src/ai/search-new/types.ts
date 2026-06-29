/**
 * AI Search V2 — Type Definitions
 *
 * 新 AI 搜索模块的完整类型系统。
 * 支持三类搜索：资源类型搜索、具体试卷名称搜索、功能入口搜索。
 * 与现有 src/ai/search/types.ts 独立，互不依赖。
 */

// ── Search Type ─────────────────────────────────────────

export type SearchType =
  | 'resource'        // 资源类型搜索
  | 'paper_name'      // 具体试卷名称搜索
  | 'function_entry'  // 功能入口搜索
  | 'unknown'         // 无法识别

// ── Resource Type Tags (for filter tabs) ────────────────

/** Resource category used in filter tabs and group labels */
export type SearchResourceCategory =
  | 'sync_vocab'        // 同步词汇
  | 'sync_text'         // 同步课文
  | 'sync_listening'    // 同步听力
  | 'listening_practice' // 听力练习
  | 'speaking_practice' // 听说练习
  | 'listening_mock'    // 听力模拟
  | 'vocab_practice'    // 词汇练习
  | 'grammar_practice'  // 语法专项
  | 'writing_practice'  // 写作练习
  | 'reading_practice'  // 阅读练习
  | 'comprehensive'     // 综合练习
  | 'unit_test'         // 单元检测
  | 'stage_test'        // 阶段测试
  | 'mock_exam'         // 模拟题
  | 'real_exam'         // 真题
  | 'special'           // 专项
  | 'dubbing'           // 配音
  | 'sync_video'        // 同步视频
  | 'exam_sprint'       // 考前冲刺
  | 'regional_select'   // 区域精选
  | 'function'          // 功能入口

export const searchResourceCategoryLabel: Record<SearchResourceCategory, string> = {
  sync_vocab: '同步词汇',
  sync_text: '同步课文',
  sync_listening: '同步听力',
  listening_practice: '听力练习',
  speaking_practice: '听说练习',
  listening_mock: '听力模拟',
  vocab_practice: '词汇练习',
  grammar_practice: '语法专项',
  writing_practice: '写作练习',
  reading_practice: '阅读练习',
  comprehensive: '综合练习',
  unit_test: '单元检测',
  stage_test: '阶段测试',
  mock_exam: '模拟题',
  real_exam: '真题',
  special: '专项',
  dubbing: '配音',
  sync_video: '同步视频',
  exam_sprint: '考前冲刺',
  regional_select: '区域精选',
  function: '功能入口',
}

// ── Filter Tab ──────────────────────────────────────────

export interface FilterTab {
  category: SearchResourceCategory | 'all'
  label: string
  count: number
}

// ── Resource Group Type ─────────────────────────────────

export type ResourceGroupType =
  | 'resource'          // 普通资源组
  | 'sync_vocab'        // 同步词汇（内容选择型）
  | 'sync_text'         // 同步课文（内容选择型）
  | 'function'          // 功能入口组
  | 'paper'             // 试卷组
  | 'alternative'       // 替代推荐组
  | 'my_content'        // 我的内容（词表/答题卡/试卷）
  | 'dictation_func'    // 听写功能入口（轻量级）
  | 'dictation_vocab'   // 听写场景下的单元词汇

// ── Resource Item ───────────────────────────────────────

export interface ResourceItem {
  id: string
  title: string
  type: SearchResourceCategory
  tags: string[]
  /** Metadata row: question count, duration, difficulty, grade, source */
  questionCount?: number
  duration?: string
  difficulty: 'basic' | 'medium' | 'advanced'
  grade: string
  source?: string
  /** Whether this matches the current unit */
  isCurrentUnit: boolean
  /** AI-generated recommendation reason (can be null for sync vocab/text) */
  recommendReason?: string
  /** Action availability */
  canPreview: boolean
  canAssign: boolean
  /** @deprecated 本期智能搜索不支持试卷篮 */
  canAddToPaperBasket?: boolean
  canAddToLessonPrep: boolean
  /** For dubbing/video — show "加入备课" button */
  isLessonPrepResource: boolean
  /** Whether "进入" button should be shown (for 课本) */
  canEnter?: boolean
  /** Content data for sync vocab/text resources */
  contentData?: SyncVocabData | SyncTextData
  /** Paper metadata (for paper_name search) */
  paperMeta?: PaperMeta
}

// ── Resource Group ──────────────────────────────────────

export interface ResourceGroup {
  groupId: string
  groupName: string
  groupType: ResourceGroupType
  /** Is this a primary/precise match? (vs recommendation) */
  isPrimaryMatch: boolean
  /** Should the group be expanded by default? */
  defaultExpanded: boolean
  /** Recommendation text shown below group header */
  recommendationText?: string
  /** Items in this group */
  items: ResourceItem[]
  /** How many items to show before "查看全部" */
  displayLimit: number
  /** Category hint for filter matching */
  matchCategory?: SearchResourceCategory
  /** Label for alternative recommendations: 当前单元/同年级推荐/非当前单元 */
  altLabel?: '当前单元' | '同年级推荐' | '非当前单元'
  /** Override tab labels for items in this group. Maps item.type → display label. */
  tabLabelOverrides?: Record<string, string>
  /** Per-group tab key — when set, the tab represents this whole group rather than individual item types.
   *  Enables distinct tabs for groups whose items share the same type (e.g. my_content vs function). */
  tabKey?: string
}

// ── Sync Vocab Data ─────────────────────────────────────

export interface VocabWord {
  id: string
  word: string
  chinese: string
  phonetic?: string
  pos?: string  // part of speech
}

export interface ChunkItem {
  id: string
  text: string
  translation: string
}

export interface VocabSection {
  sectionId: string
  sectionName: string  // e.g. "词汇", "语块", "固定搭配"
  items: (VocabWord | ChunkItem)[]
  selectedIds: string[]
  defaultLimit: number
  expanded: boolean
}

export interface SyncVocabData {
  sections: VocabSection[]
}

// ── Sync Text Data ──────────────────────────────────────

export interface TextItem {
  id: string
  title: string
  /** Type of passage, e.g. "对话", "短文", "故事" */
  passageType?: string
}

export interface TextTreeNode {
  nodeId: string
  nodeName: string
  /** Is this a leaf node? (leaf nodes hold items) */
  isLeafNode: boolean
  /** Child nodes (for non-leaf) */
  children: TextTreeNode[]
  /** Items (empty for non-leaf nodes) */
  items: TextItem[]
  selectedIds: string[]
  defaultLimit: number
  expanded: boolean
}

export interface SyncTextData {
  tree: TextTreeNode[]
}

// ── Usage Options ───────────────────────────────────────

export interface UsageOption {
  id: string
  label: string
  /** Whether this usage is available for the current selection */
  available: boolean
  /** Why it's unavailable (shown in tooltip/disabled state) */
  unavailableReason?: string
}

/** Vocab usage option IDs */
export type VocabUsageId =
  | 'word_practice'      // 单词
  | 'usage_practice'     // 用法
  | 'oral_reading'     // 口语跟读
  | 'en_to_cn_select'  // 看英选中
  | 'dictation_write'  // 单词默写
  | 'cn_to_en_select'  // 看中选英
  | 'listening_dictation' // 单词听写
  | 'listen_recognize' // 听音识词

/** Text usage option IDs */
export type TextUsageId =
  | 'sentence_reading'  // 逐句跟读
  | 'passage_reading'   // 整篇跟读
  | 'passage_recite'    // 整篇背诵

export const VOCAB_USAGES: UsageOption[] = [
  { id: 'word_practice', label: '单词', available: true },
  { id: 'usage_practice', label: '用法', available: true },
  { id: 'oral_reading', label: '口语跟读', available: true },
  { id: 'en_to_cn_select', label: '看英选中', available: true },
  { id: 'dictation_write', label: '单词默写', available: true },
  { id: 'cn_to_en_select', label: '看中选英', available: true },
  { id: 'listening_dictation', label: '单词听写', available: true },
  { id: 'listen_recognize', label: '听音识词', available: true },
]

export const TEXT_USAGES: UsageOption[] = [
  { id: 'sentence_reading', label: '逐句跟读', available: true },
  { id: 'passage_reading', label: '整篇跟读', available: true },
  { id: 'passage_recite', label: '整篇背诵', available: true },
]

// ── Assignment Generation ───────────────────────────────

export interface AssignmentDraft {
  id: string
  /** Editable assignment name */
  title: string
  /** The leaf node this assignment is for (for text assignments) */
  nodeName?: string
  /** Usage type */
  usageType: VocabUsageId | TextUsageId
  /** Usage label */
  usageLabel: string
  /** Number of content items */
  contentCount: number
  /** Content item IDs */
  contentIds: string[]
}

export interface AssignmentSettings {
  className: string
  publishTarget: string
  startTime: string
  deadline: string
  scorePublish: 'after_deadline' | 'immediate' | 'never'
  allowLateSubmission: boolean
}

// ── Generated Assignment Result ─────────────────────────

export interface GeneratedAssignment {
  id: string
  title: string
  nodeName?: string
  usageType: string
  usageLabel: string
  contentCount: number
  className: string
  deadline: string
}

// ── Function Entry ──────────────────────────────────────

export interface FunctionEntry {
  id: string
  name: string
  keywords: string[]
  category: string
  recommendReason: string
  /** What happens on click */
  actionType: 'navigate' | 'open_drawer' | 'open_function' | 'open_page'
  /** Target for navigation / function opening */
  openTarget?: string
}

// ── Paper Meta ──────────────────────────────────────────

export interface PaperMeta {
  province?: string
  year?: string
  examType?: string  // 中考/高考/期中/期末/模拟
  subject?: string
  paperType: 'real' | 'mock' | 'unit_test' | 'stage_test'
  /** Match level: exact / near / related */
  matchLevel: 'exact' | 'near' | 'related'
  /** Explanation of match difference */
  matchNote?: string
}

// ── Alternative Recommendation ──────────────────────────

export interface AlternativeRecommendation {
  label: '当前单元' | '同年级推荐' | '非当前单元'
  items: ResourceItem[]
}

// ── Quick Entry (for unrecognized queries) ──────────────

export interface QuickEntry {
  id: string
  title: string
  description: string
  icon: string  // Lucide icon name
  /** Quick search query to trigger */
  searchQuery: string
}

// ── Search Intent Summary ───────────────────────────────

export interface SearchIntentInfo {
  query: string
  recognizedIntent: string
  searchType: SearchType
  context: string
  matchedTypes: SearchResourceCategory[]
  expandedTypes: SearchResourceCategory[]
  foldedTypes: SearchResourceCategory[]
  message: string
}

// ── Top-Level Search Result ──────────────────────────────

export interface NewSearchResult {
  /** Intent info for summary display */
  intent: SearchIntentInfo
  /** Filter tabs (only show tabs with results) */
  filterTabs: FilterTab[]
  /** Resource groups (sorted: primary matches first, then recommendations) */
  resourceGroups: ResourceGroup[]
  /** Function entries (for function_entry search) */
  functionEntries: FunctionEntry[]
  /** Alternative recommendations (for no-results scenarios) */
  alternatives?: AlternativeRecommendation[]
  /** Quick entry points (for completely unrecognizable queries) */
  quickEntries?: QuickEntry[]
  /** Whether this is a no-results scenario */
  isNoResults: boolean
  /** Whether this is completely unrecognizable */
  isUnrecognizable: boolean
}

// ── Search Context ──────────────────────────────────────

export interface SearchContext {
  textbook: string
  unit: string
  grade: string
  className: string
  region?: string
  studentCount: number
}

// ── V1.1 Enhanced Types ──────────────────────────────────

/** Precision jump intent types */
export type PrecisionJumpIntent = 'report' | 'wrong_question' | 'lesson_prep' | 'vocab_insight'

/** Precision jump card data — shown when query matches an intent that search doesn't directly handle */
export interface PrecisionJumpData {
  intent: PrecisionJumpIntent
  title: string
  description: string
  buttonText: string
  /** Route to navigate to. null if route is not yet confirmed (TODO). */
  route: string | null
  routeConfirmed: boolean
}

/** Search suggestion chip shown in unrecognized fallback */
export interface SearchSuggestion {
  text: string
  query: string
}

/** Common function entry shown in unrecognized fallback */
export interface CommonFunction {
  key: string
  label: string
  query: string
}

/** V1.1 enhanced search result — wraps v1.0 NewSearchResult with additional metadata */
export interface EnhancedSearchResult {
  /** Original v1.0 result (preserved for compatibility) */
  original: NewSearchResult
  /** AI understanding text shown at top of results */
  aiUnderstandingText: string
  /** Smart match recommendation groups (was: primary/precise match groups) */
  smartMatchGroups: ResourceGroup[]
  /** Smart related recommendation groups (was: recommendation/alternative groups) */
  smartRelatedGroups: ResourceGroup[]
  /** Whether this is a precision jump (intercepted before search) */
  isPrecisionJump: boolean
  /** Precision jump data (only when isPrecisionJump is true) */
  precisionJump?: PrecisionJumpData
}

/** Search loading step */
export interface LoadingStep {
  text: string
  duration: number
}

// ── Mock Action Results ─────────────────────────────────

export interface MockActionResult {
  type: 'preview' | 'assign' | 'lesson_prep' | 'function'
  message: string
  resource?: ResourceItem
  entry?: FunctionEntry
}

// ── Resource Types ─────────────────────────────────────

export type ResourceType =
  | 'listening'      // 听力
  | 'speaking'       // 听说/口语
  | 'reading'        // 阅读
  | 'current_news'   // 时文
  | 'dubbing'        // 配音
  | 'video'          // 视频
  | 'vocabulary'     // 词汇
  | 'writing'        // 写作
  | 'grammar'        // 语法
  | 'courseware'     // 课件
  | 'exercise'       // 练习卷
  | 'exam_paper'     // 试卷

// ── Teaching Goal ──────────────────────────────────────

export type TeachingGoal =
  | 'warm_up'        // 课前导入
  | 'class_practice' // 课堂练习
  | 'consolidation'  // 课后巩固
  | 'unit_review'    // 单元复习
  | 'exam_prep'      // 考前冲刺

// ── AI Task ────────────────────────────────────────────

export type AITask =
  | 'generate_quiz'        // 出题
  | 'correct_essay'        // 批改
  | 'analyze'              // 分析
  | 'recommend'            // 推荐
  | 'summarize'            // 总结
  | 'generate_dictation'   // 词汇听写/默写
  | 'generate_exercise'    // 生成练习
  | 'teach_word'           // 讲词

// ── Section ────────────────────────────────────────────

export type SchoolSection = 'junior' | 'senior' | 'zhongkao'

// ── Region ─────────────────────────────────────────────

export type Region = 'default' | 'guangdong' | 'jiangsu' | 'zhejiang' | 'beijing' | 'shanghai'

// ── Region config ──────────────────────────────────────

export interface RegionConfig {
  region: Region
  label: string
  listeningWeight: number   // 听力权重
  speakingWeight: number    // 听说/口语权重
  readingWeight: number     // 阅读权重
  priorityResourceTypes: ResourceType[]
}

// ── Parsed Intent ──────────────────────────────────────

export interface ParsedIntent {
  /** Original raw query */
  raw: string

  /** Detected resource type(s), ordered by confidence */
  resourceTypes: ResourceType[]

  /** Detected teaching goal */
  teachingGoal: TeachingGoal | null

  /** Detected AI task */
  aiTask: AITask | null

  /** Extracted entities */
  entities: SearchEntities

  /** Overall confidence 0–1 */
  confidence: number

  /** Intent routing target */
  route: 'resource' | 'ai_action' | 'teaching_suggestion' | 'ambiguous'

  /** Debug: why this intent was chosen */
  explanation: string
}

export interface SearchEntities {
  /** Extracted grade, e.g. "八上", "七年级下", "中考" */
  grade: string | null

  /** Extracted unit, e.g. "Unit 3", "第二单元" */
  unit: string | null

  /** Extracted textbook, e.g. "人教版", "外研版" */
  textbook: string | null

  /** Extracted keywords */
  keywords: string[]

  /** Extracted exam type, e.g. "中考", "高考", "模拟" */
  examType: string | null

  /** Number of items if specified, e.g. "20个", "10道" */
  quantity: number | null

  /** Specific topic mentioned, e.g. "环保", "节日" */
  topic: string | null
}

// ── Search Context ─────────────────────────────────────

export interface SearchContext {
  /** Teacher's current textbook */
  textbook: string

  /** Teacher's current unit */
  unit: string

  /** Teacher's current grade */
  grade: string

  /** Teacher's school section */
  section: SchoolSection

  /** Teacher's region for strategy */
  region: Region

  /** Current class name */
  className: string

  /** Recent searches */
  recentSearches: string[]

  /** Trending searches in same textbook/grade */
  trendingSearches: string[]
}

// ── Search Result ──────────────────────────────────────

export interface ResourceResult {
  id: string
  title: string
  type: ResourceType
  teachingGoal: TeachingGoal
  format: string
  duration?: string
  size?: string
  difficulty: 'basic' | 'medium' | 'advanced'
  grade: string
  unit: string
  textbook: string
  description: string
  aiReason: string
  tags: string[]
  /** Whether it matches the current textbook context */
  matchesContext: boolean
}

export interface AIActionResult {
  id: string
  title: string
  task: AITask
  description: string
  aiReason: string
  estimatedTime: string
  outputType: string
  tags: string[]
  matchesContext: boolean
  /** Resource types this action is relevant to. Empty array = relevant to all. */
  relevantResourceTypes?: ResourceType[]
  /** Teaching goals this action is relevant to. Empty array = relevant to all. */
  relevantGoals?: TeachingGoal[]
}

export interface TeachingSuggestionResult {
  id: string
  title: string
  description: string
  targetGrade: string
  targetUnit: string
  teachingStage: string
  estimatedTime: string
  aiReason: string
  tags: string[]
  matchesContext: boolean
}

// ── Search Response ────────────────────────────────────

export interface SearchResponse {
  intent: ParsedIntent
  resources: ResourceResult[]
  aiActions: AIActionResult[]
  suggestions: TeachingSuggestionResult[]
  contextualNote: string
}

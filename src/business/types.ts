/**
 * Business Integration Layer — Type Definitions
 *
 * 业务层类型：将 AI 能力连接到真实教师工作流。
 * 不是 AI infra 抽象，而是教学业务实体。
 */

// ── Business Resource Types ─────────────────────────────

export type BusinessResourceType =
  | 'sync_practice'    // 同步练习
  | 'vocabulary'       // 词汇
  | 'listening'        // 听力
  | 'speaking'         // 听说/口语
  | 'reading'          // 阅读
  | 'writing'          // 写作
  | 'exam_paper'       // 试卷
  | 'themed_video'     // 主题视频
  | 'dubbing'          // 配音
  | 'classroom_pk'     // 课堂PK
  | 'wrong_book'       // 错题本
  | 'grammar'          // 语法

export const resourceTypeLabel: Record<BusinessResourceType, string> = {
  sync_practice: '同步练习',
  vocabulary: '词汇',
  listening: '听力',
  speaking: '听说',
  reading: '阅读',
  writing: '写作',
  exam_paper: '试卷',
  themed_video: '主题视频',
  dubbing: '配音',
  classroom_pk: '课堂PK',
  wrong_book: '错题本',
  grammar: '语法',
}

// ── Business Resource ──────────────────────────────────

export interface BusinessResource {
  id: string
  title: string
  type: BusinessResourceType
  grade: string
  unit: string
  textbook: string
  difficulty: 'basic' | 'medium' | 'advanced'
  duration: string
  format: string
  description: string
  tags: string[]
  /** Preview data for card display */
  preview: ResourcePreview
  /** Whether this matches current teaching context */
  matchesContext: boolean
  /** AI-generated recommendation reason */
  aiReason: AiRecommendationReason
  /** Can be added to practice basket */
  canAddToBasket: boolean
  /** Can be used for card-making (制卡) */
  canMakeCard: boolean
  /** Can be assigned directly */
  canAssign: boolean
}

export interface ResourcePreview {
  /** Preview type */
  type: 'text' | 'list' | 'stats'
  /** Quick preview content */
  summary: string
  /** Preview items (e.g. first 3 questions) */
  items?: Array<{ label: string; value: string }>
  /** Stats (e.g. 20 words, 10 questions) */
  stats?: Array<{ label: string; value: string }>
}

// ── AI Recommendation Reason ───────────────────────────

export interface AiRecommendationReason {
  /** Short reason for card display */
  short: string
  /** Detailed reason for drawer */
  detail: string
  /** Tags that explain the recommendation */
  factors: AiRecommendationFactor[]
}

export interface AiRecommendationFactor {
  type: 'weak_point' | 'exam_stage' | 'region' | 'class_level' | 'trend' | 'teacher_preference'
  label: string
  description: string
  /** How much this factor contributed (0-1) */
  weight: number
}

// ── Practice Basket ────────────────────────────────────

export interface PracticeBasketItem {
  id: string
  resource: BusinessResource
  addedAt: number
  /** Override settings set by teacher */
  overrides: {
    quantity?: number
    difficulty?: 'basic' | 'medium' | 'advanced'
    score?: number
    mode?: string
  }
  /** AI suggestion for this item */
  aiNote?: string
}

export interface PracticeBasket {
  items: PracticeBasketItem[]
  totalScore: number
  totalItems: number
  estimatedTime: string
}

// ── Assignment ─────────────────────────────────────────

export interface Assignment {
  id: string
  title: string
  type: 'homework' | 'practice' | 'quiz' | 'exam'
  resources: BusinessResource[]
  targetClass: string
  dueDate?: string
  totalScore: number
  estimatedTime: string
  status: 'draft' | 'published' | 'completed'
  aiGeneratedNote: string
}

// ── Wrong Word/Question Entry ──────────────────────────

export interface WrongWordEntry {
  word: string
  chinese: string
  errorCount: number
  commonMistake: string
  unit: string
  lastSeen: string
}

export interface WrongQuestionEntry {
  id: string
  type: string
  unit: string
  question: string
  answer: string
  errorCount: number
  correctRate: string
  knowledgePoint: string
}

// ── Teacher Activity ───────────────────────────────────

export interface TeacherActivity {
  id: string
  type: 'ai_recommend' | 'teacher_adjust' | 'assign' | 'complete' | 'review'
  title: string
  description: string
  timestamp: number
  resourceType?: BusinessResourceType
  targetClass?: string
}

// ── Resource Adapter Interface ─────────────────────────

export interface ResourceAdapter {
  /** Search resources by query and context */
  searchResources(query: string, context: ResourceSearchContext): Promise<BusinessResource[]>

  /** Get full resource detail */
  getResourceDetail(id: string): Promise<BusinessResource | null>

  /** Get quick preview without loading full detail */
  getResourcePreview(id: string): Promise<ResourcePreview | null>

  /** Generate practice from a resource */
  generatePracticeFromResource(resourceId: string, options: PracticeOptions): Promise<BusinessResource>
}

export interface ResourceSearchContext {
  grade: string
  unit: string
  textbook: string
  className: string
  region: string
  classLevel: string
  examStage: string
  weakPoints: string[]
}

export interface PracticeOptions {
  quantity: number
  difficulty: 'basic' | 'medium' | 'advanced'
  mode?: string
  includeAnswers?: boolean
}

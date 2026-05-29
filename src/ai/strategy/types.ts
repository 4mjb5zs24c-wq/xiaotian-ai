/**
 * Teaching Strategy Engine — Type Definitions
 *
 * AI 不是盲目执行任务，而是根据教学阶段、班级水平、地区考试、
 * 教师偏好等因素，自动决策采用什么教学策略。
 */

// ── Exam Stage ─────────────────────────────────────────

export type ExamStage =
  | 'normal'           // 日常教学
  | 'midterm'          // 期中备考
  | 'final'            // 期末备考
  | 'mock_exam'        // 模拟考
  | 'zhongkao_sprint'  // 中考冲刺
  | 'gaokao_sprint'    // 高考冲刺

// ── Class Level ────────────────────────────────────────

export type ClassLevel =
  | 'basic'     // 基础班 — 词汇+简单句型为主
  | 'normal'    // 普通班 — 同步教材进度
  | 'advanced'  // 提高班 — 拓展阅读+写作
  | 'sprint'    // 冲刺班 — 高频考点+真题

// ── Region ─────────────────────────────────────────────

export type StrategyRegion =
  | 'default'
  | 'guangdong'   // 广东：听说考试权重高
  | 'beijing'     // 北京：阅读+写作
  | 'jiangsu'     // 江苏：综合能力
  | 'zhejiang'    // 浙江：综合
  | 'shanghai'    // 上海：综合

// ── Strategy Action ────────────────────────────────────

export interface StrategyAction {
  type: StrategyActionType
  priority: number       // 1-10, higher = more important
  description: string
  params?: Record<string, unknown>
}

export type StrategyActionType =
  | 'recommend_vocab_review'       // 推荐词汇复习
  | 'recommend_listening'          // 推荐听力训练
  | 'recommend_speaking'           // 推荐口语/听说
  | 'recommend_reading'            // 推荐阅读训练
  | 'recommend_writing'            // 推荐写作训练
  | 'recommend_grammar'            // 推荐语法专项
  | 'generate_dictation'           // 生成默写/听写
  | 'generate_exam_paper'          // 生成试卷
  | 'reduce_difficulty'            // 降低难度
  | 'increase_difficulty'          // 提高难度
  | 'add_error_review'             // 加入错题复习
  | 'add_spoken_practice'          // 加入口语练习
  | 'add_timed_reading'            // 加入限时阅读
  | 'add_vocab_game'               // 加入词汇游戏
  | 'alert_risk_student'           // 提醒风险学生
  | 'suggest_review_plan'          // 建议复习计划

// ── Teaching Strategy ──────────────────────────────────

export interface TeachingStrategy {
  id: string
  name: string
  applicableGrades: string[]
  applicableScenes: string[]
  applicableRegions?: StrategyRegion[]
  applicableExamStages?: ExamStage[]
  applicableLevels?: ClassLevel[]
  goals: string[]
  actions: StrategyAction[]
}

// ── Strategy Plan (output of strategy engine) ──────────

export interface TeachingStrategyPlan {
  /** Which strategies are active */
  activeStrategies: TeachingStrategy[]
  /** Ordered list of recommended teaching actions */
  recommendedActions: StrategyAction[]
  /** Current exam stage */
  examStage: ExamStage
  /** Current class level */
  classLevel: ClassLevel
  /** Region-specific focus areas */
  regionFocus: string[]
  /** Risk alerts */
  riskAlerts: RiskAlert[]
  /** Teacher preference insights */
  teacherInsights: TeacherInsight[]
  /** Summary for display */
  summary: string
}

export interface RiskAlert {
  level: 'info' | 'warning' | 'critical'
  title: string
  description: string
  suggestedAction: string
}

export interface TeacherInsight {
  type: 'preference' | 'habit' | 'trend'
  description: string
  confidence: number
  source: string
}

// ── Class Profile (input to strategy engine) ───────────

export interface ClassProfile {
  grade: string
  className: string
  studentCount: number
  textbook: string
  currentUnit: string
  recentAvgScore: number
  weakPoints: Array<{ topic: string; errorRate: number }>
  strongPoints: string[]
  level: ClassLevel
  region: StrategyRegion
  examStage: ExamStage
}

// ── Trend Data ─────────────────────────────────────────

export interface SubjectTrend {
  subject: string
  direction: 'improving' | 'stable' | 'declining'
  changeRate: number  // e.g. +3 (improved 3%), -5 (declined 5%)
  dataPoints: Array<{ date: string; value: number }>
}

export interface TrendReport {
  vocabTrend: SubjectTrend
  listeningTrend: SubjectTrend
  readingTrend: SubjectTrend
  writingTrend: SubjectTrend
  overallTrend: SubjectTrend
  generatedAt: number
}

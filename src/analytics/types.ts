/**
 * Teacher Usage Analytics — Type Definitions
 *
 * 不是 AI infra 日志，而是真实教师行为追踪。
 */

// ── Event Types ────────────────────────────────────────

export type AnalyticsEventType =
  | 'ai_search'              // AI 搜索
  | 'insight_click'           // 点击 AI 洞察卡片
  | 'workflow_start'          // 启动 workflow
  | 'workflow_complete'       // workflow 完成
  | 'workflow_cancel'         // workflow 取消
  | 'workflow_step_drop'      // 在某个步骤退出
  | 'recommendation_accept'   // 接受了 AI 推荐
  | 'recommendation_reject'   // 拒绝了 AI 推荐
  | 'recommendation_modify'   // 修改了 AI 推荐
  | 'regenerate'              // 重新生成
  | 'edit_result'             // 编辑 AI 结果
  | 'assign_homework'         // 布置作业
  | 'open_review_panel'       // 打开审核面板
  | 'add_to_basket'           // 加入练习篮
  | 'export_resource'         // 导出资源
  | 'card_view'               // 查看卡片详情
  | 'page_view'               // 页面浏览
  | 'session_start'           // 会话开始
  | 'session_end'             // 会话结束
  | 'feedback_submit'         // 提交反馈

// ── Event ──────────────────────────────────────────────

export interface AnalyticsEvent {
  id: string
  type: AnalyticsEventType
  sessionId: string
  timestamp: number
  /** Teacher persona */
  persona?: TeacherPersonaType
  /** Event payload */
  data: Record<string, unknown>
  /** Current page */
  page: string
}

// ── Session ────────────────────────────────────────────

export interface TeacherSession {
  id: string
  persona: TeacherPersonaType
  startedAt: number
  endedAt?: number
  events: AnalyticsEvent[]
  /** Time saved estimate (minutes) */
  timeSavedMinutes: number
  /** Workflows completed in this session */
  workflowsCompleted: number
  /** Recommendations accepted / total */
  recommendationAcceptRate: number
}

// ── Teacher Persona ────────────────────────────────────

export type TeacherPersonaType =
  | 'new_teacher'      // 新手老师（1-3年）
  | 'experienced'      // 经验老师（3-10年）
  | 'head_teacher'     // 班主任
  | 'exam_focused'     // 冲刺型老师

export interface TeacherPersona {
  type: TeacherPersonaType
  label: string
  description: string
  /** What this persona cares about most */
  priorities: string[]
  /** Default homepage layout */
  homepageLayout: 'guided' | 'efficient' | 'comprehensive' | 'focused'
}

// ── Recommendation Trust ────────────────────────────────

export interface RecommendationTrustRecord {
  recommendationId: string
  type: string
  action: 'accept' | 'reject' | 'modify' | 'ignore'
  timestamp: number
  persona: TeacherPersonaType
}

export interface TrustScore {
  /** Overall trust score 0-100 */
  overall: number
  /** By recommendation type */
  byType: Record<string, number>
  /** Trend (improving/stable/declining) */
  trend: 'improving' | 'stable' | 'declining'
  /** Recent accept rate (last 20) */
  recentAcceptRate: number
}

// ── Workflow Drop Analysis ─────────────────────────────

export interface DropPoint {
  stepId: string
  stepName: string
  dropCount: number
  dropRate: number
  /** Where teachers go after dropping */
  nextAction: string
}

export interface FunnelStep {
  step: string
  entered: number
  completed: number
  dropped: number
  conversionRate: number
}

// ── Feature Flag ───────────────────────────────────────

export interface FeatureFlag {
  key: string
  label: string
  description: string
  enabled: boolean
  /** Percentage of users who see this (0-100) */
  rolloutPercent: number
  /** Personas this applies to (empty = all) */
  targetPersonas: TeacherPersonaType[]
}

// ── Time Saved ─────────────────────────────────────────

export interface TimeSavedMetrics {
  /** Total minutes saved this week */
  weeklyTotal: number
  /** Breakdown by activity */
  breakdown: TimeSavedBreakdown[]
  /** Comparison to last week */
  weekOverWeekChange: number
}

export interface TimeSavedBreakdown {
  activity: string
  minutesSaved: number
  /** How many times this saved time */
  occurrences: number
}

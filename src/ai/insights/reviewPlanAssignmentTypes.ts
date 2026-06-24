/**
 * 词汇能力提升方案 — 作业集合类型定义
 *
 * 词汇能力提升方案发布后在教师作业列表中以「词汇闯关 / 作业集合」卡片展示，
 * 不平铺为多条独立普通作业。
 */

// ── 闯关子任务状态 ──────────────────────────────────────

export type DayTaskStatus =
  | 'not_started'   // 未开始
  | 'in_progress'   // 进行中
  | 'expired'       // 已过期
  | 'completed'     // 已结束
  | 'expired_retry' // 已过期，可补做

// ── 作业集合状态 ────────────────────────────────────────

export type CollectionStatus =
  | 'not_started'        // 所有闯关未开始
  | 'in_progress'        // 至少一个进行中
  | 'completed'          // 全部结束
  | 'has_retry'          // 存在可补做子任务

// ── 闯关子任务 ──────────────────────────────────────────

export interface ReviewPlanDayTask {
  dayIndex: number          // 1, 3, 5 ...
  dayLabel: string          // "词汇闯关 1"
  taskType: 'main' | 'consolidation' | 'closeout'
  /** "30 道主复习题" */
  questionSummary: string
  mainQuestionCount: number
  rollbackQuestionCount: number  // @deprecated 不再使用，保留兼容
  status: DayTaskStatus
  submittedCount: number
  totalStudents: number
  reportUrl?: string          // 单份作业报告链接
  startTime?: string          // "6月15日 09:00"
  deadline?: string           // "6月15日 23:59"
  id: string
}

// ── 方案报告指标 (hover popover) ────────────────────────

export interface PlanDataOverview {
  coveredWordCount: number          // 覆盖词汇
  cumulativeCompletionRate: number  // 累计完成率 (0-1)
  masteryImprovement: {             // 词汇掌握率提升
    before: number                  // 方案前正确率
    after: number                   // 当前正确率
    improvement: number             // 提升百分点
    available: boolean              // false → "完成首轮后生成"
  }
  /** @deprecated 不再使用回滚题正确率，保留类型兼容 */
  rollbackAccuracy: {
    rate: number
    available: boolean
  }
}

// ── 作业集合卡片 ────────────────────────────────────────

export interface ReviewPlanAssignmentCollection {
  id: string
  title: string                     // "近期待巩固词复习计划"
  planType: 'quick_fix' | 'current_unit' | 'stage_exam' | 'weak_student' | 'draft_basket'
  className: string                 // "2023级A18班"
  wordCount: number                 // 复习词表词数
  dayCount: number                  // 5
  reviewDays: number[]              // [1, 3, 5]
  taskCount: number                 // 3
  wordsPerDay: number               // 30 题
  status: CollectionStatus
  /** "已完成 1/3 份任务" */
  progressSummary: string
  /** "当前任务：词汇闯关 2" */
  currentTaskLabel?: string
  /** "待补做：X 人" */
  pendingRetryLabel?: string
  days: ReviewPlanDayTask[]
  overview: PlanDataOverview
  publishedAt: string               // ISO timestamp
  goalLabel: string                 // "快速巩固近期错词" / "草稿词复习"
  planStartDate?: string            // "2026-06-15"
  planStartTime?: string            // "09:00"
}

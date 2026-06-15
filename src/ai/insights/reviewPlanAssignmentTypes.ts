/**
 * 词汇复习计划 — 作业集合类型定义
 *
 * 词汇复习方案发布后在教师作业列表中以「连续复习计划 / 作业集合」卡片展示，
 * 不平铺为多条独立普通作业。
 */

// ── Day 子任务状态 ──────────────────────────────────────

export type DayTaskStatus =
  | 'not_started'   // 未开始
  | 'in_progress'   // 进行中
  | 'expired'       // 已过期
  | 'completed'     // 已结束
  | 'expired_retry' // 已过期，可补做

// ── 作业集合状态 ────────────────────────────────────────

export type CollectionStatus =
  | 'not_started'        // 所有 Day 未开始
  | 'in_progress'        // 至少一个进行中
  | 'completed'          // 全部结束
  | 'has_retry'          // 存在可补做子任务

// ── Day 子任务 ──────────────────────────────────────────

export interface ReviewPlanDayTask {
  dayIndex: number          // 1, 3, 5 ...
  dayLabel: string          // "Day 1 复习任务"
  taskType: 'main' | 'consolidation' | 'closeout'
  /** "30 道主复习题" 或 "24 道主复习题 + 6 道动态回滚题" */
  questionSummary: string
  mainQuestionCount: number
  rollbackQuestionCount: number
  status: DayTaskStatus
  submittedCount: number
  totalStudents: number
  reportUrl?: string          // 单份作业报告链接
  startTime?: string          // "6月15日 09:00"
  deadline?: string           // "6月15日 23:59"
  id: string
}

// ── 数据概览指标 (hover popover) ────────────────────────

export interface PlanDataOverview {
  coveredWordCount: number          // 覆盖词汇
  cumulativeCompletionRate: number  // 累计完成率 (0-1)
  masteryImprovement: {             // 词汇掌握率提升
    before: number                  // 发布前正确率
    after: number                   // 当前正确率
    improvement: number             // 提升百分点
    available: boolean              // false → "完成首轮后生成"
  }
  rollbackAccuracy: {
    rate: number                    // 回滚题正确率
    available: boolean              // false → "Day 3 后生成"
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
  /** "当前任务：Day 3 巩固回滚任务" */
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

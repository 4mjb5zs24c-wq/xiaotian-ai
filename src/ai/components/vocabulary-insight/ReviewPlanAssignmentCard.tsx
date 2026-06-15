import { useState } from 'react'
import { ChevronDown, ChevronRight, FileText, Clock, Users, Target, Check, AlertCircle } from 'lucide-react'
import type { ReviewPlanAssignmentCollection, ReviewPlanDayTask } from '../../insights/reviewPlanAssignmentTypes'
import { DataOverviewPopover } from './DataOverviewPopover'

const COLLECTION_STATUS_STYLES: Record<string, string> = {
  not_started: 'bg-slate-100 text-slate-500',
  in_progress: 'bg-blue-100 text-blue-600',
  completed: 'bg-emerald-100 text-emerald-600',
  has_retry: 'bg-amber-100 text-amber-600',
}

const COLLECTION_STATUS_LABELS: Record<string, string> = {
  not_started: '未开始',
  in_progress: '进行中',
  completed: '已结束',
  has_retry: '有待补做',
}

const DAY_STATUS_STYLES: Record<string, string> = {
  not_started: 'bg-slate-50 text-slate-400',
  in_progress: 'bg-blue-50 text-blue-600 font-medium',
  expired: 'bg-red-50 text-red-500',
  completed: 'bg-emerald-50 text-emerald-600',
  expired_retry: 'bg-amber-50 text-amber-600',
}

const DAY_STATUS_LABELS: Record<string, string> = {
  not_started: '未开始',
  in_progress: '进行中',
  expired: '已过期',
  completed: '已结束',
  expired_retry: '可补做',
}

const PLAN_TYPE_LABELS: Record<string, string> = {
  quick_fix: '快速巩固近期错词',
  current_unit: '当前单元词汇复习',
  stage_exam: '阶段/考前复习',
  weak_student: '薄弱学生补练',
  draft_basket: '草稿词复习',
}

interface Props {
  collection: ReviewPlanAssignmentCollection
  defaultExpanded?: boolean
  onViewReport?: (dayTask: ReviewPlanDayTask) => void
}

export default function ReviewPlanAssignmentCard({ collection, defaultExpanded = false, onViewReport }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const { days, overview } = collection

  const reviewDaysText = collection.reviewDays.map(d => `Day ${d}`).join('、')

  return (
    <div className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm overflow-hidden transition-all">
      {/* ── Card header ── */}
      <div className="px-5 py-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* Title + tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-slate-800">{collection.title}</h3>
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-500 border border-indigo-100">词汇复习计划</span>
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-purple-50 text-purple-500 border border-purple-100">连续任务</span>
              <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-500 border border-emerald-100">动态回滚</span>
            </div>

            {/* Goal label */}
            <p className="text-[11px] text-slate-400 mt-1">{PLAN_TYPE_LABELS[collection.planType] || collection.goalLabel}</p>

            {/* Meta row */}
            <div className="flex items-center gap-3 mt-2 flex-wrap text-[11px] text-slate-500">
              <span className="flex items-center gap-1"><Users size={10} className="text-slate-400" />{collection.className}</span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1"><Clock size={10} className="text-slate-400" />{collection.dayCount} 天</span>
              <span className="text-slate-300">|</span>
              <span>复习日 {reviewDaysText}</span>
              <span className="text-slate-300">|</span>
              <span>共 {collection.taskCount} 份任务</span>
              <span className="text-slate-300">|</span>
              <span>每日 {collection.wordsPerDay} 题</span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1"><Target size={10} className="text-slate-400" />{collection.wordCount} 个词</span>
            </div>

            {/* Progress bar */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1 max-w-[200px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.round(overview.cumulativeCompletionRate * 100)}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-400">{collection.progressSummary}</span>
            </div>
          </div>

          {/* Right: status + actions */}
          <div className="flex flex-col items-end gap-2 shrink-0 ml-4">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${COLLECTION_STATUS_STYLES[collection.status]}`}>
              {COLLECTION_STATUS_LABELS[collection.status]}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-[11px] text-blue-500 hover:text-blue-600 font-medium px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
              >
                {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                {expanded ? '收起任务' : '展开任务'}
              </button>
              <DataOverviewPopover overview={overview} />
              <button className="text-[11px] text-slate-400 hover:text-slate-600 font-medium px-2 py-1 rounded-lg hover:bg-slate-50 transition-colors">
                更多
              </button>
            </div>
          </div>
        </div>

        {/* Current task indicator — only when in progress */}
        {collection.currentTaskLabel && (
          <div className="mt-3 flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-1.5 text-[11px]">
            <AlertCircle size={11} className="text-blue-500" />
            <span className="text-blue-600">当前任务：<span className="font-semibold">{collection.currentTaskLabel}</span></span>
            {collection.pendingRetryLabel && (
              <span className="text-amber-600 font-medium">· {collection.pendingRetryLabel}</span>
            )}
          </div>
        )}
      </div>

      {/* ── Expanded Day tasks ── */}
      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/30 px-5 py-3 space-y-2">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">复习任务列表</p>
          {days.map(day => (
            <DayTaskRow
              key={day.id}
              day={day}
              onViewReport={onViewReport}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/** ── Single Day task row ── */
function DayTaskRow({ day, onViewReport }: { day: ReviewPlanDayTask; onViewReport?: (day: ReviewPlanDayTask) => void }) {
  const canViewReport = day.status === 'completed' || day.status === 'in_progress'

  return (
    <div className={`flex items-center justify-between px-4 py-3 rounded-xl border bg-white transition-all
      ${day.status === 'in_progress' ? 'border-blue-200 ring-1 ring-blue-100' : 'border-slate-200'}`}>
      <div className="flex items-center gap-3 min-w-0">
        {/* Day badge */}
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0
          ${day.status === 'completed' ? 'bg-emerald-100 text-emerald-600'
          : day.status === 'in_progress' ? 'bg-blue-100 text-blue-600'
          : day.status === 'expired' || day.status === 'expired_retry' ? 'bg-amber-100 text-amber-600'
          : 'bg-slate-100 text-slate-400'}`}>
          D{day.dayIndex}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-semibold text-slate-700">{day.dayLabel}</p>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${DAY_STATUS_STYLES[day.status]}`}>
              {DAY_STATUS_LABELS[day.status]}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">{day.questionSummary}</p>
          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
            {day.status === 'not_started' ? (
              <span>开始时间：{day.startTime}</span>
            ) : (
              <span className="flex items-center gap-1">
                <Check size={9} className="text-slate-400" />
                提交：{day.submittedCount}/{day.totalStudents}
              </span>
            )}
            {day.deadline && <span className="text-slate-300">|</span>}
            {day.deadline && <span>截止：{day.deadline}</span>}
          </div>
        </div>
      </div>

      <button
        onClick={() => onViewReport?.(day)}
        disabled={!canViewReport}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all shrink-0
          ${canViewReport
            ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200'
            : 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100'}`}
      >
        <FileText size={11} />
        {canViewReport ? '查看报告' : '暂不可查看'}
      </button>
    </div>
  )
}

import { useState } from 'react'
import {
  ChevronDown, ChevronRight, FileText, MoreVertical,
} from 'lucide-react'
import type { ReviewPlanAssignmentCollection, ReviewPlanDayTask } from '../../insights/reviewPlanAssignmentTypes'
import { DataOverviewPopover } from './DataOverviewPopover'

// ── Status label/color matching existing ReportCard StatusBadge ──

const COLLECTION_STATUS: Record<string, { label: string; cls: string }> = {
  not_started: { label: '未开始', cls: 'bg-slate-100 text-slate-400' },
  in_progress: { label: '进行中', cls: 'bg-emerald-50 text-emerald-600' },
  completed:   { label: '已结束', cls: 'bg-slate-100 text-slate-400' },
  has_retry:   { label: '有待补做', cls: 'bg-amber-100 text-amber-600' },
}

interface Props {
  collection: ReviewPlanAssignmentCollection
  defaultExpanded?: boolean
  onViewReport?: (dayTask: ReviewPlanDayTask) => void
}

// ── Helpers ──────────────────────────────────────────────

function fmtDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function computeTimeRange(collection: ReviewPlanAssignmentCollection): string {
  // Use publish date as start, dayCount days later as end
  const start = fmtDate(collection.publishedAt)
  const endDate = new Date(collection.publishedAt)
  endDate.setDate(endDate.getDate() + collection.dayCount)
  const end = `${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`
  return `${start} 09:00 至 ${end} 20:00`
}

function computeEstTime(collection: ReviewPlanAssignmentCollection): string {
  // ~2 min per question per day
  return `每日约${Math.round(collection.wordsPerDay * 2 / 5) * 5}min`
}

// ── Status badge (matches existing ReportCard) ────────────

function StatusBadge({ status }: { status: string }) {
  const info = COLLECTION_STATUS[status] ?? COLLECTION_STATUS.not_started
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium ${info.cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
      {info.label}
    </span>
  )
}

export default function ReviewPlanAssignmentCard({ collection, defaultExpanded = false, onViewReport }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const { days, overview } = collection
  const reviewDaysText = collection.reviewDays.map(d => `Day ${d}`).join('、')

  return (
    <div>
      {/* ── Parent Collection Card (matching ReportCard style) ── */}
      <div className="bg-white rounded-xl border border-[#e8eef4] overflow-hidden hover:shadow-sm transition-shadow">
        {/* Header bar — same as ReportCard header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#f4f7fa] border-b border-[#eef2f6]">
          <div className="flex items-center gap-2 min-w-0">
            <FileText size={13} className="text-[#8aabcc] shrink-0" />
            <span className="text-[12px] font-semibold text-[#3a4f66] truncate">{collection.title}</span>
            {/* Tags */}
            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-500 border border-indigo-100 shrink-0">词汇复习计划</span>
            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-purple-50 text-purple-500 border border-purple-100 shrink-0 hidden sm:inline">连续任务</span>
            <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-500 border border-emerald-100 shrink-0 hidden sm:inline">动态回滚</span>
          </div>
          {/* Right: time + estimated time (same as ReportCard right side) */}
          <div className="flex items-center gap-3 text-[10px] text-[#8aabcc] shrink-0 ml-3">
            <span>{computeTimeRange(collection)}</span>
            <span>{computeEstTime(collection)}</span>
          </div>
        </div>

        {/* Body — same layout as ReportCard body */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0 flex-wrap">
            <div className="flex items-center gap-1.5 text-[11px] text-[#4a6b8a]">
              <span className="text-[#8aabcc]">班级</span>
              <span className="font-medium">{collection.className}</span>
            </div>
            <span className="text-[#d0dce8]">|</span>
            <div className="flex items-center gap-1.5 text-[11px] text-[#4a6b8a]">
              <span className="text-[#8aabcc]">分组</span>
              <span className="font-medium">全班</span>
            </div>
            <span className="text-[#d0dce8]">|</span>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="text-[#8aabcc]">完成</span>
              <span className="font-medium text-[#3a4f66]">
                {collection.days.filter(d => d.status === 'completed').length}
              </span>
              <span className="text-[#b8cde0]">/</span>
              <span className="text-[#8aabcc]">{collection.taskCount} 份任务</span>
            </div>
            {/* Extra review plan meta */}
            <span className="text-[#d0dce8]">|</span>
            <span className="text-[11px] text-[#8aabcc]">复习日 <span className="font-medium text-[#3a4f66]">{reviewDaysText}</span></span>
            <span className="text-[#d0dce8] hidden sm:inline">|</span>
            <span className="text-[11px] text-[#8aabcc] hidden sm:inline">每日 <span className="font-medium text-[#3a4f66]">{collection.wordsPerDay}题</span></span>
            <span className="text-[#d0dce8] hidden sm:inline">|</span>
            <span className="text-[11px] text-[#8aabcc] hidden sm:inline">词表 <span className="font-medium text-[#3a4f66]">{collection.wordCount}个词</span></span>
            <StatusBadge status={collection.status} />
          </div>

          {/* Right: actions — same style as ReportCard */}
          <div className="flex items-center gap-2 shrink-0 ml-3">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-[11px] text-[#4b9fe8] hover:text-[#3a8fd8] font-medium whitespace-nowrap transition-colors"
            >
              {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
              {expanded ? '收起任务' : '展开任务'}
            </button>
            <DataOverviewPopover overview={overview} />
            <button className="p-1 rounded-md text-[#b8cde0] hover:text-[#6b8aaa] hover:bg-[#f0f4f8] transition-colors">
              <MoreVertical size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Expanded Day sub-task cards ── */}
      {expanded && (
        <div className="ml-7 mt-2 space-y-2">
          {days.map(day => (
            <DayTaskCard
              key={day.id}
              day={day}
              collection={collection}
              onViewReport={onViewReport}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Day Sub-Task Card (matches ReportCard style, slightly indented) ──

function DayTaskCard({
  day,
  collection,
  onViewReport,
}: {
  day: ReviewPlanDayTask
  collection: ReviewPlanAssignmentCollection
  onViewReport?: (day: ReviewPlanDayTask) => void
}) {
  const canView = day.status === 'completed' || day.status === 'in_progress'

  // Compute per-day time
  const dayStart = new Date(collection.publishedAt)
  dayStart.setDate(dayStart.getDate() + day.dayIndex - 1)
  const dayEnd = new Date(dayStart)
  const startStr = `${String(dayStart.getMonth() + 1).padStart(2, '0')}-${String(dayStart.getDate()).padStart(2, '0')} 09:00`
  const endStr = `${String(dayEnd.getMonth() + 1).padStart(2, '0')}-${String(dayEnd.getDate()).padStart(2, '0')} 20:00`
  const estMin = Math.round(collection.wordsPerDay * 2 / 5) * 5

  return (
    <div className="bg-white rounded-xl border border-[#e8eef4] overflow-hidden hover:shadow-sm transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#f9fafb] border-b border-[#eef2f6]">
        <div className="flex items-center gap-2 min-w-0">
          <FileText size={12} className="text-[#8aabcc] shrink-0" />
          <span className="text-[12px] font-semibold text-[#3a4f66] truncate">{day.dayLabel}</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[#8aabcc] shrink-0 ml-3">
          <span>{startStr} 至 {endStr}</span>
          <span>预计{estMin}min</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 min-w-0 flex-wrap">
          <div className="flex items-center gap-1.5 text-[11px] text-[#4a6b8a]">
            <span className="text-[#8aabcc]">班级</span>
            <span className="font-medium">{collection.className}</span>
          </div>
          <span className="text-[#d0dce8]">|</span>
          <div className="flex items-center gap-1.5 text-[11px] text-[#4a6b8a]">
            <span className="text-[#8aabcc]">分组</span>
            <span className="font-medium">全班</span>
          </div>
          <span className="text-[#d0dce8]">|</span>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-[#8aabcc]">完成</span>
            <span className="font-medium text-[#3a4f66]">{day.submittedCount}</span>
            <span className="text-[#b8cde0]">/</span>
            <span className="text-[#8aabcc]">{day.totalStudents}人</span>
          </div>
          <span className="text-[#d0dce8]">|</span>
          <span className="text-[11px] text-[#8aabcc]"><span className="font-medium text-[#3a4f66]">{day.questionSummary}</span></span>
          <StatusBadge status={day.status} />
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-3">
          <button
            onClick={() => canView && onViewReport?.(day)}
            disabled={!canView}
            title={!canView ? '任务开始后可查看报告' : undefined}
            className={`text-[11px] px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors border
              ${canView
                ? 'text-[#4b9fe8] border-[#b8d4f0] hover:bg-[#eaf2fb]'
                : 'text-[#b8cde0] border-slate-100 bg-slate-50 cursor-not-allowed'}`}
          >
            报告
          </button>
          <button className="p-1 rounded-md text-[#b8cde0] hover:text-[#6b8aaa] hover:bg-[#f0f4f8] transition-colors">
            <MoreVertical size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

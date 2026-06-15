import { useState, useRef, useEffect } from 'react'
import { BarChart3, TrendingUp, Target, Percent } from 'lucide-react'
import type { PlanDataOverview } from '../../insights/reviewPlanAssignmentTypes'

interface Props {
  overview: PlanDataOverview
}

export function DataOverviewPopover({ overview }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-blue-500 font-medium px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
      >
        <BarChart3 size={12} />
        数据概览
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[280px] bg-white rounded-xl shadow-xl border border-slate-200 z-50 p-4 space-y-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <BarChart3 size={14} className="text-blue-500" />
            <p className="text-xs font-semibold text-slate-700">计划数据概览</p>
          </div>

          <div className="space-y-2.5">
            {/* 1. Covered words */}
            <MetricRow
              icon={<Target size={12} />}
              label="覆盖词汇"
              value={`${overview.coveredWordCount} 个`}
              color="text-indigo-500"
            />

            {/* 2. Cumulative completion rate */}
            <MetricRow
              icon={<Percent size={12} />}
              label="累计完成率"
              value={`${Math.round(overview.cumulativeCompletionRate * 100)}%`}
              color="text-blue-500"
              progress={overview.cumulativeCompletionRate}
            />

            {/* 3. Mastery improvement */}
            <div className="bg-slate-50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-1.5">
                <TrendingUp size={11} className="text-emerald-500" />
                <span className="text-[10px] text-slate-400">词汇掌握率提升</span>
              </div>
              {overview.masteryImprovement.available ? (
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-xs text-slate-400 line-through">{overview.masteryImprovement.before}%</span>
                  <span className="text-[13px] font-bold text-emerald-600">{overview.masteryImprovement.after}%</span>
                  <span className="text-[10px] text-emerald-500 font-medium">
                    +{overview.masteryImprovement.improvement} pp
                  </span>
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 mt-0.5">完成首轮后生成</p>
              )}
            </div>

            {/* 4. Rollback accuracy */}
            <div className="bg-slate-50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-1.5">
                <Target size={11} className="text-amber-500" />
                <span className="text-[10px] text-slate-400">回滚题正确率</span>
              </div>
              {overview.rollbackAccuracy.available ? (
                <div className="mt-1">
                  <span className="text-[13px] font-bold text-amber-600">{overview.rollbackAccuracy.rate}%</span>
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 mt-0.5">Day 3 后生成</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MetricRow({ icon, label, value, color, progress }: {
  icon: React.ReactNode; label: string; value: string; color: string; progress?: number
}) {
  return (
    <div className="bg-slate-50 rounded-lg px-3 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className={color}>{icon}</span>
          <span className="text-[10px] text-slate-400">{label}</span>
        </div>
        <span className={`text-xs font-semibold ${color}`}>{value}</span>
      </div>
      {progress != null && (
        <div className="mt-1 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all ${color.replace('text-', 'bg-')}`}
            style={{ width: `${Math.round(progress * 100)}%` }} />
        </div>
      )}
    </div>
  )
}

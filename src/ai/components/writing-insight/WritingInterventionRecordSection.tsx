import { TrendingUp, Clock, Users, Target } from 'lucide-react'
import type { WritingInterventionRecord } from '../../insights/writingInsightTypes'
import { INTERVENTION_TYPE_LABELS } from '../../insights/writingInsightTypes'

interface Props { records: WritingInterventionRecord[] }

const STATUS_STYLES: Record<string, { dot: string; bg: string; text: string }> = {
  '已完成': { dot: 'bg-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700' },
  '进行中': { dot: 'bg-blue-500',    bg: 'bg-blue-50',    text: 'text-blue-600' },
  '部分完成': { dot: 'bg-amber-500',  bg: 'bg-amber-50',  text: 'text-amber-700' },
}

export default function WritingInterventionRecordSection({ records }: Props) {
  if (records.length === 0) return null

  return (
    <section className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-4">
      <div className="flex items-center gap-2.5">
        <h3 className="text-base font-semibold text-slate-800">干预记录</h3>
        <span className="text-xs text-slate-400">{records.length} 条记录</span>
      </div>

      <div className="space-y-3">
        {records.map(r => {
          const statusStyle = STATUS_STYLES[r.status]
          const effect = r.effectSummary
          const improved = effect ? effect.afterAverageScore - effect.beforeAverageScore : 0

          return (
            <div key={r.id} className="border border-slate-100 rounded-xl p-4 space-y-3 hover:border-slate-200 transition-colors">
              {/* Top row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${statusStyle.dot}`} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-slate-800">{r.name}</span>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statusStyle.bg} ${statusStyle.text}`}>{r.status}</span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-500">{INTERVENTION_TYPE_LABELS[r.type]}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400 flex-wrap">
                      <span className="flex items-center gap-1"><Target size={11} />{r.relatedProblemTypes.slice(0, 2).join(' · ')}</span>
                      <span className="flex items-center gap-1"><Users size={11} />{r.target}</span>
                      <span className="flex items-center gap-1"><Clock size={11} />{r.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs text-slate-400">摘要</span>
                  <p className="text-xs text-slate-600 max-w-[180px]">{r.summary}</p>
                </div>
              </div>

              {/* Effect comparison */}
              {effect && (
                <div className="bg-blue-50/30 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp size={14} className="text-blue-500" />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">效果追踪</span>
                  </div>

                  {/* Before → After bar */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">干预前</span>
                        <span className="font-semibold text-slate-600">{effect.beforeAverageScore} 分</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400 rounded-full" style={{ width: `${(effect.beforeAverageScore / 20) * 100}%` }} />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 shrink-0">
                      <TrendingUp size={16} className="text-emerald-500" />
                      <span className="text-[11px] font-bold text-emerald-600">+{improved.toFixed(1)}</span>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">干预后</span>
                        <span className="font-semibold text-emerald-600">{effect.afterAverageScore} 分</span>
                      </div>
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 rounded-full" style={{ width: `${(effect.afterAverageScore / 20) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                    <span>问题减少率：<span className="font-semibold text-emerald-600">{effect.problemReductionRate}%</span></span>
                    <span>提升学生：<span className="font-semibold text-slate-700">{effect.improvedStudents} 人</span></span>
                    <span>仍需关注：<span className="font-semibold text-amber-600">{effect.stillNeedAttention} 人</span></span>
                  </div>
                  <p className="text-[13px] text-slate-500 mt-2 leading-relaxed">{effect.suggestion}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

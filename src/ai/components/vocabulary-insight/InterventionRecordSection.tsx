import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Clock, Users, ChevronDown, ChevronRight, FileText } from 'lucide-react'
import type { InterventionRecord } from '../../insights/vocabularyInsightTypes'

interface Props { records: InterventionRecord[] }

const STATUS_STYLES: Record<string, { dot: string }> = {
  '已完成': { dot: 'bg-emerald-500' },
  '进行中': { dot: 'bg-blue-500' },
  '部分完成': { dot: 'bg-amber-500' },
}

export default function InterventionRecordSection({ records }: Props) {
  const navigate = useNavigate()
  if (records.length === 0) return null
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm p-5 space-y-3">
      <div className="flex items-center gap-2.5">
        <h3 className="text-sm font-semibold text-slate-800">干预记录</h3>
        <span className="text-xs text-slate-400">{records.length} 条</span>
      </div>

      <div className="space-y-0 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
        {records.map(r => {
          const isExpanded = expandedId === r.id

          return (
            <div key={r.id} className="relative pl-5 pb-3 last:pb-0">
              {/* Dot on timeline */}
              <div className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-white ${STATUS_STYLES[r.status]?.dot || 'bg-slate-400'} ring-2 ring-slate-100`} />

              <div
                className="cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : r.id)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-800">{r.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${r.status === '已完成' ? 'bg-emerald-50 text-emerald-600' : r.status === '进行中' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                    {r.status}
                  </span>
                  {isExpanded ? <ChevronDown size={12} className="text-slate-400 ml-auto" /> : <ChevronRight size={12} className="text-slate-400 ml-auto" />}
                </div>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400 flex-wrap">
                  <span className="flex items-center gap-0.5"><Clock size={9} />{r.time}</span>
                  <span className="flex items-center gap-0.5"><Users size={9} />{r.target}</span>
                  <span className="flex items-center gap-0.5"><TrendingUp size={9} className="text-emerald-500" />{r.effectSummary.beforeScoreRate}% → {r.effectSummary.afterScoreRate}%</span>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-2 ml-1 p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>提升学生：<strong className="text-slate-700">{r.effectSummary.improvedStudents} 人</strong></span>
                    <span>还需强化：<strong className="text-amber-600">{r.effectSummary.needMorePracticeStudents} 人</strong></span>
                  </div>
                  {r.effectSummary.stillWeakWords.length > 0 && (
                    <p className="text-xs text-slate-400">仍薄弱：{r.effectSummary.stillWeakWords.join('、')}</p>
                  )}
                  <p className="text-xs text-slate-500 leading-relaxed">{r.effectSummary.suggestion}</p>
                  <div className="pt-1.5 border-t border-slate-200">
                    <button
                      onClick={() => navigate(`/vocab-plan-report/${r.id}`)}
                      className="flex items-center gap-1 text-[10px] text-[#4b9fe8] border border-[#b8d4f0] hover:bg-[#eaf2fb] px-2 py-1 rounded-md font-medium transition-colors"
                    >
                      <FileText size={10} />报告
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

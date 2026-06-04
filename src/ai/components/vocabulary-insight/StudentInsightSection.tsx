import { ChevronDown, ChevronRight, TrendingUp, TrendingDown, Minus, User, Star, AlertTriangle } from 'lucide-react'
import type { WeakStudentItem, GoodStudentItem } from '../../insights/vocabularyInsightTypes'

interface Props {
  weakStudents: WeakStudentItem[]; goodStudents: GoodStudentItem[]
  selectedIds: Set<string>; showAllWeak: boolean; expandedStudentId: string | null
  onToggleShowAllWeak: () => void; onToggleStudent: (id: string) => void
  onExpandStudent: (id: string) => void
  onMockAction: (action: string) => void; onReviewPlan: () => void
}

const TREND_CONFIG: Record<string, { icon: React.ReactNode; label: string; className: string }> = {
  improving: { icon: <TrendingUp size={12} />, label: '进步中', className: 'text-emerald-600 bg-emerald-50' },
  declining: { icon: <TrendingDown size={12} />, label: '下滑中', className: 'text-red-500 bg-red-50' },
  stable:    { icon: <Minus size={12} />,       label: '稳定',   className: 'text-slate-500 bg-slate-100' },
}

type MergedStudent =
  | { kind: 'good'; item: GoodStudentItem }
  | { kind: 'weak'; item: WeakStudentItem }

export default function StudentInsightSection({
  weakStudents, goodStudents, showAllWeak, expandedStudentId,
  onToggleShowAllWeak, onExpandStudent, onMockAction, onReviewPlan,
}: Props) {
  // Merge and sort by masteryRate descending (good students first)
  const allStudents: MergedStudent[] = [
    ...goodStudents.map(item => ({ kind: 'good' as const, item })),
    ...weakStudents.map(item => ({ kind: 'weak' as const, item })),
  ].sort((a, b) => {
    const aRate = a.kind === 'good' ? a.item.masteryRate : a.item.masteryRate
    const bRate = b.kind === 'good' ? b.item.masteryRate : b.item.masteryRate
    return bRate - aRate
  })

  const visibleCount = showAllWeak ? allStudents.length : Math.min(8, allStudents.length)
  const visible = allStudents.slice(0, visibleCount)
  const hasMore = allStudents.length > 8

  return (
    <section className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800">学生洞察</h3>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="flex items-center gap-1"><Star size={11} className="text-amber-400" />掌握较好 {goodStudents.length}</span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1"><AlertTriangle size={11} className="text-amber-500" />薄弱 {weakStudents.length}</span>
        </div>
      </div>

      {/* Student list — merged */}
      <div className="space-y-2">
        {visible.map(s => {
          if (s.kind === 'good') {
            const g = s.item
            return (
              <div key={`good-${g.id}`}
                className="border border-slate-100 rounded-xl px-4 py-3.5 flex items-center gap-3
                  hover:border-slate-200 transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                  <Star size={14} className="text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-sm font-semibold text-slate-800">{g.name}</span>
                    <span className="text-[13px] text-slate-500">
                      掌握率 <span className="font-semibold text-emerald-600">{g.masteryRate}%</span>
                    </span>
                    <span className="text-[13px] text-slate-400">已掌握 {g.masteredCount} 个</span>
                    {g.stability === 'improving' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <TrendingUp size={11} /> 持续进步
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        保持稳定
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-slate-400 mt-0.5">{g.highlight}</p>
                </div>
              </div>
            )
          } else {
            const w = s.item
            const isExpanded = expandedStudentId === w.id
            const trendConfig = TREND_CONFIG[w.recentTrend]
            return (
              <div key={`weak-${w.id}`}
                className={`border rounded-xl overflow-hidden transition-all duration-200
                  ${isExpanded ? 'border-slate-200 shadow-sm' : 'border-slate-100 hover:border-slate-200'}`}
              >
                <div className="flex items-center gap-3 px-4 py-3.5">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <User size={14} className="text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onExpandStudent(w.id)}>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-sm font-semibold text-slate-800">{w.name}</span>
                      <span className="text-[13px] text-slate-500">
                        掌握率 <span className="font-semibold text-amber-600">{w.masteryRate}%</span>
                      </span>
                      <span className="text-[13px] text-slate-400 truncate max-w-[200px]">
                        {w.weakWords.slice(0, 3).join('、')}
                      </span>
                      <span className="text-[13px] text-slate-400 hidden sm:inline">
                        {w.mainErrorTypes.slice(0, 2).join(' · ')}
                      </span>
                    </div>
                  </div>
                  {trendConfig && (
                    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${trendConfig.className} shrink-0`}>
                      {trendConfig.icon}{trendConfig.label}
                    </span>
                  )}
                  <button onClick={() => onExpandStudent(w.id)} className="shrink-0 text-slate-400 hover:text-slate-600">
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                </div>
                {isExpanded && (
                  <div className="px-4 py-4 border-t border-blue-100 bg-blue-50/20 space-y-4">
                    <div className="space-y-2.5">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">个人错误类型分布</p>
                      {w.errorTypeDistribution.map(et => (
                        <div key={et.type} className="flex items-center gap-3">
                          <span className="text-xs text-slate-500 w-24 shrink-0">{et.label}</span>
                          <div className="flex-1 h-2 bg-blue-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${et.percent}%`, backgroundColor: '#4b9fe8' }} />
                          </div>
                          <span className="text-xs font-semibold text-slate-700 w-9 text-right">{et.percent}%</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[13px] text-slate-400 leading-relaxed">{w.typicalContext}</p>
                    <div className="flex items-center gap-2">
                      {w.recommendedActions.map(a => (
                        <button key={a} onClick={() => a === '词汇复习规划' ? onReviewPlan() : onMockAction(a)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200
                            ${a === '词汇复习规划' ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}>
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          }
        })}

        {hasMore && (
          <button onClick={onToggleShowAllWeak}
            className="w-full py-3 text-center text-sm font-medium text-blue-500 hover:text-blue-600
              border border-dashed border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200">
            {showAllWeak ? '收起' : `查看全部 ${allStudents.length} 人`}
          </button>
        )}
      </div>
    </section>
  )
}

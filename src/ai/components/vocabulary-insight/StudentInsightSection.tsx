import { ChevronDown, ChevronRight, TrendingUp, TrendingDown, Minus, User, Star, AlertTriangle } from 'lucide-react'
import type { WeakStudentItem, GoodStudentItem } from '../../insights/vocabularyInsightTypes'

interface Props {
  weakStudents: WeakStudentItem[]; goodStudents: GoodStudentItem[]
  activeTab: 'weak' | 'good'; onTabChange: (tab: 'weak' | 'good') => void
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

export default function StudentInsightSection({
  weakStudents, goodStudents, activeTab, onTabChange, showAllWeak, expandedStudentId,
  onToggleShowAllWeak, onExpandStudent, onMockAction, onReviewPlan,
}: Props) {
  const visibleWeak = showAllWeak ? weakStudents : weakStudents.slice(0, 5)
  const hasMoreWeak = weakStudents.length > 5

  return (
    <section className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800">学生洞察</h3>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        <button
          onClick={() => onTabChange('weak')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${activeTab === 'weak'
              ? 'bg-white text-slate-800 shadow-sm shadow-slate-200/50'
              : 'text-slate-500 hover:text-slate-700'}`}
        >
          <AlertTriangle size={14} className={activeTab === 'weak' ? 'text-amber-500' : 'text-slate-400'} />
          薄弱学生
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === 'weak' ? 'bg-amber-50 text-amber-600' : 'bg-slate-200 text-slate-500'}`}>
            {weakStudents.length}
          </span>
        </button>
        <button
          onClick={() => onTabChange('good')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${activeTab === 'good'
              ? 'bg-white text-slate-800 shadow-sm shadow-slate-200/50'
              : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Star size={14} className={activeTab === 'good' ? 'text-amber-400' : 'text-slate-400'} />
          掌握较好
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === 'good' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-500'}`}>
            {goodStudents.length}
          </span>
        </button>
      </div>

      {/* Weak Students */}
      {activeTab === 'weak' && (
        <div className="space-y-2">
          {visibleWeak.map(s => {
            const isExpanded = expandedStudentId === s.id
            const trendConfig = TREND_CONFIG[s.recentTrend]

            return (
              <div
                key={s.id}
                className={`border rounded-xl overflow-hidden transition-all duration-200
                  ${isExpanded ? 'border-slate-200 shadow-sm' : 'border-slate-100 hover:border-slate-200'}`}
              >
                {/* Student row */}
                <div className="flex items-center gap-3 px-4 py-3.5">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <User size={14} className="text-slate-500" />
                  </div>

                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => onExpandStudent(s.id)}
                  >
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-sm font-semibold text-slate-800">{s.name}</span>
                      <span className="text-[13px] text-slate-500">
                        掌握率 <span className="font-semibold text-slate-700">{s.masteryRate}%</span>
                      </span>
                      <span className="text-[13px] text-slate-400 truncate max-w-[200px]">
                        {s.weakWords.slice(0, 3).join('、')}
                      </span>
                      <span className="text-[13px] text-slate-400 hidden sm:inline">
                        {s.mainErrorTypes.slice(0, 2).join(' · ')}
                      </span>
                    </div>
                  </div>

                  {/* Trend badge */}
                  {trendConfig && (
                    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${trendConfig.className} shrink-0`}>
                      {trendConfig.icon}
                      {trendConfig.label}
                    </span>
                  )}

                  {/* Expand */}
                  <button
                    onClick={() => onExpandStudent(s.id)}
                    className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-4 py-4 border-t border-blue-100 bg-blue-50/20 space-y-4">
                    {/* Error type distribution */}
                    <div className="space-y-2.5">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">个人错误类型分布</p>
                      {s.errorTypeDistribution.map(et => (
                        <div key={et.type} className="flex items-center gap-3">
                          <span className="text-xs text-slate-500 w-24 shrink-0">{et.label}</span>
                          <div className="flex-1 h-2 bg-blue-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${et.percent}%`, backgroundColor: '#4b9fe8' }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-700 w-9 text-right">{et.percent}%</span>
                        </div>
                      ))}
                    </div>

                    {/* Context */}
                    <p className="text-[13px] text-slate-400 leading-relaxed">{s.typicalContext}</p>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {s.recommendedActions.map(a => (
                        <button
                          key={a}
                          onClick={() => a === '词汇复习规划' ? onReviewPlan() : onMockAction(a)}
                          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200
                            ${a === '词汇复习规划'
                              ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200'
                              : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {hasMoreWeak && (
            <button
              onClick={onToggleShowAllWeak}
              className="w-full py-3 text-center text-sm font-medium text-blue-500 hover:text-blue-600
                border border-dashed border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50
                transition-all duration-200"
            >
              {showAllWeak ? '收起' : `查看全部 ${weakStudents.length} 名薄弱学生`}
            </button>
          )}
        </div>
      )}

      {/* Good Students */}
      {activeTab === 'good' && (
        <div className="space-y-2">
          {goodStudents.slice(0, 5).map(s => (
            <div
              key={s.id}
              className="border border-slate-100 rounded-xl px-4 py-3.5 flex items-center gap-3
                hover:border-slate-200 transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                <Star size={14} className="text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-sm font-semibold text-slate-800">{s.name}</span>
                  <span className="text-[13px] text-slate-500">
                    掌握率 <span className="font-semibold text-emerald-600">{s.masteryRate}%</span>
                  </span>
                  <span className="text-[13px] text-slate-400">已掌握 {s.masteredCount} 个</span>
                  {s.stability === 'improving' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <TrendingUp size={11} /> 持续进步
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      保持稳定
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-slate-400 mt-0.5">{s.highlight}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

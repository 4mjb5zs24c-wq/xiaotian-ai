import { useState } from 'react'
import { ChevronRight, TrendingUp, TrendingDown, Minus, User, FileText, Image, X } from 'lucide-react'
import type { WeakWritingStudent } from '../../insights/writingInsightTypes'

interface Props {
  students: WeakWritingStudent[]
  onViewFullEssay: (id: string) => void
  onViewAnswerSheet: (url: string) => void
}

const TREND_CONFIG: Record<string, { icon: React.ReactNode; label: string; className: string }> = {
  improving: { icon: <TrendingUp size={12} />, label: '进步中', className: 'text-emerald-600 bg-emerald-50' },
  declining: { icon: <TrendingDown size={12} />, label: '下滑中', className: 'text-red-500 bg-red-50' },
  stable:    { icon: <Minus size={12} />,       label: '稳定',   className: 'text-slate-500 bg-slate-100' },
}

export default function WeakWritingStudentsSection({ students, onViewFullEssay, onViewAnswerSheet }: Props) {
  const [showAll, setShowAll] = useState(false)
  const [detailStudent, setDetailStudent] = useState<WeakWritingStudent | null>(null)
  const visible = showAll ? students : students.slice(0, 5)
  const hasMore = students.length > 5

  return (
    <section className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-base font-semibold text-slate-800">薄弱写作学生</h3>
        <span className="text-xs text-slate-400">{students.length} 人</span>
      </div>

      {/* Student list */}
      <div className="space-y-2">
        {visible.map(s => {
          const trendConfig = TREND_CONFIG[s.scoreTrend]

          return (
            <div key={s.id} className="border border-slate-100 rounded-xl hover:border-slate-200 transition-colors overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <User size={14} className="text-slate-500" />
                </div>

                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setDetailStudent(s)}>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-sm font-semibold text-slate-800">{s.name}</span>
                    <span className="text-[13px] text-slate-500">
                      平均分 <span className="font-semibold text-slate-700">{s.averageScore}</span> / {s.level}
                    </span>
                    <span className="text-[13px] text-slate-400 truncate max-w-[200px]">
                      {s.mainProblemTypes.slice(0, 2).join(' · ')}
                    </span>
                    <span className="text-[13px] text-slate-400 hidden sm:inline">
                      {s.relatedTasks[0]}
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-400 truncate mt-0.5">"{s.typicalSentence.substring(0, 60)}..."</p>
                </div>

                {trendConfig && (
                  <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${trendConfig.className} shrink-0`}>
                    {trendConfig.icon}{trendConfig.label}
                  </span>
                )}

                <button onClick={() => setDetailStudent(s)} className="shrink-0 text-slate-400 hover:text-slate-600">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )
        })}

        {hasMore && (
          <button onClick={() => setShowAll(!showAll)}
            className="w-full py-2.5 text-center text-sm font-medium text-blue-500 hover:text-blue-600
              border border-dashed border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200">
            {showAll ? '收起' : `查看全部 ${students.length} 人`}
          </button>
        )}
      </div>

      {/* Student Detail Drawer */}
      {detailStudent && (
        <div className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm flex items-start justify-end" onClick={() => setDetailStudent(null)}>
          <div className="w-[480px] h-full bg-white shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between z-10">
              <div>
                <h3 className="text-base font-bold text-slate-800">{detailStudent.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">写作平均分 {detailStudent.averageScore} · 等级 {detailStudent.level}</p>
              </div>
              <button onClick={() => setDetailStudent(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"><X size={18} /></button>
            </div>

            <div className="p-5 space-y-5">
              {/* Score trend */}
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">近几次作文得分</p>
                <div className="flex items-end gap-3 h-20">
                  {detailStudent.recentScores.map(sc => (
                    <div key={sc.date} className="flex flex-col items-center gap-1 flex-1">
                      <span className="text-sm font-bold text-slate-700">{sc.score}</span>
                      <div className="w-full bg-blue-200 rounded-t-md transition-all" style={{ height: `${(sc.score / 20) * 60}px` }} />
                      <span className="text-[10px] text-slate-400">{sc.date}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem distribution */}
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">问题类型分布</p>
                <div className="space-y-2">
                  {detailStudent.problemDistribution.map(pd => (
                    <div key={pd.type} className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 w-20 shrink-0">{pd.label}</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 rounded-full transition-all duration-500" style={{ width: `${pd.percent}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 w-9 text-right">{pd.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typical sentence */}
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">典型问题句子</p>
                <div className="bg-red-50/50 border border-red-100 rounded-lg p-3">
                  <p className="text-[13px] text-slate-700 leading-relaxed italic">"{detailStudent.typicalSentence}"</p>
                </div>
              </div>

              {/* Revision suggestions */}
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">修改建议</p>
                <ul className="space-y-1.5">
                  {detailStudent.revisionSuggestions.map((sug, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-slate-600">
                      <span className="text-blue-400 mt-1">•</span>
                      {sug}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                {detailStudent.fullEssayIds.map(id => (
                  <button key={id} onClick={() => onViewFullEssay(id)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                    <FileText size={12} /> 查看完整作文
                  </button>
                ))}
                <button onClick={() => onViewAnswerSheet(detailStudent.answerSheetImageUrl)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">
                  <Image size={12} /> 查看答题卡原图
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

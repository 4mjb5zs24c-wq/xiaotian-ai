import { ChevronDown, ChevronRight, TrendingUp, User, Star, AlertTriangle } from 'lucide-react'
import type { WeakStudentItem, GoodStudentItem } from '../../insights/vocabularyInsightTypes'

interface Props {
  weakStudents: WeakStudentItem[]; goodStudents: GoodStudentItem[]
  selectedIds: Set<string>; showAllWeak: boolean; expandedStudentId: string | null
  onToggleShowAllWeak: () => void; onToggleStudent: (id: string) => void
  onExpandStudent: (id: string) => void
  onMockAction: (action: string) => void; onReviewPlan: () => void
}

export default function StudentInsightSection({
  weakStudents, goodStudents, expandedStudentId,
  onExpandStudent,
  // P2: onMockAction — 布置个性化练习保留入口，本期不做
}: Props) {
  const sortedGood = [...goodStudents].sort((a, b) => b.scoreRate - a.scoreRate)
  const sortedWeak = [...weakStudents].sort((a, b) => a.scoreRate - b.scoreRate)

  return (
    <section className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">学生洞察</h3>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1"><Star size={10} className="text-amber-400" />较好 {goodStudents.length}</span>
          <span className="flex items-center gap-1"><AlertTriangle size={10} className="text-amber-500" />薄弱 {weakStudents.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Weak students */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">薄弱学生</p>
          {sortedWeak.slice(0, 5).map(w => {
            const isExpanded = expandedStudentId === w.id
            return (
              <div key={`weak-${w.id}`}
                className={`rounded-lg overflow-hidden transition-all
                  ${isExpanded ? 'border border-slate-200 bg-slate-50/50' : 'border border-slate-100 bg-white hover:border-slate-200'}`}
              >
                <div className="px-3 py-2 cursor-pointer" onClick={() => onExpandStudent(w.id)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <User size={10} className="text-slate-400 shrink-0" />
                      <span className="text-xs font-semibold text-slate-800 truncate">{w.name}</span>
                      <span className="text-xs font-bold text-amber-600 shrink-0">{w.scoreRate}%</span>
                    </div>
                    {isExpanded ? <ChevronDown size={11} className="text-slate-400 shrink-0" /> : <ChevronRight size={11} className="text-slate-400 shrink-0" />}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                    主要问题：{w.mainErrorTypes.slice(0, 2).join(' · ')} · 涉及高频错词：{w.weakWords.length} 个
                  </p>
                </div>
                {isExpanded && (
                  <div className="px-3 py-2 border-t border-blue-100 bg-blue-50/20 space-y-1.5">
                    <p className="text-[10px] font-semibold text-slate-600">主要错词</p>
                    <div className="space-y-0.5">
                      {w.weakWords.slice(0, 8).map((word, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px]">
                          <span className="text-slate-400 w-4 shrink-0">{i + 1}.</span>
                          <span className="font-medium text-slate-700">{word}</span>
                          <span className="text-slate-400">
                            {w.mainErrorTypes[i % w.mainErrorTypes.length]}
                          </span>
                        </div>
                      ))}
                      {w.weakWords.length > 8 && (
                        <p className="text-[10px] text-slate-400 ml-4">还有 {w.weakWords.length - 8} 个错词</p>
                      )}
                    </div>
                    {/* P2 后续能力：布置个性化练习 — 当前版本主干预动作是生成词汇提升方案，学生洞察默认只做问题查看 */}
                    {/* <button onClick={() => onMockAction('布置个性化练习')}
                      className="text-[10px] px-2 py-1 rounded font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors">布置个性化练习</button> */}
                  </div>
                )}
              </div>
            )
          })}
          {sortedWeak.length > 5 && <p className="text-[10px] text-blue-500 text-center">还有 {sortedWeak.length - 5} 名薄弱学生</p>}
        </div>

        {/* Good students */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">掌握较好</p>
          {sortedGood.slice(0, 5).map(g => (
            <div key={`good-${g.id}`} className="border border-slate-100 bg-white rounded-lg px-3 py-2 hover:border-slate-200 transition-colors">
              <div className="flex items-center gap-1.5">
                <Star size={9} className="text-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 truncate">{g.name}</span>
                <span className="text-xs font-bold text-emerald-600 shrink-0">{g.scoreRate}%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">已掌握 {g.masteredCount} 个</p>
              <p className="text-[10px] text-slate-400">
                {g.stability === 'improving' ? (
                  <span className="inline-flex items-center gap-0.5 text-emerald-600"><TrendingUp size={8} />持续进步</span>
                ) : (
                  <span className="inline-flex items-center gap-0.5 text-slate-400">保持稳定</span>
                )}
              </p>
            </div>
          ))}
          {sortedGood.length > 5 && <p className="text-[10px] text-blue-500 text-center">还有 {sortedGood.length - 5} 名较好学生</p>}
        </div>
      </div>
    </section>
  )
}

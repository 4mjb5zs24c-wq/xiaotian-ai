import { Eye, Send, FolderPlus, Check } from 'lucide-react'
import type { RecommendedWritingResource } from '../../insights/writingInsightTypes'

interface Props {
  resources: RecommendedWritingResource[]
  onPreview: (r: RecommendedWritingResource) => void
  onAssign: (r: RecommendedWritingResource) => void
  onAddToPaperBasket: (r: RecommendedWritingResource) => void
  isInBasket: (r: RecommendedWritingResource) => boolean
}

const DIFFICULTY_STYLE: Record<string, string> = {
  basic: 'text-emerald-600 bg-emerald-50',
  medium: 'text-amber-600 bg-amber-50',
  advanced: 'text-red-500 bg-red-50',
}
const DIFFICULTY_LABEL: Record<string, string> = {
  basic: '基础', medium: '中等', advanced: '较难',
}

export default function RecommendedWritingResourcesSection({ resources, onPreview, onAssign, onAddToPaperBasket, isInBasket }: Props) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-base font-semibold text-slate-800">推荐写作练习资源</h3>
        <span className="text-xs text-slate-400">{resources.length} 条</span>
      </div>

      <div className="space-y-3">
        {resources.map(r => {
          const inBasket = isInBasket(r)
          return (
            <div key={r.id} className="border border-slate-100 rounded-xl p-4 hover:border-slate-200 transition-colors space-y-3">
              {/* Title + Tags */}
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-[15px] font-semibold text-slate-800">{r.title}</h4>
                <div className="flex items-center gap-1 shrink-0">
                  {r.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-500 font-medium border border-blue-100">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-slate-500">
                {r.questionCount != null && <span>题量：{r.questionCount}题</span>}
                {r.duration && <span>预计用时：{r.duration}</span>}
                <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-md ${DIFFICULTY_STYLE[r.difficulty]}`}>{DIFFICULTY_LABEL[r.difficulty]}</span>
                <span>{r.grade}</span>
                {r.source && <span className="text-slate-400">{r.source}</span>}
              </div>

              {/* Recommend reason */}
              <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50/30 border border-blue-100/50">
                <span className="text-[13px] shrink-0">💡</span>
                <p className="text-[13px] text-slate-600 leading-relaxed">{r.recommendReason}</p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                {r.canPreview && (
                  <button onClick={() => onPreview(r)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium text-slate-600 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200">
                    <Eye size={13} /> 预览
                  </button>
                )}
                {r.canAssign && (
                  <button onClick={() => onAssign(r)} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px] font-semibold bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200 transition-all duration-200">
                    <Send size={13} /> 布置
                  </button>
                )}
                {r.canAddToPaperBasket && (
                  <button onClick={() => onAddToPaperBasket(r)} disabled={inBasket}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${inBasket ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default' : 'text-slate-600 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600'}`}>
                    {inBasket ? <><Check size={13} /> 已加入</> : <><FolderPlus size={13} /> 加入试卷篮</>}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

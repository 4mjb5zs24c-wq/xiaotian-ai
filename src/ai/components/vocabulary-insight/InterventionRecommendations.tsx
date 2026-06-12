import { Sparkles, Eye, Send, FolderPlus } from 'lucide-react'
import type { InterventionRecommendation } from '../../insights/vocabularyInsightTypes'

interface Props {
  recommendations: InterventionRecommendation[]
  onMockAction: (action: string) => void
}

export default function InterventionRecommendations({ recommendations, onMockAction }: Props) {
  if (!recommendations || recommendations.length === 0) return null

  return (
    <section className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles size={15} className="text-blue-500" />
        <h3 className="text-base font-semibold text-slate-800">推荐干预方案</h3>
        <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">AI 建议</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {recommendations.map(rec => (
          <div
            key={rec.id}
            className="bg-gradient-to-b from-blue-50/40 to-white rounded-xl border border-blue-100/60 p-4
              hover:border-blue-200 hover:shadow-sm transition-all duration-200"
          >
            <h4 className="text-sm font-semibold text-slate-800 mb-2">{rec.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">{rec.content}</p>
            <p className="text-[11px] text-blue-500 bg-blue-50/50 rounded-lg px-2.5 py-1.5 leading-relaxed">
              {rec.actionLabel}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom action buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={() => onMockAction('预览练习')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium
            bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200 transition-all duration-200"
        >
          <Eye size={12} />
          预览练习
        </button>
        <button
          onClick={() => onMockAction('一键布置')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium
            bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
        >
          <Send size={12} />
          一键布置
        </button>
        <button
          onClick={() => onMockAction('加入试卷篮')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium
            bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
        >
          <FolderPlus size={12} />
          加入试卷篮
        </button>
      </div>
    </section>
  )
}

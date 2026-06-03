import { Lightbulb, BookOpen, Sparkles } from 'lucide-react'

interface Props {
  summary: string
  mainProblemTypes: string[]
  affectedStudentCount: number
  onRecommendResources: () => void
  onGenerateSamples: () => void
}

export default function WritingAISummaryCard({
  summary, onRecommendResources, onGenerateSamples,
}: Props) {
  return (
    <div className="relative bg-gradient-to-r from-blue-50/60 to-white rounded-2xl p-5 border border-blue-100/60 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb size={15} className="text-amber-500" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[15px] text-slate-700 leading-relaxed font-medium">{summary}</p>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <button
              onClick={onRecommendResources}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600
                text-white text-xs font-semibold hover:from-blue-600 hover:to-blue-700
                transition-all duration-200 shadow-sm shadow-blue-200"
            >
              <BookOpen size={13} />
              推荐写作练习
            </button>
            <button
              onClick={onGenerateSamples}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-50 text-xs font-medium
                text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50
                transition-all duration-200"
            >
              <Sparkles size={12} />
              生成范文
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

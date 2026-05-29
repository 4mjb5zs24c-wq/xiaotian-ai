import { Lightbulb, Clock, ChevronRight, GraduationCap } from 'lucide-react'
import type { TeachingSuggestionResult } from '../../search/types'
import { useAIStore } from '../../store'

export default function TeachingSuggestionCard({ suggestion }: { suggestion: TeachingSuggestionResult }) {
  const openDrawer = useAIStore((s) => s.openDrawer)

  const handleClick = () => {
    openDrawer({
      type: 'suggestion',
      title: suggestion.title,
      cardData: {
        id: suggestion.id,
        title: suggestion.title,
        riskLevel: 'low',
        description: suggestion.description,
        suggestedAction: `教学阶段：${suggestion.teachingStage} · 预计时长：${suggestion.estimatedTime}`,
        tags: suggestion.tags,
      },
    })
  }

  return (
    <button
      onClick={handleClick}
      className="w-full text-left bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-amber-200 transition-all group"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <Lightbulb size={15} className="text-amber-500 shrink-0" />
          <h4 className="text-sm font-semibold text-slate-800 truncate">{suggestion.title}</h4>
        </div>
        <ChevronRight size={14} className="text-slate-300 group-hover:text-amber-400 transition-colors shrink-0" />
      </div>

      <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
        {suggestion.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-600">
            {suggestion.teachingStage}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-slate-400">
            <Clock size={10} /> {suggestion.estimatedTime}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-slate-400">
            <GraduationCap size={10} /> {suggestion.targetGrade}
          </span>
        </div>
        {suggestion.matchesContext && (
          <span className="text-[10px] text-emerald-500 font-medium">匹配当前</span>
        )}
      </div>
    </button>
  )
}

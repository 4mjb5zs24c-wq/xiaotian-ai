import { Bookmark, Clock, ChevronRight, Plus } from 'lucide-react'
import type { RecommendationItem } from '../store'
import { useAIStore } from '../store'

const typeLabel: Record<string, string> = {
  exercise: '练习',
  material: '素材',
  lesson: '课件',
  homework: '作业',
}

const difficultyConfig = {
  basic: 'bg-emerald-50 text-emerald-600',
  medium: 'bg-amber-50 text-amber-600',
  advanced: 'bg-red-50 text-red-600',
}

export default function RecommendationCard({ item }: { item: RecommendationItem }) {
  const openDrawer = useAIStore((s) => s.openDrawer)
  const addToBasket = useAIStore((s) => s.addToBasket)

  const handleClick = () => {
    openDrawer({
      type: 'recommendation',
      title: item.title,
      cardData: item,
    })
  }

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToBasket(item)
  }

  return (
    <button
      onClick={handleClick}
      className="w-full text-left bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-indigo-200 transition-all group"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <Bookmark size={15} className="text-indigo-500 shrink-0" />
          <h4 className="text-sm font-semibold text-slate-800 truncate">{item.title}</h4>
        </div>
        <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-400 transition-colors shrink-0" />
      </div>
      <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">{item.reason}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500">
            {typeLabel[item.type] || item.type}
          </span>
          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${difficultyConfig[item.difficulty]}`}>
            {item.difficulty === 'basic' ? '基础' : item.difficulty === 'medium' ? '进阶' : '拔高'}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-slate-400">
            <Clock size={10} />
            {item.estimatedTime}
          </span>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-medium hover:bg-indigo-100 transition-colors"
        >
          <Plus size={10} />
          加入篮子
        </button>
      </div>
    </button>
  )
}

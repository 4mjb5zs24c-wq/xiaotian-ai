import { Lightbulb, ChevronRight } from 'lucide-react'
import type { InsightItem } from '../store'
import { useAIStore } from '../store'

const priorityConfig = {
  normal: { bar: 'bg-emerald-400', badge: 'bg-emerald-50 text-emerald-700', label: '常规' },
  warning: { bar: 'bg-amber-400', badge: 'bg-amber-50 text-amber-700', label: '关注' },
  critical: { bar: 'bg-red-400', badge: 'bg-red-50 text-red-700', label: '预警' },
}

export default function InsightCard({ insight, onOpen }: { insight: InsightItem; onOpen?: () => void }) {
  const openDrawer = useAIStore((s) => s.openDrawer)

  const handleClick = () => {
    onOpen?.()
    openDrawer({
      type: 'insight',
      title: insight.title,
      cardData: insight,
    })
  }

  const cfg = priorityConfig[insight.priority]

  return (
    <button
      onClick={handleClick}
      className="w-full text-left bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:border-indigo-200 transition-all group"
    >
      <div className={`h-1 ${cfg.bar}`} />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <Lightbulb size={15} className="text-indigo-500 shrink-0" />
            <h4 className="text-sm font-semibold text-slate-800 truncate">{insight.title}</h4>
          </div>
          <span className={`shrink-0 inline-block px-2 py-0.5 rounded text-[10px] font-medium ${cfg.badge}`}>
            {cfg.label}
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
          {insight.summary}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {insight.tags.map((tag) => (
              <span key={tag} className="inline-block px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-500">
                {tag}
              </span>
            ))}
          </div>
          <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
        </div>
      </div>
    </button>
  )
}

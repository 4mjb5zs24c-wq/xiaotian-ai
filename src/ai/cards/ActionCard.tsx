import { Play, Clock } from 'lucide-react'

interface ActionCardProps {
  title: string
  description: string
  time: string
  type: string
  onClick?: () => void
}

export default function ActionCard({ title, description, time, type, onClick }: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-indigo-200 transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 shrink-0 group-hover:bg-indigo-100 transition-colors">
          <Play size={14} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="text-sm font-semibold text-slate-800 truncate">{title}</h4>
            <span className="shrink-0 inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500">
              {type}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-2 line-clamp-2">{description}</p>
          <span className="flex items-center gap-1 text-[10px] text-slate-400">
            <Clock size={10} />
            {time}
          </span>
        </div>
      </div>
    </button>
  )
}

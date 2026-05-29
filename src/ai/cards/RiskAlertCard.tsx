import { AlertTriangle, ChevronRight, User } from 'lucide-react'
import type { RiskItem } from '../store'
import { useAIStore } from '../store'

const riskConfig = {
  low: { bar: 'bg-slate-300', badge: 'bg-slate-50 text-slate-600', label: '低风险', icon: 'text-slate-400' },
  medium: { bar: 'bg-amber-400', badge: 'bg-amber-50 text-amber-700', label: '中风险', icon: 'text-amber-500' },
  high: { bar: 'bg-red-500', badge: 'bg-red-50 text-red-700', label: '高风险', icon: 'text-red-500' },
}

export default function RiskAlertCard({ risk }: { risk: RiskItem }) {
  const openDrawer = useAIStore((s) => s.openDrawer)

  const handleClick = () => {
    openDrawer({
      type: 'analysis',
      title: risk.title,
      cardData: risk,
    })
  }

  const cfg = riskConfig[risk.riskLevel]

  return (
    <button
      onClick={handleClick}
      className="w-full text-left bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:border-amber-200 transition-all group"
    >
      <div className={`h-1 ${cfg.bar}`} />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <AlertTriangle size={15} className={`${cfg.icon} shrink-0`} />
            <h4 className="text-sm font-semibold text-slate-800 truncate">{risk.title}</h4>
          </div>
          <span className={`shrink-0 inline-block px-2 py-0.5 rounded text-[10px] font-medium ${cfg.badge}`}>
            {cfg.label}
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mb-1 line-clamp-2">
          {risk.description}
        </p>
        {risk.studentName && (
          <p className="flex items-center gap-1 text-[11px] text-slate-400 mb-2">
            <User size={10} />
            {risk.studentName}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {risk.tags.map((tag) => (
              <span key={tag} className="inline-block px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-500">
                {tag}
              </span>
            ))}
          </div>
          <ChevronRight size={14} className="text-slate-300 group-hover:text-amber-400 transition-colors" />
        </div>
      </div>
    </button>
  )
}

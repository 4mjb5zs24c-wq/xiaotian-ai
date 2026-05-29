import { BarChart3, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface SummaryStat {
  label: string
  value: string
  trend?: 'up' | 'down' | 'stable'
  change?: string
}

interface SummaryCardProps {
  title: string
  stats: SummaryStat[]
  onClick?: () => void
}

const trendIcon = {
  up: <TrendingUp size={12} className="text-emerald-500" />,
  down: <TrendingDown size={12} className="text-red-500" />,
  stable: <Minus size={12} className="text-slate-400" />,
}

const trendColor = {
  up: 'text-emerald-600',
  down: 'text-red-500',
  stable: 'text-slate-400',
}

export default function SummaryCard({ title, stats, onClick }: SummaryCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-indigo-200 transition-all"
    >
      <div className="flex items-center gap-2 mb-3">
        <BarChart3 size={15} className="text-indigo-500" />
        <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
      </div>
      <div className="space-y-2.5">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <span className="text-xs text-slate-500">{stat.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-800">{stat.value}</span>
              {stat.trend && (
                <span className={`flex items-center gap-0.5 text-[10px] font-medium ${trendColor[stat.trend]}`}>
                  {trendIcon[stat.trend]}
                  {stat.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </button>
  )
}

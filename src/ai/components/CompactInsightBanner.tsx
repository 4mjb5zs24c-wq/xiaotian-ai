import { AlertTriangle, ChevronRight } from 'lucide-react'
import type { InsightItem } from '../insights/insightTypes'

interface Props {
  insight: InsightItem
  onClick: (insight: InsightItem) => void
}

export default function CompactInsightBanner({ insight, onClick }: Props) {
  const isHigh = insight.riskLevel === 'high'
  const isMedium = insight.riskLevel === 'medium'

  const badgeLabel = isHigh ? '需关注' : isMedium ? '建议关注' : '一般关注'

  const colors = isHigh
    ? { bg: 'bg-red-50/80', border: 'border-red-200', badge: 'bg-red-100 text-red-600', icon: 'text-red-500' }
    : isMedium
      ? { bg: 'bg-amber-50/80', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-600', icon: 'text-amber-500' }
      : { bg: 'bg-blue-50/80', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-600', icon: 'text-blue-500' }

  return (
    <button
      onClick={() => onClick(insight)}
      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border ${colors.bg} ${colors.border} hover:shadow-sm transition-all cursor-pointer group min-w-0`}
    >
      <AlertTriangle size={15} className={`${colors.icon} shrink-0`} />
      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${colors.badge} shrink-0`}>{badgeLabel}</span>
      <span className="text-[13px] font-semibold text-[#3a4f66] truncate">{insight.title}</span>
      <span className="text-[11px] text-[#4b9fe8] group-hover:underline shrink-0 whitespace-nowrap ml-auto">查看分析</span>
      <ChevronRight size={12} className="text-[#b8cde0] group-hover:text-[#4b9fe8] shrink-0" />
    </button>
  )
}

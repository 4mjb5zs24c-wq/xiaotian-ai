import { ChevronRight, TrendingUp, TrendingDown, AlertTriangle, Star } from 'lucide-react'
import type { WritingMetrics } from '../../insights/writingInsightTypes'

interface Props {
  metrics: WritingMetrics
  onWeakStudentsClick: () => void
  onExcellentClick: () => void
}

interface MetricDef {
  key: keyof WritingMetrics
  label: string
  suffix: string
  clickable?: boolean
  trend?: 'up' | 'down' | 'warn'
  trendLabel?: string
  icon?: React.ReactNode
}

const TREND_STYLES: Record<string, { icon: React.ReactNode; className: string }> = {
  up:   { icon: <TrendingUp size={12} />,   className: 'text-emerald-600 bg-emerald-50' },
  down: { icon: <TrendingDown size={12} />, className: 'text-amber-600 bg-amber-50' },
  warn: { icon: <AlertTriangle size={12} />, className: 'text-red-500 bg-red-50' },
}

export default function WritingCoreMetricCards({ metrics, onWeakStudentsClick, onExcellentClick }: Props) {
  const METRIC_DEFS: MetricDef[] = [
    {
      key: 'averageScore', label: '写作平均得分', suffix: `分 / ${metrics.averageLevel}`,
      trend: 'down' as const, trendLabel: '低于年级平均',
    },
    {
      key: 'reviewedEssayCount', label: '已批改作文数', suffix: '篇',
      trend: 'up' as const, trendLabel: '本周新增 12 篇',
    },
    {
      key: 'mainProblemType', label: '主要问题类型', suffix: '',
      trend: 'warn' as const,
    },
    {
      key: 'weakStudentCount', label: '薄弱学生', suffix: '人',
      clickable: true, trend: 'down' as const, trendLabel: '需重点关注',
    },
    {
      key: 'excellentEssayCount', label: '优秀作文', suffix: '篇',
      clickable: true, icon: <Star size={12} />, trend: 'up' as const, trendLabel: '值得展示',
    },
  ]

  return (
    <div className="grid grid-cols-5 gap-3">
      {METRIC_DEFS.map(({ key, label, suffix, clickable, trend, trendLabel }) => {
        const val = metrics[key]
        const isStr = typeof val === 'string'
        const trendStyle = trend ? TREND_STYLES[trend] : null

        return (
          <div
            key={key}
            onClick={() => {
              if (key === 'weakStudentCount') onWeakStudentsClick()
              if (key === 'excellentEssayCount') onExcellentClick()
            }}
            className={`group relative bg-white rounded-xl border border-slate-200/60 p-5
              transition-all duration-300 ease-out
              ${clickable ? 'cursor-pointer hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 hover:-translate-y-0.5' : ''}`}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-medium text-slate-400 tracking-wide uppercase">{label}</p>
              {trendStyle && trendLabel && (
                <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${trendStyle.className}`}>
                  {trendStyle.icon}
                  {trendLabel}
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-0.5">
              <span className={`font-bold tracking-tight leading-none
                ${isStr ? 'text-[18px] text-blue-600' : 'text-[34px] text-slate-800'}`}>
                {val as string | number}
              </span>
              {!isStr && <span className="text-xs font-medium text-slate-400">{suffix}</span>}
              {isStr && <span className="text-xs font-medium text-slate-400 ml-1">{suffix.split(' / ')[1]}</span>}
            </div>

            {clickable && (
              <div className="flex items-center gap-0.5 mt-2 text-[11px] font-medium text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                查看详情 <ChevronRight size={10} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

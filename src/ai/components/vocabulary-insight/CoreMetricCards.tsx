import { ChevronRight, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'
import type { VocabularyMetrics } from '../../insights/vocabularyInsightTypes'

interface Props { metrics: VocabularyMetrics; onWeakWordsClick: () => void; onWeakStudentsClick: () => void }

interface MetricDef {
  key: keyof VocabularyMetrics
  label: string
  suffix: string
  clickable?: boolean
  trend?: 'up' | 'down' | 'warn'
  trendLabel?: string
}

const METRICS: MetricDef[] = [
  {
    key: 'practicedWordCount', label: '已练词汇数', suffix: '个',
  },
  {
    key: 'weakWordCount', label: '高频错词 / 语块', suffix: '个',
    clickable: true, trend: 'warn', trendLabel: '需关注',
  },
  {
    key: 'weakStudentCount', label: '薄弱学生', suffix: '人',
    clickable: true, trend: 'down', trendLabel: '较上月 +2',
  },
  {
    key: 'mainWeakType', label: '主要薄弱类型', suffix: '',
    trend: 'warn',
  },
]

const TREND_STYLES: Record<string, { icon: React.ReactNode; className: string }> = {
  up:   { icon: <TrendingUp size={12} />,   className: 'text-emerald-600 bg-emerald-50' },
  down: { icon: <TrendingDown size={12} />, className: 'text-amber-600 bg-amber-50' },
  warn: { icon: <AlertTriangle size={12} />, className: 'text-red-500 bg-red-50' },
}

export default function CoreMetricCards({ metrics, onWeakWordsClick, onWeakStudentsClick }: Props) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {METRICS.map(({ key, label, suffix, clickable, trend, trendLabel }) => {
        const val = metrics[key]
        const isStr = typeof val === 'string'

        const trendStyle = trend ? TREND_STYLES[trend] : null

        return (
          <div
            key={key}
            onClick={() => {
              if (key === 'weakWordCount') onWeakWordsClick()
              if (key === 'weakStudentCount') onWeakStudentsClick()
            }}
            className={`
              group relative bg-white rounded-xl border border-slate-200/60 p-5
              transition-all duration-300 ease-out
              ${clickable
                ? 'cursor-pointer hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 hover:-translate-y-0.5'
                : ''}
            `}
          >
            {/* Top row: label + trend */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-medium text-slate-400 tracking-wide uppercase">{label}</p>
              {trendStyle && trendLabel && (
                <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${trendStyle.className}`}>
                  {trendStyle.icon}
                  {trendLabel}
                </span>
              )}
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-0.5">
              <span className={`font-bold tracking-tight leading-none
                ${isStr ? 'text-[18px] text-amber-600' : 'text-[34px] text-slate-800'}`}>
                {val as string | number}
              </span>
              {!isStr && (
                <span className="text-xs font-medium text-slate-400">{suffix}</span>
              )}
            </div>

            {/* Bottom: clickable indicator */}
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

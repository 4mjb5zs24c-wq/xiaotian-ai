import { ChevronRight, TrendingDown, AlertTriangle } from 'lucide-react'
import type { VocabularyMetrics } from '../../insights/vocabularyInsightTypes'

interface Props { metrics: VocabularyMetrics; onWeakWordsClick: () => void; onWeakStudentsClick: () => void }

interface MetricDef {
  key: keyof VocabularyMetrics
  label: string
  suffix: string
  tip: string
  clickable?: boolean
  trend?: 'down' | 'warn'
  trendLabel?: string
}

const METRICS: MetricDef[] = [
  {
    key: 'practicedWordCount', label: '已练词汇数', suffix: '个',
    tip: '当前时间范围内，班级学生完成过练习的去重词汇数。',
  },
  {
    key: 'weakWordCount', label: '高频错词', suffix: '个',
    tip: '按错误率、涉及学生数、错误次数综合排序后筛选出的重点错词。',
    clickable: true, trend: 'warn', trendLabel: '需关注',
  },
  {
    key: 'weakStudentCount', label: '薄弱学生', suffix: '人',
    tip: '当前时间范围内，词汇错误率偏高，且错误词数量达到阈值的学生。',
    clickable: true, trend: 'down', trendLabel: '较上月 +2',
  },
  {
    key: 'mainWeakType', label: '主要薄弱类型', suffix: '',
    tip: 'AI根据学生作答结果自动归类出的主要错误类型。',
    trend: 'warn',
  },
]

const TREND_STYLES: Record<string, { icon: React.ReactNode; className: string }> = {
  down: { icon: <TrendingDown size={12} />, className: 'text-amber-600 bg-amber-50' },
  warn: { icon: <AlertTriangle size={12} />, className: 'text-red-500 bg-red-50' },
}

export default function CoreMetricCards({ metrics, onWeakWordsClick, onWeakStudentsClick }: Props) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {METRICS.map(({ key, label, suffix, tip, clickable, trend, trendLabel }) => {
        const val = metrics[key]
        const isStr = typeof val === 'string'
        const trendStyle = trend ? TREND_STYLES[trend] : null

        return (
          <div
            key={key}
            title={tip}
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
            {/* Top row: label + tooltip icon + trend */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <p className="text-[11px] font-medium text-slate-400 tracking-wide uppercase">{label}</p>
                <span className="text-[10px] text-slate-300 cursor-help" title={tip}>?</span>
              </div>
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

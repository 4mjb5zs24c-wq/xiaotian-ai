import { Clock, BookOpen, Brain } from 'lucide-react'
import type { TimeRange } from '../../insights/vocabularyInsightTypes'
import { TIME_RANGE_LABELS } from '../../insights/vocabularyInsightTypes'

interface Props {
  timeRange: TimeRange; onTimeRangeChange: (r: TimeRange) => void; className: string; updatedAt: string
}

const RANGES: TimeRange[] = ['7d', '14d', '30d', 'semester', 'current_unit']

export default function VocabularyInsightHeader({ timeRange, onTimeRangeChange, className, updatedAt }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm shadow-blue-200">
          <Brain size={17} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">词汇洞察</h1>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <BookOpen size={11} className="text-slate-400" />
              {className}
            </span>
            <span className="text-slate-300 text-xs">·</span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock size={11} />
              {updatedAt}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 self-start">
        {RANGES.map(r => (
          <button
            key={r}
            onClick={() => onTimeRangeChange(r)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
              ${timeRange === r
                ? 'bg-white text-slate-800 shadow-sm shadow-slate-200/50'
                : 'text-slate-500 hover:text-slate-700'}`}
          >
            {TIME_RANGE_LABELS[r]}
          </button>
        ))}
      </div>
    </div>
  )
}

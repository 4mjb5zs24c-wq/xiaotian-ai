import React from 'react'
import { ArrowRight } from 'lucide-react'
import type { PrecisionJumpData } from '../../search-new/types'

interface PrecisionJumpCardProps {
  data: PrecisionJumpData
  onNavigate: (route: string) => void
}

/**
 * V1.1 Precision Jump Card.
 *
 * Clean, lightweight card shown when search matches an intent
 * that is "recognized but not directly handled by search".
 * No orange warning badges — just clear guidance.
 */
const PrecisionJumpCard: React.FC<PrecisionJumpCardProps> = ({ data, onNavigate }) => {
  const descriptionLines = data.description.split('\n').filter(Boolean)

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="px-5 py-4">
        {/* Description */}
        <div className="space-y-1 mb-4">
          {descriptionLines.map((line, i) => (
            <p key={i} className="text-[13px] text-slate-500 leading-relaxed">
              {line}
            </p>
          ))}
        </div>

        {/* Action button */}
        {data.routeConfirmed ? (
          <button
            onClick={() => data.route && onNavigate(data.route)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold
              bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200/40
              transition-all duration-200 active:scale-[0.98]"
          >
            {data.buttonText}
            <ArrowRight size={14} />
          </button>
        ) : (
          <button
            disabled
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold
              bg-slate-200 text-slate-400 cursor-not-allowed"
            title="该功能路由尚未确定"
          >
            {data.buttonText}
            <span className="text-[10px] text-slate-400">（路由待确认）</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default PrecisionJumpCard

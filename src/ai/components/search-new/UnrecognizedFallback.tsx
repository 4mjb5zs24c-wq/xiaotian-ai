import React from 'react'
import { Search, ArrowRight, Compass } from 'lucide-react'
import type { SearchSuggestion, CommonFunction } from '../../search-new/types'

interface UnrecognizedFallbackProps {
  query: string
  message: string
  suggestions: SearchSuggestion[]
  commonFunctions: CommonFunction[]
  onSuggestionClick: (query: string) => void
}

/**
 * V1.1 Unrecognized Fallback.
 *
 * Shown when the search query cannot be matched to any intent,
 * keyword, alias, resource name, or scenario word.
 *
 * Two sections:
 *   "你可以试试这样搜索" — clickable search suggestion chips
 *   "常用功能推荐" — common function quick-entry cards
 */
const UnrecognizedFallback: React.FC<UnrecognizedFallbackProps> = ({
  query: _query,
  message,
  suggestions,
  commonFunctions,
  onSuggestionClick,
}) => {
  const messageLines = message.split('\n').filter(Boolean)

  return (
    <div className="space-y-5">
      {/* Top message */}
      <div className="flex items-start gap-2.5 px-4 py-3 bg-blue-50/40 border border-blue-100/30 rounded-xl">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
        <div>
          {messageLines.map((line, i) => (
            <p
              key={i}
              className={`text-[13px] leading-relaxed ${
                i === 0 ? 'text-slate-700 font-medium' : 'text-slate-500'
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Section 1: Search suggestions */}
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <Search size={13} className="text-blue-400" />
          <span className="text-[12px] font-semibold text-slate-500">
            你可以试试这样搜索
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s.text}
              onClick={() => onSuggestionClick(s.query)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-medium
                bg-white border border-slate-200/60 text-slate-600
                hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/50
                transition-all duration-150"
            >
              {s.text}
              <ArrowRight size={11} className="text-slate-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Section 2: Common functions */}
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <Compass size={13} className="text-blue-400" />
          <span className="text-[12px] font-semibold text-slate-500">
            常用功能推荐
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {commonFunctions.map((f) => (
            <button
              key={f.key}
              onClick={() => onSuggestionClick(f.query)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl
                bg-white border border-slate-200/50
                hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-[0_2px_6px_rgba(0,0,0,0.03)]
                transition-all duration-150 text-left group"
            >
              <span className="text-[13px] font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                {f.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UnrecognizedFallback

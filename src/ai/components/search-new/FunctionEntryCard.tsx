import React from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import type { FunctionEntry } from '../../search-new/types'

interface FunctionEntryCardProps {
  entry: FunctionEntry
  onClick: (entry: FunctionEntry) => void
}

const FunctionEntryCard: React.FC<FunctionEntryCardProps> = ({ entry, onClick }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 hover:border-blue-300 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 shadow-sm shadow-blue-200">
          <Sparkles size={15} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-slate-800">{entry.name}</h4>
          <p className="text-[13px] text-slate-500 mt-0.5">{entry.recommendReason}</p>
        </div>
        <button
          onClick={() => onClick(entry)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-500 text-white text-[13px] font-semibold
            hover:bg-blue-600 shadow-sm shadow-blue-200 transition-all duration-200 shrink-0"
        >
          <span>立即进入</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}

export default FunctionEntryCard

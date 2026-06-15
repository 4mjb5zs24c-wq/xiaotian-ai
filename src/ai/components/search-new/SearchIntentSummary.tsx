import React from 'react'
import { Sparkles } from 'lucide-react'
import type { SearchIntentInfo } from '../../search-new/types'

interface SearchIntentSummaryProps {
  intent: SearchIntentInfo
}

const SearchIntentSummary: React.FC<SearchIntentSummaryProps> = ({ intent }) => {
  return (
    <div className="flex items-center gap-2.5 px-4 py-3 bg-blue-50/40 border border-blue-100/40 rounded-xl">
      <Sparkles size={14} className="text-blue-400 shrink-0" />
      <span className="text-[13px] text-slate-500 leading-relaxed">{intent.message}</span>
    </div>
  )
}

export default SearchIntentSummary

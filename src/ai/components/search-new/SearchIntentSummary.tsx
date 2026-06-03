import React from 'react'
import { Sparkles } from 'lucide-react'
import type { SearchIntentInfo } from '../../search-new/types'

interface SearchIntentSummaryProps {
  intent: SearchIntentInfo
}

const SearchIntentSummary: React.FC<SearchIntentSummaryProps> = ({ intent }) => {
  return (
    <div className="flex items-center gap-2.5 px-4 py-3 bg-blue-50/60 border border-blue-100/60 rounded-xl">
      <Sparkles size={15} className="text-blue-500 shrink-0" />
      <span className="text-[14px] text-slate-600 leading-relaxed">{intent.message}</span>
    </div>
  )
}

export default SearchIntentSummary

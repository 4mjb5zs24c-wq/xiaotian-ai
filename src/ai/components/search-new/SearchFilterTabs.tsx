import React from 'react'
import type { FilterTab } from '../../search-new/types'

interface SearchFilterTabsProps {
  tabs: FilterTab[]
  activeTab: string
  onTabChange: (category: string) => void
}

const SearchFilterTabs: React.FC<SearchFilterTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  const realCategories = tabs.filter((t) => t.category !== 'all')
  if (realCategories.length <= 1) return null

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
      {tabs.map((tab) => {
        const isActive = tab.category === activeTab
        return (
          <button
            key={tab.category}
            onClick={() => onTabChange(tab.category)}
            className={`flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200
              ${isActive
                ? 'bg-blue-500 text-white shadow-sm shadow-blue-200'
                : 'bg-white border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600'
              }`}
          >
            {tab.label}
            <span className={`text-[11px] ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
              {tab.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default SearchFilterTabs

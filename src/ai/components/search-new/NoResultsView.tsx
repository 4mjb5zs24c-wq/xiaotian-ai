import React from 'react'
import { Search, BookOpen, FileText, Headphones, ArrowRight } from 'lucide-react'
import type { AlternativeRecommendation, QuickEntry } from '../../search-new/types'
import ResourceCard from './ResourceCard'
import type { ResourceItem } from '../../search-new/types'

interface NoResultsViewProps {
  alternatives?: AlternativeRecommendation[]
  quickEntries?: QuickEntry[]
  isUnrecognizable?: boolean
  onPreview: (item: ResourceItem) => void
  onAssign: (item: ResourceItem) => void
  onAddToPaperBasket: (item: ResourceItem) => void
  onAddToLessonPrep: (item: ResourceItem) => void
  onQuickEntry: (entry: QuickEntry) => void
}

const iconMap: Record<string, React.ReactNode> = {
  BookOpen: <BookOpen size={20} />,
  FileText: <FileText size={20} />,
  Headphones: <Headphones size={20} />,
}

const NoResultsView: React.FC<NoResultsViewProps> = ({
  alternatives,
  quickEntries,
  isUnrecognizable,
  onPreview,
  onAssign,
  onAddToPaperBasket,
  onAddToLessonPrep,
  onQuickEntry,
}) => {
  // Completely unrecognizable: quick entry cards
  if (isUnrecognizable && quickEntries && quickEntries.length > 0) {
    return (
      <div className="space-y-5">
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
            <Search size={24} className="text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-600 mb-1">小天暂时无法理解你的搜索内容</p>
          <p className="text-xs text-slate-400">试试以下快捷入口，或换一种方式描述</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickEntries.map((entry) => (
            <button
              key={entry.id}
              onClick={() => onQuickEntry(entry)}
              className="flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-dashed
                border-slate-200 hover:border-blue-300 hover:bg-blue-50/30
                transition-all duration-200 text-center group"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500
                group-hover:bg-blue-100 transition-colors">
                {iconMap[entry.icon] || <Search size={20} />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700">{entry.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{entry.description}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-blue-500 font-medium">
                <span>试试这个</span>
                <ArrowRight size={12} />
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Has alternatives: grouped recommendations
  if (alternatives && alternatives.length > 0) {
    return (
      <div className="space-y-4">
        {alternatives.map((alt) => (
          <div key={alt.label} className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg
                ${alt.label === '当前单元' ? 'bg-blue-50 text-blue-600' :
                  alt.label === '同年级推荐' ? 'bg-amber-50 text-amber-600' :
                  'bg-slate-100 text-slate-500'}`}
              >
                {alt.label}
              </span>
              <span className="text-xs text-slate-400">{alt.items.length}条</span>
            </div>
            <div className="space-y-2">
              {alt.items.map((item) => (
                <ResourceCard
                  key={item.id}
                  item={item}
                  onPreview={onPreview}
                  onAssign={onAssign}
                  onAddToPaperBasket={onAddToPaperBasket}
                  onAddToLessonPrep={onAddToLessonPrep}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Generic no results
  return (
    <div className="text-center py-10 space-y-3">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">
        <Search size={24} className="text-slate-400" />
      </div>
      <p className="text-sm font-medium text-slate-500">未找到相关资源</p>
      <p className="text-xs text-slate-400">请尝试更换搜索词或使用更具体的描述</p>
    </div>
  )
}

export default NoResultsView

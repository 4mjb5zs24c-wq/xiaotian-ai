import React from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { ResourceGroup as ResourceGroupType } from '../../search-new/types'

interface ResourceGroupProps {
  group: ResourceGroupType
  expanded: boolean
  showAll: boolean
  onToggleExpand: () => void
  onToggleShowAll: () => void
  children: React.ReactNode
  grid?: boolean
}

const ResourceGroup: React.FC<ResourceGroupProps> = ({
  group,
  expanded,
  showAll,
  onToggleExpand,
  onToggleShowAll,
  children,
  grid = false,
}) => {
  const visibleCount = showAll ? group.items.length : Math.min(group.displayLimit, group.items.length)
  const hasMore = group.items.length > group.displayLimit

  return (
    <div className="border border-slate-200/60 rounded-2xl overflow-hidden bg-white">
      {/* Group Header */}
      <button
        onClick={onToggleExpand}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors duration-150"
      >
        <div className="flex items-center gap-2.5">
          {expanded ? (
            <ChevronDown size={15} className="text-slate-400" />
          ) : (
            <ChevronRight size={15} className="text-slate-400" />
          )}
          <span className="text-sm font-semibold text-slate-800">{group.groupName}</span>
          {group.altLabel && (
            <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-500 font-medium">
              {group.altLabel}
            </span>
          )}
          <span className="text-[13px] text-slate-400">({group.items.length}条)</span>
        </div>
      </button>

      {/* Recommendation hint */}
      {(expanded && group.recommendationText) && (
        <div className="px-5 py-2.5 bg-amber-50/20 border-y border-amber-100/20 text-[12px] text-slate-500">
          匹配说明：{group.recommendationText}
        </div>
      )}

      {/* Group Body */}
      {expanded && (
        <div className={grid
          ? 'p-4 grid grid-cols-1 lg:grid-cols-2 gap-3'
          : 'p-4 space-y-3'
        }>
          {React.Children.count(children) > 0 ? (
            <>
              {React.Children.toArray(children).slice(0, visibleCount)}
              {hasMore && (
                <button
                  onClick={onToggleShowAll}
                  className={`py-2.5 text-center text-[13px] font-medium text-blue-500 hover:text-blue-600
                    border border-dashed border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50
                    transition-all duration-200 ${grid ? 'col-span-full' : 'w-full'}`}
                >
                  {showAll ? '收起' : `查看全部 ${group.items.length} 条`}
                </button>
              )}
            </>
          ) : (
            <p className={`text-[13px] text-slate-400 text-center py-3 ${grid ? 'col-span-full' : ''}`}>暂无资源</p>
          )}
        </div>
      )}
    </div>
  )
}

export default ResourceGroup

import React from 'react'
import { ChevronDown, ChevronRight, Square, CheckSquare } from 'lucide-react'
import type { SyncVocabData, VocabWord, ChunkItem } from '../../search-new/types'

interface SyncVocabSectionProps {
  data: SyncVocabData
  selectedIds: Set<string>
  expandedSections: Set<string>
  showAllSections: Set<string>
  onToggleWord: (wordId: string) => void
  onToggleSectionAll: (sectionId: string, itemIds: string[]) => void
  onToggleSectionExpand: (sectionId: string) => void
  onToggleShowAll: (sectionId: string) => void
}

function isVocabWord(item: VocabWord | ChunkItem): item is VocabWord {
  return 'word' in item
}

const SyncVocabSection: React.FC<SyncVocabSectionProps> = ({
  data,
  selectedIds,
  expandedSections,
  showAllSections,
  onToggleWord,
  onToggleSectionAll,
  onToggleSectionExpand,
  onToggleShowAll,
}) => {
  return (
    <div className="space-y-3">
      {data.sections.map((section) => {
        const isExpanded = expandedSections.has(section.sectionId)
        const showAll = showAllSections.has(section.sectionId)
        const visibleItems = showAll
          ? section.items
          : section.items.slice(0, section.defaultLimit)
        const hasMore = section.items.length > section.defaultLimit
        const sectionItemIds = section.items.map((i) => i.id)
        const selectedInSection = section.items.filter((i) => selectedIds.has(i.id))
        const allSelected = section.items.length > 0 && selectedInSection.length === section.items.length
        const someSelected = selectedInSection.length > 0 && !allSelected

        return (
          <div key={section.sectionId} className="border border-slate-200 rounded-2xl overflow-hidden">
            {/* Section Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#f8fafb] border-b border-[#e8ecf0]">
              <div className="flex items-center gap-2">
                <button onClick={() => onToggleSectionExpand(section.sectionId)}>
                  {isExpanded ? (
                    <ChevronDown size={16} className="text-[#64748b]" />
                  ) : (
                    <ChevronRight size={16} className="text-[#64748b]" />
                  )}
                </button>
                <span className="text-sm font-semibold text-[#1e293b]">{section.sectionName}</span>
                <span className="text-sm text-[#94a3b8]">({section.items.length}条)</span>
                {selectedInSection.length > 0 && (
                  <span className="text-sm text-[#4b9fe8] font-medium">
                    已选 {selectedInSection.length}
                  </span>
                )}
              </div>
              <button
                onClick={() => onToggleSectionAll(section.sectionId, sectionItemIds)}
                className="flex items-center gap-3 text-sm text-[#4b9fe8] hover:text-[#3a8dd4] font-medium"
              >
                {allSelected ? (
                  <CheckSquare size={16} />
                ) : someSelected ? (
                  <Square size={16} className="text-[#bbb]" />
                ) : (
                  <Square size={16} className="text-[#bbb]" />
                )}
                {allSelected ? '取消全选' : `全选${section.sectionName.replace('词汇', '词')}`}
              </button>
            </div>

            {/* Section Body */}
            {isExpanded && (
              <div className="p-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {visibleItems.map((item) => {
                    const id = item.id
                    const isSelected = selectedIds.has(id)
                    const label = isVocabWord(item) ? item.word : item.text
                    const sub = isVocabWord(item) ? item.chinese : item.translation

                    return (
                      <button
                        key={id}
                        onClick={() => onToggleWord(id)}
                        className={`flex items-center gap-3 px-3.5 py-2 rounded-lg text-left transition-all duration-150
                          ${isSelected
                            ? 'bg-blue-50 border border-blue-200 text-slate-800'
                            : 'bg-white border border-[#e8ecf0] text-[#3a4f66] hover:border-[#d0dce8]'
                          }`}
                      >
                        {isSelected ? (
                          <CheckSquare size={16} className="text-[#4b9fe8] flex-shrink-0" />
                        ) : (
                          <Square size={16} className="text-[#ccc] flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                          <div className="text-[13px] font-medium truncate">{label}</div>
                          <div className="text-[13px] text-[#94a3b8] truncate">{sub}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
                {hasMore && (
                  <button
                    onClick={() => onToggleShowAll(section.sectionId)}
                    className="w-full mt-2 py-1.5 text-center text-sm text-[#4b9fe8] hover:text-[#3a8dd4] font-medium"
                  >
                    {showAll ? '收起' : `展开全部 ${section.items.length} 条`}
                  </button>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default SyncVocabSection

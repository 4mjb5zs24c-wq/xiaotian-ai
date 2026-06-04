import React, { useState, useCallback, useMemo } from 'react'
import type {
  NewSearchResult,
  ResourceItem,
  FunctionEntry,
  AssignmentDraft,
  QuickEntry,
  PaperBasketItem,
} from '../../search-new/types'
import SearchIntentSummary from './SearchIntentSummary'
import SearchFilterTabs from './SearchFilterTabs'
import ResourceGroup from './ResourceGroup'
import ResourceCard from './ResourceCard'
import ContentSelectResource from './ContentSelectResource'
import FunctionEntryCard from './FunctionEntryCard'
import NoResultsView from './NoResultsView'

interface SearchResultViewProps {
  result: NewSearchResult
  paperBasket: PaperBasketItem[]
  onPreview: (item: ResourceItem) => void
  onAssign: (item: ResourceItem) => void
  onAddToPaperBasket: (item: ResourceItem) => void
  onAddToLessonPrep: (item: ResourceItem) => void
  onOpenFunction: (entry: FunctionEntry) => void
  onGenerateAssignments: (assignments: AssignmentDraft[]) => void
  onQuickEntry: (entry: QuickEntry) => void
}

const SearchResultView: React.FC<SearchResultViewProps> = ({
  result,
  paperBasket,
  onPreview,
  onAssign,
  onAddToPaperBasket,
  onAddToLessonPrep,
  onOpenFunction,
  onGenerateAssignments,
  onQuickEntry,
}) => {
  const [activeTab, setActiveTab] = useState('all')
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => {
    const ids = new Set<string>()
    result.resourceGroups.forEach((g) => {
      if (g.defaultExpanded) ids.add(g.groupId)
    })
    return ids
  })
  const [showAllGroups, setShowAllGroups] = useState<Set<string>>(new Set())

  const toggleGroupExpand = useCallback((groupId: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(groupId)) next.delete(groupId)
      else next.add(groupId)
      return next
    })
  }, [])

  const toggleGroupShowAll = useCallback((groupId: string) => {
    setShowAllGroups((prev) => {
      const next = new Set(prev)
      if (next.has(groupId)) next.delete(groupId)
      else next.add(groupId)
      return next
    })
  }, [])

  const isInPaperBasket = useCallback(
    (item: ResourceItem) => paperBasket.some((pb) => pb.resourceId === item.id),
    [paperBasket],
  )

  const filteredGroups = useMemo(() => {
    if (activeTab === 'all') return result.resourceGroups
    return result.resourceGroups.filter((g) => {
      if (g.matchCategory) return g.matchCategory === activeTab
      return g.items.some((item) => item.type === activeTab)
    })
  }, [result.resourceGroups, activeTab])

  // No results at all
  if (result.isNoResults || result.isUnrecognizable) {
    // If we have function entries (e.g. single-word search → 讲词), just show those
    if (result.functionEntries.length > 0) {
      return (
        <div className="space-y-4">
          <SearchIntentSummary intent={result.intent} />
          <div className="space-y-2">
            {result.functionEntries.map((entry) => (
              <FunctionEntryCard
                key={entry.id}
                entry={entry}
                onClick={onOpenFunction}
              />
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <NoResultsView
          alternatives={result.alternatives}
          quickEntries={result.quickEntries}
          isUnrecognizable={result.isUnrecognizable}
          onPreview={onPreview}
          onAssign={onAssign}
          onAddToPaperBasket={onAddToPaperBasket}
          onAddToLessonPrep={onAddToLessonPrep}
          onQuickEntry={onQuickEntry}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Intent Summary */}
      <SearchIntentSummary intent={result.intent} />

      {/* Filter Tabs — only show when > 1 real category */}
      {result.filterTabs.length > 1 && (
        <SearchFilterTabs
          tabs={result.filterTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      )}

      {/* Function Entries */}
      {result.functionEntries.length > 0 && (
        <div className="space-y-2">
          {result.functionEntries.map((entry) => (
            <FunctionEntryCard
              key={entry.id}
              entry={entry}
              onClick={onOpenFunction}
            />
          ))}
        </div>
      )}

      {/* Resource Groups */}
      {filteredGroups.map((group) => {
        const isExpanded = expandedGroups.has(group.groupId)
        const showAll = showAllGroups.has(group.groupId)

        return (
          <ResourceGroup
            key={group.groupId}
            group={group}
            expanded={isExpanded}
            showAll={showAll}
            grid={group.groupType !== 'sync_vocab' && group.groupType !== 'sync_text'}
            onToggleExpand={() => toggleGroupExpand(group.groupId)}
            onToggleShowAll={() => toggleGroupShowAll(group.groupId)}
          >
            {group.groupType === 'sync_vocab' || group.groupType === 'sync_text' ? (
              group.items.map((item) => (
                <ContentSelectResource
                  key={item.id}
                  item={item}
                  onGenerateAssignments={onGenerateAssignments}
                />
              ))
            ) : (
              group.items.map((item) => (
                <ResourceCard
                  key={item.id}
                  item={item}
                  onPreview={onPreview}
                  onAssign={onAssign}
                  onAddToPaperBasket={onAddToPaperBasket}
                  onAddToLessonPrep={onAddToLessonPrep}
                  isInPaperBasket={isInPaperBasket(item)}
                />
              ))
            )}
          </ResourceGroup>
        )
      })}
    </div>
  )
}

export default SearchResultView

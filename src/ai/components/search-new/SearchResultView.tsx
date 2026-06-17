import React, { useState, useCallback, useMemo } from 'react'
import { Sparkles, Lightbulb } from 'lucide-react'
import type {
  NewSearchResult,
  ResourceItem,
  FunctionEntry,
  AssignmentDraft,
  QuickEntry,
  PaperBasketItem,
  EnhancedSearchResult,
  PrecisionJumpData,
  SearchSuggestion,
  CommonFunction,
  FilterTab,
} from '../../search-new/types'
import type { ResourceGroup as ResourceGroupType } from '../../search-new/types'
import { searchResourceCategoryLabel } from '../../search-new/types'
import type { SearchResourceCategory } from '../../search-new/types'
import AIUnderstandingText from './AIUnderstandingText'
import ResourceGroupComp from './ResourceGroup'
import ResourceCard from './ResourceCard'
import ContentSelectResource from './ContentSelectResource'
import FunctionEntryCard from './FunctionEntryCard'
import NoResultsView from './NoResultsView'
import PrecisionJumpCard from './PrecisionJumpCard'
import UnrecognizedFallback from './UnrecognizedFallback'

interface SearchResultViewProps {
  result?: NewSearchResult
  enhancedResult?: EnhancedSearchResult
  precisionJump?: PrecisionJumpData
  unrecognizedQuery?: string
  unrecognizedMessage?: string
  suggestions?: SearchSuggestion[]
  commonFunctions?: CommonFunction[]
  paperBasket: PaperBasketItem[]
  onPreview: (item: ResourceItem) => void
  onAssign: (item: ResourceItem) => void
  onAddToPaperBasket: (item: ResourceItem) => void
  onAddToLessonPrep: (item: ResourceItem) => void
  onOpenFunction: (entry: FunctionEntry) => void
  onGenerateAssignments: (assignments: AssignmentDraft[]) => void
  onQuickEntry: (entry: QuickEntry) => void
  onSuggestionClick?: (query: string) => void
  onNavigate?: (route: string) => void
}

// ── Helpers ───────────────────────────────────────────────

function buildSectionTabs(groups: ResourceGroupType[]): FilterTab[] {
  const typeMap = new Map<string, { label: string; count: number }>()
  for (const g of groups) {
    for (const item of g.items) {
      const existing = typeMap.get(item.type)
      if (existing) {
        existing.count++
      } else {
        typeMap.set(item.type, {
          label: searchResourceCategoryLabel[item.type] || item.type,
          count: 1,
        })
      }
    }
  }
  const total = groups.reduce((sum, g) => sum + g.items.length, 0)
  const tabs: FilterTab[] = [{ category: 'all', label: '全部', count: total }]
  for (const [key, { label, count }] of typeMap) {
    tabs.push({ category: key as SearchResourceCategory, label, count })
  }
  return tabs
}

function filterGroupsByCategory(
  groups: ResourceGroupType[],
  category: string,
): ResourceGroupType[] {
  if (category === 'all') return groups
  return groups
    .map((g) => ({
      ...g,
      items: g.items.filter((item) => item.type === category),
    }))
    .filter((g) => g.items.length > 0)
}

// ── Per-section filter tabs ───────────────────────────────

const SectionFilterTabs: React.FC<{
  tabs: FilterTab[]
  activeKey: string
  onChange: (key: string) => void
}> = ({ tabs, activeKey, onChange }) => {
  if (tabs.length <= 1) return null
  return (
    <div className="flex items-center gap-1.5 flex-wrap mb-3">
      {tabs.map((tab) => (
        <button
          key={tab.category}
          onClick={() => onChange(tab.category)}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
            activeKey === tab.category
              ? 'bg-blue-100 text-blue-700'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
          }`}
        >
          {tab.label}
          <span className="ml-1 text-[10px] opacity-60">{tab.count}</span>
        </button>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
// Main component
// ═══════════════════════════════════════════════════════════

const SearchResultView: React.FC<SearchResultViewProps> = ({
  result,
  enhancedResult,
  precisionJump,
  unrecognizedQuery,
  unrecognizedMessage,
  suggestions,
  commonFunctions,
  paperBasket,
  onPreview,
  onAssign,
  onAddToPaperBasket,
  onAddToLessonPrep,
  onOpenFunction,
  onGenerateAssignments,
  onQuickEntry,
  onSuggestionClick,
  onNavigate,
}) => {
  // Per-section category state
  const [matchTab, setMatchTab] = useState('all')
  const [relatedTab, setRelatedTab] = useState('all')
  // Show-all counts per section and group
  const [showAllMatch, setShowAllMatch] = useState(false)
  const [showAllRelated, setShowAllRelated] = useState(false)

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => {
    const ids = new Set<string>()
    const groups = enhancedResult
      ? [...enhancedResult.smartMatchGroups, ...enhancedResult.smartRelatedGroups]
      : result?.resourceGroups || []
    groups.forEach((g) => {
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

  // ── Precision Jump ─────────────────────────────────────
  if (precisionJump && onNavigate) {
    return <PrecisionJumpCard data={precisionJump} onNavigate={onNavigate} />
  }

  // ── Unrecognized Fallback ──────────────────────────────
  if (unrecognizedQuery && unrecognizedMessage && suggestions && commonFunctions && onSuggestionClick) {
    return (
      <UnrecognizedFallback
        query={unrecognizedQuery}
        message={unrecognizedMessage}
        suggestions={suggestions}
        commonFunctions={commonFunctions}
        onSuggestionClick={onSuggestionClick}
      />
    )
  }

  const effectiveResult = enhancedResult?.original || result
  const aiText = enhancedResult?.aiUnderstandingText
  const smartMatchGroups = enhancedResult?.smartMatchGroups
  const smartRelatedGroups = enhancedResult?.smartRelatedGroups

  if (!effectiveResult) {
    return <div className="text-center py-10"><p className="text-sm text-slate-400">暂无搜索结果</p></div>
  }

  // ── v1.0 compat no-results ─────────────────────────────
  const useV1Layout = !enhancedResult
  if (useV1Layout && (effectiveResult.isNoResults || effectiveResult.isUnrecognizable)) {
    if (effectiveResult.functionEntries.length > 0) {
      return (
        <div className="space-y-4">
          <AIUnderstandingText text={effectiveResult.intent.message} />
          <div className="space-y-2">
            {effectiveResult.functionEntries.map((entry) => (
              <FunctionEntryCard key={entry.id} entry={entry} onClick={onOpenFunction} />
            ))}
          </div>
        </div>
      )
    }
    return (
      <div className="space-y-4">
        <NoResultsView
          alternatives={effectiveResult.alternatives}
          quickEntries={effectiveResult.quickEntries}
          isUnrecognizable={effectiveResult.isUnrecognizable}
          onPreview={onPreview}
          onAssign={onAssign}
          onAddToPaperBasket={onAddToPaperBasket}
          onAddToLessonPrep={onAddToLessonPrep}
          onQuickEntry={onQuickEntry}
        />
      </div>
    )
  }

  // ── Render items for a single ResourceGroup ────────────
  const renderGroupWrapper = (group: ResourceGroupType) => {
    const isExpanded = expandedGroups.has(group.groupId)
    const showAll = showAllGroups.has(group.groupId)

    return (
      <ResourceGroupComp
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
            <ContentSelectResource key={item.id} item={item} onGenerateAssignments={onGenerateAssignments} />
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
      </ResourceGroupComp>
    )
  }

  // ── Flat card grid (no group wrapper) ──────────────────
  const renderFlatCards = (items: ResourceItem[], showAll: boolean, onToggle: () => void) => {
    const displayLimit = 5
    const visible = showAll ? items : items.slice(0, displayLimit)
    const hasMore = items.length > displayLimit
    const isVocabOrText = items.length > 0 &&
      (items[0].type === 'sync_vocab' || items[0].type === 'sync_text')

    return (
      <div className="space-y-2">
        <div className={isVocabOrText ? 'space-y-3' : 'grid grid-cols-1 lg:grid-cols-2 gap-3'}>
          {visible.map((item) => (
            isVocabOrText ? (
              <ContentSelectResource key={item.id} item={item} onGenerateAssignments={onGenerateAssignments} />
            ) : (
              <ResourceCard
                key={item.id}
                item={item}
                onPreview={onPreview}
                onAssign={onAssign}
                onAddToPaperBasket={onAddToPaperBasket}
                onAddToLessonPrep={onAddToLessonPrep}
                isInPaperBasket={isInPaperBasket(item)}
              />
            )
          ))}
        </div>
        {hasMore && (
          <button
            onClick={onToggle}
            className="w-full py-2.5 text-center text-[13px] font-medium text-blue-500 hover:text-blue-600
              border border-dashed border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50
              transition-all duration-200"
          >
            {showAll ? '收起' : `查看全部 ${items.length} 条`}
          </button>
        )}
      </div>
    )
  }

  // ── Render a section ───────────────────────────────────
  const renderSection = (
    title: string,
    icon: React.ReactNode,
    groups: ResourceGroupType[],
    activeTab: string,
    onTabChange: (key: string) => void,
    showAll: boolean,
    onToggleShowAll: () => void,
  ) => {
    if (!groups || groups.length === 0) return null

    const tabs = useMemo(() => buildSectionTabs(groups), [groups])
    const filtered = useMemo(() => filterGroupsByCategory(groups, activeTab), [groups, activeTab])
    const totalCount = groups.reduce((sum, g) => sum + g.items.length, 0)

    // Flatten all items across filtered groups
    const allItems = useMemo(
      () => filtered.flatMap((g) => g.items),
      [filtered],
    )

    // Single-type = no category-filter tabs needed (only "全部" + at most 1 type tab)
    const singleType = tabs.length <= 2

    // Collect recommendation texts from filtered groups
    const recTexts = filtered
      .map((g) => g.recommendationText)
      .filter(Boolean) as string[]

    return (
      <section>
        {/* Section header */}
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <h3 className="text-[14px] font-bold text-slate-800">{title}</h3>
          <span className="text-[11px] text-slate-400">{totalCount} 条</span>
        </div>

        {/* Per-section category tabs (only if multiple types) */}
        {!singleType && (
          <SectionFilterTabs tabs={tabs} activeKey={activeTab} onChange={onTabChange} />
        )}

        {/* Recommendation text (shown outside group header for single-type) */}
        {singleType && recTexts.length > 0 && (
          <div className="px-3.5 py-2 mb-3 bg-amber-50/30 border border-amber-100/30 rounded-lg text-[12px] text-slate-500">
            推荐理由：{recTexts.join('；')}
          </div>
        )}

        {/* Render: flat or with group wrappers */}
        {singleType ? (
          renderFlatCards(allItems, showAll, onToggleShowAll)
        ) : (
          <div className="space-y-3">
            {filtered.map((group) => renderGroupWrapper(group))}
          </div>
        )}
      </section>
    )
  }

  // ── V1.1 Dual-Group Layout ─────────────────────────────
  if (enhancedResult) {
    return (
      <div className="space-y-5">
        {aiText && <AIUnderstandingText text={aiText} />}

        {effectiveResult.functionEntries.length > 0 && (
          <div className="space-y-2">
            {effectiveResult.functionEntries.map((entry) => (
              <FunctionEntryCard key={entry.id} entry={entry} onClick={onOpenFunction} />
            ))}
          </div>
        )}

        {renderSection(
          '智能匹配推荐',
          <div className="w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center">
            <Sparkles size={11} className="text-blue-500" />
          </div>,
          smartMatchGroups || [],
          matchTab,
          setMatchTab,
          showAllMatch,
          () => setShowAllMatch((v) => !v),
        )}

        {renderSection(
          '智能关联推荐',
          <div className="w-5 h-5 rounded-md bg-amber-50 flex items-center justify-center">
            <Lightbulb size={11} className="text-amber-500" />
          </div>,
          smartRelatedGroups || [],
          relatedTab,
          setRelatedTab,
          showAllRelated,
          () => setShowAllRelated((v) => !v),
        )}
      </div>
    )
  }

  // ── V1.0 Legacy Layout ─────────────────────────────────
  return (
    <div className="space-y-4">
      {effectiveResult.functionEntries.length > 0 && (
        <div className="space-y-2">
          {effectiveResult.functionEntries.map((entry) => (
            <FunctionEntryCard key={entry.id} entry={entry} onClick={onOpenFunction} />
          ))}
        </div>
      )}
      {effectiveResult.resourceGroups.map((group) => renderGroupWrapper(group))}
    </div>
  )
}

export default SearchResultView

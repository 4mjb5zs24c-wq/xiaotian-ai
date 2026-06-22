import React, { useState, useCallback, useMemo } from 'react'
import { Sparkles, Lightbulb, Headphones, Mic, Pen } from 'lucide-react'
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
import MyContentCard, { isMyContentGroup, getMyContentViewAllLabel } from './MyContentCard'

interface SearchResultViewProps {
  result?: NewSearchResult
  enhancedResult?: EnhancedSearchResult
  precisionJump?: PrecisionJumpData
  unrecognizedQuery?: string
  unrecognizedMessage?: string
  suggestions?: SearchSuggestion[]
  commonFunctions?: CommonFunction[]
  /** Search query — passed to MyContentCard for dynamic primary button */
  query?: string
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
  /** Callback when my-content card quick action is clicked */
  onMyContentAction?: (item: ResourceItem, action: string) => void
}

// ── Helpers ───────────────────────────────────────────────

function buildSectionTabs(groups: ResourceGroupType[]): FilterTab[] {
  const tabMap = new Map<string, { label: string; count: number }>()
  for (const g of groups) {
    // Per-group tab key: the whole group is a single tab entry
    if (g.tabKey) {
      const existing = tabMap.get(g.tabKey)
      if (existing) {
        existing.count += g.items.length
      } else {
        const label = g.tabLabelOverrides?.[g.tabKey]
          || g.groupName
          || g.tabKey
        tabMap.set(g.tabKey, { label, count: g.items.length })
      }
      continue
    }
    // Per-item-type tabs (legacy behavior)
    for (const item of g.items) {
      const existing = tabMap.get(item.type)
      if (existing) {
        existing.count++
      } else {
        const overrideLabel = g.tabLabelOverrides?.[item.type]
        tabMap.set(item.type, {
          label: overrideLabel || searchResourceCategoryLabel[item.type] || item.type,
          count: 1,
        })
      }
    }
  }
  const total = groups.reduce((sum, g) => sum + g.items.length, 0)
  const tabs: FilterTab[] = [{ category: 'all', label: '全部', count: total }]
  for (const [key, { label, count }] of tabMap) {
    tabs.push({ category: key as SearchResourceCategory, label, count })
  }
  return tabs
}

function filterGroupsByCategory(
  groups: ResourceGroupType[],
  category: string,
): ResourceGroupType[] {
  if (category === 'all') return groups
  // Per-group tabKey filtering: keep only groups with matching tabKey
  return groups.filter((g) => {
    if (g.tabKey) return g.tabKey === category
    return g.items.some((item) => item.type === category)
  }).map((g) => {
    if (g.tabKey) return g // keep all items in the group
    return { ...g, items: g.items.filter((item) => item.type === category) }
  }).filter((g) => g.items.length > 0)
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
  query,
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
  onMyContentAction,
}) => {
  const searchQuery = query || ''

  // Per-section category state
  const [matchTab, setMatchTab] = useState('all')
  const [relatedTab, setRelatedTab] = useState('all')
  // Show-all counts per section
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

  // ── Render a single ResourceGroup ──────────────────────
  const renderGroupWrapper = (group: ResourceGroupType) => {
    const isExpanded = expandedGroups.has(group.groupId)
    const showAll = showAllGroups.has(group.groupId)
    const isMyContent = isMyContentGroup(group.groupId)

    // My-content groups: compact MyContentCard, must check BEFORE function-type
    if (isMyContent) {
      const visibleCount = showAll ? group.items.length : Math.min(group.displayLimit, group.items.length)
      const hasMore = group.items.length > group.displayLimit
      const viewAllLabel = getMyContentViewAllLabel(group.groupId)

      return (
        <div key={group.groupId}>
          {/* My-content sub-header with "view all" link */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold text-slate-700">{group.groupName}</span>
              <span className="text-[11px] text-slate-400">{group.items.length}条</span>
            </div>
            {viewAllLabel && (
              <button
                onClick={() => onMyContentAction?.(group.items[0], 'view_all')}
                className="text-[11px] text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                {viewAllLabel} &gt;
              </button>
            )}
          </div>

          {/* Recommendation text */}
          {group.recommendationText && (
            <div className="px-3.5 py-2 mb-2 bg-amber-50/30 border border-amber-100/30 rounded-lg text-[12px] text-slate-500">
              推荐理由：{group.recommendationText}
            </div>
          )}

          {/* Grid of MyContentCards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {group.items.slice(0, visibleCount).map((item) => (
              <MyContentCard
                key={item.id}
                item={item}
                query={searchQuery}
                onAction={onMyContentAction || (() => {})}
              />
            ))}
          </div>

          {/* Expand/collapse */}
          {hasMore && (
            <button
              onClick={() => toggleGroupShowAll(group.groupId)}
              className="w-full mt-2 py-2.5 text-center text-[13px] font-medium text-blue-500 hover:text-blue-600
                border border-dashed border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50
                transition-all duration-200"
            >
              {showAll ? '收起' : `查看全部 ${group.items.length} 条`}
            </button>
          )}
        </div>
      )
    }

    // Function-type groups: compact entry cards (新建答题卡/三方答题卡)
    if (group.groupType === 'function') {
      return (
        <div key={group.groupId}>
          {group.groupName && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[13px] font-semibold text-slate-700">{group.groupName}</span>
            </div>
          )}
          {group.recommendationText && (
            <p className="text-[12px] text-slate-400 mb-2">{group.recommendationText}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {group.items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200/60 rounded-xl px-4 py-3.5
                  hover:border-blue-200 hover:shadow-sm transition-all duration-150"
              >
                <h4 className="text-[14px] font-semibold text-slate-800 mb-1">{item.title}</h4>
                {item.recommendReason && (
                  <p className="text-[12px] text-slate-400 mb-3">{item.recommendReason}</p>
                )}
                <button
                  onClick={() => onMyContentAction?.(item, item.id === 'func-new-card' ? 'new_card' : 'third_party_card')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px] font-semibold
                    bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200/40
                    transition-all duration-200 active:scale-[0.98]"
                >
                  {item.id === 'func-new-card' ? '立即新建' : '去制作'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // Dictation function entries — lightweight compact cards
    if (group.groupType === 'dictation_func') {
      return (
        <div key={group.groupId}>
          {group.groupName && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[13px] font-semibold text-slate-700">{group.groupName}</span>
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {group.items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200/60 rounded-xl px-4 py-3
                  hover:border-blue-200 hover:shadow-sm transition-all duration-150"
              >
                <h4 className="text-[14px] font-semibold text-slate-800 mb-1">{item.title}</h4>
                {item.recommendReason && (
                  <p className="text-[11px] text-slate-400 mb-2.5 line-clamp-2">{item.recommendReason}</p>
                )}
                <button
                  onClick={() => onAssign(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold
                    bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200/40
                    transition-all duration-200 active:scale-[0.98]"
                >
                  去布置
                </button>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // Dictation vocab — unit vocabulary with dictation-prioritized actions
    if (group.groupType === 'dictation_vocab') {
      return (
        <div key={group.groupId}>
          {group.groupName && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[13px] font-semibold text-slate-700">{group.groupName}</span>
            </div>
          )}
          {group.recommendationText && (
            <p className="text-[12px] text-slate-400 mb-2">{group.recommendationText}</p>
          )}
          <div className="space-y-3">
            {group.items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200/60 rounded-xl px-4 py-3.5
                  hover:border-blue-200 hover:shadow-sm transition-all duration-150"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="text-[14px] font-semibold text-slate-800">{item.title}</h4>
                  {item.questionCount != null && (
                    <span className="text-[11px] text-slate-400 shrink-0">词汇量：{item.questionCount}个</span>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => onMyContentAction?.(item, 'listen_dictation')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold
                      bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200/40
                      transition-all duration-200 active:scale-[0.98]"
                  >
                    <Headphones size={13} />
                    单词听写
                  </button>
                  <button
                    onClick={() => onMyContentAction?.(item, 'listen_recognize')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium
                      text-slate-600 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600
                      hover:bg-blue-50/50 transition-all duration-200"
                  >
                    <Mic size={13} />
                    听音识词
                  </button>
                  <button
                    onClick={() => onMyContentAction?.(item, 'dictation_write')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium
                      text-slate-600 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600
                      hover:bg-blue-50/50 transition-all duration-200"
                  >
                    <Pen size={13} />
                    单词默写
                  </button>
                  <button
                    onClick={() => onMyContentAction?.(item, 'more')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium
                      text-slate-600 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600
                      hover:bg-blue-50/50 transition-all duration-200"
                  >
                    更多
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // Normal groups
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
    // Only ContentSelectResource for actual sync_vocab/sync_text (unit vocab resources)
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

  // ── Render a section (智能匹配推荐 / 智能关联推荐) ──────
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
    const allItems = useMemo(() => filtered.flatMap((g) => g.items), [filtered])
    // Single group + single type → flat render; multi-group → per-group render
    // (even if items share same type, different groupTypes need different rendering)
    const singleType = tabs.length <= 2 && filtered.length === 1
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

        {/* Recommendation text (single-type only — per-group rec texts shown in group renderers) */}
        {singleType && recTexts.length > 0 && (
          <div className="px-3 py-1.5 mb-2 bg-amber-50/30 border border-amber-100/30 rounded-lg text-[11px] text-slate-500">
            {recTexts.join('；')}
          </div>
        )}

        {/* Render */}
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

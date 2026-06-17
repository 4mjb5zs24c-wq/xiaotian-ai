/**
 * AI Search V1.1 — Search Enhancer
 *
 * Enhancement layer on top of the v1.0 search engine.
 * Does NOT modify v1.0 matching rules — only enhances the output.
 *
 * Keyword matching is delegated to intentRegistry.ts (single source of truth).
 * This module handles:
 *   1. Semantic meaningfulness check (via registry)
 *   2. Dual-group mapping + group name normalization
 *   3. AI understanding text generation (via registry)
 *   4. Unrecognized fallback messages
 *   5. AI thinking loading step generation (via registry)
 *   6. Enhanced search result builder
 */

import type {
  NewSearchResult,
  ResourceGroup,
  SearchSuggestion,
  CommonFunction,
  EnhancedSearchResult,
  LoadingStep,
} from './types'

export {
  detectPrecisionJump,
  isSemanticallyMeaningful,
} from './intentRegistry'

import {
  deriveIntentLabel,
  identifyQueryIntent,
} from './intentRegistry'

// ═══════════════════════════════════════════════════════════
// 1. Dual-Group Mapping + Group Name Normalization
// ═══════════════════════════════════════════════════════════

/**
 * Normalize a v1.0 group name to v1.1 style.
 * Strips "精准匹配 —", "推荐资源 —", etc.
 */
function normalizeGroupName(name: string): string {
  if (name.startsWith('精准匹配 — ')) return name.slice(7)
  if (name.startsWith('精准匹配—')) return name.slice(6)
  if (name.startsWith('推荐资源 — ')) return name.slice(7)
  if (name.startsWith('推荐资源—')) return name.slice(6)
  if (name === '推荐资源') return '更多资源'
  if (name === '精确匹配') return '匹配资源'
  if (name === '相关推荐') return '更多资源'
  if (name === '替代推荐') return '更多资源'
  if (name.startsWith('相近匹配 — ')) return name.slice(7)
  if (name.startsWith('相近匹配—')) return name.slice(6)
  return name
}

export function mapToDualGroups(groups: ResourceGroup[]): {
  smartMatchGroups: ResourceGroup[]
  smartRelatedGroups: ResourceGroup[]
} {
  const smartMatchGroups: ResourceGroup[] = []
  const smartRelatedGroups: ResourceGroup[] = []

  for (const group of groups) {
    const normalizedName = normalizeGroupName(group.groupName)

    let recText = group.recommendationText
    if (recText) {
      recText = recText
        .replace(/精准匹配|精确匹配/g, '匹配')
        .replace(/推荐资源|推荐/g, '匹配')
    }

    const cleanedGroup = { ...group, groupName: normalizedName, recommendationText: recText }

    if (group.isPrimaryMatch) {
      smartMatchGroups.push(cleanedGroup)
    } else if (group.groupType === 'alternative') {
      smartRelatedGroups.push({ ...cleanedGroup, isPrimaryMatch: false })
    } else {
      smartRelatedGroups.push({ ...cleanedGroup, isPrimaryMatch: false })
    }
  }

  return { smartMatchGroups, smartRelatedGroups }
}

// ═══════════════════════════════════════════════════════════
// 2. AI Understanding Text
// ═══════════════════════════════════════════════════════════

export function generateAIUnderstandingText(query: string): string {
  const label = deriveIntentLabel(query)
  return `小天理解你可能想找「${label}」\n已为你整理智能匹配结果，并补充相关资源。`
}

// ═══════════════════════════════════════════════════════════
// 3. Enhanced Search Result Builder
// ═══════════════════════════════════════════════════════════

export function enhanceSearchResult(
  query: string,
  result: NewSearchResult,
): EnhancedSearchResult {
  const { smartMatchGroups, smartRelatedGroups } = mapToDualGroups(result.resourceGroups)
  const aiUnderstandingText = generateAIUnderstandingText(query)

  return {
    original: result,
    aiUnderstandingText,
    smartMatchGroups,
    smartRelatedGroups,
    isPrecisionJump: false,
  }
}

// ═══════════════════════════════════════════════════════════
// 4. Unrecognized Fallback
// ═══════════════════════════════════════════════════════════

const SEARCH_SUGGESTIONS: SearchSuggestion[] = [
  { text: '答题卡', query: '答题卡' },
  { text: '词表', query: '词表' },
  { text: '词汇听写', query: '词汇听写' },
  { text: '单元练习', query: '单元练习' },
  { text: '作文', query: '作文' },
  { text: '配音', query: '配音' },
  { text: '专项', query: '专项' },
  { text: '听力', query: '听力' },
  { text: '课文', query: '课文' },
]

const COMMON_FUNCTIONS: CommonFunction[] = [
  { key: 'flash-card', label: '答题卡', query: '答题卡' },
  { key: 'wordlist', label: '词表', query: '词表' },
  { key: 'dictation', label: '词汇听写', query: '词汇听写' },
  { key: 'unit-practice', label: '单元练习', query: '单元练习' },
  { key: 'writing', label: '作文', query: '作文' },
  { key: 'dubbing', label: '配音', query: '配音' },
]

export function getSearchSuggestions(): SearchSuggestion[] {
  return SEARCH_SUGGESTIONS
}

export function getCommonFunctions(): CommonFunction[] {
  return COMMON_FUNCTIONS
}

export function buildUnrecognizedMessage(query: string): string {
  return `小天暂未准确理解「${query}」\n你可以换个说法试试，或从下方常用功能中快速进入。`
}

// ═══════════════════════════════════════════════════════════
// 5. AI Loading Steps
// ═══════════════════════════════════════════════════════════

export function generateLoadingSteps(query: string): LoadingStep[] {
  const label = identifyQueryIntent(query.trim())

  if (label) {
    return [
      { text: `小天正在理解「${label}」的相关场景...`, duration: 500 },
      { text: '正在匹配相关功能和资源...', duration: 500 },
      { text: '已为你整理相关结果。', duration: 300 },
    ]
  }

  return [
    { text: '小天正在理解你的需求...', duration: 500 },
    { text: '正在匹配相关功能和资源...', duration: 500 },
    { text: '正在为你整理推荐结果...', duration: 300 },
  ]
}

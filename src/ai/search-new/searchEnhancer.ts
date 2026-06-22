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

export {
  matchV1_1Intent,
  buildAnswerCardResult,
  buildWordListResult,
  buildPaperResult,
  buildWritingResult,
  buildPracticeResult,
  buildSpecialTopicResult,
  buildMicroSkillResult,
  buildRealExamResult,
  buildMockExamResult,
  buildExamSetResult,
  buildListeningResult,
  buildListeningMockResult,
  buildSpeakingResult,
  buildTextResult,
  buildVideoResult,
  buildThemeVideoResult,
  buildDubbingResult,
  buildGrammarResult,
  buildReadingResult,
} from './intentHandlers'

export type { V1_1IntentId } from './intentHandlers'

// ── Phase 4 exports ─────────────────────────────────────
export {
  matchResourceNames,
  buildNameMatchResult,
  isStrongNameMatch,
  isTextbookNameMatch,
  hasExactNameMatch,
  hasPrefixNameMatch,
} from './nameMatcher'
export type { NameMatchSearchResult, NameMatchResult, NameMatchLevel } from './nameMatcher'

export {
  detectRegion,
  matchRegionResources,
  buildRegionMatchResult,
} from './regionMatcher'
export type { RegionSearchResult, RegionMatchResult } from './regionMatcher'

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

const INTENT_AI_TEXT: Record<string, string> = {
  answer_card: '你可能想找「答题卡」相关内容，已为你整理可直接使用的答题卡和创建入口。',
  word_list: '你可能想找「词表」相关内容，已为你整理我的词表和听写默写入口。',
  dictation: '你可能想布置「听写」练习，已为你整理听写入口、当前单元词汇和我的词表。',
  vocabulary: '你可能想找「词汇」相关内容，已为你整理我的词表和听写默写入口。',
  paper: '你可能想找「试卷」相关内容，已为你整理我的试卷和平台试卷资源。',
  writing: '你可能想找「写作」练习，已为你整理应用文和读后续写入口。',
  practice: '你可能想布置「练习」，已为你整理当前单元的同步练习资源。',
  unit_practice: '你可能想找「单元练习」，已为你整理当前单元相关的练习和检测。',
  special_topic: '你可能想找「专项」练习，已为你整理专项分类下的资源。',
  micro_skill: '你可能想找「微技能」训练，已为你整理微技能相关的练习资源。',
  real_exam: '你可能想找「真题」资源，已为你整理匹配的真题和模拟卷。',
  mock_exam: '你可能想找「模拟」试卷，已为你整理模拟和冲刺练习资源。',
  exam_set: '你可能想找「套题」资源，已为你整理成套练习和模拟套卷。',
  listening_mock: '你可能想找「听力模拟」，已为你整理听力模拟和模考资源。',
  listening: '你可能想找「听力」资源，已为你整理同步听力和听力练习。',
  speaking: '你可能想找「听说」练习，已为你整理听说训练和口语资源。',
  text: '你可能想找「课文」资源，已为你整理当前单元的课文和跟读内容。',
  theme_video: '你可能想找「主题视频」，已为你整理拓展和文化视频资源。',
  video: '你可能想找「视频」资源，已为你整理同步视频和教学视频。',
  dubbing: '你可能想找「配音」练习，已为你整理趣味配音资源。',
  grammar: '你可能想找「语法」练习，已为你整理语法填空和语言知识资源。',
  reading: '你可能想找「阅读」练习，已为你整理阅读理解和七选五等资源。',
  quiz_compose: '你可能想「选题组卷」，已为你整理组卷入口和相关资源。',
  custom_practice: '你可能想找「自定义练习」，已为你整理可自定义布置和批改的入口。',
}

export function generateAIUnderstandingText(query: string, intentId?: string): string {
  if (intentId && INTENT_AI_TEXT[intentId]) {
    return `小天理解：${INTENT_AI_TEXT[intentId]}`
  }
  const label = deriveIntentLabel(query)
  return `小天理解：你可能想找「${label}」相关内容，已为你整理智能匹配结果。`
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

/**
 * AI Search V1.1 — Intent Handlers
 *
 * Maps query → intent → EnhancedSearchResult.
 * 5 core intents implemented in Phase 2:
 *   answer_card, word_list, paper, writing, practice
 *
 * Other queries fall through to v1.0 searchEngine.
 */

import type {
  EnhancedSearchResult,
  NewSearchResult,
  ResourceGroup,
  ResourceItem,
  SearchContext,
} from './types'
import {
  getMyAnswerCards, buildMyAnswerCardGroup,
  getMyWordLists, buildMyWordListGroup,
  getMyPapers, buildMyPaperGroup,
  getUnitVocabularyResources,
  getUnitPracticeResources,
  getWritingResourceItems,
  getDictationResourceItems,
  getAnswerCardRelatedEntries,
  getPlatformPaperResources,
} from './dataSources'
import { deriveIntentLabel } from './intentRegistry'

// ═══════════════════════════════════════════════════════════
// Intent matching
// ═══════════════════════════════════════════════════════════

export type V1_1IntentId =
  | 'answer_card'
  | 'word_list'
  | 'dictation'
  | 'vocabulary'
  | 'paper'
  | 'writing'
  | 'practice'
  | 'unit_practice'
  | null // fall through to v1.0

/**
 * Check if query matches a word_list sub-intent.
 * "听写" "默写" → dictation, not word_list.
 * "词汇" "单词" "词表" → word_list (only if not dictation).
 */
function isDictationQuery(query: string): boolean {
  const q = query
  return /听写|默写|听默|默一下|默词|默课文|听词|听些|词句听写|篇章默写|词组听写|句子听写/.test(q)
}

function isWordListQuery(query: string): boolean {
  const q = query
  return /词表|我的词表|单词表|生词表|词汇表|词单/.test(q)
}

function isVocabularyQuery(query: string): boolean {
  const q = query
  return /词汇|单词|生词|课标词|核心词|重点词|背单词|记单词|练单词|非课标词|单词练习|词汇练习|单词训练|词汇训练|单词巩固|词汇巩固/.test(q)
}

function isAnswerCardQuery(query: string): boolean {
  const q = query
  return /答题卡|答题纸|作答卡|作答纸|答题卷|答题页|试卷答题卡|试卷作答卡|试卷答题纸|纸质答题卡|纸质作答|制卡|快速制卡|新建答题卡|自制答题卡|三方卡|第三方卡|批卡|扫卡|扫描卡|扫描答题卡|线下考试|纸笔练习|纸质练习|上传答题卡|答提卡|打题卡|答题咔/.test(q)
}

function isPaperQuery(query: string): boolean {
  const q = query
  // Exclude "试卷答题卡" which should be answer_card
  if (/试卷答题卡|试卷作答卡|试卷答题纸/.test(q)) return false
  return /试卷|卷子|卷纸|题纸|我的试卷|测试卷|检测卷|练习卷|英语试卷|单元卷|期中卷|期末卷|阶段卷|考试卷|测验卷|测试题|练习题|自己出的卷|自己组的卷|试题/.test(q)
}

function isWritingQuery(query: string): boolean {
  const q = query
  return /作文|写作|写作文|布置作文|写一篇|书面表达|应用文|读后续写|续写|英语作文|作文题|作文作业/.test(q)
}

function isUnitPracticeQuery(query: string): boolean {
  const q = query
  return /单元练习|单元检测|单元测试|单元卷|单元题|单元巩固|本课练习|unit\s*练习|这一单元练习/.test(q)
}

function isPracticeQuery(query: string): boolean {
  const q = query
  return /练习|作业|布置|留作业|发作业|做题|刷题|练一练|发给学生|课后练习|课后巩固|巩固练习|课堂练习|同步练习|同步训练|布置练习|今天作业|明天作业|推送练习/.test(q)
}

/**
 * Match a query to a v1.1 intent.
 * Returns null if the query should fall through to v1.0 searchEngine.
 *
 * Priority matches v1.1 spec:
 *   answer_card > writing > word_list/dictation/vocabulary > paper > practice/unit_practice
 *
 * Note: "试卷答题卡" → answer_card (excluded from paper via isPaperQuery)
 *       "读后续写" → writing
 *       "专门/专业" → falls through to v1.0 (handled by special_topic)
 */
export function matchV1_1Intent(query: string): V1_1IntentId {
  const q = query.trim()
  if (!q) return null

  // P1: answer_card (must be before paper to catch "试卷答题卡")
  if (isAnswerCardQuery(q)) return 'answer_card'

  // P2: writing
  if (isWritingQuery(q)) return 'writing'

  // P3: dictation > word_list > vocabulary (dictation most specific)
  if (isDictationQuery(q)) return 'dictation'
  if (isWordListQuery(q)) return 'word_list'
  if (isVocabularyQuery(q)) return 'vocabulary'

  // P4: paper (after answer_card)
  if (isPaperQuery(q)) return 'paper'

  // P5: unit_practice > practice
  if (isUnitPracticeQuery(q)) return 'unit_practice'
  if (isPracticeQuery(q)) return 'practice'

  return null
}

// ═══════════════════════════════════════════════════════════
// Result builders
// ═══════════════════════════════════════════════════════════

function makeBaseResult(query: string): Pick<EnhancedSearchResult, 'isPrecisionJump' | 'aiUnderstandingText'> {
  return {
    isPrecisionJump: false,
    aiUnderstandingText: `小天理解你可能想找「${deriveIntentLabel(query)}」\n已为你整理智能匹配结果，并补充相关资源。`,
  }
}

function wrapResourcesToGroup(
  items: ResourceItem[],
  groupName: string,
  recText?: string,
): ResourceGroup {
  return {
    groupId: `grp-${groupName.replace(/\s/g, '_').toLowerCase()}`,
    groupName,
    groupType: 'resource',
    isPrimaryMatch: true,
    defaultExpanded: true,
    recommendationText: recText,
    items,
    displayLimit: 5,
  }
}

function buildEmptyV1_0Result(query: string): NewSearchResult {
  return {
    intent: {
      query,
      recognizedIntent: '智能匹配',
      searchType: 'resource',
      context: '',
      matchedTypes: [],
      expandedTypes: [],
      foldedTypes: [],
      message: '',
    },
    filterTabs: [],
    resourceGroups: [],
    functionEntries: [],
    isNoResults: false,
    isUnrecognizable: false,
  }
}

// ── Answer Card ───────────────────────────────────────

export function buildAnswerCardResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const cards = getMyAnswerCards(ctx)
  const myGroup = buildMyAnswerCardGroup(cards)
  const related = getAnswerCardRelatedEntries()

  const smartMatchGroups: ResourceGroup[] = [myGroup]

  // New card + third-party card entries as function-type group
  const newCardGroup: ResourceGroup = {
    groupId: 'new_card_functions',
    groupName: '答题卡功能入口',
    groupType: 'function',
    isPrimaryMatch: true,
    defaultExpanded: true,
    recommendationText: '快速创建或制作答题卡',
    items: [
      {
        id: 'func-new-card',
        title: '新建答题卡',
        type: 'function',
        tags: ['答题卡', '新建'],
        difficulty: 'basic',
        grade: ctx.grade,
        isCurrentUnit: true,
        canPreview: false,
        canAssign: false,
        canAddToPaperBasket: false,
        canAddToLessonPrep: false,
        isLessonPrepResource: false,
        recommendReason: '创建一张空白答题卡',
      },
      {
        id: 'func-third-party-card',
        title: '三方答题卡',
        type: 'function',
        tags: ['答题卡', '三方'],
        difficulty: 'basic',
        grade: ctx.grade,
        isCurrentUnit: true,
        canPreview: false,
        canAssign: false,
        canAddToPaperBasket: false,
        canAddToLessonPrep: false,
        isLessonPrepResource: false,
        recommendReason: '使用第三方工具制作答题卡',
      },
    ],
    displayLimit: 2,
    matchCategory: 'function',
  }
  smartMatchGroups.push(newCardGroup)

  const smartRelatedGroups: ResourceGroup[] = related.length > 0
    ? [wrapResourcesToGroup(related, '相关练习入口', '答题卡通常与听写、默写、写作等练习搭配使用')]
    : []

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups,
    smartRelatedGroups,
  }
}

// ── Word List / Dictation / Vocabulary ─────────────────

export function buildWordListResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const lists = getMyWordLists(ctx)
  const myGroup = buildMyWordListGroup(lists)
  const dictItems = getDictationResourceItems()
  const unitVocab = getUnitVocabularyResources(ctx)
  const isDictSearch = /听写|听/.test(query)
  const isDefaultSearch = /默写|默/.test(query)

  const smartMatchGroups: ResourceGroup[] = []
  const smartRelatedGroups: ResourceGroup[] = []

  // ── Dictation intent: reorder — function entries first, then unit vocab, then my word lists ──
  if (isDictSearch) {
    // 1. Dictation function entries first (teacher's primary intent)
    smartMatchGroups.push(
      wrapResourcesToGroup(
        dictItems,
        '听写功能入口',
        '快速创建听写练习，支持词汇听写、词句听写和篇章默写',
      ),
    )

    // 2. Unit vocabulary second (put in smartMatch so it's prominent)
    smartMatchGroups.push(
      wrapResourcesToGroup(
        unitVocab,
        '当前单元词汇',
        '当前单元词汇资源，可用于听写和跟读练习',
      ),
    )

    // 3. My word lists third
    if (lists.length > 0) {
      smartMatchGroups.push(myGroup)
    }

    return {
      ...makeBaseResult(query),
      original: buildEmptyV1_0Result(query),
      smartMatchGroups,
      smartRelatedGroups,
    }
  }

  // ── Default / word list / vocabulary / non-dictation ordering ──
  // 1. My word lists first
  if (lists.length > 0) {
    smartMatchGroups.push(myGroup)
  }

  // 2. Dictation entries
  smartMatchGroups.push(
    wrapResourcesToGroup(
      dictItems,
      '听写与默写入口',
      isDefaultSearch
        ? '适合默写训练的练习形式'
        : '可用于听写和默写的练习形式',
    ),
  )

  // 3. Unit vocabulary as smart related (lower prominence)
  smartRelatedGroups.push(
    wrapResourcesToGroup(
      unitVocab,
      '同步单元词汇',
      '当前单元词汇资源，可用于跟读、听写、默写等练习',
    ),
  )

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups,
    smartRelatedGroups,
  }
}

// ── Paper ─────────────────────────────────────────────

export function buildPaperResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const papers = getMyPapers(ctx)
  const myGroup = buildMyPaperGroup(papers)
  const platformPapers = getPlatformPaperResources(ctx)

  const smartMatchGroups: ResourceGroup[] = []

  // My papers (first, prominent)
  if (papers.length > 0) {
    smartMatchGroups.push(myGroup)
  }

  // Platform papers — grouped by type
  const syncPapers = platformPapers.filter((p) => p.type === 'unit_test')
  const specialPapers = platformPapers.filter((p) => p.type === 'special')
  const mockPapers = platformPapers.filter((p) => p.type === 'mock_exam' || p.type === 'stage_test')
  const compPapers = platformPapers.filter((p) => p.type === 'comprehensive')

  const platformGroups: ResourceGroup[] = []

  if (syncPapers.length > 0) {
    platformGroups.push(
      wrapResourcesToGroup(syncPapers, '同步试卷', '与当前教材同步的试卷资源'),
    )
  }
  if (specialPapers.length > 0) {
    platformGroups.push(
      wrapResourcesToGroup(specialPapers, '专项试卷', '聚焦特定能力方向的试卷'),
    )
  }
  if (mockPapers.length > 0) {
    platformGroups.push(
      wrapResourcesToGroup(mockPapers, '模拟试卷', '模拟真实考试的试卷资源'),
    )
  }
  // Comprehensive papers that aren't sync-specific
  if (compPapers.length > 0) {
    platformGroups.push(
      wrapResourcesToGroup(compPapers, '综合试卷', '综合考查能力的试卷'),
    )
  }

  // Mark platform groups as primary match when no my papers (they are the primary)
  for (const g of platformGroups) {
    smartMatchGroups.push({ ...g, isPrimaryMatch: true })
  }

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups,
    smartRelatedGroups: [], // Paper intent has no related currently
  }
}

// ── Writing ────────────────────────────────────────────

export function buildWritingResult(
  query: string,
  _ctx: SearchContext,
): EnhancedSearchResult {
  const writingItems = getWritingResourceItems()
  const q = query.trim()

  let smartMatchGroups: ResourceGroup[] = []
  let smartRelatedGroups: ResourceGroup[] = []

  if (/应用文/.test(q)) {
    // 应用文: main → 应用文, related → 读后续写
    smartMatchGroups = [
      wrapResourcesToGroup(
        [writingItems[0]],
        '自定义应用文',
        '支持书信、通知、日记等常见应用文体裁',
      ),
    ]
    smartRelatedGroups = [
      wrapResourcesToGroup(
        [writingItems[1]],
        '自定义读后续写',
        '你可能也会用到读后续写练习',
      ),
    ]
  } else if (/读后续写|续写/.test(q)) {
    // 读后续写: main → 读后续写, related → 应用文
    smartMatchGroups = [
      wrapResourcesToGroup(
        [writingItems[1]],
        '自定义读后续写',
        '提供阅读材料，训练读写综合能力',
      ),
    ]
    smartRelatedGroups = [
      wrapResourcesToGroup(
        [writingItems[0]],
        '自定义应用文',
        '你可能也会用到应用文写作',
      ),
    ]
  } else {
    // 作文/写作: both in smart match
    smartMatchGroups = [
      wrapResourcesToGroup(
        writingItems,
        '写作练习入口',
        '支持应用文和读后续写两种写作训练方式',
      ),
    ]
  }

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups,
    smartRelatedGroups,
  }
}

// ── Practice / Unit Practice ───────────────────────────

export function buildPracticeResult(
  query: string,
  ctx: SearchContext,
  isUnitSpecific: boolean,
): EnhancedSearchResult {
  const { smartMatch, smartRelated } = getUnitPracticeResources(ctx, isUnitSpecific)

  const smartMatchGroups: ResourceGroup[] = [
    wrapResourcesToGroup(
      smartMatch,
      isUnitSpecific ? '单元练习资源' : '当前单元练习资源',
      isUnitSpecific
        ? '与你搜索的单元相关的练习资源'
        : '适合作为课后作业或课堂练习的同步资源',
    ),
  ]

  const smartRelatedGroups: ResourceGroup[] = smartRelated.length > 0
    ? [
        wrapResourcesToGroup(
          smartRelated,
          '补充资源',
          '当前单元可作为练习补充的内容',
        ),
      ]
    : []

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups,
    smartRelatedGroups,
  }
}

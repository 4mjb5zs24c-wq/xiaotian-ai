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
  getSpecialTopicCards,
  getSpecialTopicResources,
  getSpecialTopicRelated,
  getMicroSkillResources,
  getMicroSkillRelated,
  getRealExamResources,
  getRealExamRelated,
  getMockExamResources,
  getExamSetResources,
  getExamSetFallbackPapers,
  getListeningResources,
  getListeningRelated,
  getListeningMockResources,
  getSpeakingResources,
  getSpeakingFallback,
  getTextResources,
  getTextRelated,
  getVideoResources,
  getVideoRelated,
  getThemeVideoResources,
  getThemeVideoRelated,
  getDubbingResources,
  getDubbingRelated,
  getGrammarResources,
  getGrammarRelated,
  getReadingResources,
  getReadingRelated,
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
  | 'special_topic'
  | 'micro_skill'
  | 'listening_mock'
  | 'listening'
  | 'speaking'
  | 'real_exam'
  | 'exam_set'
  | 'mock_exam'
  | 'text'
  | 'theme_video'
  | 'video'
  | 'dubbing'
  | 'grammar'
  | 'reading'
  | 'quiz_compose'
  | 'custom_practice'
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
  // Exclude precision jump keywords
  if (/词汇薄弱|词汇掌握差/.test(q)) return false
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
  // Exclude "单元卷" which should be unit_practice
  if (/单元卷|单元检测|单元测试|单元练习/.test(q)) return false
  return /试卷|卷子|卷纸|题纸|我的试卷|测试卷|检测卷|练习卷|英语试卷|期中卷|期末卷|阶段卷|考试卷|测验卷|测试题|练习题|自己出的卷|自己组的卷|试题/.test(q)
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

// ── Phase 3 query detectors ─────────────────────────────

function isSpecialTopicQuery(q: string): boolean {
  return /专项|专门|专业|专练|专训|专题|题型专项|词汇专项|听力专项|写作专项|阅读专项|微技能专项|专项练习|专项训练|专项资源|能力专项|专项题|专项卷|专项课/.test(q)
}

function isMicroSkillQuery(q: string): boolean {
  return /微技能|微技能训练|微技能练习|微技能专项|阅读微技能|听力微技能|写作微技能|技能训练|小技能|技巧训练|解题技巧|做题方法|方法训练/.test(q)
}

function isListeningMockQuery(q: string): boolean {
  return /听力模拟|听力模考|听力测试|听力测评|听力考试|听力模拟题|听力模拟卷/.test(q)
}

function isListeningQuery(q: string): boolean {
  // Exclude: 听说 (speaking), 听力模拟 (listening_mock), 听力专项 (special_topic)
  if (/听说|听力模拟|听力模考|听力测试|听力测评|听力考试/.test(q)) return false
  if (/听力专项/.test(q)) return false
  return /听力|听力练习|听力训练|听力资源|听力素材|同步听力|单元听力|课本听力|听力题/.test(q)
}

function isSpeakingQuery(q: string): boolean {
  if (/听说专项/.test(q)) return false
  return /听说|听说练习|听说训练|听说资源|听说考试|听说模拟|听说测评|口语听说/.test(q)
}

function isRealExamQuery(q: string): boolean {
  return /真题|历年真题|中考真题|高考真题|考试真题|真题卷|真题资源|真题库|区域真题/.test(q)
}

function isExamSetQuery(q: string): boolean {
  return /套题|套卷|整套卷|整套题|模拟套题|模拟套卷|成套练习|一整套|成套/.test(q)
}

function isMockExamQuery(q: string): boolean {
  // Exclude: 听力模拟 (listening_mock), 套题 (exam_set), 真题 (real_exam)
  if (/听力模拟|听力模考/.test(q)) return false
  if (/套题|套卷|整套/.test(q)) return false
  if (/真题/.test(q)) return false
  return /模拟|模拟题|模拟卷|模拟试卷|模拟练习|模考|模拟考试|冲刺|冲刺卷|冲刺练习|阶段测试|阶段检测|期中考试|期末考试|摸底考试/.test(q)
}

function isTextQuery(q: string): boolean {
  // Exclude: 默写 (dictation), 视频, 配音
  if (/默写/.test(q)) return false
  if (/视频|配音/.test(q)) return false
  return /课文|课文跟读|课文背诵|课文资源|课文练习|课文朗读|课文讲解|逐句跟读|课文读一读|跟读|背诵|朗读|读课文|跟读课文|背课文|语篇|Section\s*[A-Da-d]/.test(q)
}

function isThemeVideoQuery(q: string): boolean {
  return /主题视频|话题视频|拓展视频|文化视频|主题资源|话题资源|文化拓展|拓展资源/.test(q)
}

function isVideoQuery(q: string): boolean {
  // Exclude: 主题视频, 配音
  if (/主题视频|话题视频|拓展视频|文化视频/.test(q)) return false
  if (/配音/.test(q)) return false
  return /视频|同步视频|单元视频|课堂视频|教学视频|课本视频|讲解视频|视频资源/.test(q)
}

function isDubbingQuery(q: string): boolean {
  return /配音|趣味配音|英语配音|视频配音|配音练习|配音资源|口语配音|动画配音/.test(q)
}

function isGrammarQuery(q: string): boolean {
  return /语法|语法练习|语法训练|语法题|语法填空|单句语法|语言知识|语言运用|时态|从句|被动语态|非谓语|宾语从句|定语从句|完形填空|选词填空|短文填空/.test(q)
}

function isReadingQuery(q: string): boolean {
  // Exclude: 阅读专项 (special_topic)
  if (/阅读专项/.test(q)) return false
  return /阅读|阅读理解|阅读练习|阅读训练|英语阅读|阅读题|任务型阅读|七选五|阅读七选五|阅读材料|阅读文章/.test(q)
}

function isQuizComposeQuery(q: string): boolean {
  return /选题组卷|挑题组卷|题库组卷|自己组卷|组卷|选题|挑题|组一套题|组一张卷/.test(q)
}

function isCustomPracticeQuery(q: string): boolean {
  // Exclude: matches "练习" or "作业" — must have custom/batch/自建 signals
  return /自定义批改|自定义练习|自定义作业|自定义布置|自己出题|自己布置|自己批改|自建练习|自定义|批改|自建/.test(q)
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

  // P2: special_topic (must be BEFORE writing/listening/reading to catch "写作专项"/"听力专项" etc.)
  if (isSpecialTopicQuery(q)) return 'special_topic'

  // P3: writing
  if (isWritingQuery(q)) return 'writing'

  // P4: micro_skill (higher priority than special_topic sub-types)
  if (isMicroSkillQuery(q)) return 'micro_skill'

  // P5: dictation > word_list > vocabulary (dictation most specific)
  if (isDictationQuery(q)) return 'dictation'
  if (isWordListQuery(q)) return 'word_list'
  if (isVocabularyQuery(q)) return 'vocabulary'

  // P6: listening_mock (must be before listening AND mock_exam)
  if (isListeningMockQuery(q)) return 'listening_mock'

  // P7: listening (must be before speaking to exclude 听说)
  if (isListeningQuery(q)) return 'listening'

  // P8: speaking
  if (isSpeakingQuery(q)) return 'speaking'

  // P9: real_exam (must be before mock_exam)
  if (isRealExamQuery(q)) return 'real_exam'

  // P10: exam_set (must be before mock_exam)
  if (isExamSetQuery(q)) return 'exam_set'

  // P11: mock_exam
  if (isMockExamQuery(q)) return 'mock_exam'

  // P12: unit_practice (before paper to catch "单元卷")
  if (isUnitPracticeQuery(q)) return 'unit_practice'

  // P13: quiz_compose (before paper to catch "组卷")
  if (isQuizComposeQuery(q)) return 'quiz_compose'

  // P14: paper
  if (isPaperQuery(q)) return 'paper'

  // P15: text
  if (isTextQuery(q)) return 'text'

  // P16: theme_video (must be before video)
  if (isThemeVideoQuery(q)) return 'theme_video'

  // P17: video
  if (isVideoQuery(q)) return 'video'

  // P18: dubbing
  if (isDubbingQuery(q)) return 'dubbing'

  // P19: grammar
  if (isGrammarQuery(q)) return 'grammar'

  // P20: reading
  if (isReadingQuery(q)) return 'reading'

  // P21: quiz_compose (before practice)
  if (isQuizComposeQuery(q)) return 'quiz_compose'

  // P22: custom_practice (before practice)
  if (isCustomPracticeQuery(q)) return 'custom_practice'

  // P23: unit_practice > practice (lowest priority)
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

  const smartMatchGroups: ResourceGroup[] = [{ ...myGroup, tabKey: 'my_answer_cards', tabLabelOverrides: { my_answer_cards: '我的答题卡' } }]

  // New card + third-party card entries as function-type group
  const newCardGroup: ResourceGroup = {
    groupId: 'new_card_functions',
    groupName: '答题卡功能入口',
    groupType: 'function',
    isPrimaryMatch: true,
    defaultExpanded: true,
    tabKey: 'card_functions',
    tabLabelOverrides: { card_functions: '功能入口' },
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
    ? [{
        groupId: 'answer_card_related',
        groupName: '相关练习入口',
        groupType: 'dictation_func',
        isPrimaryMatch: false,
        defaultExpanded: true,
        recommendationText: '答题卡通常与听写、默写、写作等练习搭配使用',
        items: related,
        displayLimit: 5,
      }]
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
    // 1. Dictation function entries first (lightweight entry cards)
    smartMatchGroups.push({
      groupId: 'grp-dictation_func',
      groupName: '听写功能入口',
      groupType: 'dictation_func',
      isPrimaryMatch: true,
      defaultExpanded: true,
      recommendationText: '快速创建听写练习，支持词汇听写、词句听写和篇章默写',
      items: dictItems,
      displayLimit: 3,
      tabLabelOverrides: { vocab_practice: '听写入口' },
    })

    // 2. Unit vocabulary second (dictation-prioritized actions)
    smartMatchGroups.push({
      groupId: 'grp-dictation_vocab',
      groupName: '当前单元词汇',
      groupType: 'dictation_vocab',
      isPrimaryMatch: true,
      defaultExpanded: true,
      recommendationText: '当前单元词汇资源，可用于听写和跟读练习',
      items: unitVocab,
      displayLimit: 5,
      tabLabelOverrides: { sync_vocab: '当前单元词汇' },
    })

    // 3. My word lists third (my_content type for proper rendering)
    if (lists.length > 0) {
      smartMatchGroups.push({ ...myGroup, groupType: 'my_content', tabLabelOverrides: { function: '我的词表' } })
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
    smartMatchGroups.push({ ...myGroup, tabLabelOverrides: { function: '我的词表' } })
  }

  // 2. Dictation entries
  const dictGroup = wrapResourcesToGroup(
    dictItems,
    '听写与默写入口',
    isDefaultSearch
      ? '适合默写训练的练习形式'
      : '可用于听写和默写的练习形式',
  )
  dictGroup.tabLabelOverrides = { vocab_practice: '听写默写入口' }
  smartMatchGroups.push(dictGroup)

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

// ═══════════════════════════════════════════════════════════
// Phase 3 — Result Builders
// ═══════════════════════════════════════════════════════════

function wrapRelatedGroup(
  items: ResourceItem[],
  groupName: string,
  recText?: string,
): ResourceGroup {
  return {
    groupId: `grp-rel-${groupName.replace(/\s/g, '_').toLowerCase()}`,
    groupName,
    groupType: 'resource',
    isPrimaryMatch: false,
    defaultExpanded: true,
    recommendationText: recText,
    items,
    displayLimit: 5,
  }
}

function detectSpecialSubTopic(q: string): string {
  if (/微技能/.test(q)) return 'micro_skill'
  if (/词汇/.test(q)) return 'vocab'
  if (/听力/.test(q)) return 'listening'
  if (/写作|作文|应用文|读后续写/.test(q)) return 'writing'
  if (/阅读/.test(q)) return 'reading'
  if (/题型|完形|填空/.test(q)) return 'question_type'
  return 'all' // generic 专项
}

// ── Special Topic ──────────────────────────────────────────

export function buildSpecialTopicResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const q = query.trim()
  const subTopic = detectSpecialSubTopic(q)

  const smartMatchGroups: ResourceGroup[] = []
  const smartRelatedGroups: ResourceGroup[] = []

  if (subTopic === 'all') {
    // Generic 专项 — show sub-topic cards
    const cards = getSpecialTopicCards()
    const items: ResourceItem[] = cards.map((c) => ({
      id: c.id,
      title: c.title,
      type: 'special' as const,
      tags: ['专项', c.title],
      difficulty: 'basic' as const,
      grade: ctx.grade || '七年级上',
      isCurrentUnit: true,
      canPreview: false,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: `点击进入${c.title}，查看相关资源`,
    }))
    smartMatchGroups.push(wrapResourcesToGroup(items, '专项分类', '选择一个专项方向，查看对应资源'))
  } else {
    // Specific sub-topic
    const resources = getSpecialTopicResources(subTopic, ctx)
    smartMatchGroups.push(wrapResourcesToGroup(resources, '专项资源', `与「${query}」相关的专项资源`))

    const related = getSpecialTopicRelated(subTopic, ctx)
    if (related.length > 0) {
      smartRelatedGroups.push(wrapRelatedGroup(related, '相关专项资源', '与专项相关的补充资源'))
    }
  }

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups,
    smartRelatedGroups,
  }
}

// ── Micro Skill ────────────────────────────────────────────

export function buildMicroSkillResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const resources = getMicroSkillResources(ctx)
  const related = getMicroSkillRelated(ctx)

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups: [wrapResourcesToGroup(resources, '微技能训练资源', '微技能专项资源，聚焦单项能力训练')],
    smartRelatedGroups: related.length > 0 ? [wrapRelatedGroup(related, '能力拓展资源', '同能力方向的补充资源')] : [],
  }
}

// ── Real Exam ─────────────────────────────────────────────

export function buildRealExamResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const resources = getRealExamResources(ctx)
  const related = getRealExamRelated(ctx)

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups: [wrapResourcesToGroup(resources, '真题资源', '真题资源，按年份和地区整理')],
    smartRelatedGroups: related.length > 0 ? [wrapRelatedGroup(related, '模拟与冲刺资源', '与真题搭配的模拟和冲刺资源')] : [],
  }
}

// ── Mock Exam ─────────────────────────────────────────────

export function buildMockExamResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const resources = getMockExamResources(ctx)

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups: [wrapResourcesToGroup(resources, '模拟与冲刺资源', '模拟题、冲刺卷和阶段检测资源')],
    smartRelatedGroups: [],
  }
}

// ── Exam Set ─────────────────────────────────────────────

export function buildExamSetResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const resources = getExamSetResources(ctx)

  const smartMatchGroups: ResourceGroup[] = []

  if (resources.length > 0) {
    smartMatchGroups.push(wrapResourcesToGroup(resources, '套题资源', '成套模拟卷和套题资源'))
  } else {
    // Fallback: paper hierarchy
    const fallback = getExamSetFallbackPapers(ctx)
    const syncPapers = fallback.filter((p) => p.type === 'unit_test')
    const specialPapers = fallback.filter((p) => p.type === 'special')
    const mockPapers = fallback.filter((p) => p.type === 'mock_exam')
    if (syncPapers.length > 0) smartMatchGroups.push(wrapResourcesToGroup(syncPapers, '同步试卷', '套题降级 — 同步试卷'))
    if (specialPapers.length > 0) smartMatchGroups.push(wrapResourcesToGroup(specialPapers, '专项试卷', '套题降级 — 专项试卷'))
    if (mockPapers.length > 0) smartMatchGroups.push(wrapResourcesToGroup(mockPapers, '模拟试卷', '套题降级 — 模拟试卷'))
  }

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups,
    smartRelatedGroups: [],
  }
}

// ── Listening ─────────────────────────────────────────────

export function buildListeningResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const resources = getListeningResources(ctx)
  const related = getListeningRelated(ctx)

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups: [wrapResourcesToGroup(resources, '同步听力资源', '当前单元听力资源')],
    smartRelatedGroups: related.length > 0 ? [wrapRelatedGroup(related, '听力专项资源', '听力专项和模拟资源')] : [],
  }
}

// ── Listening Mock ─────────────────────────────────────────

export function buildListeningMockResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const resources = getListeningMockResources(ctx)

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups: [wrapResourcesToGroup(resources, '听力模拟资源', '听力模拟和模考资源')],
    smartRelatedGroups: [],
  }
}

// ── Speaking ──────────────────────────────────────────────

export function buildSpeakingResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const resources = getSpeakingResources(ctx)

  const smartMatchGroups: ResourceGroup[] = []
  const smartRelatedGroups: ResourceGroup[] = []

  if (resources.length > 0) {
    smartMatchGroups.push(wrapResourcesToGroup(resources, '听说练习资源', '听说练习和测评资源'))
  } else {
    // Fallback — region doesn't have speaking resources
    const fallback = getSpeakingFallback(ctx)
    smartMatchGroups.push(wrapResourcesToGroup(fallback, '替代推荐资源', '当前地区暂无听说资源，以下为替代推荐'))
  }

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups,
    smartRelatedGroups,
  }
}

// ── Text ──────────────────────────────────────────────────

export function buildTextResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const resources = getTextResources(ctx)
  const related = getTextRelated(ctx)

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups: [wrapResourcesToGroup(resources, '课文资源', '当前单元课文资源，支持跟读、背诵和朗读')],
    smartRelatedGroups: related.length > 0 ? [wrapRelatedGroup(related, '相关词汇与听力', '课文相关的词汇和听力')] : [],
  }
}

// ── Video ─────────────────────────────────────────────────

export function buildVideoResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const resources = getVideoResources(ctx)
  const related = getVideoRelated(ctx)

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups: [wrapResourcesToGroup(resources, '同步视频资源', '当前单元同步视频资源')],
    smartRelatedGroups: related.length > 0 ? [wrapRelatedGroup(related, '拓展视频资源', '拓展视频资源')] : [],
  }
}

// ── Theme Video ─────────────────────────────────────────

export function buildThemeVideoResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const resources = getThemeVideoResources(ctx)
  const related = getThemeVideoRelated(ctx)

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups: [wrapResourcesToGroup(resources, '主题视频资源', '主题视频和拓展资源')],
    smartRelatedGroups: related.length > 0 ? [wrapRelatedGroup(related, '同步视频资源', '当前单元同步视频')] : [],
  }
}

// ── Dubbing ──────────────────────────────────────────────

export function buildDubbingResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const resources = getDubbingResources(ctx)
  const related = getDubbingRelated(ctx)

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups: [wrapResourcesToGroup(resources, '趣味配音资源', '趣味配音资源')],
    smartRelatedGroups: related.length > 0 ? [wrapRelatedGroup(related, '主题视频资源', '主题视频资源')] : [],
  }
}

// ── Grammar ──────────────────────────────────────────────

export function buildGrammarResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const resources = getGrammarResources(ctx)
  const related = getGrammarRelated(ctx)

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups: [wrapResourcesToGroup(resources, '语法练习资源', '语法和语言知识练习资源')],
    smartRelatedGroups: related.length > 0 ? [wrapRelatedGroup(related, '综合与模拟练习', '语法相关的综合和模拟练习')] : [],
  }
}

// ── Reading ─────────────────────────────────────────────

export function buildReadingResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const resources = getReadingResources(ctx)
  const related = getReadingRelated(ctx)

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups: [wrapResourcesToGroup(resources, '阅读训练资源', '阅读练习和训练资源')],
    smartRelatedGroups: related.length > 0 ? [wrapRelatedGroup(related, '同步与模拟阅读资源', '阅读相关的同步和模拟练习')] : [],
  }
}

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
  getWritingPaperResources,
  getDictationResourceItems,
  getVocabPaperResources,
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
  getListeningPaperResources,
  getListeningMyPapers,
  getSpeakingResources,
  getSpeakingPaperResources,
  getSpeakingMyPapers,
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
import { generateAIUnderstandingText } from './searchEnhancer'

// ═══════════════════════════════════════════════════════════
// Intent matching
// ═══════════════════════════════════════════════════════════

export type V1_1IntentId =
  | 'answer_card'
  | 'word_list'
  | 'dictation'
  | 'vocabulary'
  | 'vocab_paper'
  | 'paper'
  | 'writing'
  | 'practice'
  | 'unit_practice'
  | 'special_topic'
  | 'micro_skill'
  | 'listening_mock'
  | 'listening'
  | 'listening_paper'
  | 'speaking'
  | 'speaking_paper'
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
  return /听写|默写|听默|听\/默写|默一下|默词|默课文|听词|听些|词句听写|篇章默写|词组听写|句子听写/.test(q)
}

function isWordListQuery(query: string): boolean {
  const q = query
  return /词表|我的词表|单词表|生词表|词汇表|词单/.test(q)
}

function isVocabularyQuery(query: string): boolean {
  const q = query
  // Exclude precision jump keywords
  if (/词汇薄弱|词汇掌握差/.test(q)) return false
  // Exclude vocab paper queries (handled separately)
  if (/词汇试卷|词汇练习卷|词汇专项试卷|同步词汇试卷|词汇题/.test(q)) return false
  return /词汇|单词|生词|课标词|核心词|重点词|背单词|记单词|练单词|非课标词|单词练习|词汇练习|单词训练|词汇训练|单词巩固|词汇巩固|当前单元词汇|单元词汇/.test(q)
}

/** Check if query is a vocabulary paper search — must be before general vocabulary */
function isVocabPaperQuery(q: string): boolean {
  return /词汇试卷|词汇练习卷|词汇专项试卷|同步词汇试卷|词汇题/.test(q)
}

/** Check if query is English word(s) — single or multiple words, ignoring punctuation and spaces */
function isEnglishWordQuery(q: string): boolean {
  const trimmed = q.trim()
  // Single English word (>=2 letters)
  if (/^[a-zA-Z]{2,}$/.test(trimmed)) return true
  // Multiple English words separated by spaces or common punctuation
  const cleaned = trimmed.replace(/[,，、\s]+/g, ' ').replace(/[.!?;:]+/g, '').trim()
  if (/^[a-zA-Z\s]+$/.test(cleaned)) {
    const words = cleaned.split(/\s+/).filter(w => w.length >= 2)
    return words.length >= 2
  }
  return false
}

function isAnswerCardQuery(query: string): boolean {
  const q = query
  return /答题卡|答题纸|作答卡|作答纸|答题卷|答题页|试卷答题卡|试卷作答卡|试卷答题纸|纸质答题卡|纸质作答|制卡|快速制卡|新建答题卡|自制答题卡|三方卡|第三方卡|批卡|扫卡|扫描卡|扫描答题卡|线下考试|纸笔练习|纸质练习|上传答题卡|拍照批改|扫描批改|拍照|扫描|纸质|答提卡|打题卡|答题咔/.test(q)
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

/** 听力试卷类：听力+模拟/套题/套卷/试卷/真题/期末卷 */
function isListeningPaperQuery(q: string): boolean {
  // Must contain 听力 AND one of the paper/exam-type keywords
  if (!/听力/.test(q)) return false
  return /听力模拟|听力套题|听力套卷|听力试卷|听力真题|听力期末卷/.test(q)
}

function isListeningQuery(q: string): boolean {
  // Exclude: 听说 (speaking), 听力模拟类 (listening_mock or listening_paper)
  if (/听说/.test(q)) return false
  if (isListeningMockQuery(q)) return false
  if (isListeningPaperQuery(q)) return false
  // Exclude 听力专项 (handled by special_topic)
  if (/听力专项/.test(q)) return false
  return /听力|听力练习|听力训练|听力资源|听力素材|同步听力|单元听力|课本听力|听力题/.test(q)
}

/** 听说试卷类：听说+模拟/套题/套卷/试卷/真题/期末卷 */
function isSpeakingPaperQuery(q: string): boolean {
  if (!/听说/.test(q)) return false
  return /听说模拟|听说套题|听说套卷|听说试卷|听说真题|听说期末卷/.test(q)
}

function isSpeakingQuery(q: string): boolean {
  // Exclude 听说专项 (handled by special_topic)
  if (/听说专项/.test(q)) return false
  // Exclude 听说试卷类
  if (isSpeakingPaperQuery(q)) return false
  return /听说|听说练习|听说训练|听说资源|听说考试|听说测评|口语听说/.test(q)
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

  // P5: dictation > word_list > vocab_paper > vocabulary (dictation most specific)
  if (isDictationQuery(q)) return 'dictation'
  if (isWordListQuery(q)) return 'word_list'
  // Vocab paper before general vocabulary (词汇试卷 vs 词汇)
  if (isVocabPaperQuery(q)) return 'vocab_paper'
  // English words (single or multi-word) → vocabulary
  if (isEnglishWordQuery(q)) return 'vocabulary'
  if (isVocabularyQuery(q)) return 'vocabulary'

  // P6: listening_mock (must be before listening AND mock_exam)
  if (isListeningMockQuery(q)) return 'listening_mock'

  // P6b: listening_paper (听力+试卷类：听力模拟/套题/套卷/试卷/真题/期末卷)
  if (isListeningPaperQuery(q)) return 'listening_paper'

  // P7: listening (must be before speaking to exclude 听说)
  if (isListeningQuery(q)) return 'listening'

  // P7b: speaking_paper (听说+试卷类)
  if (isSpeakingPaperQuery(q)) return 'speaking_paper'

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

function makeBaseResult(query: string, intentId?: string): Pick<EnhancedSearchResult, 'isPrecisionJump' | 'aiUnderstandingText'> {
  return {
    isPrecisionJump: false,
    aiUnderstandingText: generateAIUnderstandingText(query, intentId),
  }
}

function wrapResourcesToGroup(
  items: ResourceItem[],
  groupName: string,
  recText?: string,
  groupType?: ResourceGroup['groupType'],
): ResourceGroup {
  // Infer groupType from first item when it carries content data (sync_vocab / sync_text)
  const inferredType = groupType
    ?? ((items.length > 0 && (items[0].type === 'sync_vocab' || items[0].type === 'sync_text'))
      ? items[0].type as ResourceGroup['groupType']
      : 'resource')
  return {
    groupId: `grp-${groupName.replace(/\s/g, '_').toLowerCase()}`,
    groupName,
    groupType: inferredType,
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
    ...makeBaseResult(query, "answer_card"),
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
  const isDictSearch = isDictationQuery(query)
  const isWlSearch = isWordListQuery(query)
  const isEngWord = isEnglishWordQuery(query)
  // Vocabulary intent: not dictation, not word_list → vocabulary/english word path
  const isVocabSearch = !isDictSearch && !isWlSearch

  const smartMatchGroups: ResourceGroup[] = []
  const smartRelatedGroups: ResourceGroup[] = []

  // ── Dictation intent: function entries → unit vocab → my word lists ──
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

    // 3. My word lists third
    if (lists.length > 0) {
      smartMatchGroups.push({ ...myGroup, groupType: 'my_content', tabLabelOverrides: { function: '我的词表' } })
    }

    return {
      ...makeBaseResult(query, "dictation"),
      original: buildEmptyV1_0Result(query),
      smartMatchGroups,
      smartRelatedGroups,
    }
  }

  // ── English word query: 讲词入口 → then vocab results ──
  if (isEngWord) {
    // Build 讲词/单词教学 entry
    const wordTeachItem: ResourceItem = {
      id: 'func-word-teach-search',
      title: `讲词 — ${query.trim()}`,
      type: 'function',
      tags: ['讲词', '单词教学', '词汇'],
      difficulty: 'basic',
      grade: ctx.grade || '七年级上',
      isCurrentUnit: true,
      canPreview: false,
      canAssign: false,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: `查看「${query.trim()}」全屏讲词页，含词义、例句、搭配和教学资源`,
    }
    smartMatchGroups.push(wrapResourcesToGroup(
      [wordTeachItem],
      '讲词 / 单词教学入口',
      `打开「${query.trim()}」单词教学页，查看详细讲解`,
    ))

    // Then fall through to vocabulary ordering below
  }

  // ── Vocabulary / English word ordering ──
  // 1. 当前单元词汇 (primary, with full content selection)
  // 2. 听写与默写入口
  // 3. 我的词表
  // 4. 关联推荐：词汇试卷、答题卡等（弱关联，不出现在主结果前列）
  if (isVocabSearch || isEngWord) {
    // 1. Unit vocabulary first — show full content (词汇/语块/固定搭配) with selection
    const unitLabel = ctx.unit || '当前单元'
    smartMatchGroups.push(
      wrapResourcesToGroup(
        unitVocab,
        `${unitLabel} — 当前单元词汇`,
        `${unitLabel} 同步词汇内容，可选择词汇、语块和固定搭配后，布置听写、默写、跟读或选词类练习`,
        'sync_vocab',
      ),
    )

    // 2. Dictation entries
    const dictGroup = wrapResourcesToGroup(
      dictItems,
      '听写与默写入口',
      '可用于当前单元词汇的听写、默写练习形式',
      'dictation_func',
    )
    dictGroup.tabLabelOverrides = { vocab_practice: '听写默写入口' }
    smartMatchGroups.push(dictGroup)

    // 3. My word lists
    if (lists.length > 0) {
      smartMatchGroups.push({ ...myGroup, tabLabelOverrides: { function: '我的词表' } })
    }

    // 4. Related: 词汇试卷 → 答题卡 → 纸质练习 → 弱关联 (弱关联不出现在主结果前列)
    smartRelatedGroups.push(
      wrapRelatedGroup(
        [
          {
            id: 'rel-vocab-paper',
            title: `${unitLabel} 词汇专项试卷`,
            type: 'unit_test',
            tags: ['词汇试卷', unitLabel],
            difficulty: 'medium',
            grade: ctx.grade || '七年级上',
            source: ctx.textbook || '人教版',
            isCurrentUnit: true,
            questionCount: 30,
            duration: '40分钟',
            canPreview: true,
            canAssign: true,
            canAddToPaperBasket: false,
            canAddToLessonPrep: false,
            isLessonPrepResource: false,
            recommendReason: '当前单元词汇专项检测试卷',
          },
          {
            id: 'rel-vocab-answer-card',
            title: '词汇听写答题卡',
            type: 'function',
            tags: ['答题卡', '词汇听写'],
            difficulty: 'basic',
            grade: ctx.grade || '七年级上',
            source: '我的',
            isCurrentUnit: true,
            canPreview: true,
            canAssign: true,
            canAddToPaperBasket: false,
            canAddToLessonPrep: false,
            isLessonPrepResource: false,
            recommendReason: '可用于词汇听写的纸质答题卡',
          },
        ],
        '词汇关联资源',
        '你可能还会用到词汇试卷和答题卡资源',
      ),
    )

    return {
      ...makeBaseResult(query, "vocabulary"),
      original: buildEmptyV1_0Result(query),
      smartMatchGroups,
      smartRelatedGroups,
    }
  }

  // ── Word list ordering ──
  // 1. My word lists first
  if (lists.length > 0) {
    smartMatchGroups.push({ ...myGroup, tabLabelOverrides: { function: '我的词表' } })
  }

  // 2. Dictation entries
  const dictGroup = wrapResourcesToGroup(
    dictItems,
    '听写与默写入口',
    '可用于听写和默写的练习形式',
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
    ...makeBaseResult(query, "word_list"),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups,
    smartRelatedGroups,
  }
}

// ── Vocab Paper ────────────────────────────────────────

export function buildVocabPaperResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const vocabPapers = getVocabPaperResources(ctx)
  const myPapers = getMyPapers(ctx)
  const myVocabPapers = myPapers.filter((p) => /词汇/.test(p.title))
  const dictItems = getDictationResourceItems()
  const lists = getMyWordLists(ctx)
  const unitVocab = getUnitVocabularyResources(ctx)
  const unitLabel = ctx.unit || '当前单元'

  const smartMatchGroups: ResourceGroup[] = []
  const smartRelatedGroups: ResourceGroup[] = []

  // 1. 同步词汇试卷
  const syncVocabPapers = vocabPapers.filter((p) => p.type === 'unit_test')
  if (syncVocabPapers.length > 0) {
    smartMatchGroups.push(wrapResourcesToGroup(
      syncVocabPapers,
      `${unitLabel} 同步词汇试卷`,
      '与当前单元同步的词汇检测试卷',
    ))
  }

  // 2. 专项词汇试卷
  const specialVocabPapers = vocabPapers.filter((p) => p.type === 'special')
  if (specialVocabPapers.length > 0) {
    smartMatchGroups.push(wrapResourcesToGroup(
      specialVocabPapers,
      '词汇专项试卷',
      '聚焦词汇能力的专项试卷',
    ))
  }

  // 3. 综合词汇试卷
  const compVocabPapers = vocabPapers.filter((p) => p.type === 'comprehensive')
  if (compVocabPapers.length > 0) {
    smartMatchGroups.push(wrapResourcesToGroup(
      compVocabPapers,
      '词汇综合试卷',
      '词汇综合能力检测试卷',
    ))
  }

  // 4. 我的试卷中含"词汇"的
  if (myVocabPapers.length > 0) {
    smartMatchGroups.push({
      ...buildMyPaperGroup(myVocabPapers),
      groupName: '我的词汇试卷',
    })
  }

  // Related: 听写/默写入口 → 我的词表 → 当前单元词汇
  smartRelatedGroups.push(wrapRelatedGroup(
    dictItems,
    '听写与默写入口',
    '可用于词汇练习的听写、默写功能',
  ))

  if (lists.length > 0) {
    smartRelatedGroups.push({
      ...buildMyWordListGroup(lists),
      groupName: '我的词表',
      isPrimaryMatch: false,
    })
  }

  smartRelatedGroups.push(wrapRelatedGroup(
    unitVocab,
    '当前单元词汇',
    '当前单元同步词汇内容，可用于复习和巩固',
  ))

  return {
    ...makeBaseResult(query, "vocab_paper"),
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
    ...makeBaseResult(query, "paper"),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups,
    smartRelatedGroups: [], // Paper intent has no related currently
  }
}

// ── Writing ────────────────────────────────────────────

export function buildWritingResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const writingItems = getWritingResourceItems()
  const writingPapers = getWritingPaperResources(ctx)
  const q = query.trim()

  let smartMatchGroups: ResourceGroup[] = []
  let smartRelatedGroups: ResourceGroup[] = []

  if (/应用文/.test(q)) {
    // 应用文: main → 自定义应用文入口 + 应用文写作专项试卷
    smartMatchGroups = [
      wrapResourcesToGroup(
        [writingItems[0]],
        '自定义应用文入口',
        '支持书信、通知、日记等常见应用文体裁，可自定义题目和要求',
      ),
      wrapResourcesToGroup(
        [writingPapers[0]],
        '应用文写作专项试卷',
        '应用文写作专项训练试卷',
      ),
    ]
    smartRelatedGroups = [
      wrapResourcesToGroup(
        [writingItems[1]],
        '自定义读后续写入口',
        '你可能也会用到读后续写练习',
      ),
    ]
  } else if (/读后续写|续写/.test(q)) {
    // 读后续写: main → 自定义读后续写入口 + 读后续写专项试卷
    smartMatchGroups = [
      wrapResourcesToGroup(
        [writingItems[1]],
        '自定义读后续写入口',
        '提供阅读材料，训练学生读写综合能力',
      ),
      wrapResourcesToGroup(
        [writingPapers[1]],
        '读后续写专项试卷',
        '读后续写专项训练试卷',
      ),
    ]
    smartRelatedGroups = [
      wrapResourcesToGroup(
        [writingItems[0]],
        '自定义应用文入口',
        '你可能也会用到应用文写作',
      ),
    ]
  } else {
    // 作文/写作/书面表达: 展示应用文、读后续写入口 + 当前学段写作专项试卷
    smartMatchGroups = [
      wrapResourcesToGroup(
        writingItems,
        '写作练习入口',
        '支持应用文和读后续写两种写作训练方式',
      ),
      wrapResourcesToGroup(
        writingPapers,
        '写作专项试卷',
        '当前学段可用的写作专项试卷',
      ),
    ]
  }

  return {
    ...makeBaseResult(query, "writing"),
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
    ...makeBaseResult(query, "practice"),
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
  if (/听说|口语/.test(q)) return 'speaking'
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
    ...makeBaseResult(query, "special_topic"),
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
    ...makeBaseResult(query, "micro_skill"),
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
    ...makeBaseResult(query, "real_exam"),
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
    ...makeBaseResult(query, "mock_exam"),
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
    ...makeBaseResult(query, "exam_set"),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups,
    smartRelatedGroups: [],
  }
}

// ── Listening (general: 听力/听力练习/听力资源) ──────────
// Order: sync listening → special listening → mock/exam listening
// Related: my papers(听力), textbook, speaking alternative

export function buildListeningResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const syncResources = getListeningResources(ctx)
  const specialResources = getListeningRelated(ctx) // currently returns 听力专项 + 听力模拟
  const paperResources = getListeningPaperResources(ctx)
  const myListeningPapers = getListeningMyPapers(ctx)

  const smartMatchGroups: ResourceGroup[] = []
  const smartRelatedGroups: ResourceGroup[] = []

  // 1. 同步听力资源
  smartMatchGroups.push(wrapResourcesToGroup(syncResources, '同步听力资源', '当前单元同步听力训练'))

  // 2. 听力专项资源
  if (specialResources.length > 0) {
    smartMatchGroups.push(wrapResourcesToGroup(specialResources, '听力专项资源', '听力专项和模拟资源'))
  }

  // 3. 模拟/试卷听力资源
  if (paperResources.length > 0) {
    smartMatchGroups.push(wrapResourcesToGroup(paperResources, '听力试卷与模拟', '听力模拟、套题和真题试卷'))
  }

  // Related: my papers(听力), 听说替代
  if (myListeningPapers.length > 0) {
    smartRelatedGroups.push(wrapRelatedGroup(myListeningPapers, '我的听力试卷', '你的试卷中含"听力"的资源'))
  }

  // 听说替代推荐
  const speakingFallback = getSpeakingFallback(ctx)
  if (speakingFallback.length > 0) {
    smartRelatedGroups.push(wrapRelatedGroup(
      [speakingFallback[0]], // just one representative item
      '听说替代推荐',
      '暂无听说资源时可使用听力替代',
    ))
  }

  return {
    ...makeBaseResult(query, "listening"),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups,
    smartRelatedGroups,
  }
}

// ── Listening Mock (听力模拟) ─────────────────────────────

export function buildListeningMockResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const resources = getListeningMockResources(ctx)

  return {
    ...makeBaseResult(query, "listening_mock"),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups: [wrapResourcesToGroup(resources, '听力模拟资源', '听力模拟和模考资源')],
    smartRelatedGroups: [],
  }
}

// ── Listening Paper (听力+试卷类) ────────────────────────
// Order: mock/exam listening → special listening → sync listening → my papers(听力)

export function buildListeningPaperResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const paperResources = getListeningPaperResources(ctx)
  const specialResources = getListeningRelated(ctx)
  const syncResources = getListeningResources(ctx)
  const myListeningPapers = getListeningMyPapers(ctx)

  const smartMatchGroups: ResourceGroup[] = []
  const smartRelatedGroups: ResourceGroup[] = []

  // 1. 模拟/试卷听力资源 (primary for paper-type queries)
  if (paperResources.length > 0) {
    smartMatchGroups.push(wrapResourcesToGroup(paperResources, '听力试卷与模拟', '听力模拟、套题和真题试卷'))
  }

  // 2. 听力专项资源
  if (specialResources.length > 0) {
    smartMatchGroups.push(wrapResourcesToGroup(specialResources, '听力专项资源', '听力专项和模拟资源'))
  }

  // 3. 同步听力资源
  smartMatchGroups.push(wrapResourcesToGroup(syncResources, '同步听力资源', '当前单元同步听力训练'))

  // 4. 我的听力试卷
  if (myListeningPapers.length > 0) {
    smartMatchGroups.push(wrapResourcesToGroup(myListeningPapers, '我的听力试卷', '你的试卷中含"听力"的资源'))
  }

  // Related: 听说替代
  const speakingFallback = getSpeakingFallback(ctx)
  if (speakingFallback.length > 0) {
    smartRelatedGroups.push(wrapRelatedGroup(
      [speakingFallback[0]],
      '听说替代推荐',
      '暂无听说资源时可使用听力替代',
    ))
  }

  return {
    ...makeBaseResult(query, "listening_paper"),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups,
    smartRelatedGroups,
  }
}

// ── Speaking (general: 听说/听说练习/听说资源) ─────────────
// Order: sync speaking → special speaking → mock/exam speaking
// Related: my papers(听说), textbook, listening alternative

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

  // Related: my papers(听说) + listening alternative
  const mySpeakingPapers = getSpeakingMyPapers(ctx)
  if (mySpeakingPapers.length > 0) {
    smartRelatedGroups.push(wrapRelatedGroup(mySpeakingPapers, '我的听说试卷', '你的试卷中含"听说"的资源'))
  }

  // 听力替代
  const listeningResources = getListeningResources(ctx)
  if (listeningResources.length > 0) {
    smartRelatedGroups.push(wrapRelatedGroup(
      [listeningResources[0]],
      '听力替代推荐',
      '暂无足够听说资源时可用听力替代',
    ))
  }

  return {
    ...makeBaseResult(query, "speaking"),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups,
    smartRelatedGroups,
  }
}

// ── Speaking Paper (听说+试卷类) ──────────────────────────
// Order: mock/exam speaking → special speaking → sync speaking → my papers(听说)

export function buildSpeakingPaperResult(
  query: string,
  ctx: SearchContext,
): EnhancedSearchResult {
  const paperResources = getSpeakingPaperResources(ctx)
  const syncResources = getSpeakingResources(ctx)
  const mySpeakingPapers = getSpeakingMyPapers(ctx)

  const smartMatchGroups: ResourceGroup[] = []
  const smartRelatedGroups: ResourceGroup[] = []

  // 1. 模拟/试卷听说资源 (primary for paper-type queries)
  if (paperResources.length > 0) {
    smartMatchGroups.push(wrapResourcesToGroup(paperResources, '听说试卷与模拟', '听说模拟、套题和真题试卷'))
  }

  // 2. 同步听说资源
  if (syncResources.length > 0) {
    smartMatchGroups.push(wrapResourcesToGroup(syncResources, '听说练习资源', '听说练习和测评资源'))
  }

  // 3. 我的听说试卷
  if (mySpeakingPapers.length > 0) {
    smartMatchGroups.push(wrapResourcesToGroup(mySpeakingPapers, '我的听说试卷', '你的试卷中含"听说"的资源'))
  }

  // Related: 听力替代
  const listeningResources = getListeningResources(ctx)
  if (listeningResources.length > 0) {
    smartRelatedGroups.push(wrapRelatedGroup(
      [listeningResources[0]],
      '听力替代推荐',
      '暂无足够听说资源时可用听力替代',
    ))
  }

  return {
    ...makeBaseResult(query, "speaking_paper"),
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
    ...makeBaseResult(query, "text"),
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
    ...makeBaseResult(query, "video"),
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
    ...makeBaseResult(query, "theme_video"),
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
    ...makeBaseResult(query, "dubbing"),
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
    ...makeBaseResult(query, "grammar"),
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
    ...makeBaseResult(query, "reading"),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups: [wrapResourcesToGroup(resources, '阅读训练资源', '阅读练习和训练资源')],
    smartRelatedGroups: related.length > 0 ? [wrapRelatedGroup(related, '同步与模拟阅读资源', '阅读相关的同步和模拟练习')] : [],
  }
}

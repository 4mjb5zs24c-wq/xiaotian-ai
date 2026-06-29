/**
 * AI Search V1.1 — Name Matcher (Phase 4)
 *
 * Matches search queries against resource names at multiple levels:
 *   exact > prefix > contains > keyword > fuzzy
 *
 * Supported name sources:
 *   - 我的试卷 (myPapers)
 *   - 我的答题卡 (myAnswerCards)
 *   - 我的词表 (myWordLists)
 *   - 课本/章节 (textbookChapters)
 *   - 教材名称 (textbooks)
 */

import type { ResourceItem, ResourceGroup, SearchContext } from './types'
import type { TextbookChapter, TextbookInfo } from './dataSources'
import {
  getMyPapers,
  getMyAnswerCards,
  getMyWordLists,
  getTextbookChapters,
  getAvailableTextbooks,
  getUnitVocabularyResources,
} from './dataSources'

// ═══════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════

export type NameMatchLevel =
  | 'exact'
  | 'prefix'
  | 'contains'
  | 'keyword'
  | 'fuzzy'

export type NameMatchSourceType =
  | 'myPaper'
  | 'myAnswerCard'
  | 'myWordList'
  | 'textbook'
  | 'chapter'

export interface NameMatchCandidate {
  id: string
  title: string
  sourceType: NameMatchSourceType
  /** The item if it's a resource, or null for textbook/chapter */
  item: ResourceItem | null
  /** Chapter data if it's a chapter match */
  chapter?: TextbookChapter
  /** Textbook data if it's a textbook match */
  textbook?: TextbookInfo
}

export interface NameMatchResult {
  candidate: NameMatchCandidate
  level: NameMatchLevel
  score: number
}

// ═══════════════════════════════════════════════════════════
// Scoring
// ═══════════════════════════════════════════════════════════

const LEVEL_SCORES: Record<NameMatchLevel, number> = {
  exact: 100,
  prefix: 80,
  contains: 60,
  keyword: 40,
  fuzzy: 20,
}

// Source type bonus: my resources slightly preferred at same score
const SOURCE_BONUS: Record<NameMatchSourceType, number> = {
  myPaper: 5,
  myAnswerCard: 5,
  myWordList: 5,
  textbook: 0,
  chapter: 2,
}

// ═══════════════════════════════════════════════════════════
// Matching Functions
// ═══════════════════════════════════════════════════════════

/** Normalize query and title for comparison */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[，。、；：！？（）【】]/g, (c) => {
      // Chinese to English punctuation mapping
      const map: Record<string, string> = {
        '，': ',', '。': '.', '、': ',', '；': ';',
        '：': ':', '！': '!', '？': '?', '（': '(',
        '）': ')', '【': '[', '】': ']',
      }
      return map[c] || c
    })
    .trim()
}

/** Level 1: Exact match */
function matchExact(query: string, title: string): boolean {
  return normalize(query) === normalize(title)
}

/** Level 2: Prefix match */
function matchPrefix(query: string, title: string): boolean {
  const nq = normalize(query)
  const nt = normalize(title)
  return nt.startsWith(nq) && nq.length >= 2
}

/** Level 3: Continuous contains match */
function matchContains(query: string, title: string): boolean {
  const nq = normalize(query)
  const nt = normalize(title)
  return nt.includes(nq) && nq.length >= 2
}

/** Level 4: Keyword split match (2+ keywords hit) */
function matchKeyword(query: string, title: string): { hit: boolean; count: number } {
  const keywords = normalize(query).split(/\s+/).filter((k) => k.length >= 1)
  if (keywords.length < 2) return { hit: false, count: 0 }
  const nt = normalize(title)
  const hits = keywords.filter((k) => nt.includes(k))
  return { hit: hits.length >= 2, count: hits.length }
}

/** Level 5: Light fuzzy match (typo, case, space tolerance) */
function matchFuzzy(query: string, title: string): boolean {
  const nq = normalize(query)
  const nt = normalize(title)
  if (nq.length < 2 || nt.length < 2) return false

  // Simple edit-distance-free fuzzy: allow 1 char difference in contains
  if (nt.includes(nq)) return true

  // Check if query with 1 char removed is contained
  for (let i = 0; i < nq.length; i++) {
    const shortened = nq.slice(0, i) + nq.slice(i + 1)
    if (shortened.length >= 2 && nt.includes(shortened)) return true
  }

  return false
}

/** Compute match level between query and a single title */
function computeMatchLevel(query: string, title: string): { level: NameMatchLevel | null; score: number } {
  if (matchExact(query, title)) return { level: 'exact', score: LEVEL_SCORES.exact }
  if (matchPrefix(query, title)) return { level: 'prefix', score: LEVEL_SCORES.prefix }
  if (matchContains(query, title)) return { level: 'contains', score: LEVEL_SCORES.contains }

  const kw = matchKeyword(query, title)
  if (kw.hit) return { level: 'keyword', score: LEVEL_SCORES.keyword + kw.count * 5 }

  if (matchFuzzy(query, title) && query.trim().length >= 3) return { level: 'fuzzy', score: LEVEL_SCORES.fuzzy }

  return { level: null, score: 0 }
}

// ═══════════════════════════════════════════════════════════
// Build Candidate Pool
// ═══════════════════════════════════════════════════════════

function buildCandidates(ctx: SearchContext): NameMatchCandidate[] {
  const candidates: NameMatchCandidate[] = []

  // My papers
  for (const item of getMyPapers(ctx)) {
    candidates.push({ id: item.id, title: item.title, sourceType: 'myPaper', item })
  }

  // My answer cards
  for (const item of getMyAnswerCards(ctx)) {
    candidates.push({ id: item.id, title: item.title, sourceType: 'myAnswerCard', item })
  }

  // My word lists
  for (const item of getMyWordLists(ctx)) {
    candidates.push({ id: item.id, title: item.title, sourceType: 'myWordList', item })
  }

  // Textbooks
  for (const tb of getAvailableTextbooks()) {
    candidates.push({ id: `tb-${tb.name}`, title: tb.name, sourceType: 'textbook', item: null, textbook: tb })
  }

  // Chapters
  for (const ch of getTextbookChapters(ctx)) {
    candidates.push({ id: ch.id, title: ch.name, sourceType: 'chapter', item: null, chapter: ch })
  }

  return candidates
}

// ═══════════════════════════════════════════════════════════
// Main Matching Function
// ═══════════════════════════════════════════════════════════

export interface NameMatchSearchResult {
  /** Whether any name match was found */
  matched: boolean
  /** All matched results, sorted by score descending */
  results: NameMatchResult[]
  /** Grouped results by source type */
  groupedResults: {
    myPapers: NameMatchResult[]
    myAnswerCards: NameMatchResult[]
    myWordLists: NameMatchResult[]
    textbooks: NameMatchResult[]
    chapters: NameMatchResult[]
  }
}

/**
 * Match a query against all resource names.
 * Returns results sorted by score (exact > prefix > contains > keyword > fuzzy).
 */
export function matchResourceNames(query: string, ctx: SearchContext): NameMatchSearchResult {
  const q = query.trim()
  if (!q) {
    return { matched: false, results: [], groupedResults: { myPapers: [], myAnswerCards: [], myWordLists: [], textbooks: [], chapters: [] } }
  }

  const candidates = buildCandidates(ctx)
  const results: NameMatchResult[] = []

  for (const candidate of candidates) {
    // Try primary title
    let bestLevel: NameMatchLevel | null = null
    let bestScore = 0

    const primary = computeMatchLevel(q, candidate.title)
    if (primary.level && primary.score > bestScore) {
      bestLevel = primary.level
      bestScore = primary.score
    }

    // For textbooks, also try aliases
    if (candidate.textbook) {
      for (const alias of candidate.textbook.aliases) {
        const aliasMatch = computeMatchLevel(q, alias)
        if (aliasMatch.level && aliasMatch.score > bestScore) {
          bestLevel = aliasMatch.level
          bestScore = aliasMatch.score
        }
      }
    }

    // For chapters, also try matchNames
    if (candidate.chapter) {
      for (const alias of candidate.chapter.matchNames) {
        const aliasMatch = computeMatchLevel(q, alias)
        if (aliasMatch.level && aliasMatch.score > bestScore) {
          bestLevel = aliasMatch.level
          bestScore = aliasMatch.score
        }
      }
    }

    if (bestLevel) {
      results.push({
        candidate,
        level: bestLevel,
        score: bestScore + SOURCE_BONUS[candidate.sourceType],
      })
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score)

  // Group results
  const groupedResults = {
    myPapers: results.filter((r) => r.candidate.sourceType === 'myPaper'),
    myAnswerCards: results.filter((r) => r.candidate.sourceType === 'myAnswerCard'),
    myWordLists: results.filter((r) => r.candidate.sourceType === 'myWordList'),
    textbooks: results.filter((r) => r.candidate.sourceType === 'textbook'),
    chapters: results.filter((r) => r.candidate.sourceType === 'chapter'),
  }

  return {
    matched: results.length > 0,
    results,
    groupedResults,
  }
}

// ═══════════════════════════════════════════════════════════
// Build EnhancedSearchResult from Name Matches
// ═══════════════════════════════════════════════════════════

import type { EnhancedSearchResult, NewSearchResult } from './types'

function makeBaseResult(query: string): Pick<EnhancedSearchResult, 'isPrecisionJump' | 'aiUnderstandingText'> {
  return {
    isPrecisionJump: false,
    aiUnderstandingText: `小天识别到你在搜索「${query}」\n已为你匹配名称相近的资源。`,
  }
}

function wrapMatchGroup(
  items: ResourceItem[],
  groupName: string,
  recText?: string,
): ResourceGroup {
  return {
    groupId: `grp-nm-${groupName.replace(/\s/g, '_').toLowerCase()}`,
    groupName,
    groupType: 'resource',
    isPrimaryMatch: true,
    defaultExpanded: true,
    recommendationText: recText,
    items,
    displayLimit: 5,
  }
}

function wrapRelatedGroup(
  items: ResourceItem[],
  groupName: string,
  recText?: string,
): ResourceGroup {
  return {
    groupId: `grp-nm-rel-${groupName.replace(/\s/g, '_').toLowerCase()}`,
    groupName,
    groupType: 'resource',
    isPrimaryMatch: false,
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
      recognizedIntent: '名称匹配',
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

/**
 * Build an EnhancedSearchResult from name match results.
 * Priority: myPapers > myAnswerCards > myWordLists > chapters > textbooks
 */
export function buildNameMatchResult(
  query: string,
  ctx: SearchContext,
  nameMatch: NameMatchSearchResult,
): EnhancedSearchResult {
  const smartMatchGroups: ResourceGroup[] = []
  const smartRelatedGroups: ResourceGroup[] = []
  const { groupedResults } = nameMatch

  // 1. My papers
  if (groupedResults.myPapers.length > 0) {
    const items = groupedResults.myPapers
      .slice(0, 5)
      .map((r) => r.candidate.item!)
      .filter(Boolean)
    if (items.length > 0) {
      smartMatchGroups.push(wrapMatchGroup(
        items,
        '我的试卷',
        '名称匹配到你的试卷',
      ))
    }
  }

  // 2. My answer cards
  if (groupedResults.myAnswerCards.length > 0) {
    const items = groupedResults.myAnswerCards
      .slice(0, 5)
      .map((r) => r.candidate.item!)
      .filter(Boolean)
    if (items.length > 0) {
      smartMatchGroups.push(wrapMatchGroup(
        items,
        '我的答题卡',
        '名称匹配到你的答题卡',
      ))
    }
  }

  // 3. My word lists
  if (groupedResults.myWordLists.length > 0) {
    const items = groupedResults.myWordLists
      .slice(0, 5)
      .map((r) => r.candidate.item!)
      .filter(Boolean)
    if (items.length > 0) {
      smartMatchGroups.push(wrapMatchGroup(
        items,
        '我的词表',
        '名称匹配到你的词表',
      ))
    }
  }

  // 4. Chapter matches → show chapter resources
  if (groupedResults.chapters.length > 0) {
    const chapterItems: ResourceItem[] = []
    for (const ch of groupedResults.chapters.slice(0, 3)) {
      const chapter = ch.candidate.chapter!
      // Build resource items for this chapter
      if (chapter.resourceTypes.includes('text')) {
        chapterItems.push({
          id: `ch-text-${chapter.id}`,
          title: `${chapter.name} 课文`,
          type: 'sync_text',
          tags: ['课文', chapter.name],
          difficulty: 'basic',
          grade: ctx.grade || '七年级上',
          source: chapter.textbook,
          isCurrentUnit: chapter.isCurrentUnit,
          canPreview: true,
          canAssign: true,
          canAddToPaperBasket: false,
          canAddToLessonPrep: true,
          isLessonPrepResource: true,
          recommendReason: `匹配到章节「${chapter.name}」`,
        })
      }
      if (chapter.resourceTypes.includes('vocab')) {
        chapterItems.push({
          id: `ch-vocab-${chapter.id}`,
          title: `${chapter.name} 词汇`,
          type: 'sync_vocab',
          tags: ['词汇', chapter.name],
          difficulty: 'basic',
          grade: ctx.grade || '七年级上',
          source: chapter.textbook,
          isCurrentUnit: chapter.isCurrentUnit,
          canPreview: true,
          canAssign: true,
          canAddToPaperBasket: false,
          canAddToLessonPrep: false,
          isLessonPrepResource: false,
          recommendReason: `匹配到章节「${chapter.name}」词汇`,
        })
      }
      if (chapter.resourceTypes.includes('listening')) {
        chapterItems.push({
          id: `ch-listen-${chapter.id}`,
          title: `${chapter.name} 听力`,
          type: 'sync_listening',
          tags: ['听力', chapter.name],
          difficulty: 'basic',
          grade: ctx.grade || '七年级上',
          source: chapter.textbook,
          isCurrentUnit: chapter.isCurrentUnit,
          canPreview: true,
          canAssign: true,
          canAddToPaperBasket: false,
          canAddToLessonPrep: false,
          isLessonPrepResource: false,
          recommendReason: `匹配到章节「${chapter.name}」听力`,
        })
      }
    }
    if (chapterItems.length > 0) {
      const label = groupedResults.chapters[0].candidate.chapter!.isCurrentUnit
        ? '当前单元资源'
        : '已为你找到相关单元资源'
      smartMatchGroups.push(wrapMatchGroup(chapterItems, label, `匹配到课本章节资源`))
    }
  }

  // 5. Textbook matches → show textbook info
  if (groupedResults.textbooks.length > 0 && smartMatchGroups.length === 0) {
    const tbName = groupedResults.textbooks[0].candidate.textbook!.name
    smartMatchGroups.push(wrapMatchGroup(
      [{
        id: `tb-info-${tbName}`,
        title: `${tbName} 教材资源`,
        type: 'comprehensive',
        tags: ['教材', tbName],
        difficulty: 'basic',
        grade: ctx.grade || '七年级上',
        source: tbName,
        isCurrentUnit: true,
        canPreview: false,
        canAssign: true,
        canEnter: true,
        canAddToLessonPrep: false,
        isLessonPrepResource: false,
        recommendReason: `匹配到教材「${tbName}」`,
      }],
      '教材匹配',
      `匹配到教材「${tbName}」，可布置课本内容或进入课本教学页面`,
    ))
  }

  // Related: if we have my resources, suggest related unit resources
  if (groupedResults.myPapers.length > 0 || groupedResults.myAnswerCards.length > 0) {
    const unitVocab = getUnitVocabularyResources(ctx)
    if (unitVocab.length > 0) {
      smartRelatedGroups.push(wrapRelatedGroup(unitVocab, '当前单元词汇', '当前单元相关资源'))
    }
  }

  const aiText = smartMatchGroups.length > 0
    ? `小天识别到你在搜索「${query}」\n已为你匹配名称相近的资源。`
    : `小天正在搜索「${query}」相关资源`

  return {
    ...makeBaseResult(query),
    aiUnderstandingText: aiText,
    original: buildEmptyV1_0Result(query),
    smartMatchGroups,
    smartRelatedGroups,
  }
}

/**
 * Determine if a name match result has any EXACT match.
 * Used to override precision jump for exact name matches.
 */
export function hasExactNameMatch(nameMatch: NameMatchSearchResult): boolean {
  if (!nameMatch.matched) return false
  return nameMatch.results.some((r) => r.level === 'exact')
}

/**
 * Determine if a name match result has any PREFIX match.
 * Prefix matches are specific enough to override intent keywords.
 */
export function hasPrefixNameMatch(nameMatch: NameMatchSearchResult): boolean {
  if (!nameMatch.matched) return false
  return nameMatch.results.some((r) => r.level === 'prefix')
}

/**
 * Determine if a name match result is "strong enough" to bypass intent matching.
 * Only exact/prefix/contains matches with score >= 60 should bypass intent.
 */
export function isStrongNameMatch(nameMatch: NameMatchSearchResult): boolean {
  if (!nameMatch.matched) return false
  const topResult = nameMatch.results[0]
  return topResult.score >= 60 // exact(100), prefix(80), contains(60)
}

/**
 * Determine if a name match result is for textbook/chapter (lower threshold).
 * Textbook/chapter matches should bypass intent even at lower scores.
 */
export function isTextbookNameMatch(nameMatch: NameMatchSearchResult): boolean {
  if (!nameMatch.matched) return false
  return nameMatch.results.some(
    (r) => (r.candidate.sourceType === 'textbook' || r.candidate.sourceType === 'chapter') && r.score >= 40,
  )
}

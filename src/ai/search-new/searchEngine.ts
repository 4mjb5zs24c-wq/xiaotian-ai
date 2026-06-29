/**
 * AI Search V2 — Search Engine
 *
 * Rule-based query matching engine. Takes a user query and search context,
 * determines the search type, and returns the appropriate NewSearchResult.
 *
 * Matching priority:
 *   1. Function entry keywords
 *   2. Specific paper name patterns (province + year + exam type)
 *   3. Sync vocab / sync text keywords
 *   4. Resource type keywords (listening, writing, vocab, grammar, reading, etc.)
 *   5. Unit N + specific type combination
 *   6. Context-based comprehensive search (default)
 *   7. Fuzzy / conversational queries
 *   8. No results / unrecognizable (fallback)
 */

import type { NewSearchResult, SearchContext, ResourceItem, FunctionEntry, MockActionResult } from './types'
import { SCENARIO_MAP, type ScenarioName } from './mock/scenarios'

// ── Query Analysis Helpers ────────────────────────────────

interface ParsedPaperQuery {
  province?: string
  year?: string
  examType?: string
  isSpecificPaper: boolean
}

/**
 * Parse a query to detect specific paper name search patterns.
 * Examples: "山东省24年中考真题", "2024 山东 中考 英语 真题"
 */
export function parseSpecificPaperQuery(query: string): ParsedPaperQuery {
  const result: ParsedPaperQuery = { isSpecificPaper: false }

  // Province patterns
  const provinceMap: Record<string, string> = {
    '山东': '山东', '山东省': '山东',
    '北京': '北京', '北京市': '北京',
    '上海': '上海', '上海市': '上海',
    '广东': '广东', '广东省': '广东',
    '江苏': '江苏', '江苏省': '江苏',
    '浙江': '浙江', '浙江省': '浙江',
    '福建': '福建', '福建省': '福建',
    '四川': '四川', '四川省': '四川',
    '湖北': '湖北', '湖北省': '湖北',
    '湖南': '湖南', '湖南省': '湖南',
  }
  for (const [key, val] of Object.entries(provinceMap)) {
    if (query.includes(key)) {
      result.province = val
      break
    }
  }

  // Year patterns: "24年", "2024", "24", "二零二四"
  const yearPatterns = [
    /(\d{4})\s*年?/,
    /(\d{2})\s*年/,
  ]
  for (const pat of yearPatterns) {
    const m = query.match(pat)
    if (m) {
      const y = parseInt(m[1])
      result.year = y >= 1000 ? String(y) : String(2000 + y)
      break
    }
  }

  // Exam type patterns
  if (/中考/.test(query)) result.examType = '中考'
  else if (/高考/.test(query)) result.examType = '高考'
  else if (/期中/.test(query)) result.examType = '期中'
  else if (/期末/.test(query)) result.examType = '期末'
  else if (/模拟/.test(query)) result.examType = '模拟'

  // Determine if this is a specific paper search
  // Need at least 2 of: province, year, examType
  const signals = [result.province, result.year, result.examType].filter(Boolean).length
  const hasPaperKeyword = /真题|试卷|考题|试题|真题卷/.test(query)
  result.isSpecificPaper = signals >= 2 || (signals >= 1 && hasPaperKeyword)

  return result
}

/**
 * Normalize query for keyword matching.
 */
function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[，,。.！!？?、]/g, '')
}

/**
 * Check if query is purely digits/special chars (not meaningful search)
 */
function isMeaninglessQuery(q: string): boolean {
  // Pure digits
  if (/^\d+$/.test(q)) return true
  // Only special chars
  if (/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/.test(q)) return true
  // Too short (single char)
  if (q.length < 2) return true
  return false
}

/**
 * Extract unit number from query. Returns null if no unit referenced.
 */
function extractUnitNum(q: string, orig: string): string | null {
  // Try from normalized q
  const m1 = q.match(/unit\s*(\d+)/)
  if (m1) return m1[1]
  // Try from Chinese
  const m2 = orig.match(/第\s*(\d+)\s*单元/)
  if (m2) return m2[1]
  return null
}

// ── Main Search Engine ────────────────────────────────────

export function matchNewSearch(
  query: string,
  ctx: SearchContext,
): NewSearchResult {
  const orig = query.trim()

  // Handle empty / meaningless queries
  if (!orig || isMeaninglessQuery(normalizeQuery(orig))) {
    return SCENARIO_MAP.unrecognizable(orig, ctx)
  }

  const q = normalizeQuery(orig)

  // ── Priority 1: Function Entry Search ──────────────────
  const funcResult = tryFunctionEntryMatch(q, orig)
  if (funcResult) return funcResult

  // ── Priority 2: Specific Paper Name Search ─────────────
  const paperResult = tryPaperMatch(q, orig, ctx)
  if (paperResult) return paperResult

  // ── Priority 3: Sync Vocab Search ─────────────────────
  if (/同步词汇|词汇表|单词表|课标词汇|单词列表/.test(q)) {
    return SCENARIO_MAP.sync_vocab(orig, ctx)
  }

  // ── Priority 4: Sync Text Search ──────────────────────
  if (/同步课文|课文内容|课文原文|课文跟读/.test(q)) {
    if (/topic|话题/.test(q)) {
      return SCENARIO_MAP.sync_text_flat(orig, ctx)
    }
    return SCENARIO_MAP.sync_text_structured(orig, ctx)
  }

  // ── Priority 5: Resource Type Search ──────────────────

  // 5a. 写作练习 (must be before P1 批改 to avoid function_entry capture)
  if (/写作练习|写作训练|作文练习|书面表达|^作文$|应用文|读后续写/.test(q)) {
    return SCENARIO_MAP.writing(orig, ctx)
  }

  // 5b. 词汇练习
  if (/词汇练习|单词练习|单词拼写|词形变化|单词默写|单词听写|^单词$/.test(q)) {
    return SCENARIO_MAP.vocab_practice(orig, ctx)
  }

  // 5c. 语法练习
  if (/语法练习|语法填空|单句语法|语法训练|完形填空|选词填空|短文填空|^语法$/.test(q)) {
    return SCENARIO_MAP.grammar(orig, ctx)
  }

  // 5d. 阅读练习
  if (/阅读理解|阅读练习|阅读训练|阅读七选五|英语阅读|任务型阅读/.test(q)) {
    return SCENARIO_MAP.reading(orig, ctx)
  }

  // 5e. 听力模拟 (must be before 模拟/听力 to avoid capture)
  if (/听力模拟|听力模考/.test(q)) {
    return SCENARIO_MAP.listening_mock(orig, ctx)
  }

  // 5f. 听力搜索 (but NOT 听说练习 specifically)
  if (/^听力$|听力资源|听力练习|听力训练|听力素材/.test(q) && !/听说/.test(q)) {
    return SCENARIO_MAP.listening(orig, ctx)
  }

  // 5g. 听说搜索 — 按资源是否存在判断，不再按地区判断
  if (/听说练习|听说训练|听说资源|听说/.test(q)) {
    return SCENARIO_MAP.listening(orig, ctx)
  }

  // 5h. 同步练习
  if (/同步练习|同步训练|单元练习/.test(q)) {
    return SCENARIO_MAP.sync_practice(orig, ctx)
  }

  // 5i. 真题独立搜索 (not captured by P2 paper_name — must be before 专项)
  if (/^真题$|真题资源|真题库|历年真题|中高考真题|区域精选/.test(q)) {
    return SCENARIO_MAP.real_exam(orig, ctx)
  }

  // 5j. 专项搜索
  if (/专项|专项训练|专项练习|词汇专项|语法专项|听力专项|听说专项|写作专项|阅读专项/.test(q)) {
    return SCENARIO_MAP.special_topic(orig, ctx)
  }

  // 5k. 模拟搜索 (must be AFTER 听力模拟)
  if (/模拟|模拟卷|模拟题|模拟试题|单元检测|阶段测试|考前冲刺|期末考试|期中考试|摸底考试/.test(q)) {
    return SCENARIO_MAP.mock_exam(orig, ctx)
  }

  // 5l. 配音搜索
  if (/配音|配音练习|视频配音|趣味配音|同步视频|视频资源/.test(q)) {
    return SCENARIO_MAP.unit1_comprehensive(orig, ctx)
  }

  // ── Priority 6: Unit N + Specific Type Combination ────
  // "Unit 1 听力", "Unit 3 词汇", "Unit 2 语法" etc.
  const unitNum = extractUnitNum(q, orig)
  if (unitNum || /单元/.test(q)) {
    if (/听力|听说/.test(q)) return SCENARIO_MAP.listening(orig, ctx)
    if (/词汇|单词|词表/.test(q)) return SCENARIO_MAP.vocab_practice(orig, ctx)
    if (/语法/.test(q)) return SCENARIO_MAP.grammar(orig, ctx)
    if (/写作|作文/.test(q)) return SCENARIO_MAP.writing(orig, ctx)
    if (/阅读/.test(q)) return SCENARIO_MAP.reading(orig, ctx)
    if (/课文/.test(q)) return SCENARIO_MAP.sync_text_structured(orig, ctx)
    if (/模拟|检测|测试|考试/.test(q)) return SCENARIO_MAP.mock_exam(orig, ctx)
    if (/真题/.test(q)) return SCENARIO_MAP.real_exam(orig, ctx)
    if (/专项/.test(q)) return SCENARIO_MAP.special_topic(orig, ctx)
    // Default: comprehensive
    return SCENARIO_MAP.unit1_comprehensive(orig, ctx)
  }

  // Generic resource categories without Unit prefix
  if (/资源|综合|练习/.test(q)) {
    return SCENARIO_MAP.unit1_comprehensive(orig, ctx)
  }

  // ── Priority 7: Fuzzy / Default ──────────────────────
  // Conversational queries: "有没有资源", "帮我找点练习"
  // "阅读" alone is too broad, redirect to reading
  if (/^阅读$|^阅读资源$/.test(q)) {
    return SCENARIO_MAP.reading(orig, ctx)
  }
  if (/有没有|帮我找|有什么|找.*资源|找.*练习|看看/.test(q)) {
    return SCENARIO_MAP.unit1_comprehensive(orig, ctx)
  }
  // Chinese short queries (2-4 chars, contains Chinese) → comprehensive
  if (q.length >= 2 && q.length <= 4 && /[一-鿿]/.test(q)) {
    return SCENARIO_MAP.unit1_comprehensive(orig, ctx)
  }

  // ── Priority 8: Completely Unrecognizable ────────────
  return SCENARIO_MAP.unrecognizable(orig, ctx)
}

// ── Sub-Matchers ──────────────────────────────────────────

function tryFunctionEntryMatch(
  q: string,
  orig: string,
): NewSearchResult | null {
  // Check for function keywords
  const funcKeywords: Array<{ pattern: RegExp; scenario: ScenarioName }> = [
    { pattern: /三方卡|答题卡|纸质答题卡|纸质练习|新建答题卡|自制答题卡|制卡/, scenario: 'function_entry' },
    { pattern: /词表|词单/, scenario: 'wordlist' },
    { pattern: /听写|默写批改|词句|句子听写/, scenario: 'function_entry' },
    { pattern: /批改|篇章默写/, scenario: 'function_entry' },
    { pattern: /导入试卷|导入考卷|导入试题/, scenario: 'function_entry' },
    { pattern: /讲词|单词讲解|词义讲解|讲单词/, scenario: 'function_entry' },
    { pattern: /自定义/, scenario: 'function_entry' },
  ]

  for (const { pattern, scenario } of funcKeywords) {
    if (pattern.test(q)) {
      return SCENARIO_MAP[scenario](orig)
    }
  }

  return null
}

function tryPaperMatch(
  _q: string,
  orig: string,
  ctx: SearchContext,
): NewSearchResult | null {
  const parsed = parseSpecificPaperQuery(orig)

  if (!parsed.isSpecificPaper) return null

  // Check for exact match: 山东 + 2024 + 中考
  if (parsed.province === '山东' && parsed.year === '2024' && parsed.examType === '中考') {
    return SCENARIO_MAP.paper_exact(orig, ctx)
  }

  // Check if we have a near match scenario
  if (parsed.province || parsed.year || parsed.examType) {
    return SCENARIO_MAP.paper_near(orig, ctx)
  }

  return null
}

// ── Mock Action Functions ─────────────────────────────────

export function mockOpenPreview(resource: ResourceItem): MockActionResult {
  return {
    type: 'preview',
    message: `已打开教师端现有资源预览页：${resource.title}`,
    resource,
  }
}

export function mockOpenAssignDialog(resource: ResourceItem): MockActionResult {
  return {
    type: 'assign',
    message: `已打开教师端现有布置弹窗：${resource.title}`,
    resource,
  }
}

export function mockAddToLessonPrep(resource: ResourceItem): MockActionResult {
  return {
    type: 'lesson_prep',
    message: `已调用教师端现有备课能力：${resource.title}`,
    resource,
  }
}

export function mockOpenFunction(entry: FunctionEntry): MockActionResult {
  return {
    type: 'function',
    message: `已打开教师端已有页面：${entry.name}`,
    entry,
  }
}

// ── Tag Search ─────────────────────────────────────────────

import {
  matchTagQuery,
  getTagResources,
  getTagFallback,
} from './dataSources'

export function matchTagResources(
  query: string,
  ctx: SearchContext,
): NewSearchResult | null {
  const match = matchTagQuery(query)
  if (!match) return null

  const resources = getTagResources(match.tagId, ctx)
  const { isNoResults, isUnrecognizable } = resources.length > 0
    ? { isNoResults: false, isUnrecognizable: false }
    : { isNoResults: true, isUnrecognizable: false }

  // 多标签时按意图优先级和资源相关性排序（当前 mock 只有单标签命中）
  const sorted = resources

  // Fallback: tag exists but no resources
  if (sorted.length === 0) {
    const fallbackItems = getTagFallback(ctx)
    return {
      intent: {
        query,
        recognizedIntent: '标签搜索',
        searchType: 'resource',
        context: `命中卷库标签（${match.matchLevel === 'exact' ? '精确' : '弱'}匹配）`,
        matchedTypes: [],
        expandedTypes: [],
        foldedTypes: [],
        message: `标签下暂无资源，以下为替代推荐`,
      },
      filterTabs: [],
      resourceGroups: [{
        groupId: 'tag-fallback',
        groupName: '替代推荐资源',
        groupType: 'alternative',
        isPrimaryMatch: true,
        defaultExpanded: true,
        recommendationText: '该标签下暂无资源，以下为替代推荐',
        items: fallbackItems,
        displayLimit: 5,
      }],
      functionEntries: [],
      isNoResults: true,
      isUnrecognizable: false,
    }
  }

  const zone = match.matchLevel === 'exact' ? '智能匹配区' : '推荐关联区'

  return {
    intent: {
      query,
      recognizedIntent: '标签搜索',
      searchType: 'resource',
      context: `命中卷库标签（${match.matchLevel === 'exact' ? '精确' : '弱'}匹配）`,
      matchedTypes: match.matchLevel === 'exact' ? (sorted.map(r => r.type) as any) : [],
      expandedTypes: match.matchLevel === 'exact' ? [] : (sorted.map(r => r.type) as any),
      foldedTypes: [],
      message: match.matchLevel === 'exact'
        ? `标签精确命中，资源进入${zone}`
        : `标签弱命中，资源进入${zone}`,
    },
    filterTabs: [],
    resourceGroups: [{
      groupId: `tag-${match.tagId}`,
      groupName: zone,
      groupType: 'resource',
      isPrimaryMatch: match.matchLevel === 'exact',
      defaultExpanded: true,
      recommendationText: match.matchLevel === 'exact'
        ? '标签精确命中，为你匹配以下资源'
        : `你可能在找与「${query}」相关的资源`,
      items: sorted,
      displayLimit: 5,
    }],
    functionEntries: [],
    isNoResults,
    isUnrecognizable,
  }
}

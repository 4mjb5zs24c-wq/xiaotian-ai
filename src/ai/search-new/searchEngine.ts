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
 *   4. Resource type keywords (listening, practice, special, mock, etc.)
 *   5. Context-based comprehensive search (default)
 *   6. No results / unrecognizable (fallback)
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

// ── Main Search Engine ────────────────────────────────────

export function matchNewSearch(
  query: string,
  ctx: SearchContext,
): NewSearchResult {
  const q = normalizeQuery(query)
  const orig = query.trim()

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
    // Check if query hints at flat structure
    if (/topic|话题/.test(q)) {
      return SCENARIO_MAP.sync_text_flat(orig, ctx)
    }
    return SCENARIO_MAP.sync_text_structured(orig, ctx)
  }

  // ── Priority 5: Resource Type Search ──────────────────

  // 听力搜索 (but NOT 听说练习 specifically)
  if (/^听力$|听力资源|听力练习|听力训练|听力素材/.test(q) && !/听说/.test(q)) {
    return SCENARIO_MAP.listening(orig, ctx)
  }

  // 听说搜索 — check for no-results scenario
  if (/听说练习|听说训练|听说资源|听说/.test(q)) {
    // If region doesn't support speaking practice, show alternatives
    if (ctx.region === 'default' && /Unit\s*1/.test(q)) {
      return SCENARIO_MAP.no_speaking_region(orig, ctx)
    }
    return SCENARIO_MAP.listening(orig, ctx)
  }

  // 同步练习
  if (/同步练习|同步训练|单元练习/.test(q)) {
    return SCENARIO_MAP.sync_practice(orig, ctx)
  }

  // 专项搜索
  if (/专项|专项训练|专项练习|词汇专项|语法专项|听力专项|听说专项|写作专项|阅读专项/.test(q)) {
    return SCENARIO_MAP.special_topic(orig, ctx)
  }

  // 模拟搜索
  if (/模拟|模拟卷|模拟题|模拟试题|单元检测|阶段测试|考前冲刺/.test(q)) {
    return SCENARIO_MAP.mock_exam(orig, ctx)
  }

  // 阅读理解
  if (/阅读理解|阅读练习|阅读训练|阅读/.test(q)) {
    return SCENARIO_MAP.sync_practice(orig, ctx)
  }

  // ── Priority 6: Comprehensive / Unit Search ──────────
  // "Unit N 资源", "Unit N 练习", or general unit-related queries
  if (/unit\s*\d|第\d单元|单元/.test(q) || /资源|综合|练习/.test(q)) {
    return SCENARIO_MAP.unit1_comprehensive(orig, ctx)
  }

  // ── Priority 7: Fuzzy / Default ──────────────────────
  // "有没有资源", "帮我找点练习", "这个单元有什么"
  if (/有没有|帮我找|有什么|找.*资源|找.*练习|看看/.test(q) || q.length <= 3) {
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
    { pattern: /批改|应用文|读后续写|篇章默写/, scenario: 'function_entry' },
    { pattern: /导入试卷|导入考卷|导入试题/, scenario: 'function_entry' },
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

export function mockAddToPaperBasket(resource: ResourceItem): MockActionResult {
  return {
    type: 'paper_basket',
    message: `已加入试卷篮：${resource.title}`,
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

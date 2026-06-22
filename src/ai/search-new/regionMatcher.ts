/**
 * AI Search V1.1 — Region Matcher (Phase 4)
 *
 * Detects region keywords in search queries and matches
 * against region-tagged resources (真题/模拟/期末/区域精选).
 *
 * Supported regions: 北京, 海淀, 朝阳, 深圳, 广州, 上海,
 *   山东, 云南, 江苏, 浙江, 河南, 河北, 广东, 四川
 */

import type { ResourceItem, ResourceGroup, SearchContext, EnhancedSearchResult, NewSearchResult } from './types'
import type { RegionPaper } from './dataSources'
import { getRegionPapers } from './dataSources'

// ═══════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════

export interface RegionMatchResult {
  region: string
  resourceType: RegionPaper['resourceType']
  item: ResourceItem
  score: number
}

export interface RegionSearchResult {
  /** Whether region was detected */
  matched: boolean
  /** Detected region */
  region: string | null
  /** Matched resources */
  results: RegionMatchResult[]
  /** Related (non-region) resources */
  related: ResourceItem[]
}

// ═══════════════════════════════════════════════════════════
// Region Keywords
// ═══════════════════════════════════════════════════════════

const REGIONS = [
  { keyword: '海淀', parent: '北京' },
  { keyword: '朝阳', parent: '北京' },
  { keyword: '北京', parent: null },
  { keyword: '深圳', parent: '广东' },
  { keyword: '广州', parent: '广东' },
  { keyword: '广东', parent: null },
  { keyword: '上海', parent: null },
  { keyword: '山东', parent: null },
  { keyword: '云南', parent: null },
  { keyword: '江苏', parent: null },
  { keyword: '浙江', parent: null },
  { keyword: '河南', parent: null },
  { keyword: '河北', parent: null },
  { keyword: '四川', parent: null },
]

/** Generic region trigger words */
const REGION_GENERIC_TRIGGERS = ['区域精选', '地区精选', '本地试卷', '地方试卷', '区域试卷', '地方真题']

/** Resource type trigger words in query */
const RESOURCE_TYPE_TRIGGERS: { keyword: string; type: RegionPaper['resourceType'] }[] = [
  { keyword: '真题', type: 'realExam' },
  { keyword: '中考真题', type: 'realExam' },
  { keyword: '高考真题', type: 'realExam' },
  { keyword: '期末', type: 'finalExam' },
  { keyword: '期中', type: 'midtermExam' },
  { keyword: '模拟', type: 'mockExam' },
  { keyword: '试卷', type: 'paper' },
  { keyword: '卷', type: 'paper' },
]

// ═══════════════════════════════════════════════════════════
// Region Detection
// ═══════════════════════════════════════════════════════════

/**
 * Detect if the query contains a region keyword.
 * Returns the matched region or null.
 */
export function detectRegion(query: string): string | null {
  const q = query.trim()

  // Check specific regions first (longer match first: 海淀 before 北京)
  for (const r of REGIONS) {
    if (q.includes(r.keyword)) return r.keyword
  }

  return null
}

/**
 * Check if query contains a resource type trigger.
 */
function detectResourceType(query: string): RegionPaper['resourceType'] | null {
  for (const trigger of RESOURCE_TYPE_TRIGGERS) {
    if (query.includes(trigger.keyword)) return trigger.type
  }
  return null
}

/**
 * Check if query is a generic region trigger.
 */
function isGenericRegionTrigger(query: string): boolean {
  return REGION_GENERIC_TRIGGERS.some((t) => query.includes(t))
}

// ═══════════════════════════════════════════════════════════
// Scoring
// ═══════════════════════════════════════════════════════════

function scoreRegionPaper(
  paper: RegionPaper,
  queryRegion: string,
  queryResourceType: RegionPaper['resourceType'] | null,
  ctxRegion?: string,
): number {
  let score = 0

  // Region exact match
  if (paper.region === queryRegion) score += 50
  // Parent region match (e.g. 海淀 matches 北京)
  else {
    const regionDef = REGIONS.find((r) => r.keyword === paper.region)
    if (regionDef?.parent === queryRegion) score += 30
    else if (regionDef?.keyword === queryRegion) score += 20
  }

  // Context region match
  if (ctxRegion && paper.region === ctxRegion) score += 10

  // Resource type match
  if (queryResourceType && paper.resourceType === queryResourceType) score += 20

  // Year bonus
  if (paper.year) {
    const yearNum = parseInt(paper.year)
    if (yearNum >= 2024) score += 10
    else if (yearNum >= 2023) score += 5
  }

  return score
}

// ═══════════════════════════════════════════════════════════
// Main Matching Function
// ═══════════════════════════════════════════════════════════

/**
 * Match query against region-tagged resources.
 * Only triggers when query contains a region keyword + resource type trigger,
 * or is a generic region trigger (区域精选/地区精选/本地试卷/地方试卷).
 */
export function matchRegionResources(
  query: string,
  ctx: SearchContext,
): RegionSearchResult {
  const q = query.trim()
  const emptyResult: RegionSearchResult = { matched: false, region: null, results: [], related: [] }

  if (!q) return emptyResult

  const detectedRegion = detectRegion(q)
  const isGeneric = isGenericRegionTrigger(q)

  // No region and not generic → no match
  if (!detectedRegion && !isGeneric) return emptyResult

  const region = detectedRegion || (ctx.region || '北京')
  const resourceType = detectResourceType(q)

  // If no resource type trigger and not generic → no match
  if (!resourceType && !isGeneric) return emptyResult

  const allPapers = getRegionPapers(ctx)

  // Score and filter papers
  const scored: RegionMatchResult[] = []
  for (const paper of allPapers) {
    const score = scoreRegionPaper(paper, region, resourceType, ctx.region)
    if (score > 0) {
      scored.push({
        region: paper.region,
        resourceType: paper.resourceType,
        item: regionPaperToItem(paper, ctx),
        score,
      })
    }
  }

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score)

  // Build related: platform resources that complement region results
  const related: ResourceItem[] = []
  if (scored.length > 0) {
    related.push({
      id: 'rel-region-sync',
      title: '同步试卷',
      type: 'unit_test',
      tags: ['同步', '试卷'],
      difficulty: 'basic',
      grade: ctx.grade || '七年级上',
      source: ctx.textbook || '人教版',
      isCurrentUnit: true,
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: true,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '与当前教材同步的试卷',
    })
    related.push({
      id: 'rel-region-mock',
      title: '模拟试卷',
      type: 'mock_exam',
      tags: ['模拟', '试卷'],
      difficulty: 'medium',
      grade: ctx.grade || '七年级上',
      source: '平台',
      isCurrentUnit: false,
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: true,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '模拟试卷资源',
    })
  }

  return {
    matched: scored.length > 0,
    region,
    results: scored.slice(0, 10),
    related,
  }
}

// ═══════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════

const RESOURCE_TYPE_LABEL: Record<RegionPaper['resourceType'], string> = {
  paper: '试卷',
  realExam: '真题',
  mockExam: '模拟',
  finalExam: '期末',
  midtermExam: '期中',
}

function regionPaperToItem(paper: RegionPaper, ctx: SearchContext): ResourceItem {
  return {
    id: paper.id,
    title: paper.title,
    type: 'regional_select',
    tags: ['区域精选', paper.region, RESOURCE_TYPE_LABEL[paper.resourceType]],
    difficulty: 'medium',
    grade: ctx.grade || '七年级上',
    source: `${paper.region}${RESOURCE_TYPE_LABEL[paper.resourceType]}`,
    isCurrentUnit: false,
    questionCount: 30,
    duration: '60分钟',
    canPreview: true,
    canAssign: true,
    canAddToPaperBasket: true,
    canAddToLessonPrep: false,
    isLessonPrepResource: false,
    recommendReason: `${paper.region}${RESOURCE_TYPE_LABEL[paper.resourceType]}资源`,
  }
}

// ═══════════════════════════════════════════════════════════
// Build EnhancedSearchResult from Region Matches
// ═══════════════════════════════════════════════════════════

function makeBaseResult(query: string): Pick<EnhancedSearchResult, 'isPrecisionJump' | 'aiUnderstandingText'> {
  return {
    isPrecisionJump: false,
    aiUnderstandingText: `小天识别到你在搜索区域资源「${query}」\n已为你匹配区域精选资源。`,
  }
}

function wrapMatchGroup(
  items: ResourceItem[],
  groupName: string,
  recText?: string,
): ResourceGroup {
  return {
    groupId: `grp-rg-${groupName.replace(/\s/g, '_').toLowerCase()}`,
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
    groupId: `grp-rg-rel-${groupName.replace(/\s/g, '_').toLowerCase()}`,
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
      recognizedIntent: '区域精选',
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
 * Build an EnhancedSearchResult from region match results.
 */
export function buildRegionMatchResult(
  query: string,
  _ctx: SearchContext,
  regionMatch: RegionSearchResult,
): EnhancedSearchResult {
  const smartMatchGroups: ResourceGroup[] = []
  const smartRelatedGroups: ResourceGroup[] = []

  if (regionMatch.results.length > 0) {
    const items = regionMatch.results.slice(0, 5).map((r) => r.item)
    smartMatchGroups.push(wrapMatchGroup(
      items,
      `区域精选 — ${regionMatch.region}`,
      `${regionMatch.region}地区的精选资源`,
    ))
  }

  if (regionMatch.related.length > 0) {
    smartRelatedGroups.push(wrapRelatedGroup(
      regionMatch.related,
      '相关推荐',
      '与区域精选相关的补充资源',
    ))
  }

  return {
    ...makeBaseResult(query),
    original: buildEmptyV1_0Result(query),
    smartMatchGroups,
    smartRelatedGroups,
  }
}

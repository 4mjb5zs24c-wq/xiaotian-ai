/**
 * AI Search V2 — Mock Search Scenarios (15 scenarios)
 *
 * Each scenario is a factory function that takes a query and context
 * and returns a NewSearchResult with appropriate mock data.
 */

import type {
  NewSearchResult,
  ResourceGroup,
  FilterTab,
  SearchIntentInfo,
  SearchContext,
} from '../types'
import {
  MOCK_RESOURCES,
  MOCK_VOCAB_UNIT_1,
  MOCK_VOCAB_UNIT_3,
  MOCK_TEXT_STRUCTURED,
  MOCK_TEXT_FLAT,
  MOCK_FUNCTION_ENTRIES,
  DEFAULT_QUICK_ENTRIES,
} from './data'

// ── Helpers ──────────────────────────────────────────────

function findResources(ids: string[]) {
  return ids.map((id) => MOCK_RESOURCES.find((r) => r.id === id)!).filter(Boolean)
}

/** Build context string from SearchContext */
function ctxStr(ctx: SearchContext): string {
  return `${ctx.textbook}｜${ctx.grade}｜${ctx.unit}｜${ctx.className}`
}

/** Extract unit number from context like "Unit 3 — Food and Drinks" → "Unit 3" */
function unitStr(ctx: SearchContext): string {
  const m = ctx.unit.match(/Unit\s*(\d+)/i)
  return m ? `Unit ${m[1]}` : '当前单元'
}

/** Get vocab data matching the current teaching unit */
function getVocabDataForUnit(unit: string) {
  const u = unitStr({ unit } as SearchContext)
  if (u === 'Unit 3') return MOCK_VOCAB_UNIT_3
  return MOCK_VOCAB_UNIT_1
}

/**
 * Parse paper query from query string to get province/year/examType.
 * Used inside paper scenarios to show correct context.
 */
function parsePaperFromQuery(query: string): { province?: string; year?: string; examType?: string } {
  const result: { province?: string; year?: string; examType?: string } = {}
  const provinceMap: Record<string, string> = {
    '山东省': '山东', '山东': '山东', '北京': '北京', '北京市': '北京',
    '上海': '上海', '上海市': '上海', '广东': '广东', '广东省': '广东',
    '江苏': '江苏', '江苏省': '江苏', '浙江': '浙江', '浙江省': '浙江',
    '福建': '福建', '福建省': '福建',
  }
  for (const [key, val] of Object.entries(provinceMap)) {
    if (query.includes(key)) { result.province = val; break }
  }
  const m = query.match(/(\d{4})\s*年?/) || query.match(/(\d{2})\s*年/)
  if (m) result.year = parseInt(m[1]) >= 1000 ? m[1] : String(2000 + parseInt(m[1]))
  if (/中考/.test(query)) result.examType = '中考'
  else if (/高考/.test(query)) result.examType = '高考'
  else if (/期中/.test(query)) result.examType = '期中'
  else if (/期末/.test(query)) result.examType = '期末'
  else if (/模拟/.test(query)) result.examType = '模拟'
  return result
}

const CTX_1_1: SearchContext = {
  textbook: '仁爱版',
  unit: 'Unit 1',
  grade: '七年级上',
  className: '初一 1 班',
  region: 'default',
  studentCount: 42,
}

// ═══════════════════════════════════════════════════════════
// S1: Unit 1 综合资源搜索
// ═══════════════════════════════════════════════════════════

export function scenarioUnit1Comprehensive(
  query: string,
  ctx: SearchContext = CTX_1_1,
): NewSearchResult {
  const u = unitStr(ctx)
  const primaryIds = [
    'res-sync-listening-1a', 'res-sync-listening-1b', 'res-sync-listening-1c',
    'res-speaking-practice-1', 'res-vocab-practice-1',
    'res-reading-practice-1',
  ]
  const recIds = [
    'res-unit-test-1', 'res-comprehensive-1', 'res-writing-practice-1',
    'res-grammar-practice-1', 'res-dubbing-1', 'res-sync-video-1',
  ]

  const intent: SearchIntentInfo = {
    query,
    recognizedIntent: `${u} 综合资源搜索`,
    searchType: 'resource',
    context: ctxStr(ctx),
    matchedTypes: ['sync_listening', 'speaking_practice', 'vocab_practice', 'reading_practice', 'comprehensive'],
    expandedTypes: ['sync_listening', 'speaking_practice', 'vocab_practice', 'reading_practice'],
    foldedTypes: ['comprehensive', 'writing_practice', 'grammar_practice', 'dubbing', 'sync_video', 'unit_test'],
    message: `已为你找到 ${u} 相关资源，包括同步听力、听说练习、词汇练习和阅读理解。精准匹配资源已默认展开，推荐资源已折叠。`,
  }

  const filterTabs: FilterTab[] = [
    { category: 'all', label: '全部', count: primaryIds.length + recIds.length },
    { category: 'sync_listening', label: '同步听力', count: 3 },
    { category: 'speaking_practice', label: '听说练习', count: 1 },
    { category: 'vocab_practice', label: '词汇练习', count: 1 },
    { category: 'reading_practice', label: '阅读练习', count: 1 },
    { category: 'comprehensive', label: '综合练习', count: 1 },
    { category: 'writing_practice', label: '写作练习', count: 1 },
    { category: 'unit_test', label: '单元检测', count: 1 },
  ]

  const groups: ResourceGroup[] = [
    {
      groupId: 'primary-unit',
      groupName: `精准匹配 — ${u} 同步资源`,
      groupType: 'resource',
      isPrimaryMatch: true,
      defaultExpanded: true,
      displayLimit: 5,
      recommendationText: `以下资源与当前教学进度 ${u} 精确匹配，可直接使用。`,
      matchCategory: 'sync_listening',
      items: findResources(primaryIds),
    },
    {
      groupId: 'rec-unit',
      groupName: `推荐资源 — ${u} 拓展`,
      groupType: 'resource',
      isPrimaryMatch: false,
      defaultExpanded: false,
      displayLimit: 3,
      recommendationText: `以下资源与 ${u} 话题相关，适合课堂补充或课后拓展使用。`,
      matchCategory: 'comprehensive',
      items: findResources(recIds),
    },
  ]

  return { intent, filterTabs, resourceGroups: groups, functionEntries: [], isNoResults: false, isUnrecognizable: false }
}

// ═══════════════════════════════════════════════════════════
// S2: 同步词汇搜索
// ═══════════════════════════════════════════════════════════

export function scenarioSyncVocab(
  query: string,
  ctx: SearchContext = CTX_1_1,
): NewSearchResult {
  const unitLabel = unitStr(ctx)
  const vocabData = getVocabDataForUnit(ctx.unit)
  const vocabResource = MOCK_RESOURCES.find((r) => r.id === 'res-vocab-practice-1')!

  const syncVocabItem = {
    ...vocabResource,
    id: `res-sync-vocab-${unitLabel.replace(' ', '-').toLowerCase()}`,
    title: `${unitLabel} 同步词汇`,
    type: 'sync_vocab' as const,
    tags: ['同步词汇', unitLabel],
    contentData: vocabData,
    canPreview: false,
    canAddToPaperBasket: false,
    recommendReason: undefined,
  }

  const intent: SearchIntentInfo = {
    query,
    recognizedIntent: '同步词汇搜索',
    searchType: 'resource',
    context: `${ctx.textbook}｜${ctx.grade}｜${unitLabel}｜${ctx.className}`,
    matchedTypes: ['sync_vocab'],
    expandedTypes: ['sync_vocab'],
    foldedTypes: [],
    message: `已为你找到 ${unitLabel} 同步词汇内容，可选择课标词、非课标词和语块后，布置听写、默写、跟读或选词类练习。`,
  }

  const filterTabs: FilterTab[] = [
    { category: 'all', label: '全部', count: 1 },
    { category: 'sync_vocab', label: '同步词汇', count: 1 },
  ]

  const groups: ResourceGroup[] = [
    {
      groupId: 'sync-vocab',
      groupName: `${unitLabel} 同步词汇`,
      groupType: 'sync_vocab',
      isPrimaryMatch: true,
      defaultExpanded: true,
      displayLimit: 1,
      recommendationText:
        `推荐理由：这是当前 ${unitLabel} 的同步词汇内容，可选择课标词、非课标词和语块后，布置听写、默写、跟读或选词类练习。`,
      items: [syncVocabItem],
    },
  ]

  return { intent, filterTabs, resourceGroups: groups, functionEntries: [], isNoResults: false, isUnrecognizable: false }
}

// ═══════════════════════════════════════════════════════════
// S3: 同步课文搜索 — Section 结构
// ═══════════════════════════════════════════════════════════

export function scenarioSyncTextStructured(
  query: string,
  ctx: SearchContext = CTX_1_1,
): NewSearchResult {
  const syncTextItem: typeof MOCK_RESOURCES[0] & { contentData: typeof MOCK_TEXT_STRUCTURED } = {
    id: 'res-sync-text-unit1',
    title: 'Unit 1 同步课文',
    type: 'sync_text',
    tags: ['同步课文', 'Unit 1'],
    duration: undefined,
    difficulty: 'basic',
    grade: '七年级上',
    isCurrentUnit: true,
    canPreview: false,
    canAssign: false,
    canAddToPaperBasket: false,
    canAddToLessonPrep: false,
    isLessonPrepResource: false,
    contentData: MOCK_TEXT_STRUCTURED,
  }

  const intent: SearchIntentInfo = {
    query,
    recognizedIntent: '同步课文搜索',
    searchType: 'resource',
    context: ctxStr(ctx),
    matchedTypes: ['sync_text'],
    expandedTypes: ['sync_text'],
    foldedTypes: [],
    message: '已为你找到 Unit 1 同步课文内容，可选择具体语篇后布置逐句跟读、整篇跟读或整篇背诵。',
  }

  const filterTabs: FilterTab[] = [
    { category: 'all', label: '全部', count: 1 },
    { category: 'sync_text', label: '同步课文', count: 1 },
  ]

  const groups: ResourceGroup[] = [
    {
      groupId: 'sync-text-structured',
      groupName: 'Unit 1 同步课文',
      groupType: 'sync_text',
      isPrimaryMatch: true,
      defaultExpanded: true,
      displayLimit: 1,
      recommendationText:
        '推荐理由：这是当前 Unit 1 的同步课文内容，可选择具体语篇后布置逐句跟读、整篇跟读或整篇背诵。',
      items: [syncTextItem as any],
    },
  ]

  return { intent, filterTabs, resourceGroups: groups, functionEntries: [], isNoResults: false, isUnrecognizable: false }
}

// ═══════════════════════════════════════════════════════════
// S4: 同步课文搜索 — Unit 直接内容结构
// ═══════════════════════════════════════════════════════════

export function scenarioSyncTextFlat(
  query: string,
  ctx: SearchContext = CTX_1_1,
): NewSearchResult {
  const syncTextItem = {
    id: 'res-sync-text-unit1-flat',
    title: 'Unit 1 同步课文',
    type: 'sync_text' as const,
    tags: ['同步课文', 'Unit 1'],
    difficulty: 'basic' as const,
    grade: '七年级上',
    isCurrentUnit: true,
    canPreview: false,
    canAssign: false,
    canAddToPaperBasket: false,
    canAddToLessonPrep: false,
    isLessonPrepResource: false,
    contentData: MOCK_TEXT_FLAT,
  }

  const intent: SearchIntentInfo = {
    query,
    recognizedIntent: '同步课文搜索',
    searchType: 'resource',
    context: ctxStr(ctx),
    matchedTypes: ['sync_text'],
    expandedTypes: ['sync_text'],
    foldedTypes: [],
    message: '已为你找到 Unit 1 同步课文内容，以 Topic 结构组织，可选择具体内容后布置跟读或背诵。',
  }

  return {
    intent,
    filterTabs: [{ category: 'all', label: '全部', count: 1 }, { category: 'sync_text', label: '同步课文', count: 1 }],
    resourceGroups: [{
      groupId: 'sync-text-flat',
      groupName: 'Unit 1 同步课文',
      groupType: 'sync_text',
      isPrimaryMatch: true,
      defaultExpanded: true,
      displayLimit: 1,
      recommendationText: '推荐理由：这是当前 Unit 1 的同步课文内容，可选择具体语篇后布置逐句跟读、整篇跟读或整篇背诵。',
      items: [syncTextItem as any],
    }],
    functionEntries: [],
    isNoResults: false,
    isUnrecognizable: false,
  }
}

// ═══════════════════════════════════════════════════════════
// S5: 听力搜索
// ═══════════════════════════════════════════════════════════

export function scenarioListeningSearch(
  query: string,
  ctx: SearchContext = CTX_1_1,
): NewSearchResult {
  const u = unitStr(ctx)
  const intent: SearchIntentInfo = {
    query,
    recognizedIntent: '听力资源搜索',
    searchType: 'resource',
    context: ctxStr(ctx),
    matchedTypes: ['sync_listening', 'listening_practice', 'speaking_practice', 'listening_mock'],
    expandedTypes: ['sync_listening', 'listening_practice'],
    foldedTypes: ['speaking_practice', 'listening_mock'],
    message: `已为你找到 ${u} 相关听力资源，包括同步听力、听力练习、听说练习和听力模拟题。精准匹配资源已默认展开，推荐资源已折叠。`,
  }

  const groups: ResourceGroup[] = [
    {
      groupId: 'listening-primary',
      groupName: `精准匹配 — ${u} 听力资源`,
      groupType: 'resource',
      isPrimaryMatch: true,
      defaultExpanded: true,
      displayLimit: 5,
      recommendationText: `以下听力资源与 ${u} 精确匹配。`,
      items: findResources([
        'res-sync-listening-1a', 'res-sync-listening-1b', 'res-sync-listening-1c',
        'res-listening-practice-1',
      ]),
    },
    {
      groupId: 'listening-rec',
      groupName: '推荐资源 — 更多听力素材',
      groupType: 'resource',
      isPrimaryMatch: false,
      defaultExpanded: false,
      displayLimit: 3,
      recommendationText: '以下为推荐听力资源，适合拓展训练。',
      items: findResources([
        'res-speaking-practice-1', 'res-listening-mock-1', 'res-listening-practice-2',
        'res-exam-sprint-1',
      ]),
    },
  ]

  const filterTabs: FilterTab[] = [
    { category: 'all', label: '全部', count: 8 },
    { category: 'sync_listening', label: '同步听力', count: 3 },
    { category: 'listening_practice', label: '听力练习', count: 2 },
    { category: 'speaking_practice', label: '听说练习', count: 1 },
    { category: 'listening_mock', label: '听力模拟', count: 1 },
    { category: 'exam_sprint', label: '考前冲刺', count: 1 },
  ]

  return { intent, filterTabs, resourceGroups: groups, functionEntries: [], isNoResults: false, isUnrecognizable: false }
}

// ═══════════════════════════════════════════════════════════
// S6: 当前地区无听说练习 — 替代推荐
// ═══════════════════════════════════════════════════════════

export function scenarioNoSpeakingInRegion(
  query: string,
  ctx: SearchContext = CTX_1_1,
): NewSearchResult {
  const intent: SearchIntentInfo = {
    query,
    recognizedIntent: '听说练习搜索',
    searchType: 'resource',
    context: ctxStr(ctx),
    matchedTypes: [],
    expandedTypes: [],
    foldedTypes: [],
    message: '当前地区暂无 Unit 1 听说练习，已为你推荐可替代资源。',
  }

  const groups: ResourceGroup[] = [
    {
      groupId: 'alt-current-unit',
      groupName: '当前单元可替代资源',
      groupType: 'alternative',
      isPrimaryMatch: true,
      defaultExpanded: true,
      displayLimit: 5,
      altLabel: '当前单元',
      recommendationText: 'Unit 1 相关的听力资源可作为听说训练的替代。',
      items: findResources(['res-sync-listening-1a', 'res-sync-listening-1b', 'res-listening-practice-1', 'res-speaking-practice-2']),
    },
    {
      groupId: 'alt-same-grade',
      groupName: '同年级推荐资源',
      groupType: 'alternative',
      isPrimaryMatch: false,
      defaultExpanded: false,
      displayLimit: 3,
      altLabel: '同年级推荐',
      recommendationText: '同年级的其他听说相关资源。',
      items: findResources(['res-special-speaking-1', 'res-regional-select-1', 'res-listening-practice-2']),
    },
    {
      groupId: 'alt-other',
      groupName: '非当前单元推荐资源',
      groupType: 'alternative',
      isPrimaryMatch: false,
      defaultExpanded: false,
      displayLimit: 3,
      altLabel: '非当前单元',
      recommendationText: '其他单元和通用听说训练资源。',
      items: findResources(['res-listening-mock-1', 'res-exam-sprint-1']),
    },
  ]

  return {
    intent,
    filterTabs: [{ category: 'all', label: '全部', count: 9 }],
    resourceGroups: groups,
    functionEntries: [],
    alternatives: [
      { label: '当前单元', items: findResources(['res-sync-listening-1a', 'res-sync-listening-1b', 'res-listening-practice-1', 'res-speaking-practice-2']) },
      { label: '同年级推荐', items: findResources(['res-special-speaking-1', 'res-regional-select-1', 'res-listening-practice-2']) },
      { label: '非当前单元', items: findResources(['res-listening-mock-1', 'res-exam-sprint-1']) },
    ],
    isNoResults: true,
    isUnrecognizable: false,
  }
}

// ═══════════════════════════════════════════════════════════
// S7: 同步练习搜索
// ═══════════════════════════════════════════════════════════

export function scenarioSyncPractice(
  query: string,
  ctx: SearchContext = CTX_1_1,
): NewSearchResult {
  const intent: SearchIntentInfo = {
    query,
    recognizedIntent: '同步练习搜索',
    searchType: 'resource',
    context: ctxStr(ctx),
    matchedTypes: ['vocab_practice', 'writing_practice', 'listening_practice', 'speaking_practice', 'comprehensive', 'unit_test', 'stage_test'],
    expandedTypes: ['vocab_practice', 'writing_practice', 'comprehensive'],
    foldedTypes: ['listening_practice', 'speaking_practice', 'unit_test', 'stage_test'],
    message: '已为你找到 Unit 1 同步练习资源，包括词汇练习、写作练习、听力练习、听说练习、综合练习和单元检测。',
  }

  const groups: ResourceGroup[] = [
    {
      groupId: 'sync-practice-primary',
      groupName: 'Unit 1 同步练习',
      groupType: 'resource',
      isPrimaryMatch: true,
      defaultExpanded: true,
      displayLimit: 5,
      items: findResources([
        'res-vocab-practice-1', 'res-writing-practice-1', 'res-reading-practice-1',
        'res-comprehensive-1', 'res-grammar-practice-1',
      ]),
    },
    {
      groupId: 'sync-practice-rec',
      groupName: '更多练习资源',
      groupType: 'resource',
      isPrimaryMatch: false,
      defaultExpanded: false,
      displayLimit: 3,
      items: findResources([
        'res-unit-test-1', 'res-stage-test-1', 'res-listening-practice-1',
        'res-speaking-practice-1',
      ]),
    },
  ]

  const filterTabs: FilterTab[] = [
    { category: 'all', label: '全部', count: 9 },
    { category: 'vocab_practice', label: '词汇练习', count: 1 },
    { category: 'writing_practice', label: '写作练习', count: 1 },
    { category: 'reading_practice', label: '阅读练习', count: 1 },
    { category: 'comprehensive', label: '综合练习', count: 1 },
    { category: 'grammar_practice', label: '语法专项', count: 1 },
    { category: 'unit_test', label: '单元检测', count: 1 },
    { category: 'stage_test', label: '阶段测试', count: 1 },
    { category: 'listening_practice', label: '听力练习', count: 1 },
    { category: 'speaking_practice', label: '听说练习', count: 1 },
  ]

  return { intent, filterTabs, resourceGroups: groups, functionEntries: [], isNoResults: false, isUnrecognizable: false }
}

// ═══════════════════════════════════════════════════════════
// S8: 专项搜索
// ═══════════════════════════════════════════════════════════

export function scenarioSpecialTopic(
  query: string,
  ctx: SearchContext = CTX_1_1,
): NewSearchResult {
  const intent: SearchIntentInfo = {
    query,
    recognizedIntent: '专项练习搜索',
    searchType: 'resource',
    context: ctxStr(ctx),
    matchedTypes: ['special', 'vocab_practice', 'grammar_practice', 'listening_practice', 'speaking_practice', 'writing_practice'],
    expandedTypes: ['special'],
    foldedTypes: ['vocab_practice', 'grammar_practice', 'listening_practice', 'speaking_practice', 'writing_practice'],
    message: '已为你找到七年级专项练习资源，包括词汇专项、语法专项、听力专项、听说专项和写作专项。',
  }

  const groups: ResourceGroup[] = [
    {
      groupId: 'special-primary',
      groupName: '七年级专项练习',
      groupType: 'resource',
      isPrimaryMatch: true,
      defaultExpanded: true,
      displayLimit: 5,
      items: findResources([
        'res-special-vocab-1', 'res-special-grammar-1', 'res-special-listening-1',
        'res-special-speaking-1', 'res-special-writing-1',
      ]),
    },
    {
      groupId: 'special-unit1',
      groupName: 'Unit 1 专项练习',
      groupType: 'resource',
      isPrimaryMatch: false,
      defaultExpanded: false,
      displayLimit: 3,
      items: findResources([
        'res-vocab-practice-1', 'res-grammar-practice-1', 'res-writing-practice-1',
      ]),
    },
  ]

  const filterTabs: FilterTab[] = [
    { category: 'all', label: '全部', count: 8 },
    { category: 'special', label: '专项', count: 5 },
    { category: 'vocab_practice', label: '词汇练习', count: 1 },
    { category: 'grammar_practice', label: '语法专项', count: 1 },
    { category: 'writing_practice', label: '写作练习', count: 1 },
  ]

  return { intent, filterTabs, resourceGroups: groups, functionEntries: [], isNoResults: false, isUnrecognizable: false }
}

// ═══════════════════════════════════════════════════════════
// S9: 模拟搜索
// ═══════════════════════════════════════════════════════════

export function scenarioMockExam(
  query: string,
  ctx: SearchContext = CTX_1_1,
): NewSearchResult {
  const intent: SearchIntentInfo = {
    query,
    recognizedIntent: '模拟题搜索',
    searchType: 'resource',
    context: ctxStr(ctx),
    matchedTypes: ['unit_test', 'stage_test', 'mock_exam', 'exam_sprint', 'regional_select'],
    expandedTypes: ['unit_test', 'stage_test'],
    foldedTypes: ['mock_exam', 'exam_sprint', 'regional_select'],
    message: '已为你找到模拟相关资源，包括单元检测、阶段测试、读写模拟、听说模拟、区域精选和考前冲刺。',
  }

  const groups: ResourceGroup[] = [
    {
      groupId: 'mock-primary',
      groupName: '检测与阶段测试',
      groupType: 'resource',
      isPrimaryMatch: true,
      defaultExpanded: true,
      displayLimit: 5,
      items: findResources([
        'res-unit-test-1', 'res-unit-test-2', 'res-stage-test-1',
      ]),
    },
    {
      groupId: 'mock-rec',
      groupName: '模拟题与冲刺',
      groupType: 'resource',
      isPrimaryMatch: false,
      defaultExpanded: false,
      displayLimit: 3,
      items: findResources([
        'res-mock-exam-1', 'res-mock-exam-2', 'res-exam-sprint-1',
        'res-mock-reading-writing-1',
      ]),
    },
  ]

  const filterTabs: FilterTab[] = [
    { category: 'all', label: '全部', count: 7 },
    { category: 'unit_test', label: '单元检测', count: 2 },
    { category: 'stage_test', label: '阶段测试', count: 1 },
    { category: 'mock_exam', label: '模拟题', count: 3 },
    { category: 'exam_sprint', label: '考前冲刺', count: 1 },
  ]

  return { intent, filterTabs, resourceGroups: groups, functionEntries: [], isNoResults: false, isUnrecognizable: false }
}

// ═══════════════════════════════════════════════════════════
// S10: 试卷精确匹配 — 山东2024中考真题
// ═══════════════════════════════════════════════════════════

export function scenarioPaperExactMatch(
  query: string,
  _ctx: SearchContext = CTX_1_1,
): NewSearchResult {
  const paper = parsePaperFromQuery(query)
  const province = paper.province || ''
  const year = paper.year || ''
  const examType = paper.examType || ''

  const intent: SearchIntentInfo = {
    query,
    recognizedIntent: '试卷名称搜索',
    searchType: 'paper_name',
    context: `${province}｜${examType}｜${year}年｜英语`,
    matchedTypes: ['real_exam'],
    expandedTypes: ['real_exam'],
    foldedTypes: ['mock_exam'],
    message: `已为你找到「${province} ${year} 年${examType}英语真题」。用户指定搜索优先于当前教学上下文。`,
  }

  const groups: ResourceGroup[] = [
    {
      groupId: 'paper-exact',
      groupName: '精确匹配',
      groupType: 'paper',
      isPrimaryMatch: true,
      defaultExpanded: true,
      displayLimit: 5,
      recommendationText: '标题、地区、年份、考试类型完全匹配。',
      items: findResources(['res-real-exam-sd-2024']),
    },
    {
      groupId: 'paper-near',
      groupName: '相近匹配',
      groupType: 'paper',
      isPrimaryMatch: false,
      defaultExpanded: false,
      displayLimit: 3,
      recommendationText: '同地区+同考试类型，年份相近（2023年）。',
      items: findResources(['res-real-exam-sd-2023']),
    },
    {
      groupId: 'paper-related',
      groupName: '相关推荐',
      groupType: 'paper',
      isPrimaryMatch: false,
      defaultExpanded: false,
      displayLimit: 3,
      recommendationText: '同关键词的模拟题和区域精选。',
      items: findResources(['res-mock-sd-2024']),
    },
  ]

  const filterTabs: FilterTab[] = [
    { category: 'all', label: '全部', count: 3 },
    { category: 'real_exam', label: '真题', count: 2 },
    { category: 'mock_exam', label: '模拟题', count: 1 },
  ]

  return { intent, filterTabs, resourceGroups: groups, functionEntries: [], isNoResults: false, isUnrecognizable: false }
}

// ═══════════════════════════════════════════════════════════
// S11: 试卷相近匹配（无精确匹配）
// ═══════════════════════════════════════════════════════════

export function scenarioPaperNearMatch(
  query: string,
  _ctx: SearchContext = CTX_1_1,
): NewSearchResult {
  const paper = parsePaperFromQuery(query)
  const province = paper.province || query
  const year = paper.year || ''
  const examType = paper.examType || ''

  const intent: SearchIntentInfo = {
    query,
    recognizedIntent: '试卷名称搜索',
    searchType: 'paper_name',
    context: `${province}｜${examType}｜${year}年｜英语`,
    matchedTypes: ['real_exam', 'mock_exam'],
    expandedTypes: ['real_exam'],
    foldedTypes: ['mock_exam'],
    message: `未找到「${province} ${year} 年${examType}英语真题」精确匹配，已为你推荐相近资源。搜索以用户输入为最高优先级，不受当前教学上下文限制。`,
  }

  const groups: ResourceGroup[] = [
    {
      groupId: 'paper-near-1',
      groupName: '相近匹配 — 同考试类型其他地区',
      groupType: 'paper',
      isPrimaryMatch: true,
      defaultExpanded: true,
      displayLimit: 5,
      recommendationText: '同年份+同考试类型（中考真题），地区不同：北京、山东。',
      items: findResources(['res-real-exam-bj-2024', 'res-real-exam-sd-2024']),
    },
    {
      groupId: 'paper-near-2',
      groupName: '相近匹配 — 同地区相近年份',
      groupType: 'paper',
      isPrimaryMatch: false,
      defaultExpanded: false,
      displayLimit: 3,
      recommendationText: '未找到广东省真题，推荐同考试类型的其他地区真题和模拟题。',
      items: findResources(['res-real-exam-sd-2023', 'res-mock-sd-2024']),
    },
    {
      groupId: 'paper-related',
      groupName: '相关推荐',
      groupType: 'paper',
      isPrimaryMatch: false,
      defaultExpanded: false,
      displayLimit: 3,
      recommendationText: '同关键词的中考模拟题和区域精选。',
      items: findResources(['res-real-exam-sd-2024']),
    },
  ]

  return { intent, filterTabs: [
    { category: 'all', label: '全部', count: 4 },
    { category: 'real_exam', label: '真题', count: 3 },
    { category: 'mock_exam', label: '模拟题', count: 1 },
  ], resourceGroups: groups, functionEntries: [], isNoResults: false, isUnrecognizable: false }
}

// ═══════════════════════════════════════════════════════════
// S12: 功能入口搜索
// ═══════════════════════════════════════════════════════════

export function scenarioFunctionEntry(
  query: string,
  ctx: SearchContext = CTX_1_1,
): NewSearchResult {
  // Determine which function entries to show based on query
  const q = query.toLowerCase()
  let matchedEntries = MOCK_FUNCTION_ENTRIES
  let intentMsg = ''
  let recognizedIntent = '功能入口搜索'

  // ═══════════════════════════════════════════════════════
  // 精确匹配：搜什么就只展示对应的功能入口
  // ═══════════════════════════════════════════════════════

  // ── 三方卡（必须在"答题卡"之前，因"第三方答题卡"也包含"答题卡"） ──
  if (q.includes('三方卡') || q.includes('第三方')) {
    matchedEntries = MOCK_FUNCTION_ENTRIES.filter((e) => e.id === 'func-third-party-card')
    intentMsg = '已为你找到第三方答题卡创建功能，支持兼容多种答题卡格式。'
    recognizedIntent = '第三方答题卡'
  }
  // ── 答题卡 ──
  else if (q.includes('制卡') || q.includes('答题卡') || q.includes('纸质练习') || q.includes('纸质答题卡')) {
    matchedEntries = MOCK_FUNCTION_ENTRIES.filter((e) => e.id === 'func-quick-card')
    intentMsg = '已为你找到答题卡制作功能，可快速创建纸质答题卡或练习答题卡。'
    recognizedIntent = '答题卡制作'
  }
  // ── 我的词表（仅搜"词表"，不含"导入"） ──
  else if ((q === '词表' || q === '我的词表' || q === '单词表' || q === '词汇表') && !q.includes('导入')) {
    matchedEntries = [
      MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-my-wordlist')!,
      MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-import-wordlist')!,
    ]
    intentMsg = '已为你找到词表相关功能。我的词表优先展示，导入词表作为相关功能推荐。'
    recognizedIntent = '词表管理'
  }
  // ── 导入词表 ──
  else if (q.includes('导入词表')) {
    matchedEntries = [
      MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-import-wordlist')!,
      MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-my-wordlist')!,
    ]
    intentMsg = '已为你找到词表导入功能，可导入自定义词表。'
    recognizedIntent = '导入词表'
  }
  // ── 词句听写 / 句子听写（必须在"听写"之前） ──
  else if (q.includes('词句听写') || q.includes('句子听写') || q.includes('词句') || (q.includes('句子') && q.includes('听写'))) {
    matchedEntries = [MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-word-sentence-dictation')!]
    intentMsg = '已为你找到词句听写功能，支持词汇和句子混合听写训练。'
    recognizedIntent = '词句听写'
  }
  // ── 词汇听写 / 词汇（单独搜"词汇"也展示词汇听写） ──
  else if (q.includes('词汇听写') || q === '词汇' || q.includes('词汇批改') || (q.includes('词汇') && q.includes('听写'))) {
    matchedEntries = [MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-vocab-dictation')!]
    intentMsg = '已为你找到词汇听写功能，基于自选词汇生成听写练习，支持自动批改。'
    recognizedIntent = '词汇听写'
  }
  // ── 听写（泛指） ──
  else if (q.includes('听写')) {
    matchedEntries = [
      MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-vocab-dictation')!,
      MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-word-sentence-dictation')!,
    ]
    intentMsg = '已为你找到听写相关功能。词汇听写在前，词句听写在後。'
    recognizedIntent = '听写功能'
  }
  // ── 应用文（单独搜） ──
  else if (q.includes('应用文')) {
    matchedEntries = [MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-practical-writing')!]
    intentMsg = '已为你找到应用文批改功能，可自定义应用文写作题目，AI 自动批改。'
    recognizedIntent = '应用文批改'
  }
  // ── 读后续写（单独搜） ──
  else if (q.includes('读后续写')) {
    matchedEntries = [MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-continuation-writing')!]
    intentMsg = '已为你找到读后续写功能，提供续写素材和 AI 批改。'
    recognizedIntent = '读后续写'
  }
  // ── 篇章默写（单独搜） ──
  else if (q.includes('篇章默写')) {
    matchedEntries = [MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-passage-dictation')!]
    intentMsg = '已为你找到篇章默写功能，支持篇章级默写练习，AI 自动比对。'
    recognizedIntent = '篇章默写'
  }
  // ── 句子（单独搜，没有听写相关词） ──
  else if (q === '句子' || q.includes('句子')) {
    matchedEntries = [MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-word-sentence-dictation')!]
    intentMsg = '已为你找到词句听写功能，支持包含句子的混合听写训练。'
    recognizedIntent = '词句听写'
  }
  // ── 自定义（泛搜） ──
  else if (q.includes('自定义')) {
    matchedEntries = [
      MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-vocab-dictation')!,
      MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-word-sentence-dictation')!,
      MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-practical-writing')!,
      MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-continuation-writing')!,
      MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-passage-dictation')!,
    ]
    intentMsg = '已为你找到自定义批改相关功能，包括词汇听写、词句听写、应用文批改、读后续写批改和篇章默写批改。'
    recognizedIntent = '自定义批改'
  }
  // ── 批改（泛搜） ──
  else if (q.includes('批改')) {
    matchedEntries = MOCK_FUNCTION_ENTRIES.filter((e) =>
      e.category === '听写批改' || e.category === '写作批改' || e.category === '默写批改',
    )
    intentMsg = '已为你找到批改相关功能，包括听写批改、应用文批改、读后续写批改和篇章默写批改。'
    recognizedIntent = '批改功能'
  }
  // ── 导入试卷 ──
  else if (q.includes('导入试卷') || q.includes('导入考卷') || q.includes('导入试题')) {
    matchedEntries = MOCK_FUNCTION_ENTRIES.filter((e) => e.id === 'func-import-paper')
    intentMsg = '已为你找到试卷导入功能，可从文件导入已有试卷。'
    recognizedIntent = '导入试卷'
  }

  const intent: SearchIntentInfo = {
    query,
    recognizedIntent,
    searchType: 'function_entry',
    context: ctxStr(ctx),
    matchedTypes: ['function'],
    expandedTypes: ['function'],
    foldedTypes: [],
    message: intentMsg,
  }

  return {
    intent,
    filterTabs: [{ category: 'all', label: '全部', count: matchedEntries.length }, { category: 'function', label: '功能入口', count: matchedEntries.length }],
    resourceGroups: [],
    functionEntries: matchedEntries,
    isNoResults: false,
    isUnrecognizable: false,
  }
}

// ═══════════════════════════════════════════════════════════
// S13: 无结果 + 替代推荐
// ═══════════════════════════════════════════════════════════

export function scenarioNoResultsWithAlternatives(
  query: string,
  ctx: SearchContext = CTX_1_1,
): NewSearchResult {
  const intent: SearchIntentInfo = {
    query,
    recognizedIntent: '资源搜索',
    searchType: 'resource',
    context: ctxStr(ctx),
    matchedTypes: [],
    expandedTypes: [],
    foldedTypes: [],
    message: '未找到与「' + query + '」精确匹配的资源，已为你推荐可替代资源。',
  }

  const alternatives = [
    {
      label: '当前单元' as const,
      items: findResources(['res-comprehensive-1', 'res-vocab-practice-1', 'res-reading-practice-1']),
    },
    {
      label: '同年级推荐' as const,
      items: findResources(['res-stage-test-1', 'res-special-vocab-1', 'res-listening-practice-2']),
    },
    {
      label: '非当前单元' as const,
      items: findResources(['res-unit-test-2', 'res-mock-exam-1', 'res-special-grammar-1']),
    },
  ]

  return {
    intent,
    filterTabs: [{ category: 'all', label: '全部', count: 9 }],
    resourceGroups: [
      {
        groupId: 'alt-current-unit',
        groupName: '当前单元可替代资源',
        groupType: 'alternative',
        isPrimaryMatch: true,
        defaultExpanded: true,
        displayLimit: 5,
        altLabel: '当前单元',
        recommendationText: '当前单元相关的综合练习和专项训练。',
        items: alternatives[0].items,
      },
      {
        groupId: 'alt-same-grade',
        groupName: '同年级推荐资源',
        groupType: 'alternative',
        isPrimaryMatch: false,
        defaultExpanded: false,
        displayLimit: 3,
        altLabel: '同年级推荐',
        items: alternatives[1].items,
      },
      {
        groupId: 'alt-other',
        groupName: '非当前单元推荐资源',
        groupType: 'alternative',
        isPrimaryMatch: false,
        defaultExpanded: false,
        displayLimit: 3,
        altLabel: '非当前单元',
        items: alternatives[2].items,
      },
    ],
    functionEntries: [],
    alternatives,
    isNoResults: true,
    isUnrecognizable: false,
  }
}

// ═══════════════════════════════════════════════════════════
// S14: 完全无法识别 — 3 快捷入口
// ═══════════════════════════════════════════════════════════

export function scenarioCompletelyUnrecognizable(
  query: string,
  ctx: SearchContext = CTX_1_1,
): NewSearchResult {
  const intent: SearchIntentInfo = {
    query,
    recognizedIntent: '无法识别',
    searchType: 'unknown',
    context: ctxStr(ctx),
    matchedTypes: [],
    expandedTypes: [],
    foldedTypes: [],
    message: '小天暂时无法理解你的搜索内容，请尝试以下快捷入口或换一种方式描述。',
  }

  return {
    intent,
    filterTabs: [],
    resourceGroups: [],
    functionEntries: [],
    quickEntries: DEFAULT_QUICK_ENTRIES,
    isNoResults: true,
    isUnrecognizable: true,
  }
}

// ═══════════════════════════════════════════════════════════
// S15: 词表搜索（我的词表优先）
// ═══════════════════════════════════════════════════════════

export function scenarioWordlistSearch(
  query: string,
  ctx: SearchContext = CTX_1_1,
): NewSearchResult {
  const myWordlist = MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-my-wordlist')!
  const importWordlist = MOCK_FUNCTION_ENTRIES.find((e) => e.id === 'func-import-wordlist')!

  const intent: SearchIntentInfo = {
    query,
    recognizedIntent: '词表管理',
    searchType: 'function_entry',
    context: ctxStr(ctx),
    matchedTypes: ['function'],
    expandedTypes: ['function'],
    foldedTypes: [],
    message: '已为你找到词表相关功能。我的词表优先展示，导入词表作为相关功能推荐。',
  }

  return {
    intent,
    filterTabs: [
      { category: 'all', label: '全部', count: 2 },
      { category: 'function', label: '功能入口', count: 2 },
    ],
    resourceGroups: [],
    functionEntries: [myWordlist, importWordlist],
    isNoResults: false,
    isUnrecognizable: false,
  }
}

// ═══════════════════════════════════════════════════════════
// Scenario Map
// ═══════════════════════════════════════════════════════════

export type ScenarioName =
  | 'unit1_comprehensive'
  | 'sync_vocab'
  | 'sync_text_structured'
  | 'sync_text_flat'
  | 'listening'
  | 'no_speaking_region'
  | 'sync_practice'
  | 'special_topic'
  | 'mock_exam'
  | 'paper_exact'
  | 'paper_near'
  | 'function_entry'
  | 'no_results_alternatives'
  | 'unrecognizable'
  | 'wordlist'

export const SCENARIO_MAP: Record<ScenarioName, (query: string, ctx?: SearchContext) => NewSearchResult> = {
  unit1_comprehensive: scenarioUnit1Comprehensive,
  sync_vocab: scenarioSyncVocab,
  sync_text_structured: scenarioSyncTextStructured,
  sync_text_flat: scenarioSyncTextFlat,
  listening: scenarioListeningSearch,
  no_speaking_region: scenarioNoSpeakingInRegion,
  sync_practice: scenarioSyncPractice,
  special_topic: scenarioSpecialTopic,
  mock_exam: scenarioMockExam,
  paper_exact: scenarioPaperExactMatch,
  paper_near: scenarioPaperNearMatch,
  function_entry: scenarioFunctionEntry,
  no_results_alternatives: scenarioNoResultsWithAlternatives,
  unrecognizable: scenarioCompletelyUnrecognizable,
  wordlist: scenarioWordlistSearch,
}

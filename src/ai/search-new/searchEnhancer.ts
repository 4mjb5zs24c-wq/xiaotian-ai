/**
 * AI Search V1.1 — Search Enhancer
 *
 * Enhancement layer on top of the v1.0 search engine.
 * Does NOT modify v1.0 matching rules — only enhances the output:
 *
 *   1. Precision jump detection (report / wrong-question / lesson-prep / vocab-insight)
 *   2. Semantic meaningfulness check (catches noise like "哈哈哈哈")
 *   3. Dual-group mapping + group name normalization
 *   4. AI understanding text generation
 *   5. AI understanding text for unrecognized (different wording)
 *   6. Unrecognized fallback enhancement (suggestions + common functions)
 *   7. AI thinking loading step generation
 */

import type {
  NewSearchResult,
  ResourceGroup,
  PrecisionJumpData,
  PrecisionJumpIntent,
  SearchSuggestion,
  CommonFunction,
  EnhancedSearchResult,
  LoadingStep,
} from './types'

// ═══════════════════════════════════════════════════════════
// Shared intent patterns (used by multiple modules)
// ═══════════════════════════════════════════════════════════

/** All known meaningful intent patterns. A query not matching ANY of these is effectively noise. */
const KNOWN_INTENT_PATTERNS: Array<{ regex: RegExp; label: string }> = [
  // Precision jump patterns
  { regex: /报告|练习报告|学情|完成率|未完成|班级报告|最近报告|提交情况|平均分/, label: '报告' },
  { regex: /错题|错题本|错题统计|错题练习|错题记录|学生错题|班级错题/, label: '错题' },
  { regex: /备课|我的备课|备课资源|加入备课|课堂备课|课前准备|备课夹|备课内容/, label: '备课' },
  { regex: /错词|错词复习|词汇薄弱|易错词|不会的词|单词错误|词汇掌握差|错音|读不准/, label: '错词' },
  // Resource / function intent patterns
  { regex: /答题卡|答题纸|作答卡|作答纸|纸质作答|制卡|三方卡|扫卡|批卡/, label: '答题卡' },
  { regex: /词表|我的词表|生词表|词汇表|词单/, label: '词表' },
  { regex: /听写|默写|听默|默单词|默词|默一下|默课文/, label: '听写与默写' },
  { regex: /词汇|单词|生词|课标词|背单词|记单词|练单词/, label: '词汇' },
  { regex: /作文|写作|应用文|读后续写|续写|书面表达/, label: '写作' },
  { regex: /练习|作业|布置|发作业|同步练习|单元练习|课后|课堂练习|课后巩固/, label: '练习' },
  { regex: /听力模拟|听力模考|听力测试|听力测评|听力考试/, label: '听力模拟' },
  { regex: /听力|听力资源|听力练习|听力训练|听力素材|听力题/, label: '听力' },
  { regex: /听说|口语听说|听说模拟|听说测评/, label: '听说' },
  { regex: /真题|历年真题|中考真题|高考真题|真题卷|真题库|区域真题/, label: '真题' },
  { regex: /模拟|模拟题|模拟卷|模考|冲刺|阶段测试|摸底考试/, label: '模拟' },
  { regex: /套题|套卷|整套|成套/, label: '套题' },
  { regex: /试卷|卷子|测试卷|检测卷|期中卷|期末卷|阶段卷|我的试卷/, label: '试卷' },
  { regex: /课文|跟读|背诵|朗读|Section/, label: '课文' },
  { regex: /同步视频|单元视频|视频资源|课堂视频|教学视频|课本视频|讲解视频/, label: '视频' },
  { regex: /主题视频|话题视频|拓展视频|文化视频|主题资源|话题资源|文化拓展|拓展资源/, label: '主题视频' },
  { regex: /配音|趣味配音|英语配音|视频配音|口语配音|动画配音/, label: '配音' },
  { regex: /语法|完形填空|选词填空|短文填空|语法填空|单句语法|时态|从句|非谓语/, label: '语法' },
  { regex: /阅读|阅读理解|阅读训练|七选五|任务型阅读|英语阅读/, label: '阅读' },
  { regex: /专项|专门|专业|专练|专训|专题|微技能|技能训练|技巧/, label: '专项' },
  { regex: /组卷|选题|挑题/, label: '选题组卷' },
  { regex: /自定义|批改|自建/, label: '自定义练习' },
  // v1.0 known triggers
  { regex: /同步词汇|同步课文|同步练习|同步训练/, label: '同步' },
  { regex: /人教版|部编版|外研版|牛津版/, label: '教材' },
  { regex: /Unit\s*\d+|第\s*\d+\s*单元/, label: '单元' },
  { regex: /山东|北京|上海|广东|江苏|浙江|福建|四川|湖北|湖南|云南/, label: '试卷' },
  { regex: /中考|高考|期中|期末/, label: '考试' },
  { regex: /有没有|帮我找|有什么|找.*资源|找.*练习|看看|搜索/, label: '搜索' },
  // Single English word
  { regex: /^[a-zA-Z]{2,}$/, label: '词汇' },
]

// ═══════════════════════════════════════════════════════════
// 1. Precision Jump Detection
// ═══════════════════════════════════════════════════════════

interface PrecisionJumpRule {
  intent: PrecisionJumpIntent
  patterns: RegExp[]
  title: string
  description: string
  buttonText: string
  route: string | null
  routeConfirmed: boolean
}

const PRECISION_JUMP_RULES: PrecisionJumpRule[] = [
  {
    intent: 'report',
    patterns: [
      /报告/,
      /练习报告/,
      /学情/,
      /完成率/,
      /未完成/,
      /错题分析/,
      /班级报告/,
      /最近报告/,
      /提交情况/,
      /平均分/,
    ],
    title: '报告 / 学情',
    description:
      '练习报告、完成情况和学情分析目前仍在报告列表中查看。\n你可以前往报告列表，按练习名称、班级、时间等条件查找对应报告。',
    buttonText: '去报告列表',
    route: '/practice-reports',
    routeConfirmed: true,
  },
  {
    intent: 'wrong_question',
    patterns: [
      /错题/,
      /错题本/,
      /错题统计/,
      /错题练习/,
      /错题记录/,
      /学生错题/,
      /班级错题/,
    ],
    title: '错题 / 错题本',
    description:
      '错题统计和错题明细目前仍在错题本中查看。\n你可前往错题本，按班级、题型、知识点查看错题分布。',
    buttonText: '去错题本',
    route: '/wrong-questions',
    routeConfirmed: true,
  },
  {
    intent: 'lesson_prep',
    patterns: [
      /备课/,
      /我的备课/,
      /备课资源/,
      /加入备课/,
      /课堂备课/,
      /课前准备/,
      /备课夹/,
      /备课内容/,
    ],
    title: '备课',
    description:
      '备课资源和备课夹目前仍在"我的备课"中查看和管理。\n你可前往我的备课，查看已加入备课的资源。',
    buttonText: '去我的备课',
    route: null,
    routeConfirmed: false,
  },
  {
    intent: 'vocab_insight',
    patterns: [
      /错词/,
      /错词复习/,
      /词汇薄弱/,
      /易错词/,
      /不会的词/,
      /单词错误/,
      /词汇掌握差/,
      /错音/,
      /读不准/,
    ],
    title: '错词 / 词汇薄弱',
    description:
      '已为你推荐词汇洞察，可查看班级错词情况、薄弱词汇和复习建议。',
    buttonText: '查看词汇洞察',
    route: '/vocabulary-insight',
    routeConfirmed: true,
  },
]

export function detectPrecisionJump(query: string): PrecisionJumpData | null {
  const q = query.trim()
  if (!q) return null

  for (const rule of PRECISION_JUMP_RULES) {
    for (const pattern of rule.patterns) {
      if (pattern.test(q)) {
        return {
          intent: rule.intent,
          title: rule.title,
          description: rule.description,
          buttonText: rule.buttonText,
          route: rule.route,
          routeConfirmed: rule.routeConfirmed,
        }
      }
    }
  }

  return null
}

// ═══════════════════════════════════════════════════════════
// 2. Semantic Meaningfulness Check
// ═══════════════════════════════════════════════════════════

/**
 * Check if a query is semantically meaningful.
 * A query like "哈哈哈哈" doesn't match any known pattern → effectively unrecognizable,
 * even if v1.0's Priority 7 returns "comprehensive" resources for it.
 */
export function isSemanticallyMeaningful(query: string): boolean {
  const q = query.trim()
  if (!q) return false

  for (const { regex } of KNOWN_INTENT_PATTERNS) {
    if (regex.test(q)) return true
  }

  return false
}

// ═══════════════════════════════════════════════════════════
// 3. Dual-Group Mapping + Group Name Normalization
// ═══════════════════════════════════════════════════════════

/**
 * Normalize a v1.0 group name to v1.1 style.
 * Strips "精准匹配 —", "推荐资源 —", "替代推荐" etc.
 * and replaces with natural resource type names.
 */
function normalizeGroupName(name: string): string {
  // Remove "精准匹配 — " prefix
  if (name.startsWith('精准匹配 — ')) return name.slice(7)
  if (name.startsWith('精准匹配—')) return name.slice(6)

  // Remove "推荐资源 — " prefix
  if (name.startsWith('推荐资源 — ')) return name.slice(7)
  if (name.startsWith('推荐资源—')) return name.slice(6)

  // Standalone generic names → friendlier
  if (name === '推荐资源') return '更多资源'
  if (name === '精确匹配') return '匹配资源'
  if (name === '相近匹配') return name
  if (name === '相近匹配 — ') return name.slice(7)
  if (name.startsWith('相近匹配 — ')) return name.slice(7)
  if (name.startsWith('相近匹配—')) return name.slice(6)
  if (name === '相关推荐') return '更多资源'
  if (name === '替代推荐') return '更多资源'

  // "推荐资源 — 模拟卷及冲刺" → "模拟卷及冲刺"
  // Already handled by "推荐资源 — " prefix above

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

    // Also clean recommendationText if it contains matched-degree language
    let recText = group.recommendationText
    if (recText) {
      recText = recText
        .replace(/精准匹配|精确匹配/g, '匹配')
        .replace(/推荐资源|推荐/g, '匹配')
    }

    const cleanedGroup = {
      ...group,
      groupName: normalizedName,
      recommendationText: recText,
    }

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
// 4. AI Understanding Text (for recognized queries)
// ═══════════════════════════════════════════════════════════

export function generateAIUnderstandingText(query: string): string {
  const intentLabel = deriveIntentLabel(query)

  return `小天理解你可能想找「${intentLabel}」\n已为你整理智能匹配结果，并补充相关资源。`
}

function deriveIntentLabel(query: string): string {
  const q = query.trim()

  // Priority-ordered (more specific first)
  const patterns: Array<{ regex: RegExp; label: string }> = [
    { regex: /答题卡|答题纸|制卡|纸质作答|三方卡/, label: '答题卡' },
    { regex: /词表|我的词表|生词表|词汇表/, label: '词表' },
    { regex: /听写|默写/, label: '听写与默写' },
    { regex: /词汇|单词|生词|课标词/, label: '词汇' },
    { regex: /作文|写作|应用文|读后续写|续写/, label: '写作' },
    { regex: /听力模拟|听力模考/, label: '听力模拟' },
    { regex: /听力/, label: '听力' },
    { regex: /听说/, label: '听说' },
    { regex: /真题/, label: '真题资源' },
    { regex: /套题|套卷/, label: '套题' },
    { regex: /模拟|模考|冲刺/, label: '模拟' },
    { regex: /练习|作业|布置|同步练习|单元练习|课后/, label: '练习' },
    { regex: /试卷|卷子|测试卷|期中|期末/, label: '试卷' },
    { regex: /课文|跟读|背诵|朗读|Section/, label: '课文' },
    { regex: /视频/, label: '视频' },
    { regex: /配音/, label: '配音' },
    { regex: /语法|完形|填空|时态|从句/, label: '语法' },
    { regex: /阅读/, label: '阅读' },
    { regex: /专项|专门|专业/, label: '专项' },
    { regex: /微技能|技能训练|技巧/, label: '微技能' },
    { regex: /组卷|选题/, label: '选题组卷' },
    { regex: /自定义|批改/, label: '自定义练习' },
  ]

  for (const { regex, label } of patterns) {
    if (regex.test(q)) return label
  }

  return q.length > 10 ? q.slice(0, 10) + '…' : q
}

// ═══════════════════════════════════════════════════════════
// 5. Enhanced Search Result Builder
// ═══════════════════════════════════════════════════════════

export function enhanceSearchResult(
  query: string,
  result: NewSearchResult,
): EnhancedSearchResult {
  const { smartMatchGroups, smartRelatedGroups } = mapToDualGroups(
    result.resourceGroups,
  )

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
// 7. Unrecognized Fallback
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
// 8. AI Loading Steps
// ═══════════════════════════════════════════════════════════

export function generateLoadingSteps(query: string): LoadingStep[] {
  const q = query.trim()
  const intentLabel = identifyQueryIntent(q)

  if (intentLabel) {
    return [
      { text: `小天正在理解「${intentLabel}」的相关场景...`, duration: 500 },
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

function identifyQueryIntent(query: string): string | null {
  const patterns: Array<{ regex: RegExp; label: string }> = [
    { regex: /答题卡|答题纸|制卡|纸质作答/, label: '答题卡' },
    { regex: /词表|词汇|单词|听写|默写|生词/, label: '词汇与听写' },
    { regex: /作文|写作|应用文|读后续写|续写/, label: '写作' },
    { regex: /听力|听说|听力模拟/, label: '听力' },
    { regex: /试卷|卷子|真题|模拟|套题|组卷/, label: '试卷' },
    { regex: /练习|作业|布置|同步练习|单元练习/, label: '练习' },
    { regex: /课文|跟读|背诵|朗读/, label: '课文' },
    { regex: /视频|配音|主题视频/, label: '视频与配音' },
    { regex: /语法|完形|填空|阅读/, label: '语法与阅读' },
    { regex: /专项|微技能/, label: '专项' },
    { regex: /报告|学情|错题|备课/, label: '教学管理' },
    { regex: /自定义|批改/, label: '自定义练习' },
  ]

  for (const { regex, label } of patterns) {
    if (regex.test(query)) return label
  }

  return null
}

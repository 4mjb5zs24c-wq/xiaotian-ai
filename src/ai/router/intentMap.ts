/**
 * Unified Intent Map —— 小天AI 意图路由核心
 *
 * 所有入口 → intent → workflow 的映射集中管理于此。
 *
 * 优先级规则：
 *   1. 关键词显式匹配（最高优先级），按 priority 升序排列
 *   2. source 来源增强 —— 相同关键词在不同页面有不同默认意图
 *   3. 教材/单元上下文仅作为范围，不作为任务类型
 *   4. 无法判断时返回 ambiguous，不默认词汇听写
 */

// ── Types ──────────────────────────────────────────────

export type IntentId =
  | 'vocab_dictation'
  | 'reading_practice'
  | 'listening_speaking'
  | 'writing_analysis'
  | 'learning_report_analysis'
  | 'wrong_word_analysis'
  | 'wrong_question_analysis'
  | 'resource_search'
  | 'unit_paper'
  | 'card_creation'
  | 'assignment'
  | 'ambiguous'

export type EntrySource =
  | 'search_input'
  | 'quick_action'
  | 'insight_card'
  | 'report_card'
  | 'wrong_word_page'
  | 'wrong_question_page'
  | 'writing_page'
  | 'listening_page'
  | 'resource_card'
  | 'practice_module'
  | 'homepage_quick_action'
  | 'ai_search_quick_action'
  | 'ai_search_suggestion'
  | 'ai_search_recent'
  | 'homepage_input'
  | 'insight_action'
  | 'drawer_action'
  | 'unknown'

export interface IntentRule {
  intentId: IntentId
  workflowId: string
  label: string
  /** Regex tested against the query string */
  keywords: RegExp
  /** Lower = higher priority. Ties broken by source affinity. */
  priority: number
  /** Sources that boost this rule when the query is vague */
  sourceBoost?: EntrySource[]
}

export interface IntentMatchResult {
  intentId: IntentId
  workflowId: string
  label: string
  confidence: 'high' | 'medium' | 'low'
  matchedKeyword: string | null
  source: EntrySource
}

// ── Intent Rules (priority order, 1 = highest) ─────────

const RULES: IntentRule[] = [
  // ═══════ priority 1: 布置/发布 — highest ═══════
  {
    intentId: 'assignment',
    workflowId: 'assignment',
    label: '布置作业',
    keywords: /布置|发布作业|发给学生|下发作业|布置给/,
    priority: 1,
  },

  // ═══════ priority 2: 作文/写作/批改 ═══════
  {
    intentId: 'writing_analysis',
    workflowId: 'writing-analysis',
    label: '写作分析',
    keywords: /作文|写作批改|批作文|改作文|范文评析|作文问题|写作问题|作文批改/,
    priority: 2,
    sourceBoost: ['writing_page'],
  },

  // ═══════ priority 3: 组卷/试卷 ═══════
  {
    intentId: 'unit_paper',
    workflowId: 'unit-paper-generate',
    label: '智能组卷',
    keywords: /组卷|出卷|单元卷|测验卷|模拟卷|冲刺卷|周测|月考试卷/,
    priority: 3,
  },

  // ═══════ priority 4: 制卡/答题卡 ═══════
  {
    intentId: 'card_creation',
    workflowId: 'card-creation',
    label: '快速制卡',
    keywords: /制卡|答题卡|练习卡|纸质作答|快速制卡/,
    priority: 4,
  },

  // ═══════ priority 5: 听力/听说 ═══════
  {
    intentId: 'listening_speaking',
    workflowId: 'listening-recommend',
    label: '听力/听说',
    keywords: /听力|听说训练|口语训练|跟读|配音|听后续写|听说模拟|人机对话|模仿朗读|故事复述/,
    priority: 5,
    sourceBoost: ['listening_page'],
  },

  // ═══════ priority 6: 阅读/完形/七选五 ═══════
  {
    intentId: 'reading_practice',
    workflowId: 'reading-practice',
    label: '阅读理解',
    keywords: /阅读理解|阅读训练|完形填空|七选五|时文阅读|来一篇阅读|阅读练习|阅读题|主旨题|推断题/,
    priority: 6,
  },

  // ═══════ priority 7: 听写/默写（明确听写任务） ═══════
  {
    intentId: 'vocab_dictation',
    workflowId: 'vocab-dictation',
    label: '词汇默写',
    keywords: /听写|默写|词汇听写|单词默写|生成听写|拼写练习|听音拼写/,
    priority: 7,
  },

  // ═══════ priority 8: 练习/学情分析 ═══════
  {
    intentId: 'learning_report_analysis',
    workflowId: 'learning-report-analysis',
    label: '学情分析',
    keywords: /练习情况|学情|学习情况|完成率|正确率|成绩波动|优秀率|合格率|近两周练习|练习报告/,
    priority: 8,
    sourceBoost: ['report_card'],
  },

  // ═══════ priority 9: 错词分析 ═══════
  {
    intentId: 'wrong_word_analysis',
    workflowId: 'wrong-word-analysis',
    label: '错词分析',
    keywords: /错词率|词汇错误|拼写错误|不会读|不会用|错词问题|高频错词/,
    priority: 9,
    sourceBoost: ['wrong_word_page'],
  },

  // ═══════ priority 10: 错题分析 ═══════
  {
    intentId: 'wrong_question_analysis',
    workflowId: 'wrong-question-analysis',
    label: '错题分析',
    keywords: /错题|知识点薄弱|阅读错题|语法错题|薄弱点分析|错题集中/,
    priority: 10,
    sourceBoost: ['wrong_question_page'],
  },

  // ═══════ priority 11: 资源搜索 ═══════
  {
    intentId: 'resource_search',
    workflowId: '',
    label: '资源搜索',
    keywords: /同步资源|查资源|课文资源|教材资源|同步练习|资源推荐/,
    priority: 11,
    sourceBoost: ['resource_card'],
  },

  // ═══════ priority 12: 泛词汇（最宽，放最后） ═══════
  {
    intentId: 'vocab_dictation',
    workflowId: 'vocab-dictation',
    label: '词汇默写',
    keywords: /单词|词汇(?!PK|竞赛|错误|问题|表)/,
    priority: 12,
  },
]

// ── Source → default intent when query is vague ────────

const SOURCE_DEFAULTS: Record<EntrySource, IntentId> = {
  quick_action: 'ambiguous',
  insight_card: 'ambiguous',
  report_card: 'learning_report_analysis',
  wrong_word_page: 'wrong_word_analysis',
  wrong_question_page: 'wrong_question_analysis',
  writing_page: 'writing_analysis',
  listening_page: 'listening_speaking',
  resource_card: 'resource_search',
  practice_module: 'ambiguous',
  search_input: 'ambiguous',
  homepage_quick_action: 'ambiguous',
  ai_search_quick_action: 'ambiguous',
  ai_search_suggestion: 'ambiguous',
  ai_search_recent: 'ambiguous',
  homepage_input: 'ambiguous',
  insight_action: 'ambiguous',
  drawer_action: 'ambiguous',
  unknown: 'ambiguous',
}

// ── Public API ─────────────────────────────────────────

/**
 * Match a query + source to the best intent.
 *
 * @param query  - The teacher's natural language query
 * @param source - Where the query came from (affects defaults)
 */
export function matchIntent(query: string, source: EntrySource = 'unknown'): IntentMatchResult {
  const q = query.trim()
  if (!q) {
    return { intentId: 'ambiguous', workflowId: '', label: '无法判断', confidence: 'low', matchedKeyword: null, source }
  }

  // Phase 1: Try explicit keyword match (highest priority first)
  for (const rule of RULES) {
    const match = q.match(rule.keywords)
    if (match) {
      // Determine confidence
      let confidence: 'high' | 'medium' | 'low' = 'high'
      // If the match came from a broad rule (priority >= 12), lower confidence
      if (rule.priority >= 12) confidence = 'medium'
      // If source matches the rule's source affinity, keep high confidence
      if (rule.sourceBoost?.includes(source)) confidence = 'high'

      return {
        intentId: rule.intentId,
        workflowId: rule.workflowId,
        label: rule.label,
        confidence,
        matchedKeyword: match[0],
        source,
      }
    }
  }

  // Phase 2: No keyword match — use source-based default
  const defaultIntent = SOURCE_DEFAULTS[source]
  if (defaultIntent !== 'ambiguous') {
    const rule = RULES.find((r) => r.intentId === defaultIntent)
    if (rule) {
      return {
        intentId: rule.intentId,
        workflowId: rule.workflowId,
        label: rule.label,
        confidence: 'low',
        matchedKeyword: null,
        source,
      }
    }
  }

  // Phase 3: Truly ambiguous — don't guess
  return {
    intentId: 'ambiguous',
    workflowId: '',
    label: '无法判断',
    confidence: 'low',
    matchedKeyword: null,
    source,
  }
}

/**
 * Check if a query looks like it should run a workflow (vs search).
 */
export function isWorkflowQuery(query: string): boolean {
  return RULES.some((rule) => rule.keywords.test(query) && rule.priority <= 11)
}

/**
 * Get the workflow ID for an intent.
 */
export function getWorkflowId(intentId: IntentId): string {
  const rule = RULES.find((r) => r.intentId === intentId)
  return rule?.workflowId || ''
}

/**
 * Get all intent rules (for debugging / self-check).
 */
export function getAllRules(): IntentRule[] {
  return RULES
}

/**
 * Get source default intents.
 */
export function getSourceDefaults(): Record<EntrySource, IntentId> {
  return SOURCE_DEFAULTS
}

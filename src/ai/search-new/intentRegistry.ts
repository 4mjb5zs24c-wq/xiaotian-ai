/**
 * AI Search V1.1 — Intent Keyword Registry
 *
 * Single source of truth for ALL intent keyword matching.
 * Used by isSemanticallyMeaningful, deriveIntentLabel,
 * identifyQueryIntent, and detectPrecisionJump.
 *
 * To add / modify an intent's keywords, aliases, or typos:
 *   → ONLY edit the INTENT_REGISTRY entries below.
 */

import type { PrecisionJumpData, PrecisionJumpIntent } from './types'

// ═══════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════

export type IntentCategory =
  | 'resource'
  | 'function'
  | 'jump'
  | 'legacy'

export interface IntentDefinition {
  intentId: string
  label: string
  loadingLabel?: string
  category: IntentCategory
  primaryKeywords: string[]
  aliases: string[]
  typos: string[]
  priority: number
  jumpData?: {
    intent: PrecisionJumpIntent
    title: string
    description: string
    buttonText: string
    route: string | null
    routeConfirmed: boolean
  }
}

/** Mutable runtime record — keywords computed once from definition */
export interface IntentRecord extends IntentDefinition {
  keywords: string[]
  matchRegex: RegExp
}

// ═══════════════════════════════════════════════════════════
// Factory
// ═══════════════════════════════════════════════════════════

function defineIntent(def: IntentDefinition): IntentRecord {
  const keywords = [...new Set([...def.primaryKeywords, ...def.aliases, ...def.typos])]
  const escaped = keywords
    .filter(Boolean)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length)
  const matchRegex = escaped.length > 0 ? new RegExp(escaped.join('|')) : /(?!)/ // never matches

  return { ...def, keywords, matchRegex }
}

// ═══════════════════════════════════════════════════════════
// Registry — SINGLE SOURCE OF TRUTH
// ═══════════════════════════════════════════════════════════

export const INTENT_REGISTRY: IntentRecord[] = [
  // ── Precision Jump Intents (priority 0 — checked BEFORE search engine) ──

  defineIntent({
    intentId: 'report',
    label: '报告 / 学情',
    loadingLabel: '教学管理',
    category: 'jump',
    priority: 0,
    primaryKeywords: ['报告', '练习报告', '学情', '完成率', '未完成', '班级报告', '最近报告', '提交情况', '平均分', '错题分析'],
    aliases: [],
    typos: [],
    jumpData: {
      intent: 'report',
      title: '报告 / 学情',
      description: '练习报告、完成情况和学情分析目前仍在报告列表中查看。\n你可以前往报告列表，按练习名称、班级、时间等条件查找对应报告。',
      buttonText: '去报告列表',
      route: '/practice-reports',
      routeConfirmed: true,
    },
  }),
  defineIntent({
    intentId: 'wrong_question',
    label: '错题 / 错题本',
    loadingLabel: '教学管理',
    category: 'jump',
    priority: 0,
    primaryKeywords: ['错题本', '错题统计', '错题练习', '错题记录', '学生错题', '班级错题'],
    aliases: ['错题'],
    typos: [],
    jumpData: {
      intent: 'wrong_question',
      title: '错题 / 错题本',
      description: '错题统计和错题明细目前仍在错题本中查看。\n你可前往错题本，按班级、题型、知识点查看错题分布。',
      buttonText: '去错题本',
      route: '/wrong-questions',
      routeConfirmed: true,
    },
  }),
  defineIntent({
    intentId: 'lesson_prep',
    label: '备课',
    loadingLabel: '教学管理',
    category: 'jump',
    priority: 0,
    primaryKeywords: ['我的备课', '备课资源', '加入备课', '课堂备课', '课前准备', '备课夹', '备课内容'],
    aliases: ['备课'],
    typos: [],
    jumpData: {
      intent: 'lesson_prep',
      title: '备课',
      description: '备课资源和备课夹目前仍在"我的备课"中查看和管理。\n你可前往我的备课，查看已加入备课的资源。',
      buttonText: '去我的备课',
      route: null,
      routeConfirmed: false,
    },
  }),
  defineIntent({
    intentId: 'vocab_insight',
    label: '错词 / 词汇薄弱',
    loadingLabel: '教学管理',
    category: 'jump',
    priority: 0,
    primaryKeywords: ['错词复习', '词汇薄弱', '易错词', '不会的词', '单词错误', '词汇掌握差'],
    aliases: ['错词', '错音', '读不准'],
    typos: [],
    jumpData: {
      intent: 'vocab_insight',
      title: '错词 / 词汇薄弱',
      description: '已为你推荐词汇洞察，可查看班级错词情况、薄弱词汇和复习建议。',
      buttonText: '查看词汇洞察',
      route: '/vocabulary-insight',
      routeConfirmed: true,
    },
  }),

  // ── Resource / Function Intents (checked AFTER jump intents) ──

  defineIntent({
    intentId: 'answer_card',
    label: '答题卡',
    priority: 1,
    category: 'function',
    primaryKeywords: ['答题卡', '答题纸', '作答卡', '作答纸', '答题卷', '答题页', '纸质答题卡', '纸质作答', '试卷答题卡', '试卷作答卡', '试卷答题纸'],
    aliases: ['制卡', '快速制卡', '新建答题卡', '自制答题卡', '三方卡', '第三方卡', '批卡', '扫卡', '扫描卡', '扫描答题卡', '线下考试', '纸笔练习', '纸质练习', '上传答题卡'],
    typos: ['答提卡', '打题卡', '答题咔'],
  }),
  defineIntent({
    intentId: 'writing',
    label: '写作',
    priority: 2,
    category: 'resource',
    primaryKeywords: ['作文', '写作', '应用文', '读后续写', '书面表达', '英语作文', '作文题', '作文作业'],
    aliases: ['续写', '写作文', '布置作文', '写一篇', '作文练习', '写作练习', '写作训练', '应用文写作', '应用文练习', '读后续写练习', '续写练习'],
    typos: [],
  }),
  defineIntent({
    intentId: 'listening_mock',
    label: '听力模拟',
    priority: 3,
    category: 'resource',
    primaryKeywords: ['听力模拟', '听力模考', '听力测试', '听力测评', '听力考试'],
    aliases: ['听力模拟题', '听力模拟卷'],
    typos: [],
  }),
  defineIntent({
    intentId: 'listening',
    label: '听力',
    priority: 30,
    category: 'resource',
    primaryKeywords: ['听力练习', '听力训练', '听力资源', '听力素材', '同步听力', '单元听力', '课本听力', '听力题'],
    aliases: ['听力'],
    typos: [],
  }),
  defineIntent({
    intentId: 'speaking',
    label: '听说',
    priority: 31,
    category: 'resource',
    primaryKeywords: ['听说练习', '听说训练', '听说资源', '听说考试', '听说模拟', '听说测评', '口语听说'],
    aliases: ['听说'],
    typos: [],
  }),
  defineIntent({
    intentId: 'real_exam',
    label: '真题资源',
    priority: 32,
    category: 'resource',
    primaryKeywords: ['历年真题', '中考真题', '高考真题', '真题卷', '真题库', '区域真题', '考试真题'],
    aliases: ['真题', '真题资源'],
    typos: [],
  }),
  defineIntent({
    intentId: 'exam_set',
    label: '套题',
    priority: 7,
    category: 'resource',
    primaryKeywords: ['套题', '套卷', '整套卷', '整套题', '模拟套题', '模拟套卷', '成套练习'],
    aliases: ['一整套', '成套'],
    typos: [],
  }),
  defineIntent({
    intentId: 'mock_exam',
    label: '模拟',
    priority: 8,
    category: 'resource',
    primaryKeywords: ['模拟题', '模拟卷', '模拟试卷', '模拟练习', '模考', '模拟考试', '阶段测试', '阶段检测', '摸底考试'],
    aliases: ['模拟', '冲刺', '冲刺卷', '冲刺练习'],
    typos: [],
  }),
  defineIntent({
    intentId: 'practice',
    label: '练习',
    priority: 9,
    category: 'resource',
    primaryKeywords: ['课后练习', '课后巩固', '巩固练习', '课堂练习', '同步练习', '同步训练', '单元练习', '布置练习', '今天作业', '明天作业'],
    aliases: ['练习', '作业', '布置', '发作业', '留作业', '练一练', '做练习', '做题', '刷题', '发给学生', '推送练习'],
    typos: [],
  }),
  defineIntent({
    intentId: 'paper',
    label: '试卷',
    priority: 10,
    category: 'resource',
    primaryKeywords: ['我的试卷', '测试卷', '检测卷', '练习卷', '英语试卷', '单元卷', '期中卷', '期末卷', '阶段卷', '考试卷', '测验卷', '测试题', '练习题'],
    aliases: ['试卷', '卷子', '试题', '卷', '卷纸', '题纸', '自己出的卷', '自己组的卷'],
    typos: [],
  }),
  defineIntent({
    intentId: 'word_list',
    label: '词表',
    priority: 11,
    category: 'function',
    primaryKeywords: ['我的词表', '词汇表', '单词表', '生词表'],
    aliases: ['词表', '词单'],
    typos: [],
  }),
  defineIntent({
    intentId: 'dictation',
    label: '听写与默写',
    priority: 12,
    category: 'resource',
    primaryKeywords: ['词汇听写', '词汇默写', '词句听写', '单词听写', '单词默写', '课文默写', '篇章默写', '段落默写', '句子听写', '词组听写', '短语听写', '语篇默写'],
    aliases: ['听写', '默写', '听默', '听默写', '默单词', '默词', '默一下', '默课文', '听词', '听单词'],
    typos: ['听些'],
  }),
  defineIntent({
    intentId: 'vocabulary',
    label: '词汇',
    priority: 13,
    category: 'resource',
    primaryKeywords: ['单词练习', '词汇练习', '单词训练', '词汇训练', '单词巩固', '词汇巩固'],
    aliases: ['词汇', '单词', '生词', '课标词', '核心词', '重点词', '背单词', '记单词', '练单词', '非课标词'],
    typos: [],
  }),
  defineIntent({
    intentId: 'text',
    label: '课文',
    priority: 14,
    category: 'resource',
    primaryKeywords: ['课文跟读', '课文背诵', '课文资源', '课文练习', '课文朗读', '课文讲解', '逐句跟读', '课文读一读'],
    aliases: ['课文', '跟读', '背诵', '朗读', '读课文', '跟读课文', '背课文', '语篇'],
    typos: [],
  }),
  defineIntent({
    intentId: 'theme_video',
    label: '主题视频',
    priority: 15,
    category: 'resource',
    primaryKeywords: ['主题视频', '话题视频', '拓展视频', '文化视频', '主题资源', '话题资源', '文化拓展', '拓展资源'],
    aliases: [],
    typos: [],
  }),
  defineIntent({
    intentId: 'video',
    label: '视频',
    priority: 16,
    category: 'resource',
    primaryKeywords: ['同步视频', '单元视频', '课堂视频', '教学视频', '课本视频', '讲解视频'],
    aliases: ['视频', '视频资源'],
    typos: [],
  }),
  defineIntent({
    intentId: 'dubbing',
    label: '配音',
    priority: 17,
    category: 'resource',
    primaryKeywords: ['趣味配音', '英语配音', '视频配音', '口语配音', '动画配音'],
    aliases: ['配音', '配音练习', '配音资源'],
    typos: [],
  }),
  defineIntent({
    intentId: 'grammar',
    label: '语法',
    priority: 18,
    category: 'resource',
    primaryKeywords: ['语法填空', '单句语法', '语法练习', '语法训练', '完形填空', '选词填空', '短文填空'],
    aliases: ['语法', '时态', '从句', '非谓语', '宾语从句', '定语从句', '被动语态', '语法题', '语言知识', '语言运用'],
    typos: [],
  }),
  defineIntent({
    intentId: 'reading',
    label: '阅读',
    priority: 19,
    category: 'resource',
    primaryKeywords: ['阅读理解', '阅读练习', '阅读训练', '英语阅读', '阅读七选五', '任务型阅读'],
    aliases: ['阅读', '阅读题', '阅读专项', '七选五', '阅读材料', '阅读文章'],
    typos: [],
  }),
  defineIntent({
    intentId: 'micro_skill',
    label: '微技能',
    priority: 4,
    category: 'resource',
    primaryKeywords: ['微技能', '微技能训练', '微技能练习', '微技能专项', '阅读微技能', '听力微技能', '写作微技能'],
    aliases: ['技能训练', '小技能', '技巧训练', '解题技巧', '做题方法'],
    typos: [],
  }),
  defineIntent({
    intentId: 'special_topic',
    label: '专项',
    priority: 5,
    category: 'resource',
    primaryKeywords: ['专项练习', '专项训练', '专项资源', '题型专项', '能力专项', '词汇专项', '语法专项', '听力专项', '听说专项', '写作专项', '阅读专项'],
    aliases: ['专项', '专门', '专业', '专练', '专训', '专题', '专项题', '专项卷', '专项课'],
    typos: [],
  }),
  defineIntent({
    intentId: 'quiz_compose',
    label: '选题组卷',
    priority: 22,
    category: 'function',
    primaryKeywords: ['选题组卷', '挑题组卷', '题库组卷', '自己组卷'],
    aliases: ['组卷', '选题', '挑题', '组一套题', '组一张卷'],
    typos: [],
  }),
  defineIntent({
    intentId: 'custom_practice',
    label: '自定义练习',
    priority: 23,
    category: 'function',
    primaryKeywords: ['自定义批改', '自定义练习', '自定义作业', '自定义布置', '自己出题', '自己布置', '自建练习'],
    aliases: ['自定义', '批改', '自建'],
    typos: [],
  }),
  defineIntent({
    intentId: 'import_paper',
    label: '导入试卷',
    priority: 24,
    category: 'function',
    primaryKeywords: ['导入试卷', '导入考卷', '导入试题'],
    aliases: [],
    typos: [],
  }),

  // ── v1.0 Legacy Triggers (keep semantic meaningfulness only) ──

  defineIntent({
    intentId: 'sync_generic',
    label: '同步',
    priority: 100,
    category: 'legacy',
    primaryKeywords: ['同步词汇', '同步课文', '同步练习', '同步训练'],
    aliases: [],
    typos: [],
  }),
  defineIntent({
    intentId: 'textbook_name',
    label: '教材',
    priority: 101,
    category: 'legacy',
    primaryKeywords: ['人教版', '部编版', '外研版', '牛津版'],
    aliases: [],
    typos: [],
  }),
  defineIntent({
    intentId: 'unit_ref',
    label: '单元',
    priority: 102,
    category: 'legacy',
    primaryKeywords: [],
    aliases: [],
    typos: [],
    // matched via special regex in isSemanticallyMeaningful
  }),
  defineIntent({
    intentId: 'province_ref',
    label: '地区',
    priority: 103,
    category: 'legacy',
    primaryKeywords: ['山东', '北京', '上海', '广东', '江苏', '浙江', '福建', '四川', '湖北', '湖南', '云南'],
    aliases: [],
    typos: [],
  }),
  defineIntent({
    intentId: 'exam_type_ref',
    label: '考试类型',
    priority: 104,
    category: 'legacy',
    primaryKeywords: ['中考', '高考', '期中', '期末'],
    aliases: [],
    typos: [],
  }),
  defineIntent({
    intentId: 'search_help',
    label: '搜索帮助',
    priority: 105,
    category: 'legacy',
    primaryKeywords: [],
    aliases: [],
    typos: [],
    // matched via special regex in isSemanticallyMeaningful
  }),
  defineIntent({
    intentId: 'english_word',
    label: '英文单词',
    priority: 106,
    category: 'legacy',
    primaryKeywords: [],
    aliases: [],
    typos: [],
    // matched via special regex in isSemanticallyMeaningful
  }),
]

// ═══════════════════════════════════════════════════════════
// Derived caches
// ═══════════════════════════════════════════════════════════

const SORTED_BY_PRIORITY = [...INTENT_REGISTRY].sort((a, b) => a.priority - b.priority)
const JUMP_INTENTS = INTENT_REGISTRY.filter((i) => i.category === 'jump')
// NON_LEGACY is kept for future use (e.g., search suggestions auto-generation)

// ═══════════════════════════════════════════════════════════
// Public API
// ═══════════════════════════════════════════════════════════

export function detectPrecisionJump(query: string): PrecisionJumpData | null {
  const q = query.trim()
  if (!q) return null

  for (const intent of JUMP_INTENTS) {
    if (intent.matchRegex.test(q) && intent.jumpData) {
      return { ...intent.jumpData }
    }
  }
  return null
}

export function isSemanticallyMeaningful(query: string): boolean {
  const q = query.trim()
  if (!q) return false

  for (const intent of INTENT_REGISTRY) {
    // Special regex cases
    if (intent.intentId === 'unit_ref') {
      if (/Unit\s*\d+/i.test(q) || /第\s*\d+\s*单元/.test(q)) return true
      continue
    }
    if (intent.intentId === 'english_word') {
      if (/^[a-zA-Z]{2,}$/.test(q)) return true
      continue
    }
    if (intent.intentId === 'search_help') {
      if (/有没有/.test(q) || /帮我找/.test(q) || /有什么/.test(q) || /找.*(资源|练习)/.test(q) || /看看/.test(q) || /搜索/.test(q)) return true
      continue
    }
    if (intent.matchRegex.test(q)) return true
  }

  return false
}

export function deriveIntentLabel(query: string): string {
  const q = query.trim()

  for (const intent of SORTED_BY_PRIORITY) {
    if (intent.category === 'legacy') continue
    if (intent.matchRegex.test(q)) return intent.label
  }

  return q.length > 10 ? q.slice(0, 10) + '…' : q
}

export function identifyQueryIntent(query: string): string | null {
  const q = query.trim()

  for (const intent of SORTED_BY_PRIORITY) {
    if (intent.category === 'legacy' && intent.intentId !== 'unit_ref' && intent.intentId !== 'english_word') continue

    // Special regex cases
    if (intent.intentId === 'unit_ref') {
      if (/Unit\s*\d+/i.test(q) || /第\s*\d+\s*单元/.test(q)) return '单元'
      continue
    }
    if (intent.intentId === 'english_word') {
      if (/^[a-zA-Z]{2,}$/.test(q)) return '词汇'
      continue
    }

    if (intent.matchRegex.test(q)) {
      return intent.loadingLabel || intent.label
    }
  }

  return null
}

/** Get all intent records (for debugging / self-check). */
export function getAllIntents(): IntentRecord[] {
  return INTENT_REGISTRY
}

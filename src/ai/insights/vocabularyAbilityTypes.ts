/**
 * 词汇能力维度类型定义
 *
 * 4 个固定维度，不可增减：
 * - 词汇识记
 * - 语境理解
 * - 词汇运用表达
 * - 词汇学习策略
 */

// ── 四大能力维度 ──────────────────────────────────────────

export type VocabAbilityDimension =
  | 'recognition'
  | 'contextual_understanding'
  | 'expression'
  | 'learning_strategy'

export const ABILITY_DIMENSION_META: Record<VocabAbilityDimension, {
  label: string
  shortLabel: string
  color: string
  description: string
  available: boolean  // 词汇学习策略暂未开放
}> = {
  recognition: {
    label: '词汇识记',
    shortLabel: '识记',
    color: '#3b82f6',
    description: '对词汇音、形、义的基本识别与记忆能力',
    available: true,
  },
  contextual_understanding: {
    label: '语境理解',
    shortLabel: '语境理解',
    color: '#8b5cf6',
    description: '在语篇、对话等语境中理解词汇含义的能力',
    available: true,
  },
  expression: {
    label: '词汇运用表达',
    shortLabel: '运用表达',
    color: '#06b6d4',
    description: '在写作、翻译等输出场景中正确运用词汇的能力',
    available: true,
  },
  learning_strategy: {
    label: '词汇学习策略',
    shortLabel: '学习策略',
    color: '#f59e0b',
    description: '学生自主规划、监控和调整词汇学习的能力',
    available: false, // 待完善
  },
}

// ── 题型 → 能力维度映射（初中/高中统一） ─────────────────

export const QUESTION_TYPE_TO_ABILITY: Record<string, VocabAbilityDimension[]> = {
  // 识记类
  '英汉匹配': ['recognition'],
  '词义选择': ['recognition'],
  '单词认读': ['recognition'],
  '词义理解题': ['recognition'],

  // 识记 + 运用表达
  '中英互译': ['recognition', 'expression'],
  '默写': ['recognition', 'expression'],
  '听写': ['recognition', 'contextual_understanding'],
  '单词填空': ['recognition', 'expression'],
  '英文输入题': ['recognition', 'expression'],
  '单词拼写': ['recognition', 'expression'],

  // 语境理解
  '听力题': ['contextual_understanding'],
  '听取信息题': ['contextual_understanding'],
  '跟读题': ['contextual_understanding'],
  '配音题': ['contextual_understanding'],
  '语音识别练习': ['contextual_understanding'],
  '听力短对话': ['contextual_understanding'],
  '听力短文': ['contextual_understanding'],

  // 运用表达 + 语境理解
  '语篇填空': ['expression', 'contextual_understanding'],
  '选词填空': ['expression', 'contextual_understanding'],
  '完形填空': ['expression', 'contextual_understanding'],

  // 运用表达
  '写作': ['expression'],
  '句子翻译': ['expression'],
  '词形变化题': ['expression'],
  '固定搭配题': ['expression'],
  '中英检测': ['recognition', 'expression'],
}

// ── 计算函数 ──────────────────────────────────────────────

/** 根据错题题型分布计算各能力维度得分（0-100） */
export function calcAbilityScores(
  errorTypeDistribution: Record<string, number>, // { 题型: 错误次数 }
): Record<VocabAbilityDimension, number> {
  const dimensionErrors: Record<VocabAbilityDimension, number> = {
    recognition: 0,
    contextual_understanding: 0,
    expression: 0,
    learning_strategy: 0,
  }

  let totalErrors = 0
  for (const [questionType, count] of Object.entries(errorTypeDistribution)) {
    totalErrors += count
    const abilities = QUESTION_TYPE_TO_ABILITY[questionType] ?? []
    for (const ability of abilities) {
      dimensionErrors[ability] += count
    }
  }

  // 学习策略暂按 mock 值
  dimensionErrors.learning_strategy = totalErrors > 0 ? Math.round(totalErrors * 0.15) : 0

  // 转换为 0-100 得分（错误越少得分越高）
  const maxError = Math.max(...Object.values(dimensionErrors), 1)
  const scores: Record<VocabAbilityDimension, number> = {
    recognition: 0,
    contextual_understanding: 0,
    expression: 0,
    learning_strategy: 0,
  }

  for (const dim of Object.keys(dimensionErrors) as VocabAbilityDimension[]) {
    // 得分 = 100 - (该维度错误占比 * 100)，最低 10 分
    const ratio = maxError > 0 ? dimensionErrors[dim] / maxError : 0
    scores[dim] = Math.max(10, Math.round(100 - ratio * 90))
  }

  return scores
}

/** 获取某个题型对应的能力维度标签 */
export function getQuestionTypeAbilities(questionType: string): VocabAbilityDimension[] {
  return QUESTION_TYPE_TO_ABILITY[questionType] ?? []
}

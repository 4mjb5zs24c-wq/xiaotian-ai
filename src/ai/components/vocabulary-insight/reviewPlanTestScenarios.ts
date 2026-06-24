/**
 * 词汇能力提升方案 — 测试场景（仅 dev/demo 模式）
 *
 * 用于验证候选词不足、题目不足、有效作答率不足、稳定基线词不足时的提示和降级逻辑。
 */

export type TestScenarioId =
  | 'normal'
  | 'draft_shortage'
  | 'candidate_shortage'
  | 'question_shortage'
  | 'low_answer_rate'
  | 'baseline_shortage'
  | 'empty_draft'

export interface TestScenarioWarning {
  type: 'info' | 'warning' | 'error'
  message: string
}

export interface TestScenarioData {
  id: TestScenarioId
  label: string
  /** Mock available candidate word count (overrides actual preview count) */
  candidateWordCount: number
  /** Mock available question count per day (overrides selected wordsPerDay) */
  availableQuestionCount: number
  /** Mock available rollback question count for subsequent days */
  availableRollbackCount: number
  /** Day 1 effective answer rate (0-1) */
  day1AnswerRate: number
  /** Whether a previous valid rollback pool exists */
  hasPreviousRollbackPool: boolean
  /** Stable baseline word count (words that appeared in >= 2 past review sessions) */
  stableBaselineCount: number
  /** Baseline improvement rate (null = not calculable) */
  baselineImprovementRate: number | null
}

export const TEST_SCENARIOS: TestScenarioData[] = [
  {
    id: 'normal',
    label: '正常数据',
    candidateWordCount: 50,
    availableQuestionCount: 30,
    availableRollbackCount: 6,
    day1AnswerRate: 0.72,
    hasPreviousRollbackPool: true,
    stableBaselineCount: 8,
    baselineImprovementRate: 0.18,
  },
  {
    id: 'candidate_shortage',
    label: '候选词不足',
    candidateWordCount: 8,
    availableQuestionCount: 30,
    availableRollbackCount: 6,
    day1AnswerRate: 0.72,
    hasPreviousRollbackPool: true,
    stableBaselineCount: 8,
    baselineImprovementRate: 0.18,
  },
  {
    id: 'question_shortage',
    label: '可用题目不足',
    candidateWordCount: 50,
    availableQuestionCount: 22,
    availableRollbackCount: 6,
    day1AnswerRate: 0.72,
    hasPreviousRollbackPool: true,
    stableBaselineCount: 8,
    baselineImprovementRate: 0.18,
  },
  {
    id: 'low_answer_rate',
    label: '有效作答率不足 50%',
    candidateWordCount: 50,
    availableQuestionCount: 30,
    availableRollbackCount: 6,
    day1AnswerRate: 0.30,
    hasPreviousRollbackPool: true,
    stableBaselineCount: 8,
    baselineImprovementRate: 0.18,
  },
  {
    id: 'draft_shortage',
    label: '草稿词不足 20 个',
    candidateWordCount: 50,
    availableQuestionCount: 30,
    availableRollbackCount: 6,
    day1AnswerRate: 0.72,
    hasPreviousRollbackPool: true,
    stableBaselineCount: 8,
    baselineImprovementRate: 0.18,
  },
  {
    id: 'baseline_shortage',
    label: '稳定基线词不足',
    candidateWordCount: 50,
    availableQuestionCount: 30,
    availableRollbackCount: 6,
    day1AnswerRate: 0.72,
    hasPreviousRollbackPool: false,
    stableBaselineCount: 2,
    baselineImprovementRate: null,
  },
  {
    id: 'empty_draft',
    label: '草稿为空',
    candidateWordCount: 0,
    availableQuestionCount: 0,
    availableRollbackCount: 0,
    day1AnswerRate: 0,
    hasPreviousRollbackPool: false,
    stableBaselineCount: 0,
    baselineImprovementRate: null,
  },
]

/** Compute scenario warnings based on current scenario and wizard config */
export function getScenarioWarnings(
  scenario: TestScenarioData | null,
  quickFixWordCount: number,
  wordsPerDay: number,
  _activeWordCount: number,
  _selectedDayCount: number,
): TestScenarioWarning[] {
  if (!scenario || scenario.id === 'normal') return []
  const warnings: TestScenarioWarning[] = []

  switch (scenario.id) {
    case 'draft_shortage': {
      warnings.push({
        type: 'info',
        message: '当前词表不足 20 个，已按轻量复习计划生成，默认 30 题/复习日。',
      })
      break
    }
    case 'candidate_shortage': {
      const actual = scenario.candidateWordCount
      if (actual < quickFixWordCount) {
        warnings.push({
          type: 'warning',
          message: `当前可用高频错词仅 ${actual} 个，将基于现有词汇生成复习方案。`,
        })
      }
      break
    }
    case 'question_shortage': {
      const available = scenario.availableQuestionCount
      if (available < wordsPerDay) {
        warnings.push({
          type: 'warning',
          message: `当前词表可用题目不足，已按可用题目生成 ${available} 题。`,
        })
        // Add supplement hint
        warnings.push({
          type: 'info',
          message: '部分词缺少匹配题目，已从同一候选池补充有题词。',
        })
      }
      break
    }
    case 'low_answer_rate': {
      const rate = scenario.day1AnswerRate
      if (rate < 0.5) {
        warnings.push({
          type: 'warning',
          message: `上一闯关有效作答率不足 50%（${Math.round(rate * 100)}%），已用主复习题补齐当天题量。`,
        })
      }
      break
    }
    case 'baseline_shortage': {
      if (scenario.stableBaselineCount < 3) {
        warnings.push({
          type: 'warning',
          message: `稳定基线词数量不足（${scenario.stableBaselineCount} 个），暂不计算整体提升。`,
        })
      }
      break
    }
    case 'empty_draft': {
      warnings.push({
        type: 'error',
        message: '当前词表为空，无法生成复习方案，请先选择需要复习的词汇。',
      })
      break
    }
  }

  return warnings
}

/** Check if candidate word count is insufficient for the selected top-N */
export function isCandidateShort(scenario: TestScenarioData | null, quickFixWordCount: number): boolean {
  if (!scenario || scenario.id === 'normal') return false
  return scenario.candidateWordCount < quickFixWordCount
}

/** Get effective question count (taking scenario into account) */
export function getEffectiveQuestionCount(
  scenario: TestScenarioData | null,
  wordsPerDay: number,
): number {
  if (!scenario || scenario.id === 'normal') return wordsPerDay
  if (scenario.id === 'question_shortage') return Math.min(wordsPerDay, scenario.availableQuestionCount)
  return wordsPerDay
}

/** @deprecated 不再使用动态回滚，始终返回 0 回滚题 */
export function getEffectiveRollbackCount(
  _scenario: TestScenarioData | null,
  wordsPerDay: number,
  _dayIndex: number,
): { mainQ: number; rollbackQ: number } {
  return { mainQ: wordsPerDay, rollbackQ: 0 }
}

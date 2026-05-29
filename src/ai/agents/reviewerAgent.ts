/**
 * Reviewer Agent v2 —— 质量检查 + 人工介入
 *
 * 检查工具执行结果的质量。
 * - 全部通过 → completed
 * - 质量问题 → need_human（让老师决定是否继续）
 * - 严重问题 → need_replan（自动重新规划）
 */

import type { Agent, AgentContext, AgentResult } from './types'
import { registerAgent } from './agentRegistry'

interface ReviewCheck {
  name: string
  passed: boolean
  reason: string
}

export const reviewerAgent: Agent = {
  id: 'reviewer',
  name: '审查 Agent',
  description: '检查生成结果的质量，可请求老师确认或重新规划',

  async run(ctx: AgentContext): Promise<AgentResult> {
    const t0 = performance.now()

    console.log('  🔍 [Reviewer] 检查结果质量...')

    const checks: ReviewCheck[] = []

    // Check 1: Vocabulary count
    const vocabData = ctx.stepResults.get('tool:get_unit_vocabulary') as Record<string, unknown> | undefined
    const vocabTotal = (vocabData?.totalWords as number) || 0
    if (vocabTotal > 0 && vocabTotal < 5) {
      checks.push({ name: '词汇数量', passed: false, reason: `词汇量不足（仅${vocabTotal}个），至少需要5个` })
    } else {
      checks.push({ name: '词汇数量', passed: true, reason: vocabTotal > 0 ? `词汇量充足（${vocabTotal}个）` : '无词汇数据（非词汇任务，跳过）' })
    }

    // Check 2: Dictation has items
    const dictationData = ctx.stepResults.get('tool:generate_dictation') as Record<string, unknown> | undefined
    const items = dictationData?.items as Array<unknown> | undefined
    if (dictationData && (!items || items.length === 0)) {
      checks.push({ name: '默写内容', passed: false, reason: '生成的默写内容为空' })
    } else if (dictationData) {
      checks.push({ name: '默写内容', passed: true, reason: `已生成${items?.length || 0}题` })
    }

    // Check 3: Filter results
    const filterData = ctx.stepResults.get('tool:filter_difficulty') as Record<string, unknown> | undefined
    const selectedCount = (filterData?.selectedCount as number) || 0
    if (filterData && selectedCount === 0) {
      checks.push({ name: '词汇筛选', passed: false, reason: '筛选结果为空' })
    } else if (filterData) {
      checks.push({ name: '词汇筛选', passed: true, reason: `筛选出${selectedCount}个词` })
    }

    if (checks.length === 0) {
      checks.push({ name: '基础检查', passed: true, reason: '无工具调用，跳过审查' })
    }

    const allPassed = checks.every((c) => c.passed)
    const failedChecks = checks.filter((c) => !c.passed)
    const hasWarnings = dictationData && items && (items.length > 15)

    // Log checks
    for (const check of checks) {
      console.log(`    ${check.passed ? '✅' : '❌'} ${check.name}: ${check.reason}`)
    }

    const duration = Math.round(performance.now() - t0)

    // ── Critical failure → need_replan ─────────────
    if (!allPassed) {
      console.log(`  🔄 [Reviewer] 严重问题 → need_replan`)
      return {
        status: 'need_replan',
        output: { checks, failedChecks },
        summary: `质量检查不通过：${failedChecks.map((c) => c.reason).join('；')}`,
        error: failedChecks[0]?.reason,
      }
    }

    // ── All passed but need teacher confirmation ────
    // For vocab/dictation tasks, always confirm difficulty with teacher
    const isVocabTask = ctx.userInput.includes('词汇') || ctx.userInput.includes('默写') || ctx.userInput.includes('听写')
    if (isVocabTask && items && items.length > 0) {
      console.log(`  👩‍🏫 [Reviewer] 请求老师确认难度和内容`)

      return {
        status: 'need_human',
        output: { checks, items, vocabTotal },
        humanRequest: {
          type: 'confirm',
          title: '确认默写内容',
          description: `已生成 ${items.length} 道默写题。请确认难度和内容是否合适，或进行调整。`,
          payload: {
            itemCount: items.length,
            vocabularyCount: vocabTotal,
            difficulty: 'medium',
            mode: '中译英',
            preview: Array.isArray(items) ? items.slice(0, 5) : [],
          },
          options: [
            { id: 'approve', label: '确认，继续', description: '内容合适，生成最终结果' },
            { id: 'lower_difficulty', label: '降低难度', description: '改为英译中模式，先让学生适应' },
            { id: 'raise_difficulty', label: '提高难度', description: '改为听音拼写模式，增加挑战' },
            { id: 'edit', label: '手动调整', description: '我自己增减词汇或调整内容' },
          ],
        },
        summary: `请求老师确认 ${items.length} 道默写题的难度和内容`,
      }
    }

    // ── Has warnings → ask teacher ──────────────────
    if (hasWarnings) {
      console.log(`  👩‍🏫 [Reviewer] 题量偏多，请求老师确认`)
      return {
        status: 'need_human',
        output: { checks },
        humanRequest: {
          type: 'confirm',
          title: '确认题目数量',
          description: `当前生成了 ${items?.length} 道题，题量偏多。建议控制在 10-15 题。是否继续？`,
          payload: { itemCount: items?.length },
          options: [
            { id: 'approve', label: '保持原样', description: `${items?.length} 题没问题` },
            { id: 'reduce', label: '减少到 10 题', description: '去掉末尾的题目' },
          ],
        },
        summary: `题量偏多（${items?.length}题），请求老师确认`,
      }
    }

    console.log(`  ✅ [Reviewer] 全部通过 | ${duration}ms`)

    return {
      status: 'completed',
      output: { checks },
      summary: `质量检查通过（${checks.length} 项检查）`,
    }
  },
}

registerAgent(reviewerAgent)

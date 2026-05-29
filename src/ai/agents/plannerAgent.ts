/**
 * Planner Agent —— 动态规划 Agent
 *
 * 根据用户输入，自主决定执行哪些步骤。
 * 使用 llm.chat() 获取结构化规划（当前 mock），
 * 未来直接由 LLM 返回 JSON plan。
 */

import type { Agent, AgentContext, AgentResult, PlanStep, ExecutionPlan } from './types'
import { registerAgent } from './agentRegistry'

export const plannerAgent: Agent = {
  id: 'planner',
  name: '规划 Agent',
  description: '分析用户意图，动态生成执行计划',

  async run(ctx: AgentContext): Promise<AgentResult> {
    const userInput = ctx.userInput

    console.log('  🧠 [Planner] 分析用户意图...')

    // ── Dynamic plan generation ──────────────────────
    // Future: const plan = await llm.chat({ system: "decompose goal into steps", responseFormat: "json_object" })
    const plan = buildPlan(userInput, ctx)

    console.log(`  📋 [Planner] 计划: ${plan.steps.length} 步 | ${plan.steps.map(s => s.task).join(' → ')}`)

    // Store plan in shared state
    ctx.stepResults.set('execution_plan', plan)
    ctx.stepResults.set('current_step_index', 0)

    return {
      status: 'completed',
      output: plan,
      nextAgent: plan.steps[0]?.agentId || 'tool',
      summary: `规划完成：${plan.steps.length} 个步骤`,
    }
  },
}

// ── Plan Builder （未来替换为 llm.chat()） ────────────

function buildPlan(userInput: string, ctx: AgentContext): ExecutionPlan {
  const steps: PlanStep[] = []
  let order = 0

  // Step 0: Always load context
  steps.push({
    order: order++,
    agentId: 'tool',
    task: '加载班级上下文和教材信息',
    toolNames: ['get_unit_vocabulary'],
  })

  // Vocabulary / dictation tasks
  if (/词汇|单词|默写|听写|拼写|vocab/i.test(userInput)) {
    steps.push({
      order: order++,
      agentId: 'tool',
      task: `获取${extractUnit(userInput) || ctx.metadata.unit}词汇并筛选重点词`,
      toolNames: ['get_unit_vocabulary', 'filter_difficulty'],
    })
    steps.push({
      order: order++,
      agentId: 'tool',
      task: '生成默写/听写内容',
      toolNames: ['generate_dictation'],
    })
  }

  // Exam / paper generation
  if (/试卷|出卷|测验|测试|小测|考试/i.test(userInput)) {
    steps.push({
      order: order++,
      agentId: 'tool',
      task: `生成${extractUnit(userInput) || ctx.metadata.unit}测验卷`,
      toolNames: ['get_unit_vocabulary', 'filter_difficulty', 'generate_dictation'],
    })
  }

  // Analysis tasks
  if (/分析|薄弱|问题|统计|学情/i.test(userInput)) {
    steps.push({
      order: order++,
      agentId: 'tool',
      task: '分析班级学情和薄弱知识点',
      toolNames: ['filter_difficulty'],
    })
  }

  // Review
  steps.push({
    order: order++,
    agentId: 'reviewer',
    task: '检查生成结果的质量',
  })

  // Save
  steps.push({
    order: order++,
    agentId: 'memory',
    task: '保存结果到记忆系统',
  })

  return {
    goal: userInput,
    steps,
    estimatedRounds: Math.ceil(steps.length / 2),
  }
}

function extractUnit(text: string): string | null {
  const m = text.match(/[Uu]nit\s*(\d+)/)
  return m ? `Unit ${m[1]}` : null
}

registerAgent(plannerAgent)

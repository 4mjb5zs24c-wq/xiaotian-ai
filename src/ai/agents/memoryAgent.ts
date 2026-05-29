/**
 * Memory Agent —— 记忆持久化 Agent
 *
 * 将最终结果写入：
 *   - session memory（对话历史）
 *   - workflow history（执行记录）
 *   - teacher preferences（偏好学习）
 *
 * 后续 Agent 通过 loadMemory() 获取历史上下文。
 */

import type { Agent, AgentContext, AgentResult } from './types'
import { registerAgent } from './agentRegistry'
import { appendMessage } from '../memory/sessionMemory'
import { recordWorkflowRun } from '../memory/workflowHistory'

export const memoryAgent: Agent = {
  id: 'memory',
  name: '记忆 Agent',
  description: '保存执行结果到持久化记忆系统',

  async run(ctx: AgentContext): Promise<AgentResult> {
    const t0 = performance.now()

    console.log('  💾 [Memory] 保存结果到记忆系统...')

    // Collect all step results
    const results: Record<string, unknown> = {}
    ctx.stepResults.forEach((value, key) => {
      results[key] = value
    })

    // Save to session memory
    await appendMessage({
      sessionId: ctx.sessionId,
      type: 'workflow_result',
      data: {
        userInput: ctx.userInput,
        stepResults: results,
        metadata: ctx.metadata,
      },
      summary: `Agent 协作完成：${ctx.userInput.substring(0, 60)}`,
      importance: 0.8,
    })

    // Save to workflow history
    await recordWorkflowRun({
      workflowId: ctx.workflowId || 'orchestrator',
      workflowName: `Agent 协作: ${ctx.userInput.substring(0, 40)}`,
      trigger: ctx.userInput,
      status: 'completed',
      summary: `规划 → 工具执行 → 审查通过 → 记忆保存`,
      toolCallCount: ctx.stepResults.size,
      sessionId: ctx.sessionId,
    })

    // Save to shared memory for other agents
    ctx.memory.push({
      key: 'last_result',
      value: results,
      timestamp: Date.now(),
      agentId: 'memory',
    })

    const duration = Math.round(performance.now() - t0)

    console.log(`  ✅ [Memory] 已保存 | ${duration}ms`)

    return {
      status: 'completed',
      output: { savedKeys: Array.from(ctx.stepResults.keys()) },
      summary: `已保存 ${ctx.stepResults.size} 个步骤结果到记忆系统`,
    }
  },
}

registerAgent(memoryAgent)

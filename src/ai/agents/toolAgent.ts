/**
 * Tool Agent —— 工具调用执行 Agent
 *
 * 接收 toolCalls 并执行。结果写入 ctx.stepResults 供后续 Agent 使用。
 * 支持单 tool 和串行多 tool 执行。
 */

import type { Agent, AgentContext, AgentResult } from './types'
import { registerAgent } from './agentRegistry'
import { executeToolCalls } from '../tools/executeToolCalls'
import { recordToolResult } from '../memory/toolResultMemory'

export const toolAgent: Agent = {
  id: 'tool',
  name: '工具 Agent',
  description: '执行 tool calls，将结果写入共享状态',

  async run(ctx: AgentContext): Promise<AgentResult> {
    const t0 = performance.now()

    // Get tool calls from context or from the previous plan step
    const plan = ctx.stepResults.get('execution_plan') as { steps: Array<{ toolNames?: string[]; task: string }> } | undefined

    // Determine which tools to call
    const currentStepIndex = (ctx.stepResults.get('current_step_index') as number) || 0
    const currentStep = plan?.steps?.[currentStepIndex]

    const toolNames = currentStep?.toolNames || ['get_unit_vocabulary']

    if (toolNames.length === 0) {
      return {
        status: 'completed',
        summary: '无需调用工具',
      }
    }

    console.log(`  🔧 [Tool Agent] 执行 ${toolNames.length} 个工具: ${toolNames.join(', ')}`)

    // Build tool calls from tool names + context
    const toolCalls = toolNames.map((name) => ({
      id: `tc-${Date.now()}-${name}`,
      type: 'function' as const,
      function: {
        name,
        arguments: JSON.stringify({
          unit: ctx.metadata.unit,
          grade: ctx.metadata.grade,
          textbook: ctx.metadata.textbook,
          quantity: 10,
        }),
      },
    }))

    // Execute all tool calls
    const execResult = await executeToolCalls(toolCalls, {
      runId: ctx.sessionId,
      textbook: ctx.metadata.textbook,
      unit: ctx.metadata.unit,
      grade: ctx.metadata.grade,
      className: ctx.metadata.className,
      previousResults: Object.fromEntries(ctx.stepResults),
    })

    // Write results to shared context
    for (const ex of execResult.executed) {
      ctx.stepResults.set(`tool:${ex.toolName}`, ex.result.data)
      ctx.stepResults.set(`tool:${ex.toolName}:summary`, ex.result.summary)

      // Record to persistent memory
      await recordToolResult({
        toolName: ex.toolName,
        args: JSON.parse(ex.toolCall.function.arguments),
        result: ex.result.data,
        sessionId: ctx.sessionId,
        summary: ex.result.summary,
      })
    }

    // Advance step index
    ctx.stepResults.set('current_step_index', currentStepIndex + 1)

    const allSuccess = execResult.allSuccess
    const duration = Math.round(performance.now() - t0)

    console.log(`  ✅ [Tool Agent] ${allSuccess ? '成功' : '部分失败'} | ${duration}ms | ${execResult.summary}`)

    return {
      status: allSuccess ? 'completed' : 'need_replan',
      output: execResult.executed.map((e) => ({ tool: e.toolName, data: e.result.data })),
      summary: execResult.summary,
      error: allSuccess ? undefined : '部分工具执行失败',
    }
  },
}

registerAgent(toolAgent)

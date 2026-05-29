/**
 * executeToolCalls.ts —— Agent 工具调用执行器
 *
 * 职责：
 *   1. 接收 LLM 返回的 tool_calls
 *   2. 从 Tool Registry 查找对应 Tool
 *   3. 执行 tool.execute(ctx, args)
 *   4. 返回 ToolResult[]
 *   5. 支持同时执行多个 tool calls
 *
 * 与 agentChatLoop 的关系：
 *   agentChatLoop 检测到 tool_calls → 调用 executeToolCalls() → 获取 results → append 回消息
 */

import type { LLMToolCall } from '../llm/types'
import { getTool } from './toolRegistry'
import type { ToolExecuteContext, ToolResult } from './types'

// ── Types ──────────────────────────────────────────────

export interface ExecutedToolCall {
  /** The original tool call from LLM */
  toolCall: LLMToolCall
  /** Execution result */
  result: ToolResult
  /** Tool name (for display) */
  toolName: string
}

export interface ExecuteToolCallsResult {
  /** All executed tool calls */
  executed: ExecutedToolCall[]
  /** Quick summary for UI */
  summary: string
  /** Whether all tools succeeded */
  allSuccess: boolean
}

// ── Execution ──────────────────────────────────────────

/**
 * Execute one or more tool calls from an LLM response.
 *
 * This is THE function that turns LLM's "intent" into real action.
 * Called by agentChatLoop after detecting tool_calls in the response.
 *
 * @param toolCalls - tool_calls array from LLMResponse
 * @param ctx       - Execution context (textbook, unit, grade, etc.)
 *
 * @example
 * const result = await executeToolCalls(response.tool_calls, {
 *   runId: 'wf-123',
 *   textbook: '人教版',
 *   unit: 'Unit 3',
 *   ...
 * })
 * // result.executed[0].result.data → tool output
 * // result.summary → "get_unit_vocabulary: 获取Unit 3词汇表：共20个单词"
 */
export async function executeToolCalls(
  toolCalls: LLMToolCall[],
  ctx: ToolExecuteContext,
): Promise<ExecuteToolCallsResult> {
  const executed: ExecutedToolCall[] = []
  const summaries: string[] = []

  for (const tc of toolCalls) {
    const fnName = tc.function.name

    // Parse arguments from JSON string
    let args: Record<string, unknown> = {}
    try {
      args = JSON.parse(tc.function.arguments)
    } catch {
      args = { _raw: tc.function.arguments }
    }

    // Lookup tool in registry
    const tool = getTool(fnName)
    if (!tool) {
      const failResult: ToolResult = {
        success: false,
        data: {},
        summary: `Tool "${fnName}" 未注册`,
        error: `Tool "${fnName}" not found in registry`,
      }
      executed.push({ toolCall: tc, result: failResult, toolName: fnName })
      summaries.push(`${fnName}: ❌ 未注册`)
      console.error(`  ❌ Tool "${fnName}" not found in registry`)
      continue
    }

    // Execute the tool
    console.log(`  🔧 [TOOL EXECUTE] ${fnName}(${JSON.stringify(args).substring(0, 100)})`)
    const result = await tool.execute(ctx, args)

    executed.push({ toolCall: tc, result, toolName: fnName })

    if (result.success) {
      console.log(`  ✅ [TOOL RESULT] ${fnName}: ${result.summary}`)
      summaries.push(`${fnName}: ${result.summary}`)
    } else {
      console.error(`  ❌ [TOOL RESULT] ${fnName} FAILED: ${result.error}`)
      summaries.push(`${fnName}: ❌ ${result.error}`)
    }
  }

  return {
    executed,
    summary: summaries.join(' | '),
    allSuccess: executed.every((e) => e.result.success),
  }
}

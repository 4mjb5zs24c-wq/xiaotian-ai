/**
 * Tool Executor —— Agent 工具调用执行器
 *
 * 职责：
 *   1. 检测 LLM 响应中的 tool_calls
 *   2. 从 ToolRegistry 中找到对应 Tool 并执行
 *   3. 将 tool result 格式化为 LLM 可理解的消息
 *   4. 支持多轮 tool calling 循环
 *
 * 流程：
 *   llm.chat() → response.tool_calls
 *   → detectToolCalls(response)
 *   → executeToolCalls(toolCalls, ctx)
 *   → appendToolResults(messages, results)
 *   → llm.chat(messages) → final response
 */

import type { LLMResponse, LLMMessage, LLMToolCall } from '../llm/types'
import { executeTool } from '../tools/toolRegistry'
import type { ToolExecuteContext, ToolResult } from '../tools/types'

// ── Types ──────────────────────────────────────────────

export interface ExecutedToolCall {
  toolCall: LLMToolCall
  result: ToolResult
  /** Tool name for display */
  toolName: string
}

export interface ToolExecutionResult {
  /** All executed tool calls with results */
  executed: ExecutedToolCall[]
  /** Messages representing tool results (ready to append to conversation) */
  toolResultMessages: LLMMessage[]
  /** Whether any tool was executed */
  hadToolCalls: boolean
}

// ── Detection ──────────────────────────────────────────

/**
 * Check if the LLM response contains tool calls that need execution.
 */
export function detectToolCalls(response: LLMResponse): boolean {
  return response.tool_calls.length > 0
}

// ── Execution ──────────────────────────────────────────

/**
 * Execute all tool calls from an LLM response.
 * Each tool call is dispatched to the ToolRegistry.
 */
export async function executeToolCalls(
  response: LLMResponse,
  ctx: ToolExecuteContext,
): Promise<ExecutedToolCall[]> {
  const results: ExecutedToolCall[] = []

  for (const toolCall of response.tool_calls) {
    const fnName = toolCall.function.name
    let args: Record<string, unknown> = {}

    try {
      args = JSON.parse(toolCall.function.arguments)
    } catch {
      // If arguments aren't valid JSON, use empty object
      args = { raw: toolCall.function.arguments }
    }

    const result = await executeTool(fnName, ctx, args)

    results.push({
      toolCall,
      result,
      toolName: fnName,
    })
  }

  return results
}

// ── Message Formatting ─────────────────────────────────

/**
 * Convert executed tool results into messages that can be appended
 * to the conversation and sent back to the LLM for final response.
 */
export function appendToolResults(executed: ExecutedToolCall[]): LLMMessage[] {
  const messages: LLMMessage[] = []

  for (const ex of executed) {
    messages.push({
      role: 'tool',
      content: JSON.stringify(ex.result.data),
      tool_call_id: ex.toolCall.id,
      name: ex.toolName,
    })
  }

  return messages
}

// ── Full Tool Loop ─────────────────────────────────────

/**
 * Run the complete tool calling loop:
 *   detect → execute → append → ready for re-chat
 *
 * Returns the tool execution result, which includes messages
 * that should be appended before calling llm.chat() again.
 */
export async function runToolLoop(
  response: LLMResponse,
  ctx: ToolExecuteContext,
): Promise<ToolExecutionResult> {
  if (!detectToolCalls(response)) {
    return {
      executed: [],
      toolResultMessages: [],
      hadToolCalls: false,
    }
  }

  const executed = await executeToolCalls(response, ctx)
  const toolResultMessages = appendToolResults(executed)

  return {
    executed,
    toolResultMessages,
    hadToolCalls: true,
  }
}

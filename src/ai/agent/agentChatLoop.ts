/**
 * Agent Chat Loop —— Agent Runtime 执行引擎
 *
 * 这是整个系统的 Agent 核心。
 * 实现了完整的 Tool Calling 闭环：
 *
 *   用户消息
 *     → [LLM REQUEST] llm.chat({ tools })
 *     → [TOOL CALL]   response.tool_calls detected
 *     → [TOOL EXECUTE] executeToolCalls(toolCalls, ctx)
 *     → [TOOL RESULT]  tool output collected
 *     → [RE-CHAT]      llm.chat({ messages + tool results })
 *     → [FINAL ANSWER] final text response
 *
 * OpenAI function calling 和 Claude tool use 的本地实现。
 * 不依赖任何具体 LLM SDK，只依赖 llm.chat() 抽象接口。
 */

import type { LLMResponse, LLMMessage, LLMTool, LLMChatParams } from '../llm/types'
import { chat as llmChat } from '../llm/llmClient'
import { executeToolCalls } from '../tools/executeToolCalls'
import type { ExecutedToolCall } from '../tools/executeToolCalls'
import { appendToolResults } from './toolExecutor'
import type { ToolExecuteContext } from '../tools/types'
import { buildRuntimeContext } from '../context/contextEngine'
import { buildSystemPrompt } from '../prompt/promptBuilder'
import { recordToolResult } from '../memory/toolResultMemory'
import { appendMessage } from '../memory/sessionMemory'
import type { RuntimeContext } from '../context/types'

// ═══════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════

export interface AgentLoopParams {
  /** System prompt. If omitted, auto-built from context via PromptBuilder. */
  system?: string
  /** Available tools (use getToolsForWorkflow() to auto-inject) */
  tools: LLMTool[]
  /** User messages */
  messages: LLMMessage[]
  /** Execution context for tools */
  context: ToolExecuteContext
  /** Max tool calling rounds */
  maxRounds?: number
  /** Pre-built runtime context. If omitted, auto-built from tool context. */
  runtimeContext?: RuntimeContext
}

export interface AgentLoopRound {
  round: number
  response: LLMResponse
  toolExecutions: ExecutedToolCall[]
  hadToolCalls: boolean
}

export interface AgentLoopResult {
  finalResponse: LLMResponse
  rounds: AgentLoopRound[]
  totalRounds: number
  totalToolCalls: number
  totalTime: number
  truncated: boolean
}

// ═══════════════════════════════════════════════════════
// The Loop
// ═══════════════════════════════════════════════════════

export async function agentChatLoop(params: AgentLoopParams): Promise<AgentLoopResult> {
  const t0 = performance.now()
  const { tools, messages, context } = params
  const maxRounds = params.maxRounds || 5

  // ── Auto-build context if not provided ────────────
  const runtimeCtx: RuntimeContext = params.runtimeContext || await buildRuntimeContext({
    classInfo: {
      grade: context.grade,
      currentUnit: context.unit,
      textbook: context.textbook,
      name: context.className,
      studentCount: 42,
    },
  })

  // ── Auto-build system prompt if not provided ──────
  const system = params.system || buildSystemPrompt(runtimeCtx)

  const allMessages: LLMMessage[] = [...messages]
  const rounds: AgentLoopRound[] = []
  let totalToolCalls = 0

  console.log('╔══════════════════════════════════════╗')
  console.log('║  🤖 Agent Chat Loop 启动             ║')
  console.log('╠══════════════════════════════════════╣')
  console.log(`║  Context: ${runtimeCtx.classInfo.grade} · ${runtimeCtx.classInfo.currentUnit}`)
  console.log(`║  Tools  : ${tools.map(t => t.name).join(', ')}`)
  console.log(`║  System : ${params.system ? '(手动)' : '(auto-built from Context Engine)'}`)
  console.log('╚══════════════════════════════════════╝')

  // Record workflow start
  await appendMessage({
    sessionId: runtimeCtx.sessionId,
    type: 'message',
    data: { role: 'system', content: system.substring(0, 200) },
    summary: `Agent Loop 启动 · ${runtimeCtx.classInfo.currentUnit}`,
  })

  for (let round = 1; round <= maxRounds; round++) {
    const isFirstRound = round === 1

    // ── [LLM REQUEST] ──────────────────────────────
    const chatParams: LLMChatParams = { system, messages: allMessages }
    if (isFirstRound && tools.length > 0) {
      chatParams.tools = tools
    }

    console.log(`\n┌─ Round ${round}/${maxRounds} ──────────────────────────────┐`)
    console.log(`│ [LLM REQUEST] messages:${allMessages.length} tools:${chatParams.tools?.length || 0}`)

    const response: LLMResponse = await llmChat(chatParams)

    console.log(`│ [LLM RESPONSE] id:${response.id} model:${response.model} mock:${response.mock}`)
    console.log(`│   content   : ${response.content ? `"${response.content.substring(0, 80)}..."` : '(null)'}`)
    console.log(`│   tool_calls: ${response.tool_calls.length}`)

    // ── Check for tool calls ───────────────────────
    if (response.tool_calls.length === 0) {
      console.log(`│ ✅ [FINAL ANSWER] 无 tool_calls，返回最终结果`)
      console.log(`└──────────────────────────────────────────┘`)
      rounds.push({ round, response, toolExecutions: [], hadToolCalls: false })
      break
    }

    // ── [TOOL CALL] ───────────────────────────────
    for (const tc of response.tool_calls) {
      let args = ''
      try { args = JSON.stringify(JSON.parse(tc.function.arguments)).substring(0, 80) } catch { args = tc.function.arguments.substring(0, 80) }
      console.log(`│ 🔧 [TOOL CALL] → ${tc.function.name}(${args})`)
    }

    // ── [TOOL EXECUTE] + [TOOL RESULT] ────────────
    const execResult = await executeToolCalls(response.tool_calls, context)
    totalToolCalls += execResult.executed.length

    // Record tool results to memory
    for (const ex of execResult.executed) {
      let args: Record<string, unknown> = {}
      try { args = JSON.parse(ex.toolCall.function.arguments) } catch { /* ignore */ }
      await recordToolResult({
        toolName: ex.toolName,
        args,
        result: ex.result.data,
        sessionId: runtimeCtx.sessionId,
        summary: ex.result.summary,
      })
    }

    // ── Append tool results to messages ────────────
    allMessages.push({
      role: 'assistant',
      content: null as unknown as string,
      tool_calls: response.tool_calls,
    })

    const toolMsgs = appendToolResults(
      execResult.executed.map((e) => ({
        toolCall: e.toolCall,
        result: e.result,
        toolName: e.toolName,
      })),
    )
    allMessages.push(...toolMsgs)

    console.log(`│ 📎 [RE-CHAT] 已追加 ${toolMsgs.length} 条 tool result，总消息: ${allMessages.length}`)
    console.log(`└──────────────────────────────────────────┘`)

    rounds.push({ round, response, toolExecutions: execResult.executed, hadToolCalls: true })
  }

  const totalTime = Math.round(performance.now() - t0)
  const finalRound = rounds[rounds.length - 1]
  const truncated = rounds.length >= maxRounds && finalRound.hadToolCalls

  console.log(`\n╔══════════════════════════════════════════╗`)
  console.log(`║  🏁 Agent Loop 完成                      ║`)
  console.log(`╠══════════════════════════════════════════╣`)
  console.log(`║  Rounds   : ${rounds.length}  |  Tool Calls: ${totalToolCalls}  |  Time: ${totalTime}ms`)
  console.log(`║  Final    : ${finalRound.response.content ? `"${finalRound.response.content.substring(0, 60)}..."` : '(tool calls only)'}`)
  console.log(`╚══════════════════════════════════════════╝\n`)

  return {
    finalResponse: finalRound.response,
    rounds,
    totalRounds: rounds.length,
    totalToolCalls,
    totalTime,
    truncated,
  }
}

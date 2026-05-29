/**
 * Mock LLM Provider (v2 — full tool calling simulation)
 *
 * 模拟真实 LLM 的 tool calling 行为：
 *   1. 首次调用 + tools → 返回 tool_calls（挑匹配度最高的 tool）
 *   2. 收到 tool result 后的 follow-up → 返回最终文本答案
 *
 * 这使得整个 workflow → llm.chat() → tool_calls → execute → re-chat → answer
 * 链路在 mock 模式下完全可跑通。
 */

import type { LLMProvider, LLMChatParams, LLMResponse, LLMToolCall } from './types'

// ── Import vocab tools (side-effect: registers them) ──
import '../tools/vocabTools'

// ── State ──────────────────────────────────────────────

let callCounter = 0

// ── Mock Provider ──────────────────────────────────────

export const mockProvider: LLMProvider = {
  name: 'mock',
  model: 'mock-gpt-4o-2026',

  async chat(params: LLMChatParams): Promise<LLMResponse> {
    await sleep(200 + Math.random() * 500)
    callCounter++

    // ── Path A: Follow-up after tool results ──────────
    if (hasToolResults(params)) {
      return buildFinalAnswer(params, callCounter)
    }

    // ── Path B: First call WITH tools → return tool_calls ──
    if (params.tools && params.tools.length > 0) {
      return buildToolCallResponse(params, callCounter)
    }

    // ── Path C: Plain text / structured JSON ──────────
    if (params.responseFormat?.type === 'json_object') {
      return structuredResponse(params, callCounter)
    }

    return textResponse(params, callCounter)
  },
}

// ── Tool Result Detection ──────────────────────────────

/**
 * Detect if this call is a follow-up after tool execution.
 * Look for messages with role='tool' — that means tools were already called.
 */
function hasToolResults(params: LLMChatParams): boolean {
  return params.messages.some((m) => m.role === 'tool' && m.tool_call_id)
}

// ── Tool Call Response (Round 1) ──────────────────────

function buildToolCallResponse(params: LLMChatParams, counter: number): LLMResponse {
  const tools = params.tools!

  // Pick the first tool (in real LLM, this would be based on intent matching)
  const selectedTool = tools[0]

  // Build plausible arguments from the user message
  const userMsg = params.messages.find((m) => m.role === 'user')
  const args = buildToolArgs(selectedTool.name, userMsg?.content || params.system, params)

  const toolCall: LLMToolCall = {
    id: `call_mock_${counter}_${Date.now()}`,
    type: 'function',
    function: {
      name: selectedTool.name,
      arguments: JSON.stringify(args),
    },
  }

  return {
    id: `mock-resp-${counter}`,
    model: 'mock-gpt-4o-2026',
    content: null, // tool calls have null content
    tool_calls: [toolCall],
    usage: { promptTokens: 150, completionTokens: 40, totalTokens: 190 },
    provider: 'mock',
    mock: true,
  }
}

/**
 * Build realistic-looking tool arguments based on the tool name and context.
 * This simulates what a real LLM would extract from the user's query.
 */
function buildToolArgs(toolName: string, userContent: string, _params: LLMChatParams): Record<string, unknown> {
  const gradePattern = /(七|八|九|高一|高二|高三)[年級]?\s*[上下]/g
  const unitPattern = /[Uu]nit\s*(\d+)|第([一二三四五六七八九十\d]+)单元/g
  const numPattern = /(\d+)\s*(个|道|题|篇|词)/g
  const modePattern = /(英译中|中译英|混合|听音|听写|默写)/g

  const grade = userContent.match(gradePattern)?.[0] || null
  const unitMatch = unitPattern.exec(userContent)
  const unit = unitMatch ? `Unit ${unitMatch[1] || unitMatch[2]}` : null
  const numMatch = numPattern.exec(userContent)
  const quantity = numMatch ? parseInt(numMatch[1]) : null
  const modeMatch = modePattern.exec(userContent)
  const mode = modeMatch ? normalizeMode(modeMatch[1]) : null

  switch (toolName) {
    case 'get_unit_vocabulary':
      return {
        unit: unit || 'Unit 3',
        grade: grade || '七年级上',
        textbook: '人教版',
      }

    case 'filter_difficulty':
      return {
        words: [], // Will be populated from previous context in real LLM
        quantity: quantity || 10,
        difficulty: 'all',
        onlyCore: userContent.includes('核心') || userContent.includes('重点'),
        onlyZhongkao: userContent.includes('中考'),
        sortBy: 'frequency',
      }

    case 'generate_dictation':
      return {
        words: [],
        mode: mode || 'cn_to_en',
        totalScore: 100,
        includeAnswers: true,
      }

    default:
      return { query: userContent }
  }
}

function normalizeMode(input: string): string {
  if (input.includes('英译中') || input.includes('英翻中')) return 'en_to_cn'
  if (input.includes('中译英') || input.includes('中翻英')) return 'cn_to_en'
  if (input.includes('听音') || input.includes('听写')) return 'listen_spell'
  if (input.includes('混合')) return 'mixed'
  return 'cn_to_en'
}

// ── Final Answer (Round 2) ─────────────────────────────

/**
 * After tools have been executed and results appended to messages,
 * the model generates a final natural-language answer.
 */
function buildFinalAnswer(params: LLMChatParams, counter: number): LLMResponse {
  // Extract tool results from messages
  const toolMsgs = params.messages.filter((m) => m.role === 'tool')
  const toolOutputs = toolMsgs.map((m) => {
    try { return JSON.parse(m.content) } catch { return m.content }
  })

  // Build a coherent answer based on what tools returned
  const answer = synthesizeAnswer(params.system, toolOutputs)

  return {
    id: `mock-resp-${counter}`,
    model: 'mock-gpt-4o-2026',
    content: answer,
    tool_calls: [],
    usage: { promptTokens: 200, completionTokens: 80, totalTokens: 280 },
    provider: 'mock',
    mock: true,
  }
}

function synthesizeAnswer(system: string, toolOutputs: unknown[]): string {
  // Build a context-aware final answer from tool results
  const parts: string[] = []

  for (const output of toolOutputs) {
    if (typeof output !== 'object' || !output) continue
    const data = output as Record<string, unknown>

    if (data.totalWords !== undefined) {
      parts.push(`已获取${data.totalWords}个词汇`)
    }
    if (data.selectedCount !== undefined) {
      parts.push(`筛选出${data.selectedCount}个重点词`)
    }
    if (data.items && Array.isArray(data.items)) {
      const items = data.items as Array<Record<string, unknown>>
      parts.push(`已生成${items.length}道默写题目`)
      // List first few items
      const preview = items.slice(0, 3).map((it: Record<string, unknown>) =>
        `${it.index}. ${it.prompt} → ${it.answer}`
      ).join('；')
      parts.push(`预览：${preview}`)
    }
    if (data.mode) {
      parts.push(`默写模式：${data.mode}`)
    }
    if (data.estimatedDuration) {
      parts.push(`预计用时：${data.estimatedDuration}`)
    }
  }

  if (parts.length === 0) {
    if (system.includes('vocabulary') || system.includes('词汇')) {
      return '词汇默写已生成完毕。包含中译英、英译中和混合模式，满分100分，可直接打印使用。建议完成后留2分钟互批时间。'
    }
    return '任务已完成。'
  }

  return parts.join('。') + '。建议打印后预留5分钟完成 + 2分钟互批。'
}

// ── Plain Text / JSON (no tools) ──────────────────────

function textResponse(_params: LLMChatParams, counter: number): LLMResponse {
  return {
    id: `mock-resp-${counter}`,
    model: 'mock-gpt-4o-2026',
    content: '已完成。',
    tool_calls: [],
    usage: { promptTokens: 50, completionTokens: 10, totalTokens: 60 },
    provider: 'mock',
    mock: true,
  }
}

function structuredResponse(_params: LLMChatParams, counter: number): LLMResponse {
  return {
    id: `mock-resp-${counter}`,
    model: 'mock-gpt-4o-2026',
    content: JSON.stringify({ result: 'ok', timestamp: Date.now() }),
    tool_calls: [],
    usage: { promptTokens: 50, completionTokens: 20, totalTokens: 70 },
    provider: 'mock',
    mock: true,
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

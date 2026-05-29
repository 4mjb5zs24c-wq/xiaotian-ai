/**
 * OpenAI Provider Adapter
 *
 * 将统一 LLMChatParams 转换为 OpenAI Chat Completions API 格式，
 * 并将 OpenAI 响应转换回统一 LLMResponse。
 *
 * OpenAI 格式完全不会泄露到 workflow / agent / tool 层。
 *
 * 启用方式：
 *   1. 在 .env 中设置 OPENAI_API_KEY=sk-...
 *   2. import { openaiProvider } from './openaiProvider'
 *   3. switchProvider('openai')
 */

import type { LLMProvider, LLMChatParams, LLMResponse, LLMToolCall } from './types'
import { registerProvider } from './providerManager'

// ── Config ─────────────────────────────────────────────

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || ''

const OPENAI_BASE_URL = 'https://api.openai.com/v1'

// ── Format Converters ──────────────────────────────────

/**
 * Convert unified LLMTool[] → OpenAI tools format.
 *
 * Unified:
 *   { name, description, parameters: { type, properties, required } }
 *
 * OpenAI:
 *   { type: "function", function: { name, description, parameters } }
 */
function toOpenAITools(tools: LLMChatParams['tools']) {
  if (!tools) return undefined
  return tools.map((t) => ({
    type: 'function' as const,
    function: {
      name: t.name,
      description: t.description,
      parameters: t.parameters,
    },
  }))
}

/**
 * Convert OpenAI response → Unified LLMResponse.
 *
 * OpenAI:
 *   { choices: [{ message: { content, tool_calls } }], usage }
 *
 * Unified:
 *   { content, tool_calls: [...], usage: { promptTokens, completionTokens, totalTokens } }
 */
function fromOpenAIResponse(raw: Record<string, unknown>): LLMResponse {
  const choice = (raw.choices as Array<Record<string, unknown>>)?.[0] || {}
  const message = (choice.message as Record<string, unknown>) || {}
  const usage = (raw.usage as Record<string, number>) || {}

  const toolCalls: LLMToolCall[] = ((message.tool_calls as Array<Record<string, unknown>>) || []).map(
    (tc) => ({
      id: tc.id as string,
      type: 'function' as const,
      function: {
        name: ((tc.function as Record<string, unknown>)?.name as string) || '',
        arguments: ((tc.function as Record<string, unknown>)?.arguments as string) || '{}',
      },
    }),
  )

  return {
    id: raw.id as string,
    model: raw.model as string,
    content: (message.content as string) || null,
    tool_calls: toolCalls,
    usage: {
      promptTokens: usage.prompt_tokens || 0,
      completionTokens: usage.completion_tokens || 0,
      totalTokens: usage.total_tokens || 0,
    },
    provider: 'openai',
    mock: false,
  }
}

// ── Provider ───────────────────────────────────────────

export const openaiProvider: LLMProvider = {
  name: 'openai',
  model: 'gpt-4o',

  async chat(params: LLMChatParams): Promise<LLMResponse> {
    // ── If no API key, fall back to mock ──────────────
    if (!OPENAI_API_KEY) {
      console.warn('[openai] OPENAI_API_KEY 未设置，回退到 mock 模式')
      return openaiMockChat(params)
    }

    // ── Real API call ─────────────────────────────────
    const body: Record<string, unknown> = {
      model: this.model,
      messages: [
        { role: 'system', content: params.system },
        ...params.messages.map((m) => ({
          role: m.role,
          content: m.content,
          ...(m.tool_calls ? { tool_calls: m.tool_calls } : {}),
          ...(m.tool_call_id ? { tool_call_id: m.tool_call_id } : {}),
          ...(m.name ? { name: m.name } : {}),
        })),
      ],
      temperature: params.temperature ?? 0.7,
    }

    const tools = toOpenAITools(params.tools)
    if (tools) body.tools = tools
    if (params.toolChoice) body.tool_choice = params.toolChoice
    if (params.maxTokens) body.max_tokens = params.maxTokens
    if (params.responseFormat) body.response_format = params.responseFormat

    try {
      const res = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const err = await res.text()
        throw new Error(`OpenAI API error ${res.status}: ${err}`)
      }

      const raw: Record<string, unknown> = await res.json()
      return fromOpenAIResponse(raw)
    } catch (err) {
      console.error('[openai] API 调用失败，回退到 mock:', err)
      return openaiMockChat(params)
    }
  },
}

// ── Mock fallback (当 API key 未配置时) ─────────────────
// 结构与真实 OpenAI 返回一致，但数据来自本地 mock

async function openaiMockChat(params: LLMChatParams): Promise<LLMResponse> {
  await sleep(200)

  // Simulate tool calling if tools are provided
  if (params.tools && params.tools.length > 0) {
    const tool = params.tools[0]
    const userMsg = params.messages.find((m) => m.role === 'user')
    const args = { query: userMsg?.content || '' }

    return {
      id: `openai-mock-${Date.now()}`,
      model: 'gpt-4o (mock)',
      content: null,
      tool_calls: [
        {
          id: `call_${Date.now()}`,
          type: 'function',
          function: {
            name: tool.name,
            arguments: JSON.stringify(args),
          },
        },
      ],
      usage: { promptTokens: 120, completionTokens: 30, totalTokens: 150 },
      provider: 'openai',
      mock: true,
    }
  }

  return {
    id: `openai-mock-${Date.now()}`,
    model: 'gpt-4o (mock)',
    content: '已完成。(OpenAI provider — mock 模式，设置 OPENAI_API_KEY 以启用真实调用)',
    tool_calls: [],
    usage: { promptTokens: 50, completionTokens: 15, totalTokens: 65 },
    provider: 'openai',
    mock: true,
  }
}

// ── Register ───────────────────────────────────────────

registerProvider('openai', openaiProvider)

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

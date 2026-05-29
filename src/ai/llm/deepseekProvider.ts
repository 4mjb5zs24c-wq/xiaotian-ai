/**
 * DeepSeek Provider Adapter
 *
 * DeepSeek API 与 OpenAI Chat Completions API 兼容，
 * 因此复用 openaiProvider 的格式转换逻辑。
 *
 * 唯一差异：base URL 和 model 名称。
 *
 * 启用方式：
 *   1. 在 .env 中设置 DEEPSEEK_API_KEY=sk-...
 *   2. import { deepseekProvider } from './deepseekProvider'
 *   3. switchProvider('deepseek')
 */

import type { LLMProvider, LLMChatParams, LLMResponse, LLMToolCall } from './types'
import { registerProvider } from './providerManager'

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || ''

const DEEPSEEK_BASE_URL = 'https://api.deepseek.com/v1'

// ── Format converters (same logic as OpenAI, different endpoint) ──

function toDeepSeekTools(tools: LLMChatParams['tools']) {
  if (!tools) return undefined
  return tools.map((t) => ({
    type: 'function' as const,
    function: { name: t.name, description: t.description, parameters: t.parameters },
  }))
}

function fromDeepSeekResponse(raw: Record<string, unknown>): LLMResponse {
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
    provider: 'deepseek',
    mock: false,
  }
}

// ── Provider ───────────────────────────────────────────

export const deepseekProvider: LLMProvider = {
  name: 'deepseek',
  model: 'deepseek-chat',

  async chat(params: LLMChatParams): Promise<LLMResponse> {
    if (!DEEPSEEK_API_KEY) {
      console.warn('[deepseek] DEEPSEEK_API_KEY 未设置，回退到 mock 模式')
      return deepseekMockChat(params)
    }

    const body: Record<string, unknown> = {
      model: this.model,
      messages: [
        { role: 'system', content: params.system },
        ...params.messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      temperature: params.temperature ?? 0.7,
    }

    const tools = toDeepSeekTools(params.tools)
    if (tools) body.tools = tools
    if (params.maxTokens) body.max_tokens = params.maxTokens

    try {
      const res = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const err = await res.text()
        throw new Error(`DeepSeek API error ${res.status}: ${err}`)
      }

      const raw: Record<string, unknown> = await res.json()
      return fromDeepSeekResponse(raw)
    } catch (err) {
      console.error('[deepseek] API 调用失败，回退到 mock:', err)
      return deepseekMockChat(params)
    }
  },
}

// ── Mock fallback ──────────────────────────────────────

async function deepseekMockChat(params: LLMChatParams): Promise<LLMResponse> {
  await sleep(200)

  if (params.tools && params.tools.length > 0) {
    const tool = params.tools[0]
    return {
      id: `deepseek-mock-${Date.now()}`,
      model: 'deepseek-chat (mock)',
      content: null,
      tool_calls: [{
        id: `call_${Date.now()}`,
        type: 'function',
        function: {
          name: tool.name,
          arguments: JSON.stringify({ query: params.messages.find((m) => m.role === 'user')?.content || '' }),
        },
      }],
      usage: { promptTokens: 100, completionTokens: 20, totalTokens: 120 },
      provider: 'deepseek',
      mock: true,
    }
  }

  return {
    id: `deepseek-mock-${Date.now()}`,
    model: 'deepseek-chat (mock)',
    content: '已完成。(DeepSeek provider — mock 模式，设置 DEEPSEEK_API_KEY 以启用真实调用)',
    tool_calls: [],
    usage: { promptTokens: 30, completionTokens: 10, totalTokens: 40 },
    provider: 'deepseek',
    mock: true,
  }
}

registerProvider('deepseek', deepseekProvider)

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

/**
 * Claude Provider Adapter (Anthropic Messages API)
 *
 * 将统一 LLMChatParams 转换为 Anthropic Messages API 格式，
 * 并将 Claude 响应转换回统一 LLMResponse。
 *
 * Claude 的 tool_use 格式与 OpenAI 的 tool_calls 不同，
 * 此 adapter 负责全部转换。
 *
 * 启用方式：
 *   1. 在 .env 中设置 ANTHROPIC_API_KEY=sk-ant-...
 *   2. import { claudeProvider } from './claudeProvider'
 *   3. switchProvider('claude')
 */

import type { LLMProvider, LLMChatParams, LLMResponse, LLMToolCall } from './types'
import { registerProvider } from './providerManager'

const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY || ''

const ANTHROPIC_BASE_URL = 'https://api.anthropic.com/v1'

// ── Format Converters ──────────────────────────────────

/**
 * Convert unified LLMTool[] → Claude tools format.
 *
 * Unified:
 *   { name, description, parameters: { type, properties, required } }
 *
 * Claude:
 *   { name, description, input_schema: { type, properties, required } }
 */
function toClaudeTools(tools: LLMChatParams['tools']) {
  if (!tools) return undefined
  return tools.map((t) => ({
    name: t.name,
    description: t.description,
    input_schema: t.parameters,
  }))
}

/**
 * Convert unified messages → Claude messages format.
 *
 * Key differences from OpenAI:
 *   - system is a top-level param, not a message role
 *   - tool results become { role: "user", content: [{ type: "tool_result", ... }] }
 */
function toClaudeMessages(messages: LLMChatParams['messages']) {
  return messages.map((m) => {
    // Assistant with tool_calls → Claude assistant + tool_use blocks
    if (m.role === 'assistant' && m.tool_calls && m.tool_calls.length > 0) {
      return {
        role: 'assistant',
        content: m.tool_calls.map((tc) => ({
          type: 'tool_use' as const,
          id: tc.id,
          name: tc.function.name,
          input: JSON.parse(tc.function.arguments || '{}'),
        })),
      }
    }

    // Tool result → Claude user message with tool_result blocks
    if (m.role === 'tool' && m.tool_call_id) {
      return {
        role: 'user' as const,
        content: [
          {
            type: 'tool_result' as const,
            tool_use_id: m.tool_call_id,
            content: m.content,
          },
        ],
      }
    }

    // Regular messages
    return {
      role: m.role === 'system' ? 'user' : m.role,
      content: m.content,
    }
  })
}

/**
 * Convert Claude response → Unified LLMResponse.
 *
 * Claude:
 *   { content: [{ type: "text", text }, { type: "tool_use", ... }], usage }
 *
 * Unified:
 *   { content: string, tool_calls: LLMToolCall[] }
 */
function fromClaudeResponse(raw: Record<string, unknown>): LLMResponse {
  const contentBlocks = (raw.content as Array<Record<string, unknown>>) || []
  const usage = (raw.usage as Record<string, number>) || {}

  // Extract text from text blocks
  const textBlock = contentBlocks.find((b) => b.type === 'text')
  const content = (textBlock?.text as string) || null

  // Extract tool_use from tool_use blocks
  const toolCalls: LLMToolCall[] = contentBlocks
    .filter((b) => b.type === 'tool_use')
    .map((b) => ({
      id: (b.id as string) || `claude-tc-${Date.now()}`,
      type: 'function' as const,
      function: {
        name: (b.name as string) || '',
        arguments: JSON.stringify(b.input || {}),
      },
    }))

  return {
    id: (raw.id as string) || `claude-${Date.now()}`,
    model: (raw.model as string) || 'claude-sonnet-4-20250514',
    content,
    tool_calls: toolCalls,
    usage: {
      promptTokens: usage.input_tokens || 0,
      completionTokens: usage.output_tokens || 0,
      totalTokens: (usage.input_tokens || 0) + (usage.output_tokens || 0),
    },
    provider: 'claude',
    mock: false,
  }
}

// ── Provider ───────────────────────────────────────────

export const claudeProvider: LLMProvider = {
  name: 'claude',
  model: 'claude-sonnet-4-20250514',

  async chat(params: LLMChatParams): Promise<LLMResponse> {
    if (!ANTHROPIC_API_KEY) {
      console.warn('[claude] ANTHROPIC_API_KEY 未设置，回退到 mock 模式')
      return claudeMockChat(params)
    }

    const tools = toClaudeTools(params.tools)
    const messages = toClaudeMessages(params.messages)

    const body: Record<string, unknown> = {
      model: this.model,
      max_tokens: params.maxTokens || 4096,
      system: params.system,
      messages,
      temperature: params.temperature ?? 0.7,
    }

    if (tools) body.tools = tools

    try {
      const res = await fetch(`${ANTHROPIC_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const err = await res.text()
        throw new Error(`Claude API error ${res.status}: ${err}`)
      }

      const raw: Record<string, unknown> = await res.json()
      return fromClaudeResponse(raw)
    } catch (err) {
      console.error('[claude] API 调用失败，回退到 mock:', err)
      return claudeMockChat(params)
    }
  },
}

// ── Mock fallback ──────────────────────────────────────

async function claudeMockChat(params: LLMChatParams): Promise<LLMResponse> {
  await sleep(200)

  if (params.tools && params.tools.length > 0) {
    const tool = params.tools[0]
    return {
      id: `claude-mock-${Date.now()}`,
      model: 'claude-sonnet-4-20250514 (mock)',
      content: null,
      tool_calls: [
        {
          id: `toolu_${Date.now()}`,
          type: 'function',
          function: {
            name: tool.name,
            arguments: JSON.stringify({ query: params.messages.find((m) => m.role === 'user')?.content || '' }),
          },
        },
      ],
      usage: { promptTokens: 100, completionTokens: 25, totalTokens: 125 },
      provider: 'claude',
      mock: true,
    }
  }

  return {
    id: `claude-mock-${Date.now()}`,
    model: 'claude-sonnet-4-20250514 (mock)',
    content: '已完成。(Claude provider — mock 模式，设置 ANTHROPIC_API_KEY 以启用真实调用)',
    tool_calls: [],
    usage: { promptTokens: 50, completionTokens: 15, totalTokens: 65 },
    provider: 'claude',
    mock: true,
  }
}

registerProvider('claude', claudeProvider)

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

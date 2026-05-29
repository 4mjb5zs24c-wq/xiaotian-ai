// ── Core Message Types ─────────────────────────────────
// 与 OpenAI Chat Completion API 对齐，跨厂商通用

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant' | 'tool'
  content: string
  /** Tool call ID — used when role='tool' */
  tool_call_id?: string
  /** Tool calls the assistant requested */
  tool_calls?: LLMToolCall[]
  /** Name of the tool/function */
  name?: string
}

// ── Tool Definition ────────────────────────────────────
// 结构对齐 OpenAI function calling，跨厂商通用

export interface LLMTool {
  /** Unique tool name, e.g. "filter_vocabulary" */
  name: string
  /** Human-readable description — used by LLM to decide when to call */
  description: string
  /** JSON Schema for the tool's parameters */
  parameters: LLMToolParameters
}

export interface LLMToolParameters {
  type: 'object'
  properties: Record<string, LLMToolProperty>
  required: string[]
}

export interface LLMToolProperty {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object'
  description: string
  enum?: string[]
  items?: { type: string }
}

// ── Tool Call (assistant → tool) ──────────────────────

export interface LLMToolCall {
  id: string
  type: 'function'
  function: {
    name: string
    arguments: string // JSON string
  }
}

// ── LLM Response ───────────────────────────────────────

export interface LLMResponse {
  /** Unique response ID */
  id: string
  /** The model that produced this response */
  model: string
  /** Text content — null if only tool calls */
  content: string | null
  /** Tool calls the model wants to make */
  tool_calls: LLMToolCall[]
  /** Token usage */
  usage?: LLMUsage
  /** Provider metadata */
  provider: string
  /** Whether this was served from mock */
  mock: boolean
}

export interface LLMUsage {
  promptTokens: number
  completionTokens: number
  totalTokens: number
}

// ── Chat Parameters ────────────────────────────────────

export interface LLMChatParams {
  /** System prompt */
  system: string
  /** Conversation messages */
  messages: LLMMessage[]
  /** Available tools */
  tools?: LLMTool[]
  /** Temperature 0-2 */
  temperature?: number
  /** Max tokens in response */
  maxTokens?: number
  /** Force a specific tool call */
  toolChoice?: 'auto' | 'none' | { type: 'function'; function: { name: string } }
  /** Structured output JSON schema */
  responseFormat?: {
    type: 'json_object' | 'json_schema'
    json_schema?: {
      name: string
      schema: Record<string, unknown>
    }
  }
}

// ── Provider Interface ─────────────────────────────────
// THE contract. Every provider implements this.
// Swap mock ↔ OpenAI ↔ Claude by changing ONE line.

export interface LLMProvider {
  /** Provider identifier */
  readonly name: string
  /** The model being used */
  readonly model: string

  /**
   * Send a chat completion request.
   *
   * @returns LLMResponse with content and/or tool_calls
   */
  chat(params: LLMChatParams): Promise<LLMResponse>
}

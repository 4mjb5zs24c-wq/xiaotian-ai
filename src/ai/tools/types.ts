// ── Tool Definition ────────────────────────────────────
// 与 OpenAI function calling 和 Claude tool use 同时对齐。
// 一个 ToolDefinition 可以同时映射到两个厂商的 tool schema。

export interface ToolDefinition {
  /** Unique tool name, e.g. "get_unit_vocabulary" */
  name: string

  /** Human-readable description. LLM uses this to decide when to call. */
  description: string

  /** JSON Schema for parameters (OpenAI / Claude compatible) */
  parameters: ToolParameters

  /** The actual implementation. Returns structured data. */
  execute: (ctx: ToolExecuteContext, args: Record<string, unknown>) => Promise<ToolResult>
}

export interface ToolParameters {
  type: 'object'
  properties: Record<string, ToolProperty>
  required: string[]
}

export interface ToolProperty {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object'
  description: string
  enum?: string[]
  items?: { type: string }
  /** For object-typed properties */
  properties?: Record<string, ToolProperty>
}

// ── Execution Context ──────────────────────────────────

export interface ToolExecuteContext {
  /** Workflow run ID */
  runId: string
  /** Teacher context */
  textbook: string
  unit: string
  grade: string
  className: string
  /** Previous step results (for cross-step data access) */
  previousResults: Record<string, unknown>
}

// ── Tool Result ────────────────────────────────────────

export interface ToolResult {
  /** Whether execution succeeded */
  success: boolean
  /** Structured output data */
  data: Record<string, unknown>
  /** Human-readable summary (for step display) */
  summary: string
  /** If failed, the error message */
  error?: string
}

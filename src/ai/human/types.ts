/**
 * Human-in-the-Loop — Type Definitions
 *
 * AI 请求老师介入的类型系统。
 * Agent 返回 need_human → Orchestrator 暂停 → 老师决策 → 继续执行。
 */

// ── Request ────────────────────────────────────────────

export interface HumanInteractionRequest {
  /** Unique request ID */
  id: string
  /** Interaction type */
  type: HumanInteractionType
  /** Title shown to the teacher */
  title: string
  /** Detailed description */
  description: string
  /** The data being reviewed (e.g. generated words, plan options) */
  payload: unknown
  /** Options for 'select' type */
  options?: HumanOption[]
  /** Whether this interaction is required (can't skip) */
  required: boolean
  /** Which agent requested this */
  sourceAgent: string
  /** Timestamp */
  createdAt: number
  /** Timeout in ms (0 = no timeout) */
  timeout: number
}

export type HumanInteractionType =
  | 'confirm'   // Yes/No confirmation
  | 'select'    // Choose from options
  | 'edit'      // Edit AI-generated content
  | 'approval'  // Approve before proceeding
  | 'input'     // Teacher provides custom input

export interface HumanOption {
  id: string
  label: string
  description: string
  /** Data associated with this option */
  data?: unknown
}

// ── Response ───────────────────────────────────────────

export interface HumanInteractionResponse {
  /** Matching request ID */
  requestId: string
  /** Action taken */
  action: 'approve' | 'reject' | 'edit' | 'select' | 'skip'
  /** Selected option (for 'select' type) */
  selectedOption?: string
  /** Edited payload (for 'edit' type) */
  editedPayload?: unknown
  /** Teacher's comment */
  comment?: string
  /** Timestamp */
  respondedAt: number
}

// ── Pending Request State ──────────────────────────────

export interface PendingRequest {
  request: HumanInteractionRequest
  /** Promise that resolves when teacher responds */
  promise: Promise<HumanInteractionResponse>
  /** Resolve function — called by UI */
  resolve: (response: HumanInteractionResponse) => void
  /** Reject function — called on timeout */
  reject: (error: Error) => void
}

/**
 * Human Event Bus —— 人工介入事件总线
 *
 * 核心机制：requestInteraction() 返回 Promise，
 * 在老师响应之前，workflow 暂停等待。
 *
 * 用法：
 *   // Agent 请求人工介入
 *   const response = await requestInteraction({ type: 'confirm', ... })
 *   // → workflow 暂停，UI 弹出 HumanReviewPanel
 *   // → 老师点击 approve / reject
 *   // → Promise resolve，workflow 继续执行
 */

import type {
  HumanInteractionRequest,
  HumanInteractionResponse,
  PendingRequest,
} from './types'

// ── State ──────────────────────────────────────────────

let idCounter = 0

/** Currently pending requests awaiting teacher response */
const pendingRequests = new Map<string, PendingRequest>()

/** Callback: fired when a new request arrives (for UI to react) */
let onNewRequest: ((req: HumanInteractionRequest) => void) | null = null

/** Callback: fired when a request is resolved */
let onRequestResolved: ((reqId: string) => void) | null = null

// ── Subscriptions (for UI) ─────────────────────────────

export function subscribeToRequests(
  onNew: (req: HumanInteractionRequest) => void,
  onResolved: (reqId: string) => void,
) {
  onNewRequest = onNew
  onRequestResolved = onResolved
  return () => { onNewRequest = null; onRequestResolved = null }
}

// ── Request ────────────────────────────────────────────

/**
 * Request teacher interaction. Returns a Promise that resolves
 * when the teacher responds (or rejects on timeout).
 *
 * This is THE function that pauses workflow execution.
 */
export function requestInteraction(params: {
  type: HumanInteractionRequest['type']
  title: string
  description: string
  payload?: unknown
  options?: HumanInteractionRequest['options']
  required?: boolean
  timeout?: number
  sourceAgent: string
}): Promise<HumanInteractionResponse> {
  const id = `human-${Date.now()}-${++idCounter}`

  const request: HumanInteractionRequest = {
    id,
    type: params.type,
    title: params.title,
    description: params.description,
    payload: params.payload || null,
    options: params.options || [],
    required: params.required !== false,
    sourceAgent: params.sourceAgent,
    createdAt: Date.now(),
    timeout: params.timeout || 0,
  }

  let resolve: (response: HumanInteractionResponse) => void
  let reject: (error: Error) => void

  const promise = new Promise<HumanInteractionResponse>((res, rej) => {
    resolve = res
    reject = rej
  })

  const pending: PendingRequest = {
    request,
    promise,
    resolve: resolve!,
    reject: reject!,
  }

  pendingRequests.set(id, pending)

  // Timeout
  const timeoutMs = params.timeout || 120000 // default 2 minutes
  if (timeoutMs > 0) {
    setTimeout(() => {
      if (pendingRequests.has(id)) {
        pendingRequests.delete(id)
        reject!(new Error(`Human interaction timed out after ${timeoutMs}ms`))
      }
    }, timeoutMs)
  }

  // Notify UI
  onNewRequest?.(request)

  console.log(`  👩‍🏫 [Human] 请求老师介入: ${params.type} — "${params.title}"`)

  return promise
}

// ── Response ───────────────────────────────────────────

/**
 * Teacher responds to a pending request. Called by UI.
 * Resolves the waiting Promise so workflow continues.
 */
export function resolveInteraction(
  requestId: string,
  response: Omit<HumanInteractionResponse, 'requestId' | 'respondedAt'>,
): boolean {
  const pending = pendingRequests.get(requestId)
  if (!pending) {
    console.warn(`[Human] No pending request found for id: ${requestId}`)
    return false
  }

  const fullResponse: HumanInteractionResponse = {
    ...response,
    requestId,
    respondedAt: Date.now(),
  }

  pending.resolve(fullResponse)
  pendingRequests.delete(requestId)
  onRequestResolved?.(requestId)

  console.log(`  👩‍🏫 [Human] 老师响应: ${response.action} — request: ${requestId}`)

  return true
}

// ── Query ──────────────────────────────────────────────

export function getPendingRequests(): HumanInteractionRequest[] {
  return Array.from(pendingRequests.values()).map((p) => p.request)
}

export function hasPendingRequests(): boolean {
  return pendingRequests.size > 0
}

export function getPendingRequest(id: string): HumanInteractionRequest | undefined {
  return pendingRequests.get(id)?.request
}

export function cancelRequest(id: string): boolean {
  const pending = pendingRequests.get(id)
  if (!pending) return false
  pending.reject(new Error('Request cancelled by teacher'))
  pendingRequests.delete(id)
  onRequestResolved?.(id)
  return true
}

export function cancelAll() {
  for (const [id, pending] of pendingRequests) {
    pending.reject(new Error('All requests cancelled'))
    pendingRequests.delete(id)
    onRequestResolved?.(id)
  }
}

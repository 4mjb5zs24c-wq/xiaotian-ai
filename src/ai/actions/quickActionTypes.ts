/**
 * Quick Action Types — 快捷操作统一类型
 *
 * Used by: HomePage quick actions, AI SearchPage quick actions,
 *          insight recommended actions (bridge).
 *
 * All data is configuration-only in V1; execution is mock.
 */

// ── Category ──────────────────────────────────────────────

export type QuickActionCategory =
  | 'vocab'
  | 'resource'
  | 'paper'
  | 'card'
  | 'writing'
  | 'listening_speaking'
  | 'exam'
  | 'report'

// ── Action Type (behavioral dispatch) ────────────────────

export type QuickActionType =
  | 'search_autorun'
  | 'generated_content'
  | 'open_panel'
  | 'assign'
  | 'add_to_basket'
  | 'mock'

// ── Source (for tracking / analytics) ────────────────────

export type QuickActionSource =
  | 'homepage_quick_action'
  | 'ai_search_quick_action'
  | 'ai_search_suggestion'
  | 'ai_search_recent'
  | 'homepage_input'
  | 'insight_action'
  | 'drawer_action'

// ── QuickAction Definition ────────────────────────────────

export interface QuickAction {
  actionId: string
  label: string
  description?: string
  icon?: string
  category: QuickActionCategory
  source: QuickActionSource
  actionType: QuickActionType
  /** Search query (for search_autorun) */
  query?: string
  /** Workflow ID (for generated_content) */
  workflowId?: string
  /** Panel name (for open_panel) */
  targetPanel?: string
  /** Assignment type (for assign) */
  assignmentType?: string
  /** Basket item (for add_to_basket) */
  requiresConfirm: boolean
  /** Extra payload */
  payload?: Record<string, string>
}

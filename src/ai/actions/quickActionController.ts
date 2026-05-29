/**
 * Quick Action Controller — 快捷操作统一分发
 *
 * HomePage quick actions, AI SearchPage quick actions, and tag suggestions
 * all route through this controller.
 *
 * Rule: Pages must NOT hand-write navigate logic.
 *        They call handleQuickAction() and get a URL or panel instruction back.
 */

import { getQuickAction } from './quickActionMap'
import type { QuickAction, QuickActionSource } from './quickActionTypes'

// ── Action Result ─────────────────────────────────────────

export type QuickActionResultType = 'navigate' | 'open_panel' | 'show_toast' | 'none'

export interface QuickActionResult {
  type: QuickActionResultType
  url?: string
  panel?: string
  panelData?: Record<string, unknown>
  toastMessage?: string
}

// ── Context ───────────────────────────────────────────────

export interface QuickActionContext {
  className?: string
}

// ── Main Handler ──────────────────────────────────────────

export function handleQuickAction(
  actionId: string,
  context?: QuickActionContext,
): QuickActionResult {
  const action = getQuickAction(actionId)
  if (!action) {
    return { type: 'show_toast', toastMessage: `未找到快捷操作: ${actionId}` }
  }
  return dispatch(action, context)
}

function dispatch(
  action: QuickAction,
  context?: QuickActionContext,
): QuickActionResult {
  switch (action.actionType) {
    case 'search_autorun': {
      const query = action.query || ''
      const source = action.source
      const params = new URLSearchParams({ query, autoRun: '1', source })
      return {
        type: 'navigate',
        url: `/ai-search?${params.toString()}`,
      }
    }

    case 'generated_content': {
      return {
        type: 'open_panel',
        panel: 'generatedContent',
        panelData: {
          actionId: action.actionId,
          source: action.source,
          contentType: action.category,
        },
      }
    }

    case 'open_panel': {
      return {
        type: 'open_panel',
        panel: action.targetPanel || '',
        panelData: { actionId: action.actionId, source: action.source },
      }
    }

    case 'assign': {
      return {
        type: 'open_panel',
        panel: 'assignmentConfirm',
        panelData: {
          assignmentData: {
            title: action.label,
            className: context?.className || '',
            assignmentType: action.assignmentType,
          },
        },
      }
    }

    case 'add_to_basket': {
      return {
        type: 'show_toast',
        toastMessage: `快捷加入练习篮将在后续版本接入`,
      }
    }

    case 'mock': {
      return {
        type: 'show_toast',
        toastMessage: `"${action.label}"将在后续版本接入`,
      }
    }

    default:
      return { type: 'none' }
  }
}

// ── Convenience: build search URL directly ────────────────

export function buildSearchUrl(
  query: string,
  source: QuickActionSource,
  autoRun = true,
): string {
  const params = new URLSearchParams({ query, source })
  if (autoRun) params.set('autoRun', '1')
  return `/ai-search?${params.toString()}`
}

/**
 * AI Insight V1 — Action Controller
 *
 * Unified dispatcher for all insight recommended actions.
 * InsightDetailPanel calls this; the controller returns instructions
 * that the parent component (AIAssistantDrawer) interprets.
 *
 * Rule: InsightDetailPanel must NOT contain complex routing logic.
 *        It delegates to handleInsightAction().
 *
 * Source-aware routing:
 *   insight_action / drawer_action → stay in Drawer (open panels)
 *   homepage_quick_action / search_*  → navigate to /ai-search
 */

import type { InsightItem, InsightAction } from './insightTypes'
import { getActionMapping } from './insightActionMap'
import { setInsightStatus } from './insightStatus'
import { generateContent } from './mockGeneratedContent'

// ── Action Instruction (returned to UI layer) ────────────

export type InstructionType = 'navigate' | 'open_panel' | 'show_toast' | 'none'

export interface ActionInstruction {
  type: InstructionType
  /** Full URL for navigate instructions (e.g. /ai-search?query=...&autoRun=1) */
  url?: string
  /** Panel name for open_panel instructions */
  panel?: string
  /** Data to pass to the panel */
  panelData?: Record<string, unknown>
  /** Toast message for show_toast instructions */
  toastMessage?: string
}

// ── Controller Context ────────────────────────────────────

export interface ActionContext {
  /** Source label for tracking (e.g. 'insight_action', 'homepage_quick_action') */
  source: string
  /** Teacher's current class name (used for assignment form defaults) */
  className?: string
}

// ── Main Handler ──────────────────────────────────────────

export function handleInsightAction(
  action: InsightAction,
  insight: InsightItem,
  context: ActionContext,
): ActionInstruction {
  const mapping = getActionMapping(action.actionId)

  // 1. Mark action_clicked
  setInsightStatus(insight.insightId, 'action_clicked')

  // 2. If no mapping found, fall back to legacy type routing
  if (!mapping) {
    return legacyRoute(action, context)
  }

  // 3. Route by mapped type (source-aware)
  const isInsightSource = context.source === 'insight_action' || context.source === 'drawer_action'

  switch (mapping.type) {
    case 'generate':
    case 'recommend_resource': {
      // Insight sources: stay in drawer
      if (isInsightSource) {
        // Try content generation first
        const content = generateContent(insight, action.actionId)
        if (content) {
          return {
            type: 'open_panel',
            panel: 'generatedContent',
            panelData: { generatedContent: content, insight },
          }
        }
        // Fallback: show resource recommendation in drawer
        return {
          type: 'open_panel',
          panel: 'resourceRecommendation',
          panelData: {
            actionLabel: mapping.label,
            query: mapping.query || '',
            actionId: action.actionId,
            insight,
          },
        }
      }
      // Non-insight sources: navigate to /ai-search
      const query = mapping.query || action.payload?.query || ''
      const params = new URLSearchParams({ query, autoRun: '1' })
      return {
        type: 'navigate',
        url: `${mapping.target || '/ai-search'}?${params.toString()}`,
      }
    }

    case 'view': {
      return {
        type: 'open_panel',
        panel: mapping.panel,
        panelData: { insight, sourceAction: mapping },
      }
    }

    case 'assign': {
      return {
        type: 'open_panel',
        panel: 'assignmentConfirm',
        panelData: {
          assignmentData: {
            title: mapping.label,
            summary: insight.evidence?.summary || '',
            className: context.className || '',
            assignmentType: mapping.assignmentType,
          },
        },
      }
    }

    case 'basket': {
      return {
        type: 'open_panel',
        panel: 'basket',
        panelData: { fromInsight: insight.insightId },
      }
    }

    case 'mock': {
      return {
        type: 'show_toast',
        toastMessage: `"${mapping.label}"将在后续版本接入`,
      }
    }

    case 'generate_content': {
      const content = generateContent(insight, action.actionId)
      if (!content) {
        return {
          type: 'show_toast',
          toastMessage: `无法生成"${mapping.label}"的内容`,
        }
      }
      return {
        type: 'open_panel',
        panel: 'generatedContent',
        panelData: { generatedContent: content, insight },
      }
    }

    default:
      return { type: 'none' }
  }
}

// ── Legacy fallback (for actions without explicit mapping) ─

function legacyRoute(
  action: InsightAction,
  _context: ActionContext,
): ActionInstruction {
  switch (action.type) {
    case 'navigate': {
      const params = action.payload
        ? '?' + new URLSearchParams(action.payload).toString()
        : ''
      return {
        type: 'navigate',
        url: `${action.target}${params}`,
      }
    }
    case 'panel': {
      if (action.target === 'assignmentConfirm') {
        return {
          type: 'open_panel',
          panel: 'assignmentConfirm',
          panelData: {
            assignmentData: {
              title: action.label,
              summary: '',
            },
          },
        }
      }
      return {
        type: 'open_panel',
        panel: action.target,
        panelData: {},
      }
    }
    case 'workflow': {
      const q = action.payload?.query || action.label
      return {
        type: 'navigate',
        url: `/ai-search?query=${encodeURIComponent(q)}&autoRun=1`,
      }
    }
    case 'alert': {
      return {
        type: 'show_toast',
        toastMessage: `推荐动作"${action.label}"将在交互闭环专项中接入`,
      }
    }
    default:
      return { type: 'none' }
  }
}

// ── Status-only helpers (for non-action interactions) ─────

export function markInsightViewed(insightId: string): void {
  setInsightStatus(insightId, 'viewed')
}

export function markInsightIgnored(insightId: string): void {
  setInsightStatus(insightId, 'ignored')
}

export function markInsightRemindLater(insightId: string): void {
  setInsightStatus(insightId, 'remind_later')
}

export function markInsightResolved(insightId: string): void {
  setInsightStatus(insightId, 'resolved')
}

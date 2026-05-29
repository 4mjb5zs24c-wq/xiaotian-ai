/**
 * Resource Action Controller — Unified preview/assign/basket handler
 *
 * ALL pages must use this controller for resource actions.
 * No page may implement its own preview/assign/basket routing.
 */

import { useAIStore } from '../store'
import type { PanelType, PreviewPanelData, AssignmentFormData } from './panelState'
import { DEFAULT_ASSIGNMENT_FORM } from './panelState'

// ── Types ──────────────────────────────────────────────

export type ResourceAction = 'preview' | 'assign' | 'add_to_basket' | 'edit' | 'card_create'

export interface ResourceItem {
  id: string
  title: string
  type?: string
  description?: string
  reason?: string
  difficulty?: string
  estimatedTime?: string
  grade?: string
  unit?: string
  summary?: string
  tags?: string[]
}

export interface ActionContext {
  className: string
  textbook: string
  unit: string
  grade: string
}

export interface ActionResult {
  /** Which panel to open (null = no panel change) */
  panelType: PanelType
  /** Preview data (when panelType === 'resourcePreview') */
  previewData?: PreviewPanelData
  /** Assignment form data (when panelType === 'assignmentConfirm') */
  assignmentData?: AssignmentFormData
  /** Basket toast message */
  basketToast?: string
}

// ── Public API ─────────────────────────────────────────

/**
 * Handle a resource action (preview / assign / add_to_basket / edit / card_create).
 *
 * Rules (non-negotiable):
 *   preview       → panelType = 'resourcePreview' ONLY
 *   assign        → panelType = 'assignmentConfirm' ONLY
 *   add_to_basket → calls store.addToBasket(), panelType = null
 *   edit          → panelType = 'wordListEdit'
 *   card_create   → panelType = 'cardCreation'
 */
export function handleResourceAction(
  action: ResourceAction,
  item: ResourceItem,
  context: ActionContext,
): ActionResult {
  switch (action) {
    case 'preview': {
      return {
        panelType: 'resourcePreview',
        previewData: {
          title: item.title,
          type: item.type || '资源',
          grade: item.grade || context.grade,
          unit: item.unit || context.unit,
          difficulty: item.difficulty || 'medium',
          estimatedTime: item.estimatedTime || '',
          summary: item.summary || item.description || '',
          aiReason: item.reason || '',
        },
      }
    }

    case 'assign': {
      return {
        panelType: 'assignmentConfirm',
        assignmentData: {
          title: item.title,
          summary: item.summary || item.description || '',
          className: context.className,
          ...DEFAULT_ASSIGNMENT_FORM,
        } as AssignmentFormData,
      }
    }

    case 'add_to_basket': {
      // Only adds to basket, never changes panel
      useAIStore.getState().addToBasket({
        id: item.id,
        title: item.title,
        reason: item.reason || item.description || '',
        type: 'material',
        tags: item.tags || [],
        difficulty: (item.difficulty as 'basic' | 'medium' | 'advanced') || 'medium',
        estimatedTime: item.estimatedTime || '',
      })
      return { panelType: null }
    }

    case 'edit': {
      return { panelType: 'wordListEdit' }
    }

    case 'card_create': {
      return { panelType: 'cardCreation' }
    }

    default:
      return { panelType: null }
  }
}

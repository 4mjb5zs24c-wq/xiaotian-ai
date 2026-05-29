/**
 * Quick Action Map — 快捷操作注册表
 *
 * All V1 quick actions defined here.
 * actionId is unique even when label/query overlap across sources.
 */

import type { QuickAction } from './quickActionTypes'

// ── Registry ──────────────────────────────────────────────

const quickActions: Record<string, QuickAction> = {
  // ── HomePage Quick Actions ──────────────────────────────

  homepage_generate_dictation: {
    actionId: 'homepage_generate_dictation',
    label: '生成听写',
    description: '基于当前教学单元生成词汇默写',
    category: 'vocab',
    source: 'homepage_quick_action',
    actionType: 'search_autorun',
    query: '生成 Unit3 词汇默写',
    requiresConfirm: false,
  },
  homepage_search_resource: {
    actionId: 'homepage_search_resource',
    label: '查同步资源',
    description: '查找与当前教学单元匹配的同步资源',
    category: 'resource',
    source: 'homepage_quick_action',
    actionType: 'search_autorun',
    query: '查同步资源',
    requiresConfirm: false,
  },
  homepage_generate_paper: {
    actionId: 'homepage_generate_paper',
    label: '智能组卷',
    description: 'AI 智能生成试卷',
    category: 'paper',
    source: 'homepage_quick_action',
    actionType: 'search_autorun',
    query: '智能组卷',
    requiresConfirm: false,
  },
  homepage_quick_card: {
    actionId: 'homepage_quick_card',
    label: '快速制卡',
    description: '快速生成教学卡片',
    category: 'card',
    source: 'homepage_quick_action',
    actionType: 'search_autorun',
    query: '快速制卡',
    requiresConfirm: false,
  },

  // ── AI SearchPage Quick Actions ─────────────────────────

  ai_search_generate_dictation: {
    actionId: 'ai_search_generate_dictation',
    label: '生成听写',
    description: '基于当前教学单元生成词汇默写',
    category: 'vocab',
    source: 'ai_search_quick_action',
    actionType: 'search_autorun',
    query: '生成 Unit3 词汇默写',
    requiresConfirm: false,
  },
  ai_search_resource: {
    actionId: 'ai_search_resource',
    label: '查同步资源',
    description: '查找与当前教学单元匹配的同步资源',
    category: 'resource',
    source: 'ai_search_quick_action',
    actionType: 'search_autorun',
    query: '查同步资源',
    requiresConfirm: false,
  },
  ai_search_paper: {
    actionId: 'ai_search_paper',
    label: '智能组卷',
    description: 'AI 智能生成试卷',
    category: 'paper',
    source: 'ai_search_quick_action',
    actionType: 'search_autorun',
    query: '智能组卷',
    requiresConfirm: false,
  },
  ai_search_card: {
    actionId: 'ai_search_card',
    label: '快速制卡',
    description: '快速生成教学卡片',
    category: 'card',
    source: 'ai_search_quick_action',
    actionType: 'search_autorun',
    query: '快速制卡',
    requiresConfirm: false,
  },
}

// ── Lookup ────────────────────────────────────────────────

export function getQuickAction(actionId: string): QuickAction | undefined {
  return quickActions[actionId]
}

export function getQuickActionsBySource(source: string): QuickAction[] {
  return Object.values(quickActions).filter((a) => a.source === source)
}

export function getAllQuickActions(): QuickAction[] {
  return Object.values(quickActions)
}

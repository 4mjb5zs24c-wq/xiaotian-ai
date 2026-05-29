/**
 * AI Task Controller — Unified AI search & workflow execution
 *
 * ALL pages (HomePage, AISearchPage, AIAssistantDrawer) must use this controller.
 * No page may implement its own search or workflow routing logic.
 */

import { matchIntent } from '../router/intentMap'
import { parseIntent } from '../search/intentParser'
import { routeSearch } from '../search/searchRouter'
import { runWorkflowRunner } from '../engine/workflowRunner'
import type { EntrySource } from '../router/intentMap'
import type { SearchResponse } from '../search/types'
import type { RunnerResult } from '../engine/workflowRunner'

// ── Types ──────────────────────────────────────────────

export type QuickActionType = 'generate_dictation' | 'search_resource' | 'generate_paper' | 'quick_card'

export type InsightActionType = 'learning_report' | 'wrong_word' | 'wrong_question' | 'writing' | 'reading' | 'listening'

export interface AITaskContext {
  textbook: string
  unit: string
  grade: string
  className: string
  studentCount: number
  region?: string
}

export interface AISearchResult {
  /** Intent routing result */
  intentId: string
  workflowId: string
  label: string
  confidence: 'high' | 'medium' | 'low'
  /** Whether this is a workflow or search */
  resultType: 'workflow' | 'search' | 'ambiguous'
  /** Search results (when resultType === 'search') */
  searchResponse?: SearchResponse
  /** Workflow results (when resultType === 'workflow') */
  workflowResult?: RunnerResult
  /** Query used */
  query: string
  source: EntrySource
}

// ── Quick action → query mapping ───────────────────────

const QUICK_ACTION_QUERIES: Record<QuickActionType, string> = {
  generate_dictation: '生成 Unit3 词汇默写',
  search_resource: 'Unit3 同步资源',
  generate_paper: '生成 Unit3 单元测验卷',
  quick_card: '生成词汇答题卡',
}

// ── Insight → query mapping ────────────────────────────

const INSIGHT_QUERIES: Record<InsightActionType, string> = {
  learning_report: '看一下练习情况',
  wrong_word: '错词率为什么上升',
  wrong_question: '阅读错题集中在哪',
  writing: '作文主要问题是什么',
  reading: '来一篇 Unit3 阅读理解',
  listening: '找一个听说训练',
}

// ── Public API ─────────────────────────────────────────

/**
 * Run AI search (parse intent + route + optionally run workflow).
 *
 * Always populates searchResponse so both drawer panels and full-page renderers
 * have consistent resource data regardless of intent routing.
 *
 * @returns AISearchResult with intent, search results, and/or workflow results.
 */
export async function runAISearch(
  query: string,
  source: EntrySource = 'search_input',
  ctx: AITaskContext,
): Promise<AISearchResult> {
  const intent = matchIntent(query, source)

  // Always run the search pipeline to populate searchResponse
  const searchCtx = buildSearchContext(ctx)
  const parsed = parseIntent(query, searchCtx)
  const response = routeSearch(parsed, searchCtx)

  // Ambiguous or no workflow → search only
  if (intent.intentId === 'ambiguous' || !intent.workflowId) {
    return {
      intentId: intent.intentId, workflowId: '', label: intent.label,
      confidence: intent.confidence, resultType: 'search',
      searchResponse: response, query, source,
    }
  }

  // Has a workflow → try running it, but always include searchResponse as fallback
  try {
    const wfResult = await runWorkflowRunner(intent.workflowId, {
      textbook: ctx.textbook, unit: ctx.unit, grade: ctx.grade,
      className: ctx.className, studentCount: ctx.studentCount, query,
    })
    return {
      intentId: intent.intentId, workflowId: intent.workflowId,
      label: intent.label, confidence: intent.confidence,
      resultType: 'workflow', workflowResult: wfResult,
      searchResponse: response, query, source,
    }
  } catch {
    return {
      intentId: intent.intentId, workflowId: intent.workflowId,
      label: intent.label, confidence: 'low',
      resultType: 'search', searchResponse: response, query, source,
    }
  }
}

/**
 * Run a quick action (generate_dictation / search_resource / etc.)
 */
export async function runQuickAction(
  actionType: QuickActionType,
  source: EntrySource = 'quick_action',
  ctx: AITaskContext,
): Promise<AISearchResult> {
  const query = QUICK_ACTION_QUERIES[actionType]

  // search_resource → force search mode, not workflow
  if (actionType === 'search_resource') {
    const searchCtx = buildSearchContext(ctx)
    const parsed = parseIntent(query, searchCtx)
    const response = routeSearch(parsed, searchCtx)
    return {
      intentId: 'resource_search',
      workflowId: '',
      label: '资源搜索',
      confidence: 'high',
      resultType: 'search',
      searchResponse: response,
      query,
      source,
    }
  }

  return runAISearch(query, source, ctx)
}

/**
 * Run an insight action.
 */
export async function runInsightAction(
  insightType: InsightActionType,
  source: EntrySource = 'insight_card',
  ctx: AITaskContext,
): Promise<AISearchResult> {
  const query = INSIGHT_QUERIES[insightType]
  return runAISearch(query, source, ctx)
}

/**
 * Get the query string for a quick action type (for URL params).
 */
export function getQuickActionQuery(actionType: QuickActionType): string {
  return QUICK_ACTION_QUERIES[actionType]
}

// ── Helpers ────────────────────────────────────────────

function buildSearchContext(ctx: AITaskContext) {
  return {
    grade: ctx.grade,
    unit: ctx.unit,
    textbook: ctx.textbook,
    className: ctx.className,
    studentCount: ctx.studentCount,
    region: (ctx.region || 'default') as 'default',
    section: 'junior' as const,
    recentSearches: [] as string[],
    trendingSearches: [] as string[],
  }
}

import type { ParsedIntent, SearchResponse, ResourceResult, AIActionResult, TeachingSuggestionResult } from './types'
import type { SearchContext } from './types'
import { searchResources } from '../mock/search/resources'
import { searchAIActions } from '../mock/search/aiActions'
import { searchSuggestions } from '../mock/search/suggestions'

/**
 * Route a parsed intent to the correct mock data sources.
 * Returns a complete SearchResponse.
 *
 * In production, this would call different API endpoints or
 * a unified search backend.
 */
export function routeSearch(intent: ParsedIntent, ctx: SearchContext): SearchResponse {
  const { route } = intent

  let resources: ResourceResult[] = []
  let aiActions: AIActionResult[] = []
  let suggestions: TeachingSuggestionResult[] = []

  switch (route) {
    case 'resource':
      resources = searchResources(intent, ctx)
      // Also return related AI actions as secondary results
      aiActions = searchAIActions(intent, ctx).slice(0, 3)
      suggestions = searchSuggestions(intent, ctx).slice(0, 2)
      break

    case 'ai_action':
      aiActions = searchAIActions(intent, ctx)
      resources = searchResources(intent, ctx).slice(0, 3)
      suggestions = searchSuggestions(intent, ctx).slice(0, 2)
      break

    case 'teaching_suggestion':
      suggestions = searchSuggestions(intent, ctx)
      resources = searchResources(intent, ctx).slice(0, 3)
      aiActions = searchAIActions(intent, ctx).slice(0, 2)
      break

    case 'ambiguous':
      // Return a bit of everything
      resources = searchResources(intent, ctx).slice(0, 5)
      aiActions = searchAIActions(intent, ctx).slice(0, 3)
      suggestions = searchSuggestions(intent, ctx).slice(0, 3)
      break
  }

  // Sort by context match (matching textbook/grade/unit first)
  const sortByContext = (_x: { matchesContext: boolean }, y: { matchesContext: boolean }) =>
    (y.matchesContext ? 1 : 0) - (_x.matchesContext ? 1 : 0)
  resources.sort(sortByContext)
  aiActions.sort(sortByContext)
  suggestions.sort(sortByContext)

  // Build contextual note
  let contextualNote = ''
  if (intent.entities.grade && intent.entities.grade !== ctx.grade) {
    contextualNote = `已从查询识别年级「${intent.entities.grade}」，当前教学年级为「${ctx.grade}」`
  } else {
    contextualNote = `已自动应用当前教学上下文：${ctx.grade} · ${ctx.unit} · ${ctx.textbook}`
  }

  return {
    intent,
    resources,
    aiActions,
    suggestions,
    contextualNote,
  }
}

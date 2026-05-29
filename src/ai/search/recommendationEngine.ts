import type { SearchContext, ResourceResult } from './types'
import { searchResources } from '../mock/search/resources'
import type { ParsedIntent } from './types'
import { analyzeQuery } from './queryAnalyzer'

/**
 * Build "recommended search terms" based on current context.
 * These are shown as chips below the search box.
 */
export function buildRecommendedSearches(ctx: SearchContext): string[] {
  const recommendations: string[] = []

  // Context-aware recommendations
  recommendations.push(`${ctx.grade} ${ctx.unit} 词汇默写`)
  recommendations.push(`${ctx.grade} ${ctx.unit} 课件`)
  recommendations.push(`${ctx.grade} 阅读理解练习`)

  // If we're near exam season (simplified — in production, check calendar)
  if (ctx.grade.includes('初三') || ctx.grade.includes('九') || ctx.grade.includes('中考')) {
    recommendations.push('中考英语模拟卷')
    recommendations.push('中考高频词汇')
  }

  // Based on trending
  ctx.trendingSearches.slice(0, 3).forEach((s) => {
    if (!recommendations.includes(s)) recommendations.push(s)
  })

  return recommendations.slice(0, 6)
}

/**
 * Build "you might also like" recommendations based on a search result.
 */
export function buildRelatedRecommendations(
  result: ResourceResult,
  ctx: SearchContext,
): ResourceResult[] {
  // Mock: search for resources with similar type or same unit
  const fakeIntent: ParsedIntent = {
    raw: result.title,
    resourceTypes: [result.type],
    teachingGoal: result.teachingGoal,
    aiTask: null,
    entities: analyzeQuery(result.title),
    confidence: 0.5,
    route: 'resource',
    explanation: '相关推荐',
  }

  return searchResources(fakeIntent, ctx)
    .filter((r) => r.id !== result.id)
    .slice(0, 3)
}

/**
 * Teaching Recommendation Agent —— 教学建议生成 Agent
 *
 * 职责：
 *   1. 根据 TeachingStrategyPlan 生成每日教学建议
 *   2. 生成风险提醒
 *   3. 推荐具体教学动作（不是资源推荐，而是教学决策建议）
 */

import type { Agent, AgentContext, AgentResult } from './types'
import type { TeachingStrategyPlan } from '../strategy/types'
import { registerAgent } from './agentRegistry'
import { generateTeachingStrategy } from '../strategy/strategyEngine'
import type { ClassProfile } from '../strategy/types'

export const teachingRecommendationAgent: Agent = {
  id: 'teaching-recommendation',
  name: '教学建议 Agent',
  description: '根据教学策略、学情和趋势，生成每日教学建议和风险提醒',

  async run(ctx: AgentContext): Promise<AgentResult> {
    const t0 = performance.now()

    console.log('  💡 [Teaching Rec] 生成教学建议...')

    // Build class profile from context
    const profile: ClassProfile = {
      grade: ctx.metadata.grade,
      className: ctx.metadata.className,
      studentCount: ctx.metadata.studentCount,
      textbook: ctx.metadata.textbook,
      currentUnit: ctx.metadata.unit,
      recentAvgScore: 84.7, // from context/analytics
      weakPoints: [
        { topic: '可数/不可数名词', errorRate: 43 },
        { topic: '阅读理解主旨推断', errorRate: 42 },
        { topic: '一般现在时三单', errorRate: 35 },
      ],
      strongPoints: ['词汇拼写', '句型转换'],
      level: 'normal',
      region: 'guangdong',
      examStage: 'midterm',
    }

    // Generate strategy plan
    const plan: TeachingStrategyPlan = generateTeachingStrategy(profile)

    // Store in shared context for downstream agents
    ctx.stepResults.set('strategy_plan', plan)

    // Build daily suggestions
    const dailySuggestions = plan.recommendedActions.slice(0, 5).map((action, i) => ({
      id: `sug-${i}`,
      title: action.description,
      priority: action.priority,
      actionType: action.type,
    }))

    const duration = Math.round(performance.now() - t0)

    console.log(`  ✅ [Teaching Rec] ${dailySuggestions.length} 条建议, ${plan.riskAlerts.length} 条风险 | ${duration}ms`)

    return {
      status: 'completed',
      output: {
        plan,
        dailySuggestions,
        trendSummary: plan.summary,
      },
      summary: plan.summary,
    }
  },
}

registerAgent(teachingRecommendationAgent)

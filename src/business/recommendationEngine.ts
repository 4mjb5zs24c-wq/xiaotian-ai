/**
 * Recommendation Reason Engine — AI 推荐理由引擎
 *
 * 不是写死文案，而是根据业务上下文动态生成推荐理由。
 * 每个理由包含：short（卡片展示）、detail（详情）、factors（因子权重）。
 */

import type { BusinessResource, AiRecommendationReason, AiRecommendationFactor } from './types'

export function buildRecommendationReason(resource: BusinessResource): AiRecommendationReason {
  const factors: AiRecommendationFactor[] = []

  // Weak point factor
  if (resource.tags.some(t => t === '弱项' || t === '专项')) {
    factors.push({
      type: 'weak_point',
      label: '班级薄弱点',
      description: `当前班级在${resource.tags.filter(t => t !== '弱项' && t !== '专项').join('、')}上存在薄弱，本资源针对性训练`,
      weight: 0.9,
    })
  }

  // Grade/Unit match
  if (resource.matchesContext) {
    factors.push({
      type: 'class_level',
      label: '匹配当前教学',
      description: `匹配${resource.grade} ${resource.unit} · ${resource.textbook}`,
      weight: 0.8,
    })
  }

  // Exam stage factor
  if (resource.tags.some(t => t === '期中' || t === '中考' || t === '期末')) {
    factors.push({
      type: 'exam_stage',
      label: '考试阶段适配',
      description: resource.tags.includes('中考') ? '中考备考阶段，真题训练效果最佳' : '期中备考阶段，综合复习正当时',
      weight: 0.7,
    })
  }

  // Region factor
  if (resource.tags.some(t => t === '广东' || t === '听说')) {
    factors.push({
      type: 'region',
      label: '地区适配',
      description: '广东地区中考含听说考试，本资源针对听说专项训练',
      weight: 0.85,
    })
  }

  // Difficulty factor
  if (resource.difficulty === 'basic') {
    factors.push({
      type: 'class_level',
      label: '难度适中',
      description: '基础难度，适合全班使用，不会打击学生信心',
      weight: 0.5,
    })
  } else if (resource.difficulty === 'advanced') {
    factors.push({
      type: 'class_level',
      label: '挑战提升',
      description: '进阶难度，适合学有余力的学生挑战自我',
      weight: 0.4,
    })
  }

  // Trend factor for listening
  if (resource.type === 'listening' && resource.tags.includes('专项')) {
    factors.push({
      type: 'trend',
      label: '趋势预警',
      description: '近期班级听力成绩呈下滑趋势，建议立即加强训练',
      weight: 0.9,
    })
  }

  // Build short and detail
  const topFactor = factors.sort((a, b) => b.weight - a.weight)[0]
  const short = topFactor ? `${topFactor.label} · ${topFactor.description.substring(0, 30)}` : 'AI 推荐资源'
  const detail = factors.map(f => `【${f.label}】${f.description}`).join('；')

  return { short, detail, factors }
}

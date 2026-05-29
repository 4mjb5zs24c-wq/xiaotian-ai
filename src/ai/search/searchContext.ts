import type { SearchContext, SchoolSection, Region } from './types'

/**
 * Default search context — would be hydrated from store/API in production.
 * In the current MVP, this is the teacher's active teaching context.
 */
export function getDefaultSearchContext(): SearchContext {
  return {
    textbook: '人教版',
    unit: 'Unit 3',
    grade: '八年级上',
    section: 'junior',
    region: 'default',
    className: '八年级(3)班',
    recentSearches: [
      '八上 unit3 听后续写',
      '中考完形填空练习',
      '词汇默写纸',
      '环保主题阅读',
    ],
    trendingSearches: [
      '八上 unit3 课件',
      '一般过去时讲解',
      '时文阅读 food',
      '听说考试模拟',
      'Unit 3 单词听写',
    ],
  }
}

/**
 * Infer school section from grade string.
 */
export function inferSection(grade: string): SchoolSection {
  if (grade.includes('中考') || grade.includes('初三') || grade.includes('九年级')) {
    return 'zhongkao'
  }
  if (grade.includes('高一') || grade.includes('高二') || grade.includes('高三') || grade.includes('高考')) {
    return 'senior'
  }
  // 初一/初二, 七年级/八年级 → junior
  return 'junior'
}

/**
 * Infer region from a hint string. In production, this would come from
 * the teacher's profile or school location.
 */
export function inferRegion(hint?: string): Region {
  if (!hint) return 'default'
  if (hint.includes('广东') || hint.includes('广州') || hint.includes('深圳')) return 'guangdong'
  if (hint.includes('江苏') || hint.includes('南京') || hint.includes('苏州')) return 'jiangsu'
  if (hint.includes('浙江') || hint.includes('杭州') || hint.includes('宁波')) return 'zhejiang'
  if (hint.includes('北京')) return 'beijing'
  if (hint.includes('上海')) return 'shanghai'
  return 'default'
}

/**
 * Build a contextual note that explains what context was automatically applied.
 */
export function buildContextualNote(ctx: SearchContext, query: string): string {
  const parts: string[] = []

  if (!query.includes(ctx.grade) && !query.includes(ctx.grade.replace('上', '').replace('下', ''))) {
    parts.push(`已自动应用当前年级：${ctx.grade}`)
  }
  if (!query.toLowerCase().includes(ctx.unit.toLowerCase())) {
    parts.push(`已自动匹配当前单元：${ctx.unit}`)
  }
  if (!query.includes(ctx.textbook)) {
    parts.push(`教材版本：${ctx.textbook}`)
  }

  return parts.length > 0 ? parts.join(' · ') : '已匹配当前教学上下文'
}

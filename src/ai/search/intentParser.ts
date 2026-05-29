import type { ParsedIntent, ResourceType, TeachingGoal, AITask, SearchEntities } from './types'
import { analyzeQuery } from './queryAnalyzer'
import { getRegionConfig } from './regionStrategy'
import type { SearchContext } from './types'

// ── Keyword → ResourceType mapping ─────────────────────

const RESOURCE_KEYWORDS: Array<[string[], ResourceType]> = [
  [['听后续写', '听后写', '听写'], 'listening'],
  [['听力', '听力材料', '听力素材', '音频'], 'listening'],
  [['听说', '口语', '人机对话', '朗读', '对话练习'], 'speaking'],
  [['阅读理解', '完形填空', '完形', '阅读', '时文阅读', '时文'], 'reading'],
  [['时文', '时文阅读', '新闻'], 'current_news'],
  [['配音', '趣配音', '配音秀'], 'dubbing'],
  [['视频', '短片', '动画', '导入视频'], 'video'],
  [['词汇', '单词', '默写', '听写', '词汇表', '生词'], 'vocabulary'],
  [['写作', '作文', '范文', '写作模板', '写作训练'], 'writing'],
  [['语法', '时态', '名词', '句型', '主谓', '从句'], 'grammar'],
  [['课件', 'PPT', '教案'], 'courseware'],
  [['练习卷', '测验卷', '单元卷', '模拟卷', '练习纸'], 'exercise'],
  [['试卷', '真题', '模拟题', '考题'], 'exam_paper'],
]

// ── Keyword → TeachingGoal mapping ─────────────────────

const GOAL_KEYWORDS: Array<[string[], TeachingGoal]> = [
  [['课前导入', '导入', '热身', 'warm up', '导入视频', '导入活动'], 'warm_up'],
  [['课堂练习', '课堂训练', '随堂练', '课上练'], 'class_practice'],
  [['课后巩固', '课后', '巩固', '回家作业', '家庭作业', '作业'], 'consolidation'],
  [['单元复习', '复习', '总结', '回顾'], 'unit_review'],
  [['考前冲刺', '考前', '冲刺', '备考', '模拟'], 'exam_prep'],
]

// ── Keyword → AITask mapping ───────────────────────────

const AI_TASK_KEYWORDS: Array<[string[], AITask]> = [
  [['出题', '生成题目', '出卷', '来几道', '来几题', '出几道', '出几题', '帮我出', '生成练习', '生成试卷'], 'generate_quiz'],
  [['批改', '改作文', '批作文', '批一下', '改一下'], 'correct_essay'],
  [['分析', '帮我分析', '分析一下', '看一下问题'], 'analyze'],
  [['推荐', '帮我推荐', '推荐一下', '有什么好的'], 'recommend'],
  [['总结', '帮我总结', '汇总', '归纳', '整理'], 'summarize'],
  [['默写', '听写', '词汇默写', '单词默写', '生成听写', '词汇听写'], 'generate_dictation'],
  [['生成练习', '出练习', '练习纸', '练习卷'], 'generate_exercise'],
]

// ── Confidence helpers ─────────────────────────────────

function matchKeywords(query: string, keywordGroups: Array<[string[], any]>): { matches: string[]; results: any[] } {
  const results: any[] = []
  const matched: string[] = []
  for (const [keywords, result] of keywordGroups) {
    for (const kw of keywords) {
      if (query.includes(kw)) {
        if (!results.includes(result)) results.push(result)
        matched.push(kw)
      }
    }
  }
  return { matches: matched, results }
}

/**
 * Parse a natural language query into a structured intent.
 *
 * This is the main entry point for intent parsing.
 * Designed to be swapped with an LLM-based parser in the future
 * while keeping the same interface.
 */
export function parseIntent(query: string, ctx: SearchContext): ParsedIntent {
  const raw = query.trim()
  const entities: SearchEntities = analyzeQuery(raw)

  // Fill missing entities from context
  if (!entities.grade) entities.grade = ctx.grade
  if (!entities.unit) entities.unit = ctx.unit
  if (!entities.textbook) entities.textbook = ctx.textbook

  // Match resource types
  const resourceMatch = matchKeywords(raw, RESOURCE_KEYWORDS)
  const resourceTypes: ResourceType[] = resourceMatch.results

  // Match teaching goal
  const goalMatch = matchKeywords(raw, GOAL_KEYWORDS)
  const teachingGoal: TeachingGoal | null = goalMatch.results[0] || null

  // Match AI task
  const aiMatch = matchKeywords(raw, AI_TASK_KEYWORDS)
  const aiTask: AITask | null = aiMatch.results[0] || null

  // Apply region strategy: reorder resource types
  const regionCfg = getRegionConfig(ctx.region)
  if (resourceTypes.length === 0 && teachingGoal) {
    // If only goal is specified, suggest resource types based on region
    resourceTypes.push(...regionCfg.priorityResourceTypes.slice(0, 2) as ResourceType[])
  }

  // Determine route
  let route: ParsedIntent['route'] = 'ambiguous'
  let confidence = 0.3
  const explanations: string[] = []

  if (aiTask) {
    route = 'ai_action'
    confidence = 0.85
    explanations.push(`检测到AI任务意图：${aiTask}`)
  } else if (resourceTypes.length > 0) {
    route = 'resource'
    confidence = Math.min(0.5 + resourceTypes.length * 0.15, 0.95)
    explanations.push(`识别资源类型：${resourceTypes.join('、')}`)
  } else {
    // Check if it looks like a teaching question/suggestion
    const teachingHints = ['怎么教', '如何上', '怎么讲', '怎么练', '建议', '方法']
    if (teachingHints.some((h) => raw.includes(h))) {
      route = 'teaching_suggestion'
      confidence = 0.6
      explanations.push('检测到教学咨询意图')
    } else {
      route = 'resource'
      confidence = 0.3
      explanations.push('意图不明确，默认搜索资源')
    }
  }

  if (entities.grade && entities.grade !== ctx.grade) {
    explanations.push(`已从查询中识别年级：${entities.grade}`)
  } else if (entities.grade) {
    explanations.push(`已自动应用当前年级：${entities.grade}`)
  }
  if (entities.unit) explanations.push(`已匹配单元：${entities.unit}`)
  if (entities.textbook) explanations.push(`教材：${entities.textbook}`)

  return {
    raw,
    resourceTypes,
    teachingGoal,
    aiTask,
    entities,
    confidence,
    route,
    explanation: explanations.join(' · ') || '基于关键词匹配的意图识别',
  }
}

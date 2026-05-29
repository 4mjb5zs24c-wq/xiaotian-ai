import type { WorkflowExecutionContext, WorkflowTriggerIntent, WorkflowCategory } from './workflowTypes'

let runCounter = 0

/**
 * Build a workflow execution context from the teacher's current state
 * plus the trigger query. This is the "context injection" that happens
 * before any workflow runs.
 */
export function buildWorkflowContext(params: {
  query: string
  textbook: string
  unit: string
  grade: string
  className: string
  studentCount: number
  region?: string
  overrides?: Map<string, unknown>
}): WorkflowExecutionContext {
  runCounter++

  // Parse trigger intent from query
  const triggerIntent = parseTriggerIntent(params.query)

  return {
    runId: `wf-${Date.now()}-${runCounter}`,
    textbook: params.textbook,
    unit: params.unit,
    grade: params.grade,
    className: params.className,
    studentCount: params.studentCount,
    region: params.region || 'default',

    triggerQuery: params.query,
    triggerIntent,

    stepResults: new Map(),
    overrides: params.overrides || new Map(),

    startedAt: Date.now(),
    estimatedTotalTime: '约15秒',
  }
}

/**
 * Parse a query into trigger intent (lightweight, separate from search intent).
 */
function parseTriggerIntent(query: string): WorkflowTriggerIntent {
  const category = detectCategory(query)
  const entities = {
    grade: extractGrade(query),
    unit: extractUnit(query),
    textbook: extractTextbook(query),
    keywords: extractKeywords(query),
    quantity: extractQuantity(query),
    topic: extractTopic(query),
  }

  return {
    category,
    resourceTypes: detectResourceTypes(query),
    teachingGoal: detectTeachingGoal(query),
    aiTask: detectAITask(query),
    entities,
  }
}

// ── Lightweight extractors (subset of queryAnalyzer, self-contained) ──

function detectCategory(query: string): WorkflowCategory {
  if (/出题|生成|出卷|来几道|来几题|默写|听写|出练习|生成练习|生成试卷|生成听写/.test(query)) return 'generation'
  if (/分析|批改|改作文|批作文|总结|汇总|归纳/.test(query)) return 'analysis'
  if (/布置|布置作业|发布|下发/.test(query)) return 'assignment'
  if (/怎么教|如何上|怎么讲|教学建议|导入|热身|巩固|复习|冲刺/.test(query)) return 'teaching'
  return 'resource'
}

function detectResourceTypes(query: string): string[] {
  const types: string[] = []
  if (/听力|听写|听后/.test(query)) types.push('listening')
  if (/口语|听说|朗读|对话/.test(query)) types.push('speaking')
  if (/阅读|时文|完形/.test(query)) types.push('reading')
  if (/视频|短片|动画/.test(query)) types.push('video')
  if (/词汇|单词|默写/.test(query)) types.push('vocabulary')
  if (/写作|作文|范文/.test(query)) types.push('writing')
  if (/语法|时态|句型/.test(query)) types.push('grammar')
  if (/课件|PPT/.test(query)) types.push('courseware')
  return types
}

function detectTeachingGoal(query: string): string | null {
  if (/导入|热身|warm\s*up/.test(query)) return 'warm_up'
  if (/课堂|课上|随堂/.test(query)) return 'class_practice'
  if (/课后|巩固|作业|回家/.test(query)) return 'consolidation'
  if (/复习|单元复习/.test(query)) return 'unit_review'
  if (/考前|冲刺|备考|模拟/.test(query)) return 'exam_prep'
  return null
}

function detectAITask(query: string): string | null {
  if (/出题|生成题目|出卷|来几道|来几题|出几道|生成练习|生成试卷/.test(query)) return 'generate_quiz'
  if (/批改|改作文|批作文/.test(query)) return 'correct_essay'
  if (/分析|帮我分析/.test(query)) return 'analyze'
  if (/推荐|帮我推荐/.test(query)) return 'recommend'
  if (/总结|汇总|归纳/.test(query)) return 'summarize'
  if (/默写|听写|词汇听写|单词默写|生成听写/.test(query)) return 'generate_dictation'
  if (/生成练习|出练习/.test(query)) return 'generate_exercise'
  return null
}

function extractGrade(query: string): string | null {
  if (/七[年級]?\s*[上下]/.test(query)) return query.match(/七[年級]?\s*[上下]/)?.[0] || null
  if (/八[年級]?\s*[上下]/.test(query)) return query.match(/八[年級]?\s*[上下]/)?.[0] || null
  if (/九[年級]?\s*[上下]/.test(query)) return query.match(/九[年級]?\s*[上下]/)?.[0] || null
  if (/中考/.test(query)) return '中考'
  if (/高考/.test(query)) return '高考'
  return null
}

function extractUnit(query: string): string | null {
  const m = query.match(/[Uu]nit\s*(\d+)/)
  if (m) return `Unit ${m[1]}`
  return null
}

function extractTextbook(_query: string): string | null {
  return null // Default: use teacher context
}

function extractKeywords(query: string): string[] {
  return query
    .replace(/帮我|我要|给我|找一个|来一个|来一套|生成|推荐|分析|批改|布置/g, '')
    .replace(/七[年級]?\s*[上下]/g, '')
    .replace(/八[年級]?\s*[上下]/g, '')
    .replace(/九[年級]?\s*[上下]/g, '')
    .replace(/[Uu]nit\s*\d+/g, '')
    .replace(/中考|高考/g, '')
    .split(/\s+/)
    .filter((k) => k.length > 0)
}

function extractQuantity(query: string): number | null {
  const m = query.match(/(\d+)\s*(个|道|篇|套|份|张|首)/)
  return m ? parseInt(m[1], 10) : null
}

function extractTopic(query: string): string | null {
  const topics = ['环保', '节日', '食物', '动物', '运动', '旅行', '科技', '健康', '学校', '家庭']
  for (const t of topics) {
    if (query.includes(t)) return t
  }
  return null
}

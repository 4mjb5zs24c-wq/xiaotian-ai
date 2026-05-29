/**
 * Context Engine (v3 — RAG-powered)
 *
 * buildRuntimeContext() 现在集成向量搜索：
 *   1. 构建查询上下文
 *   2. 调用 vectorAdapter.search() 检索相关教学知识
 *   3. 注入 RuntimeContext.relevantKnowledge
 *
 * Prompt Builder 自动将检索到的知识注入 system prompt。
 */

import type { RuntimeContext, KnowledgeFragment } from './types'
import { getRecentWorkflows } from '../memory/workflowHistory'
import { getRecentToolResults } from '../memory/toolResultMemory'
import { getRecentMessages } from '../memory/sessionMemory'
import { getVectorAdapter } from '../../vector'

// ── Defaults ───────────────────────────────────────────

const defaultTeacher = {
  name: '王老师',
  subject: '英语',
  schoolName: '阳光中学',
  department: '英语教研组',
  preferences: {
    defaultDictationMode: 'cn_to_en' as const,
    defaultExerciseCount: 10,
    preferredDifficulty: 'medium' as const,
    preferredTextbook: '人教版',
  },
}

let sessionIdCounter = 0

// ── Context Builder ────────────────────────────────────

export async function buildRuntimeContext(params: {
  sessionId?: string
  teacher?: Partial<typeof defaultTeacher>
  classInfo?: {
    name?: string
    grade?: string
    studentCount?: number
    textbook?: string
    currentUnit?: string
    region?: string
  }
}): Promise<RuntimeContext> {
  const sessionId = params.sessionId || `session-${Date.now()}-${++sessionIdCounter}`

  const teacher = { ...defaultTeacher, ...params.teacher }
  const classInfo = {
    name: params.classInfo?.name || '七年级(3)班',
    grade: params.classInfo?.grade || '七年级上',
    studentCount: params.classInfo?.studentCount || 42,
    textbook: params.classInfo?.textbook || '人教版',
    currentUnit: params.classInfo?.currentUnit || 'Unit 3 — Food and Drinks',
    region: params.classInfo?.region || 'default',
  }

  // Load from storage + vector search (parallel)
  const [recentWorkflows, toolHistory, recentMessages, relevantKnowledge] =
    await Promise.all([
      getRecentWorkflows(10),
      getRecentToolResults(sessionId, 20),
      getRecentMessages(sessionId, 20),
      retrieveRelevantKnowledge(classInfo),
    ])

  return {
    sessionId,
    teacher,
    classInfo,
    recentWorkflows,
    toolHistory,
    recentMessages,
    relevantKnowledge,
    builtAt: Date.now(),
  }
}

// ── RAG Retrieval ──────────────────────────────────────

/**
 * 使用向量搜索从知识库中检索与当前教学上下文相关的知识。
 *
 * 流程：
 *   1. 构建搜索查询（拼接年级、单元、科目）
 *   2. 调用 vectorAdapter.search()
 *   3. 转换 VectorSearchResult → KnowledgeFragment
 *
 * 未来：可增加重排序（re-ranking）提高精度。
 */
export async function retrieveRelevantKnowledge(
  classInfo: RuntimeContext['classInfo'],
): Promise<KnowledgeFragment[]> {
  const vectorAdapter = getVectorAdapter()

  // Build a rich query from class context
  const query = [
    classInfo.grade,
    classInfo.currentUnit,
    '英语教学',
    classInfo.textbook,
  ].join(' ')

  try {
    const results = await vectorAdapter.search(query, {
      topK: 5,
      minScore: 0.1,
      filter: {
        subject: 'english',
      },
    })

    // Convert to KnowledgeFragment format
    return results.map((r) => ({
      id: r.document.id,
      content: r.document.content,
      source: r.document.metadata.source,
      relevance: r.score,
      metadata: {
        type: r.document.metadata.type,
        namespace: r.document.namespace,
        grade: r.document.metadata.grade,
        ...(r.document.metadata.unit ? { unit: r.document.metadata.unit } : {}),
      },
    }))
  } catch {
    // Fallback: mock knowledge when vector search is unavailable
    return getFallbackKnowledge(classInfo)
  }
}

// ── Fallback Knowledge ─────────────────────────────────

function getFallbackKnowledge(
  classInfo: RuntimeContext['classInfo'],
): KnowledgeFragment[] {
  return [
    {
      id: 'fb-1',
      content: `${classInfo.currentUnit} 教学重点：食物与饮品类词汇、可数/不可数名词、There be 句型。`,
      source: '人教版教师用书',
      relevance: 0.95,
      metadata: { type: 'syllabus' },
    },
    {
      id: 'fb-2',
      content: `当前班级(${classInfo.name})近期薄弱点：可数/不可数名词(错误率43%)、阅读理解主旨推断(错误率42%)。`,
      source: '学情分析',
      relevance: 0.90,
      metadata: { type: 'analytics' },
    },
    {
      id: 'fb-3',
      content: '食物类词汇教学策略：分类记忆法比逐一讲解效率高40%。建议配合实物图片和分类竞赛游戏。',
      source: '教学策略库',
      relevance: 0.80,
      metadata: { type: 'method' },
    },
  ]
}

// ── Summary ────────────────────────────────────────────

export function summarizeContext(ctx: RuntimeContext): string {
  const parts = [
    `教师：${ctx.teacher.name}（${ctx.teacher.department}）`,
    `班级：${ctx.classInfo.name} · ${ctx.classInfo.grade} · ${ctx.classInfo.studentCount}人`,
    `教材：${ctx.classInfo.textbook} · ${ctx.classInfo.currentUnit}`,
  ]

  if (ctx.recentWorkflows.length > 0) {
    const last = ctx.recentWorkflows[ctx.recentWorkflows.length - 1]
    parts.push(`最近任务：「${last.workflowName}」— ${last.summary}`)
  }

  if (ctx.toolHistory.length > 0) {
    parts.push(`历史工具调用：${ctx.toolHistory.length} 次`)
  }

  if (ctx.relevantKnowledge.length > 0) {
    parts.push(`RAG 知识：检索到 ${ctx.relevantKnowledge.length} 条相关知识`)
  }

  return parts.join('\n')
}

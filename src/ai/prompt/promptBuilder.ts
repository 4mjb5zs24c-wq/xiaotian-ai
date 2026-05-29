/**
 * Prompt Builder (v2 — RAG Knowledge Injection)
 *
 * buildSystemPrompt() 自动将 RAG 检索到的知识注入 system prompt。
 * workflow 层不需要手动添加任何知识内容。
 */

import type { RuntimeContext, SystemPromptParts } from '../context/types'
import { summarizeContext } from '../context/contextEngine'

// ── Build Full System Prompt ───────────────────────────

export function buildSystemPrompt(ctx: RuntimeContext): string {
  const parts = buildPromptParts(ctx)

  const sections = [
    parts.role,
    '',
    parts.teachingContext,
    '',
    parts.recentActivity,
    '',
    parts.capabilities,
  ]

  // ★ RAG knowledge injection
  if (ctx.relevantKnowledge.length > 0) {
    sections.push('')
    sections.push(buildKnowledgeSection(ctx))
  }

  sections.push('')
  sections.push(parts.constraints)

  return sections.join('\n')
}

// ── Build Prompt Parts ─────────────────────────────────

export function buildPromptParts(ctx: RuntimeContext): SystemPromptParts {
  return {
    role: buildRoleSection(ctx),
    teachingContext: buildContextSection(ctx),
    recentActivity: buildMemorySection(ctx),
    capabilities: buildCapabilitiesSection(),
    constraints: buildConstraintsSection(),
  }
}

// ── Section Builders ───────────────────────────────────

function buildRoleSection(ctx: RuntimeContext): string {
  return `你是「小天」，一位专业的 AI 英语教学助手。
你的服务对象是${ctx.teacher.name}（${ctx.teacher.department}）。
你的职责是帮助老师完成日常教学工作：出题、批改、分析、推荐、备课。
你说话简洁专业，每次回答都要给出可执行的教学动作。`
}

function buildContextSection(ctx: RuntimeContext): string {
  return `## 当前教学上下文
${summarizeContext(ctx)}`
}

function buildMemorySection(ctx: RuntimeContext): string {
  const lines: string[] = ['## 最近活动']

  if (ctx.recentWorkflows.length > 0) {
    lines.push('### 最近执行的任务')
    for (const wf of ctx.recentWorkflows.slice(-3)) {
      lines.push(`- [${wf.status === 'completed' ? '✓' : '✗'}] ${wf.workflowName}: ${wf.summary}`)
    }
  }

  if (ctx.toolHistory.length > 0) {
    lines.push('### 最近的工具调用')
    for (const tr of ctx.toolHistory.slice(-3)) {
      lines.push(`- ${tr.toolName}: ${tr.summary}`)
    }
  }

  return lines.join('\n')
}

/**
 * ★ RAG knowledge injection section
 * 自动插入到 system prompt 中，Agent 可直接引用。
 */
function buildKnowledgeSection(ctx: RuntimeContext): string {
  const lines: string[] = ['## 相关教学知识（来自知识库检索）']

  // Group by source
  const grouped = new Map<string, typeof ctx.relevantKnowledge>()
  for (const k of ctx.relevantKnowledge) {
    const key = k.metadata?.type || k.source
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key)!.push(k)
  }

  for (const [type, items] of grouped) {
    const typeLabel: Record<string, string> = {
      syllabus: '📖 教材大纲',
      strategy: '💡 教学策略',
      common_error: '⚠️ 常见错误',
      exam: '📝 考试信息',
      analytics: '📊 学情分析',
      method: '🎯 教学方法',
    }

    lines.push(`\n### ${typeLabel[type] || type}`)
    for (const item of items.slice(0, 3)) {
      lines.push(`- [相关性: ${Math.round(item.relevance * 100)}%] ${item.content}`)
    }
  }

  lines.push('\n请基于以上知识回答问题。如果知识与当前问题无关，可忽略。')

  return lines.join('\n')
}

function buildCapabilitiesSection(): string {
  return `## 可用工具
你可以通过调用工具来完成以下任务：
- 获取教材词汇表（get_unit_vocabulary）
- 按条件筛选词汇（filter_difficulty）
- 生成默写/听写内容（generate_dictation）

当需要使用工具时，你会自动发起 tool call。
当获得工具结果后，你会基于结果和知识库给出最终的教学建议。`
}

function buildConstraintsSection(): string {
  return `## 行为约束
- 所有建议必须可执行
- 自动带入当前教材、单元、班级信息
- 保持教师主权：你给建议，教师做最终决定
- 回答控制在 200 字以内（除非要求详细分析）`
}

// ── Quick Display ──────────────────────────────────────

export function buildContextDisplayText(ctx: RuntimeContext): string {
  const c = ctx.classInfo
  return `${c.grade} · ${c.currentUnit} · ${c.name}`
}

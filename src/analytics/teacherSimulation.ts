/**
 * 7-Day Teacher Simulation — 模拟真实英语老师连续使用 7 天
 *
 * 用于验证产品是否真正解决了老师的问题。
 * 模拟数据基于真实教学场景。
 */

import { startSession, endSession, track, getTrustScore, getDropAnalysis, getSessionStats, getTimeSavedMetrics } from './tracker'
import type { TeacherPersonaType } from './types'

// ── Simulation ─────────────────────────────────────────

interface SimDay {
  day: number
  label: string
  persona: TeacherPersonaType
  events: Array<{ type: Parameters<typeof track>[0]; data: Record<string, unknown> }>
}

const simData: SimDay[] = [
  // Day 1 (Mon): New teacher discovers AI
  {
    day: 1, label: '周一', persona: 'new_teacher',
    events: [
      { type: 'session_start', data: {} },
      { type: 'page_view', data: { page: '首页' } },
      { type: 'insight_click', data: { insightId: 'insight-1' } },
      { type: 'ai_search', data: { query: 'Unit3词汇默写', page: '搜索' } },
      { type: 'card_view', data: { resourceId: 'br-1' } },
      { type: 'recommendation_accept', data: { recommendationId: 'br-1', recType: 'vocabulary' } },
      { type: 'add_to_basket', data: { resourceId: 'br-1' } },
      { type: 'workflow_start', data: { workflowId: 'vocab-dictation' } },
      { type: 'workflow_step_drop', data: { stepId: 'review', workflowId: 'vocab-dictation' } },
      { type: 'workflow_cancel', data: { workflowId: 'vocab-dictation' } },
      { type: 'session_end', data: { duration: 18 * 60000 } },
    ],
  },
  // Day 2 (Tue): Tries again, completes workflow
  {
    day: 2, label: '周二', persona: 'new_teacher',
    events: [
      { type: 'session_start', data: {} },
      { type: 'ai_search', data: { query: '帮我出Unit3默写', page: '搜索' } },
      { type: 'recommendation_accept', data: { recommendationId: 'br-1', recType: 'vocabulary' } },
      { type: 'workflow_start', data: { workflowId: 'vocab-dictation' } },
      { type: 'recommendation_modify', data: { recommendationId: 'br-1', recType: 'vocabulary' } },
      { type: 'workflow_complete', data: { workflowId: 'vocab-dictation' } },
      { type: 'export_resource', data: { resourceId: 'br-1' } },
      { type: 'assign_homework', data: { assignmentId: 'asgn-1', targetClass: '八年级(3)班' } },
      { type: 'insight_click', data: { insightId: 'insight-3' } },
      { type: 'session_end', data: { duration: 22 * 60000 } },
    ],
  },
  // Day 3 (Wed): Confident user, explores more
  {
    day: 3, label: '周三', persona: 'experienced',
    events: [
      { type: 'session_start', data: {} },
      { type: 'insight_click', data: { insightId: 'insight-2' } },
      { type: 'ai_search', data: { query: '期中复习卷Unit3', page: '搜索' } },
      { type: 'recommendation_accept', data: { recommendationId: 'br-8', recType: 'exam_paper' } },
      { type: 'add_to_basket', data: { resourceId: 'br-8' } },
      { type: 'workflow_start', data: { workflowId: 'exam-prep' } },
      { type: 'open_review_panel', data: { workflowId: 'exam-prep' } },
      { type: 'recommendation_accept', data: { recommendationId: 'hr-1', recType: 'exam_paper' } },
      { type: 'workflow_complete', data: { workflowId: 'exam-prep' } },
      { type: 'assign_homework', data: { assignmentId: 'asgn-2', targetClass: '八年级(3)班' } },
      { type: 'session_end', data: { duration: 25 * 60000 } },
    ],
  },
  // Day 4 (Thu): Hits friction — recommendations feel off
  {
    day: 4, label: '周四', persona: 'experienced',
    events: [
      { type: 'session_start', data: {} },
      { type: 'ai_search', data: { query: '听说训练广东中考', page: '搜索' } },
      { type: 'recommendation_reject', data: { recommendationId: 'br-3', recType: 'speaking' } },
      { type: 'regenerate', data: { resourceId: 'br-3' } },
      { type: 'recommendation_reject', data: { recommendationId: 'br-3-v2', recType: 'speaking' } },
      { type: 'ai_search', data: { query: '听力训练基础', page: '搜索' } },
      { type: 'recommendation_accept', data: { recommendationId: 'br-6', recType: 'listening' } },
      { type: 'workflow_start', data: { workflowId: 'listening-recommend' } },
      { type: 'edit_result', data: { resourceId: 'br-6' } },
      { type: 'workflow_complete', data: { workflowId: 'listening-recommend' } },
      { type: 'feedback_submit', data: { rating: '一般', comment: '推荐难度偏高，我班是普通班' } },
      { type: 'session_end', data: { duration: 20 * 60000 } },
    ],
  },
  // Day 5 (Fri): Productive — trusts the system more
  {
    day: 5, label: '周五', persona: 'experienced',
    events: [
      { type: 'session_start', data: {} },
      { type: 'insight_click', data: { insightId: 'insight-1' } },
      { type: 'ai_search', data: { query: '词汇默写+同步练习', page: '搜索' } },
      { type: 'recommendation_accept', data: { recommendationId: 'br-1', recType: 'vocabulary' } },
      { type: 'recommendation_accept', data: { recommendationId: 'br-2', recType: 'sync_practice' } },
      { type: 'add_to_basket', data: { resourceId: 'br-1' } },
      { type: 'add_to_basket', data: { resourceId: 'br-2' } },
      { type: 'workflow_start', data: { workflowId: 'vocab-dictation' } },
      { type: 'workflow_complete', data: { workflowId: 'vocab-dictation' } },
      { type: 'assign_homework', data: { assignmentId: 'asgn-3', targetClass: '八年级(3)班' } },
      { type: 'assign_homework', data: { assignmentId: 'asgn-4', targetClass: '八年级(4)班' } },
      { type: 'session_end', data: { duration: 15 * 60000 } },
    ],
  },
  // Day 6 (Sat): Weekend prep — quick task
  {
    day: 6, label: '周六', persona: 'exam_focused',
    events: [
      { type: 'session_start', data: {} },
      { type: 'page_view', data: { page: '错词本' } },
      { type: 'card_view', data: { resourceId: 'br-1' } },
      { type: 'ai_search', data: { query: '下周一听写准备', page: '搜索' } },
      { type: 'recommendation_accept', data: { recommendationId: 'br-1', recType: 'vocabulary' } },
      { type: 'workflow_start', data: { workflowId: 'vocab-dictation' } },
      { type: 'workflow_complete', data: { workflowId: 'vocab-dictation' } },
      { type: 'export_resource', data: { resourceId: 'br-1' } },
      { type: 'session_end', data: { duration: 10 * 60000 } },
    ],
  },
  // Day 7 (Sun): Reflection — checks insights
  {
    day: 7, label: '周日', persona: 'head_teacher',
    events: [
      { type: 'session_start', data: {} },
      { type: 'page_view', data: { page: '练习报告' } },
      { type: 'insight_click', data: { insightId: 'insight-1' } },
      { type: 'insight_click', data: { insightId: 'insight-2' } },
      { type: 'ai_search', data: { query: '下周教学计划', page: '搜索' } },
      { type: 'recommendation_accept', data: { recommendationId: 'br-8', recType: 'exam_paper' } },
      { type: 'workflow_start', data: { workflowId: 'exam-prep' } },
      { type: 'workflow_complete', data: { workflowId: 'exam-prep' } },
      { type: 'feedback_submit', data: { rating: '有帮助', comment: '复习计划很实用，省了我1个小时' } },
      { type: 'session_end', data: { duration: 20 * 60000 } },
    ],
  },
]

// ── Run Simulation ─────────────────────────────────────

export function run7DaySimulation() {
  console.log('\n╔══════════════════════════════════════════╗')
  console.log('║  📊 7-Day Teacher Simulation             ║')
  console.log('╠══════════════════════════════════════════╣')
  console.log('║  模拟: 王老师（英语 · 八年级）            ║')
  console.log('║  周期: 周一 → 周日                       ║')
  console.log('╚══════════════════════════════════════════╝\n')

  for (const day of simData) {
    const sess = startSession(day.persona)
    console.log(`📅 Day ${day.day} (${day.label}) [${day.persona}]`)

    for (const event of day.events) {
      track(event.type, event.data)
    }

    endSession()
    console.log(`   Events: ${sess.events.length} | WF Done: ${sess.workflowsCompleted} | Saved: ${sess.timeSavedMinutes}min\n`)
  }

  // ── Results ──────────────────────────────────────────
  const stats = getSessionStats()
  const trust = getTrustScore()
  const drops = getDropAnalysis()
  const timeMetrics = getTimeSavedMetrics()

  console.log('╔══════════════════════════════════════════╗')
  console.log('║  📈 7-Day Analytics Report               ║')
  console.log('╠══════════════════════════════════════════╣')
  console.log(`║  Sessions        : ${stats.totalSessions}`)
  console.log(`║  Workflows Done  : ${stats.totalWorkflowsCompleted}`)
  console.log(`║  Time Saved      : ${stats.totalTimeSavedMinutes} min`)
  console.log(`║  Avg Session     : ${stats.averageSessionMinutes} min`)
  console.log('╠══════════════════════════════════════════╣')
  console.log(`║  🤝 Trust Score   : ${trust.overall}% (${trust.trend})`)
  console.log(`║  Recent Accept   : ${trust.recentAcceptRate}%`)
  console.log('║  By Type:')
  for (const [type, score] of Object.entries(trust.byType)) {
    console.log(`║    ${type}: ${score}%`)
  }
  console.log('╠══════════════════════════════════════════╣')
  console.log('║  📉 Drop Points:')
  for (const d of drops.slice(0, 3)) {
    console.log(`║    ${d.stepId}: ${d.dropCount}次 (${d.dropRate}%)`)
  }
  console.log('╠══════════════════════════════════════════╣')
  console.log(`║  ⏱️  Weekly Time Saved: ${timeMetrics.weeklyTotal} min`)
  console.log(`║  Week-over-Week: ${timeMetrics.weekOverWeekChange > 0 ? '+' : ''}${timeMetrics.weekOverWeekChange}%`)
  console.log('╚══════════════════════════════════════════╝')

  return { stats, trust, drops, timeMetrics }
}

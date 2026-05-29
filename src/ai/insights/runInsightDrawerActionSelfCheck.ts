/**
 * Insight Drawer Action Self-Check
 *
 * Verifies that insight recommended actions stay in Drawer
 * when source = insight_action, but quick actions still navigate.
 *
 * Run: npx tsx src/ai/insights/runInsightDrawerActionSelfCheck.ts
 */

import { handleInsightAction } from './insightActionController'
import { getInsightStatus, resetAllStatuses } from './insightStatus'
import type { InsightItem, InsightAction } from './insightTypes'
import { handleQuickAction } from '../actions/quickActionController'

const testInsight: InsightItem = {
  insightId: 'test-drawer-001',
  module: 'home_wrong_word',
  title: 'Test Drawer Insight',
  riskLevel: 'medium',
  priority: 1,
  scope: { className: '七年级(3)班', unit: 'Unit 3' },
  evidence: { summary: 'Test', details: [] },
  analysis: 'Test analysis',
  suggestion: 'Test suggestion',
  actions: [],
  sourceData: {},
  sampleInfo: { totalStudents: 42, sampleCount: 40, sampleRatio: 0.95, isSampleTooSmall: false },
  createdAt: '2026-05-28',
  status: 'active',
}

const insightCtx = { source: 'insight_action', className: '七年级(3)班' }
const drawerCtx = { source: 'drawer_action', className: '七年级(3)班' }

export function runInsightDrawerActionSelfCheck(): { passed: number; failed: number; lines: string[] } {
  let passed = 0; let failed = 0
  const lines: string[] = []

  lines.push('╔══════════════════════════════════════════════════╗')
  lines.push('║     洞察 Drawer 内动作 自检                      ║')
  lines.push('╚══════════════════════════════════════════════════╝')
  lines.push('')

  const check = (ok: boolean, label: string, detail?: string) => {
    if (ok) { passed++; lines.push(`  ✅ ${label}${detail ? ' → ' + detail : ''}`) }
    else { failed++; lines.push(`  ❌ ${label}${detail ? ' → ' + detail : ''}`) }
  }

  // ── A. insight_action stays in Drawer ──
  lines.push('── A. insight_action → Drawer 内处理 ──')

  resetAllStatuses()

  // vocab_dictation: generate type, should now stay in drawer
  const a1: InsightAction = { actionId: 'vocab_dictation', label: '生成词汇听写', type: 'navigate', target: '', requiresConfirm: false }
  const r1 = handleInsightAction(a1, testInsight, insightCtx)
  check(r1.type === 'open_panel', 'vocab_dictation (insight) → open_panel (不跳转)')
  check(r1.panel === 'generatedContent' || r1.panel === 'resourceRecommendation', `  panel → ${r1.panel}`, r1.panel)

  // recommend_speaking_mock: recommend_resource type
  const a2: InsightAction = { actionId: 'recommend_speaking_mock', label: '推荐听说模拟', type: 'navigate', target: '', requiresConfirm: false }
  const r2 = handleInsightAction(a2, testInsight, insightCtx)
  check(r2.type === 'open_panel', 'recommend_speaking_mock (insight) → open_panel (不跳转)')
  check(r2.panel === 'resourceRecommendation', `  panel → resourceRecommendation`, r2.panel)

  // exam_mock: generate_content type, already drawer-based
  const a3: InsightAction = { actionId: 'exam_mock', label: '推荐模拟卷', type: 'navigate', target: '', requiresConfirm: false }
  const r3 = handleInsightAction(a3, testInsight, insightCtx)
  check(r3.type === 'open_panel', 'exam_mock (insight) → open_panel')
  check(r3.panel === 'generatedContent', `  panel → generatedContent`)

  // writing_review: generate_content type
  const a4: InsightAction = { actionId: 'writing_review', label: '生成作文讲评', type: 'navigate', target: '', requiresConfirm: false }
  const r4 = handleInsightAction(a4, testInsight, insightCtx)
  check(r4.type === 'open_panel', 'writing_review (insight) → open_panel')
  check(r4.panel === 'generatedContent', `  panel → generatedContent`)

  // exam_sprint: recommend_resource type
  const a5: InsightAction = { actionId: 'exam_sprint', label: '推荐冲刺训练', type: 'navigate', target: '', requiresConfirm: false }
  const r5 = handleInsightAction(a5, testInsight, insightCtx)
  check(r5.type === 'open_panel', 'exam_sprint (insight) → open_panel (不跳转)')

  // view type still works in drawer
  const a6: InsightAction = { actionId: 'view_wrong_word_students', label: '查看错词学生', type: 'panel', target: '', requiresConfirm: false }
  const r6 = handleInsightAction(a6, testInsight, insightCtx)
  check(r6.type === 'open_panel', 'view_wrong_word_students (insight) → open_panel')
  check(r6.panel === 'wrongWordStudents', `  panel → wrongWordStudents`)

  // assign type still goes to assignmentConfirm
  const a7: InsightAction = { actionId: 'writing_revision', label: '布置二次修改', type: 'panel', target: '', requiresConfirm: true }
  const r7 = handleInsightAction(a7, testInsight, insightCtx)
  check(r7.type === 'open_panel', 'writing_revision (insight) → open_panel')
  check(r7.panel === 'generatedContent', `  panel → generatedContent`)

  // ── B. drawer_action also stays in Drawer ──
  lines.push('')
  lines.push('── B. drawer_action → Drawer 内处理 ──')

  const d1 = handleInsightAction(
    { actionId: 'vocab_dictation', label: '生成词汇听写', type: 'navigate', target: '', requiresConfirm: false },
    testInsight, drawerCtx,
  )
  check(d1.type === 'open_panel', 'vocab_dictation (drawer) → open_panel')

  const d2 = handleInsightAction(
    { actionId: 'recommend_speaking_mock', label: '推荐听说模拟', type: 'navigate', target: '', requiresConfirm: false },
    testInsight, drawerCtx,
  )
  check(d2.type === 'open_panel', 'recommend_speaking_mock (drawer) → open_panel')

  // ── C. Quick actions still navigate ──
  lines.push('')
  lines.push('── C. 快捷操作仍跳转 /ai-search ──')

  const q1 = handleQuickAction('homepage_generate_dictation')
  check(q1.type === 'navigate', 'homepage_generate_dictation → navigate')
  check((q1.url?.includes('/ai-search')) ?? false, '  → /ai-search')
  check((q1.url?.includes('autoRun=1')) ?? false, '  → autoRun=1')

  const q2 = handleQuickAction('homepage_search_resource')
  check(q2.type === 'navigate', 'homepage_search_resource → navigate')
  check((q2.url?.includes('/ai-search')) ?? false, '  → /ai-search')

  const q3 = handleQuickAction('ai_search_generate_dictation')
  check(q3.type === 'navigate', 'ai_search_generate_dictation → navigate')

  // ── D. Status still updated ──
  lines.push('')
  lines.push('── D. 状态更新正常 ──')

  resetAllStatuses()
  handleInsightAction(
    { actionId: 'vocab_dictation', label: '生成词汇听写', type: 'navigate', target: '', requiresConfirm: false },
    testInsight, insightCtx,
  )
  const status = getInsightStatus(testInsight.insightId)
  check(status === 'action_clicked', 'insight_action 后 status = action_clicked', status)

  // ── Summary ──
  lines.push('')
  lines.push('──────────────────────────────────────────────────')
  lines.push(`  总通过: ${passed}/${passed + failed}  (${Math.round(passed / (passed + failed) * 100)}%)`)
  lines.push(`  失败: ${failed}/${passed + failed}`)
  lines.push('──────────────────────────────────────────────────')

  return { passed, failed, lines }
}

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).runInsightDrawerActionSelfCheck = () => {
    const { lines } = runInsightDrawerActionSelfCheck()
    lines.forEach((l) => console.log(l))
  }
}

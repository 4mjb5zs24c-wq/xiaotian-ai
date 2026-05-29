/**
 * AI Insight V1 — Generated Content Flow Self-Check
 *
 * Run: npx tsx src/ai/insights/runGeneratedContentFlowSelfCheck.ts
 */

import { generateContent } from './mockGeneratedContent'
import { handleInsightAction } from './insightActionController'
import { getInsightStatus, resetAllStatuses, setInsightStatus } from './insightStatus'
import type { InsightItem } from './insightTypes'

// ── Test insight ──

const testInsight: InsightItem = {
  insightId: 'test-gc-001',
  module: 'home_wrong_word',
  title: 'Test Insight for Content Flow',
  riskLevel: 'medium',
  priority: 1,
  scope: { className: '七年级(3)班', unit: 'Unit 3', period: '近两周' },
  evidence: { summary: 'Test summary', details: [] },
  analysis: 'Test analysis',
  suggestion: 'Test suggestion',
  actions: [],
  sourceData: {},
  sampleInfo: { totalStudents: 42, sampleCount: 40, sampleRatio: 0.95, isSampleTooSmall: false },
  createdAt: '2026-05-27',
  status: 'active',
  examInfo: { examName: '期末考试', examDate: '2026-06-20', daysToExam: 23, isExamWithin30Days: true, hasEnded: false },
}

const context = { source: 'insight_action', className: '七年级(3)班' }

// ── Main ──

export function runGeneratedContentFlowSelfCheck(): { passed: number; failed: number; lines: string[] } {
  let passed = 0; let failed = 0
  const lines: string[] = []

  lines.push('╔══════════════════════════════════════════════════╗')
  lines.push('║     AI 生成内容流程 自检                          ║')
  lines.push('╚══════════════════════════════════════════════════╝')
  lines.push('')

  const check = (ok: boolean, label: string, detail?: string) => {
    if (ok) { passed++; lines.push(`  ✅ ${label}${detail ? ' → ' + detail : ''}`) }
    else { failed++; lines.push(`  ❌ ${label}${detail ? ' → ' + detail : ''}`) }
  }

  // ── A. Content Generation ──
  lines.push('── A. 内容生成 ──')

  resetAllStatuses()

  const wwp = generateContent(testInsight, 'assign_wrong_word_practice')
  check(wwp !== null, 'wrong_word_practice 可生成')
  check(wwp?.type === 'wrong_word_practice', '  类型 → wrong_word_practice', wwp?.type)
  check(wwp !== null && wwp.items.length > 0, '  包含词表', wwp?.items.length + ' 个词')
  check(wwp?.editable === true, '  可编辑')
  check(wwp?.assignable === true, '  可布置')
  check(wwp?.basketable === true, '  可加入练习篮')
  check(wwp?.status === 'draft', '  初始 status → draft')

  const wr = generateContent(testInsight, 'writing_review')
  check(wr !== null, 'writing_review 可生成')
  check(wr?.type === 'writing_review', '  类型 → writing_review')

  const me = generateContent(testInsight, 'recommend_model_essay')
  check(me !== null, 'model_essay 可生成')
  check(me?.type === 'model_essay', '  类型 → model_essay')

  const em = generateContent(testInsight, 'exam_mock')
  check(em !== null, 'exam_mock 可生成')
  check(em?.type === 'exam_mock', '  类型 → exam_mock')

  const sp = generateContent(testInsight, 'generate_special_practice')
  check(sp !== null, 'special_practice 可生成')
  check(sp?.type === 'special_practice', '  类型 → special_practice')

  const wrv = generateContent(testInsight, 'writing_revision')
  check(wrv !== null, 'writing_revision 可生成')
  check(wrv?.type === 'writing_revision', '  类型 → writing_revision')

  // ── B. Controller Routing ──
  lines.push('')
  lines.push('── B. 控制器路由 ──')

  resetAllStatuses()

  // assign_wrong_word_practice → generate_content → generatedContent
  const r1 = handleInsightAction(
    { actionId: 'assign_wrong_word_practice', label: '布置错词强化', type: 'panel', target: '', requiresConfirm: true },
    testInsight, context,
  )
  check(r1.type === 'open_panel', 'assign_wrong_word_practice → open_panel')
  check(r1.panel === 'generatedContent', '  panel → generatedContent', r1.panel)
  check(r1.panelData?.generatedContent !== undefined, '  包含 generatedContent 数据')

  // writing_review → generate_content → generatedContent
  const r2 = handleInsightAction(
    { actionId: 'writing_review', label: '生成作文讲评', type: 'navigate', target: '', requiresConfirm: false },
    testInsight, context,
  )
  check(r2.type === 'open_panel', 'writing_review → open_panel')
  check(r2.panel === 'generatedContent', '  panel → generatedContent')

  // exam_mock → generate_content → generatedContent
  const r3 = handleInsightAction(
    { actionId: 'exam_mock', label: '推荐模拟卷', type: 'navigate', target: '', requiresConfirm: false },
    testInsight, context,
  )
  check(r3.type === 'open_panel', 'exam_mock → open_panel')
  check(r3.panel === 'generatedContent', '  panel → generatedContent')

  // vocab_dictation → drawer panel (insight source stays in drawer)
  const r4 = handleInsightAction(
    { actionId: 'vocab_dictation', label: '生成词汇听写', type: 'navigate', target: '', requiresConfirm: false },
    testInsight, context,
  )
  check(r4.type === 'open_panel', 'vocab_dictation (insight source) → open_panel (Drawer 内)')

  // ── C. Status Linkage ──
  lines.push('')
  lines.push('── C. 状态联动 ──')

  resetAllStatuses()

  // Generate → insight status = generated
  generateContent(testInsight, 'assign_wrong_word_practice')
  const s1 = getInsightStatus(testInsight.insightId)
  check(s1 === 'generated', '生成内容后 → insight status = generated', s1)

  // Manually set added_to_basket
  setInsightStatus(testInsight.insightId, 'added_to_basket')
  const s2 = getInsightStatus(testInsight.insightId)
  check(s2 === 'added_to_basket', '加入练习篮后 → added_to_basket', s2)

  // assigned
  setInsightStatus(testInsight.insightId, 'assigned')
  const s3 = getInsightStatus(testInsight.insightId)
  check(s3 === 'assigned', '布置成功后 → assigned', s3)

  // ── D. Content Status ──
  lines.push('')
  lines.push('── D. 内容状态 ──')

  const gc = generateContent(testInsight, 'assign_wrong_word_practice')!
  check(gc.status === 'draft', '初始 → draft')

  // Simulate edit
  const edited = { ...gc, status: 'edited' as const }
  check(edited.status === 'edited', '编辑后 → edited')

  // ── Summary ──
  lines.push('')
  lines.push('──────────────────────────────────────────────────')
  lines.push(`  总通过: ${passed}/${passed + failed}  (${Math.round(passed / (passed + failed) * 100)}%)`)
  lines.push(`  失败: ${failed}/${passed + failed}`)
  lines.push('──────────────────────────────────────────────────')

  return { passed, failed, lines }
}

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).runGeneratedContentFlowSelfCheck = () => {
    const { lines } = runGeneratedContentFlowSelfCheck()
    lines.forEach((l) => console.log(l))
  }
}

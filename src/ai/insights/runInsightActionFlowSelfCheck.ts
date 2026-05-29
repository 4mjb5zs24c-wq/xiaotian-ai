/**
 * AI Insight V1 — Action Flow Self-Check
 *
 * Run: npx tsx -e "import { runInsightActionFlowSelfCheck } from './src/ai/insights/runInsightActionFlowSelfCheck'; runInsightActionFlowSelfCheck();"
 */

import { handleInsightAction, markInsightViewed, markInsightIgnored, markInsightRemindLater, markInsightResolved } from './insightActionController'
import { getInsightStatus, resetAllStatuses, type InsightStatus } from './insightStatus'
import { getActionMapping } from './insightActionMap'
import type { InsightItem, InsightAction } from './insightTypes'

// ── Mock insight for testing ──

const testInsight: InsightItem = {
  insightId: 'test-insight-001',
  module: 'home_wrong_word',
  title: 'Test Insight',
  riskLevel: 'medium',
  priority: 1,
  scope: { className: '七年级(3)班', unit: 'Unit 3' },
  evidence: { summary: 'Test summary', details: [] },
  analysis: 'Test analysis',
  suggestion: 'Test suggestion',
  actions: [],
  sourceData: {},
  sampleInfo: { totalStudents: 42, sampleCount: 40, sampleRatio: 0.95, isSampleTooSmall: false },
  createdAt: '2026-05-27',
  status: 'active',
}

const testContext = { source: 'insight_action', className: '七年级(3)班' }

// ── Main ──

export function runInsightActionFlowSelfCheck(): { passed: number; failed: number; lines: string[] } {
  let passed = 0
  let failed = 0
  const lines: string[] = []

  lines.push('╔══════════════════════════════════════════════════╗')
  lines.push('║     AI 洞察交互闭环 自检                          ║')
  lines.push('╚══════════════════════════════════════════════════╝')
  lines.push('')

  const check = (ok: boolean, label: string, detail?: string) => {
    if (ok) { passed++; lines.push(`  ✅ ${label}${detail ? ' → ' + detail : ''}`) }
    else { failed++; lines.push(`  ❌ ${label}${detail ? ' → ' + detail : ''}`) }
  }

  // ── A. Action Map ──
  lines.push('── A. 动作映射 ──')

  const vocabMap = getActionMapping('vocab_dictation')
  check(vocabMap?.type === 'generate', 'vocab_dictation → generate', vocabMap?.type)

  const assignMap = getActionMapping('assign_wrong_word_practice')
  check(assignMap?.type === 'generate_content', 'assign_wrong_word_practice → generate_content', assignMap?.type)

  const recommendMap = getActionMapping('recommend_speaking_mock')
  check(recommendMap?.type === 'recommend_resource', 'recommend_speaking_mock → recommend_resource (保持原逻辑)', recommendMap?.type)

  const essayMap = getActionMapping('recommend_model_essay')
  check(essayMap?.type === 'generate_content', 'recommend_model_essay → generate_content', essayMap?.type)

  const revisionMap = getActionMapping('writing_revision')
  check(revisionMap?.type === 'generate_content', 'writing_revision → generate_content', revisionMap?.type)

  const examMap = getActionMapping('exam_mock')
  check(examMap?.type === 'generate_content', 'exam_mock → generate_content', examMap?.type)

  // ── B. Action Routing ──
  lines.push('')
  lines.push('── B. 动作路由 ──')

  resetAllStatuses()

  // 1. vocab_dictation → drawer panel (insight source stays in drawer)
  const a1: InsightAction = { actionId: 'vocab_dictation', label: '生成词汇听写', type: 'navigate', target: '', requiresConfirm: false }
  const r1 = handleInsightAction(a1, testInsight, testContext)
  check(r1.type === 'open_panel', 'vocab_dictation → open_panel (Drawer 内)', r1.type)

  // 2. assign_wrong_word_practice → generatedContent (generate_content)
  const a2: InsightAction = { actionId: 'assign_wrong_word_practice', label: '布置错词强化', type: 'panel', target: 'assignmentConfirm', requiresConfirm: true }
  const r2 = handleInsightAction(a2, testInsight, testContext)
  check(r2.type === 'open_panel', 'assign_wrong_word_practice → open_panel')
  check(r2.panel === 'generatedContent', '  panel → generatedContent')

  // 3. recommend_speaking_mock → resourceRecommendation (insight source stays in drawer)
  const a3: InsightAction = { actionId: 'recommend_speaking_mock', label: '推荐听说模拟', type: 'navigate', target: '', requiresConfirm: false }
  const r3 = handleInsightAction(a3, testInsight, testContext)
  check(r3.type === 'open_panel', 'recommend_speaking_mock → open_panel (Drawer 内)', r3.type)

  // 4. recommend_model_essay → generatedContent (generate_content)
  const a4: InsightAction = { actionId: 'recommend_model_essay', label: '推荐范文', type: 'panel', target: '', requiresConfirm: false }
  const r4 = handleInsightAction(a4, testInsight, testContext)
  check(r4.type === 'open_panel', 'recommend_model_essay → open_panel')
  check(r4.panel === 'generatedContent', '  panel → generatedContent')

  // 5. writing_revision → generatedContent (generate_content)
  const a5: InsightAction = { actionId: 'writing_revision', label: '布置二次修改', type: 'panel', target: 'assignmentConfirm', requiresConfirm: true }
  const r5 = handleInsightAction(a5, testInsight, testContext)
  check(r5.type === 'open_panel', 'writing_revision → open_panel')
  check(r5.panel === 'generatedContent', '  panel → generatedContent')

  // 6. exam_mock → generatedContent (generate_content)
  const a6: InsightAction = { actionId: 'exam_mock', label: '推荐模拟卷', type: 'navigate', target: '', requiresConfirm: false }
  const r6 = handleInsightAction(a6, testInsight, testContext)
  check(r6.type === 'open_panel', 'exam_mock → open_panel')
  check(r6.panel === 'generatedContent', '  panel → generatedContent')

  // 7. Unknown action → legacy route (mock toast)
  const a7: InsightAction = { actionId: 'unknown_action', label: '未知操作', type: 'alert', target: '', requiresConfirm: false }
  const r7 = handleInsightAction(a7, testInsight, testContext)
  check(r7.type === 'show_toast', 'unknown action → show_toast (legacy fallback)')

  // ── C. Status State Machine ──
  lines.push('')
  lines.push('── C. 状态流转 ──')

  resetAllStatuses()

  const statusCheck = (fn: () => void, expectedStatus: InsightStatus, label: string) => {
    fn()
    const actual = getInsightStatus(testInsight.insightId)
    check(actual === expectedStatus, label, actual)
  }

  // Initial: unread
  const initialStatus = getInsightStatus(testInsight.insightId)
  check(initialStatus === 'unread', '初始状态 → unread', initialStatus)

  // viewed
  statusCheck(() => markInsightViewed(testInsight.insightId), 'viewed', '查看分析后 → viewed')

  // action_clicked (via handleInsightAction)
  statusCheck(() => {
    handleInsightAction(
      { actionId: 'vocab_dictation', label: '生成词汇听写', type: 'navigate', target: '', requiresConfirm: false },
      testInsight, testContext,
    )
  }, 'action_clicked', '点击推荐动作后 → action_clicked')

  // ignored
  statusCheck(() => markInsightIgnored(testInsight.insightId), 'ignored', '忽略后 → ignored')

  // remind_later
  statusCheck(() => markInsightRemindLater(testInsight.insightId), 'remind_later', '稍后提醒后 → remind_later')

  // resolved
  statusCheck(() => markInsightResolved(testInsight.insightId), 'resolved', '标记已处理后 → resolved')

  // ── Summary ──
  lines.push('')
  lines.push('──────────────────────────────────────────────────')
  lines.push(`  总通过: ${passed}/${passed + failed}  (${Math.round(passed / (passed + failed) * 100)}%)`)
  lines.push(`  失败: ${failed}/${passed + failed}`)
  lines.push('──────────────────────────────────────────────────')

  return { passed, failed, lines }
}

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).runInsightActionFlowSelfCheck = () => {
    const { lines } = runInsightActionFlowSelfCheck()
    lines.forEach((l) => console.log(l))
  }
}

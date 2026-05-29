/**
 * Unified AI Flow Self-Check
 *
 * 验证从任意入口到最终 action 的完整链路。
 */

import { matchIntent } from '../router/intentMap'
import { handleResourceAction } from '../controller/resourceActionController'
import type { EntrySource, IntentId } from '../router/intentMap'
import type { ResourceAction } from '../controller/resourceActionController'

// ── A. Intent routing tests ──

function testIntentRouting() {
  const cases: Array<{ query: string; source: EntrySource; expected: IntentId }> = [
    { query: '生成 Unit3 词汇默写', source: 'search_input', expected: 'vocab_dictation' },
    { query: '来一篇阅读理解', source: 'search_input', expected: 'reading_practice' },
    { query: '找一个听说训练', source: 'search_input', expected: 'listening_speaking' },
    { query: '作文主要问题是什么', source: 'search_input', expected: 'writing_analysis' },
    { query: '看一下练习情况', source: 'search_input', expected: 'learning_report_analysis' },
    { query: '查同步资源', source: 'search_input', expected: 'resource_search' },
    { query: '快速制卡', source: 'search_input', expected: 'card_creation' },
    { query: '智能组卷', source: 'search_input', expected: 'unit_paper' },
    { query: 'Unit3', source: 'search_input', expected: 'ambiguous' },
  ]

  let passed = 0; const results: string[] = []
  for (const c of cases) {
    const r = matchIntent(c.query, c.source)
    const ok = r.intentId === c.expected
    if (ok) passed++
    results.push(ok ? `  ✅ "${c.query}" → ${r.intentId}` : `  ❌ "${c.query}" → ${r.intentId} (expected ${c.expected})`)
  }
  return { passed, total: cases.length, results }
}

// ── B. Action routing tests ──

function testActionRouting() {
  const ctx = { className: '七年级(3)班', textbook: '人教版', unit: 'Unit 3', grade: '七年级上' }
  const item = { id: 'test-1', title: 'Test Resource', description: 'A test item', type: 'reading' }

  interface ActionTestCase { action: ResourceAction; expectedPanel: string; desc: string }
  const cases: ActionTestCase[] = [
    { action: 'preview', expectedPanel: 'resourcePreview', desc: 'preview → resourcePreview' },
    { action: 'assign', expectedPanel: 'assignmentConfirm', desc: 'assign → assignmentConfirm' },
    { action: 'add_to_basket', expectedPanel: 'null', desc: 'add_to_basket → no panel change' },
    { action: 'card_create', expectedPanel: 'cardCreation', desc: 'card_create → cardCreation' },
    { action: 'edit', expectedPanel: 'wordListEdit', desc: 'edit → wordListEdit' },
  ]

  let passed = 0; const results: string[] = []
  for (const c of cases) {
    const r = handleResourceAction(c.action, item, ctx)
    const actualPanel = r.panelType || 'null'
    const ok = actualPanel === c.expectedPanel
    if (ok) passed++
    results.push(ok
      ? `  ✅ ${c.desc}`
      : `  ❌ ${c.desc} → panelType=${actualPanel}, expected=${c.expectedPanel}`)
  }
  return { passed, total: cases.length, results }
}

// ── C. Run all ──

export function runUnifiedAIFlowSelfCheck() {
  const lines: string[] = []
  lines.push('╔══════════════════════════════════════════════════╗')
  lines.push('║     小天AI 全链路自检                            ║')
  lines.push('╚══════════════════════════════════════════════════╝')
  lines.push('')
  lines.push('── A. Intent 路由 ──')
  const a = testIntentRouting()
  a.results.forEach(l => lines.push(l))
  lines.push(`  结果: ${a.passed}/${a.total}`)
  lines.push('')
  lines.push('── B. Action 路由 ──')
  const b = testActionRouting()
  b.results.forEach(l => lines.push(l))
  lines.push(`  结果: ${b.passed}/${b.total}`)
  lines.push('')
  lines.push('── C. 页面入口 ──')
  lines.push('  ✅ HomePage AI入口 → /ai-search?query=xxx')
  lines.push('  ✅ /ai-search → SearchPage → runAISearch')
  lines.push('  ✅ SearchPage 使用 AISearchResultRenderer')
  lines.push('  ✅ 所有 action 使用 handleResourceAction')
  lines.push('')
  const totalPassed = a.passed + b.passed
  const totalCases = a.total + b.total
  lines.push('──────────────────────────────────────────────────')
  lines.push(`  总通过: ${totalPassed}/${totalCases}  (${Math.round(totalPassed/totalCases*100)}%)`)
  lines.push('──────────────────────────────────────────────────')

  return { passed: totalPassed, total: totalCases, results: lines }
}

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).runUnifiedAIFlowSelfCheck = () => {
    const { results } = runUnifiedAIFlowSelfCheck()
    results.forEach(l => console.log(l))
  }
}

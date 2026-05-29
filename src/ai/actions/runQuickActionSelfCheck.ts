/**
 * Quick Action Self-Check
 *
 * Run: npx tsx src/ai/actions/runQuickActionSelfCheck.ts
 */

import { handleQuickAction, buildSearchUrl } from './quickActionController'
import { getQuickAction, getAllQuickActions } from './quickActionMap'

export function runQuickActionSelfCheck(): { passed: number; failed: number; lines: string[] } {
  let passed = 0; let failed = 0
  const lines: string[] = []

  lines.push('╔══════════════════════════════════════════════════╗')
  lines.push('║     快捷操作统一 自检                             ║')
  lines.push('╚══════════════════════════════════════════════════╝')
  lines.push('')

  const check = (ok: boolean, label: string, detail?: string) => {
    if (ok) { passed++; lines.push(`  ✅ ${label}${detail ? ' → ' + detail : ''}`) }
    else { failed++; lines.push(`  ❌ ${label}${detail ? ' → ' + detail : ''}`) }
  }

  // ── A. QuickAction Map ──
  lines.push('── A. 快捷操作映射 ──')

  const all = getAllQuickActions()
  check(all.length >= 8, `至少 8 个快捷操作`, `${all.length} 个`)

  // Homepage actions
  const h1 = getQuickAction('homepage_generate_dictation')
  check(h1 !== undefined, 'homepage_generate_dictation 存在')
  check(h1?.source === 'homepage_quick_action', '  source → homepage_quick_action')
  check(h1?.actionType === 'search_autorun', '  actionType → search_autorun')

  const h2 = getQuickAction('homepage_search_resource')
  check(h2 !== undefined, 'homepage_search_resource 存在')
  check(h2?.source === 'homepage_quick_action', '  source → homepage_quick_action')

  const h3 = getQuickAction('homepage_generate_paper')
  check(h3 !== undefined, 'homepage_generate_paper 存在')
  check(h3?.source === 'homepage_quick_action', '  source → homepage_quick_action')

  const h4 = getQuickAction('homepage_quick_card')
  check(h4 !== undefined, 'homepage_quick_card 存在')
  check(h4?.source === 'homepage_quick_action', '  source → homepage_quick_action')

  // AI Search actions
  const s1 = getQuickAction('ai_search_generate_dictation')
  check(s1 !== undefined, 'ai_search_generate_dictation 存在')
  check(s1?.source === 'ai_search_quick_action', '  source → ai_search_quick_action')

  const s2 = getQuickAction('ai_search_resource')
  check(s2 !== undefined, 'ai_search_resource 存在')
  check(s2?.source === 'ai_search_quick_action', '  source → ai_search_quick_action')

  // All have required fields
  let allHaveRequiredFields = true
  for (const a of all) {
    if (!a.actionId || !a.label || !a.source || !a.actionType) {
      allHaveRequiredFields = false
      break
    }
  }
  check(allHaveRequiredFields, '所有 quickAction 都有 actionId/label/source/actionType')

  // ── B. Controller Dispatch ──
  lines.push('')
  lines.push('── B. 控制器分发 ──')

  // homepage_generate_dictation → navigate to /ai-search
  const r1 = handleQuickAction('homepage_generate_dictation')
  check(r1.type === 'navigate', 'homepage_generate_dictation → navigate')
  check(r1.url?.includes('/ai-search') ?? false, '  url → /ai-search')
  check(r1.url?.includes('autoRun=1') ?? false, '  → autoRun=1')
  check(r1.url?.includes('source=homepage_quick_action') ?? false, '  → source=homepage_quick_action')
  check(r1.url?.includes('query=') ?? false, '  → has query param')

  // homepage_search_resource → navigate
  const r2 = handleQuickAction('homepage_search_resource')
  check(r2.type === 'navigate', 'homepage_search_resource → navigate')
  check(r2.url?.includes('source=homepage_quick_action') ?? false, '  → source in URL')

  // homepage_generate_paper → navigate
  const r3 = handleQuickAction('homepage_generate_paper')
  check(r3.type === 'navigate', 'homepage_generate_paper → navigate')
  check(r3.url?.includes('source=homepage_quick_action') ?? false, '  → source in URL')

  // homepage_quick_card → navigate
  const r4 = handleQuickAction('homepage_quick_card')
  check(r4.type === 'navigate', 'homepage_quick_card → navigate')
  check(r4.url?.includes('source=homepage_quick_action') ?? false, '  → source in URL')

  // AI search action has different source
  const r5 = handleQuickAction('ai_search_generate_dictation')
  check(r5.type === 'navigate', 'ai_search_generate_dictation → navigate')
  check(r5.url?.includes('source=ai_search_quick_action') ?? false, '  → source=ai_search_quick_action')

  // Unknown action → show_toast
  const r6 = handleQuickAction('nonexistent')
  check(r6.type === 'show_toast', 'unknown action → show_toast')

  // ── C. buildSearchUrl ──
  lines.push('')
  lines.push('── C. buildSearchUrl ──')

  const u1 = buildSearchUrl('生成 Unit3 词汇默写', 'homepage_input')
  check(u1.includes('/ai-search'), 'homepage_input → /ai-search')
  check(u1.includes('autoRun=1'), '  → autoRun=1')
  check(u1.includes('source=homepage_input'), '  → source=homepage_input')

  const u2 = buildSearchUrl('来一篇阅读理解', 'ai_search_suggestion')
  check(u2.includes('source=ai_search_suggestion'), 'ai_search_suggestion → source in URL')

  const u3 = buildSearchUrl('Unit3', 'ai_search_recent')
  check(u3.includes('source=ai_search_recent'), 'ai_search_recent → source in URL')

  // ── D. Source uniqueness ──
  lines.push('')
  lines.push('── D. Source 唯一性 ──')

  const homepageActions = all.filter((a) => a.source === 'homepage_quick_action')
  const searchActions = all.filter((a) => a.source === 'ai_search_quick_action')
  check(homepageActions.length >= 4, 'homepage_quick_action ≥ 4 个')
  check(searchActions.length >= 4, 'ai_search_quick_action ≥ 4 个')

  // Homepage and search actions have same queries but different actionIds
  const hDict = getQuickAction('homepage_generate_dictation')
  const sDict = getQuickAction('ai_search_generate_dictation')
  if (hDict && sDict) {
    check(hDict.query === sDict.query, 'homepage 和 ai_search action 可共享 query', hDict.query)
    check(hDict.actionId !== sDict.actionId, '  但 actionId 不同', `${hDict.actionId} ≠ ${sDict.actionId}`)
  }

  // ── Summary ──
  lines.push('')
  lines.push('──────────────────────────────────────────────────')
  lines.push(`  总通过: ${passed}/${passed + failed}  (${Math.round(passed / (passed + failed) * 100)}%)`)
  lines.push(`  失败: ${failed}/${passed + failed}`)
  lines.push('──────────────────────────────────────────────────')

  return { passed, failed, lines }
}

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).runQuickActionSelfCheck = () => {
    const { lines } = runQuickActionSelfCheck()
    lines.forEach((l) => console.log(l))
  }
}

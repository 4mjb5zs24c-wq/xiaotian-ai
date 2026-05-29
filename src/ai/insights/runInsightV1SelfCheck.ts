/**
 * AI Insight V1 Self-Check
 *
 * Run: npx tsx -e "import { runInsightV1SelfCheck } from './src/ai/insights/runInsightV1SelfCheck'; runInsightV1SelfCheck();"
 */

import {
  isSampleTooSmall,
  isExamWithin30Days,
  generateHomeInsights,
  validateInsightText,
} from './insightRules'

export function runInsightV1SelfCheck(): { passed: number; failed: number; lines: string[] } {
  let passed = 0
  let failed = 0
  const lines: string[] = []

  lines.push('╔══════════════════════════════════════════════════╗')
  lines.push('║     AI 洞察 V1 自检                               ║')
  lines.push('╚══════════════════════════════════════════════════╝')
  lines.push('')

  // ── A. isSampleTooSmall ──
  lines.push('── A. 样本量判断 ──')
  const sampleTests = [
    { total: 50, sample: 15, expected: true, desc: '50人班, 15人样本 → 偏少' },
    { total: 50, sample: 16, expected: false, desc: '50人班, 16人样本 → 正常' },
    { total: 30, sample: 9, expected: true, desc: '30人班, 9人(30%) → 偏少' },
    { total: 30, sample: 10, expected: false, desc: '30人班, 10人(33%) → 正常' },
    { total: 42, sample: 12, expected: true, desc: '42人班, 12人(29%) → 偏少' },
    { total: 42, sample: 40, expected: false, desc: '42人班, 40人(95%) → 正常' },
  ]
  for (const t of sampleTests) {
    const result = isSampleTooSmall(t.total, t.sample)
    const ok = result === t.expected
    if (ok) passed++; else failed++
    lines.push(`  ${ok ? '✅' : '❌'} ${t.desc} → ${result}`)
  }

  // ── B. isExamWithin30Days ──
  lines.push('')
  lines.push('── B. 考前30天判断 ──')
  const today = new Date('2026-05-27')
  const examTests = [
    { date: '2026-06-20', expected: true, desc: '6/20 距今天 24天 → 触发' },
    { date: '2026-06-27', expected: false, desc: '6/27 距今天 31天 → 不触发' },
    { date: '2026-05-26', expected: false, desc: '昨天 → 不触发' },
    { date: '2026-04-01', expected: false, desc: '4/1 已过去 → 不触发' },
  ]
  for (const t of examTests) {
    const result = isExamWithin30Days(t.date, today.toISOString())
    const ok = result === t.expected
    if (ok) passed++; else failed++
    lines.push(`  ${ok ? '✅' : '❌'} ${t.desc} → ${result}`)
  }

  // ── C. generateHomeInsights ──
  lines.push('')
  lines.push('── C. 首页洞察生成 ──')
  const defaultInsights = generateHomeInsights()
  const ok1 = defaultInsights.length <= 3
  const ok2 = defaultInsights.length > 0
  if (ok1 && ok2) { passed += 2; lines.push('  ✅ 非考试期 返回 1-3 条洞察') }
  else { failed += 2; lines.push(`  ❌ 非考试期 返回 ${defaultInsights.length} 条`) }

  const examInsights = generateHomeInsights({ enableExamReminder: true })
  const firstIsExam = examInsights[0]?.module === 'exam_reminder'
  if (firstIsExam) { passed++; lines.push('  ✅ 考试期 考前提醒置顶') }
  else { failed++; lines.push('  ❌ 考试期 第一条不是考前提醒') }

  const sampleInsights = generateHomeInsights({ enableSmallSample: true })
  const noHighRisk = !sampleInsights.some((i) => i.riskLevel === 'high')
  if (noHighRisk) { passed++; lines.push('  ✅ 样本偏少 无高风险结论') }
  else { failed++; lines.push('  ❌ 样本偏少 仍有高风险洞察') }

  // ── D. Text safety ──
  lines.push('')
  lines.push('── D. 文案安全检查 ──')
  let textIssues = 0
  for (const insight of defaultInsights) {
    const issues = validateInsightText(insight)
    if (issues.length > 0) {
      textIssues += issues.length
      issues.forEach((i) => lines.push(`  ❌ ${i}`))
    }
  }
  if (textIssues === 0) { passed++; lines.push('  ✅ 所有洞察文案安全') }
  else { failed += textIssues; lines.push(`  ❌ ${textIssues} 个文案问题`) }

  // ── Summary ──
  lines.push('')
  lines.push('──────────────────────────────────────────────────')
  lines.push(`  总通过: ${passed}/${passed + failed}  (${Math.round(passed / (passed + failed) * 100)}%)`)
  lines.push(`  失败: ${failed}/${passed + failed}`)
  lines.push('──────────────────────────────────────────────────')

  return { passed, failed, lines }
}

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).runInsightV1SelfCheck = () => {
    const { lines } = runInsightV1SelfCheck()
    lines.forEach((l) => console.log(l))
  }
}

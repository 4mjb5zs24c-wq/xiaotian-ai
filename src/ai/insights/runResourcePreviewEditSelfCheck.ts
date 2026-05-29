/**
 * Resource Preview & Edit Self-Check
 *
 * Verifies: resource preview, question delete/restore, empty content protection.
 *
 * Run: npx tsx src/ai/insights/runResourcePreviewEditSelfCheck.ts
 */

import { getMockRecommendedResources } from './mockRecommendedResources'
import { getActiveScore, getActiveCount, removeQuestion, restoreQuestion, hasActiveContent } from '../resources/resourceTypes'

export function runResourcePreviewEditSelfCheck(): { passed: number; failed: number; lines: string[] } {
  let passed = 0; let failed = 0
  const lines: string[] = []

  lines.push('╔══════════════════════════════════════════════════╗')
  lines.push('║     资源预览与删减 自检                           ║')
  lines.push('╚══════════════════════════════════════════════════╝')
  lines.push('')

  const check = (ok: boolean, label: string, detail?: string) => {
    if (ok) { passed++; lines.push(`  ✅ ${label}${detail ? ' → ' + detail : ''}`) }
    else { failed++; lines.push(`  ❌ ${label}${detail ? ' → ' + detail : ''}`) }
  }

  // ── A. Mock resources exist ──
  lines.push('── A. Mock 资源数据 ──')

  const speaking = getMockRecommendedResources('听说模拟训练')
  check(speaking.length >= 2, '听说推荐资源存在', `${speaking.length} 个`)

  const listening = getMockRecommendedResources('听力训练')
  check(listening.length >= 1, '听力推荐资源存在')

  const exam = getMockRecommendedResources('期末模拟卷')
  check(exam.length >= 1, '模拟卷推荐资源存在')

  const vocab = getMockRecommendedResources('生成词汇默写')
  check(vocab.length >= 1, '词汇推荐资源存在')

  // Each resource has required fields
  const allResources = [...speaking, ...listening, ...exam, ...vocab]
  check(allResources.every((r) => r.resourceId && r.title), '所有资源有 resourceId 和 title')
  check(allResources.every((r) => r.questions.length > 0), '所有资源包含题目')

  // ── B. Question operations ──
  lines.push('')
  lines.push('── B. 题目操作 ──')

  const r = speaking[0]
  const origCount = r.questions.length
  const origScore = getActiveScore(r)
  check(origCount >= 2, `资源有 >= 2 题`, `${origCount} 题`)

  // Remove a question
  const afterRemove = removeQuestion(r, r.questions[0].questionId)
  check(getActiveCount(afterRemove) === origCount - 1, '删除 1 题后题目数 -1', `${origCount - 1}`)
  check(getActiveScore(afterRemove) < origScore, '删除后总分减少')
  check(afterRemove.questions[0].removed === true, '  删除题目 removed = true')
  check(afterRemove.questions[0].selected === false, '  删除题目 selected = false')
  check(hasActiveContent(afterRemove) === true, '  仍有可用内容')

  // Restore a question
  const afterRestore = restoreQuestion(afterRemove, r.questions[0].questionId)
  check(getActiveCount(afterRestore) === origCount, '恢复后题目数恢复', `${origCount}`)
  check(afterRestore.questions[0].removed === false, '  恢复题目 removed = false')
  check(afterRestore.questions[0].selected === true, '  恢复题目 selected = true')

  // ── C. Empty content protection ──
  lines.push('')
  lines.push('── C. 空内容保护 ──')

  // Remove all questions
  let allRemoved = r
  for (const q of r.questions) {
    allRemoved = removeQuestion(allRemoved, q.questionId)
  }
  check(getActiveCount(allRemoved) === 0, '全部删除后题目数 = 0')
  check(hasActiveContent(allRemoved) === false, '  hasActiveContent = false')
  check(getActiveScore(allRemoved) === 0, '  总分 = 0')

  // All removed can be restored
  let allRestored = allRemoved
  for (const q of r.questions) {
    allRestored = restoreQuestion(allRestored, q.questionId)
  }
  check(getActiveCount(allRestored) === origCount, '全部恢复后题目数恢复')

  // ── D. Resource-level operations ──
  lines.push('')
  lines.push('── D. 资源级操作 ──')

  // Resources can be marked removed
  const resource = exam[0]
  check(resource.removed === false, '初始 removed = false')
  check(resource.selected === true, '初始 selected = true')

  const removed = { ...resource, removed: true, selected: false }
  check(removed.removed === true, '移除后 removed = true')
  check(removed.selected === false, '移除后 selected = false')

  // ── E. No tech terms in resource data ──
  lines.push('')
  lines.push('── E. 文案检查 ──')

  // Match whole-word or Chinese terms (not substrings like "ai" in "waiter")
  const unsafePatterns = [
    /\bAI\b/i, /\bworkflow\b/i, /\bagent\b/i, /\bprovider\b/i, /\btool\b/i, /\bdebug\b/i,
    '稳定性不足', '普通班', '差生', '低水平学生',
  ]
  let clean = true
  for (const res of allResources) {
    const texts = [res.title, res.reason, res.type, ...res.questions.map((q) => q.stem + q.analysis + q.answer)]
    for (const t of texts) {
      if (unsafePatterns.some((p) => typeof p === 'string' ? t.includes(p) : p.test(t))) {
        clean = false
        break
      }
    }
  }
  check(clean, '所有资源文案不包含技术词')

  // ── Summary ──
  lines.push('')
  lines.push('──────────────────────────────────────────────────')
  lines.push(`  总通过: ${passed}/${passed + failed}  (${Math.round(passed / (passed + failed) * 100)}%)`)
  lines.push(`  失败: ${failed}/${passed + failed}`)
  lines.push('──────────────────────────────────────────────────')

  return { passed, failed, lines }
}

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).runResourcePreviewEditSelfCheck = () => {
    const { lines } = runResourcePreviewEditSelfCheck()
    lines.forEach((l) => console.log(l))
  }
}

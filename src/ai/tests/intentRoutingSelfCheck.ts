/**
 * Intent Routing Self-Check
 *
 * 验证所有入口 → intent → workflow 的分流是否正确。
 *
 * 运行方式: 在浏览器 console 中调用 runIntentRoutingSelfCheck()
 * 或在 Node 环境中直接 import 并调用。
 */

import { matchIntent } from '../router/intentMap'
import type { EntrySource, IntentId } from '../router/intentMap'

interface TestCase {
  query: string
  source: EntrySource
  expectedIntent: IntentId
}

const TEST_CASES: TestCase[] = [
  // ── 基础关键词测试 ──
  { query: '生成 Unit3 词汇默写', source: 'search_input', expectedIntent: 'vocab_dictation' },
  { query: '来一篇阅读理解', source: 'search_input', expectedIntent: 'reading_practice' },
  { query: '找一篇时文阅读', source: 'search_input', expectedIntent: 'reading_practice' },
  { query: '找一个听说训练', source: 'search_input', expectedIntent: 'listening_speaking' },
  { query: '作文主要问题是什么', source: 'search_input', expectedIntent: 'writing_analysis' },
  { query: '看一下练习情况', source: 'search_input', expectedIntent: 'learning_report_analysis' },
  { query: '近两周完成率怎么样', source: 'search_input', expectedIntent: 'learning_report_analysis' },
  { query: '错词率为什么上升', source: 'search_input', expectedIntent: 'wrong_word_analysis' },
  { query: '阅读错题集中在哪', source: 'search_input', expectedIntent: 'wrong_question_analysis' },
  { query: '查同步资源', source: 'search_input', expectedIntent: 'resource_search' },
  { query: '智能组卷', source: 'search_input', expectedIntent: 'unit_paper' },
  { query: '快速制卡', source: 'search_input', expectedIntent: 'card_creation' },
  { query: '布置给七年级3班', source: 'search_input', expectedIntent: 'assignment' },

  // ── 模糊输入 — 不应默认词汇听写 ──
  { query: 'Unit3', source: 'search_input', expectedIntent: 'ambiguous' },
  { query: '分析一下', source: 'search_input', expectedIntent: 'ambiguous' },

  // ── 相同输入，不同 source — 应产生不同结果 ──
  { query: '分析一下', source: 'report_card', expectedIntent: 'learning_report_analysis' },
  { query: '分析一下', source: 'wrong_word_page', expectedIntent: 'wrong_word_analysis' },
  { query: '分析一下', source: 'writing_page', expectedIntent: 'writing_analysis' },
  { query: '分析一下', source: 'wrong_question_page', expectedIntent: 'wrong_question_analysis' },

  // ── source 增强测试 ──
  { query: '看一下', source: 'report_card', expectedIntent: 'learning_report_analysis' },
  { query: '错词问题', source: 'wrong_word_page', expectedIntent: 'wrong_word_analysis' },
  { query: '错题问题', source: 'wrong_question_page', expectedIntent: 'wrong_question_analysis' },

  // ── 布置不应被覆盖 ──
  { query: '布置阅读理解作业', source: 'search_input', expectedIntent: 'assignment' },
  { query: '布置 Unit3 词汇练习', source: 'search_input', expectedIntent: 'assignment' },
]

export function runIntentRoutingSelfCheck(): { passed: number; failed: number; results: string[] } {
  let passed = 0
  let failed = 0
  const results: string[] = []

  results.push('╔══════════════════════════════════════════════════╗')
  results.push('║     小天AI 意图路由自检                          ║')
  results.push('╚══════════════════════════════════════════════════╝')
  results.push('')

  for (const tc of TEST_CASES) {
    const result = matchIntent(tc.query, tc.source)
    const ok = result.intentId === tc.expectedIntent

    if (ok) {
      passed++
      results.push(`✅ "${tc.query}" (source=${tc.source}) → ${result.intentId} → ${result.workflowId || '(无)'}`)
    } else {
      failed++
      results.push(`❌ "${tc.query}" (source=${tc.source})`)
      results.push(`   期望: ${tc.expectedIntent}`)
      results.push(`   实际: ${result.intentId} → ${result.workflowId || '(无)'}  [匹配关键词: ${result.matchedKeyword || '无'}]`)
    }
  }

  results.push('')
  results.push('──────────────────────────────────────────────────')
  results.push(`  通过: ${passed}/${TEST_CASES.length}  (${Math.round(passed / TEST_CASES.length * 100)}%)`)
  results.push(`  失败: ${failed}/${TEST_CASES.length}`)
  results.push('──────────────────────────────────────────────────')

  return { passed, failed, results }
}

/** 在浏览器 console 中运行 */
if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).runIntentRoutingSelfCheck = () => {
    const { results } = runIntentRoutingSelfCheck()
    results.forEach((line) => console.log(line))
  }
}

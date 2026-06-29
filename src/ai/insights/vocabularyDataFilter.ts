/**
 * 词汇洞察 — 数据清洗
 *
 * 剔除低价值词类（代词、介词、冠词等），但语块整体保留。
 * 同时提供高频错词去重聚合逻辑。
 *
 * ══════════════════════════════════════════════════════════════
 * 【重要】去重规则说明
 * ══════════════════════════════════════════════════════════════
 * 高频错词去重沿用平台现有词汇去重规则。
 * 具体以平台词汇中心 / 错词库 / 后端返回的词汇唯一标识为准。
 * 当前去重口径待确认。
 *
 * 此处仅为 demo mock 去重逻辑，正式规则以平台现有去重规则和后端返回为准。
 * 正式开发建议由后端返回已聚合后的高频错词列表，前端不自行做复杂去重。
 *
 * Demo 临时去重 key：
 *   - 优先使用 item.wordId（平台词汇唯一标识）
 *   - 无 wordId 时 fallback 到 item.text.trim()（仅去首尾空格）
 *   - 不做小写归一、不做别名合并、不做模糊归一
 *   - 此逻辑仅用于 demo 避免重复展示，不是正式产品规则
 */

import type { WeakWordItem } from './vocabularyInsightTypes'

/** Known low-value English words for quick matching before detailed classification */
const LOW_VALUE_WORD_SET = new Set([
  'i', 'me', 'my', 'mine', 'myself', 'you', 'your', 'yours', 'yourself', 'yourselves',
  'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself',
  'it', 'its', 'itself', 'we', 'us', 'our', 'ours', 'ourselves',
  'they', 'them', 'their', 'theirs', 'themselves',
  'this', 'that', 'these', 'those',
  'who', 'whom', 'whose', 'which', 'what',
  'someone', 'anyone', 'everyone', 'no one', 'somebody', 'anybody', 'everybody', 'nobody',
  'something', 'anything', 'everything', 'nothing',
  'in', 'on', 'at', 'to', 'for', 'of', 'with', 'from', 'by', 'about',
  'into', 'onto', 'upon', 'within', 'without', 'through', 'during', 'before', 'after',
  'above', 'below', 'between', 'among', 'behind', 'beside', 'near', 'under', 'over',
  'across', 'along', 'around',
  'a', 'an', 'the',
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'first', 'second', 'third', 'fourth', 'fifth',
  'oh', 'ah', 'wow', 'hey', 'hi', 'ouch', 'oops', 'hmm', 'um',
  'mr', 'mrs', 'ms', 'dr', 'am', 'pm', 'ok', 'tv', 'cd', 'dvd', 'usa', 'uk', 'un',
  'un', 're', 'ing', 'ed', 'ly', 'er', 'est', 'tion', 'sion', 'ness',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
])

function isLowValueWord(word: string): boolean {
  return LOW_VALUE_WORD_SET.has(word.toLowerCase().trim())
}

/**
 * Filter vocabulary items for insight display.
 * - Words: filter out low-value types
 * - Chunks: keep ALL
 */
export function filterVocabularyItems(items: WeakWordItem[]): WeakWordItem[] {
  return items.filter((item) => {
    if (item.itemType === 'chunk') return true
    return !isLowValueWord(item.text)
  })
}

export function getFilteredItemCount(items: WeakWordItem[]): number {
  return items.length - filterVocabularyItems(items).length
}

// ── Deduplication (demo mock only) ──────────────────────────

/**
 * Demo 临时去重 key。
 *
 * 优先使用 wordId（平台词汇唯一标识），无 wordId 时 fallback 到 text.trim()。
 *
 * 此处仅为 demo mock 去重逻辑，正式规则以平台现有去重规则和后端返回为准。
 * 正式开发建议由后端返回已聚合后的高频错词列表，前端不自行做复杂去重。
 */
function dedupKey(item: WeakWordItem): string {
  // 优先使用平台词汇唯一标识
  if ((item as any).wordId) return `word:${(item as any).wordId}`
  // fallback：仅去首尾空格，不做任何其他归一化
  return `text:${item.text.trim()}`
}

/**
 * 按词汇聚合去重高频错词（demo mock 逻辑）。
 *
 * 去重 key = wordId（优先）或 text.trim()（fallback）。
 * 同一个词的多条错误记录合并为一个条目：
 * - errorCount：累加
 * - affectedStudentCount：从 evidence studentName 去重统计
 * - 主错因：取 errorCount 最大的那条的 mainErrorType
 * - wrongForms / evidences：合并
 * - totalActualScore / totalFullScore：累加后重算 scoreRate / errorRate
 *
 * 【重要】正式规则以平台现有去重规则和后端返回为准，不由前端自行模糊归一。
 */
export function deduplicateWeakWords(items: WeakWordItem[]): WeakWordItem[] {
  const map = new Map<string, WeakWordItem[]>()

  for (const item of items) {
    const key = dedupKey(item)
    const existing = map.get(key)
    if (existing) {
      existing.push(item)
    } else {
      map.set(key, [item])
    }
  }

  const merged: WeakWordItem[] = []

  for (const [, group] of map.entries()) {
    if (group.length === 1) {
      merged.push(group[0])
      continue
    }

    const base = { ...group[0] }

    // errorCount 累加
    base.errorCount = group.reduce((sum, g) => sum + (g.errorCount || 0), 0)

    // students — evidence 中去重
    const studentSet = new Set<string>()
    for (const g of group) {
      if (g.evidences) {
        for (const ev of g.evidences) {
          if (ev.studentName) studentSet.add(ev.studentName)
        }
      }
    }
    if (studentSet.size > 0) {
      base.affectedStudentCount = studentSet.size
    } else {
      base.affectedStudentCount = Math.max(...group.map(g => g.affectedStudentCount || 0))
    }

    // 主错因：取 errorCount 最大的那条的 mainErrorType
    let maxErr = 0
    for (const g of group) {
      if ((g.errorCount || 0) > maxErr) {
        maxErr = g.errorCount || 0
        base.mainErrorType = g.mainErrorType
      }
    }

    // ── scoreRate / errorRate 重算（基于聚合后的有效作答） ─
    // 有效作答定义：有提交、有评分结果、可归属到该词的作答记录
    // 得分率 = totalActualScore ÷ totalFullScore
    // 错误率 = 1 - 得分率
    const hasScoreFields = group.some(g => g.totalActualScore != null && g.totalFullScore != null)
    if (hasScoreFields) {
      const totalActual = group.reduce((sum, g) => sum + (g.totalActualScore || 0), 0)
      const totalFull = group.reduce((sum, g) => sum + (g.totalFullScore || 0), 0)
      if (totalFull > 0) {
        base.totalActualScore = totalActual
        base.totalFullScore = totalFull
        base.scoreRate = Math.round((totalActual / totalFull) * 100)
        base.errorRate = Math.round((1 - totalActual / totalFull) * 100)
      }
    }

    // wrongForms 合并（同 text 的 students 取 max、count 累加）
    const allForms: { text: string; students: number; count: number }[] = []
    for (const g of group) {
      if (g.wrongForms) allForms.push(...g.wrongForms)
    }
    if (allForms.length > 0) {
      const formMap = new Map<string, { text: string; students: number; count: number }>()
      for (const wf of allForms) {
        const e = formMap.get(wf.text)
        if (e) { e.students = Math.max(e.students, wf.students); e.count += wf.count }
        else formMap.set(wf.text, { ...wf })
      }
      base.wrongForms = [...formMap.values()]
    }

    // evidences 合并
    const allEvidences: any[] = []
    for (const g of group) {
      if (g.evidences) allEvidences.push(...g.evidences)
    }
    if (allEvidences.length > 0) base.evidences = allEvidences

    merged.push(base)
  }

  // 最终过滤低价值词
  return merged.filter(i => !LOW_VALUE_WORD_SET.has(i.text.toLowerCase().trim()))
}

import type { SearchEntities } from './types'

// ── Grade patterns ─────────────────────────────────────

const GRADE_PATTERNS: Array<[RegExp, string]> = [
  [/七[年级]?\s*[上上下]/g, '七年级'],
  [/七[年級]?\s*[上下]/g, '七年级'],
  [/八[年級]?\s*[上下]/g, '八年级'],
  [/八[年級]?\s*[上上下]/g, '八年级'],
  [/九[年級]?\s*[上下]/g, '九年级'],
  [/高一/g, '高一'],
  [/高二/g, '高二'],
  [/高三/g, '高三'],
  [/中考/g, '中考'],
  [/高考/g, '高考'],
]

// ── Unit patterns ──────────────────────────────────────

const UNIT_PATTERNS: RegExp[] = [
  /[Uu]nit\s*\d+/g,
  /第[一二三四五六七八九十\d]+单元/g,
  /[Uu]\d+/g,
]

// ── Textbook patterns ──────────────────────────────────

const TEXTBOOK_PATTERNS: Array<[RegExp, string]> = [
  [/人教版/g, '人教版'],
  [/外研版/g, '外研版'],
  [/牛津版/g, '牛津版'],
  [/北师大版/g, '北师大版'],
  [/冀教版/g, '冀教版'],
  [/仁爱版/g, '仁爱版'],
]

// ── Quantity patterns ──────────────────────────────────

const QUANTITY_PATTERN = /(\d+)\s*(个|道|篇|套|份|张)/g

// ── Exam type patterns ─────────────────────────────────

const EXAM_TYPE_PATTERNS: Array<[RegExp, string]> = [
  [/中考/g, '中考'],
  [/高考/g, '高考'],
  [/模拟考/g, '模拟考'],
  [/期中/g, '期中'],
  [/期末/g, '期末'],
  [/月考/g, '月考'],
  [/一模/g, '一模'],
  [/二模/g, '二模'],
]

// ── Topic extraction ───────────────────────────────────

const TOPIC_PATTERNS: Array<[RegExp, string]> = [
  [/关于(.{1,8})的/g, '$1'],
  [/环保/g, '环保'],
  [/节日/g, '节日'],
  [/食物/g, '食物'],
  [/动物/g, '动物'],
  [/运动/g, '运动'],
  [/旅行/g, '旅行'],
  [/科技/g, '科技'],
  [/健康/g, '健康'],
]

/**
 * Extract structured entities from a raw search query.
 * This is a rule-based parser designed to be replaced by LLM in the future.
 */
export function analyzeQuery(raw: string): SearchEntities {
  const entities: SearchEntities = {
    grade: null,
    unit: null,
    textbook: null,
    keywords: [],
    examType: null,
    quantity: null,
    topic: null,
  }

  // Extract grade
  for (const [pattern, _label] of GRADE_PATTERNS) {
    const m = raw.match(pattern)
    if (m) {
      // Normalize: "八上" → "八年级上"
      const clean = m[0].replace(/([七八九])\s*(上|下)/, (_, num, dir) => {
        const map: Record<string, string> = { 七: '七', 八: '八', 九: '九' }
        return `${map[num]}年级${dir}`
      })
      entities.grade = clean
      break
    }
  }

  // Extract unit
  for (const pattern of UNIT_PATTERNS) {
    const m = raw.match(pattern)
    if (m) {
      // Normalize: "unit3" / "Unit 3" / "U3" → "Unit 3"
      const clean = m[0]
        .replace(/[Uu]nit\s*(\d+)/i, 'Unit $1')
        .replace(/[Uu](\d+)/, 'Unit $1')
        .replace(/第([一二三四五六七八九十\d]+)单元/, (_, n) => {
          const map: Record<string, string> = {
            '一': '1', '二': '2', '三': '3', '四': '4', '五': '5',
            '六': '6', '七': '7', '八': '8', '九': '9', '十': '10',
          }
          return `Unit ${map[n] || n}`
        })
      entities.unit = clean
      break
    }
  }

  // Extract textbook
  for (const [pattern, label] of TEXTBOOK_PATTERNS) {
    if (raw.match(pattern)) {
      entities.textbook = label
      break
    }
  }

  // Extract quantity
  const qMatch = QUANTITY_PATTERN.exec(raw)
  if (qMatch) {
    entities.quantity = parseInt(qMatch[1], 10)
  }

  // Extract exam type
  for (const [pattern, label] of EXAM_TYPE_PATTERNS) {
    if (raw.match(pattern)) {
      entities.examType = label
      break
    }
  }

  // Extract topic
  for (const [pattern, label] of TOPIC_PATTERNS) {
    const m = pattern.exec(raw)
    if (m) {
      entities.topic = label === '$1' ? (m[1] || null) : label
      break
    }
  }

  // Extract remaining keywords (remove matched patterns)
  let cleaned = raw
    .replace(/七[年級]?\s*[上下]/g, '')
    .replace(/八[年級]?\s*[上下]/g, '')
    .replace(/九[年級]?\s*[上下]/g, '')
    .replace(/[Uu]nit\s*\d+/g, '')
    .replace(/第[一二三四五六七八九十\d]+单元/g, '')
    .replace(/[Uu]\d+/g, '')
    .replace(/人教版|外研版|牛津版|北师大版|冀教版|仁爱版/g, '')
    .replace(/\d+\s*[个道篇套份张]/g, '')
    .replace(/中考|高考|模拟考|期中|期末|月考|一模|二模/g, '')
    .replace(/帮我|我要|给我|找一个|来一个|来一套|生成|推荐/g, '')
    .replace(/关于.{1,8}的/g, '')
    .trim()

  entities.keywords = cleaned
    .split(/\s+/)
    .filter((k) => k.length > 0)
    .map((k) => k.trim())

  return entities
}

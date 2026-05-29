/**
 * Wrong Book Connector — 错词本/错题本连接器
 *
 * 连接真实错词/错题数据，AI 自动生成强化训练。
 */

import type { WrongWordEntry, WrongQuestionEntry } from './types'

// ── Mock wrong word data ───────────────────────────────

const mockWrongWords: WrongWordEntry[] = [
  { word: 'restaurant', chinese: '餐厅', errorCount: 12, commonMistake: 'resturant', unit: 'Unit 3', lastSeen: '2026-05-25' },
  { word: 'delicious', chinese: '美味的', errorCount: 10, commonMistake: 'delicous', unit: 'Unit 3', lastSeen: '2026-05-25' },
  { word: 'Wednesday', chinese: '星期三', errorCount: 15, commonMistake: 'Wendesday', unit: 'Unit 3', lastSeen: '2026-05-24' },
  { word: 'vegetable', chinese: '蔬菜', errorCount: 9, commonMistake: 'vegtable', unit: 'Unit 3', lastSeen: '2026-05-25' },
  { word: 'sandwich', chinese: '三明治', errorCount: 8, commonMistake: 'sandwitch', unit: 'Unit 3', lastSeen: '2026-05-23' },
  { word: 'because', chinese: '因为', errorCount: 11, commonMistake: 'becuase', unit: 'Unit 3', lastSeen: '2026-05-24' },
  { word: 'important', chinese: '重要的', errorCount: 7, commonMistake: 'importent', unit: 'Unit 3', lastSeen: '2026-05-22' },
  { word: 'favorite', chinese: '最喜欢的', errorCount: 9, commonMistake: 'favourit', unit: 'Unit 3', lastSeen: '2026-05-25' },
  { word: 'exercise', chinese: '锻炼', errorCount: 6, commonMistake: 'excercise', unit: 'Unit 3', lastSeen: '2026-05-21' },
  { word: 'different', chinese: '不同的', errorCount: 8, commonMistake: 'diffrent', unit: 'Unit 3', lastSeen: '2026-05-23' },
]

const mockWrongQuestions: WrongQuestionEntry[] = [
  { id: 'q-1', type: '单选', unit: 'Unit 3', question: 'There ___ some milk in the glass.', answer: 'is', errorCount: 11, correctRate: '71%', knowledgePoint: '可数/不可数名词' },
  { id: 'q-2', type: '单选', unit: 'Unit 3', question: 'I want ___ an English teacher.', answer: 'to be', errorCount: 9, correctRate: '76%', knowledgePoint: '动词不定式' },
  { id: 'q-3', type: '完形填空', unit: 'Unit 2', question: 'She ___ (be) from China.', answer: 'is', errorCount: 14, correctRate: '58%', knowledgePoint: '主谓一致' },
  { id: 'q-4', type: '阅读理解', unit: 'Unit 4', question: 'What is the main idea of the passage?', answer: '说明文主旨推断', errorCount: 22, correctRate: '42%', knowledgePoint: '主旨推断' },
]

// ── Connector ──────────────────────────────────────────

export function getClassWrongWords(unit?: string): WrongWordEntry[] {
  if (unit) return mockWrongWords.filter(w => w.unit === unit)
  return mockWrongWords
}

export function getClassWrongQuestions(unit?: string): WrongQuestionEntry[] {
  if (unit) return mockWrongQuestions.filter(q => q.unit === unit)
  return mockWrongQuestions
}

export function getTopWrongWords(count = 10): WrongWordEntry[] {
  return [...mockWrongWords].sort((a, b) => b.errorCount - a.errorCount).slice(0, count)
}

export function getWeakKnowledgePoints(): Array<{ point: string; errorRate: string; entryCount: number }> {
  const map = new Map<string, { count: number; totalRate: number }>()
  for (const q of mockWrongQuestions) {
    const existing = map.get(q.knowledgePoint) || { count: 0, totalRate: 0 }
    existing.count++
    existing.totalRate += parseInt(q.correctRate)
    map.set(q.knowledgePoint, existing)
  }
  return Array.from(map.entries()).map(([point, data]) => ({
    point,
    errorRate: `${Math.round(100 - data.totalRate / data.count)}%`,
    entryCount: data.count,
  })).sort((a, b) => parseInt(b.errorRate) - parseInt(a.errorRate))
}

export function generateWrongWordTraining(unit: string, count = 10): {
  words: WrongWordEntry[]
  suggestion: string
  aiReason: string
} {
  const words = getClassWrongWords(unit).slice(0, count)
  const topErrorType = words.reduce((acc, w) => {
    const type = w.commonMistake.length > w.word.length ? '多字母' : w.commonMistake.length < w.word.length ? '少字母' : '字母顺序错误'
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const mainError = Object.entries(topErrorType).sort((a, b) => b[1] - a[1])[0]

  return {
    words,
    suggestion: `基于${unit}高频错词生成${words.length}题默写训练。`,
    aiReason: `班级在${unit}共${words.reduce((s, w) => s + w.errorCount, 0)}次拼写错误。最主要错误类型：${mainError?.[0] || '拼写'}。建议使用音节拆分法教学。`,
  }
}

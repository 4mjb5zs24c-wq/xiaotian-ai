/**
 * Trend Analyzer —— 长期趋势分析
 *
 * 分析错词趋势、听力趋势、作文趋势、阅读正确率趋势，
 * 为 Strategy Engine 提供数据驱动的决策依据。
 */

import type { SubjectTrend, TrendReport } from './types'

// ── Mock trend data ────────────────────────────────────

const mockVocabTrend: SubjectTrend = {
  subject: 'vocabulary',
  direction: 'improving',
  changeRate: 3,
  dataPoints: [
    { date: 'Week 1', value: 82 }, { date: 'Week 2', value: 84 },
    { date: 'Week 3', value: 85 }, { date: 'Week 4', value: 87 },
  ],
}

const mockListeningTrend: SubjectTrend = {
  subject: 'listening',
  direction: 'declining',
  changeRate: -5,
  dataPoints: [
    { date: 'Week 1', value: 85 }, { date: 'Week 2', value: 83 },
    { date: 'Week 3', value: 80 }, { date: 'Week 4', value: 78 },
  ],
}

const mockReadingTrend: SubjectTrend = {
  subject: 'reading',
  direction: 'declining',
  changeRate: -12,
  dataPoints: [
    { date: 'Week 1', value: 70 }, { date: 'Week 2', value: 68 },
    { date: 'Week 3', value: 62 }, { date: 'Week 4', value: 58 },
  ],
}

const mockWritingTrend: SubjectTrend = {
  subject: 'writing',
  direction: 'stable',
  changeRate: 1,
  dataPoints: [
    { date: 'Week 1', value: 72 }, { date: 'Week 2', value: 73 },
    { date: 'Week 3', value: 72 }, { date: 'Week 4', value: 74 },
  ],
}

const mockOverallTrend: SubjectTrend = {
  subject: 'overall',
  direction: 'stable',
  changeRate: -1,
  dataPoints: [
    { date: 'Week 1', value: 78 }, { date: 'Week 2', value: 77 },
    { date: 'Week 3', value: 75 }, { date: 'Week 4', value: 74 },
  ],
}

// ── Analyzer ───────────────────────────────────────────

export function analyzeTrends(): TrendReport {
  // Future: analyze real data from memory/workflow history
  return {
    vocabTrend: mockVocabTrend,
    listeningTrend: mockListeningTrend,
    readingTrend: mockReadingTrend,
    writingTrend: mockWritingTrend,
    overallTrend: mockOverallTrend,
    generatedAt: Date.now(),
  }
}

/**
 * Get a human-readable summary of the current trends.
 */
export function summarizeTrends(report: TrendReport): string {
  const parts: string[] = []

  if (report.vocabTrend.direction === 'improving') {
    parts.push(`词汇掌握率持续提升（+${report.vocabTrend.changeRate}%）`)
  } else if (report.vocabTrend.direction === 'declining') {
    parts.push(`⚠️ 词汇掌握率下降（${report.vocabTrend.changeRate}%），建议加强词汇复习`)
  }

  if (report.readingTrend.direction === 'declining') {
    parts.push(`⚠️ 阅读理解正确率下降（${report.readingTrend.changeRate}%），建议增加限时阅读训练`)
  }

  if (report.listeningTrend.direction === 'declining') {
    parts.push(`⚠️ 听力成绩下滑（${report.listeningTrend.changeRate}%），建议加强数字信息捕捉训练`)
  }

  if (report.writingTrend.direction === 'improving') {
    parts.push(`写作水平稳步提升（+${report.writingTrend.changeRate}%）`)
  }

  if (report.overallTrend.direction === 'declining') {
    parts.push(`⚠️ 综合成绩呈下降趋势，建议安排阶段复习`)
  }

  return parts.join('。') || '各项指标稳定，继续保持当前节奏。'
}

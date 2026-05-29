/**
 * Writing Analysis Mock Data
 *
 * 作文批改分析 —— 模拟班级作文批改结果
 */

export interface WritingProblem {
  type: string
  category: string
  count: number
  students: string[]
  severity: 'high' | 'medium' | 'low'
  suggestion: string
}

export interface StudentEssayScore {
  name: string
  score: number
  strengths: string
  weaknesses: string
  needsUrgentHelp: boolean
}

export interface WritingAnalysisData {
  topic: string
  totalEssays: number
  avgScore: number
  scoreDistribution: { range: string; count: number; label: string }[]
  commonProblems: WritingProblem[]
  studentScores: StudentEssayScore[]
  sampleImprovement: string
}

export function getWritingAnalysisData(): WritingAnalysisData {
  return {
    topic: 'My Favorite Food',
    totalEssays: 42,
    avgScore: 71.5,
    scoreDistribution: [
      { range: '90-100', count: 3, label: '优秀' },
      { range: '80-89', count: 10, label: '良好' },
      { range: '60-79', count: 20, label: '及格' },
      { range: '0-59', count: 9, label: '不及格' },
    ],
    commonProblems: [
      {
        type: '语法错误',
        category: '时态混用（一般现在时 vs 一般过去时）',
        count: 18,
        students: ['李华', '张小明', '陈雪', '赵明', '刘洋'],
        severity: 'high',
        suggestion: '建议课堂用10分钟对比讲解两种时态的使用场景，配合5道改错题即时巩固',
      },
      {
        type: '语法错误',
        category: '名词单复数（不可数名词加s）',
        count: 12,
        students: ['李华', '王小红', '张小明'],
        severity: 'high',
        suggestion: '重点讲解 food、bread、rice 等不可数名词，配合课堂口答练习',
      },
      {
        type: '搭配不当',
        category: '介词搭配错误（in/on/at 混用）',
        count: 9,
        students: ['张小明', '陈雪', '赵明'],
        severity: 'medium',
        suggestion: '整理常见介词搭配表，每天课前3分钟快速复习',
      },
      {
        type: '中式英语',
        category: '逐字翻译中文表达',
        count: 7,
        students: ['赵明', '李华', '刘洋'],
        severity: 'medium',
        suggestion: '每周2次"英英释义"练习，逐步建立英语思维',
      },
      {
        type: '表达建议',
        category: '句式单一，全篇简单句',
        count: 6,
        students: ['张小明', '刘洋'],
        severity: 'low',
        suggestion: '推荐使用"句式变换练习"——将3个简单句合并为1个复合句',
      },
    ],
    studentScores: [
      { name: '张小明', score: 78, strengths: '内容丰富，词汇量不错', weaknesses: '时态混用、句式单一', needsUrgentHelp: false },
      { name: '李华', score: 55, strengths: '态度认真，书写工整', weaknesses: '语法全面薄弱，时态和单复数错误严重', needsUrgentHelp: true },
      { name: '王小红', score: 88, strengths: '语法扎实，表达准确', weaknesses: '词汇量可扩展，缺少高级表达', needsUrgentHelp: false },
      { name: '赵明', score: 52, strengths: '思路清晰，结构完整', weaknesses: '中式英语严重，几乎每句都有翻译痕迹', needsUrgentHelp: true },
      { name: '陈雪', score: 76, strengths: '句子流畅，过渡自然', weaknesses: '介词搭配常出错', needsUrgentHelp: false },
      { name: '刘洋', score: 68, strengths: '有想法，内容有趣', weaknesses: '中式英语+句式单一', needsUrgentHelp: false },
    ],
    sampleImprovement: `原文（赵明）："I very like eat apple. Apple is good for healthy."
修改后："I really like eating apples. They are good for your health."
问题分析：
1. "very like" → "really like"（中式英语，very 不修饰动词）
2. "eat apple" → "eating apples"（like + doing；apple 应用复数表类别）
3. "Apple is good for healthy" → "They are good for your health"（代词指代+词性错误）`,
  }
}

/** Get priority students who need urgent help */
export function getUrgentStudents(data?: WritingAnalysisData): StudentEssayScore[] {
  const d = data || getWritingAnalysisData()
  return d.studentScores.filter((s) => s.needsUrgentHelp)
}

/** Get top problems sorted by severity and count */
export function getTopProblems(data?: WritingAnalysisData): WritingProblem[] {
  const d = data || getWritingAnalysisData()
  return [...d.commonProblems].sort((a, b) => {
    const sevOrder = { high: 3, medium: 2, low: 1 }
    const sevDiff = sevOrder[b.severity] - sevOrder[a.severity]
    if (sevDiff !== 0) return sevDiff
    return b.count - a.count
  })
}

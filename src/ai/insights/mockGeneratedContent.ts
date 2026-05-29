/**
 * AI Insight V1 — Mock Generated Content
 *
 * Generates mock content from insight recommended actions.
 * All data is fake; real generation comes in P2.
 */

import type { GeneratedContent } from './generatedContentTypes'
import type { InsightItem } from './insightTypes'
import { setInsightStatus } from './insightStatus'

// ── Generator Registry ────────────────────────────────────

type ContentGenerator = (insight: InsightItem, actionId: string) => GeneratedContent

const generators: Record<string, ContentGenerator> = {}

function register(actionId: string, fn: ContentGenerator) {
  generators[actionId] = fn
}

// ── Helpers ───────────────────────────────────────────────

let _seq = 0
function nextId(prefix: string) {
  _seq++
  return `${prefix}-${Date.now()}-${_seq}`
}

// ── Generator: Wrong Word Practice ────────────────────────

register('assign_wrong_word_practice', (insight) => ({
  contentId: nextId('wwp'),
  sourceInsightId: insight.insightId,
  sourceActionId: 'assign_wrong_word_practice',
  type: 'wrong_word_practice',
  title: 'Unit3 高频错词强化练习',
  summary: `针对${insight.scope.className}的5个高频错词（restaurant, Wednesday, delicious, favorite, healthy）生成限时专项强化练习。`,
  items: [
    { id: 'w1', label: 'restaurant', sublabel: '餐馆', meta: '错误率 55%', editable: true, selected: true },
    { id: 'w2', label: 'Wednesday', sublabel: '星期三', meta: '错误率 48%', editable: true, selected: true },
    { id: 'w3', label: 'delicious', sublabel: '美味的', meta: '错误率 42%', editable: true, selected: true },
    { id: 'w4', label: 'favorite', sublabel: '最喜欢的', meta: '错误率 38%', editable: true, selected: true },
    { id: 'w5', label: 'healthy', sublabel: '健康的', meta: '错误率 33%', editable: true, selected: true },
  ],
  difficulty: 'medium',
  estimatedTime: '15分钟',
  score: 50,
  editable: true,
  previewable: true,
  assignable: true,
  basketable: true,
  createdAt: new Date().toISOString(),
  status: 'draft',
  extra: {
    questionTypes: ['听音拼写', '中译英', '选词填空'],
    totalQuestions: 15,
  },
}))

// ── Generator: Writing Review ─────────────────────────────

register('writing_review', (insight) => ({
  contentId: nextId('wr'),
  sourceInsightId: insight.insightId,
  sourceActionId: 'writing_review',
  type: 'writing_review',
  title: '作文讲评 — My Favorite Food',
  summary: `基于${insight.scope.className}的42篇作文批改结果，生成讲评课件。时态混用（18次）为最集中问题，名词单复数（12次）次之。`,
  items: [
    { id: 'r1', label: '时态混用分析', sublabel: '一般现在时 vs 一般过去时', meta: '18次', selected: true },
    { id: 'r2', label: '名词单复数', sublabel: '不可数名词+s 错误', meta: '12次', selected: true },
    { id: 'r3', label: '句子结构', sublabel: '简单句为主，缺少过渡词', meta: '85%', selected: true },
    { id: 'r4', label: '范文展示建议', sublabel: '展示2篇优秀范文对比', selected: false },
  ],
  difficulty: 'medium',
  estimatedTime: '20分钟（课堂讲评）',
  score: 0,
  editable: true,
  previewable: true,
  assignable: true,
  basketable: true,
  createdAt: new Date().toISOString(),
  status: 'draft',
  extra: {
    essayTopic: 'My Favorite Food',
    commonIssues: ['时态混用', '名词单复数', '缺少过渡词', '句子结构单一'],
    reviewPoints: ['1. 时态对比讲解', '2. 不可数名词专项提醒', '3. 展示优秀范文', '4. 二次修改要求'],
    modelEssaySuggestion: '建议展示2篇90分以上范文，标注亮点表达',
    revisionSuggestion: '所有学生进行二次修改，重点关注时态和名词单复数',
    totalSubmissions: 42,
    avgScore: 71.5,
  },
}))

// ── Generator: Model Essay ────────────────────────────────

register('recommend_model_essay', (insight) => ({
  contentId: nextId('me'),
  sourceInsightId: insight.insightId,
  sourceActionId: 'recommend_model_essay',
  type: 'model_essay',
  title: '范文推荐 — My Favorite Food',
  summary: `基于${insight.scope.className}写作得分分布，推荐一篇92分范文。该范文时态准确、过渡自然、词汇丰富，适合作为课堂参考。`,
  items: [
    { id: 'h1', label: '亮点表达：traditional, brings family together, warm tradition' },
    { id: 'h2', label: '可借鉴句型：Not only...but also...' },
    { id: 'h3', label: '过渡词：however, therefore, in addition' },
  ],
  difficulty: 'medium',
  estimatedTime: '5分钟（课堂展示）',
  score: 92,
  editable: false,
  previewable: true,
  assignable: true,
  basketable: true,
  createdAt: new Date().toISOString(),
  status: 'draft',
  extra: {
    essayTitle: 'My Favorite Food',
    topic: 'Food and Drinks',
    highlights: ['时态使用准确', '过渡自然', '情感表达真挚', '词汇丰富'],
    reusableStructures: ['Not only...but also...', 'I love...not only because...but also because...'],
    essayExcerpt: 'My favorite food is dumplings. They are a traditional Chinese food and my grandmother makes the best dumplings...',
    estimatedScore: 92,
  },
}))

// ── Generator: Writing Revision ───────────────────────────

register('writing_revision', (insight) => ({
  contentId: nextId('wrv'),
  sourceInsightId: insight.insightId,
  sourceActionId: 'writing_revision',
  type: 'writing_revision',
  title: '作文二次修改任务',
  summary: `基于${insight.scope.className}作文讲评结果，布置二次修改任务。要求学生根据讲评重点修改作文，重点关注时态和名词单复数。`,
  items: [
    { id: 'rv1', label: '修正时态错误', sublabel: '检查全篇时态一致性', selected: true },
    { id: 'rv2', label: '修正名词单复数', sublabel: '特别注意不可数名词', selected: true },
    { id: 'rv3', label: '添加过渡词', sublabel: '至少使用3个过渡词', selected: true },
    { id: 'rv4', label: '丰富句型', sublabel: '使用至少1个复合句', selected: false },
  ],
  difficulty: 'medium',
  estimatedTime: '25分钟（课堂或课后）',
  score: 30,
  editable: true,
  previewable: true,
  assignable: true,
  basketable: true,
  createdAt: new Date().toISOString(),
  status: 'draft',
  extra: {
    basedOnReview: 'writing_review',
    totalStudents: 42,
    dueDate: '2026-06-03',
  },
}))

// ── Generator: Exam Mock ──────────────────────────────────

register('exam_mock', (insight) => ({
  contentId: nextId('em'),
  sourceInsightId: insight.insightId,
  sourceActionId: 'exam_mock',
  type: 'exam_mock',
  title: '七年级英语期末模拟卷',
  summary: `距期末考试还有${insight.examInfo?.daysToExam || '?'}天。推荐一套综合模拟卷，覆盖听力、词汇、阅读、完形、写作全题型。`,
  items: [
    { id: 'q1', label: '听力理解', sublabel: '15题', meta: '15分' },
    { id: 'q2', label: '词汇选择', sublabel: '20题', meta: '20分' },
    { id: 'q3', label: '阅读理解', sublabel: '15题（3篇）', meta: '30分' },
    { id: 'q4', label: '完形填空', sublabel: '10题', meta: '15分' },
    { id: 'q5', label: '书面表达', sublabel: '1题', meta: '20分' },
  ],
  difficulty: 'medium',
  estimatedTime: '90分钟',
  score: 100,
  editable: true,
  previewable: true,
  assignable: true,
  basketable: true,
  createdAt: new Date().toISOString(),
  status: 'draft',
  extra: {
    paperName: '七年级英语期末模拟卷（人教PEP）',
    questionConfig: [
      { type: '听力', count: 15, score: 15 },
      { type: '词汇', count: 20, score: 20 },
      { type: '阅读', count: 15, score: 30 },
      { type: '完形', count: 10, score: 15 },
      { type: '写作', count: 1, score: 20 },
    ],
    difficulty: '中等偏上',
    estimatedTime: '90分钟',
    recommendReason: '期末综合模拟，覆盖全题型，难度与正式考试一致',
  },
}))

// ── Generator: Special Practice ───────────────────────────

register('generate_special_practice', (insight) => ({
  contentId: nextId('sp'),
  sourceInsightId: insight.insightId,
  sourceActionId: 'generate_special_practice',
  type: 'special_practice',
  title: '期末专项复习训练',
  summary: `考前${insight.examInfo?.daysToExam || '?'}天，针对词汇、阅读、听力三个弱项生成专项训练包。词汇72%、阅读68%、听力66%均低于70%。`,
  items: [
    { id: 's1', label: '词汇专项', sublabel: 'Unit3-6 课标词', meta: '得分率 72%', editable: true, selected: true },
    { id: 's2', label: '阅读专项', sublabel: '阅读理解+完形', meta: '得分率 68%', editable: true, selected: true },
    { id: 's3', label: '听力专项', sublabel: '选择+填空', meta: '得分率 66%', editable: true, selected: true },
  ],
  difficulty: 'medium',
  estimatedTime: '45分钟',
  score: 80,
  editable: true,
  previewable: true,
  assignable: true,
  basketable: true,
  createdAt: new Date().toISOString(),
  status: 'draft',
  extra: {
    targetWeakPoints: ['词汇', '阅读', '听力'],
    totalModules: 3,
    questionsPerModule: 20,
  },
}))

// ── Generate function (entry point) ────────────────────────

export function generateContent(insight: InsightItem, actionId: string): GeneratedContent | null {
  const fn = generators[actionId]
  if (!fn) return null

  const content = fn(insight, actionId)
  setInsightStatus(insight.insightId, 'generated')
  return content
}

export function getAllGeneratedContentTypes(): Array<{ actionId: string; type: string }> {
  return Object.entries(generators).map(([actionId]) => {
    return { actionId, type: 'generated_content' }
  })
}

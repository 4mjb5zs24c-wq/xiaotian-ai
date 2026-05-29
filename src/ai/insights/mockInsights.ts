/**
 * AI Insight V1 — Mock Data
 *
 * Frozen per docs/ai-insight-v1-freeze.md
 */

import type { InsightItem, InsightHistory } from './insightTypes'

// ── Mock Insights ──────────────────────────────────────

export const mockInsightWrongWord: InsightItem = {
  insightId: 'home-wrong-word-001',
  module: 'home_wrong_word',
  title: 'Unit3 课标词错误较集中',
  riskLevel: 'high',
  priority: 1,
  scope: {
    className: '七年级(3)班',
    unit: 'Unit 3 — Food and Drinks',
    period: '近两周',
  },
  evidence: {
    summary: '5个课标词错误率超过30%，其中多音节词和含不发音字母的词错误更集中。',
    details: [
      { label: 'restaurant', value: '错误率 55%', trend: 'up' },
      { label: 'Wednesday', value: '错误率 48%', trend: 'up' },
      { label: 'delicious', value: '错误率 42%', trend: 'stable' },
      { label: 'favorite', value: '错误率 38%', trend: 'up' },
      { label: 'healthy', value: '错误率 33%', trend: 'stable' },
    ],
  },
  analysis: '学生对多音节词和含有不发音字母的词汇掌握不牢固。restaurant和Wednesday均为长难词，拼写规则与发音不完全对应，学生容易出现字母遗漏或顺序错误。',
  suggestion: '建议安排一次Unit3重点词汇听写，聚焦以上5个高频错词。可先用"听音拼写"模式检测拼写，再用"中译英"模式巩固。',
  actions: [
    { actionId: 'vocab_dictation', label: '生成词汇听写', type: 'navigate', target: '/ai-search', requiresConfirm: false, payload: { query: '生成 Unit3 词汇默写', autoRun: '1' } },
    { actionId: 'view_wrong_word_students', label: '查看错词学生', type: 'panel', target: 'insightDetail', requiresConfirm: false },
    { actionId: 'wrong_word_repractice', label: '错词重练', type: 'navigate', target: '/ai-search', requiresConfirm: false, payload: { query: 'Unit3 高频错词重练', autoRun: '1' } },
  ],
  sourceData: {
    wrongWords: ['restaurant', 'Wednesday', 'delicious', 'favorite', 'healthy'],
    errorRates: [55, 48, 42, 38, 33],
    errorTypes: { '拼写错误': 62, '读音混淆': 20, '语用错误': 18 },
    curriculumWords: 5,
    multiSyllableRatio: 0.8,
  },
  sampleInfo: {
    totalStudents: 42,
    sampleCount: 40,
    sampleRatio: 0.95,
    isSampleTooSmall: false,
  },
  createdAt: '2026-05-27T08:00:00Z',
  status: 'active',
}

export const mockInsightListening: InsightItem = {
  insightId: 'home-listening-001',
  module: 'home_listening_speaking',
  title: '听力得分率较前两周下降',
  riskLevel: 'medium',
  priority: 2,
  scope: {
    className: '七年级(3)班',
    questionType: '听力选择',
    period: '近两周 vs 前两周',
  },
  evidence: {
    summary: '听力得分率由78%降至66%，相对下降12%。数字信息题和独白理解题得分偏低。',
    details: [
      { label: '听力得分率', value: '66%', trend: 'down' },
      { label: '前两周得分率', value: '78%' },
      { label: '数字信息题', value: '58%', trend: 'down' },
      { label: '独白理解题', value: '62%', trend: 'down' },
    ],
  },
  analysis: '数字信息题和独白理解题得分率偏低，说明学生在快速听辨数字、价格、时间等信息方面需要加强。当前得分率66%尚未低于60%，属于需要关注但非紧急。',
  suggestion: '建议每周安排1-2次听力专项训练，重点练习数字信息题和独白理解。结合当前教学单元选择匹配的听力素材。',
  actions: [
    { actionId: 'listening_special', label: '推荐听力专项', type: 'navigate', target: '/ai-search', requiresConfirm: false, payload: { query: '听力训练', autoRun: '1' } },
    { actionId: 'speaking_mock', label: '推荐听说模拟', type: 'navigate', target: '/ai-search', requiresConfirm: false, payload: { query: '听说模拟', autoRun: '1' } },
  ],
  sourceData: {
    currentScore: 66,
    previousScore: 78,
    relativeDrop: 12,
    teacherPracticeHistory: ['听说模拟', '跟读训练'],
  },
  sampleInfo: {
    totalStudents: 42,
    sampleCount: 38,
    sampleRatio: 0.90,
    isSampleTooSmall: false,
  },
  createdAt: '2026-05-27T08:00:00Z',
  status: 'active',
}

export const mockInsightWriting: InsightItem = {
  insightId: 'home-writing-001',
  module: 'home_writing',
  title: '近期作文语言表达问题较集中',
  riskLevel: 'medium',
  priority: 3,
  scope: {
    className: '七年级(3)班',
    unit: 'Unit 3 — My Favorite Food',
    period: '2026-05-25',
  },
  evidence: {
    summary: '42篇作文提交，均分71.5分。时态混用18次为最集中问题，名词单复数12次次之。',
    details: [
      { label: '提交人数', value: '42人' },
      { label: '平均得分', value: '71.5分' },
      { label: '时态混用', value: '18次' },
      { label: '名词单复数', value: '12次' },
      { label: '待提升(<60%)', value: '9篇' },
    ],
  },
  analysis: '时态混用（一般现在时 vs 一般过去时）是班级最集中的问题。名词单复数错误主要体现在不可数名词加s。句子以简单句为主，缺少过渡词和复合句。',
  suggestion: '建议讲评重点：1) 时态对比讲解；2) 不可数名词专项提醒；3) 展示优秀范文。建议所有学生进行二次修改。',
  actions: [
    { actionId: 'writing_review', label: '生成作文讲评', type: 'navigate', target: '/ai-search', requiresConfirm: false, payload: { query: '作文主要问题是什么', autoRun: '1' } },
    { actionId: 'recommend_model_essay', label: '推荐范文', type: 'panel', target: 'insightDetail', requiresConfirm: false },
    { actionId: 'writing_revision', label: '布置二次修改', type: 'panel', target: 'assignmentConfirm', requiresConfirm: true },
  ],
  sourceData: {
    topic: 'My Favorite Food',
    totalEssays: 42,
    avgScore: 71.5,
    scoreDistribution: { high: 3, mid: 30, low: 9 },
  },
  sampleInfo: {
    totalStudents: 42,
    sampleCount: 42,
    sampleRatio: 1.0,
    isSampleTooSmall: false,
  },
  createdAt: '2026-05-27T08:00:00Z',
  status: 'active',
}

export const mockInsightExamReminder: InsightItem = {
  insightId: 'exam-reminder-001',
  module: 'exam_reminder',
  title: '距期末考试还有24天',
  riskLevel: 'medium',
  priority: 0,
  scope: {
    className: '七年级(3)班',
    period: '考前一个月',
  },
  evidence: {
    summary: '期末考试将于2026年6月20日进行。当前词汇得分率72%，阅读68%，听力66%。尚未练习过模拟卷。',
    details: [
      { label: '考试日期', value: '2026-06-20' },
      { label: '剩余天数', value: '24天' },
      { label: '词汇得分率', value: '72%' },
      { label: '阅读得分率', value: '68%' },
      { label: '听力得分率', value: '66%' },
      { label: '已练习模拟卷', value: '0套' },
    ],
  },
  analysis: '考前24天是系统复习的关键时期。当前阅读和听力得分率低于70%，建议在复习计划中重点安排。建议开始每周1套模拟卷训练。',
  suggestion: '建议制定3周复习计划：第1周词汇+语法，第2周阅读+完形，第3周综合模拟+查漏补缺。',
  actions: [
    { actionId: 'exam_mock', label: '推荐模拟卷', type: 'navigate', target: '/ai-search', requiresConfirm: false, payload: { query: '期末模拟卷', autoRun: '1' } },
    { actionId: 'exam_sprint', label: '推荐冲刺训练', type: 'navigate', target: '/ai-search', requiresConfirm: false, payload: { query: '期末冲刺训练', autoRun: '1' } },
    { actionId: 'exam_special_review', label: '生成专项训练', type: 'navigate', target: '/ai-search', requiresConfirm: false, payload: { query: '期末专项复习', autoRun: '1' } },
  ],
  sourceData: {},
  sampleInfo: {
    totalStudents: 42,
    sampleCount: 42,
    sampleRatio: 1.0,
    isSampleTooSmall: false,
  },
  examInfo: {
    examName: '期末考试',
    examDate: '2026-06-20',
    daysToExam: 24,
    isExamWithin30Days: true,
    hasEnded: false,
  },
  createdAt: '2026-05-27T08:00:00Z',
  status: 'active',
}

export const mockInsightSmallSample: InsightItem = {
  insightId: 'home-small-sample-001',
  module: 'home_wrong_word',
  title: '当前参与人数较少',
  riskLevel: 'low',
  priority: 3,
  scope: {
    className: '七年级(3)班',
    period: '本次练习',
  },
  evidence: {
    summary: '本次练习参与12人（全班42人），建议结合后续练习数据继续观察。',
    details: [
      { label: '参与人数', value: '12人' },
      { label: '全班人数', value: '42人' },
      { label: '参与比例', value: '29%' },
    ],
  },
  analysis: '参与人数偏少，目前的数据不足以做出可靠的判断。建议在更多学生完成练习后再查看分析结果。',
  suggestion: '建议提醒未完成学生及时提交，或延长截止时间。待参与人数充足后，小天会重新生成更准确的洞察。',
  actions: [
    { actionId: 'remind_unfinished', label: '提醒未完成学生', type: 'alert', target: '', requiresConfirm: true },
  ],
  sourceData: {},
  sampleInfo: {
    totalStudents: 42,
    sampleCount: 12,
    sampleRatio: 0.29,
    isSampleTooSmall: true,
  },
  createdAt: '2026-05-27T08:00:00Z',
  status: 'active',
}

// ═══════════════════════════════════════════════════════════
// PAGE-SPECIFIC INSIGHTS
// ═══════════════════════════════════════════════════════════

// ── Practice Report Page ───────────────────────────────

export const mockInsightPracticeReport: InsightItem = {
  insightId: 'practice-report-001',
  module: 'practice_report' as any,
  title: '近两周练习完成率下降',
  riskLevel: 'high',
  priority: 1,
  scope: {
    className: '七年级(3)班',
    period: '2026-05-12 至 2026-05-25',
  },
  evidence: {
    summary: '近两周班级练习平均完成率从 82% 降至 71%，下降 11 个百分点，主要集中在周末布置的词汇和阅读练习。',
    details: [
      { label: '前两周完成率', value: '82%' },
      { label: '近两周完成率', value: '71%', trend: 'down' },
      { label: '逾期未完成人数', value: '12人', trend: 'up' },
      { label: '周末练习完成率', value: '58%', trend: 'down' },
      { label: '词汇练习完成率', value: '68%', trend: 'down' },
    ],
  },
  analysis: '完成率下降主要集中在周末布置的练习。周末学生自主安排时间较多，部分学生缺乏监督导致遗忘提交。词汇和阅读类练习的逾期率最高。',
  suggestion: '建议：1）周五放学前口头提醒学生周末完成练习；2）设置周六晚的自动催交通知；3）考虑适当延长周末练习的截止时间至周一晚。',
  actions: [
    { actionId: 'remind_all', label: '一键催交', type: 'alert', target: '', requiresConfirm: true },
    { actionId: 'view_unfinished', label: '查看未完成学生', type: 'panel', target: 'insightDetail', requiresConfirm: false },
    { actionId: 'short_practice', label: '推荐短时巩固练习', type: 'navigate', target: '/ai-search', requiresConfirm: false, payload: { query: '推荐巩固练习', autoRun: '1' } },
  ],
  sourceData: {},
  sampleInfo: {
    totalStudents: 42,
    sampleCount: 42,
    sampleRatio: 1.0,
    isSampleTooSmall: false,
  },
  createdAt: '2026-05-27T08:00:00Z',
  status: 'active',
}

// ── Wrong Question Page ────────────────────────────────

export const mockInsightWrongQuestion: InsightItem = {
  insightId: 'wrong-question-001',
  module: 'wrong_question' as any,
  title: '听力长对话错误率偏高',
  riskLevel: 'high',
  priority: 1,
  scope: {
    className: '七年级(3)班',
    questionType: '听力长对话',
    period: '近一个月',
  },
  evidence: {
    summary: '近一个月听力长对话题型平均错误率达到 60%，主要集中在细节定位和信息转换题，建议进行题型讲解和跟练。',
    details: [
      { label: '听力长对话错误率', value: '60%', trend: 'up' },
      { label: '细节定位题错误率', value: '55%' },
      { label: '信息转换题错误率', value: '62%' },
      { label: '错误人数', value: '5人' },
      { label: '订正人数', value: '0人', trend: 'down' },
      { label: '得分率', value: '60%' },
    ],
  },
  analysis: '听力长对话的错误集中在需要边听边处理信息的题目。学生普遍在听到长对话时难以同时完成信息定位和转换，建议教给学生"预读题干+关键词速记"的解题策略。',
  suggestion: '建议在课堂上安排一次听力策略讲解：1）预读题干标记关键词；2）听第一遍抓大意；3）听第二遍定位细节。配合 2-3 道同类题当堂练习。',
  actions: [
    { actionId: 'view_student_answers', label: '查看学生作答', type: 'panel', target: 'insightDetail', requiresConfirm: false },
    { actionId: 'add_to_basket', label: '加入试卷篮', type: 'panel', target: 'insightDetail', requiresConfirm: false },
    { actionId: 'generate_similar', label: '生成同类题', type: 'navigate', target: '/ai-search', requiresConfirm: false, payload: { query: '生成听力长对话练习', autoRun: '1' } },
  ],
  sourceData: {},
  sampleInfo: {
    totalStudents: 42,
    sampleCount: 40,
    sampleRatio: 0.95,
    isSampleTooSmall: false,
  },
  createdAt: '2026-05-27T08:00:00Z',
  status: 'active',
}

// ── Wrong Word Page (班级错词本) ──────────────────────

export const mockInsightWrongWordPage: InsightItem = {
  insightId: 'wrong-word-page-001',
  module: 'wrong_word_page' as any,
  title: '首次错词占比超过 30%',
  riskLevel: 'high',
  priority: 1,
  scope: {
    className: '七年级(3)班',
    unit: 'Unit 3 — Food and Drinks',
    period: '近两周',
  },
  evidence: {
    summary: '本阶段首次进入错词本的词占比达到 32%，说明新词掌握不稳定，建议进行课前快速复现和听写巩固。',
    details: [
      { label: '首次错词占比', value: '32%', trend: 'up' },
      { label: '错词本新增词占比', value: '28%' },
      { label: 'assist 错误率', value: '100%' },
      { label: 'directly 错误率', value: '100%' },
      { label: 'outline 错误率', value: '100%' },
      { label: '学生覆盖人数', value: '8人' },
    ],
  },
  analysis: '新增错词中多音节词和学术词汇占比高。学生在初次接触这些词汇时拼写和发音同时出现困难，导致首次练习即进入错词本。建议加强新词的"音-形-义"三位一体教学。',
  suggestion: '建议：1）新课词汇教学时增加音节拆分和发音示范；2）布置课后跟读练习巩固发音；3）第二天安排快速听写检测记忆效果。',
  actions: [
    { actionId: 'generate_dictation', label: '生成默写练习', type: 'navigate', target: '/ai-search', requiresConfirm: false, payload: { query: '生成 Unit3 词汇默写', autoRun: '1' } },
    { actionId: 'assign_dictation', label: '布置听写', type: 'panel', target: 'assignmentConfirm', requiresConfirm: true },
    { actionId: 'export_words', label: '导出错词', type: 'alert', target: '', requiresConfirm: false },
  ],
  sourceData: {
    wrongWords: ['assist', 'directly', 'outline', 'title', 'absorb'],
    firstTimeRatio: 0.32,
    newEntryRatio: 0.28,
  },
  sampleInfo: {
    totalStudents: 42,
    sampleCount: 40,
    sampleRatio: 0.95,
    isSampleTooSmall: false,
  },
  createdAt: '2026-05-27T08:00:00Z',
  status: 'active',
}

// ── All mock insights ──────────────────────────────────

export const allMockInsights: InsightItem[] = [
  mockInsightWrongWord,
  mockInsightListening,
  mockInsightWriting,
  mockInsightExamReminder,
  mockInsightSmallSample,
  // ── Page-specific insights ──
  mockInsightPracticeReport,
  mockInsightWrongQuestion,
  mockInsightWrongWordPage,
]

// ── Mock history ───────────────────────────────────────

export const mockInsightHistory: InsightHistory = {
  recentInsights: [],
  recentActions: [],
  dismissedInsights: [],
  lastGeneratedAt: {},
}

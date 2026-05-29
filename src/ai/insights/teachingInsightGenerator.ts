/**
 * generateTeachingInsight — unified insight data generator
 *
 * All pages call this to get structured TeachingInsight data.
 * Currently mock-powered; designed to swap in real data sources.
 */

import type { TeachingInsight, TeachingInsightType } from './teachingInsightTypes'

// ── Public API ──────────────────────────────────────────

export function generateTeachingInsight(type: TeachingInsightType): TeachingInsight {
  switch (type) {
    case 'practiceStage': return buildPracticeStageInsight()
    case 'vocabulary': return buildVocabularyInsight()
    case 'listeningSpeaking': return buildListeningSpeakingInsight()
    case 'writing': return buildWritingInsight()
  }
}

// ── Priority helpers ────────────────────────────────────

function priority(
  metrics: { label: string; value: string; trend?: string }[],
): TeachingInsight['priority'] {
  const hasSevere = metrics.some((m) => {
    const v = parseFloat(m.value)
    if (m.label.includes('正确率') && v < 60) return true
    if (m.label.includes('完成率') && v < 75) return true
    if (m.label.includes('得分率') && v < 60) return true
    if (m.trend?.startsWith('↓') && parseFloat(m.trend.replace('↓', '')) > 10) return true
    return false
  })
  if (hasSevere) return 'needs_attention'
  const hasMedium = metrics.some((m) => {
    const v = parseFloat(m.value)
    if ((m.label.includes('正确率') || m.label.includes('得分率')) && v >= 60 && v < 70) return true
    if (m.label.includes('完成率') && v >= 75 && v < 85) return true
    if (m.trend?.startsWith('↓') && parseFloat(m.trend.replace('↓', '')) >= 5) return true
    return false
  })
  if (hasMedium) return 'suggest_attention'
  const hasPositive = metrics.some((m) => m.trend?.startsWith('↑') && parseFloat(m.trend.replace('↑', '')) >= 5)
  if (hasPositive) return 'improving'
  return 'continue_observe'
}

function priorityLabel(p: TeachingInsight['priority']): string {
  switch (p) {
    case 'needs_attention': return '需关注'
    case 'suggest_attention': return '建议关注'
    case 'continue_observe': return '持续观察'
    case 'improving': return '表现提升'
  }
}

function priorityBadgeColor(p: TeachingInsight['priority']): string {
  switch (p) {
    case 'needs_attention': return 'bg-red-50 text-red-600'
    case 'suggest_attention': return 'bg-amber-50 text-amber-600'
    case 'continue_observe': return 'bg-blue-50 text-blue-500'
    case 'improving': return 'bg-emerald-50 text-emerald-600'
  }
}

export { priorityLabel, priorityBadgeColor }

// ── 1. Practice Stage Insight ───────────────────────────

function buildPracticeStageInsight(): TeachingInsight {
  const metrics = [
    { label: '完成率', value: '82%', sub: '↓7%', trend: 'down' as const, alert: false },
    { label: '正确率', value: '68%', sub: '↓8%', trend: 'down' as const, alert: false },
    { label: '平均得分率', value: '71%', sub: '↓6%', trend: 'down' as const, alert: false },
    { label: '未完成人数', value: '6人', sub: '↑3人', trend: 'up' as const, alert: false },
    { label: '作答时长', value: '12min', sub: '↑2min', trend: 'up' as const, alert: false },
    { label: '订正完成率', value: '58%', sub: '↓5%', trend: 'down' as const, alert: true },
  ]

  return {
    id: 'practice-stage-001',
    type: 'practiceStage',
    priority: priority(metrics),
    title: '近两周练习表现有所下滑',
    summary: '近两周共布置 8 份练习，完成率 82%，正确率 68%，需关注词汇拼写和阅读短板',
    conclusion: '近两周共布置 8 份练习，平均完成率由 89% 降至 82%，平均正确率由 76% 降至 68%。问题主要集中在词汇拼写、阅读理解和周末练习完成率下降。',
    analysisScope: {
      className: '七年级(3)班',
      period: '近两周 vs 前两周',
    },
    keyMetrics: metrics,
    trendAnalysis: {
      title: '阶段变化趋势',
      periods: [
        { label: '前两周-1', completionRate: 89, accuracyRate: 76 },
        { label: '前两周-2', completionRate: 87, accuracyRate: 74 },
        { label: '近两周-1', completionRate: 84, accuracyRate: 70 },
        { label: '近两周-2', completionRate: 82, accuracyRate: 68 },
        { label: '当前', completionRate: 82, accuracyRate: 68 },
      ],
      summary: '近两周完成率和正确率均持续下滑，建议关注周末作业完成和词汇拼写问题。',
    },
    referenceComparison: {
      horizontal: {
        title: '班级参照对比（本班 vs 年级平均）',
        items: [
          { label: '词汇拼写', ours: 62, reference: 75, gap: 13, alert: true },
          { label: '阅读理解', ours: 58, reference: 67, gap: 9, alert: true },
          { label: '完成率', ours: 82, reference: 86, gap: 4 },
          { label: '正确率', ours: 68, reference: 73, gap: 5 },
        ],
      },
    },
    problemDiagnosis: {
      title: '问题集中点',
      items: [
        { rank: 1, title: '词汇拼写薄弱', data: '正确率 62%，较前两周下降 12 个百分点', impact: 'Unit 3 高频词，8 名学生反复出错', severe: true, actionLabel: '生成错词重练' },
        { rank: 2, title: '阅读理解下降', data: '正确率 58%，低于年级平均 9 个百分点', impact: '细节理解题、信息定位题失分', severe: true, actionLabel: '推荐阅读专项' },
        { rank: 3, title: '周末作业完成率下降', data: '6 名学生未按时完成，较前两周增加 3 人', impact: '周末布置的 2 份练习', severe: false, actionLabel: '一键催交' },
      ],
    },
    impactScope: {
      studentCount: 8,
      itemCount: 8,
      description: '影响的练习涉及词汇、阅读、听力三类，其中周末练习完成率最低',
    },
    studentSegments: [
      { label: '督促完成', count: 5, description: '正确率好但完成率低', color: 'blue' },
      { label: '稳定优秀', count: 12, description: '完成率高且正确率高', color: 'emerald' },
      { label: '重点关注', count: 3, description: '完成率和正确率双低', color: 'red' },
      { label: '需要讲解', count: 8, description: '完成率好但正确率低', color: 'amber' },
    ],
    recommendedActions: [
      { label: '生成阶段错词重练', desc: '基于近两周高频错误生成练习', primary: true, onClickKey: 'generate_wrong_word_practice' },
      { label: '自定义错词复习规划', desc: '按错误率和周期自动回滚错词', primary: true, onClickKey: 'custom_review_plan' },
      { label: '推荐薄弱能力专项', desc: '阅读理解、词汇拼写专项训练', onClickKey: 'recommend_weakness_special' },
      { label: '分层布置练习', desc: '为不同学生群体布置针对性练习', confirm: true, onClickKey: 'tiered_assignment' },
      { label: '一键催交未完成学生', desc: '向6名未完成学生发送提醒', confirm: true, onClickKey: 'remind_unfinished' },
      { label: '查看学生明细', desc: '查看需关注学生详细数据', onClickKey: 'view_students' },
      { label: '导出阶段学情报告', desc: '导出用于教研和家校沟通', onClickKey: 'export_report' },
      { label: '生成下阶段教学建议', desc: '生成下周练习和课堂复习建议', onClickKey: 'next_stage_suggestion' },
    ],
    relatedItems: [
      { title: 'Unit 3 词汇听写', meta: '32/43人 · 正确率68%', issue: 'restaurant、Wednesday 错误集中', actions: ['查看报告', '生成重练'] },
      { title: '冲刺训练（四十一）', meta: '1/1人 · 得分7.5/50', issue: '综合得分偏低', actions: ['查看报告'] },
      { title: '个性化词汇练习', meta: '2/43人 · 进行中', issue: '完成率过低', actions: ['一键催交', '查看报告'] },
      { title: '阅读理解专项', meta: '36/43人 · 正确率58%', issue: '细节理解薄弱', actions: ['推荐阅读专项', '查看报告'] },
    ],
    radarDimensions: [
      { label: '词汇拼写', ours: 62, avg: 75 },
      { label: '阅读理解', ours: 58, avg: 67 },
      { label: '听力细节', ours: 66, avg: 70 },
      { label: '语法单选', ours: 72, avg: 74 },
      { label: '写作表达', ours: 70, avg: 72 },
      { label: '听说跟读', ours: 76, avg: 78 },
    ],
  }
}

// ── 2. Vocabulary Insight ───────────────────────────────

function buildVocabularyInsight(): TeachingInsight {
  const metrics = [
    { label: '练习次数', value: '6次', trend: 'stable' as const },
    { label: '平均正确率', value: '66%', sub: '↓9%', trend: 'down' as const, alert: false },
    { label: '新增错词', value: '23个', sub: '↑8', trend: 'up' as const, alert: false },
    { label: '重复错词', value: '8个', sub: '↑3', trend: 'up' as const, alert: false },
    { label: '高错误率词', value: '5个', trend: 'up' as const, alert: true },
    { label: '听写正确率', value: '62%', sub: '↓12%', trend: 'down' as const, alert: true },
    { label: '跟读准确率', value: '76%', sub: '↓4%', trend: 'down' as const, alert: false },
    { label: '回滚后掌握率', value: '58%', sub: '↓6%', trend: 'down' as const, alert: true },
    { label: '词义识别', value: '72%', sub: '↓3%', trend: 'down' as const, alert: false },
  ]

  return {
    id: 'vocab-001',
    type: 'vocabulary',
    priority: 'needs_attention',
    title: '近两周 Unit 3 词汇掌握不稳定',
    summary: '词汇类练习平均正确率 66%，新增错词 23 个，重复错词 8 个，restaurant、Wednesday 等高频词反复出错',
    conclusion: '词汇类练习平均正确率 66%，较前两周下降 9 个百分点；新增错词 23 个，重复错词 8 个，restaurant、Wednesday、delicious 等高频词反复出错，建议建立错词回滚复习规划。',
    analysisScope: {
      className: '七年级(3)班',
      unit: 'Unit 3 — Food and Drinks',
      period: '近两周',
    },
    keyMetrics: metrics,
    referenceComparison: {
      vertical: {
        title: '纵向对比（近两周 vs 前两周）',
        items: [
          { label: '词汇拼写', ours: '62%', reference: '74%', gap: 12, alert: true },
          { label: '新增错词', ours: '23个', reference: '15个', gap: 8 },
          { label: '重复错词', ours: '8个', reference: '5个', gap: 3, alert: true },
          { label: '回滚掌握率', ours: '58%', reference: '64%', gap: 6 },
        ],
      },
      horizontal: {
        title: '横向对比（本班 vs 年级平均）',
        items: [
          { label: '词汇拼写', ours: '62%', reference: '75%', gap: 13, alert: true },
          { label: '词义识别', ours: '72%', reference: '80%', gap: 8, alert: true },
          { label: '跟读准确率', ours: '76%', reference: '82%', gap: 6 },
          { label: '回滚掌握率', ours: '58%', reference: '71%', gap: 13, alert: true },
        ],
      },
    },
    errorTypes: [
      { type: '写不对', count: 12, words: 'restaurant、Wednesday、favorite', borderColor: 'border-l-red-400' },
      { type: '听不出', count: 7, words: 'directly、outline、absorb', borderColor: 'border-l-amber-400' },
      { type: '读不准', count: 5, words: 'delicious、aside、carve', borderColor: 'border-l-purple-400' },
      { type: '不会用', count: 6, words: 'belong、assess、strike', borderColor: 'border-l-blue-400' },
      { type: '反复错', count: 8, words: 'restaurant、Wednesday', borderColor: 'border-l-orange-400' },
      { type: '不认识', count: 4, words: 'antique、bride、crisis', borderColor: 'border-l-slate-400' },
    ],
    problemDiagnosis: {
      items: [
        { rank: 1, title: '拼写错误集中', data: 'restaurant 错误率 55%，Wednesday 错误率 48%', impact: '5 个高频词占据 60% 的拼写错误', severe: true },
        { rank: 2, title: '多音节词掌握弱', data: '多音节词错误率是单音节词的 2.4 倍', impact: '涉及 delicious、favorite 等 6 个词', severe: true },
        { rank: 3, title: '回滚掌握率不足', data: '回滚后 42% 的错词在下一次练习中再次出错', impact: '说明单次订正不足以巩固记忆', severe: false },
      ],
    },
    highFreqItems: [
      { name: 'restaurant', rate: '55%', bar: 55 },
      { name: 'Wednesday', rate: '48%', bar: 48 },
      { name: 'delicious', rate: '42%', bar: 42 },
      { name: 'favorite', rate: '38%', bar: 38 },
      { name: 'healthy', rate: '33%', bar: 33 },
    ],
    impactScope: {
      studentCount: 8,
      description: '8 名学生存在 2 个以上反复错词，其中 3 人错误率超过 40%',
    },
    recommendedActions: [
      { label: '自定义错词复习规划', desc: '按错误率、周期回滚错词', primary: true, onClickKey: 'custom_review_plan' },
      { label: '生成词汇听写', desc: '基于高频错词生成听写练习', primary: true, onClickKey: 'generate_dictation' },
      { label: '生成错词重练', desc: '按错误类型生成个性化重练', onClickKey: 'generate_wrong_word_practice' },
      { label: '查看错词学生', desc: '查看哪些学生反复出错', onClickKey: 'view_wrong_word_students' },
      { label: '分层布置词汇练习', desc: '不同学生推送不同词量', confirm: true, onClickKey: 'tiered_vocab_assignment' },
      { label: '导出班级错词', desc: '用于教研或课后复习', onClickKey: 'export_wrong_words' },
    ],
  }
}

// ── 3. Listening/Speaking Insight ───────────────────────

function buildListeningSpeakingInsight(): TeachingInsight {
  const metrics = [
    { label: '练习次数', value: '5次', trend: 'stable' as const },
    { label: '平均得分率', value: '68%', sub: '↓7%', trend: 'down' as const, alert: false },
    { label: '细节题正确率', value: '61%', sub: '↓10%', trend: 'down' as const, alert: true },
    { label: '数字信息识别', value: '58%', sub: '↓12%', trend: 'down' as const, alert: true },
    { label: '主旨理解', value: '72%', trend: 'stable' as const },
    { label: '独白理解', value: '63%', sub: '↓8%', trend: 'down' as const, alert: false },
    { label: '发音准确度', value: '70%', sub: '↓5%', trend: 'down' as const, alert: false },
    { label: '流利度', value: '74%', sub: '↓2%', trend: 'down' as const, alert: false },
    { label: '语音语调', value: '68%', sub: '↓6%', trend: 'down' as const, alert: false },
    { label: '听说完成率', value: '86%', sub: '↑3%', trend: 'up' as const },
  ]

  return {
    id: 'listening-speaking-001',
    type: 'listeningSpeaking',
    priority: 'suggest_attention',
    title: '近一个月听力/听说得分率下降',
    summary: '平均得分率 68%，较上月下降 7 个百分点，数字信息和细节题为主要短板',
    conclusion: '听力/听说类练习共 5 次，平均得分率 68%，较上月下降 7 个百分点。下降主要集中在数字信息、细节定位和独白理解；听说任务完成率正常，但发音准确度和语音语调低于年级平均。',
    analysisScope: {
      className: '七年级(3)班',
      period: '近一个月 vs 上月',
    },
    keyMetrics: metrics,
    problemDiagnosis: {
      items: [
        { rank: 1, title: '数字/时间信息识别', data: '正确率 58%，较上月下降 12 个百分点', impact: '数字信息题 3 道以上失分', severe: true },
        { rank: 2, title: '细节题正确率低', data: '正确率 61%，低于年级平均 9 个百分点', impact: '细节定位和选项辨析薄弱', severe: true },
        { rank: 3, title: '发音准确度不足', data: '70%，低于年级平均 76%', impact: '9 名学生听说任务多次重录', severe: false },
      ],
    },
    referenceComparison: {
      vertical: {
        title: '纵向对比（近一月 vs 上月）',
        items: [
          { label: '平均得分率', ours: '68%', reference: '75%', gap: 7, alert: true },
          { label: '数字信息', ours: '58%', reference: '70%', gap: 12, alert: true },
          { label: '细节题', ours: '61%', reference: '71%', gap: 10, alert: true },
          { label: '发音准确度', ours: '70%', reference: '75%', gap: 5 },
        ],
      },
      horizontal: {
        title: '横向对比（本班 vs 年级平均）',
        items: [
          { label: '平均得分率', ours: '68%', reference: '74%', gap: 6 },
          { label: '数字信息', ours: '58%', reference: '70%', gap: 12, alert: true },
          { label: '发音准确度', ours: '70%', reference: '76%', gap: 6 },
        ],
      },
    },
    impactScope: {
      studentCount: 9,
      description: '9 名学生听说任务多次重录，5 名学生听力得分率低于 60%',
    },
    recommendedActions: [
      { label: '推荐听力专项', desc: '按薄弱题型推荐听力练习', primary: true, onClickKey: 'recommend_listening_special' },
      { label: '生成数字信息专项训练', desc: '针对时间、价格、数量等', primary: true, onClickKey: 'generate_number_training' },
      { label: '推荐听说模拟', desc: '推荐适合的听说模拟任务', onClickKey: 'recommend_speaking_mock' },
      { label: '生成听力细节题训练', desc: '针对细节定位提升', onClickKey: 'generate_detail_training' },
      { label: '推荐跟读材料', desc: '改善发音准确度和语调', onClickKey: 'recommend_shadow_material' },
      { label: '查看低分学生', desc: '查看听力薄弱学生名单', onClickKey: 'view_low_score_students' },
      { label: '一键催交口语作业', desc: '提醒未完成听说任务学生', confirm: true, onClickKey: 'remind_oral_homework' },
      { label: '生成课堂讲评建议', desc: '生成讲评脚本和训练建议', onClickKey: 'generate_lecture_suggestions' },
    ],
  }
}

// ── 4. Writing Insight ──────────────────────────────────

function buildWritingInsight(): TeachingInsight {
  const metrics = [
    { label: '练习次数', value: '3次', trend: 'stable' as const },
    { label: '平均得分率', value: '70%', trend: 'stable' as const },
    { label: '提交率', value: '84%', sub: '↓4%', trend: 'down' as const, alert: false },
    { label: '平均字数', value: '78词', sub: '↑16', trend: 'up' as const },
    { label: '内容完整度', value: '76%', sub: '↑5%', trend: 'up' as const },
    { label: '语法准确性', value: '62%', sub: '↓6%', trend: 'down' as const, alert: true },
    { label: '词汇丰富度', value: '68%', sub: '↓3%', trend: 'down' as const, alert: false },
    { label: '句式多样性', value: '58%', sub: '↓8%', trend: 'down' as const, alert: true },
    { label: '逻辑连贯性', value: '72%', sub: '↑2%', trend: 'up' as const },
  ]

  return {
    id: 'writing-001',
    type: 'writing',
    priority: 'suggest_attention',
    title: '近一月写作表达意愿增强，但准确性下降',
    summary: '平均字数从 62 词升至 78 词，但语法准确性下降 6 个百分点，句式多样性偏低',
    conclusion: '近一个月共完成 3 次写作练习，平均得分率 70%，较上月基本持平。平均字数从 62 词提升至 78 词，表达意愿增强，但语法准确性下降 6 个百分点，句式多样性偏低，时态和名词单复数错误集中。',
    analysisScope: {
      className: '七年级(3)班',
      period: '近一个月',
    },
    keyMetrics: metrics,
    problemDiagnosis: {
      items: [
        { rank: 1, title: '句式多样性偏低', data: '58%，较上次下降 8 个百分点', impact: '学生多使用简单句，缺少连接结构', severe: true },
        { rank: 2, title: '语法准确性不足', data: '62%，时态和名词单复数错误集中', impact: '涉及 18 名学生的作文', severe: true },
        { rank: 3, title: '词汇丰富度下降', data: '68%，good/nice/like 等词重复使用', impact: '3 次练习中高频词重复率上升', severe: false },
        { rank: 4, title: '批改后订正率低', data: '55%，对作文反馈的二次吸收不足', impact: '影响后续写作提升效果', severe: false },
      ],
    },
    referenceComparison: {
      vertical: {
        title: '纵向对比（本次 vs 上次）',
        items: [
          { label: '平均字数', ours: '78词', reference: '62词', gap: -16, oursBetter: true },
          { label: '语法准确性', ours: '62%', reference: '68%', gap: 6, alert: true },
          { label: '句式多样性', ours: '58%', reference: '66%', gap: 8, alert: true },
          { label: '词汇丰富度', ours: '68%', reference: '71%', gap: 3 },
        ],
      },
      horizontal: {
        title: '横向对比（本班 vs 年级平均）',
        items: [
          { label: '平均字数', ours: '78词', reference: '70词', gap: -8, oursBetter: true },
          { label: '语法准确性', ours: '62%', reference: '69%', gap: 7, alert: true },
          { label: '句式多样性', ours: '58%', reference: '65%', gap: 7, alert: true },
        ],
      },
    },
    impactScope: {
      studentCount: 18,
      description: '18 名学生的作文存在 2 个以上语法问题，9 名学生的句式多样性低于 50%',
    },
    recommendedActions: [
      { label: '生成作文讲评', desc: '课堂讲评提纲和错误分析', primary: true, onClickKey: 'generate_writing_review' },
      { label: '生成句式升级练习', desc: '把简单句改写为丰富表达', primary: true, onClickKey: 'generate_sentence_upgrade' },
      { label: '生成高频错误讲解', desc: '针对时态、单复数等错误', onClickKey: 'generate_error_explanation' },
      { label: '生成优秀范文', desc: '生成不同档次范文', onClickKey: 'generate_model_essay' },
      { label: '生成语法专项练习', desc: '围绕高频语法错误生成', onClickKey: 'generate_grammar_practice' },
      { label: '查看学生作文', desc: '查看学生作文和批改记录', onClickKey: 'view_student_essays' },
      { label: '分层布置写作任务', desc: '不同学生推送不同难度', confirm: true, onClickKey: 'tiered_writing_assignment' },
      { label: '导出作文批改报告', desc: '导出整体表现和问题', onClickKey: 'export_writing_report' },
    ],
  }
}

export { buildPracticeStageInsight, buildVocabularyInsight, buildListeningSpeakingInsight, buildWritingInsight }

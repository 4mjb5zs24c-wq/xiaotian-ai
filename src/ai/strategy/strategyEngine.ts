/**
 * Teaching Strategy Engine —— 教学策略决策引擎
 *
 * 核心职责：
 *   根据班级情况、地区、考试阶段、教师偏好、趋势数据，
 *   自动生成 TeachingStrategyPlan。
 *
 * 这是 AI "教学大脑"——不是盲目执行，而是先做策略决策。
 */

import type {
  TeachingStrategy,
  TeachingStrategyPlan,
  StrategyAction,
  RiskAlert,
  TeacherInsight,
  ClassProfile,
  ExamStage,
  ClassLevel,
  StrategyRegion,
} from './types'
import { analyzeTrends, summarizeTrends } from './trendAnalyzer'

// ═══════════════════════════════════════════════════════
// Strategy Definitions
// ═══════════════════════════════════════════════════════

const strategyDefinitions: TeachingStrategy[] = [
  {
    id: 'daily-sync',
    name: '同步巩固',
    applicableGrades: ['七年级上', '七年级下', '八年级上', '八年级下'],
    applicableScenes: ['日常教学', '课后练习'],
    applicableExamStages: ['normal'],
    applicableLevels: ['basic', 'normal'],
    goals: ['同步教材进度', '巩固基础知识', '减少常见错误'],
    actions: [
      { type: 'recommend_vocab_review', priority: 8, description: '每日词汇复习' },
      { type: 'recommend_grammar', priority: 6, description: '基础语法巩固' },
      { type: 'generate_dictation', priority: 7, description: '单元词汇默写' },
    ],
  },
  {
    id: 'exam-prep-midterm',
    name: '期中冲刺',
    applicableGrades: ['七年级上', '七年级下', '八年级上', '八年级下'],
    applicableScenes: ['考前复习'],
    applicableExamStages: ['midterm'],
    applicableLevels: ['normal', 'advanced'],
    goals: ['系统复习', '查漏补缺', '模拟训练'],
    actions: [
      { type: 'add_error_review', priority: 10, description: '错题集中复习' },
      { type: 'generate_exam_paper', priority: 9, description: '生成模拟试卷' },
      { type: 'recommend_vocab_review', priority: 8, description: '高频词汇复习' },
      { type: 'add_timed_reading', priority: 7, description: '限时阅读训练' },
    ],
  },
  {
    id: 'zhongkao-sprint',
    name: '中考冲刺',
    applicableGrades: ['九年级上', '九年级下', '中考'],
    applicableScenes: ['考前冲刺'],
    applicableExamStages: ['zhongkao_sprint'],
    applicableLevels: ['sprint', 'advanced'],
    goals: ['高频考点', '真题强化', '听说冲刺', '写作模板'],
    actions: [
      { type: 'generate_exam_paper', priority: 10, description: '中考真题模拟' },
      { type: 'add_error_review', priority: 10, description: '高频错题复习' },
      { type: 'recommend_writing', priority: 9, description: '写作模板背诵' },
      { type: 'add_timed_reading', priority: 8, description: '限时阅读（中考速度）' },
      { type: 'add_spoken_practice', priority: 8, description: '听说冲刺训练' },
    ],
  },
  {
    id: 'guangdong-speaking',
    name: '广东听说强化',
    applicableGrades: ['七年级上', '七年级下', '八年级上', '八年级下', '中考'],
    applicableScenes: ['日常教学', '考前复习'],
    applicableRegions: ['guangdong'],
    goals: ['听说考试高分', '口语流利度', '听力反应速度'],
    actions: [
      { type: 'add_spoken_practice', priority: 10, description: '每日口语训练' },
      { type: 'recommend_listening', priority: 9, description: '人机对话模拟' },
      { type: 'recommend_speaking', priority: 9, description: '朗读+情景问答' },
    ],
  },
  {
    id: 'beijing-reading',
    name: '北京读写强化',
    applicableGrades: ['七年级上', '七年级下', '八年级上', '八年级下', '中考'],
    applicableScenes: ['日常教学', '考前复习'],
    applicableRegions: ['beijing'],
    goals: ['阅读理解高分', '写作表达'],
    actions: [
      { type: 'recommend_reading', priority: 10, description: '每日阅读训练' },
      { type: 'recommend_writing', priority: 9, description: '写作专项练习' },
      { type: 'add_timed_reading', priority: 8, description: '限时阅读（北京题型）' },
    ],
  },
  {
    id: 'advanced-enrichment',
    name: '提高拓展',
    applicableGrades: ['八年级上', '八年级下', '九年级上'],
    applicableScenes: ['日常教学'],
    applicableLevels: ['advanced'],
    goals: ['拓展阅读', '写作提升', '文化意识'],
    actions: [
      { type: 'recommend_reading', priority: 9, description: '拓展时文阅读' },
      { type: 'recommend_writing', priority: 8, description: '写作技巧提升' },
      { type: 'increase_difficulty', priority: 7, description: '适当提高练习难度' },
    ],
  },
  {
    id: 'basic-support',
    name: '基础夯实',
    applicableGrades: ['七年级上', '七年级下', '八年级上', '八年级下'],
    applicableScenes: ['日常教学', '课后练习'],
    applicableLevels: ['basic'],
    goals: ['词汇积累', '基础句型', '学习信心'],
    actions: [
      { type: 'recommend_vocab_review', priority: 10, description: '每日基础词汇' },
      { type: 'reduce_difficulty', priority: 9, description: '降低难度，增强信心' },
      { type: 'add_vocab_game', priority: 8, description: '词汇游戏增加趣味' },
      { type: 'recommend_grammar', priority: 7, description: '基础语法（减少量）' },
    ],
  },
]

// ═══════════════════════════════════════════════════════
// Engine
// ═══════════════════════════════════════════════════════

export function generateTeachingStrategy(profile: ClassProfile): TeachingStrategyPlan {
  console.log('\n╔══════════════════════════════════════╗')
  console.log('║  🧠 Strategy Engine 启动              ║')
  console.log('╠══════════════════════════════════════╣')
  console.log(`║  班级: ${profile.className} | 等级: ${profile.level}`)
  console.log(`║  地区: ${profile.region} | 阶段: ${profile.examStage}`)
  console.log(`║  均分: ${profile.recentAvgScore} | 弱项: ${profile.weakPoints.map(w => w.topic).join(', ')}`)
  console.log('╚══════════════════════════════════════╝')

  // 1. Analyze trends
  const trends = analyzeTrends()
  const trendSummary = summarizeTrends(trends)
  console.log(`  📊 趋势: ${trendSummary}`)

  // 2. Match strategies
  const activeStrategies = matchStrategies(profile)
  console.log(`  🎯 匹配策略: ${activeStrategies.map(s => s.name).join(', ')}`)

  // 3. Collect and rank actions
  const allActions = collectActions(activeStrategies, profile)
  const recommendedActions = rankActions(allActions)
  console.log(`  📋 推荐动作: ${recommendedActions.slice(0, 5).map(a => a.type).join(', ')}`)

  // 4. Generate risk alerts
  const riskAlerts = generateRiskAlerts(profile, trends)
  console.log(`  ⚠️ 风险: ${riskAlerts.length} 条`)

  // 5. Teacher insights
  const teacherInsights = generateTeacherInsights()

  // 6. Region focus
  const regionFocus = getRegionFocus(profile.region)

  const summary = [
    `阶段：${examStageLabel(profile.examStage)}`,
    `班级：${classLevelLabel(profile.level)}`,
    `地区侧重：${regionFocus.join('、')}`,
    `趋势：${trendSummary}`,
    `核心策略：${activeStrategies.map(s => s.name).join('、')}`,
  ].join(' | ')

  console.log(`  ✅ 策略生成完成\n`)

  return {
    activeStrategies,
    recommendedActions,
    examStage: profile.examStage,
    classLevel: profile.level,
    regionFocus,
    riskAlerts,
    teacherInsights,
    summary,
  }
}

// ═══════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════

function matchStrategies(profile: ClassProfile): TeachingStrategy[] {
  return strategyDefinitions.filter((s) => {
    let match = true
    if (s.applicableGrades.length > 0 && !s.applicableGrades.some(g => profile.grade.includes(g.replace('年级', '').replace('上', '').replace('下', '')) || profile.grade === g)) match = false
    if (s.applicableExamStages && s.applicableExamStages.length > 0 && !s.applicableExamStages.includes(profile.examStage)) match = false
    if (s.applicableLevels && s.applicableLevels.length > 0 && !s.applicableLevels.includes(profile.level)) match = false
    if (s.applicableRegions && s.applicableRegions.length > 0 && !s.applicableRegions.includes(profile.region)) match = false
    return match
  })
}

function collectActions(strategies: TeachingStrategy[], profile: ClassProfile): StrategyAction[] {
  const actions: StrategyAction[] = []
  for (const s of strategies) {
    for (const a of s.actions) {
      // Boost priority for actions that address weak points
      let priority = a.priority
      if (profile.weakPoints.some(w => {
        if (a.type.includes('vocab') && w.topic.includes('词汇')) return true
        if (a.type.includes('reading') && w.topic.includes('阅读')) return true
        if (a.type.includes('listening') && w.topic.includes('听力')) return true
        if (a.type.includes('writing') && w.topic.includes('写作')) return true
        return false
      })) {
        priority = Math.min(10, priority + 2)
      }
      actions.push({ ...a, priority })
    }
  }
  return actions
}

function rankActions(actions: StrategyAction[]): StrategyAction[] {
  return [...actions].sort((a, b) => b.priority - a.priority).slice(0, 8)
}

function generateRiskAlerts(profile: ClassProfile, trends: ReturnType<typeof analyzeTrends>): RiskAlert[] {
  const alerts: RiskAlert[] = []

  // Reading decline alert
  if (trends.readingTrend.direction === 'declining' && Math.abs(trends.readingTrend.changeRate) > 5) {
    alerts.push({
      level: 'critical',
      title: '阅读理解持续下滑',
      description: `阅读正确率近4周下降${Math.abs(trends.readingTrend.changeRate)}%，当前${trends.readingTrend.dataPoints[trends.readingTrend.dataPoints.length - 1].value}%。主旨推断和词义猜测是主要失分点。`,
      suggestedAction: '建议立即增加每日限时阅读训练（10分钟/天），重点教授主题句定位法',
    })
  }

  // Weak point alert
  for (const wp of profile.weakPoints) {
    if (wp.errorRate > 40) {
      alerts.push({
        level: 'critical',
        title: `${wp.topic}错误率过高`,
        description: `${wp.topic}错误率${wp.errorRate}%，远超班级平均水平。`,
        suggestedAction: `建议安排${wp.topic}专项训练，至少2次/周`,
      })
    } else if (wp.errorRate > 30) {
      alerts.push({
        level: 'warning',
        title: `${wp.topic}需要关注`,
        description: `${wp.topic}错误率${wp.errorRate}%。`,
        suggestedAction: `建议在课堂中增加${wp.topic}的讲解和练习`,
      })
    }
  }

  // Overall decline
  if (trends.overallTrend.direction === 'declining') {
    alerts.push({
      level: 'warning',
      title: '综合成绩呈下降趋势',
      description: '建议安排一次阶段复习，全面梳理近期知识点',
      suggestedAction: '本周安排一次系统复习课（45分钟），重点回顾弱项知识点',
    })
  }

  // Listening decline in speaking-focused regions
  if (trends.listeningTrend.direction === 'declining' && ['guangdong', 'jiangsu'].includes(profile.region)) {
    alerts.push({
      level: 'critical',
      title: `${regionLabel(profile.region)}听力/听说成绩下滑`,
      description: `${regionLabel(profile.region)}地区听说考试成绩占比高，下滑影响较大。`,
      suggestedAction: '建议增加人机对话模拟训练，每周至少2次',
    })
  }

  return alerts
}

function generateTeacherInsights(): TeacherInsight[] {
  // Future: from teacher_feedback in memory
  return [
    { type: 'preference', description: '偏好使用分类记忆法教词汇', confidence: 0.8, source: '历史教学行为' },
    { type: 'habit', description: '习惯周五安排小测验', confidence: 0.7, source: 'workflow 历史' },
    { type: 'trend', description: '近两周增加了听力训练频率', confidence: 0.75, source: '使用数据分析' },
  ]
}

function getRegionFocus(region: StrategyRegion): string[] {
  switch (region) {
    case 'guangdong': return ['听说训练', '人机对话', '情景问答']
    case 'beijing': return ['阅读理解', '写作表达', '语法运用']
    case 'jiangsu': return ['综合能力', '听说考试', '阅读深度']
    case 'zhejiang': return ['综合能力', '阅读广度', '写作逻辑']
    case 'shanghai': return ['综合能力', '听力精度', '文化意识']
    default: return ['同步巩固', '基础夯实', '兴趣培养']
  }
}

// ── Labels ─────────────────────────────────────────────

function examStageLabel(s: ExamStage): string {
  const m: Record<ExamStage, string> = { normal: '日常教学', midterm: '期中备考', final: '期末备考', mock_exam: '模拟考', zhongkao_sprint: '中考冲刺', gaokao_sprint: '高考冲刺' }
  return m[s]
}

function classLevelLabel(l: ClassLevel): string {
  const m: Record<ClassLevel, string> = { basic: '基础班', normal: '普通班', advanced: '提高班', sprint: '冲刺班' }
  return m[l]
}

function regionLabel(r: StrategyRegion): string {
  const m: Record<StrategyRegion, string> = { default: '通用', guangdong: '广东', beijing: '北京', jiangsu: '江苏', zhejiang: '浙江', shanghai: '上海' }
  return m[r]
}

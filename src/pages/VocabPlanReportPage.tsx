import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft, Download, TrendingUp, TrendingDown, Minus,
  Users, Target, AlertTriangle, CheckCircle2,
} from 'lucide-react'
import type { VocabAbilityDimension } from '../ai/insights/vocabularyAbilityTypes'
import VocabAbilityRadar from '../ai/components/vocabulary-insight/VocabAbilityRadar'

// ══════════════════════════════════════════════════════════════
// Mock report data
// ══════════════════════════════════════════════════════════════

type PlanType = 'weakWords' | 'stageReview'

/** demo: 从 planId 推断方案类型 */
function getPlanType(planId: string): PlanType {
  return planId.includes('stage') ? 'stageReview' : 'weakWords'
}

const MOCK_REPORT_WEAK_WORDS = {
  planType: 'weakWords' as PlanType,
  planName: '高频错词提升方案',
  className: '2023级A18班',
  status: '已完成' as const,
  progress: '已完成 2/2 份任务',
  updatedAt: '2026-06-24 10:30',
  reviewScope: '人教版 · 八年级下册 · 按错词范围',
  metrics: {
    overallCompletionRate: 0.96,
    overallAccuracy: 0.74,
    accuracyBefore: 0.58,
    accuracyAfter: 0.74,
    accuracyChange: 16,
    baselineLabel: '较方案前',
    hasBaseline: true,
    trendDirection: 'up' as const,
    primaryWeakAbility: '词汇运用表达',
    attentionStudentCount: 4,
  },
  abilityScoresBefore: { recognition: 52, contextual_understanding: 68, expression: 40, learning_strategy: 62 } as Record<VocabAbilityDimension, number>,
  abilityScoresAfter:  { recognition: 68, contextual_understanding: 74, expression: 58, learning_strategy: 65 } as Record<VocabAbilityDimension, number>,
  stageTrends: [
    { stage: '错词回滚 1', completionRate: 0.93, accuracy: 0.62, studentCount: 38, totalStudents: 41, published: true },
    { stage: '错词回滚 2', completionRate: 1.0, accuracy: 0.74, studentCount: 40, totalStudents: 41, published: true },
  ],
  attentionStudents: [
    { name: '张同学', overallAccuracy: 0.46, completionRate: 1.0, missedCount: 0, status: '需重点关注' as const, reason: '正确率低于班级平均' },
    { name: '李同学', overallAccuracy: 0.40, completionRate: 0.5, missedCount: 1, status: '需重点关注' as const, reason: '未完成任务，且正确率低于班级平均' },
    { name: '王同学', overallAccuracy: 0.55, completionRate: 1.0, missedCount: 0, status: '略有改善' as const, reason: '仍低于班级平均，建议继续观察' },
    { name: '赵同学', overallAccuracy: 0.53, completionRate: 1.0, missedCount: 0, status: '需重点关注' as const, reason: '正确率提升不明显' },
  ],
  weakContents: {
    topWords: [
      { word: 'AI/artificial intelligence', errorRate: 0.78, studentCount: 18, mainIssue: '不会写', ability: '词汇运用表达' },
      { word: 'efficiency', errorRate: 0.72, studentCount: 15, mainIssue: '不会写', ability: '词汇识记' },
      { word: 'delicious', errorRate: 0.68, studentCount: 13, mainIssue: '读不准', ability: '语境理解' },
      { word: 'restaurant', errorRate: 0.65, studentCount: 12, mainIssue: '读不准', ability: '语境理解' },
      { word: 'perseverance', errorRate: 0.62, studentCount: 11, mainIssue: '不会写', ability: '词汇运用表达' },
      { word: 'recommend', errorRate: 0.58, studentCount: 10, mainIssue: '生词', ability: '词汇识记' },
      { word: 'atmosphere', errorRate: 0.55, studentCount: 9, mainIssue: '生词', ability: '词汇识记' },
      { word: 'Beijing', errorRate: 0.52, studentCount: 9, mainIssue: '不会写', ability: '词汇运用表达' },
      { word: 'vegetable', errorRate: 0.48, studentCount: 8, mainIssue: '读不准', ability: '语境理解' },
      { word: 'inspire', errorRate: 0.45, studentCount: 7, mainIssue: '读不准', ability: '语境理解' },
    ],
    topWeakQuestionTypes: [
      { type: '默写', scoreRate: 0.42, attempts: 380, studentCount: 41 },
      { type: '听写', scoreRate: 0.55, attempts: 320, studentCount: 38 },
      { type: '词形变化题', scoreRate: 0.60, attempts: 280, studentCount: 35 },
    ],
    primaryWeakAbilities: ['词汇运用表达', '词汇识记'],
  },
  suggestions: [
    '建议继续安排拼写和默写练习，特别是多音节词的音形对应训练。',
    '对于 4 名改善不足的学生，可布置个性化词汇闯关进行针对性巩固。',
    '后续可结合学生复习行为，进一步关注词汇学习策略表现。',
  ],
}

const MOCK_REPORT_STAGE = {
  planType: 'stageReview' as PlanType,
  planName: '阶段词汇能力提升方案',
  className: '2023级A18班',
  status: '已完成' as const,
  progress: '已完成 2/2 份任务',
  updatedAt: '2026-06-24 10:30',
  reviewScope: '人教版 · 八年级下册 · Unit 3',

  // ── Core metrics (5 cards) ──
  metrics: {
    overallCompletionRate: 0.96,       // 整体完成率 (0-1)
    overallAccuracy: 0.74,             // 整体正确率 (0-1)
    accuracyBefore: 0.58,              // 方案前正确率 (0-1)
    accuracyAfter: 0.74,               // 当前正确率 (0-1)
    accuracyChange: 16,                // 正确率变化 (pp)
    baselineLabel: '较方案前',
    hasBaseline: true,
    trendDirection: 'up' as const,
    primaryWeakAbility: '词汇运用表达',
    attentionStudentCount: 4,
  },

  // ── Ability before/after ──
  abilityScoresBefore: { recognition: 52, contextual_understanding: 68, expression: 40, learning_strategy: 62 } as Record<VocabAbilityDimension, number>,
  abilityScoresAfter:  { recognition: 68, contextual_understanding: 74, expression: 58, learning_strategy: 65 } as Record<VocabAbilityDimension, number>,

  // ── Stage trends for line chart ──
  stageTrends: [
    { stage: '词汇闯关 1', completionRate: 0.93, accuracy: 0.62, studentCount: 38, totalStudents: 41, published: true },
    { stage: '词汇闯关 2', completionRate: 1.0, accuracy: 0.74, studentCount: 40, totalStudents: 41, published: true },
  ],

  attentionStudents: [
    { name: '张同学', overallAccuracy: 0.46, completionRate: 1.0, missedCount: 0, status: '需重点关注' as const, reason: '正确率低于班级平均' },
    { name: '李同学', overallAccuracy: 0.40, completionRate: 0.5, missedCount: 1, status: '需重点关注' as const, reason: '未完成任务，且正确率低于班级平均' },
    { name: '王同学', overallAccuracy: 0.55, completionRate: 1.0, missedCount: 0, status: '略有改善' as const, reason: '仍低于班级平均，建议继续观察' },
    { name: '赵同学', overallAccuracy: 0.53, completionRate: 1.0, missedCount: 0, status: '需重点关注' as const, reason: '正确率提升不明显' },
  ],

  weakContents: {
    topWords: [
      { word: 'AI/artificial intelligence', errorRate: 0.78, studentCount: 18, mainIssue: '不会写', ability: '词汇运用表达' },
      { word: 'efficiency', errorRate: 0.72, studentCount: 15, mainIssue: '不会写', ability: '词汇识记' },
      { word: 'delicious', errorRate: 0.68, studentCount: 13, mainIssue: '读不准', ability: '语境理解' },
      { word: 'restaurant', errorRate: 0.65, studentCount: 12, mainIssue: '读不准', ability: '语境理解' },
      { word: 'perseverance', errorRate: 0.62, studentCount: 11, mainIssue: '不会写', ability: '词汇运用表达' },
      { word: 'recommend', errorRate: 0.58, studentCount: 10, mainIssue: '生词', ability: '词汇识记' },
      { word: 'atmosphere', errorRate: 0.55, studentCount: 9, mainIssue: '生词', ability: '词汇识记' },
      { word: 'Beijing', errorRate: 0.52, studentCount: 9, mainIssue: '不会写', ability: '词汇运用表达' },
      { word: 'vegetable', errorRate: 0.48, studentCount: 8, mainIssue: '读不准', ability: '语境理解' },
      { word: 'inspire', errorRate: 0.45, studentCount: 7, mainIssue: '读不准', ability: '语境理解' },
    ],
    topWeakQuestionTypes: [
      { type: '默写', scoreRate: 0.42, attempts: 380, studentCount: 41 },
      { type: '听写', scoreRate: 0.55, attempts: 320, studentCount: 38 },
      { type: '词形变化题', scoreRate: 0.60, attempts: 280, studentCount: 35 },
    ],
    primaryWeakAbilities: ['词汇运用表达', '词汇识记'],
  },

  suggestions: [
    '建议继续安排拼写和默写练习，特别是多音节词的音形对应训练。',
    '对于 4 名改善不足的学生，可布置个性化词汇闯关进行针对性巩固。',
    '后续可结合学生复习行为，进一步关注词汇学习策略表现。',
  ],
}

// ══════════════════════════════════════════════════════════════
// Line chart for practice trends
// ══════════════════════════════════════════════════════════════

function StageTrendLineChart({ trends }: {
  trends: { stage: string; completionRate: number; accuracy: number; studentCount: number; totalStudents: number; published: boolean }[]
}) {
  const CHART_W = 680; const CHART_H = 220
  const PAD_L = 50; const PAD_R = 20; const PAD_T = 15; const PAD_B = 35
  const plotW = CHART_W - PAD_L - PAD_R
  const plotH = CHART_H - PAD_T - PAD_B

  const publishedTrends = trends.filter(t => t.published)
  if (publishedTrends.length === 0) return <p className="text-[11px] text-slate-400 text-center py-4">暂无已发布的词汇闯关数据</p>

  const xPositions = publishedTrends.map((_, i) => {
    if (publishedTrends.length === 1) return PAD_L + plotW / 2
    return PAD_L + (i / (publishedTrends.length - 1)) * plotW
  })

  const yFromVal = (v: number) => PAD_T + plotH - (v * plotH)
  const yTicks = [0, 0.25, 0.5, 0.75, 1.0]

  const completionPoints = xPositions.map((x, i) => `${x},${yFromVal(publishedTrends[i].completionRate)}`).join(' ')
  const accuracyPoints = xPositions.map((x, i) => `${x},${yFromVal(publishedTrends[i].accuracy)}`).join(' ')

  return (
    <div>
      {/* Legend */}
      <div className="flex items-center gap-4 mb-2 text-[10px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0 border-t-2 border-dashed border-slate-300" />
          <span>完成率</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0 border-t-2 border-blue-500" />
          <span>正确率</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg width={CHART_W} height={CHART_H} viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="w-full">

          {/* Grid lines */}
          {yTicks.map(v => (
            <g key={v}>
              <line x1={PAD_L} y1={yFromVal(v)} x2={CHART_W - PAD_R} y2={yFromVal(v)} stroke="#f0f4f8" strokeWidth={0.5} />
              <text x={PAD_L - 8} y={yFromVal(v) + 3} textAnchor="end" className="text-[9px] fill-slate-400">
                {Math.round(v * 100)}%
              </text>
            </g>
          ))}

          {/* Completion rate line */}
          <polyline points={completionPoints} fill="none" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="5,3" strokeLinejoin="round" />
          {xPositions.map((x, i) => (
            <g key={`comp-${i}`}>
              <circle cx={x} cy={yFromVal(publishedTrends[i].completionRate)} r={3.5} fill="white" stroke="#94a3b8" strokeWidth={1.5} />
              <text x={x} y={yFromVal(publishedTrends[i].completionRate) - 8} textAnchor="middle" className="text-[9px] fill-slate-500 font-medium">
                {Math.round(publishedTrends[i].completionRate * 100)}%
              </text>
            </g>
          ))}

          {/* Accuracy line */}
          <polyline points={accuracyPoints} fill="none" stroke="#3b82f6" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
          {xPositions.map((x, i) => (
            <g key={`acc-${i}`}>
              <circle cx={x} cy={yFromVal(publishedTrends[i].accuracy)} r={4.5} fill="#3b82f6" stroke="white" strokeWidth={2} />
              <text x={x} y={yFromVal(publishedTrends[i].accuracy) - 10} textAnchor="middle" className="text-[9px] fill-blue-600 font-bold">
                {Math.round(publishedTrends[i].accuracy * 100)}%
              </text>
            </g>
          ))}

          {/* X axis labels */}
          {publishedTrends.map((t, i) => (
            <text key={`xl-${i}`} x={xPositions[i]} y={CHART_H - 2} textAnchor="middle" className="text-[10px] fill-slate-500 font-medium">
              {t.stage}
            </text>
          ))}
        </svg>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// Component
// ══════════════════════════════════════════════════════════════

export default function VocabPlanReportPage() {
  const navigate = useNavigate()
  const { planId = '' } = useParams<{ planId: string }>()
  const planType = getPlanType(planId)
  const report = planType === 'stageReview' ? MOCK_REPORT_STAGE : MOCK_REPORT_WEAK_WORDS
  const m = report.metrics

  const TrendIcon = m.trendDirection === 'up' ? TrendingUp : m.trendDirection === 'down' ? TrendingDown : Minus
  const trendColor = m.trendDirection === 'up' ? 'text-emerald-500' : m.trendDirection === 'down' ? 'text-red-500' : 'text-slate-500'
  const trendLabel = m.trendDirection === 'up' ? `提升 ${m.accuracyChange} 个百分点` : m.trendDirection === 'down' ? `降低 ${Math.abs(m.accuracyChange)} 个百分点` : '基本持平'

  return (
    <div className="flex justify-center px-6">
      <div className="flex-1 w-full py-5 space-y-5 max-w-[1160px]">

        {/* ===== 1. Report Header ===== */}
        <div className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
              <ArrowLeft size={18} />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-slate-800">
                {planType === 'stageReview' ? '阶段词汇能力提升方案报告' : '词汇提升方案报告'}
              </h1>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                {planType === 'stageReview'
                  ? '基于阶段词汇能力提升方案，展示复习范围、练习完成情况、词汇能力变化和阶段提升效果。'
                  : '基于本次高频错词提升方案，展示练习完成后错词掌握变化、薄弱词改善情况和整体练习表现。'
                }
              </p>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400 flex-wrap">
                <span>方案名称：{report.planName}</span>
                <span className="text-slate-300">|</span>
                <span>班级：{report.className}</span>
                <span className="text-slate-300">|</span>
                <span>复习范围：{report.reviewScope}</span>
                <span className="text-slate-300">|</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-medium">{report.status}</span>
                <span className="text-slate-300">|</span>
                <span>{report.progress}</span>
                <span className="text-slate-300">|</span>
                <span>数据更新：{report.updatedAt}</span>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-[#4b9fe8] border border-[#b8d4f0] hover:bg-[#eaf2fb] transition-colors">
              <Download size={12} />下载 PDF
            </button>
          </div>
        </div>

        {/* ===== 2. Core Metrics (5 cards) ===== */}
        <div className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">核心指标</h2>
          <div className="grid grid-cols-5 gap-4">
            <MetricCard icon={<CheckCircle2 size={16} />} color="text-slate-500" label="整体完成率"
              value={`${Math.round(m.overallCompletionRate * 100)}%`} />
            <MetricCard icon={<Target size={16} />} color="text-blue-500" label="整体正确率"
              value={`${Math.round(m.overallAccuracy * 100)}%`} />
            <MetricCard icon={<TrendIcon size={16} />} color={trendColor}
              label={`正确率变化（${m.baselineLabel}）`}
              value={`${Math.round(m.accuracyBefore * 100)}% → ${Math.round(m.accuracyAfter * 100)}%`}
              sub={trendLabel} />
            <MetricCard icon={<AlertTriangle size={16} />} color="text-amber-500" label="主要薄弱能力"
              value={m.primaryWeakAbility} />
            <MetricCard icon={<Users size={16} />} color="text-indigo-500" label="待关注学生"
              value={`${m.attentionStudentCount} 人`} />
          </div>
        </div>

        {/* ===== 3. Vocabulary Ability Performance Comparison — Radar Chart ===== */}
        <VocabAbilityRadar
          scores={report.abilityScoresAfter}
          beforeScores={report.abilityScoresBefore}
          title="词汇能力变化"
        />

        {/* ===== 4. Practice Performance Trends ===== */}
        <div className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">练习表现趋势</h2>

          {/* Line chart */}
          <StageTrendLineChart trends={report.stageTrends} />

          {/* Lightweight data rows below chart */}
          <div className="mt-3 space-y-1">
            {report.stageTrends.map(t => (
              <div key={t.stage} className="flex items-center gap-4 text-[11px]">
                <span className="font-semibold text-slate-600 w-20">{t.stage}</span>
                {t.published ? (
                  <span className="text-slate-400">
                    完成率 <span className="font-semibold text-slate-600">{Math.round(t.completionRate * 100)}%</span>
                    <span className="mx-2 text-slate-300">|</span>
                    正确率 <span className="font-semibold text-blue-600">{Math.round(t.accuracy * 100)}%</span>
                    <span className="mx-2 text-slate-300">|</span>
                    有效作答 <span className="text-slate-500">{t.studentCount}/{t.totalStudents} 人</span>
                  </span>
                ) : (
                  <span className="text-slate-300">待发布</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ===== 5. Students Needing Attention ===== */}
        <div className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">待关注学生</h2>
          <div className="space-y-2">
            {report.attentionStudents.map((s, i) => (
              <div key={i} className="bg-slate-50 rounded-xl px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] font-semibold text-slate-700">{s.name}</span>
                    <span className="text-[11px] text-slate-400">整体正确率 {Math.round(s.overallAccuracy * 100)}%</span>
                    {s.missedCount > 0 && <span className="text-[11px] text-amber-600">未完成 {s.missedCount} 份</span>}
                  </div>
                  <span className={`text-[11px] px-2 py-0.5 rounded font-medium
                    ${s.status === '需重点关注' ? 'text-amber-600 bg-amber-50' : 'text-slate-400 bg-slate-100'}`}>
                    {s.status}
                  </span>
                </div>
                {'reason' in s && (
                  <p className="text-[10px] text-slate-400 mt-1">原因：{s.reason}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ===== 6. High-Frequency Weak Content ===== */}
        <div className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">高频薄弱内容</h2>

          {/* 7a. Top wrong words */}
          <div className="mb-4">
            <p className="text-[11px] font-medium text-slate-500 mb-2">高频错词 TOP10</p>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left px-3 py-1.5 font-medium text-slate-500 w-6">#</th>
                    <th className="text-left px-3 py-1.5 font-medium text-slate-500">词汇</th>
                    <th className="text-center px-3 py-1.5 font-medium text-slate-500">错误率</th>
                    <th className="text-center px-3 py-1.5 font-medium text-slate-500">涉及学生</th>
                    <th className="text-center px-3 py-1.5 font-medium text-slate-500">主要问题</th>
                    <th className="text-center px-3 py-1.5 font-medium text-slate-500">对应能力</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.weakContents.topWords.map((w, i) => (
                    <tr key={w.word}>
                      <td className="px-3 py-1.5 text-slate-400">{i + 1}</td>
                      <td className="px-3 py-1.5 font-semibold text-slate-700">{w.word}</td>
                      <td className="px-3 py-1.5 text-center text-red-500 font-semibold">{Math.round(w.errorRate * 100)}%</td>
                      <td className="px-3 py-1.5 text-center text-slate-600">{w.studentCount} 人</td>
                      <td className="px-3 py-1.5 text-center text-slate-500">{w.mainIssue}</td>
                      <td className="px-3 py-1.5 text-center text-slate-500">{w.ability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 7b. Weak question types */}
          <div>
            <p className="text-[11px] font-medium text-slate-500 mb-2">薄弱题型 TOP3</p>
            <div className="grid grid-cols-3 gap-3">
              {report.weakContents.topWeakQuestionTypes.map(qt => (
                <div key={qt.type} className="bg-slate-50 rounded-xl p-3">
                  <p className="text-[12px] font-semibold text-slate-700">{qt.type}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">正确率 {Math.round(qt.scoreRate * 100)}%</p>
                  <p className="text-[10px] text-slate-400">作答 {qt.attempts} 人次 · {qt.studentCount} 人</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== 7. Follow-up Suggestions ===== */}
        <div className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-3">后续建议</h2>
          <ul className="space-y-2">
            {report.suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-slate-600">
                <span className="text-blue-400 mt-0.5">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* ===== 8. Download PDF ===== */}
        <div className="flex justify-center pb-8">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-[13px] font-semibold text-white bg-blue-500 hover:bg-blue-600 shadow-sm transition-colors">
            <Download size={14} />下载 PDF 报告
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Metric Card ─────────────────────────────────────────────

function MetricCard({ icon, color, label, value, sub }: {
  icon: React.ReactNode; color: string; label: string; value: string; sub?: string
}) {
  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={color}>{icon}</span>
        <span className="text-[10px] text-slate-400">{label}</span>
      </div>
      <p className="text-base font-bold text-slate-800">{value}</p>
      {sub && <p className="text-[11px] text-slate-500 mt-0.5">{sub}</p>}
    </div>
  )
}

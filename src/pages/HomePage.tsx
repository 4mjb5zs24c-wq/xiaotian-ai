import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, Sparkles, Send, FileText, BookOpen, Mic,
  PenLine, Monitor, Gamepad2, Video, FileCheck, Grid3X3,
  ChevronRight, TrendingUp,
  Edit3, Zap, ChevronLeft, Play,
} from 'lucide-react'
import { useAIStore } from '../ai/store'
import { matchNewSearch } from '../ai/search-new/searchEngine'
import { matchIntent } from '../ai/workflows'
import { runWorkflowRunner } from '../ai/engine'
import type { RunnerResult, RunnerStatus } from '../ai/engine'
import WorkflowResultDrawer from '../ai/components/WorkflowResultDrawer'
import { generateHomeInsights } from '../ai/insights/insightRules'
import type { InsightItem } from '../ai/insights/insightTypes'
import { generateTeachingInsight } from '../ai/insights/teachingInsightGenerator'
import type { TeachingInsightType } from '../ai/insights/teachingInsightTypes'
import { MOCK_VOCAB_CONCERN_CARDS } from '../ai/insights/mockVocabularyInsight'
import { MOCK_WRITING_CONCERN_CARDS } from '../ai/insights/mockWritingInsight'

// Map insight module to TeachingInsight type + panel
function getInsightMapping(insight: InsightItem): { panel: string; insightType: TeachingInsightType; isPage?: boolean } {
  switch (insight.module) {
    case 'home_wrong_word': return { panel: 'vocabStageInsight', insightType: 'vocabulary' }
    case 'home_listening_speaking': return { panel: 'listeningStageInsight', insightType: 'listeningSpeaking' }
    case 'home_writing': return { panel: 'writingStageInsight', insightType: 'writing' }
    case 'exam_reminder': return { panel: 'practiceStageInsight', insightType: 'practiceStage' }
    case 'vocabulary_insight': return { panel: '', insightType: 'vocabulary', isPage: true }
    case 'writing_insight': return { panel: '', insightType: 'writing', isPage: true }
    default: return { panel: 'vocabStageInsight', insightType: 'vocabulary' }
  }
}

// ── Types ──────────────────────────────────────────────

interface PracticeModule {
  label: string
  color: string
  icon: typeof FileText
}

interface TeachingModule {
  icon: typeof Monitor
  label: string
  subtitle: string
  gradient: string
  route: string
}

interface ResourceModule {
  label: string
  desc: string
  color: string
  tag?: string
}

interface ReportItem {
  title: string
  className: string
  groupName: string
  done: number
  total: number
  date: string
  canRemind: boolean
  hasReport: boolean
  hasFullscreenExplain?: boolean
  isNew?: boolean
}

const practiceModules: PracticeModule[] = [
  { label: '同步', icon: FileText, color: '#4b9fe8' },
  { label: '专项', icon: FileCheck, color: '#5bb878' },
  { label: '模拟', icon: Grid3X3, color: '#8b7cf0' },
  { label: '趣味配音', icon: Mic, color: '#f08c3a' },
  { label: '时文阅读', icon: BookOpen, color: '#3dbfc4' },
  { label: '主题视频', icon: Video, color: '#e85d8b' },
  { label: '课后PK', icon: Gamepad2, color: '#e8a83a' },
  { label: '选题组卷', icon: FileCheck, color: '#6b7db3' },
  { label: '试卷/答题卡', icon: FileCheck, color: '#7389d1' },
  { label: '自定义批改', icon: Edit3, color: '#d97a5c' },
]

const teachingModules: TeachingModule[] = [
  { icon: Monitor, label: '同步教学', subtitle: '词汇 / 课件 / 视频', gradient: 'from-[#4b9fe8] to-[#6db5f0]', route: '/sync-teaching' },
  { icon: TrendingUp, label: '中考复习', subtitle: '词汇', gradient: 'from-[#5bb878] to-[#7ecc93]', route: '/exam-review' },
  { icon: PenLine, label: '作文练习', subtitle: 'AI智能批改作文', gradient: 'from-[#8b7cf0] to-[#a99df5]', route: '/writing-practice' },
  { icon: Zap, label: '词汇PK', subtitle: '词句 / 拼写 / 语用', gradient: 'from-[#f08c3a] to-[#f5b06e]', route: '/vocabulary-pk' },
]

const resourceModules: ResourceModule[] = [
  { label: '听说培优', desc: '广东听说专项', color: '#4b9fe8' },
  { label: '听力模拟练习', desc: '人机对话训练', color: '#5bb878' },
  { label: '听说专项突破', desc: '情景对话+模仿朗读', color: '#8b7cf0', tag: '热门' },
  { label: '主题视频', desc: '课前导入素材', color: '#e85d8b' },
  { label: '时文阅读', desc: '热点话题阅读', color: '#3dbfc4' },
  { label: '语法专项', desc: '名词/动词/从句', color: '#6b7db3' },
  { label: '阅读理解', desc: '完形+阅读训练', color: '#5bb878' },
  { label: '写作素材', desc: '高分句型积累', color: '#e8a83a' },
]

const homeInsights = generateHomeInsights({ disabledModules: ['home_wrong_word', 'home_writing', 'home_listening_speaking', 'exam_reminder'], enableExamReminder: false })

// Add vocabulary insight cards to home insights
const vocabConcernCards: InsightItem[] = MOCK_VOCAB_CONCERN_CARDS.filter(c => c.type === 'vocabulary_insight').map(c => ({
  insightId: c.id,
  module: 'vocabulary_insight' as InsightItem['module'],
  title: c.summary,
  riskLevel: c.status === '需关注' ? 'high' as const : 'medium' as const,
  priority: c.status === '需关注' ? 1 : 2,
  tags: ['词汇洞察'],
  detail: '',
  summary: c.summary,
  suggestion: '',
  actionLabel: '查看详情',
  evidence: { summary: c.summary, details: [] },
  analysis: '',
  actions: [],
  sourceData: {},
  sampleInfo: { totalStudents: 42, sampleCount: 42, sampleRatio: 1, isSampleTooSmall: false },
  createdAt: String(Date.now()),
  status: 'active' as const,
  scope: { type: 'class' as const, className: '初一 1 班' },
}))

// Add writing insight cards to home insights
const writingConcernCards: InsightItem[] = MOCK_WRITING_CONCERN_CARDS.filter(c => c.type === 'writing_insight').map(c => ({
  insightId: c.id,
  module: 'writing_insight' as InsightItem['module'],
  title: c.summary,
  riskLevel: c.status === '需关注' ? 'high' as const : 'medium' as const,
  priority: c.status === '需关注' ? 1 : 2,
  tags: ['写作洞察'],
  detail: '',
  summary: c.summary,
  suggestion: '',
  actionLabel: '查看详情',
  evidence: { summary: c.summary, details: [] },
  analysis: '',
  actions: [],
  sourceData: {},
  sampleInfo: { totalStudents: 42, sampleCount: 42, sampleRatio: 1, isSampleTooSmall: false },
  createdAt: String(Date.now()),
  status: 'active' as const,
  scope: { type: 'class' as const, className: '初一 1 班' },
}))

// 阶段性报告洞察卡片
const stageReportInsight: InsightItem = {
  insightId: 'stage_report_home',
  module: 'exam_reminder' as InsightItem['module'],
  title: '阶段性报告分析',
  riskLevel: 'medium' as const,
  priority: 3,
  scope: { className: '初一 1 班' },
  evidence: { summary: '阶段报告诊断', details: [] },
  analysis: '',
  suggestion: '',
  actions: [],
  sourceData: {},
  sampleInfo: { totalStudents: 42, sampleCount: 42, sampleRatio: 1, isSampleTooSmall: false },
  createdAt: String(Date.now()),
  status: 'active' as const,
} as InsightItem
const allHomeInsights = [...vocabConcernCards.slice(0, 1), ...writingConcernCards.slice(0, 1), stageReportInsight, ...homeInsights] // 词汇 → 写作 → 阶段性报告

const recentReports: ReportItem[] = [
  { title: '个性化词汇练习', className: '初一1班', groupName: '全班', done: 2, total: 43, date: '2026-05-25', canRemind: true, hasReport: true },
  { title: '冲刺训练（四十一）', className: '初一1班', groupName: '指定分组', done: 1, total: 1, date: '2026-05-24', canRemind: false, hasReport: true, hasFullscreenExplain: true },
  { title: '冲刺训练（一）（新）', className: '初一1班', groupName: '指定分组', done: 0, total: 7, date: '2026-05-23', canRemind: false, hasReport: true, hasFullscreenExplain: true, isNew: true },
  { title: '试题（六）', className: '初一1班', groupName: '全班', done: 0, total: 43, date: '2026-05-22', canRemind: true, hasReport: true },
  { title: 'Unit3 词汇听写练习', className: '初一1班', groupName: '全班', done: 5, total: 43, date: '2026-05-20', canRemind: true, hasReport: true },
  { title: 'Unit2 语法专项测评', className: '初一1班', groupName: '全班', done: 8, total: 43, date: '2026-05-18', canRemind: true, hasReport: true },
  { title: '期中模拟检测', className: '初一1班', groupName: '全班', done: 10, total: 43, date: '2026-05-15', canRemind: false, hasReport: true, hasFullscreenExplain: true },
  { title: '句式转换练习', className: '初一1班', groupName: '指定分组', done: 0, total: 12, date: '2026-05-12', canRemind: true, hasReport: true },
  { title: 'Unit4 单词默写', className: '初一1班', groupName: '全班', done: 3, total: 43, date: '2026-05-10', canRemind: true, hasReport: true },
  { title: '阶段性综合测评', className: '初一1班', groupName: '全班', done: 12, total: 43, date: '2026-05-08', canRemind: false, hasReport: true, hasFullscreenExplain: true },
  { title: '听力选择题专项训练', className: '初一1班', groupName: '指定分组', done: 0, total: 15, date: '2026-05-05', canRemind: true, hasReport: true, isNew: true },
  { title: '完形填空（十二）', className: '初一1班', groupName: '全班', done: 6, total: 43, date: '2026-05-02', canRemind: true, hasReport: true },
  { title: '阅读理解推断题练习', className: '初一1班', groupName: '指定分组', done: 2, total: 20, date: '2026-04-28', canRemind: true, hasReport: true },
]

// ── Main Component ─────────────────────────────────────

export default function HomePage() {
  const navigate = useNavigate()
  const teacherContext = useAIStore((s) => s.teacherContext)
  const scrollRef = useRef<HTMLDivElement>(null)

  // ── Workflow Runner state ──
  const [wfDrawerOpen, setWfDrawerOpen] = useState(false)
  const [wfStatus, setWfStatus] = useState<RunnerStatus>('idle')
  const [wfResult, setWfResult] = useState<RunnerResult | null>(null)
  const [wfStepNames, setWfStepNames] = useState<string[]>([])

  // ── AI search ──
  const [aiQuery, setAiQuery] = useState('')
  const setAIDrawerPanel = useAIStore((s) => s.setAIDrawerPanel)
  const setNewSearchResult = useAIStore((s) => s.setNewSearchResult)

  const openAISearch = (query?: string) => {
    if (query) {
      const ctx = {
        textbook: teacherContext.textbook,
        unit: teacherContext.unit,
        grade: teacherContext.grade,
        className: teacherContext.className,
        studentCount: teacherContext.studentCount,
      }
      const result = matchNewSearch(query, ctx)
      setNewSearchResult(result)
      setAIDrawerPanel('searchResultNew', { query })
    } else {
      navigate('/ai-search')
    }
  }

  const handleQuickAction = async (query: string) => {
    const matched = matchIntent(query, 'practice_module')
    if (matched.intent === 'ambiguous' || !matched.workflowId) {
      openAISearch(query)
      return
    }
    setWfStepNames([])
    setWfStatus('loading')
    setWfResult(null)
    setWfDrawerOpen(true)
    const result = await runWorkflowRunner(matched.workflowId, {
      textbook: teacherContext.textbook,
      unit: teacherContext.unit,
      grade: teacherContext.grade,
      className: teacherContext.className,
      studentCount: teacherContext.studentCount,
      query,
    })
    setWfResult(result)
    setWfStatus(result.success ? 'success' : 'error')
    setWfStepNames(result.steps.map((s) => s.stepId))
  }

  const handleAssign = async (context?: Record<string, unknown>) => {
    const query = context?.title as string || '布置练习'
    handleQuickAction(`布置 ${query}`)
  }

  const handleAISearch = () => {
    const q = aiQuery.trim()
    if (!q) {
      alert('请输入你想找的资源或要完成的教学任务')
      return
    }
    openAISearch(q)
    setAiQuery('')
  }

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -240 : 240, behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-3 h-full overflow-hidden">
            {/* ── LEFT ~62% ── */}
            <div className="lg:col-span-3 flex flex-col space-y-2.5 h-full min-h-0">

              {/* 布置练习 */}
              <div className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm overflow-hidden shrink-0">
                <div className="px-4 py-2.5 border-b border-[#f0f4f8] flex items-center justify-between">
                  <h3 className="text-[13px] font-semibold text-[#3a4f66]">布置练习</h3>
                  <span className="text-[10px] text-[#8aabcc]">共 10 种练习类型</span>
                </div>
                <div className="p-3">
                  <div className="grid grid-cols-5 gap-2">
                    {practiceModules.map((m) => (
                      <button
                        key={m.label}
                        onClick={() => {
                        if (m.label === '同步') {
                          navigate('/assign-sync')
                        } else if (m.label === '专项') {
                          navigate('/assign-special')
                        } else if (m.label === '模拟') {
                          navigate('/assign-mock')
                        } else if (m.label === '趣味配音') {
                          navigate('/assign-dubbing')
                        } else if (m.label === '主题视频') {
                          navigate('/assign-video')
                        } else if (m.label === '课后PK') {
                          navigate('/assign-after-class-pk')
                        } else if (m.label === '试卷/答题卡') {
                          navigate('/assign-paper-card')
                        } else if (m.label === '自定义批改') {
                          navigate('/assign-custom-review')
                        } else if (m.label === '时文阅读') {
                          navigate('/assign-reading')
                        } else if (m.label === '选题组卷') {
                          navigate('/manual-compose')
                        } else {
                          handleQuickAction(`${m.label} ${teacherContext.unit}`)
                        }
                      }}
                        className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-[#eaf2fb] hover:bg-[#d6e6f7] transition-colors"
                      >
                        <span className="text-[11px] font-medium text-[#4a6b8a]">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 课堂教学 — flex-1 fills available height */}
              <div className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
                <div className="px-4 py-2.5 border-b border-purple-100/60 shrink-0">
                  <h3 className="text-[13px] font-semibold text-slate-700">课堂教学</h3>
                </div>
                <div className="p-4 grid grid-cols-4 gap-3 flex-1 min-h-0">
                  {teachingModules.map((m) => (
                    <button
                      key={m.label}
                      onClick={() => navigate(m.route)}
                      className="relative flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-purple-100 via-purple-50 to-indigo-50 border border-purple-200 overflow-hidden group hover:shadow-md hover:border-purple-300 transition-all h-full"
                    >
                      <div className="text-left">
                        <p className="text-[13px] font-semibold text-slate-700">{m.label}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{m.subtitle}</p>
                      </div>
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-200/50 self-end">
                        <m.icon size={22} className="text-purple-500" />
                      </div>
                      <div className="absolute -right-3 -bottom-3 w-16 h-16 rounded-full bg-purple-100/40" />
                    </button>
                  ))}
                </div>
              </div>

              {/* 更多课本 */}
              <div className="bg-gradient-to-b from-blue-50/60 to-blue-50/30 rounded-2xl border border-blue-100 shadow-sm overflow-hidden shrink-0">
                <div className="px-4 py-2.5 border-b border-blue-100/60 flex items-center justify-between">
                  <h3 className="text-[13px] font-semibold text-slate-700">更多课本</h3>
                  <div className="flex items-center gap-1">
                    <button onClick={() => scroll('left')} className="p-1.5 rounded-lg hover:bg-blue-100 text-slate-400 hover:text-blue-500 transition-colors">
                      <ChevronLeft size={15} />
                    </button>
                    <button onClick={() => scroll('right')} className="p-1.5 rounded-lg hover:bg-blue-100 text-slate-400 hover:text-blue-500 transition-colors">
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
                <div className="p-3 pb-3">
                  <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                    {resourceModules.map((m, i) => (
                      <div
                        key={m.label}
                        className={`flex-none w-[155px] rounded-2xl border border-blue-100 overflow-hidden hover:shadow-md transition-shadow group text-left bg-white ${i >= 5 ? 'hidden xl:block' : ''}`}
                      >
                        <div className="h-[72px] flex items-center justify-center relative bg-gradient-to-br from-blue-400 to-blue-500">
                          <Play size={24} className="text-white/40" />
                          {m.tag && (
                            <span className="absolute top-2 right-2 text-[9px] bg-white/90 text-blue-700 px-1.5 py-0.5 rounded-full font-medium">
                              {m.tag}
                            </span>
                          )}
                        </div>
                        <div className="p-3">
                          <p className="text-[11px] font-medium text-slate-700">{m.label}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{m.desc}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button className="text-[10px] text-blue-600 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg font-medium transition-colors">
                              布置
                            </button>
                            <button className="text-[10px] text-blue-600 font-medium group-hover:underline">
                              进入
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* ── RIGHT ~38% ── */}
            <div className="lg:col-span-2 flex flex-col space-y-2.5 h-full min-h-0">

              {/* 小天AI — description beside title */}
              <div className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm overflow-hidden shrink-0">
                <div className="px-4 py-2.5 border-b border-[#f0f4f8] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      onClick={() => openAISearch()}
                      className="flex items-center gap-1.5 hover:opacity-80 transition-opacity shrink-0"
                    >
                      <div className="flex items-center justify-center w-5 h-5 rounded-md bg-[#4b9fe8]">
                        <Sparkles size={11} className="text-white" />
                      </div>
                      <h3 className="text-[12px] font-semibold text-[#3a4f66] whitespace-nowrap">小天AI智能助手</h3>
                    </button>
                    <span className="text-[9px] text-[#8aabcc] bg-[#f0f4f8] px-1.5 py-0.5 rounded-full shrink-0">Beta</span>
                  </div>
                  <p className="text-[10px] text-[#8aabcc] truncate hidden sm:block">快速找到想要的功能，点我试试～</p>
                </div>
                <div className="px-4 py-2.5">
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#f7f9fc] border border-[#e4ecf3] rounded-xl focus-within:border-[#b8d4f0] transition-colors">
                    <Search size={13} className="text-[#b0c8de] shrink-0" />
                    <input
                      type="text"
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
                      placeholder="试试：生成Unit3词汇听写、查同步资源..."
                      className="flex-1 bg-transparent text-[12px] text-[#3a4f66] placeholder-[#c0d4e8] outline-none"
                    />
                    <button onClick={handleAISearch} className="text-[#4b9fe8] hover:text-[#3a8fd8] shrink-0">
                      <Send size={13} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 教学洞察 — compact 3-column grid */}
              <div className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm overflow-hidden shrink-0">
                <div className="px-4 py-2 border-b border-[#f0f4f8] flex items-center justify-between">
                  <h3 className="text-[12px] font-semibold text-[#3a4f66]">教学洞察</h3>
                  <span className="text-[10px] text-[#8aabcc]">{allHomeInsights.length} 条</span>
                </div>
                <div className="p-2 grid grid-cols-3 gap-2">
                  {allHomeInsights.map((insight) => {
                    const isHigh = insight.riskLevel === 'high'
                    const isMedium = insight.riskLevel === 'medium'
                    const badgeLabel = isHigh ? '需关注' : isMedium ? '建议关注' : '一般关注'
                    const leftBorder = isHigh
                      ? 'border-l-[3px] border-l-red-400'
                      : isMedium
                        ? 'border-l-[3px] border-l-amber-400'
                        : 'border-l-[3px] border-l-blue-300'
                    const badgeStyle = isHigh
                      ? 'text-red-600 bg-red-50'
                      : isMedium
                        ? 'text-amber-600 bg-amber-50'
                        : 'text-blue-500 bg-blue-50'
                    return (
                      <button
                        key={insight.insightId}
                        onClick={() => {
                          // 阶段性报告 → 打开 AI 抽屉 practiceStage 面板
                          if (insight.insightId === 'stage_report_home') {
                            const stageInsight = generateTeachingInsight('practiceStage')
                            useAIStore.getState().setAIDrawerPanel('practiceStageInsight', { insight: stageInsight } as Record<string, unknown>)
                            return
                          }
                          const mapping = getInsightMapping(insight)
                          if (mapping.isPage) {
                            if (insight.module === 'writing_insight') navigate('/writing-insight')
                            else navigate('/vocabulary-insight')
                            return
                          }
                          const teachingInsight = generateTeachingInsight(mapping.insightType)
                          useAIStore.getState().setAIDrawerPanel(mapping.panel, { insight: teachingInsight } as Record<string, unknown>)
                        }}
                        className={`text-left p-2.5 rounded-lg border border-[#e8eef4] transition-all group bg-white hover:border-[#b8d4f0] hover:shadow-sm ${leftBorder}`}
                      >
                        <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${badgeStyle}`}>
                          {badgeLabel}
                        </span>
                        <p className="text-[11px] font-semibold text-[#3a4f66] mt-1.5 line-clamp-2 leading-tight">
                          {insight.title}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 练习报告 — flex-1 fills remaining height */}
              <div className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
                <div className="px-4 py-2 border-b border-[#f0f4f8] flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[13px] font-semibold text-[#3a4f66]">练习报告</h3>
                    <span className="text-[10px] text-[#4b9fe8] bg-[#eaf2fb] px-2 py-0.5 rounded-lg cursor-pointer hover:bg-[#d6e6f7] transition-colors font-medium">
                      全部
                    </span>
                  </div>
                  <button
                    onClick={() => navigate('/practice-reports')}
                    className="text-[10px] text-[#8aabcc] hover:text-[#4b9fe8] transition-colors"
                  >
                    查看全部列表
                  </button>
                </div>
                <div className="p-2 space-y-2 flex-1 overflow-y-auto">
                  {recentReports.map((r, i) => (
                    <div key={i} className={`rounded-lg border border-[#eef2f6] overflow-hidden ${i >= 5 ? 'hidden xl:block' : ''}`}>
                      {/* Title bar */}
                      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#f7f9fc] border-b border-[#eef2f6]">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <FileText size={12} className="text-[#8aabcc] shrink-0" />
                          <span className="text-[12px] font-bold text-[#3a4f66] truncate">{r.title}</span>
                          {r.isNew && (
                            <span className="text-[9px] text-red-500 bg-red-50 px-2 py-0.5 rounded-full font-medium shrink-0">新</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          {r.canRemind && (
                            <button className="text-[11px] text-amber-500 hover:text-amber-600 font-medium whitespace-nowrap transition-colors">
                              一键催
                            </button>
                          )}
                          {r.hasFullscreenExplain && (
                            <button className="text-[11px] text-[#4b9fe8] border border-[#b8d4f0] hover:bg-[#eaf2fb] px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors">
                              全屏讲解
                            </button>
                          )}
                          {r.hasReport && (
                            <button
                              onClick={() => navigate('/practice-reports')}
                              className="text-[11px] text-[#4b9fe8] hover:text-[#3a8fd8] font-medium whitespace-nowrap transition-colors"
                            >
                              报告
                            </button>
                          )}
                        </div>
                      </div>
                      {/* Body */}
                      <div className="flex items-center gap-2 px-3.5 py-3 bg-white">
                        <span className="text-[11px] text-[#8aabcc]">{r.className}</span>
                        <span className="text-[#d0dce8] text-[10px]">|</span>
                        <span className="text-[11px] text-[#8aabcc]">{r.groupName}</span>
                        <span className="text-[#d0dce8] text-[10px]">|</span>
                        <span className="text-[11px] text-[#8aabcc]">
                          <span className="text-[#4a6b8a] font-semibold">{r.done}</span>/{r.total}人完成
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

      {/* ── Workflow Result Drawer ── */}
      <WorkflowResultDrawer
        open={wfDrawerOpen}
        onClose={() => setWfDrawerOpen(false)}
        status={wfStatus}
        result={wfResult}
        stepNames={wfStepNames}
        onAssign={handleAssign}
      />
    </>
  )
}

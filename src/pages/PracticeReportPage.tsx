import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronRight, FileText, MoreVertical, Send, Search,
  ArrowUpDown, Filter, LayoutGrid, List, Sparkles,
} from 'lucide-react'
import { useAIStore } from '../ai/store'
import { generateTeachingInsight } from '../ai/insights/teachingInsightGenerator'
import ReviewPlanAssignmentCard from '../ai/components/vocabulary-insight/ReviewPlanAssignmentCard'
import type { ReviewPlanAssignmentCollection, ReviewPlanDayTask } from '../ai/insights/reviewPlanAssignmentTypes'

// ── Types ──────────────────────────────────────────────

type FilterTab = 'all' | 'review_plan' | 'homework' | 'exam' | 'listening' | 'writing'

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'review_plan', label: '词汇复习计划' },
  { key: 'homework', label: '普通练习' },
  { key: 'exam', label: '试卷' },
  { key: 'listening', label: '听力' },
  { key: 'writing', label: '写作' },
]

function loadStoredPlans(): ReviewPlanAssignmentCollection[] {
  try {
    const raw = localStorage.getItem('xiaotian_review_plans')
    if (raw) return JSON.parse(raw) as ReviewPlanAssignmentCollection[]
  } catch { /* ignore */ }
  return []
}

interface ReportItem {
  reportId: string
  title: string
  assignDate: string
  weekday: string
  className: string
  groupName: string
  completed: number
  total: number
  score?: string
  status: '进行中' | '已结束'
  estimatedTime: string
  canRemind: boolean
  hasReport: boolean
  isNew?: boolean
}

interface ReportGroup {
  date: string
  weekday: string
  items: ReportItem[]
}

// ── Mock Data ──────────────────────────────────────────

const mockReportGroups: ReportGroup[] = [
  {
    date: '2026-05-25',
    weekday: '周一',
    items: [
      { reportId: 'rpt-001', title: '个性化词汇练习', assignDate: '2026-05-25', weekday: '周一', className: '初一1班', groupName: '全班', completed: 2, total: 43, status: '进行中', estimatedTime: '15分钟', canRemind: true, hasReport: true },
    ],
  },
  {
    date: '2026-05-24',
    weekday: '周日',
    items: [
      { reportId: 'rpt-002', title: '冲刺训练（四十一）', assignDate: '2026-05-24', weekday: '周日', className: '初一1班', groupName: '指定分组', completed: 1, total: 1, score: '7.5/50分', status: '已结束', estimatedTime: '90分钟', canRemind: false, hasReport: true },
    ],
  },
  {
    date: '2026-05-23',
    weekday: '周六',
    items: [
      { reportId: 'rpt-003', title: '冲刺训练（一）（新）', assignDate: '2026-05-23', weekday: '周六', className: '初一1班', groupName: '全班', completed: 0, total: 7, score: '-/50分', status: '已结束', estimatedTime: '45分钟', canRemind: true, hasReport: true, isNew: true },
    ],
  },
  {
    date: '2026-05-22',
    weekday: '周五',
    items: [
      { reportId: 'rpt-004', title: 'Unit3 词汇听写练习', assignDate: '2026-05-22', weekday: '周五', className: '初一1班', groupName: '全班', completed: 5, total: 43, status: '进行中', estimatedTime: '20分钟', canRemind: true, hasReport: true },
    ],
  },
  {
    date: '2026-05-20',
    weekday: '周三',
    items: [
      { reportId: 'rpt-005', title: '试题（六）', assignDate: '2026-05-20', weekday: '周三', className: '初一1班', groupName: '全班', completed: 0, total: 43, status: '进行中', estimatedTime: '60分钟', canRemind: true, hasReport: false },
    ],
  },
  {
    date: '2026-05-18',
    weekday: '周一',
    items: [
      { reportId: 'rpt-006', title: 'Unit2 阶段测试', assignDate: '2026-05-18', weekday: '周一', className: '初一1班', groupName: '全班', completed: 40, total: 43, score: '82.5/100分', status: '已结束', estimatedTime: '90分钟', canRemind: false, hasReport: true },
    ],
  },
]

// ── Status Badge ───────────────────────────────────────

function StatusBadge({ status }: { status: ReportItem['status'] }) {
  if (status === '进行中') {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        进行中
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
      已结束
    </span>
  )
}

// ── Report Card ────────────────────────────────────────

function ReportCard({ r }: { r: ReportItem }) {
  return (
    <div className="bg-white rounded-xl border border-[#e8eef4] overflow-hidden hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#f4f7fa] border-b border-[#eef2f6]">
        <div className="flex items-center gap-2 min-w-0">
          <FileText size={13} className="text-[#8aabcc] shrink-0" />
          <span className="text-[12px] font-semibold text-[#3a4f66] truncate">{r.title}</span>
          {r.isNew && (
            <span className="text-[9px] text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full font-medium shrink-0">新</span>
          )}
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[#8aabcc] shrink-0">
          <span>{r.assignDate}</span>
          <span>预计{r.estimatedTime}</span>
        </div>
      </div>
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] text-[#4a6b8a]">
            <span className="text-[#8aabcc]">班级</span>
            <span className="font-medium">{r.className}</span>
          </div>
          <span className="text-[#d0dce8]">|</span>
          <div className="flex items-center gap-1.5 text-[11px] text-[#4a6b8a]">
            <span className="text-[#8aabcc]">分组</span>
            <span className="font-medium">{r.groupName}</span>
          </div>
          <span className="text-[#d0dce8]">|</span>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-[#8aabcc]">完成</span>
            <span className="font-medium text-[#3a4f66]">{r.completed}</span>
            <span className="text-[#b8cde0]">/</span>
            <span className="text-[#8aabcc]">{r.total}人</span>
          </div>
          {r.score && (
            <>
              <span className="text-[#d0dce8]">|</span>
              <span className="text-[11px]">
                <span className="text-[#8aabcc]">得分 </span>
                <span className="font-semibold text-red-500">{r.score}</span>
              </span>
            </>
          )}
          <StatusBadge status={r.status} />
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          {r.canRemind && (
            <button className="flex items-center gap-1 text-[11px] text-[#4b9fe8] hover:text-[#3a8fd8] font-medium whitespace-nowrap transition-colors">
              <Send size={11} />
              一键催促
            </button>
          )}
          {r.hasReport && (
            <button className="text-[11px] text-[#4b9fe8] border border-[#b8d4f0] hover:bg-[#eaf2fb] px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors">
              报告
            </button>
          )}
          <button className="p-1 rounded-md text-[#b8cde0] hover:text-[#6b8aaa] hover:bg-[#f0f4f8] transition-colors">
            <MoreVertical size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Timeline ───────────────────────────────────────────

function TimelineMarker({ isFirst }: { isFirst: boolean }) {
  return (
    <div className="flex flex-col items-center shrink-0" style={{ width: 28 }}>
      <div className="w-2.5 h-2.5 rounded-full border-2 shrink-0" style={{ borderColor: '#b8d4f0', backgroundColor: isFirst ? '#4b9fe8' : '#fff' }} />
      <div className="flex-1 w-px min-h-[12px]" style={{ backgroundColor: '#dce8f2' }} />
    </div>
  )
}

function TimelineLastMarker() {
  return (
    <div className="flex flex-col items-center shrink-0" style={{ width: 28 }}>
      <div className="w-2.5 h-2.5 rounded-full border-2 shrink-0" style={{ borderColor: '#b8d4f0', backgroundColor: '#fff' }} />
    </div>
  )
}

// ── Filter Button ──────────────────────────────────────

function FilterButton({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#f4f7fa] border border-[#e4ecf3] text-[11px] text-[#4a6b8a] hover:border-[#b8d4f0] transition-colors">
      {label}
      <ChevronRight size={10} className="text-[#8aabcc] rotate-90" />
    </button>
  )
}

// ── Main Component ─────────────────────────────────────

export default function PracticeReportPage() {
  const navigate = useNavigate()
  const setPanel = useAIStore((s) => s.setAIDrawerPanel)

  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all')
  const storedPlans = useMemo(() => loadStoredPlans(), [])

  const [activeFilters] = useState({
    classFilter: '初一1班',
    statusFilter: '全部状态',
    checkStatusFilter: '全部检查状态',
    dateFrom: '',
    dateTo: '',
    search: '',
  })

  const handleInsightClick = (scrollTo?: string) => {
    const insight = generateTeachingInsight('practiceStage')
    setPanel('practiceStageInsight', { insight, scrollTo } as Record<string, unknown>)
  }

  const sortedGroups = [...mockReportGroups]
  if (sortOrder === 'asc') sortedGroups.reverse()

  return (
    <div className="h-full flex flex-col min-h-0">
      {/* White Content Container */}
      <div className="flex flex-col flex-1 min-h-0 bg-white rounded-2xl border border-[#e8eef4] shadow-sm overflow-hidden">
        {/* Breadcrumb */}
        <div className="shrink-0 px-5 pt-4 pb-2">
          <div className="flex items-center gap-1.5 text-[11px]">
            <button onClick={() => navigate('/')} className="text-[#8aabcc] hover:text-[#4b9fe8] transition-colors">首页</button>
            <ChevronRight size={11} className="text-[#c0d4e8]" />
            <span className="text-[#3a4f66] font-semibold">练习报告</span>
          </div>
        </div>

        {/* Title row + compact insight bar */}
        <div className="shrink-0 px-5 pb-2 flex items-center justify-between">
          <h2 className="text-[13px] font-semibold text-[#3a4f66] shrink-0">
            全部练习报告
            <span className="ml-1.5 text-[11px] text-[#8aabcc] font-normal">
              {mockReportGroups.reduce((sum, g) => sum + g.items.length, 0)} 份
            </span>
          </h2>
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f7f9fc] border border-[#e4ecf3] text-[11px] text-[#4a6b8a] hover:border-[#b8d4f0] transition-colors"
          >
            <span>按布置时间</span>
            <span className="text-[#4b9fe8] font-medium">{sortOrder === 'desc' ? '倒序' : '正序'}</span>
            <ArrowUpDown size={11} className="text-[#8aabcc]" />
          </button>
        </div>

        {/* Compact Insight Bar — h-[42px] slim row */}
        <div className="shrink-0 px-5 pb-3">
          <button
            onClick={() => handleInsightClick()}
            className="w-full flex items-center gap-2.5 h-[42px] px-3 rounded-lg bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-purple-50/40 border border-blue-100/60 hover:border-blue-200 hover:bg-blue-50/80 transition-all group"
          >
            <div className="flex items-center justify-center w-5 h-5 rounded bg-blue-500 shrink-0">
              <Sparkles size={11} className="text-white" />
            </div>
            <span className="text-[11px] font-bold text-[#3a4f66] shrink-0">阶段练习洞察</span>
            <span className="text-[#d0dce8] text-[10px]">·</span>
            <span className="text-[10px] text-slate-500 truncate">近两周 8 份练习</span>
            <div className="flex items-center gap-1.5 ml-auto shrink-0">
              {[
                { label: '完成率', value: '82%', sub: '↓7', level: 'warning' as const, scrollTo: 'sec-trend' },
                { label: '词汇拼写', value: '62%', sub: '关注', level: 'danger' as const, scrollTo: 'sec-radar' },
                { label: '学生关注', value: '8人', sub: '查看', level: 'warning' as const, scrollTo: 'sec-students' },
              ].map((item, i) => (
                <span
                  key={i}
                  onClick={(e) => { e.stopPropagation(); handleInsightClick(item.scrollTo) }}
                  className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] cursor-pointer hover:ring-1 hover:ring-current transition-all ${
                    item.level === 'danger' ? 'text-red-500 bg-red-50' : 'text-amber-500 bg-amber-50'
                  }`}
                >
                  <span className="opacity-70">{item.label}</span>
                  <span className="font-bold">{item.value}</span>
                  <span className="opacity-70">{item.sub}</span>
                </span>
              ))}
              <span className="text-[10px] text-[#4b9fe8] group-hover:translate-x-0.5 transition-transform font-medium whitespace-nowrap ml-1">查看分析 →</span>
            </div>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="shrink-0 px-5 pb-2 flex items-center gap-1.5 flex-wrap">
          <Filter size={12} className="text-[#8aabcc] shrink-0" />
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all
                ${activeFilter === tab.key
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-[#4a6b8a] bg-[#f4f7fa] border border-[#e4ecf3] hover:border-[#b8d4f0] hover:text-[#4b9fe8]'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="shrink-0 border-t border-[#f0f4f8]" />

        {/* Timeline List — scrollable */}
        <div className="flex-1 overflow-y-auto min-h-0 px-5 pt-3">
          {/* ── Review Plan Collections ── */}
          {(activeFilter === 'all' || activeFilter === 'review_plan') && storedPlans.length > 0 && (
            <div className="mb-4 space-y-3">
              {storedPlans.map(plan => (
                <ReviewPlanAssignmentCard
                  key={plan.id}
                  collection={plan}
                  defaultExpanded={false}
                  onViewReport={(dayTask: ReviewPlanDayTask) => {
                    if (dayTask.reportUrl) navigate(dayTask.reportUrl)
                  }}
                />
              ))}
            </div>
          )}

          {/* ── Regular Reports (placeholder filters) ── */}
          {(activeFilter === 'all' || activeFilter === 'homework' || activeFilter === 'exam' || activeFilter === 'listening' || activeFilter === 'writing') && (
            <>
          {sortedGroups.map((group, gi) => (
            <div key={group.date} className="flex gap-3">
              {gi === sortedGroups.length - 1 ? <TimelineLastMarker /> : <TimelineMarker isFirst={gi === 0} />}
              <div className="flex-1 min-w-0 pb-3">
                <div className="mb-2">
                  <span className="text-[11px] text-[#6b8aaa] font-medium">
                    布置时间 · {group.date}（{group.weekday}）
                  </span>
                </div>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <ReportCard key={item.reportId} r={item} />
                  ))}
                </div>
              </div>
            </div>
          ))}
            </>
          )}
        </div>

        {/* Bottom Filter Bar */}
        <div className="shrink-0 border-t border-[#f0f4f8] px-4 py-2.5 flex items-center gap-2 flex-wrap">
          <FilterButton label={activeFilters.classFilter} />
          <FilterButton label={activeFilters.statusFilter} />
          <FilterButton label={activeFilters.checkStatusFilter} />
          <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#f4f7fa] border border-[#e4ecf3] text-[11px] text-[#4a6b8a] hover:border-[#b8d4f0] transition-colors">
            <Filter size={11} />内容筛选<ChevronRight size={10} className="text-[#8aabcc] rotate-90" />
          </button>
          <div className="flex items-center gap-1.5 text-[11px] text-[#8aabcc]">
            <input type="text" placeholder="开始日期" className="w-[88px] px-2 py-1.5 rounded-lg bg-[#f4f7fa] border border-[#e4ecf3] text-[#3a4f66] placeholder-[#c0d4e8] outline-none focus:border-[#b8d4f0] transition-colors" />
            <span className="text-[#c0d4e8]">至</span>
            <input type="text" placeholder="结束日期" className="w-[88px] px-2 py-1.5 rounded-lg bg-[#f4f7fa] border border-[#e4ecf3] text-[#3a4f66] placeholder-[#c0d4e8] outline-none focus:border-[#b8d4f0] transition-colors" />
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#f4f7fa] border border-[#e4ecf3] flex-1 min-w-[160px] focus-within:border-[#b8d4f0] transition-colors">
            <Search size={11} className="text-[#b0c8de] shrink-0" />
            <input type="text" placeholder="请输入练习名称" className="flex-1 bg-transparent text-[11px] text-[#3a4f66] placeholder-[#c0d4e8] outline-none" />
          </div>
          <div className="flex items-center rounded-lg border border-[#e4ecf3] overflow-hidden">
            <button className="px-2 py-1.5 bg-[#eaf2fb] text-[#4b9fe8]"><List size={13} /></button>
            <button className="px-2 py-1.5 text-[#8aabcc] hover:text-[#4a6b8a] transition-colors"><LayoutGrid size={13} /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

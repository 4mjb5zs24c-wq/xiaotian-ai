import { useState } from 'react'
import {
  ChevronRight, MoreVertical, HelpCircle, BookOpen,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────

type MarkingCategory = '全部' | '听写纸批阅' | '作文纸批阅' | '其他试卷批阅'

interface MarkingTask {
  id: string
  title: string
  category: string
  categoryLabel: string
  classes: string
  classCount: number
  deadlineStart: string
  deadlineEnd: string
  hasReport: boolean
  canAutoMark: boolean
}

// ── Category tag colors ────────────────────────────────

const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  '听写纸': { bg: '#e6f7f0', text: '#1a8a5e', dot: '#2ecc88' },
  '其它试卷': { bg: '#fef3e5', text: '#c0782a', dot: '#f0a040' },
  '三方卡': { bg: '#e6f0fb', text: '#2a6ab8', dot: '#5090d8' },
}

function getCategoryColor(cat: string) {
  return categoryColors[cat] || { bg: '#f0f4f8', text: '#5a7a9a', dot: '#8aabcc' }
}

// ── Mock Data ──────────────────────────────────────────

const mockTasks: MarkingTask[] = [
  {
    id: 'mk01',
    title: '2026-04-07 23年（新课标 I、II 卷）',
    category: '其它试卷',
    categoryLabel: '其它试卷',
    classes: '写作测试班级、王玲、新班级、高一2班、初一1',
    classCount: 7,
    deadlineStart: '2026-04-07 14:52:26',
    deadlineEnd: '2026-04-08 14:52:26',
    hasReport: false,
    canAutoMark: true,
  },
  {
    id: 'mk02',
    title: '2026-03-31 听写',
    category: '听写纸',
    categoryLabel: '听写纸',
    classes: '王玲',
    classCount: 1,
    deadlineStart: '2026-03-31 09:43:57',
    deadlineEnd: '2026-04-07 09:43:57',
    hasReport: true,
    canAutoMark: true,
  },
  {
    id: 'mk03',
    title: '如何自我介绍【复制】',
    category: '其它试卷',
    categoryLabel: '其它试卷',
    classes: '新班级',
    classCount: 1,
    deadlineStart: '2026-01-29 16:52:22',
    deadlineEnd: '2026-02-02 15:03:44',
    hasReport: false,
    canAutoMark: true,
  },
  {
    id: 'mk04',
    title: '如何自我介绍',
    category: '其它试卷',
    categoryLabel: '其它试卷',
    classes: '新的教学班、王玲、新班级、写作测试班级、初一',
    classCount: 6,
    deadlineStart: '2026-01-26 15:03:44',
    deadlineEnd: '2026-02-02 15:03:44',
    hasReport: false,
    canAutoMark: true,
  },
  {
    id: 'mk05',
    title: '9月19日答题卡',
    category: '其它试卷',
    categoryLabel: '其它试卷',
    classes: '初一1班',
    classCount: 1,
    deadlineStart: '2025-12-22 13:52:22',
    deadlineEnd: '2025-12-29 13:52:22',
    hasReport: false,
    canAutoMark: true,
  },
  {
    id: 'mk06',
    title: '10月20日三方答题卡[副本]/第四日暨绿色&',
    category: '三方卡',
    categoryLabel: '三方卡',
    classes: '初一1班',
    classCount: 1,
    deadlineStart: '2025-12-19 16:41:06',
    deadlineEnd: '2025-12-26 16:41:06',
    hasReport: false,
    canAutoMark: true,
  },
  {
    id: 'mk07',
    title: '10月20日三方答题卡[副本]',
    category: '三方卡',
    categoryLabel: '三方卡',
    classes: '初一1班',
    classCount: 1,
    deadlineStart: '2025-12-18 16:41:06',
    deadlineEnd: '2025-12-25 16:41:06',
    hasReport: false,
    canAutoMark: true,
  },
]

// ── Main Component ─────────────────────────────────────

export default function ReportPage() {
  const [activeStatus, setActiveStatus] = useState<'pending' | 'history'>('pending')
  const [activeCategory, setActiveCategory] = useState<MarkingCategory>('全部')

  const filteredTasks =
    activeCategory === '全部'
      ? mockTasks
      : mockTasks.filter((t) => t.categoryLabel === activeCategory.replace('批阅', ''))

  const handleToast = (msg: string) => {
    alert(msg)
  }

  return (
    <div className="h-full flex flex-col min-h-0">
      {/* ── Title Row ── */}
      <div className="shrink-0 flex items-center justify-between mb-4">
        <h1 className="text-[17px] font-bold text-[#3a4f66]">智能阅卷</h1>
        <button
          onClick={() => handleToast('使用教程功能将在后续版本中接入')}
          className="flex items-center gap-1.5 text-[12px] text-[#6b8aaa] hover:text-[#3a4f66] transition-colors"
        >
          <HelpCircle size={15} className="text-[#8aabcc]" />
          使用教程
        </button>
      </div>

      {/* ── Status Tabs ── */}
      <div className="shrink-0 flex items-center gap-3 mb-4">
        <button
          onClick={() => setActiveStatus('pending')}
          className={`px-5 py-2 rounded-xl text-[13px] font-semibold transition-all ${
            activeStatus === 'pending'
              ? 'bg-[#4b9fe8] text-white shadow-sm'
              : 'bg-white border border-[#e4ecf3] text-[#6b8aaa] hover:border-[#b8d4f0]'
          }`}
        >
          待批阅(7)
        </button>
        <button
          onClick={() => setActiveStatus('history')}
          className={`px-5 py-2 rounded-xl text-[13px] font-semibold transition-all ${
            activeStatus === 'history'
              ? 'bg-[#4b9fe8] text-white shadow-sm'
              : 'bg-white border border-[#e4ecf3] text-[#6b8aaa] hover:border-[#b8d4f0]'
          }`}
        >
          历史(0)
        </button>
      </div>

      {/* ── Category Tags + Right Actions ── */}
      <div className="shrink-0 flex items-center justify-between mb-4">
        {/* Category tags — underline style */}
        <div className="flex items-center gap-6">
          {(['全部', '听写纸批阅', '作文纸批阅', '其他试卷批阅'] as MarkingCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative pb-2 text-[13px] font-medium transition-colors ${
                activeCategory === cat
                  ? 'text-[#4b9fe8]'
                  : 'text-[#6b8aaa] hover:text-[#3a4f66]'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-[#4b9fe8] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Right action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleToast('重阅记录功能将在后续版本中接入')}
            className="px-4 py-1.5 bg-[#4b9fe8] text-white text-[12px] font-medium rounded-lg hover:bg-[#3a8fd8] transition-colors shadow-sm"
          >
            重阅记录
          </button>
          <button
            onClick={() => handleToast('练习重阅功能将在后续版本中接入')}
            className="px-4 py-1.5 bg-[#4b9fe8] text-white text-[12px] font-medium rounded-lg hover:bg-[#3a8fd8] transition-colors shadow-sm"
          >
            练习重阅
          </button>
        </div>
      </div>

      {/* ── Task List ── */}
      <div className="flex-1 overflow-y-auto min-h-0 space-y-3 pb-6">
        {filteredTasks.map((task) => {
          const catColor = getCategoryColor(task.category)
          return (
            <div
              key={task.id}
              className="bg-[#f4f7fa] rounded-2xl px-5 py-4 flex items-center justify-between gap-4"
            >
              {/* Left: info */}
              <div className="min-w-0 flex-1 space-y-2">
                {/* Title */}
                <h3 className="text-[13px] font-semibold text-[#3a4f66] leading-snug">
                  {task.title}
                </h3>

                {/* Meta row */}
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Category tag */}
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: catColor.bg, color: catColor.text }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: catColor.dot }}
                    />
                    {task.categoryLabel}
                  </span>

                  {/* Classes */}
                  <span className="text-[11px] text-[#6b8aaa]">
                    {task.classes}
                    {task.classCount > 1 && (
                      <span className="text-[#8aabcc]"> 等 {task.classCount} 个班级</span>
                    )}
                  </span>

                  {/* Deadline */}
                  <span className="text-[11px] text-[#8aabcc]">
                    {task.deadlineStart} 至 {task.deadlineEnd}
                  </span>
                </div>
              </div>

              {/* Right: actions */}
              <div className="flex items-center gap-2 shrink-0">
                {task.hasReport && (
                  <button
                    onClick={() => handleToast('查看报告功能将在后续版本中接入')}
                    className="px-4 py-2 rounded-full border border-[#b8d4f0] text-[12px] text-[#4b9fe8] font-medium hover:bg-[#eaf2fb] transition-colors whitespace-nowrap"
                  >
                    查看报告
                  </button>
                )}
                <button
                  onClick={() => handleToast('自动批阅功能将在后续版本中接入')}
                  className="px-5 py-2 rounded-full bg-[#4b9fe8] text-white text-[12px] font-medium hover:bg-[#3a8fd8] transition-colors shadow-sm whitespace-nowrap"
                >
                  自动批阅
                </button>
                <button
                  onClick={() => handleToast('更多操作')}
                  className="p-1.5 text-[#b8cde0] hover:text-[#6b8aaa] hover:bg-white rounded-lg transition-colors"
                >
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Right Floating Button ── */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-20">
        <button className="flex flex-col items-center gap-0.5 px-2 py-3 bg-[#4b9fe8] text-white text-[10px] rounded-lg hover:bg-[#3a8fd8] transition-colors shadow-md">
          <BookOpen size={14} />
          <span style={{ writingMode: 'vertical-rl' }}>我的备课</span>
        </button>
        <button className="p-1 bg-white border border-[#e4ecf3] rounded-full text-[#8aabcc] hover:text-[#4a6b8a] shadow-sm transition-colors">
          <ChevronRight size={12} />
        </button>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Download, ChevronDown,
  RotateCcw, Monitor, Gamepad2, Mic, PenLine, FileText,
  BookOpen, Users, Circle, CheckCircle, ChevronRight,
} from 'lucide-react'
import SpecializedInsightEntry from '../ai/components/SpecializedInsightEntry'

// ── Types ──────────────────────────────────────────────

interface WrongWord {
  wordId: string
  word: string
  errorRate: number
  errorCount: number
  source: string
  selected: boolean
  category: string
  unit: string
  mistakeType: '生词' | '读不准' | '不会写' | '不会用'
}

// ── Mock Data ──────────────────────────────────────────

const mockWrongWords: WrongWord[] = [
  { wordId: 'w01', word: 'assist', errorRate: 100, errorCount: 1, source: 'Unit 3 测验', selected: false, category: '动词', unit: 'Unit 3', mistakeType: '不会写' },
  { wordId: 'w02', word: 'directly', errorRate: 100, errorCount: 1, source: 'Unit 3 测验', selected: false, category: '副词', unit: 'Unit 3', mistakeType: '不会写' },
  { wordId: 'w03', word: 'outline', errorRate: 100, errorCount: 2, source: 'Unit 3 测验', selected: false, category: '名词', unit: 'Unit 3', mistakeType: '不会写' },
  { wordId: 'w04', word: 'title', errorRate: 100, errorCount: 3, source: 'Unit 3 测验', selected: false, category: '名词', unit: 'Unit 3', mistakeType: '不会写' },
  { wordId: 'w05', word: 'absorb', errorRate: 50, errorCount: 2, source: 'Unit 4 练习', selected: false, category: '动词', unit: 'Unit 4', mistakeType: '生词' },
  { wordId: 'w06', word: 'accident', errorRate: 50, errorCount: 1, source: 'Unit 4 练习', selected: false, category: '名词', unit: 'Unit 4', mistakeType: '生词' },
  { wordId: 'w07', word: 'achievement', errorRate: 50, errorCount: 2, source: 'Unit 4 练习', selected: false, category: '名词', unit: 'Unit 4', mistakeType: '读不准' },
  { wordId: 'w08', word: 'agenda', errorRate: 100, errorCount: 4, source: 'Unit 5 听写', selected: false, category: '名词', unit: 'Unit 5', mistakeType: '生词' },
  { wordId: 'w09', word: 'antique', errorRate: 50, errorCount: 1, source: 'Unit 5 听写', selected: false, category: '形容词', unit: 'Unit 5', mistakeType: '生词' },
  { wordId: 'w10', word: 'aside', errorRate: 100, errorCount: 2, source: 'Unit 5 听写', selected: false, category: '副词', unit: 'Unit 5', mistakeType: '不会用' },
  { wordId: 'w11', word: 'assess', errorRate: 100, errorCount: 3, source: 'Unit 3 测验', selected: false, category: '动词', unit: 'Unit 3', mistakeType: '不会写' },
  { wordId: 'w12', word: 'authority', errorRate: 50, errorCount: 1, source: 'Unit 6 练习', selected: false, category: '名词', unit: 'Unit 6', mistakeType: '生词' },
  { wordId: 'w13', word: 'belong', errorRate: 100, errorCount: 2, source: 'Unit 6 练习', selected: false, category: '动词', unit: 'Unit 6', mistakeType: '不会用' },
  { wordId: 'w14', word: 'bride', errorRate: 50, errorCount: 1, source: 'Unit 6 练习', selected: false, category: '名词', unit: 'Unit 6', mistakeType: '生词' },
  { wordId: 'w15', word: 'carve', errorRate: 100, errorCount: 3, source: 'Unit 7 听写', selected: false, category: '动词', unit: 'Unit 7', mistakeType: '不会写' },
  { wordId: 'w16', word: 'classic', errorRate: 50, errorCount: 2, source: 'Unit 7 听写', selected: false, category: '形容词', unit: 'Unit 7', mistakeType: '生词' },
  { wordId: 'w17', word: 'crisis', errorRate: 100, errorCount: 4, source: 'Unit 7 听写', selected: false, category: '名词', unit: 'Unit 7', mistakeType: '读不准' },
  { wordId: 'w18', word: 'detect', errorRate: 50, errorCount: 1, source: 'Unit 3 测验', selected: false, category: '动词', unit: 'Unit 3', mistakeType: '生词' },
  { wordId: 'w19', word: 'dimension', errorRate: 100, errorCount: 2, source: 'Unit 5 听写', selected: false, category: '名词', unit: 'Unit 5', mistakeType: '不会写' },
  { wordId: 'w20', word: 'disability', errorRate: 50, errorCount: 1, source: 'Unit 6 练习', selected: false, category: '名词', unit: 'Unit 6', mistakeType: '生词' },
  { wordId: 'w21', word: 'division', errorRate: 100, errorCount: 3, source: 'Unit 7 听写', selected: false, category: '名词', unit: 'Unit 7', mistakeType: '不会写' },
  { wordId: 'w22', word: 'domain', errorRate: 50, errorCount: 1, source: 'Unit 4 练习', selected: false, category: '名词', unit: 'Unit 4', mistakeType: '生词' },
  { wordId: 'w23', word: 'drill', errorRate: 100, errorCount: 2, source: 'Unit 5 听写', selected: false, category: '名词', unit: 'Unit 5', mistakeType: '不会写' },
]

// ── Student Word Book Mock Data ────────────────────────

interface StudentWordRecord {
  id: number
  studentName: string
  totalWrongWords: number
  practicedWrongWords: number
  practicedPushedWords: number
  completedCount: number
  assignedCount: number
  activePracticeCount: number
}

const mockStudents: StudentWordRecord[] = [
  { id: 1, studentName: '滕虎', totalWrongWords: 3189, practicedWrongWords: 45, practicedPushedWords: 0, completedCount: 1, assignedCount: 4, activePracticeCount: 2 },
  { id: 2, studentName: '陈红', totalWrongWords: 2335, practicedWrongWords: 0, practicedPushedWords: 0, completedCount: 0, assignedCount: 4, activePracticeCount: 0 },
  { id: 3, studentName: '吕丹雯', totalWrongWords: 2324, practicedWrongWords: 0, practicedPushedWords: 0, completedCount: 0, assignedCount: 4, activePracticeCount: 0 },
  { id: 4, studentName: '宋国栋111', totalWrongWords: 1270, practicedWrongWords: 0, practicedPushedWords: 0, completedCount: 0, assignedCount: 4, activePracticeCount: 0 },
  { id: 5, studentName: '牛燕', totalWrongWords: 962, practicedWrongWords: 50, practicedPushedWords: 0, completedCount: 1, assignedCount: 4, activePracticeCount: 1 },
  { id: 6, studentName: '孙阿芬', totalWrongWords: 829, practicedWrongWords: 25, practicedPushedWords: 20, completedCount: 0, assignedCount: 4, activePracticeCount: 3 },
  { id: 7, studentName: '姜玉芝', totalWrongWords: 633, practicedWrongWords: 0, practicedPushedWords: 0, completedCount: 0, assignedCount: 4, activePracticeCount: 0 },
  { id: 8, studentName: '袁立位', totalWrongWords: 495, practicedWrongWords: 0, practicedPushedWords: 0, completedCount: 0, assignedCount: 4, activePracticeCount: 0 },
  { id: 9, studentName: '吴玮', totalWrongWords: 346, practicedWrongWords: 0, practicedPushedWords: 0, completedCount: 0, assignedCount: 4, activePracticeCount: 0 },
  { id: 10, studentName: '欧力', totalWrongWords: 216, practicedWrongWords: 0, practicedPushedWords: 0, completedCount: 0, assignedCount: 4, activePracticeCount: 0 },
  { id: 11, studentName: '吴笑灿', totalWrongWords: 143, practicedWrongWords: 0, practicedPushedWords: 0, completedCount: 0, assignedCount: 4, activePracticeCount: 0 },
  { id: 12, studentName: '和婧', totalWrongWords: 115, practicedWrongWords: 0, practicedPushedWords: 0, completedCount: 0, assignedCount: 4, activePracticeCount: 0 },
  { id: 13, studentName: '梁育衡', totalWrongWords: 112, practicedWrongWords: 0, practicedPushedWords: 0, completedCount: 0, assignedCount: 4, activePracticeCount: 0 },
]

// ── Filter Options ─────────────────────────────────────

const timeRanges = ['4.28 - 5.28', '5.01 - 5.31', '近一个月', '近两周']
const sortOptions = ['错误率由高到低', '错误率由低到高', '错误次数由高到低', '字母顺序']
const errorRateFilters = ['全部', '100%', '≥50%', '<50%']
const categoryOptions = ['全选', '动词', '名词', '形容词', '副词']
const unitOptions = ['全选', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6', 'Unit 7']

// ── Word Card ──────────────────────────────────────────

function WordCard({
  w,
  onToggle,
}: {
  w: WrongWord
  onToggle: (id: string) => void
}) {
  const isHighError = w.errorRate >= 100
  return (
    <button
      onClick={() => onToggle(w.wordId)}
      className={`relative text-left p-4 rounded-xl border transition-all ${
        w.selected
          ? 'border-[#4b9fe8] bg-[#eaf2fb] shadow-sm'
          : 'border-[#e8eef4] bg-white hover:border-[#b8d4f0] hover:shadow-sm'
      }`}
    >
      {/* Select circle — top right */}
      <div className="absolute top-3 right-3">
        {w.selected ? (
          <CheckCircle size={18} className="text-[#4b9fe8]" />
        ) : (
          <Circle size={18} className="text-[#d0dce8]" />
        )}
      </div>

      {/* Word */}
      <p className="text-[15px] font-bold text-[#3a4f66] pr-6">{w.word}</p>

      {/* Error rate */}
      <div className="mt-2 space-y-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#8aabcc]">平均错误率</span>
          <span className={`text-[12px] font-semibold ${isHighError ? 'text-red-500' : 'text-[#4a6b8a]'}`}>
            {w.errorRate}%
          </span>
        </div>
        <p className="text-[10px] text-[#8aabcc]">
          错误 {w.errorCount} 次
        </p>
      </div>

      {/* Source */}
      <p className="mt-2 text-[10px] text-[#4b9fe8] cursor-pointer hover:underline">
        错词来源
      </p>
    </button>
  )
}

// ── Main Component ─────────────────────────────────────

export default function WrongWordPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const tabParam = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState<'class' | 'student'>(
    tabParam === 'student' ? 'student' : 'class',
  )
  const [words, setWords] = useState<WrongWord[]>(mockWrongWords)

  // Sync activeTab when URL search params change externally (e.g., sidebar click)
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'student' && activeTab !== 'student') {
      setActiveTab('student')
    } else if (tab !== 'student' && activeTab === 'student') {
      setActiveTab('class')
    }
  }, [searchParams, activeTab])

  const handleTabChange = (tab: 'class' | 'student') => {
    setActiveTab(tab)
    if (tab === 'student') {
      setSearchParams({ tab: 'student' })
    } else {
      setSearchParams({})
    }
  }
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRanges[0])
  const [selectedSort, setSelectedSort] = useState(sortOptions[0])
  const [selectedErrorRate, setSelectedErrorRate] = useState(errorRateFilters[0])
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0])
  const [selectedUnit, setSelectedUnit] = useState(unitOptions[0])
  const [hidePronounceIssue, setHidePronounceIssue] = useState(false)

  const selectedCount = words.filter((w) => w.selected).length

  const toggleWord = (id: string) => {
    setWords((prev) =>
      prev.map((w) => (w.wordId === id ? { ...w, selected: !w.selected } : w)),
    )
  }

  const selectAll = () => {
    setWords((prev) => prev.map((w) => ({ ...w, selected: true })))
  }

  const deselectAll = () => {
    setWords((prev) => prev.map((w) => ({ ...w, selected: false })))
  }

  const handleExport = () => {
    alert('导出功能将在真实接口接入后启用')
  }

  const filteredWords = hidePronounceIssue
    ? words.filter((w) => w.mistakeType !== '读不准')
    : words

  return (
    <div className="h-full flex flex-col min-h-0">
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-br from-[#ecf5fa] to-[#e8f5f0] rounded-2xl overflow-hidden border border-[#dce8f2]">
        {/* ── Top Bar: Tabs + Insight + Export ── */}
        <div className="shrink-0 flex items-center justify-between px-5 pt-4 pb-2 gap-3">
          {/* Tabs + Insight */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center bg-white/80 rounded-xl p-1 border border-[#e4ecf3] shrink-0">
              <button
                onClick={() => handleTabChange('class')}
                className={`px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
                  activeTab === 'class'
                    ? 'bg-[#4b9fe8] text-white shadow-sm'
                    : 'text-[#6b8aaa] hover:text-[#3a4f66]'
                }`}
              >
                班级错词本
              </button>
              <button
                onClick={() => handleTabChange('student')}
                className={`px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
                  activeTab === 'student'
                    ? 'bg-[#4b9fe8] text-white shadow-sm'
                    : 'text-[#6b8aaa] hover:text-[#3a4f66]'
                }`}
              >
                学生个性化词本
              </button>
            </div>
            {/* Specialized Insight Entry */}
            <SpecializedInsightEntry type={activeTab === 'student' ? 'vocabulary-student' : 'vocabulary'} />
          </div>

          {/* Export button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#4b9fe8] text-white text-[12px] font-medium rounded-lg hover:bg-[#3a8fd8] transition-colors shadow-sm shrink-0"
          >
            <Download size={13} />
            导出错词
          </button>
        </div>

        {activeTab === 'class' ? (
          <>
            {/* ── Body: Sidebar + Word Grid ── */}
            <div className="flex-1 flex min-h-0 px-5 pb-3 pt-2">
              {/* ── Left Filter Sidebar ── */}
              <div className="shrink-0 w-[230px] mr-3 bg-white rounded-2xl border border-[#e8eef4] p-3 overflow-y-auto space-y-3">
                <div>
                  <label className="text-[10px] font-medium text-[#8aabcc] mb-1 block">时间范围</label>
                  <DropdownButton label={selectedTimeRange} options={timeRanges} onSelect={setSelectedTimeRange} />
                </div>
                <div>
                  <label className="text-[10px] font-medium text-[#8aabcc] mb-1 block">班级</label>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-medium text-[#3a4f66]">初一1班</span>
                    <button className="text-[10px] text-[#4b9fe8] bg-[#eaf2fb] hover:bg-[#d6e6f7] px-2 py-0.5 rounded-md font-medium transition-colors">更改</button>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-medium text-[#8aabcc] mb-1 block">排序</label>
                  <DropdownButton label={selectedSort} options={sortOptions} onSelect={setSelectedSort} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#4a6b8a]">已筛选 <span className="font-semibold">{filteredWords.length}</span> 个</span>
                  <span className="text-[11px] text-[#8aabcc]">选中 {selectedCount} <ChevronRight size={10} className="inline rotate-90 text-[#b8cde0]" /></span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={selectAll} className="text-[10px] text-[#4b9fe8] hover:text-[#3a8fd8] font-medium transition-colors">全部选中</button>
                  <span className="text-[#d0dce8] text-[10px]">|</span>
                  <button onClick={deselectAll} className="text-[10px] text-[#8aabcc] hover:text-[#4a6b8a] font-medium transition-colors">取消全选</button>
                </div>
                <div className="space-y-1.5">
                  {(['生词', '读不准', '不会写', '不会用'] as const).map((type) => (
                    <label key={type} className="flex items-center gap-2 text-[11px] text-[#4a6b8a] cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-[#4b9fe8] w-3.5 h-3.5" />{type}
                    </label>
                  ))}
                </div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-[10px] text-[#4a6b8a]">隐藏"读不准"的词汇</span>
                  <button onClick={() => setHidePronounceIssue(!hidePronounceIssue)} className={`relative w-8 h-4.5 rounded-full transition-colors ${hidePronounceIssue ? 'bg-[#4b9fe8]' : 'bg-[#d0dce8]'}`}>
                    <span className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow transition-transform ${hidePronounceIssue ? 'left-[14px]' : 'left-[2px]'}`} />
                  </button>
                </label>
                <div><label className="text-[10px] font-medium text-[#8aabcc] mb-1 block">错误率</label><DropdownButton label={selectedErrorRate} options={errorRateFilters} onSelect={setSelectedErrorRate} /></div>
                <div><label className="text-[10px] font-medium text-[#8aabcc] mb-1 block">词汇分类</label><DropdownButton label={selectedCategory} options={categoryOptions} onSelect={setSelectedCategory} /></div>
                <div><label className="text-[10px] font-medium text-[#8aabcc] mb-1 block">单元</label><DropdownButton label={selectedUnit} options={unitOptions} onSelect={setSelectedUnit} /></div>
                <p className="text-[10px] text-[#8aabcc] leading-relaxed">已隐藏"代词、介词、冠词、数词、专有名词、人名..."<button className="text-[#4b9fe8] ml-0.5 hover:underline">修改</button></p>
              </div>
              <div className="flex-1 min-w-0 overflow-y-auto">
                <div className="grid grid-cols-4 gap-2.5">
                  {filteredWords.map((w) => (<WordCard key={w.wordId} w={w} onToggle={toggleWord} />))}
                </div>
              </div>
            </div>
            {/* ── Bottom Action Bar ── */}
            <div className="shrink-0 bg-white/90 backdrop-blur border-t border-[#e4ecf3] px-4 py-2.5 flex items-center justify-center gap-2 flex-wrap">
              <button className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f4f7fa] border border-[#e4ecf3] text-[#8aabcc] hover:text-[#4a6b8a] hover:bg-white transition-colors" title="返回"><RotateCcw size={14} /></button>
              <ActionButton icon={FileText} label="布置默写练习" primary />
              <ActionButton icon={Monitor} label="课堂PK" />
              <ActionButton icon={Gamepad2} label="课后PK" />
              <ActionButton icon={Mic} label="课堂领读" />
              <ActionButton icon={Mic} label="课后领读" />
              <ActionButton icon={PenLine} label="听写" />
              <ActionButton icon={FileText} label="默写" />
              <ActionButton icon={BookOpen} label="组卷" />
              <ActionButton icon={Users} label="讲词" />
            </div>
          </>
        ) : (
          <StudentWordBookView />
        )}
      </div>
    </div>
  )
}

// ── Dropdown Button ────────────────────────────────────

function DropdownButton({
  label,
  options,
  onSelect,
}: {
  label: string
  options: string[]
  onSelect: (v: string) => void
}) {
  return (
    <button
      onClick={() => {
        const currentIdx = options.indexOf(label)
        const next = options[(currentIdx + 1) % options.length]
        onSelect(next)
      }}
      className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg bg-[#f4f7fa] border border-[#e4ecf3] text-[11px] text-[#3a4f66] hover:border-[#b8d4f0] transition-colors"
    >
      <span className="truncate">{label}</span>
      <ChevronDown size={10} className="text-[#8aabcc] shrink-0 ml-1" />
    </button>
  )
}

// ── Student Word Book View ─────────────────────────────

function StudentWordBookView() {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir(sortDir === 'desc' ? 'asc' : 'desc')
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  const sorted = [...mockStudents].sort((a, b) => {
    if (!sortField) return 0
    const va = (a as any)[sortField] as number
    const vb = (b as any)[sortField] as number
    return sortDir === 'desc' ? vb - va : va - vb
  })

  const SortArrow = ({ field }: { field: string }) => (
    <span className="inline-flex flex-col leading-none ml-0.5">
      <span className={`text-[8px] ${sortField === field && sortDir === 'asc' ? 'text-[#4b9fe8]' : 'text-[#c0d4e8]'}`}>▲</span>
      <span className={`text-[8px] ${sortField === field && sortDir === 'desc' ? 'text-[#4b9fe8]' : 'text-[#c0d4e8]'}`}>▼</span>
    </span>
  )

  const columns = [
    { key: 'id', label: '序号', sortable: false, width: 'w-[50px]' },
    { key: 'studentName', label: '学生姓名', sortable: false, width: '' },
    { key: 'totalWrongWords', label: '累计错词', sortable: true, width: '' },
    { key: 'practicedWrongWords', label: '已练习错词', sortable: true, width: '' },
    { key: 'practicedPushedWords', label: '已练习推送词', sortable: true, width: '' },
    { key: 'completedCount', label: '已完成次数/布置次数', sortable: true, width: '' },
    { key: 'activePracticeCount', label: '主动练习次数', sortable: true, width: '' },
  ]

  return (
    <div className="flex-1 flex min-h-0 px-5 pb-3 pt-2">
      {/* ── Left Sidebar ── */}
      <div className="shrink-0 w-[240px] mr-3 space-y-3">
        {/* Class selector */}
        <div className="bg-white rounded-2xl border border-[#e8eef4] p-3">
          <label className="text-[10px] font-medium text-[#8aabcc] mb-1.5 block">班级</label>
          <button className="flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg bg-[#f4f7fa] border border-[#e4ecf3] text-[11px] text-[#3a4f66] hover:border-[#b8d4f0] transition-colors">
            初一1班 <ChevronDown size={10} className="text-[#8aabcc]" />
          </button>
        </div>

        {/* Personalized practice explanation */}
        <div className="bg-white rounded-2xl border border-[#e8eef4] p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
              <BookOpen size={13} className="text-[#4b9fe8]" />
            </div>
            <span className="text-[12px] font-semibold text-[#3a4f66]">个性化练习</span>
          </div>
          <div className="space-y-1.5 mb-3">
            <div className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4b9fe8] shrink-0 mt-1.5" />
              <span className="text-[10px] text-[#6b8aaa] leading-relaxed">全班学生一起练习</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4b9fe8] shrink-0 mt-1.5" />
              <span className="text-[10px] text-[#6b8aaa] leading-relaxed">每人练习数量一致</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4b9fe8] shrink-0 mt-1.5" />
              <span className="text-[10px] text-[#6b8aaa] leading-relaxed">每人作答内容不同，个性化定制</span>
            </div>
          </div>
          <button
            onClick={() => alert('个性化练习布置确认将在下一步接入')}
            className="w-full py-2 rounded-lg bg-[#4b9fe8] text-white text-[11px] font-medium hover:bg-[#3a8fd8] transition-colors shadow-sm"
          >
            布置个性练习
          </button>
        </div>

        {/* Tiered settings */}
        <div className="bg-white rounded-2xl border border-[#e8eef4] p-3">
          <p className="text-[10px] text-[#6b8aaa] leading-relaxed mb-2">给不同层次的学生推送不同的词汇</p>
          <button
            onClick={() => alert('分层设置将在真实分层规则接入后启用')}
            className="w-full py-1.5 rounded-lg border border-[#b8d4f0] text-[#4b9fe8] text-[11px] font-medium hover:bg-[#eaf2fb] transition-colors"
          >
            分层设置
          </button>
        </div>
      </div>

      {/* ── Right Table Area ── */}
      <div className="flex-1 min-w-0 flex flex-col min-h-0">
        {/* Hidden words hint */}
        <div className="shrink-0 flex items-center justify-end mb-2 text-[10px] text-[#6b8aaa]">
          <span>已隐藏"代词、介词、冠词、数词、专有名词(人名...)" </span>
          <button onClick={() => alert('隐藏词类设置将在真实接口接入后启用')} className="text-[#4b9fe8] hover:underline ml-1 font-medium">修改</button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto min-h-0 rounded-xl border border-[#e8eef4] bg-white">
          <table className="w-full text-[11px]">
            <thead className="sticky top-0 bg-[#f4f7fa]">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => col.sortable && handleSort(col.key)}
                    className={`text-left px-3 py-2.5 text-[10px] font-medium text-[#6b8aaa] ${col.sortable ? 'cursor-pointer hover:text-[#3a4f66] select-none' : ''} ${col.width}`}
                  >
                    {col.label}
                    {col.sortable && <SortArrow field={col.key} />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f8]">
              {sorted.map((s, i) => (
                <tr key={s.id} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafbfc]'}>
                  <td className="px-3 py-2 text-[#8aabcc]">{s.id}</td>
                  <td className="px-3 py-2 text-[#3a4f66] font-medium">{s.studentName}</td>
                  <td className="px-3 py-2 text-[#4b9fe8] font-semibold">{s.totalWrongWords.toLocaleString()}</td>
                  <td className="px-3 py-2 text-[#4b9fe8] font-semibold">{s.practicedWrongWords}</td>
                  <td className="px-3 py-2 text-[#4b9fe8] font-semibold">{s.practicedPushedWords}</td>
                  <td className="px-3 py-2 text-[#4b9fe8] font-semibold">{s.completedCount}/{s.assignedCount}</td>
                  <td className="px-3 py-2 text-[#4b9fe8] font-semibold">{s.activePracticeCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Return button */}
        <div className="shrink-0 mt-2">
          <button className="flex items-center gap-1 text-[11px] text-[#8aabcc] hover:text-[#4a6b8a] transition-colors">
            <RotateCcw size={11} />返回
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Bottom Action Button ───────────────────────────────

function ActionButton({
  icon: Icon,
  label,
  primary,
}: {
  icon: typeof FileText
  label: string
  primary?: boolean
}) {
  return (
    <button
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors whitespace-nowrap ${
        primary
          ? 'bg-[#4b9fe8] text-white hover:bg-[#3a8fd8] shadow-sm'
          : 'bg-[#f4f7fa] border border-[#e4ecf3] text-[#4a6b8a] hover:bg-white hover:border-[#b8d4f0]'
      }`}
    >
      <Icon size={13} />
      {label}
    </button>
  )
}

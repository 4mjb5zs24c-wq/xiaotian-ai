import { useState } from 'react'
import {
  ChevronDown, Search, Play, Pause, Plus, ShoppingBag,
  BookOpen, FileText, ChevronLeft,
} from 'lucide-react'
import SpecializedInsightEntry from '../ai/components/SpecializedInsightEntry'

// ── Types ──────────────────────────────────────────────

interface QuestionOption {
  key: string
  text: string
}

interface QuestionItem {
  questionId: string
  questionType: string
  audioDuration: number
  stem: string
  options: QuestionOption[]
  answer: string
  analysis: string
  errorRate: number
  scoreRate: number
  wrongCount: number
  correctedCount: number
  selected: boolean
  addedToBasket: boolean
}

interface WrongQuestionGroup {
  groupId: string
  type: string
  source: string
  knowledgePoint: string
  keyword: string
  errorRate: number
  scoreRate: number
  wrongCount: number
  correctedCount: number
  questions: QuestionItem[]
}

// ── Mock Data ──────────────────────────────────────────

const mockGroups: WrongQuestionGroup[] = [
  {
    groupId: 'g01',
    type: '词汇跟读',
    source: '高一(1)班级/12月25日综合练习',
    knowledgePoint: '体育',
    keyword: 'senior',
    errorRate: 60,
    scoreRate: 60,
    wrongCount: 5,
    correctedCount: 0,
    questions: [
      {
        questionId: 'q01',
        questionType: '听力长对话',
        audioDuration: 8,
        stem: 'What does the girl always do at the Children\'s Home?',
        options: [
          { key: 'A', text: 'Good idea.' },
          { key: 'B', text: 'No problem.' },
          { key: 'C', text: 'Yes, I do.' },
        ],
        answer: 'B',
        analysis: '根据对话内容，女孩经常在儿童之家帮忙，当被问及是否能帮忙时，她回答"No problem"表示没问题。',
        errorRate: 60,
        scoreRate: 60,
        wrongCount: 5,
        correctedCount: 0,
        selected: false,
        addedToBasket: false,
      },
      {
        questionId: 'q02',
        questionType: '听力长对话',
        audioDuration: 6,
        stem: 'How often does the boy visit the Children\'s Home?',
        options: [
          { key: 'A', text: 'Once a week.' },
          { key: 'B', text: 'Twice a week.' },
          { key: 'C', text: 'Every day.' },
        ],
        answer: 'A',
        analysis: '男孩说"I go there once a week"，表示每周去一次。',
        errorRate: 55,
        scoreRate: 60,
        wrongCount: 4,
        correctedCount: 1,
        selected: false,
        addedToBasket: false,
      },
    ],
  },
  {
    groupId: 'g02',
    type: '词汇听写',
    source: '高一(1)班级/12月18日单元测验',
    knowledgePoint: '校园生活',
    keyword: 'campus',
    errorRate: 45,
    scoreRate: 55,
    wrongCount: 3,
    correctedCount: 2,
    questions: [
      {
        questionId: 'q03',
        questionType: '词汇听写',
        audioDuration: 4,
        stem: 'Listen and write down the word you hear.',
        options: [
          { key: 'A', text: 'campus' },
          { key: 'B', text: 'compass' },
          { key: 'C', text: 'campaign' },
        ],
        answer: 'A',
        analysis: '听力朗读的是"campus /ˈkæmpəs/"，意为校园。',
        errorRate: 45,
        scoreRate: 55,
        wrongCount: 3,
        correctedCount: 2,
        selected: false,
        addedToBasket: false,
      },
    ],
  },
]

const classOptions = ['高一', '高三', '+3']
const timeOptions = ['一周内', '一个月内', '六个月内', '一年内', '自选时间范围']
const typeOptions = ['全部', '听说', '笔试']
const questionTypes = [
  '单词跟读', '词汇听写', '中英检测', '语境填词', '单句语法填空',
  '一词多义（单选）', '一词多义（多选）', '词组填空', '句子表达',
]

// ── Audio Player ───────────────────────────────────────

function AudioBar({ duration }: { duration: number }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-[#eaf2fb] rounded-xl">
      <button
        onClick={() => setPlaying(!playing)}
        className="flex items-center justify-center w-7 h-7 rounded-full bg-[#4b9fe8] text-white hover:bg-[#3a8fd8] transition-colors"
      >
        {playing ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
      </button>
      <span className="text-[11px] text-[#4a6b8a] font-medium w-10">00:00</span>
      <div className="flex-1 h-1.5 bg-[#d0dce8] rounded-full overflow-hidden">
        <div className="h-full bg-[#4b9fe8] rounded-full transition-all" style={{ width: playing ? '45%' : '0%' }} />
      </div>
      <span className="text-[11px] text-[#8aabcc]">-00:0{duration}</span>
    </div>
  )
}

// ── Question Card ──────────────────────────────────────

function QuestionCard({ q }: { q: QuestionItem }) {
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [added, setAdded] = useState(q.addedToBasket)
  return (
    <div className="bg-white rounded-xl border border-[#e8eef4] p-4 mb-2">
      {/* Type header */}
      <div className="flex items-center gap-2 mb-3 text-[11px] text-[#6b8aaa]">
        <FileText size={12} className="text-[#8aabcc]" />
        <span>{q.questionType}</span>
        <span className="text-[#d0dce8]">|</span>
        <span>错误率 <span className="text-amber-500 font-medium">{q.errorRate}%</span></span>
        <span className="text-[#d0dce8]">|</span>
        <span>得分率 <span className="text-[#4b9fe8] font-medium">{q.scoreRate}%</span></span>
        <span className="text-[#d0dce8]">|</span>
        <span>{q.wrongCount}人错误</span>
        <span className="text-[#d0dce8]">|</span>
        <span>{q.correctedCount}人订正</span>
      </div>

      {/* Audio bar */}
      <AudioBar duration={q.audioDuration} />

      {/* Stem */}
      <p className="mt-3 text-[13px] text-[#3a4f66] font-medium leading-relaxed">{q.stem}</p>

      {/* Options */}
      <div className="mt-2 space-y-1.5">
        {q.options.map((opt) => (
          <div key={opt.key} className="flex items-center gap-2 text-[12px] text-[#4a6b8a]">
            <span className="w-5 h-5 rounded-full border border-[#d0dce8] flex items-center justify-center text-[10px] text-[#8aabcc] shrink-0">
              {opt.key}
            </span>
            <span>{opt.text}</span>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f0f4f8]">
        <div className="flex items-center gap-3 text-[11px]">
          <span>错误率 <span className="text-amber-500 font-medium">{q.errorRate}%</span></span>
          <span className="text-[#d0dce8]">|</span>
          <span>得分率 <span className="text-[#4b9fe8] font-medium">{q.scoreRate}%</span></span>
          <span className="text-[#d0dce8]">|</span>
          <span className="text-[#8aabcc]">{q.wrongCount}人错误</span>
          <span className="text-[#d0dce8]">|</span>
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="text-[#4b9fe8] hover:underline font-medium"
          >
            答案解析
          </button>
          <span className="text-[#d0dce8]">|</span>
          <button
            onClick={() => alert('查看学生作答功能将在后续版本中接入')}
            className="text-[#4b9fe8] hover:underline font-medium"
          >
            查看学生作答
          </button>
        </div>
        <button
          onClick={() => {
            setAdded(!added)
            alert(added ? '已从试卷篮移除' : '已添加到试卷篮')
          }}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
            added
              ? 'bg-[#eaf2fb] text-[#4b9fe8] border border-[#4b9fe8]'
              : 'border border-[#b8d4f0] text-[#4b9fe8] hover:bg-[#eaf2fb]'
          }`}
        >
          <Plus size={11} />
          {added ? '已添加' : '添加'}
        </button>
      </div>

      {/* Analysis expand */}
      {showAnalysis && (
        <div className="mt-3 p-3 bg-[#f7f9fc] rounded-lg border border-[#eef2f6]">
          <p className="text-[11px] text-[#4a6b8a] leading-relaxed">{q.analysis}</p>
        </div>
      )}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────

export default function WrongQuestionPage() {
  const [activeTab, setActiveTab] = useState<'class' | 'student'>('class')
  const [selectedTime, setSelectedTime] = useState('一个月内')
  const [selectedType, setSelectedType] = useState('全部')
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>(['单词跟读'])
  const [basketCount, setBasketCount] = useState(4)
  const [filterExpanded, setFilterExpanded] = useState(true)

  const toggleQuestionType = (t: string) => {
    setSelectedQuestionTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    )
  }

  return (
    <div className="h-full flex flex-col min-h-0">
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-br from-[#ecf5fa] to-[#e8f5f0] rounded-2xl overflow-hidden border border-[#dce8f2]">
        {/* ── Tabs + Compact AI Insight ── */}
        <div className="shrink-0 flex items-center bg-white/80 rounded-t-2xl border-b border-[#e4ecf3]">
          <button
            onClick={() => setActiveTab('class')}
            className={`px-6 py-2.5 text-[13px] font-semibold transition-all rounded-t-xl ${
              activeTab === 'class'
                ? 'bg-[#4b9fe8] text-white'
                : 'text-[#6b8aaa] hover:text-[#3a4f66]'
            }`}
          >
            班级错题
          </button>
          <button
            onClick={() => setActiveTab('student')}
            className={`px-6 py-2.5 text-[13px] font-semibold transition-all rounded-t-xl ${
              activeTab === 'student'
                ? 'bg-[#4b9fe8] text-white'
                : 'text-[#6b8aaa] hover:text-[#3a4f66]'
            }`}
          >
            学生错题
          </button>

          {/* Specialized Insight Entry */}
          <div className="flex-1 min-w-0 mx-3">
            <SpecializedInsightEntry type="vocabulary" />
          </div>

          {/* Right actions in tab bar */}
          <div className="ml-auto flex items-center gap-2 pr-4">
            <button
              onClick={() => alert('智能组卷功能将在后续版本中接入')}
              className="px-3 py-1.5 bg-[#4b9fe8] text-white text-[11px] font-medium rounded-lg hover:bg-[#3a8fd8] transition-colors"
            >
              智能组卷
            </button>
            <button
              onClick={() => alert('我要备课功能将在后续版本中接入')}
              className="px-3 py-1.5 bg-white border border-[#b8d4f0] text-[#4b9fe8] text-[11px] font-medium rounded-lg hover:bg-[#eaf2fb] transition-colors"
            >
              我要备课
            </button>
          </div>
        </div>

        {/* ── Filter Area ── */}
        <div className="shrink-0 bg-white/90 mx-3 mt-3 rounded-xl border border-[#e4ecf3] p-3 space-y-2.5">
          {/* Row 1: Class, Time, Type */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Class */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[#8aabcc]">班级</span>
              <div className="flex items-center gap-1">
                {classOptions.map((c) => (
                  <button
                    key={c}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                      c === '高一'
                        ? 'bg-[#eaf2fb] text-[#4b9fe8] border border-[#b8d4f0]'
                        : 'bg-[#f4f7fa] text-[#6b8aaa] border border-[#e4ecf3] hover:border-[#b8d4f0]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
                <ChevronDown size={10} className="text-[#8aabcc]" />
              </div>
            </div>

            <span className="text-[#d0dce8]">|</span>

            {/* Time */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[#8aabcc]">时间</span>
              <div className="flex items-center gap-1">
                {timeOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                      selectedTime === t
                        ? 'bg-[#eaf2fb] text-[#4b9fe8] border border-[#b8d4f0]'
                        : 'bg-[#f4f7fa] text-[#6b8aaa] border border-[#e4ecf3] hover:border-[#b8d4f0]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-[#d0dce8]">|</span>

            {/* Type */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[#8aabcc]">类型</span>
              <div className="flex items-center gap-1">
                {typeOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                      selectedType === t
                        ? 'bg-[#eaf2fb] text-[#4b9fe8] border border-[#b8d4f0]'
                        : 'bg-[#f4f7fa] text-[#6b8aaa] border border-[#e4ecf3] hover:border-[#b8d4f0]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Question type chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-[#8aabcc] shrink-0 mr-1">题型</span>
            {questionTypes.map((qt) => (
              <button
                key={qt}
                onClick={() => toggleQuestionType(qt)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                  selectedQuestionTypes.includes(qt)
                    ? 'bg-[#eaf2fb] text-[#4b9fe8] border border-[#b8d4f0]'
                    : 'bg-[#f4f7fa] text-[#6b8aaa] border border-[#e4ecf3] hover:border-[#b8d4f0]'
                }`}
              >
                {qt}
              </button>
            ))}
          </div>

          {/* Row 3: Error rate, Score rate, Knowledge, Search, Count, Add all, Collapse */}
          <div className="flex items-center gap-2 flex-wrap">
            <FilterDropdown label="错误率" value="全部" />
            <FilterDropdown label="得分率" value="全部" />
            <FilterDropdown label="知识点" value="全部" />
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#f4f7fa] border border-[#e4ecf3]">
              <Search size={11} className="text-[#b0c8de]" />
              <input
                type="text"
                placeholder="请输入练习名称"
                className="w-[140px] bg-transparent text-[11px] text-[#3a4f66] placeholder-[#c0d4e8] outline-none"
              />
            </div>
            <span className="text-[11px] text-[#8aabcc] ml-2">共 5617 题目</span>
            <button
              onClick={() => {
                setBasketCount((c) => c + 1)
                alert('本页题目已全部添加到试卷篮')
              }}
              className="px-3 py-1.5 bg-[#4b9fe8] text-white text-[11px] font-medium rounded-lg hover:bg-[#3a8fd8] transition-colors ml-auto"
            >
              本页全部添加
            </button>
            <button
              onClick={() => setFilterExpanded(!filterExpanded)}
              className="text-[11px] text-[#4b9fe8] hover:underline font-medium"
            >
              {filterExpanded ? '收起' : '展开'}
            </button>
          </div>
        </div>

        {/* ── Question List ── */}
        <div className="flex-1 overflow-y-auto min-h-0 px-3 pt-3 pb-3">
          {mockGroups.map((group) => (
            <div key={group.groupId} className="mb-4">
              {/* Group header */}
              <div className="bg-white rounded-xl border border-[#e8eef4] p-4 mb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-semibold text-[#3a4f66]">
                      {group.type}
                    </span>
                    <span className="text-[#d0dce8]">|</span>
                    <span className="text-[11px] text-[#6b8aaa]">来源：{group.source}</span>
                    <span className="text-[#d0dce8]">|</span>
                    <span className="text-[11px] text-[#6b8aaa]">知识点：{group.knowledgePoint}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="text-[16px] font-bold text-[#2a4a6a]">{group.keyword}</span>
                  <span className="text-[#d0dce8] mx-1">|</span>
                  <span className="text-[11px] text-[#8aabcc]">
                    错误率 <span className="text-amber-500 font-medium">{group.errorRate}%</span>
                  </span>
                  <span className="text-[#d0dce8]">|</span>
                  <span className="text-[11px] text-[#8aabcc]">
                    得分率 <span className="text-[#4b9fe8] font-medium">{group.scoreRate}%</span>
                  </span>
                  <span className="text-[#d0dce8]">|</span>
                  <span className="text-[11px] text-[#8aabcc]">{group.wrongCount}人错误</span>
                  <span className="text-[#d0dce8]">|</span>
                  <span className="text-[11px] text-[#8aabcc]">{group.correctedCount}人订正</span>
                </div>
              </div>

              {/* Question cards */}
              {group.questions.map((q) => (
                <QuestionCard key={q.questionId} q={q} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Floating Buttons ── */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-20">
        {/* Test basket */}
        <button
          onClick={() => alert(`试卷篮中有 ${basketCount} 道题目`)}
          className="relative flex flex-col items-center gap-0.5 px-2 py-3 bg-white border border-[#e4ecf3] rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <ShoppingBag size={16} className="text-[#4b9fe8]" />
          <span className="text-[10px] text-[#6b8aaa]">试卷篮</span>
          {basketCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
              {basketCount}
            </span>
          )}
        </button>

        {/* My prep */}
        <button className="flex flex-col items-center gap-0.5 px-2 py-3 bg-[#4b9fe8] text-white text-[10px] rounded-lg hover:bg-[#3a8fd8] transition-colors shadow-md">
          <BookOpen size={14} />
          <span style={{ writingMode: 'vertical-rl' }}>我的备课</span>
        </button>

        {/* Collapse */}
        <button className="p-1 bg-white border border-[#e4ecf3] rounded-full text-[#8aabcc] hover:text-[#4a6b8a] shadow-sm transition-colors">
          <ChevronLeft size={12} />
        </button>
      </div>
    </div>
  )
}

// ── Filter Dropdown ────────────────────────────────────

function FilterDropdown({ label, value }: { label: string; value: string }) {
  return (
    <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#f4f7fa] border border-[#e4ecf3] text-[11px] text-[#4a6b8a] hover:border-[#b8d4f0] transition-colors">
      {label}
      <span className="text-[#3a4f66] font-medium">{value}</span>
      <ChevronDown size={10} className="text-[#8aabcc]" />
    </button>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, BookOpen, Edit3, Clipboard, AlertCircle, HelpCircle } from 'lucide-react'
import AssignPracticeTabs from '../components/AssignPracticeTabs'

const subTabs = ['词汇听写', '词句听写', '应用文', '篇章默写']
const practiceForms = ['英文听写', '中文听写', '中英全项听写', '中英混合听写']

const LEFT_COUNT = 25
const RIGHT_START = 26
const RIGHT_COUNT = 25

export default function AssignCustomReviewPage() {
  const navigate = useNavigate()
  const [activeSubTab, setActiveSubTab] = useState('词汇听写')
  const [practiceName, setPracticeName] = useState('2026-05-28 听写')
  const [practiceForm, setPracticeForm] = useState('英文听写')
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const handleAnswerChange = (num: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [String(num)]: value }))
  }

  const handleSetScore = () => alert('已打开分值设置（可设置每题 1 分 / 2 分 / 自定义分值）')
  const handlePasteAll = () => {
    const pasted = 'assist\ndirectly\noutline\ntitle\nabsorb\naccident\nachievement\nagenda\nantique\naside'
    const lines = pasted.split('\n')
    const newAnswers: Record<string, string> = {}
    lines.forEach((line, i) => {
      if (i < LEFT_COUNT) newAnswers[String(i + 1)] = line
    })
    setAnswers((prev) => ({ ...prev, ...newAnswers }))
    alert(`已粘贴 ${lines.length} 个词汇答案`)
  }

  const handleConfirmAssign = () => {
    if (!practiceName.trim()) {
      alert('请输入练习名称')
      return
    }
    const filledCount = Object.values(answers).filter((v) => v.trim()).length
    if (filledCount === 0) {
      alert('请至少填写一个词汇答案')
      return
    }
    alert(`确认布置「${practiceName}」——布置确认面板将在下一步接入（已填写 ${filledCount} 个答案）`)
  }

  const handleSubTabClick = (tab: string) => {
    setActiveSubTab(tab)
    if (tab !== '词汇听写') {
      alert(`「${tab}」功能将在后续版本中接入，当前仅展示词汇听写`)
    }
  }

  const handleFormHelp = (form: string) => {
    if (form === '中英全项听写') {
      alert('中英全项听写：学生需根据中文和英文要求完成完整听写。')
    } else if (form === '中英混合听写') {
      alert('中英混合听写：系统将中英文听写题混合布置。')
    }
  }

  const leftRows = Array.from({ length: LEFT_COUNT }, (_, i) => i + 1)
  const rightRows = Array.from({ length: RIGHT_COUNT }, (_, i) => RIGHT_START + i)

  return (
    <div className="fixed inset-0 z-[400] bg-gradient-to-br from-[#e8f4f8] to-[#e8f0f5] flex flex-col overflow-hidden">
      {/* Top Tabs */}
      <AssignPracticeTabs />

      {/* Sub Tabs */}
      <div className="shrink-0 bg-white/90 px-8 pt-2.5 pb-2 border-b border-[#f0f4f8]">
        <div className="flex items-center gap-1.5">
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleSubTabClick(tab)}
              className={`px-5 py-1.5 rounded-lg text-[12px] font-semibold transition-all whitespace-nowrap ${
                activeSubTab === tab
                  ? 'bg-[#4b9fe8] text-white shadow-sm'
                  : 'text-[#6b8aaa] hover:text-[#3a4f66] hover:bg-[#f4f7fa]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0 px-8 pt-3 pb-3">
        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm overflow-hidden">
            {/* Header: Title + Confirm Button */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f0f4f8]">
              <div className="flex items-center gap-2.5">
                <span className="w-1 h-5 rounded-full bg-[#4b9fe8]" />
                <h2 className="text-[14px] font-bold text-[#3a4f66]">新建词汇</h2>
              </div>
              <button
                onClick={handleConfirmAssign}
                className="inline-flex items-center gap-1.5 px-5 h-9 rounded-full bg-[#4b9fe8] text-white text-[13px] font-medium hover:bg-[#3a8fd8] transition-colors whitespace-nowrap flex-shrink-0 shadow-sm"
              >
                确认布置
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Practice Name */}
              <div>
                <label className="text-[12px] font-semibold text-[#3a4f66] mb-1.5 block">练习名称</label>
                <input
                  type="text"
                  value={practiceName}
                  onChange={(e) => setPracticeName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d0dce8] text-[13px] text-[#3a4f66] bg-[#fafcfd] outline-none focus:border-[#4b9fe8] focus:ring-1 focus:ring-[#eaf2fb] transition-colors"
                />
              </div>

              {/* Practice Form */}
              <div>
                <label className="text-[12px] font-semibold text-[#3a4f66] mb-2 block">练习形式</label>
                <div className="flex items-center gap-6 flex-wrap">
                  {practiceForms.map((form) => (
                    <label key={form} className="flex items-center gap-2 cursor-pointer select-none">
                      <div className="relative">
                        <input
                          type="radio"
                          name="practiceForm"
                          checked={practiceForm === form}
                          onChange={() => setPracticeForm(form)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                            practiceForm === form ? 'border-[#4b9fe8]' : 'border-[#d0dce8]'
                          }`}
                        >
                          {practiceForm === form && <div className="w-2 h-2 rounded-full bg-[#4b9fe8]" />}
                        </div>
                      </div>
                      <span
                        className={`text-[12px] font-medium transition-colors ${
                          practiceForm === form ? 'text-[#3a4f66]' : 'text-[#6b8aaa]'
                        }`}
                      >
                        {form}
                      </span>
                      {(form === '中英全项听写' || form === '中英混合听写') && (
                        <button
                          onClick={(e) => { e.preventDefault(); handleFormHelp(form) }}
                          className="text-[#b8cde0] hover:text-[#8aabcc] transition-colors"
                        >
                          <HelpCircle size={12} />
                        </button>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Vocabulary Answer Area */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-4 rounded-full bg-[#8aabcc]" />
                    <h3 className="text-[12px] font-bold text-[#3a4f66]">词汇答案区域</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSetScore}
                      className="inline-flex items-center gap-1 px-3.5 h-8 rounded-full border border-[#b8d4f0] text-[12px] text-[#4b9fe8] hover:bg-[#eaf2fb] transition-colors whitespace-nowrap flex-shrink-0"
                    >
                      <Edit3 size={11} />设置分值
                    </button>
                    <button
                      onClick={handlePasteAll}
                      className="inline-flex items-center gap-1 px-4 h-8 rounded-full bg-[#4b9fe8] text-white text-[12px] font-medium hover:bg-[#3a8fd8] transition-colors whitespace-nowrap flex-shrink-0 shadow-sm"
                    >
                      <Clipboard size={11} />一键粘贴全部答案
                    </button>
                  </div>
                </div>

                {/* Yellow Hint */}
                <div className="flex items-start gap-2 bg-amber-50/70 border border-amber-200 rounded-xl px-3.5 py-2.5 mb-3">
                  <AlertCircle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-amber-700 leading-relaxed space-y-0.5">
                    <p>1. 每小题最多支持60个字符</p>
                    <p>2. 以下内容将作为正确答案，请确保准确</p>
                    <p>
                      3. 每小题有多个答案时，例如{' '}
                      <span className="text-red-500 font-medium">in the short term / long term</span>
                      {' '}不支持批改，需写成{' '}
                      <span className="text-red-500 font-medium">in the short term / in the long term</span>
                      ；如果存在非必要答案可用<span className="text-red-500 font-medium">"（）"</span>，批改的时候会自动过滤
                    </p>
                  </div>
                </div>

                {/* Answer Input Table — Two Columns */}
                <div className="border border-[#e8eef4] rounded-xl overflow-hidden">
                  <div className="grid grid-cols-2">
                    {/* Left Column */}
                    <div className="border-r border-dashed border-[#e8eef4]">
                      {leftRows.map((num) => (
                        <div
                          key={num}
                          className="flex items-center border-b border-dashed border-[#f0f4f8] last:border-b-0"
                        >
                          <span className="w-10 shrink-0 text-center text-[12px] font-semibold text-[#4b9fe8] py-2.5">
                            {String(num).padStart(2, '0')}
                          </span>
                          <div className="flex-1 pr-3">
                            <input
                              type="text"
                              value={answers[String(num)] || ''}
                              onChange={(e) => handleAnswerChange(num, e.target.value)}
                              placeholder={num === 1 ? '点击输入英文词汇' : ''}
                              className="w-full py-2.5 px-2 bg-transparent text-[12px] text-[#3a4f66] placeholder-[#c0d4e8] outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Right Column */}
                    <div>
                      {rightRows.map((num) => (
                        <div
                          key={num}
                          className="flex items-center border-b border-dashed border-[#f0f4f8] last:border-b-0"
                        >
                          <span className="w-10 shrink-0 text-center text-[12px] font-semibold text-[#4b9fe8] py-2.5">
                            {String(num).padStart(2, '0')}
                          </span>
                          <div className="flex-1 pr-3">
                            <input
                              type="text"
                              value={answers[String(num)] || ''}
                              onChange={(e) => handleAnswerChange(num, e.target.value)}
                              placeholder=""
                              className="w-full py-2.5 px-2 bg-transparent text-[12px] text-[#3a4f66] placeholder-[#c0d4e8] outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Close / Return */}
      <button onClick={() => navigate('/')} className="fixed left-4 bottom-6 inline-flex items-center gap-1.5 px-5 h-12 rounded-full bg-[#3194ff] text-white text-[13px] font-medium hover:bg-[#2a84e8] transition-colors whitespace-nowrap shadow-lg z-30"><ChevronRight size={14} className="rotate-180" />返回</button>

      {/* Right Floating: My Prep + Collapse */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
        <button
          onClick={() => navigate('/resources')}
          className="flex flex-col items-center gap-0.5 px-2 py-3 bg-[#4b9fe8] text-white text-[10px] rounded-lg hover:bg-[#3a8fd8] transition-colors shadow-md"
        >
          <BookOpen size={14} />
          <span style={{ writingMode: 'vertical-rl' }}>我的备课</span>
        </button>
        <button className="p-1 bg-white border border-[#e4ecf3] rounded-full text-[#8aabcc] hover:text-[#4a6b8a] shadow-sm transition-colors">
          <ChevronRight size={12} className="rotate-180" />
        </button>
      </div>
    </div>
  )
}

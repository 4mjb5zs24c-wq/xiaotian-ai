import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronRight, ChevronDown, Search, ShoppingBag, BookOpen,
  FileText, Mic, PenLine, Monitor, Users, Filter,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────

interface WordItem {
  id: string
  section: string
  word: string
  meaning: string
  partOfSpeech: string
  selected: boolean
  isCurriculumWord: boolean
  isHighFrequencyWrong: boolean
}

// ── Mock Word Data ─────────────────────────────────────

const mockWords: WordItem[] = [
  // Listening & Speaking
  { id: 'w01', section: 'Listening & Speaking', word: 'lantern', meaning: '灯笼；提灯', partOfSpeech: 'n.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: false },
  { id: 'w02', section: 'Listening & Speaking', word: 'carnival', meaning: '狂欢节；嘉年华', partOfSpeech: 'n.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: false },
  { id: 'w03', section: 'Listening & Speaking', word: 'costume', meaning: '（某地或某历史时期的）服装；戏装', partOfSpeech: 'n.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: false },
  { id: 'w04', section: 'Listening & Speaking', word: 'dress up / dress sb. up', meaning: '穿上盛装；装扮', partOfSpeech: 'phr.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: false },
  { id: 'w05', section: 'Listening & Speaking', word: 'march', meaning: '行进；前进；示威游行', partOfSpeech: 'vi. & n.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: false },
  { id: 'w06', section: 'Listening & Speaking', word: 'congratulation', meaning: '祝贺；恭喜', partOfSpeech: 'n.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: true },
  { id: 'w07', section: 'Listening & Speaking', word: 'congratulate', meaning: '向（某人）道贺；（因某事）为自己感到自豪', partOfSpeech: 'vt.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: false },
  { id: 'w08', section: 'Listening & Speaking', word: 'riddle', meaning: '谜语；神秘事件', partOfSpeech: 'n.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: false },
  { id: 'w09', section: 'Listening & Speaking', word: 'ceremony', meaning: '典礼；仪式', partOfSpeech: 'n.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: false },
  { id: 'w10', section: 'Listening & Speaking', word: 'samba', meaning: '桑巴舞；桑巴舞曲', partOfSpeech: 'n.', selected: false, isCurriculumWord: false, isHighFrequencyWrong: false },
  { id: 'w11', section: 'Listening & Speaking', word: 'make-up', meaning: '化妆品；性格；构成方式', partOfSpeech: 'n.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: false },
  { id: 'w12', section: 'Listening & Speaking', word: 'after all', meaning: '毕竟；别忘了', partOfSpeech: 'phr.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: true },
  // Reading & Thinking
  { id: 'w13', section: 'Reading & Thinking', word: 'range', meaning: '一系列；范围；界限；包括；（在一定范围内）变化', partOfSpeech: 'n. & vi.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: false },
  { id: 'w14', section: 'Reading & Thinking', word: 'range from ... to ...', meaning: '包括从……到……之间', partOfSpeech: 'phr.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: false },
  { id: 'w15', section: 'Reading & Thinking', word: 'origin', meaning: '起源；起因；出身', partOfSpeech: 'n.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: true },
  { id: 'w16', section: 'Reading & Thinking', word: 'religion', meaning: '宗教；宗教信仰', partOfSpeech: 'n.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: false },
  { id: 'w17', section: 'Reading & Thinking', word: 'religious', meaning: '宗教的；笃信宗教的', partOfSpeech: 'adj.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: false },
  { id: 'w18', section: 'Reading & Thinking', word: 'figure', meaning: '人物；数字；身材', partOfSpeech: 'n.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: false },
  { id: 'w19', section: 'Reading & Thinking', word: 'charm', meaning: '魅力；迷人的特征；咒语', partOfSpeech: 'n.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: true },
  { id: 'w20', section: 'Reading & Thinking', word: 'joy', meaning: '高兴；喜悦', partOfSpeech: 'n.', selected: false, isCurriculumWord: true, isHighFrequencyWrong: false },
]

// ── Left Nav ───────────────────────────────────────────

const navSections = {
  vocab: ['单元词汇', '固定搭配', '语块', '好句', '语篇'],
  activities: [
    { label: '课堂活动', indent: false },
    { label: '主题视频', indent: true },
    { label: '听说课堂', indent: true },
    { label: '写作教学', indent: true },
    { label: '时文阅读', indent: true },
    { label: '趣味配音', indent: true },
  ] as { label: string; indent: boolean }[],
}

// ── Main Component ─────────────────────────────────────

export default function SyncTeachingPage() {
  const navigate = useNavigate()
  const [words, setWords] = useState(mockWords)
  const [activeVocabSub, setActiveVocabSub] = useState('单元词汇')
  const [activeSection, setActiveSection] = useState<'同步词汇' | '拓展词汇'>('同步词汇')
  const [showCurriculumOnly, setShowCurriculumOnly] = useState(false)

  const selectedCount = words.filter((w) => w.selected).length
  const totalCount = words.length
  const curriculumCount = words.filter((w) => w.isCurriculumWord).length
  const curriculumSelected = words.filter((w) => w.isCurriculumWord && w.selected).length

  const toggleWord = (id: string) => {
    setWords((prev) => prev.map((w) => (w.id === id ? { ...w, selected: !w.selected } : w)))
  }

  const selectAll = () => setWords((prev) => prev.map((w) => ({ ...w, selected: true })))
  const deselectAll = () => setWords((prev) => prev.map((w) => ({ ...w, selected: false })))
  const selectCurriculum = () => setWords((prev) => prev.map((w) => ({ ...w, selected: w.isCurriculumWord })))

  const displayWords = showCurriculumOnly ? words.filter((w) => w.isCurriculumWord) : words
  const sections = [...new Set(displayWords.map((w) => w.section))]

  const handleToast = (msg: string) => alert(msg)

  return (
    <div className="h-full flex min-h-0">
      {/* ── Left Sidebar ── */}
      <div className="shrink-0 w-[230px] mr-3 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto bg-white rounded-2xl border border-[#e8eef4] p-3 space-y-3">
          {/* Header */}
          <div>
            <h2 className="text-[13px] font-bold text-[#3a4f66]">同步教学</h2>
            <button
              onClick={() => navigate('/exam-review')}
              className="flex items-center justify-between w-full mt-2 px-3 py-1.5 bg-[#4b9fe8] text-white text-[11px] font-medium rounded-lg hover:bg-[#3a8fd8] transition-colors"
            >
              去中考复习 <ChevronRight size={12} />
            </button>
          </div>

          {/* Section tabs */}
          <div className="flex bg-[#f4f7fa] rounded-lg p-0.5">
            {(['同步词汇', '拓展词汇'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`flex-1 py-1.5 text-[11px] font-medium rounded-md transition-all ${
                  activeSection === s ? 'bg-white text-[#3a4f66] shadow-sm' : 'text-[#8aabcc]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Vocab sub-nav */}
          <div className="space-y-0.5">
            {navSections.vocab.map((item) => (
              <button
                key={item}
                onClick={() => setActiveVocabSub(item)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                  activeVocabSub === item
                    ? 'bg-[#eaf2fb] text-[#4b9fe8]'
                    : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-[#f0f4f8]" />

          {/* Activities */}
          <div className="space-y-0.5">
            {navSections.activities.map((item) =>
              item.indent ? (
                <button
                  key={item.label}
                  className="w-full text-left pl-6 pr-3 py-1.5 rounded-lg text-[10px] text-[#8aabcc] hover:bg-[#f4f7fa] hover:text-[#4a6b8a] transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <div key={item.label} className="flex items-center gap-2 px-3 py-1.5">
                  <Monitor size={13} className="text-[#8aabcc]" />
                  <span className="text-[11px] font-medium text-[#6b8aaa]">{item.label}</span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Bottom entry cards */}
        <div className="shrink-0 mt-2 bg-white rounded-2xl border border-[#e8eef4] p-3 space-y-2">
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-[#4a6b8a] hover:bg-[#f4f7fa] transition-colors">
            <Users size={13} className="text-[#8aabcc]" />班级错词本
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-[#4a6b8a] hover:bg-[#f4f7fa] transition-colors">
            <FileText size={13} className="text-[#8aabcc]" />学生个性化词本
          </button>
        </div>
      </div>

      {/* ── Right Content ── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-white rounded-2xl border border-[#e8eef4] overflow-hidden">
        {/* Word content area — scrollable */}
        <div className="flex-1 overflow-y-auto min-h-0 px-5 py-4">
          {sections.map((section) => {
            const sectionWords = displayWords.filter((w) => w.section === section)
            const sectionSelected = sectionWords.filter((w) => w.selected).length
            return (
              <div key={section} className="mb-5">
                {/* Section header */}
                <div className="flex items-center gap-2 mb-3">
                  <input type="checkbox" className="accent-[#4b9fe8] w-4 h-4 rounded" />
                  <h3 className="text-[14px] font-bold text-[#3a4f66]">{section}</h3>
                  <span className="text-[10px] text-[#8aabcc]">{sectionSelected}/{sectionWords.length}</span>
                </div>

                {/* Word cards grid */}
                <div className="grid grid-cols-4 gap-2.5">
                  {sectionWords.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => toggleWord(w.id)}
                      className={`text-left p-3.5 rounded-xl border transition-all ${
                        w.selected
                          ? 'border-[#4b9fe8] bg-[#eaf2fb] shadow-sm'
                          : 'border-[#eef2f6] bg-white hover:border-[#b8d4f0] hover:shadow-sm'
                      }`}
                    >
                      <p className="text-[13px] font-bold text-[#3a4f66] leading-snug">{w.word}</p>
                      <p className="text-[10px] text-[#8aabcc] mt-0.5">{w.partOfSpeech}</p>
                      <p className="text-[10px] text-[#6b8aaa] mt-1 leading-snug">{w.meaning}</p>
                      {w.isCurriculumWord && (
                        <span className="inline-block mt-1.5 text-[8px] text-[#4b9fe8] bg-[#eaf2fb] px-1 py-0.5 rounded">课标词</span>
                      )}
                      {w.isHighFrequencyWrong && (
                        <span className="inline-block mt-1.5 ml-1 text-[8px] text-red-500 bg-red-50 px-1 py-0.5 rounded">高频错词</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Bottom Action Bar ── */}
        <div className="shrink-0 bg-[#f7f9fc] border-t border-[#e4ecf3] px-4 py-2.5 space-y-2">
          {/* Row 1: Selection controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={selectAll} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#e4ecf3] text-[11px] text-[#4a6b8a] hover:border-[#b8d4f0] transition-colors">
              全选（{selectedCount}/{totalCount}）
            </button>
            <button onClick={selectCurriculum} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#e4ecf3] text-[11px] text-[#4a6b8a] hover:border-[#b8d4f0] transition-colors">
              课标词（{curriculumSelected}/{curriculumCount}）
            </button>
            <button
              onClick={() => setShowCurriculumOnly(!showCurriculumOnly)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-[11px] transition-colors ${
                showCurriculumOnly ? 'bg-[#eaf2fb] border-[#b8d4f0] text-[#4b9fe8]' : 'bg-white border-[#e4ecf3] text-[#4a6b8a] hover:border-[#b8d4f0]'
              }`}
            >
              <Filter size={11} />筛选
            </button>
            <span className="text-[#d0dce8] text-[10px]">|</span>
            <button onClick={() => handleToast('快速选择功能将在后续版本中接入')} className="text-[11px] text-[#4b9fe8] hover:underline font-medium">快速选择</button>
            <button onClick={deselectAll} className="text-[11px] text-[#8aabcc] hover:text-[#4a6b8a] font-medium">重置</button>
            <span className="text-[#d0dce8] text-[10px]">|</span>
            <button onClick={() => handleToast('批量添加功能将在后续版本中接入')} className="text-[11px] text-[#4b9fe8] hover:underline font-medium">批量添加内容</button>
            <span className="text-[#d0dce8] text-[10px]">|</span>
            <button onClick={() => handleToast('高频错词筛选将在后续版本中接入')} className="text-[11px] text-[#4b9fe8] hover:underline font-medium">高频错词</button>
            <div className="flex items-center gap-1 ml-auto px-2.5 py-1.5 rounded-lg bg-white border border-[#e4ecf3]">
              <Search size={11} className="text-[#b0c8de]" />
              <input type="text" placeholder="搜索单词" className="w-[100px] bg-transparent text-[11px] text-[#3a4f66] placeholder-[#c0d4e8] outline-none" />
            </div>
          </div>

          {/* Row 2: Main actions */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#e4ecf3] text-[11px] text-[#3a4f66]">
              新人教版 <ChevronDown size={10} className="text-[#8aabcc]" />
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#e4ecf3] text-[11px] text-[#3a4f66]">
              必修3 <ChevronDown size={10} className="text-[#8aabcc]" />
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#e4ecf3] text-[11px] text-[#4a6b8a] truncate max-w-[200px]">
              Unit 1 Festivals and Celebrations <ChevronDown size={10} className="text-[#8aabcc] shrink-0" />
            </button>
            <span className="text-[#d0dce8] text-[10px] mx-1">|</span>
            <button onClick={() => handleToast('我的词表功能将在后续版本中接入')} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#e4ecf3] text-[11px] text-[#4a6b8a] hover:border-[#b8d4f0] transition-colors">
              <BookOpen size={11} />我的词表
            </button>
            <button
              onClick={() => handleToast('布置默写练习 — 确认面板将在下一步接入')}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#4b9fe8] text-white text-[11px] font-medium hover:bg-[#3a8fd8] transition-colors shadow-sm"
            >
              <FileText size={11} />布置默写练习
            </button>
            <button
              onClick={() => handleToast('布置跟读背诵 — 确认面板将在下一步接入')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#4b9fe8] text-white text-[11px] font-medium hover:bg-[#3a8fd8] transition-colors shadow-sm"
            >
              <Mic size={11} />布置跟读背诵
            </button>
            <button onClick={() => handleToast('背诵功能将在后续版本中接入')} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#e4ecf3] text-[11px] text-[#4a6b8a] hover:border-[#b8d4f0] transition-colors">背诵</button>
            <button onClick={() => handleToast('领读功能将在后续版本中接入')} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#e4ecf3] text-[11px] text-[#4a6b8a] hover:border-[#b8d4f0] transition-colors">领读</button>
            <button
              onClick={() => handleToast('听/默写 — 确认面板将在下一步接入')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#4b9fe8] text-white text-[11px] font-medium hover:bg-[#3a8fd8] transition-colors shadow-sm"
            >
              <PenLine size={11} />听/默写
            </button>
            <button onClick={() => handleToast('讲解功能将在后续版本中接入')} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#e4ecf3] text-[11px] text-[#4a6b8a] hover:border-[#b8d4f0] transition-colors">讲解</button>
          </div>
        </div>
      </div>

      {/* ── Right Floating Buttons ── */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-20">
        {/* Selected basket */}
        <button
          onClick={() => handleToast(`已选篮中有 ${selectedCount} 个词汇`)}
          className="relative flex flex-col items-center gap-0.5 px-2 py-3 bg-white border border-[#e4ecf3] rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <ShoppingBag size={16} className="text-[#4b9fe8]" />
          <span className="text-[10px] text-[#6b8aaa]">已选篮</span>
          {selectedCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
              {selectedCount}
            </span>
          )}
        </button>

        <button className="flex flex-col items-center gap-0.5 px-2 py-3 bg-[#4b9fe8] text-white text-[10px] rounded-lg hover:bg-[#3a8fd8] transition-colors shadow-md">
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

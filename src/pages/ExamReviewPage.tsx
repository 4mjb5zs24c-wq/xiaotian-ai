import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronRight, Search, ShoppingBag, BookOpen,
  FileText, Mic, PenLine, Users,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────

interface ExamWord {
  id: string
  word: string
  meaning: string
  partOfSpeech: string
  selected: boolean
  isHighFrequencyWrong: boolean
  category: string
  expanded?: boolean
}

// ── Mock Word Data ─────────────────────────────────────

const mockExamWords: ExamWord[] = [
  { id: 'e01', word: 'ad / advertisement', meaning: '广告', partOfSpeech: 'n.[C]', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e02', word: 'AI / artificial intelligence', meaning: '人工智能', partOfSpeech: '', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e03', word: 'China', meaning: '中国', partOfSpeech: 'n.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e04', word: 'Christmas', meaning: '圣诞节', partOfSpeech: 'n.[U] & [C]', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e05', word: 'English', meaning: '英格兰（人）的，英语的，英国人的', partOfSpeech: 'adj.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词', expanded: true },
  { id: 'e06', word: 'I', meaning: '我（主格）', partOfSpeech: 'pron.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e07', word: 'Internet', meaning: '互联网；因特网', partOfSpeech: 'n.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e08', word: 'Miss', meaning: '（对女老师的称呼）老师；（用于未婚女子姓名或姓名前，以示礼貌）', partOfSpeech: 'n.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e09', word: 'Mr.', meaning: '用在男子的姓、姓名或职务之前）先生', partOfSpeech: 'abbr.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e10', word: 'Mrs.', meaning: '（用在已婚妇女的姓或姓名之前）夫人，太太', partOfSpeech: 'abbr.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e11', word: 'Ms.', meaning: '（用于女子的姓或姓名前，不指明婚否）女士', partOfSpeech: 'abbr.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e12', word: 'OK', meaning: '可以的，不错的；令人满意地', partOfSpeech: 'adj. & adv.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e13', word: 'Olympic', meaning: '奥林匹克运动会的', partOfSpeech: 'adj.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e14', word: 'PE', meaning: '体育（课）', partOfSpeech: 'abbr.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e15', word: 'T-shirt', meaning: 'T恤衫，短袖汗衫', partOfSpeech: 'n.[C]', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e16', word: 'TV', meaning: '电视，电视机', partOfSpeech: 'n.[C]', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e17', word: 'X-ray', meaning: 'X射线，X光', partOfSpeech: 'n.[C]', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e18', word: 'a / an', meaning: '一（个）；任一', partOfSpeech: 'art.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e19', word: 'a.m.', meaning: '上午，午前', partOfSpeech: 'abbr.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e20', word: 'ability', meaning: '才能；技能；能力', partOfSpeech: 'n.[C] & [U]', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e21', word: 'able', meaning: '能够；有才能的', partOfSpeech: 'adj.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e22', word: 'about', meaning: '关于；大约', partOfSpeech: 'prep. & adv.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e23', word: 'above', meaning: '在……上面；以上', partOfSpeech: 'prep. & adv.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e24', word: 'abroad', meaning: '在国外；到国外', partOfSpeech: 'adv.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e25', word: 'absent', meaning: '缺席的；不在的', partOfSpeech: 'adj.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e26', word: 'accept', meaning: '接受；同意', partOfSpeech: 'vt.', selected: false, isHighFrequencyWrong: true, category: '2022中新课标1600词' },
  { id: 'e27', word: 'accident', meaning: '事故；意外', partOfSpeech: 'n.[C]', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e28', word: 'according to', meaning: '根据；按照', partOfSpeech: 'prep.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e29', word: 'achieve', meaning: '达到；取得；实现', partOfSpeech: 'vt.', selected: false, isHighFrequencyWrong: true, category: '2022中新课标1600词' },
  { id: 'e30', word: 'across', meaning: '穿过；在……对面', partOfSpeech: 'prep. & adv.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e31', word: 'act', meaning: '行动；表演；行为', partOfSpeech: 'v. & n.', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
  { id: 'e32', word: 'action', meaning: '行动；行为', partOfSpeech: 'n.[C] & [U]', selected: false, isHighFrequencyWrong: false, category: '2022中新课标1600词' },
]

const wordListMenu = [
  '2022中新课标1600词',
  '不规则动词',
  '初中新课标1600词（话题分类）',
  '初中新课标1600词（字母序）',
  '云南听说试题高频词汇表',
  '中考必会词汇和短语',
]

// ── Main Component ─────────────────────────────────────

export default function ExamReviewPage() {
  const navigate = useNavigate()
  const [words, setWords] = useState(mockExamWords)
  const [activeList, setActiveList] = useState(wordListMenu[0])

  const selectedCount = words.filter((w) => w.selected).length
  const totalCount = words.length

  const toggleWord = (id: string) => {
    setWords((prev) => prev.map((w) => (w.id === id ? { ...w, selected: !w.selected } : w)))
  }

  const selectAll = () => setWords((prev) => prev.map((w) => ({ ...w, selected: true })))
  const deselectAll = () => setWords((prev) => prev.map((w) => ({ ...w, selected: false })))

  const handleToast = (msg: string) => alert(msg)

  return (
    <div className="h-full flex min-h-0">
      {/* ── Left Sidebar ── */}
      <div className="shrink-0 w-[230px] mr-3 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto bg-white rounded-2xl border border-[#e8eef4] p-3 space-y-3">
          {/* Header */}
          <div>
            <h2 className="text-[13px] font-bold text-[#3a4f66]">中考复习</h2>
            <button
              onClick={() => navigate('/sync-teaching')}
              className="flex items-center justify-between w-full mt-2 px-3 py-1.5 bg-[#4b9fe8] text-white text-[11px] font-medium rounded-lg hover:bg-[#3a8fd8] transition-colors"
            >
              去同步练习 <ChevronRight size={12} />
            </button>
          </div>

          {/* 中考词汇 section */}
          <div>
            <div className="flex items-center gap-2 px-1 py-1 mb-1">
              <BookOpen size={13} className="text-[#4b9fe8]" />
              <span className="text-[12px] font-semibold text-[#3a4f66]">中考词汇</span>
            </div>

            {/* Word list menu */}
            <div className="space-y-0.5">
              {wordListMenu.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveList(item)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                    activeList === item
                      ? 'bg-[#eaf2fb] text-[#4b9fe8]'
                      : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom entry cards */}
        <div className="shrink-0 mt-2 bg-white rounded-2xl border border-[#e8eef4] p-3 space-y-2">
          <button
            onClick={() => navigate('/wrong-words')}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-[#4a6b8a] hover:bg-[#f4f7fa] transition-colors"
          >
            <Users size={13} className="text-[#8aabcc]" />班级错词本
          </button>
          <button
            onClick={() => navigate('/wrong-words')}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-[#4a6b8a] hover:bg-[#f4f7fa] transition-colors"
          >
            <FileText size={13} className="text-[#8aabcc]" />学生个性化词本
          </button>
        </div>
      </div>

      {/* ── Right Content ── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-white rounded-2xl border border-[#e8eef4] overflow-hidden">
        {/* Word content area — scrollable */}
        <div className="flex-1 overflow-y-auto min-h-0 px-5 py-4">
          <div className="grid grid-cols-4 gap-2.5">
            {words.map((w) => (
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
                <p className="text-[10px] text-[#6b8aaa] mt-1 leading-snug line-clamp-2">{w.meaning}</p>
                {w.isHighFrequencyWrong && (
                  <span className="inline-block mt-1.5 text-[8px] text-red-500 bg-red-50 px-1 py-0.5 rounded">高频错词</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Bottom Action Bar ── */}
        <div className="shrink-0 bg-[#f7f9fc] border-t border-[#e4ecf3] px-4 py-2.5 space-y-2">
          {/* Row 1: Selection controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={selectAll} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-[#e4ecf3] text-[11px] text-[#4a6b8a] hover:border-[#b8d4f0] transition-colors">
              全选（{selectedCount}/{totalCount}）
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
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#4b9fe8] text-white text-[11px] font-medium hover:bg-[#3a8fd8] transition-colors shadow-sm"
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

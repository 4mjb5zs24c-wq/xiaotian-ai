import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ShoppingBag, BookOpen, Search, Star, Flame, Eye, Plus, X, Play } from 'lucide-react'
import AssignPracticeTabs from '../components/AssignPracticeTabs'
import SpecializedInsightEntry from '../ai/components/SpecializedInsightEntry'

interface VideoResource {
  id: string
  title: string
  duration: string
  difficulty: number
  isHot: boolean
  playCountText: string
  coverColor: string
  addedToPrep: boolean
  addedToBasket: boolean
}

const mockResources: VideoResource[] = [
  { id: 'v01', title: '中国文化——小满', duration: '20min', difficulty: 4, isHot: true, playCountText: '33.82M', coverColor: '#e85d8b', addedToPrep: false, addedToBasket: false },
  { id: 'v02', title: '二十四节气', duration: '20min', difficulty: 4, isHot: true, playCountText: '34.06M', coverColor: '#5bb878', addedToPrep: false, addedToBasket: false },
  { id: 'v03', title: '"闪电"机器人半马夺冠', duration: '20min', difficulty: 3, isHot: true, playCountText: '14.01M', coverColor: '#4b7cf0', addedToPrep: false, addedToBasket: false },
  { id: 'v04', title: '神舟二十三号发射升空', duration: '20min', difficulty: 2, isHot: true, playCountText: '18.64M', coverColor: '#f08c3a', addedToPrep: false, addedToBasket: false },
  { id: 'v05', title: '不屈的追梦人：蔡佳云', duration: '20min', difficulty: 2, isHot: false, playCountText: '12.4M', coverColor: '#3dbfc4', addedToPrep: false, addedToBasket: false },
  { id: 'v06', title: '外星生命之谜', duration: '20min', difficulty: 4, isHot: false, playCountText: '29.69M', coverColor: '#8b7cf0', addedToPrep: false, addedToBasket: false },
  { id: 'v07', title: '常见的污染种类', duration: '20min', difficulty: 2, isHot: false, playCountText: '16.04M', coverColor: '#6b7db3', addedToPrep: false, addedToBasket: false },
  { id: 'v08', title: '2025：未来科技畅想', duration: '20min', difficulty: 3, isHot: false, playCountText: '19.31M', coverColor: '#4b9fe8', addedToPrep: false, addedToBasket: false },
  { id: 'v09', title: '非遗里的中国智慧', duration: '20min', difficulty: 3, isHot: true, playCountText: '22.15M', coverColor: '#d97a5c', addedToPrep: false, addedToBasket: false },
  { id: 'v10', title: '太空探索新发现', duration: '20min', difficulty: 4, isHot: false, playCountText: '27.83M', coverColor: '#7389d1', addedToPrep: false, addedToBasket: false },
  { id: 'v11', title: '绿色低碳生活', duration: '20min', difficulty: 2, isHot: false, playCountText: '11.56M', coverColor: '#5bb878', addedToPrep: false, addedToBasket: false },
  { id: 'v12', title: '人工智能时代', duration: '20min', difficulty: 3, isHot: true, playCountText: '25.42M', coverColor: '#e8a83a', addedToPrep: false, addedToBasket: false },
]

const difficultyStars = [1, 2, 3, 4, 5]
const themes = [
  '全部',
  '人与自我·生活与学习',
  '人与自我·做人与做事',
  '人与社会·历史社会与文化',
  '人与社会·科学与技术',
  '人与社会·文学艺术与体育',
  '人与社会·社会服务与人际沟通',
  '人与自然·自然与环境',
]
const displayFilters = ['全部', '已布置', '未布置']

export default function AssignVideoPage() {
  const navigate = useNavigate()
  const [activeDifficulty, setActiveDifficulty] = useState(0)
  const [activeTheme, setActiveTheme] = useState('全部')
  const [activeDisplay, setActiveDisplay] = useState('全部')
  const [resources, setResources] = useState(mockResources)
  const [draftCount, setDraftCount] = useState(0)
  const [draftVisible, setDraftVisible] = useState(false)
  const [searchText, setSearchText] = useState('')

  const addToBasket = (id: string) => {
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, addedToBasket: !r.addedToBasket } : r)))
    setDraftCount((c) => c + 1)
    setDraftVisible(true)
  }

  const togglePrep = (id: string) => {
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, addedToPrep: !r.addedToPrep } : r)))
  }

  const filtered = resources.filter((r) => {
    if (activeDifficulty > 0 && r.difficulty !== activeDifficulty) return false
    if (searchText && !r.title.includes(searchText)) return false
    return true
  })

  return (
    <div className="fixed inset-0 z-[400] bg-gradient-to-br from-[#e8f4f8] to-[#e8f0f5] flex flex-col overflow-hidden">
      {/* Top Tabs */}
      <AssignPracticeTabs />

      {/* Filters */}
      <div className="shrink-0 bg-white/80 px-8 py-2.5 space-y-2.5 border-b border-[#f0f4f8]">
        {/* Difficulty */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8aabcc] shrink-0 w-8">难度</span>
          {difficultyStars.map((s) => (
            <button
              key={s}
              onClick={() => setActiveDifficulty(activeDifficulty === s ? 0 : s)}
              className={`flex items-center gap-0.5 px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                activeDifficulty === s ? 'bg-[#eaf2fb] text-[#4b9fe8]' : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'
              }`}
            >
              {Array.from({ length: s }).map((_, i) => (
                <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
              ))}
            </button>
          ))}
        </div>

        {/* Theme */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] text-[#8aabcc] shrink-0 w-8">主题</span>
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTheme(t)}
              className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap ${
                activeTheme === t ? 'bg-[#eaf2fb] text-[#4b9fe8]' : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Display + Search */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8aabcc] shrink-0 w-8">展示</span>
          {displayFilters.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDisplay(d)}
              className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                activeDisplay === d ? 'bg-[#eaf2fb] text-[#4b9fe8]' : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'
              }`}
            >
              {d}
            </button>
          ))}
          <div className="flex items-center gap-1 ml-auto px-2.5 py-1.5 rounded-lg bg-white border border-[#e4ecf3]">
            <Search size={11} className="text-[#b0c8de]" />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="请输入练习内容"
              className="w-[130px] bg-transparent text-[11px] text-[#3a4f66] placeholder-[#c0d4e8] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Insight Banner */}
      <div className="shrink-0 px-8 pt-2">
        <SpecializedInsightEntry type="listeningSpeaking" />
      </div>

      {/* 2-Column Resource Grid */}
      <div className="flex-1 flex min-h-0 px-8 pt-3">
        <div className="flex-1 min-w-0 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((r) => (
              <div key={r.id} className="flex gap-3 bg-white rounded-xl border border-[#e8eef4] p-3 hover:shadow-sm transition-shadow">
                {/* Cover */}
                <div
                  className="relative w-[140px] h-[80px] rounded-lg overflow-hidden shrink-0"
                  style={{ background: `linear-gradient(135deg, ${r.coverColor}, ${r.coverColor}88)` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play size={24} className="text-white/60" />
                  </div>
                  <div className="absolute top-1.5 left-1.5 flex items-center gap-0.5">
                    {Array.from({ length: r.difficulty }).map((_, i) => (
                      <Star key={i} size={10} className="text-yellow-300 fill-yellow-300 drop-shadow-sm" />
                    ))}
                  </div>
                  {r.isHot && (
                    <span className="absolute top-1.5 right-1.5 flex items-center gap-0.5 text-[9px] font-bold text-white bg-red-500/90 px-1.5 py-0.5 rounded">
                      <Flame size={8} />热推
                    </span>
                  )}
                  <span className="absolute bottom-1.5 right-1.5 text-[10px] text-white/80 font-medium">
                    {r.playCountText}
                  </span>
                </div>
                {/* Info + Actions */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <p className="text-[12px] font-semibold text-[#3a4f66] line-clamp-1">{r.title}</p>
                    <p className="text-[10px] text-[#8aabcc] mt-0.5">预计作答：{r.duration}</p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-nowrap">
                    <button
                      onClick={() => alert(`已打开「${r.title}」题目预览`)}
                      className="inline-flex items-center gap-0.5 h-7 px-2.5 rounded-full border border-[#b8d4f0] text-[11px] text-[#4b9fe8] hover:bg-[#eaf2fb] transition-colors whitespace-nowrap flex-shrink-0"
                    >
                      <Eye size={10} />试题/挑题
                    </button>
                    <button
                      onClick={() => togglePrep(r.id)}
                      className={`inline-flex items-center gap-0.5 h-7 px-2.5 rounded-full border text-[11px] transition-colors whitespace-nowrap flex-shrink-0 ${
                        r.addedToPrep
                          ? 'border-[#4b9fe8] bg-[#eaf2fb] text-[#4b9fe8]'
                          : 'border-[#b8d4f0] text-[#4b9fe8] hover:bg-[#eaf2fb]'
                      }`}
                    >
                      <Plus size={10} />
                      {r.addedToPrep ? '已备课' : '加入备课'}
                    </button>
                    <button
                      onClick={() => addToBasket(r.id)}
                      className={`inline-flex items-center gap-0.5 h-7 px-2.5 rounded-full border text-[11px] transition-colors whitespace-nowrap flex-shrink-0 ${
                        r.addedToBasket
                          ? 'border-[#4b9fe8] bg-[#eaf2fb] text-[#4b9fe8]'
                          : 'border-[#b8d4f0] text-[#4b9fe8] hover:bg-[#eaf2fb]'
                      }`}
                    >
                      <Plus size={10} />
                      {r.addedToBasket ? '已加入' : '加入篮子'}
                    </button>
                    <button
                      onClick={() => alert(`布置「${r.title}」——确认面板将在下一步接入`)}
                      className="inline-flex items-center h-7 px-3 rounded-full bg-[#4b9fe8] text-white text-[11px] font-medium hover:bg-[#3a8fd8] transition-colors whitespace-nowrap flex-shrink-0"
                    >
                      布置
                    </button>
                    <button
                      onClick={() => alert(`已打开「${r.title}」资源详情`)}
                      className="inline-flex items-center h-7 px-3 rounded-full bg-[#4b9fe8] text-white text-[11px] font-medium hover:bg-[#3a8fd8] transition-colors whitespace-nowrap flex-shrink-0"
                    >
                      查看/使用
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Draft hint + Test Basket */}
        <div className="shrink-0 flex flex-col items-end gap-3 ml-3">
          {draftVisible && (
            <div className="flex items-center gap-2 bg-[#f0eefc] border border-[#d8d0f0] rounded-lg px-3 py-2 text-[11px] text-[#6b5aaa] whitespace-nowrap">
              <span>{draftCount}道题目已加入到草稿中</span>
              <button onClick={() => setDraftVisible(false)} className="text-[#a090c8] hover:text-[#6b5aaa]">
                <X size={12} />
              </button>
            </div>
          )}
          <button
            onClick={() => alert(`试卷篮中有 ${draftCount} 道题目`)}
            className="relative flex flex-col items-center gap-0.5 px-3 py-3 bg-white border border-[#e4ecf3] rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <ShoppingBag size={18} className="text-[#4b9fe8]" />
            <span className="text-[10px] text-[#6b8aaa]">试卷篮</span>
            {draftCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                {draftCount}
              </span>
            )}
          </button>
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

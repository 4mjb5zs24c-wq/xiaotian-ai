import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ShoppingBag, BookOpen, Search, Star, Flame, Eye, Plus, X, Play } from 'lucide-react'
import AssignPracticeTabs from '../components/AssignPracticeTabs'
import SpecializedInsightEntry from '../ai/components/SpecializedInsightEntry'

interface DubbingResource {
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

const mockResources: DubbingResource[] = [
  { id: 'db01', title: '培档词解 趣事多', duration: '3min10s', difficulty: 4, isHot: true, playCountText: '14.8M', coverColor: '#4b7cf0', addedToPrep: false, addedToBasket: false },
  { id: 'db02', title: '五大生活必备技能', duration: '6min46s', difficulty: 3, isHot: true, playCountText: '23.8M', coverColor: '#5bb878', addedToPrep: false, addedToBasket: false },
  { id: 'db03', title: '地球日环保行动', duration: '2min15s', difficulty: 2, isHot: true, playCountText: '10.7M', coverColor: '#3dbfc4', addedToPrep: false, addedToBasket: false },
  { id: 'db04', title: '一起向恶霸说不', duration: '5min50s', difficulty: 3, isHot: true, playCountText: '26.2M', coverColor: '#8b7cf0', addedToPrep: false, addedToBasket: false },
  { id: 'db05', title: '张雪儿车 中国骄傲', duration: '1min40s', difficulty: 3, isHot: true, playCountText: '15.1M', coverColor: '#f08c3a', addedToPrep: false, addedToBasket: false },
  { id: 'db06', title: '挑食的不治', duration: '8min8s', difficulty: 2, isHot: true, playCountText: '20.1M', coverColor: '#e85d8b', addedToPrep: false, addedToBasket: false },
  { id: 'db07', title: '欢迎来到湿地市场', duration: '9min20s', difficulty: 3, isHot: true, playCountText: '67.3M', coverColor: '#6b7db3', addedToPrep: false, addedToBasket: false },
  { id: 'db08', title: '桃园三结义', duration: '5min44s', difficulty: 2, isHot: true, playCountText: '15.5M', coverColor: '#d97a5c', addedToPrep: false, addedToBasket: false },
  { id: 'db09', title: '草船借箭', duration: '6min30s', difficulty: 3, isHot: true, playCountText: '18.2M', coverColor: '#4b9fe8', addedToPrep: false, addedToBasket: false },
  { id: 'db10', title: '中西画马魂', duration: '4min50s', difficulty: 2, isHot: true, playCountText: '12.6M', coverColor: '#5bb878', addedToPrep: false, addedToBasket: false },
]

const difficultyStars = [1, 2, 3, 4, 5]
const themes = ['全部', '精选', '励志', '亲情', '成长', '搞笑', '常识', '节日', '其他']
const displayFilters = ['全部', '已布置', '未布置']

export default function AssignDubbingPage() {
  const navigate = useNavigate()
  const [activeDifficulty, setActiveDifficulty] = useState(0)
  const [activeTheme, setActiveTheme] = useState('全部')
  const [activeDisplay, setActiveDisplay] = useState('全部')
  const [resources, setResources] = useState(mockResources)
  const [draftCount, setDraftCount] = useState(0)
  const [draftVisible, setDraftVisible] = useState(false)

  const addToBasket = (id: string) => {
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, addedToBasket: !r.addedToBasket } : r)))
    setDraftCount((c) => c + 1)
    setDraftVisible(true)
  }

  const togglePrep = (id: string) => {
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, addedToPrep: !r.addedToPrep } : r)))
  }

  return (
    <div className="fixed inset-0 z-[400] bg-gradient-to-br from-[#e8f4f8] to-[#e8f0f5] flex flex-col overflow-hidden">
      {/* Top Tabs */}
      <AssignPracticeTabs />

      {/* Filters */}
      <div className="shrink-0 bg-white/80 px-8 py-2.5 space-y-2 border-b border-[#f0f4f8]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8aabcc] shrink-0 w-8">难度</span>
          {difficultyStars.map((s) => (
            <button key={s} onClick={() => setActiveDifficulty(activeDifficulty === s ? 0 : s)} className={`flex items-center gap-0.5 px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${activeDifficulty === s ? 'bg-[#eaf2fb] text-[#4b9fe8]' : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'}`}>
              {Array.from({ length: s }).map((_, i) => (<Star key={i} size={10} className="text-amber-400 fill-amber-400" />))}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8aabcc] shrink-0 w-8">主题</span>
          {themes.map((t) => (<button key={t} onClick={() => setActiveTheme(t)} className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${activeTheme === t ? 'bg-[#eaf2fb] text-[#4b9fe8]' : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'}`}>{t}</button>))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8aabcc] shrink-0 w-8">展示</span>
          {displayFilters.map((d) => (<button key={d} onClick={() => setActiveDisplay(d)} className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${activeDisplay === d ? 'bg-[#eaf2fb] text-[#4b9fe8]' : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'}`}>{d}</button>))}
          <div className="flex items-center gap-1 ml-auto px-2.5 py-1.5 rounded-lg bg-white border border-[#e4ecf3]"><Search size={11} className="text-[#b0c8de]" /><input type="text" placeholder="请输入练习内容" className="w-[130px] bg-transparent text-[11px] text-[#3a4f66] placeholder-[#c0d4e8] outline-none" /></div>
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
            {resources.map((r) => (
              <div key={r.id} className="flex gap-3 bg-white rounded-xl border border-[#e8eef4] p-3 hover:shadow-sm transition-shadow">
                {/* Cover */}
                <div className="relative w-[120px] h-[72px] rounded-lg overflow-hidden shrink-0" style={{ background: `linear-gradient(135deg, ${r.coverColor}, ${r.coverColor}88)` }}>
                  <div className="absolute inset-0 flex items-center justify-center"><Play size={22} className="text-white/60" /></div>
                  <div className="absolute top-1.5 left-1.5 flex items-center gap-0.5">{Array.from({ length: r.difficulty }).map((_, i) => (<Star key={i} size={9} className="text-yellow-300 fill-yellow-300 drop-shadow-sm" />))}</div>
                  {r.isHot && (<span className="absolute top-1.5 right-1.5 flex items-center gap-0.5 text-[8px] font-bold text-white bg-red-500/90 px-1.5 py-0.5 rounded"><Flame size={7} />热推</span>)}
                  <span className="absolute bottom-1.5 right-1.5 text-[9px] text-white/80 font-medium">{r.playCountText}</span>
                </div>
                {/* Info + Actions */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <p className="text-[12px] font-semibold text-[#3a4f66] line-clamp-1">{r.title}</p>
                    <p className="text-[10px] text-[#8aabcc] mt-0.5">预计作答：{r.duration}</p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-nowrap">
                    <button onClick={() => alert(`已打开「${r.title}」题目预览`)} className="inline-flex items-center gap-0.5 h-7 px-2.5 rounded-full border border-[#b8d4f0] text-[11px] text-[#4b9fe8] hover:bg-[#eaf2fb] transition-colors whitespace-nowrap flex-shrink-0"><Eye size={10} />试题/挑题</button>
                    <button onClick={() => togglePrep(r.id)} className={`inline-flex items-center gap-0.5 h-7 px-2.5 rounded-full border text-[11px] transition-colors whitespace-nowrap flex-shrink-0 ${r.addedToPrep ? 'border-[#4b9fe8] bg-[#eaf2fb] text-[#4b9fe8]' : 'border-[#b8d4f0] text-[#4b9fe8] hover:bg-[#eaf2fb]'}`}><Plus size={10} />{r.addedToPrep ? '已备课' : '加入备课'}</button>
                    <button onClick={() => addToBasket(r.id)} className={`inline-flex items-center gap-0.5 h-7 px-2.5 rounded-full border text-[11px] transition-colors whitespace-nowrap flex-shrink-0 ${r.addedToBasket ? 'border-[#4b9fe8] bg-[#eaf2fb] text-[#4b9fe8]' : 'border-[#b8d4f0] text-[#4b9fe8] hover:bg-[#eaf2fb]'}`}><Plus size={10} />{r.addedToBasket ? '已加入' : '加入篮子'}</button>
                    <button onClick={() => alert(`布置「${r.title}」——确认面板将在下一步接入`)} className="inline-flex items-center h-7 px-3 rounded-full bg-[#4b9fe8] text-white text-[11px] font-medium hover:bg-[#3a8fd8] transition-colors whitespace-nowrap flex-shrink-0">布置</button>
                    <button onClick={() => alert(`已打开「${r.title}」资源详情`)} className="inline-flex items-center h-7 px-3 rounded-full bg-[#4b9fe8] text-white text-[11px] font-medium hover:bg-[#3a8fd8] transition-colors whitespace-nowrap flex-shrink-0">查看/使用</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Draft + Basket */}
        <div className="shrink-0 flex flex-col items-end gap-3 ml-3">
          {draftVisible && (<div className="flex items-center gap-2 bg-[#f0eefc] border border-[#d8d0f0] rounded-lg px-3 py-2 text-[11px] text-[#6b5aaa] whitespace-nowrap"><span>{draftCount}道题目已加入到草稿中</span><button onClick={() => setDraftVisible(false)} className="text-[#a090c8] hover:text-[#6b5aaa]"><X size={12} /></button></div>)}
          <button onClick={() => alert(`试卷篮中有 ${draftCount} 道题目`)} className="relative flex flex-col items-center gap-0.5 px-3 py-3 bg-white border border-[#e4ecf3] rounded-xl shadow-md hover:shadow-lg transition-shadow"><ShoppingBag size={18} className="text-[#4b9fe8]" /><span className="text-[10px] text-[#6b8aaa]">试卷篮</span>{draftCount > 0 && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">{draftCount}</span>}</button>
        </div>
      </div>

      <button onClick={() => navigate('/')} className="fixed left-4 bottom-6 inline-flex items-center gap-1.5 px-5 h-12 rounded-full bg-[#3194ff] text-white text-[13px] font-medium hover:bg-[#2a84e8] transition-colors whitespace-nowrap shadow-lg z-30"><ChevronRight size={14} className="rotate-180" />返回</button>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
        <button onClick={() => navigate('/resources')} className="flex flex-col items-center gap-0.5 px-2 py-3 bg-[#4b9fe8] text-white text-[10px] rounded-lg hover:bg-[#3a8fd8] transition-colors shadow-md"><BookOpen size={14} /><span style={{ writingMode: 'vertical-rl' }}>我的备课</span></button>
        <button className="p-1 bg-white border border-[#e4ecf3] rounded-full text-[#8aabcc] hover:text-[#4a6b8a] shadow-sm transition-colors"><ChevronRight size={12} className="rotate-180" /></button>
      </div>
    </div>
  )
}

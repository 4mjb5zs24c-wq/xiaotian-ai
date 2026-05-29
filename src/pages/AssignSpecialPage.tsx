import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ShoppingBag, BookOpen, Search, Star, HelpCircle, Eye, Plus, X } from 'lucide-react'
import AssignPracticeTabs from '../components/AssignPracticeTabs'

// ── Types ──────────────────────────────────────────────

interface SpecialExercise {
  id: string
  title: string
  status: '未布置' | '已布置'
  questionCount: number
  estimatedTime: string
  difficulty: number
  addedToBasket: boolean
}

// ── Mock Data ──────────────────────────────────────────

const mockExercises: SpecialExercise[] = [
  { id: 'se01', title: '前元音 (/i:/ /ɪ/ /e/ /æ/)', status: '未布置', questionCount: 70, estimatedTime: '10min', difficulty: 2, addedToBasket: false },
  { id: 'se02', title: '中元音 (/ʌ/ /ɜ:/ /ə/)', status: '未布置', questionCount: 68, estimatedTime: '10min', difficulty: 2, addedToBasket: false },
  { id: 'se03', title: '后元音 (/ɑ:/ /ɒ/ /ɔ:/ /ʊ/ /u:/)', status: '未布置', questionCount: 97, estimatedTime: '10min', difficulty: 2, addedToBasket: false },
  { id: 'se04', title: '合口双元音 (/eɪ/ /aɪ/ /ɔɪ/ /əʊ/ /aʊ/)', status: '未布置', questionCount: 73, estimatedTime: '10min', difficulty: 2, addedToBasket: false },
  { id: 'se05', title: '集中双元音 (/ɪə/ /eə/ /ʊə/)', status: '未布置', questionCount: 44, estimatedTime: '10min', difficulty: 2, addedToBasket: false },
  { id: 'se06', title: '爆破辅音 (/p/ /b/ /t/ /d/ /k/ /g/)', status: '未布置', questionCount: 76, estimatedTime: '10min', difficulty: 2, addedToBasket: false },
  { id: 'se07', title: '摩擦辅音 (/f/ /v/ /θ/ /ð/ /s/ /z/ /r/ /ʃ/ /ʒ/ /h/)', status: '未布置', questionCount: 108, estimatedTime: '10min', difficulty: 2, addedToBasket: false },
  { id: 'se08', title: '破擦辅音 (/ts/ /dz/ /tr/ /dr/ /tʃ/ /dʒ/)', status: '未布置', questionCount: 45, estimatedTime: '10min', difficulty: 2, addedToBasket: false },
  { id: 'se09', title: '鼻辅音 (/m/ /n/ /ŋ/)', status: '未布置', questionCount: 52, estimatedTime: '10min', difficulty: 2, addedToBasket: false },
  { id: 'se10', title: '舌边音 (/l/)', status: '未布置', questionCount: 38, estimatedTime: '10min', difficulty: 2, addedToBasket: false },
  { id: 'se11', title: '半元音 (/w/ /j/)', status: '未布置', questionCount: 30, estimatedTime: '8min', difficulty: 1, addedToBasket: false },
  { id: 'se12', title: '句子重音与弱读', status: '未布置', questionCount: 55, estimatedTime: '12min', difficulty: 3, addedToBasket: false },
  { id: 'se13', title: '连读与失去爆破', status: '未布置', questionCount: 60, estimatedTime: '10min', difficulty: 3, addedToBasket: false },
]

const grades = ['七年级', '八年级', '九年级', '中考']
const categories = ['听说专项']
const modules = ['微技能', '题型']
const columns = ['语音·基础', '场景词汇·初级', '语言组织·初级']
const displayFilters = ['全部', '已布置', '未布置']

// ── Star Rating ────────────────────────────────────────

function StarRating({ rating, max }: { rating: number; max: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={11}
          className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-[#d0dce8]'}
        />
      ))}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────

export default function AssignSpecialPage() {
  const navigate = useNavigate()
  const [activeGrade, setActiveGrade] = useState('七年级')
  const [activeModule, setActiveModule] = useState('微技能')
  const [activeColumn, setActiveColumn] = useState('语音·基础')
  const [activeDisplay, setActiveDisplay] = useState('全部')
  const [exercises, setExercises] = useState(mockExercises)
  const [draftCount, setDraftCount] = useState(0)
  const [draftVisible, setDraftVisible] = useState(false)

  const handlePreview = (title: string) => alert(`已打开「${title}」题目预览`)
  const handleAddToBasket = (id: string) => {
    setExercises((prev) => prev.map((e) => (e.id === id ? { ...e, addedToBasket: !e.addedToBasket } : e)))
    setDraftCount((c) => c + 1)
    setDraftVisible(true)
  }
  const handleAssign = (title: string) => alert(`布置「${title}」——确认面板将在下一步接入`)

  return (
    <div className="fixed inset-0 z-[400] bg-gradient-to-br from-[#e8f4f8] to-[#e8f0f5] flex flex-col overflow-hidden">
      {/* ── Top Tabs ── */}
      <AssignPracticeTabs />

      {/* ── Filters ── */}
      <div className="shrink-0 bg-white/80 px-8 py-2.5 space-y-2 border-b border-[#f0f4f8]">
        {/* Grade */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8aabcc] shrink-0 w-8">年级</span>
          {grades.map((g) => (
            <button key={g} onClick={() => setActiveGrade(g)} className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${activeGrade === g ? 'bg-[#eaf2fb] text-[#4b9fe8]' : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'}`}>{g}</button>
          ))}
        </div>
        {/* Category */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8aabcc] shrink-0 w-8">类别</span>
          {categories.map((c) => (
            <button key={c} className="px-3 py-1 rounded-lg text-[11px] font-medium bg-[#eaf2fb] text-[#4b9fe8]">{c}</button>
          ))}
        </div>
        {/* Module */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8aabcc] shrink-0 w-8">模块</span>
          {modules.map((m) => (
            <button key={m} onClick={() => setActiveModule(m)} className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${activeModule === m ? 'bg-[#eaf2fb] text-[#4b9fe8]' : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'}`}>{m}</button>
          ))}
        </div>
        {/* Column */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8aabcc] shrink-0 w-8">栏目</span>
          {columns.map((c) => (
            <button key={c} onClick={() => setActiveColumn(c)} className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${activeColumn === c ? 'bg-[#eaf2fb] text-[#4b9fe8]' : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'}`}>{c}</button>
          ))}
        </div>
        {/* Display filter + search */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8aabcc] shrink-0 w-8">展示</span>
          {displayFilters.map((d) => (
            <button key={d} onClick={() => setActiveDisplay(d)} className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${activeDisplay === d ? 'bg-[#eaf2fb] text-[#4b9fe8]' : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'}`}>{d}</button>
          ))}
          <button onClick={() => alert('学生可在移动端或网页端完成专项练习，系统会记录作答结果和练习报告。')} className="flex items-center gap-1 px-2 py-1 text-[11px] text-[#4b9fe8] hover:underline ml-2">
            <HelpCircle size={11} />学生如何作答？
          </button>
          <div className="flex items-center gap-1 ml-auto px-2.5 py-1.5 rounded-lg bg-white border border-[#e4ecf3]">
            <Search size={11} className="text-[#b0c8de]" />
            <input type="text" placeholder="请输入练习内容" className="w-[130px] bg-transparent text-[11px] text-[#3a4f66] placeholder-[#c0d4e8] outline-none" />
          </div>
        </div>
      </div>

      {/* ── Main Content: Table ── */}
      <div className="flex-1 flex min-h-0 px-8 pt-3">
        <div className="flex-1 min-w-0 overflow-y-auto">
          <table className="w-full text-[12px]">
            <thead className="sticky top-0 bg-[#f7f9fc]">
              <tr className="text-left text-[11px] text-[#6b8aaa] font-medium">
                <th className="px-4 py-2.5 font-medium">练习名称</th>
                <th className="px-4 py-2.5 font-medium w-[80px]">布置状态</th>
                <th className="px-4 py-2.5 font-medium w-[60px]">题量</th>
                <th className="px-4 py-2.5 font-medium w-[80px]">预计作答</th>
                <th className="px-4 py-2.5 font-medium w-[100px]">难度</th>
                <th className="px-4 py-2.5 font-medium w-[320px] text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f8]">
              {exercises.map((ex) => (
                <tr key={ex.id} className="hover:bg-[#fafbfc] transition-colors">
                  <td className="px-4 py-3 text-[#3a4f66] font-medium">{ex.title}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] text-[#8aabcc] bg-[#f4f7fa] px-2 py-0.5 rounded-full">{ex.status}</span>
                  </td>
                  <td className="px-4 py-3 text-[#4a6b8a]">{ex.questionCount}</td>
                  <td className="px-4 py-3 text-[#4a6b8a]">{ex.estimatedTime}</td>
                  <td className="px-4 py-3"><StarRating rating={ex.difficulty} max={5} /></td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2 flex-nowrap">
                      <button onClick={() => handlePreview(ex.title)} className="inline-flex items-center gap-1 px-3.5 h-8 rounded-full border border-[#b8d4f0] text-[12px] text-[#4b9fe8] hover:bg-[#eaf2fb] transition-colors whitespace-nowrap flex-shrink-0">
                        <Eye size={12} />预览/挑题
                      </button>
                      <button onClick={() => handleAddToBasket(ex.id)} className={`inline-flex items-center gap-1 px-3.5 h-8 rounded-full border text-[12px] transition-colors whitespace-nowrap flex-shrink-0 ${ex.addedToBasket ? 'border-[#4b9fe8] bg-[#eaf2fb] text-[#4b9fe8]' : 'border-[#b8d4f0] text-[#4b9fe8] hover:bg-[#eaf2fb]'}`}>
                        <Plus size={12} />{ex.addedToBasket ? '已加入' : '加入篮子'}
                      </button>
                      <button onClick={() => handleAssign(ex.title)} className="inline-flex items-center gap-1 px-4 h-8 rounded-full bg-[#4b9fe8] text-white text-[12px] font-medium hover:bg-[#3a8fd8] transition-colors whitespace-nowrap flex-shrink-0">布置</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Draft hint + Test Basket */}
        <div className="shrink-0 flex flex-col items-end gap-3 ml-3">
          {draftVisible && (
            <div className="flex items-center gap-2 bg-[#f0eefc] border border-[#d8d0f0] rounded-lg px-3 py-2 text-[11px] text-[#6b5aaa] whitespace-nowrap">
              <span>{draftCount}道题目已加入到草稿中</span>
              <button onClick={() => setDraftVisible(false)} className="text-[#a090c8] hover:text-[#6b5aaa]"><X size={12} /></button>
            </div>
          )}
          <button onClick={() => alert(`试卷篮中有 ${draftCount} 道题目`)} className="relative flex flex-col items-center gap-0.5 px-3 py-3 bg-white border border-[#e4ecf3] rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <ShoppingBag size={18} className="text-[#4b9fe8]" />
            <span className="text-[10px] text-[#6b8aaa]">试卷篮</span>
            {draftCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">{draftCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* ── Return ── */}
      <button onClick={() => navigate('/')} className="fixed left-4 bottom-6 inline-flex items-center gap-1.5 px-5 h-12 rounded-full bg-[#3194ff] text-white text-[13px] font-medium hover:bg-[#2a84e8] transition-colors whitespace-nowrap shadow-lg z-30">
        <ChevronRight size={14} className="rotate-180" />返回
      </button>

      {/* ── Right Floating ── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
        <button onClick={() => navigate('/resources')} className="flex flex-col items-center gap-0.5 px-2 py-3 bg-[#4b9fe8] text-white text-[10px] rounded-lg hover:bg-[#3a8fd8] transition-colors shadow-md">
          <BookOpen size={14} /><span style={{ writingMode: 'vertical-rl' }}>我的备课</span>
        </button>
        <button className="p-1 bg-white border border-[#e4ecf3] rounded-full text-[#8aabcc] hover:text-[#4a6b8a] shadow-sm transition-colors">
          <ChevronRight size={12} className="rotate-180" />
        </button>
      </div>
    </div>
  )
}

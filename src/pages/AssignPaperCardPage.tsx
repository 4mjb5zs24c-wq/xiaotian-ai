import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ShoppingBag, BookOpen, Search, ChevronDown, Plus, X, Download, MoreHorizontal, ArrowUpDown } from 'lucide-react'
import AssignPracticeTabs from '../components/AssignPracticeTabs'

interface PaperCard {
  id: string
  title: string
  type: '三方' | '普通'
  hasAnswers: boolean
  assignStatus: '未布置' | '已布置'
  assignCount: number
  totalScore: number
  questionCount: number
  updatedAt: string
  addedToBasket: boolean
  canAssign: boolean
}

const mockCards: PaperCard[] = [
  { id: 'pc01', title: '12月4日三方答题卡[副本]', type: '三方', hasAnswers: false, assignStatus: '未布置', assignCount: 0, totalScore: 97.5, questionCount: 56, updatedAt: '2025-12-4 10:16:01', addedToBasket: false, canAssign: false },
  { id: 'pc02', title: '12月4日三方答题卡', type: '三方', hasAnswers: false, assignStatus: '未布置', assignCount: 0, totalScore: 97.5, questionCount: 56, updatedAt: '2025-12-4 10:13:51', addedToBasket: false, canAssign: false },
  { id: 'pc03', title: '10月20日三方答题卡[副本]', type: '三方', hasAnswers: true, assignStatus: '已布置', assignCount: 2, totalScore: 137.5, questionCount: 67, updatedAt: '2025-10-28 15:06:49', addedToBasket: false, canAssign: true },
  { id: 'pc04', title: '10月20日答题卡', type: '普通', hasAnswers: false, assignStatus: '未布置', assignCount: 0, totalScore: 43, questionCount: 11, updatedAt: '2025-10-20 14:53:29', addedToBasket: false, canAssign: false },
  { id: 'pc05', title: '10月20日三方答题卡', type: '三方', hasAnswers: true, assignStatus: '已布置', assignCount: 4, totalScore: 137.5, questionCount: 67, updatedAt: '2025-10-23 11:27:18', addedToBasket: false, canAssign: true },
  { id: 'pc06', title: '9月30日答题卡', type: '普通', hasAnswers: true, assignStatus: '已布置', assignCount: 3, totalScore: 85, questionCount: 42, updatedAt: '2025-09-30 09:12:05', addedToBasket: false, canAssign: true },
  { id: 'pc07', title: '9月测试答题卡', type: '普通', hasAnswers: true, assignStatus: '已布置', assignCount: 1, totalScore: 100, questionCount: 50, updatedAt: '2025-09-15 16:30:00', addedToBasket: false, canAssign: true },
  { id: 'pc08', title: 'Unit 3 词汇检测答题卡', type: '普通', hasAnswers: false, assignStatus: '未布置', assignCount: 0, totalScore: 50, questionCount: 25, updatedAt: '2025-08-22 10:45:33', addedToBasket: false, canAssign: false },
  { id: 'pc09', title: '听力专项答题卡', type: '三方', hasAnswers: true, assignStatus: '未布置', assignCount: 0, totalScore: 60, questionCount: 30, updatedAt: '2025-08-10 14:20:18', addedToBasket: false, canAssign: true },
  { id: 'pc10', title: '阶段测评答题卡', type: '普通', hasAnswers: true, assignStatus: '已布置', assignCount: 5, totalScore: 120, questionCount: 60, updatedAt: '2025-07-28 08:55:42', addedToBasket: false, canAssign: true },
]

const subTabs = ['我的答题卡', '我的试卷', '本校试卷']
const sortOptions = ['按创建时间', '按更新时间', '按题量']
const typeOptions = ['全部类型', '普通', '三方']
const answerOptions = ['全部', '已设置答案', '未设置答案']
const assignOptions = ['全部', '已布置', '未布置']
const pageSizes = [10, 20, 50]

export default function AssignPaperCardPage() {
  const navigate = useNavigate()
  const [activeSubTab, setActiveSubTab] = useState('我的答题卡')
  const [cards, setCards] = useState(mockCards)
  const [draftCount, setDraftCount] = useState(0)
  const [draftVisible, setDraftVisible] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedSort, setSelectedSort] = useState(sortOptions[0])
  const [selectedType, setSelectedType] = useState(typeOptions[0])
  const [selectedAnswer, setSelectedAnswer] = useState(answerOptions[0])
  const [selectedAssign, setSelectedAssign] = useState(assignOptions[0])
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [moreOpenId, setMoreOpenId] = useState<string | null>(null)

  const filtered = cards
    .filter((c) => {
      if (searchText && !c.title.includes(searchText)) return false
      if (selectedType === '普通' && c.type !== '普通') return false
      if (selectedType === '三方' && c.type !== '三方') return false
      if (selectedAnswer === '已设置答案' && !c.hasAnswers) return false
      if (selectedAnswer === '未设置答案' && c.hasAnswers) return false
      if (selectedAssign === '已布置' && c.assignStatus !== '已布置') return false
      if (selectedAssign === '未布置' && c.assignStatus !== '未布置') return false
      return true
    })
    .sort((a, b) => {
      if (selectedSort === '按题量') return sortOrder === 'desc' ? b.questionCount - a.questionCount : a.questionCount - b.questionCount
      return sortOrder === 'desc' ? b.updatedAt.localeCompare(a.updatedAt) : a.updatedAt.localeCompare(b.updatedAt)
    })

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pagedCards = filtered.slice((page - 1) * pageSize, page * pageSize)

  const addToBasket = (id: string) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, addedToBasket: !c.addedToBasket } : c)))
    setDraftCount((c) => c + 1)
    setDraftVisible(true)
  }

  const handleAssign = (card: PaperCard) => {
    if (!card.canAssign) {
      alert('请先设置答案后再布置')
      return
    }
    alert(`布置「${card.title}」——确认面板将在下一步接入`)
  }

  const handleNewCard = () => alert('新建答题卡功能将在后续版本中接入')
  const handleNewThirdParty = () => alert('新建第三方卡功能将在后续版本中接入')
  const handleFromTemplate = () => alert('从模板引用功能将在后续版本中接入')

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
              onClick={() => setActiveSubTab(tab)}
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

      {/* Filters */}
      <div className="shrink-0 bg-white/80 px-8 py-2.5 border-b border-[#f0f4f8]">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] text-[#8aabcc] shrink-0">排序</span>
          <DropdownBtn label={selectedSort} options={sortOptions} onSelect={setSelectedSort} />
          <button
            onClick={() => setSortOrder((o) => (o === 'desc' ? 'asc' : 'desc'))}
            className="p-1.5 rounded-lg border border-[#e4ecf3] text-[#8aabcc] hover:text-[#4a6b8a] hover:bg-[#f4f7fa] transition-colors"
          >
            <ArrowUpDown size={12} />
          </button>
          <span className="text-[#d0dce8]">|</span>
          <span className="text-[11px] text-[#8aabcc]">类型</span>
          <DropdownBtn label={selectedType} options={typeOptions} onSelect={setSelectedType} />
          <span className="text-[#d0dce8]">|</span>
          <span className="text-[11px] text-[#8aabcc]">答案</span>
          <DropdownBtn label={selectedAnswer} options={answerOptions} onSelect={setSelectedAnswer} />
          <span className="text-[#d0dce8]">|</span>
          <span className="text-[11px] text-[#8aabcc]">布置</span>
          <DropdownBtn label={selectedAssign} options={assignOptions} onSelect={setSelectedAssign} />

          {/* Search + Create buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-[#e4ecf3]">
              <Search size={11} className="text-[#b0c8de]" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => { setSearchText(e.target.value); setPage(1) }}
                placeholder="请输入答题卡名称"
                className="w-[140px] bg-transparent text-[11px] text-[#3a4f66] placeholder-[#c0d4e8] outline-none"
              />
            </div>
            <button
              onClick={handleNewCard}
              className="inline-flex items-center gap-1 px-3 h-7 rounded-full bg-[#4b9fe8] text-white text-[11px] font-medium hover:bg-[#3a8fd8] transition-colors whitespace-nowrap flex-shrink-0"
            >
              <Plus size={11} />新建答题卡
            </button>
            <button
              onClick={handleNewThirdParty}
              className="inline-flex items-center gap-1 px-3 h-7 rounded-full border border-[#b8d4f0] text-[11px] text-[#4b9fe8] hover:bg-[#eaf2fb] transition-colors whitespace-nowrap flex-shrink-0"
            >
              新建第三方卡
            </button>
            <button
              onClick={handleFromTemplate}
              className="inline-flex items-center gap-1 px-3 h-7 rounded-full border border-[#b8d4f0] text-[11px] text-[#4b9fe8] hover:bg-[#eaf2fb] transition-colors whitespace-nowrap flex-shrink-0"
            >
              从模板引用
            </button>
          </div>
        </div>
      </div>

      {/* Card List */}
      <div className="flex-1 flex min-h-0 px-8 pt-3">
        <div className="flex-1 min-w-0 overflow-y-auto space-y-2">
          {pagedCards.map((card) => (
            <div key={card.id} className="flex items-center gap-4 bg-white rounded-xl border border-[#e8eef4] px-4 py-3 hover:shadow-sm transition-shadow">
              {/* Type / Status tags */}
              <div className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                {card.type === '三方' && (
                  <span className="inline-flex items-center text-[9px] font-medium text-[#4b9fe8] bg-[#eaf2fb] px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">三方</span>
                )}
                {!card.hasAnswers && (
                  <span className="inline-flex items-center text-[9px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">未设置答案</span>
                )}
              </div>

              {/* Title + Info */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-[13px] font-semibold text-[#3a4f66] truncate">{card.title}</p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-[#8aabcc] flex-nowrap overflow-hidden">
                  <span className={`whitespace-nowrap flex-shrink-0 ${card.assignStatus === '未布置' ? 'text-amber-500 font-medium' : 'text-[#8aabcc]'}`}>
                    {card.assignStatus === '已布置' ? `已布置（${card.assignCount}）` : '未布置'}
                  </span>
                  <span className="text-[#d0dce8] flex-shrink-0">|</span>
                  <span className="whitespace-nowrap flex-shrink-0">总分：{card.totalScore}</span>
                  <span className="text-[#d0dce8] flex-shrink-0">|</span>
                  <span className="whitespace-nowrap flex-shrink-0">题数：{card.questionCount}</span>
                  <span className="text-[#d0dce8] flex-shrink-0">|</span>
                  <span className="whitespace-nowrap flex-shrink-0">最后更新：{card.updatedAt}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleAssign(card)}
                  className={`inline-flex items-center px-4 h-7 rounded-full text-[11px] font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                    card.canAssign
                      ? 'bg-[#4b9fe8] text-white hover:bg-[#3a8fd8]'
                      : 'bg-[#d0dce8] text-white cursor-not-allowed'
                  }`}
                >
                  布置
                </button>
                <button
                  onClick={() => addToBasket(card.id)}
                  className={`inline-flex items-center gap-1 px-3 h-7 rounded-full border text-[11px] transition-colors whitespace-nowrap flex-shrink-0 ${
                    card.addedToBasket
                      ? 'border-[#4b9fe8] bg-[#eaf2fb] text-[#4b9fe8]'
                      : 'border-[#b8d4f0] text-[#4b9fe8] hover:bg-[#eaf2fb]'
                  }`}
                >
                  <Plus size={10} />
                  {card.addedToBasket ? '已加入' : '加入篮子'}
                </button>
                <button
                  onClick={() => alert(`已开始下载「${card.title}」`)}
                  className="inline-flex items-center gap-1 px-3 h-7 rounded-full border border-[#b8d4f0] text-[11px] text-[#4b9fe8] hover:bg-[#eaf2fb] transition-colors whitespace-nowrap flex-shrink-0"
                >
                  <Download size={10} />下载
                </button>
                <div className="relative">
                  <button
                    onClick={() => setMoreOpenId(moreOpenId === card.id ? null : card.id)}
                    className="inline-flex items-center px-2 h-7 rounded-full border border-[#b8d4f0] text-[11px] text-[#8aabcc] hover:text-[#4a6b8a] hover:bg-[#f4f7fa] transition-colors whitespace-nowrap flex-shrink-0"
                  >
                    <MoreHorizontal size={12} />更多
                  </button>
                  {moreOpenId === card.id && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-[#e4ecf3] rounded-lg shadow-lg z-20 py-1 min-w-[80px]">
                      {['编辑', '复制', '删除'].map((action) => (
                        <button
                          key={action}
                          onClick={() => {
                            setMoreOpenId(null)
                            alert(`${action}「${card.title}」——功能将在后续版本中接入`)
                          }}
                          className="block w-full text-left px-3 py-1.5 text-[11px] text-[#4a6b8a] hover:bg-[#f4f7fa] transition-colors"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-sm text-[#b8cde0]">暂无匹配的答题卡</p>
            </div>
          )}
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

      {/* Pagination */}
      <div className="shrink-0 bg-white border-t border-[#f0f4f8] px-8 py-2.5 flex items-center justify-center gap-3">
        <span className="text-[11px] text-[#8aabcc]">共{filtered.length}条</span>
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-[#8aabcc]">每页</span>
          <DropdownBtn label={`${pageSize}条/页`} options={pageSizes.map((s) => `${s}条/页`)} onSelect={(v) => { setPageSize(parseInt(v)); setPage(1) }} />
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-2 py-1 rounded border border-[#e4ecf3] text-[11px] text-[#8aabcc] hover:text-[#4a6b8a] hover:bg-[#f4f7fa] transition-colors disabled:opacity-30"
            disabled={page <= 1}
          >
            <ChevronRight size={11} className="rotate-180" />
          </button>
          <span className="text-[11px] font-medium text-[#4b9fe8] bg-[#eaf2fb] px-2.5 py-0.5 rounded">{page}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-2 py-1 rounded border border-[#e4ecf3] text-[11px] text-[#8aabcc] hover:text-[#4a6b8a] hover:bg-[#f4f7fa] transition-colors disabled:opacity-30"
            disabled={page >= totalPages}
          >
            <ChevronRight size={11} />
          </button>
        </div>
        <span className="text-[11px] text-[#8aabcc]">前往</span>
        <input
          type="text"
          defaultValue="1"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const v = parseInt((e.target as HTMLInputElement).value)
              if (v >= 1 && v <= totalPages) setPage(v)
            }
          }}
          className="w-8 px-1.5 py-1 rounded border border-[#e4ecf3] text-[11px] text-[#3a4f66] text-center outline-none focus:border-[#b8d4f0]"
        />
        <span className="text-[11px] text-[#8aabcc]">页</span>
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

// ── Dropdown Button ────────────────────────────────────

function DropdownBtn({
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
        const idx = options.indexOf(label)
        const next = options[(idx + 1) % options.length]
        onSelect(next)
      }}
      className="inline-flex items-center justify-between gap-1 px-2.5 py-1 rounded-lg bg-[#f4f7fa] border border-[#e4ecf3] text-[11px] text-[#3a4f66] hover:border-[#b8d4f0] transition-colors whitespace-nowrap"
    >
      <span className="truncate">{label}</span>
      <ChevronDown size={9} className="text-[#8aabcc] shrink-0" />
    </button>
  )
}

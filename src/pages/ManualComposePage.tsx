import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ShoppingBag, Search, ChevronDown, X } from 'lucide-react'

interface QuestionItem {
  id: string
  word: string
  questionCount: number
  type: string
  selected: boolean
  expanded: boolean
  source: string
  difficulty: string
  knowledgePoint: string
}

const mockItems: QuestionItem[] = [
  { id: 'q01', word: 'cheap', questionCount: 1, type: '词汇跟读', selected: false, expanded: false, source: '八年级上册 Unit 4', difficulty: '基础', knowledgePoint: '形容词用法' },
  { id: 'q02', word: 'earthquake', questionCount: 1, type: '词汇跟读', selected: false, expanded: false, source: '八年级上册 Unit 4', difficulty: '中等', knowledgePoint: '名词拼写' },
  { id: 'q03', word: 'sky', questionCount: 1, type: '词汇跟读', selected: false, expanded: false, source: '八年级上册 Unit 4', difficulty: '基础', knowledgePoint: '自然类名词' },
  { id: 'q04', word: 'online', questionCount: 1, type: '词汇跟读', selected: false, expanded: false, source: '八年级上册 Unit 4', difficulty: '基础', knowledgePoint: '科技词汇' },
  { id: 'q05', word: 'river', questionCount: 1, type: '词汇跟读', selected: false, expanded: false, source: '八年级上册 Unit 4', difficulty: '基础', knowledgePoint: '地理名词' },
  { id: 'q06', word: 'strike', questionCount: 1, type: '词汇跟读', selected: false, expanded: false, source: '八年级上册 Unit 4', difficulty: '中等', knowledgePoint: '动词用法' },
  { id: 'q07', word: 'clear', questionCount: 1, type: '词汇跟读', selected: false, expanded: false, source: '八年级上册 Unit 4', difficulty: '基础', knowledgePoint: '形容词/动词' },
  { id: 'q08', word: 'nature', questionCount: 1, type: '词汇跟读', selected: false, expanded: false, source: '八年级上册 Unit 4', difficulty: '基础', knowledgePoint: '自然类名词' },
  { id: 'q09', word: 'protect', questionCount: 1, type: '词汇跟读', selected: false, expanded: false, source: '八年级上册 Unit 4', difficulty: '中等', knowledgePoint: '动词用法' },
  { id: 'q10', word: 'forest', questionCount: 1, type: '词汇跟读', selected: false, expanded: false, source: '八年级上册 Unit 4', difficulty: '基础', knowledgePoint: '自然类名词' },
]

const modules = ['词汇', '听力口语', '语言运用', '阅读理解', '书面表达']
const topics = ['Topic 1', 'Topic 2', 'Topic 3']
const contentTypes = ['课标词汇', '非课标词汇']
const questionTypes = ['词汇跟读', '词汇听写', '中英检测', '词形变化', '语境填词', '单句语法填空', '句型转换', '补全句子', '选词填空']
const statusFilters = ['已组卷', '已布置']

export default function ManualComposePage() {
  const navigate = useNavigate()
  const [items, setItems] = useState<QuestionItem[]>(mockItems)
  const [activeModule, setActiveModule] = useState('词汇')
  const [activeTopic, setActiveTopic] = useState('Topic 1')
  const [activeContent, setActiveContent] = useState('课标词汇')
  const [activeQuestionType, setActiveQuestionType] = useState('词汇跟读')
  const [activeStatuses, setActiveStatuses] = useState<string[]>([])
  const [searchText, setSearchText] = useState('')
  const [collapsed, setCollapsed] = useState(false)
  const [draftVisible, setDraftVisible] = useState(false)

  const selectedCount = useMemo(() => items.filter((i) => i.selected).length, [items])
  const allSelected = useMemo(() => items.length > 0 && items.every((i) => i.selected), [items])

  const filtered = useMemo(() => {
    let result = items
    if (searchText) {
      result = result.filter((i) => i.word.toLowerCase().includes(searchText.toLowerCase()))
    }
    return result
  }, [items, searchText])

  const toggleSelect = (id: string) => {
    setItems((prev) => {
      const next = prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i))
      const newCount = next.filter((i) => i.selected).length
      if (newCount > 0) setDraftVisible(true)
      return next
    })
  }

  const toggleSelectAll = () => {
    setItems((prev) => {
      const next = prev.map((i) => ({ ...i, selected: !allSelected }))
      const newCount = next.filter((i) => i.selected).length
      if (newCount > 0) setDraftVisible(true)
      return next
    })
  }

  const toggleExpand = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, expanded: !i.expanded } : i)))
  }

  const toggleStatus = (s: string) => {
    setActiveStatuses((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
  }

  const resetFilters = () => {
    setActiveModule('词汇')
    setActiveTopic('Topic 1')
    setActiveContent('课标词汇')
    setActiveQuestionType('词汇跟读')
    setActiveStatuses([])
    setSearchText('')
  }

  return (
    <div className="h-full flex flex-col min-h-0">
      <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-br from-[#ecf5fa] to-[#e8f5f0] rounded-2xl overflow-hidden border border-[#dce8f2]">
        {/* Breadcrumb */}
        <div className="shrink-0 px-5 pt-4 pb-2">
          <div className="flex items-center gap-1.5 text-[11px]">
            <button onClick={() => navigate('/')} className="text-[#8aabcc] hover:text-[#4b9fe8] transition-colors">
              首页
            </button>
            <ChevronRight size={11} className="text-[#c0d4e8]" />
            <span className="text-[#3a4f66] font-semibold">选题组卷-人工组卷</span>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="flex-1 flex min-h-0 px-5 pb-3">
          <div className="flex-1 min-w-0 flex flex-col min-h-0 bg-white rounded-2xl border border-[#e8eef4] overflow-hidden">
            {/* ── Filter Area ── */}
            <div className={`shrink-0 border-b border-[#f0f4f8] bg-[#fafcfd] transition-all ${collapsed ? 'py-2' : 'py-3'}`}>
              <div className="px-4 space-y-2">
                {/* Row 1: Region + Unit */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-[#8aabcc]">地区：</span>
                    <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f4f7fa] border border-[#e4ecf3] text-[11px] text-[#3a4f66] hover:border-[#b8d4f0] transition-colors whitespace-nowrap">
                      云南 <ChevronDown size={9} className="text-[#8aabcc]" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-[#8aabcc]">册/单元：</span>
                    <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f4f7fa] border border-[#e4ecf3] text-[11px] text-[#3a4f66] hover:border-[#b8d4f0] transition-colors whitespace-nowrap">
                      八年级上册 / Unit 4 <ChevronDown size={9} className="text-[#8aabcc]" />
                    </button>
                  </div>
                </div>

                {!collapsed && (
                  <>
                    {/* Module */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] text-[#8aabcc] shrink-0">模块：</span>
                      {modules.map((m) => (
                        <button
                          key={m}
                          onClick={() => setActiveModule(m)}
                          className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap ${
                            activeModule === m ? 'text-[#4b9fe8] font-semibold' : 'text-[#6b8aaa] hover:text-[#3a4f66]'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>

                    {/* Topics */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] text-[#8aabcc] shrink-0">课型：</span>
                      {topics.map((t) => (
                        <button
                          key={t}
                          onClick={() => setActiveTopic(t)}
                          className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap ${
                            activeTopic === t ? 'bg-[#eaf2fb] text-[#4b9fe8]' : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {/* Content type */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] text-[#8aabcc] shrink-0">内容：</span>
                      {contentTypes.map((c) => (
                        <label key={c} className="flex items-center gap-1.5 text-[11px] text-[#4a6b8a] cursor-pointer select-none">
                          <input
                            type="radio"
                            name="content"
                            checked={activeContent === c}
                            onChange={() => setActiveContent(c)}
                            className="accent-[#4b9fe8] w-3 h-3"
                          />
                          {c}
                        </label>
                      ))}
                    </div>

                    {/* Question types */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] text-[#8aabcc] shrink-0">题型：</span>
                      {questionTypes.map((qt) => (
                        <button
                          key={qt}
                          onClick={() => setActiveQuestionType(qt)}
                          className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap ${
                            activeQuestionType === qt ? 'bg-[#eaf2fb] text-[#4b9fe8]' : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'
                          }`}
                        >
                          {qt}
                        </button>
                      ))}
                    </div>

                    {/* Status filters + Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] text-[#8aabcc] shrink-0">过滤：</span>
                      {statusFilters.map((s) => (
                        <label key={s} className="flex items-center gap-1.5 text-[11px] text-[#4a6b8a] cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={activeStatuses.includes(s)}
                            onChange={() => toggleStatus(s)}
                            className="accent-[#4b9fe8] w-3 h-3"
                          />
                          {s}
                        </label>
                      ))}
                      <div className="flex items-center gap-2 ml-auto">
                        <button
                          onClick={resetFilters}
                          className="text-[11px] text-[#4b9fe8] hover:underline whitespace-nowrap"
                        >
                          重置筛选
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Search + Collapse row */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-[11px] text-[#8aabcc] hover:text-[#4a6b8a] whitespace-nowrap transition-colors"
                  >
                    {collapsed ? '展开' : '收起'}
                    <ChevronDown size={10} className={`inline ml-0.5 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
                  </button>
                  <div className="flex items-center gap-1 ml-auto px-2.5 py-1.5 rounded-lg bg-[#f4f7fa] border border-[#e4ecf3]">
                    <Search size={11} className="text-[#b0c8de]" />
                    <input
                      type="text"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      placeholder="请输入具体单词搜索"
                      className="w-[150px] bg-transparent text-[11px] text-[#3a4f66] placeholder-[#c0d4e8] outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Select All Row ── */}
            <div className="shrink-0 flex items-center gap-2 px-4 py-2 border-b border-[#f0f4f8]">
              <label className="flex items-center gap-1.5 text-[11px] text-[#4a6b8a] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="accent-[#4b9fe8] w-3.5 h-3.5"
                />
                全选
              </label>
              <span className="text-[10px] text-[#8aabcc]">已选 {selectedCount} 项</span>
            </div>

            {/* ── Question Group List ── */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {/* Group Header */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#fafcfd] border-b border-[#f0f4f8]">
                <span className="w-1 h-4 rounded-full bg-[#4b9fe8]" />
                <span className="text-[12px] font-semibold text-[#3a4f66]">{activeQuestionType}</span>
              </div>

              {/* Word Items */}
              <div className="divide-y divide-dashed divide-[#eef2f6]">
                {filtered.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="text-sm text-[#b8cde0]">暂无匹配的词汇</p>
                  </div>
                ) : (
                  filtered.map((item) => (
                    <div key={item.id}>
                      {/* Item Row */}
                      <div className="flex items-center px-4 py-2.5 hover:bg-[#fafcfd] transition-colors">
                        <label className="flex items-center shrink-0 mr-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => toggleSelect(item.id)}
                            className="accent-[#4b9fe8] w-3.5 h-3.5"
                          />
                        </label>
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="px-3 py-1 rounded-full bg-[#eaf2fb] text-[#4b9fe8] text-[11px] font-medium hover:bg-[#d6e6f7] transition-colors whitespace-nowrap"
                        >
                          {item.word}
                        </button>
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="ml-3 px-2.5 py-0.5 rounded-full border border-[#d0dce8] text-[10px] text-[#8aabcc] hover:border-[#b8d4f0] hover:text-[#4b9fe8] transition-colors whitespace-nowrap"
                        >
                          共{item.questionCount}小题
                        </button>
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="ml-auto p-1 text-[#c0d4e8] hover:text-[#4b9fe8] transition-colors"
                        >
                          <ChevronRight size={14} className={`transition-transform ${item.expanded ? 'rotate-90' : ''}`} />
                        </button>
                      </div>

                      {/* Expanded Detail */}
                      {item.expanded && (
                        <div className="px-10 py-3 bg-[#fafcfd] border-t border-dashed border-[#eef2f6]">
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[11px]">
                            <div className="flex gap-2">
                              <span className="text-[#8aabcc]">题型：</span>
                              <span className="text-[#3a4f66] font-medium">{item.type}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-[#8aabcc]">单词：</span>
                              <span className="text-[#3a4f66] font-medium">{item.word}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-[#8aabcc]">来源：</span>
                              <span className="text-[#3a4f66]">{item.source}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-[#8aabcc]">难度：</span>
                              <span className="text-[#3a4f66]">{item.difficulty}</span>
                            </div>
                            <div className="flex gap-2 col-span-2">
                              <span className="text-[#8aabcc]">知识点：</span>
                              <span className="text-[#3a4f66]">{item.knowledgePoint}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => {
                                toggleSelect(item.id)
                                alert(`「${item.word}」已加入试卷篮`)
                              }}
                              className="inline-flex items-center gap-1 px-3 h-7 rounded-full border border-[#b8d4f0] text-[11px] text-[#4b9fe8] hover:bg-[#eaf2fb] transition-colors whitespace-nowrap"
                            >
                              加入试卷篮
                            </button>
                            <button
                              onClick={() => alert(`已打开「${item.word}」题目预览`)}
                              className="inline-flex items-center gap-1 px-3 h-7 rounded-full border border-[#b8d4f0] text-[11px] text-[#8aabcc] hover:text-[#4b9fe8] hover:bg-[#f4f7fa] transition-colors whitespace-nowrap"
                            >
                              预览
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ── Right: Draft hint + Test Basket ── */}
          <div className="shrink-0 flex flex-col items-end gap-3 ml-3">
            {draftVisible && selectedCount > 0 && (
              <div className="flex items-center gap-2 bg-[#f0eefc] border border-[#d8d0f0] rounded-lg px-3 py-2 text-[11px] text-[#6b5aaa] whitespace-nowrap">
                <span>{selectedCount}道题目已加入到草稿中</span>
                <button onClick={() => setDraftVisible(false)} className="text-[#a090c8] hover:text-[#6b5aaa]">
                  <X size={12} />
                </button>
              </div>
            )}
            <button
              onClick={() => alert(`试卷篮中有 ${selectedCount} 道题目`)}
              className="relative flex flex-col items-center gap-0.5 px-3 py-3 bg-white border border-[#e4ecf3] rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <ShoppingBag size={18} className="text-[#4b9fe8]" />
              <span className="text-[10px] text-[#6b8aaa] whitespace-nowrap">试卷篮</span>
              {selectedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {selectedCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, BookOpen, X, ShoppingBag, Eye, Search, RotateCcw, Plus } from 'lucide-react'
import AssignPracticeTabs from '../components/AssignPracticeTabs'

interface WordItem {
  id: string
  word: string
  pos: string
  definition: string
  selected: boolean
  isCurriculum: boolean
}

const mockWords: WordItem[] = [
  { id: 'w01', word: 'exchange', pos: 'n.', definition: '交换；交流\nv.交换；交流；交易；兑换', selected: false, isCurriculum: true },
  { id: 'w02', word: 'lecture', pos: 'n.', definition: '讲座；讲课；教训\nvi.（开）讲座；讲课', selected: false, isCurriculum: true },
  { id: 'w03', word: 'registration', pos: 'n.', definition: '登记；注册；挂号', selected: false, isCurriculum: true },
  { id: 'w04', word: 'register', pos: 'v.', definition: '登记；注册', selected: false, isCurriculum: true },
  { id: 'w05', word: 'sex', pos: 'n.', definition: '性别', selected: false, isCurriculum: true },
  { id: 'w06', word: 'female', pos: 'adj.', definition: '女（性）的；雌的\nn.雌性动（植）物；女子', selected: false, isCurriculum: true },
  { id: 'w07', word: 'male', pos: 'adj.', definition: '男（性）的；雄的\nn.雄性动（植）物；男子', selected: false, isCurriculum: true },
  { id: 'w08', word: 'nationality', pos: 'n.', definition: '国籍；民族', selected: false, isCurriculum: true },
  { id: 'w09', word: 'nation', pos: 'n.', definition: '国家；民族；国民', selected: false, isCurriculum: true },
  { id: 'w10', word: 'designer', pos: 'n.', definition: '设计者', selected: false, isCurriculum: false },
  { id: 'w11', word: 'design', pos: 'n.', definition: '设计；设计方案\nv.设计；筹划', selected: false, isCurriculum: true },
  { id: 'w12', word: 'campus', pos: 'n.', definition: '校园；校区', selected: false, isCurriculum: true },
  { id: 'w13', word: 'formal', pos: 'adj.', definition: '正式的；正规的', selected: false, isCurriculum: true },
  { id: 'w14', word: 'type', pos: 'n.', definition: '类型；种类\nv.打字', selected: false, isCurriculum: true },
  { id: 'w15', word: 'comedy', pos: 'n.', definition: '喜剧；喜剧片', selected: false, isCurriculum: false },
  { id: 'w16', word: 'documentary', pos: 'n.', definition: '纪录片', selected: false, isCurriculum: false },
  { id: 'w17', word: 'fantasy', pos: 'n.', definition: '幻想；幻想作品', selected: false, isCurriculum: false },
  { id: 'w18', word: 'horror', pos: 'n.', definition: '恐怖；恐怖片', selected: false, isCurriculum: false },
  { id: 'w19', word: 'romance', pos: 'n.', definition: '浪漫；爱情故事', selected: false, isCurriculum: false },
  { id: 'w20', word: 'fiction', pos: 'n.', definition: '小说；虚构的事', selected: false, isCurriculum: false },
  { id: 'w21', word: 'science fiction', pos: 'n.', definition: '科幻小说', selected: false, isCurriculum: false },
  { id: 'w22', word: 'behind the scenes', pos: 'phr.', definition: '幕后；在后台', selected: false, isCurriculum: false },
]

const pkForms = ['看中选英', '看英选中', '看中拼英', '语境选词', '一词多义', '混合PK']

export default function AssignAfterClassPkPage() {
  const navigate = useNavigate()
  const [activePkForm, setActivePkForm] = useState('看中选英')
  const [words, setWords] = useState<WordItem[]>(mockWords)
  const [basketTab, setBasketTab] = useState<'content' | 'scope'>('content')
  const [showHighFreqWrong, setShowHighFreqWrong] = useState(false)

  const selectedWords = useMemo(() => words.filter((w) => w.selected), [words])
  const curriculumWords = useMemo(() => words.filter((w) => w.isCurriculum), [words])
  const selectedCurriculum = useMemo(() => curriculumWords.filter((w) => w.selected), [curriculumWords])
  const totalWords = words.length
  const selectedCount = selectedWords.length
  const curriculumTotal = curriculumWords.length
  const curriculumSelected = selectedCurriculum.length

  const toggleWord = (id: string) => {
    setWords((prev) => prev.map((w) => (w.id === id ? { ...w, selected: !w.selected } : w)))
  }

  const selectAll = () => {
    const targetWords = showHighFreqWrong ? words.filter((w) => w.isCurriculum) : words
    setWords((prev) => prev.map((w) => {
      const inTarget = targetWords.some((t) => t.id === w.id)
      return inTarget ? { ...w, selected: true } : w
    }))
  }

  const resetSelection = () => {
    setWords((prev) => prev.map((w) => ({ ...w, selected: false })))
  }

  const selectCurriculumOnly = () => {
    setWords((prev) => prev.map((w) => (w.isCurriculum ? { ...w, selected: true } : { ...w, selected: false })))
  }

  const batchAddToBasket = () => {
    const count = selectedWords.length
    if (count === 0) {
      alert('请先选择词汇')
      return
    }
    alert(`已将 ${count} 个词汇添加到已选篮`)
  }

  const removeFromBasket = (id: string) => {
    setWords((prev) => prev.map((w) => (w.id === id ? { ...w, selected: false } : w)))
  }

  const clearBasket = () => {
    setWords((prev) => prev.map((w) => ({ ...w, selected: false })))
  }

  const handleAssignPk = () => {
    if (selectedCount === 0) {
      alert('请先选择 PK 词汇')
      return
    }
    alert(`布置PK「${activePkForm}」——确认面板将在下一步接入（已选 ${selectedCount} 词）`)
  }

  const displayedWords = showHighFreqWrong
    ? words.filter((w) => w.isCurriculum)
    : words

  return (
    <div className="fixed inset-0 z-[400] bg-gradient-to-br from-[#e8f4f8] to-[#e8f0f5] flex flex-col overflow-hidden">
      {/* Top Tabs */}
      <AssignPracticeTabs />

      {/* PK Form Filter */}
      <div className="shrink-0 bg-white/90 px-8 py-2.5 border-b border-[#f0f4f8]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8aabcc] font-medium shrink-0">PK形式：</span>
          {pkForms.map((form) => (
            <button
              key={form}
              onClick={() => setActivePkForm(form)}
              className={`px-4 py-1.5 rounded-lg text-[12px] font-medium transition-colors whitespace-nowrap ${
                activePkForm === form
                  ? 'bg-[#eaf2fb] text-[#4b9fe8]'
                  : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'
              }`}
            >
              {form}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0 px-8 pt-3 pb-3 gap-3">
        {/* ── Left: Word Cards Area ── */}
        <div className="flex-1 min-w-0 flex flex-col min-h-0">
          {/* Section header */}
          <div className="shrink-0 flex items-center gap-2 mb-2">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={selectedCount === totalWords && totalWords > 0}
                onChange={() => selectedCount === totalWords ? resetSelection() : selectAll()}
                className="accent-[#4b9fe8] w-3.5 h-3.5"
              />
            </label>
            <span className="text-[12px] font-semibold text-[#3a4f66]">Listening & Speaking</span>
          </div>

          {/* Word Card Grid — scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="grid grid-cols-4 gap-2.5">
              {displayedWords.map((w) => (
                <button
                  key={w.id}
                  onClick={() => toggleWord(w.id)}
                  className={`text-left p-3 rounded-xl border transition-all ${
                    w.selected
                      ? 'border-[#4b9fe8] bg-[#eaf2fb] shadow-sm'
                      : 'border-[#e8eef4] bg-white hover:border-[#b8d4f0] hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <p className="text-[13px] font-bold text-[#3a4f66] leading-tight">{w.word}</p>
                    <span className="text-[9px] text-[#8aabcc] bg-[#f4f7fa] px-1.5 py-0.5 rounded shrink-0 ml-1">{w.pos}</span>
                  </div>
                  <p className="text-[10px] text-[#6b8aaa] mt-1.5 leading-relaxed whitespace-pre-line line-clamp-2">
                    {w.definition}
                  </p>
                  {w.selected && (
                    <div className="flex justify-end mt-1">
                      <span className="w-5 h-5 rounded-full bg-[#4b9fe8] text-white flex items-center justify-center text-[10px]">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Bottom Toolbar ── */}
          <div className="shrink-0 mt-2 flex items-center gap-3 flex-wrap bg-white rounded-xl border border-[#e8eef4] px-3 py-2">
            <button
              onClick={() => selectedCount === totalWords ? resetSelection() : selectAll()}
              className="text-[11px] font-medium text-[#4b9fe8] hover:underline whitespace-nowrap"
            >
              全选({selectedCount}/{totalWords})
            </button>
            <span className="text-[#d0dce8] text-[11px]">|</span>
            <button
              onClick={selectCurriculumOnly}
              className="text-[11px] font-medium text-[#4b9fe8] hover:underline whitespace-nowrap"
            >
              课标词({curriculumSelected}/{curriculumTotal})
            </button>
            <span className="text-[#d0dce8] text-[11px]">|</span>
            <button
              onClick={() => alert('快速选择：按单元、词性或范围快速筛选词汇')}
              className="text-[11px] text-[#6b8aaa] hover:text-[#4b9fe8] whitespace-nowrap transition-colors"
            >
              快速选择
            </button>
            <span className="text-[#d0dce8] text-[11px]">|</span>
            <button
              onClick={resetSelection}
              className="inline-flex items-center gap-1 text-[11px] text-[#6b8aaa] hover:text-[#4b9fe8] whitespace-nowrap transition-colors"
            >
              <RotateCcw size={10} />重置
            </button>
            <span className="text-[#d0dce8] text-[11px]">|</span>
            <button
              onClick={batchAddToBasket}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#b8d4f0] text-[11px] text-[#4b9fe8] hover:bg-[#eaf2fb] transition-colors whitespace-nowrap"
            >
              <Plus size={10} />批量添加内容(选择范围)
            </button>
            <label className="flex items-center gap-1 text-[11px] text-[#6b8aaa] cursor-pointer select-none whitespace-nowrap ml-auto">
              <input
                type="checkbox"
                checked={showHighFreqWrong}
                onChange={(e) => setShowHighFreqWrong(e.target.checked)}
                className="accent-[#4b9fe8] w-3 h-3"
              />
              高频错词
            </label>
            <button
              onClick={() => alert('搜索单词功能将在后续版本中接入')}
              className="inline-flex items-center gap-1 text-[11px] text-[#6b8aaa] hover:text-[#4b9fe8] whitespace-nowrap transition-colors"
            >
              <Search size={10} />搜索单词
            </button>
          </div>

          {/* ── Textbook Selector ── */}
          <div className="shrink-0 mt-2">
            <button
              onClick={() => alert('教材选择将在后续版本中接入')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#e4ecf3] text-[11px] text-[#3a4f66] hover:border-[#b8d4f0] transition-colors"
            >
              新人教版 <span className="text-[#8aabcc]">|</span> 必修1 <span className="text-[#8aabcc]">|</span> Welcome ...
            </button>
          </div>
        </div>

        {/* ── Right: Selected Basket ── */}
        <div className="shrink-0 w-[340px] flex flex-col min-h-0 bg-white rounded-2xl border border-[#e8eef4] shadow-sm overflow-hidden">
          {/* Basket Header */}
          <div className="shrink-0 px-4 py-3 border-b border-[#f0f4f8]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <ShoppingBag size={14} className="text-[#4b9fe8]" />
                <span className="text-[13px] font-semibold text-[#3a4f66]">已选篮</span>
              </div>
              <button className="p-0.5 rounded text-[#8aabcc] hover:text-[#4a6b8a] transition-colors">
                <Eye size={13} />
              </button>
            </div>
            {/* Basket Tabs */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setBasketTab('content')}
                className={`text-[11px] font-semibold pb-1 border-b-2 transition-colors whitespace-nowrap ${
                  basketTab === 'content'
                    ? 'text-[#4b9fe8] border-[#4b9fe8]'
                    : 'text-[#8aabcc] border-transparent hover:text-[#4a6b8a]'
                }`}
              >
                已选内容({selectedCount})
              </button>
              <button
                onClick={() => setBasketTab('scope')}
                className={`text-[11px] font-semibold pb-1 border-b-2 transition-colors whitespace-nowrap ${
                  basketTab === 'scope'
                    ? 'text-[#4b9fe8] border-[#4b9fe8]'
                    : 'text-[#8aabcc] border-transparent hover:text-[#4a6b8a]'
                }`}
              >
                已选范围(有)
              </button>
            </div>
          </div>

          {/* Basket Content */}
          {basketTab === 'content' ? (
            <div className="flex-1 flex flex-col min-h-0">
              {/* Group Header */}
              <div className="shrink-0 px-4 py-2 bg-[#f7f9fc] border-b border-[#f0f4f8]">
                <p className="text-[11px] font-medium text-[#4a6b8a]">
                  {activePkForm}（{selectedCount}）
                </p>
              </div>

              {/* Word List — scrollable */}
              <div className="flex-1 overflow-y-auto min-h-0">
                {selectedWords.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-[11px] text-[#b8cde0]">点击左侧词卡选择词汇</p>
                  </div>
                ) : (
                  <div className="divide-y divide-dashed divide-[#eef2f6]">
                    {selectedWords.map((w) => (
                      <div key={w.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-[#fafbfc] transition-colors">
                        <span className="text-[12px] text-[#3a4f66] font-medium">{w.word}</span>
                        <button
                          onClick={() => removeFromBasket(w.id)}
                          className="p-0.5 rounded text-[#b8cde0] hover:text-red-400 hover:bg-red-50 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Basket Bottom Actions */}
              <div className="shrink-0 px-4 py-2.5 border-t border-[#f0f4f8] flex items-center gap-2">
                <button
                  onClick={clearBasket}
                  className="flex-1 inline-flex items-center justify-center h-8 rounded-full border border-[#d0dce8] text-[11px] text-[#6b8aaa] hover:bg-[#f4f7fa] transition-colors whitespace-nowrap"
                >
                  清空
                </button>
                <button
                  onClick={handleAssignPk}
                  className="flex-1 inline-flex items-center justify-center h-8 rounded-full bg-[#4b9fe8] text-white text-[11px] font-medium hover:bg-[#3a8fd8] transition-colors whitespace-nowrap"
                >
                  布置PK
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 p-4 text-center">
              <p className="text-[11px] text-[#b8cde0]">已选范围内容将在后续版本中接入</p>
            </div>
          )}
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

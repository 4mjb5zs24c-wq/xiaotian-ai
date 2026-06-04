import { useState, useCallback, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search, Clock, Sparkles, X, BookOpen } from 'lucide-react'
import { useAIStore } from '../ai/store'
import { matchNewSearch, mockOpenPreview, mockOpenAssignDialog, mockAddToLessonPrep, mockOpenFunction } from '../ai/search-new/searchEngine'
import { SearchResultView, PaperBasketBadge } from '../ai/components/search-new'
import type {
  NewSearchResult,
  ResourceItem,
  FunctionEntry,
  AssignmentDraft,
  QuickEntry,
  PaperBasketItem,
  SearchContext,
} from '../ai/search-new/types'

// ── Mock data for suggestions ──

const recentSearches = ['Unit 1 资源', '同步词汇', '山东省24年中考真题', '听力练习', '同步练习']

export default function SearchPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const teacherContext = useAIStore((s) => s.teacherContext)
  const paperBasket = useAIStore((s) => s.paperBasket)
  const addToPaperBasket = useAIStore((s) => s.addToPaperBasket)
  const setNewSearchResult = useAIStore((s) => s.setNewSearchResult)
  const setAIDrawerPanel = useAIStore((s) => s.setAIDrawerPanel)
  const setPendingAssignments = useAIStore((s) => s.setPendingAssignments)

  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [result, setResult] = useState<NewSearchResult | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const autoRunRef = useRef<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const ctx: SearchContext = {
    textbook: teacherContext.textbook,
    unit: teacherContext.unit,
    grade: teacherContext.grade,
    className: teacherContext.className,
    studentCount: teacherContext.studentCount,
  }

  useEffect(() => {
    const q = searchParams.get('query')
    const autoRun = searchParams.get('autoRun')
    if (q) {
      setQuery(q)
      if (autoRun === '1') {
        if (autoRunRef.current !== q) {
          autoRunRef.current = q
          doSearch(q)
        }
      }
      setSearchParams({}, { replace: true })
    }
  }, [])

  // Check if query is a single English word
  const isSingleEnglishWord = (q: string): boolean => {
    return /^[a-zA-Z]+$/.test(q.trim()) && q.trim().length >= 2
  }

  const doSearch = useCallback((q: string) => {
    const sq = q.trim()
    if (!sq) return
    setSearching(true)

    setTimeout(() => {
      const res = matchNewSearch(sq, ctx)
      // If searching a single English word, inject 讲词 function entry
      if (isSingleEnglishWord(sq)) {
        const wordTeachEntry: FunctionEntry = {
          id: 'func-word-teach',
          name: '讲词',
          keywords: [sq],
          category: '词汇教学',
          recommendReason: `打开「${sq}」全屏讲词页，查看词义、例句、搭配和教学资源`,
          actionType: 'open_page',
          openTarget: `/word-teaching/${encodeURIComponent(sq)}`,
        }
        res.functionEntries = [wordTeachEntry, ...res.functionEntries]
      }
      setResult(res)
      setNewSearchResult(res)
      setSearching(false)
    }, 400)
  }, [teacherContext])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') doSearch(query)
  }

  const handleTagClick = (term: string) => {
    setResult(null)
    setQuery(term)
    doSearch(term)
  }

  // Action handlers
  const handlePreview = (item: ResourceItem) => {
    showToast(mockOpenPreview(item).message)
  }

  const handleAssign = (item: ResourceItem) => {
    showToast(mockOpenAssignDialog(item).message)
  }

  const handleAddToPaperBasket = (item: ResourceItem) => {
    const basketItem: PaperBasketItem = {
      id: `pb-${item.id}-${Date.now()}`,
      resourceId: item.id,
      title: item.title,
      type: item.type,
      addedAt: Date.now(),
    }
    addToPaperBasket(basketItem)
  }

  const handleAddToLessonPrep = (item: ResourceItem) => {
    showToast(mockAddToLessonPrep(item).message)
  }

  const handleOpenFunction = (entry: FunctionEntry) => {
    if (entry.actionType === 'open_page' && entry.openTarget) {
      navigate(entry.openTarget)
      return
    }
    showToast(mockOpenFunction(entry).message)
  }

  const handleGenerateAssignments = (assignments: AssignmentDraft[]) => {
    setPendingAssignments(assignments)
    setAIDrawerPanel('assignmentConfirmNew', { assignments })
  }

  const handleQuickEntry = (entry: QuickEntry) => {
    setQuery(entry.searchQuery)
    doSearch(entry.searchQuery)
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-6 space-y-5 h-full overflow-y-auto">
      {/* ── Top context bar ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <BookOpen size={12} />
          <span>{teacherContext.textbook} · {teacherContext.grade} · {teacherContext.unit} · {teacherContext.className}</span>
        </div>
        <PaperBasketBadge
          count={paperBasket.length}
          onClick={() => setAIDrawerPanel('basket')}
        />
      </div>

      {/* ── Description text ── */}
      <div className="flex items-center justify-center gap-2.5 pt-2">
        <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
          <Sparkles size={15} className="text-blue-400" />
        </div>
        <p className="text-sm text-slate-500 font-medium">
          输入教学问题，小天帮你找到最好的教学资源
        </p>
      </div>

      {/* ── Search Box ── */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="p-5">
          <div className="relative">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="搜索教学资源、试卷名称或功能入口..."
              className="w-full pl-11 pr-10 py-3 text-[15px] text-slate-800 placeholder-slate-400
                bg-slate-50 border border-slate-200 rounded-xl
                outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:bg-white
                transition-all duration-200"
              autoFocus
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setResult(null) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Quick tags */}
          <div className="flex items-center gap-2 mt-3.5 flex-wrap">
            <span className="text-[11px] text-slate-400 font-medium">快速搜索：</span>
            {['Unit 1 资源', '同步词汇', '听力练习', '快速制卡'].map((term) => (
              <button
                key={term}
                onClick={() => handleTagClick(term)}
                className="text-[13px] text-slate-500 hover:text-blue-600 hover:bg-blue-50
                  px-3 py-1 rounded-lg transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Recent searches */}
        <div className="border-t border-slate-100 px-5 py-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 shrink-0">
              <Clock size={11} />
              近期搜索
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {recentSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => handleTagClick(s)}
                  className="text-[12px] text-slate-500 hover:text-blue-600 hover:bg-slate-50
                    px-2.5 py-1 rounded-md transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Searching state ── */}
      {searching && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Sparkles size={15} className="text-blue-500 animate-pulse" />
            </div>
            <span className="text-sm text-slate-400">小天正在理解你的意图...</span>
          </div>
        </div>
      )}

      {/* ── Results ── */}
      {result && !searching && (
        <SearchResultView
          result={result}
          paperBasket={paperBasket}
          onPreview={handlePreview}
          onAssign={handleAssign}
          onAddToPaperBasket={handleAddToPaperBasket}
          onAddToLessonPrep={handleAddToLessonPrep}
          onOpenFunction={handleOpenFunction}
          onGenerateAssignments={handleGenerateAssignments}
          onQuickEntry={handleQuickEntry}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-slate-800 text-white text-sm px-5 py-2.5 rounded-xl shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}

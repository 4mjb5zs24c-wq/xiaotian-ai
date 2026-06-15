import { useState, useCallback, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  Search, Clock, Sparkles, X, BookOpen, ArrowRight,
  FileText, Headphones, Layers, BarChart3, RotateCw, ChevronRight,
} from 'lucide-react'
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

// ── Mock data ──

const recentSearches = ['Unit 1 资源', '同步词汇', '山东省24年中考真题', '听力练习', '同步练习']

const QUICK_ENTRIES: { key: string; icon: React.ElementType; label: string; desc: string; query: string }[] = [
  { key: 'unit-resources', icon: BookOpen,     label: '当前单元资源', desc: '同步教材课件与练习', query: '当前单元资源' },
  { key: 'sync-vocab',    icon: FileText,      label: '同步词汇',     desc: '单元词汇表与默写单', query: '同步词汇' },
  { key: 'listening',     icon: Headphones,    label: '听力练习',     desc: '听说训练与配音素材', query: '听力练习' },
  { key: 'flash-card',    icon: Layers,        label: '快速制卡',     desc: '一键生成单词闪卡',   query: '快速制卡' },
  { key: 'insight',       icon: BarChart3,     label: '查看学情',     desc: '班级练习报告与洞察', query: '练习报告' },
  { key: 'wrong-review',  icon: RotateCw,      label: '错词复习',     desc: '高频错词回顾与补练', query: '错词复习' },
]

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

  const isSingleEnglishWord = (q: string): boolean => {
    return /^[a-zA-Z]+$/.test(q.trim()) && q.trim().length >= 2
  }

  const doSearch = useCallback((q: string) => {
    const sq = q.trim()
    if (!sq) return
    setSearching(true)

    setTimeout(() => {
      const res = matchNewSearch(sq, ctx)
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
    <div className="flex justify-center px-6">
      <div className="flex-1 w-full py-5 space-y-5 max-w-[1080px]">

        {/* ═══════════════════════════════════════════════════════════
            ── 1. Current Teaching Context bar ──
            ═══════════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 px-4 py-2 bg-white/70 rounded-xl border border-slate-200/60 shadow-sm">
            <div className="flex items-center gap-1.5">
              <BookOpen size={13} className="text-blue-400" />
              <span className="text-xs text-slate-500">当前上下文</span>
            </div>
            <span className="text-slate-200">|</span>
            <span className="text-xs font-medium text-slate-700">{teacherContext.textbook}</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-600">{teacherContext.grade}</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-600">{teacherContext.unit}</span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-600">{teacherContext.className}</span>
          </div>
          <PaperBasketBadge
            count={paperBasket.length}
            onClick={() => setAIDrawerPanel('basket')}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════
            ── 2. AI Search Master Card ──
            ═══════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
          {/* Card header */}
          <div className="px-6 pt-5 pb-4">
            <div className="flex items-center gap-2.5 mb-1">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-sm shadow-blue-200">
                <Sparkles size={15} className="text-white" />
              </div>
              <h2 className="text-base font-bold text-slate-800">小天智能助手</h2>
            </div>
            <p className="text-[13px] text-slate-400 ml-[42px]">
              输入教学问题，我可以帮你找资源、生成练习、查看学情
            </p>
          </div>

          {/* Search input */}
          <div className="px-6 pb-5">
            <div className="flex items-center gap-2.5">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="搜索教学资源、试卷名称，或直接输入教学需求…"
                  className="w-full h-[56px] pl-12 pr-10 text-[15px] text-slate-800 placeholder-slate-400
                    bg-slate-50 border border-slate-200 rounded-2xl
                    outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 focus:bg-white
                    transition-all duration-200"
                  autoFocus
                />
                {query && (
                  <button
                    onClick={() => { setQuery(''); setResult(null) }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
              <button
                onClick={() => doSearch(query)}
                className="flex items-center gap-2 h-[56px] px-5 rounded-2xl text-sm font-semibold
                  bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200
                  transition-all duration-200 active:scale-[0.98]"
              >
                开始搜索
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            ── 3. Quick Entry Cards ──
            ═══════════════════════════════════════════════════════════ */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">常用快捷入口</span>
            <span className="flex-1 h-px bg-slate-200" />
            <button
              onClick={() => {
                setAIDrawerPanel('aiAssistant')
              }}
              className="flex items-center gap-1 text-[11px] text-blue-500 hover:text-blue-600 font-medium transition-colors"
            >
              更多功能
              <ChevronRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {QUICK_ENTRIES.map((entry) => {
              const Icon = entry.icon
              return (
                <button
                  key={entry.key}
                  onClick={() => handleTagClick(entry.query)}
                  className="flex items-start gap-3.5 px-4 py-3.5 bg-white rounded-xl border border-slate-200/60
                    hover:border-blue-300 hover:shadow-sm hover:-translate-y-0.5
                    transition-all duration-200 text-left group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0
                    group-hover:bg-blue-100 transition-colors">
                    <Icon size={17} className="text-blue-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                      {entry.label}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{entry.desc}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            ── 4. Recent Searches ──
            ═══════════════════════════════════════════════════════════ */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
              <Clock size={12} />
              近期搜索
            </span>
            <span className="flex-1 h-px bg-slate-200" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {recentSearches.map((s) => (
              <button
                key={s}
                onClick={() => handleTagClick(s)}
                className="text-[12px] text-slate-600 bg-white border border-slate-200/60
                  px-3.5 py-1.5 rounded-lg hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50
                  transition-all duration-150 font-medium"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            ── Searching state ──
            ═══════════════════════════════════════════════════════════ */}
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

        {/* ═══════════════════════════════════════════════════════════
            ── Results ──
            ═══════════════════════════════════════════════════════════ */}
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
    </div>
  )
}

import { useState, useCallback, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  Search, Clock, Sparkles, X, BookOpen, ArrowRight,
  FileText, Headphones, Layers, ChevronRight, ChevronDown,
} from 'lucide-react'
import { useAIStore } from '../ai/store'
import {
  matchNewSearch,
  mockOpenPreview,
  mockOpenAssignDialog,
  mockAddToLessonPrep,
  mockOpenFunction,
} from '../ai/search-new/searchEngine'
import {
  detectPrecisionJump,
  enhanceSearchResult,
  generateLoadingSteps,
  isSemanticallyMeaningful,
  getSearchSuggestions,
  getCommonFunctions,
  buildUnrecognizedMessage,
  matchV1_1Intent,
  buildAnswerCardResult,
  buildWordListResult,
  buildPaperResult,
  buildWritingResult,
  buildPracticeResult,
  buildSpecialTopicResult,
  buildMicroSkillResult,
  buildRealExamResult,
  buildMockExamResult,
  buildExamSetResult,
  buildListeningResult,
  buildListeningMockResult,
  buildSpeakingResult,
  buildTextResult,
  buildVideoResult,
  buildThemeVideoResult,
  buildDubbingResult,
  buildGrammarResult,
  buildReadingResult,
  matchResourceNames,
  buildNameMatchResult,
  isStrongNameMatch,
  isTextbookNameMatch,
  hasExactNameMatch,
  hasPrefixNameMatch,
  matchRegionResources,
  buildRegionMatchResult,
} from '../ai/search-new/searchEnhancer'
import {
  SearchResultView,
  PaperBasketBadge,
} from '../ai/components/search-new'
import AISearchLoading from '../ai/components/search-new/AISearchLoading'
import type {
  NewSearchResult,
  ResourceItem,
  FunctionEntry,
  AssignmentDraft,
  QuickEntry,
  PaperBasketItem,
  SearchContext,
  EnhancedSearchResult,
  PrecisionJumpData,
  LoadingStep,
  SearchSuggestion,
  CommonFunction,
} from '../ai/search-new/types'

// ── Mock data ──

const recentSearches = ['Unit 1 资源', '同步词汇', '山东省24年中考真题', '听力练习', '同步练习']

const QUICK_ENTRIES: { key: string; icon: React.ElementType; label: string; desc: string; query: string }[] = [
  { key: 'unit-resources', icon: BookOpen,     label: '当前单元资源', desc: '同步教材课件与练习',     query: '当前单元资源' },
  { key: 'sync-vocab',    icon: FileText,      label: '同步词汇',     desc: '词汇表、听写与跟读',     query: '同步词汇' },
  { key: 'listening',     icon: Headphones,    label: '听力练习',     desc: '听说训练与配套素材',     query: '听力练习' },
  { key: 'flash-card',    icon: Layers,        label: '快速制卡',     desc: '一键生成词汇听写卡',     query: '快速制卡' },
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

  // ── V1.1 Search States ────────────────────────────────
  const [searching, setSearching] = useState(false)
  const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([])
  const [showLoading, setShowLoading] = useState(false)

  // Result states
  const [result, setResult] = useState<NewSearchResult | null>(null)
  const [enhancedResult, setEnhancedResult] = useState<EnhancedSearchResult | null>(null)
  const [precisionJump, setPrecisionJump] = useState<PrecisionJumpData | null>(null)

  // Unrecognized fallback
  const [unrecognizedQuery, setUnrecognizedQuery] = useState<string | null>(null)
  const [unrecognizedMessage, setUnrecognizedMessage] = useState<string>('')
  const [fallbackSuggestions, setFallbackSuggestions] = useState<SearchSuggestion[]>([])
  const [fallbackFunctions, setFallbackFunctions] = useState<CommonFunction[]>([])

  const [toast, setToast] = useState<string | null>(null)
  const [showQuickEntries, setShowQuickEntries] = useState(false)

  const autoRunRef = useRef<string | null>(null)
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Mode ──
  const hasAnyResult = result || precisionJump || unrecognizedQuery
  const isHome = !hasAnyResult && !searching

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

  // ═══════════════════════════════════════════════════════════
  // V1.1 Search Flow
  // ═══════════════════════════════════════════════════════════

  const doSearch = useCallback((q: string) => {
    const sq = q.trim()
    if (!sq) return

    // Clear previous state
    setShowQuickEntries(false)
    setResult(null)
    setEnhancedResult(null)
    setPrecisionJump(null)
    setUnrecognizedQuery(null)

    // ── Step 1: Pre-compute all match signals ──────────
    const nameMatch = matchResourceNames(sq, ctx)
    const regionMatch = matchRegionResources(sq, ctx)
    const v1_1Intent = matchV1_1Intent(sq)
    const isIntentKeyword = v1_1Intent !== null

    // ── Step 1a: Exact name match overrides everything ──
    if (hasExactNameMatch(nameMatch)) {
      const steps = generateLoadingSteps(sq)
      setLoadingSteps(steps)
      setSearching(true)
      setShowLoading(true)
      const totalLoadingMs = steps.reduce((sum, s) => sum + s.duration, 0) + 200

      searchTimerRef.current = setTimeout(() => {
        const enhanced = buildNameMatchResult(sq, ctx, nameMatch)
        setResult(enhanced.original)
        setNewSearchResult(enhanced.original)
        setEnhancedResult(enhanced)
        setSearching(false)
      }, totalLoadingMs)
      return
    }

    // ── Step 1b: Precision jump (only if no exact name match) ──
    const jump = detectPrecisionJump(sq)
    if (jump) {
      setPrecisionJump(jump)
      setSearching(false)
      setShowLoading(false)
      return
    }

    // ── Step 1c: Strong name match (prefix overrides intent keywords) ──
    const hasSpecificNameMatch = isStrongNameMatch(nameMatch) || isTextbookNameMatch(nameMatch)
    if (hasSpecificNameMatch && (!isIntentKeyword || hasPrefixNameMatch(nameMatch))) {
      const steps = generateLoadingSteps(sq)
      setLoadingSteps(steps)
      setSearching(true)
      setShowLoading(true)
      const totalLoadingMs = steps.reduce((sum, s) => sum + s.duration, 0) + 200

      searchTimerRef.current = setTimeout(() => {
        const enhanced = buildNameMatchResult(sq, ctx, nameMatch)
        setResult(enhanced.original)
        setNewSearchResult(enhanced.original)
        setEnhancedResult(enhanced)
        setSearching(false)
      }, totalLoadingMs)
      return
    }

    // ── Step 1d: Region match ──
    if (regionMatch && regionMatch.matched) {
      const steps = generateLoadingSteps(sq)
      setLoadingSteps(steps)
      setSearching(true)
      setShowLoading(true)
      const totalLoadingMs = steps.reduce((sum, s) => sum + s.duration, 0) + 200

      searchTimerRef.current = setTimeout(() => {
        const enhanced = buildRegionMatchResult(sq, ctx, regionMatch)
        setResult(enhanced.original)
        setNewSearchResult(enhanced.original)
        setEnhancedResult(enhanced)
        setSearching(false)
      }, totalLoadingMs)
      return
    }

    // ── Step 2: Check for v1.1 core intents ──────────
    // v1_1Intent already computed above

    if (v1_1Intent) {
      // v1.1 intent matched — use direct result builder (skip v1.0 engine)
      const steps = generateLoadingSteps(sq)
      setLoadingSteps(steps)
      setSearching(true)
      setShowLoading(true)
      const totalLoadingMs = steps.reduce((sum, s) => sum + s.duration, 0) + 200

      searchTimerRef.current = setTimeout(() => {
        let enhanced: EnhancedSearchResult

        switch (v1_1Intent) {
          case 'answer_card':
            enhanced = buildAnswerCardResult(sq, ctx)
            break
          case 'word_list':
          case 'dictation':
          case 'vocabulary':
            enhanced = buildWordListResult(sq, ctx)
            break
          case 'paper':
            enhanced = buildPaperResult(sq, ctx)
            break
          case 'writing':
            enhanced = buildWritingResult(sq, ctx)
            break
          case 'practice':
            enhanced = buildPracticeResult(sq, ctx, false)
            break
          case 'unit_practice':
            enhanced = buildPracticeResult(sq, ctx, true)
            break
          case 'special_topic':
            enhanced = buildSpecialTopicResult(sq, ctx)
            break
          case 'micro_skill':
            enhanced = buildMicroSkillResult(sq, ctx)
            break
          case 'real_exam':
            enhanced = buildRealExamResult(sq, ctx)
            break
          case 'mock_exam':
            enhanced = buildMockExamResult(sq, ctx)
            break
          case 'exam_set':
            enhanced = buildExamSetResult(sq, ctx)
            break
          case 'listening':
            enhanced = buildListeningResult(sq, ctx)
            break
          case 'listening_mock':
            enhanced = buildListeningMockResult(sq, ctx)
            break
          case 'speaking':
            enhanced = buildSpeakingResult(sq, ctx)
            break
          case 'text':
            enhanced = buildTextResult(sq, ctx)
            break
          case 'video':
            enhanced = buildVideoResult(sq, ctx)
            break
          case 'theme_video':
            enhanced = buildThemeVideoResult(sq, ctx)
            break
          case 'dubbing':
            enhanced = buildDubbingResult(sq, ctx)
            break
          case 'grammar':
            enhanced = buildGrammarResult(sq, ctx)
            break
          case 'reading':
            enhanced = buildReadingResult(sq, ctx)
            break
          default:
            enhanced = buildPracticeResult(sq, ctx, false)
        }

        setResult(enhanced.original)
        setNewSearchResult(enhanced.original)
        setEnhancedResult(enhanced)
        setSearching(false)
      }, totalLoadingMs)
      return
    }

    // ── Step 3: v1.0 fallback — generate loading steps ──
    const steps = generateLoadingSteps(sq)
    setLoadingSteps(steps)
    setSearching(true)
    setShowLoading(true)

    // ── Step 4: Run v1.0 search + v1.1 enhance ───────
    const totalLoadingMs = steps.reduce((sum, s) => sum + s.duration, 0) + 200

    searchTimerRef.current = setTimeout(() => {
      const res = matchNewSearch(sq, ctx)

      // Single English word → inject 讲词 function entry
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

      // ── Step 5: Check for unrecognized ──────────
      const semanticMatch = isSemanticallyMeaningful(sq)

      if (res.isUnrecognizable || !semanticMatch) {
        setUnrecognizedQuery(sq)
        setUnrecognizedMessage(buildUnrecognizedMessage(sq))
        setFallbackSuggestions(getSearchSuggestions())
        setFallbackFunctions(getCommonFunctions())
        setEnhancedResult(null)
      } else {
        // ── Step 6: Enhance normal results ──────────
        const enhanced = enhanceSearchResult(sq, res)
        setEnhancedResult(enhanced)
      }

      setSearching(false)
    }, totalLoadingMs)
  }, [teacherContext])

  // ── Cleanup timer on unmount ────────────────────────
  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current)
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') doSearch(query)
  }

  const handleTagClick = (term: string) => {
    setQuery(term)
    doSearch(term)
  }

  const handleSuggestionClick = (term: string) => {
    setQuery(term)
    doSearch(term)
  }

  const handleClear = () => {
    setQuery('')
    setResult(null)
    setEnhancedResult(null)
    setPrecisionJump(null)
    setUnrecognizedQuery(null)
    setSearching(false)
    setShowLoading(false)
    setShowQuickEntries(false)
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current)
  }

  const handleNavigate = (route: string) => {
    navigate(route)
  }

  const handleMyContentAction = (item: ResourceItem, action: string) => {
    // Function entry actions (新建答题卡 / 三方答题卡)
    if (action === 'new_card') {
      showToast('新建答题卡 — 待接入新建答题卡流程（路由待确认）')
      return
    }
    if (action === 'third_party_card') {
      showToast('三方答题卡 — 待接入三方答题卡制作流程（路由待确认）')
      return
    }
    // View all link
    if (action === 'view_all') {
      showToast(`查看全部「${item.title}」（路由待确认）`)
      return
    }
    // My content quick actions
    const actionLabels: Record<string, string> = {
      assign: '布置',
      download: '下载',
      more: '更多',
      preview: '预览',
      detail: '查看',
      listen_dictation: '听默写',
      assign_dictation: '布置默写练习',
      oral_reading: '跟读背诵',
      listen_recognize: '听音识词',
      dictation_write: '单词默写',
    }
    showToast(`「${item.title}」- ${actionLabels[action] || action}（路由待确认）`)
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

  // Count results for the hint bar (v1.0 compat)
  const resultCount = result
    ? result.resourceGroups.reduce((sum, g) => sum + g.items.length, 0) + result.functionEntries.length
    : 0

  // ── Determine if slim search bar should be shown ──
  // Always show search bar in any non-home state (results, precision jump, unrecognized, etc.)
  const showSlimSearchBar = !isHome

  return (
    <div className="flex justify-center px-6 h-full">
      <div className={`flex-1 w-full max-w-[1080px] ${isHome ? 'py-5 space-y-5' : 'py-3 space-y-0'}`}>

        {/* ═══════════════════════════════════════════════════════════
            ── 1. Context bar (always visible) ──
            ═══════════════════════════════════════════════════════════ */}
        <div className={`flex items-center justify-between ${!isHome ? 'mb-3' : ''}`}>
          <div className="flex items-center gap-2 px-0">
            <BookOpen size={12} className="text-slate-300" />
            <span className="text-[11px] text-slate-400">当前教学：</span>
            <span className="text-[11px] font-medium text-slate-600">
              {teacherContext.textbook} · {teacherContext.grade} · {teacherContext.unit} · {teacherContext.className}
            </span>
          </div>
          <PaperBasketBadge
            count={paperBasket.length}
            onClick={() => setAIDrawerPanel('basket')}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════
            ── 2. Search Bar ──
            ═══════════════════════════════════════════════════════════ */}

        {/* ── Home mode: full card ── */}
        {isHome && (
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="px-6 pt-4 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-sm shadow-blue-200/50">
                  <Sparkles size={13} className="text-white" />
                </div>
                <h2 className="text-[15px] font-bold text-slate-800">小天智能助手</h2>
              </div>
              <p className="text-[12px] text-slate-400 mt-0.5 ml-[38px]">
                输入教学问题，我可以帮你找资源、生成练习、查看学情
              </p>
            </div>
            <div className="px-6 pb-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="搜索教学资源、试卷名称，或直接输入教学需求…"
                    className="w-full h-[52px] pl-11 pr-10 text-[14px] text-slate-800 placeholder-slate-400
                      bg-slate-50 border border-slate-200 rounded-2xl
                      outline-none focus:border-blue-400 focus:ring-3 focus:ring-blue-50 focus:bg-white
                      transition-all duration-200"
                    autoFocus
                  />
                  {query && (
                    <button
                      onClick={handleClear}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => doSearch(query)}
                  className="flex items-center gap-1.5 h-[52px] px-4 rounded-2xl text-[13px] font-semibold
                    bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200/50
                    transition-all duration-200 active:scale-[0.98] shrink-0"
                >
                  搜索
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Slim search bar (all non-home modes) ── */}
        {showSlimSearchBar && (
          <div className="bg-white rounded-2xl border border-slate-200/50 shadow-[0_1px_3px_rgba(0,0,0,0.04)] px-4 py-2.5 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-sm shadow-blue-200/50 shrink-0">
                <Sparkles size={13} className="text-white" />
              </div>
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="继续输入搜索..."
                  className="w-full h-[40px] pl-9 pr-8 text-[13px] text-slate-800 placeholder-slate-400
                    bg-slate-50 border border-slate-200 rounded-xl
                    outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 focus:bg-white
                    transition-all duration-200"
                />
                {query && (
                  <button
                    onClick={handleClear}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
              <button
                onClick={() => doSearch(query)}
                className="flex items-center gap-1 h-[40px] px-3.5 rounded-xl text-[12px] font-semibold
                  bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200/50
                  transition-all duration-200 active:scale-[0.98] shrink-0"
              >
                搜索
              </button>
              <button
                onClick={() => setShowQuickEntries(!showQuickEntries)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-blue-500 font-medium shrink-0 transition-colors"
              >
                <ChevronDown size={12} className={`transition-transform ${showQuickEntries ? 'rotate-180' : ''}`} />
                展开常用功能
              </button>
            </div>
            {showQuickEntries && (
              <div className="grid grid-cols-4 gap-2 mt-2.5 pt-2.5 border-t border-slate-100">
                {QUICK_ENTRIES.map((entry) => {
                  const Icon = entry.icon
                  return (
                    <button
                      key={entry.key}
                      onClick={() => handleTagClick(entry.query)}
                      className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg
                        hover:bg-blue-50 hover:text-blue-600 transition-colors text-left"
                    >
                      <Icon size={14} className="text-blue-500 shrink-0" />
                      <span className="text-[11px] font-medium text-slate-600 truncate">{entry.label}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            ── 3. V1.1 AI Search Loading ──
            ═══════════════════════════════════════════════════════════ */}
        {showLoading && searching && (
          <AISearchLoading
            steps={loadingSteps}
            onComplete={() => setShowLoading(false)}
          />
        )}

        {/* ═══════════════════════════════════════════════════════════
            ── 4. Search Results (V1.0 compat + V1.1 enhanced) ──
            ═══════════════════════════════════════════════════════════ */}

        {/* ── Precision Jump Result ── */}
        {precisionJump && !searching && (
          <SearchResultView
            precisionJump={precisionJump}
            query={query}
            paperBasket={paperBasket}
            onPreview={handlePreview}
            onAssign={handleAssign}
            onAddToPaperBasket={handleAddToPaperBasket}
            onAddToLessonPrep={handleAddToLessonPrep}
            onOpenFunction={handleOpenFunction}
            onGenerateAssignments={handleGenerateAssignments}
            onQuickEntry={handleQuickEntry}
            onNavigate={handleNavigate}
            onMyContentAction={handleMyContentAction}
          />
        )}

        {/* ── Unrecognized Fallback Result ── */}
        {unrecognizedQuery && !searching && (
          <SearchResultView
            unrecognizedQuery={unrecognizedQuery}
            unrecognizedMessage={unrecognizedMessage}
            suggestions={fallbackSuggestions}
            commonFunctions={fallbackFunctions}
            query={query}
            paperBasket={paperBasket}
            onPreview={handlePreview}
            onAssign={handleAssign}
            onAddToPaperBasket={handleAddToPaperBasket}
            onAddToLessonPrep={handleAddToLessonPrep}
            onOpenFunction={handleOpenFunction}
            onGenerateAssignments={handleGenerateAssignments}
            onQuickEntry={handleQuickEntry}
            onSuggestionClick={handleSuggestionClick}
            onMyContentAction={handleMyContentAction}
          />
        )}

        {/* ── Normal Search Result (v1.1 enhanced or v1.0 compat) ── */}
        {result && !searching && !precisionJump && !unrecognizedQuery && (
          <>
            {/* Result hint bar (v1.0 compat — v1.1 uses AIUnderstandingText instead) */}
            {!enhancedResult && (
              <div className="flex items-center gap-2 mb-3 text-[11px] text-slate-400">
                <span>找到 <strong className="text-slate-600">{resultCount}</strong> 个结果</span>
                <span className="text-slate-300">·</span>
                <span>搜索词：<strong className="text-slate-600">{query}</strong></span>
              </div>
            )}
            <SearchResultView
              result={result}
              enhancedResult={enhancedResult || undefined}
              query={query}
              paperBasket={paperBasket}
              onPreview={handlePreview}
              onAssign={handleAssign}
              onAddToPaperBasket={handleAddToPaperBasket}
              onAddToLessonPrep={handleAddToLessonPrep}
              onOpenFunction={handleOpenFunction}
              onGenerateAssignments={handleGenerateAssignments}
              onQuickEntry={handleQuickEntry}
              onSuggestionClick={handleSuggestionClick}
              onNavigate={handleNavigate}
              onMyContentAction={handleMyContentAction}
            />
          </>
        )}

        {/* ═══════════════════════════════════════════════════════════
            ── 5. Home-only: Quick Entry Cards ──
            ═══════════════════════════════════════════════════════════ */}
        {isHome && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">常用快捷入口</span>
              <span className="flex-1 h-px bg-slate-200/70" />
              <button
                onClick={() => { setAIDrawerPanel('aiAssistant') }}
                className="flex items-center gap-1 text-[11px] text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                更多功能
                <ChevronRight size={12} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {QUICK_ENTRIES.map((entry) => {
                const Icon = entry.icon
                return (
                  <button
                    key={entry.key}
                    onClick={() => handleTagClick(entry.query)}
                    className="flex items-start gap-3 px-4 py-3.5 bg-white rounded-xl border border-slate-200/50
                      hover:border-blue-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:-translate-y-0.5
                      transition-all duration-200 text-left group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50/80 flex items-center justify-center shrink-0
                      group-hover:bg-blue-50 transition-colors">
                      <Icon size={16} className="text-blue-500" />
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
        )}

        {/* ═══════════════════════════════════════════════════════════
            ── 6. Home-only: Recent Searches ──
            ═══════════════════════════════════════════════════════════ */}
        {isHome && (
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                <Clock size={12} />
                近期使用
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {recentSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => handleTagClick(s)}
                  className="text-[11px] text-slate-600 bg-white border border-slate-200/50
                    px-3 py-1.5 rounded-lg hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50
                    transition-all duration-150 font-medium"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
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

import { useState, useCallback, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Clock, TrendingUp, Sparkles, X } from 'lucide-react'
import { useAIStore } from '../ai/store'
import { runAISearch } from '../ai/controller/aiTaskController'
import AISearchResultRenderer from '../ai/components/AISearchResultRenderer'
import type { AISearchResult } from '../ai/controller/aiTaskController'
import type { EntrySource } from '../ai/router/intentMap'

// ── Mock data for suggestions ──

const recentSearches = ['Unit3 词汇默写', '八上阅读理解', '中考听力训练', '作文问题', '同步资源']
const trendingSearches = ['课前导入视频', 'Unit3 高频错词', '阅读理解训练', '听说模拟', '词汇PK', '快速制卡']
const searchPlaceholders = ['试试：生成Unit3词汇听写、查同步资源、来一篇阅读理解', '试试：找一个听说训练、智能组卷、快速制卡', '试试：看一下练习情况、作文主要问题、错词分析']

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const teacherContext = useAIStore((s) => s.teacherContext)
  const setAIDrawerPanel = useAIStore((s) => s.setAIDrawerPanel)

  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [result, setResult] = useState<AISearchResult | null>(null)

  // Prevent double execution in React StrictMode
  const autoRunRef = useRef<string | null>(null)

  const placeholder = searchPlaceholders[Math.floor(Math.random() * searchPlaceholders.length)]

  // Handle URL query param on mount — with autoRun support
  useEffect(() => {
    const q = searchParams.get('query')
    const autoRun = searchParams.get('autoRun')
    if (q) {
      setQuery(q)
      if (autoRun === '1') {
        // Dedup: only execute if this query hasn't been auto-run yet
        if (autoRunRef.current !== q) {
          autoRunRef.current = q
          doSearch(q, 'search_input')
        }
      }
      // Clear params from URL
      setSearchParams({}, { replace: true })
    }
  }, [])

  const context = {
    className: teacherContext.className,
    textbook: teacherContext.textbook,
    unit: teacherContext.unit,
    grade: teacherContext.grade,
  }

  const doSearch = useCallback(async (q: string, source: EntrySource = 'search_input') => {
    const sq = q.trim()
    if (!sq) return
    setSearching(true)

    const res = await runAISearch(sq, source, {
      textbook: teacherContext.textbook,
      unit: teacherContext.unit,
      grade: teacherContext.grade,
      className: teacherContext.className,
      studentCount: teacherContext.studentCount,
    })

    setResult(res)
    setSearching(false)
  }, [teacherContext])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') doSearch(query)
  }

  const handleTagClick = (term: string, source: EntrySource = 'ai_search_suggestion') => {
    setQuery(term)
    doSearch(term, source)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 h-full overflow-y-auto">
      {/* ── Search Box ── */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5">
          <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full pl-11 pr-10 py-3 text-sm text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
              autoFocus
            />
            {query && (
              <button onClick={() => { setQuery(''); setResult(null) }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-[10px] text-slate-400">试试：</span>
            {['生成 Unit3 词汇默写', '来一篇阅读理解', '找一个听说训练', '看一下练习情况'].map((term) => (
              <button key={term} onClick={() => handleTagClick(term)} className="text-[11px] text-blue-500 hover:text-blue-700 hover:bg-blue-50 px-2.5 py-1 rounded-md transition-colors">{term}</button>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 px-5 py-3 flex items-center gap-6">
          <div className="flex items-center gap-2"><Clock size={12} className="text-slate-400" /><span className="text-[10px] text-slate-400 font-medium">近期搜索</span></div>
          <div className="flex items-center gap-2 flex-wrap">
            {recentSearches.map((s) => (
              <button key={s} onClick={() => handleTagClick(s, 'ai_search_recent')} className="text-[10px] text-slate-500 hover:text-blue-600 transition-colors">{s}</button>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-50 px-5 py-2.5 flex items-center gap-2">
          <TrendingUp size={12} className="text-slate-400" />
          <span className="text-[10px] text-slate-400">大家都在搜：</span>
          {trendingSearches.slice(0, 5).map((s) => (
            <button key={s} onClick={() => handleTagClick(s)} className="text-[10px] text-slate-500 hover:text-blue-600 transition-colors">{s}</button>
          ))}
        </div>
      </div>

      {/* ── Searching ── */}
      {searching && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-slate-400">
            <Sparkles size={18} className="animate-pulse text-blue-400" />
            <span className="text-sm">小天正在理解你的意图...</span>
          </div>
        </div>
      )}

      {/* ── Results via unified renderer ── */}
      {result && !searching && (
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <AISearchResultRenderer
            result={result}
            context={context}
            onPanelChange={(state) => setAIDrawerPanel(state.type, state.data)}
            isLoading={false}
          />
        </div>
      )}

      {/* ── Empty state ── */}
      {!result && !searching && (
        <div className="text-center py-16">
          <Sparkles size={32} className="text-blue-300 mx-auto mb-4" />
          <p className="text-sm text-slate-500">输入教学问题，小天帮你找到最好的教学资源</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['八年级 unit3 课件', '中考完形填空', '词汇默写', '口语热身活动', '环保时文'].map((t) => (
              <button key={t} onClick={() => handleTagClick(t)} className="text-xs text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">{t}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

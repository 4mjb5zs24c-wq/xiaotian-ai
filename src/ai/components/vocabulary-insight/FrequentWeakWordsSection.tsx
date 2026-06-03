import { ChevronDown, ChevronRight, CheckSquare, Square, Users, AlertTriangle } from 'lucide-react'
import type { WeakWordItem, VocabularyErrorType } from '../../insights/vocabularyInsightTypes'
import { ERROR_TYPE_META } from '../../insights/vocabularyInsightTypes'

interface Props {
  words: WeakWordItem[]; allWords: WeakWordItem[]; selectedIds: Set<string>
  selectedErrorType: VocabularyErrorType | null; showAll: boolean; expandedWordId: string | null
  errorTypes: { type: VocabularyErrorType; label: string }[]
  onToggleShowAll: () => void; onToggleWord: (id: string) => void
  onSelectAll: () => void; onClearSelection: () => void; onExpandWord: (id: string) => void
  onErrorTypeFilter: (type: VocabularyErrorType) => void
  onMockAction: (action: string) => void; onReviewPlan: () => void
}

export default function FrequentWeakWordsSection({
  words, allWords, selectedIds, selectedErrorType, showAll, expandedWordId,
  errorTypes, onToggleShowAll, onToggleWord, onSelectAll, onClearSelection, onExpandWord,
  onErrorTypeFilter, onMockAction, onReviewPlan,
}: Props) {
  const visible = showAll ? words : words.slice(0, 10)
  const hasMore = words.length > 10
  const filteredCount = allWords.length - words.length
  const selectedInView = visible.filter(w => selectedIds.has(w.id))

  return (
    <section className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <h3 className="text-base font-semibold text-slate-800">高频错词 / 语块</h3>
          <span className="text-xs text-slate-400">{words.length} 条</span>
          {selectedErrorType && (
            <span
              className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: ERROR_TYPE_META[selectedErrorType]?.bgColor,
                color: ERROR_TYPE_META[selectedErrorType]?.borderColor,
              }}
            >
              {ERROR_TYPE_META[selectedErrorType]?.label}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {selectedInView.length > 0 && (
            <span className="text-xs font-medium text-blue-500">已选 {selectedInView.length}</span>
          )}
          <button onClick={onSelectAll} className="text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors">
            全选当前
          </button>
          {selectedIds.size > 0 && (
            <button onClick={onClearSelection} className="text-xs font-medium text-red-400 hover:text-red-500 transition-colors">
              取消全选
            </button>
          )}
        </div>
      </div>

      {/* Filtered notice */}
      {filteredCount > 0 && (
        <p className="text-xs text-slate-400 flex items-center gap-1.5">
          <AlertTriangle size={11} className="text-amber-400" />
          已自动剔除 {filteredCount} 个低价值词汇（代词、冠词等）
        </p>
      )}

      {/* Error Type Quick Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide shrink-0">筛选</span>
        {errorTypes.map(et => {
          const isActive = selectedErrorType === et.type
          const meta = ERROR_TYPE_META[et.type]
          return (
            <button
              key={et.type}
              onClick={() => onErrorTypeFilter(et.type)}
              className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium
                transition-all duration-200
                ${isActive
                  ? 'text-white shadow-sm'
                  : 'bg-white text-slate-500 hover:bg-blue-50/50 border border-slate-200'}`}
              style={isActive ? { backgroundColor: meta.borderColor } : {}}
            >
              {et.label}
            </button>
          )
        })}
        {selectedErrorType && (
          <button onClick={() => onErrorTypeFilter(selectedErrorType)} className="text-xs text-slate-400 hover:text-red-400 transition-colors ml-1">
            清除筛选
          </button>
        )}
      </div>

      {/* Word List */}
      <div className="space-y-1.5">
        {visible.map(w => {
          const isSelected = selectedIds.has(w.id)
          const isExpanded = expandedWordId === w.id
          const errorMeta = ERROR_TYPE_META[w.mainErrorType]

          return (
            <div
              key={w.id}
              className={`border rounded-xl overflow-hidden transition-all duration-200
                ${isSelected
                  ? 'border-blue-200 bg-blue-50/30'
                  : 'border-slate-100 hover:border-slate-200 bg-white'}`}
            >
              {/* Main row */}
              <div className="flex items-center gap-3 px-4 py-3.5">
                {/* Checkbox */}
                <button
                  onClick={() => onToggleWord(w.id)}
                  className="shrink-0 transition-colors duration-150"
                >
                  {isSelected
                    ? <CheckSquare size={16} className="text-blue-500" />
                    : <Square size={16} className="text-slate-300 hover:text-slate-400" />}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onExpandWord(w.id)}>
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Word text */}
                    <span className="text-sm font-semibold text-slate-800">{w.text}</span>

                    {/* Chunk badge */}
                    {w.itemType === 'chunk' && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-500 border border-purple-100">
                        语块
                      </span>
                    )}

                    {/* Stats */}
                    <span className="text-[13px] text-slate-500">
                      掌握率 <span className="font-semibold text-slate-700">{w.masteryRate}%</span>
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-[13px] text-slate-400 flex items-center gap-1">
                      <Users size={11} /> {w.affectedStudentCount} 人
                    </span>

                    {/* Error type tag */}
                    {errorMeta && (
                      <span
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded-md border"
                        style={{
                          backgroundColor: errorMeta.bgColor,
                          color: errorMeta.borderColor,
                          borderColor: errorMeta.borderColor + '30',
                        }}
                      >
                        {errorMeta.label}
                      </span>
                    )}
                  </div>

                  {/* AI reason — one-line */}
                  <p className="text-[13px] text-slate-400 truncate mt-1">{w.aiReason}</p>
                </div>

                {/* Priority score */}
                <span
                  className={`text-xs font-bold shrink-0 w-8 h-7 rounded-lg flex items-center justify-center
                    ${w.priorityScore >= 80
                      ? 'bg-red-50 text-red-500'
                      : w.priorityScore >= 60
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-slate-50 text-slate-400'}`}
                >
                  P{w.priorityScore}
                </span>

                {/* Expand toggle */}
                <button onClick={() => onExpandWord(w.id)} className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors">
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-4 py-4 border-t border-blue-100 bg-blue-50/20 space-y-4">
                  {/* Typical mistakes */}
                  {w.typicalMistakes.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">典型错误详情</p>
                      <div className="grid gap-2">
                        {w.typicalMistakes.map((tm, i) => (
                          <div key={i} className="bg-white border border-slate-100 rounded-xl p-3.5 space-y-2">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-semibold text-slate-700">{tm.studentName}</span>
                              <span className="text-xs text-slate-400">{tm.sourceTime}</span>
                              <span className="text-xs text-slate-300">|</span>
                              <span className="text-xs text-slate-400">{tm.sourceTaskName}</span>
                            </div>
                            <p className="text-[13px] text-slate-500">题目：{tm.questionContext}</p>
                            <div className="flex items-center gap-4">
                              <span className="inline-flex items-center gap-1 text-[13px] font-medium text-red-500 bg-red-50 px-2.5 py-1 rounded-lg">
                                ✗ {tm.studentAnswer}
                              </span>
                              <span className="text-slate-300">→</span>
                              <span className="inline-flex items-center gap-1 text-[13px] font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                                ✓ {tm.correctAnswer}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex items-center gap-2">
                    {w.recommendedActions.map(a => (
                      <button
                        key={a}
                        onClick={() => a === '词汇复习规划' ? onReviewPlan() : onMockAction(a)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200
                          ${a === '词汇复习规划'
                            ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200'
                            : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Show more / less */}
      {hasMore && (
        <button
          onClick={onToggleShowAll}
          className="w-full py-3 text-center text-sm font-medium text-blue-500 hover:text-blue-600
            border border-dashed border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50
            transition-all duration-200"
        >
          {showAll ? '收起' : `查看全部 ${words.length} 条错词/语块`}
        </button>
      )}
    </section>
  )
}

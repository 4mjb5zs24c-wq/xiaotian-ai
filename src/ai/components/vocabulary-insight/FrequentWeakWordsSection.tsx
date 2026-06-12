import { useState } from 'react'
import { ChevronDown, ChevronRight, CheckSquare, Square, Users, AlertTriangle } from 'lucide-react'
import type { WeakWordItem, VocabularyErrorType } from '../../insights/vocabularyInsightTypes'
import { ERROR_TYPE_META, calcSeverity, SEVERITY_STYLES } from '../../insights/vocabularyInsightTypes'

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
          <h3 className="text-base font-semibold text-slate-800">高频错词</h3>
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
          {selectedIds.size > 0 && (
            <>
              <span className="text-xs font-medium text-blue-500">已选择 {selectedIds.size} 个错词</span>
              <button onClick={() => onMockAction('加入复习方案')} className="text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors">
                加入复习方案
              </button>
              <button onClick={() => onMockAction('生成默写单')} className="text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors">
                生成默写单
              </button>
              <button onClick={() => onMockAction('布置专项练习')} className="text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors">
                布置专项练习
              </button>
            </>
          )}
          {selectedIds.size === 0 && (
            <>
              {selectedInView.length > 0 && (
                <span className="text-xs font-medium text-blue-500">已选 {selectedInView.length}</span>
              )}
              <button onClick={onSelectAll} className="text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors">
                全选当前
              </button>
            </>
          )}
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
          const sev = w.severity || calcSeverity(w.scoreRate, w.affectedStudentCount)
          const sevStyle = SEVERITY_STYLES[sev]

          return (
            <WordRow
              key={w.id}
              word={w}
              isSelected={isSelected}
              isExpanded={isExpanded}
              severity={sev}
              severityStyle={sevStyle}
              onToggle={() => onToggleWord(w.id)}
              onExpand={() => onExpandWord(w.id)}
              onMockAction={onMockAction}
              onReviewPlan={onReviewPlan}
            />
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
          {showAll ? '收起' : `查看全部 ${words.length} 条错词`}
        </button>
      )}
    </section>
  )
}

// ── Inline WordRow for cleaner code ──

function WordRow({
  word,
  isSelected,
  isExpanded,
  severity,
  severityStyle,
  onToggle,
  onExpand,
  onMockAction,
  onReviewPlan,
}: {
  word: WeakWordItem
  isSelected: boolean
  isExpanded: boolean
  severity: string
  severityStyle: { bg: string; text: string; border: string }
  onToggle: () => void
  onExpand: () => void
  onMockAction: (action: string) => void
  onReviewPlan: () => void
}) {
  const [showAllEvidences, setShowAllEvidences] = useState(false)

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200
        ${isSelected
          ? 'border-blue-200 bg-blue-50/30'
          : 'border-slate-100 hover:border-slate-200 bg-white'}`}
    >
      {/* Main row */}
      <div className="flex items-center gap-3 px-4 py-3.5">
        <button onClick={onToggle} className="shrink-0 transition-colors duration-150">
          {isSelected
            ? <CheckSquare size={16} className="text-blue-500" />
            : <Square size={16} className="text-slate-300 hover:text-slate-400" />}
        </button>

        <div className="flex-1 min-w-0 cursor-pointer" onClick={onExpand}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-slate-800">{word.text}</span>
            {word.itemType === 'chunk' && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-500 border border-purple-100">语块</span>
            )}
            <span className="text-[13px] text-slate-500">
              得分率 <span className="font-semibold text-slate-700">{word.scoreRate}%</span>
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-[13px] text-slate-400 flex items-center gap-1">
              <Users size={11} /> {word.affectedStudentCount} 人
            </span>
            {word.errorCount && (
              <>
                <span className="text-slate-300">·</span>
                <span className="text-[13px] text-slate-400">{word.errorCount} 次错误</span>
              </>
            )}
            {/* Severity badge */}
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${severityStyle.bg} ${severityStyle.text} ${severityStyle.border}`}
              title="严重程度由得分率、错误次数、影响人数综合计算。">
              严重程度：{severity}
            </span>
          </div>
          <p className="text-[13px] text-slate-400 truncate mt-1">{word.aiReason}</p>
        </div>

        <button onClick={onExpand} className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors">
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* Expanded detail — two layers */}
      {isExpanded && (
        <div className="px-4 py-4 border-t border-blue-100 bg-blue-50/20 space-y-4">
          {/* Layer 1: Wrong form aggregation */}
          {word.wrongForms && word.wrongForms.length > 0 && (
            <div className="space-y-2">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">典型错误形式</p>
              <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left px-3 py-2 font-medium text-slate-500">错误写法</th>
                      <th className="text-center px-3 py-2 font-medium text-slate-500">人数</th>
                      <th className="text-center px-3 py-2 font-medium text-slate-500">次数</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {word.wrongForms.map((wf, i) => (
                      <tr key={i} className="bg-white">
                        <td className="px-3 py-2 font-medium text-red-500">{wf.text}</td>
                        <td className="px-3 py-2 text-center text-slate-600">{wf.students}人</td>
                        <td className="px-3 py-2 text-center text-slate-600">{wf.count}次</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Layer 2: Typical evidence (default 3, expandable) */}
          {word.evidences && word.evidences.length > 0 && (
            <div className="space-y-2">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">典型作答证据</p>
              <div className="space-y-1.5">
                {(showAllEvidences ? word.evidences : word.evidences.slice(0, 3)).map((ev, i) => (
                  <EvidenceCard key={i} evidence={ev} />
                ))}
              </div>
              {word.evidences.length > 3 && (
                <button
                  onClick={() => setShowAllEvidences(!showAllEvidences)}
                  className="text-xs text-blue-500 hover:text-blue-600 font-medium"
                >
                  {showAllEvidences ? '收起' : `查看全部 ${word.evidences.length} 名学生`}
                </button>
              )}
            </div>
          )}

          {/* Fallback: typicalMistakes */}
          {(!word.evidences || word.evidences.length === 0) && word.typicalMistakes.length > 0 && (
            <div className="space-y-2">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">典型错误详情</p>
              <div className="grid gap-2">
                {word.typicalMistakes.map((tm, i) => (
                  <div key={i} className="bg-white border border-slate-100 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-700">{tm.studentName}</span>
                      <span className="text-xs text-slate-400">{tm.sourceTime}</span>
                      <span className="text-xs text-slate-300">|</span>
                      <span className="text-xs text-slate-400">{tm.sourceTaskName}</span>
                    </div>
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
            {word.recommendedActions.map(a => {
              const label = a === '默写' ? '生成默写单' : a === '词汇复习规划' ? '生成词汇复习方案' : a
              return (
                <button
                  key={a}
                  onClick={() => a === '词汇复习规划' ? onReviewPlan() : onMockAction(label)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all duration-200
                    ${a === '词汇复习规划'
                      ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Evidence Card ──

function EvidenceCard({ evidence }: { evidence: { studentName: string; source: string; wrongAnswer: string; correctAnswer: string; question?: string } }) {
  const [showQ, setShowQ] = useState(false)
  return (
    <div className="bg-white border border-slate-100 rounded-lg px-3.5 py-2.5">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-semibold text-slate-700">{evidence.studentName}</span>
        <span className="text-[11px] text-slate-400">｜{evidence.source}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded">{evidence.wrongAnswer}</span>
          <span className="text-[11px] text-slate-300">→</span>
          <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{evidence.correctAnswer}</span>
        </div>
        {evidence.question && (
          <button onClick={() => setShowQ(!showQ)} className="text-[11px] text-blue-500 hover:text-blue-600">
            查看题目
          </button>
        )}
      </div>
      {showQ && evidence.question && (
        <p className="text-[11px] text-slate-400 mt-2 bg-slate-50 rounded-lg px-3 py-2">{evidence.question}</p>
      )}
    </div>
  )
}

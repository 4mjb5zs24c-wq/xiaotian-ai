import { useState, useEffect } from 'react'
import type { VocabularyInsightData, TimeRange, VocabularyErrorType, WeakWordItem } from '../ai/insights/vocabularyInsightTypes'
import { MOCK_VOCABULARY_INSIGHT, MOCK_INTERVENTION_RECORDS } from '../ai/insights/mockVocabularyInsight'
import { ERROR_TYPE_META, SEVERITY_STYLES, calcSeverity } from '../ai/insights/vocabularyInsightTypes'
import { filterVocabularyItems } from '../ai/insights/vocabularyDataFilter'
import { useAIStore } from '../ai/store'
import VocabularyInsightHeader from '../ai/components/vocabulary-insight/VocabularyInsightHeader'
import StudentInsightSection from '../ai/components/vocabulary-insight/StudentInsightSection'
import InterventionRecordSection from '../ai/components/vocabulary-insight/InterventionRecordSection'
import ReviewPlanWizard from '../ai/components/vocabulary-insight/ReviewPlanWizard'
import type { VocabAbilityDimension } from '../ai/insights/vocabularyAbilityTypes'
import VocabAbilityRadar from '../ai/components/vocabulary-insight/VocabAbilityRadar'
import { TrendingUp, ChevronDown, ChevronRight } from 'lucide-react'

export default function VocabularyInsightPage() {
  const [data, setData] = useState<VocabularyInsightData>(MOCK_VOCABULARY_INSIGHT)
  const [timeRange, setTimeRange] = useState<TimeRange>('7d')
  const [selectedErrorType, setSelectedErrorType] = useState<VocabularyErrorType | null>(null)
  const [selectedWord, setSelectedWord] = useState<WeakWordItem | null>(null)
  const [showAllEvidences, setShowAllEvidences] = useState(false)
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null)
  const [showReviewPlan, setShowReviewPlan] = useState(false)
  const [planEntrySource, setPlanEntrySource] = useState<'insight' | 'draftBasket'>('insight')
  const [draftSelectedWordIds, setDraftSelectedWordIds] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)

  // Draft basket from store
  const vocabDraftBasket = useAIStore(s => s.vocabDraftBasket)
  const removeVocabDrafts = useAIStore(s => s.removeVocabDrafts)

  const filteredWeakWords = filterVocabularyItems(data.weakWords).sort((a, b) => a.scoreRate - b.scoreRate)
  const displayWords = selectedErrorType
    ? filteredWeakWords.filter(w => w.mainErrorType === selectedErrorType || (w.issueTypes && w.issueTypes.includes(selectedErrorType)))
    : filteredWeakWords

  useEffect(() => { if (!selectedWord && displayWords.length > 0) { setSelectedWord(displayWords[0]); setShowAllEvidences(false) } }, [selectedErrorType])
  const selectWord = (w: WeakWordItem) => { setSelectedWord(w); setShowAllEvidences(false) }

  const handleErrorTypeClick = (type: VocabularyErrorType) => setSelectedErrorType(prev => prev === type ? null : type)

  const handleMockAction = (_action: string) => {
    setToast(_action)
    setTimeout(() => setToast(null), 2500)
  }

  const m = data.metrics
  const parts = data.summary.split(/[。.]/).filter(Boolean)


  return (
    <div className="flex justify-center px-6">
      <div className="flex-1 w-full py-5 space-y-5 max-w-[1400px]">

        {/* ===== SECTION 1: 词汇洞察概览 ===== */}
        <div>
          <VocabularyInsightHeader timeRange={timeRange} onTimeRangeChange={(r) => { setTimeRange(r); setData({ ...data, timeRange: r }) }} className={data.className} updatedAt={data.updatedAt} />

          <div className="mt-3 grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] gap-3">
            {/* 左卡：词汇洞察总结 */}
            <div className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm overflow-hidden">
              <div className="px-4 py-2 border-b border-[#f0f4f8] flex items-center gap-2">
                <div className="w-1.5 h-3.5 rounded-full bg-amber-400" />
                <h3 className="text-[12px] font-semibold text-slate-700">词汇洞察总结</h3>
              </div>
              <div className="p-4">
                {/* 总结文案 */}
                <p className="text-[14px] text-slate-800 leading-snug font-bold">{parts[0]}。</p>
                {/* 补充说明 */}
                {parts.length > 1 && <p className="text-[12px] text-slate-500 leading-snug mt-0.5">{parts.slice(1).join('。')}。</p>}
                {/* 核心指标 */}
                <div className="flex items-center gap-3 flex-wrap text-[11px] text-slate-500 mt-2">
                  <span>已练词汇 <strong className="text-slate-800">{m.practicedWordCount}</strong></span><span className="text-slate-300">|</span>
                  <span>高频错词 <strong className="text-amber-600">{m.weakWordCount}</strong></span><span className="text-slate-300">|</span>
                  <span>薄弱学生 <strong className="text-amber-600">{m.weakStudentCount}</strong></span><span className="text-slate-300">|</span>
                  <span>薄弱能力 <strong className="text-slate-800">词汇运用表达</strong></span>
                </div>
                {/* 生成方案操作区 */}
                <div className="flex items-center justify-between gap-3 mt-2 pt-2 border-t border-[#f0f4f8]">
                  <span className="text-[11px] text-slate-400">基于高频错词和薄弱学生生成，预计10-15分钟</span>
                  <button
                    onClick={() => { setPlanEntrySource('insight'); setShowReviewPlan(true) }}
                    className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 shadow-sm shadow-blue-200 transition-all shrink-0"
                  >
                    <TrendingUp size={12} />生成词汇提升方案
                  </button>
                </div>
              </div>
            </div>

            {/* 右卡：词汇能力表现 */}
            <div className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm overflow-hidden">
              <div className="px-3 py-1.5 border-b border-[#f0f4f8]">
                <h3 className="text-[11px] font-semibold text-slate-700">词汇能力表现</h3>
              </div>
              <div className="px-2 py-2 flex flex-col items-center">
                {data.abilityScores ? (
                  <VocabAbilityRadar
                    compact
                    scores={data.abilityScores as Record<VocabAbilityDimension, number>}
                  />
                ) : (
                  <p className="text-[10px] text-slate-400 py-8">暂无数据</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ===== SECTION 2: 高频错词工作台 ===== */}
        <div className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row" style={{ height: '540px' }}>
            <div className="lg:w-[50%] lg:border-r border-[#f0f4f8] flex flex-col">
              <div className="px-4 py-2.5 border-b border-[#f0f4f8] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2"><h3 className="text-sm font-semibold text-slate-800">高频错词</h3><span className="text-xs text-slate-400">{displayWords.length} 个</span></div>
                <div className="flex items-center gap-1.5">
                  {data.errorTypes.slice(0, 4).map(et => (
                    <button key={et.type} onClick={() => handleErrorTypeClick(et.type)}
                      className={`text-[10px] px-2 py-1 rounded-md transition-all font-medium ${selectedErrorType === et.type ? 'text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100'}`}
                      style={selectedErrorType === et.type ? { backgroundColor: et.borderColor } : {}}>{et.label}</button>
                  ))}
                  {selectedErrorType && <button onClick={() => handleErrorTypeClick(selectedErrorType)} className="text-[10px] text-slate-400 hover:text-red-400">清除</button>}
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {displayWords.map(w => {
                  const isSelected = selectedWord?.id === w.id
                  const sev = w.severity || calcSeverity(w.scoreRate, w.affectedStudentCount)
                  const sevStyle = SEVERITY_STYLES[sev]
                  const mainLabel = ERROR_TYPE_META[w.mainErrorType]?.label || ''
                  return (
                    <button key={w.id} onClick={() => selectWord(w)}
                      className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-all border-b border-slate-50
                        ${isSelected ? 'bg-blue-50/60 border-l-[3px] border-l-blue-500' : 'hover:bg-slate-50/50 border-l-[3px] border-l-transparent'}`}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[13px] font-semibold truncate ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>{w.text}</span>
                          <span className="text-[9px] font-medium px-1 py-0.5 rounded border" style={{ backgroundColor: ERROR_TYPE_META[w.mainErrorType]?.bgColor, color: ERROR_TYPE_META[w.mainErrorType]?.borderColor }}>{mainLabel}</span>
                          <span className={`text-[9px] font-medium px-1 py-0.5 rounded border shrink-0 ${sevStyle.bg} ${sevStyle.text} ${sevStyle.border}`}>{sev}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-400">
                          <span>得分率 {w.scoreRate}%</span><span className="text-slate-300">|</span><span>{w.affectedStudentCount}人</span>
                          {w.errorCount && <><span className="text-slate-300">|</span><span>{w.errorCount}次</span></>}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right: Detail */}
            <div className="lg:w-[50%] flex flex-col bg-slate-50/30">
              {selectedWord ? (
                <>
                  <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    <div>
                      <h4 className="text-base font-bold text-slate-800">{selectedWord.text}</h4>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded border"
                          style={{ backgroundColor: ERROR_TYPE_META[selectedWord.mainErrorType]?.bgColor, color: ERROR_TYPE_META[selectedWord.mainErrorType]?.borderColor, borderColor: ERROR_TYPE_META[selectedWord.mainErrorType]?.borderColor + '40' }}>
                          主归因：{ERROR_TYPE_META[selectedWord.mainErrorType]?.label}
                        </span>
                        {selectedWord.issueTypes && selectedWord.issueTypes.filter(t => t !== selectedWord.mainErrorType).map(t => (
                          <span key={t} className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">关联：{ERROR_TYPE_META[t]?.label}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                        <span>得分率 <strong className="text-slate-700">{selectedWord.scoreRate}%</strong></span><span className="text-slate-300">|</span>
                        <span>{selectedWord.affectedStudentCount} 人受影响</span>
                        {selectedWord.errorCount && <><span className="text-slate-300">|</span><span>{selectedWord.errorCount} 次错误</span></>}
                        {selectedWord.source && <><span className="text-slate-300">|</span><span>来源：{selectedWord.source}</span></>}
                      </div>
                    </div>

                    <div className="bg-blue-50/50 rounded-xl px-4 py-2.5 text-[12px] text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-700">主因分析：</span>{selectedWord.aiReason}
                    </div>

                    {selectedWord.wrongForms && selectedWord.wrongForms.length > 0 && (
                      <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">常见错误写法</p>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                          <table className="w-full text-[11px]">
                            <thead><tr className="bg-slate-50"><th className="text-left px-3 py-1.5 font-medium text-slate-500">错误写法</th><th className="text-center px-3 py-1.5 font-medium text-slate-500">涉及学生</th><th className="text-center px-3 py-1.5 font-medium text-slate-500">出现次数</th></tr></thead>
                            <tbody className="divide-y divide-slate-100">
                              {selectedWord.wrongForms.map((wf, i) => (<tr key={i} className="bg-white"><td className="px-3 py-1.5 font-medium text-red-500">{wf.text}</td><td className="px-3 py-1.5 text-center text-slate-600">{wf.students}人</td><td className="px-3 py-1.5 text-center text-slate-600">{wf.count}次</td></tr>))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {selectedWord.evidences && selectedWord.evidences.length > 0 && (
                      <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">学生作答示例</p>
                        <div className="space-y-1">
                          {(showAllEvidences ? selectedWord.evidences : selectedWord.evidences.slice(0, 2)).map((ev, i) => (
                            <div key={i} className="bg-white border border-slate-100 rounded-lg px-3 py-2 text-[11px] space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-slate-700">{ev.studentName}</span>
                                <span className="text-slate-400">{ev.source}{ev.date ? ` · ${ev.date}` : ''}</span>
                              </div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-red-500 bg-red-50 px-1.5 py-0.5 rounded font-medium">{ev.wrongAnswer}</span>
                                <span className="text-slate-300">→</span>
                                <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">{ev.correctAnswer}</span>
                                {ev.questionType && <span className="text-[10px] text-slate-400">{ev.questionType}</span>}
                                {ev.questionId && (
                                  <button onClick={() => handleMockAction('查看原题')} className="text-[10px] text-blue-500 hover:text-blue-600 font-medium">查看原题</button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        {selectedWord.evidences.length > 2 && (
                          <button onClick={() => setShowAllEvidences(!showAllEvidences)} className="text-[11px] text-blue-500 hover:text-blue-600 mt-1.5 font-medium flex items-center gap-0.5">
                            {showAllEvidences ? '收起' : `查看更多（共 ${selectedWord.evidences.length} 条）`}
                            {showAllEvidences ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-xs text-slate-400">选择一个高频错词查看详情</div>
              )}
            </div>
          </div>
        </div>

        {/* ===== Students + Intervention ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <StudentInsightSection
            weakStudents={data.weakStudents} goodStudents={data.goodStudents}
            selectedIds={new Set()} showAllWeak={false} expandedStudentId={expandedStudentId}
            onToggleShowAllWeak={() => {}} onToggleStudent={() => {}}
            onExpandStudent={id => setExpandedStudentId(expandedStudentId === id ? null : id)}
            onMockAction={handleMockAction} onReviewPlan={() => setShowReviewPlan(true)}
          />
          <InterventionRecordSection records={MOCK_INTERVENTION_RECORDS} />
        </div>

        {showReviewPlan && (
          <ReviewPlanWizard
            onClose={() => setShowReviewPlan(false)}
            entrySource={planEntrySource}
            draftWordCount={planEntrySource === 'draftBasket' ? draftSelectedWordIds.length : vocabDraftBasket.length}
            draftWordIds={draftSelectedWordIds}
            onPublish={() => {
              if (planEntrySource === 'draftBasket' && draftSelectedWordIds.length > 0) {
                removeVocabDrafts(draftSelectedWordIds)
                setDraftSelectedWordIds([])
                // Success is shown in a dedicated modal — no toast needed
              }
            }}
          />
        )}
        {toast && <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[300] bg-slate-800 text-white text-sm px-5 py-2.5 rounded-xl shadow-lg">{toast}</div>}
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import type { VocabularyInsightData, TimeRange, VocabularyErrorType, WeakWordItem } from '../ai/insights/vocabularyInsightTypes'
import { MOCK_VOCABULARY_INSIGHT, MOCK_INTERVENTION_RECORDS } from '../ai/insights/mockVocabularyInsight'
import { ERROR_TYPE_META, SEVERITY_STYLES, calcSeverity } from '../ai/insights/vocabularyInsightTypes'
import { filterVocabularyItems } from '../ai/insights/vocabularyDataFilter'
import { useAIStore } from '../ai/store'
import VocabularyInsightHeader from '../ai/components/vocabulary-insight/VocabularyInsightHeader'
import ErrorTypeInsightSection from '../ai/components/vocabulary-insight/ErrorTypeInsightSection'
import StudentInsightSection from '../ai/components/vocabulary-insight/StudentInsightSection'
import InterventionRecordSection from '../ai/components/vocabulary-insight/InterventionRecordSection'
import ReviewPlanWizard from '../ai/components/vocabulary-insight/ReviewPlanWizard'
import DraftBasketPanel from '../ai/components/vocabulary-insight/DraftBasketPanel'
import { Lightbulb, FileText, Pencil, Zap, ChevronDown, ChevronRight, Check, ShoppingBag } from 'lucide-react'

export default function VocabularyInsightPage() {
  const [data, setData] = useState<VocabularyInsightData>(MOCK_VOCABULARY_INSIGHT)
  const [timeRange, setTimeRange] = useState<TimeRange>('7d')
  const [selectedErrorType, setSelectedErrorType] = useState<VocabularyErrorType | null>(null)
  const [selectedWord, setSelectedWord] = useState<WeakWordItem | null>(null)
  const [showAllEvidences, setShowAllEvidences] = useState(false)
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null)
  const [showReviewPlan, setShowReviewPlan] = useState(false)
  const [planEntrySource, setPlanEntrySource] = useState<'insight' | 'draftBasket'>('insight')
  const [showDictationPreview, setShowDictationPreview] = useState(false)
  const [showDraftPanel, setShowDraftPanel] = useState(false)
  const [draftSelectedWordIds, setDraftSelectedWordIds] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)

  // Draft basket from store
  const vocabDraftBasket = useAIStore(s => s.vocabDraftBasket)
  const addToVocabDraft = useAIStore(s => s.addToVocabDraft)
  const removeFromVocabDraft = useAIStore(s => s.removeFromVocabDraft)
  const removeVocabDrafts = useAIStore(s => s.removeVocabDrafts)
  const clearVocabDraft = useAIStore(s => s.clearVocabDraft)
  const teacherContext = useAIStore(s => s.teacherContext)

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500) }

  const filteredWeakWords = filterVocabularyItems(data.weakWords).sort((a, b) => a.scoreRate - b.scoreRate)
  const displayWords = selectedErrorType
    ? filteredWeakWords.filter(w => w.mainErrorType === selectedErrorType || (w.issueTypes && w.issueTypes.includes(selectedErrorType)))
    : filteredWeakWords

  useEffect(() => { if (!selectedWord && displayWords.length > 0) { setSelectedWord(displayWords[0]); setShowAllEvidences(false) } }, [selectedErrorType])
  const selectWord = (w: WeakWordItem) => { setSelectedWord(w); setShowAllEvidences(false) }

  const handleErrorTypeClick = (type: VocabularyErrorType) => setSelectedErrorType(prev => prev === type ? null : type)

  const handleMockAction = (action: string) => {
    const msgs: Record<string, string> = {
      '生成复习方案': '已打开词汇复习方案向导',
      '生成默写单': '正在生成默写单...', '加入默写单': '已加入默写单草稿',
      '加入复习方案': '已加入复习草稿篮',
      '加入复习草稿篮': '已加入复习草稿篮',
      '发起课后PK': '已发起课后PK',
      '查看错词': '已展开该学生的错词列表', '布置个性化练习': '已为该学生生成个性化词汇练习',
      '查看原题': '已打开原题弹窗',
    }
    showToast(msgs[action] || `已打开：${action}`)
  }

  // Add word to draft basket
  const addWordToDraft = (w: WeakWordItem, sourceTag: string) => {
    addToVocabDraft({
      wordId: w.id,
      wordText: w.text,
      mainType: ERROR_TYPE_META[w.mainErrorType]?.label || '不会写',
      sourceTags: [sourceTag],
      affectedStudentCount: w.affectedStudentCount,
      classId: teacherContext.className,
      scoreRate: w.scoreRate,
    })
    showToast(`「${w.text}」已加入复习草稿篮`)
  }

  // Check if word is in draft basket
  const isWordInDraft = (wordId: string) => vocabDraftBasket.some(i => i.wordId === wordId)

  // Dictation words: mainErrorType === 'spelling', priority high/extreme
  const dictationWords = filteredWeakWords.filter(w => w.mainErrorType === 'spelling' && (w.severity === '极高' || w.severity === '高'))

  const m = data.metrics
  const parts = data.summary.split(/[。.]/).filter(Boolean)

  // Days until the earliest draft item expires
  const earliestExpiry = vocabDraftBasket.length > 0
    ? Math.min(...vocabDraftBasket.map(i => i.expireAt))
    : 0
  const daysUntilExpiry = vocabDraftBasket.length > 0
    ? Math.ceil((earliestExpiry - Date.now()) / (24 * 60 * 60 * 1000))
    : 7

  return (
    <div className="flex justify-center px-6">
      <div className="flex-1 w-full py-5 space-y-5 max-w-[1400px]">

        {/* ===== SECTION 1: 诊断总览区 ===== */}
        <div>
          <VocabularyInsightHeader timeRange={timeRange} onTimeRangeChange={(r) => { setTimeRange(r); setData({ ...data, timeRange: r }) }} className={data.className} updatedAt={data.updatedAt} />

          <div className="mt-4 bg-white rounded-2xl border border-[#e8eef4] shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-5 lg:border-r border-[#f0f4f8]">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5"><Lightbulb size={13} className="text-amber-500" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] text-slate-800 leading-relaxed font-bold">{parts[0]}。</p>
                    {parts.length > 1 && <p className="text-[13px] text-slate-500 leading-relaxed mt-1.5">{parts.slice(1).join('。')}。</p>}
                    <div className="flex items-center gap-3 mt-3 flex-wrap text-xs text-slate-500">
                      <span>已练词汇 <strong className="text-slate-800">{m.practicedWordCount}</strong></span><span className="text-slate-300">|</span>
                      <span>高频错词 <strong className="text-amber-600">{m.weakWordCount}</strong></span><span className="text-slate-300">|</span>
                      <span>薄弱学生 <strong className="text-amber-600">{m.weakStudentCount}</strong></span><span className="text-slate-300">|</span>
                      <span>主要问题 <strong className="text-slate-800">{m.mainWeakType}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-[300px] shrink-0 p-5 bg-gradient-to-b from-blue-50/40 to-white">
                <p className="text-sm font-semibold text-slate-800 mb-1">推荐干预动作</p>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">覆盖高频错误词和薄弱学生，预计10–15分钟</p>
                <div className="space-y-2">
                  <button onClick={() => { setPlanEntrySource('insight'); setShowReviewPlan(true) }} className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 shadow-sm shadow-blue-200 transition-all"><FileText size={12} />生成复习方案</button>
                  <div className="flex gap-1.5">
                    <button onClick={() => setShowDictationPreview(true)} className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-white text-[11px] font-medium text-slate-500 border border-[#e8eef4] hover:border-blue-300 hover:text-blue-600 transition-all"><Pencil size={11} />生成默写单</button>
                    <button onClick={() => handleMockAction('发起课后PK')} className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-white text-[11px] font-medium text-slate-500 border border-[#e8eef4] hover:border-blue-300 hover:text-blue-600 transition-all"><Zap size={11} />课后PK</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Draft Basket Bar ===== */}
        {vocabDraftBasket.length > 0 && (
          <div className={`rounded-xl border px-4 py-2.5 flex items-center justify-between ${daysUntilExpiry <= 1 ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'}`}>
            <span className="text-xs text-slate-700 font-medium">
              复习草稿 <strong>{vocabDraftBasket.length}</strong> 个词
              <span className="text-slate-400 ml-1.5">还将保留 {daysUntilExpiry} 天</span>
              {daysUntilExpiry <= 1 && <span className="text-amber-600 ml-1.5">（明天将自动清空，建议及时生成复习方案）</span>}
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowDraftPanel(true)} className="text-xs px-3 py-1 rounded-lg font-medium text-blue-600 bg-white border border-blue-200 hover:bg-blue-100 transition-all">查看词表</button>
              <button onClick={() => { setDraftSelectedWordIds(vocabDraftBasket.map(i => i.wordId)); setPlanEntrySource('draftBasket'); setShowReviewPlan(true) }} className="text-xs px-3 py-1 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all">用草稿生成方案</button>
              <button onClick={() => { if (confirm(`确定清空当前班级的 ${vocabDraftBasket.length} 个复习草稿词吗？`)) clearVocabDraft() }} className="text-xs text-slate-400 hover:text-red-500 transition-colors">清空</button>
            </div>
          </div>
        )}

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
                  const inDraft = isWordInDraft(w.id)
                  return (
                    <button key={w.id} onClick={() => selectWord(w)}
                      className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-all border-b border-slate-50
                        ${isSelected ? 'bg-blue-50/60 border-l-[3px] border-l-blue-500' : 'hover:bg-slate-50/50 border-l-[3px] border-l-transparent'}`}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[13px] font-semibold truncate ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>{w.text}</span>
                          <span className="text-[9px] font-medium px-1 py-0.5 rounded border" style={{ backgroundColor: ERROR_TYPE_META[w.mainErrorType]?.bgColor, color: ERROR_TYPE_META[w.mainErrorType]?.borderColor }}>{mainLabel}</span>
                          <span className={`text-[9px] font-medium px-1 py-0.5 rounded border shrink-0 ${sevStyle.bg} ${sevStyle.text} ${sevStyle.border}`}>{sev}</span>
                          {inDraft && <Check size={10} className="text-emerald-500" />}
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
                        {isWordInDraft(selectedWord.id) && (
                          <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-medium"><Check size={9} className="inline mr-0.5" />已在草稿篮</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400">
                        <span>得分率 <strong className="text-slate-700">{selectedWord.scoreRate}%</strong></span><span className="text-slate-300">|</span>
                        <span>{selectedWord.affectedStudentCount} 人受影响</span>
                        {selectedWord.errorCount && <><span className="text-slate-300">|</span><span>{selectedWord.errorCount} 次错误</span></>}
                        {selectedWord.source && <><span className="text-slate-300">|</span><span>来源：{selectedWord.source}</span></>}
                      </div>
                    </div>

                    <div className="bg-blue-50/50 rounded-xl px-4 py-2.5 text-[12px] text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-700">归因分析：</span>{selectedWord.aiReason}
                    </div>

                    {selectedWord.wrongForms && selectedWord.wrongForms.length > 0 && (
                      <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">典型错误形式</p>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                          <table className="w-full text-[11px]">
                            <thead><tr className="bg-slate-50"><th className="text-left px-3 py-1.5 font-medium text-slate-500">错误写法</th><th className="text-center px-3 py-1.5 font-medium text-slate-500">人数</th><th className="text-center px-3 py-1.5 font-medium text-slate-500">次数</th></tr></thead>
                            <tbody className="divide-y divide-slate-100">
                              {selectedWord.wrongForms.map((wf, i) => (<tr key={i} className="bg-white"><td className="px-3 py-1.5 font-medium text-red-500">{wf.text}</td><td className="px-3 py-1.5 text-center text-slate-600">{wf.students}人</td><td className="px-3 py-1.5 text-center text-slate-600">{wf.count}次</td></tr>))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {selectedWord.evidences && selectedWord.evidences.length > 0 && (
                      <div>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">典型作答证据</p>
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
                            {showAllEvidences ? '收起证据' : `查看更多证据（共 ${selectedWord.evidences.length} 条）`}
                            {showAllEvidences ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 px-5 py-3 border-t border-slate-200 bg-white/80 backdrop-blur-sm flex items-center gap-2">
                    {selectedWord.mainErrorType === 'spelling' || (selectedWord.issueTypes && selectedWord.issueTypes.includes('spelling')) ? (
                      <button onClick={() => handleMockAction('加入默写单')} className="text-xs px-3 py-1.5 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 shadow-sm transition-all">加入默写单</button>
                    ) : null}
                    {selectedWord.mainErrorType === 'pronunciation' ? (
                      <button onClick={() => handleMockAction('发起课后PK')} className="text-xs px-3 py-1.5 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 shadow-sm transition-all">发起课后PK</button>
                    ) : null}
                    <button onClick={() => addWordToDraft(selectedWord, '高频错词')}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all
                        ${isWordInDraft(selectedWord.id) ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-white text-slate-500 border-[#e8eef4] hover:border-blue-300 hover:text-blue-600'}`}>
                      {isWordInDraft(selectedWord.id) ? <span className="flex items-center gap-1"><Check size={10} />已在草稿篮</span> : '加入复习草稿篮'}
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-xs text-slate-400">选择一个高频错词查看详情</div>
              )}
            </div>
          </div>
        </div>

        {/* ===== Dictation Preview Modal ===== */}
        {showDictationPreview && (
          <div className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-[480px] overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-800">生成默写单</h3>
                <button onClick={() => setShowDictationPreview(false)} className="p-1 text-slate-400 hover:text-slate-600">✕</button>
              </div>
              <div className="p-6 space-y-4">
                <div className="text-sm text-slate-700">默认范围：主归因为「不会写」的高频错词，优先极高/高严重程度。</div>
                <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-slate-400">覆盖词汇</span><span className="font-semibold text-slate-700">{dictationWords.length} 个（默认前20个）</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">预计时长</span><span className="font-semibold text-slate-700">10–15 分钟</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">对象</span><span className="font-semibold text-slate-700">全班</span></div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {dictationWords.slice(0, 8).map(w => (<span key={w.id} className="text-[10px] bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-600">{w.text}</span>))}
                    {dictationWords.length > 8 && <span className="text-[10px] text-slate-400">...等</span>}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button onClick={() => { handleMockAction('生成默写单'); setShowDictationPreview(false) }} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all">确认生成</button>
                  <button onClick={() => setShowDictationPreview(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 border border-slate-200 hover:bg-slate-50">取消</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== Error Types ===== */}
        <ErrorTypeInsightSection errorTypes={data.errorTypes} />

        {/* ===== Students + Intervention ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <StudentInsightSection
            weakStudents={data.weakStudents} goodStudents={data.goodStudents}
            selectedIds={new Set()} showAllWeak={false} expandedStudentId={expandedStudentId}
            onToggleShowAllWeak={() => {}} onToggleStudent={() => {}}
            onExpandStudent={id => setExpandedStudentId(expandedStudentId === id ? null : id)}
            onMockAction={handleMockAction} onReviewPlan={() => setShowReviewPlan(true)}
            onAddWordToDraft={(wordText, wordId) => {
              const w = data.weakWords.find(ww => ww.id === wordId || ww.text === wordText)
              if (w) addWordToDraft(w, '学生错词')
            }}
          />
          <InterventionRecordSection records={MOCK_INTERVENTION_RECORDS} />
        </div>

        {/* ===== Draft Basket Floating Button ===== */}
        <button
          onClick={() => setShowDraftPanel(true)}
          className={`fixed bottom-6 right-6 z-[150] flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-lg transition-all
            ${vocabDraftBasket.length > 0 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white border border-slate-200 text-slate-500 hover:border-blue-300'}`}
        >
          <ShoppingBag size={15} />
          <span className="text-xs font-semibold">复习草稿篮</span>
          {vocabDraftBasket.length > 0 && (
            <span className="bg-white text-blue-600 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{vocabDraftBasket.length}</span>
          )}
        </button>

        {/* ===== Draft Basket Panel ===== */}
        {showDraftPanel && (
          <DraftBasketPanel
            items={vocabDraftBasket}
            className={teacherContext.className}
            daysUntilExpiry={daysUntilExpiry}
            onClose={() => setShowDraftPanel(false)}
            onRemove={(wordId) => removeFromVocabDraft(wordId)}
            onClear={() => clearVocabDraft()}
            onGeneratePlan={(selectedIds) => { setDraftSelectedWordIds(selectedIds); setShowDraftPanel(false); setPlanEntrySource('draftBasket'); setShowReviewPlan(true) }}
          />
        )}

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
                showToast('复习方案已发布，已使用的草稿词已清空')
              }
            }}
          />
        )}
        {toast && <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[300] bg-slate-800 text-white text-sm px-5 py-2.5 rounded-xl shadow-lg">{toast}</div>}
      </div>
    </div>
  )
}

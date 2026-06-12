import { useState, useMemo } from 'react'
import { X, ChevronRight, Check, Send, ArrowLeft, Sparkles, Target, Calendar, Hash, RefreshCw, Gauge, BookOpen, Repeat, Clock, AlertTriangle } from 'lucide-react'
import type { ReviewGoal, VocabScopeId } from '../../insights/vocabularyInsightTypes'
import { REVIEW_GOAL_META, VOCAB_SCOPE_OPTIONS, EXTENDED_VOCAB_OPTIONS, SYNC_UNITS } from '../../insights/vocabularyInsightTypes'
import { getReviewPlanConfig, getReviewPlanTasks } from '../../insights/mockVocabularyInsight'

interface Props {
  onClose: () => void
  entrySource?: 'insight' | 'draftBasket'
  draftWordCount?: number
  draftWordIds?: string[]
  onPublish?: () => void
}

type ErrorWordRange = '7d' | '14d' | '30d' | 'semester' | 'custom'

const ERROR_WORD_RANGE_OPTIONS: { value: ErrorWordRange; label: string; desc: string }[] = [
  { value: '7d',       label: '近 7 天',  desc: '最近一周的错词' },
  { value: '14d',      label: '近 14 天', desc: '最近两周的错词' },
  { value: '30d',      label: '近 30 天', desc: '最近一个月的错词' },
  { value: 'semester', label: '本学期',   desc: '本学期至今的错词' },
  { value: 'custom',   label: '自定义',   desc: '自定义起止日期' },
]

const INSIGHT_STEPS = ['选择目标', '设置周期', '设置词量', '生成方案']
const DRAFT_STEPS = ['设置周期', '设置词量', '预览发布']

/** Get default review days based on selected period */
function getDefaultReviewDays(dayCount: number): number[] {
  const days: number[] = []
  for (let d = 1; d <= dayCount; d += 2) days.push(d)
  return days
}

export default function ReviewPlanWizard({ onClose, entrySource = 'insight', draftWordCount = 0, onPublish }: Props) {
  const isDraft = entrySource === 'draftBasket'
  const STEP_LABELS = isDraft ? DRAFT_STEPS : INSIGHT_STEPS
  const hasDraft = draftWordCount > 0
  const defaultDayCount = isDraft ? 5 : (hasDraft ? 5 : 3)
  const defaultWordsPerDay = isDraft
    ? (draftWordCount >= 20 ? 50 : 30)
    : (hasDraft ? (draftWordCount >= 20 ? 50 : 30) : 30)

  // When entering from draft basket, skip step 1 (选择目标) — goal is fixed
  const [step, setStep] = useState(isDraft ? 2 : 1)
  const [goal, setGoal] = useState<ReviewGoal>('quick_fix')
  const [dayCount, setDayCount] = useState(defaultDayCount)
  const [wordsPerDay, setWordsPerDay] = useState(defaultWordsPerDay)
  const [rollbackCount, setRollbackCount] = useState(2)
  const [masteryRule, setMasteryRule] = useState<'consecutive_correct' | 'accumulated_correct' | 'last_test_correct'>('consecutive_correct')

  // Review day selection (draft mode only)
  const [selectedDays, setSelectedDays] = useState<number[]>(() => getDefaultReviewDays(defaultDayCount))

  // Vocab scope — only used when goal === 'custom'
  const [vocabScope, setVocabScope] = useState<VocabScopeId[]>(['error_words'])
  const [errorWordRange, setErrorWordRange] = useState<ErrorWordRange>('30d')
  const [errorWordStartDate, setErrorWordStartDate] = useState('2026-03-01')
  const [errorWordEndDate, setErrorWordEndDate] = useState('2026-06-04')
  const [selectedSyncUnits, setSelectedSyncUnits] = useState<string[]>(['Unit 1', 'Unit 2', 'Unit 3'])
  const [selectedExtendedVocabs, setSelectedExtendedVocabs] = useState<string[]>(['中考必会词汇和短语'])

  // Rolling review under rollback
  const [rollingReview, setRollingReview] = useState(true)

  const [generated, setGenerated] = useState(false)
  const [tasks, setTasks] = useState<any[]>([])

  // Day 1 warning
  const day1Missing = isDraft && selectedDays.length > 0 && !selectedDays.includes(1)
  const sortedSelectedDays = useMemo(() => [...selectedDays].sort((a, b) => a - b), [selectedDays])

  const handleGoalSelect = (g: ReviewGoal) => {
    setGoal(g)
    const meta = REVIEW_GOAL_META[g]
    setDayCount(meta.defaultDays)
    setWordsPerDay(meta.defaultWordCount)
    setStep(2)
  }

  const handleDayCountChange = (d: number) => {
    setDayCount(d)
    setSelectedDays(getDefaultReviewDays(d))
  }

  const toggleDay = (day: number) => {
    setSelectedDays(prev => {
      if (prev.includes(day)) {
        // Don't allow deselecting all days
        if (prev.length <= 1) return prev
        return prev.filter(d => d !== day)
      }
      return [...prev, day].sort((a, b) => a - b)
    })
  }

  const handleGenerate = () => {
    const planTasks = getReviewPlanTasks(goal)
    setTasks(planTasks.map(t => ({ ...t, checked: t.checked })))
    setGenerated(true)
    setStep(4)
  }

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t))
  }

  const toggleVocabScope = (id: VocabScopeId) => {
    setVocabScope(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const toggleSyncUnit = (unit: string) => {
    setSelectedSyncUnits(prev =>
      prev.includes(unit) ? prev.filter(u => u !== unit) : [...prev, unit]
    )
  }

  const toggleExtendedVocab = (item: string) => {
    setSelectedExtendedVocabs(prev =>
      prev.includes(item) ? prev.filter(v => v !== item) : [...prev, item]
    )
  }

  const config = getReviewPlanConfig(goal)

  // Build vocab scope summary text
  const getVocabScopeSummary = () => {
    const parts: string[] = []
    if (vocabScope.includes('error_words')) {
      const rangeLabel = ERROR_WORD_RANGE_OPTIONS.find(o => o.value === errorWordRange)?.label || errorWordRange
      parts.push(errorWordRange === 'custom'
        ? `错词范围：${errorWordStartDate} ~ ${errorWordEndDate}`
        : `错词范围：${rangeLabel}`)
    }
    if (vocabScope.includes('sync_unit')) {
      parts.push(`同步单元：${selectedSyncUnits.join('、')}`)
    }
    if (vocabScope.includes('platform_extended')) {
      parts.push(`拓展词汇：${selectedExtendedVocabs.join('、')}`)
    }
    return parts.length > 0 ? parts.join(' · ') : '未选择'
  }

  // Build review days text
  const reviewDaysText = sortedSelectedDays.map(d => `Day ${d}`).join('、')

  // Number of tasks (one per review day)
  const taskCount = sortedSelectedDays.length

  return (
    <div className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl shadow-slate-900/10 w-[620px] max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-6 py-4 border-b border-slate-100 rounded-t-2xl flex items-center justify-between z-10">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              {generated ? '词汇复习方案' : isDraft ? '从草稿篮生成复习方案' : '制定词汇复习方案'}
            </h3>
            {!generated && (
              <p className="text-xs text-slate-400 mt-0.5">
                {isDraft
                  ? `${STEP_LABELS.length} 步完成 · 已选 ${draftWordCount} 个词 · 周期${dayCount}天 · ${reviewDaysText}`
                  : '4 步生成个性化复习计划'}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Step Indicator */}
          {!generated && (
            <div className="flex items-center gap-0">
              {STEP_LABELS.map((label, idx) => {
                const stepNum = idx + 1
                const isActive = step === stepNum
                const isDone = step > stepNum

                return (
                  <div key={stepNum} className="flex items-center gap-0 flex-1 last:flex-[0_0_auto]">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300
                          ${isDone
                            ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-200'
                            : isActive
                              ? 'bg-blue-500 text-white shadow-sm shadow-blue-200 ring-4 ring-blue-100'
                              : 'bg-slate-100 text-slate-400'}`}
                      >
                        {isDone ? <Check size={14} /> : stepNum}
                      </div>
                      <span
                        className={`text-[10px] font-medium whitespace-nowrap transition-colors duration-200
                          ${isActive ? 'text-blue-500' : isDone ? 'text-emerald-500' : 'text-slate-400'}`}
                      >
                        {label}
                      </span>
                    </div>
                    {stepNum < 4 && (
                      <div className={`flex-1 h-0.5 mx-2 mt-[-12px] rounded-full transition-colors duration-300
                        ${isDone ? 'bg-emerald-300' : 'bg-slate-200'}`} />
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Step 1: Choose Goal — 2 per row (insight mode only) */}
          {step === 1 && !isDraft && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <Target size={16} className="text-blue-500" />
                <p className="text-sm font-semibold text-slate-700">选择复习目标</p>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {(Object.entries(REVIEW_GOAL_META) as [ReviewGoal, any][]).map(([key, meta]) => (
                  <button
                    key={key}
                    onClick={() => handleGoalSelect(key)}
                    className="text-left p-4 rounded-xl border border-slate-200
                      hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-sm
                      transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                        {meta.label}
                      </span>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{meta.desc}</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      建议：{meta.defaultDays} 天 / 每次 {meta.defaultWordCount} 个词
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Period + Review Days (draft mode) */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-500" />
                <p className="text-sm font-semibold text-slate-700">
                  {isDraft ? '设置复习周期与复习日' : '设置复习周期'}
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs text-slate-400 mb-1">
                  {isDraft ? '复习目标' : '已选目标'}
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  {isDraft ? `草稿词复习（${draftWordCount} 个词）` : REVIEW_GOAL_META[goal].label}
                </p>
              </div>

              {/* Period selection */}
              <div>
                <p className="text-xs text-slate-400 mb-2">计划周期</p>
                <div className="flex gap-2">
                  {(isDraft ? [3, 5, 7, 14] : [3, 7, 14, 28]).map(d => (
                    <button
                      key={d}
                      onClick={() => handleDayCountChange(d)}
                      className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                        ${dayCount === d
                          ? 'bg-blue-500 text-white shadow-sm shadow-blue-200'
                          : 'border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-500'}`}
                    >
                      {d} 天
                    </button>
                  ))}
                </div>
              </div>

              {/* Review day checkboxes (draft mode only) */}
              {isDraft && (
                <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-700">复习日选择</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      勾选需要安排复习任务的日期，未勾选的日期不安排新任务，可用于学生补做
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: dayCount }, (_, i) => i + 1).map(day => {
                      const isSelected = selectedDays.includes(day)
                      return (
                        <button
                          key={day}
                          onClick={() => toggleDay(day)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200
                            ${isSelected
                              ? 'bg-blue-500 text-white shadow-sm shadow-blue-200'
                              : 'bg-white border border-slate-200 text-slate-500 hover:border-blue-200 hover:text-blue-500'}`}
                        >
                          Day {day}
                        </button>
                      )
                    })}
                  </div>
                  {/* Day 1 warning */}
                  {day1Missing && (
                    <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                      <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-700">
                        建议保留 Day 1 作为首轮主复习任务，首轮不含回滚题，适合建立初始记忆。
                      </p>
                    </div>
                  )}
                  {/* Selection summary */}
                  <div className="text-xs text-blue-700 font-medium">
                    已选 {selectedDays.length} 个复习日：{reviewDaysText} · 将生成 {selectedDays.length} 份任务
                  </div>
                  {/* Rule hint */}
                  <div className="bg-white/60 rounded-lg px-3 py-2 text-[11px] text-slate-500 space-y-0.5">
                    <p>· 第一个复习日：仅主复习题，无动态回滚题</p>
                    <p>· 第二个及后续复习日：主复习题 + 动态回滚题（回滚题约占总题量 1/5）</p>
                  </div>
                </div>
              )}

              {!isDraft && (
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                  <p className="text-xs text-blue-700 font-medium">
                    默认复习日：Day 1、Day 3、Day 5
                  </p>
                  <p className="text-[11px] text-blue-500 mt-1">
                    Day 2 / Day 4 不安排新任务，可用于学生补做。Day 1 无回滚题，Day 3 和 Day 5 按总题量 1/5 动态生成回滚题。
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(isDraft ? 2 : 1)}
                  disabled={isDraft}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500
                    border border-slate-200 hover:bg-slate-50 transition-colors
                    ${isDraft ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <ArrowLeft size={14} /> 上一步
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-blue-500 text-white
                    hover:bg-blue-600 shadow-sm shadow-blue-200 transition-all duration-200"
                >
                  下一步
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Vocab Scope (custom only) → Words Per Day → Rollback → Mastery */}
          {step === 3 && (
            <div className="space-y-5">
              {/* ── 词汇范围 — only for custom goal, NOT in draft mode ── */}
              {goal === 'custom' && !isDraft && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <BookOpen size={15} className="text-blue-500" />
                    <p className="text-sm font-semibold text-slate-700">词汇范围</p>
                    <span className="text-[11px] text-slate-400">选择本次复习规划的词汇来源（可多选）</span>
                  </div>

                  <div className="space-y-2">
                    {VOCAB_SCOPE_OPTIONS.map(opt => {
                      const isSelected = vocabScope.includes(opt.id)
                      return (
                        <div key={opt.id} className="space-y-2">
                          <button
                            onClick={() => toggleVocabScope(opt.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200
                              ${isSelected
                                ? 'bg-blue-50 border border-blue-200'
                                : 'bg-white border border-slate-200 hover:border-slate-300'}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors
                                ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}>
                                {isSelected && <Check size={10} className="text-white" />}
                              </div>
                              <div>
                                <span className="text-[13px] font-medium text-slate-700">{opt.label}</span>
                                <span className="text-[11px] text-slate-400 ml-2">{opt.desc}</span>
                              </div>
                            </div>
                          </button>

                          {/* Sub-options for 错词范围 */}
                          {isSelected && opt.id === 'error_words' && (
                            <div className="ml-7 p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                              <div className="flex items-center gap-1.5">
                                <Clock size={12} className="text-slate-400" />
                                <p className="text-[11px] text-slate-400">选择错词统计的时间段</p>
                              </div>
                              <div className="flex gap-2">
                                {ERROR_WORD_RANGE_OPTIONS.map(ro => (
                                  <button
                                    key={ro.value}
                                    onClick={() => setErrorWordRange(ro.value)}
                                    className={`flex-1 py-2.5 rounded-xl text-center transition-all duration-200
                                      ${errorWordRange === ro.value
                                        ? 'bg-blue-500 text-white shadow-sm shadow-blue-200'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-500'}`}
                                  >
                                    <span className="text-xs font-semibold">{ro.label}</span>
                                  </button>
                                ))}
                              </div>
                              {/* Custom date range */}
                              {errorWordRange === 'custom' && (
                                <div className="flex items-center gap-3 pt-1">
                                  <div className="flex-1">
                                    <p className="text-[10px] text-slate-400 mb-1">开始日期</p>
                                    <input
                                      type="date"
                                      value={errorWordStartDate}
                                      onChange={e => setErrorWordStartDate(e.target.value)}
                                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white
                                        text-slate-700 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                                    />
                                  </div>
                                  <span className="text-xs text-slate-400 mt-4">至</span>
                                  <div className="flex-1">
                                    <p className="text-[10px] text-slate-400 mb-1">结束日期</p>
                                    <input
                                      type="date"
                                      value={errorWordEndDate}
                                      onChange={e => setErrorWordEndDate(e.target.value)}
                                      className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white
                                        text-slate-700 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Sub-options for 同步单元词汇 */}
                          {isSelected && opt.id === 'sync_unit' && (
                            <div className="ml-7 p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2.5">
                              <p className="text-[11px] text-slate-400">选择要复习的教学单元</p>
                              <div className="grid grid-cols-4 gap-2">
                                {SYNC_UNITS.map(unit => {
                                  const checked = selectedSyncUnits.includes(unit)
                                  return (
                                    <button
                                      key={unit}
                                      onClick={() => toggleSyncUnit(unit)}
                                      className={`py-2.5 rounded-xl text-xs font-medium text-center transition-all duration-150
                                        ${checked
                                          ? 'bg-blue-500 text-white shadow-sm shadow-blue-200'
                                          : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-500'}`}
                                    >
                                      {unit}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          )}

                          {/* Sub-options for 拓展词汇 */}
                          {isSelected && opt.id === 'platform_extended' && (
                            <div className="ml-7 p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                              <p className="text-[11px] text-slate-400">选择拓展词汇专题</p>
                              {EXTENDED_VOCAB_OPTIONS.map(item => {
                                const checked = selectedExtendedVocabs.includes(item)
                                return (
                                  <button
                                    key={item}
                                    onClick={() => toggleExtendedVocab(item)}
                                    className={`w-full text-left flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all duration-150
                                      ${checked
                                        ? 'bg-blue-50 border border-blue-200'
                                        : 'bg-white border border-slate-200 hover:border-slate-300'}`}
                                  >
                                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors
                                      ${checked ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}>
                                      {checked && <Check size={10} className="text-white" />}
                                    </div>
                                    <span className="text-xs text-slate-700">{item}</span>
                                  </button>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  {vocabScope.length === 0 && (
                    <p className="text-[11px] text-red-400">请至少选择一个词汇范围</p>
                  )}
                </div>
              )}

              {/* ── 每次词量 / 每日题量 ── */}
              <div className={`${goal === 'custom' ? 'pt-3 border-t border-slate-100' : ''}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Hash size={16} className="text-blue-500" />
                  <p className="text-sm font-semibold text-slate-700">
                    {isDraft ? '设置每日题量' : '设置每次词量'}
                  </p>
                  {isDraft && <span className="text-[11px] text-slate-400">
                    {draftWordCount < 20 ? '草稿词不足20个，默认30题/日' : '草稿词≥20个，默认50题/日'}
                  </span>}
                </div>
                <div className="flex gap-2">
                  {(isDraft ? [20, 30, 50, 100] : [20, 50, 100, 200]).map(w => (
                    <button
                      key={w}
                      onClick={() => setWordsPerDay(w)}
                      className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                        ${wordsPerDay === w
                          ? 'bg-blue-500 text-white shadow-sm shadow-blue-200'
                          : 'border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-500'}`}
                    >
                      {w} {isDraft ? '题' : '个'}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── 回滚规则 ── */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <RefreshCw size={15} className="text-blue-500" />
                  <p className="text-sm font-semibold text-slate-700">
                    {isDraft ? '动态回滚' : '词汇回滚次数'}
                  </p>
                  {!isDraft && <span className="text-[11px] text-slate-400">错词在后续练习中重复出现的次数</span>}
                </div>
                {isDraft ? (
                  <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100 space-y-1.5">
                    <p className="text-xs text-slate-700 font-medium">动态回滚：已开启</p>
                    {sortedSelectedDays.map((day, idx) => (
                      <p key={day} className="text-xs text-slate-600">
                        · Day {day}{idx === 0 ? ' 无回滚题（首轮复习）' : ` 按总题量 1/5 动态生成回滚题（约 ${Math.ceil(wordsPerDay / 5)} 题）`}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 1, label: '回滚 1 次', desc: '仅复现一轮' },
                      { value: 2, label: '回滚 2 次', desc: '两轮持续巩固' },
                      { value: 3, label: '回滚 3 次', desc: '三轮强化记忆' },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setRollbackCount(opt.value as 1 | 2 | 3)}
                        className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-center transition-all duration-200
                          ${rollbackCount === opt.value
                            ? 'bg-blue-500 text-white shadow-sm shadow-blue-200'
                            : 'border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-500'}`}
                      >
                        <span className="text-sm font-semibold">{opt.label}</span>
                        <span className={`text-[11px] ${rollbackCount === opt.value ? 'text-white/70' : 'text-slate-400'}`}>{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* 错词滚动复现 — supplementary under rollback */}
                <div className="flex items-start gap-3 bg-slate-50 rounded-xl px-4 py-3">
                  <button
                    onClick={() => setRollingReview(!rollingReview)}
                    className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors
                      ${rollingReview ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}
                  >
                    {rollingReview && <Check size={10} className="text-white" />}
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <Repeat size={13} className="text-blue-500" />
                      <span className="text-[13px] font-medium text-slate-700">错词滚动复现</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      开启后，前一天的练习中产生的错词会自动汇入到第二天的练习中，形成滚动式强化记忆
                    </p>
                  </div>
                </div>
              </div>

              {/* ── 掌握判定规则 ── */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Gauge size={15} className="text-blue-500" />
                  <p className="text-sm font-semibold text-slate-700">掌握判定规则</p>
                  {!isDraft && <span className="text-[11px] text-slate-400">当学生满足此条件时，将该词标记为"已掌握"</span>}
                </div>
                {isDraft ? (
                  <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                    <p className="text-xs text-slate-700">
                      固定规则：<span className="font-semibold">连续答对 2 次即掌握</span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      草稿篮复习方案默认使用此规则，不可更改。确保学生真正掌握后再移出错词池。
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'consecutive_correct', label: '连续答对', desc: '连续 2 次正确即掌握' },
                      { value: 'accumulated_correct', label: '累计答对', desc: '累计 3 次正确即掌握' },
                      { value: 'last_test_correct', label: '末次答对', desc: '最后一次正确即掌握' },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setMasteryRule(opt.value as typeof masteryRule)}
                        className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-center transition-all duration-200
                          ${masteryRule === opt.value
                            ? 'bg-blue-500 text-white shadow-sm shadow-blue-200'
                            : 'border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-500'}`}
                      >
                        <span className="text-sm font-semibold">{opt.label}</span>
                        <span className={`text-[11px] ${masteryRule === opt.value ? 'text-white/70' : 'text-slate-400'}`}>{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 space-y-2">
                {isDraft && (
                  <>
                    <p className="text-xs text-blue-700 font-semibold leading-relaxed">
                      草稿篮 {draftWordCount} 个词 · {wordsPerDay} 题/复习日 · 周期 {dayCount} 天
                    </p>
                    <p className="text-xs text-blue-500 leading-relaxed">
                      复习日：<span className="font-semibold">{reviewDaysText}</span> · 共生成 <span className="font-semibold">{taskCount} 份任务</span>
                    </p>
                  </>
                )}
                {!isDraft && hasDraft && (
                  <p className="text-xs text-blue-700 font-semibold leading-relaxed">
                    草稿篮：<span className="font-semibold">{draftWordCount} 个词</span> · {' '}
                    默认 {defaultWordsPerDay} 题/日 · Day 1/3/5 复习
                  </p>
                )}
                {!isDraft && (
                  <p className="text-xs text-blue-500 leading-relaxed">
                    共 <span className="font-semibold">{dayCount} 天</span> · {' '}
                    <span className="font-semibold">{wordsPerDay} 词/次</span> · {' '}
                    覆盖面约 <span className="font-semibold">{dayCount * wordsPerDay}</span> 个词位
                  </p>
                )}
                {isDraft && (
                  <p className="text-xs text-blue-500 leading-relaxed">
                    共 <span className="font-semibold">{dayCount} 天</span> · {' '}
                    <span className="font-semibold">{wordsPerDay} 题/复习日</span>
                  </p>
                )}
                {goal === 'custom' && !isDraft && (
                  <p className="text-xs text-blue-500 leading-relaxed">
                    词汇范围：<span className="font-semibold">{getVocabScopeSummary()}</span>
                  </p>
                )}
                {isDraft && (
                  <p className="text-xs text-blue-500 leading-relaxed">
                    词汇范围：<span className="font-semibold">复习草稿篮中的 {draftWordCount} 个词</span>
                  </p>
                )}
                <p className="text-xs text-blue-500 leading-relaxed">
                  {isDraft ? (
                    <>掌握判定：<span className="font-semibold">连续答对 2 次即掌握</span></>
                  ) : (
                    <>回滚 <span className="font-semibold">{rollbackCount} 次</span> · {' '}
                    掌握判定：<span className="font-semibold">连续答对 2 次即掌握</span></>
                  )}
                  {rollingReview && (
                    <> · <span className="font-semibold">错词滚动复现</span></>
                  )}
                </p>
                {isDraft && (
                  <p className="text-[11px] text-blue-400 leading-relaxed mt-1">
                    非复习日不安排新任务 · 发布后仅清空已使用的草稿词
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500
                    border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft size={14} /> 上一步
                </button>
                <button
                  onClick={handleGenerate}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                    bg-gradient-to-r from-blue-500 to-blue-600 text-white
                    hover:from-blue-600 hover:to-blue-700 shadow-sm shadow-blue-200 transition-all duration-200"
                >
                  <Sparkles size={15} /> 生成方案
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Generated Result */}
          {step === 4 && generated && (
            <div className="space-y-5">
              {/* Plan Summary */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-blue-500" />
                  <p className="text-sm font-semibold text-slate-800">方案说明</p>
                </div>
                <div className="space-y-1.5 text-[13px]">
                  <div><span className="text-slate-400">复习目标：</span><span className="font-medium text-slate-700">{isDraft ? '草稿词复习' : hasDraft ? `草稿词复习（${draftWordCount} 个词）` : REVIEW_GOAL_META[goal].label}</span></div>
                  <div><span className="text-slate-400">复习范围：</span><span className="font-medium text-slate-700">{isDraft ? `已选 ${draftWordCount} 个草稿词` : hasDraft ? `复习草稿篮中的 ${draftWordCount} 个词` : config.reviewScope}</span></div>
                  <div><span className="text-slate-400">复习对象：</span><span className="font-medium text-slate-700">{isDraft ? '全班' : config.targetStudents}</span></div>
                  <div><span className="text-slate-400">计划周期：</span><span className="font-medium text-slate-700">{dayCount} 天</span></div>
                  {isDraft && <div><span className="text-slate-400">复习日：</span><span className="font-medium text-slate-700">{reviewDaysText}</span></div>}
                  {isDraft && <div><span className="text-slate-400">共生成：</span><span className="font-medium text-slate-700">{taskCount} 份复习任务</span></div>}
                  <div><span className="text-slate-400">{isDraft ? '每日题量' : '每次词量'}：</span><span className="font-medium text-slate-700">{wordsPerDay} {isDraft ? '题' : '个'}</span></div>
                  {isDraft && sortedSelectedDays.map((day, idx) => {
                    const isFirst = idx === 0
                    const mainQ = isFirst ? wordsPerDay : Math.floor(wordsPerDay * 4 / 5)
                    const rollbackQ = isFirst ? 0 : Math.ceil(wordsPerDay / 5)
                    return (
                      <div key={day}>
                        <span className="text-slate-400">Day {day}：</span>
                        <span className="font-medium text-slate-700">
                          {mainQ} 道主复习题{rollbackQ > 0 ? ` + ${rollbackQ} 道动态回滚题` : ''}
                        </span>
                      </div>
                    )
                  })}
                  {goal === 'custom' && !isDraft && (
                    <div><span className="text-slate-400">词汇范围：</span><span className="font-medium text-slate-700">{getVocabScopeSummary()}</span></div>
                  )}
                  {!isDraft && <div><span className="text-slate-400">分层策略：</span><span className="font-medium text-slate-700">{config.strategy}</span></div>}
                  <div><span className="text-slate-400">掌握判定：</span><span className="font-medium text-slate-700">{isDraft ? '连续答对 2 次算掌握' : masteryRule === 'consecutive_correct' ? '连续答对' : masteryRule === 'accumulated_correct' ? '累计答对' : '末次答对'}</span></div>
                  {rollingReview && <div><span className="text-slate-400">错词复现：</span><span className="font-medium text-emerald-600">已开启（每日错词汇入次日）</span></div>}
                  {isDraft && (
                    <div><span className="text-slate-400">动态回滚：</span><span className="font-medium text-emerald-600">
                      已开启，后续复习日根据上一复习日错误情况自动生成
                    </span></div>
                  )}
                </div>
                <p className="text-xs text-blue-500 italic leading-relaxed pt-1 border-t border-blue-100">
                  💡 {isDraft
                    ? `从草稿篮已选 ${draftWordCount} 个词生成 ${taskCount} 份连续复习任务。${sortedSelectedDays[0] ? `Day ${sortedSelectedDays[0]}` : '首个复习日'}只生成主复习题，后续复习日自动添加动态回滚题。成功发布后将清空已使用的草稿词。`
                    : hasDraft
                      ? `从草稿篮 ${draftWordCount} 个词生成复习计划。Day 1 只生成主复习题，后续复习日自动添加动态回滚题。`
                      : config.aiReason}
                </p>
              </div>

              {/* Task List */}
              {isDraft ? (
                <div className="space-y-2.5">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">连续复习计划 · {dayCount} 天 · {taskCount} 份任务</p>
                  {sortedSelectedDays.map((day, idx) => {
                    const isFirst = idx === 0
                    const isLast = idx === sortedSelectedDays.length - 1
                    const mainQ = isFirst ? wordsPerDay : Math.floor(wordsPerDay * 4 / 5)
                    const rollbackQ = isFirst ? 0 : Math.ceil(wordsPerDay / 5)
                    const prevDay = idx > 0 ? sortedSelectedDays[idx - 1] : null
                    const taskLabel = isFirst ? '主复习任务' : isLast ? '复习收口任务' : '巩固回滚任务'
                    return (
                      <div key={day} className="border border-slate-200 rounded-xl px-4 py-3 bg-white">
                        <p className="text-[13px] font-semibold text-slate-700">Day {day} {taskLabel}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {mainQ} 道主复习题{rollbackQ > 0 ? ` + ${rollbackQ} 道动态回滚题` : ' · 无回滚题'}
                          {rollbackQ > 0 && prevDay && ` · 回滚题将在 Day ${prevDay} 截止后生成`}
                        </p>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="space-y-2.5">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    可布置任务列表 · {tasks.filter((t: any) => t.checked).length}/{tasks.length} 项
                  </p>
                  {tasks.map((t: any) => (
                    <div
                      key={t.id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200
                        ${t.checked ? 'border-slate-200 bg-white' : 'border-slate-100 bg-slate-50/50 opacity-60'}`}
                    >
                      <button
                        onClick={() => toggleTask(t.id)}
                        className="shrink-0"
                      >
                        {t.checked
                          ? <Check size={15} className="text-blue-500" />
                          : <div className="w-[15px] h-[15px] border-2 border-slate-300 rounded-sm" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-slate-700">{t.name}</p>
                        <p className="text-[11px] text-slate-400">
                          {t.contentScope} · {t.scheduledTime} · 截止：{t.deadline}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => { setStep(isDraft ? 2 : 1); setGenerated(false); setTasks([]) }}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 border border-slate-200
                    hover:bg-slate-50 transition-colors"
                >
                  重新制定
                </button>
                <button
                  onClick={() => { if (onPublish) onPublish(); else { alert('已成功发布词汇复习方案！'); onClose() } }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
                    bg-gradient-to-r from-blue-500 to-blue-600 text-white
                    hover:from-blue-600 hover:to-blue-700 shadow-sm shadow-blue-200
                    transition-all duration-200"
                >
                  <Send size={14} /> 确认发布
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

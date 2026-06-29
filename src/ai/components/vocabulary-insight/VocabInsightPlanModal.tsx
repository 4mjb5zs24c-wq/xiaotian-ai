import { useState, useMemo, useEffect } from 'react'
import { X, FileText, Clock, Users, BookOpen, RefreshCw, Send, AlertTriangle, Sparkles, Calendar } from 'lucide-react'
import AssignSuccessModal from './AssignSuccessModal'

interface Props {
  open: boolean
  onClose: () => void
  weakWordCount?: number
  weakStudentCount?: number
  className?: string
  timeRangeLabel?: string
}

const MOCK_WEAK_WORDS = 50
const MOCK_WEAK_STUDENTS = 27

/** SPEC §17.1 词汇提升方案 Loading 文案 */
function buildLoadingSteps(rangeLabel: string): string[] {
  return [
    `正在分析${rangeLabel}错词和学生表现…`,
    '正在匹配练习内容…',
    '正在生成方案…',
  ]
}

/** 按词数动态计算练习份数（PRD §11.2） */
function calcExerciseCount(wordCount: number): number {
  if (wordCount <= 0) return 0
  if (wordCount <= 50) return 1
  if (wordCount <= 100) return 2
  return Math.ceil(wordCount / 50)
}

/** 默认方案开始日期 */
function getDefaultStartDate(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** 格式化日期 */
function fmtDate(d: Date): string {
  return `${d.getMonth() + 1}月${d.getDate()}日`
}

// ── Mock 题型选项 ───────────────────────────────────
const MOCK_QUESTION_TYPES = [
  { key: 'dictation', label: '默写', checked: true },
  { key: 'word_choice', label: '词义选择', checked: true },
  { key: 'context_fill', label: '语境填词', checked: true },
  { key: 'spelling_check', label: '中英检测', checked: true },
  { key: 'sentence_grammar', label: '单句语法填空', checked: false },
]

// ── Mock 平台布置设置默认值（P0-16） ──────────────
const MOCK_ASSIGN_DEFAULTS = {
  allowLateSubmit: true,
  allowRetest: true,
  supportPaper: true,
  paperDefault: true,
}

export default function VocabInsightPlanModal({
  open,
  onClose,
  weakWordCount = MOCK_WEAK_WORDS,
  weakStudentCount = MOCK_WEAK_STUDENTS,
  className = '2023级A18班',
  timeRangeLabel = '近7天',
}: Props) {
  const LOADING_STEPS = useMemo(() => buildLoadingSteps(timeRangeLabel), [timeRangeLabel])
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [published, setPublished] = useState(false)

  // P0-7: 按词数动态计算练习份数
  const exerciseCount = calcExerciseCount(weakWordCount)

  // P0-8: 方案开始时间
  const [planStartDate, setPlanStartDate] = useState(getDefaultStartDate())

  // P0-9: 重新生成调整面板
  const [showRegenPanel, setShowRegenPanel] = useState(false)
  const [questionTypes, setQuestionTypes] = useState(
    MOCK_QUESTION_TYPES.map(qt => ({ ...qt }))
  )
  const [regenExerciseCount, setRegenExerciseCount] = useState(exerciseCount)
  const [regenQuestionCount, setRegenQuestionCount] = useState(50)

  // P0-15: 布置成功弹窗
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  useEffect(() => {
    if (open) {
      setLoading(true)
      setLoadingStep(0)
      setPublished(false)
      setShowRegenPanel(false)
      setPlanStartDate(getDefaultStartDate())
      setQuestionTypes(MOCK_QUESTION_TYPES.map(qt => ({ ...qt })))
      setRegenExerciseCount(exerciseCount)
      setRegenQuestionCount(50)
      let step = 0
      const timer = setInterval(() => {
        step++
        if (step >= LOADING_STEPS.length) {
          clearInterval(timer)
          setTimeout(() => setLoading(false), 300)
        } else {
          setLoadingStep(step)
        }
      }, 500)
      return () => clearInterval(timer)
    }
  }, [open])

  useEffect(() => {
    setRegenExerciseCount(exerciseCount)
  }, [exerciseCount])

  // P0-8: 发布时间基于方案开始时间计算
  const dateRange = useMemo(() => {
    const start = new Date(planStartDate)
    if (isNaN(start.getTime())) {
      const today = new Date()
      const end = new Date(today)
      end.setDate(end.getDate() + 7)
      return { start: fmtDate(today), endFull: `${fmtDate(end)} 23:59`, startDate: today }
    }
    const end = new Date(start)
    end.setDate(end.getDate() + 7)
    return { start: fmtDate(start), endFull: `${fmtDate(end)} 23:59`, startDate: start }
  }, [planStartDate])

  const exerciseDates = useMemo(() => {
    const dates: { publishDate: string; deadlineDate: string }[] = []
    const start = dateRange.startDate
    for (let i = 0; i < exerciseCount; i++) {
      const pubDate = new Date(start)
      pubDate.setDate(pubDate.getDate() + i)
      const deadline = new Date(pubDate)
      deadline.setDate(deadline.getDate() + 1)
      deadline.setHours(23, 59, 0, 0)
      const fmtPub = (d: Date) => i === 0 ? '立即发布' : `${d.getMonth() + 1}月${d.getDate()}日 08:00`
      const fmtDead = (d: Date) => `${d.getMonth() + 1}月${d.getDate()}日 23:59`
      dates.push({
        publishDate: fmtPub(pubDate),
        deadlineDate: fmtDead(deadline),
      })
    }
    return dates
  }, [dateRange.startDate, exerciseCount])

  const handleRegenerate = () => {
    if (!showRegenPanel) {
      setShowRegenPanel(true)
      return
    }
    // 确认重新生成
    setShowRegenPanel(false)
    setLoading(true)
    setLoadingStep(0)
    setPublished(false)
    let step = 0
    const timer = setInterval(() => {
      step++
      if (step >= LOADING_STEPS.length) {
        clearInterval(timer)
        setTimeout(() => setLoading(false), 300)
      } else {
        setLoadingStep(step)
      }
    }, 500)
  }

  const handlePublish = () => {
    setPublished(true)
    setShowSuccessModal(true)
  }

  const toggleQuestionType = (key: string) => {
    setQuestionTypes(prev => prev.map(qt =>
      qt.key === key ? { ...qt, checked: !qt.checked } : qt
    ))
  }

  // P0-7: 高频错词为 0 时不允许生成
  const canGenerate = weakWordCount > 0

  if (!open) return null

  const contentNode = loading ? (
    <div className="p-10 flex flex-col items-center justify-center min-h-[200px]">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm shadow-blue-200 mb-4 animate-pulse">
        <Sparkles size={18} className="text-white" />
      </div>
      <div className="space-y-2 text-center">
        {LOADING_STEPS.map((step, i) => (
          <p key={i} className={`text-xs transition-all duration-300 ${i <= loadingStep ? 'text-slate-600' : 'text-slate-300'}`}>
            {i < loadingStep ? (
              <span className="text-emerald-500 mr-1">✓</span>
            ) : i === loadingStep ? (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5 animate-pulse align-middle" />
            ) : (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-200 mr-1.5 align-middle" />
            )}
            {step}
          </p>
        ))}
      </div>
    </div>
  ) : (
    <div className="p-6 space-y-5">
      {!canGenerate ? (
        /* P0-7: 无数据提示 */
        <div className="bg-amber-50 rounded-xl px-4 py-6 border border-amber-100 text-center">
          <AlertTriangle size={24} className="text-amber-400 mx-auto mb-2" />
          <p className="text-[13px] font-semibold text-amber-700">当前无高频错词数据</p>
          <p className="text-[11px] text-amber-500 mt-1">请先确认时间范围内是否有足够的词汇练习数据，或切换时间范围后再试。</p>
        </div>
      ) : (
        <>
          {/* Scope summary */}
          <div className="bg-blue-50 rounded-xl px-4 py-3 border border-blue-100">
            <div className="flex items-center gap-4 text-[11px] text-slate-600 flex-wrap">
              <span className="flex items-center gap-1"><BookOpen size={10} />覆盖高频错词：{weakWordCount} 个</span>
              <span className="flex items-center gap-1"><Users size={10} />{className}</span>
              <span className="flex items-center gap-1"><Clock size={10} />{dateRange.start} 至 {dateRange.endFull}</span>
              <span className="flex items-center gap-1"><FileText size={10} />共 {exerciseCount} 份练习 · 每份 {regenQuestionCount} 题</span>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg px-3 py-2 border border-amber-100 text-[11px] text-amber-700 flex items-start gap-1.5">
            <AlertTriangle size={12} className="shrink-0 mt-0.5" />
            <span>基于{timeRangeLabel}高频错词（{weakWordCount} 个）和 {weakStudentCount} 名薄弱学生自动生成。词不足时可重复考查，但题型需要有差异。</span>
          </div>

          {/* P0-8: 方案开始时间 */}
          <div>
            <label className="text-[11px] font-medium text-slate-500 mb-2 block">方案开始时间</label>
            <div className="flex items-center gap-2">
              <Calendar size={13} className="text-slate-400" />
              <input type="date" value={planStartDate}
                onChange={e => { setPlanStartDate(e.target.value); setPublished(false) }}
                className="text-[11px] border border-slate-200 rounded-md px-3 py-1.5 text-slate-700 outline-none focus:border-blue-400"
              />
              <span className="text-[10px] text-slate-400">修改后发布时间和截止时间自动重算</span>
            </div>
          </div>

          {/* Exercise cards — P0-7: 动态份数 */}
          <div className="space-y-3">
            {Array.from({ length: exerciseCount }, (_, i) => {
              const n = i + 1
              const dates = exerciseDates[i] || { publishDate: '待定', deadlineDate: '待定' }
              return (
                <div key={n} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-blue-100' : 'bg-purple-100'}`}>
                        <FileText size={15} className={i === 0 ? 'text-blue-500' : 'text-purple-500'} />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-700">词汇闯关 {n}</p>
                        <div className="flex items-center gap-3 mt-0.5 text-[11px] text-slate-400 flex-wrap">
                          <span>发布时间：{dates.publishDate}</span>
                          <span className="text-slate-300">|</span>
                          <span>截止时间：{dates.deadlineDate}</span>
                          <span className="text-slate-300">|</span>
                          <span>题量：{regenQuestionCount} 题</span>
                          {i > 0 && <><span className="text-slate-300">|</span><span>含巩固练习</span></>}
                        </div>
                      </div>
                    </div>
                    {i === 0 && (
                      <span className="text-[10px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded font-medium shrink-0">首发</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* P0-9: 重新生成调整面板 */}
          {showRegenPanel && (
            <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-4 space-y-4">
              <p className="text-[12px] font-semibold text-slate-700">调整生成设置</p>

              {/* 题型选择 */}
              <div>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wide mb-2">不需要的题型（取消勾选）</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {questionTypes.map(qt => (
                    <button key={qt.key} onClick={() => toggleQuestionType(qt.key)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all border
                        ${qt.checked ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-slate-50 text-slate-400 border-slate-200 line-through'}`}
                    >{qt.label}</button>
                  ))}
                </div>
              </div>

              {/* 作业次数 */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide w-20 shrink-0">作业次数</span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <button key={n} onClick={() => setRegenExerciseCount(n)}
                      className={`w-8 h-8 rounded-md text-[11px] font-medium transition-all
                        ${regenExerciseCount === n ? 'bg-blue-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >{n}</button>
                  ))}
                </div>
              </div>

              {/* 每份题量 */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide w-20 shrink-0">每份题量</span>
                <div className="flex items-center gap-1.5">
                  {[30, 40, 50, 60, 80, 100].map(n => (
                    <button key={n} onClick={() => setRegenQuestionCount(n)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all
                        ${regenQuestionCount === n ? 'bg-blue-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >{n}题</button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button onClick={() => setShowRegenPanel(false)}
                  className="px-3 py-1.5 text-[11px] text-slate-500 hover:text-slate-700 mr-2"
                >取消</button>
                <button onClick={handleRegenerate}
                  className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-[11px] font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-all"
                ><RefreshCw size={12} />确认重新生成</button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-[#f0f4f8]">
            <p className="text-[11px] text-slate-400">不满意当前方案？可以重新生成</p>
            <div className="flex items-center gap-2">
              <button onClick={handleRegenerate}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium text-slate-500 border border-slate-200 hover:border-blue-300 hover:text-blue-500 transition-all">
                <RefreshCw size={12} />重新生成
              </button>
              <button onClick={handlePublish}
                disabled={published}
                className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-[11px] font-semibold text-white bg-blue-500 hover:bg-blue-600 shadow-sm disabled:opacity-50 transition-all">
                <Send size={12} />{published ? '已发布' : '确认布置'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )

  return (
    <div className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[640px] max-h-[85vh] flex flex-col">
        <div className="shrink-0 px-6 py-4 border-b border-[#f0f4f8] flex items-start justify-between rounded-t-2xl">
          <div>
            <h2 className="text-base font-bold text-slate-800">{timeRangeLabel}高频错词提升方案</h2>
            <p className="text-xs text-slate-400 mt-0.5">基于本班{timeRangeLabel}高频错词和薄弱学生生成，帮助学生巩固近期易错词汇。</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors shrink-0">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
        {contentNode}
        </div>
      </div>

      {/* P0-15: 布置成功独立弹窗 */}
      <AssignSuccessModal
        open={showSuccessModal}
        onClose={() => { setShowSuccessModal(false); onClose() }}
        planName={`${timeRangeLabel}高频错词提升方案`}
        exerciseCount={exerciseCount}
        className={className}
        publishDates={exerciseDates.map(d => d.publishDate)}
        deadlineDates={exerciseDates.map(d => d.deadlineDate)}
        allowLateSubmit={MOCK_ASSIGN_DEFAULTS.allowLateSubmit}
        allowRetest={MOCK_ASSIGN_DEFAULTS.allowRetest}
        supportPaper={MOCK_ASSIGN_DEFAULTS.supportPaper}
        paperDefault={MOCK_ASSIGN_DEFAULTS.paperDefault}
      />
    </div>
  )
}

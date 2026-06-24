import { useState, useMemo, useCallback } from 'react'
import { X, BookOpen, Users, Clock, FileText, RefreshCw, Send, CheckCircle2, Eye } from 'lucide-react'
import type { PlanType } from './PlanTypeSelector'
import { PLAN_TYPE_META } from './PlanTypeSelector'

// ── Mock data ──────────────────────────────────────────────

const MOCK_TEXTBOOKS = ['人教版', '外研版', '北师大版', '牛津版']

const JUNIOR_VOLUMES: Record<string, string[]> = {
  '初一': ['七年级上册', '七年级下册'],
  '初二': ['八年级上册', '八年级下册'],
  '初三': ['九年级全一册', '九年级上册', '九年级下册'],
}

const SENIOR_VOLUMES: string[] = ['必修一', '必修二', '必修三', '选必一', '选必二', '选必三']

const MOCK_UNITS: string[] = ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6', 'Unit 7', 'Unit 8']

const CURRICULUM_DEFAULT_GRADES = ['初三', '高三']
const EMPTY_CURRICULUM_GRADES = ['高三']

const PLAN_TYPES: PlanType[] = ['weekly_consolidation', 'two_day_consolidation']

// ── Helpers ─────────────────────────────────────────────────

function isSeniorHigh(grade: string): boolean {
  return ['高一', '高二', '高三'].includes(grade)
}

function isJuniorHigh(grade: string): boolean {
  return ['初一', '初二', '初三'].includes(grade)
}

function getDefaultVolume(grade: string): string {
  const map: Record<string, string> = {
    '初一': '七年级上册', '初二': '八年级上册', '初三': '九年级全一册',
    '高一': '必修一', '高二': '选必一', '高三': '必修一',
  }
  return map[grade] || ''
}

function getDefaultSource(grade: string): 'curriculum' | 'textbook' {
  return CURRICULUM_DEFAULT_GRADES.includes(grade) ? 'curriculum' : 'textbook'
}

// ── Component ──────────────────────────────────────────────

interface Props {
  open: boolean
  onClose: () => void
  /** Render inline without modal chrome — used by the full-page fallback */
  embedded?: boolean
}

export default function StageVocabPlanModal({ open, onClose, embedded }: Props) {
  const defaultGrade = '初一'
  const defaultSource = getDefaultSource(defaultGrade)

  const [planType, setPlanType] = useState<PlanType>('weekly_consolidation')
  const [grade, setGrade] = useState(defaultGrade)
  const [reviewSource, setReviewSource] = useState<'curriculum' | 'textbook'>(defaultSource)
  const [textbook, setTextbook] = useState('人教版')
  const [volume, setVolume] = useState(getDefaultVolume(defaultGrade))
  const [unit, setUnit] = useState('')
  const [published, setPublished] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500) }

  const isGrade9or12 = grade === '初三' || grade === '高三'
  const finalReviewSource = isGrade9or12 ? (reviewSource || 'curriculum') : (reviewSource || 'textbook')

  const handleGradeChange = useCallback((g: string) => {
    setGrade(g)
    setPublished(false)
    const src = getDefaultSource(g)
    setReviewSource(src)
    if (src === 'textbook') {
      setVolume(getDefaultVolume(g))
    } else {
      setVolume('')
    }
    setUnit('')
  }, [])

  const availableVolumes = useMemo(() => {
    if (finalReviewSource !== 'textbook') return []
    if (isSeniorHigh(grade)) return SENIOR_VOLUMES
    if (isJuniorHigh(grade)) return JUNIOR_VOLUMES[grade] || []
    return []
  }, [grade, finalReviewSource])

  const hasData = useMemo(() => {
    if (!grade) return false
    if (finalReviewSource === 'curriculum') return !EMPTY_CURRICULUM_GRADES.includes(grade)
    return !!volume
  }, [grade, finalReviewSource, volume])

  const wordCount = 50
  const totalQuestions = 50

  const dateRange = useMemo(() => {
    const today = new Date()
    const endDays = PLAN_TYPE_META[planType].defaultEndDays
    const end = new Date(today)
    end.setDate(end.getDate() + endDays)
    const fmt = (d: Date) => `${d.getMonth() + 1}月${d.getDate()}日`
    return { start: fmt(today), end: fmt(end), endFull: `${fmt(end)} 23:59` }
  }, [planType])

  const handleRegenerate = () => { showToast('已重新生成方案') }
  const handlePublish = () => {
    setPublished(true)
    showToast('方案已发布，可在练习报告中查看')
  }
  const handlePreview = () => { showToast('正在打开试题预览...') }

  const scopeLabel = useMemo(() => {
    if (finalReviewSource === 'curriculum') return `${grade} 课标词复习`
    const vol = volume || '请选择册次'
    const unitPart = unit ? ` · ${unit}` : ''
    return `${textbook} · ${vol}${unitPart}`
  }, [finalReviewSource, grade, textbook, volume, unit])

  const meta = PLAN_TYPE_META[planType]
  const endLabel = planType === 'weekly_consolidation' ? '一周后' : '两天后'

  if (!open) return null

  const headerNode = (
    <div className={embedded ? '' : 'sticky top-0 bg-white z-10 px-6 py-4 border-b border-[#f0f4f8] flex items-start justify-between rounded-t-2xl'}>
      <div className={embedded ? 'px-6 py-4' : ''}>
        <h2 className={embedded ? 'text-lg font-bold text-slate-800 tracking-tight' : 'text-base font-bold text-slate-800'}>
          阶段词汇复习方案
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">适用于期中、期末、高三一轮等复习场景，按年级与复习范围生成阶段词汇复习方案。</p>
      </div>
      {!embedded && (
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors shrink-0">
          <X size={18} />
        </button>
      )}
    </div>
  )

  const bodyNode = (
    <div className={embedded ? 'space-y-5' : 'p-6 space-y-5'}>
          {/* ── Plan Type Switch ── */}
          <div className="bg-white rounded-xl border border-[#e8eef4] p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-medium text-slate-500">方案类型</span>
              <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
                {PLAN_TYPES.map(type => {
                  const tMeta = PLAN_TYPE_META[type]
                  return (
                    <button
                      key={type}
                      onClick={() => setPlanType(type)}
                      className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all duration-200
                        ${planType === type ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {tMeta.label}
                    </button>
                  )
                })}
              </div>
              <span className="text-[11px] text-slate-400 ml-1">{meta.subtitle}</span>
            </div>
            <p className="text-[11px] text-slate-400">{meta.suitableFor}</p>

            {/* Review scope */}
            <div className="mt-4 pt-4 border-t border-[#f0f4f8]">
              <label className="text-[11px] font-medium text-slate-500 mb-2 block">复习范围</label>

              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-[10px] text-slate-400 w-8">年级</span>
                {['初一', '初二', '初三', '高一', '高二', '高三'].map(g => (
                  <button key={g} onClick={() => handleGradeChange(g)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all
                      ${grade === g ? 'bg-blue-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                    {g}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-[10px] text-slate-400 w-8">来源</span>
                <button onClick={() => setReviewSource('curriculum')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all
                    ${finalReviewSource === 'curriculum' ? 'bg-blue-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  课标词复习
                </button>
                <button onClick={() => setReviewSource('textbook')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all
                    ${finalReviewSource === 'textbook' ? 'bg-blue-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  教材复习
                </button>
                {isGrade9or12 && <span className="text-[10px] text-slate-400">初三/高三默认课标词复习</span>}
              </div>

              {finalReviewSource === 'textbook' && (
                <>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] text-slate-400 w-8">教材</span>
                    {MOCK_TEXTBOOKS.map(tb => (
                      <button key={tb} onClick={() => { setTextbook(tb); setVolume(''); setUnit(''); setPublished(false) }}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all
                          ${textbook === tb ? 'bg-blue-500 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`}>
                        {tb}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[10px] text-slate-400 w-8">册次</span>
                    {availableVolumes.map(v => (
                      <button key={v} onClick={() => { setVolume(v); setUnit(''); setPublished(false) }}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all
                          ${volume === v ? 'bg-blue-500 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`}>
                        {v}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] text-slate-400 w-8">单元</span>
                    <span className="text-[10px] text-slate-400">可选，默认整册</span>
                    {MOCK_UNITS.map(u => (
                      <button key={u} onClick={() => { setUnit(prev => prev === u ? '' : u); setPublished(false) }}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all
                          ${unit === u ? 'bg-blue-500 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`}>
                        {u}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Plan Preview ── */}
          {hasData ? (
            <div className="bg-white rounded-xl border border-[#e8eef4] p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-slate-700">{meta.label}</h3>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1"><BookOpen size={10} />{scopeLabel}</span>
                    <span className="flex items-center gap-1"><Users size={10} />全班</span>
                    <span className="flex items-center gap-1"><Clock size={10} />{dateRange.start} 至 {dateRange.endFull}</span>
                    <span className="flex items-center gap-1"><FileText size={10} />方案总题量：{totalQuestions} 题 · 覆盖词汇：{wordCount} 个</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
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

              {/* 2 exercise cards */}
              <div className="space-y-3">
                {[1, 2].map(n => {
                  const isImmediate = n === 1
                  const startTime = isImmediate ? '立即发布' : '次日 08:00'
                  const questionsPer = Math.round(totalQuestions / 2)
                  const wordsPer = wordCount
                  return (
                    <div key={n} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                            <FileText size={15} className="text-blue-500" />
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-slate-700">词汇闯关 {n}</p>
                            <div className="flex items-center gap-3 mt-0.5 text-[11px] text-slate-400 flex-wrap">
                              <span>发布时间：{startTime}</span>
                              <span className="text-slate-300">|</span>
                              <span>截止时间：{endLabel} 23:59</span>
                              <span className="text-slate-300">|</span>
                              <span>题量：{questionsPer} 题</span>
                              <span className="text-slate-300">|</span>
                              <span>覆盖词汇：{wordsPer} 个</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {isImmediate && (
                            <button onClick={handlePreview}
                              className="flex items-center gap-1 text-[11px] text-[#4b9fe8] border border-[#b8d4f0] hover:bg-[#eaf2fb] px-2 py-1 rounded-md font-medium transition-colors">
                              <Eye size={11} />预览试题
                            </button>
                          )}
                          {isImmediate && (
                            <span className="text-[10px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded font-medium shrink-0">首发</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {published && (
                <div className="mt-3 bg-emerald-50 rounded-lg px-3 py-2 border border-emerald-100 text-[11px] text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 size={12} />方案已发布。可在练习报告中查看方案报告。
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#e8eef4] p-10 text-center">
              <FileText size={24} className="text-slate-300 mx-auto mb-3" />
              <p className="text-[13px] text-slate-500 font-medium">当前范围内暂无可用于生成方案的数据</p>
              <p className="text-[11px] text-slate-400 mt-1">请调整年级或复习范围后重试。</p>
            </div>
          )}
        </div>
    )

  const toastNode = toast && (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[12px] px-4 py-2 rounded-lg shadow-lg z-[210]">
      {toast}
    </div>
  )

  if (embedded) {
    return (
      <>
        {bodyNode}
        {toastNode}
      </>
    )
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm flex items-start justify-center pt-[8vh] px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[880px] max-h-[88vh] overflow-y-auto">
        {headerNode}
        {bodyNode}
      </div>
      {toastNode}
    </div>
  )
}

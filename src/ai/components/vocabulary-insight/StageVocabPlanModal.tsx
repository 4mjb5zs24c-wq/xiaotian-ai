import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { X, FileText, RefreshCw, Send, CheckCircle2, Eye, Sparkles, GraduationCap, Calendar, TrendingUp } from 'lucide-react'
import AssignSuccessModal from './AssignSuccessModal'

// ── Teacher stage (mock / dev only) ─────────────────────────
type TeacherStage = 'junior' | 'senior'
const _IS_DEV = typeof import.meta !== 'undefined' && !!(import.meta as any).env?.DEV

// ── Demo test scenarios (demo only, NOT production) ──────────

type DemoScenario = 'current' | 'sept_start' | 'feb_start' | 'senior_spring' | 'weekend_op'

interface DemoScenarioDef {
  key: DemoScenario
  label: string
  mockDate: Date | null  // null = use real current date
  forceStage?: TeacherStage
  forceGrade?: string
}

const DEMO_SCENARIOS: DemoScenarioDef[] = [
  { key: 'current', label: '当前日期', mockDate: null },
  { key: 'sept_start', label: '9月开学', mockDate: new Date('2026-09-08') },
  { key: 'feb_start', label: '2月春季开学', mockDate: new Date('2026-02-24') },
  { key: 'senior_spring', label: '高三1-6月', mockDate: new Date('2026-03-10'), forceStage: 'senior', forceGrade: '高三' },
  { key: 'weekend_op', label: '周末操作', mockDate: new Date('2026-09-12') }, // Saturday
]

const JUNIOR_GRADES = ['初一', '初二', '初三']
const SENIOR_GRADES = ['高一', '高二', '高三']

// ── Mock data ──────────────────────────────────────────────

const JUNIOR_VOLUMES: Record<string, string[]> = {
  '初一': ['七年级上册', '七年级下册'],
  '初二': ['八年级上册', '八年级下册'],
  '初三': ['九年级全一册', '九年级上册', '九年级下册'],
}

const SENIOR_VOLUMES: string[] = ['必修一', '必修二', '必修三', '选必一', '选必二', '选必三']

const MOCK_UNITS: string[] = ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6', 'Unit 7', 'Unit 8']

// ── Practice day presets ───────────────────────────────────

type PracticeDayPreset = 'weekday' | 'weekend' | 'custom'

// ── Mock recommendation config (demo only) ─────────────────
// 当前为 demo mock 推荐规则，正式规则待 DP 提供后替换。
const MOCK_RECOMMENDATION: Record<string, { reviewPeriod: number; practiceDays: PracticeDayPreset; defaultUnits: string[] }> = {
  '初一': { reviewPeriod: 1, practiceDays: 'weekday', defaultUnits: ['Unit 4', 'Unit 5'] },
  '初二': { reviewPeriod: 1, practiceDays: 'weekday', defaultUnits: ['Unit 1', 'Unit 2'] },
  '初三': { reviewPeriod: 2, practiceDays: 'weekday', defaultUnits: [] },
  '高一': { reviewPeriod: 1, practiceDays: 'weekday', defaultUnits: ['Unit 2', 'Unit 3'] },
  '高二': { reviewPeriod: 2, practiceDays: 'weekday', defaultUnits: ['Unit 5'] },
  '高三': { reviewPeriod: 3, practiceDays: 'weekend', defaultUnits: [] },
}

const REVIEW_PERIODS = [
  { value: 1, label: '1周', exercises: 2 },
  { value: 2, label: '2周', exercises: 4 },
  { value: 3, label: '3周', exercises: 6 },
  { value: 4, label: '4周', exercises: 8 },
]

const PRACTICE_DAY_LABELS: PracticeDayPreset[] = ['weekday', 'weekend']

const PRACTICE_DAY_TEXTS: Record<PracticeDayPreset, string> = {
  weekday: '周一至周五',
  weekend: '周六日',
  custom: '自定义',
}

// ── SPEC §16A 版本题型题量表 ─────────────────────────────

type VersionId = 'fun' | 'basic' | 'basic_weekday' | 'advanced' | 'elite'

interface VersionQT {
  version: VersionId
  versionLabel: string
  items: { type: string; count: number; note?: string }[]
}

/** 初中版本题型题量（SPEC §16A.1） */
const JUNIOR_VERSION_QUESTION_TYPES: VersionQT[] = [
  {
    version: 'fun', versionLabel: '趣味版',
    items: [{ type: '词汇混合PK', count: 50 }],
  },
  {
    version: 'basic', versionLabel: '基础版',
    items: [
      { type: '词汇跟读', count: 10 },
      { type: '词汇听写', count: 10 },
      { type: '中英检测', count: 15 },
      { type: '词形变化', count: 15 },
    ],
  },
  {
    version: 'basic_weekday', versionLabel: '基础版（周一至周五）',
    items: [
      { type: '中英检测', count: 25 },
      { type: '词形变化', count: 25 },
    ],
    // 周一至周五的基础版去掉词汇跟读、词汇听写，中英检测+10、词形变化+10
  },
  {
    version: 'advanced', versionLabel: '进阶版',
    items: [
      { type: '中英检测', count: 10 },
      { type: '词形变化', count: 10 },
      { type: '一词多义（选填/单选）', count: 5 },
      { type: '语境填词', count: 10 },
      { type: '单句语法填空', count: 15 },
    ],
  },
  {
    version: 'elite', versionLabel: '培优版',
    items: [
      { type: '一词多义（选填/单选）', count: 5 },
      { type: '语境填词', count: 15 },
      { type: '单句语法填空', count: 20 },
      { type: '补全句子', count: 5 },
      { type: '选词填空', count: 5, note: '1题5空' },
    ],
  },
]

/** 高中版本题型题量（SPEC §16A.2） */
const SENIOR_VERSION_QUESTION_TYPES: VersionQT[] = [
  {
    version: 'fun', versionLabel: '趣味版',
    items: [{ type: '词汇混合PK', count: 50 }],
  },
  {
    version: 'basic', versionLabel: '基础版',
    items: [
      { type: '词汇跟读', count: 15 },
      { type: '词汇听写', count: 15 },
      { type: '中英检测', count: 20 },
    ],
  },
  {
    version: 'basic_weekday', versionLabel: '基础版（周一至周五）',
    items: [
      { type: '中英检测', count: 30 },
      { type: '词形变化', count: 20 },
    ],
    // 周一至周五的基础版去掉词汇跟读、词汇听写，中英检测+10、词形变化+10
  },
  {
    version: 'advanced', versionLabel: '进阶版',
    items: [
      { type: '中英检测', count: 10 },
      { type: '语境选词', count: 10 },
      { type: '一词多义（选填/单选）', count: 5 },
      { type: '词组填空', count: 10, note: '1题10空' },
      { type: '单句语法填空', count: 15 },
    ],
  },
  {
    version: 'elite', versionLabel: '培优版',
    items: [
      { type: '一词多义（选填/单选）', count: 10 },
      { type: '语境填词', count: 20 },
      { type: '单句语法填空', count: 20 },
    ],
  },
]

/** 获取当前可用版本集合（P0-14：高三1-6月只推培优版） */
function getAvailableVersions(grade: string, isWeekday: boolean, _effectiveDate?: Date): VersionQT[] {
  const isSeniorHigh = ['高一', '高二', '高三'].includes(grade)
  const qt = isSeniorHigh ? SENIOR_VERSION_QUESTION_TYPES : JUNIOR_VERSION_QUESTION_TYPES

  // P0-14: 高三1-6月只推送培优版
  if (grade === '高三') {
    const month = (_effectiveDate || new Date()).getMonth() + 1
    if (month >= 1 && month <= 6) {
      return qt.filter(v => v.version === 'elite')
    }
  }

  // P0-13: 周一至周五不生成趣味版
  if (isWeekday) {
    return qt.filter(v => v.version !== 'fun')
  }

  return qt
}

/** 获取当前版本（基于可用版本集合和当前版本索引轮换） */
function getCurrentVersionQT(grade: string, isWeekday: boolean, versionIndex: number, _effectiveDate?: Date): VersionQT {
  const available = getAvailableVersions(grade, isWeekday, _effectiveDate)
  return available[versionIndex % available.length] || JUNIOR_VERSION_QUESTION_TYPES[0]
}

// ── Legacy mock deprecated — replaced by SPEC §16A version tables ──

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

function getIdentifiedGrade(stage: TeacherStage): string {
  return stage === 'junior' ? '初二' : '高二'
}

/** §16F: 方案开始时间默认值 — 由操作日期+练习时间选择共同决定 */
function getDefaultPlanStartDate(practiceDays: PracticeDayPreset, _effectiveDate?: Date): string {
  const today = _effectiveDate ? new Date(_effectiveDate.getTime()) : new Date()
  const dow = today.getDay() // 0=周日, 1=周一…6=周六
  const isWeekday = dow >= 1 && dow <= 5

  const nextSaturday = new Date(today)
  nextSaturday.setDate(today.getDate() + (6 - dow + (dow === 6 ? 7 : 0)) || (dow === 6 ? 1 : 6 - dow))
  // Actually: if today is Mon(1) → 5 days to Sat(6): 6-1=5 ✓
  // if today is Sat(6) → 7 days to next Sat: 6+7-6=7 ✓
  // if today is Sun(0) → 6 days to next Sat: 6-0=6 ✓
  const daysToNextSat = dow === 6 ? 7 : (6 - dow)
  nextSaturday.setDate(today.getDate() + daysToNextSat)

  const nextMonday = new Date(today)
  const daysToNextMon = dow === 0 ? 1 : dow === 1 ? 7 : (8 - dow)
  nextMonday.setDate(today.getDate() + daysToNextMon)

  let target: Date

  if (isWeekday) {
    // 周一至周五操作
    if (practiceDays === 'weekday') {
      // 练习时间 周一至周五 → 当天
      target = new Date(today)
    } else {
      // 练习时间 周六日 → 下一个周六
      target = new Date(nextSaturday)
    }
  } else {
    // 周六日操作
    if (practiceDays === 'weekday') {
      // 练习时间 周一至周五 → 下一个周一
      target = new Date(nextMonday)
    } else {
      // 练习时间 周六日 → 下一个周六
      target = new Date(nextSaturday)
    }
  }

  return `${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, '0')}-${String(target.getDate()).padStart(2, '0')}`
}

function fmtDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
}

function buildUnitSummary(units: string[]): string {
  if (units.length === 0) return ''
  if (units.length <= 3) return units.join('、')
  return `${units.slice(0, 3).join('、')} 等 ${units.length} 个单元`
}

function buildSelectionSummary(volume: string, units: string[]): string {
  if (units.length === 0) return `${volume}整册`
  return `${volume} ${buildUnitSummary(units)}`
}

function buildScopeText(volume: string, units: string[]): string {
  if (units.length === 0) return `${volume}整册`
  return `${volume} ${buildUnitSummary(units)}`
}

// ── Component ──────────────────────────────────────────────

interface Props {
  open: boolean
  onClose: () => void
  /** 首页入口打开时需先走 AI Loading（PRD §17.0、P0-2） */
  showInitialLoading?: boolean
}

type Phase = 'initial_loading' | 'setup' | 'loading' | 'result'

export default function StageVocabPlanModal({ open, onClose, showInitialLoading = false }: Props) {
  const navigate = useNavigate()

  const [phase, setPhase] = useState<Phase>('setup')
  const [teacherStage, setTeacherStage] = useState<TeacherStage>('junior')
  const gradeOptions = teacherStage === 'junior' ? JUNIOR_GRADES : SENIOR_GRADES

  const [grade, setGrade] = useState(() => getIdentifiedGrade(teacherStage))
  const [reviewSource, setReviewSource] = useState<'curriculum' | 'textbook'>('textbook')
  const [volume, setVolume] = useState(() => getDefaultVolume(getIdentifiedGrade(teacherStage)))
  const [units, setUnits] = useState<string[]>(() => {
    const rec = MOCK_RECOMMENDATION[getIdentifiedGrade(teacherStage)]
    return rec?.defaultUnits ?? []
  })
  const [reviewPeriod, setReviewPeriod] = useState(1)
  const [practiceDays, setPracticeDays] = useState<PracticeDayPreset>('weekday')
  const [planStartDate, setPlanStartDate] = useState(() => getDefaultPlanStartDate('weekday'))

  // ── Popover state ──────────────────────────────────────
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [draftVolume, setDraftVolume] = useState(volume)
  const [draftUnits, setDraftUnits] = useState<string[]>(units)
  const popoverRef = useRef<HTMLDivElement>(null)

  // ── Result state ───────────────────────────────────────
  const [published, setPublished] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<{ exercise: number; x: number; y: number } | null>(null)
  const [versionIndex, setVersionIndex] = useState(0)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // ── Demo scenario state (demo only, NOT production) ─────
  const [demoScenario, setDemoScenario] = useState<DemoScenario>('current')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500) }

  // ── Derived ────────────────────────────────────────────
  const finalReviewSource = (grade === '初三' || grade === '高三') ? reviewSource : reviewSource

  const availableVolumes = useMemo(() => {
    if (finalReviewSource !== 'textbook') return []
    if (isSeniorHigh(grade)) return SENIOR_VOLUMES
    if (isJuniorHigh(grade)) return JUNIOR_VOLUMES[grade] || []
    return []
  }, [grade, finalReviewSource])

  const exerciseCount = REVIEW_PERIODS.find(p => p.value === reviewPeriod)?.exercises ?? 2

  const sourceLabel = finalReviewSource === 'curriculum' ? '课标词复习' : '教材复习'
  const periodLabelForResult = useMemo(() => {
    const p = REVIEW_PERIODS.find(x => x.value === reviewPeriod)
    return p ? `${p.value}周` : `${reviewPeriod}周`
  }, [reviewPeriod])
  const practiceLabel = PRACTICE_DAY_TEXTS[practiceDays] || practiceDays

  const selectionSummary = buildSelectionSummary(volume, units)
  const scopeText = buildScopeText(volume, units)

  // ── Grade description (for blue bar) ──────────────────
  const termText = grade

  // ── Exercise publish date calculation ──────────────────
  const exerciseDates = useMemo(() => {
    const dates: { publishDate: string; deadlineDate: string }[] = []
    const startDate = new Date(planStartDate)
    if (isNaN(startDate.getTime())) return dates

    const MAX_SCAN_DAYS = 90
    const availableDays: Date[] = []
    const current = new Date(startDate)

    while (availableDays.length < exerciseCount) {
      const elapsed = Math.floor((current.getTime() - startDate.getTime()) / 86400000)
      if (elapsed > MAX_SCAN_DAYS) break

      const dow = current.getDay()
      const isWeekday = dow >= 1 && dow <= 5
      const isWeekend = dow === 0 || dow === 6

      let include = false
      if (practiceDays === 'weekday') include = isWeekday
      else if (practiceDays === 'weekend') include = isWeekend

      if (include) availableDays.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    for (let i = 0; i < exerciseCount; i++) {
      const pubDate = availableDays[i]
      if (!pubDate) continue
      const deadline = new Date(pubDate)
      deadline.setDate(deadline.getDate() + 1)
      deadline.setHours(23, 59, 0, 0)

      const fmt = (d: Date) => `${d.getMonth() + 1}月${d.getDate()}日`
      dates.push({
        publishDate: i === 0 ? '立即发布' : `${fmt(pubDate)} 08:00`,
        deadlineDate: `${fmt(deadline)} 23:59`,
      })
    }
    return dates
  }, [planStartDate, reviewPeriod, exerciseCount, practiceDays])

  // P0-12: 练习时间变更时联动刷新方案开始时间默认值
  const handlePracticeDaysChange = useCallback((preset: PracticeDayPreset) => {
    setPracticeDays(preset)
    const scenario = DEMO_SCENARIOS.find(s => s.key === demoScenario)
    const effDate = scenario?.mockDate ? new Date(scenario.mockDate.getTime()) : new Date()
    setPlanStartDate(getDefaultPlanStartDate(preset, effDate))
    setPublished(false)
  }, [demoScenario])

  // ── Result summary natural language ────────────────────
  const resultSummaryText = useMemo(() => {
    if (finalReviewSource === 'textbook') {
      return `小天已为${grade}生成一套教材词阶段复习方案，复习范围为${scopeText}，复习周期为${periodLabelForResult}，建议在${practiceLabel}进行练习。方案将从 ${fmtDate(planStartDate)} 开始推送，共包含 ${exerciseCount} 份词汇闯关，每份 50 题。`
    }
    return `小天已为${grade}生成一套课标词阶段复习方案，复习周期为${periodLabelForResult}，建议在${practiceLabel}进行练习。方案将从 ${fmtDate(planStartDate)} 开始推送，共包含 ${exerciseCount} 份词汇闯关，每份 50 题。`
  }, [grade, finalReviewSource, scopeText, periodLabelForResult, practiceLabel, planStartDate, exerciseCount])

  // ── Handlers ───────────────────────────────────────────
  const handleStageChange = useCallback((stage: TeacherStage) => {
    setTeacherStage(stage)
    const newGrade = getIdentifiedGrade(stage)
    const rec = MOCK_RECOMMENDATION[newGrade]
    setGrade(newGrade)
    // P0-11: 初三/高三默认课标词复习，其他年级默认教材复习
    setReviewSource((newGrade === '初三' || newGrade === '高三') ? 'curriculum' : 'textbook')
    setVolume(getDefaultVolume(newGrade))
    setUnits(rec?.defaultUnits ?? [])
    setReviewPeriod(rec?.reviewPeriod ?? 1)
    setPracticeDays(rec?.practiceDays ?? 'weekday')
    setPublished(false)
    setPhase('setup')
    setPopoverOpen(false)
  }, [])

  // ── Demo scenario change handler (demo only, NOT production) ──
  const handleScenarioChange = useCallback((key: DemoScenario) => {
    setDemoScenario(key)
    const scenario = DEMO_SCENARIOS.find(s => s.key === key)
    if (!scenario) return

    const effDate = scenario.mockDate ? new Date(scenario.mockDate.getTime()) : new Date()

    // Apply forced stage if specified, otherwise keep current stage
    const newStage = scenario.forceStage || teacherStage
    if (scenario.forceStage) {
      setTeacherStage(scenario.forceStage)
    }

    // Determine grade: forced or derived from stage
    const newGrade = scenario.forceGrade || getIdentifiedGrade(newStage)
    const rec = MOCK_RECOMMENDATION[newGrade]
    const newPracticeDays = rec?.practiceDays ?? 'weekday'

    setGrade(newGrade)
    // P0-11: 初三/高三默认课标词复习
    setReviewSource((newGrade === '初三' || newGrade === '高三') ? 'curriculum' : 'textbook')
    setVolume(getDefaultVolume(newGrade))
    setUnits(rec?.defaultUnits ?? [])
    setReviewPeriod(rec?.reviewPeriod ?? 1)
    setPracticeDays(newPracticeDays)
    setPlanStartDate(getDefaultPlanStartDate(newPracticeDays, effDate))
    setPublished(false)
    setPhase('setup')
    setPopoverOpen(false)
  }, [teacherStage])

  const handleGradeChange = useCallback((g: string) => {
    const rec = MOCK_RECOMMENDATION[g]
    setGrade(g)
    setPublished(false)
    setPhase('setup')
    // P0-11: 初三/高三默认课标词复习
    setReviewSource((g === '初三' || g === '高三') ? 'curriculum' : 'textbook')
    setVolume(getDefaultVolume(g))
    setUnits(rec?.defaultUnits ?? [])
    setReviewPeriod(rec?.reviewPeriod ?? 1)
    setPracticeDays(rec?.practiceDays ?? 'weekday')
    setPopoverOpen(false)
  }, [])

  // ── Popover handlers ──────────────────────────────────
  const openPopover = useCallback(() => {
    setDraftVolume(volume)
    setDraftUnits([...units])
    setPopoverOpen(true)
  }, [volume, units])

  const confirmPopover = useCallback(() => {
    setVolume(draftVolume)
    setUnits([...draftUnits])
    setPublished(false)
    setPhase('setup')
    setPopoverOpen(false)
  }, [draftVolume, draftUnits])

  const cancelPopover = useCallback(() => {
    setPopoverOpen(false)
  }, [])

  const toggleDraftUnit = useCallback((u: string) => {
    setDraftUnits(prev => prev.includes(u) ? prev.filter(x => x !== u) : [...prev, u])
  }, [])

  const handleDraftVolumeChange = useCallback((v: string) => {
    setDraftVolume(v)
    setDraftUnits([])
  }, [])

  useEffect(() => {
    if (!popoverOpen) return
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        cancelPopover()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [popoverOpen, cancelPopover])

  // ── Loading ────────────────────────────────────────────
  const [loadingStep, setLoadingStep] = useState(0)
  const LOADING_STEPS = [
    '小天正在分析年级与复习范围…',
    '正在匹配适合当前阶段的词汇练习内容…',
    '正在生成阶段词汇复习方案…',
  ]

  const runLoading = useCallback(() => {
    setPhase('loading')
    setLoadingStep(0)
    let step = 0
    const timer = setInterval(() => {
      step++
      if (step >= LOADING_STEPS.length) {
        clearInterval(timer)
        setTimeout(() => setPhase('result'), 400)
      } else {
        setLoadingStep(step)
      }
    }, 450)
    return () => clearInterval(timer)
  }, [])

  const handleGenerate = () => {
    setVersionIndex(0)
    runLoading()
  }
  const handleRegenerate = () => {
    // P0-13: 重新生成时在可用版本集合中循环切换
    setVersionIndex(prev => prev + 1)
    runLoading()
  }
  // P0-15: 布置成功弹窗
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const handlePublish = () => {
    setPublished(true)
    setShowSuccessModal(true)
  }
  const handleViewReport = () => {
    navigate('/vocab-plan-report/mock-stage-plan-001')
  }
  const handlePreview = () => { showToast('正在打开试题预览...') }

  useEffect(() => {
    if (open) {
      setPublished(false)
      setTooltip(null)
      setPopoverOpen(false)
      if (showInitialLoading) {
        // 首页入口：先走 AI Loading → 再展示设置页
        setPhase('initial_loading')
        setLoadingStep(0)
        let step = 0
        const timer = setInterval(() => {
          step++
          if (step >= LOADING_STEPS.length) {
            clearInterval(timer)
            setTimeout(() => setPhase('setup'), 400)
          } else {
            setLoadingStep(step)
          }
        }, 450)
        return () => clearInterval(timer)
      } else {
        setPhase('setup')
      }
    }
  }, [open, showInitialLoading])

  if (!open) return null

  // ══════════════════════════════════════════════════════════
  // Render: Setup Phase
  // ══════════════════════════════════════════════════════════
  const renderSetup = () => (
    <div className="px-6 py-6 space-y-6">
      {/* Demo test scenario selector (demo only, NOT production) */}
      <div className="bg-amber-50 rounded-xl px-4 py-3 border border-amber-200 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-wide">Demo 测试场景</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {DEMO_SCENARIOS.map(s => (
            <button key={s.key} onClick={() => handleScenarioChange(s.key)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all
                ${demoScenario === s.key
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-300'}`}
            >{s.label}</button>
          ))}
        </div>
        <p className="text-[10px] text-amber-600/70">
          测试场景仅用于 demo 演示，正式环境按老师实际操作日期和平台教材进度计算。
        </p>
      </div>

      {/* Top blue bar — description + grade in one row */}
      <div className="bg-blue-50 rounded-xl px-4 py-3 border border-blue-100 flex items-center justify-between gap-3 flex-wrap">
        <p className="text-[12px] text-slate-700">
          小天已识别到您现在处于<span className="font-bold text-blue-600">「{termText}」</span>上学期期末考试教学阶段，为您生成以下复习方案。
        </p>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[10px] text-slate-400 mr-1">调整年级为</span>
          {gradeOptions.map(g => (
            <button key={g} onClick={() => handleGradeChange(g)}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all
                ${grade === g ? 'bg-blue-500 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Settings — three rows, centered, simple buttons */}
      <div className="max-w-[480px] mx-auto space-y-4">
        {/* Row 1: 复习方式 */}
        <div className="flex items-center gap-4">
          <span className="text-[12px] font-medium text-slate-500 w-[72px] shrink-0">复习方式</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setReviewSource('curriculum')}
              className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all
                ${finalReviewSource === 'curriculum' ? 'bg-blue-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >按课标词</button>
            <button onClick={() => setReviewSource('textbook')}
              className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all
                ${finalReviewSource === 'textbook' ? 'bg-blue-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >按教材</button>
            {finalReviewSource === 'textbook' && (
              <span className="relative">
                <button onClick={openPopover}
                  className="text-[11px] text-[#4b9fe8] hover:text-blue-600 font-medium transition-colors"
                >查看考察单元</button>
                {popoverOpen && (
                  <div ref={popoverRef}
                    className="absolute left-0 top-full mt-2 z-40 bg-white rounded-xl shadow-xl border border-slate-200 p-4 w-[340px]"
                  >
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2">册次</p>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {availableVolumes.map(v => (
                          <button key={v} onClick={() => handleDraftVolumeChange(v)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all
                              ${draftVolume === v ? 'bg-blue-500 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`}
                          >{v}</button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2">单元</p>
                      {availableVolumes.length > 0 ? (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {MOCK_UNITS.map(u => (
                            <button key={u} onClick={() => toggleDraftUnit(u)}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all
                                ${draftUnits.includes(u) ? 'bg-blue-500 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'}`}
                            >{u}</button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-400">当前年级暂无可选册次</p>
                      )}
                      {draftUnits.length === 0 && (
                        <p className="text-[10px] text-slate-400 mt-1.5">未选择单元时，将按当前册次整册生成。</p>
                      )}
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
                      <button onClick={cancelPopover}
                        className="px-3 py-1.5 rounded-lg text-[11px] font-medium text-slate-500 border border-slate-200 hover:bg-slate-50 transition-colors"
                      >取消</button>
                      <button onClick={confirmPopover}
                        className="px-3 py-1.5 rounded-lg text-[11px] font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                      >确定</button>
                    </div>
                  </div>
                )}
              </span>
            )}
          </div>
        </div>
        {/* Summary below 复习方式 when textbook mode */}
        {finalReviewSource === 'textbook' && (
          <div className="flex items-center gap-4">
            <span className="w-[72px] shrink-0" />
            <span className="text-[10px] text-slate-400">已选：{selectionSummary}</span>
          </div>
        )}

        {/* Row 2: 复习周期 */}
        <div className="flex items-center gap-4">
          <span className="text-[12px] font-medium text-slate-500 w-[72px] shrink-0">复习周期</span>
          <div className="flex items-center gap-1.5">
            {REVIEW_PERIODS.map(p => (
              <button key={p.value} onClick={() => { setReviewPeriod(p.value); setPublished(false) }}
                className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all
                  ${reviewPeriod === p.value ? 'bg-blue-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >{p.label}</button>
            ))}
          </div>
        </div>

        {/* Row 3: 练习时间 */}
        <div className="flex items-center gap-4">
          <span className="text-[12px] font-medium text-slate-500 w-[72px] shrink-0">练习时间</span>
          <div className="flex items-center gap-1.5">
            {PRACTICE_DAY_LABELS.map(preset => (
              <button key={preset} onClick={() => handlePracticeDaysChange(preset)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-medium transition-all
                  ${practiceDays === preset ? 'bg-blue-500 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >{PRACTICE_DAY_TEXTS[preset]}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Generate button */}
      <div className="flex justify-center pt-4 border-t border-[#f0f4f8]">
        <button onClick={handleGenerate}
          className="flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-[13px] font-semibold text-white bg-blue-500 hover:bg-blue-600 shadow-sm shadow-blue-200 transition-all"
        >
          <Sparkles size={14} />开始生成
        </button>
      </div>
    </div>
  )

  // ══════════════════════════════════════════════════════════
  // Render: AI Loading Phase
  // ══════════════════════════════════════════════════════════
  const renderLoading = () => (
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
  )

  // ══════════════════════════════════════════════════════════
  // Render: Result Phase
  // ══════════════════════════════════════════════════════════
  const renderResult = () => (
    <div className="p-6 space-y-5">
      <div className="bg-blue-50 rounded-xl px-4 py-3 border border-blue-100">
        <p className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
          <CheckCircle2 size={12} className="text-blue-500" />方案已生成
        </p>
        <p className="text-[11px] text-slate-600 leading-relaxed mt-1.5">{resultSummaryText}</p>
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          <span className="text-[10px] bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200">{grade}</span>
          <span className="text-[10px] bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200">{sourceLabel}</span>
          {finalReviewSource === 'textbook' && (
            <span className="text-[10px] bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200">{scopeText}</span>
          )}
          <span className="text-[10px] bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200">{periodLabelForResult}</span>
          <span className="text-[10px] bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200">{practiceLabel}</span>
          <span className="text-[10px] bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200">{fmtDate(planStartDate)} 开始</span>
          <span className="text-[10px] bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200">{exerciseCount} 份练习</span>
        </div>
      </div>

      <div>
        <label className="text-[11px] font-medium text-slate-500 mb-2 block">方案开始练习时间</label>
        <div className="flex items-center gap-2">
          <Calendar size={13} className="text-slate-400" />
          <input type="date" value={planStartDate}
            onChange={e => { setPlanStartDate(e.target.value); setPublished(false) }}
            className="text-[11px] border border-slate-200 rounded-md px-3 py-1.5 text-slate-700 outline-none focus:border-blue-400"
          />
          <span className="text-[10px] text-slate-400">修改后，各练习发布时间将自动重新计算</span>
        </div>
      </div>

      <div className="space-y-3">
        {Array.from({ length: exerciseCount }, (_, i) => {
          const n = i + 1
          const dates = exerciseDates[i] || { publishDate: '待定', deadlineDate: '待定' }
          return (
            <div key={n} className="bg-slate-50 rounded-xl border border-slate-100">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FileText size={15} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-slate-700">词汇闯关 {n}</p>
                      <div className="flex items-center gap-3 mt-0.5 text-[11px] text-slate-400 flex-wrap">
                        <span>发布时间：{dates.publishDate}</span>
                        <span className="text-slate-300">|</span>
                        <span>截止时间：{dates.deadlineDate}</span>
                        <span className="text-slate-300">|</span>
                        <span
                          className="cursor-pointer hover:text-slate-600"
                          onMouseEnter={e => {
                            const rect = (e.target as HTMLElement).getBoundingClientRect()
                            setTooltip({ exercise: n, x: rect.left + rect.width / 2, y: rect.top })
                          }}
                          onMouseLeave={() => setTooltip(null)}
                        >题量：50 题</span>
                        <span className="text-slate-300">|</span>
                        <span>覆盖词汇约 50 个</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {i === 0 && (
                      <button onClick={handlePreview}
                        className="flex items-center gap-1 text-[11px] text-[#4b9fe8] border border-[#b8d4f0] hover:bg-[#eaf2fb] px-2 py-1 rounded-md font-medium transition-colors">
                        <Eye size={11} />预览试题
                      </button>
                    )}
                    {i === 0 && (
                      <span className="text-[10px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded font-medium shrink-0">首发</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Portal tooltip — rendered at document.body to avoid clipping */}
      {tooltip && createPortal(
        <div
          ref={tooltipRef}
          className="fixed z-[9999] bg-white rounded-xl shadow-xl border border-slate-200 p-3 min-w-[180px]"
          style={{
            left: `${Math.min(tooltip.x - 90, window.innerWidth - 220)}px`,
            top: `${Math.max(tooltip.y - 200, 8)}px`,
          }}
        >
          <div className="space-y-1.5">
            {getCurrentVersionQT(grade, practiceDays === 'weekday', versionIndex, DEMO_SCENARIOS.find(s => s.key === demoScenario)?.mockDate || undefined).items.map(qt => (
              <div key={qt.type} className="flex items-center justify-between text-[10px]">
                <span className="text-slate-500">{qt.type}</span>
                <span className="font-semibold text-slate-700 ml-4">
                  {qt.count} {qt.note ? `(${qt.note})` : '题'}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
            {getCurrentVersionQT(grade, practiceDays === 'weekday', versionIndex, DEMO_SCENARIOS.find(s => s.key === demoScenario)?.mockDate || undefined).versionLabel} · 共 50 题
          </div>
        </div>,
        document.body
      )}

      <div className="flex items-center justify-between pt-3 border-t border-[#f0f4f8]">
        {published ? (
          <>
            <p className="text-[11px] text-slate-400">不满意当前方案？可以重新生成</p>
            <div className="flex items-center gap-2">
              <button onClick={handleRegenerate}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium text-slate-500 border border-slate-200 hover:border-blue-300 hover:text-blue-500 transition-all">
                <RefreshCw size={12} />重新生成
              </button>
              <button onClick={handleViewReport}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-[#4b9fe8] border border-[#b8d4f0] hover:bg-[#eaf2fb] transition-colors">
                <TrendingUp size={11} />查看方案报告
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-[11px] text-slate-400">不满意当前方案？可以重新生成</p>
            <div className="flex items-center gap-2">
              <button onClick={handleRegenerate}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium text-slate-500 border border-slate-200 hover:border-blue-300 hover:text-blue-500 transition-all">
                <RefreshCw size={12} />重新生成
              </button>
              <button onClick={handlePublish}
                className="flex items-center gap-1 px-4 py-1.5 rounded-lg text-[11px] font-semibold text-white bg-blue-500 hover:bg-blue-600 shadow-sm transition-all">
                <Send size={12} />确认布置
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )

  // ══════════════════════════════════════════════════════════
  // Render: Modal
  // ══════════════════════════════════════════════════════════
  return (
    <div className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[720px] max-h-[88vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-[#f0f4f8] flex items-start justify-between rounded-t-2xl">
          <div>
            <h2 className="text-base font-bold text-slate-800">阶段词汇能力提升方案</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {teacherStage === 'junior'
                ? '适用于期中、期末、初三复习等阶段词汇能力提升场景，按年级与复习范围生成方案。'
                : '适用于期中、期末、高三复习等阶段词汇能力提升场景，按年级与复习范围生成方案。'
              }
            </p>
            {_IS_DEV && (
              <div className="flex items-center gap-1.5 mt-2">
                <GraduationCap size={11} className="text-slate-400" />
                <span className="text-[10px] text-slate-400">模拟学段：</span>
                <button
                  onClick={() => handleStageChange('junior')}
                  className={`text-[10px] px-1.5 py-0.5 rounded ${teacherStage === 'junior' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-slate-400 hover:text-slate-600'}`}
                >初中</button>
                <button
                  onClick={() => handleStageChange('senior')}
                  className={`text-[10px] px-1.5 py-0.5 rounded ${teacherStage === 'senior' ? 'bg-blue-100 text-blue-600 font-medium' : 'text-slate-400 hover:text-slate-600'}`}
                >高中</button>
              </div>
            )}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors shrink-0">
            <X size={18} />
          </button>
        </div>

        {phase === 'initial_loading' && renderLoading()}
        {phase === 'setup' && renderSetup()}
        {phase === 'loading' && renderLoading()}
        {phase === 'result' && renderResult()}

        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[12px] px-4 py-2 rounded-lg shadow-lg z-[210]">
            {toast}
          </div>
        )}
      </div>

      {/* P0-15: 布置成功独立弹窗 */}
      <AssignSuccessModal
        open={showSuccessModal}
        onClose={() => { setShowSuccessModal(false); onClose() }}
        planName={`${grade}阶段词汇能力提升方案`}
        exerciseCount={exerciseCount}
        className={`${grade}班`}
        publishDates={exerciseDates.map(d => d.publishDate)}
        deadlineDates={exerciseDates.map(d => d.deadlineDate)}
        allowLateSubmit={true}
        allowRetest={true}
        supportPaper={false}
      />
    </div>
  )
}

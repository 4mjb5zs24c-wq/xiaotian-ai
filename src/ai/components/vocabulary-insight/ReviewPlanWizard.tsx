import { useState } from 'react'
import { X, ChevronRight, Check, Send, ArrowLeft, Sparkles, Target, Calendar, Hash, RefreshCw, Gauge } from 'lucide-react'
import type { ReviewGoal } from '../../insights/vocabularyInsightTypes'
import { REVIEW_GOAL_META } from '../../insights/vocabularyInsightTypes'
import { getReviewPlanConfig, getReviewPlanTasks } from '../../insights/mockVocabularyInsight'

interface Props {
  onClose: () => void
}

const STEP_LABELS = ['选择目标', '设置周期', '设置词量', '生成方案']

export default function ReviewPlanWizard({ onClose }: Props) {
  const [step, setStep] = useState(1)
  const [goal, setGoal] = useState<ReviewGoal>('quick_fix')
  const [dayCount, setDayCount] = useState(3)
  const [wordsPerDay, setWordsPerDay] = useState(30)
  const [rollbackCount, setRollbackCount] = useState(2)
  const [masteryRule, setMasteryRule] = useState<'consecutive_correct' | 'accumulated_correct' | 'last_test_correct'>('consecutive_correct')
  const [generated, setGenerated] = useState(false)
  const [tasks, setTasks] = useState<any[]>([])

  const handleGoalSelect = (g: ReviewGoal) => {
    setGoal(g)
    const meta = REVIEW_GOAL_META[g]
    setDayCount(meta.defaultDays)
    setWordsPerDay(meta.defaultWordCount)
    setStep(2)
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

  const config = getReviewPlanConfig(goal)

  return (
    <div className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl shadow-slate-900/10 w-[620px] max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-6 py-4 border-b border-slate-100 rounded-t-2xl flex items-center justify-between z-10">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              {generated ? '词汇复习方案' : '制定词汇复习方案'}
            </h3>
            {!generated && (
              <p className="text-xs text-slate-400 mt-0.5">4 步生成个性化复习计划</p>
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

          {/* Step 1: Choose Goal */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <Target size={16} className="text-blue-500" />
                <p className="text-sm font-semibold text-slate-700">选择复习目标</p>
              </div>
              <div className="grid gap-2.5">
                {(Object.entries(REVIEW_GOAL_META) as [ReviewGoal, any][]).map(([key, meta]) => (
                  <button
                    key={key}
                    onClick={() => handleGoalSelect(key)}
                    className="w-full text-left p-4 rounded-xl border border-slate-200
                      hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-sm
                      transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                        {meta.label}
                      </span>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5">{meta.desc}</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      建议：{meta.defaultDays} 天 / 每次 {meta.defaultWordCount} 个词
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Period */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-500" />
                <p className="text-sm font-semibold text-slate-700">设置复习周期</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs text-slate-400 mb-1">已选目标</p>
                <p className="text-sm font-semibold text-slate-700">{REVIEW_GOAL_META[goal].label}</p>
              </div>
              <div className="flex gap-2">
                {[3, 7, 14, 28].map(d => (
                  <button
                    key={d}
                    onClick={() => setDayCount(d)}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                      ${dayCount === d
                        ? 'bg-blue-500 text-white shadow-sm shadow-blue-200'
                        : 'border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-500'}`}
                  >
                    {d} 天
                  </button>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500
                    border border-slate-200 hover:bg-slate-50 transition-colors"
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

          {/* Step 3: Words Per Day + Rollback + Mastery */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Hash size={16} className="text-blue-500" />
                <p className="text-sm font-semibold text-slate-700">设置每次词量</p>
              </div>
              <div className="flex gap-2">
                {[20, 50, 100, 200].map(w => (
                  <button
                    key={w}
                    onClick={() => setWordsPerDay(w)}
                    className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                      ${wordsPerDay === w
                        ? 'bg-blue-500 text-white shadow-sm shadow-blue-200'
                        : 'border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-500'}`}
                  >
                    {w} 个
                  </button>
                ))}
              </div>

              {/* ── Vocabulary Rollback ── */}
              <div className="space-y-3 pt-3">
                <div className="flex items-center gap-2">
                  <RefreshCw size={15} className="text-blue-500" />
                  <p className="text-sm font-semibold text-slate-700">词汇回滚次数</p>
                  <span className="text-[11px] text-slate-400">错词在后续练习中重复出现的次数</span>
                </div>
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
              </div>

              {/* ── Mastery Criteria ── */}
              <div className="space-y-3 pt-3">
                <div className="flex items-center gap-2">
                  <Gauge size={15} className="text-blue-500" />
                  <p className="text-sm font-semibold text-slate-700">掌握判定规则</p>
                  <span className="text-[11px] text-slate-400">当学生满足此条件时，将该词标记为"已掌握"</span>
                </div>
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
              </div>

              {/* Summary */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 space-y-2">
                <p className="text-xs text-blue-500 leading-relaxed">
                  共 <span className="font-semibold">{dayCount} 天</span> · {' '}
                  <span className="font-semibold">{wordsPerDay} 词/次</span> · {' '}
                  覆盖面约 <span className="font-semibold">{dayCount * wordsPerDay}</span> 个词位
                </p>
                <p className="text-xs text-blue-500 leading-relaxed">
                  回滚 <span className="font-semibold">{rollbackCount} 次</span> · {' '}
                  掌握判定：<span className="font-semibold">{masteryRule === 'consecutive_correct' ? '连续答对' : masteryRule === 'accumulated_correct' ? '累计答对' : '末次答对'}</span>
                </p>
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
                  <div><span className="text-slate-400">复习目标：</span><span className="font-medium text-slate-700">{REVIEW_GOAL_META[goal].label}</span></div>
                  <div><span className="text-slate-400">复习范围：</span><span className="font-medium text-slate-700">{config.reviewScope}</span></div>
                  <div><span className="text-slate-400">复习对象：</span><span className="font-medium text-slate-700">{config.targetStudents}</span></div>
                  <div><span className="text-slate-400">复习周期：</span><span className="font-medium text-slate-700">{dayCount} 天</span></div>
                  <div><span className="text-slate-400">每次词量：</span><span className="font-medium text-slate-700">{wordsPerDay} 个</span></div>
                  <div><span className="text-slate-400">分层策略</span><span className="font-medium text-slate-700">：{config.strategy}</span></div>
                  <div><span className="text-slate-400">回滚次数：</span><span className="font-medium text-slate-700">{rollbackCount} 次</span></div>
                  <div><span className="text-slate-400">掌握判定：</span><span className="font-medium text-slate-700">{masteryRule === 'consecutive_correct' ? '连续答对' : masteryRule === 'accumulated_correct' ? '累计答对' : '末次答对'}</span></div>
                </div>
                <p className="text-xs text-blue-500 italic leading-relaxed pt-1 border-t border-blue-100">
                  💡 {config.aiReason}
                </p>
              </div>

              {/* Task List */}
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

              {/* Actions */}
              <div className="flex gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => { setStep(1); setGenerated(false); setTasks([]) }}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 border border-slate-200
                    hover:bg-slate-50 transition-colors"
                >
                  重新制定
                </button>
                <button
                  onClick={() => { alert('已成功发布词汇复习方案！'); onClose() }}
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

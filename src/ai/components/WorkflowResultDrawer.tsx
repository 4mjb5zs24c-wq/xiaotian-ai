import { useState } from 'react'
import {
  X, Zap, Download, Send, FileText, Check,
  Loader, ChevronDown, ChevronUp, Printer,
  BookOpen, Mic, PenLine, Edit3, Grid3X3, Play, Users,
} from 'lucide-react'
import { useAIStore } from '../store'
import type { RunnerResult, RunnerStatus } from '../engine/workflowRunner'
import type { StepResult } from '../workflows/workflowTypes'

// ── Props ──────────────────────────────────────────────

interface Props {
  open: boolean
  onClose: () => void
  status: RunnerStatus
  result: RunnerResult | null
  stepNames: string[]
  /** Called when user clicks "布置给学生" — parent opens assignment workflow */
  onAssign?: (context?: Record<string, unknown>) => void
}

// ── Step Icon ──────────────────────────────────────────

function StepIcon({ step }: { step: StepResult }) {
  if (step.status === 'completed') return <Check size={14} className="text-emerald-500" />
  if (step.status === 'running') return <Loader size={14} className="text-blue-500 animate-spin" />
  if (step.status === 'failed') return <X size={14} className="text-red-500" />
  return <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-200 block" />
}

// ── Workflow-specific colors ───────────────────────────

const wfConfig: Record<string, { icon: typeof FileText; color: string; bg: string; label: string }> = {
  'vocab-dictation': { icon: Edit3, color: 'text-blue-600', bg: 'bg-blue-50', label: '词汇默写' },
  'reading-practice': { icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50', label: '阅读理解' },
  'listening-recommend': { icon: Mic, color: 'text-purple-600', bg: 'bg-purple-50', label: '听力/听说' },
  'writing-analysis': { icon: PenLine, color: 'text-orange-600', bg: 'bg-orange-50', label: '写作分析' },
  'assignment': { icon: Send, color: 'text-indigo-600', bg: 'bg-indigo-50', label: '布置作业' },
}

// ── Main Component ────────────────────────────────────

export default function WorkflowResultDrawer({ open, onClose, status, result, stepNames, onAssign }: Props) {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set())
  const practiceBasket = useAIStore((s) => s.practiceBasket)
  const addToBasket = useAIStore((s) => s.addToBasket)

  if (!open) return null

  const toggleStep = (i: number) => {
    const next = new Set(expandedSteps)
    if (next.has(i)) next.delete(i); else next.add(i)
    setExpandedSteps(next)
  }

  const wfId = result?.workflowId || ''
  const config = wfConfig[wfId] || { icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50', label: result?.workflowName || 'AI 结果' }
  const WfIcon = config.icon

  const inBasket = result
    ? practiceBasket.some((i) => 'id' in i && i.id === result.workflowId)
    : false

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/20" onClick={onClose} />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-[460px] max-w-[100vw] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* ── Header ── */}
        <div className="shrink-0 border-b border-slate-200 px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className={`flex items-center justify-center w-7 h-7 rounded-lg ${config.bg}`}>
                <WfIcon size={14} className={config.color} />
              </div>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${config.bg} ${config.color}`}>
                {config.label}
              </span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          </div>

          <h2 className="text-base font-semibold text-slate-800 mb-1">
            {result?.output?.title || result?.workflowName || '执行中...'}
          </h2>

          {/* Status badge */}
          <div className="flex items-center gap-2">
            {status === 'loading' && (
              <span className="inline-flex items-center gap-1.5 text-[11px] text-blue-600">
                <Loader size={11} className="animate-spin" />
                执行中...
              </span>
            )}
            {status === 'success' && (
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-600">
                <Check size={11} />
                执行完成 · {result?.steps.length || 0} 个步骤
              </span>
            )}
            {status === 'error' && (
              <span className="inline-flex items-center gap-1.5 text-[11px] text-red-500">
                <X size={11} />
                执行失败
              </span>
            )}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 overflow-y-auto">
          {/* Loading skeleton */}
          {status === 'loading' && !result && (
            <div className="p-5 space-y-4">
              {stepNames.map((name, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-50">
                  {i === 0 ? (
                    <Loader size={14} className="text-blue-500 animate-spin" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-200" />
                  )}
                  <div>
                    <span className="text-[10px] text-slate-400">Step {i + 1}</span>
                    <p className="text-xs font-medium text-slate-500">{name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Success: Workflow-specific output ── */}
          {status === 'success' && result && (
            <div className="p-5 space-y-4">
              {/* ── Vocab Dictation Output ── */}
              {wfId === 'vocab-dictation' && (
                <VocabOutput result={result} />
              )}

              {/* ── Reading Practice Output ── */}
              {wfId === 'reading-practice' && (
                <ReadingOutput result={result} />
              )}

              {/* ── Listening Recommend Output ── */}
              {wfId === 'listening-recommend' && (
                <ListeningOutput result={result} />
              )}

              {/* ── Writing Analysis Output ── */}
              {wfId === 'writing-analysis' && (
                <WritingOutput result={result} />
              )}

              {/* ── Assignment Output ── */}
              {wfId === 'assignment' && (
                <AssignmentOutput result={result} />
              )}

              {/* ── Fallback generic output ── */}
              {!['vocab-dictation', 'reading-practice', 'listening-recommend', 'writing-analysis', 'assignment'].includes(wfId) && (
                <GenericOutput result={result} />
              )}

              {/* ── Step Timeline (collapsible) ── */}
              {result.steps.length > 0 && (
                <div>
                  <button
                    onClick={() => {
                      const allExpanded = result.steps.every((_, i) => expandedSteps.has(i))
                      if (allExpanded) setExpandedSteps(new Set())
                      else setExpandedSteps(new Set(result.steps.map((_, i) => i)))
                    }}
                    className="text-[10px] text-slate-400 hover:text-slate-600 mb-2"
                  >
                    执行步骤 ({result.steps.length}) · {expandedSteps.size > 0 ? '收起' : '展开'}
                  </button>
                  <div className="space-y-0">
                    {result.steps.map((step, i) => {
                      const stepName = stepNames[i] || step.stepId
                      const isExpanded = expandedSteps.has(i)

                      return (
                        <div key={step.stepId} className="relative">
                          {i < result.steps.length - 1 && (
                            <div className="absolute left-[17px] top-9 bottom-0 w-px bg-slate-200" />
                          )}
                          <div
                            className={`px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${
                              step.status === 'running' ? 'bg-blue-50' :
                              step.status === 'failed' ? 'bg-red-50' :
                              'hover:bg-slate-50'
                            }`}
                            onClick={() => toggleStep(i)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 mt-0.5 ${
                                step.status === 'completed' ? 'bg-emerald-100' :
                                step.status === 'running' ? 'bg-blue-100' :
                                step.status === 'failed' ? 'bg-red-100' :
                                'bg-slate-100'
                              }`}>
                                <StepIcon step={step} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-medium text-slate-600">{stepName}</span>
                                  {isExpanded ? <ChevronUp size={12} className="text-slate-300" /> : <ChevronDown size={12} className="text-slate-300" />}
                                </div>
                                <p className="text-[11px] text-slate-400 leading-relaxed">{step.summary}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Action Bar ── */}
        {status === 'success' && result && (
          <ActionBar
            wfId={wfId}
            result={result}
            inBasket={inBasket}
            onAddToBasket={() => {
              addToBasket({
                id: result.workflowId,
                title: result.output.title,
                reason: `「${result.workflowName}」生成`,
                type: 'material',
                tags: ['workflow', result.category],
                difficulty: 'medium',
                estimatedTime: '',
              })
            }}
            onAssign={onAssign}
            onClose={onClose}
          />
        )}
      </div>
    </>
  )
}

// ═══════════════════════════════════════════════════════
// Per-workflow output components
// ═══════════════════════════════════════════════════════

function VocabOutput({ result }: { result: RunnerResult }) {
  const { output, suggestions } = result

  return (
    <div className="space-y-3">
      {/* Summary banner */}
      <div className="bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <Edit3 size={14} className="text-blue-500" />
          <h3 className="text-sm font-semibold text-slate-800">{output.title}</h3>
        </div>
        <p className="text-xs text-slate-600">{output.summary}</p>
      </div>

      {/* Word table */}
      {output.items && output.items.length > 0 && (
        <div>
          <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">词表预览</h4>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-[11px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-3 py-2 text-slate-500 font-medium">#</th>
                  <th className="text-left px-3 py-2 text-slate-500 font-medium">提示</th>
                  <th className="text-left px-3 py-2 text-slate-500 font-medium">答案</th>
                  <th className="text-right px-3 py-2 text-slate-500 font-medium">分值</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {output.items.slice(0, 10).map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-3 py-2 text-slate-400">{i + 1}</td>
                    <td className="px-3 py-2 text-slate-700 font-medium">{item.value}</td>
                    <td className="px-3 py-2 text-slate-500">{item.secondary?.replace('答案：', '').split('  ')[0] || '-'}</td>
                    <td className="px-3 py-2 text-right text-slate-400">{String(item.label).match(/（(\d+)分）/)?.[1] || '-'}分</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {output.items.length > 10 && (
            <p className="text-[10px] text-slate-400 mt-1 text-center">... 共 {output.items.length} 题，完整列表可打印</p>
          )}
        </div>
      )}

      {/* Metadata */}
      {output.metadata && (
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(output.metadata).slice(0, 6).map(([k, v]) => (
            <div key={k} className="bg-slate-50 rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] text-slate-400">{k}</p>
              <p className="text-[11px] font-semibold text-slate-700">{v}</p>
            </div>
          ))}
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div>
          <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">AI 建议</h4>
          <div className="space-y-1">
            {suggestions.map((s, i) => (
              <p key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                <span className="text-blue-400 shrink-0">●</span>
                {s}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ReadingOutput({ result }: { result: RunnerResult }) {
  const { output, suggestions } = result

  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={14} className="text-emerald-500" />
          <h3 className="text-sm font-semibold text-slate-800">{output.title}</h3>
        </div>
        <p className="text-xs text-slate-600">{output.summary}</p>
      </div>

      {output.items && output.items.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">阅读任务详情</h4>
          {output.items.map((item, i) => (
            <div key={i} className="flex items-start justify-between bg-white border border-slate-200 rounded-lg px-4 py-3">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400">{item.label}</span>
                <p className="text-sm text-slate-700">{item.value}</p>
                {item.secondary && (
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.secondary}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {output.metadata && (
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(output.metadata).slice(0, 6).map(([k, v]) => (
            <div key={k} className="bg-slate-50 rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] text-slate-400">{k}</p>
              <p className="text-[11px] font-semibold text-slate-700">{v}</p>
            </div>
          ))}
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">教学建议</h4>
          <div className="space-y-1">
            {suggestions.map((s, i) => (
              <p key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                <span className="text-emerald-400 shrink-0">●</span>
                {s}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ListeningOutput({ result }: { result: RunnerResult }) {
  const { output, suggestions } = result

  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <Mic size={14} className="text-purple-500" />
          <h3 className="text-sm font-semibold text-slate-800">{output.title}</h3>
        </div>
        <p className="text-xs text-slate-600">{output.summary}</p>
      </div>

      {output.items && output.items.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">推荐素材</h4>
          {output.items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-4 py-3 hover:border-purple-200 transition-colors">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 text-purple-500 shrink-0">
                <Play size={14} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-700 truncate">{item.label}</p>
                <p className="text-[11px] text-slate-500">{item.value}</p>
                {item.secondary && (
                  <p className="text-[10px] text-slate-400 mt-0.5">{item.secondary}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {output.metadata && (
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(output.metadata).slice(0, 4).map(([k, v]) => (
            <div key={k} className="bg-slate-50 rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] text-slate-400">{k}</p>
              <p className="text-[11px] font-semibold text-slate-700">{v}</p>
            </div>
          ))}
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">AI 建议</h4>
          <div className="space-y-1">
            {suggestions.map((s, i) => (
              <p key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                <span className="text-purple-400 shrink-0">●</span>
                {s}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function WritingOutput({ result }: { result: RunnerResult }) {
  const { output, suggestions } = result

  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <PenLine size={14} className="text-orange-500" />
          <h3 className="text-sm font-semibold text-slate-800">{output.title}</h3>
        </div>
        <p className="text-xs text-slate-600">{output.summary}</p>
      </div>

      {output.items && output.items.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">共性问题分析</h4>
          {output.items.slice(0, 5).map((item, i) => (
            <div key={i} className={`bg-white border rounded-lg px-4 py-3 ${
              item.label.startsWith('🔴') ? 'border-red-200 bg-red-50/30' :
              item.label.startsWith('🟡') ? 'border-amber-200 bg-amber-50/30' :
              'border-slate-200'
            }`}>
              <p className="text-xs font-medium text-slate-800">{item.label.replace(/^[🔴🟡]\s*/, '')}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{item.value}</p>
              {item.secondary && (
                <p className="text-[11px] text-blue-500 mt-1">{item.secondary}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {output.metadata && (
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(output.metadata).slice(0, 6).map(([k, v]) => (
            <div key={k} className="bg-slate-50 rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] text-slate-400">{k}</p>
              <p className="text-[11px] font-semibold text-slate-700">{v}</p>
            </div>
          ))}
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">教学建议</h4>
          <div className="space-y-1">
            {suggestions.map((s, i) => (
              <p key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                <span className="text-orange-400 shrink-0">●</span>
                {s}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function AssignmentOutput({ result }: { result: RunnerResult }) {
  const { output, suggestions } = result

  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <Send size={14} className="text-indigo-500" />
          <h3 className="text-sm font-semibold text-slate-800">{output.title}</h3>
        </div>
        <p className="text-xs text-slate-600">{output.summary}</p>
      </div>

      {/* Assignment confirmation card */}
      {output.items && output.items.length > 0 && (
        <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Check size={16} className="text-emerald-500" />
            <span className="text-sm font-semibold text-emerald-700">发布成功</span>
          </div>
          <div className="space-y-2">
            {output.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-[11px] text-slate-500">{item.label}</span>
                <span className="text-[12px] font-medium text-slate-700">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {output.metadata && (
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(output.metadata).map(([k, v]) => (
            <div key={k} className="bg-slate-50 rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] text-slate-400">{k}</p>
              <p className="text-[11px] font-semibold text-slate-700">{v}</p>
            </div>
          ))}
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">提示</h4>
          <div className="space-y-1">
            {suggestions.map((s, i) => (
              <p key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                <span className="text-indigo-400 shrink-0">●</span>
                {s}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function GenericOutput({ result }: { result: RunnerResult }) {
  const { output, suggestions } = result

  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <FileText size={14} className="text-blue-500" />
          <h3 className="text-sm font-semibold text-slate-800">{output.title}</h3>
        </div>
        <p className="text-xs text-slate-600">{output.summary}</p>
      </div>

      {output.items && output.items.length > 0 && (
        <div className="space-y-1.5">
          {output.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-2.5">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400">{item.label}</span>
                <p className="text-sm text-slate-700 truncate">{item.value}</p>
                {item.secondary && <p className="text-[10px] text-slate-400">{item.secondary}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {output.metadata && (
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(output.metadata).map(([k, v]) => (
            <div key={k} className="bg-slate-50 rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] text-slate-400">{k}</p>
              <p className="text-[11px] font-semibold text-slate-700">{v}</p>
            </div>
          ))}
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">AI 建议</h4>
          <div className="space-y-1">
            {suggestions.map((s, i) => (
              <p key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                <span className="text-blue-400 shrink-0">●</span>
                {s}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// Action Bar — per-workflow action buttons
// ═══════════════════════════════════════════════════════

function ActionBar({
  wfId,
  inBasket,
  onAddToBasket,
  onAssign,
  onClose,
}: {
  wfId: string
  result: RunnerResult
  inBasket: boolean
  onAddToBasket: () => void
  onAssign?: (context?: Record<string, unknown>) => void
  onClose: () => void
}) {
  const handleAssign = () => {
    onClose()
    // Small delay so drawer closes before new one opens
    setTimeout(() => onAssign?.(), 300)
  }

  return (
    <div className="shrink-0 border-t border-slate-200 px-5 py-3 space-y-2">
      {/* ── Vocab Dictation Actions ── */}
      {wfId === 'vocab-dictation' && (
        <div className="flex items-center gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
            <Send size={14} />
            布置给学生
          </button>
          <button className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition-colors">
            <Grid3X3 size={14} />
            去制卡
          </button>
          <button
            onClick={onAddToBasket}
            className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border text-sm transition-colors ${
              inBasket ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {inBasket ? <Check size={14} /> : <Download size={14} />}
            {inBasket ? '已加入' : '加入篮子'}
          </button>
          <button className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
            <Printer size={14} />
          </button>
        </div>
      )}

      {/* ── Reading Practice Actions ── */}
      {wfId === 'reading-practice' && (
        <div className="flex items-center gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors">
            <BookOpen size={14} />
            预览题目
          </button>
          <button
            onClick={onAddToBasket}
            className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border text-sm transition-colors ${
              inBasket ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {inBasket ? <Check size={14} /> : <Download size={14} />}
            {inBasket ? '已加入' : '加入篮子'}
          </button>
          <button
            onClick={handleAssign}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition-colors"
          >
            <Send size={14} />
            布置
          </button>
        </div>
      )}

      {/* ── Listening Actions ── */}
      {wfId === 'listening-recommend' && (
        <div className="flex items-center gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors">
            <Play size={14} />
            预览素材
          </button>
          <button
            onClick={handleAssign}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition-colors"
          >
            <Send size={14} />
            布置训练
          </button>
          <button className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition-colors">
            <Users size={14} />
            课堂使用
          </button>
        </div>
      )}

      {/* ── Writing Analysis Actions ── */}
      {wfId === 'writing-analysis' && (
        <div className="flex items-center gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors">
            <FileText size={14} />
            查看作文
          </button>
          <button className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition-colors">
            <PenLine size={14} />
            生成强化练习
          </button>
          <button
            onClick={handleAssign}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition-colors"
          >
            <Send size={14} />
            布置
          </button>
        </div>
      )}

      {/* ── Assignment Actions ── */}
      {wfId === 'assignment' && (
        <div className="flex items-center gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
            <FileText size={14} />
            查看作业详情
          </button>
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition-colors"
          >
            <Check size={14} />
            完成
          </button>
        </div>
      )}

      {/* ── Fallback Actions ── */}
      {!['vocab-dictation', 'reading-practice', 'listening-recommend', 'writing-analysis', 'assignment'].includes(wfId) && (
        <div className="flex items-center gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
            <Send size={14} />
            一键布置
          </button>
          <button className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 transition-colors">
            <Printer size={14} />
            打印
          </button>
          <button
            onClick={onAddToBasket}
            className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border text-sm transition-colors ${
              inBasket ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {inBasket ? <Check size={14} /> : <Download size={14} />}
            {inBasket ? '已加入' : '加入篮子'}
          </button>
        </div>
      )}
    </div>
  )
}

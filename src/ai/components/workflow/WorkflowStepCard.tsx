import { Check, Loader, X, SkipForward } from 'lucide-react'
import type { StepResult } from '../../workflows/workflowTypes'

interface Props {
  step: StepResult
  stepName: string
  index: number
  isRunning: boolean
}

export default function WorkflowStepCard({ step, stepName, index, isRunning }: Props) {
  const statusIcon = () => {
    switch (step.status) {
      case 'completed': return <Check size={14} className="text-emerald-500" />
      case 'running': return <Loader size={14} className="text-indigo-500 animate-spin" />
      case 'failed': return <X size={14} className="text-red-500" />
      case 'skipped': return <SkipForward size={14} className="text-slate-300" />
      default: return <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-200" />
    }
  }

  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-lg transition-colors ${
      isRunning ? 'bg-indigo-50 border border-indigo-100' :
      step.status === 'failed' ? 'bg-red-50 border border-red-100' :
      step.status === 'completed' ? 'bg-slate-50' : 'bg-white'
    }`}>
      {/* Step indicator */}
      <div className="flex flex-col items-center">
        <div className={`flex items-center justify-center w-6 h-6 rounded-full shrink-0 ${
          step.status === 'completed' ? 'bg-emerald-100' :
          step.status === 'running' ? 'bg-indigo-100' :
          step.status === 'failed' ? 'bg-red-100' :
          'bg-slate-100'
        }`}>
          {statusIcon()}
        </div>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[10px] text-slate-400 font-medium">Step {index + 1}</span>
          <span className="text-xs font-medium text-slate-700">{stepName}</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">{step.summary}</p>
        {step.error && (
          <p className="text-[11px] text-red-500 mt-1">{step.error}</p>
        )}
        {step.duration > 0 && step.status !== 'pending' && (
          <p className="text-[10px] text-slate-400 mt-1">{step.duration}ms</p>
        )}
      </div>
    </div>
  )
}

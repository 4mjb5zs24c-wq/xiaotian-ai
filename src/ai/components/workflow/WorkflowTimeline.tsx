import type { WorkflowUIRresult } from '../../workflows/workflowTypes'
import WorkflowStepCard from './WorkflowStepCard'

interface Props {
  result: WorkflowUIRresult
  currentStepIndex: number
  stepNames: string[]
  isRunning: boolean
}

export default function WorkflowTimeline({ result, currentStepIndex, stepNames, isRunning }: Props) {
  return (
    <div className="space-y-0">
      {result.steps.map((step, i) => (
        <div key={step.stepId} className="relative">
          {/* Connector line */}
          {i < result.steps.length - 1 && (
            <div className="absolute left-[14px] top-9 bottom-0 w-px bg-slate-200 ml-[3px]" />
          )}
          <WorkflowStepCard
            step={step}
            stepName={stepNames[i] || step.stepId}
            index={i}
            isRunning={isRunning && i === currentStepIndex}
          />
        </div>
      ))}
    </div>
  )
}

import type { WorkflowDefinition, WorkflowExecutionContext, StepResult, WorkflowUIRresult, WorkflowOutput, AdjustableParam } from './workflowTypes'

/**
 * Execute a workflow definition against a context.
 * Runs each step in sequence, collecting results and building the final output.
 *
 * This is the core execution engine — pluggable steps, sequential pipeline.
 */
export async function executeWorkflow(
  definition: WorkflowDefinition,
  ctx: WorkflowExecutionContext,
  onStepUpdate?: (stepIndex: number, result: StepResult) => void,
): Promise<WorkflowUIRresult> {
  const steps: StepResult[] = []

  for (let i = 0; i < definition.steps.length; i++) {
    const step = definition.steps[i]
    const started = performance.now()

    try {
      const result = await step.execute(ctx)
      result.duration = Math.round(performance.now() - started)
      ctx.stepResults.set(step.id, result)
      steps.push(result)
      onStepUpdate?.(i, result)
    } catch (err) {
      const failedResult: StepResult = {
        stepId: step.id,
        status: 'failed',
        data: {},
        summary: `步骤执行失败: ${err instanceof Error ? err.message : '未知错误'}`,
        error: err instanceof Error ? err.message : '未知错误',
        duration: Math.round(performance.now() - started),
      }
      steps.push(failedResult)
      ctx.stepResults.set(step.id, failedResult)
      onStepUpdate?.(i, failedResult)

      // Return early with partial results
      return buildUIResult(definition, ctx, steps, 'failed')
    }
  }

  return buildUIResult(definition, ctx, steps, 'completed')
}

/**
 * Build the final UI-friendly result from step outputs.
 */
function buildUIResult(
  definition: WorkflowDefinition,
  ctx: WorkflowExecutionContext,
  steps: StepResult[],
  status: 'completed' | 'failed',
): WorkflowUIRresult {
  // Collect output from the last successful step that has output data
  const output = extractOutput(steps, definition)
  const adjustableParams = buildAdjustableParams(ctx)

  return {
    workflowId: definition.id,
    workflowName: definition.name,
    category: definition.category,
    status,
    steps,
    output,
    suggestions: collectSuggestions(steps),
    adjustableParams,
  }
}

function extractOutput(steps: StepResult[], _definition: WorkflowDefinition): WorkflowOutput {
  // Look for the output_generation step first
  const outputStep = steps.find(
    (s) => s.status === 'completed' && s.data.outputType,
  )

  if (outputStep && outputStep.data.output) {
    return outputStep.data.output as WorkflowOutput
  }

  // Fallback: build from last successful step
  const lastSuccess = [...steps].reverse().find((s) => s.status === 'completed')
  if (lastSuccess) {
    return {
      type: 'text',
      title: 'Workflow 完成',
      summary: lastSuccess.summary,
      detail: JSON.stringify(lastSuccess.data, null, 2),
    }
  }

  return {
    type: 'text',
    title: 'Workflow 执行完成',
    summary: '所有步骤已执行完毕',
  }
}

function collectSuggestions(steps: StepResult[]): string[] {
  const suggestions: string[] = []
  for (const step of steps) {
    if (step.data.suggestions && Array.isArray(step.data.suggestions)) {
      suggestions.push(...(step.data.suggestions as string[]))
    }
  }
  return suggestions
}

function buildAdjustableParams(ctx: WorkflowExecutionContext): AdjustableParam[] {
  const params: AdjustableParam[] = [
    {
      key: 'quantity',
      label: '题目数量',
      type: 'number',
      currentValue: ctx.overrides.get('quantity') || ctx.triggerIntent.entities.quantity || 10,
    },
    {
      key: 'difficulty',
      label: '难度',
      type: 'select',
      currentValue: ctx.overrides.get('difficulty') || 'medium',
      options: [
        { label: '基础', value: 'basic' },
        { label: '进阶', value: 'medium' },
        { label: '拔高', value: 'advanced' },
      ],
    },
    {
      key: 'className',
      label: '目标班级',
      type: 'select',
      currentValue: ctx.overrides.get('className') || ctx.className,
      options: [
        { label: ctx.className, value: ctx.className },
        { label: '全年级', value: 'all' },
      ],
    },
  ]

  return params
}

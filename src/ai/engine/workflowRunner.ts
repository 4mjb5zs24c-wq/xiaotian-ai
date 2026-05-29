/**
 * Workflow Runner —— AI Workflow 核心执行引擎
 *
 * 职责：
 *   1. 接收 workflowId + context
 *   2. 从 registry 获取 workflow 定义
 *   3. 按步骤顺序执行 pipeline
 *   4. 在每个 step 之间回调 onStepUpdate
 *   5. 返回完整的 WorkflowResult
 *
 * 架构设计：
 *   - 与 LLM 无关：当前全部 mock，接口设计直接兼容 LLM Agent
 *   - 替换路径：Step.execute → LLM Tool Call
 *   - 管道不变：step pipeline 就是 Agent 的 plan→execute→observe 循环
 */

import { getWorkflow } from '../workflows/workflowRegistry'
import { buildWorkflowContext } from '../workflows/workflowContext'
import type {
  WorkflowDefinition,
  WorkflowExecutionContext,
  StepResult,
  WorkflowUIRresult,
  WorkflowOutput,
  AdjustableParam,
  WorkflowStep,
} from '../workflows/workflowTypes'

// ── Public Types ───────────────────────────────────────

export interface RunnerContext {
  /** Teacher's current textbook, e.g. "人教版" */
  textbook: string
  /** Current unit, e.g. "Unit 3 — Food and Drinks" */
  unit: string
  /** Current grade, e.g. "七年级上" */
  grade: string
  /** Class identifier, e.g. "七年级(3)班" */
  className: string
  /** Number of students in the class */
  studentCount: number
  /** Region for strategy, e.g. "guangdong" */
  region?: string
  /** Trigger query (for intent parsing) */
  query?: string
  /** Overrides, e.g. { quantity: 20, mode: "cn_to_en" } */
  overrides?: Record<string, unknown>
}

export interface RunnerCallbacks {
  /** Fires after each step completes */
  onStepUpdate?: (stepIndex: number, stepName: string, result: StepResult) => void
  /** Fires when all steps complete */
  onComplete?: (result: WorkflowUIRresult) => void
  /** Fires if a step fails */
  onError?: (stepIndex: number, error: string) => void
}

export interface RunnerResult {
  success: boolean
  workflowId: string
  workflowName: string
  category: string
  /** Step-by-step results */
  steps: StepResult[]
  /** Final UI output */
  output: WorkflowOutput
  /** AI suggestions */
  suggestions: string[]
  /** Parameters teacher can adjust */
  adjustableParams: AdjustableParam[]
  /** Human-readable message */
  message: string
}

// ── Default states for UI ─────────────────────────────

export type RunnerStatus = 'idle' | 'loading' | 'success' | 'error'

// ── Core Runner ────────────────────────────────────────

/**
 * Run a workflow by ID with teacher context.
 *
 * This is THE entry point for all workflow execution.
 * HomePage cards, SearchPage triggers, and any future entry
 * all go through this single function.
 *
 * @example
 * const result = await runWorkflowRunner('vocab-dictation', {
 *   textbook: '人教版',
 *   unit: 'Unit 3 — Food and Drinks',
 *   grade: '七年级上',
 *   className: '七年级(3)班',
 *   studentCount: 42,
 *   query: '生成 Unit 3 词汇默写',
 *   overrides: { quantity: 10, mode: 'cn_to_en' },
 * }, {
 *   onStepUpdate: (i, name, step) => console.log(name, step.status),
 *   onComplete: (result) => console.log('done', result),
 * })
 */
export async function runWorkflowRunner(
  workflowId: string,
  context: RunnerContext,
  callbacks?: RunnerCallbacks,
): Promise<RunnerResult> {
  // 1. Lookup workflow definition
  const definition = getWorkflow(workflowId)
  if (!definition) {
    return failResult(workflowId, '', `Workflow "${workflowId}" 未注册`)
  }

  // 2. Build execution context
  const overridesMap = context.overrides
    ? new Map(Object.entries(context.overrides))
    : undefined
  const execCtx = buildWorkflowContext({
    query: context.query || definition.name,
    textbook: context.textbook,
    unit: context.unit,
    grade: context.grade,
    className: context.className,
    studentCount: context.studentCount,
    region: context.region,
    overrides: overridesMap,
  })

  // 3. Execute pipeline step-by-step
  const steps = await executeSteps(definition, execCtx, callbacks)

  // 4. Build result
  const allCompleted = steps.every((s) => s.status === 'completed')
  const output = buildOutput(steps, definition, execCtx)
  const adjustableParams: AdjustableParam[] = [
    {
      key: 'quantity',
      label: '题目数量',
      type: 'number',
      currentValue: context.overrides?.quantity || 10,
    },
    {
      key: 'difficulty',
      label: '难度',
      type: 'select',
      currentValue: 'medium',
      options: [
        { label: '基础', value: 'basic' },
        { label: '进阶', value: 'medium' },
        { label: '拔高', value: 'advanced' },
      ],
    },
  ]

  callbacks?.onComplete?.({
    workflowId: definition.id,
    workflowName: definition.name,
    category: definition.category,
    status: allCompleted ? 'completed' : 'failed',
    steps,
    output,
    suggestions: collectSuggestions(steps),
    adjustableParams,
  })

  return {
    success: allCompleted,
    workflowId: definition.id,
    workflowName: definition.name,
    category: definition.category,
    steps,
    output,
    suggestions: collectSuggestions(steps),
    adjustableParams,
    message: allCompleted
      ? `「${definition.name}」执行完成，共 ${steps.length} 个步骤`
      : `「${definition.name}」执行失败`,
  }
}

// ── Step Executor ──────────────────────────────────────

async function executeSteps(
  definition: WorkflowDefinition,
  ctx: WorkflowExecutionContext,
  callbacks?: RunnerCallbacks,
): Promise<StepResult[]> {
  const results: StepResult[] = []

  for (let i = 0; i < definition.steps.length; i++) {
    const step = definition.steps[i]
    const t0 = performance.now()

    try {
      // Execute the step (currently mock, future: LLM tool call)
      const result = await step.execute(ctx)
      result.duration = Math.round(performance.now() - t0)

      // Store for downstream steps
      ctx.stepResults.set(step.id, result)
      results.push(result)

      // Notify
      callbacks?.onStepUpdate?.(i, step.name, result)
    } catch (err) {
      const msg = err instanceof Error ? err.message : '未知错误'
      const failed: StepResult = {
        stepId: step.id,
        status: 'failed',
        data: {},
        summary: `步骤「${step.name}」执行失败: ${msg}`,
        error: msg,
        duration: Math.round(performance.now() - t0),
      }
      ctx.stepResults.set(step.id, failed)
      results.push(failed)
      callbacks?.onError?.(i, msg)
      break // Stop pipeline on first failure
    }
  }

  return results
}

// ── Output Builder ─────────────────────────────────────

function buildOutput(
  steps: StepResult[],
  _definition: WorkflowDefinition,
  _ctx: WorkflowExecutionContext,
): WorkflowOutput {
  // Prefer the output from the last step with outputType
  const outputStep = [...steps]
    .reverse()
    .find((s) => s.status === 'completed' && s.data.outputType)

  if (outputStep?.data.output) {
    return outputStep.data.output as WorkflowOutput
  }

  // Fallback: summarize last step
  const last = steps[steps.length - 1]
  if (last) {
    return {
      type: 'text',
      title: '执行完成',
      summary: last.summary,
    }
  }

  return { type: 'text', title: '执行完成', summary: '' }
}

function collectSuggestions(steps: StepResult[]): string[] {
  const all: string[] = []
  for (const s of steps) {
    const sug = s.data.suggestions
    if (Array.isArray(sug)) all.push(...(sug as string[]))
  }
  return all
}

function failResult(id: string, name: string, message: string): RunnerResult {
  return {
    success: false,
    workflowId: id,
    workflowName: name,
    category: '',
    steps: [],
    output: { type: 'text', title: '执行失败', summary: message },
    suggestions: [],
    adjustableParams: [],
    message,
  }
}

// ── Re-export for convenience ─────────────────────────

export type {
  WorkflowDefinition,
  WorkflowExecutionContext,
  StepResult,
  WorkflowUIRresult,
  WorkflowOutput,
  WorkflowStep,
  AdjustableParam,
}

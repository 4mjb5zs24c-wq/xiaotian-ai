import { matchWorkflow, getWorkflow } from './workflowRegistry'
import { buildWorkflowContext } from './workflowContext'
import { executeWorkflow } from './workflowExecutor'
import type { WorkflowUIRresult, WorkflowExecutionContext, StepResult } from './workflowTypes'

export type { WorkflowUIRresult, StepResult, WorkflowExecutionContext }

/**
 * Main entry point for the workflow engine.
 *
 * Given a teacher's query and current context, this:
 * 1. Matches the best workflow
 * 2. Builds execution context (injects textbook, grade, etc.)
 * 3. Executes the pipeline
 * 4. Returns a UI-friendly result
 */

export interface EngineParams {
  query: string
  textbook: string
  unit: string
  grade: string
  className: string
  studentCount: number
  region?: string
  overrides?: Map<string, unknown>
  onStepUpdate?: (stepIndex: number, result: StepResult) => void
}

export interface EngineResult {
  matched: boolean
  workflowId: string | null
  workflowName: string | null
  result: WorkflowUIRresult | null
  message: string
}

/**
 * Try to run a workflow from a teacher's natural language query.
 * Returns null if no workflow matches (caller should fall back to search).
 */
export async function runWorkflow(params: EngineParams): Promise<EngineResult> {
  // 1. Find matching workflow
  const match = matchWorkflow(params.query)

  if (!match) {
    return {
      matched: false,
      workflowId: null,
      workflowName: null,
      result: null,
      message: '未找到匹配的 Workflow，请尝试搜索或更换关键词。',
    }
  }

  // 2. Build context
  const ctx = buildWorkflowContext({
    query: params.query,
    textbook: params.textbook,
    unit: params.unit,
    grade: params.grade,
    className: params.className,
    studentCount: params.studentCount,
    region: params.region,
    overrides: params.overrides,
  })

  // 3. Execute pipeline
  const result = await executeWorkflow(match.workflow, ctx, params.onStepUpdate)

  return {
    matched: true,
    workflowId: match.workflow.id,
    workflowName: match.workflow.name,
    result,
    message: `Workflow「${match.workflow.name}」执行${result.status === 'completed' ? '完成' : '失败'}`,
  }
}

/**
 * Run a specific workflow by ID (skip matching).
 */
export async function runWorkflowById(
  workflowId: string,
  params: Omit<EngineParams, 'query'> & { query?: string },
): Promise<EngineResult> {
  const definition = getWorkflow(workflowId)
  if (!definition) {
    return {
      matched: false,
      workflowId: null,
      workflowName: null,
      result: null,
      message: `Workflow "${workflowId}" 未注册。`,
    }
  }

  const ctx = buildWorkflowContext({
    query: params.query || definition.name,
    textbook: params.textbook,
    unit: params.unit,
    grade: params.grade,
    className: params.className,
    studentCount: params.studentCount,
    region: params.region,
    overrides: params.overrides,
  })

  const result = await executeWorkflow(definition, ctx, params.onStepUpdate)

  return {
    matched: true,
    workflowId: definition.id,
    workflowName: definition.name,
    result,
    message: `Workflow「${definition.name}」执行${result.status === 'completed' ? '完成' : '失败'}`,
  }
}

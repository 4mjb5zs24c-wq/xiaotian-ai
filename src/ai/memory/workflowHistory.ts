/**
 * Workflow History (v2 — Storage-backed)
 */

import type { WorkflowRecord } from '../context/types'
import { getStorageAdapter } from '../../storage'

let idCounter = 0

export async function recordWorkflowRun(params: {
  workflowId: string
  workflowName: string
  trigger: string
  status: 'completed' | 'failed'
  summary: string
  toolCallCount: number
  sessionId: string
}): Promise<WorkflowRecord> {
  const storage = getStorageAdapter()

  const record: WorkflowRecord = {
    id: `wfrec-${Date.now()}-${++idCounter}`,
    workflowId: params.workflowId,
    workflowName: params.workflowName,
    trigger: params.trigger,
    status: params.status,
    startedAt: Date.now() - 3000,
    completedAt: Date.now(),
    summary: params.summary,
    toolCallCount: params.toolCallCount,
  }

  await storage.saveWorkflowRun({
    id: record.id,
    workflowId: record.workflowId,
    workflowName: record.workflowName,
    sessionId: params.sessionId,
    trigger: record.trigger,
    status: record.status,
    steps: [],
    result: {},
    toolCallCount: record.toolCallCount,
    startedAt: record.startedAt,
    completedAt: record.completedAt,
  })

  return record
}

export async function getRecentWorkflows(limit = 10): Promise<WorkflowRecord[]> {
  const storage = getStorageAdapter()
  const runs = await storage.getWorkflowHistory(undefined, limit)
  return runs.map((r) => ({
    id: r.id,
    workflowId: r.workflowId,
    workflowName: r.workflowName,
    trigger: r.trigger,
    status: r.status,
    startedAt: r.startedAt,
    completedAt: r.completedAt,
    summary: r.result?.summary as string || '',
    toolCallCount: r.toolCallCount,
  }))
}

export async function getLastWorkflow(): Promise<WorkflowRecord | undefined> {
  const runs = await getRecentWorkflows(1)
  return runs[0]
}

export async function getWorkflowsByType(workflowId: string): Promise<WorkflowRecord[]> {
  const all = await getRecentWorkflows(50)
  return all.filter((r) => r.workflowId === workflowId)
}

export async function clearWorkflowHistory() {
  // Full clear needs storage.clearAll() — not scoped here
}

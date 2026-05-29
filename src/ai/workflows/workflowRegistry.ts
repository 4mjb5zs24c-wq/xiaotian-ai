import type { WorkflowDefinition } from './workflowTypes'
import { vocabularyDictationWorkflow } from './vocabularyDictationWorkflow'
import { writingAnalysisWorkflow } from './writingAnalysisWorkflow'
import { examPrepWorkflow } from './examPrepWorkflow'
import { classRiskWorkflow } from './classRiskWorkflow'
import { listeningRecommendWorkflow } from './listeningRecommendWorkflow'
import { unitPaperGenerateWorkflow } from './unitPaperGenerateWorkflow'
import { readingPracticeWorkflow } from './readingPracticeWorkflow'
import { assignmentWorkflow } from './assignmentWorkflow'
import { learningReportAnalysisWorkflow } from './learningReportAnalysisWorkflow'
import { wrongWordAnalysisWorkflow } from './wrongWordAnalysisWorkflow'
import { wrongQuestionAnalysisWorkflow } from './wrongQuestionAnalysisWorkflow'
import { resourceSearchWorkflow } from './resourceSearchWorkflow'
import { cardCreationWorkflow } from './cardCreationWorkflow'
import {
  matchIntent as matchIntentNew,
  isWorkflowQuery as isWorkflowQueryNew,
} from '../router/intentMap'
import type { IntentMatchResult, EntrySource } from '../router/intentMap'

const registry = new Map<string, WorkflowDefinition>()

function register(wf: WorkflowDefinition) {
  if (registry.has(wf.id)) {
    console.warn(`Workflow "${wf.id}" already registered, overwriting.`)
  }
  registry.set(wf.id, wf)
}

// ── Register all workflows ────────────────────────────
register(vocabularyDictationWorkflow)
register(writingAnalysisWorkflow)
register(examPrepWorkflow)
register(classRiskWorkflow)
register(listeningRecommendWorkflow)
register(unitPaperGenerateWorkflow)
register(readingPracticeWorkflow)
register(assignmentWorkflow)
register(learningReportAnalysisWorkflow)
register(wrongWordAnalysisWorkflow)
register(wrongQuestionAnalysisWorkflow)
register(resourceSearchWorkflow)
register(cardCreationWorkflow)

// ── Lookup ────────────────────────────────────────────

export function getWorkflow(id: string): WorkflowDefinition | undefined {
  return registry.get(id)
}

export function getAllWorkflows(): WorkflowDefinition[] {
  return Array.from(registry.values())
}

export function matchWorkflow(query: string): {
  workflow: WorkflowDefinition
  score: number
} | null {
  let best: { workflow: WorkflowDefinition; score: number } | null = null
  for (const wf of registry.values()) {
    let score = 0
    for (const kw of wf.triggerKeywords) {
      if (query.includes(kw)) score += 3
    }
    for (const task of wf.triggerTasks) {
      if (query.includes(task)) score += 5
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { workflow: wf, score }
    }
  }
  return best
}

export function getWorkflowsForTask(task: string): WorkflowDefinition[] {
  return Array.from(registry.values()).filter((wf) =>
    wf.triggerTasks.includes(task),
  )
}

export function getWorkflowsByCategory(category: string): WorkflowDefinition[] {
  return Array.from(registry.values()).filter((wf) =>
    wf.category === category,
  )
}

// ── Intent Router (delegates to unified intent map) ───

/** @deprecated Use the 2-param matchIntent(query, source) instead. */
export interface IntentMatch {
  workflowId: string
  intent: string
  label: string
}

/**
 * Route a teacher query to the correct workflow.
 * Now delegates to src/ai/router/intentMap.ts for unified routing.
 *
 * @param query  - The teacher's natural language query
 * @param source - Where the query came from (defaults to 'unknown')
 */
export function matchIntent(query: string, source: EntrySource = 'unknown'): IntentMatch {
  const result = matchIntentNew(query, source)
  return {
    workflowId: result.workflowId,
    intent: result.intentId,
    label: result.label,
  }
}

/** Check if a query should trigger a workflow rather than a search. */
export function isWorkflowQuery(query: string): boolean {
  return isWorkflowQueryNew(query)
}

// Re-export types for consumers
export type { IntentMatchResult, EntrySource }

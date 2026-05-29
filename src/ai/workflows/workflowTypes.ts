// ── Step Types ────────────────────────────────────────

export type WorkflowStepType =
  | 'context_injection'
  | 'intent_parsing'
  | 'resource_fetching'
  | 'ai_recommendation'
  | 'teaching_suggestion'
  | 'assignment_action'
  | 'output_generation'
  | 'teacher_review'

// ── Workflow Category ─────────────────────────────────

export type WorkflowCategory =
  | 'resource'
  | 'generation'
  | 'teaching'
  | 'analysis'
  | 'assignment'

// ── Step Status ───────────────────────────────────────

export type StepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped'

// ── Step Result ───────────────────────────────────────

export interface StepResult {
  stepId: string
  status: StepStatus
  data: Record<string, unknown>
  summary: string
  /** If failed, the reason */
  error?: string
  /** Duration in ms */
  duration: number
}

// ── Workflow Step ─────────────────────────────────────

export interface WorkflowStep {
  id: string
  name: string
  type: WorkflowStepType
  description: string
  /** Whether the teacher can override this step's output */
  editable: boolean
  execute: (ctx: WorkflowExecutionContext) => Promise<StepResult>
}

// ── Workflow Context ──────────────────────────────────

export interface WorkflowExecutionContext {
  /** Workflow run ID */
  runId: string

  /** Teacher's current context */
  textbook: string
  unit: string
  grade: string
  className: string
  studentCount: number
  region: string

  /** Trigger info */
  triggerQuery: string
  triggerIntent: WorkflowTriggerIntent

  /** Accumulated step outputs */
  stepResults: Map<string, StepResult>

  /** Teacher overrides (e.g., change quantity, difficulty) */
  overrides: Map<string, unknown>

  /** Metadata */
  startedAt: number
  estimatedTotalTime: string
}

export interface WorkflowTriggerIntent {
  category: WorkflowCategory
  resourceTypes: string[]
  teachingGoal: string | null
  aiTask: string | null
  entities: {
    grade: string | null
    unit: string | null
    textbook: string | null
    keywords: string[]
    quantity: number | null
    topic: string | null
  }
}

// ── Workflow Definition ───────────────────────────────

export interface WorkflowDefinition {
  id: string
  name: string
  category: WorkflowCategory
  description: string
  /** Keywords that should trigger this workflow */
  triggerKeywords: string[]
  /** AI tasks this workflow handles */
  triggerTasks: string[]
  /** Estimated total time */
  estimatedTime: string
  /** Output type (what the teacher gets) */
  outputType: string
  /** Tags for display */
  tags: string[]
  /** The pipeline steps */
  steps: WorkflowStep[]
}

// ── Workflow Run ──────────────────────────────────────

export interface WorkflowRun {
  id: string
  workflowId: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  context: WorkflowExecutionContext
  currentStepIndex: number
  startedAt: number
  completedAt?: number
}

// ── Workflow Result (for UI) ──────────────────────────

export interface WorkflowUIRresult {
  workflowId: string
  workflowName: string
  category: WorkflowCategory
  status: 'completed' | 'failed'
  steps: StepResult[]
  output: WorkflowOutput
  suggestions: string[]
  /** Things the teacher can adjust */
  adjustableParams: AdjustableParam[]
}

export interface WorkflowOutput {
  type: 'pdf' | 'text' | 'list' | 'cards' | 'score'
  title: string
  summary: string
  detail?: string
  items?: WorkflowOutputItem[]
  metadata?: Record<string, string>
}

export interface WorkflowOutputItem {
  label: string
  value: string
  secondary?: string
}

export interface AdjustableParam {
  key: string
  label: string
  type: 'number' | 'select' | 'boolean' | 'text'
  currentValue: unknown
  options?: { label: string; value: string }[]
}

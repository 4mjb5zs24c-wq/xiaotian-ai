/**
 * Multi-Agent Orchestrator — Type Definitions
 *
 * Agent = 独立 AI 角色，通过 AgentContext 共享状态。
 * Orchestrator = 协调 Agent 的循环执行器（planner → tool → reviewer → memory）。
 *
 * 与固定 workflow 的本质区别：
 *   Agent 可以自主决定 nextAgent / need_replan / need_tool，
 *   而不是按照硬编码的 step 顺序执行。
 */

import type { LLMTool } from '../llm/types'

// ── Agent Interface ────────────────────────────────────

export interface Agent {
  id: string
  name: string
  description: string

  /**
   * Execute this agent's task.
   * Returns a status that tells the orchestrator what to do next.
   */
  run(ctx: AgentContext): Promise<AgentResult>
}

// ── Agent Context ──────────────────────────────────────

export interface AgentContext {
  /** Session identifier */
  sessionId: string
  /** Original user input */
  userInput: string
  /** Current workflow ID if applicable */
  workflowId?: string

  /** Accumulated memory entries */
  memory: MemoryRecord[]
  /** Conversation messages */
  messages: AgentMessageRecord[]
  /** Step execution results (cross-agent shared state) */
  stepResults: Map<string, unknown>

  /** Available tools (injected by orchestrator) */
  tools: LLMTool[]

  /** Teaching strategy plan (injected by orchestrator at startup) */
  strategy?: import('../strategy/types').TeachingStrategyPlan

  /** Teacher & class metadata */
  metadata: {
    teacherName: string
    textbook: string
    unit: string
    grade: string
    className: string
    studentCount: number
  }

  /** Max number of re-plan attempts */
  maxRetries: number
}

export interface MemoryRecord {
  key: string
  value: unknown
  timestamp: number
  agentId: string
}

export interface AgentMessageRecord {
  role: 'system' | 'user' | 'agent'
  content: string
  agentId?: string
  timestamp: number
}

// ── Agent Result ───────────────────────────────────────

export interface AgentResult {
  /** Execution status — tells orchestrator what to do next */
  status: 'completed' | 'need_tool' | 'need_replan' | 'need_human' | 'failed'

  /** Structured output (varies by agent) */
  output?: unknown

  /** Tool calls to execute (when status = 'need_tool') */
  toolCalls?: ToolCallRequest[]

  /** Suggest next agent to run (planner sets this) */
  nextAgent?: string

  /** Human-readable summary */
  summary: string

  /** Human interaction request (when status = 'need_human') */
  humanRequest?: {
    type: 'confirm' | 'select' | 'edit' | 'approval' | 'input'
    title: string
    description: string
    payload?: unknown
    options?: Array<{ id: string; label: string; description: string; data?: unknown }>
  }

  /** Error message if failed */
  error?: string
}

export interface ToolCallRequest {
  toolName: string
  args: Record<string, unknown>
}

// ── Execution Plan (from Planner) ──────────────────────

export interface ExecutionPlan {
  goal: string
  steps: PlanStep[]
  estimatedRounds: number
}

export interface PlanStep {
  order: number
  agentId: string
  task: string
  toolNames?: string[]
  dependsOn?: number[]
}

// ── Orchestrator Trace ─────────────────────────────────

export interface OrchestratorTrace {
  round: number
  agentId: string
  agentName: string
  status: string
  summary: string
  durationMs: number
  timestamp: number
}

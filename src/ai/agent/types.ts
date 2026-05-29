/**
 * Multi-Agent System — Type Definitions
 *
 * Agent = 独立 AI 角色，拥有自己的 prompt、tools、memory 和 capabilities。
 * Planner = 分析用户目标，决定调用哪些 Agent、以什么顺序执行。
 * Executor = 执行 Planner 生成的 ExecutionPlan。
 */

import type { RuntimeContext } from '../context/types'

// ── Agent Definition ───────────────────────────────────

export interface AgentDefinition {
  /** Unique agent ID */
  id: string
  /** Display name */
  name: string
  /** What this agent does */
  description: string
  /** Agent role (e.g. "vocabulary", "writing", "planning") */
  role: AgentRole
  /** System prompt that defines this agent's behavior */
  systemPrompt: string
  /** Tools this agent is allowed to use (permission system) */
  tools: string[]
  /** What this agent can do */
  capabilities: AgentCapability[]
  /** Priority for parallel execution (higher = more independent) */
  parallelism: number
  /** Execute this agent's task */
  execute(ctx: AgentExecuteContext): Promise<AgentResult>
}

export type AgentRole =
  | 'planner'
  | 'vocabulary'
  | 'writing'
  | 'listening'
  | 'analysis'
  | 'exam'
  | 'resource'

export interface AgentCapability {
  name: string
  description: string
  /** Tags for matching user intent */
  keywords: string[]
}

// ── Execution ──────────────────────────────────────────

export interface AgentExecuteContext {
  /** Task assigned by planner */
  task: string
  /** Full runtime context */
  runtimeContext: RuntimeContext
  /** Messages from other agents (via message bus) */
  incomingMessages: AgentMessage[]
  /** Shared memory accessible to all agents */
  sharedMemory: SharedMemory
}

export interface AgentResult {
  agentId: string
  agentName: string
  success: boolean
  output: string
  data: Record<string, unknown>
  /** Messages for other agents */
  outgoingMessages: AgentMessage[]
  /** Duration in ms */
  duration: number
}

// ── Execution Plan ─────────────────────────────────────

export interface ExecutionPlan {
  /** Plan ID */
  id: string
  /** Original user goal */
  goal: string
  /** Steps to execute */
  steps: ExecutionStep[]
  /** Whether steps can run in parallel */
  parallelGroups: number[][]
  /** Estimated total time */
  estimatedTime: string
}

export interface ExecutionStep {
  /** Step index */
  index: number
  /** Agent to execute this step */
  agentId: string
  /** What the agent should do */
  task: string
  /** Dependencies (step indices that must complete first) */
  dependencies: number[]
  /** Whether this step is optional */
  optional: boolean
  /** Priority (lower = earlier) */
  priority: number
}

// ── Agent Message Bus ──────────────────────────────────

export interface AgentMessage {
  id: string
  from: string // agentId
  to: string   // agentId or 'all'
  type: 'context' | 'finding' | 'request' | 'result' | 'error'
  content: string
  data: Record<string, unknown>
  timestamp: number
}

// ── Shared Memory ──────────────────────────────────────

export interface SharedMemory {
  /** Key-value store shared across agents */
  store: Map<string, unknown>
  /** Set a value visible to all agents */
  set(key: string, value: unknown): void
  /** Get a value set by any agent */
  get<T = unknown>(key: string): T | undefined
  /** All keys set so far */
  keys(): string[]
  /** Clear all */
  clear(): void
}

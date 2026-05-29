// ── Agent Chat Loop ──
export { agentChatLoop } from './agentChatLoop'
export type { AgentLoopParams, AgentLoopRound, AgentLoopResult } from './agentChatLoop'

// ── Agent Types ──
export type {
  AgentDefinition,
  AgentRole,
  AgentCapability,
  AgentExecuteContext,
  AgentResult,
  ExecutionPlan,
  ExecutionStep,
  AgentMessage,
  SharedMemory,
} from './types'

// ── Agent Registry ──
export {
  registerAgent,
  getAgent,
  listAgents,
  listAgentIds,
  findAgentsByCapability,
  getAgentsByRole,
} from './agentRegistry'

// ── Agent Executor ──
export { executePlan, recordMultiAgentRun } from './agentExecutor'
export type { MultiAgentResult } from './agentExecutor'

// ── Shared Memory ──
export { createSharedMemory } from './sharedMemory'

// ── Message Bus ──
export {
  sendMessage,
  getMessagesFor,
  getMessagesFrom,
  getRecentMessages,
} from './agentMessageBus'

// ── Tool Executor ──
export {
  detectToolCalls,
  executeToolCalls,
  appendToolResults,
  runToolLoop,
} from './toolExecutor'
export type { ExecutedToolCall, ToolExecutionResult } from './toolExecutor'

// ── Auto-register all specialized agents ──
import '../agents/vocabAgent'
import '../agents/writingAgent'
import '../agents/analysisAgent'
import '../agents/listeningAgent'

/**
 * Agent Executor —— 多 Agent 计划执行器
 *
 * 职责：
 *   1. 接收 Planner 的 ExecutionPlan
 *   2. 按并行组顺序执行
 *   3. 同组内 Agent 并行执行
 *   4. 收集所有 AgentResult
 *   5. 传递 sharedMemory 和 messages
 *
 * 执行模式：
 *   - sequential:  按依赖顺序串行
 *   - parallel:    无依赖的步骤同时执行
 *   - conditional:  根据前一步结果决定是否继续
 */

import type { ExecutionPlan, AgentResult, AgentExecuteContext, SharedMemory } from './types'
import { getAgent } from './agentRegistry'
import { buildRuntimeContext } from '../context/contextEngine'
import { createSharedMemory } from './sharedMemory'
import { clear as clearMessages } from './agentMessageBus'
import { getRecentMessages } from './agentMessageBus'
import { recordWorkflowRun } from '../memory/workflowHistory'

// ── Execution ──────────────────────────────────────────

export interface MultiAgentResult {
  plan: ExecutionPlan
  results: AgentResult[]
  allSuccess: boolean
  totalTime: number
  agentCallCount: number
  summary: string
}

export async function executePlan(
  plan: ExecutionPlan,
  sharedMemory?: SharedMemory,
): Promise<MultiAgentResult> {
  const t0 = performance.now()
  const memory = sharedMemory || createSharedMemory()
  clearMessages()

  // Store plan in shared memory
  memory.set('executionPlan', plan)

  // Build runtime context
  const runtimeCtx = await buildRuntimeContext({})

  const allResults: AgentResult[] = []

  console.log(`\n🚀 Multi-Agent Execution: ${plan.goal}`)
  console.log(`   Steps: ${plan.steps.length} | Groups: ${plan.parallelGroups.length}`)

  // Execute by parallel groups
  for (const group of plan.parallelGroups) {
    const groupSteps = group
      .map((idx) => plan.steps.find((s) => s.index === idx))
      .filter(Boolean)

    if (group.length === 1) {
      // Sequential step
      const step = groupSteps[0]!
      const result = await executeStep(step, runtimeCtx, memory,
        allResults.flatMap((r) => r.outgoingMessages),
      )
      allResults.push(result)

      // Stop on critical failure
      if (!result.success && !step.optional) {
        console.log(`  ❌ Step ${step.index} failed (non-optional), stopping execution`)
        break
      }
    } else {
      // Parallel steps
      console.log(`  ⚡ Parallel: [${group.join(', ')}]`)
      const parallelResults = await Promise.all(
        groupSteps.map((step) =>
          executeStep(step!, runtimeCtx, memory,
            allResults.flatMap((r) => r.outgoingMessages),
          ),
        ),
      )
      allResults.push(...parallelResults)
    }
  }

  const totalTime = Math.round(performance.now() - t0)
  const allSuccess = allResults.every((r) => r.success)
  const agentCount = new Set(allResults.map((r) => r.agentId)).size

  const summary = allSuccess
    ? `${agentCount} 个 Agent 协作完成：${allResults.map((r) => `${r.agentName}(${r.duration}ms)`).join(', ')}`
    : `部分 Agent 执行失败`

  console.log(`\n🏁 Multi-Agent Done: ${summary} | ${totalTime}ms\n`)

  return {
    plan,
    results: allResults,
    allSuccess,
    totalTime,
    agentCallCount: allResults.length,
    summary,
  }
}

// ── Step Executor ──────────────────────────────────────

async function executeStep(
  step: ExecutionPlan['steps'][number],
  runtimeCtx: Awaited<ReturnType<typeof buildRuntimeContext>>,
  sharedMemory: SharedMemory,
  incomingMessages: AgentExecuteContext['incomingMessages'],
): Promise<AgentResult> {
  const agent = getAgent(step.agentId)
  if (!agent) {
    return {
      agentId: step.agentId,
      agentName: '未知 Agent',
      success: false,
      output: `Agent "${step.agentId}" 未注册`,
      data: {},
      outgoingMessages: [],
      duration: 0,
    }
  }

  console.log(`  ▶ Step ${step.index}: [${agent.name}] ${step.task}`)

  const ctx: AgentExecuteContext = {
    task: step.task,
    runtimeContext: runtimeCtx,
    incomingMessages: [
      ...incomingMessages,
      ...getRecentMessages(10).filter((m) => m.to === agent.id || m.to === 'all'),
    ],
    sharedMemory,
  }

  const result = await agent.execute(ctx)

  // Store result in shared memory for downstream agents
  sharedMemory.set(`result:${agent.id}`, result)
  sharedMemory.set(`result:step:${step.index}`, result)

  console.log(`    ${result.success ? '✓' : '✗'} ${agent.name}: ${result.output.substring(0, 80)} (${result.duration}ms)`)

  return result
}

// ── Record workflow ────────────────────────────────────

export async function recordMultiAgentRun(result: MultiAgentResult) {
  await recordWorkflowRun({
    workflowId: 'multi-agent',
    workflowName: `多 Agent 协作: ${result.plan.goal.substring(0, 40)}`,
    trigger: result.plan.goal,
    status: result.allSuccess ? 'completed' : 'failed',
    summary: result.summary,
    toolCallCount: result.agentCallCount,
    sessionId: 'multi-agent-session',
  })
}

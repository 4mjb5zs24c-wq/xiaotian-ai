/**
 * Agent Orchestrator —— 多 Agent 编排引擎（核心）
 *
 * 这是整个系统的"指挥中心"。
 * 替代固定的 workflow step.execute()，
 * Agent 可以自主决定下一步、重新规划、重试。
 *
 * 核心循环:
 *
 *   while (not finished && retries < max):
 *
 *     planner.run()      → 分析意图，生成执行计划
 *       ↓
 *     tool.run()         → 执行计划中的工具调用
 *       ↓
 *     reviewer.run()     → 检查结果质量
 *       ↓
 *     if need_replan:
 *       goto planner       (重新规划，最多 5 次)
 *       ↓
 *     memory.run()       → 保存结果
 *       ↓
 *     finished = true
 *
 * 完整 console trace:
 *
 *   ╔══ Agent Orchestrator 启动 ══╗
 *   ║ 用户: 帮我准备 Unit3 明天小测
 *   ╚══════════════════════════════╝
 *
 *   ┌─ Round 1 ───────────────────┐
 *   │ 🧠 [Planner] 分析意图...     │
 *   │ 📋 计划: 5 步                │
 *   │ 🔧 [Tool] 执行工具...        │
 *   │ 🔍 [Reviewer] 检查质量...    │
 *   │ 💾 [Memory] 保存结果...       │
 *   │ ✅ 完成 | 1432ms             │
 *   └──────────────────────────────┘
 */

import type { AgentContext, AgentResult, OrchestratorTrace } from './types'
import { getAgent } from './agentRegistry'
import { requestInteraction } from '../human/humanEventBus'
import type { HumanInteractionResponse } from '../human/types'
import { generateTeachingStrategy } from '../strategy/strategyEngine'
import type { ClassProfile } from '../strategy/types'

// Auto-register all agents
import './plannerAgent'
import './toolAgent'
import './reviewerAgent'
import './memoryAgent'

// ── Orchestrator ───────────────────────────────────────

export interface OrchestratorParams {
  userInput: string
  sessionId?: string
  metadata: AgentContext['metadata']
}

export interface OrchestratorResult {
  success: boolean
  traces: OrchestratorTrace[]
  finalOutput: unknown
  summary: string
  totalRounds: number
  totalTimeMs: number
}

export async function runAgentOrchestrator(
  params: OrchestratorParams,
): Promise<OrchestratorResult> {
  const t0 = performance.now()

  console.log('\n╔══════════════════════════════════════╗')
  console.log('║  🎯 Agent Orchestrator 启动           ║')
  console.log('╠══════════════════════════════════════╣')
  console.log(`║  用户: ${params.userInput.substring(0, 40)}`)
  console.log(`║  班级: ${params.metadata.className} | ${params.metadata.unit}`)
  console.log('╚══════════════════════════════════════╝')

  // ── Build AgentContext ─────────────────────────────
  const ctx: AgentContext = {
    sessionId: params.sessionId || `orch-${Date.now()}`,
    userInput: params.userInput,
    workflowId: params.metadata.unit,
    memory: [],
    messages: [{
      role: 'user',
      content: params.userInput,
      timestamp: Date.now(),
    }],
    stepResults: new Map(),
    tools: [],
    metadata: params.metadata,
    maxRetries: 5,
  }

  // ── Inject Teaching Strategy ──────────────────────────
  const classProfile: ClassProfile = {
    grade: params.metadata.grade,
    className: params.metadata.className,
    studentCount: params.metadata.studentCount,
    textbook: params.metadata.textbook,
    currentUnit: params.metadata.unit,
    recentAvgScore: 84.7,
    weakPoints: [
      { topic: '可数/不可数名词', errorRate: 43 },
      { topic: '阅读理解主旨推断', errorRate: 42 },
    ],
    strongPoints: ['词汇拼写', '句型转换'],
    level: 'normal',
    region: 'guangdong',
    examStage: 'midterm',
  }
  ctx.strategy = generateTeachingStrategy(classProfile)
  ctx.stepResults.set('strategy_plan', ctx.strategy)

  const traces: OrchestratorTrace[] = []
  const MAX_ROUNDS = 5
  let retryCount = 0
  let finished = false
  let finalResult: AgentResult | null = null

  // ── Orchestration Loop ─────────────────────────────
  for (let round = 1; round <= MAX_ROUNDS && !finished; round++) {
    console.log(`\n┌─ Round ${round}/${MAX_ROUNDS} ${retryCount > 0 ? `(re-plan #${retryCount})` : ''} ──────────────┐`)

    // ── Phase 1: Plan ───────────────────────────────
    const planner = getAgent('planner')!
    const planResult = await runAgent('planner', planner, ctx)
    traces.push(makeTrace(round, 'planner', planResult))

    if (planResult.status === 'failed') {
      finalResult = planResult
      break
    }

    // ── Phase 2: Execute Tools ──────────────────────
    const plan = ctx.stepResults.get('execution_plan') as { steps: Array<{ agentId: string }> } | undefined
    const toolSteps = plan?.steps?.filter((s) => s.agentId === 'tool') || []

    for (let i = 0; i < toolSteps.length; i++) {
      const tool = getAgent('tool')!
      // Execute each tool step
      const toolResult = await runAgent('tool', tool, ctx)
      traces.push(makeTrace(round, `tool[${i}]`, toolResult))

      if (toolResult.status === 'failed') {
        finalResult = toolResult
        break
      }
    }

    if (finalResult?.status === 'failed') break

    // ── Phase 3: Review ─────────────────────────────
    const reviewer = getAgent('reviewer')!
    const reviewResult = await runAgent('reviewer', reviewer, ctx)
    traces.push(makeTrace(round, 'reviewer', reviewResult))

    if (reviewResult.status === 'need_replan') {
      retryCount++
      if (retryCount >= MAX_ROUNDS) {
        console.log(`  ⚠️  达到最大重试次数 (${MAX_ROUNDS})，强制结束`)
        finalResult = reviewResult
        break
      }
      console.log(`  🔄 Reviewer 不通过 → 重新规划 (第 ${retryCount} 次)`)
      // Reset step index for re-plan
      ctx.stepResults.set('current_step_index', 0)
      continue // ← re-enter loop → planner runs again
    }

    // ── Phase 3b: Human-in-the-Loop ──────────────────
    if (reviewResult.status === 'need_human' && reviewResult.humanRequest) {
      const hr = reviewResult.humanRequest

      console.log(`  👩‍🏫 [Human] 等待老师决策...`)

      // Pause workflow — wait for teacher response
      const humanResponse: HumanInteractionResponse = await requestInteraction({
        type: hr.type,
        title: hr.title,
        description: hr.description,
        payload: hr.payload,
        options: hr.options,
        required: true,
        timeout: 120000,
        sourceAgent: 'reviewer',
      })

      traces.push({
        round,
        agentId: 'human',
        agentName: '王老师',
        status: humanResponse.action,
        summary: humanResponse.comment || `老师选择了: ${humanResponse.action}`,
        durationMs: 0,
        timestamp: Date.now(),
      })

      console.log(`  👩‍🏫 [Human] 老师决策: ${humanResponse.action}${humanResponse.selectedOption ? ` → ${humanResponse.selectedOption}` : ''}`)

      // Record teacher preference in context memory
      ctx.memory.push({
        key: 'teacher_feedback',
        value: {
          action: humanResponse.action,
          selectedOption: humanResponse.selectedOption,
          comment: humanResponse.comment,
          requestTitle: hr.title,
          timestamp: Date.now(),
        },
        timestamp: Date.now(),
        agentId: 'human',
      })

      // Handle teacher's decision
      switch (humanResponse.action) {
        case 'approve':
          // Continue normally
          console.log(`  ✅ 老师批准 → 继续执行`)
          break

        case 'reject':
          // Teacher rejects → re-plan
          retryCount++
          if (retryCount >= MAX_ROUNDS) {
            finalResult = { ...reviewResult, status: 'failed', summary: '老师多次拒绝，达到最大重试次数' }
            break
          }
          console.log(`  🔄 老师拒绝 → 重新规划`)
          ctx.stepResults.set('current_step_index', 0)
          continue

        case 'edit':
          // Teacher wants to edit → store edited data and re-run tool phase
          if (humanResponse.editedPayload) {
            ctx.stepResults.set('teacher_edit', humanResponse.editedPayload)
            console.log(`  ✏️  老师编辑了内容 → 继续执行`)
          }
          break

        case 'select':
          // Teacher selected an option → store selection
          if (humanResponse.selectedOption) {
            ctx.stepResults.set('teacher_selection', humanResponse.selectedOption)
            console.log(`  📋 老师选择了: ${humanResponse.selectedOption}`)
            // If "lower_difficulty" or "raise_difficulty" → trigger re-plan with new params
            if (humanResponse.selectedOption === 'lower_difficulty' || humanResponse.selectedOption === 'raise_difficulty') {
              ctx.stepResults.set('current_step_index', 0)
              ctx.metadata.unit = ctx.metadata.unit // keep context, adjust plan
              continue
            }
          }
          break

        case 'skip':
          console.log(`  ⏭️  老师跳过 → 继续执行`)
          break
      }
    }

    if (reviewResult.status === 'failed') {
      finalResult = reviewResult
      break
    }

    // ── Phase 4: Save to Memory ─────────────────────
    const memory = getAgent('memory')!
    const memResult = await runAgent('memory', memory, ctx)
    traces.push(makeTrace(round, 'memory', memResult))

    finalResult = memResult
    finished = true
    console.log(`└─ ✅ 完成 ──────────────────────────────────────┘`)
  }

  const totalTime = Math.round(performance.now() - t0)

  console.log(`\n╔══════════════════════════════════════════╗`)
  console.log(`║  🏁 Orchestrator 完成                     ║`)
  console.log(`╠══════════════════════════════════════════╣`)
  console.log(`║  Rounds: ${traces.length} traces | Retries: ${retryCount} | Time: ${totalTime}ms`)
  console.log(`║  Result: ${finalResult?.status || 'unknown'} | ${finalResult?.summary || ''}`)
  console.log(`╚══════════════════════════════════════════╝\n`)

  return {
    success: finalResult?.status === 'completed',
    traces,
    finalOutput: finalResult?.output,
    summary: finalResult?.summary || '执行完成',
    totalRounds: traces.length,
    totalTimeMs: totalTime,
  }
}

// ── Agent Runner ───────────────────────────────────────

async function runAgent(
  _id: string,
  agent: { name: string; run(ctx: AgentContext): Promise<AgentResult> },
  ctx: AgentContext,
): Promise<AgentResult> {
  const t0 = performance.now()
  const result = await agent.run(ctx)
  const dur = Math.round(performance.now() - t0)
  return { ...result, output: { ...(result.output as object || {}), _duration: dur } }
}

function makeTrace(round: number, agentId: string, result: AgentResult): OrchestratorTrace {
  return {
    round,
    agentId,
    agentName: agentId,
    status: result.status,
    summary: result.summary,
    durationMs: (result.output as Record<string, unknown>)?._duration as number || 0,
    timestamp: Date.now(),
  }
}

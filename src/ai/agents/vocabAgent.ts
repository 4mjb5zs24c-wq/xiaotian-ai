/**
 * Vocab Agent —— 词汇专家
 *
 * 能力：获取词汇表、筛选重点词、生成默写/听写内容
 * 工具：get_unit_vocabulary, filter_difficulty, generate_dictation
 */

import type { AgentDefinition, AgentExecuteContext, AgentResult } from '../agent/types'
import { registerAgent } from '../agent/agentRegistry'
import { sendMessage } from '../agent/agentMessageBus'
import { getToolsForWorkflow } from '../tools/toolRegistry'
import { agentChatLoop } from '../agent/agentChatLoop'

export const vocabAgent: AgentDefinition = {
  id: 'vocab-agent',
  name: '词汇专家',
  description: '负责词汇相关任务：获取词汇表、筛选重点词、生成默写/听写内容',
  role: 'vocabulary',
  systemPrompt: `你是英语词汇教学专家。你负责：
- 从教材词汇表中获取指定单元的词汇
- 根据核心度、中考考频、易错程度筛选重点词
- 生成多种模式的默写/听写内容（中译英、英译中、混合、听音拼写）

你只处理词汇相关任务。其他任务交给对应 Agent。`,
  tools: ['get_unit_vocabulary', 'filter_difficulty', 'generate_dictation'],
  capabilities: [
    { name: '词汇获取', description: '从教材获取指定单元词汇表', keywords: ['词汇', '单词', 'vocabulary', '单元'] },
    { name: '词汇筛选', description: '筛选重点词、高频词、易错词', keywords: ['筛选', '重点', '高频', '易错'] },
    { name: '默写生成', description: '生成默写/听写题目', keywords: ['默写', '听写', 'dictation', '拼写'] },
  ],
  parallelism: 5,

  async execute(ctx: AgentExecuteContext): Promise<AgentResult> {
    const t0 = performance.now()
    const tools = getToolsForWorkflow('vocab-dictation')

    const result = await agentChatLoop({
      tools,
      messages: [{ role: 'user', content: ctx.task }],
      context: {
        runId: ctx.runtimeContext.sessionId,
        textbook: ctx.runtimeContext.classInfo.textbook,
        unit: ctx.runtimeContext.classInfo.currentUnit,
        grade: ctx.runtimeContext.classInfo.grade,
        className: ctx.runtimeContext.classInfo.name,
        previousResults: Object.fromEntries(ctx.sharedMemory.store),
      },
      runtimeContext: ctx.runtimeContext,
    })

    // Share findings with other agents
    sendMessage({
      from: 'vocab-agent',
      to: 'analysis-agent',
      type: 'finding',
      content: `词汇处理完成：${result.totalToolCalls} 个工具调用`,
      data: { toolCount: result.totalToolCalls, rounds: result.totalRounds },
    })

    return {
      agentId: 'vocab-agent',
      agentName: '词汇专家',
      success: true,
      output: result.finalResponse.content || '词汇任务完成',
      data: { toolCount: result.totalToolCalls, rounds: result.totalRounds },
      outgoingMessages: [],
      duration: Math.round(performance.now() - t0),
    }
  },
}

registerAgent(vocabAgent)

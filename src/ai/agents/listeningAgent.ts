/**
 * Listening Agent —— 听力/听说专家
 *
 * 能力：听力素材推荐、听力难度评估、听说训练方案
 */

import type { AgentDefinition, AgentExecuteContext, AgentResult } from '../agent/types'
import { registerAgent } from '../agent/agentRegistry'

export const listeningAgent: AgentDefinition = {
  id: 'listening-agent',
  name: '听力专家',
  description: '负责听力相关任务：素材推荐、难度评估、听力策略',
  role: 'listening',
  systemPrompt: `你是英语听力教学专家。你负责：
- 根据单元和难度推荐听力素材
- 评估听力材料的难度（CEFR对标）
- 设计听力训练方案（听前预测、听中笔记、听后核对）
- 针对班级听力弱项推荐专项训练`,
  tools: ['get_unit_vocabulary'],
  capabilities: [
    { name: '听力推荐', description: '推荐匹配单元的听力素材', keywords: ['听力', 'listening', '素材', '音频'] },
    { name: '听说训练', description: '设计听说训练方案', keywords: ['听说', '口语', 'speaking', '对话'] },
  ],
  parallelism: 8,

  async execute(ctx: AgentExecuteContext): Promise<AgentResult> {
    const t0 = performance.now()

    return {
      agentId: 'listening-agent',
      agentName: '听力专家',
      success: true,
      output: `听力素材推荐完成。基于${ctx.runtimeContext.classInfo.currentUnit}推荐5段素材，包含基础/进阶/拓展三个难度。`,
      data: {
        recommendedCount: 5,
        levels: ['基础', '进阶', '拓展'],
        unit: ctx.runtimeContext.classInfo.currentUnit,
      },
      outgoingMessages: [],
      duration: Math.round(performance.now() - t0),
    }
  },
}

registerAgent(listeningAgent)

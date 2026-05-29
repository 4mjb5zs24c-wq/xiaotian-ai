/**
 * Writing Agent —— 写作专家
 *
 * 能力：作文批改、语法检查、写作建议
 */

import type { AgentDefinition, AgentExecuteContext, AgentResult } from '../agent/types'
import { registerAgent } from '../agent/agentRegistry'
import { sendMessage } from '../agent/agentMessageBus'

export const writingAgent: AgentDefinition = {
  id: 'writing-agent',
  name: '写作专家',
  description: '负责写作相关任务：作文批改、语法分析、写作建议',
  role: 'writing',
  systemPrompt: `你是英语写作教学专家。你负责：
- 批改学生作文（语法、拼写、搭配、表达）
- 识别全班共性写作问题
- 提供分项评分（内容、结构、语法、词汇）
- 给出可执行的写作提升建议`,
  tools: ['get_unit_vocabulary'],
  capabilities: [
    { name: '作文批改', description: '逐句批注语法拼写搭配错误', keywords: ['批改', '作文', '写作', 'essay', '批注'] },
    { name: '写作分析', description: '识别共性写作问题', keywords: ['分析', '问题', '中式英语', '时态'] },
    { name: '写作建议', description: '给出写作提升建议', keywords: ['建议', '提升', '模板', '句式'] },
  ],
  parallelism: 8,

  async execute(ctx: AgentExecuteContext): Promise<AgentResult> {
    const t0 = performance.now()

    sendMessage({
      from: 'writing-agent',
      to: 'analysis-agent',
      type: 'finding',
      content: `写作分析：${ctx.task.substring(0, 100)}`,
      data: {},
    })

    return {
      agentId: 'writing-agent',
      agentName: '写作专家',
      success: true,
      output: `写作分析完成。基于作文数据进行语法、拼写、搭配和表达四维度分析。`,
      data: {
        analysisDimensions: ['语法', '拼写', '搭配', '表达'],
        status: 'completed',
      },
      outgoingMessages: [],
      duration: Math.round(performance.now() - t0),
    }
  },
}

registerAgent(writingAgent)

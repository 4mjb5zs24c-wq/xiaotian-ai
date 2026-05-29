/**
 * Agent Message Bus —— Agent 间通信通道
 *
 * Agent 通过 messageBus 传递：
 *   - context: 上下文信息
 *   - finding: 分析发现
 *   - request: 请求其他 agent 协助
 *   - result:  执行结果
 *   - error:   错误信息
 */

import type { AgentMessage } from './types'

const messages: AgentMessage[] = []
let idCounter = 0

export function sendMessage(params: {
  from: string
  to: string
  type: AgentMessage['type']
  content: string
  data?: Record<string, unknown>
}): AgentMessage {
  const msg: AgentMessage = {
    id: `msg-${Date.now()}-${++idCounter}`,
    from: params.from,
    to: params.to,
    type: params.type,
    content: params.content,
    data: params.data || {},
    timestamp: Date.now(),
  }
  messages.push(msg)

  // Keep max 200 messages
  if (messages.length > 200) messages.shift()

  return msg
}

export function getMessagesFor(agentId: string): AgentMessage[] {
  return messages.filter(
    (m) => m.to === agentId || m.to === 'all',
  )
}

export function getMessagesFrom(agentId: string): AgentMessage[] {
  return messages.filter((m) => m.from === agentId)
}

export function getRecentMessages(limit = 20): AgentMessage[] {
  return messages.slice(-limit)
}

export function clear() {
  messages.length = 0
}

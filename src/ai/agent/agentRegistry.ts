/**
 * Agent Registry —— 所有 Agent 的中央注册表
 *
 * Planner 通过 registry 发现可用 Agent，
 * 根据 capabilities 匹配最适合的 Agent。
 */

import type { AgentDefinition } from './types'

const agents = new Map<string, AgentDefinition>()

export function registerAgent(agent: AgentDefinition) {
  if (agents.has(agent.id)) {
    console.warn(`Agent "${agent.id}" already registered, overwriting.`)
  }
  agents.set(agent.id, agent)
}

export function getAgent(id: string): AgentDefinition | undefined {
  return agents.get(id)
}

export function listAgents(): AgentDefinition[] {
  return Array.from(agents.values())
}

export function listAgentIds(): string[] {
  return Array.from(agents.keys())
}

/**
 * Find agents whose capabilities match the given keywords.
 * Used by Planner to decide which agent to assign to a task.
 */
export function findAgentsByCapability(keywords: string[]): AgentDefinition[] {
  const results: Array<{ agent: AgentDefinition; score: number }> = []

  for (const agent of agents.values()) {
    let score = 0
    for (const cap of agent.capabilities) {
      for (const kw of keywords) {
        if (cap.keywords.some((k) => k.includes(kw) || kw.includes(k))) {
          score += 1
        }
        if (cap.description.includes(kw)) score += 0.5
      }
    }
    if (score > 0) results.push({ agent, score })
  }

  return results
    .sort((a, b) => b.score - a.score)
    .map((r) => r.agent)
}

/**
 * Get agents by role.
 */
export function getAgentsByRole(role: string): AgentDefinition[] {
  return Array.from(agents.values()).filter((a) => a.role === role)
}

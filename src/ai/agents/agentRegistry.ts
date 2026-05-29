/**
 * Agent Registry — Orchestrator 版本
 *
 * 注册所有 Agent。Orchestrator 通过此注册表获取 Agent 实例。
 */

import type { Agent } from './types'

const agents = new Map<string, Agent>()

export function registerAgent(agent: Agent) {
  if (agents.has(agent.id)) {
    console.warn(`[registry] Agent "${agent.id}" overwritten`)
  }
  agents.set(agent.id, agent)
}

export function getAgent(id: string): Agent | undefined {
  return agents.get(id)
}

export function listAgents(): Agent[] {
  return Array.from(agents.values())
}

export function listAgentIds(): string[] {
  return Array.from(agents.keys())
}

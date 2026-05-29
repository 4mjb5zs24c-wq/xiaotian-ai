/**
 * Feature Flag System — 灰度发布控制
 *
 * 控制 AI 功能的逐步开放，支持按 persona 和百分比灰度。
 */

import type { FeatureFlag, TeacherPersonaType } from './types'

// ── Flag Registry ──────────────────────────────────────

const flags = new Map<string, FeatureFlag>()

registerFlag({
  key: 'ai-insight-v2',
  label: 'AI 洞察 v2',
  description: '基于 Strategy Engine 的智能洞察排序',
  enabled: true,
  rolloutPercent: 60,
  targetPersonas: ['experienced', 'head_teacher'],
})

registerFlag({
  key: 'strategy-engine',
  label: '教学策略引擎',
  description: '根据班级/地区/阶段自动调整教学策略',
  enabled: true,
  rolloutPercent: 40,
  targetPersonas: [],
})

registerFlag({
  key: 'smart-recommendation',
  label: '智能推荐理由',
  description: '展示 AI 推荐的具体原因（因子权重）',
  enabled: true,
  rolloutPercent: 80,
  targetPersonas: [],
})

registerFlag({
  key: 'auto-practice-basket',
  label: '自动练习篮',
  description: 'AI 自动将推荐资源加入练习篮',
  enabled: false,
  rolloutPercent: 20,
  targetPersonas: [],
})

registerFlag({
  key: 'human-review-panel',
  label: '人工审核面板',
  description: 'AI 生成结果后弹出教师确认面板',
  enabled: true,
  rolloutPercent: 70,
  targetPersonas: [],
})

registerFlag({
  key: 'debug-panel',
  label: '调试面板',
  description: '显示 Agent trace / tool logs / runtime logs',
  enabled: false,
  rolloutPercent: 5,
  targetPersonas: [],
})

// ── API ────────────────────────────────────────────────

function registerFlag(flag: FeatureFlag) {
  flags.set(flag.key, flag)
}

export function isFeatureEnabled(key: string, persona?: TeacherPersonaType): boolean {
  const flag = flags.get(key)
  if (!flag) return false
  if (!flag.enabled) return false

  // Check persona targeting
  if (flag.targetPersonas.length > 0 && persona) {
    if (!flag.targetPersonas.includes(persona)) return false
  }

  // Check rollout percentage (simulate with deterministic hash)
  if (flag.rolloutPercent < 100) {
    const hash = simpleHash(key)
    if (hash > flag.rolloutPercent) return false
  }

  return true
}

export function getAllFlags(): FeatureFlag[] {
  return Array.from(flags.values())
}

export function setFlag(key: string, enabled: boolean) {
  const flag = flags.get(key)
  if (flag) flag.enabled = enabled
}

function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 100
  }
  return hash
}

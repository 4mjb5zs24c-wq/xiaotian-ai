/**
 * LLM Client (v3 — Provider Manager)
 *
 * 统一入口：
 *   llm.chat(params)          — 单次调用
 *   llm.switchProvider(name)  — 按名称切换: 'mock' | 'openai' | 'claude' | 'deepseek'
 *   llm.getProviderInfo()     — 当前 provider 信息
 *
 * 所有 provider adapter 已自动注册，无需手动 import。
 */

import type { LLMChatParams, LLMResponse } from './types'
import {
  getActiveProvider,
  switchProvider,
  getActiveProviderInfo,
  getRegisteredProviders,
  registerProvider,
} from './providerManager'

// ── Auto-register all provider adapters ────────────────
// 每个 provider 文件在 import 时会自动调用 registerProvider()
import './openaiProvider'
import './claudeProvider'
import './deepseekProvider'

// ── Public API ─────────────────────────────────────────

/**
 * Single chat call. Goes through the active provider.
 * Returns unified LLMResponse — upper layers never see vendor format.
 */
export async function chat(params: LLMChatParams): Promise<LLMResponse> {
  return getActiveProvider().chat(params)
}

/**
 * Switch the active LLM provider by name.
 *
 * @example
 *   switchLLMProvider('openai')   // → GPT-4o
 *   switchLLMProvider('claude')   // → Claude Sonnet
 *   switchLLMProvider('deepseek') // → DeepSeek Chat
 *   switchLLMProvider('mock')     // → Mock (default)
 */
export function switchLLMProvider(name: string): boolean {
  return switchProvider(name)
}

/**
 * Get current provider info.
 */
export function getLLMProviderInfo() {
  return getActiveProviderInfo()
}

/**
 * List all registered provider names.
 */
export function listProviders(): string[] {
  return getRegisteredProviders()
}

/**
 * Register a custom provider at runtime.
 */
export { registerProvider as registerLLMProvider }

// ── Default export ─────────────────────────────────────

export const llm = {
  chat,
  switchProvider: switchLLMProvider,
  getProviderInfo: getLLMProviderInfo,
  listProviders,
  registerProvider,
}

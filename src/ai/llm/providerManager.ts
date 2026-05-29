/**
 * Provider Manager —— 多模型注册与热切换中心
 *
 * 支持按名称切换 Provider，无需重启：
 *   switchProvider('openai')
 *   switchProvider('claude')
 *   switchProvider('deepseek')
 *   switchProvider('mock')
 *
 * 架构保证：
 *   workflow / agent / tool 层完全不知道底层是哪家模型。
 */

import type { LLMProvider } from './types'
import { mockProvider } from './mockProvider'

// ── Provider Registry ──────────────────────────────────

const providers = new Map<string, LLMProvider>()

let activeProvider: LLMProvider = mockProvider
let activeProviderName = 'mock'

// ── Registration ───────────────────────────────────────

export function registerProvider(name: string, provider: LLMProvider) {
  providers.set(name, provider)
}

export function getRegisteredProviders(): string[] {
  return Array.from(providers.keys())
}

// ── Switching ──────────────────────────────────────────

export function switchProvider(name: string): boolean {
  const provider = providers.get(name)
  if (!provider) {
    console.warn(`Provider "${name}" 未注册。可用: ${getRegisteredProviders().join(', ')}`)
    return false
  }
  activeProvider = provider
  activeProviderName = name
  console.log(`🔄 Provider 已切换为: ${name} (${provider.model})`)
  return true
}

export function getActiveProvider(): LLMProvider {
  return activeProvider
}

export function getActiveProviderName(): string {
  return activeProviderName
}

export function getActiveProviderInfo(): {
  name: string
  model: string
  mock: boolean
} {
  return {
    name: activeProvider.name,
    model: activeProvider.model,
    mock: activeProviderName === 'mock',
  }
}

// ── Init ───────────────────────────────────────────────

// Mock is always available
registerProvider('mock', mockProvider)

// Real providers are registered but disabled by default.
// They will be registered only if API keys are configured.
// See openaiProvider.ts / claudeProvider.ts / deepseekProvider.ts

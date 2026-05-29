// ── Client ──
export {
  llm,
  chat,
  switchLLMProvider,
  getLLMProviderInfo,
  listProviders,
  registerLLMProvider,
} from './llmClient'

// ── Provider Manager ──
export {
  switchProvider,
  getActiveProvider,
  getActiveProviderName,
  getActiveProviderInfo,
  getRegisteredProviders,
  registerProvider,
} from './providerManager'

// ── Provider Adapters ──
export { openaiProvider } from './openaiProvider'
export { claudeProvider } from './claudeProvider'
export { deepseekProvider } from './deepseekProvider'
export { mockProvider } from './mockProvider'

// ── Types ──
export type {
  LLMMessage,
  LLMTool,
  LLMToolCall,
  LLMToolParameters,
  LLMToolProperty,
  LLMResponse,
  LLMUsage,
  LLMChatParams,
  LLMProvider,
} from './types'

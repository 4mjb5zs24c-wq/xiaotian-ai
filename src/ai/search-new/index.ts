/**
 * AI Search V2 — Public API
 *
 * 新 AI 搜索模块的对外接口。
 * 通过 matchNewSearch 实现搜索匹配，通过 mock action 函数实现动作闭环。
 */

export * from './types'
export * from './searchEngine'
export { SCENARIO_MAP } from './mock/scenarios'
export type { ScenarioName } from './mock/scenarios'

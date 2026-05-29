/**
 * Tool Registry —— 所有 Tool 的中央注册表
 *
 * 使用方式：
 *   registerTool(myTool)
 *   const result = await executeTool('tool_name', ctx, args)
 *   const tool = getTool('tool_name')
 *
 * 与 LLM 层的关系：
 *   getTool().parameters → 映射为 LLMTool.parameters → 传给 llm.chat()
 *   llm.chat() 返回 tool_calls → executeTool() 执行 → result 回传给 LLM
 */

import type { ToolDefinition, ToolExecuteContext, ToolResult } from './types'

const registry = new Map<string, ToolDefinition>()

export function registerTool(tool: ToolDefinition) {
  if (registry.has(tool.name)) {
    console.warn(`Tool "${tool.name}" already registered, overwriting.`)
  }
  registry.set(tool.name, tool)
}

export function getTool(name: string): ToolDefinition | undefined {
  return registry.get(name)
}

export function getAllTools(): ToolDefinition[] {
  return Array.from(registry.values())
}

export function getToolNames(): string[] {
  return Array.from(registry.keys())
}

/**
 * Execute a registered tool by name.
 * This is called after LLM returns tool_calls.
 */
export async function executeTool(
  name: string,
  ctx: ToolExecuteContext,
  args: Record<string, unknown>,
): Promise<ToolResult> {
  const tool = registry.get(name)
  if (!tool) {
    return {
      success: false,
      data: {},
      summary: `Tool "${name}" not found in registry`,
      error: `Tool "${name}" 未注册`,
    }
  }
  try {
    return await tool.execute(ctx, args)
  } catch (err) {
    return {
      success: false,
      data: {},
      summary: `Tool "${name}" execution failed`,
      error: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}

/**
 * Convert a registered tool to the LLMTool format expected by llm.chat().
 * This bridges ToolRegistry → LLM Provider.
 */
export function toolToLLMFormat(tool: ToolDefinition) {
  return {
    name: tool.name,
    description: tool.description,
    parameters: tool.parameters,
  }
}

export function allToolsToLLMFormat() {
  return getAllTools().map(toolToLLMFormat)
}

// ── Workflow → Tool 自动映射 ──────────────────────────
// Workflow 不再手动传 tools，由 registry 自动注入

const workflowToolMap: Record<string, string[]> = {
  'vocab-dictation': ['get_unit_vocabulary', 'filter_difficulty', 'generate_dictation'],
  'writing-analysis': ['get_unit_vocabulary'],
  'exam-prep': ['get_unit_vocabulary', 'filter_difficulty'],
  'class-risk': ['get_unit_vocabulary'],
  'listening-recommend': ['get_unit_vocabulary'],
  'unit-paper-generate': ['get_unit_vocabulary', 'filter_difficulty', 'generate_dictation'],
}

/**
 * 根据 workflow ID 自动获取该 workflow 需要的 tools。
 * Workflow step 不再手动构造 tools 数组，调用此函数即可。
 *
 * @example
 * const tools = getToolsForWorkflow('vocab-dictation')
 * // → [{ name: 'get_unit_vocabulary', ... }, { name: 'filter_difficulty', ... }, ...]
 */
export function getToolsForWorkflow(workflowId: string) {
  const toolNames = workflowToolMap[workflowId] || getToolNames()
  return toolNames
    .map((name) => getTool(name))
    .filter(Boolean)
    .map((tool) => toolToLLMFormat(tool!))
}

/**
 * Register a workflow→tool mapping. Called by new workflows.
 */
export function registerWorkflowTools(workflowId: string, toolNames: string[]) {
  workflowToolMap[workflowId] = toolNames
}

export {
  registerTool,
  getTool,
  getAllTools,
  getToolNames,
  executeTool,
  toolToLLMFormat,
  allToolsToLLMFormat,
  getToolsForWorkflow,
  registerWorkflowTools,
} from './toolRegistry'

export { executeToolCalls } from './executeToolCalls'
export type { ExecutedToolCall, ExecuteToolCallsResult } from './executeToolCalls'

export type { ToolDefinition, ToolExecuteContext, ToolResult, ToolParameters, ToolProperty } from './types'

// Auto-register vocab tools on import
import './vocabTools'

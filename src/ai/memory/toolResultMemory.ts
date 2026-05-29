/**
 * Tool Result Memory (v2 — Storage-backed)
 */

import type { ToolResultRecord } from '../context/types'
import { getStorageAdapter } from '../../storage'

let idCounter = 0

export async function recordToolResult(params: {
  toolName: string
  args: Record<string, unknown>
  result: Record<string, unknown>
  sessionId: string
  summary: string
}): Promise<ToolResultRecord> {
  const storage = getStorageAdapter()

  const record: ToolResultRecord = {
    id: `tool-${Date.now()}-${++idCounter}`,
    toolName: params.toolName,
    args: params.args,
    result: params.result,
    timestamp: Date.now(),
    sessionId: params.sessionId,
    summary: params.summary,
  }

  await storage.saveToolResult({
    id: record.id,
    toolName: record.toolName,
    sessionId: record.sessionId,
    args: record.args,
    result: record.result,
    timestamp: record.timestamp,
    summary: record.summary,
  })

  return record
}

export async function getRecentToolResults(
  sessionId: string,
  limit = 20,
): Promise<ToolResultRecord[]> {
  const storage = getStorageAdapter()
  const results = await storage.getToolHistory(sessionId, limit)
  return results.map((r) => ({
    id: r.id,
    toolName: r.toolName,
    args: r.args,
    result: r.result,
    timestamp: r.timestamp,
    sessionId: r.sessionId,
    summary: r.summary,
  }))
}

export async function getLastToolResult(
  toolName: string,
  sessionId: string,
): Promise<ToolResultRecord | undefined> {
  const results = await getRecentToolResults(sessionId, 50)
  return results.filter((r) => r.toolName === toolName).pop()
}

export async function getAllToolResults(sessionId: string): Promise<ToolResultRecord[]> {
  return getRecentToolResults(sessionId, 100)
}

export async function clearToolHistory(_sessionId: string) {
  // Storage caps per-session entries at 100. Full clear via storage.clearAll().
}

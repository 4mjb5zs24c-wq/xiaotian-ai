/**
 * Memory Importance Scorer
 *
 * 评估每条记忆的重要性，决定是否写入长期 vector memory。
 *
 * 评分规则：
 *   - Workflow 成功完成 → +0.3
 *   - Tool 执行成功且有数据 → +0.2
 *   - 包含学生姓名或班级信息 → +0.15（教学决策相关）
 *   - 来自教师主动操作 → +0.2
 *   - 系统自动记录 → -0.1
 *   - 低信息量（< 20 字符）→ -0.2
 *
 * 重要性 >= 0.5 → 写入 vector store（长期记忆）
 * 重要性 < 0.5  → 仅保留 session memory（短期记忆）
 */

import type { MemoryEntry } from '../context/types'

const IMPORTANCE_THRESHOLD = 0.5

export function scoreMemoryImportance(entry: MemoryEntry): number {
  let score = entry.importance // base from caller

  switch (entry.type) {
    case 'workflow_result':
      score += 0.3
      break
    case 'tool_result':
      score += 0.2
      if (entry.data.result && Object.keys(entry.data.result).length > 0) {
        score += 0.1
      }
      break
    case 'insight':
      score += 0.25
      break
    case 'preference':
      score += 0.3
      break
    case 'message':
      score += 0.05
      break
  }

  // Student-related boost
  const text = entry.summary + JSON.stringify(entry.data)
  if (/学生|张|李|王|赵|刘|陈/.test(text)) {
    score += 0.15
  }

  // Low information penalty
  if (entry.summary.length < 20) {
    score -= 0.2
  }

  // Clamp
  return Math.max(0, Math.min(1, Math.round(score * 100) / 100))
}

export function shouldPersistToVector(entry: MemoryEntry): boolean {
  return scoreMemoryImportance(entry) >= IMPORTANCE_THRESHOLD
}

/**
 * Filter memories that should go to long-term vector storage.
 */
export function filterImportantMemories(entries: MemoryEntry[]): MemoryEntry[] {
  return entries.filter(shouldPersistToVector)
}

/**
 * AI Insight V1 — Action Mapping
 *
 * Maps actionId → behavioral metadata.
 * The controller reads this map to determine what to do.
 *
 * Action types:
 *   generate            → run workflow or jump to /ai-search with autoRun
 *   view                → open detail panel in drawer
 *   recommend_resource  → show resource results or jump to /ai-search
 *   assign              → open AssignmentConfirmPanel
 *   basket              → add to practice basket
 *   mock                → show toast placeholder
 */

export type InsightActionType =
  | 'generate'
  | 'view'
  | 'recommend_resource'
  | 'assign'
  | 'basket'
  | 'mock'
  | 'generate_content'

export interface ActionMapping {
  actionId: string
  type: InsightActionType
  label: string
  /** URL path for navigate / generate / recommend_resource */
  target?: string
  /** Search query for auto-run */
  query?: string
  /** Workflow ID for workflow-based generate */
  workflowId?: string
  /** Panel name for view type */
  panel?: string
  /** Assignment type for assign */
  assignmentType?: string
  /** Generated content type for generate_content */
  generatedContentType?: string
  /** If true, requires user confirmation before executing */
  requiresConfirm: boolean
}

// ── Action Map ───────────────────────────────────────────

const actionMappings: Record<string, ActionMapping> = {
  // ── Wrong Word ──
  vocab_dictation: {
    actionId: 'vocab_dictation',
    type: 'generate',
    label: '生成词汇听写',
    target: '/ai-search',
    query: '生成 Unit3 词汇默写',
    workflowId: 'vocabDictationWorkflow',
    requiresConfirm: false,
  },
  view_wrong_word_students: {
    actionId: 'view_wrong_word_students',
    type: 'view',
    label: '查看错词学生',
    panel: 'wrongWordStudents',
    requiresConfirm: false,
  },
  assign_wrong_word_practice: {
    actionId: 'assign_wrong_word_practice',
    type: 'generate_content',
    label: '布置错词强化',
    generatedContentType: 'wrong_word_practice',
    requiresConfirm: true,
  },
  wrong_word_repractice: {
    actionId: 'wrong_word_repractice',
    type: 'generate',
    label: '错词重练',
    target: '/ai-search',
    query: 'Unit3 高频错词重练',
    requiresConfirm: false,
  },

  // ── Listening / Speaking ──
  recommend_speaking_mock: {
    actionId: 'recommend_speaking_mock',
    type: 'recommend_resource',
    label: '推荐听说模拟',
    target: '/ai-search',
    query: '听说模拟训练',
    requiresConfirm: false,
  },
  listening_special: {
    actionId: 'listening_special',
    type: 'recommend_resource',
    label: '推荐听力专项',
    target: '/ai-search',
    query: '听力训练',
    requiresConfirm: false,
  },
  recommend_shadowing: {
    actionId: 'recommend_shadowing',
    type: 'recommend_resource',
    label: '推荐跟读训练',
    target: '/ai-search',
    query: '跟读训练',
    requiresConfirm: false,
  },

  // ── Writing ──
  writing_review: {
    actionId: 'writing_review',
    type: 'generate_content',
    label: '生成作文讲评',
    generatedContentType: 'writing_review',
    requiresConfirm: false,
  },
  recommend_model_essay: {
    actionId: 'recommend_model_essay',
    type: 'generate_content',
    label: '推荐范文',
    generatedContentType: 'model_essay',
    requiresConfirm: false,
  },
  writing_revision: {
    actionId: 'writing_revision',
    type: 'generate_content',
    label: '布置二次修改',
    generatedContentType: 'writing_revision',
    requiresConfirm: true,
  },

  // ── Exam ──
  exam_mock: {
    actionId: 'exam_mock',
    type: 'generate_content',
    label: '推荐模拟卷',
    generatedContentType: 'exam_mock',
    requiresConfirm: false,
  },
  exam_sprint: {
    actionId: 'exam_sprint',
    type: 'recommend_resource',
    label: '推荐冲刺训练',
    target: '/ai-search',
    query: '期末冲刺训练',
    requiresConfirm: false,
  },
  generate_special_practice: {
    actionId: 'generate_special_practice',
    type: 'generate_content',
    label: '生成专项训练',
    generatedContentType: 'special_practice',
    requiresConfirm: false,
  },

  // ── Small Sample ──
  remind_unfinished: {
    actionId: 'remind_unfinished',
    type: 'mock',
    label: '提醒未完成学生',
    requiresConfirm: true,
  },
}

// ── Lookup ────────────────────────────────────────────────

export function getActionMapping(actionId: string): ActionMapping | undefined {
  return actionMappings[actionId]
}

export function getAllActionMappings(): ActionMapping[] {
  return Object.values(actionMappings)
}

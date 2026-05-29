/**
 * Panel State — Unified panel type definitions
 *
 * All pages (HomePage, AISearchPage, AIAssistantDrawer) use these types.
 */

export type PanelType =
  | null
  | 'resourcePreview'
  | 'assignmentConfirm'
  | 'assignmentSuccess'
  | 'basket'
  | 'cardCreation'
  | 'wordListEdit'
  | 'insightDetail'

export interface PanelState {
  type: PanelType
  data?: Record<string, unknown>
}

export interface PreviewPanelData {
  title: string
  type: string
  grade: string
  unit: string
  difficulty: string
  estimatedTime: string
  summary: string
  aiReason: string
  sampleContent?: string
}

export interface AssignmentFormData {
  title: string
  summary: string
  className: string
  dueDate: string
  scoreRule: 'show_after_due' | 'show_immediately' | 'hide'
  answerMode: 'online' | 'paper'
  totalScore: number
  notifyMethod: 'app' | 'sms' | 'none'
}

export const DEFAULT_ASSIGNMENT_FORM: Partial<AssignmentFormData> = {
  dueDate: '次日 20:00',
  scoreRule: 'show_after_due',
  answerMode: 'online',
  totalScore: 100,
  notifyMethod: 'app',
}

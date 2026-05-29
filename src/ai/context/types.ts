// ═══════════════════════════════════════════════════════
// Context & Memory System — Type Definitions
// ═══════════════════════════════════════════════════════

// ── Teacher Profile ────────────────────────────────────

export interface TeacherProfile {
  name: string
  subject: string
  schoolName: string
  department: string
  preferences: TeacherPreferences
}

export interface TeacherPreferences {
  /** Default dictation mode */
  defaultDictationMode: 'en_to_cn' | 'cn_to_en' | 'mixed' | 'listen_spell'
  /** Default exercise quantity */
  defaultExerciseCount: number
  /** Preferred difficulty */
  preferredDifficulty: 'basic' | 'medium' | 'advanced'
  /** Preferred textbook */
  preferredTextbook: string
}

// ── Class Info ─────────────────────────────────────────

export interface ClassInfo {
  name: string
  grade: string
  studentCount: number
  textbook: string
  currentUnit: string
  region: string
}

// ── Memory Entry ───────────────────────────────────────

export interface MemoryEntry {
  id: string
  type: 'message' | 'tool_result' | 'workflow_result' | 'insight' | 'preference'
  timestamp: number
  sessionId: string
  data: Record<string, unknown>
  summary: string
  /** Importance 0-1 for retention priority */
  importance: number
}

// ── Workflow Record ────────────────────────────────────

export interface WorkflowRecord {
  id: string
  workflowId: string
  workflowName: string
  trigger: string
  status: 'completed' | 'failed'
  startedAt: number
  completedAt: number
  summary: string
  toolCallCount: number
}

// ── Tool Result Record ─────────────────────────────────

export interface ToolResultRecord {
  id: string
  toolName: string
  args: Record<string, unknown>
  result: Record<string, unknown>
  timestamp: number
  sessionId: string
  summary: string
}

// ── Runtime Context (injected into every workflow step) ─

export interface RuntimeContext {
  /** Session identifier */
  sessionId: string

  /** Teacher */
  teacher: TeacherProfile

  /** Current class */
  classInfo: ClassInfo

  /** Recent workflow runs (last 10) */
  recentWorkflows: WorkflowRecord[]

  /** Recent tool results (last 20) */
  toolHistory: ToolResultRecord[]

  /** Recent conversation messages */
  recentMessages: MemoryEntry[]

  /** Knowledge fragments from RAG (future: vector DB) */
  relevantKnowledge: KnowledgeFragment[]

  /** When this context was built */
  builtAt: number
}

// ── Knowledge Fragment (for future RAG) ────────────────

export interface KnowledgeFragment {
  id: string
  content: string
  source: string
  relevance: number
  metadata: Record<string, string>
}

// ── System Prompt Parts ────────────────────────────────

export interface SystemPromptParts {
  /** Agent role definition */
  role: string
  /** Current teaching context */
  teachingContext: string
  /** Recent activity summary */
  recentActivity: string
  /** Available capabilities */
  capabilities: string
  /** Explicit constraints */
  constraints: string
}

import { create } from 'zustand'
import type { WorkflowUIRresult } from '../workflows/workflowTypes'
import type { NewSearchResult, AssignmentDraft } from '../search-new/types'

// ── Types ──────────────────────────────────────────────

export interface TeacherContext {
  name: string
  subject: string
  textbook: string
  unit: string
  grade: string
  className: string
  studentCount: number
}

export interface DrawerContent {
  type: 'insight' | 'recommendation' | 'analysis' | 'suggestion' | 'homework' | 'ai-chat' | 'workflow'
  title: string
  cardData?: InsightItem | RecommendationItem | RiskItem | null
  /** For workflow type */
  workflowResult?: WorkflowUIRresult | null
  workflowStepNames?: string[]
}

export interface InsightItem {
  id: string
  title: string
  summary: string
  priority: 'normal' | 'warning' | 'critical'
  tags: string[]
  detail: string
  suggestion: string
  actionLabel: string
}

export interface RecommendationItem {
  id: string
  title: string
  reason: string
  type: 'exercise' | 'material' | 'lesson' | 'homework'
  tags: string[]
  difficulty: 'basic' | 'medium' | 'advanced'
  estimatedTime: string
}

export interface RiskItem {
  id: string
  title: string
  studentName?: string
  riskLevel: 'low' | 'medium' | 'high'
  description: string
  suggestedAction: string
  tags: string[]
}

// ── Store ──────────────────────────────────────────────

interface AIStore {
  // Drawer
  drawerOpen: boolean
  drawerContent: DrawerContent | null
  openDrawer: (content: DrawerContent) => void
  closeDrawer: () => void

  // Teacher context
  teacherContext: TeacherContext
  setTeacherContext: (ctx: Partial<TeacherContext>) => void

  // Current selections
  activeInsight: InsightItem | null
  activeRecommendation: RecommendationItem | null
  activeRisk: RiskItem | null

  // Practice basket
  practiceBasket: (RecommendationItem | RiskItem)[]
  addToBasket: (item: RecommendationItem | RiskItem) => void
  removeFromBasket: (id: string) => void
  clearBasket: () => void
  basketToast: string | null
  dismissBasketToast: () => void

  // Workflow state
  workflowRunning: boolean
  workflowResult: WorkflowUIRresult | null
  workflowStepIndex: number
  setWorkflowRunning: (running: boolean) => void
  setWorkflowResult: (result: WorkflowUIRresult | null) => void
  setWorkflowStepIndex: (index: number) => void

  // AI Assistant Drawer (big 66vw overlay)
  aiAssistantOpen: boolean
  aiAssistantInitialQuery: string
  setAIAssistantOpen: (open: boolean) => void
  setAIAssistantInitialQuery: (query: string) => void

  // AI Drawer Panel (controls which panel the drawer shows)
  aiDrawerPanel: string | null
  aiDrawerPanelData: Record<string, unknown> | null
  setAIDrawerPanel: (panel: string | null, data?: Record<string, unknown>) => void

  // New Search V2 State
  newSearchResult: NewSearchResult | null
  setNewSearchResult: (result: NewSearchResult | null) => void

  // Pending Assignments (multi-assignment flow)
  pendingAssignments: AssignmentDraft[]
  setPendingAssignments: (assignments: AssignmentDraft[]) => void
  clearPendingAssignments: () => void

  // Vocabulary Draft Basket (word-level review draft basket, per-class)
  vocabDraftBasket: VocabDraftItem[]
  addToVocabDraft: (item: Omit<VocabDraftItem, 'addedAt' | 'expireAt'>) => void
  removeFromVocabDraft: (wordId: string) => void
  removeVocabDrafts: (wordIds: string[]) => void
  clearVocabDraft: () => void
}

// ── Vocab Draft Basket Types ────────────────────────────

export interface VocabDraftItem {
  wordId: string
  wordText: string
  mainType: string  // '生词' | '读不准' | '不会写' | '不会用'
  sourceTags: string[]  // e.g. ['高频错词', '学生错词']
  affectedStudentCount: number
  addedAt: number       // timestamp
  classId: string
  expireAt: number      // 7 days after added
  scoreRate?: number
  errorRate?: number
}

// ── Vocab Draft Basket localStorage Persistence ──────────

const DRAFT_BASKET_PREFIX = 'xiaotian_vocab_draft_'

function draftKey(className: string): string {
  return DRAFT_BASKET_PREFIX + encodeURIComponent(className)
}

function loadVocabDraft(className: string): VocabDraftItem[] {
  try {
    const raw = localStorage.getItem(draftKey(className))
    if (raw) {
      const items = JSON.parse(raw) as VocabDraftItem[]
      const now = Date.now()
      // Filter out expired items (>7 days)
      return items.filter(i => i.expireAt > now)
    }
  } catch { /* ignore */ }
  return []
}

function saveVocabDraft(className: string, items: VocabDraftItem[]): void {
  try {
    localStorage.setItem(draftKey(className), JSON.stringify(items))
  } catch { /* ignore */ }
}

// ── Store ──────────────────────────────────────────────

export const useAIStore = create<AIStore>((set) => ({
  // Drawer
  drawerOpen: false,
  drawerContent: null,
  openDrawer: (content) =>
    set({ drawerOpen: true, drawerContent: content }),
  closeDrawer: () => set({ drawerOpen: false }),

  // Teacher context
  teacherContext: {
    name: '王老师',
    subject: '英语',
    textbook: '人教版',
    unit: 'Unit 3 — Food and Drinks',
    grade: '七年级上',
    className: '2023级A18班',
    studentCount: 42,
  },
  setTeacherContext: (ctx) =>
    set((s) => ({ teacherContext: { ...s.teacherContext, ...ctx } })),

  // Active items
  activeInsight: null,
  activeRecommendation: null,
  activeRisk: null,

  // Practice basket (with dedup)
  practiceBasket: [],
  addToBasket: (item) =>
    set((s) => {
      const exists = s.practiceBasket.some(
        (i) => 'id' in i && 'id' in item && i.id === item.id,
      )
      if (exists) {
        return { basketToast: '该内容已在练习篮中' }
      }
      return {
        practiceBasket: [...s.practiceBasket, item],
        basketToast: '已加入练习篮',
      }
    }),
  removeFromBasket: (id) =>
    set((s) => ({
      practiceBasket: s.practiceBasket.filter(
        (i) => ('id' in i && i.id !== id),
      ),
    })),
  clearBasket: () => set({ practiceBasket: [] }),
  basketToast: null,
  dismissBasketToast: () => set({ basketToast: null }),

  // Workflow state
  workflowRunning: false,
  workflowResult: null,
  workflowStepIndex: 0,
  setWorkflowRunning: (running) => set({ workflowRunning: running }),
  setWorkflowResult: (result) => set({ workflowResult: result }),
  setWorkflowStepIndex: (index) => set({ workflowStepIndex: index }),

  // AI Assistant Drawer
  aiAssistantOpen: false,
  aiAssistantInitialQuery: '',
  setAIAssistantOpen: (open) => set({ aiAssistantOpen: open }),
  setAIAssistantInitialQuery: (query) => set({ aiAssistantInitialQuery: query }),

  // AI Drawer Panel
  aiDrawerPanel: null,
  aiDrawerPanelData: null,
  setAIDrawerPanel: (panel, data) => set({ aiDrawerPanel: panel, aiDrawerPanelData: data ?? null }),

  // New Search V2
  newSearchResult: null,
  setNewSearchResult: (result) => set({ newSearchResult: result }),

  // Pending Assignments
  pendingAssignments: [],
  setPendingAssignments: (assignments) => set({ pendingAssignments: assignments }),
  clearPendingAssignments: () => set({ pendingAssignments: [] }),

  // Vocab Draft Basket
  vocabDraftBasket: loadVocabDraft('2023级A18班'),
  addToVocabDraft: (item) =>
    set((s) => {
      const now = Date.now()
      const className = item.classId || s.teacherContext.className
      const entry: VocabDraftItem = {
        ...item,
        addedAt: now,
        expireAt: now + 7 * 24 * 60 * 60 * 1000, // 7 days
      }
      // Dedup by wordId, merge sourceTags
      const existingIdx = s.vocabDraftBasket.findIndex(i => i.wordId === entry.wordId)
      let updated: VocabDraftItem[]
      if (existingIdx >= 0) {
        updated = [...s.vocabDraftBasket]
        const existing = updated[existingIdx]
        const mergedTags = [...new Set([...existing.sourceTags, ...entry.sourceTags])]
        updated[existingIdx] = { ...existing, sourceTags: mergedTags, expireAt: entry.expireAt }
      } else {
        updated = [...s.vocabDraftBasket, entry]
      }
      saveVocabDraft(className, updated)
      return { vocabDraftBasket: updated }
    }),
  removeFromVocabDraft: (wordId) =>
    set((s) => {
      const updated = s.vocabDraftBasket.filter(i => i.wordId !== wordId)
      saveVocabDraft(s.teacherContext.className, updated)
      return { vocabDraftBasket: updated }
    }),
  removeVocabDrafts: (wordIds) =>
    set((s) => {
      const updated = s.vocabDraftBasket.filter(i => !wordIds.includes(i.wordId))
      saveVocabDraft(s.teacherContext.className, updated)
      return { vocabDraftBasket: updated }
    }),
  clearVocabDraft: () =>
    set((s) => {
      saveVocabDraft(s.teacherContext.className, [])
      return { vocabDraftBasket: [] }
    }),
}))

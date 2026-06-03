import { create } from 'zustand'
import type { WorkflowUIRresult } from '../workflows/workflowTypes'
import type { NewSearchResult, PaperBasketItem, AssignmentDraft } from '../search-new/types'

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

  // Paper Basket (separate from practice basket, localStorage persisted)
  paperBasket: PaperBasketItem[]
  addToPaperBasket: (item: PaperBasketItem) => void
  removeFromPaperBasket: (id: string) => void
  clearPaperBasket: () => void
  paperBasketToast: string | null
  dismissPaperBasketToast: () => void

  // Pending Assignments (multi-assignment flow)
  pendingAssignments: AssignmentDraft[]
  setPendingAssignments: (assignments: AssignmentDraft[]) => void
  clearPendingAssignments: () => void
}

// ── Paper Basket localStorage Persistence ────────────────

const PAPER_BASKET_KEY = 'xiaotian_paper_basket'

function loadPaperBasket(): PaperBasketItem[] {
  try {
    const raw = localStorage.getItem(PAPER_BASKET_KEY)
    if (raw) return JSON.parse(raw) as PaperBasketItem[]
  } catch { /* ignore corrupt data */ }
  return []
}

function savePaperBasket(items: PaperBasketItem[]): void {
  try {
    localStorage.setItem(PAPER_BASKET_KEY, JSON.stringify(items))
  } catch { /* ignore quota errors */ }
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
    className: '七年级(3)班',
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

  // Paper Basket (with localStorage persistence)
  paperBasket: loadPaperBasket(),
  addToPaperBasket: (item) =>
    set((s) => {
      const exists = s.paperBasket.some((i) => i.resourceId === item.resourceId)
      if (exists) {
        return { paperBasketToast: '该资源已在试卷篮中' }
      }
      const updated = [...s.paperBasket, item]
      savePaperBasket(updated)
      return { paperBasket: updated, paperBasketToast: '已加入试卷篮' }
    }),
  removeFromPaperBasket: (id) =>
    set((s) => {
      const updated = s.paperBasket.filter((i) => i.id !== id)
      savePaperBasket(updated)
      return { paperBasket: updated }
    }),
  clearPaperBasket: () => {
    savePaperBasket([])
    set({ paperBasket: [] })
  },
  paperBasketToast: null,
  dismissPaperBasketToast: () => set({ paperBasketToast: null }),

  // Pending Assignments
  pendingAssignments: [],
  setPendingAssignments: (assignments) => set({ pendingAssignments: assignments }),
  clearPendingAssignments: () => set({ pendingAssignments: [] }),
}))

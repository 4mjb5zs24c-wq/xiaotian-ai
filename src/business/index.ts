// ── Resource Adapter ──
export { resourceAdapter } from './resourceAdapter'

// ── Recommendation Engine ──
export { buildRecommendationReason } from './recommendationEngine'

// ── Practice Basket ──
export {
  addToBasket,
  removeFromBasket,
  updateBasketItem,
  getBasket,
  clearBasket,
  getBasketCount,
  generateAssignment,
} from './practiceBasket'

// ── Wrong Book Connector ──
export {
  getClassWrongWords,
  getClassWrongQuestions,
  getTopWrongWords,
  getWeakKnowledgePoints,
  generateWrongWordTraining,
} from './wrongBookConnector'

// ── Assignment Bridge ──
export {
  createDraftAssignment,
  publishAssignment,
  getPublishedAssignments,
  getActivityLog,
  getAssignmentStats,
} from './assignmentBridge'

// ── Types ──
export type {
  BusinessResource,
  BusinessResourceType,
  ResourcePreview,
  AiRecommendationReason,
  AiRecommendationFactor,
  PracticeBasketItem,
  PracticeBasket,
  Assignment,
  WrongWordEntry,
  WrongQuestionEntry,
  TeacherActivity,
  ResourceAdapter,
  ResourceSearchContext,
  PracticeOptions,
} from './types'

export { resourceTypeLabel } from './types'

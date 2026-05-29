// ── Tracker ──
export {
  startSession,
  endSession,
  getCurrentSession,
  track,
  getTrustScore,
  getDropAnalysis,
  getSessionStats,
  getTimeSavedMetrics,
} from './tracker'

// ── Feature Flags ──
export { isFeatureEnabled, getAllFlags, setFlag } from './featureFlags'

// ── Simulation ──
export { run7DaySimulation } from './teacherSimulation'

// ── Types ──
export type {
  AnalyticsEvent,
  AnalyticsEventType,
  TeacherSession,
  TeacherPersonaType,
  TeacherPersona,
  RecommendationTrustRecord,
  TrustScore,
  DropPoint,
  FunnelStep,
  FeatureFlag,
  TimeSavedMetrics,
  TimeSavedBreakdown,
} from './types'

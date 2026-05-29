// ── Engine ──
export { generateTeachingStrategy } from './strategyEngine'

// ── Trend Analyzer ──
export { analyzeTrends, summarizeTrends } from './trendAnalyzer'

// ── Types ──
export type {
  TeachingStrategy,
  TeachingStrategyPlan,
  StrategyAction,
  StrategyActionType,
  RiskAlert,
  TeacherInsight,
  ClassProfile,
  ExamStage,
  ClassLevel,
  StrategyRegion,
  SubjectTrend,
  TrendReport,
} from './types'

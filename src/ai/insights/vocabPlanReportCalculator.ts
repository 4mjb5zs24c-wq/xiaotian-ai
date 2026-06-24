/**
 * 方案报告数据计算器
 *
 * ══════════════════════════════════════════════════════════════
 * 1. 整体完成率
 * ══════════════════════════════════════════════════════════════
 * 取数范围：本方案内已发布的词汇闯关
 * 计算规则：整体完成率 = 已完成学生人次 ÷ 应完成学生人次
 * 待自动发布的任务不计入
 *
 * ══════════════════════════════════════════════════════════════
 * 2. 整体正确率
 * ══════════════════════════════════════════════════════════════
 * 取数范围：本方案内已发布且有有效作答数据的词汇闯关
 * 计算规则：整体正确率 = 有效作答小题正确数 ÷ 有效作答小题总数
 * - 多空题按空计为小题
 * - 未作答学生不计入正确率，但影响完成率
 * - 待发布任务不计入正确率
 *
 * ══════════════════════════════════════════════════════════════
 * 3. 正确率变化
 * ══════════════════════════════════════════════════════════════
 * 有历史基线：正确率变化 = 当前整体正确率 - 方案前基线正确率
 * 无历史基线：正确率变化 = 当前整体正确率 - 首次闯关正确率
 * 展示规则：
 *   > +2pp → 提升 X 个百分点
 *   -2pp ~ +2pp → 基本持平
 *   < -2pp → 降低 X 个百分点
 *
 * ══════════════════════════════════════════════════════════════
 * 4. 词汇能力表现
 * ══════════════════════════════════════════════════════════════
 * 能力维度：词汇识记 / 语境理解 / 词汇运用表达 / 词汇学习策略
 * 计算依据：题型 → 词汇能力映射（见 vocabularyAbilityTypes.ts）
 * - 词汇能力不按错因计算
 * - 一个题型对应多个能力时，同时计入多个能力
 * - 同一题型在初中和高中对应同一词汇能力
 * 计算规则：
 *   某能力得分 = 该能力下有效作答小题正确数 ÷ 该能力下有效作答小题总数
 *   如果一道小题对应多个能力，则该小题同时计入多个能力的分子和分母
 *
 * ══════════════════════════════════════════════════════════════
 * 5. 主要薄弱能力
 * ══════════════════════════════════════════════════════════════
 * 取数范围：本方案内已发布且有有效作答数据的词汇闯关
 * 计算规则：从 4 个词汇能力得分中取最低的 1～2 个
 * 第一版：展示最低的 1 个
 *
 * ══════════════════════════════════════════════════════════════
 * 6. 待关注学生
 * ══════════════════════════════════════════════════════════════
 * 满足任一条件即进入待关注：
 * - 未完成任一已发布词汇闯关
 * - 整体正确率低于所在班级平均正确率
 * 多班级场景：按学生所在班级平均判断，不按全部班级总平均
 * 排序规则：未完成且正确率低优先 → 正确率越低越靠前 → 未完成次数越多越靠前
 *
 * ══════════════════════════════════════════════════════════════
 * 7. 高频薄弱内容
 * ══════════════════════════════════════════════════════════════
 * 高频错词 TOP10 排序：错误率高 → 涉及学生数多 → 错误次数多
 * 字段：词汇 / 错误率 / 涉及学生 / 主要问题 / 对应能力
 * 薄弱题型 TOP3 排序：正确率低 → 作答人次多 → 涉及学生多
 *
 * ══════════════════════════════════════════════════════════════
 * 8. 练习表现趋势
 * ══════════════════════════════════════════════════════════════
 * 每个词汇闯关分别计算：
 * - 完成率 = 该闯关已完成学生数 ÷ 应完成学生数
 * - 正确率 = 该闯关有效作答小题正确数 ÷ 有效作答小题总数
 * 待发布任务展示为灰色节点，不参与折线计算
 */

export interface StageSession {
  label: string           // "词汇闯关 1"
  published: boolean
  hasValidAnswers: boolean
  accuracy: number        // 0-1（该闯关正确率）
  completionRate: number  // 0-1（该闯关完成率）
  studentCount: number    // 有效作答学生数（用于正确率加权）
  totalStudents: number   // 应完成学生数（用于完成率）
}

export interface PlanReportInput {
  planName: string
  sessions: StageSession[]
  baselineAccuracy?: number  // 方案前基线正确率 (0-1)，undefined = 无基线
  status: 'in_progress' | 'completed'
}

export interface PlanReportMetrics {
  validSessionCount: number
  /** 整体完成率 (0-1) = 已完成学生人次 / 应完成学生人次（仅已发布session） */
  overallCompletionRate: number
  /** 整体正确率 (0-1) = 有效作答小题正确数(加权) / 有效作答小题总数(加权) */
  compositeAccuracy: number
  baselineAccuracy: number
  /** 变化幅度 (pp)，> +2 → up，-2~+2 → flat，< -2 → down */
  improvement: number
  trendDirection: 'up' | 'down' | 'flat'
  baselineLabel: string
  totalParticipatingStudents: number
}

// ── Calculator ──────────────────────────────────────────────

export function calcPlanReportMetrics(input: PlanReportInput): PlanReportMetrics {
  // 有效 session（已发布且有数据）
  const validSessions = input.sessions.filter(s => {
    if (input.status === 'completed') return s.published && s.hasValidAnswers
    return s.published && s.hasValidAnswers
  })

  const validSessionCount = validSessions.length

  // ── 整体完成率 ──
  // published sessions 的已完成学生人次 / 应完成学生人次
  const publishedSessions = input.sessions.filter(s => s.published)
  let totalFinished = 0
  let totalExpected = 0
  for (const s of publishedSessions) {
    totalFinished += Math.round(s.completionRate * s.totalStudents)
    totalExpected += s.totalStudents
  }
  const overallCompletionRate = totalExpected > 0 ? totalFinished / totalExpected : 0

  // ── 整体正确率 ──
  // 有效session正确率加权平均（按有效作答学生数加权）
  let compositeAccuracy = 0
  let totalWeight = 0
  for (const s of validSessions) {
    compositeAccuracy += s.accuracy * s.studentCount
    totalWeight += s.studentCount
  }
  compositeAccuracy = totalWeight > 0 ? compositeAccuracy / totalWeight : 0

  // ── 基线正确率 ──
  let baselineAccuracy: number
  let baselineLabel: string

  if (input.baselineAccuracy != null) {
    baselineAccuracy = input.baselineAccuracy
    baselineLabel = '较方案前'
  } else if (validSessions.length > 0) {
    baselineAccuracy = validSessions[0].accuracy
    baselineLabel = '较首次闯关'
  } else {
    baselineAccuracy = 0
    baselineLabel = '暂无数据'
  }

  // ── 变化幅度 ──
  const improvement = Math.round((compositeAccuracy - baselineAccuracy) * 100)

  // ── 方向 ──
  let trendDirection: 'up' | 'down' | 'flat' = 'flat'
  if (improvement > 2) trendDirection = 'up'
  else if (improvement < -2) trendDirection = 'down'

  return {
    validSessionCount,
    overallCompletionRate,
    compositeAccuracy,
    baselineAccuracy,
    improvement,
    trendDirection,
    baselineLabel,
    totalParticipatingStudents: validSessions.length > 0
      ? Math.max(...validSessions.map(s => s.studentCount))
      : 0,
  }
}

export function shouldIncludeSession(session: StageSession, planStatus: 'in_progress' | 'completed'): boolean {
  if (planStatus === 'completed') return session.published && session.hasValidAnswers
  return session.published && session.hasValidAnswers
}

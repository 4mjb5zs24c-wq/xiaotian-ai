# AI 洞察规则函数设计

> 版本: v1.0 | 日期: 2026-05-27
> 用途: 规则函数设计文档，先设计后开发
> 状态: 设计稿，尚未编码

---

## 说明

本文档定义 AI 洞察 V1 需要的规则函数签名、输入输出和判断逻辑。
先写设计，不写代码。开发时按此设计实现。

---

## 通用类型

```typescript
// 来自 mock data schema
interface Insight { ... }

// 教师上下文
interface TeacherContext {
  textbook: string
  unit: string
  grade: string
  className: string
  studentCount: number
  region?: string
}

// 洞察历史（用于去重/不重复提醒）
interface InsightHistory {
  recentInsights: string[]       // 最近生成的 insightId 列表
  recentActions: string[]        // 老师最近执行过的 actionId
  dismissedInsights: string[]    // 老师关闭过的 insightId
  lastGeneratedAt: Record<string, string>  // 每种洞察最后生成时间
}

// 考试日历
interface ExamCalendar {
  upcomingExams: Array<{
    type: '期中考试' | '期末考试' | '中考' | '高考'
    date: string
  }>
}
```

---

## 1. generateHomeInsights

```
签名:
generateHomeInsights(
  ctx: TeacherContext,
  wrongWordData: WrongWordData,
  listeningData: ListeningData,
  writingData: WritingData,
  examCalendar: ExamCalendar,
  history: InsightHistory
): Insight[]
```

**逻辑**:

```
1. 初始化 candidates: Insight[] = []

2. 生成考前提醒（如果考试 <= 30天）
   IF examCalendar 中有 upcoming exam 且 daysRemaining <= 30:
     reminder = generateExamReminder(exam, ctx)
     IF NOT shouldSuppressInsight(reminder, history):
       reminder.priority = 0  // 最高
       candidates.push(reminder)

3. 生成错词洞察
   wrongWordInsight = generateWrongWordInsight(wrongWordData, ctx)
   IF wrongWordInsight AND NOT shouldSuppressInsight(wrongWordInsight, history):
     wrongWordInsight.priority = 1
     candidates.push(wrongWordInsight)

4. 生成听力/听说洞察
   listeningInsight = generateListeningSpeakingInsight(listeningData, ctx)
   IF listeningInsight AND NOT shouldSuppressInsight(listeningInsight, history):
     listeningInsight.priority = 2
     candidates.push(listeningInsight)

5. 生成写作洞察
   writingInsight = generateWritingInsight(writingData, ctx)
   IF writingInsight AND NOT shouldSuppressInsight(writingInsight, history):
     writingInsight.priority = 3
     candidates.push(writingInsight)

6. 排序
   sorted = rankInsights(candidates)

7. 取前 3 条
   RETURN sorted.slice(0, 3)
```

**考试期特殊规则**:
- 如果考前一个月（daysRemaining <= 30），考前提醒 priority = 0，置顶
- 非考试期，考前提醒不生成
- 考试结束后，`shouldSuppressInsight` 返回 true（自动过滤）

---

## 2. generateWrongWordInsight

```
签名:
generateWrongWordInsight(
  data: WrongWordData,
  ctx: TeacherContext
): Insight | null
```

**触发条件**:
```
IF data.curriculumWordsWithHighError.length === 0:
  RETURN null  // 没有课标词错误率 >= 30%，不生成洞察
```

**判断逻辑**:

```
1. 筛选课标词错误率 >= 30% 的词
   highErrorWords = data.topErrorWords.filter(w => w.rate >= 30 && w.isCurriculum)

2. IF highErrorWords.length === 0:
     RETURN null

3. 判断主要错误类型
   dominantType = maxBy(data.errorTypeDistribution)
   
   IF dominantType === '拼写错误':
     primaryAction = 'vocab_dictation'
     secondaryAction = 'wrong_word_repractice'
   ELSE IF dominantType === '读音混淆':
     primaryAction = 'vocab_reading_aloud'
     secondaryAction = 'shadowing_practice'
   ELSE IF dominantType === '语用错误':
     primaryAction = 'vocab_usage_practice'
     secondaryAction = 'wrong_word_paper'
   ELSE IF dominantType === '词义混淆':
     primaryAction = 'vocab_meaning_choice_en_to_cn'
     secondaryAction = 'vocab_usage_practice'

4. 判断是否集中在某个单元
   IF highErrorWords 集中在同一个 unit:
     scope.unit = that unit
     suggestion += "集中在{unit}，建议重点复习该单元词汇"

5. 判断多音节词比例
   IF multiSyllableRatio >= 0.6:
     analysis += "错误集中在多音节词，学生对长难词拼写掌握不牢固"

6. 构建 Insight 返回
```

**不生成的情况**:
- 课标词错误率 >= 30% 的词数量为 0
- 样本量太小（练习次数 < 2 次 或 参与人数 < 10）

---

## 3. generateListeningSpeakingInsight

```
签名:
generateListeningSpeakingInsight(
  data: ListeningData,
  ctx: TeacherContext,
  regionConfig?: RegionConfig
): Insight | null
```

**触发条件**:
```
IF data.currentScore >= 60 AND data.relativeDrop < 10:
  RETURN null  // 得分率 >= 60% 且没有明显下降，不生成洞察
```

**判断逻辑**:

```
1. 判断地区要求
   region = getRegionConfig(ctx.region)
   
   IF region.testsSpeaking:
     recommendMode = 'speaking'  // 优先推荐听说
   ELSE IF region.testsListening:
     recommendMode = 'listening'  // 推荐听力
   ELSE:
     RETURN null  // 地区不考听力/听说，不生成洞察

2. 判断老师实际练习行为
   IF ctx.teacherPracticeHistory 以听说为主:
     recommendMode = 'speaking'  // 尊重老师实际行为
   ELSE IF ctx.teacherPracticeHistory 以听力为主:
     recommendMode = 'listening'

3. 判断风险等级
   IF data.currentScore < 60:
     riskLevel = 'high'
     suggestion = "得分率低于60%，掌握不足，建议增加训练频率"
   ELSE IF data.relativeDrop >= 10:
     riskLevel = 'medium'
     suggestion = "较前两周下降{data.relativeDrop}%，需要关注"
   ELSE:
     riskLevel = 'low'

4. 判断薄弱题型
   weakTypes = data.questionTypeScores 中得分率最低的 2 项
   在 evidence 中列出

5. 推荐动作
   IF recommendMode === 'speaking':
     actions = ['speaking_special', 'speaking_mock', 'shadowing_practice']
   ELSE:
     actions = ['listening_special', 'listening_mock']
```

**不生成的情况**:
- 地区不考听力/听说
- 样本量太小（练习次数 < 2）
- 得分率 >= 60% 且变化 < 10%

---

## 4. generateWritingInsight

```
签名:
generateWritingInsight(
  data: WritingData,
  ctx: TeacherContext
): Insight | null
```

**触发条件**:
```
IF data.pendingOver24h === 0 AND data.avgScore >= 70:
  RETURN null  // 没有积压且均分正常，不生成洞察
```

**判断逻辑**:

```
1. 判断是否有批改积压
   IF data.pendingOver24h > 0:
     优先提醒批改积压
     title = "{data.pendingOver24h}篇作文待批改超过24小时"
     riskLevel = 'medium'
     primaryAction = 'writing_review'
     
2. 分析共性问题
   topErrors = data.topErrors 按 count 降序
   
   IF topErrors[0].count / data.totalEssays >= 0.3:
     在 analysis 中指出最大共性问题
     
   IF topErrors[0].type === '时态混用':
     推荐 'tense_practice'
   ELSE IF topErrors[0].type === '中式英语':
     推荐 'sentence_upgrade'

3. 判断分层
   IF data.scoreDistribution.low / data.totalEssays >= 0.2:
     analysis += "待提升段占比偏高，需关注"

4. 推荐动作
   基础动作: ['writing_review', 'recommend_model_essay']
   加分动作: 根据错误类型添加专项
   必推动作: 'writing_revision'（二次修改）
```

**不生成的情况**:
- 没有作文提交
- 已全部批改且均分正常且无异常

---

## 5. generatePracticeReportInsight

```
签名:
generatePracticeReportInsight(
  data: PracticeReportData,
  ctx: TeacherContext
): Insight[]
```

**判断逻辑**:

```
1. 得分率变化洞察
   IF data.relativeDrop >= 10:
     生成 "得分率下降" 洞察
     riskLevel = data.currentScore < 60 ? 'high' : 'medium'
   
   IF data.currentScore > data.previousAvg + 5:
     生成 "表现较好" 洞察（正面反馈）
     riskLevel = 'low'

2. 题型薄弱洞察
   weakTypes = data.questionTypeScores 中得分率最低的 3 项
   IF weakTypes[0].score < 60:
     生成 "题型薄弱" 洞察
     suggestion = "建议重点讲解 {weakTypes[0].name}"

3. 分层洞察
   IF data.stratification.low / data.totalStudents >= 0.15:
     生成 "待提升段" 洞察
     
   IF data.stratification 差距 >= 30%:
     生成 "分层明显" 洞察

4. 用时异常洞察
   IF data.avgTime < data.expectedTime * 0.5 AND data.currentScore < 60:
     生成 "用时异常" 洞察（可能未认真作答）
   
   IF data.avgTime < data.expectedTime * 0.5 AND data.currentScore > 90:
     生成 "异常完成" 洞察（建议老师核实）

5. 空题率洞察
   IF data.emptyRate >= 10:
     生成 "空题率高" 洞察

RETURN 所有生成的洞察（可能多条）
```

**不生成的情况**:
- 参与人数 < 10
- 所有指标正常（得分率 >= 60% 且无异常）
- 老师10分钟内刚查看过同一份报告

---

## 6. rankInsights

```
签名:
rankInsights(insights: Insight[]): Insight[]
```

**排序规则**:

```
1. 按 priority 升序（0 > 1 > 2 > 3）
2. 同 priority 内按 riskLevel 排序（high > medium > low）
3. 同 riskLevel 内按 createdAt 降序（最新的在前）
4. 考前提醒始终 priority = 0（置顶）

特殊规则:
- 考试季: exam_reminder 始终排第一
- 非考试季: 错词 > 听力/听说 > 写作
```

---

## 7. shouldSuppressInsight

```
签名:
shouldSuppressInsight(
  insight: Insight,
  history: InsightHistory
): boolean
```

**抑制规则**:

```
1. 样本量检查
   IF insight.sourceData 中 sampleSize < threshold:
     RETURN true  // 样本太小不提醒

2. 数据波动检查
   IF insight.evidence 中所有指标变化 < 阈值:
     RETURN true  // 波动不明显不提醒

3. 重复检查
   IF history.recentInsights 中包含同 module + 同 title 的洞察:
     RETURN true  // 同一洞察一天内不重复

4. 动作检查
   IF insight.actions.length === 0:
     RETURN true  // 没有可执行动作不提醒

5. 已处理检查
   IF history.recentActions 中包含 insight 的任一 action.actionId:
     且执行时间在 24 小时内:
       RETURN true  // 老师刚处理过同类问题

6. 考试结束检查
   IF insight.module === 'exam_reminder' AND 考试日期已过:
     RETURN true  // 考试结束不提醒

7. 地区不适用检查
   IF insight.module === 'home_listening_speaking' AND 地区不考听力/听说:
     RETURN true  // 地区不考不推荐

8. 关闭检查
   IF insight.insightId IN history.dismissedInsights:
     RETURN true  // 老师已关闭过

RETURN false  // 不抑制，正常展示
```

---

## 8. isSampleTooSmall

```
签名:
isSampleTooSmall(totalStudents: number, sampleCount: number): boolean

V1 规则:
  IF totalStudents >= 45:
    RETURN sampleCount <= 15

  IF totalStudents < 45:
    RETURN sampleCount / totalStudents <= 0.3

使用场景:
  - 所有洞察生成前检查样本量
  - 样本偏少时不生成高风险（riskLevel='high'）洞察
  - 可展示轻提示（riskLevel='low'，标注"样本偏少"）
  - 考前提醒不受此限制

示例:
  - 班级 50 人，参与 40 人 → false（样本充足）
  - 班级 50 人，参与 10 人 → true（样本偏少）
  - 班级 30 人，参与 9 人 → true（占比 30% <= 30%）
  - 班级 30 人，参与 15 人 → false（占比 50% > 30%）
```

---

## 9. isExamWithin30Days

```
签名:
isExamWithin30Days(examDate: string, currentDate: string): boolean

规则:
  days = examDate - currentDate (in days)

  IF days <= 0:
    RETURN false  // 考试已过

  IF days > 30:
    RETURN false  // 超过 30 天

  IF 0 < days <= 30:
    RETURN true   // 考前 30 天内

使用场景:
  - generateExamReminder 中判断是否触发考前提醒
  - 考前提醒在首页置顶（priority = 0）
  - 考试结束后 shouldSuppressInsight 返回 true

示例:
  - 考试 6/26，今天 5/27 → days=30 → true
  - 考试 6/26，今天 6/27 → days=-1 → false
  - 考试 6/26，今天 4/1  → days=86 → false
```

---

## 10. generateWritingInsightFromModelOutput

```
签名:
generateWritingInsightFromModelOutput(
  modelOutput: WritingModelOutput,
  ctx: TeacherContext
): Insight | null

说明:
  V1 使用系统写作模型输出，不使用手动配置的地区评分维度。
  各地区评分维度配置为 P1/P2 增强项。

触发条件:
  IF modelOutput.totalScore === undefined:
    RETURN null  // 无模型输出

判断逻辑:

1. 总体评估
   avgScore = modelOutput.totalScore
   IF avgScore < 60:
     riskLevel = 'high'
   ELSE IF avgScore < 70:
     riskLevel = 'medium'
   ELSE:
     riskLevel = 'low'

2. 分维度分析（从 dimensionScores 取最低的 2 个维度）
   dimensions = modelOutput.dimensionScores
   weakDimensions = 排序取最低 2 项
   evidence 中列出各维度得分

3. 共性错误分析（从 commonErrors 取 top 3）
   topErrors = modelOutput.commonErrors 按 count 降序取前 3
   analysis 中描述最集中的错误

4. 推荐动作
   基础: ['writing_review', 'recommend_model_essay', 'writing_revision']
   
   IF 语言维度得分最低:
     添加: 根据错误类型（时态 → tense_practice, 连接词 → conjunction_practice, 句型 → sentence_upgrade）

   IF modelOutput.modelEssayRecommendations 非空:
     在 suggestion 中推荐使用系统范文

5. 返回 Insight（含 writingModelOutput）
```

---

## 11. shouldGenerateStrongInsight

```
签名:
shouldGenerateStrongInsight(
  insight: Insight,
  sampleInfo: { totalStudents: number; sampleCount: number }
): { allowed: boolean; adjustedRiskLevel?: 'high' | 'medium' | 'low'; reason?: string }

规则:

1. 检查样本量
   IF isSampleTooSmall(sampleInfo.totalStudents, sampleInfo.sampleCount):
     IF insight.module === 'exam_reminder':
       RETURN { allowed: true }  // 考前提醒不受限制
     ELSE:
       RETURN {
         allowed: true,
         adjustedRiskLevel: 'low',
         reason: '当前参与人数较少，建议结合后续练习数据继续观察。'
       }

2. 样本充足
   RETURN { allowed: true }

重要:
  - 样本偏少时不能直接返回 allowed: false（会导致首页无洞察）
  - 应返回 allowed: true 但降低 riskLevel
  - 轻提示文案固定为上述内容
```

---

## 12. getRegionConfig

```
签名:
getRegionConfig(region?: string): RegionConfig

逻辑:
1. 从 region-exam-config.md 中查找对应地区配置
2. IF 找到 AND confidence === '确认':
     RETURN 该配置
3. ELSE IF 找到 AND confidence !== '确认':
     RETURN 配置但标记 isProvisional = true
4. ELSE:
     RETURN 默认配置（保守模式：不推荐听力/听说）
```

---

## 函数依赖关系

```
generateHomeInsights
  ├── isExamWithin30Days
  ├── generateExamReminder
  │     ├── isExamWithin30Days
  │     └── shouldSuppressInsight
  ├── generateWrongWordInsight
  │     ├── isSampleTooSmall
  │     ├── shouldGenerateStrongInsight
  │     └── shouldSuppressInsight
  ├── generateListeningSpeakingInsight
  │     ├── getRegionConfig
  │     ├── isSampleTooSmall
  │     ├── shouldGenerateStrongInsight
  │     └── shouldSuppressInsight
  └── generateWritingInsight
        ├── generateWritingInsightFromModelOutput
        ├── isSampleTooSmall
        ├── shouldGenerateStrongInsight
        └── shouldSuppressInsight

rankInsights (排序用)

shouldSuppressInsight (过滤用)
  └── 读取 InsightHistory

isSampleTooSmall (样本量判断，无依赖)

isExamWithin30Days (考前判断，无依赖)

shouldGenerateStrongInsight (强提醒判断)
  └── isSampleTooSmall
```

---

## 开发顺序建议

| 阶段 | 函数 | 依赖 |
|------|------|------|
| 1 | 类型定义 + mock 数据 | 无 |
| 2 | `isSampleTooSmall` | 无 |
| 3 | `isExamWithin30Days` | 无 |
| 4 | `shouldSuppressInsight` | mock InsightHistory |
| 5 | `shouldGenerateStrongInsight` | 阶段 2 |
| 6 | `rankInsights` | 无 |
| 7 | `getRegionConfig` | region-exam-config |
| 8 | `generateWrongWordInsight` | 阶段 2,4,5 |
| 9 | `generateListeningSpeakingInsight` | 阶段 2,4,5,7 |
| 10 | `generateWritingInsightFromModelOutput` | 无（纯数据处理） |
| 11 | `generateWritingInsight` | 阶段 2,4,5,10 |
| 12 | `generateExamReminder` | 阶段 3,4 |
| 13 | `generatePracticeReportInsight` | 阶段 2,4,5 |
| 14 | `generateHomeInsights` | 阶段 8-13 |

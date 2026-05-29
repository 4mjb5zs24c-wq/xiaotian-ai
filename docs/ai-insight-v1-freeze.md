# 小天 AI 洞察 V1 冻结文档

> 版本: v1.0-freeze | 日期: 2026-05-27
> 状态: 已验收冻结（第 1 轮验收通过，15/15 自检，29/29 P0 回归）
> 基于: ai-insight-design.md V2, ai-insight-v1-dev-plan.md, ai-insight-mock-data-schema.md, ai-insight-rule-functions.md

---

## 1. V1 开发目标

在不接真实 API 的情况下，用 mock 数据实现一套可演示的 AI 洞察闭环：

1. 首页展示最多 3 条 AI 洞察
2. 点击"查看分析"打开洞察详情 Drawer（复用 AIAssistantDrawer `insightDetail` panel）
3. 洞察详情展示：问题 → 数据依据 → 教研判断 → 教学建议 → 推荐动作
4. 推荐动作跳转到已有 workflow 或打开已有 panel
5. 所有布置/发布类动作必须进入确认流程
6. 样本量不足时显示轻提示，不生成高风险结论
7. 考前 30 天提醒置顶展示

---

## 2. V1 功能边界

### 2.1 V1 包含

| # | 模块 | 说明 |
|---|------|------|
| 1 | 首页错词洞察 | 课标词错误率 >= 30% 时触发 |
| 2 | 首页听力/听说洞察 | 得分率 < 60% 或相对下降 >= 10% 时触发 |
| 3 | 首页写作洞察 | 作文待批改积压或得分率异常时触发 |
| 4 | 考前训练提醒 | 考试前 30 天触发，首页置顶 |
| 5 | 洞察详情 Drawer | 复用 AIAssistantDrawer `insightDetail` panel |
| 6 | 推荐动作入口 | 对接已有 workflow 和 panel |
| 7 | 样本量判断 | isSampleTooSmall |
| 8 | 考前 30 天规则 | isExamWithin30Days |
| 9 | 不提醒规则 | shouldSuppressInsight |

### 2.2 V1 不包含

| # | 内容 | 原因 | 计划版本 |
|---|------|------|---------|
| 1 | 真实数据库接入 | 需后端支持 | P2 |
| 2 | 真实 LLM 接入 | 需后端支持 | P2 |
| 3 | 联网查地区规则 | 不允许编造无官方来源的规则 | P1/P2 |
| 4 | 自动识别所有地区听力/听说政策 | 需官方来源补齐 | P1 |
| 5 | 自动识别所有地区写作评分标准 | V1 使用系统写作模型 | P1/P2 |
| 6 | 历史使用效果分析 | 需数据库 | P3 |
| 7 | 复杂学生画像 | 超出 V1 范围 | P3 |
| 8 | 完整教研报告生成 | 超出 V1 范围 | P3 |
| 9 | 重构首页和 AI 搜索页 | 不允许破坏 P0 流程 | — |
| 10 | 改变 P0 已通过流程 | 不允许 | — |
| 11 | 错题本洞察 | 错题数据结构待确认 | P2 |
| 12 | 练习报告页洞察（完整版） | 练习报告页面待开发 | P1 |
| 13 | 资源推荐洞察 | 依赖资源库真实数据 | P2 |

---

## 3. V1 页面范围

### 3.1 允许修改的区域

| 页面/组件 | 修改内容 | 限制 |
|----------|---------|------|
| HomePage 首页 AI 洞察区域 | 将现有 mock 洞察卡替换为符合 V1 规则的洞察卡 | 最多 3 条，不改变首页布局 |
| AIAssistantDrawer | 新增或复用 `insightDetail` panel | 不恢复搜索首页，不显示技术词 |
| 推荐动作按钮 | 点击后跳转 `/ai-search?query=` 或打开已有 panel | 不新增复杂业务流程 |
| mock 数据文件 | 新增 AI 洞察 mock 数据 | 不影响现有 mock |

### 3.2 禁止修改的区域

- AI 搜索页主流程
- 资源预览流程
- 布置确认流程
- 练习篮流程
- P0 回归已通过的所有逻辑
- intent 路由
- workflow 分流
- aiTaskController
- resourceActionController

---

## 4. V1 数据结构（已冻结）

### 4.1 InsightItem

```typescript
interface InsightItem {
  insightId: string
  module: 'home_wrong_word' | 'home_listening_speaking' | 'home_writing' | 'exam_reminder'
  title: string
  riskLevel: 'high' | 'medium' | 'low'
  priority: number           // 0 = 考前提醒（置顶）, 1 = 错词, 2 = 听力/听说, 3 = 写作
  scope: {
    className: string
    unit?: string
    questionType?: string
    period?: string
  }
  evidence: {
    summary: string
    details: Array<{
      label: string
      value: string
      trend?: 'up' | 'down' | 'stable'
    }>
  }
  analysis: string           // 教研判断（教师口吻）
  suggestion: string         // 教学建议
  actions: ActionItem[]
  sourceData: Record<string, unknown>
  sampleInfo: {
    totalStudents: number
    sampleCount: number
    sampleRatio: number
    isSampleTooSmall: boolean
  }
  examInfo?: {
    examName: string
    examDate: string
    daysToExam: number
    isExamWithin30Days: boolean
    hasEnded: boolean
  }
  createdAt: string
  expiresAt?: string
  status: 'active' | 'dismissed' | 'expired'
}
```

### 4.2 ActionItem

```typescript
interface ActionItem {
  actionId: string
  label: string
  type: 'navigate' | 'workflow' | 'panel' | 'alert'
  target: string             // URL path, panel type, or workflow ID
  requiresConfirm: boolean   // 是否需要老师确认
  workflowId?: string        // 对应 workflow ID
  payload?: Record<string, string>  // URL params or workflow params
}
```

### 4.3 WritingModelOutput（V1 占位）

```typescript
interface WritingModelOutput {
  totalScore: number
  dimensionScores: {
    content: number          // 内容维度
    language: number         // 语言维度
    structure: number        // 结构/逻辑维度
    format: number           // 书写/格式
    highlights: number       // 高分表达
  }
  contentDiagnosis: string
  languageDiagnosis: string
  structureDiagnosis: string
  commonErrors: Array<{
    type: string
    count: number
    students: string[]
  }>
  highlights: string[]
  modelEssayRecommendations: Array<{
    student: string
    score: number
    highlight: string
  }>
  revisionSuggestions: string[]
}
```

### 4.4 ExamInfo

```typescript
interface ExamInfo {
  examName: string           // "期末考试" / "中考" / "高考"
  examDate: string           // ISO date
  daysToExam: number
  isExamWithin30Days: boolean
  hasEnded: boolean
}
```

---

## 5. V1 Mock 数据范围（已冻结）

| 数据集 | 条目 | 位置 |
|--------|------|------|
| mockHomeInsights | 4 条洞察对象（错词/听力/写作/考前） | `ai-insight-mock-data-schema.md` §1-4 |
| mockWrongWordData | 错词列表 + 错误类型分布 | 同上 §1 |
| mockListeningData | 听力得分率 + 题型得分 | 同上 §2 |
| mockWritingData | 作文数据 + writingModelOutput | 同上 §7 |
| mockExamCalendar | 考试日期 | 同上 §4 |
| mockInsightHistory | 洞察历史（用于去重） | 规则函数设计 |

---

## 6. V1 规则函数范围（已冻结）

| # | 函数 | 输入 | 输出 | 说明 |
|---|------|------|------|------|
| 1 | `generateHomeInsights(ctx)` | TeacherContext + mockData | Insight[] (max 3) | 首页洞察主入口 |
| 2 | `generateWrongWordInsight(data)` | WrongWordData | Insight \| null | 课标词 >= 30% 触发 |
| 3 | `generateListeningSpeakingInsight(data, region, history)` | ListeningData + RegionConfig + PracticeHistory | Insight \| null | 根据地区和练习行为判断 |
| 4 | `generateWritingInsightFromModelOutput(output)` | WritingModelOutput | Insight \| null | V1 接系统写作模型 |
| 5 | `generateExamReminderInsight(examInfo)` | ExamInfo | Insight \| null | 考前 30 天触发 |
| 6 | `isSampleTooSmall(total, sample)` | number, number | boolean | 样本量阈值 |
| 7 | `isExamWithin30Days(examDate, today)` | string, string | boolean | 考前判断 |
| 8 | `shouldSuppressInsight(insight, history)` | Insight, InsightHistory | boolean | 11 条不提醒规则 |
| 9 | `rankInsights(insights)` | Insight[] | Insight[] | 优先级排序 |
| 10 | `mapInsightActionToWorkflow(action)` | ActionItem | workflowId + params | 动作 → workflow 映射 |

**开发顺序**: isSampleTooSmall → isExamWithin30Days → shouldSuppressInsight → rankInsights → 各 generate 函数 → generateHomeInsights

---

## 7. V1 推荐动作范围（已冻结）

| 洞察类型 | 推荐动作 | type | target | requiresConfirm |
|---------|---------|------|--------|:--:|
| 错词 | 生成词汇听写 | navigate | `/ai-search?query=生成Unit3词汇默写&autoRun=1` | 否 |
| 错词 | 查看错词学生 | panel | `insightDetail` | 否 |
| 错词 | 错词重练 | navigate | `/ai-search?query=Unit3高频错词重练&autoRun=1` | 否 |
| 听力/听说 | 推荐听力专项 | navigate | `/ai-search?query=听力训练&autoRun=1` | 否 |
| 听力/听说 | 推荐听说模拟 | navigate | `/ai-search?query=听说模拟&autoRun=1` | 否 |
| 写作 | 生成作文讲评 | navigate | `/ai-search?query=作文主要问题是什么&autoRun=1` | 否 |
| 写作 | 推荐范文 | panel | `insightDetail` | 否 |
| 写作 | 布置二次修改 | panel | `assignmentConfirm` | **是** |
| 写作 | 生成时态专项 | navigate | `/ai-search?query=时态专项练习&autoRun=1` | 否 |
| 考前 | 推荐模拟卷 | navigate | `/ai-search?query=期末模拟卷&autoRun=1` | 否 |
| 考前 | 推荐专项复习 | navigate | `/ai-search?query=期末专项复习&autoRun=1` | 否 |

---

## 8. V1 验收标准（已冻结）

### 8.1 首页洞察

| # | 标准 | 验证方式 |
|---|------|---------|
| 1 | 首页最多展示 3 条洞察 | 检查 DOM |
| 2 | 非考试期展示：错词 → 听力/听说 → 写作（按优先级） | mock 数据验证 |
| 3 | 考试前 30 天内考前提醒置顶 | mock examInfo.daysToExam <= 30 |
| 4 | 样本偏少时不展示高风险结论（riskLevel 不为 'high'） | mock sampleInfo.isSampleTooSmall = true |
| 5 | 洞察卡不出现技术词（AI/模型/算法/workflow/agent/tool/provider） | 文案审查 |
| 6 | 每条洞察显示：标题 + 简短原因 + "查看分析" | 检查 DOM |
| 7 | 优先级排序正确 | mock 数据验证 |

### 8.2 洞察详情

| # | 标准 | 验证方式 |
|---|------|---------|
| 1 | 点击"查看分析"打开 AIAssistantDrawer `insightDetail` panel | 点击测试 |
| 2 | Drawer 显示完整洞察：标题/影响范围/数据依据/教研判断/教学建议/推荐动作 | 检查 DOM |
| 3 | Drawer 不显示搜索首页内容 | 检查 DOM |
| 4 | Drawer 不显示技术词 | 文案审查 |
| 5 | 返回按钮关闭 Drawer 或回到首页 | 点击测试 |
| 6 | 关闭按钮清除 panelStack 并关闭 | 点击测试 |

### 8.3 推荐动作

| # | 标准 | 验证方式 |
|---|------|---------|
| 1 | 点击"生成词汇听写"跳转 `/ai-search?query=生成Unit3词汇默写&autoRun=1` | 点击测试 |
| 2 | 点击"推荐听说模拟"跳转 `/ai-search?query=听说模拟&autoRun=1` | 点击测试 |
| 3 | 点击"生成作文讲评"跳转对应 `/ai-search?query=` | 点击测试 |
| 4 | 点击布置类动作（如"布置二次修改"）打开 `assignmentConfirm` panel | 点击测试 |
| 5 | 布置类动作不直接发布（必须经过确认） | 点击测试 |

### 8.4 P0 回归

| # | 标准 | 验证方式 |
|---|------|---------|
| 1 | `runP0RegressionSelfCheck()` 所有项通过 | 运行测试 |
| 2 | 首页入口行为不变（AI 入口 → /ai-search） | 点击测试 |
| 3 | AI 搜索页流程不变 | 搜索测试 |
| 4 | Drawer 职责边界不变（只承载 panel，不含搜索首页） | 检查 DOM |
| 5 | intent 路由不变 | 运行测试 |

---

## 9. 后续交互闭环专项（已记录，V1 不开发）

以下内容先记录，V1 阶段不开发。
等 AI 洞察 V1 页面跑通后，进入"AI 洞察交互闭环专项"单独讨论。

| # | 待讨论项 | 说明 |
|---|---------|------|
| 1 | 快捷操作点击后的后续交互 | 从洞察卡片点击推荐动作后，是否需要回传处理状态 |
| 2 | 推荐动作点击后的后续流程 | 生成练习后如何预览、加入练习篮、布置 |
| 3 | 推送内容如何编辑 | 老师能否修改 AI 推荐的练习内容（词表/题型/难度） |
| 4 | 生成练习后如何操作 | 预览 → 加入练习篮 → 布置 的完整链路 |
| 5 | 推荐资源后如何操作 | 选择、预览、批量操作 |
| 6 | 老师修改 AI 推荐内容 | 词表编辑、难度调整、题型替换 |
| 7 | 洞察状态管理 | 支持：忽略、稍后提醒、不再提醒 |
| 8 | 洞察处理后的状态变化 | 已处理、已忽略、已布置、已生成练习 的状态流转 |
| 9 | 洞察效果追踪 | 老师执行推荐动作后，下次洞察是否反映变化 |
| 10 | 洞察推送频率 | 每天推送几次？是否支持老师控制频率 |

---

## 10. P1 / P2 后续扩展

### P1

- 练习报告页洞察（完整版）
- 地区听力/听说规则配置完善（至少 top 5 省份）
- 地区写作评分维度配置完善（补充官方来源）
- 考试日历接入（期中/期末/中考/高考实际日期）
- 错题本洞察

### P2

- 接入真实写作模型 API
- 接入真实练习数据
- 接入历史使用效果（布置次数、平均得分率、完成率）
- 资源推荐洞察
- 真实 LLM 接入生成洞察文案
- 更细粒度学生分层
- 个性化学生洞察
- 老师反馈闭环（"不感兴趣"）
- 洞察效果追踪

### P3

- 跨班级对比分析
- 年级趋势分析
- 教研报告自动生成
- 家长端洞察推送

---

## 11. 当前未决问题

| # | 问题 | 状态 | 影响 V1 |
|---|------|------|:--:|
| 1 | "相对下降 10%" 最终计算口径 | 暂定：优先对比近两周平均 | 否（mock 已使用此口径） |
| 2 | 考试季"考前 30 天"天数 | 已确认：30 天 | 否 |
| 3 | 样本量阈值的最终数值 | 已确认：>=45人班<=15，<45人班<=30% | 否 |
| 4 | 各年级是否需要不同策略 | 暂定：年级体现在难度匹配中 | 否 |
| 5 | 北京/江苏/浙江/上海等地区听说规则 | 待官方来源 | 否（V1 使用通用逻辑） |
| 6 | 各地区写作评分维度权重 | 待官方来源 | 否（V1 使用系统模型） |

---

## 12. V1 开发任务列表

| Task | 内容 | 涉及文件 | 预估 |
|------|------|---------|------|
| T1 | 创建 mock insight 数据 | 新建 `src/ai/mock/insightMockData.ts` | 导入 7 个 mock JSON |
| T2 | 创建 insight rule mock functions | 新建 `src/ai/insight/insightRules.ts` | 10 个函数 |
| T3 | 首页洞察卡替换 | `src/pages/HomePage.tsx` | 替换现有 mock 洞察 |
| T4 | 洞察详情 Drawer | `src/ai/components/AIAssistantDrawer.tsx` | 复用 insightDetail panel |
| T5 | 推荐动作路由 | 各函数 action handler | navigate / openSubPanel |
| T6 | 样本量和考前规则集成 | `src/ai/insight/insightRules.ts` | isSampleTooSmall, isExamWithin30Days |
| T7 | P0 回归测试 | 运行 `runP0RegressionSelfCheck()` | 确保全部通过 |
| T8 | 人工验收 | 按 §8 验收标准逐条验证 | 8.1-8.4 共 22 项 |

---

## 附录：相关文档索引

| 文档 | 用途 |
|------|------|
| `docs/ai-insight-design.md` | V2 完整教研设计（8 模块 + Prompt + 规则） |
| `docs/ai-insight-v1-dev-plan.md` | V1 开发计划（组件/函数/页面位置/线框图） |
| `docs/ai-insight-mock-data-schema.md` | Mock 数据结构（7 个模块完整 JSON） |
| `docs/ai-insight-rule-functions.md` | 规则函数设计（14 个函数的签名和伪代码） |
| `docs/region-exam-config.md` | 地区听力/听说考试配置 |
| `docs/writing-rubric-config.md` | 写作评分维度配置（V1 接系统模型） |
| `docs/insight-action-library.md` | 推荐动作库（40+ 动作 + workflow 映射） |
| `docs/p0-freeze-report.md` | P0 流程冻结报告 |
| `docs/ai-interaction-contract.md` | AI 交互契约 |
| `docs/p0-issue-backlog.md` | P0 问题池 |

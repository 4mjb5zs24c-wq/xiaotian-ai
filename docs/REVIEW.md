# 开发评审文档

> 分支：`feature/writing-insight`
> 构建：✅ `npm run build` 通过，0 TypeScript 错误
> 部署：https://resonant-sprinkles-1bdde7.netlify.app

## 一、项目概览

| 项 | 值 |
|------|------|
| 基于分支 | `main` (v1.0.0) |
| 新增文件 | 54 个 |
| 修改文件 | 10 个 |
| 新增代码 | ~28,000 行 |

---

## 二、功能交付清单

### 本期新增

| 功能 | 路由 | 状态 |
|------|------|------|
| AI 词汇洞察 | `/vocabulary-insight` | ✅ |
| AI 写作洞察 | `/writing-insight` | ✅ |
| AI 搜索闭环 | `/search` | ✅ |
| 首页洞察卡片优化 | `/` | ✅ |
| 小天助手抽屉优化 | 全局叠加 | ✅ |

### 2.1 AI 词汇洞察

| 区块 | 功能说明 |
|------|---------|
| 页面标题 | 班级上下文 + 数据范围切换（7天/14天/30天/本学期/当前单元） |
| AI 诊断总结卡 | 自然语言诊断总结 + 词汇复习规划 / 默写 / 课后PK 动作入口 |
| 核心指标卡 | 5 个 KPI：掌握率、已练词汇数、高频错词数、薄弱学生数、主要薄弱类型 |
| 错误类型分布 | TOP3 彩色诊断卡 + J 格式累积分布流 + 悬浮 tooltip 展示类型占比和 AI 归因 |
| 高频错词 / 语块 | 按 7 类错误类型筛选、勾选批量操作、展开典型错误详情（学生答案 vs 正确答案） |
| 学生洞察 | 薄弱学生 / 掌握较好双 Tab |
| 词汇复习方案 | 4 步向导：选择目标 → 设置周期 → 设置词量+回滚次数+掌握判定 → 生成可布置任务 |
| 干预记录 | 干预前后效果对比进度条 |
| 底部批量操作栏 | 默写 / 课后PK / 课后领读 / 组卷 / 讲词 / 词汇复习方案 |
| 侧边导航 | IntersectionObserver 自动追踪可视区块 |

### 2.2 AI 写作洞察

| 区块 | 功能说明 |
|------|---------|
| 页面标题 | 班级上下文 + 数据范围切换 |
| AI 诊断总结卡 | 自然语言总结 + 推荐写作练习 / 生成范文 |
| 核心指标卡 | 5 个 KPI：平均得分、已批改作文数、主要问题类型、薄弱学生数、优秀作文数 |
| 写作问题类型分布 | TOP3 诊断卡 + J 格式累积分布流 + AI 归因分析 |
| 高频写作问题 / 典型片段 | 按 4 组问题类型展示典型片段：学生原句 → 问题说明 → 修改建议 → 优化示例 |
| 薄弱写作学生 | 列表 + 右侧抽屉详情：得分趋势柱状图、问题类型分布条、典型句子、修改建议 |
| 优秀作文 | 得分/等级、亮点、精彩片段、查看完整作文 / 答题卡 / 作为范文参考 |
| 推荐写作练习资源 | 7 条可预览 / 布置 / 加入试卷篮 |
| AI 范文生成 | 基础版 / 提升版 / 优秀版 3 篇 |
| 干预记录 | 轻量效果追踪：干预前后对比、问题减少率、提升/需关注人数 |

### 2.3 AI 搜索闭环

| 功能 | 说明 |
|------|------|
| 意图识别引擎 | 规则匹配，8 级优先级（功能入口 > 试卷名 > 同步词汇/课文 > 资源类型 > 综合兜底） |
| 资源类型搜索 | 支持 15 种类型：同步词汇、同步课文、听力练习、专项练习、模拟题等 |
| 试卷名称搜索 | 精确匹配 + 近似匹配 |
| 功能入口搜索 | 词汇听写、词句听写、应用文、读后续写、篇章默写、快速制卡、导入词表、三方卡 |
| 试卷篮 | localStorage 持久化，刷新不丢失 |
| 资源卡片 | 预览 / 布置 / 加入试卷篮 / 加入备课 |
| 内容选择 | 同步词汇/课文支持按 section 勾选词条，选择练习形式（默写/听写/跟读等）后生成布置 |
| 布置确认 | 多作业统一布置，可编辑标题、删除 |

### 2.4 首页洞察卡片

| 改动 | 说明 |
|------|------|
| 卡片顺序 | 词汇洞察 → 写作洞察 → 阶段性报告 |
| 移除 | 听力/听说洞察卡片 |
| 入口行为 | 点击卡片直接跳转到独立洞察页面 |
| 卡片展示 | 仅状态标签 + 一句摘要 |

---

## 三、路由表

| 路由 | 页面 | 本期改动 |
|------|------|---------|
| `/` | 首页 | ✅ 洞察卡片调整 |
| `/vocabulary-insight` | 词汇洞察 | 🆕 全新 |
| `/writing-insight` | 写作洞察 | 🆕 全新 |
| `/search` | AI 搜索 | ✅ 全面重构 |
| `/ai-search` | AI 搜索（别名） | 同上 |

---

## 四、组件与文件结构

```
src/
├── ai/
│   ├── components/
│   │   ├── InsightSideNav.tsx                🆕 洞察页侧边导航
│   │   ├── vocabulary-insight/ (14个文件)     🆕 词汇洞察组件
│   │   ├── writing-insight/    (11个文件)     🆕 写作洞察组件
│   │   ├── search-new/         (15个文件)     🆕 AI搜索组件
│   │   └── AIAssistantDrawer.tsx              🔧 新增V2搜索面板 + 试卷篮支持
│   ├── insights/
│   │   ├── vocabularyInsightTypes.ts          🆕 词汇洞察类型定义
│   │   ├── mockVocabularyInsight.ts           🆕 词汇洞察Mock数据
│   │   ├── vocabularyDataFilter.ts            🆕 低价值词汇过滤器
│   │   ├── writingInsightTypes.ts             🆕 写作洞察类型定义
│   │   ├── mockWritingInsight.ts              🆕 写作洞察Mock数据
│   │   └── insightTypes.ts                    🔧 新增 writing_insight 模块
│   ├── search-new/ (7个文件)                  🆕 AI搜索引擎+类型+Mock
│   └── store/index.ts                         🔧 新增 paperBasket / newSearchResult
├── pages/
│   ├── VocabularyInsightPage.tsx              🆕
│   ├── WritingInsightPage.tsx                 🆕
│   ├── HomePage.tsx                           🔧
│   └── SearchPage.tsx                         🔧
```

### 关键组件依赖链

```
首页洞察卡片 → navigate('/vocabulary-insight') → VocabularyInsightPage
                                                   ├── InsightSideNav
                                                   ├── VocabularyInsightHeader
                                                   ├── AISummaryCard → ReviewPlanWizard
                                                   ├── CoreMetricCards
                                                   ├── ErrorTypeInsightSection (J格式分布流)
                                                   ├── FrequentWeakWordsSection
                                                   ├── StudentInsightSection
                                                   ├── InterventionRecordSection
                                                   └── SelectedActionBar

首页洞察卡片 → navigate('/writing-insight') → WritingInsightPage
                                                   ├── InsightSideNav
                                                   ├── WritingInsightHeader
                                                   ├── WritingAISummaryCard → SampleEssayGenerator
                                                   ├── WritingCoreMetricCards
                                                   ├── WritingProblemTypeSection (J格式分布流)
                                                   ├── HighFrequencyWritingIssuesSection
                                                   ├── WeakWritingStudentsSection (含右侧抽屉详情)
                                                   ├── ExcellentWritingSection
                                                   ├── RecommendedWritingResourcesSection
                                                   └── WritingInterventionRecordSection

AI 搜索 → SearchPage → matchNewSearch → SearchResultView
                                            ├── SearchIntentSummary
                                            ├── SearchFilterTabs
                                            ├── FunctionEntryCard
                                            ├── ResourceGroup → ResourceCard
                                            ├── ContentSelectResource → SyncVocabSection / SyncTextSection
                                            ├── NoResultsView
                                            ├── AssignmentConfirmPanel
                                            └── SuccessFeedbackCard
```

---

## 五、数据流

```
[Mock数据] → [页面 State] → [组件 Props] → [渲染]

交互流程：
  用户操作 → 组件回调 → 页面 handler
    ├── mock 动作 → showToast (反馈)
    ├── 状态更新 → setState → re-render
    └── 导航 → navigate / scrollIntoView
```

| 存储层 | 说明 |
|------|------|
| Zustand (`useAIStore`) | 全局状态：teacherContext、paperBasket（localStorage持久化）、newSearchResult、pendingAssignments |
| 页面 State | VocabularyInsightPage / WritingInsightPage 各自管理筛选、展开、勾选状态 |
| Mock 数据 | 全部通过 import 直接引用，无异步请求 |

---

## 六、设计决策记录

| 决策 | 背景 | 方案 |
|------|------|------|
| 配色统一为蓝色 | 写作洞察原用紫色/粉色，与品牌蓝不一致 | 全部改为 blue-500/600 |
| 错误类型分布用 J 格式 | A~J 10 种格式对比后选定 | 累积分布流 + 悬浮 tooltip |
| 洞察页不加底部操作栏 | 一期不做写作提升方案 | 动作入口放在 AI 诊断卡中 |
| 侧边导航自动跟踪 | 页面内容多，老师不知道有什么 | IntersectionObserver 自动高亮 |
| 试卷篮 localStorage 持久化 | 刷新页面不应丢失选择 | store 层加 localStorage 读写 |
| 词汇复习方案加回滚+掌握判定 | 老师需要定制复习策略 | 在第 3 步新增两个选项区块 |
| 写作洞察去作文订正 | 一期 mock，订正功能未实现 | 入口改为推荐写作练习为主 |

---

## 七、Mock 数据覆盖

| 模块 | 数据项 | 数量 |
|------|--------|------|
| 词汇洞察 | 首页卡片 | 4 张 |
| | 错误类型 | 7 类 |
| | 错词/语块 | 15 条（含 2 条需过滤的低价值词） |
| | 薄弱学生 | 8 人 |
| | 优秀学生 | 6 人 |
| | 干涉记录 | 3 条 |
| | 复习目标模板 | 4 种 |
| 写作洞察 | 首页卡片 | 5 张 |
| | 问题类型 | 7 类 |
| | 高频写作片段 | 16 条（4 组） |
| | 薄弱学生 | 8 人 |
| | 优秀作文 | 5 篇 |
| | 推荐资源 | 7 条 |
| | 范文 | 3 篇 |
| | 干预记录 | 4 条 |
| AI 搜索 | 搜索场景 | 15 种 |
| | 资源项 | 35+ |
| | 试卷 | 6 套 |
| | 功能入口 | 8 个 |

---

## 八、已知限制与风险

| 类别 | 问题 | 影响 |
|------|------|------|
| 数据 | 全部使用 Mock 数据 | 无法反映真实学情 |
| 接口 | 未对接后端 API | 搜索、布置、预览均为 mock |
| 测试 | 无单元测试 | 回归风险 |
| 部署 | 无 CI/CD，手动 netlify deploy | 需本地打包上传 |
| 响应式 | 侧边导航 1280px 以下隐藏 | 笔记本用户看不到导航 |
| 性能 | JS bundle ~1MB | 首次加载偏大 |
| 功能 | 一期不做：导出、自由问答、作文讲评 | 功能不完整 |
| 遗留 | FrequentWeakWordsSection 语块标签色仍为 purple-500 | 颜色统一不彻底 |

---

## 九、后续规划建议

| 优先级 | 事项 | 预估 |
|--------|------|------|
| P0 | 对接后端 API（搜索、洞察数据） | 1-2 周 |
| P0 | 搜索接入真实 AI 意图识别 | 1 周 |
| P1 | 补充单元测试 | 3-5 天 |
| P1 | 配置 CI/CD 自动部署 | 1 天 |
| P1 | 错误状态 / 空状态 / 加载态处理 | 2-3 天 |
| P2 | 响应式适配（移动端） | 1-2 周 |
| P2 | 代码分割优化 bundle 大小 | 1 天 |
| P3 | 写作洞察恢复作文订正入口 | 1-2 天 |
| P3 | 实现导出、自由问答 | 1 周 |

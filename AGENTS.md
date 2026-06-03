# AGENTS.md

## 1. 项目说明

- **项目名称**：小天智能助手 / xiaotian-ai
- **项目定位**：面向英语老师的教学助手与数字化教学原型
- **核心目标**：帮助老师完成备课、布置练习、练习报告分析、错词/错题分析、AI 洞察、教学建议和可执行教学动作

## 2. 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | React | ^19.2.6 |
| 语言 | TypeScript | ~6.0.2 |
| 构建 | Vite | ^8.0.12 |
| 样式 | Tailwind CSS | ^4.3.0 |
| 状态管理 | Zustand | ^5.0.13 |
| 路由 | React Router DOM | ^7.15.1 |
| 动画 | Framer Motion | ^12.40.0 |
| 图标 | Lucide React | ^1.16.0 |
| 部署 | Netlify | netlify-cli ^26.1.0 |

**目录结构速览**：
- `src/pages/` — 页面组件（24个 .tsx 文件，扁平结构）
- `src/components/` — 通用 UI 组件
- `src/layouts/` — 布局组件（MainLayout.tsx）
- `src/business/` — 业务逻辑（练习篮、作业桥接、推荐引擎、资源适配）
- `src/ai/` — AI 系统全部代码
  - `src/ai/components/` — AI 相关 UI 组件（Drawer、SearchResultRenderer 等）
  - `src/ai/insights/` — AI 洞察系统（规则、mock 数据、自检套件）
  - `src/ai/workflows/` — 13 个 Workflow + 引擎/执行器
  - `src/ai/router/` — Intent 路由（11 种 intent）
  - `src/ai/search/` — AI 搜索（意图解析、查询分析）
  - `src/ai/store/` — AI 全局状态（Zustand）
  - `src/ai/agents/` — Agent 系统
  - `src/ai/llm/` — LLM Provider 层
  - `src/ai/tools/` — 工具系统
  - `src/ai/cards/` — 卡片组件（洞察卡、推荐卡、搜索结果卡）
  - `src/ai/controller/` — 任务控制器

## 3. 项目结构

### 路由入口
- **路由定义**：[src/App.tsx](src/App.tsx) — 25 条路由
- **入口文件**：[src/main.tsx](src/main.tsx) — ReactDOM 挂载

### 路由表（25 条）

**MainLayout 包裹（有侧边栏，14 条）**：

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | [HomePage](src/pages/HomePage.tsx) | 首页 |
| `wrong-words` | [WrongWordPage](src/pages/WrongWordPage.tsx) | 错词本（班级/学生个人） |
| `wrong-questions` | [WrongQuestionPage](src/pages/WrongQuestionPage.tsx) | 错题本 |
| `reports` | [ReportPage](src/pages/ReportPage.tsx) | 练习报告（旧版） |
| `practice-reports` | [PracticeReportPage](src/pages/PracticeReportPage.tsx) | 练习报告 |
| `writing` | [WritingPage](src/pages/WritingPage.tsx) | 写作批改 |
| `listening` | [ListeningPage](src/pages/ListeningPage.tsx) | 听力/听说 |
| `resources` | [ResourcePage](src/pages/ResourcePage.tsx) | 资源库 |
| `sync-teaching` | [SyncTeachingPage](src/pages/SyncTeachingPage.tsx) | 同步教学 |
| `exam-review` | [ExamReviewPage](src/pages/ExamReviewPage.tsx) | 考前复习 |
| `writing-practice` | [WritingPracticePage](src/pages/WritingPracticePage.tsx) | 写作练习 |
| `search` / `ai-search` | [SearchPage](src/pages/SearchPage.tsx) | AI 搜索页 |
| `manual-compose` | [ManualComposePage](src/pages/ManualComposePage.tsx) | 手动组卷 |

**沉浸式路由（无侧边栏，11 条）**：

| 路径 | 页面 | 说明 |
|------|------|------|
| `vocabulary-pk` | VocabularyPkPage | 词汇 PK |
| `assign-sync` | AssignSyncPage | 布置同步练习 |
| `assign-special` | AssignSpecialPage | 布置专项练习 |
| `assign-mock` | AssignMockPage | 布置模拟练习 |
| `assign-dubbing` | AssignDubbingPage | 布置配音练习 |
| `assign-video` | AssignVideoPage | 布置视频练习 |
| `assign-after-class-pk` | AssignAfterClassPkPage | 布置课后 PK |
| `assign-paper-card` | AssignPaperCardPage | 布置答题卡 |
| `assign-custom-review` | AssignCustomReviewPage | 布置自定义复习 |
| `assign-reading` | AssignReadingPage | 布置阅读练习 |
| `word-teaching/:word` | WordTeachingPage | 单词教学 |

### 布局
- [MainLayout.tsx](src/layouts/MainLayout.tsx) — 顶栏 + 蓝色侧边栏 + 内容区 + AI Drawer 叠加

### 核心业务模块
- [src/business/](src/business/) — 练习篮、作业桥接、推荐引擎、资源适配、错词本连接器

### AI 系统目录
- [src/ai/store/](src/ai/store/) — AI 全局状态（教师上下文、Drawer 状态、Workflow 状态、练习篮）
- [src/ai/components/](src/ai/components/) — AIAssistantDrawer、AIDrawer、AISearchResultRenderer、GeneratedContentPanel 等
- [src/ai/insights/](src/ai/insights/) — 洞察规则、mock 数据、5 套自检套件
- [src/ai/workflows/](src/ai/workflows/) — 13 个 Workflow + 引擎/注册表/上下文
- [src/ai/router/](src/ai/router/) — 11 种 Intent 路由 + ambiguous fallback
- [src/ai/search/](src/ai/search/) — 意图解析、查询分析、搜索路由
- [src/ai/agents/](src/ai/agents/) — Multi-Agent 系统
- [src/ai/llm/](src/ai/llm/) — LLM Provider 层（Codex/OpenAI/DeepSeek/mock）

## 4. 真实页面优先原则

修改代码时必须先排查真实页面引用链，不要只改 mock、demo 或未挂载的新组件。

**修改前必须确认**：
1. **页面入口在哪里** — 从 `App.tsx` 路由出发，确认哪个页面用到了被修改的组件
2. **组件链路是什么** — 从页面 → 子组件 → 孙组件，追踪完整层级
3. **数据来源是什么** — 数据来自 mock、store、props 还是 API？
4. **当前页面是否真的使用了被修改的组件** — 搜索组件名的 import 引用，确认未被使用则不可盲目修改

## 5. AI 洞察优化原则

小天 AI 洞察不能只做单点提醒，要升级为**阶段诊断**。每条 AI 洞察必须包含完整的信息结构：

1. **洞察结论** — 一句话说明发现什么问题
2. **数据依据** — 用什么数据得出这个结论（样本量、错误率、得分率等）
3. **阶段变化趋势** — 这个问题是在变好、变差还是稳定？
4. **班级参照对比** — 和年级/全校平均水平对比如何
5. **问题归因** — 为什么会出这个问题？（知识点薄弱/题型陌生/时间不够/粗心等）
6. **影响范围** — 多少学生受影响？
7. **优先级判断** — 紧急/重要/一般（红色/橙色/默认）
8. **教学建议** — 老师可以做什么
9. **小天可以帮你** — AI 可以自动完成什么（推荐动作入口）
10. **相关明细** — 可展开查看具体学生/词/题列表

## 6. 洞察类型

| 类型 | type 字段 | 说明 |
|------|----------|------|
| 阶段练习洞察 | `practiceStage` | 按阶段练习表现分析，周期性的练习报告诊断 |
| 词汇掌握洞察 | `vocabulary` | 错词本用这个类型，按"词"分析（错误率、课标词覆盖等） |
| 错题本洞察 | `questionError` / `wrongQuestion` | 按**题型、知识点、错误原因**分析，不能复用词汇洞察 |
| 听力/听说洞察 | `listeningSpeaking` | 得分率、地区题型匹配、听说能力趋势 |
| 写作洞察 | `writing` | 作文批改数据驱动，写作模型输出分析 |

## 7. 错题本与错词本区分（重要）

这四者是不同的分析维度，**不可混淆**：

| 功能 | 页面路由 | 分析维度 | 使用洞察类型 |
|------|---------|---------|------------|
| **班级错词本** | `wrong-words?tab=class` | 按"词"分析：哪些词错得多 | `vocabulary` |
| **学生个性化词本** | `wrong-words?tab=student` | 按"学生+词"分析：这个学生哪些词弱 | `vocabulary` |
| **错题本** | `wrong-questions` | 按**题型、知识点、错误原因**分析 | `questionError` / `wrongQuestion` |
| **练习报告** | `practice-reports` | 按阶段练习表现分析 | `practiceStage` |
| **首页洞察** | `/` | 根据洞察 type 分发到对应详情页 | 根据 type 路由 |

- 错词 ≠ 错题，分析维度完全不同
- 错题洞察不能复用错词洞察的代码和模板
- 首页洞察卡片根据 `type` 字段决定点击后跳转到哪个详情页

## 8. UI 风格原则

老师端数据分析界面要**克制、清晰**，遵循以下色彩规则：

| 颜色 | 用途 |
|------|------|
| **白底** | 主背景 |
| **浅蓝、灰蓝** | 卡片、区域背景、次要信息 |
| **品牌蓝** | 主色，用于按钮、链接、重点文字 |
| **红色** | **仅用于严重问题**（如错误率 > 50%、紧急风险） |
| **橙色** | **仅用于中等风险**（如错误率 30-50%、需要注意） |
| **绿色** | **仅用于正向变化**（如正确率上升、进步趋势） |

- **不要大面积彩色背景**
- **图表颜色控制在 2-3 种以内**
- 数据卡片以白底 + 细边框为主，减少视觉噪音
- 字号分级清晰（标题/正文/辅助文字），不滥用大字号

## 9. 不要轻易改动的范围

### 不可随意改
- 首页主体布局（[HomePage.tsx](src/pages/HomePage.tsx) 的结构和区块）
- 练习报告列表主体
- 错题本主体（[WrongQuestionPage.tsx](src/pages/WrongQuestionPage.tsx)）
- 错词本主体（[WrongWordPage.tsx](src/pages/WrongWordPage.tsx)）
- 布置练习主体（所有 Assign* 页面）
- 路由主流程（[App.tsx](src/App.tsx) 的 Route 定义）
- P0 冻结规则（Intent 路由、Drawer 行为、Preview/Assign/Basket 规则）

### 可以改
- AI 洞察详情组件
- 洞察 mock 数据结构
- 图表组件
- 颜色规则
- 推荐动作展示
- 真实页面组件接入逻辑

## 10. 构建和自检

每次完成较大修改后，必须执行以下检查清单：

```
□ npm run build 通过（TypeScript 0 错误）
□ 输出修改文件列表
□ 说明真实页面引用链（从 App.tsx 路由 → 页面 → 组件 → 数据）
□ 说明是否只改了 mock（如是，标注"未接入真实数据"）
□ 说明页面是否真实接入
□ 自检结果（P0 回归、Insight V1 等）
```

**可用自检套件**（位于 `src/ai/insights/`）：
- `runP0RegressionSelfCheck` — P0 回归 29/29
- `runInsightV1SelfCheck` — 洞察 V1 15/15
- `runInsightActionFlowSelfCheck` — 洞察动作流 26/26
- `runGeneratedContentFlowSelfCheck` — 生成内容流 31/31
- `runQuickActionSelfCheck` — 快捷操作 38/38

## 11. 沟通规则

**每次**需要向用户询问信息、确认需求、请求选择方案、请求补充资料时，都必须称呼用户为 **"Kitty公主"**。

例如：
- "Kitty公主，我需要确认一下……"
- "Kitty公主，这里有两个方案……"
- "Kitty公主，请问你希望优先改哪个页面？"

## 12. 输出要求

### 修改前
先说明计划：要改什么、涉及哪些文件、影响哪些页面。

### 修改后
必须说明：
- 改了哪些文件
- 为什么这样改
- 哪些页面受影响
- 是否运行 build
- 是否还有风险或待确认项

# 小天AI助手 交互契约

> 版本: v2.0 | 日期: 2026-05-27
> 
> 本文档定义所有 AI 相关按钮和入口的不可违反行为规范。
> 任何新增功能或修改交互逻辑时，必须遵守此契约。
> 
> 此文档覆盖 v1.0 interaction-contract.md 的内容，并合并为统一版本。

---

## 一、信息架构边界（硬规则）

```
┌─ 首页 (HomePage) ─────────────────────────────────┐
│ 左侧: 教师工作台（布置练习/课堂教学/资源推荐）      │
│ 右侧: 小天AI入口 + 轻量洞察 + 练习报告             │
│ AI入口: 点击 → /ai-search（不展开复杂workflow）     │
├─ AI搜索页 (/ai-search = SearchPage) ──────────────┤
│ 搜索框 + 近期搜索 + 大家都在搜 + 试试推荐           │
│ 搜索结果: AISearchResultRenderer 统一渲染           │
│ 调用: aiTaskController.runAISearch()               │
├─ 右侧浮窗 (AIAssistantDrawer) ────────────────────┤
│ 66vw 右侧滑出                                       │
│ 承载: resourcePreview / assignmentConfirm /        │
│        basket / insightDetail / cardCreation        │
│ 不承载: 完整AI搜索首页（home/searchResult已逐步废弃）│
└────────────────────────────────────────────────────┘
```

---

## 二、按钮行为契约（不可违反）

### 1. 小天AI入口

| 位置 | 行为 | 禁止 |
|------|------|------|
| 首页"小天AI智能助手"标题 | navigate('/ai-search') | 不可打开浮窗 |
| 首页AI搜索框（点击/聚焦/Enter） | navigate('/ai-search?query=xxx') | 不可在当前页展开 |
| 首页快捷动作 | navigate('/ai-search?query=xxx') | — |
| 首页AI洞察"查看分析" | navigate('/ai-search?query=xxx') | — |
| 顶部栏"小天AI"按钮 | 打开 AIAssistantDrawer | 应改为 navigate('/ai-search') |

### 2. 预览

| 位置 | 行为 | 禁止 |
|------|------|------|
| 搜索结果资源"预览" | handleResourceAction('preview') → ResourcePreviewPanel | 不可触发布置 |
| workflow结果"预览题目/预览素材/预览试卷" | handleResourceAction('preview') → ResourcePreviewPanel | 不可触发布置 |
| 听力素材列表"预览" | handleResourceAction('preview') → ResourcePreviewPanel | 不可触发布置 |

### 3. 加入练习篮

| 位置 | 行为 | 禁止 |
|------|------|------|
| 所有"加入练习篮"按钮 | store.addToBasket(item) → toast | 不可触发布置 |
| 重复点击 | toast "该内容已在练习篮中" | 不可重复添加 |
| 练习篮数量 | header badge 实时更新 | — |

### 4. 布置给学生

| 位置 | 行为 | 禁止 |
|------|------|------|
| workflow结果"布置给学生/布置训练/布置写作训练" | 打开 AssignmentConfirmPanel | 不可直接发布成功 |
| 预览面板"布置给学生" | 打开 AssignmentConfirmPanel | 不可直接发布成功 |
| 练习篮内"布置" | 打开 AssignmentConfirmPanel | 不可直接发布成功 |

### 5. 确认布置

| 位置 | 行为 | 禁止 |
|------|------|------|
| AssignmentConfirmPanel "确认布置" | publishAssignment() → 成功卡 | 不可跳过确认 |
| AssignmentConfirmPanel "取消" | 返回上一状态 | — |

### 6. 查看分析

| 位置 | 行为 | 禁止 |
|------|------|------|
| 首页洞察"查看分析" | navigate('/ai-search?query=xxx') | 不可直接进入 vocab_dictation |
| 浮窗洞察"查看分析" | 进入 insight 状态 | 不可直接进入 vocab_dictation |

### 7. 去制卡

| 位置 | 行为 | 禁止 |
|------|------|------|
| 词汇结果"去制卡" | 进入 card-creation workflow | 不可生成空白卡 |

### 8. 修改词表

| 位置 | 行为 | 禁止 |
|------|------|------|
| 词汇结果"修改词表" | 进入 wordListEdit 状态 | — |

---

## 三、快捷功能路由

| 快捷功能 | 目标URL |
|---------|--------|
| 生成听写 | /ai-search?query=生成Unit3词汇默写 |
| 查同步资源 | /ai-search?query=查同步资源 |
| 智能组卷 | /ai-search?query=智能组卷 |
| 快速制卡 | /ai-search?query=快速制卡 |

---

## 四、统一控制器调用

所有 AI 搜索/工作流必须通过以下控制器:

```
aiTaskController.runAISearch(query, source, ctx)
  → matchIntent → runWorkflowRunner / parseIntent+routeSearch
  → AISearchResult { resultType, intentId, workflowId, workflowResult?, searchResponse? }

handleResourceAction(action, item, context)
  → preview → { panelType: 'resourcePreview', previewData }
  → assign → { panelType: 'assignmentConfirm', assignmentData }
  → add_to_basket → store.addToBasket(), panelType: null
```

---

## 五、禁止行为清单

- ❌ 预览触发布置
- ❌ 布置直接发布（必须经过确认表单）
- ❌ 查看分析直接进入词汇听写
- ❌ 搜索"阅读"推荐词汇默写
- ❌ 模糊查询默认进入词汇听写
- ❌ 首页直接展示复杂workflow结果
- ❌ AI浮窗承载完整搜索首页
- ❌ 展示Agent/Tool/Provider/step-id等技术词
- ❌ 不同入口使用不同搜索/action逻辑
- ❌ 练习篮触发布置

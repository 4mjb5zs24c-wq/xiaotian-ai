# 小天AI助手 P0 冻结报告

> 版本: v1.0 | 日期: 2026-05-27
> 
> 以下内容已在 P0 回归中验证通过，后续修改不得破坏。

---

## 1. 首页入口规则（已冻结）

| 入口 | 行为 | 禁止 |
|------|------|------|
| 首页"小天AI智能助手"标题 | `navigate('/ai-search')` | 不可打开浮窗 |
| 首页 AI 搜索框（点击/聚焦/Enter） | `navigate('/ai-search?query=xxx')` | 不可在当前页展开 |
| 首页快捷动作（生成听写/查同步资源/智能组卷/快速制卡） | `navigate('/ai-search?query=xxx')` | — |
| 首页 AI 洞察"查看分析" | `navigate('/ai-search?query=xxx')` | 不可直接进 vocab_dictation |
| 顶部栏"小天AI"按钮 | `navigate('/ai-search')` | 不可打开浮窗 |
| 首页练习模块按钮（同步/专项/模拟等） | `handleQuickAction` → `matchIntent` → `runWorkflowRunner` → `WorkflowResultDrawer` | — |

---

## 2. AI 搜索页规则（已冻结）

| 规则 | 内容 |
|------|------|
| 路由 | `/ai-search` 和 `/search` 均渲染 `SearchPage` |
| URL 参数 | `?query=xxx` 自动执行搜索 |
| 搜索入口 | `aiTaskController.runAISearch(query, source, ctx)` |
| 结果渲染 | `AISearchResultRenderer`（根据 resultType 渲染：workflow/search/ambiguous） |
| Action 处理 | `handleResourceAction(action, item, context)` |
| Panel 打开 | `setAIDrawerPanel(panelType, data)` |

---

## 3. 右侧 Drawer 规则（已冻结）

| 规则 | 内容 |
|------|------|
| 打开方式 | `store.setAIDrawerPanel(panelType, data)` — 闭环于 store |
| 支持的 Panel | `resourcePreview` / `assignmentConfirm` / `basket` / `cardCreation` / `wordListEdit` / `insightDetail` |
| 不支持的 Panel | `home` / `searchResult` / `workflow` — 已删除，迁移到 SearchPage |
| 关闭方式 | X 按钮 / Esc / 遮罩点击 / `setAIDrawerPanel(null)` |

---

## 4. Intent 路由规则（已冻结）

文件: `src/ai/router/intentMap.ts`

11 种 Intent + `ambiguous` fallback。

优先级顺序:
1. assignment（布置/发布作业）
2. writing_analysis（作文/写作/批改）
3. unit_paper（组卷/试卷）
4. card_creation（制卡/答题卡）
5. listening_speaking（听力/听说/口语）
6. reading_practice（阅读/完形/七选五）
7. vocab_dictation（听写/默写）
8. learning_report_analysis（练习情况/学情）
9. wrong_word_analysis（错词率）
10. wrong_question_analysis（错题）
11. resource_search（同步资源/查资源）
12. ambiguous（不猜测，不默认 vocab_dictation）

Source 参数影响模糊查询的默认意图。

---

## 5. Preview / Assign / Basket 行为规则（已冻结）

| Action | 行为 | PanelType | 禁止 |
|--------|------|-----------|------|
| `preview` | 打开资源预览 | `resourcePreview` | 不可触发布置 |
| `assign` | 打开布置确认表单 | `assignmentConfirm` | 不可直接发布 |
| `add_to_basket` | 加入练习篮 + toast | `null`（不改变 panel） | 不可触发布置 |
| `card_create` | 打开制卡确认 | `cardCreation` | — |
| `edit` | 打开词表编辑 | `wordListEdit` | — |

实现文件: `src/ai/controller/resourceActionController.ts`

---

## 6. P0 回归结果（已冻结）

**23/23 通过（100%）**

- A. Intent 路由: 11/11 ✅
- B. Action 路由: 5/5 ✅
- C. 页面入口: 7/7 ✅

自检脚本: `src/ai/tests/runP0RegressionSelfCheck.ts`

---

## 7. 当前仍是 Mock 的部分

| 模块 | Mock 方式 | 替换目标 |
|------|----------|---------|
| 所有 13 个 workflow 数据 | `step.execute` 返回 mock 数据 | 真实 API |
| AI 洞察数据 | 前端常量 `mockInsights` | 真实学情 API |
| 近期/热门搜索 | 前端常量 | 真实搜索记录 API |
| 搜索结果 | `searchRouter` mock 数据 | 真实搜索后端 |
| `publishAssignment` | 内存数组 mock | 真实作业发布 API |
| 学情/错词/错题统计 | workflow 内 hardcoded | 真实数据 API |
| 搜索建议（AmbiguousView） | 前端常量 | LLM 生成或配置 |

---

## 修改规则

- 以上 P0 规则修改前必须先更新本报告
- UI 调整不得改变以上任何行为
- 每次修改后必须重新运行 `runP0RegressionSelfCheck()`
- 通过后更新回归结果

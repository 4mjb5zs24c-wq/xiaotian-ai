# AI 洞察交互闭环专项 — 设计文档

> 版本: v1.0 | 日期: 2026-05-27
> 状态: 第 1 步完成
> 基于: AI 洞察 V1 验收报告 (ai-insight-v1-acceptance-report.md)

---

## 1. 洞察推荐动作的统一规则

所有洞察详情页中的推荐动作遵守以下分流规则：

| 动作类型 | 说明 | 行为 | 示例 |
|---------|------|------|------|
| `generate` | 生成类 | 跳转 `/ai-search?query=xxx&autoRun=1` 自动执行 | 生成词汇听写、生成作文讲评 |
| `view` | 查看类 | 打开右侧 Drawer mock 面板 | 查看错词学生、推荐范文 |
| `recommend_resource` | 推荐资源类 | 跳转 `/ai-search?query=xxx&autoRun=1` 展示资源结果 | 推荐听说模拟、推荐模拟卷 |
| `assign` | 布置类 | 进入 AssignmentConfirmPanel，不能直接发布 | 布置错词强化、布置二次修改 |
| `basket` | 练习篮 | 加入练习篮 | 加入练习篮 |
| `mock` | 占位 | 显示轻提示："该动作将在后续版本接入" | 提醒未完成学生 |

**铁律**：
- 所有布置类动作必须进入 `AssignmentConfirmPanel`
- InsightDetailPanel 不写路由逻辑，统一调用 `handleInsightAction()`
- 不可绕过确认流程

---

## 2. 快捷操作的统一规则

| 入口 | 来源 source | 行为 | 说明 |
|------|-----------|------|------|
| 首页快捷操作 | `homepage_quick_action` | 跳转 `/ai-search?query=xxx&autoRun=1&source=homepage_quick_action` | 主动任务入口 |
| AI 洞察推荐动作 | `insight_action` | 通过 `handleInsightAction()` 分流 | 基于问题的处理入口 |
| AI 搜索页 | `search_input` | 通过 `aiTaskController.runAISearch()` | 搜索入口 |
| Drawer 内动作 | `drawer_action` | 通过对应的 controller 处理 | Drawer 内操作 |

首页快捷操作 = 主动任务入口  
AI 洞察推荐动作 = 基于问题的处理入口

两者复用同一套 `insightActionController`，但 `source` 不同，方便后续埋点。

---

## 3. 推送内容后的处理流程

```
洞察推荐动作点击
  ├── generate/recommend_resource → /ai-search?query=xxx&autoRun=1
  │                                   ↓
  │                              AI 搜索页自动执行
  │                                   ↓
  │                              展示结果（可预览/加入练习篮/布置）
  │
  ├── view → 打开 Drawer mock 面板
  │             ↓
  │          展示 mock 数据
  │             ↓
  │          可加入练习篮或布置
  │
  ├── assign → AssignmentConfirmPanel
  │              ↓
  │           老师确认后发布
  │
  ├── basket → 加入练习篮
  │
  └── mock → 轻提示（后续接入）
```

---

## 4. 推荐动作和 Workflow 的映射关系

| actionId | type | query / target | workflowId |
|----------|------|---------------|------------|
| vocab_dictation | generate | 生成 Unit3 词汇默写 | vocabDictationWorkflow |
| wrong_word_repractice | generate | Unit3 高频错词重练 | — |
| writing_review | generate | 作文主要问题是什么 | — |
| listening_special | recommend_resource | 听力训练 | — |
| recommend_speaking_mock | recommend_resource | 听说模拟训练 | — |
| recommend_shadowing | recommend_resource | 跟读训练 | — |
| exam_mock | recommend_resource | 期末模拟卷 | — |
| exam_sprint | recommend_resource | 期末冲刺训练 | — |
| generate_special_practice | generate | 期末专项复习 | — |
| view_wrong_word_students | view | (panel: wrongWordStudents) | — |
| recommend_model_essay | view | (panel: modelEssayPreview) | — |
| assign_wrong_word_practice | assign | (panel: assignmentConfirm) | — |
| writing_revision | assign | (panel: assignmentConfirm) | — |
| remind_unfinished | mock | (toast) | — |

---

## 5. 洞察状态流转

```
unread ──(查看分析)──→ viewed ──(点击推荐动作)──→ action_clicked
                                                      │
                                          ┌───────────┼───────────┐
                                          ↓           ↓           ↓
                                      generated  added_to_basket  assigned
                                          │           │           │
                                          └───────────┴───────────┘
                                                      │
                                              ┌───────┼───────┐
                                              ↓       ↓       ↓
                                          ignored  remind_later  resolved
```

**状态触发规则**：

| 状态 | 触发条件 | 触发方 |
|------|---------|--------|
| `unread` | 首页展示时（默认） | 系统 |
| `viewed` | 点击"查看分析" | `markInsightViewed()` |
| `action_clicked` | 点击推荐动作 | `handleInsightAction()` |
| `generated` | 生成练习成功 | 后续闭环 |
| `added_to_basket` | 加入练习篮 | 后续闭环 |
| `assigned` | 完成布置 | 后续闭环 |
| `ignored` | 点击"忽略" | `markInsightIgnored()` |
| `remind_later` | 点击"稍后提醒" | `markInsightRemindLater()` |
| `resolved` | 点击"标记为已处理" | `markInsightResolved()` |

V1 使用内存 Map 存储，后续接真实持久化。

---

## 6. V1 已接入 mock 闭环的动作

| actionId | 闭环状态 | 行为 |
|----------|---------|------|
| vocab_dictation | 已接入 | navigate → /ai-search?query=...&autoRun=1 |
| wrong_word_repractice | 已接入 | navigate → /ai-search?query=...&autoRun=1 |
| view_wrong_word_students | 已接入 | open_panel → wrongWordStudents (mock) |
| assign_wrong_word_practice | 已接入 | open_panel → assignmentConfirm |
| writing_review | 已接入 | navigate → /ai-search?query=...&autoRun=1 |
| recommend_model_essay | 已接入 | open_panel → modelEssayPreview (mock) |
| writing_revision | 已接入 | open_panel → assignmentConfirm |
| listening_special | 已接入 | navigate → /ai-search?query=...&autoRun=1 |
| recommend_speaking_mock | 已接入 | navigate → /ai-search?query=...&autoRun=1 |
| recommend_shadowing | 已接入 | navigate → /ai-search?query=...&autoRun=1 |
| exam_mock | 已接入 | navigate → /ai-search?query=...&autoRun=1 |
| exam_sprint | 已接入 | navigate → /ai-search?query=...&autoRun=1 |
| generate_special_practice | 已接入 | navigate → /ai-search?query=...&autoRun=1 |

## 7. V1 仍是 mock 提示的动作

| actionId | 行为 | 计划 |
|----------|------|------|
| remind_unfinished | show_toast: "将在后续版本接入" | 需真实提醒系统 |

---

## 8. 未接入内容（后续专项）

| # | 内容 | 计划 |
|---|------|------|
| 1 | 真实提醒系统 | 需后端推送 |
| 2 | 真实错词学生数据 | 需数据库 |
| 3 | 真实范文推荐 | 需资源库 |
| 4 | generated → added_to_basket → assigned 完整链 | P2 |
| 5 | 首页状态持久化 | P2 |
| 6 | 真实埋点 | P2 |

---

## 9. 涉及文件

### 新增
- `src/ai/insights/insightStatus.ts` — 状态机 + 内存 store
- `src/ai/insights/insightActionMap.ts` — 动作映射表（14 条映射）
- `src/ai/insights/insightActionController.ts` — 统一动作控制器
- `src/ai/insights/runInsightActionFlowSelfCheck.ts` — 动作流自检

### 修改
- `src/ai/components/AIAssistantDrawer.tsx` — 接入控制器、状态按钮、mock 面板（wrongWordStudents / modelEssayPreview）、toast
- `src/pages/HomePage.tsx` — 快捷操作 source 追踪

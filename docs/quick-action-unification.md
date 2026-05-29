# 快捷操作统一设计文档

> 版本: v1.0 | 日期: 2026-05-28
> 状态: 第 3 步完成

---

## 1. 为什么需要统一快捷操作

在小天 AI 中，老师可以从三个不同的入口发起教学任务：

- **首页快捷操作** — 老师看到 AI 洞察后主动发起任务
- **AI 搜索页快捷操作** — 老师在搜索页快速选择任务类型  
- **AI 洞察推荐动作** — 系统基于学情问题给出的处理建议

三个入口虽然场景不同，但底层行为相似：都是"选择一个任务 → 跳转或生成内容 → 展示结果"。如果每个入口手写跳转逻辑，会导致 URL 参数不一致、source 缺失、埋点分散。

统一后：
- 所有入口复用同一套分发逻辑（`handleQuickAction` / `handleInsightAction`）
- source 参数标准化，方便后续埋点
- 新增快捷操作只需在 map 中注册

---

## 2. 首页快捷操作定义

| actionId | label | source | actionType | query |
|----------|-------|--------|-----------|-------|
| homepage_generate_dictation | 生成听写 | homepage_quick_action | search_autorun | 生成 Unit3 词汇默写 |
| homepage_search_resource | 查同步资源 | homepage_quick_action | search_autorun | 查同步资源 |
| homepage_generate_paper | 智能组卷 | homepage_quick_action | search_autorun | 智能组卷 |
| homepage_quick_card | 快速制卡 | homepage_quick_action | search_autorun | 快速制卡 |

点击后跳转 `/ai-search?query=xxx&autoRun=1&source=homepage_quick_action`，自动执行搜索。

---

## 3. AI 搜索页快捷操作定义

| actionId | label | source | actionType | query |
|----------|-------|--------|-----------|-------|
| ai_search_generate_dictation | 生成听写 | ai_search_quick_action | search_autorun | 生成 Unit3 词汇默写 |
| ai_search_resource | 查同步资源 | ai_search_quick_action | search_autorun | 查同步资源 |
| ai_search_paper | 智能组卷 | ai_search_quick_action | search_autorun | 智能组卷 |
| ai_search_card | 快速制卡 | ai_search_quick_action | search_autorun | 快速制卡 |

标签/推荐搜索项使用 `ai_search_suggestion`、`ai_search_recent` 等细分 source。

---

## 4. 洞察推荐动作定义

由 `src/ai/insights/insightActionController.ts` 管理，14 个动作，6 个走 `generate_content`，其余走 `navigate/open_panel/mock`。source = `insight_action`。

---

## 5. 三者的区别

| 维度 | 首页快捷操作 | AI 搜索页快捷操作 | 洞察推荐动作 |
|------|------------|-----------------|-------------|
| 触发场景 | 老师主动发起 | 搜索页快速选择 | 系统基于学情建议 |
| 主动性 | 主动 | 主动 | 被动（响应洞察） |
| controller | quickActionController | quickActionController | insightActionController |
| source | homepage_quick_action | ai_search_quick_action / ai_search_suggestion / ai_search_recent | insight_action |

---

## 6. 三者如何复用 Controller

```
首页快捷操作 ──→ quickActionController.handleQuickAction()
                          │
AI 搜索页 ──→ quickActionController.buildSearchUrl() 或 doSearch()
                          │
洞察推荐动作 ──→ insightActionController.handleInsightAction()
                          │
                          ↓
                  统一 source 规范
```

两者的 action controller 在 V1 保持独立，后续可合并为 `unifiedActionController`。

---

## 7. Source 来源规则

| source | 说明 |
|--------|------|
| `homepage_quick_action` | 首页快捷操作按钮 |
| `homepage_input` | 首页输入框 Enter / 发送 |
| `ai_search_quick_action` | AI 搜索页快捷操作 |
| `ai_search_suggestion` | AI 搜索页"试试"标签 / "大家都在搜" |
| `ai_search_recent` | AI 搜索页"近期搜索" |
| `insight_action` | 洞察详情页推荐动作 |
| `drawer_action` | Drawer 内其他操作 |

所有 source 已注册到 `EntrySource` 类型（`intentMap.ts`）。

---

## 8. V1 支持的快捷动作

| 类别 | 动作数 | 说明 |
|------|--------|------|
| search_autorun | 8 | 首页 4 + AI 搜索 4，全部跳转 `/ai-search?autoRun=1` |
| generated_content | 6 | 由 insightActionController 管理 |

---

## 9. 后续待扩展动作

| 动作 | actionType | 计划 |
|------|-----------|------|
| 加入练习篮 | add_to_basket | 交互闭环后续 |
| 打开面板 | open_panel | 交互闭环后续 |
| 布置确认 | assign | 已通过 GeneratedContent 间接支持 |

---

## 10. 涉及文件

### 新增
- `src/ai/actions/quickActionTypes.ts` — QuickAction 类型定义
- `src/ai/actions/quickActionMap.ts` — 快捷操作注册表（8 个动作）
- `src/ai/actions/quickActionController.ts` — 统一分发控制器
- `src/ai/actions/runQuickActionSelfCheck.ts` — 自检
- `docs/quick-action-unification.md` — 本文档

### 修改
- `src/pages/HomePage.tsx` — 快捷操作接入 handleQuickAction
- `src/pages/SearchPage.tsx` — 标签点击接入 source 追踪
- `src/ai/router/intentMap.ts` — EntrySource 新增 7 个 source 值

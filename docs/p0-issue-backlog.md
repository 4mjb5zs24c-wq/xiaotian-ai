# 小天AI助手 P0 问题池

> 版本: v1.0 | 日期: 2026-05-27
> 
> 所有发现的交互问题先登记到此文档，按优先级统一修复。
> 不要发现一个问题就随手改。

---

## 当前问题列表

| # | 问题描述 | 模块 | 复现路径 | 期望结果 | 当前结果 | 优先级 | 状态 | 修复文件 | 回归结果 |
|---|---------|------|---------|---------|---------|-------|------|---------|---------|
| P0-001 | 阅读理解曾错误推荐词汇听写 | 意图路由 | 搜索"来一篇阅读理解" | reading_practice | 曾进入 vocab_dictation | P0 | ✅ fixed | intentMap.ts, workflowRegistry.ts | 24/24 通过 |
| P0-002 | 练习情况曾错误进入词汇听写 | 意图路由 | 搜索"看一下练习情况" | learning_report_analysis | 曾进入 vocab_dictation | P0 | ✅ fixed | intentMap.ts, workflowRegistry.ts | 24/24 通过 |
| P0-003 | 预览按钮曾错误进入布置流程 | action路由 | 点击"预览素材"/"预览题目" | 打开 ResourcePreviewPanel | 曾进入 AssignmentConfirmPanel | P0 | ✅ fixed | AIAssistantDrawer.tsx (PrimaryButton) | 5/5 通过 |
| P0-004 | 首页小天模块和/ai-search曾使用不同逻辑 | 统一入口 | 首页搜索 vs /ai-search搜索 | 结果一致 | 曾使用不同管线 | P0 | ✅ fixed | HomePage.tsx, SearchPage.tsx, aiTaskController.ts | 14/14 通过 |
| P0-005 | 加入练习篮后入口不明显 | 练习篮 | 加入练习篮 | 看到数量badge+可点击查看 | 已实现 | P0 | ✅ fixed | AIAssistantDrawer.tsx, store/index.ts | — |
| P0-006 | 布置曾直接发布成功，缺少确认 | 布置确认 | 点击"布置给学生" | 进入 AssignmentConfirmPanel | 曾直接 publishAssignment | P0 | ✅ fixed | AIAssistantDrawer.tsx | — |
| P0-007 | 技术执行信息曾暴露给老师 | 信息隐藏 | 查看workflow结果 | 只显示教学相关内容 | 曾显示 Agent/Tool/Provider/step-id | P0 | ✅ fixed | AIAssistantDrawer.tsx (suggestions filter) | — |
| P0-008 | 顶部栏"小天AI"按钮行为与首页AI入口不一致 | 首页入口 | 首页AI模块→/ai-search vs 顶部栏→浮窗 | 统一行为 | 不一致 | P1 | ⚠️ pending | MainLayout.tsx | 待修复 |
| P0-009 | AIAssistantDrawer仍包含home/search完整视图 | 浮窗精简 | 打开浮窗 | 只承载预览/确认/详情 | 仍含home/search/workflow视图 | P1 | ⚠️ pending | AIAssistantDrawer.tsx | 待修复 |
| P0-010 | 练习篮去重后toast在浮窗底部定位 | 练习篮 | 加入练习篮 | toast显示在可视区域 | toast可能被遮挡 | P2 | ⚠️ need verify | AIAssistantDrawer.tsx | 待验证 |
| P0-011 | 练习篮去重后测试用例需重置状态 | 测试 | 运行 actionRoutingSelfCheck | 独立测试不互相影响 | 模块级basketItems需reset | P2 | ✅ fixed | actionRoutingSelfCheck.ts | 5/5 通过 |

---

## 优先级说明

- **P0**: 影响核心业务流程，必须修复
- **P1**: 影响用户体验一致性，建议修复
- **P2**: 边界情况或体验优化

## 状态说明

- **pending**: 待修复
- **fixed**: 已修复，待回归验证
- **need verify**: 已修复，需要人工验证
- **wontfix**: 经评估不修复

## 更新规则

1. 发现新问题 → 添加到列表末尾，状态标记为 pending
2. 修复问题 → 更新修复文件列，状态标记为 fixed
3. 回归验证 → 更新回归结果列，状态标记为 need verify 或关闭
4. 关闭问题 → 状态标记为 ✅ fixed，回归结果标记通过

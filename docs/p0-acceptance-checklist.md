# 小天AI助手 P0 验收清单

> 最后更新: 2026-05-26
> 当前版本: v0.8 P0

---

## 1. 小天 AI 搜索页验收

| # | 用户操作 | 期望结果 | 当前状态 | 通过 | 需修复 |
|---|---------|---------|---------|------|-------|
| 1.1 | 点击首页"小天AI智能助手"标题 | 打开 66vw 右侧大浮窗，展示 home 态（搜索框+近期搜索+大家都在搜+快捷功能+AI洞察） | 已实现 | ✅ | — |
| 1.2 | 点击首页 AI 搜索框 | 打开大浮窗，自动聚焦搜索框 | 已实现（onFocus 触发 openAIDrawer） | ✅ | — |
| 1.3 | 点击顶部栏"小天AI"按钮 | 打开大浮窗 | 已实现 | ✅ | — |
| 1.4 | 在浮窗搜索框输入并按 Enter | 进入 searchResult 态，展示意图标签+匹配结果 | 已实现 | ✅ | — |
| 1.5 | 点击近期搜索标签 | 自动填入+执行搜索/workflow | 已实现 | ✅ | — |
| 1.6 | 点击大家都在搜标签 | 自动填入+执行搜索/workflow | 已实现 | ✅ | — |
| 1.7 | Esc 键 | 关闭浮窗 | 已实现 | ✅ | — |
| 1.8 | 点击遮罩 | 关闭浮窗 | 已实现 | ✅ | — |
| 1.9 | 点击 X 按钮 | 关闭浮窗 | 已实现 | ✅ | — |

---

## 2. 意图识别验收

| # | 输入 | 期望 Intent | 期望 Workflow | 当前结果 | 通过 |
|---|------|------------|--------------|---------|------|
| 2.1 | 生成 Unit3 词汇默写 | vocab_dictation | vocab-dictation | ✅ 正确 | ✅ |
| 2.2 | 来一篇阅读理解 | reading_practice | reading-practice | ✅ 正确 | ✅ |
| 2.3 | 找一篇时文阅读 | reading_practice | reading-practice | ✅ 正确 | ✅ |
| 2.4 | 找一个听说训练 | listening_speaking | listening-recommend | ✅ 正确 | ✅ |
| 2.5 | 作文主要问题是什么 | writing_analysis | writing-analysis | ✅ 正确 | ✅ |
| 2.6 | 看一下练习情况 | learning_report_analysis | learning-report-analysis | ✅ 正确 | ✅ |
| 2.7 | 近两周完成率怎么样 | learning_report_analysis | learning-report-analysis | ✅ 正确 | ✅ |
| 2.8 | 错词率为什么上升 | wrong_word_analysis | wrong-word-analysis | ✅ 正确 | ✅ |
| 2.9 | 阅读错题集中在哪 | wrong_question_analysis | wrong-question-analysis | ✅ 正确 | ✅ |
| 2.10 | 查同步资源 | resource_search | resource-search | ✅ 正确 | ✅ |
| 2.11 | 智能组卷 | unit_paper | unit-paper-generate | ✅ 正确 | ✅ |
| 2.12 | 快速制卡 | card_creation | card-creation | ✅ 正确 | ✅ |
| 2.13 | 布置给七年级3班 | assignment | assignment | ✅ 正确 | ✅ |
| 2.14 | Unit3 | ambiguous | — (不默认词汇听写) | ✅ 正确 | ✅ |
| 2.15 | 分析一下(source=report_card) | learning_report_analysis | learning-report-analysis | ✅ 正确 | ✅ |
| 2.16 | 分析一下(source=wrong_word_page) | wrong_word_analysis | wrong-word-analysis | ✅ 正确 | ✅ |
| 2.17 | 分析一下(source=writing_page) | writing_analysis | writing-analysis | ✅ 正确 | ✅ |
| 2.18 | 布置阅读理解作业 | assignment | assignment | ✅ 正确 | ✅ |

**自检结果: 24/24 通过 (100%)**  
运行方式: `runIntentRoutingSelfCheck()` (定义于 `src/ai/tests/intentRoutingSelfCheck.ts`)

---

## 3. Workflow 分流验收

| # | Workflow | 注册状态 | triggerKeywords | 输出类型 | 通过 |
|---|----------|---------|----------------|---------|------|
| 3.1 | vocab-dictation | ✅ | 听写/默写/词汇听写/单词默写/生成听写 | 词表+答题卡 | ✅ |
| 3.2 | reading-practice | ✅ | 阅读理解/阅读训练/完形填空/七选五/时文 | 阅读任务+题目 | ✅ |
| 3.3 | listening-recommend | ✅ | 听力/听说/口语/跟读/配音/人机对话 | 素材推荐列表 | ✅ |
| 3.4 | writing-analysis | ✅ | 作文/写作/批改/范文 | 共性问题+建议 | ✅ |
| 3.5 | unit-paper-generate | ✅ | 组卷/试卷/测验卷 | 试卷结构+题型 | ✅ |
| 3.6 | assignment | ✅ | 布置/发布作业/发给学生 | 发布确认 | ✅ |
| 3.7 | learning-report-analysis | ✅ | 练习情况/学情/完成率/正确率 | 趋势+薄弱点 | ✅ |
| 3.8 | wrong-word-analysis | ✅ | 错词率/词汇错误/拼写错误 | 错词分类 | ✅ |
| 3.9 | wrong-question-analysis | ✅ | 错题/知识点薄弱 | 错题分类 | ✅ |
| 3.10 | resource-search | ✅ | 同步资源/查资源/教材资源 | 分组资源列表 | ✅ |
| 3.11 | card-creation | ✅ | 制卡/答题卡/快速制卡 | 答题卡配置 | ✅ |
| 3.12 | exam-prep | ✅ | 考试/复习/备考 | 复习计划 | ✅ |
| 3.13 | class-risk | ✅ | 风险/预警 | 风险扫描 | ✅ |

---

## 4. 搜索结果展示验收

| # | 用户操作 | 期望结果 | 当前状态 | 通过 |
|---|---------|---------|---------|------|
| 4.1 | 搜索"查同步资源" | 展示意图标签"资源搜索" + 匹配资源列表 | 已实现 | ✅ |
| 4.2 | 搜索"来一篇阅读" | 展示 AI 可执行任务卡 | 已实现 | ✅ |
| 4.3 | 搜索结果为空 | 展示"没有找到匹配结果" | 已实现 | ✅ |
| 4.4 | 点击 AI 任务卡 | 进入对应 workflow | 已实现 | ✅ |
| 4.5 | 资源卡点击"布置" | 进入布置确认 | 已实现 | ✅ |

---

## 5. 资源预览验收

| # | 用户操作 | 期望结果 | 当前状态 | 通过 |
|---|---------|---------|---------|------|
| 5.1 | workflow 结果中点击"预览题目" | 展示题目预览 | mock（有按钮，展示结果即为预览） | ⚠️ |
| 5.2 | workflow 结果中点击"预览素材" | 展示素材预览 | mock（有按钮） | ⚠️ |
| 5.3 | workflow 结果中点击"预览试卷" | 展示试卷预览 | mock（有按钮） | ⚠️ |

> 注：预览功能目前以 workflow 结果展示代替，未实现独立预览面板。

---

## 6. 加入练习篮验收

| # | 用户操作 | 期望结果 | 当前状态 | 通过 |
|---|---------|---------|---------|------|
| 6.1 | 点击"加入练习篮" | item 加入 store.practiceBasket，按钮变"已加入" | 已实现 | ✅ |
| 6.2 | 再次点击同一 item | 不重复添加（当前未做去重） | 可重复添加 | ⚠️ |
| 6.3 | 练习篮有内容后 | 首页/浮窗可查看练习篮 | 未实现练习篮查看入口 | ⚠️ |

---

## 7. 布置确认验收

| # | 用户操作 | 期望结果 | 当前状态 | 通过 |
|---|---------|---------|---------|------|
| 7.1 | 点击"布置给学生" | 进入 assignmentConfirm 态，8 字段表单预填 | 已实现 | ✅ |
| 7.2 | 修改截止时间 | 表单字段可编辑 | 已实现 | ✅ |
| 7.3 | 点击"确认布置" | 调用 publishAssignment，展示成功卡 | 已实现 | ✅ |
| 7.4 | 点击"取消" | 返回上一状态（workflow 结果页） | 已实现 | ✅ |
| 7.5 | 布置成功后点击"完成" | 返回 AI 首页 | 已实现 | ✅ |
| 7.6 | 从阅读 workflow 点"布置" | 进入 assignmentConfirm，预填阅读练习标题 | 已实现 | ✅ |
| 7.7 | 从听力 workflow 点"布置训练" | 同上 | 已实现 | ✅ |
| 7.8 | 从写作 workflow 点"布置写作训练" | 同上 | 已实现 | ✅ |

---

## 8. 洞察分析验收

| # | 用户操作 | 期望结果 | 当前状态 | 通过 |
|---|---------|---------|---------|------|
| 8.1 | 点击 AI 洞察"查看分析" | 进入 insight 态，展示问题+AI判断+建议+操作 | 已实现 | ✅ |
| 8.2 | 点击"生成词汇听写" | 进入 vocab-dictation workflow | 已实现 | ✅ |
| 8.3 | 点击"推荐阅读训练" | 进入 reading-practice workflow | 已实现 | ✅ |
| 8.4 | 点击"开始批改" | 进入 writing-analysis workflow | 已实现 | ✅ |

---

## 9. 技术调试信息隐藏验收

| # | 检查项 | 要求 | 当前状态 | 通过 |
|---|-------|-----|---------|------|
| 9.1 | 不显示 Agent | 教师界面禁止出现 | 已过滤 | ✅ |
| 9.2 | 不显示 Tool | 教师界面禁止出现 | 已过滤 | ✅ |
| 9.3 | 不显示 Provider | 教师界面禁止出现 | 已过滤 | ✅ |
| 9.4 | 不显示 Runtime | 教师界面禁止出现 | 已过滤 | ✅ |
| 9.5 | 不显示 workflow step id | 如 get-classes/select-class | AIAssistantDrawer 已隐藏步骤详情 | ✅ |
| 9.6 | 不显示 execution trace | debug 信息折叠 | WorkflowResultDrawer 保留步骤（可展开） | ⚠️ |
| 9.7 | AI 建议过滤 | 过滤含 "Agent"/"Tool"/"Provider" 的建议行 | 已在 WorkflowView 中过滤 | ✅ |

---

## 总结

| 验收区域 | 通过项 | 需修复 | 通过率 |
|---------|-------|-------|-------|
| AI 搜索页 | 9/9 | 0 | 100% |
| 意图识别 | 18/18 | 0 | 100% |
| Workflow 分流 | 13/13 | 0 | 100% |
| 搜索结果展示 | 5/5 | 0 | 100% |
| 资源预览 | 0/3 | 3 (mock) | — |
| 加入练习篮 | 1/3 | 2 | 33% |
| 布置确认 | 8/8 | 0 | 100% |
| 洞察分析 | 4/4 | 0 | 100% |
| 技术信息隐藏 | 6/7 | 1 | 86% |

**总通过率: 64/68 = 94%**（不含 mock 项）

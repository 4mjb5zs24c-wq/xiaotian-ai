# 小天 AI 洞察推荐动作库

> 版本: v1.0 | 日期: 2026-05-27
> 用途: 洞察卡片按钮与 workflow 对接
> 原则: 所有发布/布置类动作必须老师确认

---

## 动作字段说明

每个动作记录以下字段：

| 字段 | 说明 |
|------|------|
| actionId | 唯一标识 |
| label | 老师端展示名称 |
| description | 简要说明 |
| applicableScenes | 适用场景 |
| triggerCondition | 触发条件 |
| workflowId | 对应 workflow |
| needsConfirmation | 是否需要老师确认 |
| directExecution | 是否可直接执行（无需进 workflow） |
| needsRealAPI | 是否需要接真实接口 |

---

## 1. 词汇类动作

### vocab_dictation
| 字段 | 值 |
|------|-----|
| actionId | `vocab_dictation` |
| label | 生成词汇听写 |
| description | 根据当前单元或错词列表生成听写练习，支持中译英/英译中/混合/听音拼写 |
| applicableScenes | 拼写错误率高、课标词掌握不牢、多音节词错误集中 |
| triggerCondition | 课标词错误率 >= 30% |
| workflowId | `vocab-dictation` |
| needsConfirmation | 是（布置前确认） |
| directExecution | 否 |
| needsRealAPI | 否（当前 mock） |

### vocab_dictation_cn_to_en
| 字段 | 值 |
|------|-----|
| actionId | `vocab_dictation_cn_to_en` |
| label | 生成单词默写 |
| description | 看中文写英文，适合检测拼写掌握情况 |
| applicableScenes | 拼写错误为主 |
| workflowId | `vocab-dictation`（mode=cn_to_en） |
| needsConfirmation | 是 |

### vocab_meaning_choice_en_to_cn
| 字段 | 值 |
|------|-----|
| actionId | `vocab_meaning_choice_en_to_cn` |
| label | 看英选中 |
| description | 看英文单词选择正确的中文释义 |
| applicableScenes | 词义识别问题、词义混淆 |
| workflowId | `vocab-dictation`（mode=en_to_cn） |
| needsConfirmation | 否 |

### vocab_meaning_choice_cn_to_en
| 字段 | 值 |
|------|-----|
| actionId | `vocab_meaning_choice_cn_to_en` |
| label | 看中选英 |
| description | 看中文释义选择正确的英文单词 |
| applicableScenes | 词义匹配问题 |
| workflowId | `vocab-dictation`（mode=cn_to_en） |
| needsConfirmation | 否 |

### vocab_pk
| 字段 | 值 |
|------|-----|
| actionId | `vocab_pk` |
| label | 生成词汇PK |
| description | 课堂词汇竞赛，支持词句/拼写/语用模式 |
| applicableScenes | 词汇巩固、课堂趣味练习 |
| workflowId | 待创建 |
| needsConfirmation | 否 |

### vocab_usage_practice
| 字段 | 值 |
|------|-----|
| actionId | `vocab_usage_practice` |
| label | 生成语用训练 |
| description | 错词生成语篇挖空练习，训练词汇在语境中的实际运用 |
| applicableScenes | 不会用、固定搭配错误、词性混淆 |
| workflowId | 待创建 |
| needsConfirmation | 是（布置前确认） |

### vocab_reading_aloud
| 字段 | 值 |
|------|-----|
| actionId | `vocab_reading_aloud` |
| label | 错词生成语篇朗读 |
| description | 将错词嵌入短文/语篇中进行朗读训练 |
| applicableScenes | 不会读、读音混淆 |
| workflowId | 待创建 |
| needsConfirmation | 否 |

### wrong_word_repractice
| 字段 | 值 |
|------|-----|
| actionId | `wrong_word_repractice` |
| label | 错词重做 |
| description | 将高频错词重新生成练习 |
| applicableScenes | 高频错词、课标词错误率高 |
| workflowId | `vocab-dictation`（focus=error_words） |
| needsConfirmation | 是（布置前确认） |

### wrong_word_paper
| 字段 | 值 |
|------|-----|
| actionId | `wrong_word_paper` |
| label | 错词组卷练习 |
| description | 将错词整合到一张练习卷中 |
| applicableScenes | 阶段复习、错词集中 |
| workflowId | `unit-paper-generate`（scope=error_words） |
| needsConfirmation | 是（布置前确认） |

### view_wrong_word_students
| 字段 | 值 |
|------|-----|
| actionId | `view_wrong_word_students` |
| label | 查看错词学生 |
| description | 查看每个错词对应的学生名单 |
| applicableScenes | 需要了解个体学生错词情况 |
| workflowId | 无（打开学生列表） |
| needsConfirmation | 否 |
| directExecution | 是 |

---

## 2. 练习报告类动作

| actionId | label | description | workflowId | needsConfirmation |
|----------|-------|-------------|-----------|:--:|
| `view_report` | 查看练习报告 | 查看完整练习数据和分析 | 无（导航到报告页） | 否 |
| `remind_unfinished` | 一键催促 | 提醒未完成学生提交练习 | 无（调用通知接口） | 是 |
| `generate_similar_questions` | 生成同类题 | 根据薄弱题型生成同类题目 | `reading-practice` / `unit-paper-generate` | 是 |
| `wrong_question_repractice` | 错题重练 | 将错题重新生成练习 | `wrong-question-analysis` | 是 |
| `assign_reinforcement` | 布置强化练习 | 针对薄弱知识点布置专项练习 | `assignment`（pre-filled） | 是 |
| `view_risk_students` | 查看待提升学生 | 查看得分率 < 60% 的学生名单 | 无（打开学生列表） | 否 |
| `layered_assignment` | 分层布置 | 按高分段/中间段/待提升段布置不同难度练习 | `assignment`（pre-filled） | 是 |

---

## 3. 错题类动作

| actionId | label | description | workflowId | needsConfirmation |
|----------|-------|-------------|-----------|:--:|
| `generate_special_practice` | 生成专项练习 | 针对某个题型或知识点生成专项练习 | `wrong-question-analysis` | 是 |
| `generate_same_type_questions` | 生成同类题训练 | 针对错题的同题型/同知识点练习 | `reading-practice` / `unit-paper-generate` | 是 |
| `generate_quiz` | 生成小测 | 基于错题生成检测小测 | `unit-paper-generate` | 是 |
| `view_frequent_wrong` | 查看高频错题 | 查看错误率最高的题目 | 无（打开错题列表） | 否 |
| `recommend_teaching_order` | 推荐讲解顺序 | 按错误率从高到低排列讲解优先顺序 | 无（展示排序结果） | 否 |

---

## 4. 写作类动作

| actionId | label | description | workflowId | needsConfirmation |
|----------|-------|-------------|-----------|:--:|
| `writing_review` | 生成作文讲评 | 基于班级共性问题生成讲评内容 | `writing-analysis` | 否 |
| `recommend_model_essay` | 推荐范文 | 推荐班级或个人优秀作文作为范文 | 无（展示范文） | 否 |
| `sentence_upgrade` | 生成句型升级训练 | 包含仿写的高级句型训练 | 待创建 | 是 |
| `imitation_writing` | 仿写训练 | 基于范文的仿写练习 | 待创建 | 是 |
| `conjunction_practice` | 生成连接词专项 | 针对缺少连接词的问题 | 待创建 | 是 |
| `tense_practice` | 生成时态专项 | 针对时态错误集中的问题 | 待创建 | 是 |
| `writing_revision` | 布置二次修改 | 让学生根据批改意见修改作文 | `assignment`（pre-filled） | 是 |
| `same_topic_rewrite` | 生成同主题再写 | 同一主题重新写作以检验进步 | `assignment`（pre-filled） | 是 |

---

## 5. 听力/听说类动作

| actionId | label | description | workflowId | needsConfirmation |
|----------|-------|-------------|-----------|:--:|
| `listening_special` | 推荐听力专项 | 推荐听力专项训练素材 | `listening-recommend` | 是（布置前确认） |
| `listening_mock` | 推荐听力模拟 | 推荐听力模拟考试练习 | `listening-recommend`（mode=mock） | 是 |
| `speaking_special` | 推荐听说专项 | 推荐听说专项训练素材 | `listening-recommend`（mode=speaking） | 是 |
| `speaking_mock` | 推荐听说模拟 | 推荐听说模拟考试练习 | `listening-recommend`（mode=mock） | 是 |
| `shadowing_practice` | 推荐跟读训练 | 基础语音语调训练 | `listening-recommend`（mode=shadowing） | 否 |
| `dubbing_practice` | 推荐配音 | 趣味配音拓展练习 | `listening-recommend`（mode=dubbing） | 否 |

---

## 6. 考前训练类动作

| actionId | label | description | workflowId | needsConfirmation |
|----------|-------|-------------|-----------|:--:|
| `exam_mock` | 推荐模拟卷 | 推荐适合当前备考阶段的模拟试卷 | `unit-paper-generate` | 是 |
| `exam_sprint` | 推荐冲刺训练 | 考前冲刺专项训练 | `unit-paper-generate` | 是 |
| `exam_special_review` | 推荐专项复习 | 按薄弱题型推荐复习内容 | `unit-paper-generate` | 是 |
| `stage_review` | 阶段复习建议 | 基于当前教学进度的复习计划 | 无（展示建议） | 否 |

---

## 7. 资源推荐类动作

| actionId | label | description | workflowId | needsConfirmation |
|----------|-------|-------------|-----------|:--:|
| `preview_resource` | 预览资源 | 打开资源预览面板 | 无（打开 ResourcePreviewPanel） | 否 |
| `add_to_basket` | 加入练习篮 | 加入练习篮待后续布置 | 无（store.addToBasket） | 否 |
| `assign_resource` | 布置给学生 | 进入布置确认流程 | `assignment`（pre-filled） | 是 |
| `search_related` | 查找相关资源 | 搜索同类型或同话题资源 | 无（跳转 /ai-search?query=） | 否 |

---

## 动作实现状态

| 动作 | 状态 |
|------|------|
| vocab_dictation | ✅ 已实现 |
| vocab_meaning_choice_en_to_cn | ⚠️ 复用 vocab-dictation（mode=en_to_cn） |
| vocab_meaning_choice_cn_to_en | ⚠️ 复用 vocab-dictation（mode=cn_to_en） |
| vocab_pk | ❌ 待创建 workflow |
| vocab_usage_practice | ❌ 待创建 workflow |
| vocab_reading_aloud | ❌ 待创建 workflow |
| wrong_word_repractice | ⚠️ 复用 vocab-dictation |
| wrong_word_paper | ⚠️ 复用 unit-paper-generate |
| 练习报告类 | ⚠️ 部分已实现 |
| 错题类 | ⚠️ 部分已实现 |
| 写作类 | ⚠️ 部分已实现 |
| 听力/听说类 | ✅ 已实现 |
| 考前训练类 | ⚠️ 复用 unit-paper-generate |
| 资源推荐类 | ✅ 已实现 |

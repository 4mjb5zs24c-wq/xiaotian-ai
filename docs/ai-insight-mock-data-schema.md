# AI 洞察 Mock 数据结构定义

> 版本: v1.0 | 日期: 2026-05-27
> 用途: V1 开发阶段 mock 数据参考
> 状态: 设计稿，待开发时使用

---

## 通用洞察对象

```typescript
interface Insight {
  insightId: string
  module: InsightModule
  title: string
  riskLevel: 'high' | 'medium' | 'low'
  scope: {
    className: string
    unit?: string
    questionType?: string
    studentRange?: string
    period?: string
  }
  evidence: {
    summary: string
    details: InsightEvidenceItem[]
  }
  analysis: string
  suggestion: string
  actions: InsightAction[]
  sourceData: Record<string, unknown>
  createdAt: string
  priority: number
  status: 'active' | 'dismissed' | 'expired'
  // ── V1 新增字段 ──
  sampleInfo: {
    totalStudents: number
    sampleCount: number
    sampleRatio: number
    isSampleTooSmall: boolean
  }
  examInfo?: {
    examDate: string
    examType: string
    daysToExam: number
    isExamWithin30Days: boolean
  }
}

// 写作洞察专用 — 系统写作模型输出
interface WritingModelOutput {
  totalScore: number
  dimensionScores: {
    content: number
    language: number
    structure: number
    format: number
    highlights: number
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

type InsightModule =
  | 'home_wrong_word'
  | 'home_listening_speaking'
  | 'home_writing'
  | 'exam_reminder'
  | 'practice_report'
  | 'wrong_word_book'
  | 'writing_review'

interface InsightEvidenceItem {
  label: string
  value: string
  trend?: 'up' | 'down' | 'stable'
  threshold?: string
}

interface InsightAction {
  actionId: string
  label: string
  type: 'navigate' | 'workflow' | 'panel' | 'alert'
  target: string
  params?: Record<string, string>
}
```

---

## 1. 首页错词洞察

```json
{
  "insightId": "home-wrong-word-001",
  "module": "home_wrong_word",
  "title": "Unit3 课标词错误率较高",
  "riskLevel": "high",
  "scope": {
    "className": "七年级(3)班",
    "unit": "Unit 3 — Food and Drinks",
    "period": "近两周"
  },
  "evidence": {
    "summary": "5个课标词错误率超过30%，其中长难词错误更集中",
    "details": [
      { "label": "restaurant", "value": "错误率 55%", "trend": "up", "threshold": ">=30%" },
      { "label": "Wednesday", "value": "错误率 48%", "trend": "up", "threshold": ">=30%" },
      { "label": "delicious", "value": "错误率 42%", "trend": "stable", "threshold": ">=30%" },
      { "label": "favorite", "value": "错误率 38%", "trend": "up", "threshold": ">=30%" },
      { "label": "healthy", "value": "错误率 33%", "trend": "stable", "threshold": ">=30%" }
    ]
  },
  "analysis": "学生对多音节词和含有不发音字母的词汇掌握不牢固。restaurant和Wednesday均为长难词，拼写规则与发音不完全对应，学生容易出现字母遗漏或顺序错误。",
  "suggestion": "建议安排一次Unit3重点词汇听写，聚焦以上5个高频错词。可先用'听音拼写'模式检测拼写，再用'中译英'模式巩固。",
  "actions": [
    { "actionId": "vocab_dictation", "label": "生成词汇听写", "type": "navigate", "target": "/ai-search", "params": { "query": "生成 Unit3 词汇默写", "autoRun": "1" } },
    { "actionId": "view_wrong_word_students", "label": "查看错词学生", "type": "panel", "target": "insightDetail" },
    { "actionId": "wrong_word_repractice", "label": "错词重练", "type": "navigate", "target": "/ai-search", "params": { "query": "Unit3 高频错词重练", "autoRun": "1" } }
  ],
  "sourceData": {
    "wrongWords": ["restaurant", "Wednesday", "delicious", "favorite", "healthy"],
    "errorRates": [55, 48, 42, 38, 33],
    "errorTypes": { "拼写错误": 62, "读音混淆": 20, "语用错误": 18 },
    "curriculumWords": 5,
    "multiSyllableRatio": 0.8
  },
  "sampleInfo": {
    "totalStudents": 42,
    "sampleCount": 40,
    "sampleRatio": 0.95,
    "isSampleTooSmall": false
  },
  "createdAt": "2026-05-27T08:00:00Z",
  "priority": 1,
  "status": "active"
}
```

---

## 2. 首页听力/听说洞察

```json
{
  "insightId": "home-listening-001",
  "module": "home_listening_speaking",
  "title": "听力得分率较前两周下降",
  "riskLevel": "medium",
  "scope": {
    "className": "七年级(3)班",
    "questionType": "听力选择",
    "period": "近两周 vs 前两周"
  },
  "evidence": {
    "summary": "听力得分率由78%降至66%，相对下降12%，数字信息题和独白理解题失分较多",
    "details": [
      { "label": "听力总分得分率", "value": "66%", "trend": "down", "threshold": "<60%为高风险" },
      { "label": "前两周得分率", "value": "78%", "trend": "stable" },
      { "label": "数字信息题", "value": "得分率 58%", "trend": "down" },
      { "label": "独白理解题", "value": "得分率 62%", "trend": "down" }
    ]
  },
  "analysis": "数字信息题和独白理解题得分率偏低，说明学生在快速听辨数字、价格、时间等信息方面需要加强。当前得分率66%尚未低于60%，属于需要关注但非紧急。",
  "suggestion": "建议每周安排1-2次听力专项训练，重点练习数字信息题和独白理解。当前地区为广东，中考考听说，如果老师平时以听说训练为主，推荐听说专项。",
  "actions": [
    { "actionId": "listening_special", "label": "推荐听力专项", "type": "navigate", "target": "/ai-search", "params": { "query": "听力训练", "autoRun": "1" } },
    { "actionId": "speaking_special", "label": "推荐听说专项", "type": "navigate", "target": "/ai-search", "params": { "query": "听说训练", "autoRun": "1" } }
  ],
  "sourceData": {
    "currentScore": 66,
    "previousScore": 78,
    "relativeDrop": 12,
    "regionConfig": { "testsSpeaking": true, "testsListening": false },
    "teacherPracticeHistory": ["听说模拟", "跟读训练"]
  },
  "createdAt": "2026-05-27T08:00:00Z",
  "priority": 2,
  "status": "active"
}
```

---

## 3. 首页写作洞察

```json
{
  "insightId": "home-writing-001",
  "module": "home_writing",
  "title": "6篇作文待批改超过24小时",
  "riskLevel": "medium",
  "scope": {
    "className": "七年级(3)班",
    "unit": "Unit 3 — My Favorite Food",
    "period": "5月25日起"
  },
  "evidence": {
    "summary": "Unit3单元作文共42篇提交，其中6篇待批改已超24小时。班级均分71.5分。",
    "details": [
      { "label": "提交总数", "value": "42篇" },
      { "label": "待批改", "value": "6篇（超24小时）" },
      { "label": "班级均分", "value": "71.5分" },
      { "label": "待提升学生", "value": "李华(55分)、赵明(52分)" }
    ]
  },
  "analysis": "作文批改积压影响学生反馈及时性。李华和赵明得分低于60分，需要重点关注。建议优先批改这两位学生的作文，其余可使用AI辅助批改加速。",
  "suggestion": "建议先处理重点学生作文，再利用AI批改加速处理剩余作文。批改完成后可生成班级讲评内容。",
  "actions": [
    { "actionId": "writing_review", "label": "生成作文讲评", "type": "navigate", "target": "/ai-search", "params": { "query": "作文主要问题是什么", "autoRun": "1" } },
    { "actionId": "recommend_model_essay", "label": "推荐范文", "type": "panel", "target": "insightDetail" },
    { "actionId": "writing_revision", "label": "布置二次修改", "type": "panel", "target": "assignmentConfirm" }
  ],
  "sourceData": {
    "totalEssays": 42,
    "pendingEssays": 6,
    "pendingOver24h": 6,
    "avgScore": 71.5,
    "riskStudents": ["李华", "赵明"],
    "riskScores": [55, 52],
    "topErrors": [
      { "type": "时态混用", "count": 18 },
      { "type": "名词单复数", "count": 12 }
    ]
  },
  "createdAt": "2026-05-27T08:00:00Z",
  "priority": 3,
  "status": "active"
}
```

---

## 4. 考前训练提醒

```json
{
  "insightId": "exam-reminder-001",
  "module": "exam_reminder",
  "title": "距期末考试还有30天",
  "riskLevel": "medium",
  "scope": {
    "className": "七年级(3)班",
    "period": "考前一个月"
  },
  "evidence": {
    "summary": "期末考试将于2026年6月26日进行。当前班级词汇得分率72%，阅读得分率68%，听力得分率66%。",
    "details": [
      { "label": "考试日期", "value": "2026-06-26" },
      { "label": "剩余天数", "value": "30天" },
      { "label": "词汇得分率", "value": "72%" },
      { "label": "阅读得分率", "value": "68%" },
      { "label": "听力得分率", "value": "66%" },
      { "label": "已练习模拟卷", "value": "0套" }
    ]
  },
  "analysis": "考前一个月是系统复习的关键时期。当前阅读和听力得分率低于70%，建议在复习计划中重点安排。尚未练习过模拟卷，建议开始每周1套模拟卷训练。",
  "suggestion": "建议制定4周复习计划：第1周词汇+语法，第2周阅读+完形，第3周听力+写作，第4周综合模拟。",
  "actions": [
    { "actionId": "exam_mock", "label": "推荐模拟卷", "type": "navigate", "target": "/ai-search", "params": { "query": "期末模拟卷", "autoRun": "1" } },
    { "actionId": "exam_special_review", "label": "推荐专项复习", "type": "navigate", "target": "/ai-search", "params": { "query": "期末专项复习", "autoRun": "1" } }
  ],
  "sourceData": {
    "examDate": "2026-06-26",
    "examType": "期末考试",
    "daysRemaining": 30,
    "mockTestsCompleted": 0
  },
  "createdAt": "2026-05-27T08:00:00Z",
  "priority": 0,
  "status": "active"
}
```

---

## 5. 练习报告洞察

```json
{
  "insightId": "practice-report-001",
  "module": "practice_report",
  "title": "本次练习得分率72%，较前两周下降10%",
  "riskLevel": "medium",
  "scope": {
    "className": "七年级(3)班",
    "questionType": "词汇拼写",
    "period": "2026-05-25"
  },
  "evidence": {
    "summary": "本次个性化词汇练习得分率72%，较近两周平均82%下降10%。词汇拼写题型得分率58%，为最薄弱题型。",
    "details": [
      { "label": "本次得分率", "value": "72%", "trend": "down" },
      { "label": "近两周平均", "value": "82%", "trend": "stable" },
      { "label": "词汇拼写", "value": "58%", "trend": "down" },
      { "label": "词汇选择", "value": "85%", "trend": "stable" },
      { "label": "高分段(>=85%)", "value": "8人" },
      { "label": "待提升段(<60%)", "value": "6人" },
      { "label": "空题率", "value": "5%", "trend": "up" }
    ]
  },
  "analysis": "得分率下降主要来自词汇拼写题型。部分学生可能在拼写规则上掌握不牢。高分段和待提升段差距明显（8人 vs 6人），存在一定分层。空题率5%略高，可能个别学生不会做。",
  "suggestion": "建议对词汇拼写题型进行课堂讲解，重点分析高频错词的拼写规律。对待提升段的6名学生可布置针对性补练。",
  "actions": [
    { "actionId": "view_report", "label": "查看练习报告", "type": "navigate", "target": "/reports" },
    { "actionId": "generate_similar_questions", "label": "生成同类题", "type": "navigate", "target": "/ai-search", "params": { "query": "词汇拼写练习", "autoRun": "1" } },
    { "actionId": "wrong_question_repractice", "label": "错题重练", "type": "navigate", "target": "/ai-search", "params": { "query": "错题重练", "autoRun": "1" } }
  ],
  "sourceData": {
    "currentScore": 72,
    "previousAvg": 82,
    "relativeDrop": 10,
    "questionTypeScores": { "词汇拼写": 58, "词汇选择": 85 },
    "stratification": { "high": 8, "mid": 28, "low": 6 },
    "emptyRate": 5,
    "avgTime": "8分钟",
    "expectedTime": "10分钟"
  },
  "createdAt": "2026-05-27T08:00:00Z",
  "priority": 2,
  "status": "active"
}
```

---

## 6. 错词本洞察

```json
{
  "insightId": "wrong-word-book-001",
  "module": "wrong_word_book",
  "title": "Unit3 共15个课标词，5个错误率超过30%",
  "riskLevel": "high",
  "scope": {
    "className": "七年级(3)班",
    "unit": "Unit 3 — Food and Drinks",
    "period": "近两周"
  },
  "evidence": {
    "summary": "Unit3 课标词共15个，其中5个错误率超过30%。拼写错误占62%，为主要错误类型。错误集中在多音节词和含不发音字母的词。",
    "details": [
      { "label": "课标词总数", "value": "15个" },
      { "label": "错误率>=30%", "value": "5个" },
      { "label": "拼写错误占比", "value": "62%" },
      { "label": "读音混淆占比", "value": "20%" },
      { "label": "语用错误占比", "value": "18%" },
      { "label": "多音节词比例", "value": "80%" }
    ]
  },
  "analysis": "错误集中在多音节词和含不发音字母的词（restaurant、Wednesday），说明学生对这类词汇的拼写规则掌握不牢。拼写错误占主导，建议侧重拼写训练。",
  "suggestion": "建议对这些错词进行分类训练：拼写错误用'听音拼写'模式，读音混淆用'跟读训练'，语用错误用'语境填空'。",
  "actions": [
    { "actionId": "vocab_dictation", "label": "生成词汇听写", "type": "navigate", "target": "/ai-search", "params": { "query": "生成 Unit3 词汇默写", "autoRun": "1" } },
    { "actionId": "vocab_usage_practice", "label": "生成语用训练", "type": "navigate", "target": "/ai-search", "params": { "query": "Unit3 语用训练", "autoRun": "1" } },
    { "actionId": "wrong_word_paper", "label": "错词组卷练习", "type": "navigate", "target": "/ai-search", "params": { "query": "Unit3 错词组卷", "autoRun": "1" } }
  ],
  "sourceData": {
    "totalCurriculumWords": 15,
    "highErrorWords": 5,
    "errorTypeDistribution": { "拼写": 62, "读音": 20, "语用": 18 },
    "topErrorWords": [
      { "word": "restaurant", "rate": 55, "type": "拼写错误", "commonMistake": "resturant" },
      { "word": "Wednesday", "rate": 48, "type": "拼写错误", "commonMistake": "Wensday" },
      { "word": "delicious", "rate": 42, "type": "拼写错误", "commonMistake": "delisious" },
      { "word": "favorite", "rate": 38, "type": "拼写错误", "commonMistake": "favourite" },
      { "word": "healthy", "rate": 33, "type": "读音混淆", "commonMistake": "helthy" }
    ]
  },
  "createdAt": "2026-05-27T08:00:00Z",
  "priority": 1,
  "status": "active"
}
```

---

## 7. 写作批改洞察（使用系统写作模型输出）

```json
{
  "insightId": "writing-review-001",
  "module": "writing_review",
  "title": "\"My Favorite Food\" 班级均分71.5，时态混用为最大共性问题",
  "riskLevel": "medium",
  "scope": {
    "className": "七年级(3)班",
    "unit": "Unit 3 — My Favorite Food",
    "questionType": "命题作文"
  },
  "evidence": {
    "summary": "42篇作文提交，均分71.5分。时态混用18次为最大共性问题，名词单复数12次次之。优秀作文3篇，待提升9篇。",
    "details": [
      { "label": "提交人数", "value": "42人" },
      { "label": "平均得分", "value": "71.5分" },
      { "label": "时态混用", "value": "18次（43%学生）" },
      { "label": "名词单复数", "value": "12次（29%学生）" },
      { "label": "中式英语", "value": "7次（17%学生）" },
      { "label": "优秀作文(>=85%)", "value": "3篇" },
      { "label": "待提升(<60%)", "value": "9篇" }
    ]
  },
  "analysis": "时态混用（一般现在时 vs 一般过去时）是班级最集中的问题，建议作为讲评重点。名词单复数错误主要体现在不可数名词加s。中式英语集中在赵明的作文中。",
  "suggestion": "讲评建议：1) 10分钟时态对比讲解；2) 展示优秀范文（王小红14分）；3) 不可数名词专项提醒。建议所有学生进行二次修改。",
  "actions": [
    { "actionId": "writing_review", "label": "生成作文讲评", "type": "navigate", "target": "/ai-search", "params": { "query": "作文主要问题是什么", "autoRun": "1" } },
    { "actionId": "recommend_model_essay", "label": "推荐范文", "type": "panel", "target": "insightDetail" },
    { "actionId": "writing_revision", "label": "布置二次修改", "type": "panel", "target": "assignmentConfirm" },
    { "actionId": "tense_practice", "label": "生成时态专项", "type": "navigate", "target": "/ai-search", "params": { "query": "时态专项练习", "autoRun": "1" } }
  ],
  "writingModelOutput": {
    "totalScore": 71.5,
    "dimensionScores": { "content": 78, "language": 68, "structure": 72, "format": 85, "highlights": 55 },
    "contentDiagnosis": "大部分学生能覆盖题目要点，但部分学生在描述'为什么喜欢'时内容不够具体。个别学生偏题。",
    "languageDiagnosis": "时态混用为最大问题（一般现在时 vs 一般过去时），名词单复数和介词搭配错误也较集中。",
    "structureDiagnosis": "整体结构完整，但部分作文段落衔接不够自然，缺少过渡词。",
    "commonErrors": [
      { "type": "时态混用", "count": 18, "students": ["李华", "张小明", "陈雪", "赵明"] },
      { "type": "名词单复数", "count": 12, "students": ["李华", "王小红", "张小明"] },
      { "type": "中式英语", "count": 7, "students": ["赵明"] },
      { "type": "连接词缺失", "count": 9, "students": ["张小明", "陈雪"] }
    ],
    "highlights": ["王小红使用定语从句恰当", "张小明内容生动有趣"],
    "modelEssayRecommendations": [
      { "student": "王小红", "score": 88, "highlight": "语言准确，结构完整，使用了定语从句和过渡词" },
      { "student": "陈雪", "score": 82, "highlight": "内容丰富，描述具体" }
    ],
    "revisionSuggestions": [
      "重点修改时态错误",
      "检查不可数名词用法",
      "增加2-3个过渡词（如 however, in addition）",
      "尝试使用1-2个定语从句"
    ]
  },
  "sampleInfo": {
    "totalStudents": 42,
    "sampleCount": 42,
    "sampleRatio": 1.0,
    "isSampleTooSmall": false
  },
  "sourceData": {
    "topic": "My Favorite Food",
    "totalEssays": 42,
    "avgScore": 71.5,
    "scoreDistribution": { "high": 3, "mid": 30, "low": 9 }
  },
  "createdAt": "2026-05-27T08:00:00Z",
  "priority": 2,
  "status": "active"
}
```

---

## Mock 数据使用说明

1. 以上 JSON 对象可直接作为前端 mock 数据使用
2. `sourceData` 字段保留原始数据，用于未来对接真实数据库时替换
3. `actions` 数组中的 `type` 字段决定点击后的行为：
   - `navigate`: 跳转页面（如 `/ai-search?query=xxx`）
   - `workflow`: 直接触发 workflow
   - `panel`: 打开 Drawer panel（如 `assignmentConfirm`）
   - `alert`: 弹窗提示（如"已加入练习篮"）
4. 所有 mock 数据的 `createdAt` 为固定时间，开发时可用当前时间替换

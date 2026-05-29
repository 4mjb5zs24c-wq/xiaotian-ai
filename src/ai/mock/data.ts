import type { InsightItem, RecommendationItem, RiskItem } from '../store'

// ── Insights ───────────────────────────────────────────

export const mockInsights: InsightItem[] = [
  {
    id: 'insight-1',
    title: 'Unit 3 词汇掌握率提升',
    summary: '本周班级整体词汇掌握率提升 3%，食物类词汇拼写错误减少。',
    priority: 'normal',
    tags: ['词汇', 'Unit 3', '趋势向好'],
    detail:
      '根据最近两周的练习和测验数据，学生在 Unit 3（Food and Drinks）的词汇掌握率从 84% 提升至 87%。其中"restaurant""delicious""vegetable"三个高频词的拼写正确率提升最明显，分别提升 8%、6% 和 5%。',
    suggestion:
      '继续保持当前节奏。建议在下周 Unit 3 复习课前，使用"分类记忆法"再次巩固食物类词汇。',
    actionLabel: '查看词汇报告',
  },
  {
    id: 'insight-2',
    title: '语法时态薄弱点：可数/不可数名词',
    summary: '全班 43% 的学生在可数/不可数名词区分上存在困难。',
    priority: 'warning',
    tags: ['语法', '名词', '需要强化'],
    detail:
      'Unit 3 测验第 5-8 题（考查可数/不可数名词）错误率为 43%，远高于全班平均错误率 18%。典型错误包括："many water""a bread""some apple"。学生在"many/much"的搭配上尤其混淆。',
    suggestion:
      '建议在明天课堂上用 10 分钟进行专项对比讲解，配合实物演示可数/不可数的概念。同时准备一份强化练习纸。',
    actionLabel: '生成专项练习',
  },
  {
    id: 'insight-3',
    title: '阅读理解主旨推断能力下滑',
    summary: '本单元阅读理解正确率较上一单元下降 12 个百分点。',
    priority: 'critical',
    tags: ['阅读理解', '主旨推断', '预警'],
    detail:
      'Unit 3 阅读理解部分正确率仅 58%，较 Unit 2 的 70% 大幅下降。分析发现，学生在"主旨大意题"上失分最多（正确率 42%），而在"细节理解题"上表现正常（正确率 78%）。这表明学生能看懂句子，但不擅长提炼段落核心。',
    suggestion:
      '建议本周五的阅读课调整教学重点：1）教授"主题句定位法"；2）设计 3 篇短文的速读+概括训练；3）提供 5 道主旨题作为课后作业。',
    actionLabel: '查看详细分析',
  },
]

// ── Recommendations ────────────────────────────────────

export const mockRecommendations: RecommendationItem[] = [
  {
    id: 'rec-1',
    title: 'Unit 3 食物词汇分类练习',
    reason: '班级错词数据显示，食物类词汇拼写错误集中在双写字母（如"banana""tomato"）',
    type: 'exercise',
    tags: ['词汇', '拼写', 'Unit 3'],
    difficulty: 'basic',
    estimatedTime: '15分钟',
  },
  {
    id: 'rec-2',
    title: '可数/不可数名词对比练习',
    reason: '43% 的学生在 many/much 搭配上混淆，需要专项强化',
    type: 'exercise',
    tags: ['语法', '名词', '专项'],
    difficulty: 'medium',
    estimatedTime: '20分钟',
  },
  {
    id: 'rec-3',
    title: 'BBC Food Culture 听力素材',
    reason: '匹配 Unit 3 食物主题，语速适中（120词/分钟），适合七年级水平',
    type: 'material',
    tags: ['听力', '文化', 'Unit 3'],
    difficulty: 'basic',
    estimatedTime: '5分钟',
  },
  {
    id: 'rec-4',
    title: '阅读理解：主旨推断专项训练',
    reason: '主旨题正确率仅 42%，急需针对性训练',
    type: 'exercise',
    tags: ['阅读', '主旨推断', '预警'],
    difficulty: 'medium',
    estimatedTime: '25分钟',
  },
]

// ── Risk Alerts ────────────────────────────────────────

export const mockRisks: RiskItem[] = [
  {
    id: 'risk-1',
    title: '刘洋 成绩连续下滑',
    studentName: '刘洋',
    riskLevel: 'high',
    description:
      '刘洋最近三次测验成绩分别为 82 → 76 → 71，呈持续下滑趋势。主要失分点在：阅读理解（-8分）和完形填空（-6分）。该生 Unit 3 词汇听写也连续两次不合格。',
    suggestedAction: '建议本周内安排一次课后一对一辅导，重点诊断阅读理解困难和词汇记忆方法。',
    tags: ['成绩下滑', '重点关注', '阅读'],
  },
  {
    id: 'risk-2',
    title: '阅读理解正确率跌破警戒线',
    riskLevel: 'high',
    description:
      '全班阅读理解正确率 58%，低于设定的 60% 警戒线。尤其在"主旨大意"和"词义猜测"两类题型上，全班超过一半学生得分低于 60%。',
    suggestedAction: '建议：1）将阅读策略教学纳入本周教学计划；2）增加每日5分钟限时阅读训练；3）提供分层阅读材料。',
    tags: ['全班预警', '阅读理解', '教学调整'],
  },
  {
    id: 'risk-3',
    title: '6篇作文待批改已超24小时',
    riskLevel: 'medium',
    description:
      '当前有 6 篇学生作文待批改，其中 4 篇已等待超过 24 小时。延迟批改可能导致学生对写作练习的重视程度下降。',
    suggestedAction: '建议今天内完成批改。可以使用 AI 辅助批改功能加速流程：拍照上传后，AI 自动完成语法批注和初评，你只需审核和微调。',
    tags: ['批改积压', '效率提升'],
  },
  {
    id: 'risk-4',
    title: '张小明 时态错误反复出现',
    studentName: '张小明',
    riskLevel: 'medium',
    description:
      '张小明在最近两次作文和一次单元练习中，时态错误出现频率分别为 3次/篇、5次/篇、4次/篇。主要表现为：一般现在时第三人称单数漏加 -s，以及过去时和现在时的混用。',
    suggestedAction: '建议为张小明准备一份"时态专项纠错练习"，同时安排一次 5 分钟的面批，帮助他建立时态自查习惯。',
    tags: ['个人弱点', '时态', '反复错误'],
  },
]

// ── Wrong Question Stats ───────────────────────────────

export const mockWrongStats = {
  totalErrors: 247,
  topTypes: [
    { type: '单选', count: 89, rate: '36%' },
    { type: '完形填空', count: 62, rate: '25%' },
    { type: '阅读理解', count: 48, rate: '19%' },
    { type: '句型转换', count: 31, rate: '13%' },
    { type: '写作', count: 17, rate: '7%' },
  ],
  topKnowledgePoints: [
    { point: '可数/不可数名词', errorCount: 43, trend: 'up' },
    { point: '一般现在时——三单', errorCount: 35, trend: 'stable' },
    { point: '阅读理解主旨推断', errorCount: 32, trend: 'up' },
    { point: 'There be 句型', errorCount: 22, trend: 'down' },
    { point: '食物类词汇拼写', errorCount: 18, trend: 'down' },
  ],
}

// ── Today Suggestions ──────────────────────────────────

export const mockTodaySuggestions = [
  {
    id: 'sug-1',
    title: '词汇复习：食物分类记忆法',
    description: '结合错词数据，用分类法（水果/蔬菜/饮品）帮学生记忆 Unit 3 食物词汇',
    time: '10分钟',
    type: '课堂活动',
  },
  {
    id: 'sug-2',
    title: '语法对比讲解：可数 vs 不可数',
    description: '用实物+对比表格讲解 many vs much、a few vs a little',
    time: '15分钟',
    type: '讲解',
  },
  {
    id: 'sug-3',
    title: '限时阅读训练：速读+概括',
    description: '3篇100词短文，每篇3分钟速读+1句话概括，训练主旨推断能力',
    time: '15分钟',
    type: '课堂练习',
  },
]

// ── Pending Tasks ──────────────────────────────────────

export const mockPendingTasks = [
  { id: 'task-1', title: '批改作文', count: 6, urgent: true, desc: '4篇超过24小时' },
  { id: 'task-2', title: '生成 Unit 3 单词练习', count: 1, urgent: false, desc: '基于错词数据' },
  { id: 'task-3', title: '准备听力课材料', count: 2, urgent: false, desc: 'Unit 3 Food Culture' },
  { id: 'task-4', title: '回复家长消息', count: 3, urgent: false, desc: '关于学生成绩' },
]

// ── Recent Usage ───────────────────────────────────────

export const mockRecentUsage = [
  { id: 'recent-1', action: '查看 Unit 3 错词本', time: '10分钟前' },
  { id: 'recent-2', action: '批改李华作文', time: '30分钟前' },
  { id: 'recent-3', action: '生成 Unit 3 测验卷', time: '1小时前' },
  { id: 'recent-4', action: '查看上周练习报告', time: '2小时前' },
]

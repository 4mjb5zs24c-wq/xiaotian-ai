import type { TeachingSuggestionResult, ParsedIntent, SearchContext } from '../../search/types'

const allSuggestions: TeachingSuggestionResult[] = [
  {
    id: 'sug-1',
    title: 'Unit 3 第一课时教学设计建议',
    description: '建议以"食物图片猜词"作为热身（3分钟），激活学生已有词汇；然后播放课文音频（5分钟），用"听前预测→听中笔记→听后核对"三步法训练听力策略；语法环节建议使用实物对比演示可数/不可数名词。',
    targetGrade: '八年级上',
    targetUnit: 'Unit 3',
    teachingStage: '课前导入',
    estimatedTime: '45分钟',
    aiReason: '根据班级学情（词汇薄弱+语法错误率高）和教材内容，提供结构化教学流程',
    tags: ['教学设计', 'Unit 3', '第一课时'],
    matchesContext: true,
  },
  {
    id: 'sug-2',
    title: 'Unit 3 词汇教学策略：分类记忆法',
    description: '将 Unit 3 食物词汇按类别分组教学：水果类（apple, banana, orange...）、蔬菜类（tomato, potato, carrot...）、饮品类（water, milk, juice...）、主食类（rice, bread, noodles...）。每类先展示图片，再教发音和拼写，最后做分类竞赛游戏。',
    targetGrade: '八年级上',
    targetUnit: 'Unit 3',
    teachingStage: '课堂练习',
    estimatedTime: '20分钟',
    aiReason: '分类记忆法比逐一讲解效率高40%，适合班级当前词汇水平',
    tags: ['词汇', '分类记忆', '教学策略'],
    matchesContext: true,
  },
  {
    id: 'sug-3',
    title: '如何上好一节口语热身课',
    description: '推荐"信息差任务"模式：将学生分为 A/B 两组，每组拿到不同的信息卡，需要通过英语交流完成信息配对。例如：A 有菜单，B 有预算，需要协商点餐。这种真实交际需求能最大化口语输出。',
    targetGrade: '通用',
    targetUnit: '通用',
    teachingStage: '课前导入',
    estimatedTime: '10分钟',
    aiReason: '信息差任务是公认最有效的口语教学方法之一',
    tags: ['口语', '热身', '教学方法'],
    matchesContext: false,
  },
  {
    id: 'sug-4',
    title: '中考阅读理解 3 步解题法',
    description: '第一步：先看题目，圈出关键词（1分钟）；第二步：快速浏览全文，定位关键词所在段落（3分钟）；第三步：精读定位段，选出答案（3分钟）。此方法能帮助学生在有限时间内高效作答。建议用 3 篇真题做示范讲解。',
    targetGrade: '中考',
    targetUnit: '-',
    teachingStage: '考前冲刺',
    estimatedTime: '45分钟',
    aiReason: '中考阅读时间紧题量大，解题策略比逐字阅读更有效',
    tags: ['中考', '阅读', '解题方法'],
    matchesContext: false,
  },
  {
    id: 'sug-5',
    title: 'Unit 3 课后巩固方案：分层作业设计',
    description: 'A 层（基础薄弱）：抄写 Unit 3 核心词汇 3 遍 + 完成单词填空练习；B 层（中等）：完成语法练习纸 + 跟读课文音频；C 层（优秀）：写一篇"My Favorite Food"短文（80词）+ 阅读 1 篇 Food 主题时文。',
    targetGrade: '八年级上',
    targetUnit: 'Unit 3',
    teachingStage: '课后巩固',
    estimatedTime: '25分钟（学生完成时间）',
    aiReason: '分层作业满足不同水平学生的需求，避免"吃不饱"和"吃不了"',
    tags: ['分层', '作业', '课后'],
    matchesContext: true,
  },
  {
    id: 'sug-6',
    title: '英语课堂管理：小组合作学习组织方法',
    description: '按英语水平将 4 人分为一组（1强+2中+1弱），设定明确的角色分工（组长、记录员、计时员、发言人），使用积分制激励。每节课结束后评选"最佳小组"，给予非物质奖励（如：优先选择下一节课的座位）。',
    targetGrade: '通用',
    targetUnit: '-',
    teachingStage: '课堂练习',
    estimatedTime: '持续执行',
    aiReason: '小组合作能提升全班参与度，强弱搭配促进同伴教学',
    tags: ['课堂管理', '小组合作', '策略'],
    matchesContext: false,
  },
  {
    id: 'sug-7',
    title: 'Unit 3 听力教学策略：数字信息捕捉训练',
    description: '班级听力弱项是数字信息捕捉。建议设计专项训练：播放含价格、时间、数量的短对话，学生只记录数字信息。从纯数字听写过渡到对话中的数字信息提取，逐步提高难度。',
    targetGrade: '八年级上',
    targetUnit: 'Unit 3',
    teachingStage: '课堂练习',
    estimatedTime: '15分钟',
    aiReason: '基于班级听力数据（数字信息捕捉为弱项），提供精准教学策略',
    tags: ['听力', '数字', '专项'],
    matchesContext: true,
  },
  {
    id: 'sug-8',
    title: '如何提高学生写作兴趣',
    description: '传统写作教学枯燥，建议尝试：1）"每周一句话"——从一句话日记开始，降低心理门槛；2）"同伴互评"——让学生交换作文，用表情贴纸标记"写得好"和"不太懂"的地方；3）"班级作文墙"——匿名展示优秀作文，全班投票。',
    targetGrade: '通用',
    targetUnit: '-',
    teachingStage: '课后巩固',
    estimatedTime: '持续执行',
    aiReason: '降低写作门槛+增加趣味性能有效改善学生对写作的畏难情绪',
    tags: ['写作', '兴趣', '方法'],
    matchesContext: false,
  },
  {
    id: 'sug-9',
    title: '考前一个月复习计划模板',
    description: '第一周：梳理教材知识点，补齐基础漏洞；第二周：专项突破（阅读、完形、写作各2天）；第三周：真题模拟+错题回顾；第四周：查漏补缺+心态调整。每天安排30分钟英语练习，周末安排2小时。',
    targetGrade: '中考',
    targetUnit: '-',
    teachingStage: '考前冲刺',
    estimatedTime: '1个月',
    aiReason: '结构化的复习计划比盲目刷题效率高3倍',
    tags: ['复习', '计划', '考前'],
    matchesContext: false,
  },
  {
    id: 'sug-10',
    title: 'Unit 3 Food 主题跨学科融合教学',
    description: '将英语课与生物/健康课融合：学生用英语学习食物金字塔（Food Pyramid），了解不同食物的营养成分，最后用英语设计一份"一周健康食谱"。这种跨学科教学能加深学生对主题的理解，同时练习目标语言。',
    targetGrade: '八年级上',
    targetUnit: 'Unit 3',
    teachingStage: '课后巩固',
    estimatedTime: '45分钟',
    aiReason: '跨学科教学是新课标方向，Food 主题天然适合',
    tags: ['跨学科', '融合', 'Project'],
    matchesContext: true,
  },
]

export function searchSuggestions(intent: ParsedIntent, _ctx: SearchContext): TeachingSuggestionResult[] {
  const { entities } = intent

  const scored = allSuggestions.map((s) => {
    let score = 0

    if (entities.grade) {
      if (s.targetGrade === entities.grade) score += 4
      else if (s.targetGrade === '通用') score += 1
    }
    if (entities.unit && s.targetUnit === entities.unit) score += 4
    if (intent.teachingGoal && s.teachingStage.includes(intent.teachingGoal)) score += 3

    for (const kw of entities.keywords) {
      if (s.title.includes(kw)) score += 2
      if (s.description.includes(kw)) score += 1
      if (s.tags.some((t) => t.includes(kw))) score += 2
    }

    if (entities.topic && (s.title.includes(entities.topic) || s.description.includes(entities.topic))) score += 3

    return { suggestion: s, score }
  })

  return scored
    .sort((a, b) => b.score - a.score)
    .map((s) => s.suggestion)
    .slice(0, 10)
}

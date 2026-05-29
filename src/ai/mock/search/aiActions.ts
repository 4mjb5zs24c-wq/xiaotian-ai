import type { AIActionResult, ParsedIntent, SearchContext } from '../../search/types'

const allActions: AIActionResult[] = [
  // ── 讲词 ──
  {
    id: 'ai-teach-word',
    title: '讲该词',
    task: 'teach_word',
    description: '直接打开课堂讲词页，展示释义、例句、发音和关联词组，适合课堂投屏讲解。',
    aiReason: '搜索词为英文单词，适合课堂直接讲解',
    estimatedTime: '即时',
    outputType: '讲词页',
    tags: ['讲词', '课堂', '词汇'],
    matchesContext: true,
    relevantResourceTypes: [],
    relevantGoals: [],
  },
  // ── 词汇 / 默写 ──
  {
    id: 'ai-1',
    title: '生成 Unit 3 词汇默写纸（20个重点词）',
    task: 'generate_dictation',
    description: '基于 Unit 3 词汇表和班级错词数据，自动生成一份包含 20 个高频易错词的默写练习纸，中译英 + 英译中双面打印格式。',
    aiReason: '班级在 food 类词汇上拼写薄弱，自动筛选高频错词生成默写',
    estimatedTime: '约10秒',
    outputType: 'PDF',
    tags: ['词汇', '默写', 'Unit 3'],
    matchesContext: true,
    relevantResourceTypes: ['vocabulary'],
    relevantGoals: ['consolidation', 'unit_review'],
  },
  // ── 语法 / 出题 ──
  {
    id: 'ai-2',
    title: '出10道 Unit 3 语法单选题',
    task: 'generate_quiz',
    description: '围绕可数/不可数名词和 There be 句型，生成 10 道单选题，含答案和解析。题目难度匹配班级当前水平。',
    aiReason: '班级语法错误率 43%，专项练习可有效降低错误率',
    estimatedTime: '约15秒',
    outputType: 'PDF+答案',
    tags: ['出题', '语法', '单选'],
    matchesContext: true,
    relevantResourceTypes: ['grammar'],
    relevantGoals: ['class_practice', 'unit_review'],
  },
  // ── 数据分析 ──
  {
    id: 'ai-3',
    title: '分析本周班级练习数据',
    task: 'analyze',
    description: '综合分析本周所有练习和测验数据，输出：知识点掌握热力图、弱项识别、重点关注学生、教学建议。',
    aiReason: '基于真实练习数据（28份）和测验数据，提供数据驱动的教学决策支持',
    estimatedTime: '约30秒',
    outputType: '分析报告',
    tags: ['分析', '学情', '数据'],
    matchesContext: true,
    relevantResourceTypes: [],
    relevantGoals: [],
  },
  // ── 口语 / 听说 ──
  {
    id: 'ai-13',
    title: '生成口语热身活动',
    task: 'recommend',
    description: '基于当前单元主题生成 5 分钟课堂口语热身，包含引导问题、句型支架和互动方式。',
    aiReason: '口语热身是课堂导入的高效方式，能快速激活学生已有知识',
    estimatedTime: '约10秒',
    outputType: '活动方案',
    tags: ['口语', '热身', '活动'],
    matchesContext: true,
    relevantResourceTypes: ['speaking'],
    relevantGoals: ['warm_up'],
  },
  {
    id: 'ai-14',
    title: '推荐口语导入素材',
    task: 'recommend',
    description: '查找适合课前导入的口语活动、图片/视频素材和情境任务，可直接用于课堂。',
    aiReason: '丰富的导入素材能提高课堂趣味性和学生参与度',
    estimatedTime: '约5秒',
    outputType: '推荐列表',
    tags: ['口语', '导入', '素材'],
    matchesContext: true,
    relevantResourceTypes: ['speaking'],
    relevantGoals: ['warm_up'],
  },
  {
    id: 'ai-15',
    title: '生成课堂互动问题',
    task: 'generate_exercise',
    description: '围绕当前单元主题生成 pair work / group discussion 问题，含角色分配和评估标准。',
    aiReason: '结构化互动问题能让口语活动更有组织和效果',
    estimatedTime: '约10秒',
    outputType: '问题清单',
    tags: ['口语', '互动', '问题'],
    matchesContext: true,
    relevantResourceTypes: ['speaking'],
    relevantGoals: ['warm_up', 'class_practice'],
  },
  {
    id: 'ai-16',
    title: '布置口语练习',
    task: 'recommend',
    description: '选择口语活动资源后，可布置给学生进行课后练习，支持跟读、配音和对话模式。',
    aiReason: '课后口语练习能巩固课堂所学，提升口语流利度',
    estimatedTime: '约5秒',
    outputType: '布置确认',
    tags: ['口语', '练习', '布置'],
    matchesContext: true,
    relevantResourceTypes: ['speaking'],
    relevantGoals: ['consolidation'],
  },
  // ── 阅读 ──
  {
    id: 'ai-17',
    title: '推荐 Unit 3 配套阅读理解',
    task: 'recommend',
    description: '根据 Unit 3 话题和班级阅读水平，推荐 3-5 篇适合的阅读理解材料，含配套练习。',
    aiReason: '匹配当前单元话题的阅读材料，可直接用于课堂或课后',
    estimatedTime: '约5秒',
    outputType: '推荐列表',
    tags: ['推荐', '阅读', 'Unit 3'],
    matchesContext: true,
    relevantResourceTypes: ['reading'],
    relevantGoals: ['class_practice', 'consolidation'],
  },
  // ── 通用（无特定资源类型关联）──
  {
    id: 'ai-4',
    title: '批改待处理的6篇作文',
    task: 'correct_essay',
    description: '一键批改当前待处理的全部 6 篇作文，逐句标注语法/拼写/搭配错误，自动生成分项评分和总评。',
    aiReason: '6篇待批改，4篇已超24小时，批量处理效率最高',
    estimatedTime: '约2分钟',
    outputType: '批改报告',
    tags: ['批改', '作文', '批量'],
    matchesContext: true,
    relevantResourceTypes: ['writing'],
    relevantGoals: [],
  },
  {
    id: 'ai-5',
    title: '推荐 Unit 3 配套听力素材',
    task: 'recommend',
    description: '根据 Unit 3 话题和班级听力水平，推荐 3-5 段适合的听力素材，含配套练习。',
    aiReason: '班级听力平均分82，数字信息捕捉是弱项，推荐针对性素材',
    estimatedTime: '约5秒',
    outputType: '推荐列表',
    tags: ['推荐', '听力', 'Unit 3'],
    matchesContext: true,
    relevantResourceTypes: ['listening'],
    relevantGoals: ['class_practice', 'consolidation'],
  },
  {
    id: 'ai-6',
    title: '生成八上 Unit 3 单元练习卷',
    task: 'generate_exercise',
    description: '生成一份完整的 Unit 3 练习卷（听力+单选+完形+阅读+词汇+写作），题型和分值可自定义。',
    aiReason: '一键生成单元练习，节省备课时间约40分钟',
    estimatedTime: '约45秒',
    outputType: 'PDF+答案',
    tags: ['练习卷', '生成', 'Unit 3'],
    matchesContext: true,
    relevantResourceTypes: ['exercise', 'exam_paper'],
    relevantGoals: ['unit_review'],
  },
  {
    id: 'ai-7',
    title: '总结本周错词趋势',
    task: 'summarize',
    description: '汇总本周错词数据，自动归类（拼写错误/词义混淆/发音误导），生成可视化趋势图。',
    aiReason: '错词数据散落在各处，AI统一汇总分析',
    estimatedTime: '约15秒',
    outputType: '分析报告',
    tags: ['总结', '错词', '趋势'],
    matchesContext: true,
    relevantResourceTypes: ['vocabulary'],
    relevantGoals: [],
  },
  {
    id: 'ai-8',
    title: '出10道中考阅读理解题',
    task: 'generate_quiz',
    description: '模拟中考题型，生成一篇阅读文章 + 5道选择题 + 5道开放式问题，含详细解析。',
    aiReason: '中考阅读理解占分高，系统训练不可或缺',
    estimatedTime: '约20秒',
    outputType: 'PDF+答案',
    tags: ['中考', '阅读理解', '出题'],
    matchesContext: false,
    relevantResourceTypes: ['reading'],
    relevantGoals: ['exam_prep'],
  },
  {
    id: 'ai-9',
    title: '分析本次作文共性问题',
    task: 'analyze',
    description: '对已批改的作文进行横向分析，识别全班共性问题（如时态、单复数、中式英语），输出教学建议。',
    aiReason: '作文批改后的数据分析能有效指导后续教学重点',
    estimatedTime: '约25秒',
    outputType: '分析报告',
    tags: ['分析', '作文', '共性问题'],
    matchesContext: true,
    relevantResourceTypes: ['writing'],
    relevantGoals: [],
  },
  {
    id: 'ai-10',
    title: '生成广东中考听说模拟题',
    task: 'generate_quiz',
    description: '按照广东中考听说考试题型（朗读短文+情景问答+口头作文），生成一套完整的模拟题。',
    aiReason: '广东中考含听说考试，专项模拟训练必不可少',
    estimatedTime: '约30秒',
    outputType: 'PDF+音频',
    tags: ['中考', '听说', '广东'],
    matchesContext: false,
    relevantResourceTypes: ['speaking', 'listening'],
    relevantGoals: ['exam_prep'],
  },
  {
    id: 'ai-11',
    title: '生成一般过去时专项练习（15道）',
    task: 'generate_exercise',
    description: '围绕一般过去时的规则/不规则变化、否定句、疑问句，生成15道练习题（选择+填空+句型转换）。',
    aiReason: '时态是全班共性问题，专项练习针对性强',
    estimatedTime: '约15秒',
    outputType: 'PDF+答案',
    tags: ['练习', '过去时', '语法'],
    matchesContext: false,
    relevantResourceTypes: ['grammar'],
    relevantGoals: ['unit_review'],
  },
  {
    id: 'ai-12',
    title: '推荐环保主题时文阅读',
    task: 'recommend',
    description: '基于环保这一中考高频话题，推荐 3 篇不同难度的环保主题英语时文，含阅读理解题。',
    aiReason: '环保是中考热门话题，时文阅读比教材文章更具时效性',
    estimatedTime: '约5秒',
    outputType: '推荐列表',
    tags: ['推荐', '环保', '时文'],
    matchesContext: false,
    relevantResourceTypes: ['reading', 'current_news'],
    relevantGoals: ['exam_prep'],
  },
]

export function searchAIActions(intent: ParsedIntent, _ctx: SearchContext): AIActionResult[] {
  const { entities, aiTask, resourceTypes, teachingGoal, raw } = intent

  // Detect if query is a word search (English word / phrase, no Chinese instruction)
  const isWordSearch = /^[a-zA-Z]+(?:[\s'-][a-zA-Z]+){0,4}$/.test(raw.trim()) && raw.trim().length <= 40

  const scored = allActions.map((a) => {
    let score = 0

    // teach_word: only show for word searches, hide otherwise
    if (a.task === 'teach_word') {
      if (isWordSearch) score += 12
      else return { action: a, score: -999 }
    }

    // Exact AI task match
    if (aiTask && a.task === aiTask) score += 5

    // Resource type relevance: boost if action is relevant to detected resource types
    const aRT = a.relevantResourceTypes
    const aG = a.relevantGoals

    if (resourceTypes.length > 0 && aRT) {
      const hasRelevant = resourceTypes.some((rt) => aRT.includes(rt))
      if (hasRelevant) score += 6  // Strong boost for matching resource type
      else score -= 4  // Penalty for irrelevant action when user searched for specific type
    }

    // Teaching goal relevance
    if (teachingGoal && aG) {
      if (aG.includes(teachingGoal)) score += 4
      else if (aG.length > 0) score -= 3  // Penalty for wrong goal
    }

    // Grade/unit/topic context (lower weight)
    if (entities.grade && (a.tags.some((t) => t.includes(entities.grade!)) || a.description.includes(entities.grade!))) score += 2
    if (entities.unit && a.tags.some((t) => t.includes(entities.unit!))) score += 2
    if (entities.topic && a.tags.some((t) => t.includes(entities.topic!))) score += 2

    // Keyword match
    for (const kw of entities.keywords) {
      if (a.title.includes(kw)) score += 2
      if (a.description.includes(kw)) score += 1
    }

    return { action: a, score }
  })

  // Filter out actions with negative scores for resource-specific searches
  const minScore = resourceTypes.length > 0 ? 0 : -999

  return scored
    .filter((s) => s.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.action)
    .slice(0, 3)
}

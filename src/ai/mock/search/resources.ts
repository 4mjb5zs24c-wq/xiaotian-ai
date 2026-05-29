import type { ResourceResult, ParsedIntent, SearchContext } from '../../search/types'

const allResources: ResourceResult[] = [
  // ── 八年级上 Unit 3 ──
  { id: 'r-1', title: '八上 Unit 3 听后续写：A Day at School', type: 'listening', teachingGoal: 'consolidation', format: 'MP3+PDF', duration: '4:20', difficulty: 'medium', grade: '八年级上', unit: 'Unit 3', textbook: '人教版', description: '一篇关于学校生活的短文听写，语速100词/分钟。先听两遍完整录音，再逐句听写，最后给出参考答案。', aiReason: '匹配 Unit 3 话题（学校生活），语速适合八年级，附带听力策略指导', tags: ['听写', '学校生活', 'Unit 3'], matchesContext: true },
  { id: 'r-2', title: '八上 Unit 3 Food and Drinks 听力对话', type: 'listening', teachingGoal: 'class_practice', format: 'MP3+练习', duration: '3:45', difficulty: 'basic', grade: '八年级上', unit: 'Unit 3', textbook: '人教版', description: '两位学生在餐厅点餐的对话。包含 5 道选择题和 3 道填空，适合课堂限时训练。', aiReason: '直接匹配当前 Unit 3 食物主题，难度基础，适合全班训练', tags: ['听力', '食物', '餐厅对话'], matchesContext: true },
  { id: 'r-3', title: 'Unit 3 口语练习：点餐角色扮演', type: 'speaking', teachingGoal: 'class_practice', format: 'PDF脚本', duration: '10分钟', difficulty: 'basic', grade: '八年级上', unit: 'Unit 3', textbook: '人教版', description: '餐厅服务员与顾客的点餐对话脚本，包含 A/B 角色卡和常用句型提示。', aiReason: 'Unit 3 口语训练，角色扮演形式学生参与度高', tags: ['口语', '角色扮演', '点餐'], matchesContext: true },
  { id: 'r-4', title: 'Food Around the World 时文阅读', type: 'current_news', teachingGoal: 'consolidation', format: 'PDF', size: '2MB', difficulty: 'medium', grade: '八年级上', unit: 'Unit 3', textbook: '通用', description: '一篇关于世界各地早餐文化的英语短文（250词），含 5 道阅读理解题和词汇表。', aiReason: '拓展 Unit 3 食物主题，融入文化意识，适合课后阅读', tags: ['时文', '文化', '早餐'], matchesContext: true },
  { id: 'r-5', title: '八上 Unit 3 课件（完整版·含音频）', type: 'courseware', teachingGoal: 'warm_up', format: 'PPT', size: '15MB', difficulty: 'basic', grade: '八年级上', unit: 'Unit 3', textbook: '人教版', description: '包含：热身活动、词汇导入、课文讲解、语法聚焦、课堂练习、文化拓展。附单词音频。', aiReason: '完整 Unit 3 课件，覆盖全部教学环节，即开即用', tags: ['课件', 'Unit 3', '完整版'], matchesContext: true },
  { id: 'r-6', title: '可数/不可数名词 语法微课视频', type: 'video', teachingGoal: 'class_practice', format: 'MP4', duration: '6:30', difficulty: 'basic', grade: '八年级上', unit: 'Unit 3', textbook: '通用', description: '5分钟动画微课，用超市购物场景讲解可数/不可数名词的区别，附课堂练习。', aiReason: '当前班级在可数/不可数名词上错误率 43%，急需可视化讲解', tags: ['语法', '微课', '名词'], matchesContext: true },

  // ── 八年级上 其他单元 ──
  { id: 'r-7', title: '八上 Unit 4 动物主题听力', type: 'listening', teachingGoal: 'warm_up', format: 'MP3', duration: '3:10', difficulty: 'basic', grade: '八年级上', unit: 'Unit 4', textbook: '人教版', description: '关于动物园之行的对话，含动物名称和特征描述。适合 Unit 4 预习导入。', aiReason: 'Unit 4 预习素材，动物主题学生兴趣高', tags: ['听力', '动物', 'Unit 4'], matchesContext: false },
  { id: 'r-8', title: '八上 Unit 5 一般过去时讲解课件', type: 'courseware', teachingGoal: 'unit_review', format: 'PPT', size: '8MB', difficulty: 'medium', grade: '八年级上', unit: 'Unit 5', textbook: '人教版', description: '一般过去时完整讲解：规则变化、不规则动词、时间状语、否定句和疑问句结构。', aiReason: '时态是八年级重点，建议提前准备', tags: ['语法', '过去时', '课件'], matchesContext: false },

  // ── 七年级 ──
  { id: 'r-9', title: '七下 Unit 2 课前导入视频：My Neighborhood', type: 'video', teachingGoal: 'warm_up', format: 'MP4', duration: '3:20', difficulty: 'basic', grade: '七年级下', unit: 'Unit 2', textbook: '人教版', description: '一个虚拟社区漫游动画，介绍 neighborhood 相关词汇（post office, bank, park...）。', aiReason: '生动的动画导入，帮助学生建立场景词汇联想', tags: ['视频', '导入', '社区'], matchesContext: false },
  { id: 'r-10', title: '七下 Unit 2 口语热身：问路指路', type: 'speaking', teachingGoal: 'warm_up', format: 'PDF', duration: '8分钟', difficulty: 'basic', grade: '七年级下', unit: 'Unit 2', textbook: '人教版', description: '基于地图的问路指路口语活动，两人一组练习。包含路线卡片和句型框架。', aiReason: '符合口语课热身需求，互动性强', tags: ['口语', '热身', '问路'], matchesContext: false },
  { id: 'r-11', title: '七上 Unit 1 字母与音标入门', type: 'listening', teachingGoal: 'warm_up', format: 'MP3+PDF', duration: '15分钟', difficulty: 'basic', grade: '七年级上', unit: 'Unit 1', textbook: '人教版', description: '26个字母发音 + 48个音标示范朗读，含跟读练习和辨音训练。', aiReason: '七年级入门阶段，音标基础很重要', tags: ['音标', '入门', '字母'], matchesContext: false },

  // ── 中考 ──
  { id: 'r-12', title: '中考英语阅读理解 真题精讲（10篇）', type: 'reading', teachingGoal: 'exam_prep', format: 'PDF', size: '5MB', difficulty: 'advanced', grade: '中考', unit: '-', textbook: '通用', description: '近三年中考真题阅读理解汇编，含详细解析、生词注释和解题技巧点拨。', aiReason: '中考备考核心资源，含真题解析，直接有效', tags: ['中考', '真题', '阅读理解'], matchesContext: false },
  { id: 'r-13', title: '中考英语 完形填空 专项突破', type: 'reading', teachingGoal: 'exam_prep', format: 'PDF', size: '3MB', difficulty: 'advanced', grade: '中考', unit: '-', textbook: '通用', description: '20篇完形填空专项训练，按难度分级。附上下文线索查找技巧。', aiReason: '完形填空是中考失分重灾区，专项训练性价比高', tags: ['中考', '完形填空', '专项'], matchesContext: false },
  { id: 'r-14', title: '中考听说模拟测试（人机对话）', type: 'speaking', teachingGoal: 'exam_prep', format: 'MP3+软件', duration: '20分钟', difficulty: 'advanced', grade: '中考', unit: '-', textbook: '通用', description: '模拟广东中考人机对话考试流程：朗读短文、情景问答、口头作文。含AI评分。', aiReason: '中考听说考试模拟，适合广东/江苏等听说考试地区', tags: ['中考', '听说', '模拟'], matchesContext: false },
  { id: 'r-15', title: '中考高频词汇 800 词', type: 'vocabulary', teachingGoal: 'exam_prep', format: 'PDF', size: '2MB', difficulty: 'medium', grade: '中考', unit: '-', textbook: '通用', description: '按考频排序的800个中考核心词汇，含音标、释义、例句和常见搭配。', aiReason: '中考词汇核心资源，按考频排列，高效复习', tags: ['中考', '词汇', '高频'], matchesContext: false },

  // ── 高中 ──
  { id: 'r-16', title: '高一 Unit 2 Travel 主题阅读', type: 'reading', teachingGoal: 'consolidation', format: 'PDF', size: '1MB', difficulty: 'medium', grade: '高一', unit: 'Unit 2', textbook: '人教版', description: '关于背包旅行的英文文章（400词），含词汇表、阅读理解和讨论题。', aiReason: '旅行主题学生兴趣高，适合课后拓展阅读', tags: ['阅读', '旅行', '高一'], matchesContext: false },
  { id: 'r-17', title: '高一英语写作模板：建议信', type: 'writing', teachingGoal: 'class_practice', format: 'PDF', size: '1MB', difficulty: 'medium', grade: '高一', unit: 'Unit 3', textbook: '通用', description: '建议信写作模板：开头/正文/结尾句型、范文2篇、常用表达、写作练习。', aiReason: '建议信是高中应用文重点，模板化教学效率高', tags: ['写作', '建议信', '模板'], matchesContext: false },

  // ── 通用/跨年级 ──
  { id: 'r-18', title: '英语课堂热身活动 50 个', type: 'courseware', teachingGoal: 'warm_up', format: 'PDF', size: '4MB', difficulty: 'basic', grade: '通用', unit: '-', textbook: '通用', description: '50个不依赖教材的英语课堂热身活动，涵盖词汇、口语、听力、语法各类。每个活动含步骤说明和所需材料。', aiReason: '不依赖特定单元，可用于任意课时的前5分钟', tags: ['热身', '活动', '通用'], matchesContext: false },
  { id: 'r-19', title: '环保主题英语时文阅读合集（5篇）', type: 'current_news', teachingGoal: 'consolidation', format: 'PDF', size: '3MB', difficulty: 'medium', grade: '通用', unit: '-', textbook: '通用', description: '5篇关于环保的英语时文：塑料污染、垃圾分类、碳中和、濒危动物、绿色出行。每篇含阅读题。', aiReason: '环保是中考高频话题，5篇不同角度全面覆盖', tags: ['时文', '环保', '合集'], matchesContext: false },
  { id: 'r-20', title: '英语趣配音素材包（初中）', type: 'dubbing', teachingGoal: 'consolidation', format: 'MP4', duration: '各1-3分钟', difficulty: 'basic', grade: '通用', unit: '-', textbook: '通用', description: '10段适合初中生的英语配音片段：动画电影、演讲、广告。含原声和静音版本。', aiReason: '配音是激发口语兴趣的有效方式，适合课后练习', tags: ['配音', '口语', '趣味'], matchesContext: false },

  // ── 练习卷 ──
  { id: 'r-21', title: '八上 Unit 3 单词默写纸', type: 'vocabulary', teachingGoal: 'consolidation', format: 'PDF', size: '0.5MB', difficulty: 'basic', grade: '八年级上', unit: 'Unit 3', textbook: '人教版', description: 'Unit 3 全部生词（35个）的中译英和英译中默写练习纸，含答案和错词订正区。', aiReason: '直接匹配 Unit 3 词汇表，即印即用', tags: ['默写', '词汇', 'Unit 3'], matchesContext: true },
  { id: 'r-22', title: '八上 Unit 3 单元测验卷', type: 'exam_paper', teachingGoal: 'unit_review', format: 'PDF', size: '2MB', difficulty: 'medium', grade: '八年级上', unit: 'Unit 3', textbook: '人教版', description: '满分100分：听力20分+单选20分+完形15分+阅读20分+词汇10分+写作15分。含答案和评分标准。', aiReason: 'Unit 3 完整测验，覆盖全部题型，可直接使用', tags: ['试卷', 'Unit 3', '单元测验'], matchesContext: true },
  { id: 'r-23', title: '八上 Unit 3 语法练习纸', type: 'exercise', teachingGoal: 'class_practice', format: 'PDF', size: '0.5MB', difficulty: 'medium', grade: '八年级上', unit: 'Unit 3', textbook: '人教版', description: '可数/不可数名词 + There be 句型专项练习，30道题，含答案。', aiReason: '针对班级语法薄弱点，直接可用', tags: ['语法', '练习', '名词'], matchesContext: true },

  // ── 更多资源 ──
  { id: 'r-24', title: '八上 Unit 3 Food Idioms 文化拓展', type: 'reading', teachingGoal: 'consolidation', format: 'PDF', size: '1MB', difficulty: 'medium', grade: '八年级上', unit: 'Unit 3', textbook: '通用', description: '英语中与食物相关的习语介绍（a piece of cake, spill the beans...），含配图和练习。', aiReason: '文化拓展，帮助学生理解英语习语，增加学习趣味', tags: ['文化', '习语', '拓展'], matchesContext: true },
  { id: 'r-25', title: '英语课堂小组活动方案 30 例', type: 'courseware', teachingGoal: 'class_practice', format: 'PDF', size: '6MB', difficulty: 'basic', grade: '通用', unit: '-', textbook: '通用', description: '30个分组活动方案，含分组方式、角色分配、活动步骤和评估方法。', aiReason: '丰富的分组活动储备，适合不同课型', tags: ['活动', '分组', '通用'], matchesContext: false },
  { id: 'r-26', title: '初中英语写作循序渐进 20 篇', type: 'writing', teachingGoal: 'consolidation', format: 'PDF', size: '4MB', difficulty: 'medium', grade: '通用', unit: '-', textbook: '通用', description: '从50词到120词的阶梯式写作训练，含范文、写作指导和评分标准。', aiReason: '写作能力需要循序渐进，20篇训练覆盖一学期', tags: ['写作', '循序渐进', '初中'], matchesContext: false },
  { id: 'r-27', title: '人教版 八上 全册词汇表（含音频）', type: 'vocabulary', teachingGoal: 'unit_review', format: 'MP3+PDF', size: '10MB', difficulty: 'basic', grade: '八年级上', unit: '全册', textbook: '人教版', description: '八上全册 10 个单元的所有词汇，含英音/美音朗读、音标和中文释义。', aiReason: '全册词汇，适合期末总复习', tags: ['词汇', '全册', '音频'], matchesContext: false },
  { id: 'r-28', title: '八上 Unit 2 听力素材：Family Members', type: 'listening', teachingGoal: 'warm_up', format: 'MP3', duration: '2:50', difficulty: 'basic', grade: '八年级上', unit: 'Unit 2', textbook: '人教版', description: '关于家庭成员的对话录音，适合 Unit 2 导入或复习。', aiReason: 'Unit 2 相关听力，可用于复习旧知', tags: ['听力', '家庭', 'Unit 2'], matchesContext: false },
  { id: 'r-29', title: '英语教学中的AI工具使用指南', type: 'courseware', teachingGoal: 'warm_up', format: 'PDF', size: '3MB', difficulty: 'basic', grade: '通用', unit: '-', textbook: '通用', description: '面向英语教师的AI工具入门指南：如何用AI出题、批改、生成素材。', aiReason: '帮助教师了解AI辅助教学的具体方法', tags: ['AI', '工具', '教师发展'], matchesContext: false },
  { id: 'r-30', title: '八上 Unit 3 Reading 课文音频', type: 'listening', teachingGoal: 'class_practice', format: 'MP3', duration: '3:30', difficulty: 'basic', grade: '八年级上', unit: 'Unit 3', textbook: '人教版', description: 'Unit 3 课文的标准朗读音频，英音和美音两个版本，含背景音乐版本。', aiReason: '课文标准朗读，课堂必备素材', tags: ['课文', '朗读', 'Unit 3'], matchesContext: true },
  { id: 'r-31', title: '中考英语写作万能模板', type: 'writing', teachingGoal: 'exam_prep', format: 'PDF', size: '1MB', difficulty: 'medium', grade: '中考', unit: '-', textbook: '通用', description: '中考各类作文模板：书信、通知、议论文、记叙文。含万能开头/结尾句型。', aiReason: '中考写作必备，学生考前背诵首选', tags: ['中考', '写作', '模板'], matchesContext: false },
  { id: 'r-32', title: '七下 Unit 2 口语课热身活动：社区地图', type: 'speaking', teachingGoal: 'warm_up', format: 'PDF', duration: '8分钟', difficulty: 'basic', grade: '七年级下', unit: 'Unit 2', textbook: '人教版', description: '使用社区地图进行"问路指路"口语热身，两人一组完成信息差任务。', aiReason: '口语课完美热身，任务驱动，学生参与度高', tags: ['口语', '热身', '地图'], matchesContext: false },
]

/**
 * Filter and score resources based on parsed intent and context.
 * This is where the "real search" logic lives.
 */
export function searchResources(intent: ParsedIntent, ctx: SearchContext): ResourceResult[] {
  const { entities, resourceTypes, teachingGoal } = intent

  // Score each resource
  const scored = allResources.map((r) => {
    let score = 0

    // Resource type match
    if (resourceTypes.length === 0 || resourceTypes.includes(r.type)) score += 3

    // Teaching goal match
    if (teachingGoal && r.teachingGoal === teachingGoal) score += 3

    // Grade match
    if (entities.grade) {
      if (r.grade === entities.grade) score += 4
      else if (r.grade === '通用') score += 1
      else if (r.grade.includes(entities.grade.replace('年级', '').replace('上', '').replace('下', ''))) score += 2
    }

    // Unit match
    if (entities.unit && r.unit === entities.unit) score += 4

    // Textbook match
    if (entities.textbook && (r.textbook === entities.textbook || r.textbook === '通用')) score += 2

    // Keyword match in title/description
    for (const kw of entities.keywords) {
      if (r.title.includes(kw)) score += 2
      if (r.description.includes(kw)) score += 1
    }

    // Topic match
    if (entities.topic) {
      if (r.title.includes(entities.topic)) score += 3
      if (r.description.includes(entities.topic)) score += 2
      if (r.tags.some((t) => t.includes(entities.topic!))) score += 2
    }

    // Context match
    r.matchesContext = r.grade === ctx.grade && r.unit === ctx.unit && (r.textbook === ctx.textbook || r.textbook === '通用')

    return { resource: r, score }
  })

  // Sort by score descending, take top results
  return scored
    .filter((s) => s.score > 1)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.resource)
    .slice(0, 15)
}

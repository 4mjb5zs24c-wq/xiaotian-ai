/**
 * Mock Recommended Resources — 推荐资源 mock 数据
 *
 * V1: all data is fake. Real resources come from resource service in P2.
 */

import type { RecommendedResource } from '../resources/resourceTypes'

// ── Resource 1: 听说模拟 ──────────────────────────────────

export const mockSpeakingResource: RecommendedResource = {
  resourceId: 'r1',
  title: 'Unit 3 听说专项 — 角色扮演',
  type: '听说训练',
  difficulty: '中等',
  estimatedTime: '15分钟',
  reason: '匹配当前教学单元，题型与广东听说考试一致',
  selected: true,
  removed: false,
  tags: ['听说', '角色扮演', 'Unit3'],
  totalScore: 30,
  questions: [
    {
      questionId: 'sq1',
      questionType: '模仿朗读',
      stem: 'Listen to the recording and read aloud the following passage about food and drinks.',
      options: undefined,
      answer: '评分标准: 发音准确 40%, 语调自然 30%, 流利度 30%',
      analysis: '重点考察元音 /uː/ 和 /ɪ/ 的发音区别，以及 food/drink 相关词汇的连读。',
      score: 10,
      difficulty: 'basic',
      selected: true,
      removed: false,
    },
    {
      questionId: 'sq2',
      questionType: '角色扮演',
      stem: 'You are at a restaurant. Your partner is the waiter. Order food and ask about the menu.',
      options: undefined,
      answer: '要求: 至少 4 个回合对话，包含点餐、询问、确认等场景。',
      analysis: '考察情境交际能力，需要正确使用 I would like..., Could I have..., What do you recommend? 等句型。',
      score: 10,
      difficulty: 'medium',
      selected: true,
      removed: false,
    },
    {
      questionId: 'sq3',
      questionType: '故事复述',
      stem: 'Listen to a short story about a family dinner, then retell it in your own words.',
      options: undefined,
      answer: '关键词: family, dinner, grandparents, delicious, tradition',
      analysis: '考察听力理解和口语表达能力，需要抓住故事主线并用简单句复述。',
      score: 10,
      difficulty: 'medium',
      selected: true,
      removed: false,
    },
  ],
}

// ── Resource 2: 听力训练 ──────────────────────────────────

export const mockListeningResource: RecommendedResource = {
  resourceId: 'r2',
  title: 'Unit 3 听力选择训练',
  type: '听力训练',
  difficulty: '中等',
  estimatedTime: '12分钟',
  reason: '匹配当前教学单元，适合课堂听力练习',
  selected: true,
  removed: false,
  tags: ['听力', '选择', 'Unit3'],
  totalScore: 25,
  questions: [
    {
      questionId: 'lq1',
      questionType: '听力选择',
      stem: 'What does Tom want for lunch?',
      options: ['A. A hamburger', 'B. A sandwich', 'C. Some noodles', 'D. Some rice'],
      answer: 'B. A sandwich',
      analysis: '关键词: sandwich, lunch。注意区分 hamburger 和 sandwich 的发音。',
      score: 5,
      difficulty: 'basic',
      selected: true,
      removed: false,
    },
    {
      questionId: 'lq2',
      questionType: '听力选择',
      stem: 'How much is the meal?',
      options: ['A. $5.50', 'B. $6.50', 'C. $7.50', 'D. $8.50'],
      answer: 'C. $7.50',
      analysis: '数字信息题。注意听清价格数字和货币单位。',
      score: 5,
      difficulty: 'basic',
      selected: true,
      removed: false,
    },
    {
      questionId: 'lq3',
      questionType: '听力填空',
      stem: 'The restaurant opens at ____ in the morning and closes at 10:00 pm.',
      options: undefined,
      answer: '7:00',
      analysis: '时间信息题。需要捕捉数字信息并正确拼写。',
      score: 5,
      difficulty: 'medium',
      selected: true,
      removed: false,
    },
    {
      questionId: 'lq4',
      questionType: '听力选择',
      stem: 'Why does the girl prefer Chinese food?',
      options: ['A. It is cheaper', 'B. It is healthier', 'C. It tastes better', 'D. Her mom cooks it'],
      answer: 'B. It is healthier',
      analysis: '推理判断题。需要理解对话中隐含的因果关系。',
      score: 5,
      difficulty: 'medium',
      selected: true,
      removed: false,
    },
    {
      questionId: 'lq5',
      questionType: '听力选择',
      stem: 'What will they do after dinner?',
      options: ['A. Watch a movie', 'B. Go shopping', 'C. Do homework', 'D. Play sports'],
      answer: 'C. Do homework',
      analysis: '时间顺序题。注意对话中的时间线索和计划表达。',
      score: 5,
      difficulty: 'basic',
      selected: true,
      removed: false,
    },
  ],
}

// ── Resource 3: 模拟卷 ────────────────────────────────────

export const mockExamResource: RecommendedResource = {
  resourceId: 'r3',
  title: '七年级英语期末模拟卷 A',
  type: '试卷',
  difficulty: '中等',
  estimatedTime: '90分钟',
  reason: '覆盖全题型，难度与正式考试一致',
  selected: true,
  removed: false,
  tags: ['模拟卷', '期末', '综合'],
  totalScore: 100,
  questions: [
    {
      questionId: 'eq1', questionType: '听力选择', stem: 'Section A: 听句子，选择正确的图片（共 5 小题）',
      options: ['图片 A', '图片 B', '图片 C'], answer: '见录音材料', analysis: '考察基础听力辩图能力。', score: 5, difficulty: 'basic', selected: true, removed: false,
    },
    {
      questionId: 'eq2', questionType: '词汇选择', stem: 'Choose the correct word to complete the sentence: "The food smells ____."',
      options: ['A. good', 'B. well', 'C. nicely', 'D. wonderfully'], answer: 'A. good', analysis: '考察感官动词后接形容词的用法。smell 为感官动词，后接形容词。', score: 2, difficulty: 'basic', selected: true, removed: false,
    },
    {
      questionId: 'eq3', questionType: '完形填空', stem: 'Read the passage about a birthday party and fill in the blanks.',
      options: undefined, answer: '见答案解析', analysis: '上下文理解 + 词汇应用。重点考察动词时态和介词搭配。', score: 10, difficulty: 'medium', selected: true, removed: false,
    },
    {
      questionId: 'eq4', questionType: '阅读理解', stem: 'Read about different eating habits around the world and answer questions.',
      options: undefined, answer: '1. T, 2. F, 3. T, 4. NG, 5. F', analysis: '细节定位 + 推理判断。注意区分文章事实和个人观点。', score: 15, difficulty: 'medium', selected: true, removed: false,
    },
    {
      questionId: 'eq5', questionType: '阅读理解', stem: 'Read a story about a cooking competition and answer questions.',
      options: undefined, answer: '1. C, 2. A, 3. D, 4. B, 5. C', analysis: '情节理解 + 情感态度判断。注意人物对话中的隐含信息。', score: 15, difficulty: 'advanced', selected: true, removed: false,
    },
    {
      questionId: 'eq6', questionType: '书面表达', stem: 'Write about your favorite food (80-100 words). Include what it is, why you like it, and a memory about it.',
      options: undefined, answer: '评分标准: 内容完整 30%, 语言准确 30%, 结构清晰 20%, 表达丰富 20%', analysis: '综合写作能力。重点: 时态一致性、过渡词使用、情感表达。', score: 20, difficulty: 'medium', selected: true, removed: false,
    },
  ],
}

// ── Resource 4: 词汇练习 ──────────────────────────────────

export const mockVocabResource: RecommendedResource = {
  resourceId: 'r4',
  title: 'Unit 3 课标词专项默写',
  type: '词汇练习',
  difficulty: '基础',
  estimatedTime: '10分钟',
  reason: '针对 Unit3 高频错词，适合课前快速检测',
  selected: true,
  removed: false,
  tags: ['词汇', '默写', 'Unit3'],
  totalScore: 50,
  questions: [
    { questionId: 'vq1', questionType: '默写', stem: '听音写出单词: restaurant', options: undefined, answer: 'restaurant', analysis: '多音节词，注意拼写顺序。错误率 55%。', score: 5, difficulty: 'medium', selected: true, removed: false },
    { questionId: 'vq2', questionType: '默写', stem: '听音写出单词: Wednesday', options: undefined, answer: 'Wednesday', analysis: '含不发音字母 d，易遗漏。错误率 48%。', score: 5, difficulty: 'medium', selected: true, removed: false },
    { questionId: 'vq3', questionType: '默写', stem: '听音写出单词: delicious', options: undefined, answer: 'delicious', analysis: '注意 ci 连写和结尾 ous。错误率 42%。', score: 5, difficulty: 'medium', selected: true, removed: false },
    { questionId: 'vq4', questionType: '中译英', stem: '最喜欢的', options: undefined, answer: 'favorite', analysis: '注意英美拼写差异 (favourite)。错误率 38%。', score: 5, difficulty: 'basic', selected: true, removed: false },
    { questionId: 'vq5', questionType: '中译英', stem: '健康的', options: undefined, answer: 'healthy', analysis: '注意不以 ealth 结尾。错误率 33%。', score: 5, difficulty: 'basic', selected: true, removed: false },
    { questionId: 'vq6', questionType: '选词填空', stem: 'The ____ food at this restaurant is very popular. (health / healthy / healthily)', options: ['health', 'healthy', 'healthily'], answer: 'healthy', analysis: '形容词修饰名词 food。', score: 5, difficulty: 'basic', selected: true, removed: false },
    { questionId: 'vq7', questionType: '默写', stem: '听音写出单词: temperature', options: undefined, answer: 'temperature', analysis: '多音节词，注意 pera 拼写。', score: 5, difficulty: 'advanced', selected: true, removed: false },
    { questionId: 'vq8', questionType: '默写', stem: '听音写出单词: vegetable', options: undefined, answer: 'vegetable', analysis: '注意 vege 开头，table 结尾。', score: 5, difficulty: 'basic', selected: true, removed: false },
    { questionId: 'vq9', questionType: '中译英', stem: '传统', options: undefined, answer: 'traditional', analysis: '注意形容词后缀 -al。', score: 5, difficulty: 'basic', selected: true, removed: false },
    { questionId: 'vq10', questionType: '中译英', stem: '巧克力', options: undefined, answer: 'chocolate', analysis: '注意 cho 开头，late 结尾。', score: 5, difficulty: 'basic', selected: true, removed: false },
  ],
}

// ── Resource 5: 阅读理解 ──────────────────────────────────

export const mockReadingResource: RecommendedResource = {
  resourceId: 'r5',
  title: 'Food Culture 阅读理解专项',
  type: '阅读训练',
  difficulty: '中等',
  estimatedTime: '20分钟',
  reason: '针对班级阅读得分率 68% 的弱项，选择 food 话题文章',
  selected: true,
  removed: false,
  tags: ['阅读', 'Food', 'Unit3'],
  totalScore: 30,
  questions: [
    {
      questionId: 'rq1', questionType: '细节理解', stem: 'According to the passage, what is the most popular food in the UK?',
      options: ['A. Fish and chips', 'B. Pizza', 'C. Curry', 'D. Sandwiches'], answer: 'C. Curry',
      analysis: '文中明确提到 "Curry has become the most popular dish in the UK"。注意区分常识和文中信息。', score: 6, difficulty: 'basic', selected: true, removed: false,
    },
    {
      questionId: 'rq2', questionType: '推理判断', stem: 'The author suggests that British food culture has ____.',
      options: ['A. stayed the same', 'B. become more diverse', 'C. lost its tradition', 'D. become less healthy'],
      answer: 'B. become more diverse', analysis: '从文中 "influenced by many cultures" 和举例多个国家食物可推断。', score: 6, difficulty: 'medium', selected: true, removed: false,
    },
    {
      questionId: 'rq3', questionType: '词义猜测', stem: 'The word "diverse" in paragraph 2 probably means ____.',
      options: ['A. 单一的', 'B. 多样的', 'C. 传统的', 'D. 昂贵的'], answer: 'B. 多样的',
      analysis: '根据上下文 "food from many different countries" 可推断。', score: 6, difficulty: 'medium', selected: true, removed: false,
    },
    {
      questionId: 'rq4', questionType: '主旨大意', stem: 'What is the main idea of the passage?',
      options: ['A. British people eat unhealthy food', 'B. Curry is the most popular food', 'C. British food culture is changing', 'D. People should eat more vegetables'],
      answer: 'C. British food culture is changing', analysis: '全文围绕英国饮食文化的变化展开，A/B/D 都是细节或推断。', score: 6, difficulty: 'medium', selected: true, removed: false,
    },
    {
      questionId: 'rq5', questionType: '作者态度', stem: 'What is the author\'s attitude toward the change in British food culture?',
      options: ['A. Negative', 'B. Positive', 'C. Neutral', 'D. Worried'], answer: 'B. Positive',
      analysis: '文中用 "exciting", "wonderful" 等正面词汇描述变化。', score: 6, difficulty: 'advanced', selected: true, removed: false,
    },
  ],
}

// ── Resource Map ──────────────────────────────────────────

export const mockResourcesByQuery: Record<string, RecommendedResource[]> = {
  'speaking': [mockSpeakingResource, { ...mockListeningResource, resourceId: 'r6', title: 'Food 话题听说综合训练', type: '听说训练', reason: '综合听说能力训练' }],
  'listening': [mockListeningResource, mockSpeakingResource],
  'exam': [mockExamResource, { ...mockReadingResource, resourceId: 'r7', title: '期末阅读专项冲刺', type: '阅读训练', reason: '考前阅读集中训练' }],
  'vocab': [mockVocabResource],
  'reading': [mockReadingResource],
}

export function getMockRecommendedResources(query: string): RecommendedResource[] {
  const lower = query.toLowerCase()
  if (lower.includes('听说') || lower.includes('跟读')) return mockResourcesByQuery['speaking']
  if (lower.includes('听力')) return mockResourcesByQuery['listening']
  if (lower.includes('模拟卷') || lower.includes('冲刺') || lower.includes('期末')) return [...mockResourcesByQuery['exam'], ...mockResourcesByQuery['reading']]
  if (lower.includes('词汇') || lower.includes('默写') || lower.includes('听写')) return mockResourcesByQuery['vocab']
  if (lower.includes('阅读')) return mockResourcesByQuery['reading']
  return [mockVocabResource, mockListeningResource, mockReadingResource]
}

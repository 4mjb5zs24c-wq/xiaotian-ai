/**
 * Listening & Speaking Mock Data
 *
 * 听力/听说素材 —— 区分广东听说考试模式和普通听力模式
 */

export interface ListeningSpeakingItem {
  id: string
  title: string
  type: 'word_reading' | 'dialogue' | 'real_life' | 'culture' | 'exam_practice' | 'retelling'
  duration: string
  regionMode: 'listening' | 'speaking' | 'listening_speaking'
  skillFocus: string[]
  difficulty: 'basic' | 'medium' | 'advanced'
  hasExercise: boolean
  description: string
  aiReason: string
}

const mockItems: ListeningSpeakingItem[] = [
  {
    id: 'ls-001',
    title: 'Unit 3 单词朗读',
    type: 'word_reading',
    duration: '2:30',
    regionMode: 'listening',
    skillFocus: ['词汇辨音', '发音模仿'],
    difficulty: 'basic',
    hasExercise: false,
    description: 'Unit 3 全部词汇标准朗读，英音+美音双版本，含音标展示',
    aiReason: '匹配当前单元，适合课前播放或课后跟读',
  },
  {
    id: 'ls-002',
    title: 'Food and Drinks 场景对话',
    type: 'dialogue',
    duration: '4:15',
    regionMode: 'listening',
    skillFocus: ['对话理解', '细节捕捉'],
    difficulty: 'basic',
    hasExercise: true,
    description: '两位学生在学校餐厅的点餐对话，语速110词/分钟，含5道理解题',
    aiReason: '语速适中，Unit 3 主题高度匹配，适合课堂训练',
  },
  {
    id: 'ls-003',
    title: 'Restaurant Ordering 实景听力',
    type: 'real_life',
    duration: '3:45',
    regionMode: 'listening',
    skillFocus: ['真实场景', '背景噪音适应'],
    difficulty: 'advanced',
    hasExercise: true,
    description: '真实餐厅点餐录音，含背景噪音和多种口音，训练实战听力',
    aiReason: '真实场景训练，提升学生实际交流能力',
  },
  {
    id: 'ls-004',
    title: 'BBC Food Culture 文化专题',
    type: 'culture',
    duration: '5:20',
    regionMode: 'listening',
    skillFocus: ['文化理解', '主旨概括'],
    difficulty: 'advanced',
    hasExercise: true,
    description: 'BBC Learning English 出品，介绍英国饮食文化，含词汇表和讨论题',
    aiReason: '权威素材，文化+语言双重学习，适合拓展',
  },
  {
    id: 'ls-005',
    title: '数字信息听力专项',
    type: 'exam_practice',
    duration: '3:10',
    regionMode: 'listening',
    skillFocus: ['数字信息', '快速辨听'],
    difficulty: 'basic',
    hasExercise: true,
    description: '专门训练价格、数量、时间、电话号码的快速听辨（班级弱项）',
    aiReason: '针对班级数字信息捕捉弱项精准推荐',
  },
  {
    id: 'ls-006',
    title: '广东听说考试模拟 — 模仿朗读',
    type: 'exam_practice',
    duration: '8:00',
    regionMode: 'listening_speaking',
    skillFocus: ['模仿朗读', '语音语调', '流利度'],
    difficulty: 'medium',
    hasExercise: true,
    description: '广东高考听说考试 Part A 模拟，含原文+录音+AI评分',
    aiReason: '广东听说考试必备，AI评分精准反馈发音问题',
  },
  {
    id: 'ls-007',
    title: '广东听说考试模拟 — 角色扮演',
    type: 'exam_practice',
    duration: '10:00',
    regionMode: 'listening_speaking',
    skillFocus: ['角色扮演', '问答技巧', '信息转述'],
    difficulty: 'medium',
    hasExercise: true,
    description: '广东高考听说考试 Part B 模拟，三角色扮演+提问+回答',
    aiReason: '听说考试核心题型，三问五答完整模拟',
  },
  {
    id: 'ls-008',
    title: '故事复述训练 — The Kind Waiter',
    type: 'retelling',
    duration: '6:30',
    regionMode: 'speaking',
    skillFocus: ['故事复述', '关键词抓取', '逻辑连贯'],
    difficulty: 'advanced',
    hasExercise: true,
    description: '听一则2分钟小故事，1分钟准备后进行60秒复述，AI评估完整度',
    aiReason: '听说考试 Part C 题型，训练信息抓取和口语组织能力',
  },
]

/** Get all listening/speaking materials, optionally filtered by region mode */
export function getListeningSpeakingData(regionMode?: string): ListeningSpeakingItem[] {
  if (!regionMode) return mockItems
  return mockItems.filter((m) => m.regionMode === regionMode || m.regionMode === 'listening_speaking')
}

/** Get materials focused on exam preparation */
export function getExamPrepMaterials(): ListeningSpeakingItem[] {
  return mockItems.filter((m) => m.type === 'exam_practice' || m.type === 'retelling')
}

/** Get materials suitable for classroom use */
export function getClassroomMaterials(): ListeningSpeakingItem[] {
  return mockItems.filter((m) => m.difficulty !== 'advanced' && m.hasExercise)
}

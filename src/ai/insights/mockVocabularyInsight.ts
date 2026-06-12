/**
 * AI 词汇洞察 — Mock Data（规则引擎版）
 */
import type {
  HomeTeachingConcernCard, VocabularyInsightData, ErrorTypeItem,
  WeakWordItem, WeakStudentItem, GoodStudentItem, InterventionRecord,
} from './vocabularyInsightTypes'

// ══════════════════════════════════════════════════════════════
// 1. Error Types（4 类平台归因）
// ══════════════════════════════════════════════════════════════

export const MOCK_ERROR_TYPES: ErrorTypeItem[] = [
  {
    type: 'spelling', label: '不会写', percent: 68,
    desc: '拼写错误、漏写、默写错误、格式不规范',
    affectedStudentCount: 35,
    exampleWords: ['AI/artificial intelligence', 'laborer/labourer', 'Beijing', 'efficiency', 'perseverance'],
    aiReason: '默写、听写、英文输入类题目中错误占比较高。学生普遍存在字母缺失、错序和格式不规范问题。',
    recommendedActions: ['生成默写单', '加入复习方案'],
    borderColor: '#f0a060', bgColor: '#fef8f0',
  },
  {
    type: 'pronunciation', label: '读不准', percent: 14,
    desc: '听辨困难、发音不准、跟读或听写场景中识别错误',
    affectedStudentCount: 18,
    exampleWords: ['inspire', 'restaurant', 'delicious', 'vegetable'],
    aiReason: '听力、跟读类练习中错误较多，学生对多音节词的音形对应不熟练，听辨易出错。',
    recommendedActions: ['发起课后PK', '加入复习方案'],
    borderColor: '#e55', bgColor: '#fef0f0',
  },
  {
    type: 'new_word', label: '生词', percent: 11,
    desc: '不认识词义、英汉匹配错误、词义理解不稳定',
    affectedStudentCount: 14,
    exampleWords: ['atmosphere', 'recommend', 'opportunity', 'efficiency'],
    aiReason: '词义理解类题目中错误集中，学生对词义记忆模糊，英汉匹配不稳定。',
    recommendedActions: ['加入复习方案', '词义认读练习'],
    borderColor: '#7b9cd6', bgColor: '#f0f4fc',
  },
  {
    type: 'contextual_usage', label: '不会用', percent: 7,
    desc: '语境使用错误、搭配不当、词形变化不准确',
    affectedStudentCount: 11,
    exampleWords: ['children', 'better', 'pollution', 'efficient', 'order'],
    aiReason: '语境应用类题目中错误集中，词形变化和固定搭配掌握不足。',
    recommendedActions: ['加入复习方案', '例句语篇巩固'],
    borderColor: '#4b9fe8', bgColor: '#f0f6fc',
  },
]

// ══════════════════════════════════════════════════════════════
// 2. Weak Words
// ══════════════════════════════════════════════════════════════

export const MOCK_WEAK_WORDS: WeakWordItem[] = [
  {
    id: 'ww-001', text: 'AI/artificial intelligence', itemType: 'word',
    scoreRate: 10, errorRate: 90, errorCount: 34, affectedStudentCount: 15,
    mainErrorType: 'spelling', issueTypes: ['spelling'],
    severity: '极高',
    errorTypes: [{ type: 'spelling', label: '不会写', percent: 100 }],
    typicalMistakes: [], sourceTasks: ['平台词汇练习'],
    source: '默写',
    aiReason: '该词在默写类题目中错误较多，主要表现为拼写错误、漏写或格式不规范，建议进行默写和拼写巩固。',
    recommendedActions: ['生成默写单', '加入复习方案'],
    priorityScore: 99,
    wrongForms: [
      { text: 'A', students: 6, count: 12 },
      { text: 'AI', students: 5, count: 10 },
      { text: 'I', students: 4, count: 8 },
    ],
    evidences: [
      { studentName: '杨哲铭', source: '平台词汇练习', wrongAnswer: 'A', correctAnswer: 'AI/artificial intelligence', questionId: 'q-001', questionType: '默写', date: '2026-06-05', question: '根据题目要求写出对应英文表达。' },
      { studentName: '林子悦', source: '平台词汇练习', wrongAnswer: 'AI', correctAnswer: 'AI/artificial intelligence', questionId: 'q-002', questionType: '默写', date: '2026-06-05', question: '根据题目要求写出对应英文表达。' },
      { studentName: '乔海硕', source: '平台词汇练习', wrongAnswer: 'I', correctAnswer: 'AI/artificial intelligence', questionId: 'q-003', questionType: '默写', date: '2026-06-05', question: '根据题目要求写出对应英文表达。' },
    ],
  },
  {
    id: 'ww-002', text: 'inspire', itemType: 'word',
    scoreRate: 35, errorRate: 65, errorCount: 40, affectedStudentCount: 20,
    mainErrorType: 'pronunciation', issueTypes: ['pronunciation', 'spelling'],
    severity: '高',
    errorTypes: [{ type: 'pronunciation', label: '读不准', percent: 65 }, { type: 'spelling', label: '不会写', percent: 35 }],
    typicalMistakes: [], sourceTasks: ['听取信息题', '单词默写'],
    source: '听取信息题',
    aiReason: '该词主要来自听力、听取信息类练习，学生在听辨或发音环节错误较多，建议结合音频进行跟读和辨音训练。',
    recommendedActions: ['发起课后PK', '加入复习方案'],
    priorityScore: 90,
    wrongForms: [
      { text: 'inspiree', students: 8, count: 15 },
      { text: 'inspair', students: 6, count: 12 },
      { text: 'inspir', students: 4, count: 8 },
    ],
    evidences: [
      { studentName: '张晓明', source: '冲刺训练（十二）', wrongAnswer: 'inspiree', correctAnswer: 'inspire', questionId: 'q-004', questionType: '听取信息题', date: '2026-06-10', question: '听音频写出对应英文单词。' },
      { studentName: '王芳', source: '冲刺训练（十二）', wrongAnswer: 'inspair', correctAnswer: 'inspire', questionId: 'q-005', questionType: '听取信息题', date: '2026-06-10', question: '听音频写出对应英文单词。' },
      { studentName: '刘洋', source: 'Unit 3 单词默写', wrongAnswer: 'inspir', correctAnswer: 'inspire', questionId: 'q-006', questionType: '默写', date: '2026-06-08', question: '根据中文提示"激励"写出英文单词。' },
    ],
  },
  {
    id: 'ww-003', text: 'laborer/labourer', itemType: 'word',
    scoreRate: 22, errorRate: 78, errorCount: 28, affectedStudentCount: 14,
    mainErrorType: 'spelling', severity: '极高',
    errorTypes: [{ type: 'spelling', label: '不会写', percent: 100 }],
    typicalMistakes: [], sourceTasks: ['单词默写'], source: '默写',
    aiReason: '该词在默写类题目中错误较多，主要表现为拼写错误、漏写或格式不规范，建议进行默写和拼写巩固。',
    recommendedActions: ['生成默写单', '加入复习方案'],
    priorityScore: 92,
    wrongForms: [{ text: 'laborer', students: 10, count: 18 }, { text: 'labourer', students: 4, count: 10 }],
    evidences: [
      { studentName: '王芳', source: 'Unit 3 单词默写', wrongAnswer: 'labor', correctAnswer: 'laborer/labourer', questionId: 'q-007', questionType: '默写', date: '2026-06-08', question: '写出"劳动者"对应的英文单词。' },
    ],
  },
  {
    id: 'ww-004', text: 'Beijing', itemType: 'word',
    scoreRate: 18, errorRate: 82, errorCount: 22, affectedStudentCount: 12,
    mainErrorType: 'spelling', severity: '极高',
    errorTypes: [{ type: 'spelling', label: '不会写', percent: 100 }],
    typicalMistakes: [], sourceTasks: ['单词默写'], source: '默写',
    aiReason: '该词在默写类题目中错误较多，主要表现为大小写和专有名词拼写不规范，建议进行默写和拼写巩固。',
    recommendedActions: ['生成默写单', '加入复习方案'],
    priorityScore: 88,
    wrongForms: [{ text: 'bejing', students: 7, count: 12 }, { text: 'beijing', students: 5, count: 10 }],
    evidences: [
      { studentName: '陈思雨', source: 'Unit 3 单词默写', wrongAnswer: 'bejing', correctAnswer: 'Beijing', questionId: 'q-008', questionType: '默写', date: '2026-06-08', question: '写出"北京"的英文。' },
    ],
  },
  {
    id: 'ww-005', text: 'efficiency', itemType: 'word',
    scoreRate: 40, errorRate: 60, errorCount: 26, affectedStudentCount: 13,
    mainErrorType: 'new_word', issueTypes: ['new_word', 'spelling'],
    severity: '高',
    errorTypes: [{ type: 'new_word', label: '生词', percent: 55 }, { type: 'spelling', label: '不会写', percent: 45 }],
    typicalMistakes: [], sourceTasks: ['词义选择', '单词默写'], source: '词义选择',
    aiReason: '该词在词义理解类题目中错误较多，学生对词义不熟悉，建议先进行认读和释义巩固。',
    recommendedActions: ['加入复习方案', '词义认读练习'],
    priorityScore: 85,
    wrongForms: [{ text: 'efficency', students: 8, count: 14 }, { text: 'efficience', students: 5, count: 12 }],
    evidences: [
      { studentName: '黄子轩', source: 'Unit 3 词义检测', wrongAnswer: '效率(未作答)', correctAnswer: 'efficiency', questionId: 'q-009', questionType: '词义选择', date: '2026-06-07', question: '选出"efficiency"的正确中文释义。' },
    ],
  },
  {
    id: 'ww-006', text: 'perseverance', itemType: 'word',
    scoreRate: 28, errorRate: 72, errorCount: 32, affectedStudentCount: 16,
    mainErrorType: 'spelling', severity: '极高',
    errorTypes: [{ type: 'spelling', label: '不会写', percent: 100 }],
    typicalMistakes: [], sourceTasks: ['单词默写'], source: '默写',
    aiReason: '该词在默写类题目中错误较多，词长且音节复杂，学生容易漏字母。',
    recommendedActions: ['生成默写单', '加入复习方案'],
    priorityScore: 94,
    wrongForms: [{ text: 'perseverence', students: 10, count: 18 }, { text: 'perserverance', students: 6, count: 14 }],
    evidences: [
      { studentName: '周欣怡', source: 'Unit 3 单词默写', wrongAnswer: 'perseverence', correctAnswer: 'perseverance', questionId: 'q-010', questionType: '默写', date: '2026-06-08', question: '写出"毅力"的英文。' },
    ],
  },
  {
    id: 'ww-007', text: 'atmosphere', itemType: 'word',
    scoreRate: 42, errorRate: 58, errorCount: 18, affectedStudentCount: 10,
    mainErrorType: 'new_word', severity: '高',
    errorTypes: [{ type: 'new_word', label: '生词', percent: 100 }],
    typicalMistakes: [], sourceTasks: ['词义选择'], source: '词义选择',
    aiReason: '该词在词义理解类题目中错误较多，学生对词义不熟悉，建议先进行认读和释义巩固。',
    recommendedActions: ['加入复习方案', '词义认读练习'],
    priorityScore: 80,
    wrongForms: [],
    evidences: [
      { studentName: '杨雪', source: 'Unit 3 词义检测', wrongAnswer: '氛围(未作答)', correctAnswer: 'atmosphere', questionId: 'q-011', questionType: '词义选择', date: '2026-06-07', question: '选出"atmosphere"的正确中文释义。' },
    ],
  },
  {
    id: 'ww-008', text: 'recommend', itemType: 'word',
    scoreRate: 45, errorRate: 55, errorCount: 20, affectedStudentCount: 11,
    mainErrorType: 'contextual_usage', severity: '中高',
    errorTypes: [{ type: 'contextual_usage', label: '不会用', percent: 100 }],
    typicalMistakes: [], sourceTasks: ['选词填空', '句子翻译'], source: '选词填空',
    aiReason: '该词在语境应用类题目中错误较多，学生对搭配或语境使用掌握不稳定，建议结合例句和语篇练习巩固。',
    recommendedActions: ['加入复习方案', '例句语篇巩固'],
    priorityScore: 75,
    wrongForms: [],
    evidences: [
      { studentName: '吴俊杰', source: 'Unit 3 语境填词', wrongAnswer: 'suggest', correctAnswer: 'recommend', questionId: 'q-012', questionType: '选词填空', date: '2026-06-09', question: 'I would ____ that you take the medicine twice a day.' },
    ],
  },
  {
    id: 'ww-009', text: 'restaurant', itemType: 'word',
    scoreRate: 50, errorRate: 50, errorCount: 24, affectedStudentCount: 12,
    mainErrorType: 'pronunciation', severity: '中高',
    errorTypes: [{ type: 'pronunciation', label: '读不准', percent: 100 }],
    typicalMistakes: [], sourceTasks: ['听取信息题'], source: '听取信息题',
    aiReason: '该词主要来自听力类练习，学生在听辨多音节词时错误较多，建议结合音频进行跟读和辨音训练。',
    recommendedActions: ['发起课后PK', '加入复习方案'],
    priorityScore: 72,
    wrongForms: [{ text: 'restarant', students: 7, count: 14 }, { text: 'restaraunt', students: 5, count: 10 }],
    evidences: [
      { studentName: '赵子涵', source: 'Unit 3 听音识词', wrongAnswer: 'restarant', correctAnswer: 'restaurant', questionId: 'q-013', questionType: '听取信息题', date: '2026-06-10', question: '听音频选出正确拼写。' },
    ],
  },
  {
    id: 'ww-010', text: 'delicious', itemType: 'word',
    scoreRate: 55, errorRate: 45, errorCount: 22, affectedStudentCount: 11,
    mainErrorType: 'pronunciation', severity: '中高',
    errorTypes: [{ type: 'pronunciation', label: '读不准', percent: 70 }, { type: 'spelling', label: '不会写', percent: 30 }],
    typicalMistakes: [], sourceTasks: ['听取信息题', '单词默写'], source: '听取信息题',
    aiReason: '该词主要来自听力、跟读类练习，学生在听辨环节错误较多，建议结合音频进行跟读和辨音训练。',
    recommendedActions: ['发起课后PK', '加入复习方案'],
    priorityScore: 68,
    wrongForms: [{ text: 'delisous', students: 6, count: 12 }, { text: 'delisious', students: 5, count: 10 }],
    evidences: [
      { studentName: '马天宇', source: 'Unit 3 听音识词', wrongAnswer: 'delisous', correctAnswer: 'delicious', questionId: 'q-014', questionType: '听取信息题', date: '2026-06-10', question: '听音频选出正确拼写。' },
    ],
  },
  {
    id: 'ww-011', text: 'menu', itemType: 'word',
    scoreRate: 60, errorRate: 40, errorCount: 16, affectedStudentCount: 8,
    mainErrorType: 'new_word', severity: '中高',
    errorTypes: [{ type: 'new_word', label: '生词', percent: 100 }],
    typicalMistakes: [], sourceTasks: ['词义选择'], source: '词义选择',
    aiReason: '该词在词义理解类题目中错误较多，学生对词义记忆模糊，容易与其他词混淆。',
    recommendedActions: ['加入复习方案', '词义认读练习'],
    priorityScore: 62,
    wrongForms: [], evidences: [],
  },
  {
    id: 'ww-012', text: 'pollution', itemType: 'word',
    scoreRate: 65, errorRate: 35, errorCount: 14, affectedStudentCount: 7,
    mainErrorType: 'contextual_usage', severity: '中',
    errorTypes: [{ type: 'contextual_usage', label: '不会用', percent: 100 }],
    typicalMistakes: [], sourceTasks: ['选词填空'], source: '选词填空',
    aiReason: '该词在语境应用类题目中错误较多，学生对搭配或词形变化掌握不稳定。',
    recommendedActions: ['加入复习方案', '例句语篇巩固'],
    priorityScore: 58,
    wrongForms: [], evidences: [],
  },
  {
    id: 'ww-014', text: 'I', itemType: 'word',
    scoreRate: 95, errorRate: 5, errorCount: 2, affectedStudentCount: 1,
    mainErrorType: 'pronunciation', severity: '低',
    errorTypes: [{ type: 'pronunciation', label: '读不准', percent: 100 }],
    typicalMistakes: [], sourceTasks: [], source: '跟读题',
    aiReason: '代词发音错误，属于低价值统计项。',
    recommendedActions: [], priorityScore: 5,
  },
  {
    id: 'ww-015', text: 'the', itemType: 'word',
    scoreRate: 98, errorRate: 2, errorCount: 1, affectedStudentCount: 1,
    mainErrorType: 'pronunciation', severity: '低',
    errorTypes: [{ type: 'pronunciation', label: '读不准', percent: 100 }],
    typicalMistakes: [], sourceTasks: [], source: '跟读题',
    aiReason: '冠词发音错误，属于低价值统计项。',
    recommendedActions: [], priorityScore: 2,
  },
]

// ══════════════════════════════════════════════════════════════
// 3. Students
// ══════════════════════════════════════════════════════════════

export const MOCK_WEAK_STUDENTS: WeakStudentItem[] = [
  {
    id: 's-001', name: '林子悦', scoreRate: 59.8,
    weakWords: ['AI/artificial intelligence', 'restaurant', 'delicious', 'laborer/labourer'],
    mainErrorTypes: ['不会写', '读不准'],
    typicalContext: '默写和听写中拼写错误频繁，restaurant→restarant、delicious→delisous 等多音节词拼写错误集中。',
    recentTrend: 'stable', recommendedActions: ['生成默写单', '发起课后PK'],
    weaknessPriorityScore: 85,
    errorTypeDistribution: [
      { type: 'spelling', label: '不会写', percent: 55 },
      { type: 'pronunciation', label: '读不准', percent: 30 },
    ],
    weakWordDetails: [],
  },
  {
    id: 's-002', name: '杨哲铭', scoreRate: 45.2,
    weakWords: ['AI/artificial intelligence', 'Beijing', 'perseverance', 'efficiency'],
    mainErrorTypes: ['不会写', '生词'],
    typicalContext: '默写中频繁漏字母或错序，AI 写成 A，Beijing 写成 bejing。',
    recentTrend: 'declining', recommendedActions: ['生成默写单', '词义认读练习'],
    weaknessPriorityScore: 92,
    errorTypeDistribution: [
      { type: 'spelling', label: '不会写', percent: 70 },
      { type: 'new_word', label: '生词', percent: 30 },
    ],
    weakWordDetails: [],
  },
  {
    id: 's-003', name: '陈思雨', scoreRate: 42.0,
    weakWords: ['restaurant', 'vegetable', 'delicious', 'inspire'],
    mainErrorTypes: ['读不准', '不会写'],
    typicalContext: '多音节词听写几乎全错，听辨能力弱。',
    recentTrend: 'declining', recommendedActions: ['发起课后PK', '加入复习方案'],
    weaknessPriorityScore: 90,
    errorTypeDistribution: [
      { type: 'pronunciation', label: '读不准', percent: 60 },
      { type: 'spelling', label: '不会写', percent: 40 },
    ],
    weakWordDetails: [],
  },
  {
    id: 's-004', name: '乔海硕', scoreRate: 48.5,
    weakWords: ['efficiency', 'atmosphere', 'recommend', 'pollution'],
    mainErrorTypes: ['生词', '不会用'],
    typicalContext: '词义理解题正确率低，英汉匹配经常出错。',
    recentTrend: 'stable', recommendedActions: ['词义认读练习', '例句语篇巩固'],
    weaknessPriorityScore: 80,
    errorTypeDistribution: [
      { type: 'new_word', label: '生词', percent: 55 },
      { type: 'contextual_usage', label: '不会用', percent: 45 },
    ],
    weakWordDetails: [],
  },
  { id: 's-005', name: '张晓明', scoreRate: 52.0, weakWords: ['inspire', 'perseverance', 'laborer/labourer'], mainErrorTypes: ['读不准', '不会写'], typicalContext: '听力/跟读类错误集中，拼写也多错。', recentTrend: 'stable', recommendedActions: ['发起课后PK', '生成默写单'], weaknessPriorityScore: 78, errorTypeDistribution: [{ type: 'pronunciation', label: '读不准', percent: 50 }, { type: 'spelling', label: '不会写', percent: 50 }], weakWordDetails: [] },
  { id: 's-006', name: '刘洋', scoreRate: 55.0, weakWords: ['Beijing', 'restaurant', 'menu'], mainErrorTypes: ['不会写', '生词'], typicalContext: '大小写和拼写规则掌握不足。', recentTrend: 'stable', recommendedActions: ['生成默写单', '加入复习方案'], weaknessPriorityScore: 72, errorTypeDistribution: [{ type: 'spelling', label: '不会写', percent: 60 }, { type: 'new_word', label: '生词', percent: 40 }], weakWordDetails: [] },
  { id: 's-007', name: '吴俊杰', scoreRate: 56.0, weakWords: ['recommend', 'pollution', 'atmosphere'], mainErrorTypes: ['不会用', '生词'], typicalContext: '选词填空和语境应用类题目错误较多。', recentTrend: 'stable', recommendedActions: ['例句语篇巩固', '加入复习方案'], weaknessPriorityScore: 68, errorTypeDistribution: [{ type: 'contextual_usage', label: '不会用', percent: 55 }, { type: 'new_word', label: '生词', percent: 45 }], weakWordDetails: [] },
  { id: 's-008', name: '王芳', scoreRate: 58.0, weakWords: ['delicious', 'efficiency', 'inspire'], mainErrorTypes: ['读不准', '生词'], typicalContext: '听力/跟读环节表现偏弱。', recentTrend: 'improving', recommendedActions: ['发起课后PK', '词义认读练习'], weaknessPriorityScore: 65, errorTypeDistribution: [{ type: 'pronunciation', label: '读不准', percent: 55 }, { type: 'new_word', label: '生词', percent: 45 }], weakWordDetails: [] },
]

// ══════════════════════════════════════════════════════════════
// 4. Good Students
// ══════════════════════════════════════════════════════════════

export const MOCK_GOOD_STUDENTS: GoodStudentItem[] = [
  { id: 'g-001', name: '林小雨', scoreRate: 92, masteredCount: 48, highlight: '课标词全掌握，语块运用灵活', stability: 'stable' },
  { id: 'g-002', name: '杨雪', scoreRate: 88, masteredCount: 44, highlight: '听音识词准确率高，拼写稳定', stability: 'improving' },
  { id: 'g-003', name: '黄子轩', scoreRate: 90, masteredCount: 46, highlight: '近两周进步明显，语块掌握扎实', stability: 'improving' },
  { id: 'g-004', name: '孙佳琪', scoreRate: 85, masteredCount: 42, highlight: '默写几乎零失误，语境运用良好', stability: 'stable' },
  { id: 'g-005', name: '马天宇', scoreRate: 87, masteredCount: 43, highlight: '多音节词掌握好，跟读发音标准', stability: 'stable' },
  { id: 'g-006', name: '陈思琪', scoreRate: 84, masteredCount: 40, highlight: '语块记忆牢固，情景对话表现出色', stability: 'improving' },
]

// ══════════════════════════════════════════════════════════════
// 5. Full Data
// ══════════════════════════════════════════════════════════════

export const MOCK_VOCABULARY_INSIGHT: VocabularyInsightData = {
  classId: 'class-7-3', className: '2023级A18班',
  unitId: 'unit-3', unitName: 'Unit 3 — Food and Drinks',
  timeRange: '7d', updatedAt: '今天 10:30',
  summary: '系统统计显示，主要问题集中在不会写，建议优先处理20个核心错词。近7天41名学生参与词汇练习，累计产生2117条词汇错误记录，涉及1247个已练词汇。根据错误次数、影响学生数和得分率，识别出50个高频错词、27名薄弱学生。',
  summaryStats: {
    studentCount: 41, errorRecordCount: 2117, practicedWordCount: 1247,
    highFrequencyWordCount: 50, weakStudentCount: 27, mainWeakType: '不会写',
  },
  metrics: { practicedWordCount: 1247, weakWordCount: 50, weakStudentCount: 27, mainWeakType: '不会写' },
  errorTypes: MOCK_ERROR_TYPES,
  weakWords: MOCK_WEAK_WORDS,
  weakStudents: MOCK_WEAK_STUDENTS,
  goodStudents: MOCK_GOOD_STUDENTS,
  interventionRecords: [],
  recommendations: [
    { id: 'rec-1', title: '全班共性复习', content: '建议优先复习20个核心错词，覆盖AI/artificial intelligence、laborer/labourer、Beijing、efficiency、perseverance等高频错误词。', actionLabel: '课堂5分钟拼写纠错 + 课后默写巩固', actionDesc: '生成默写单' },
    { id: 'rec-2', title: '重点学生跟进', content: '27名学生词汇掌握不稳定，其中20名学生集中错在高频拼写词。', actionLabel: '为薄弱学生布置个性化词汇练习', actionDesc: '布置专项练习' },
    { id: 'rec-3', title: '练习建议', content: '建议生成一份拼写/默写专项练习，覆盖20个核心错词，预计10–15分钟完成。', actionLabel: '预览后可一键布置给全班或薄弱学生。', actionDesc: '预览练习' },
  ],
}

// ══════════════════════════════════════════════════════════════
// 6. Intervention Records
// ══════════════════════════════════════════════════════════════

export const MOCK_INTERVENTION_RECORDS: InterventionRecord[] = [
  {
    id: 'ir-001', time: '2026-06-10 14:30', type: '词汇复习方案', name: '2023级A18班高频错词巩固计划',
    target: '全班', taskCount: 3, status: '已完成', completionSummary: '3/3 任务完成，41 人参与',
    effectSummary: { beforeScoreRate: 52, afterScoreRate: 68, stillWeakWords: ['AI/artificial intelligence', 'inspire'], improvedStudents: 14, needMorePracticeStudents: 4, suggestion: '重点错词得分率 52%→68%。仍有部分学生掌握不稳定，建议继续安排错词默写。' },
  },
  {
    id: 'ir-002', time: '2026-06-09 10:00', type: '默写', name: '2023级A18班错词默写单',
    target: '全班', taskCount: 1, status: '已完成', completionSummary: '1/1 任务完成，全体参与',
    effectSummary: { beforeScoreRate: 45, afterScoreRate: 58, stillWeakWords: ['delicious', 'restaurant'], improvedStudents: 16, needMorePracticeStudents: 2, suggestion: '默写后整体提升明显，但读不准类多音节词仍需强化听写。' },
  },
]

// ══════════════════════════════════════════════════════════════
// 7. Concern Cards for Home Page
// ══════════════════════════════════════════════════════════════

export const MOCK_VOCAB_CONCERN_CARDS: HomeTeachingConcernCard[] = [
  { id: 'vocab-concern-001', type: 'vocabulary_insight', status: '需关注', summary: '2023级A18班不会写类错误较集中', targetPage: '/vocabulary-insight' },
  { id: 'vocab-concern-002', type: 'vocabulary_insight', status: '需关注', summary: '近期词汇拼写问题较集中', targetPage: '/vocabulary-insight' },
  { id: 'vocab-concern-003', type: 'vocabulary_insight', status: '建议关注', summary: '多名学生读不准问题突出', targetPage: '/vocabulary-insight' },
  { id: 'vocab-concern-004', type: 'vocabulary_insight', status: '建议关注', summary: '生词和不会用类型需关注', targetPage: '/vocabulary-insight' },
]

// ══════════════════════════════════════════════════════════════
// 8. Review Plan Templates
// ══════════════════════════════════════════════════════════════

import type { ReviewPlanConfig, ReviewPlanTask, ReviewGoal } from './vocabularyInsightTypes'

export function getReviewPlanConfig(goal: ReviewGoal): ReviewPlanConfig {
  const meta: Record<ReviewGoal, ReviewPlanConfig> = {
    quick_fix:    { goal: 'quick_fix', dayCount: 3, wordsPerDay: 30, reviewScope: '近7天高频错词（优先极高/高严重程度）', targetStudents: '全班', strategy: '提前复习+默写+中英检测+错词复练', aiReason: '近7天错词数据集中，适合短期快速巩固。' },
    current_unit: { goal: 'current_unit', dayCount: 7, wordsPerDay: 50, reviewScope: '当前单元课标词、非课标词、当前单元错词', targetStudents: '全班', strategy: '课标词系统复习+错词巩固+语境填词', aiReason: '覆盖课标词和单元错词，适合跟随教学进度系统复习。' },
    stage_exam:   { goal: 'stage_exam', dayCount: 14, wordsPerDay: 80, reviewScope: '多单元词汇、阶段错词、近30天高频错词', targetStudents: '全班', strategy: '课标词分批复习+真题例句复现+错词组卷+滚动检测', aiReason: '阶段复习需要覆盖多单元词汇和真题高频词。' },
    weak_student: { goal: 'weak_student', dayCount: 7, wordsPerDay: 30, reviewScope: '薄弱学生个人错词、共性错词', targetStudents: '薄弱学生（27人）', strategy: '个人薄弱词默写+错词复练+听音识词/语块专项', aiReason: '薄弱学生各有不同弱项，需根据归因类型分配合适的练习。' },
    custom:       { goal: 'custom', dayCount: 7, wordsPerDay: 50, reviewScope: '自选词汇范围', targetStudents: '全班', strategy: '根据老师自定义的词汇范围和频次灵活配置。', aiReason: '自定义规划可灵活搭配词汇来源和复习节奏。' },
  }
  return meta[goal]
}

export function getReviewPlanTasks(goal: ReviewGoal): ReviewPlanTask[] {
  const taskMap: Record<ReviewGoal, ReviewPlanTask[]> = {
    quick_fix: [
      { id: 'qt-1', checked: true, name: '高频错词默写', contentScope: '高频错词 20 个', taskType: '默写', targetType: 'class', targetName: '2023级A18班', scheduledTime: '今天 15:00', deadline: '明天 08:00', editable: true },
      { id: 'qt-2', checked: true, name: '中英检测', contentScope: '错词 + 课标词 30 个', taskType: '中英检测', targetType: 'class', targetName: '2023级A18班', scheduledTime: '明天 09:00', deadline: '明天 20:00', editable: true },
      { id: 'qt-3', checked: true, name: '错词复练', contentScope: '前两轮仍错的词', taskType: '错词复练', targetType: 'class', targetName: '2023级A18班', scheduledTime: '后天 09:00', deadline: '后天 20:00', editable: true },
    ],
    current_unit: [
      { id: 'cu-1', checked: true, name: 'Unit 3 课标词复习', contentScope: '课标词 25 个', taskType: '词表识记', targetType: 'class', targetName: '2023级A18班', scheduledTime: '第1天', deadline: '第2天', editable: true },
      { id: 'cu-2', checked: true, name: '错词巩固', contentScope: '错词 20 个', taskType: '默写', targetType: 'class', targetName: '2023级A18班', scheduledTime: '第3天', deadline: '第4天', editable: true },
      { id: 'cu-3', checked: true, name: '语境填词', contentScope: '课标词应用', taskType: '语境填词', targetType: 'class', targetName: '2023级A18班', scheduledTime: '第5天', deadline: '第6天', editable: true },
      { id: 'cu-4', checked: true, name: '综合检测', contentScope: '全部课标词+错词', taskType: '组卷检测', targetType: 'class', targetName: '2023级A18班', scheduledTime: '第7天', deadline: '第7天', editable: true },
    ],
    stage_exam: [
      { id: 'se-1', checked: true, name: '课标词第一批', contentScope: 'Unit 1-2 50个', taskType: '词表识记', targetType: 'class', targetName: '2023级A18班', scheduledTime: '第1天', deadline: '第3天', editable: true },
      { id: 'se-2', checked: true, name: '课标词第二批', contentScope: 'Unit 3-4 50个', taskType: '词表识记', targetType: 'class', targetName: '2023级A18班', scheduledTime: '第4天', deadline: '第6天', editable: true },
      { id: 'se-3', checked: true, name: '真题例句', contentScope: '高频词 30个', taskType: '真题例句复现', targetType: 'class', targetName: '2023级A18班', scheduledTime: '第7天', deadline: '第8天', editable: true },
      { id: 'se-4', checked: true, name: '错词组卷', contentScope: '全部错词 30个', taskType: '组卷', targetType: 'class', targetName: '2023级A18班', scheduledTime: '第9天', deadline: '第10天', editable: true },
      { id: 'se-5', checked: true, name: '滚动检测1', contentScope: '第1-7天内容', taskType: '组卷检测', targetType: 'class', targetName: '2023级A18班', scheduledTime: '第8天', deadline: '第8天', editable: true },
      { id: 'se-6', checked: true, name: '滚动检测2', contentScope: '全部内容', taskType: '组卷检测', targetType: 'class', targetName: '2023级A18班', scheduledTime: '第14天', deadline: '第14天', editable: true },
    ],
    weak_student: [
      { id: 'ws-1', checked: true, name: '个人薄弱词默写', contentScope: '每人8-12个薄弱词', taskType: '默写', targetType: 'student', targetName: '林子悦、杨哲铭等8人', scheduledTime: '第1天', deadline: '第2天', editable: true },
      { id: 'ws-2', checked: true, name: '个人错词复练', contentScope: '默写中仍错的词', taskType: '错词复练', targetType: 'student', targetName: '薄弱学生8人', scheduledTime: '第3天', deadline: '第4天', editable: true },
      { id: 'ws-3', checked: true, name: '听音/语块专项', contentScope: '读不准/不会用词', taskType: '听音识词', targetType: 'student', targetName: '陈思雨、张晓明', scheduledTime: '第5天', deadline: '第6天', editable: true },
      { id: 'ws-4', checked: true, name: '小组补练', contentScope: '最后薄弱词', taskType: '词表识记', targetType: 'group', targetName: '4人/组×2组', scheduledTime: '第7天', deadline: '第7天', editable: true },
    ],
    custom: [
      { id: 'ct-1', checked: true, name: '自选词汇第一轮', contentScope: '自选词汇 50个', taskType: '词表识记', targetType: 'class', targetName: '2023级A18班', scheduledTime: '第1天', deadline: '第2天', editable: true },
      { id: 'ct-2', checked: true, name: '自选词汇第二轮', contentScope: '自选+前轮错词', taskType: '默写', targetType: 'class', targetName: '2023级A18班', scheduledTime: '第3天', deadline: '第4天', editable: true },
      { id: 'ct-3', checked: true, name: '语境应用', contentScope: '自选词汇应用', taskType: '语境填词', targetType: 'class', targetName: '2023级A18班', scheduledTime: '第5天', deadline: '第6天', editable: true },
      { id: 'ct-4', checked: true, name: '综合检测', contentScope: '全部词汇+滚动错词', taskType: '组卷检测', targetType: 'class', targetName: '2023级A18班', scheduledTime: '第7天', deadline: '第7天', editable: true },
    ],
  }
  return taskMap[goal]
}

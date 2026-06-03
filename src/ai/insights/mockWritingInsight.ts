/**
 * AI 写作洞察 — Mock Data
 */
import type {
  HomeWritingConcernCard,
  WritingInsightData,
  ProblemTypeItem,
  HighFrequencyIssueGroup,
  WeakWritingStudent,
  ExcellentWriting,
  RecommendedWritingResource,
  GeneratedSample,
  WritingInterventionRecord,
} from './writingInsightTypes'

// ═══════════════════════════════════════════════════════════
// 1. Home Teaching Concern Cards (5 cards)
// ═══════════════════════════════════════════════════════════

export const MOCK_WRITING_CONCERN_CARDS: HomeWritingConcernCard[] = [
  {
    id: 'writing-concern-001',
    type: 'writing_insight',
    status: '需关注',
    summary: '近期作文结构问题较集中',
    targetPage: '/writing-insight',
  },
  {
    id: 'writing-concern-002',
    type: 'writing_insight',
    status: '需关注',
    summary: '多数学生结尾表达较弱',
    targetPage: '/writing-insight',
  },
  {
    id: 'writing-concern-003',
    type: 'writing_insight',
    status: '建议关注',
    summary: 'Unit3 应用文格式错误较多',
    targetPage: '/writing-insight',
  },
  {
    id: 'writing-concern-004',
    type: 'writing_insight',
    status: '建议关注',
    summary: '读后续写情节衔接不够自然',
    targetPage: '/writing-insight',
  },
  {
    id: 'writing-concern-005',
    type: 'writing_insight',
    status: '需关注',
    summary: '多名学生语言表达准确性不足',
    targetPage: '/writing-insight',
  },
]

// ═══════════════════════════════════════════════════════════
// 2. Problem Types (7 categories)
// ═══════════════════════════════════════════════════════════

export const MOCK_PROBLEM_TYPES: ProblemTypeItem[] = [
  {
    id: 'pt-1',
    type: 'structure_unclear',
    label: '结构不清 / 段落组织弱',
    borderColor: '#f0a060',
    bgColor: '#fef8f0',
    percent: 38,
    affectedStudentCount: 18,
    typicalPerformance: '作文缺少清晰的开头、主体、结尾结构，段落之间缺乏过渡。',
    aiReason: '学生普遍缺少段落规划意识，往往是想到什么写什么，缺乏提纲训练。',
    recommendedActions: ['推荐结构训练', '作文订正'],
    examples: ['Unit3 应用文：建议信', '读后续写：The Lost Puppy'],
  },
  {
    id: 'pt-2',
    type: 'language_accuracy',
    label: '语言准确性弱 / 语法错误多',
    borderColor: '#7b9cd6',
    bgColor: '#f0f4fc',
    percent: 28,
    affectedStudentCount: 15,
    typicalPerformance: '主谓一致、时态混用、冠词缺失、介词误用等基础语法错误频繁出现。',
    aiReason: '学生在写作过程中过度关注内容而忽略语言形式，平时语法知识未能转化为写作能力。',
    recommendedActions: ['推荐语法写作练习', '作文订正'],
    examples: ['同步作文：My Favorite Season', '书面表达：A Letter to a Friend'],
  },
  {
    id: 'pt-3',
    type: 'format_issue',
    label: '格式规范问题 / 应用文格式',
    borderColor: '#9ab3cc',
    bgColor: '#f5f7fa',
    percent: 22,
    affectedStudentCount: 12,
    typicalPerformance: '书信缺少称呼/署名、日期格式错误、分段不规范。',
    aiReason: '应用文格式教学后缺乏足够的实战练习，学生对格式的记忆停留在认知层面。',
    recommendedActions: ['推荐应用文专项', '作文订正'],
    examples: ['应用文：邀请信', '应用文：建议信'],
  },
  {
    id: 'pt-4',
    type: 'content_incomplete',
    label: '内容不完整 / 要点缺失',
    borderColor: '#e55',
    bgColor: '#fef0f0',
    percent: 16,
    affectedStudentCount: 10,
    typicalPerformance: '部分学生遗漏题目要求的要点，或要点展开不充分。',
    aiReason: '审题不仔细，写作前不列提纲，导致遗漏要点或内容扁平化。',
    recommendedActions: ['推荐结构训练', '作文订正'],
    examples: ['应用文：回信', '读后续写：续写段落'],
  },
  {
    id: 'pt-5',
    type: 'vocabulary_weak',
    label: '词汇表达弱 / 用词单一',
    borderColor: '#8e7cc3',
    bgColor: '#f6f0fc',
    percent: 14,
    affectedStudentCount: 9,
    typicalPerformance: '高频重复使用基础词汇，缺少同义替换和进阶词汇，表达不够丰富。',
    aiReason: '学生的词汇量停留在认知层面，写作时提取不出更精准、丰富的表达。',
    recommendedActions: ['推荐词汇表达升级', '生成范文'],
    examples: ['同步作文：My School Day', '书面表达：A Special Day'],
  },
  {
    id: 'pt-6',
    type: 'sentence_monotony',
    label: '句式单一 / 句子衔接弱',
    borderColor: '#4b9fe8',
    bgColor: '#f0f6fc',
    percent: 10,
    affectedStudentCount: 8,
    typicalPerformance: '句子以简单句为主，缺少复合句、状语从句等多样化句式。',
    aiReason: '学生对复合句和连接词掌握不够熟练，写作时偏向使用简单句以确保不出错。',
    recommendedActions: ['推荐句式训练', '生成范文'],
    examples: ['读后续写：An Unexpected Gift', '同步作文：My Hobby'],
  },
  {
    id: 'pt-7',
    type: 'logic_cohesion',
    label: '逻辑衔接弱 / 情节不连贯',
    borderColor: '#4caf50',
    bgColor: '#f0faf0',
    percent: 6,
    affectedStudentCount: 5,
    typicalPerformance: '段落之间逻辑跳跃，读后续写情节衔接不够自然顺畅。',
    aiReason: '学生对逻辑词和过渡句的使用不够自然，读后续写中缺乏对原文线索的追踪。',
    recommendedActions: ['推荐情节衔接训练', '生成范文'],
    examples: ['读后续写：The Lost Puppy', '读后续写：An Unexpected Gift'],
  },
]

// ═══════════════════════════════════════════════════════════
// 3. High Frequency Writing Issues (4 groups, 4-5 items each)
// ═══════════════════════════════════════════════════════════

export const MOCK_HIGH_FREQUENCY_ISSUES: HighFrequencyIssueGroup[] = [
  {
    problemType: 'structure_unclear',
    items: [
      {
        id: 'wi-001', studentId: 's-001', studentName: '张晓明',
        essayTitle: 'A Letter of Advice to a Friend', taskName: 'Unit3 应用文写作',
        writingType: 'practical', score: 10,
        originalText: 'I think you should study more. You can read books. You need do homework every day. It is good for you.',
        issueExplanation: '整段话缺乏逻辑结构和段落层次，三个建议简单罗列，缺少原因说明和过渡词。',
        revisionSuggestion: '使用 first/furthermore 等连接词组织建议，每个建议搭配 1-2 句原因支撑。',
        improvedExample: 'First, I suggest you make a study plan. This will help you manage your time better. Furthermore, you could read English books for 20 minutes every day, as it will gradually improve your vocabulary.',
        answerSheetImageUrl: '/mock/answer-sheets/zhangxiaoming-letter.jpg',
        fullEssayId: 'essay-001',
      },
      {
        id: 'wi-002', studentId: 's-002', studentName: '李华',
        essayTitle: 'The Lost Puppy — Continuation', taskName: '读后续写练习',
        writingType: 'continuation', score: 11,
        originalText: 'He found the puppy. He was happy. He went home. His mom was happy too.',
        issueExplanation: '续写段落缺少情节展开，事件简单罗列没有细节描写，结尾突兀。',
        revisionSuggestion: '添加寻找小狗的过程细节和心理描写，结尾增加情感升华。',
        improvedExample: 'After searching for nearly an hour, he finally spotted the puppy trembling under a bush. His heart raced with relief. "I found you!" he whispered, gently scooping up the shivering ball of fur.',
        answerSheetImageUrl: '/mock/answer-sheets/lihua-continuation.jpg',
        fullEssayId: 'essay-002',
      },
      {
        id: 'wi-003', studentId: 's-003', studentName: '王芳',
        essayTitle: 'My Favorite Season', taskName: '同步作文练习',
        writingType: 'sync_composition', score: 12,
        originalText: 'My favorite season is summer. I like summer because it is hot. I can swim. I can eat ice cream. Summer is fun.',
        issueExplanation: '段落没有层次，理由罗列没有展开，缺少结尾总结。',
        revisionSuggestion: '先点明主题，再用 2-3 句详细说明理由，最后收尾总结。',
        improvedExample: 'My favorite season is summer. There are several reasons. Firstly, I enjoy swimming in the cool water when the sun is blazing. Secondly, nothing beats the joy of eating ice cream on a hot afternoon. For these reasons, summer is truly the best time of the year.',
        answerSheetImageUrl: '/mock/answer-sheets/wangfang-summer.jpg',
        fullEssayId: 'essay-003',
      },
      {
        id: 'wi-004', studentId: 's-004', studentName: '刘洋',
        essayTitle: 'A Letter to a Pen Pal', taskName: '应用文单元测',
        writingType: 'practical', score: 9,
        originalText: 'Hello my pen pal. My name is Liu Yang. I am 13 years old. I like playing basketball. I like reading books. Please write back.',
        issueExplanation: '书信内容缺乏结构组织，没有分段，兴趣爱好简单罗列，缺少互动感。',
        revisionSuggestion: '分段介绍自己（基本信息/兴趣爱好/提问对方），增加互动句式。',
        improvedExample: "Dear Pen Pal,\n\nMy name is Liu Yang and I'm 13 years old. Let me tell you a bit about myself.\n\nIn my free time, I enjoy playing basketball and reading adventure novels. What about you? What do you like to do after school?\n\nLooking forward to hearing from you soon!",
        answerSheetImageUrl: '/mock/answer-sheets/liuyang-penpal.jpg',
        fullEssayId: 'essay-004',
      },
    ],
  },
  {
    problemType: 'language_accuracy',
    items: [
      {
        id: 'wi-005', studentId: 's-005', studentName: '陈思雨',
        essayTitle: 'My School Day', taskName: '同步作文练习',
        writingType: 'sync_composition', score: 13,
        originalText: 'I get up at 6:30. Then I go to school. I have many class. My favorite subject are English and math. After school, I do my homeworks.',
        issueExplanation: 'class/homework 可数名词未加 s/es，主谓一致错误（subject are），基础语法问题频繁。',
        revisionSuggestion: '注意可数名词单复数形式，检查主谓一致。',
        improvedExample: 'I get up at 6:30. Then I go to school. I have many classes. My favorite subjects are English and math. After school, I do my homework.',
        answerSheetImageUrl: '/mock/answer-sheets/chensiyu-school.jpg',
        fullEssayId: 'essay-005',
      },
      {
        id: 'wi-006', studentId: 's-006', studentName: '赵子涵',
        essayTitle: 'A Letter to a Friend', taskName: '书面表达练习',
        writingType: 'comprehensive_expression', score: 14,
        originalText: 'I have went to the park yesterday. It be very beautiful. There is many flowers and trees. I feeled very happy.',
        issueExplanation: '时态混乱（have went / feeled），be 动词未变形，there be 句型主谓不一致。',
        revisionSuggestion: '统一用过去时态叙述，检查不规则动词过去式和 be 动词变形。',
        improvedExample: 'I went to the park yesterday. It was very beautiful. There were many flowers and trees. I felt very happy.',
        answerSheetImageUrl: '/mock/answer-sheets/zhaozihan-letter.jpg',
        fullEssayId: 'essay-006',
      },
      {
        id: 'wi-007', studentId: 's-007', studentName: '周欣怡',
        essayTitle: 'An Unexpected Gift', taskName: '读后续写练习',
        writingType: 'continuation', score: 12,
        originalText: 'She open the box slow. Inside the box, there is a small cat. The cat look at her with big eyes. She is surprise and happy.',
        issueExplanation: '第三人称单数动词未变形（open/look），形容词/副词混淆（slow→slowly），时态不统一。',
        revisionSuggestion: '检查所有动词的第三人称单数形式，区分形容词和副词用法。',
        improvedExample: 'She opened the box slowly. Inside the box, there was a small cat. The cat looked at her with big eyes. She was surprised and happy.',
        answerSheetImageUrl: '/mock/answer-sheets/zhouxinyi-gift.jpg',
        fullEssayId: 'essay-007',
      },
      {
        id: 'wi-008', studentId: 's-008', studentName: '吴俊杰',
        essayTitle: 'A Special Day', taskName: '自定义批改',
        writingType: 'custom_correction', score: 11,
        originalText: 'Last Sunday is my birthday. My mother buy a cake for I. My friends come to my home. We play games and sing songs. It is a wonderful day.',
        issueExplanation: '时态不统一（is→was, buy→bought, come→came），代词格错误（for I→for me）。',
        revisionSuggestion: '全篇统一使用过去时，注意人称代词宾格用法。',
        improvedExample: 'Last Sunday was my birthday. My mother bought a cake for me. My friends came to my home. We played games and sang songs. It was a wonderful day.',
        answerSheetImageUrl: '/mock/answer-sheets/wujunjie-birthday.jpg',
        fullEssayId: 'essay-008',
      },
    ],
  },
  {
    problemType: 'format_issue',
    items: [
      {
        id: 'wi-009', studentId: 's-009', studentName: '林小雨',
        essayTitle: 'An Invitation Letter', taskName: 'Unit3 应用文写作',
        writingType: 'practical', score: 14,
        originalText: 'Come to my birthday party on Saturday. It starts at 2pm. We will have cake and play games.',
        issueExplanation: '缺少信件基本格式：无称呼（Dear...）、无署名（Yours...）、无日期。',
        revisionSuggestion: '补充标准书信格式：称呼→正文→结束语→署名→日期。',
        improvedExample: 'Dear Li Hua,\n\nI would like to invite you to my birthday party this Saturday at 2pm. We will have cake and play games. I hope you can come!\n\nYours,\nLin Xiaoyu\nJune 1, 2026',
        answerSheetImageUrl: '/mock/answer-sheets/linxiaoyu-invitation.jpg',
        fullEssayId: 'essay-009',
      },
      {
        id: 'wi-010', studentId: 's-010', studentName: '黄子轩',
        essayTitle: 'A Letter of Advice', taskName: '应用文单元测',
        writingType: 'practical', score: 12,
        originalText: 'You should eat healthy food and do exercise. Don\'t stay up late. I hope you feel better soon.',
        issueExplanation: '缺少称呼和署名，无分段，建议信格式不完整。',
        revisionSuggestion: '信件主体前补称呼，结尾补署名，正文分段呈现。',
        improvedExample: 'Dear Tom,\n\nI heard that you haven\'t been feeling well lately. Here are some suggestions.\n\nFirst, you should eat healthy food and do more exercise. Also, don\'t stay up late — getting enough sleep is very important.\n\nI hope you feel better soon!\n\nBest wishes,\nHuang Zixuan',
        answerSheetImageUrl: '/mock/answer-sheets/huangzixuan-advice.jpg',
        fullEssayId: 'essay-010',
      },
      {
        id: 'wi-011', studentId: 's-011', studentName: '杨雪',
        essayTitle: 'A Letter of Thanks', taskName: '书面表达练习',
        writingType: 'comprehensive_expression', score: 13,
        originalText: 'Thank you for the gift. I like it very much. It is beautiful. I will use it every day.',
        issueExplanation: '感谢信缺少正式称呼和署名，正文开头缺少感谢对象定位。',
        revisionSuggestion: '补充感谢信标准格式，增加感谢的具体内容和情感表达。',
        improvedExample: 'Dear Aunt Mary,\n\nThank you so much for the beautiful notebook you sent me! I really love the cover design, and I will use it to write down my English vocabulary every day.\n\nWith love,\nYang Xue',
        answerSheetImageUrl: '/mock/answer-sheets/yangxue-thanks.jpg',
        fullEssayId: 'essay-011',
      },
      {
        id: 'wi-012', studentId: 's-012', studentName: '马天宇',
        essayTitle: 'A Notice', taskName: '应用文单元测',
        writingType: 'practical', score: 10,
        originalText: 'There will be a basketball game on Friday. Everyone should come.',
        issueExplanation: '通知格式缺少标题、发布人和日期，内容过于简单无细节。',
        revisionSuggestion: '补通知标准格式：NOTICE 标题→正文详情→发布单位→日期。',
        improvedExample: 'NOTICE\n\nThere will be a basketball game between Class 7-1 and Class 7-3 this Friday at 4pm on the school playground. All students are welcome to come and cheer!\n\nStudent Union\nJune 3, 2026',
        answerSheetImageUrl: '/mock/answer-sheets/matianyu-notice.jpg',
        fullEssayId: 'essay-012',
      },
    ],
  },
  {
    problemType: 'vocabulary_weak',
    items: [
      {
        id: 'wi-013', studentId: 's-005', studentName: '陈思雨',
        essayTitle: 'My Hobby', taskName: '同步作文练习',
        writingType: 'sync_composition', score: 13,
        originalText: 'I like reading because it is interesting. Reading is very interesting. I think interesting books are good.',
        issueExplanation: 'interesting 重复 3 次，词汇高度重复，缺乏同义替换能力。',
        revisionSuggestion: '使用 enjoyable / fascinating / wonderful 等替换 interesting，丰富词汇表达。',
        improvedExample: 'I like reading because it is truly enjoyable. For me, diving into a fascinating story is the best way to spend an afternoon. I believe wonderful books can open up new worlds.',
        answerSheetImageUrl: '/mock/answer-sheets/chensiyu-hobby.jpg',
        fullEssayId: 'essay-013',
      },
      {
        id: 'wi-014', studentId: 's-003', studentName: '王芳',
        essayTitle: 'My Best Friend', taskName: '同步作文练习',
        writingType: 'sync_composition', score: 14,
        originalText: 'My friend is good. She is a good student. She helps me with my homework. She is good at sports too.',
        issueExplanation: 'good 重复 3 次，表达单一，缺少人物描写的具体词汇。',
        revisionSuggestion: '使用 kind/helpful/talented/excellent 等具体形容词替代 good。',
        improvedExample: 'My friend is a kind and helpful person. She is an excellent student who often helps me with my homework. Moreover, she is very talented at sports, especially basketball.',
        answerSheetImageUrl: '/mock/answer-sheets/wangfang-friend.jpg',
        fullEssayId: 'essay-014',
      },
      {
        id: 'wi-015', studentId: 's-001', studentName: '张晓明',
        essayTitle: 'A Special Day', taskName: '自定义批改',
        writingType: 'custom_correction', score: 11,
        originalText: 'It was a happy day. I was very happy. My family was happy too. We had a happy time together.',
        issueExplanation: 'happy 重复 4 次，缺乏更丰富的情感表达词汇。',
        revisionSuggestion: '使用 joyful/wonderful/delighted/pleasant 等词汇替换 happy。',
        improvedExample: 'It was a joyful day. I felt absolutely delighted. My family was thrilled too. We had a wonderful time together.',
        answerSheetImageUrl: '/mock/answer-sheets/zhangxiaoming-specialday.jpg',
        fullEssayId: 'essay-015',
      },
      {
        id: 'wi-016', studentId: 's-010', studentName: '黄子轩',
        essayTitle: 'My Dream Job', taskName: '书面表达练习',
        writingType: 'comprehensive_expression', score: 13,
        originalText: 'I want to be a teacher. Teachers help students learn. I think teaching is important. I want to help students.',
        issueExplanation: 'help / want / teacher / student 重复使用，缺少高级词汇和句型变化。',
        revisionSuggestion: '使用 aspire to / guide / inspire / educator 等词汇丰富表达，增加原因拓展。',
        improvedExample: 'I aspire to become an educator. I believe teachers have the power to inspire young minds and guide them toward a brighter future. Helping students discover their potential would be deeply fulfilling.',
        answerSheetImageUrl: '/mock/answer-sheets/huangzixuan-dreamjob.jpg',
        fullEssayId: 'essay-016',
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════
// 4. Weak Writing Students (8 people)
// ═══════════════════════════════════════════════════════════

export const MOCK_WEAK_WRITING_STUDENTS: WeakWritingStudent[] = [
  {
    id: 's-001', name: '张晓明', averageScore: 10.5, level: 'D',
    mainProblemTypes: ['结构不清', '词汇表达弱'],
    typicalSentence: 'I think you should study more. You can read books. You need do homework every day.',
    relatedTasks: ['Unit3 应用文写作', '同步作文：My Favorite Season', '自定义批改：A Special Day'],
    scoreTrend: 'stable',
    problemDistribution: [
      { type: 'structure_unclear', label: '结构不清', percent: 45 },
      { type: 'vocabulary_weak', label: '词汇表达弱', percent: 30 },
      { type: 'language_accuracy', label: '语言准确性弱', percent: 25 },
    ],
    answerSheetImageUrl: '/mock/answer-sheets/zhangxiaoming-letter.jpg',
    fullEssayIds: ['essay-001', 'essay-015'],
    recentScores: [
      { taskName: 'Unit3 应用文', score: 10, date: '05/28' },
      { taskName: '同步作文', score: 11, date: '05/25' },
      { taskName: '自定义批改', score: 11, date: '05/22' },
      { taskName: '读后续写', score: 9, date: '05/18' },
    ],
    revisionSuggestions: ['加强段落结构规划训练', '积累同义替换词汇库', '写作前列提纲'],
  },
  {
    id: 's-002', name: '李华', averageScore: 11.0, level: 'D',
    mainProblemTypes: ['结构不清', '句式单一'],
    typicalSentence: 'He found the puppy. He was happy. He went home. His mom was happy too.',
    relatedTasks: ['读后续写练习', '同步作文：My School Day'],
    scoreTrend: 'declining',
    problemDistribution: [
      { type: 'structure_unclear', label: '结构不清', percent: 40 },
      { type: 'sentence_monotony', label: '句式单一', percent: 35 },
      { type: 'content_incomplete', label: '内容不完整', percent: 25 },
    ],
    answerSheetImageUrl: '/mock/answer-sheets/lihua-continuation.jpg',
    fullEssayIds: ['essay-002'],
    recentScores: [
      { taskName: '读后续写', score: 11, date: '05/29' },
      { taskName: '同步作文', score: 10, date: '05/26' },
      { taskName: '应用文单元测', score: 12, date: '05/20' },
      { taskName: '书面表达', score: 11, date: '05/15' },
    ],
    revisionSuggestions: ['练习使用复合句', '添加细节描写和心理活动', '展开情节而非简单叙述'],
  },
  {
    id: 's-004', name: '刘洋', averageScore: 10.0, level: 'D',
    mainProblemTypes: ['格式规范问题', '结构不清'],
    typicalSentence: 'Hello my pen pal. My name is Liu Yang. I like playing basketball. Please write back.',
    relatedTasks: ['应用文单元测', '应用文：建议信'],
    scoreTrend: 'stable',
    problemDistribution: [
      { type: 'format_issue', label: '格式规范问题', percent: 50 },
      { type: 'structure_unclear', label: '结构不清', percent: 30 },
      { type: 'content_incomplete', label: '内容不完整', percent: 20 },
    ],
    answerSheetImageUrl: '/mock/answer-sheets/liuyang-penpal.jpg',
    fullEssayIds: ['essay-004'],
    recentScores: [
      { taskName: '应用文单元测', score: 9, date: '05/30' },
      { taskName: '应用文写作', score: 10, date: '05/25' },
      { taskName: '同步作文', score: 11, date: '05/19' },
    ],
    revisionSuggestions: ['熟悉各类应用文格式模板', '练习书信的标准分段', '增加内容细节'],
  },
  {
    id: 's-005', name: '陈思雨', averageScore: 12.5, level: 'C',
    mainProblemTypes: ['语言准确性弱', '词汇表达弱'],
    typicalSentence: 'I have many class. My favorite subject are English. After school, I do my homeworks.',
    relatedTasks: ['同步作文练习', '读后续写练习'],
    scoreTrend: 'stable',
    problemDistribution: [
      { type: 'language_accuracy', label: '语言准确性弱', percent: 40 },
      { type: 'vocabulary_weak', label: '词汇表达弱', percent: 35 },
      { type: 'sentence_monotony', label: '句式单一', percent: 25 },
    ],
    answerSheetImageUrl: '/mock/answer-sheets/chensiyu-school.jpg',
    fullEssayIds: ['essay-005', 'essay-013'],
    recentScores: [
      { taskName: '同步作文', score: 13, date: '05/28' },
      { taskName: '读后续写', score: 12, date: '05/24' },
      { taskName: '应用文', score: 14, date: '05/20' },
      { taskName: '书面表达', score: 11, date: '05/16' },
    ],
    revisionSuggestions: ['加强名词单复数及主谓一致训练', '积累进阶词汇表达', '完成后自查语法错误'],
  },
  {
    id: 's-006', name: '赵子涵', averageScore: 13.0, level: 'C',
    mainProblemTypes: ['语言准确性弱', '格式规范问题'],
    typicalSentence: 'I have went to the park yesterday. It be very beautiful. I feeled very happy.',
    relatedTasks: ['书面表达练习', '应用文单元测'],
    scoreTrend: 'improving',
    problemDistribution: [
      { type: 'language_accuracy', label: '语言准确性弱', percent: 50 },
      { type: 'format_issue', label: '格式规范问题', percent: 30 },
      { type: 'content_incomplete', label: '内容不完整', percent: 20 },
    ],
    answerSheetImageUrl: '/mock/answer-sheets/zhaozihan-letter.jpg',
    fullEssayIds: ['essay-006'],
    recentScores: [
      { taskName: '书面表达', score: 14, date: '05/29' },
      { taskName: '应用文', score: 13, date: '05/25' },
      { taskName: '同步作文', score: 12, date: '05/21' },
      { taskName: '读后续写', score: 10, date: '05/16' },
    ],
    revisionSuggestions: ['强化不规则动词过去式记忆', '检查 be 动词时态和数的一致', '完成写作后逐句检查'],
  },
  {
    id: 's-007', name: '周欣怡', averageScore: 12.0, level: 'C',
    mainProblemTypes: ['语言准确性弱', '逻辑衔接弱'],
    typicalSentence: 'She open the box slow. Inside the box, there is a small cat. The cat look at her with big eyes.',
    relatedTasks: ['读后续写练习', '同步作文练习'],
    scoreTrend: 'declining',
    problemDistribution: [
      { type: 'language_accuracy', label: '语言准确性弱', percent: 45 },
      { type: 'logic_cohesion', label: '逻辑衔接弱', percent: 30 },
      { type: 'sentence_monotony', label: '句式单一', percent: 25 },
    ],
    answerSheetImageUrl: '/mock/answer-sheets/zhouxinyi-gift.jpg',
    fullEssayIds: ['essay-007'],
    recentScores: [
      { taskName: '读后续写', score: 12, date: '05/28' },
      { taskName: '同步作文', score: 11, date: '05/24' },
      { taskName: '应用文', score: 14, date: '05/20' },
      { taskName: '书面表达', score: 13, date: '05/17' },
    ],
    revisionSuggestions: ['注意第三人称单数动词变形', '区分形容词和副词用法', '使用连接词增强逻辑'],
  },
  {
    id: 's-008', name: '吴俊杰', averageScore: 11.5, level: 'D',
    mainProblemTypes: ['语言准确性弱', '词汇表达弱'],
    typicalSentence: 'My mother buy a cake for I. My friends come to my home. We play games and sing songs.',
    relatedTasks: ['自定义批改', '书面表达练习'],
    scoreTrend: 'stable',
    problemDistribution: [
      { type: 'language_accuracy', label: '语言准确性弱', percent: 45 },
      { type: 'vocabulary_weak', label: '词汇表达弱', percent: 30 },
      { type: 'content_incomplete', label: '内容不完整', percent: 25 },
    ],
    answerSheetImageUrl: '/mock/answer-sheets/wujunjie-birthday.jpg',
    fullEssayIds: ['essay-008'],
    recentScores: [
      { taskName: '自定义批改', score: 11, date: '05/27' },
      { taskName: '同步作文', score: 12, date: '05/23' },
      { taskName: '书面表达', score: 10, date: '05/19' },
    ],
    revisionSuggestions: ['加强时态统一训练', '注意人称代词的正确形式', '丰富事件描述细节'],
  },
  {
    id: 's-012', name: '马天宇', averageScore: 11.0, level: 'D',
    mainProblemTypes: ['格式规范问题', '内容不完整'],
    typicalSentence: 'There will be a basketball game on Friday. Everyone should come.',
    relatedTasks: ['应用文单元测', '应用文：建议信'],
    scoreTrend: 'stable',
    problemDistribution: [
      { type: 'format_issue', label: '格式规范问题', percent: 55 },
      { type: 'content_incomplete', label: '内容不完整', percent: 30 },
      { type: 'language_accuracy', label: '语言准确性弱', percent: 15 },
    ],
    answerSheetImageUrl: '/mock/answer-sheets/matianyu-notice.jpg',
    fullEssayIds: ['essay-012'],
    recentScores: [
      { taskName: '应用文单元测', score: 10, date: '05/28' },
      { taskName: '应用文写作', score: 11, date: '05/23' },
      { taskName: '同步作文', score: 12, date: '05/18' },
    ],
    revisionSuggestions: ['熟悉通知类应用文格式', '写作前列出要点清单', '完成后检查格式要素'],
  },
]

// ═══════════════════════════════════════════════════════════
// 5. Excellent Writings (5+ pieces)
// ═══════════════════════════════════════════════════════════

export const MOCK_EXCELLENT_WRITINGS: ExcellentWriting[] = [
  {
    id: 'ew-001', studentId: 's-009', studentName: '林小雨',
    essayTitle: 'A Letter of Invitation', taskName: 'Unit3 应用文写作',
    writingType: 'practical', score: 18, level: 'A',
    highlights: '格式规范完整，语气礼貌得体，内容要点齐全且逻辑清晰。',
    excerpt: 'Dear Li Hua,\n\nI would like to invite you to my birthday party this Saturday, June 5th, at my home. The party will start at 2pm. We will have a barbecue in the garden and play some fun games afterwards...',
    fullEssayId: 'essay-009',
    answerSheetImageUrl: '/mock/answer-sheets/linxiaoyu-excellent.jpg',
  },
  {
    id: 'ew-002', studentId: 's-011', studentName: '杨雪',
    essayTitle: 'An Unexpected Gift', taskName: '读后续写练习',
    writingType: 'continuation', score: 19, level: 'A',
    highlights: '情节衔接自然，心理描写细腻，结尾情感升华到位，语言准确流畅。',
    excerpt: 'The small box sat on her desk, wrapped in faded brown paper. Her hands trembled as she carefully untied the string. Inside, she found a worn leather journal — her grandmother\'s handwriting filled every page. Tears welled up in her eyes...',
    fullEssayId: 'essay-017',
    answerSheetImageUrl: '/mock/answer-sheets/yangxue-continuation.jpg',
  },
  {
    id: 'ew-003', studentId: 'g-004', studentName: '孙佳琪',
    essayTitle: 'My Dream Job', taskName: '书面表达练习',
    writingType: 'comprehensive_expression', score: 18, level: 'A',
    highlights: '语言地道，词汇丰富准确，逻辑结构清晰，有个人见解。',
    excerpt: 'Ever since I was a child, I have been fascinated by the idea of becoming a doctor. Not only would this career allow me to help others, but it would also challenge me intellectually every single day...',
    fullEssayId: 'essay-018',
    answerSheetImageUrl: '/mock/answer-sheets/sunjiaqi-dream.jpg',
  },
  {
    id: 'ew-004', studentId: 'g-001', studentName: '杨雨桐',
    essayTitle: 'My Favorite Season', taskName: '同步作文练习',
    writingType: 'sync_composition', score: 17, level: 'B+',
    highlights: '段落结构清晰，细节描写生动，使用了丰富的形容词和比喻。',
    excerpt: 'Autumn paints the world in shades of gold and crimson. Walking through the park, the crisp air fills my lungs and the rustling leaves dance beneath my feet. There is something magical about this season...',
    fullEssayId: 'essay-019',
    answerSheetImageUrl: '/mock/answer-sheets/yangyutong-autumn.jpg',
  },
  {
    id: 'ew-005', studentId: 'g-003', studentName: '黄子轩',
    essayTitle: 'A Letter of Advice', taskName: '应用文单元测',
    writingType: 'practical', score: 17, level: 'B+',
    highlights: '建议具体可行，语气友善恰当，格式完整，段落组织清晰。',
    excerpt: 'Dear Tom,\n\nI was sorry to hear that you\'ve been struggling with English lately. Please don\'t be discouraged — here are some suggestions that might help.\n\nFirstly, why not try watching English movies with subtitles?...',
    fullEssayId: 'essay-010',
    answerSheetImageUrl: '/mock/answer-sheets/huangzixuan-excellent.jpg',
  },
]

// ═══════════════════════════════════════════════════════════
// 6. Recommended Writing Resources (6+)
// ═══════════════════════════════════════════════════════════

export const MOCK_RECOMMENDED_RESOURCES: RecommendedWritingResource[] = [
  {
    id: 'wr-001', title: '应用文格式专项练习 — 书信类',
    resourceType: '专项练习', tags: ['应用文', '格式', '书信'],
    questionCount: 5, duration: '30分钟', difficulty: 'basic', grade: '初一',
    source: '教研组题库', recommendReason: '针对班级普遍存在的书信格式问题设计，覆盖邀请信、建议信、感谢信等常见类型。',
    canPreview: true, canAssign: true, canAddToPaperBasket: true,
  },
  {
    id: 'wr-002', title: '段落结构训练 — 开头·主体·结尾',
    resourceType: '专项练习', tags: ['结构', '段落', '组织'],
    questionCount: 8, duration: '40分钟', difficulty: 'medium', grade: '初一',
    source: '教研组题库', recommendReason: '帮助学生建立清晰的写作框架，通过练习逐步掌握三段式结构。',
    canPreview: true, canAssign: true, canAddToPaperBasket: true,
  },
  {
    id: 'wr-003', title: '语法准确性写作练习 — 常见错误纠正',
    resourceType: '专项练习', tags: ['语法', '纠错', '准确性'],
    questionCount: 12, duration: '35分钟', difficulty: 'medium', grade: '初一',
    source: '精品题库', recommendReason: '基于班级真实写作错误设计，覆盖主谓一致、时态、名词单复数等高频问题。',
    canPreview: true, canAssign: true, canAddToPaperBasket: true,
  },
  {
    id: 'wr-004', title: '词汇表达升级训练 — 告别 boring words',
    resourceType: '专项练习', tags: ['词汇', '表达', '同义替换'],
    questionCount: 10, duration: '25分钟', difficulty: 'medium', grade: '初一',
    source: '精品题库', recommendReason: '帮助学生用更精准、丰富的词汇替代高频重复的基础词，提升表达质量。',
    canPreview: true, canAssign: true, canAddToPaperBasket: true,
  },
  {
    id: 'wr-005', title: '句式丰富训练 — 从简单句到复合句',
    resourceType: '专项练习', tags: ['句式', '复合句', '衔接'],
    questionCount: 8, duration: '30分钟', difficulty: 'advanced', grade: '初一',
    source: '教研组题库', recommendReason: '引导学生从简单句过渡到多样化复合句，提升写作的语言层次感。',
    canPreview: true, canAssign: true, canAddToPaperBasket: true,
  },
  {
    id: 'wr-006', title: '读后续写 — 情节衔接专项训练',
    resourceType: '专项练习', tags: ['读后续写', '衔接', '情节'],
    questionCount: 6, duration: '45分钟', difficulty: 'advanced', grade: '初一',
    source: '精品题库', recommendReason: '针对读后续写中学生情节衔接不自然的问题，通过拆解练习提升续写能力。',
    canPreview: true, canAssign: true, canAddToPaperBasket: true,
  },
  {
    id: 'wr-007', title: '应用文通知类专项训练',
    resourceType: '专项练习', tags: ['应用文', '通知', '格式'],
    questionCount: 4, duration: '20分钟', difficulty: 'basic', grade: '初一',
    source: '教研组题库', recommendReason: '针对班级部分学生通知类应用文格式不规范的问题设计专项训练。',
    canPreview: true, canAssign: true, canAddToPaperBasket: true,
  },
]

// ═══════════════════════════════════════════════════════════
// 7. Generated Sample Essays (3 levels)
// ═══════════════════════════════════════════════════════════

export const MOCK_GENERATED_SAMPLES: GeneratedSample[] = [
  {
    id: 'gs-001', level: 'basic',
    title: 'A Letter to a Pen Pal（基础版）',
    content: 'Dear Tom,\n\nMy name is Li Hua. I am 13 years old. I live in Beijing. I study at No.1 Middle School.\n\nI like playing basketball and reading books. My favorite subject is English. I also enjoy listening to music in my free time.\n\nWhat about you? What do you like to do after school? Please write back soon.\n\nBest wishes,\nLi Hua',
    highlights: '使用基础词汇和简单句，结构清晰三段式，适合词汇量有限的学生模仿。',
    suitableFor: 'D/C 等级学生（averageScore < 13）',
    editable: true,
  },
  {
    id: 'gs-002', level: 'improved',
    title: 'A Letter to a Pen Pal（提升版）',
    content: 'Dear Tom,\n\nI\'m writing to introduce myself and hopefully become your pen pal. My name is Li Hua and I\'m a 13-year-old student from Beijing, China.\n\nIn my spare time, I\'m really into playing basketball — I practice with my teammates every Friday after school. When the weather isn\'t great, I enjoy reading adventure novels. I find that reading not only relaxes me but also helps improve my English vocabulary.\n\nI would love to learn more about your life in America. What kind of music do you listen to? Do you play any sports?\n\nLooking forward to hearing from you soon!\n\nYours sincerely,\nLi Hua',
    highlights: '使用复合句、连接词和进阶词汇，内容丰富且有细节支撑，语气自然友好。',
    suitableFor: 'B/C 等级学生（averageScore 13-16）',
    editable: true,
  },
  {
    id: 'gs-003', level: 'excellent',
    title: 'A Letter to a Pen Pal（优秀版）',
    content: 'Dear Tom,\n\nI\'m absolutely thrilled to be writing to you as your new pen pal! My name is Li Hua, and I\'m a 13-year-old eighth-grader attending No.1 Middle School in Beijing — a city that beautifully blends ancient tradition with modern life.\n\nWhen it comes to hobbies, basketball is my greatest passion. There is nothing quite like the adrenaline rush of a fast break or the satisfaction of sinking a three-pointer. I\'m also an avid reader, particularly drawn to adventure novels and historical fiction. Through reading, I\'ve discovered that words have the power to transport us to entirely different worlds.\n\nI\'m genuinely curious about your world across the ocean. What does a typical day look like for you? What music gets you through a tough study session?\n\nEagerly awaiting your reply!\n\nWarmest regards,\nLi Hua',
    highlights: '语言地道自然，使用了高级词汇、习惯搭配和修辞手法，情感表达细腻，句式丰富多变。',
    suitableFor: 'A/B+ 等级学生（averageScore 16+）',
    editable: true,
  },
]

// ═══════════════════════════════════════════════════════════
// 8. Intervention Records
// ═══════════════════════════════════════════════════════════

export const MOCK_WRITING_INTERVENTION_RECORDS: WritingInterventionRecord[] = [
  {
    id: 'wir-001', time: '2026-05-30 16:00',
    type: 'essay_revision', name: 'Unit3 应用文作文订正',
    relatedProblemTypes: ['结构不清', '格式规范问题'],
    target: '薄弱学生（6人）',
    status: '已完成',
    summary: '6名学生对Unit3应用文写作进行了修改润色，提交了订正版作文。',
    effectSummary: {
      beforeAverageScore: 10.8,
      afterAverageScore: 14.2,
      problemReductionRate: 35,
      improvedStudents: 5,
      stillNeedAttention: 1,
      suggestion: '5名学生有明显进步，张晓明的结构问题改善较大但仍需持续关注，建议下次写作任务时重点检查其提纲。',
    },
  },
  {
    id: 'wir-002', time: '2026-05-28 10:00',
    type: 'resource_assigned', name: '段落结构训练 + 语法准确性练习',
    relatedProblemTypes: ['结构不清', '语言准确性弱'],
    target: '初一 1 班（全班）',
    status: '已完成',
    summary: '布置了两份专项写作练习，全班20人按时完成。',
    effectSummary: {
      beforeAverageScore: 12.1,
      afterAverageScore: 14.8,
      problemReductionRate: 28,
      improvedStudents: 14,
      stillNeedAttention: 6,
      suggestion: '整体平均分提升2.7分，结构问题改善明显，但仍有6名学生在语法准确性方面需要额外关注。',
    },
  },
  {
    id: 'wir-003', time: '2026-05-25 14:30',
    type: 'sample_generated', name: '范文生成 — 应用文书信3篇',
    relatedProblemTypes: ['格式规范问题', '词汇表达弱'],
    target: '初一 1 班（全班）',
    status: '已完成',
    summary: '生成了基础版、提升版、优秀版3篇应用文范文，已作为参考示例发给全班。',
    effectSummary: {
      beforeAverageScore: 11.5,
      afterAverageScore: 13.9,
      problemReductionRate: 22,
      improvedStudents: 12,
      stillNeedAttention: 8,
      suggestion: '范文参考对中低分段学生效果较为明显，后续建议结合作文订正针对薄弱学生进行个别辅导。',
    },
  },
  {
    id: 'wir-004', time: '2026-05-20 09:00',
    type: 'resource_assigned', name: '读后续写情节衔接训练',
    relatedProblemTypes: ['逻辑衔接弱', '内容不完整'],
    target: '读后续写薄弱学生（5人）',
    status: '部分完成',
    summary: '2/3任务完成，3人提交了练习，2人未提交。',
    effectSummary: {
      beforeAverageScore: 10.2,
      afterAverageScore: 12.5,
      problemReductionRate: 18,
      improvedStudents: 3,
      stillNeedAttention: 2,
      suggestion: '完成的学生有进步，但2人未完成需单独沟通了解原因，建议将练习拆分为更小的任务。',
    },
  },
]

// ═══════════════════════════════════════════════════════════
// 9. Full WritingInsightData
// ═══════════════════════════════════════════════════════════

export const MOCK_WRITING_INSIGHT: WritingInsightData = {
  classId: 'class-7-3',
  className: '初一 1 班',
  unitId: 'unit-3',
  unitName: 'Unit 3 — Writing',
  timeRange: '7d',
  updatedAt: '今天 10:30',
  summary: '近 7 天批改了 24 篇作文，结构不清是最大问题（38%），其次是语言准确性弱（28%）。12 名学生写作表现偏弱，建议优先给薄弱学生布置作文订正，同时推荐结构训练和语法写作练习，并生成 3 篇不同层次范文供全班参考。',
  metrics: {
    averageScore: 12.5,
    averageLevel: 'C+',
    reviewedEssayCount: 24,
    mainProblemType: '结构不清 / 段落组织弱',
    weakStudentCount: 12,
    excellentEssayCount: 5,
  },
  problemTypes: MOCK_PROBLEM_TYPES,
  highFrequencyIssues: MOCK_HIGH_FREQUENCY_ISSUES,
  weakStudents: MOCK_WEAK_WRITING_STUDENTS,
  excellentWritings: MOCK_EXCELLENT_WRITINGS,
  recommendedResources: MOCK_RECOMMENDED_RESOURCES,
  generatedSamples: MOCK_GENERATED_SAMPLES,
  interventionRecords: MOCK_WRITING_INTERVENTION_RECORDS,
}

// ═══════════════════════════════════════════════════════════
// 10. Mock Action Handlers
// ═══════════════════════════════════════════════════════════

export function mockOpenEssayRevision(context: Record<string, unknown>): { message: string; context: Record<string, unknown> } {
  return {
    message: '已打开教师端已有作文订正功能，并带入当前写作问题上下文。',
    context,
  }
}

export function mockOpenFullEssay(essayId: string): { message: string; essayId: string } {
  return {
    message: `已打开完整作文查看（${essayId}）`,
    essayId,
  }
}

export function mockOpenAnswerSheet(url: string): { message: string; url: string } {
  return {
    message: `已打开答题卡原图（来源：学生答题卡）`,
    url,
  }
}

export function markAsReferenceEssay(item: { id: string; studentName: string }): { message: string } {
  return {
    message: `已将 ${item.studentName} 的作文标记为范文参考`,
  }
}

export function mockOpenSampleEssayGenerator(): { message: string } {
  return {
    message: '已打开范文生成器，将根据当前写作问题生成 3 篇不同层次范文。',
  }
}

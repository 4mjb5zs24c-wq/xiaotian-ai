/**
 * Knowledge Documents —— 教学知识库文档
 *
 * 所有教学知识文档集中定义在这里。
 * 系统启动时自动 upsert 到 vector adapter。
 *
 * 未来扩展：
 *   - 导入教材教师用书
 *   - 导入历年真题
 *   - 导入校本资料
 *   - 教师自定义笔记
 */

import type { KnowledgeDocument } from '../vector/types'

// ── Teaching Syllabus ──────────────────────────────────

const syllabusDocs: KnowledgeDocument[] = [
  {
    id: 'syl-u3-food',
    content: '人教版七年级上 Unit 3 Food and Drinks 教学重点：食物与饮品类词汇（20个核心词）、可数/不可数名词的区分、There be 句型的基本结构。难点：many/much 的搭配使用、some/any 的语境选择。',
    metadata: { subject: 'english', grade: '七年级上', unit: 'Unit 3', source: 'teacher-book', type: 'syllabus' },
    embedding: [], namespace: 'syllabus', tags: ['七年级', 'Unit 3', '食物', '语法', '名词'],
    createdAt: Date.now(), importance: 0.95,
  },
  {
    id: 'syl-u3-grammar',
    content: 'Unit 3 语法点：可数名词可加 a/an、有复数形式（apples, bananas）；不可数名词不能加 a/an、无复数（water, milk, rice）。There is + 不可数/单数可数，There are + 复数可数。',
    metadata: { subject: 'english', grade: '七年级上', unit: 'Unit 3', source: 'teacher-book', type: 'grammar' },
    embedding: [], namespace: 'syllabus', tags: ['语法', '可数名词', '不可数名词', 'There be'],
    createdAt: Date.now(), importance: 0.90,
  },
  {
    id: 'syl-u2-family',
    content: '人教版七年级上 Unit 2 My Family 教学重点：家庭成员词汇（father, mother, brother, sister 等10个）、名词所有格（\'s）、人称代词的主格与宾格。',
    metadata: { subject: 'english', grade: '七年级上', unit: 'Unit 2', source: 'teacher-book', type: 'syllabus' },
    embedding: [], namespace: 'syllabus', tags: ['七年级', 'Unit 2', '家庭', '代词'],
    createdAt: Date.now(), importance: 0.90,
  },
  {
    id: 'syl-u4-animals',
    content: '人教版七年级上 Unit 4 Animals 教学重点：动物类词汇（15个）、形容词的用法、祈使句的基本结构。难点：形容词比较级的初步引入。',
    metadata: { subject: 'english', grade: '七年级上', unit: 'Unit 4', source: 'teacher-book', type: 'syllabus' },
    embedding: [], namespace: 'syllabus', tags: ['七年级', 'Unit 4', '动物', '形容词'],
    createdAt: Date.now(), importance: 0.85,
  },
]

// ── Teaching Strategies ────────────────────────────────

const strategyDocs: KnowledgeDocument[] = [
  {
    id: 'strat-vocab-category',
    content: '词汇分类记忆法：将相关词汇按类别分组教学，效率比逐一讲解高40%。例如食物类分水果/蔬菜/饮品/主食四组。配合图片、实物和分类竞赛游戏效果最佳。适合词汇量在15-25个的新授课。',
    metadata: { subject: 'english', grade: '通用', source: 'method-library', type: 'strategy' },
    embedding: [], namespace: 'strategy', tags: ['词汇', '分类', '记忆', '教学方法'],
    createdAt: Date.now(), importance: 0.85,
  },
  {
    id: 'strat-listening-3step',
    content: '听力三步训练法：Step1 听前预测（1分钟，看题圈关键词）→ Step2 听中笔记（3分钟，只记数字和关键词）→ Step3 听后核对（2分钟，对比答案找原因）。特别适合数字信息捕捉薄弱的学生。',
    metadata: { subject: 'english', grade: '通用', source: 'method-library', type: 'strategy' },
    embedding: [], namespace: 'strategy', tags: ['听力', '三步法', '数字', '训练'],
    createdAt: Date.now(), importance: 0.80,
  },
  {
    id: 'strat-writing-step',
    content: '写作阶梯训练法：从50词短文开始，每两周增加20词要求。第一阶段只要求内容完整，第二阶段要求句式多样，第三阶段要求逻辑连贯。配合同伴互评和AI批注，效果显著。',
    metadata: { subject: 'english', grade: '通用', source: 'method-library', type: 'strategy' },
    embedding: [], namespace: 'strategy', tags: ['写作', '阶梯', '训练', '方法'],
    createdAt: Date.now(), importance: 0.80,
  },
  {
    id: 'strat-differentiated',
    content: '分层教学策略：将班级按英语水平分为A/B/C三层。A层（前25%）增加拓展阅读和写作；B层（中50%）夯实基础和语法；C层（后25%）重点突破词汇和简单句型。每层配套不同难度的练习。',
    metadata: { subject: 'english', grade: '通用', source: 'method-library', type: 'strategy' },
    embedding: [], namespace: 'strategy', tags: ['分层', '教学', '差异化', '班级管理'],
    createdAt: Date.now(), importance: 0.85,
  },
]

// ── Common Errors ──────────────────────────────────────

const errorDocs: KnowledgeDocument[] = [
  {
    id: 'err-countable',
    content: '七年级高频语法错误 TOP1：可数/不可数名词混淆。典型错误："many water"（应为 much water）、"a bread"（应为 a piece of bread）。全班错误率约43%。建议用实物对比+分类练习强化。',
    metadata: { subject: 'english', grade: '七年级上', source: 'analytics', type: 'common_error' },
    embedding: [], namespace: 'common_error', tags: ['可数名词', '不可数名词', '高频错误', '语法'],
    createdAt: Date.now(), importance: 0.95,
  },
  {
    id: 'err-tense',
    content: '七年级高频语法错误 TOP2：一般现在时第三人称单数。典型错误："He go to school"（应为 goes）。全班错误率约35%。建议用"三单加s"口诀配合20题专项训练。',
    metadata: { subject: 'english', grade: '七年级上', source: 'analytics', type: 'common_error' },
    embedding: [], namespace: 'common_error', tags: ['三单', '时态', '高频错误', '语法'],
    createdAt: Date.now(), importance: 0.90,
  },
  {
    id: 'err-spelling-food',
    content: 'Unit 3 食物类词汇常见拼写错误：restaurant 常拼为 resturant（遗漏 a），delicious 常拼为 delicous（遗漏 i），sandwich 常拼为 sandwitch（d/t混淆）。建议用音节拆分法教学。',
    metadata: { subject: 'english', grade: '七年级上', unit: 'Unit 3', source: 'analytics', type: 'common_error' },
    embedding: [], namespace: 'common_error', tags: ['拼写', '食物', 'Unit 3', '易错'],
    createdAt: Date.now(), importance: 0.90,
  },
  {
    id: 'err-reading-mainidea',
    content: '阅读理解主旨推断题错误率42%（全班最高）。学生能看懂句子但不会提炼段落核心。建议教授"主题句定位法"：先读首尾句→找重复关键词→用一句话概括。配合每日5分钟限时阅读训练。',
    metadata: { subject: 'english', grade: '七年级上', source: 'analytics', type: 'common_error' },
    embedding: [], namespace: 'common_error', tags: ['阅读', '主旨', '解题方法', '训练'],
    createdAt: Date.now(), importance: 0.95,
  },
]

// ── Exam Knowledge ─────────────────────────────────────

const examDocs: KnowledgeDocument[] = [
  {
    id: 'exam-zk-reading',
    content: '中考英语阅读理解题型分布：主旨大意题（25%）、细节理解题（35%）、词义猜测题（15%）、推理判断题（25%）。建议按题型专项训练，先攻克占比最高的细节理解题，再训练主旨和推理。',
    metadata: { subject: 'english', grade: '中考', source: 'exam-bank', type: 'exam' },
    embedding: [], namespace: 'exam', tags: ['中考', '阅读', '题型', '策略'],
    createdAt: Date.now(), importance: 0.80,
  },
  {
    id: 'exam-zk-writing',
    content: '中考英语作文评分标准：内容完整（4分）、语言准确（3分）、逻辑连贯（2分）、书写规范（1分）。常见扣分点：时态不一致、中式英语、字数不足。建议背诵万能开头结尾句型各3句。',
    metadata: { subject: 'english', grade: '中考', source: 'exam-bank', type: 'exam' },
    embedding: [], namespace: 'exam', tags: ['中考', '写作', '评分', '模板'],
    createdAt: Date.now(), importance: 0.75,
  },
]

// ── Aggregated ─────────────────────────────────────────

export const allKnowledgeDocuments: KnowledgeDocument[] = [
  ...syllabusDocs,
  ...strategyDocs,
  ...errorDocs,
  ...examDocs,
]

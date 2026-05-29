/**
 * Resource Adapter — 业务资源适配器
 *
 * 将 AI 搜索连接到真实教学资源库。
 * AI 层通过此 adapter 获取业务资源，不直接依赖资源系统。
 */

import type { BusinessResource, ResourceAdapter, ResourceSearchContext, ResourcePreview, PracticeOptions } from './types'
import { buildRecommendationReason } from './recommendationEngine'

// ── Mock Business Resources (未来：真实 API) ──────────

const businessResources: BusinessResource[] = [
  {
    id: 'br-1', title: 'Unit 3 重点词汇默写（20词）', type: 'vocabulary',
    grade: '八年级上', unit: 'Unit 3', textbook: '人教版',
    difficulty: 'medium', duration: '10分钟', format: 'PDF',
    description: '基于Unit 3高频错词的词汇默写练习。含中译英20题，附答题卡和教师答案。',
    tags: ['词汇', '默写', 'Unit 3', '高频'],
    preview: { type: 'list', summary: '20题中译英词汇默写', items: [
      { label: '第1题', value: '餐厅 → ________' },
      { label: '第2题', value: '美味的 → ________' },
      { label: '第3题', value: '蔬菜 → ________' },
    ], stats: [{ label: '题量', value: '20题' }, { label: '满分', value: '100分' }] },
    matchesContext: true,
    aiReason: { short: '', detail: '', factors: [] },
    canAddToBasket: true, canMakeCard: true, canAssign: true,
  },
  {
    id: 'br-2', title: 'Unit 3 同步练习（可数/不可数名词）', type: 'sync_practice',
    grade: '八年级上', unit: 'Unit 3', textbook: '人教版',
    difficulty: 'medium', duration: '15分钟', format: '在线',
    description: '针对班级薄弱点（可数/不可数名词错误率43%）设计的同步练习。30道选择题+填空。',
    tags: ['语法', '名词', '同步', '弱项'],
    preview: { type: 'stats', summary: '30题语法练习', stats: [
      { label: '选择题', value: '20题' }, { label: '填空题', value: '10题' }, { label: '预计用时', value: '15分钟' },
    ]},
    matchesContext: true,
    aiReason: { short: '', detail: '', factors: [] },
    canAddToBasket: true, canMakeCard: false, canAssign: true,
  },
  {
    id: 'br-3', title: '广东中考听说模拟（Unit 3 主题）', type: 'speaking',
    grade: '八年级上', unit: 'Unit 3', textbook: '通用',
    difficulty: 'advanced', duration: '20分钟', format: '在线',
    description: '模拟广东中考人机对话考试流程。朗读短文+情景问答+口头作文，含AI评分。',
    tags: ['听说', '中考', '广东', '模拟'],
    preview: { type: 'list', summary: '3部分听说模拟', items: [
      { label: 'Part 1', value: '朗读短文（1分钟准备）' },
      { label: 'Part 2', value: '情景问答（5题）' },
      { label: 'Part 3', value: '口头作文（1分钟）' },
    ]},
    matchesContext: true,
    aiReason: { short: '', detail: '', factors: [] },
    canAddToBasket: true, canMakeCard: false, canAssign: true,
  },
  {
    id: 'br-4', title: 'Food Culture 时文阅读（Unit 3 拓展）', type: 'reading',
    grade: '八年级上', unit: 'Unit 3', textbook: '通用',
    difficulty: 'medium', duration: '12分钟', format: 'PDF',
    description: '关于世界早餐文化的英语时文（280词），含5道阅读理解和词汇表。',
    tags: ['阅读', '时文', '文化', '拓展'],
    preview: { type: 'text', summary: '280词时文阅读 + 5道阅读理解题' },
    matchesContext: true,
    aiReason: { short: '', detail: '', factors: [] },
    canAddToBasket: true, canMakeCard: false, canAssign: true,
  },
  {
    id: 'br-5', title: 'Unit 3 课堂 PK（词汇竞赛）', type: 'classroom_pk',
    grade: '八年级上', unit: 'Unit 3', textbook: '人教版',
    difficulty: 'basic', duration: '8分钟', format: '在线',
    description: '全班参与的词汇竞赛游戏。看中文选英文，限时答题，实时排名。适合课前热身。',
    tags: ['PK', '词汇', '游戏', '热身'],
    preview: { type: 'stats', summary: '限时词汇竞赛', stats: [
      { label: '题型', value: '中文→英文选择' }, { label: '时长', value: '8分钟' },
    ]},
    matchesContext: true,
    aiReason: { short: '', detail: '', factors: [] },
    canAddToBasket: true, canMakeCard: false, canAssign: true,
  },
  {
    id: 'br-6', title: 'Unit 3 听力训练（数字信息专项）', type: 'listening',
    grade: '八年级上', unit: 'Unit 3', textbook: '通用',
    difficulty: 'medium', duration: '10分钟', format: 'MP3+PDF',
    description: '针对班级听力弱项（数字信息捕捉）的专项训练。含价格、数量、时间的听辨练习。',
    tags: ['听力', '数字', '专项', '弱项'],
    preview: { type: 'list', summary: '数字信息听辨专项', items: [
      { label: 'Section A', value: '价格听辨（5题）' },
      { label: 'Section B', value: '数量听辨（5题）' },
      { label: 'Section C', value: '时间听辨（5题）' },
    ]},
    matchesContext: true,
    aiReason: { short: '', detail: '', factors: [] },
    canAddToBasket: true, canMakeCard: false, canAssign: true,
  },
  {
    id: 'br-7', title: 'Unit 3 单词配音（Food 主题）', type: 'dubbing',
    grade: '八年级上', unit: 'Unit 3', textbook: '通用',
    difficulty: 'basic', duration: '5分钟', format: '在线',
    description: '食物主题的英语配音片段。学生跟读原声，AI评分发音、流利度和完整度。',
    tags: ['配音', '口语', '趣味', '食物'],
    preview: { type: 'text', summary: '3段食物主题配音片段，AI发音评分' },
    matchesContext: true,
    aiReason: { short: '', detail: '', factors: [] },
    canAddToBasket: true, canMakeCard: false, canAssign: true,
  },
  {
    id: 'br-8', title: 'Unit 3 单元测验卷（期中复习版）', type: 'exam_paper',
    grade: '八年级上', unit: 'Unit 3', textbook: '人教版',
    difficulty: 'medium', duration: '45分钟', format: 'PDF',
    description: 'Unit 3 完整测验卷。听力20分+单选20分+完形15分+阅读20分+词汇10分+写作15分。含答案。',
    tags: ['试卷', '单元', '期中', '综合'],
    preview: { type: 'stats', summary: '满分100分 · 45分钟', stats: [
      { label: '听力', value: '20分' }, { label: '单选', value: '20分' },
      { label: '完形', value: '15分' }, { label: '阅读+写作', value: '35分' },
    ]},
    matchesContext: true,
    aiReason: { short: '', detail: '', factors: [] },
    canAddToBasket: true, canMakeCard: true, canAssign: true,
  },
  {
    id: 'br-9', title: '七年级上 Unit 2 课前导入视频', type: 'themed_video',
    grade: '七年级上', unit: 'Unit 2', textbook: '人教版',
    difficulty: 'basic', duration: '5分钟', format: 'MP4',
    description: '家庭主题的英语动画短片。介绍家庭成员词汇，适合Unit 2课前导入。',
    tags: ['视频', '导入', '家庭', '动画'],
    preview: { type: 'text', summary: '5分钟英语动画 · 家庭主题词汇导入' },
    matchesContext: false,
    aiReason: { short: '', detail: '', factors: [] },
    canAddToBasket: true, canMakeCard: false, canAssign: false,
  },
  {
    id: 'br-10', title: '中考完形填空专项训练（20篇）', type: 'reading',
    grade: '中考', unit: '-', textbook: '通用',
    difficulty: 'advanced', duration: '每篇10分钟', format: 'PDF',
    description: '20篇中考难度完形填空，按难度分级。每篇附答案、解析和解题技巧。',
    tags: ['中考', '完形', '专项', '真题'],
    preview: { type: 'stats', summary: '20篇 · 分级训练', stats: [
      { label: '基础篇', value: '8篇' }, { label: '进阶篇', value: '7篇' }, { label: '冲刺篇', value: '5篇' },
    ]},
    matchesContext: false,
    aiReason: { short: '', detail: '', factors: [] },
    canAddToBasket: true, canMakeCard: false, canAssign: true,
  },
]

// ── Inject AI reasons into all resources ──────────────
// In production, this would be done at query time with real context
businessResources.forEach((r) => {
  r.aiReason = buildRecommendationReason(r)
})

// ── Adapter Implementation ─────────────────────────────

export const resourceAdapter: ResourceAdapter = {
  async searchResources(query: string, ctx: ResourceSearchContext): Promise<BusinessResource[]> {
    const q = query.toLowerCase()

    const scored = businessResources.map((r) => {
      let score = 0
      if (r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)) score += 5
      for (const tag of r.tags) { if (q.includes(tag)) score += 3 }
      if (r.grade === ctx.grade || r.grade === '通用') score += r.grade === ctx.grade ? 4 : 1
      if (r.unit === ctx.unit) score += 4
      if (r.textbook === ctx.textbook || r.textbook === '通用') score += 2
      // Boost for weak point match
      if (ctx.weakPoints.some(wp => r.tags.some(t => t.includes(wp.split('的')[0]) || wp.includes(t)))) score += 3
      return { resource: r, score }
    })

    return scored
      .filter(s => s.score > 1)
      .sort((a, b) => b.score - a.score)
      .map(s => s.resource)
      .slice(0, 10)
  },

  async getResourceDetail(id: string): Promise<BusinessResource | null> {
    return businessResources.find(r => r.id === id) || null
  },

  async getResourcePreview(id: string): Promise<ResourcePreview | null> {
    const r = businessResources.find(r => r.id === id)
    return r?.preview || null
  },

  async generatePracticeFromResource(resourceId: string, _options: PracticeOptions): Promise<BusinessResource> {
    const original = businessResources.find(r => r.id === resourceId)
    if (!original) throw new Error('Resource not found')
    return { ...original, id: `generated-${Date.now()}`, title: `${original.title}（自定义版）` }
  },
}

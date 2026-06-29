/**
 * AI Search V1.1 — Mock Data Sources
 *
 * Each function returns mock data independently.
 * When real APIs are available, replace the function body
 * WITHOUT changing the caller or render layer.
 */

import type {
  ResourceItem,
  ResourceGroup,
  SyncVocabData,
  FunctionEntry,
  SearchContext,
} from './types'

// ═══════════════════════════════════════════════════════════
// 1. 我的答题卡
// ═══════════════════════════════════════════════════════════

export function getMyAnswerCards(_ctx: SearchContext): ResourceItem[] {
  return [
    {
      id: 'my-card-1',
      title: 'Unit 3 词汇听写答题卡',
      type: 'function',
      tags: ['答题卡', '词汇', 'Unit 3'],
      difficulty: 'basic',
      grade: '七年级上',
      source: '自建',
      isCurrentUnit: true,
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '与当前教学进度一致，可直接使用',
    },
    {
      id: 'my-card-2',
      title: '期中阶段测试答题卡',
      type: 'function',
      tags: ['答题卡', '阶段测试'],
      difficulty: 'medium',
      grade: '七年级上',
      source: '自建',
      isCurrentUnit: false,
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '适合阶段检测使用',
    },
    {
      id: 'my-card-3',
      title: '阅读理解专项答题卡',
      type: 'function',
      tags: ['答题卡', '阅读'],
      difficulty: 'medium',
      grade: '七年级上',
      source: '自建',
      isCurrentUnit: false,
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '用于纸笔阅读练习',
    },
    {
      id: 'my-card-4',
      title: 'Unit 2 课文默写答题卡',
      type: 'function',
      tags: ['答题卡', '课文', 'Unit 2'],
      difficulty: 'basic',
      grade: '七年级上',
      source: '自建',
      isCurrentUnit: false,
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '复习 Unit 2 时可复用',
    },
  ]
}

export function buildMyAnswerCardGroup(cards: ResourceItem[]): ResourceGroup {
  return {
    groupId: 'my_answer_cards',
    groupName: cards.length > 0 ? '我的答题卡' : '',
    groupType: 'my_content',
    isPrimaryMatch: true,
    defaultExpanded: true,
    recommendationText:
      cards.length > 0
        ? '以下为你的答题卡，可直接布置或下载使用'
        : undefined,
    items: cards.slice(0, 3), // Default show top 3
    displayLimit: 3,
    matchCategory: 'function',
  }
}

// ═══════════════════════════════════════════════════════════
// 2. 我的词表
// ═══════════════════════════════════════════════════════════

export function getMyWordLists(_ctx: SearchContext): ResourceItem[] {
  return [
    {
      id: 'my-wordlist-1',
      title: 'Unit 3 词汇表',
      type: 'function',
      tags: ['词表', '词条', 'Unit 3'],
      difficulty: 'basic',
      grade: '七年级上',
      source: '自建',
      isCurrentUnit: true,
      questionCount: 45,
      canPreview: false,
      canAssign: false,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '与当前单元教学进度一致',
    },
    {
      id: 'my-wordlist-2',
      title: '高频错词复习表',
      type: 'function',
      tags: ['词表', '词条', '错词', '复习'],
      difficulty: 'medium',
      grade: '七年级上',
      source: '系统生成',
      isCurrentUnit: false,
      questionCount: 30,
      canPreview: false,
      canAssign: false,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '基于班级错词数据自动生成',
    },
    {
      id: 'my-wordlist-3',
      title: '中考核心词汇表',
      type: 'function',
      tags: ['词表', '词条', '中考', '核心词'],
      difficulty: 'advanced',
      grade: '七年级上',
      source: '自建',
      isCurrentUnit: false,
      questionCount: 120,
      canPreview: false,
      canAssign: false,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '适配中考词汇要求',
    },
  ]
}

export function buildMyWordListGroup(lists: ResourceItem[]): ResourceGroup {
  return {
    groupId: 'my_wordlists',
    groupName: lists.length > 0 ? '我的词表' : '',
    groupType: 'my_content',
    isPrimaryMatch: true,
    defaultExpanded: true,
    recommendationText:
      lists.length > 0
        ? '以下为你创建的词表，可直接用于听写、默写和跟读练习'
        : undefined,
    items: lists.slice(0, 3),
    displayLimit: 3,
    matchCategory: 'function',
  }
}

// ═══════════════════════════════════════════════════════════
// 3. 我的试卷
// ═══════════════════════════════════════════════════════════

export function getMyPapers(_ctx: SearchContext): ResourceItem[] {
  return [
    {
      id: 'my-paper-1',
      title: 'Unit 3 综合检测卷',
      type: 'unit_test',
      tags: ['试卷', '单元检测', 'Unit 3'],
      difficulty: 'medium',
      grade: '七年级上',
      source: '自建',
      isCurrentUnit: true,
      questionCount: 25,
      duration: '40分钟',
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: true,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '与当前单元进度一致',
    },
    {
      id: 'my-paper-2',
      title: '七年级上期中模拟卷',
      type: 'stage_test',
      tags: ['试卷', '期中', '模拟'],
      difficulty: 'medium',
      grade: '七年级上',
      source: '自建',
      isCurrentUnit: false,
      questionCount: 50,
      duration: '90分钟',
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: true,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '适合期中阶段复习检测',
    },
    {
      id: 'my-paper-3',
      title: '词汇与语法专项卷',
      type: 'special',
      tags: ['试卷', '专项', '词汇', '语法'],
      difficulty: 'medium',
      grade: '七年级上',
      source: '自建',
      isCurrentUnit: false,
      questionCount: 30,
      duration: '45分钟',
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: true,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '聚焦词汇与语法专项训练',
    },
    {
      id: 'my-paper-4',
      title: 'Unit 2 单元测试卷',
      type: 'unit_test',
      tags: ['试卷', '单元检测', 'Unit 2'],
      difficulty: 'basic',
      grade: '七年级上',
      source: '自建',
      isCurrentUnit: false,
      questionCount: 20,
      duration: '35分钟',
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: true,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '上一单元复习可用',
    },
    {
      id: 'my-paper-5',
      title: 'Unit 1 基础练习卷',
      type: 'unit_test',
      tags: ['试卷', '单元检测', 'Unit 1'],
      difficulty: 'basic',
      grade: '七年级上',
      source: '自建',
      isCurrentUnit: false,
      questionCount: 15,
      duration: '25分钟',
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: true,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '基础巩固可用',
    },
  ]
}

export function buildMyPaperGroup(papers: ResourceItem[]): ResourceGroup {
  return {
    groupId: 'my_papers',
    groupName: '我的试卷',
    groupType: 'paper',
    isPrimaryMatch: true,
    defaultExpanded: true,
    recommendationText: '以下为你创建或上传的试卷，可直接布置使用',
    items: papers.slice(0, 5),
    displayLimit: 5,
    matchCategory: 'unit_test',
  }
}

// ═══════════════════════════════════════════════════════════
// 4. 同步单元词汇
// ═══════════════════════════════════════════════════════════

export function getUnitVocabularyResources(ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  return [
    {
      id: `unit-vocab-${unit.replace(/\s/g, '-').toLowerCase()}`,
      title: `${unit} 同步词汇`,
      type: 'sync_vocab',
      tags: ['同步词汇', unit],
      difficulty: 'basic',
      grade: ctx.grade || '七年级上',
      source: ctx.textbook || '人教版',
      isCurrentUnit: true,
      questionCount: 45,
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: `与当前教学进度 ${unit} 匹配`,
      contentData: buildMockSyncVocabData(unit),
    },
  ]
}

function buildMockSyncVocabData(_unit: string): SyncVocabData {
  return {
    sections: [
      {
        sectionId: 'vocab',
        sectionName: '词汇',
        items: [
          { id: 'w1', word: 'welcome', chinese: '欢迎', phonetic: '/ˈwelkəm/' },
          { id: 'w2', word: 'class', chinese: '班级；课', phonetic: '/klɑːs/' },
          { id: 'w3', word: 'grade', chinese: '年级', phonetic: '/ɡreɪd/' },
          { id: 'w4', word: 'friend', chinese: '朋友', phonetic: '/frend/' },
          { id: 'w5', word: 'teacher', chinese: '老师', phonetic: '/ˈtiːtʃə(r)/' },
          { id: 'w6', word: 'canteen', chinese: '食堂', phonetic: '/kænˈtiːn/' },
          { id: 'w7', word: 'dormitory', chinese: '宿舍', phonetic: '/ˈdɔːmɪtri/' },
        ],
        selectedIds: [],
        defaultLimit: 5,
        expanded: true,
      },
      {
        sectionId: 'chunks',
        sectionName: '语块',
        items: [
          { id: 'c1', text: 'in the morning', translation: '在早上' },
          { id: 'c2', text: 'have lunch', translation: '吃午饭' },
        ],
        selectedIds: [],
        defaultLimit: 5,
        expanded: false,
      },
      {
        sectionId: 'collocations',
        sectionName: '固定搭配',
        items: [
          { id: 'fc1', text: 'have breakfast', translation: '吃早饭' },
          { id: 'fc2', text: 'go to school', translation: '去上学' },
          { id: 'fc3', text: 'get up', translation: '起床' },
        ],
        selectedIds: [],
        defaultLimit: 5,
        expanded: false,
      },
    ],
  }
}

// ═══════════════════════════════════════════════════════════
// 5. 同步练习资源（练习/作业/布置/单元练习）
// ═══════════════════════════════════════════════════════════

export function getUnitPracticeResources(ctx: SearchContext, isUnitSpecific: boolean): {
  smartMatch: ResourceItem[]
  smartRelated: ResourceItem[]
} {
  const unit = ctx.unit || 'Unit 3'

  const basePractice = [
    {
      id: 'practice-basic-1',
      title: `${unit} 基础练习`,
      type: 'comprehensive' as const,
      tags: ['基础练习', '综合', unit],
      difficulty: 'basic' as const,
      grade: ctx.grade || '七年级上',
      source: ctx.textbook || '人教版',
      isCurrentUnit: true,
      questionCount: 15,
      duration: '20分钟',
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: true,
      isLessonPrepResource: false,
      recommendReason: '适合课堂巩固或课后基础练习',
    },
    {
      id: 'practice-comp-1',
      title: `${unit} 综合练习`,
      type: 'comprehensive' as const,
      tags: ['综合练习', unit],
      difficulty: 'medium' as const,
      grade: ctx.grade || '七年级上',
      source: ctx.textbook || '人教版',
      isCurrentUnit: true,
      questionCount: 20,
      duration: '30分钟',
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: true,
      isLessonPrepResource: false,
      recommendReason: '涵盖词汇、语法和阅读的综合训练',
    },
    {
      id: 'practice-unit-test-1',
      title: `${unit} 单元检测`,
      type: 'unit_test' as const,
      tags: ['单元检测', unit],
      difficulty: 'medium' as const,
      grade: ctx.grade || '七年级上',
      source: ctx.textbook || '人教版',
      isCurrentUnit: true,
      questionCount: 25,
      duration: '40分钟',
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: true,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '检测单元整体掌握情况',
    },
    {
      id: 'practice-stage-1',
      title: `${unit} 阶段练习`,
      type: 'stage_test' as const,
      tags: ['阶段练习', unit],
      difficulty: 'medium' as const,
      grade: ctx.grade || '七年级上',
      source: ctx.textbook || '人教版',
      isCurrentUnit: true,
      questionCount: 30,
      duration: '45分钟',
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: true,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '阶段总结与巩固训练',
    },
  ]

  const relatedPractices = isUnitSpecific ? [] : [
    {
      id: 'related-vocab-1',
      title: `${unit} 单元词汇`,
      type: 'vocab_practice' as const,
      tags: ['词汇练习', unit],
      difficulty: 'basic' as const,
      grade: ctx.grade || '七年级上',
      source: ctx.textbook || '人教版',
      isCurrentUnit: true,
      questionCount: 10,
      duration: '15分钟',
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '复习当前单元核心词汇',
    },
    {
      id: 'related-text-1',
      title: `${unit} 课文跟读`,
      type: 'sync_text' as const,
      tags: ['课文跟读', unit],
      difficulty: 'basic' as const,
      grade: ctx.grade || '七年级上',
      source: ctx.textbook || '人教版',
      isCurrentUnit: true,
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: true,
      isLessonPrepResource: true,
      recommendReason: '训练课文朗读与发音',
    },
    {
      id: 'related-listening-1',
      title: `${unit} 听力练习`,
      type: 'listening_practice' as const,
      tags: ['听力练习', unit],
      difficulty: 'basic' as const,
      grade: ctx.grade || '七年级上',
      source: ctx.textbook || '人教版',
      isCurrentUnit: true,
      duration: '10分钟',
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: true,
      isLessonPrepResource: false,
      recommendReason: '同步单元听力训练',
    },
  ]

  return {
    smartMatch: basePractice,
    smartRelated: isUnitSpecific
      ? [relatedPractices[0], relatedPractices[1], relatedPractices[2]]
      : [relatedPractices[0], relatedPractices[1], relatedPractices[2]],
  }
}

// ═══════════════════════════════════════════════════════════
// 6. 写作入口
// ═══════════════════════════════════════════════════════════

export function getWritingFunctionEntries(): FunctionEntry[] {
  return [
    {
      id: 'func-app-writing',
      name: '自定义应用文',
      keywords: ['应用文', '写作', '作文'],
      category: '写作批改',
      recommendReason: '支持书信、通知、日记等常见应用文体裁，可自定义题目和要求',
      actionType: 'navigate',
    },
    {
      id: 'func-cont-writing',
      name: '自定义读后续写',
      keywords: ['读后续写', '续写', '写作'],
      category: '写作批改',
      recommendReason: '提供阅读材料，让学生根据原文进行续写，训练读写综合能力',
      actionType: 'navigate',
    },
  ]
}

export function getWritingResourceItems(): ResourceItem[] {
  return [
    {
      id: 'res-app-writing',
      title: '自定义应用文入口',
      type: 'writing_practice',
      tags: ['写作', '应用文', '入口'],
      difficulty: 'medium',
      grade: '七年级上',
      isCurrentUnit: true,
      canPreview: false,
      canAssign: true,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '支持书信、通知、日记等常见应用文体裁，可自定义题目和要求',
    },
    {
      id: 'res-cont-writing',
      title: '自定义读后续写入口',
      type: 'writing_practice',
      tags: ['写作', '读后续写', '入口'],
      difficulty: 'medium',
      grade: '七年级上',
      isCurrentUnit: true,
      canPreview: false,
      canAssign: true,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '提供阅读材料，训练学生读写综合能力',
    },
  ]
}

/** 写作专项试卷 — 应用文和读后续写的专项试卷资源 */
export function getWritingPaperResources(_ctx: SearchContext): ResourceItem[] {
  const grade = _ctx.grade || '七年级上'
  return [
    {
      id: 'res-app-writing-paper',
      title: '应用文写作专项试卷',
      type: 'writing_practice',
      tags: ['写作专项', '应用文', '试卷'],
      difficulty: 'medium',
      grade,
      isCurrentUnit: true,
      canPreview: true,
      canAssign: true,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '应用文写作专项训练试卷，涵盖书信、通知、日记等题材',
    },
    {
      id: 'res-cont-writing-paper',
      title: '读后续写专项试卷',
      type: 'writing_practice',
      tags: ['写作专项', '读后续写', '试卷'],
      difficulty: 'advanced',
      grade,
      isCurrentUnit: true,
      canPreview: true,
      canAssign: true,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '读后续写专项训练试卷，训练读写综合能力',
    },
  ]
}

// ═══════════════════════════════════════════════════════════
// 7. 听写/默写入口
// ═══════════════════════════════════════════════════════════

export function getDictationResourceItems(): ResourceItem[] {
  return [
    {
      id: 'res-vocab-dictation',
      title: '词汇听写',
      type: 'vocab_practice',
      tags: ['听写', '词汇'],
      difficulty: 'basic',
      grade: '七年级上',
      isCurrentUnit: true,
      canPreview: false,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '基于当前单元或自定义词表的听写练习',
    },
    {
      id: 'res-word-sentence-dictation',
      title: '词句听写',
      type: 'vocab_practice',
      tags: ['听写', '词句'],
      difficulty: 'basic',
      grade: '七年级上',
      isCurrentUnit: true,
      canPreview: false,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '词汇与句子结合的听写训练',
    },
    {
      id: 'res-passage-dictation',
      title: '自定义篇章默写',
      type: 'vocab_practice',
      tags: ['默写', '篇章'],
      difficulty: 'medium',
      grade: '七年级上',
      isCurrentUnit: true,
      canPreview: false,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '可自定义篇章内容的默写或填空练习',
    },
  ]
}

// ═══════════════════════════════════════════════════════════
// 7b. 词汇试卷资源
// ═══════════════════════════════════════════════════════════

export function getVocabPaperResources(ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  const base = { grade, source: ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'vp-1', title: `${unit} 词汇同步检测卷`, type: 'unit_test', tags: ['词汇试卷', '同步', unit], difficulty: 'medium', questionCount: 30, duration: '40分钟', recommendReason: '当前单元词汇同步检测试卷' },
    { ...base, id: 'vp-2', title: '初中英语词汇专项卷', type: 'special', tags: ['词汇专项', '试卷'], difficulty: 'medium', questionCount: 50, duration: '60分钟', recommendReason: '词汇拼写与辨析专项试卷' },
    { ...base, id: 'vp-3', title: `${grade} 词汇综合练习卷`, type: 'comprehensive', tags: ['词汇', '综合', grade], difficulty: 'medium', questionCount: 40, duration: '50分钟', recommendReason: '词汇综合能力检测' },
  ]
}

// ═══════════════════════════════════════════════════════════
// 8. 答题卡关联入口
// ═══════════════════════════════════════════════════════════

export function getAnswerCardRelatedEntries(): ResourceItem[] {
  return [
    {
      id: 'rel-vocab-dictation-card',
      title: '词汇听写',
      type: 'vocab_practice',
      tags: ['听写', '词汇', '答题卡'],
      difficulty: 'basic',
      grade: '七年级上',
      isCurrentUnit: true,
      canPreview: false,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '适合配合答题卡使用的听写练习',
    },
    {
      id: 'rel-word-sentence-card',
      title: '词句听写',
      type: 'vocab_practice',
      tags: ['听写', '词句', '答题卡'],
      difficulty: 'basic',
      grade: '七年级上',
      isCurrentUnit: true,
      canPreview: false,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '词句结合的听写，与答题卡纸笔练习搭配',
    },
    {
      id: 'rel-passage-dict-card',
      title: '自定义篇章默写',
      type: 'vocab_practice',
      tags: ['默写', '篇章', '答题卡'],
      difficulty: 'medium',
      grade: '七年级上',
      isCurrentUnit: true,
      canPreview: false,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '篇章默写内容，可打印后配合答题卡使用',
    },
    {
      id: 'rel-app-writing-card',
      title: '自定义应用文',
      type: 'writing_practice',
      tags: ['写作', '应用文', '答题卡'],
      difficulty: 'medium',
      grade: '七年级上',
      isCurrentUnit: true,
      canPreview: false,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '应用文写作练习，学生可在答题卡上作答',
    },
    {
      id: 'rel-cont-writing-card',
      title: '自定义读后续写',
      type: 'writing_practice',
      tags: ['写作', '读后续写', '答题卡'],
      difficulty: 'medium',
      grade: '七年级上',
      isCurrentUnit: true,
      canPreview: false,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '读后续写训练，配合答题卡使用',
    },
  ]
}

// ═══════════════════════════════════════════════════════════
// 9. 平台试卷资源
// ═══════════════════════════════════════════════════════════

export function getPlatformPaperResources(_ctx: SearchContext): ResourceItem[] {
  return [
    {
      id: 'platform-sync-paper-1',
      title: 'Unit 3 同步试卷 — 基础',
      type: 'unit_test',
      tags: ['同步试卷', '基础练习', 'Unit 3'],
      difficulty: 'basic',
      grade: '七年级上',
      source: '人教版',
      isCurrentUnit: true,
      questionCount: 15,
      duration: '25分钟',
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: true,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '与当前教学进度同步',
    },
    {
      id: 'platform-sync-paper-2',
      title: 'Unit 3 同步试卷 — 综合',
      type: 'comprehensive',
      tags: ['同步试卷', '综合练习', 'Unit 3'],
      difficulty: 'medium',
      grade: '七年级上',
      source: '人教版',
      isCurrentUnit: true,
      questionCount: 20,
      duration: '35分钟',
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: true,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '涵盖 Unit 3 全部知识点',
    },
    {
      id: 'platform-special-paper-1',
      title: '七年级词汇专项卷',
      type: 'special',
      tags: ['专项试卷', '词汇'],
      difficulty: 'medium',
      grade: '七年级上',
      source: '系统',
      isCurrentUnit: false,
      questionCount: 25,
      duration: '30分钟',
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: true,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '聚焦词汇专项训练',
    },
    {
      id: 'platform-mock-paper-1',
      title: '七年级上期末模拟卷',
      type: 'mock_exam',
      tags: ['模拟试卷', '期末'],
      difficulty: 'advanced',
      grade: '七年级上',
      source: '系统',
      isCurrentUnit: false,
      questionCount: 50,
      duration: '90分钟',
      canPreview: true,
      canAssign: true,
      canAddToPaperBasket: true,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '期末模拟检测，全真模拟考试',
    },
  ]
}

// ═══════════════════════════════════════════════════════════
// 10. Phase 3 — 专项 / 微技能
// ═══════════════════════════════════════════════════════════

export interface SpecialTopicCard {
  id: string
  title: string
  subTopicId: string
}

export function getSpecialTopicCards(): SpecialTopicCard[] {
  return [
    { id: 'st-type', title: '题型专项', subTopicId: 'question_type' },
    { id: 'st-vocab', title: '词汇专项', subTopicId: 'vocab' },
    { id: 'st-listening', title: '听力专项', subTopicId: 'listening' },
    { id: 'st-speaking', title: '听说专项', subTopicId: 'speaking' },
    { id: 'st-writing', title: '写作专项', subTopicId: 'writing' },
    { id: 'st-reading', title: '阅读专项', subTopicId: 'reading' },
    { id: 'st-micro', title: '微技能专项', subTopicId: 'micro_skill' },
  ]
}

export function getSpecialTopicResources(subTopicId: string, ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  const base = { grade, source: ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: false, isLessonPrepResource: false }

  switch (subTopicId) {
    case 'listening':
      return [
        { ...base, id: 'sp-listen-1', title: `${unit} 听力选择题专项`, type: 'listening_practice', tags: ['听力专项', '选择题', unit], difficulty: 'medium', questionCount: 15, duration: '20分钟', recommendReason: '聚焦听力选择题解题策略' },
        { ...base, id: 'sp-listen-2', title: '听力填空题专项训练', type: 'listening_practice', tags: ['听力专项', '填空题'], difficulty: 'medium', questionCount: 10, duration: '15分钟', recommendReason: '训练听力填空答题技巧' },
        { ...base, id: 'sp-listen-3', title: '听力短文理解专项', type: 'listening_practice', tags: ['听力专项', '短文理解', unit], difficulty: 'advanced', questionCount: 12, duration: '18分钟', recommendReason: '提升短文听力理解能力' },
      ]
    case 'vocab':
      return [
        { ...base, id: 'sp-vocab-1', title: `${unit} 词汇拼写专项`, type: 'vocab_practice', tags: ['词汇专项', '拼写', unit], difficulty: 'basic', questionCount: 20, duration: '15分钟', recommendReason: '强化当前单元词汇拼写' },
        { ...base, id: 'sp-vocab-2', title: '词汇辨析专项训练', type: 'vocab_practice', tags: ['词汇专项', '辨析'], difficulty: 'medium', questionCount: 15, duration: '20分钟', recommendReason: '训练近义词和易混词辨析' },
        { ...base, id: 'sp-vocab-3', title: '词汇用法专项练习', type: 'vocab_practice', tags: ['词汇专项', '用法', unit], difficulty: 'medium', questionCount: 18, duration: '25分钟', recommendReason: '掌握核心词汇搭配与用法' },
      ]
    case 'writing':
      return [
        { ...base, id: 'sp-write-1', title: '应用文写作专项', type: 'writing_practice', tags: ['写作专项', '应用文'], difficulty: 'medium', recommendReason: '书信、通知等应用文格式训练' },
        { ...base, id: 'sp-write-2', title: '读后续写专项训练', type: 'writing_practice', tags: ['写作专项', '读后续写'], difficulty: 'advanced', recommendReason: '续写逻辑与语言表达训练' },
        { ...base, id: 'sp-write-3', title: '看图写作专项', type: 'writing_practice', tags: ['写作专项', '看图写作'], difficulty: 'medium', recommendReason: '图片信息提取与描述训练' },
      ]
    case 'reading':
      return [
        { ...base, id: 'sp-read-1', title: '阅读理解选择题专项', type: 'reading_practice', tags: ['阅读专项', '选择题', unit], difficulty: 'medium', questionCount: 15, duration: '25分钟', recommendReason: '阅读选择题解题策略训练' },
        { ...base, id: 'sp-read-2', title: '七选五专项训练', type: 'reading_practice', tags: ['阅读专项', '七选五'], difficulty: 'advanced', questionCount: 10, duration: '20分钟', recommendReason: '七选五题型专项突破' },
        { ...base, id: 'sp-read-3', title: '任务型阅读专项', type: 'reading_practice', tags: ['阅读专项', '任务型阅读'], difficulty: 'medium', questionCount: 8, duration: '18分钟', recommendReason: '任务型阅读信息提取训练' },
      ]
    case 'speaking': {
      const spkRes = getSpeakingResources(ctx)
      if (spkRes.length > 0) return spkRes
      // 无听说资源时展示听力替代，标注为替代推荐
      const fallback = getSpeakingFallback(ctx)
      return fallback.map(f => ({ ...f, recommendReason: `替代推荐：${f.recommendReason || '听力替代资源'}` }))
    }
    case 'micro_skill':
      return getMicroSkillResources(ctx)
    case 'question_type':
    default:
      return [
        { ...base, id: 'sp-qt-1', title: '完形填空解题专项', type: 'grammar_practice', tags: ['题型专项', '完形填空'], difficulty: 'medium', questionCount: 15, duration: '25分钟', recommendReason: '完形填空高频考点与解题方法' },
        { ...base, id: 'sp-qt-2', title: '短文填空专项', type: 'grammar_practice', tags: ['题型专项', '短文填空'], difficulty: 'medium', questionCount: 10, duration: '20分钟', recommendReason: '语法填空答题策略' },
        { ...base, id: 'sp-qt-3', title: '句型转换专项', type: 'grammar_practice', tags: ['题型专项', '句型转换', unit], difficulty: 'basic', questionCount: 12, duration: '15分钟', recommendReason: '句型转换常见考法训练' },
      ]
  }
}

export function getSpecialTopicRelated(subTopicId: string, ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  const base = { grade, source: ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: false, isLessonPrepResource: false }

  switch (subTopicId) {
    case 'listening':
      return [
        { ...base, id: 'rel-sp-l-1', title: `${unit} 同步听力`, type: 'sync_listening', tags: ['同步听力', unit], difficulty: 'basic', duration: '10分钟', recommendReason: '同步听力基础训练' },
        { ...base, id: 'rel-sp-l-2', title: '听力模拟练习', type: 'listening_mock', tags: ['听力模拟'], difficulty: 'medium', questionCount: 20, duration: '25分钟', recommendReason: '模拟考试听力环节' },
      ]
    case 'vocab':
      return [
        { ...base, id: 'rel-sp-v-1', title: `${unit} 同步词汇`, type: 'sync_vocab', tags: ['同步词汇', unit], difficulty: 'basic', questionCount: 45, recommendReason: '当前单元词汇基础' },
        { ...base, id: 'rel-sp-v-2', title: `${unit} 词汇练习`, type: 'vocab_practice', tags: ['词汇练习', unit], difficulty: 'basic', questionCount: 10, duration: '15分钟', recommendReason: '词汇巩固练习' },
      ]
    case 'writing':
      return [
        { ...base, id: 'rel-sp-w-1', title: '自定义应用文', type: 'writing_practice', tags: ['应用文', '写作'], difficulty: 'medium', recommendReason: '应用文写作练习' },
        { ...base, id: 'rel-sp-w-2', title: '自定义读后续写', type: 'writing_practice', tags: ['读后续写', '写作'], difficulty: 'medium', recommendReason: '读写综合训练' },
      ]
    case 'reading':
      return [
        { ...base, id: 'rel-sp-r-1', title: `${unit} 同步练习`, type: 'comprehensive', tags: ['同步练习', unit], difficulty: 'basic', questionCount: 15, duration: '20分钟', recommendReason: '同步综合练习' },
        { ...base, id: 'rel-sp-r-2', title: '模拟阅读练习', type: 'reading_practice', tags: ['模拟', '阅读'], difficulty: 'medium', questionCount: 15, duration: '25分钟', recommendReason: '模拟环境阅读训练' },
      ]
    case 'micro_skill':
      return getMicroSkillRelated(ctx)
    case 'question_type':
    default:
      return [
        { ...base, id: 'rel-sp-qt-1', title: `${unit} 综合练习`, type: 'comprehensive', tags: ['综合练习', unit], difficulty: 'medium', questionCount: 20, duration: '30分钟', recommendReason: '涵盖多题型综合训练' },
        { ...base, id: 'rel-sp-qt-2', title: `${unit} 单元检测`, type: 'unit_test', tags: ['单元检测', unit], difficulty: 'medium', questionCount: 25, duration: '40分钟', canAddToPaperBasket: true, recommendReason: '检测单元整体掌握情况' },
      ]
  }
}

export function getMicroSkillResources(ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  const base = { grade, source: ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'ms-1', title: '阅读微技能 — 主旨大意', type: 'reading_practice', tags: ['微技能', '阅读', '主旨大意', unit], difficulty: 'medium', questionCount: 8, duration: '15分钟', recommendReason: '训练快速抓取文章主旨的能力' },
    { ...base, id: 'ms-2', title: '阅读微技能 — 细节理解', type: 'reading_practice', tags: ['微技能', '阅读', '细节理解', unit], difficulty: 'medium', questionCount: 10, duration: '18分钟', recommendReason: '提升细节信息定位与理解' },
    { ...base, id: 'ms-3', title: '听力微技能 — 关键词捕捉', type: 'listening_practice', tags: ['微技能', '听力', '关键词', unit], difficulty: 'basic', duration: '12分钟', recommendReason: '训练听力中关键词捕捉能力' },
    { ...base, id: 'ms-4', title: '写作微技能 — 段落结构', type: 'writing_practice', tags: ['微技能', '写作', '段落结构'], difficulty: 'medium', recommendReason: '学习英文写作段落组织方法' },
  ]
}

export function getMicroSkillRelated(ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  const base = { grade, source: ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'rel-ms-1', title: `${unit} 综合练习`, type: 'comprehensive', tags: ['综合练习', unit], difficulty: 'medium', questionCount: 20, duration: '30分钟', recommendReason: '综合能力巩固' },
    { ...base, id: 'rel-ms-2', title: `${unit} 单元检测`, type: 'unit_test', tags: ['单元检测', unit], difficulty: 'medium', questionCount: 25, duration: '40分钟', canAddToPaperBasket: true, recommendReason: '单元整体检测' },
    { ...base, id: 'rel-ms-3', title: '模拟综合练习', type: 'mock_exam', tags: ['模拟', '综合'], difficulty: 'advanced', questionCount: 40, duration: '60分钟', canAddToPaperBasket: true, recommendReason: '模拟环境综合能力训练' },
  ]
}

// ═══════════════════════════════════════════════════════════
// 11. Phase 3 — 真题 / 模拟 / 套题
// ═══════════════════════════════════════════════════════════

export function getRealExamResources(ctx: SearchContext): ResourceItem[] {
  const grade = ctx.grade || '七年级上'
  const base = { grade, isCurrentUnit: false, canPreview: true, canAssign: true, canAddToPaperBasket: true, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 're-1', title: '2024年山东省中考英语真题', type: 'real_exam', tags: ['真题', '中考', '山东', '2024'], difficulty: 'advanced', source: '山东省教育考试院', questionCount: 60, duration: '120分钟', recommendReason: '2024年最新中考真题' },
    { ...base, id: 're-2', title: '2024年广东省中考英语真题', type: 'real_exam', tags: ['真题', '中考', '广东', '2024'], difficulty: 'advanced', source: '广东省教育考试院', questionCount: 55, duration: '100分钟', recommendReason: '广东地区中考真题' },
    { ...base, id: 're-3', title: '2023年全国中考英语精选真题', type: 'real_exam', tags: ['真题', '中考', '2023', '全国'], difficulty: 'advanced', source: '系统精选', questionCount: 50, duration: '100分钟', recommendReason: '全国精选中考真题汇编' },
    { ...base, id: 're-4', title: '2023年北京中考英语真题', type: 'real_exam', tags: ['真题', '中考', '北京', '2023'], difficulty: 'advanced', source: '北京教育考试院', questionCount: 55, duration: '100分钟', recommendReason: '北京地区中考真题' },
  ]
}

export function getRealExamRelated(_ctx: SearchContext): ResourceItem[] {
  const grade = _ctx.grade || '七年级上'
  const base = { grade, isCurrentUnit: false, canPreview: true, canAssign: true, canAddToPaperBasket: true, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'rel-re-1', title: '中考模拟冲刺卷', type: 'mock_exam', tags: ['模拟', '冲刺', '中考'], difficulty: 'advanced', source: '系统', questionCount: 55, duration: '100分钟', recommendReason: '中考前模拟冲刺训练' },
    { ...base, id: 'rel-re-2', title: '考前冲刺练习', type: 'exam_sprint', tags: ['冲刺', '考前'], difficulty: 'advanced', source: '系统', questionCount: 30, duration: '45分钟', recommendReason: '考前重点考点突击' },
    { ...base, id: 'rel-re-3', title: '阶段检测卷', type: 'stage_test', tags: ['阶段检测'], difficulty: 'medium', source: '系统', questionCount: 40, duration: '60分钟', recommendReason: '阶段性知识检测' },
  ]
}

export function getMockExamResources(ctx: SearchContext): ResourceItem[] {
  const grade = ctx.grade || '七年级上'
  const base = { grade, isCurrentUnit: false, canPreview: true, canAssign: true, canAddToPaperBasket: true, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'me-1', title: `${grade}期中模拟卷`, type: 'mock_exam', tags: ['模拟', '期中'], difficulty: 'medium', source: '系统', questionCount: 50, duration: '90分钟', recommendReason: '期中模拟全真检测' },
    { ...base, id: 'me-2', title: `${grade}期末模拟卷`, type: 'mock_exam', tags: ['模拟', '期末'], difficulty: 'advanced', source: '系统', questionCount: 55, duration: '100分钟', recommendReason: '期末模拟全真检测' },
    { ...base, id: 'me-3', title: '冲刺模拟练习卷', type: 'exam_sprint', tags: ['冲刺', '模拟卷'], difficulty: 'advanced', source: '系统', questionCount: 45, duration: '80分钟', recommendReason: '考前冲刺模拟训练' },
    { ...base, id: 'me-4', title: `${grade}阶段检测卷`, type: 'stage_test', tags: ['阶段检测'], difficulty: 'medium', source: '系统', questionCount: 40, duration: '60分钟', recommendReason: '阶段性学习效果检测' },
    { ...base, id: 'me-5', title: '区域模拟精选卷', type: 'mock_exam', tags: ['模拟', '区域精选'], difficulty: 'medium', source: '区域精选', questionCount: 50, duration: '90分钟', recommendReason: '各地区模拟卷精选' },
  ]
}

export function getExamSetResources(ctx: SearchContext): ResourceItem[] {
  const grade = ctx.grade || '七年级上'
  const base = { grade, isCurrentUnit: false, canPreview: true, canAssign: true, canAddToPaperBasket: true, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'es-1', title: `${grade}模拟套题（一）`, type: 'mock_exam', tags: ['套题', '模拟', '整套'], difficulty: 'medium', source: '系统', questionCount: 60, duration: '120分钟', recommendReason: '完整模拟套题训练' },
    { ...base, id: 'es-2', title: `${grade}模拟套题（二）`, type: 'mock_exam', tags: ['套题', '模拟', '整套'], difficulty: 'advanced', source: '系统', questionCount: 60, duration: '120分钟', recommendReason: '进阶模拟套题' },
    { ...base, id: 'es-3', title: '中考冲刺套卷（上）', type: 'exam_sprint', tags: ['套卷', '冲刺', '中考'], difficulty: 'advanced', source: '系统', questionCount: 55, duration: '100分钟', recommendReason: '中考冲刺成套练习' },
  ]
}

export function getExamSetFallbackPapers(ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  const base = { grade, isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: true, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'esfb-1', title: `${unit} 同步试卷`, type: 'unit_test', tags: ['同步试卷', unit], difficulty: 'basic', questionCount: 15, duration: '25分钟', recommendReason: '同步试卷降级推荐' },
    { ...base, id: 'esfb-2', title: '词汇专项卷', type: 'special', tags: ['专项试卷', '词汇'], difficulty: 'medium', questionCount: 25, duration: '30分钟', recommendReason: '专项试卷降级推荐' },
    { ...base, id: 'esfb-3', title: `${grade}模拟卷`, type: 'mock_exam', tags: ['模拟试卷'], difficulty: 'advanced', questionCount: 50, duration: '90分钟', recommendReason: '模拟试卷降级推荐' },
  ]
}

// ═══════════════════════════════════════════════════════════
// 12. Phase 3 — 听力 / 听力模拟 / 听说
// ═══════════════════════════════════════════════════════════

export function getListeningResources(ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  const base = { grade, source: ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: true, isLessonPrepResource: true }
  return [
    { ...base, id: 'ln-1', title: `${unit} 同步听力`, type: 'sync_listening', tags: ['同步听力', unit], difficulty: 'basic', duration: '10分钟', recommendReason: `与当前单元 ${unit} 配套的听力训练` },
    { ...base, id: 'ln-2', title: `${unit} 听力练习`, type: 'listening_practice', tags: ['听力练习', unit], difficulty: 'basic', duration: '12分钟', recommendReason: '单元听力巩固练习' },
    { ...base, id: 'ln-3', title: `${unit} 听力选择题`, type: 'listening_practice', tags: ['听力练习', '选择题', unit], difficulty: 'medium', questionCount: 10, duration: '15分钟', recommendReason: '听力选择题训练' },
  ]
}

export function getListeningRelated(_ctx: SearchContext): ResourceItem[] {
  const grade = _ctx.grade || '七年级上'
  const base = { grade, source: _ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'rel-ln-1', title: '听力专项训练', type: 'special', tags: ['听力专项'], difficulty: 'medium', questionCount: 15, duration: '20分钟', recommendReason: '听力能力专项提升' },
    { ...base, id: 'rel-ln-2', title: '听力模拟练习', type: 'listening_mock', tags: ['听力模拟'], difficulty: 'medium', questionCount: 20, duration: '25分钟', recommendReason: '模拟考试听力环节' },
  ]
}

export function getListeningMockResources(ctx: SearchContext): ResourceItem[] {
  const grade = ctx.grade || '七年级上'
  const base = { grade, isCurrentUnit: false, canPreview: true, canAssign: true, canAddToPaperBasket: true, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'lm-1', title: `${grade}听力模拟试卷（一）`, type: 'listening_mock', tags: ['听力模拟', '模考'], difficulty: 'medium', source: '系统', questionCount: 20, duration: '25分钟', recommendReason: '听力模考全真练习' },
    { ...base, id: 'lm-2', title: `${grade}听力模拟试卷（二）`, type: 'listening_mock', tags: ['听力模拟', '模考'], difficulty: 'medium', source: '系统', questionCount: 20, duration: '25分钟', recommendReason: '听力模考进阶练习' },
    { ...base, id: 'lm-3', title: '中考听力模拟真题', type: 'listening_mock', tags: ['听力模拟', '中考'], difficulty: 'advanced', source: '真题改编', questionCount: 25, duration: '30分钟', recommendReason: '中考听力真题模拟' },
  ]
}

export function getSpeakingResources(ctx: SearchContext): ResourceItem[] {
  const grade = ctx.grade || '七年级上'
  const base = { grade, source: ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToLessonPrep: false, isLessonPrepResource: false }

  return [
    { ...base, id: 'spk-1', title: `${ctx.unit || 'Unit 3'} 听说练习`, type: 'speaking_practice', tags: ['听说', ctx.unit || 'Unit 3'], difficulty: 'basic', duration: '15分钟', recommendReason: '当前单元听说训练' },
    { ...base, id: 'spk-2', title: `${grade}听说模拟测评`, type: 'speaking_practice', tags: ['听说模拟', '测评'], difficulty: 'medium', questionCount: 15, duration: '20分钟', recommendReason: '听说考试模拟测评' },
    { ...base, id: 'spk-3', title: '听说专项训练', type: 'speaking_practice', tags: ['听说专项'], difficulty: 'medium', questionCount: 12, duration: '18分钟', recommendReason: '听说能力专项提升' },
  ]
}

export function getSpeakingFallback(ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  const base = { grade, source: ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'spk-fb-1', title: `${unit} 听力练习`, type: 'listening_practice', tags: ['听力', unit], difficulty: 'basic', duration: '12分钟', recommendReason: '听说替代 — 听力基础训练' },
    { ...base, id: 'spk-fb-2', title: `${unit} 课文跟读`, type: 'sync_text', tags: ['跟读', unit], difficulty: 'basic', recommendReason: '听说替代 — 口语跟读训练' },
    { ...base, id: 'spk-fb-3', title: '趣味配音练习', type: 'dubbing', tags: ['配音', '口语'], difficulty: 'basic', recommendReason: '听说替代 — 趣味口语训练' },
  ]
}

// ═══════════════════════════════════════════════════════════
// 12b. 听力试卷类资源 & 听说试卷类资源
// ═══════════════════════════════════════════════════════════

export function getListeningPaperResources(ctx: SearchContext): ResourceItem[] {
  const grade = ctx.grade || '七年级上'
  const base = { grade, isCurrentUnit: false, canPreview: true, canAssign: true, canAddToPaperBasket: true, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'lp-1', title: `${grade}听力模拟试卷（一）`, type: 'listening_mock', tags: ['听力模拟', '模考'], difficulty: 'medium', source: '系统', questionCount: 20, duration: '25分钟', recommendReason: '听力全真模拟试卷' },
    { ...base, id: 'lp-2', title: `${grade}听力模拟试卷（二）`, type: 'listening_mock', tags: ['听力模拟', '模考'], difficulty: 'medium', source: '系统', questionCount: 20, duration: '25分钟', recommendReason: '听力进阶模拟试卷' },
    { ...base, id: 'lp-3', title: `${grade}听力套卷`, type: 'listening_mock', tags: ['听力套卷'], difficulty: 'advanced', source: '系统', questionCount: 30, duration: '40分钟', recommendReason: '完整听力套卷训练' },
    { ...base, id: 'lp-4', title: '中考听力真题汇编', type: 'listening_mock', tags: ['听力真题', '中考'], difficulty: 'advanced', source: '真题改编', questionCount: 25, duration: '30分钟', recommendReason: '中考听力真题精选' },
    { ...base, id: 'lp-5', title: `${grade}期末听力试卷`, type: 'listening_mock', tags: ['听力', '期末'], difficulty: 'medium', source: '系统', questionCount: 20, duration: '25分钟', recommendReason: '期末听力专项检测' },
  ]
}

export function getListeningMyPapers(ctx: SearchContext): ResourceItem[] {
  const allPapers = getMyPapers(ctx)
  return allPapers.filter((p) => /听力/.test(p.title))
}

export function getSpeakingPaperResources(ctx: SearchContext): ResourceItem[] {
  const grade = ctx.grade || '七年级上'
  const base = { grade, isCurrentUnit: false, canPreview: true, canAssign: true, canAddToPaperBasket: true, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'sp-1', title: `${grade}听说模拟测评（一）`, type: 'speaking_practice', tags: ['听说模拟', '测评'], difficulty: 'medium', source: '系统', questionCount: 15, duration: '20分钟', recommendReason: '听说全真模拟测评' },
    { ...base, id: 'sp-2', title: `${grade}听说模拟测评（二）`, type: 'speaking_practice', tags: ['听说模拟', '测评'], difficulty: 'medium', source: '系统', questionCount: 15, duration: '20分钟', recommendReason: '听说进阶模拟测评' },
    { ...base, id: 'sp-3', title: `${grade}听说套卷`, type: 'speaking_practice', tags: ['听说套卷'], difficulty: 'advanced', source: '系统', questionCount: 20, duration: '30分钟', recommendReason: '完整听说套卷训练' },
    { ...base, id: 'sp-4', title: '中考听说真题汇编', type: 'speaking_practice', tags: ['听说真题', '中考'], difficulty: 'advanced', source: '真题改编', questionCount: 18, duration: '25分钟', recommendReason: '中考听说真题精选' },
    { ...base, id: 'sp-5', title: `${grade}期末听说试卷`, type: 'speaking_practice', tags: ['听说', '期末'], difficulty: 'medium', source: '系统', questionCount: 15, duration: '20分钟', recommendReason: '期末听说专项检测' },
  ]
}

export function getSpeakingMyPapers(ctx: SearchContext): ResourceItem[] {
  const allPapers = getMyPapers(ctx)
  return allPapers.filter((p) => /听说/.test(p.title))
}

// ═══════════════════════════════════════════════════════════
// 13. Phase 3 — 课文 / 视频 / 主题视频 / 配音
// ═══════════════════════════════════════════════════════════

export function getTextResources(ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  const base = { grade, source: ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: true, isLessonPrepResource: true }
  return [
    { ...base, id: 'txt-1', title: `${unit} 课文跟读`, type: 'sync_text', tags: ['课文', '跟读', unit], difficulty: 'basic', recommendReason: '当前单元课文跟读训练' },
    { ...base, id: 'txt-2', title: `${unit} 逐句跟读`, type: 'sync_text', tags: ['逐句跟读', unit], difficulty: 'basic', recommendReason: '逐句精读跟读练习' },
    { ...base, id: 'txt-3', title: `${unit} 课文背诵`, type: 'sync_text', tags: ['背诵', '课文', unit], difficulty: 'medium', recommendReason: '课文背诵训练' },
    { ...base, id: 'txt-4', title: `${unit} 课文朗读`, type: 'sync_text', tags: ['朗读', '课文', unit], difficulty: 'basic', recommendReason: '课文朗读训练' },
  ]
}

export function getTextRelated(ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  const base = { grade, source: ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'rel-txt-1', title: `${unit} 同步词汇`, type: 'sync_vocab', tags: ['同步词汇', unit], difficulty: 'basic', questionCount: 45, recommendReason: '当前单元词汇基础' },
    { ...base, id: 'rel-txt-2', title: `${unit} 同步听力`, type: 'sync_listening', tags: ['同步听力', unit], difficulty: 'basic', duration: '10分钟', recommendReason: '单元配套听力' },
  ]
}

export function getVideoResources(ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  const base = { grade, source: ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: true, isLessonPrepResource: true }
  return [
    { ...base, id: 'vid-1', title: `${unit} 同步教学视频`, type: 'sync_video', tags: ['同步视频', unit], difficulty: 'basic', recommendReason: '当前单元配套教学视频' },
    { ...base, id: 'vid-2', title: `${unit} 课文讲解视频`, type: 'sync_video', tags: ['讲解视频', unit], difficulty: 'basic', recommendReason: '课文内容视频讲解' },
  ]
}

export function getVideoRelated(_ctx: SearchContext): ResourceItem[] {
  return [
    { id: 'rel-vid-1', title: '主题视频资源', type: 'sync_video', tags: ['主题视频'], difficulty: 'basic', grade: _ctx.grade || '七年级上', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: true, isLessonPrepResource: true, recommendReason: '拓展主题视频素材' },
  ]
}

export function getThemeVideoResources(ctx: SearchContext): ResourceItem[] {
  const grade = ctx.grade || '七年级上'
  const base = { grade, isCurrentUnit: true, canPreview: true, canAssign: true, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'tv-1', title: '主题视频 — 校园生活', type: 'sync_video', tags: ['主题视频', '校园'], difficulty: 'basic', source: '系统', recommendReason: '校园生活主题拓展视频' },
    { ...base, id: 'tv-2', title: '主题视频 — 节日文化', type: 'sync_video', tags: ['主题视频', '文化'], difficulty: 'basic', source: '系统', recommendReason: '中外节日文化对比视频' },
    { ...base, id: 'tv-3', title: '话题视频 — 旅行与探险', type: 'sync_video', tags: ['话题视频', '旅行'], difficulty: 'medium', source: '系统', recommendReason: '旅行话题拓展素材' },
    { ...base, id: 'tv-4', title: '文化拓展视频 — 英语国家风俗', type: 'sync_video', tags: ['文化拓展', '风俗'], difficulty: 'medium', source: '系统', recommendReason: '英语国家风俗文化介绍' },
  ]
}

export function getThemeVideoRelated(ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  return [
    { id: 'rel-tv-1', title: `${unit} 同步教学视频`, type: 'sync_video', tags: ['同步视频', unit], difficulty: 'basic', grade, source: ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: true, isLessonPrepResource: true, recommendReason: '当前单元同步视频' },
  ]
}

export function getDubbingResources(ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  const base = { grade, source: ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: true, isLessonPrepResource: true }
  return [
    { ...base, id: 'dub-1', title: `${unit} 趣味配音`, type: 'dubbing', tags: ['趣味配音', unit], difficulty: 'basic', recommendReason: '当前单元趣味配音练习' },
    { ...base, id: 'dub-2', title: '动画配音 — 经典片段', type: 'dubbing', tags: ['动画配音', '经典'], difficulty: 'basic', recommendReason: '经典动画片段配音练习' },
    { ...base, id: 'dub-3', title: '电影配音 — 生活场景', type: 'dubbing', tags: ['电影配音', '生活'], difficulty: 'medium', recommendReason: '生活场景电影配音训练' },
  ]
}

export function getDubbingRelated(_ctx: SearchContext): ResourceItem[] {
  return [
    { id: 'rel-dub-1', title: '主题视频资源', type: 'sync_video', tags: ['主题视频'], difficulty: 'basic', grade: _ctx.grade || '七年级上', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: true, isLessonPrepResource: true, recommendReason: '搭配配音使用的视频素材' },
  ]
}

// ═══════════════════════════════════════════════════════════
// 14. Phase 3 — 语法 / 阅读
// ═══════════════════════════════════════════════════════════

export function getGrammarResources(ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  const base = { grade, source: ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'gr-1', title: `${unit} 语法填空`, type: 'grammar_practice', tags: ['语法填空', unit], difficulty: 'medium', questionCount: 15, duration: '20分钟', recommendReason: '当前单元语法填空训练' },
    { ...base, id: 'gr-2', title: '单句语法专项练习', type: 'grammar_practice', tags: ['单句语法'], difficulty: 'medium', questionCount: 20, duration: '25分钟', recommendReason: '单句语法强化训练' },
    { ...base, id: 'gr-3', title: '完形填空练习', type: 'grammar_practice', tags: ['完形填空', unit], difficulty: 'medium', questionCount: 15, duration: '20分钟', recommendReason: '完形填空综合训练' },
    { ...base, id: 'gr-4', title: '选词填空练习', type: 'grammar_practice', tags: ['选词填空', unit], difficulty: 'basic', questionCount: 10, duration: '15分钟', recommendReason: '选词填空基础训练' },
    { ...base, id: 'gr-5', title: '短文填空练习', type: 'grammar_practice', tags: ['短文填空'], difficulty: 'medium', questionCount: 10, duration: '18分钟', recommendReason: '短文语法填空训练' },
  ]
}

export function getGrammarRelated(ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  const base = { grade, source: ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'rel-gr-1', title: `${unit} 综合练习`, type: 'comprehensive', tags: ['综合练习', unit], difficulty: 'medium', questionCount: 20, duration: '30分钟', recommendReason: '涵盖语法考点的综合练习' },
    { ...base, id: 'rel-gr-2', title: '模拟语法练习', type: 'mock_exam', tags: ['模拟', '语法'], difficulty: 'advanced', questionCount: 25, duration: '35分钟', canAddToPaperBasket: true, recommendReason: '模拟环境语法训练' },
  ]
}

export function getReadingResources(ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  const base = { grade, source: ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: true, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'rd-1', title: `${unit} 阅读理解练习`, type: 'reading_practice', tags: ['阅读理解', unit], difficulty: 'medium', questionCount: 15, duration: '25分钟', recommendReason: '当前单元阅读理解训练' },
    { ...base, id: 'rd-2', title: '七选五专项练习', type: 'reading_practice', tags: ['七选五'], difficulty: 'advanced', questionCount: 10, duration: '20分钟', recommendReason: '七选五题型突破' },
    { ...base, id: 'rd-3', title: '任务型阅读练习', type: 'reading_practice', tags: ['任务型阅读', unit], difficulty: 'medium', questionCount: 8, duration: '18分钟', recommendReason: '任务型阅读训练' },
    { ...base, id: 'rd-4', title: '阅读理解综合训练', type: 'reading_practice', tags: ['阅读理解', '综合'], difficulty: 'advanced', questionCount: 20, duration: '35分钟', recommendReason: '阅读综合能力提升' },
  ]
}

export function getReadingRelated(ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  const base = { grade, source: ctx.textbook || '人教版', isCurrentUnit: true, canPreview: true, canAssign: true, canAddToPaperBasket: false, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'rel-rd-1', title: `${unit} 同步练习`, type: 'comprehensive', tags: ['同步练习', unit], difficulty: 'basic', questionCount: 15, duration: '20分钟', recommendReason: '同步综合练习' },
    { ...base, id: 'rel-rd-2', title: '模拟阅读练习', type: 'mock_exam', tags: ['模拟', '阅读'], difficulty: 'advanced', questionCount: 20, duration: '30分钟', canAddToPaperBasket: true, recommendReason: '模拟环境阅读训练' },
  ]
}

// ═══════════════════════════════════════════════════════════
// Phase 4 — Textbook / Chapter Data
// ═══════════════════════════════════════════════════════════

export interface TextbookChapter {
  id: string
  name: string
  /** Names that can match this chapter (aliases, section names, etc.) */
  matchNames: string[]
  /** Resource types available under this chapter */
  resourceTypes: ('text' | 'vocab' | 'listening' | 'practice' | 'video')[]
  /** Is this the current teaching unit? */
  isCurrentUnit: boolean
  /** Parent textbook name */
  textbook: string
}

export function getTextbookChapters(ctx: SearchContext): TextbookChapter[] {
  const textbook = ctx.textbook || '人教版'
  const currentUnit = ctx.unit || 'Unit 3'

  return [
    {
      id: 'unit-1',
      name: 'Unit 1',
      matchNames: ['Unit 1', 'unit1', 'Unit1'],
      resourceTypes: ['text', 'vocab', 'listening', 'practice', 'video'],
      isCurrentUnit: currentUnit === 'Unit 1',
      textbook,
    },
    {
      id: 'unit-1-section-a',
      name: 'Section A',
      matchNames: ['Section A', 'section a', 'SectionA', 'sectionA'],
      resourceTypes: ['text', 'vocab', 'listening'],
      isCurrentUnit: currentUnit === 'Unit 1',
      textbook,
    },
    {
      id: 'unit-1-section-b',
      name: 'Section B',
      matchNames: ['Section B', 'section b', 'SectionB', 'sectionB'],
      resourceTypes: ['text', 'vocab', 'practice'],
      isCurrentUnit: currentUnit === 'Unit 1',
      textbook,
    },
    {
      id: 'unit-1-text',
      name: 'Happy Holiday',
      matchNames: ['Happy Holiday', 'happy holiday', 'Happy holiday'],
      resourceTypes: ['text', 'listening'],
      isCurrentUnit: currentUnit === 'Unit 1',
      textbook,
    },
    {
      id: 'unit-2',
      name: 'Unit 2',
      matchNames: ['Unit 2', 'unit2', 'Unit2'],
      resourceTypes: ['text', 'vocab', 'listening', 'practice', 'video'],
      isCurrentUnit: currentUnit === 'Unit 2',
      textbook,
    },
    {
      id: 'unit-3',
      name: 'Unit 3',
      matchNames: ['Unit 3', 'unit3', 'Unit3'],
      resourceTypes: ['text', 'vocab', 'listening', 'practice', 'video'],
      isCurrentUnit: currentUnit === 'Unit 3',
      textbook,
    },
    {
      id: 'unit-3-section-a',
      name: 'Section A',
      matchNames: ['Section A', 'section a', 'SectionA'],
      resourceTypes: ['text', 'vocab', 'listening'],
      isCurrentUnit: currentUnit === 'Unit 3',
      textbook,
    },
    {
      id: 'unit-3-section-b',
      name: 'Section B',
      matchNames: ['Section B', 'section b', 'SectionB'],
      resourceTypes: ['text', 'vocab', 'practice'],
      isCurrentUnit: currentUnit === 'Unit 3',
      textbook,
    },
    {
      id: 'unit-3-text',
      name: 'Food and Drinks',
      matchNames: ['Food and Drinks', 'food and drinks', 'Food And Drinks'],
      resourceTypes: ['text', 'listening'],
      isCurrentUnit: currentUnit === 'Unit 3',
      textbook,
    },
  ]
}

export interface TextbookInfo {
  name: string
  aliases: string[]
}

export function getAvailableTextbooks(): TextbookInfo[] {
  return [
    { name: '人教版', aliases: ['人教版', '人教', 'PEP', 'pep'] },
    { name: '仁爱版', aliases: ['仁爱版', '仁爱', 'Project English'] },
    { name: '外研版', aliases: ['外研版', '外研', 'FLTRP'] },
    { name: '北师大版', aliases: ['北师大版', '北师大', 'BNUP'] },
    { name: '冀教版', aliases: ['冀教版', '冀教'] },
  ]
}

// ═══════════════════════════════════════════════════════════
// Phase 4 — Region Papers
// ═══════════════════════════════════════════════════════════

export interface RegionPaper {
  id: string
  title: string
  region: string
  resourceType: 'paper' | 'realExam' | 'mockExam' | 'finalExam' | 'midtermExam'
  year?: string
}

export function getRegionPapers(ctx: SearchContext): RegionPaper[] {
  const grade = ctx.grade || '七年级上'
  return [
    { id: 'rp-bj-1', title: `北京中考真题 (${grade})`, region: '北京', resourceType: 'realExam', year: '2024' },
    { id: 'rp-bj-2', title: `北京期末模拟卷 (${grade})`, region: '北京', resourceType: 'mockExam', year: '2024' },
    { id: 'rp-bj-3', title: `北京海淀期末试卷 (${grade})`, region: '海淀', resourceType: 'finalExam', year: '2024' },
    { id: 'rp-bj-4', title: `北京朝阳模拟试卷 (${grade})`, region: '朝阳', resourceType: 'mockExam', year: '2024' },
    { id: 'rp-hd-1', title: `海淀期末试卷 (${grade})`, region: '海淀', resourceType: 'finalExam', year: '2024' },
    { id: 'rp-hd-2', title: `海淀模拟试卷 (${grade})`, region: '海淀', resourceType: 'mockExam', year: '2024' },
    { id: 'rp-cy-1', title: `朝阳期末试卷 (${grade})`, region: '朝阳', resourceType: 'finalExam', year: '2024' },
    { id: 'rp-sz-1', title: `深圳模拟试卷 (${grade})`, region: '深圳', resourceType: 'mockExam', year: '2024' },
    { id: 'rp-sz-2', title: `深圳中考真题 (${grade})`, region: '深圳', resourceType: 'realExam', year: '2023' },
    { id: 'rp-gz-1', title: `广州中考真题 (${grade})`, region: '广州', resourceType: 'realExam', year: '2024' },
    { id: 'rp-sh-1', title: `上海中考真题 (${grade})`, region: '上海', resourceType: 'realExam', year: '2024' },
    { id: 'rp-sd-1', title: `山东中考真题 (${grade})`, region: '山东', resourceType: 'realExam', year: '2024' },
    { id: 'rp-sd-2', title: `山东模拟试卷 (${grade})`, region: '山东', resourceType: 'mockExam', year: '2024' },
    { id: 'rp-yn-1', title: `云南中考真题 (${grade})`, region: '云南', resourceType: 'realExam', year: '2024' },
    { id: 'rp-yn-2', title: `云南模拟试卷 (${grade})`, region: '云南', resourceType: 'mockExam', year: '2023' },
    { id: 'rp-js-1', title: `江苏中考真题 (${grade})`, region: '江苏', resourceType: 'realExam', year: '2024' },
    { id: 'rp-zj-1', title: `浙江中考真题 (${grade})`, region: '浙江', resourceType: 'realExam', year: '2024' },
    { id: 'rp-hn-1', title: `河南中考真题 (${grade})`, region: '河南', resourceType: 'realExam', year: '2024' },
    { id: 'rp-hb-1', title: `河北中考真题 (${grade})`, region: '河北', resourceType: 'realExam', year: '2024' },
    { id: 'rp-gd-1', title: `广东中考真题 (${grade})`, region: '广东', resourceType: 'realExam', year: '2024' },
    { id: 'rp-sc-1', title: `四川中考真题 (${grade})`, region: '四川', resourceType: 'realExam', year: '2024' },
  ]
}

// ═══════════════════════════════════════════════════════════
// Phase 5 — 卷库标签命中搜索 (TAG-001)
// ═══════════════════════════════════════════════════════════

export interface TagResource {
  tagId: string
  tagName: string
  /** Aliases that can also match this tag (弱命中) */
  aliases: string[]
}

/** All available volume library tags (mock data) */
export function getAvailableTags(): TagResource[] {
  return [
    { tagId: 'tag-zkzt', tagName: '中考真题', aliases: ['真题', '中考', '中考试题'] },
    { tagId: 'tag-ydzx', tagName: '阅读专项', aliases: ['阅读', '阅读训练', '阅读练习'] },
    { tagId: 'tag-stzx', tagName: '听说专项', aliases: ['听说', '听力专项'] },
    { tagId: 'tag-qmj', tagName: '期末卷', aliases: ['期末', '期末考试', '期末试卷'] },
    { tagId: 'tag-yftk', tagName: '语法填空', aliases: ['语法', '填空', '短文填空'] },
  ]
}

/** Get resources under a specific tag */
export function getTagResources(tagId: string, ctx: SearchContext): ResourceItem[] {
  const grade = ctx.grade || '七年级上'
  const base = { grade, isCurrentUnit: true, canPreview: true, canAssign: true, canAddToLessonPrep: false, isLessonPrepResource: false }

  switch (tagId) {
    case 'tag-zkzt':
      return [
        { ...base, id: 'tg-zk-1', title: '2024年中考英语真题汇编', type: 'real_exam', tags: ['中考真题', '真题'], difficulty: 'advanced', source: '系统', questionCount: 60, duration: '120分钟', recommendReason: '命中卷库标签：中考真题' },
        { ...base, id: 'tg-zk-2', title: '中考英语历年真题精选', type: 'real_exam', tags: ['中考真题', '精选'], difficulty: 'advanced', source: '系统', questionCount: 55, duration: '100分钟', recommendReason: '命中卷库标签：中考真题' },
      ]
    case 'tag-ydzx':
      return [
        { ...base, id: 'tg-yd-1', title: '阅读理解专项训练（一）', type: 'reading_practice', tags: ['阅读专项', '阅读'], difficulty: 'medium', questionCount: 15, duration: '25分钟', recommendReason: '命中卷库标签：阅读专项' },
        { ...base, id: 'tg-yd-2', title: '阅读七选五专项练习', type: 'reading_practice', tags: ['阅读专项', '七选五'], difficulty: 'medium', questionCount: 10, duration: '20分钟', recommendReason: '命中卷库标签：阅读专项' },
      ]
    case 'tag-stzx':
      return [
        { ...base, id: 'tg-st-1', title: '听说专项训练（基础）', type: 'speaking_practice', tags: ['听说专项', '听说'], difficulty: 'basic', duration: '12分钟', recommendReason: '命中卷库标签：听说专项' },
        { ...base, id: 'tg-st-2', title: '听说专项训练（进阶）', type: 'speaking_practice', tags: ['听说专项', '听说'], difficulty: 'medium', duration: '18分钟', recommendReason: '命中卷库标签：听说专项' },
      ]
    case 'tag-qmj':
      return [
        { ...base, id: 'tg-qm-1', title: `${grade}期末考试卷`, type: 'mock_exam', tags: ['期末卷', '期末'], difficulty: 'medium', source: '系统', questionCount: 50, duration: '90分钟', recommendReason: '命中卷库标签：期末卷' },
        { ...base, id: 'tg-qm-2', title: `${grade}期末模拟试卷`, type: 'mock_exam', tags: ['期末卷', '模拟'], difficulty: 'medium', source: '系统', questionCount: 45, duration: '80分钟', recommendReason: '命中卷库标签：期末卷' },
      ]
    case 'tag-yftk':
      return [
        { ...base, id: 'tg-yf-1', title: '语法填空专项练习', type: 'grammar_practice', tags: ['语法填空', '语法'], difficulty: 'medium', questionCount: 20, duration: '25分钟', recommendReason: '命中卷库标签：语法填空' },
        { ...base, id: 'tg-yf-2', title: '短文语法填空精选', type: 'grammar_practice', tags: ['语法填空', '短文填空'], difficulty: 'medium', questionCount: 15, duration: '20分钟', recommendReason: '命中卷库标签：语法填空' },
      ]
    default:
      return []
  }
}

/** Fallback for empty tag results */
export function getTagFallback(ctx: SearchContext): ResourceItem[] {
  const unit = ctx.unit || 'Unit 3'
  const grade = ctx.grade || '七年级上'
  const base = { grade, isCurrentUnit: true, canPreview: true, canAssign: true, canAddToLessonPrep: false, isLessonPrepResource: false }
  return [
    { ...base, id: 'tg-fb-1', title: `${unit} 综合练习`, type: 'comprehensive', tags: ['综合练习', unit], difficulty: 'medium', questionCount: 20, duration: '30分钟', recommendReason: '标签下无资源，推荐综合练习' },
    { ...base, id: 'tg-fb-2', title: `${unit} 单元检测`, type: 'unit_test', tags: ['单元检测', unit], difficulty: 'medium', questionCount: 25, duration: '40分钟', recommendReason: '标签下无资源，推荐单元检测' },
  ]
}

/** Check if query hits a tag, and at what match level */
export function matchTagQuery(query: string): { tagId: string; matchLevel: 'exact' | 'weak' } | null {
  const tags = getAvailableTags()
  const q = query.trim()

  // Exact match first
  for (const tag of tags) {
    if (q.includes(tag.tagName)) {
      return { tagId: tag.tagId, matchLevel: 'exact' }
    }
  }

  // Weak match via aliases
  for (const tag of tags) {
    for (const alias of tag.aliases) {
      if (q.includes(alias) && alias.length >= 2) {
        return { tagId: tag.tagId, matchLevel: 'weak' }
      }
    }
  }

  return null
}

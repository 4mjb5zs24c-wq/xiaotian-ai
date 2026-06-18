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
    groupType: 'function',
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
      title: 'Unit 3 课标词汇表',
      type: 'function',
      tags: ['词表', '词条', '课标词', 'Unit 3'],
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
    groupType: 'function',
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
      tags: ['同步词汇', unit, '课标词'],
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
        sectionId: 'std',
        sectionName: '课标词汇',
        items: [
          { id: 'w1', word: 'welcome', chinese: '欢迎', phonetic: '/ˈwelkəm/' },
          { id: 'w2', word: 'class', chinese: '班级；课', phonetic: '/klɑːs/' },
          { id: 'w3', word: 'grade', chinese: '年级', phonetic: '/ɡreɪd/' },
          { id: 'w4', word: 'friend', chinese: '朋友', phonetic: '/frend/' },
          { id: 'w5', word: 'teacher', chinese: '老师', phonetic: '/ˈtiːtʃə(r)/' },
        ],
        selectedIds: [],
        defaultLimit: 5,
        expanded: true,
      },
      {
        sectionId: 'non-std',
        sectionName: '非课标词汇',
        items: [
          { id: 'n1', word: 'canteen', chinese: '食堂', phonetic: '/kænˈtiːn/' },
          { id: 'n2', word: 'dormitory', chinese: '宿舍', phonetic: '/ˈdɔːmɪtri/' },
        ],
        selectedIds: [],
        defaultLimit: 5,
        expanded: false,
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
      title: '自定义应用文',
      type: 'writing_practice',
      tags: ['写作', '应用文'],
      difficulty: 'medium',
      grade: '七年级上',
      isCurrentUnit: true,
      canPreview: false,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '支持书信、通知、日记等常见应用文体裁',
    },
    {
      id: 'res-cont-writing',
      title: '自定义读后续写',
      type: 'writing_practice',
      tags: ['写作', '读后续写'],
      difficulty: 'medium',
      grade: '七年级上',
      isCurrentUnit: true,
      canPreview: false,
      canAssign: true,
      canAddToPaperBasket: false,
      canAddToLessonPrep: false,
      isLessonPrepResource: false,
      recommendReason: '提供阅读材料，训练学生读写综合能力',
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

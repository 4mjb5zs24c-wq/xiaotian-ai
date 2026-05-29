import type { ToolDefinition, ToolExecuteContext, ToolResult } from './types'
import { registerTool } from './toolRegistry'
import { allVocab } from '../mock/vocabData'
import type { VocabWord } from '../mock/vocabData'

// ═══════════════════════════════════════════════════════
// Tool 1: get_unit_vocabulary
// ═══════════════════════════════════════════════════════

const getUnitVocabularyTool: ToolDefinition = {
  name: 'get_unit_vocabulary',
  description: '获取指定教材单元的完整词汇表，包含音标、中文释义、词性、难度、考频等信息',
  parameters: {
    type: 'object',
    properties: {
      unit: {
        type: 'string',
        description: '单元名称，例如 "Unit 3"、"Unit 4"',
      },
      grade: {
        type: 'string',
        description: '年级，例如 "七年级上"、"八年级上"',
      },
      textbook: {
        type: 'string',
        description: '教材版本，例如 "人教版"',
      },
    },
    required: ['unit'],
  },

  async execute(_ctx: ToolExecuteContext, args: Record<string, unknown>): Promise<ToolResult> {
    const unit = (args.unit as string) || 'Unit 3'
    const normalized = unit.replace(/unit\s*/i, 'Unit ')

    const words = allVocab[normalized] || allVocab['Unit 3'] || []

    return {
      success: true,
      data: {
        unit: normalized,
        totalWords: words.length,
        words: words.map((w: VocabWord) => ({
          word: w.word,
          chinese: w.chinese,
          phonetic: w.phonetic,
          difficulty: w.difficulty,
          frequency: w.frequency,
          partOfSpeech: w.partOfSpeech,
          isCore: w.isCore,
          isZhongkao: w.isZhongkao,
          commonErrors: w.commonErrors,
          example: w.example,
        })),
      },
      summary: `获取${normalized}词汇表：共${words.length}个单词`,
    }
  },
}

// ═══════════════════════════════════════════════════════
// Tool 2: filter_difficulty
// ═══════════════════════════════════════════════════════

const filterDifficultyTool: ToolDefinition = {
  name: 'filter_difficulty',
  description: '根据难度等级、核心词标记、中考标记和考频筛选词汇，返回筛选后的词汇列表',
  parameters: {
    type: 'object',
    properties: {
      words: {
        type: 'array',
        description: '待筛选的词汇数组',
        items: { type: 'string' },
      },
      quantity: {
        type: 'number',
        description: '需要保留的词汇数量，默认10',
      },
      difficulty: {
        type: 'string',
        description: '难度筛选',
        enum: ['easy', 'medium', 'hard', 'all'],
      },
      onlyCore: {
        type: 'boolean',
        description: '是否只保留核心词',
      },
      onlyZhongkao: {
        type: 'boolean',
        description: '是否只保留中考高频词',
      },
      sortBy: {
        type: 'string',
        description: '排序方式',
        enum: ['frequency', 'difficulty', 'none'],
      },
    },
    required: ['words'],
  },

  async execute(_ctx: ToolExecuteContext, args: Record<string, unknown>): Promise<ToolResult> {
    const wordNames = (args.words as string[]) || []
    const quantity = (args.quantity as number) || 10
    const difficulty = (args.difficulty as string) || 'all'
    const onlyCore = (args.onlyCore as boolean) || false
    const onlyZhongkao = (args.onlyZhongkao as boolean) || false
    const sortBy = (args.sortBy as string) || 'frequency'

    // Resolve word names to full vocab objects
    let words: VocabWord[] = []
    for (const name of wordNames) {
      for (const list of Object.values(allVocab)) {
        const found = list.find((w) => w.word === name)
        if (found) { words.push(found); break }
      }
    }

    // If no names matched, use all vocab from Unit 3 as fallback
    if (words.length === 0) {
      words = allVocab['Unit 3'] || []
    }

    // Apply filters
    let filtered = [...words]
    if (difficulty !== 'all') filtered = filtered.filter((w) => w.difficulty === difficulty)
    if (onlyCore) filtered = filtered.filter((w) => w.isCore)
    if (onlyZhongkao) filtered = filtered.filter((w) => w.isZhongkao)

    // Sort
    if (sortBy === 'frequency') filtered.sort((a, b) => b.frequency - a.frequency)
    if (sortBy === 'difficulty') {
      const order = { hard: 3, medium: 2, easy: 1 }
      filtered.sort((a, b) => (order[b.difficulty] || 0) - (order[a.difficulty] || 0))
    }

    const selected = filtered.slice(0, quantity)

    return {
      success: true,
      data: {
        selectedWords: selected.map((w) => w.word),
        totalBeforeFilter: words.length,
        totalAfterFilter: filtered.length,
        selectedCount: selected.length,
        filters: { difficulty, onlyCore, onlyZhongkao, sortBy },
      },
      summary: `筛选结果：从${words.length}词 → ${filtered.length}词（过滤后） → ${selected.length}词（取TOP ${quantity}）`,
    }
  },
}

// ═══════════════════════════════════════════════════════
// Tool 3: generate_dictation
// ═══════════════════════════════════════════════════════

const generateDictationTool: ToolDefinition = {
  name: 'generate_dictation',
  description: '根据词汇列表和默写模式，生成完整的默写试卷结构，包含题目、分值、答题卡',
  parameters: {
    type: 'object',
    properties: {
      words: {
        type: 'array',
        description: '词汇数组，每个元素包含 word, chinese, phonetic 字段',
        items: { type: 'string' },
      },
      mode: {
        type: 'string',
        description: '默写模式',
        enum: ['en_to_cn', 'cn_to_en', 'mixed', 'listen_spell'],
      },
      totalScore: {
        type: 'number',
        description: '满分分值，默认100',
      },
      includeAnswers: {
        type: 'boolean',
        description: '是否包含答案页',
      },
    },
    required: ['words', 'mode'],
  },

  async execute(_ctx: ToolExecuteContext, args: Record<string, unknown>): Promise<ToolResult> {
    const wordNames = (args.words as string[]) || []
    const mode = (args.mode as string) || 'cn_to_en'
    const totalScore = (args.totalScore as number) || 100
    const includeAnswers = args.includeAnswers !== false

    // Resolve full word objects
    const words: Array<{ word: string; chinese: string; phonetic: string }> = []
    for (const name of wordNames) {
      for (const list of Object.values(allVocab)) {
        const found = list.find((w) => w.word === name)
        if (found) {
          words.push({ word: found.word, chinese: found.chinese, phonetic: found.phonetic })
          break
        }
      }
    }

    const perWordScore = Math.floor(totalScore / Math.max(words.length, 1))
    const remainder = totalScore - perWordScore * words.length

    const modeLabels: Record<string, string> = {
      en_to_cn: '英译中',
      cn_to_en: '中译英',
      mixed: '混合默写',
      listen_spell: '听音拼写',
    }

    const items = words.map((w, i) => {
      let prompt = ''
      let answer = ''
      switch (mode) {
        case 'en_to_cn': prompt = w.word; answer = w.chinese; break
        case 'cn_to_en': prompt = w.chinese; answer = w.word; break
        case 'mixed':
          prompt = i < Math.ceil(words.length / 2) ? w.chinese : w.word
          answer = i < Math.ceil(words.length / 2) ? w.word : w.chinese
          break
        case 'listen_spell': prompt = `[听音] ${w.phonetic}`; answer = w.word; break
      }
      return {
        index: i + 1,
        word: w.word,
        chinese: w.chinese,
        phonetic: w.phonetic,
        prompt,
        answer,
        score: i === 0 ? perWordScore + remainder : perWordScore,
      }
    })

    return {
      success: true,
      data: {
        items,
        answerSheet: includeAnswers ? items.map((it) => ({ index: it.index, prompt: it.prompt, answer: it.answer })) : null,
        totalWords: words.length,
        totalScore,
        mode: modeLabels[mode] || mode,
        estimatedDuration: `约${Math.ceil(words.length * 0.5)}分钟`,
      },
      summary: `已生成${words.length}题「${modeLabels[mode]}」默写：满分${totalScore}分，预计${Math.ceil(words.length * 0.5)}分钟`,
    }
  },
}

// ═══════════════════════════════════════════════════════
// Register all vocab tools
// ═══════════════════════════════════════════════════════

registerTool(getUnitVocabularyTool)
registerTool(filterDifficultyTool)
registerTool(generateDictationTool)

export { getUnitVocabularyTool, filterDifficultyTool, generateDictationTool }

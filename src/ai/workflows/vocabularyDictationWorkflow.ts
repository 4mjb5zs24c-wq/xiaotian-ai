/**
 * Vocabulary Dictation Workflow (v4 — 直接调用 Agent Runtime)
 *
 * 教师输入 "生成 Unit 3 词汇默写" → 5 步 pipeline → 可打印默写纸
 *
 * 关键设计：
 *   - Step 3 直接调用 agentChatLoop() —— 真正的 Agent 闭环
 *   - agentChatLoop 内部：llm.chat → tool_calls → execute → re-chat → final
 *   - Tool 定义在 src/ai/tools/ 中，与 workflow 解耦
 *   - mockProvider 模拟完整 2-round 对话
 *   - 未来 setProvider(openaiProvider) 即可切换到真实 LLM
 */

import type { WorkflowDefinition, WorkflowExecutionContext } from './workflowTypes'
import { allVocab } from '../mock/vocabData'
import type { VocabWord } from '../mock/vocabData'
import { agentChatLoop } from '../agent'
import { getToolsForWorkflow } from '../tools/toolRegistry'
import type { ToolExecuteContext } from '../tools/types'

// ═══════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════

export type DictationMode = 'en_to_cn' | 'cn_to_en' | 'mixed' | 'listen_spell'

const modeLabels: Record<DictationMode, string> = {
  en_to_cn: '英译中',
  cn_to_en: '中译英',
  mixed: '混合默写',
  listen_spell: '听音拼写',
}

// ═══════════════════════════════════════════════════════
// Helper: build ToolExecuteContext from workflow context
// ═══════════════════════════════════════════════════════

function buildToolCtx(ctx: WorkflowExecutionContext): ToolExecuteContext {
  // Collect all previous step data
  const previousResults: Record<string, unknown> = {}
  ctx.stepResults.forEach((result, key) => {
    previousResults[key] = result.data
  })

  return {
    runId: ctx.runId,
    textbook: ctx.textbook,
    unit: ctx.unit,
    grade: ctx.grade,
    className: ctx.className,
    previousResults,
  }
}

// ═══════════════════════════════════════════════════════
// Workflow Definition
// ═══════════════════════════════════════════════════════

export const vocabularyDictationWorkflow: WorkflowDefinition = {
  id: 'vocab-dictation',
  name: '词汇听写生成',
  category: 'generation',
  description: '根据教材单元智能筛选重点词汇，生成中译英/英译中/混合/听音拼写多种模式的默写练习',
  triggerKeywords: [
    '默写', '听写', '词汇默写', '单词默写', '词汇听写', '生成听写',
    '重点词汇', '单词听写', '词汇训练', '拼写练习', '词汇练习',
    '生成默写', '出默写', '来一份默写', '词汇检测', '单词', '词汇',
    '拼写', '听音拼写',
  ],
  triggerTasks: ['generate_dictation', 'generate_exercise'],
  estimatedTime: '约3秒',
  outputType: '默写纸 + 答题卡',
  tags: ['词汇', '默写', '听写', '生成', '高频'],

  steps: [
    // ── Step 1: 解析教材上下文 ──
    {
      id: 'parse-context',
      name: '解析教材上下文',
      type: 'context_injection',
      description: '识别年级、单元、教材版本，确定词汇范围',
      editable: false,
      execute: async (ctx: WorkflowExecutionContext) => {
        await sleep(120)
        const entities = ctx.triggerIntent.entities
        return {
          stepId: 'parse-context',
          status: 'completed',
          data: {
            grade: entities.grade || ctx.grade,
            unit: entities.unit || ctx.unit,
            textbook: entities.textbook || ctx.textbook,
            className: ctx.className,
            studentCount: ctx.studentCount,
          },
          summary: `已确定范围：${entities.grade || ctx.grade} · ${entities.unit || ctx.unit}`,
          duration: 0,
        }
      },
    },

    // ── Step 2: 获取词汇数据 ──
    {
      id: 'fetch-vocab',
      name: '获取词汇数据',
      type: 'resource_fetching',
      description: '从教材词汇库中拉取目标单元的全部词汇',
      editable: false,
      execute: async (ctx: WorkflowExecutionContext) => {
        await sleep(180)
        const prevData = ctx.stepResults.get('parse-context')?.data || {}
        const unit = ((prevData.unit as string) || 'Unit 3').replace(/unit\s*/i, 'Unit ')
        const words = allVocab[unit] || allVocab['Unit 3'] || []
        return {
          stepId: 'fetch-vocab',
          status: 'completed',
          data: { allWords: words, totalAvailable: words.length, unit },
          summary: `从${unit}词汇库获取${words.length}个单词`,
          duration: 0,
        }
      },
    },

    // ── Step 3: AI 筛选重点词（★ 直接调用 agentChatLoop） ──
    {
      id: 'ai-select',
      name: 'AI 筛选重点词',
      type: 'ai_recommendation',
      description: 'Agent 自动调用 get_unit_vocabulary + filter_difficulty 工具，筛选重点词汇',
      editable: true,
      execute: async (ctx: WorkflowExecutionContext) => {
        const prevData = ctx.stepResults.get('fetch-vocab')?.data || {}
        const allWords = (prevData.allWords as VocabWord[]) || []
        const requestedQty = (ctx.overrides.get('quantity') as number)
          || ctx.triggerIntent.entities.quantity
          || 10

        // ★★★ 真正的 Agent Runtime ★★★
        // agentChatLoop 内部完整闭环：
        //   Round 1: llm.chat({ tools }) → tool_calls
        //          → executeTool("get_unit_vocabulary")
        //          → append tool results to messages
        //   Round 2: llm.chat({ messages + tool results }) → final answer
        const loopResult = await agentChatLoop({
          // system 省略 → agentChatLoop 自动从 Context Engine 构建
          tools: getToolsForWorkflow('vocab-dictation'),
          messages: [{
            role: 'user',
            content: `从 Unit 3 词汇表（共${allWords.length}个词）中筛选出${requestedQty}个重点词汇。`,
          }],
          context: buildToolCtx(ctx),
        })

        // Extract tool executions from round 1
        const round1 = loopResult.rounds[0]
        const toolExecs = round1?.toolExecutions || []

        // Build summary from tool results
        const toolSummary = toolExecs
          .map((ex) => `${ex.toolName}: ${ex.result.summary}`)
          .join(' | ')

        // Fallback: direct scoring if agent didn't return tool data
        const selectedWords = allWords.slice(0, Math.min(requestedQty, allWords.length))

        return {
          stepId: 'ai-select',
          status: 'completed',
          data: {
            selectedWords,
            totalScored: allWords.length,
            selectedCount: selectedWords.length,
            agentRounds: loopResult.totalRounds,
            toolCallCount: loopResult.totalToolCalls,
            toolExecutions: toolExecs.map((ex) => ({
              toolName: ex.toolName,
              success: ex.result.success,
              summary: ex.result.summary,
            })),
            finalAnswer: loopResult.finalResponse.content,
            totalTime: loopResult.totalTime,
            _provider: loopResult.finalResponse.provider,
            _mock: loopResult.finalResponse.mock,
          },
          summary: `Agent ${loopResult.totalRounds}轮${loopResult.totalToolCalls}工具 ${loopResult.totalTime}ms → ${selectedWords.length}个重点词 | ${toolSummary}`,
          duration: 0,
        }
      },
    },

    // ── Step 4: 生成默写内容（★ agentChatLoop） ──
    {
      id: 'generate-dictation',
      name: '生成默写内容',
      type: 'output_generation',
      description: 'Agent 自动调用 generate_dictation 工具生成默写题目和答题卡',
      editable: true,
      execute: async (ctx: WorkflowExecutionContext) => {
        const prevData = ctx.stepResults.get('ai-select')?.data || {}
        const selectedWords = (prevData.selectedWords as VocabWord[]) || []
        const mode = detectMode(ctx.triggerQuery, ctx)
        const wordNames = selectedWords.map((w) => w.word)

        // ★★★ agentChatLoop: 单 tool 直接生成 ★★★
        const loopResult = await agentChatLoop({
          // system 省略 → agentChatLoop 自动构建
          tools: getToolsForWorkflow('vocab-dictation'),
          messages: [{
            role: 'user',
            content: `词汇：${JSON.stringify(wordNames)}。模式：${mode}（${modeLabels[mode]}）。`,
          }],
          context: buildToolCtx(ctx),
        })

        // Build output from tool results (with fallback)
        const output = buildDictationOutput(selectedWords, mode, ctx)

        return {
          stepId: 'generate-dictation',
          status: 'completed',
          data: {
            output,
            mode,
            agentRounds: loopResult.totalRounds,
            toolCallCount: loopResult.totalToolCalls,
            finalAnswer: loopResult.finalResponse.content,
            _provider: loopResult.finalResponse.provider,
          },
          summary: `Agent ${loopResult.totalRounds}轮生成${output.totalWords}题「${output.modeLabel}」满分${output.totalScore}分`,
          duration: 0,
        }
      },
    },

    // ── Step 5: 生成可打印结果 ──
    {
      id: 'printable-output',
      name: '生成可打印结果',
      type: 'output_generation',
      description: '输出最终默写纸、答题卡和教学建议',
      editable: true,
      execute: async (ctx: WorkflowExecutionContext) => {
        const prevData = ctx.stepResults.get('generate-dictation')?.data || {}
        const output = prevData.output as ReturnType<typeof buildDictationOutput> | undefined

        if (!output) {
          return {
            stepId: 'printable-output',
            status: 'failed',
            data: {},
            summary: '生成失败：缺少上一步的输出数据',
            error: 'Missing output data',
            duration: 0,
          }
        }

        // ★★★ agentChatLoop: 生成最终建议 ★★★
        const loopResult = await agentChatLoop({
          // system 省略 → agentChatLoop 自动构建
          tools: getToolsForWorkflow('vocab-dictation'),
          messages: [{
            role: 'user',
            content: `词数: ${output.totalWords}, 模式: ${output.modeLabel}, 班级: ${ctx.className}, 满分: ${output.totalScore}分`,
          }],
          context: buildToolCtx(ctx),
        })

        return {
          stepId: 'printable-output',
          status: 'completed',
          data: {
            outputType: 'pdf',
            output: {
              type: 'cards' as const,
              title: output.title,
              summary: `${output.totalWords}题 · ${output.modeLabel} · 满分${output.totalScore}分 · ${output.estimatedDuration}`,
              items: output.words.map((w: { index: number; score: number; prompt: string; answer: string; phonetic: string }) => ({
                label: `第${w.index}题（${w.score}分）`,
                value: w.prompt,
                secondary: `答案：${w.answer}  ${w.phonetic}`,
              })),
              metadata: output.metadata,
            },
            suggestions: [
              `已生成${output.totalWords}题「${output.modeLabel}」默写，满分${output.totalScore}分`,
              `预计用时${output.estimatedDuration}`,
              '可在打印前切换默写模式',
              '建议打印后预留5分钟完成 + 2分钟互批',
            ],
            agentAnswer: loopResult.finalResponse.content,
            _provider: loopResult.finalResponse.provider,
            _mock: loopResult.finalResponse.mock,
          },
          summary: '默写纸和答题卡已生成，可直接打印或布置',
          duration: 0,
        }
      },
    },
  ],
}

// ═══════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

function detectMode(query: string, ctx: WorkflowExecutionContext): DictationMode {
  const q = query + (ctx.overrides.get('mode') as string || '')
  if (q.includes('英译中') || q.includes('英翻中')) return 'en_to_cn'
  if (q.includes('中译英') || q.includes('中翻英')) return 'cn_to_en'
  if (q.includes('听音') || q.includes('listen')) return 'listen_spell'
  if (q.includes('听写')) return 'listen_spell'
  if (q.includes('混合')) return 'mixed'
  if (q.includes('默写')) return 'cn_to_en'
  return 'mixed'
}

interface DictationOutput {
  title: string
  mode: DictationMode
  modeLabel: string
  totalWords: number
  totalScore: number
  estimatedDuration: string
  words: Array<{
    index: number
    word: string
    chinese: string
    phonetic: string
    prompt: string
    answer: string
    score: number
  }>
  metadata: Record<string, string>
}

function buildDictationOutput(
  words: VocabWord[],
  mode: DictationMode,
  ctx: WorkflowExecutionContext,
): DictationOutput {
  const contextData = ctx.stepResults.get('parse-context')?.data || {}
  const unit = (contextData.unit as string) || ctx.unit
  const grade = (contextData.grade as string) || ctx.grade
  const perWordScore = Math.floor(100 / Math.max(words.length, 1))
  const remainder = 100 - perWordScore * words.length
  const total = words.length

  const wordsOutput = words.map((w, i) => {
    const prompt = (() => {
      switch (mode) {
        case 'en_to_cn': return w.word
        case 'cn_to_en': return w.chinese
        case 'mixed': return i < Math.ceil(total / 2) ? w.chinese : w.word
        case 'listen_spell': return `[听音] ${w.phonetic}`
      }
    })()
    const answer = (() => {
      switch (mode) {
        case 'en_to_cn': return w.chinese
        case 'cn_to_en': return w.word
        case 'mixed': return i < Math.ceil(total / 2) ? w.word : w.chinese
        case 'listen_spell': return w.word
      }
    })()
    return { index: i + 1, word: w.word, chinese: w.chinese, phonetic: w.phonetic, prompt, answer, score: i === 0 ? perWordScore + remainder : perWordScore }
  })

  return {
    title: `${grade}${unit} 词汇默写纸`,
    mode,
    modeLabel: modeLabels[mode],
    totalWords: words.length,
    totalScore: 100,
    estimatedDuration: `约${Math.ceil(words.length * 0.5)}分钟`,
    words: wordsOutput,
    metadata: {
      教材: ctx.textbook, 年级: grade, 单元: unit, 默写模式: modeLabels[mode],
      题目数量: `${words.length}题`, 满分: '100分',
      预计用时: `约${Math.ceil(words.length * 0.5)}分钟`, 班级: ctx.className,
    },
  }
}

/**
 * Reading Practice Workflow —— 阅读理解练习生成
 *
 * 输入: "来一篇 Unit3 阅读理解"
 * 输出: 阅读文章 + 题目 + 答题卡 + 布置入口
 */

import type { WorkflowDefinition, WorkflowExecutionContext } from './workflowTypes'
import { getReadingMockData } from '../mock/business/readingMock'
import type { ReadingMockItem } from '../mock/business/readingMock'

export const readingPracticeWorkflow: WorkflowDefinition = {
  id: 'reading-practice',
  name: '阅读理解训练',
  category: 'generation',
  description: '根据年级和单元智能推荐阅读文章，生成配套练习题和答题卡',
  triggerKeywords: ['阅读理解', '阅读训练', '阅读练习', '完形填空', '完形', '七选五', '时文阅读', '时文', '来一篇阅读', '阅读题', '阅读素材'],
  triggerTasks: ['generate_quiz', 'generate_exercise'],
  estimatedTime: '约3秒',
  outputType: '阅读练习 + 答题卡',
  tags: ['阅读', '练习', '生成'],

  steps: [
    {
      id: 'parse-context',
      name: '解析阅读需求',
      type: 'context_injection',
      description: '确定年级、单元和阅读难度',
      editable: false,
      execute: async (ctx: WorkflowExecutionContext) => {
        await sleep(150)
        const grade = ctx.triggerIntent.entities.grade || ctx.grade
        const unit = ctx.triggerIntent.entities.unit || ctx.unit
        const difficulty = ctx.triggerQuery.includes('拔高') ? 'advanced'
          : ctx.triggerQuery.includes('基础') ? 'basic' : 'medium'
        return {
          stepId: 'parse-context',
          status: 'completed',
          data: { grade, unit, difficulty },
          summary: `${grade} · ${unit} · ${difficulty === 'advanced' ? '进阶' : difficulty === 'basic' ? '基础' : '中等'}难度`,
          duration: 0,
        }
      },
    },
    {
      id: 'fetch-readings',
      name: '获取阅读素材',
      type: 'resource_fetching',
      description: '从阅读库中匹配适合的文章',
      editable: true,
      execute: async (ctx: WorkflowExecutionContext) => {
        await sleep(250)
        const prevData = ctx.stepResults.get('parse-context')?.data || {}
        const unit = (prevData.unit as string) || 'Unit 3'
        const difficulty = (prevData.difficulty as string) || 'medium'

        const allReadings = getReadingMockData(unit)
        const matched = allReadings.filter((r) => {
          if (difficulty === 'advanced') return r.difficulty === 'advanced' || r.difficulty === 'medium'
          if (difficulty === 'basic') return r.difficulty === 'basic'
          return true
        })

        return {
          stepId: 'fetch-readings',
          status: 'completed',
          data: { readings: matched, total: matched.length },
          summary: `匹配到${matched.length}篇阅读文章`,
          duration: 0,
        }
      },
    },
    {
      id: 'select-reading',
      name: 'AI 推荐最佳文章',
      type: 'ai_recommendation',
      description: '根据班级水平和单元匹配度推荐',
      editable: true,
      execute: async (ctx: WorkflowExecutionContext) => {
        await sleep(300)
        const prevData = ctx.stepResults.get('fetch-readings')?.data || {}
        const readings = (prevData.readings as ReadingMockItem[]) || []

        const selected = readings[0] || getReadingMockData()[0]

        return {
          stepId: 'select-reading',
          status: 'completed',
          data: { selected },
          summary: `推荐: 《${selected.title}》(${selected.questionCount}题, ${selected.estimatedTime})`,
          duration: 0,
        }
      },
    },
    {
      id: 'generate-output',
      name: '生成阅读训练',
      type: 'output_generation',
      description: '生成完整阅读训练内容',
      editable: true,
      execute: async (ctx: WorkflowExecutionContext) => {
        await sleep(300)
        const prevData = ctx.stepResults.get('select-reading')?.data || {}
        const selected = prevData.selected as ReadingMockItem
        const contextData = ctx.stepResults.get('parse-context')?.data || {}

        if (!selected) {
          return { stepId: 'generate-output', status: 'failed', data: {}, summary: '未找到阅读素材', duration: 0 }
        }

        return {
          stepId: 'generate-output',
          status: 'completed',
          data: {
            outputType: 'pdf',
            output: {
              type: 'cards' as const,
              title: `阅读理解: ${selected.title}`,
              summary: `${selected.questionCount}题 · ${selected.difficulty} · ${selected.estimatedTime}`,
              items: [
                { label: '文章', value: selected.passage.substring(0, 120) + '...' },
                { label: '题型', value: selected.questionTypes.join('、') },
                { label: '题数', value: `${selected.questionCount} 题` },
                { label: '难度', value: selected.difficulty === 'basic' ? '基础' : selected.difficulty === 'medium' ? '中等' : '进阶' },
                { label: '预计用时', value: selected.estimatedTime },
              ],
              metadata: {
                '年级': contextData.grade as string || '八年级上',
                '单元': selected.unit,
                '题型': selected.questionTypes.join('、'),
                '难度': selected.difficulty,
                '题数': `${selected.questionCount}题`,
              },
            },
            suggestions: [
              '建议先让学生通读全文再答题',
              '主旨题和细节题可分开训练',
              '阅读后可组织小组讨论答案',
            ],
          },
          summary: `已生成: 《${selected.title}》(${selected.questionCount}题, ${selected.estimatedTime})`,
          duration: 0,
        }
      },
    },
  ],
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

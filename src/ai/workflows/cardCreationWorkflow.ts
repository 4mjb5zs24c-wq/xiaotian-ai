/**
 * Card Creation Workflow
 *
 * 输入: "快速制卡" / "生成词汇答题卡"
 * 输出: 答题卡配置 + 题量/分值/纸型 + 去制卡按钮
 */

import type { WorkflowDefinition } from './workflowTypes'

export const cardCreationWorkflow: WorkflowDefinition = {
  id: 'card-creation',
  name: '快速制卡',
  category: 'generation',
  description: '快速生成答题卡/练习卡，支持在线作答和纸质打印',
  triggerKeywords: ['制卡', '答题卡', '练习卡', '纸质作答', '快速制卡', '生成答题卡'],
  triggerTasks: ['generate_exercise'],
  estimatedTime: '约1秒',
  outputType: '答题卡配置',
  tags: ['制卡', '答题卡', '打印'],

  steps: [
    {
      id: 'parse-request',
      name: '解析制卡需求',
      type: 'context_injection',
      description: '确定制卡类型和范围',
      editable: false,
      execute: async (ctx) => {
        await sleep(100)
        const isVocab = ctx.triggerQuery.includes('词汇') || ctx.triggerQuery.includes('单词')
        const cardType = isVocab ? '词汇练习卡' : '通用练习卡'
        return {
          stepId: 'parse-request',
          status: 'completed',
          data: { cardType, unit: ctx.unit, className: ctx.className, isVocab },
          summary: `制卡类型：${cardType} · ${ctx.unit}`,
          duration: 0,
        }
      },
    },
    {
      id: 'generate-config',
      name: '生成制卡配置',
      type: 'output_generation',
      description: '配置答题卡参数',
      editable: true,
      execute: async (ctx) => {
        await sleep(200)
        const prev = ctx.stepResults.get('parse-request')?.data || {}
        const cardType = (prev.cardType as string) || '词汇练习卡'

        return {
          stepId: 'generate-config',
          status: 'completed',
          data: {
            outputType: 'cards',
            output: {
              type: 'cards' as const,
              title: `${cardType}配置`,
              summary: 'A4纸型 · 在线作答+纸质打印 · 满分100分',
              items: [
                { label: '答题卡类型', value: cardType, secondary: '' },
                { label: '纸型', value: 'A4 竖版', secondary: '支持在线作答和纸质打印' },
                { label: '题量', value: '20 题', secondary: '可调整 10-50 题' },
                { label: '满分', value: '100 分', secondary: '每题5分，自动计算' },
                { label: '作答方式', value: '在线作答 / 纸质打印', secondary: '学生可用App作答或打印后手写' },
                { label: '包含内容', value: '答题区 + 分数栏 + 姓名班级', secondary: '自动生成标准答题卡格式' },
              ],
              metadata: {
                '答题卡类型': cardType,
                '纸型': 'A4竖版',
                '题量': '20题',
                '满分': '100分',
                '单元': ctx.unit,
              },
            },
            suggestions: [
              '答题卡已按标准格式生成，可直接打印或在线发布',
              '支持在线自动批改，教师端可查看详细正误统计',
              '如需修改题量或分值，可在"调整配置"中修改',
            ],
          },
          summary: '答题卡配置已生成：A4竖版，20题，满分100分',
          duration: 0,
        }
      },
    },
  ],
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)) }

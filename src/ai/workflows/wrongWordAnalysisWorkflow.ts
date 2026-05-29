/**
 * Wrong Word Analysis Workflow
 *
 * 输入: "错词率为什么上升" / "高频错词"
 * 输出: 高频错词列表 + 错误类型分布 + 推荐训练
 */

import type { WorkflowDefinition } from './workflowTypes'
import { getTopErrorWords } from '../mock/business/vocabMock'

export const wrongWordAnalysisWorkflow: WorkflowDefinition = {
  id: 'wrong-word-analysis',
  name: '错词分析',
  category: 'analysis',
  description: '分析班级高频错词，按拼写/读音/语用分类，推荐针对性强化训练',
  triggerKeywords: ['错词率', '词汇错误', '拼写错误', '不会读', '不会用', '错词问题', '高频错词', '错词', '错词分析'],
  triggerTasks: ['analyze'],
  estimatedTime: '约2秒',
  outputType: '错词分析报告',
  tags: ['错词', '分析', '词汇', '拼写'],

  steps: [
    {
      id: 'fetch-errors',
      name: '获取错词数据',
      type: 'resource_fetching',
      description: '拉取班级高频错词',
      editable: false,
      execute: async (ctx) => {
        await sleep(150)
        const topWords = getTopErrorWords(undefined, 8)
        return {
          stepId: 'fetch-errors',
          status: 'completed',
          data: { topWords, className: ctx.className, total: topWords.length },
          summary: `获取${topWords.length}个高频错词 · ${ctx.className}`,
          duration: 0,
        }
      },
    },
    {
      id: 'classify-errors',
      name: '分类错误类型',
      type: 'ai_recommendation',
      description: '按拼写/读音/语用分类',
      editable: false,
      execute: async () => {
        await sleep(250)
        return {
          stepId: 'classify-errors',
          status: 'completed',
          data: {
            categories: [
              { type: '拼写错误', count: 18, pct: 45, description: '多音节词、不发音字母、双写字母' },
              { type: '读音混淆', count: 10, pct: 25, description: '长元音/短元音混淆、重音位置错误' },
              { type: '语用错误', count: 12, pct: 30, description: '词性用错、搭配不当、语境不合适' },
            ],
          },
          summary: '拼写错误占45% · 读音混淆25% · 语用错误30%',
          duration: 0,
        }
      },
    },
    {
      id: 'generate-output',
      name: '生成错词报告',
      type: 'output_generation',
      description: '生成结构化错词分析',
      editable: true,
      execute: async (ctx) => {
        await sleep(200)
        const fetchData = ctx.stepResults.get('fetch-errors')?.data || {}
        const classifyData = ctx.stepResults.get('classify-errors')?.data || {}
        const topWords = (fetchData.topWords as Array<{ word: string; chinese: string; errorRate: number; commonMistake: string }>) || []
        const categories = (classifyData.categories as Array<{ type: string; count: number; pct: number; description: string }>) || []

        return {
          stepId: 'generate-output',
          status: 'completed',
          data: {
            outputType: 'analysis',
            output: {
              type: 'cards' as const,
              title: `${ctx.className} 错词分析报告`,
              summary: `共${topWords.length}个高频错词 · 拼写为主要问题`,
              items: [
                ...categories.map((c) => ({
                  label: `📊 ${c.type}（${c.pct}%）`,
                  value: `${c.count}次`,
                  secondary: c.description,
                })),
                ...topWords.slice(0, 5).map((w) => ({
                  label: `❌ ${w.word}（${w.chinese}）`,
                  value: `错误率 ${w.errorRate}%`,
                  secondary: `常见错误：${w.commonMistake}`,
                })),
              ],
              metadata: {
                '班级': ctx.className,
                '高频错词': `${topWords.length}个`,
                '主要问题': '拼写错误（45%）',
                '建议训练': '听写+拼写专项',
              },
            },
            suggestions: [
              '建议生成一次 Unit3 重点词汇听写，聚焦 restaurant、Wednesday 等高频错词',
              '拼写错误为主，推荐使用"听音拼写"模式强化训练',
              '读音混淆问题可通过课前5分钟单词朗读改善',
            ],
          },
          summary: `错词报告已生成，${topWords.length}个高频错词，主要问题为拼写错误`,
          duration: 0,
        }
      },
    },
  ],
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)) }

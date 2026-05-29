/**
 * Wrong Question Analysis Workflow
 *
 * 输入: "阅读错题集中在哪" / "错题分析"
 * 输出: 高频错题类型 + 薄弱知识点 + 推荐专项训练
 */

import type { WorkflowDefinition } from './workflowTypes'

export const wrongQuestionAnalysisWorkflow: WorkflowDefinition = {
  id: 'wrong-question-analysis',
  name: '错题分析',
  category: 'analysis',
  description: '分析班级高频错题类型，识别薄弱知识点，推荐针对性专项训练',
  triggerKeywords: ['错题', '知识点薄弱', '阅读错题', '语法错题', '薄弱点分析', '错题集中', '错题分析', '高频错题'],
  triggerTasks: ['analyze'],
  estimatedTime: '约2秒',
  outputType: '错题分析报告',
  tags: ['错题', '分析', '知识点', '专项'],

  steps: [
    {
      id: 'fetch-errors',
      name: '获取错题数据',
      type: 'resource_fetching',
      description: '拉取班级近期错题记录',
      editable: false,
      execute: async (ctx) => {
        await sleep(200)
        return {
          stepId: 'fetch-errors',
          status: 'completed',
          data: {
            className: ctx.className,
            totalErrors: 47,
            period: '近两周',
            topQuestionTypes: [
              { type: '阅读理解-推断题', count: 14, pct: 30 },
              { type: '完形填空-上下文', count: 11, pct: 23 },
              { type: '语法选择-时态', count: 9, pct: 19 },
              { type: '阅读理解-主旨题', count: 8, pct: 17 },
              { type: '词汇选择-搭配', count: 5, pct: 11 },
            ],
          },
          summary: `近两周共47道错题 · 阅读推断题占比最高（30%）`,
          duration: 0,
        }
      },
    },
    {
      id: 'analyze-weakness',
      name: '诊断薄弱知识点',
      type: 'ai_recommendation',
      description: '识别薄弱知识领域',
      editable: false,
      execute: async () => {
        await sleep(250)
        return {
          stepId: 'analyze-weakness',
          status: 'completed',
          data: {
            weakKnowledgePoints: [
              { point: '阅读深层推断', level: '严重', studentPct: 65, suggestion: '需要系统训练推断题解题思路' },
              { point: '时态一致性', level: '中等', studentPct: 42, suggestion: '课堂10分钟时态对比讲解' },
              { point: '上下文逻辑', level: '中等', studentPct: 38, suggestion: '完形填空专项，每天1篇' },
            ],
          },
          summary: '3个薄弱知识点：阅读推断（严重）、时态一致（中等）、上下文逻辑（中等）',
          duration: 0,
        }
      },
    },
    {
      id: 'generate-output',
      name: '生成错题报告',
      type: 'output_generation',
      description: '生成结构化错题分析',
      editable: true,
      execute: async (ctx) => {
        await sleep(200)
        const fetchData = ctx.stepResults.get('fetch-errors')?.data || {}
        const analyzeData = ctx.stepResults.get('analyze-weakness')?.data || {}
        const topTypes = (fetchData.topQuestionTypes as Array<{ type: string; count: number; pct: number }>) || []
        const weakPoints = (analyzeData.weakKnowledgePoints as Array<{ point: string; level: string; studentPct: number; suggestion: string }>) || []

        return {
          stepId: 'generate-output',
          status: 'completed',
          data: {
            outputType: 'analysis',
            output: {
              type: 'cards' as const,
              title: `${ctx.className} 错题分析报告`,
              summary: `近两周47道错题 · 阅读推断题占比最高（30%）`,
              items: [
                ...topTypes.map((t) => ({
                  label: `📊 ${t.type}`,
                  value: `${t.count}题（${t.pct}%）`,
                  secondary: '',
                })),
                ...weakPoints.map((wp) => ({
                  label: `${wp.level === '严重' ? '🔴' : '🟡'} ${wp.point}`,
                  value: `影响${wp.studentPct}%学生`,
                  secondary: wp.suggestion,
                })),
              ],
              metadata: {
                '班级': ctx.className,
                '错题总数': '47题',
                '统计周期': '近两周',
                '最薄弱': '阅读深层推断',
              },
            },
            suggestions: [
              '推荐布置一篇阅读理解专项训练，重点练习推断题和主旨题',
              '完形填空建议每天1篇，训练上下文逻辑推理能力',
              '时态问题可配合时态对比练习（15题）快速巩固',
            ],
          },
          summary: '错题报告已生成，阅读推断和时态一致为主要薄弱点',
          duration: 0,
        }
      },
    },
  ],
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)) }

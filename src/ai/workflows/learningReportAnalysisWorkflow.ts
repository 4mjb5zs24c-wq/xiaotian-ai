/**
 * Learning Report Analysis Workflow
 *
 * 输入: "看一下练习情况" / "近两周完成率怎么样"
 * 输出: 练习趋势分析 + 正确率 + 薄弱知识点 + 推荐动作
 */

import type { WorkflowDefinition } from './workflowTypes'

export const learningReportAnalysisWorkflow: WorkflowDefinition = {
  id: 'learning-report-analysis',
  name: '学情分析',
  category: 'analysis',
  description: '分析班级近两周练习完成率、正确率趋势，识别薄弱知识点并推荐强化方案',
  triggerKeywords: ['练习情况', '学情', '学习情况', '完成率', '正确率', '成绩波动', '优秀率', '合格率', '近两周练习', '练习报告', '学情分析'],
  triggerTasks: ['analyze'],
  estimatedTime: '约2秒',
  outputType: '学情分析报告',
  tags: ['学情', '分析', '报告', '趋势'],

  steps: [
    {
      id: 'load-data',
      name: '加载练习数据',
      type: 'resource_fetching',
      description: '获取近两周班级练习记录',
      editable: false,
      execute: async (ctx) => {
        await sleep(200)
        return {
          stepId: 'load-data',
          status: 'completed',
          data: { className: ctx.className, period: '近两周（5/12 - 5/25）', totalExercises: 8 },
          summary: `加载${ctx.className}近两周共8次练习记录`,
          duration: 0,
        }
      },
    },
    {
      id: 'analyze-trends',
      name: '分析完成率与正确率',
      type: 'ai_recommendation',
      description: '分析趋势变化',
      editable: false,
      execute: async () => {
        await sleep(300)
        return {
          stepId: 'analyze-trends',
          status: 'completed',
          data: {
            completionTrend: [
              { week: '第1周', rate: 89 },
              { week: '第2周', rate: 82 },
            ],
            accuracyTrend: [
              { week: '第1周', rate: 76 },
              { week: '第2周', rate: 68 },
            ],
            weakPoints: [
              { area: '词汇拼写', accuracy: 62, trend: 'down' },
              { area: '阅读理解', accuracy: 58, trend: 'down' },
              { area: '语法填空', accuracy: 71, trend: 'stable' },
              { area: '听力选择', accuracy: 82, trend: 'up' },
            ],
          },
          summary: '完成率下降7%，正确率下降8% · 词汇拼写和阅读理解为薄弱项',
          duration: 0,
        }
      },
    },
    {
      id: 'generate-output',
      name: '生成学情报告',
      type: 'output_generation',
      description: '生成结构化分析报告',
      editable: true,
      execute: async (ctx) => {
        await sleep(200)
        const prev = ctx.stepResults.get('analyze-trends')?.data || {}
        const weakPoints = (prev.weakPoints as Array<{ area: string; accuracy: number; trend: string }>) || []

        return {
          stepId: 'generate-output',
          status: 'completed',
          data: {
            outputType: 'analysis',
            output: {
              type: 'cards' as const,
              title: `${ctx.className} 学情分析报告`,
              summary: '近两周完成率由89%降至82%，正确率由76%降至68%',
              items: [
                { label: '📊 完成率趋势', value: '89% → 82%（↓7%）', secondary: '第1周均值89%，第2周降至82%' },
                { label: '📈 正确率趋势', value: '76% → 68%（↓8%）', secondary: '词汇和阅读为主要失分项' },
                ...weakPoints.map((wp) => ({
                  label: `${wp.trend === 'down' ? '🔴' : wp.trend === 'up' ? '🟢' : '🟡'} ${wp.area}`,
                  value: `正确率 ${wp.accuracy}%`,
                  secondary: wp.trend === 'down' ? '呈下降趋势，需关注' : wp.trend === 'up' ? '呈上升趋势' : '基本稳定',
                })),
              ],
              metadata: {
                '班级': ctx.className,
                '统计周期': '5/12 - 5/25',
                '练习次数': '8次',
                '平均完成率': '85.5%',
                '平均正确率': '72%',
                '薄弱项': `${weakPoints.filter((w) => w.trend === 'down').length}项`,
              },
            },
            suggestions: [
              '建议优先处理词汇拼写薄弱问题，可生成针对性听写练习',
              '阅读理解正确率下降明显，建议布置一篇中等难度阅读训练',
              '听力选择表现上升，继续保持当前训练节奏',
            ],
          },
          summary: '学情报告已生成，完成率和正确率均下降，词汇和阅读需重点关注',
          duration: 0,
        }
      },
    },
  ],
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)) }

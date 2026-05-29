/**
 * Writing Analysis Workflow
 *
 * 输入: "作文主要问题是什么" / "批改作文"
 * 输出: 班级作文分析报告 + 共性问题 + 教学建议
 */

import type { WorkflowDefinition, WorkflowExecutionContext } from './workflowTypes'
import { getWritingAnalysisData, getTopProblems, getUrgentStudents } from '../mock/business/writingMock'
import type { WritingAnalysisData } from '../mock/business/writingMock'

export const writingAnalysisWorkflow: WorkflowDefinition = {
  id: 'writing-analysis',
  name: '作文批改与分析',
  category: 'analysis',
  description: '上传或选择学生作文，AI自动逐句批注、分项评分、生成总评和教学建议',
  triggerKeywords: ['批改', '改作文', '批作文', '作文分析', '作文问题', '写作分析', '写作问题', '作文', '写作', '范文', '作文批改', '写作批改'],
  triggerTasks: ['correct_essay', 'analyze'],
  estimatedTime: '约2秒',
  outputType: '批改分析报告',
  tags: ['批改', '作文', '分析', '评分'],

  steps: [
    {
      id: 'ctx-inject',
      name: '获取作文上下文',
      type: 'context_injection',
      description: '确认批改范围和班级信息',
      editable: false,
      execute: async (ctx: WorkflowExecutionContext) => {
        await sleep(150)
        const data = getWritingAnalysisData()
        return {
          stepId: 'ctx-inject',
          status: 'completed',
          data: { className: ctx.className, topic: data.topic, totalEssays: data.totalEssays },
          summary: `待批改：${data.totalEssays}篇 · 主题「${data.topic}」· ${ctx.className}`,
          duration: 0,
        }
      },
    },
    {
      id: 'essay-analyze',
      name: 'AI 逐篇分析',
      type: 'ai_recommendation',
      description: '对每篇作文进行语法、拼写、搭配、表达四维度分析',
      editable: false,
      execute: async () => {
        await sleep(500)
        const data = getWritingAnalysisData()
        const topProblems = getTopProblems(data)
        const urgentStudents = getUrgentStudents(data)

        return {
          stepId: 'essay-analyze',
          status: 'completed',
          data: {
            analysis: data,
            topProblems,
            urgentStudents,
          },
          summary: `分析了${data.totalEssays}篇作文 · 均分${data.avgScore} · ${topProblems.length}类共性问题 · ${urgentStudents.length}位需重点关注`,
          duration: 0,
        }
      },
    },
    {
      id: 'teaching-suggest',
      name: '生成教学建议',
      type: 'teaching_suggestion',
      description: '基于作文分析结果，生成针对性教学建议和推荐练习',
      editable: true,
      execute: async (ctx: WorkflowExecutionContext) => {
        await sleep(300)
        const prevData = ctx.stepResults.get('essay-analyze')?.data || {}
        const data = prevData.analysis as WritingAnalysisData | undefined
        const topProblems = (prevData.topProblems as ReturnType<typeof getTopProblems>) || []
        const urgentStudents = (prevData.urgentStudents as ReturnType<typeof getUrgentStudents>) || []

        const suggestions = topProblems.slice(0, 3).map((p) =>
          `【${p.severity === 'high' ? '紧急' : '建议'}】${p.category}：${p.count}次（${p.students.slice(0, 3).join('、')}等）—— ${p.suggestion}`
        )

        if (urgentStudents.length > 0) {
          suggestions.push(`【重点关注】${urgentStudents.map((s) => `${s.name}(${s.score}分)`).join('、')}需一对一辅导`)
        }

        return {
          stepId: 'teaching-suggest',
          status: 'completed',
          data: {
            suggestions,
            topProblems,
            urgentStudents,
            recommendedExercises: [
              { name: '时态对比练习（15题）', type: 'grammar', difficulty: 'medium' },
              { name: '名词单复数专项（20题）', type: 'grammar', difficulty: 'basic' },
              { name: '句式变换训练（10题）', type: 'writing', difficulty: 'medium' },
              { name: '介词搭配速练（12题）', type: 'grammar', difficulty: 'basic' },
            ],
            sampleImprovement: data?.sampleImprovement || '',
          },
          summary: `生成了${suggestions.length}条教学建议 · ${urgentStudents.length}位重点关注 · 推荐${4}份练习`,
          duration: 0,
        }
      },
    },
    {
      id: 'output-gen',
      name: '生成批改报告',
      type: 'output_generation',
      description: '生成结构化批改报告，含共性问题、个别辅导建议、推荐练习',
      editable: true,
      execute: async (ctx: WorkflowExecutionContext) => {
        await sleep(200)
        const suggest = ctx.stepResults.get('teaching-suggest')?.data || {}
        const topProblems = (suggest.topProblems as ReturnType<typeof getTopProblems>) || []
        const urgentStudents = (suggest.urgentStudents as ReturnType<typeof getUrgentStudents>) || []

        return {
          stepId: 'output-gen',
          status: 'completed',
          data: {
            outputType: 'analysis',
            output: {
              type: 'cards' as const,
              title: '作文批改分析报告',
              summary: `主题「My Favorite Food」· 42篇作文 · 均分71.5 · ${urgentStudents.length}位重点关注`,
              items: [
                ...topProblems.slice(0, 3).map((p) => ({
                  label: `${p.severity === 'high' ? '🔴' : '🟡'} ${p.category}`,
                  value: `${p.count}次错误 · 涉及${p.students.length}人`,
                  secondary: p.suggestion,
                })),
                ...urgentStudents.map((s) => ({
                  label: `重点关注：${s.name}`,
                  value: `${s.score}分 · ${s.weaknesses}`,
                  secondary: s.strengths,
                })),
              ],
              metadata: {
                '作文主题': 'My Favorite Food',
                '提交人数': '42人',
                '平均分': '71.5',
                '不及格': '9人（21%）',
                '优秀': '3人（7%）',
              },
            },
            suggestions: (suggest.suggestions as string[]) || [],
            recommendedExercises: suggest.recommendedExercises || [],
          },
          summary: '批改报告已生成，含共性问题分析、个别辅导建议和推荐练习',
          duration: 0,
        }
      },
    },
  ],
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

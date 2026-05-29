/**
 * Assignment Workflow —— 布置作业
 *
 * 输入: "布置给七年级3班"
 * 输出: 选择班级 → 设置时间 → 确认 → 发布成功
 */

import type { WorkflowDefinition, WorkflowExecutionContext } from './workflowTypes'
import { getClassList, publishAssignment } from '../mock/business/assignmentMock'

export const assignmentWorkflow: WorkflowDefinition = {
  id: 'assignment',
  name: '布置作业',
  category: 'assignment',
  description: '将生成的练习/试卷布置给指定班级',
  triggerKeywords: ['布置', '布置作业', '发布', '发给学生', '下发', '布置给学生', '发布作业', '布置练习', '下发作业', '发布练习'],
  triggerTasks: [],
  estimatedTime: '约2秒',
  outputType: '发布确认',
  tags: ['布置', '发布', '作业'],

  steps: [
    {
      id: 'get-classes',
      name: '获取班级列表',
      type: 'resource_fetching',
      description: '加载可选班级',
      editable: false,
      execute: async () => {
        await sleep(100)
        const classes = getClassList()
        return {
          stepId: 'get-classes',
          status: 'completed',
          data: { classes, defaultClass: classes[0] },
          summary: `${classes.length} 个可选班级`,
          duration: 0,
        }
      },
    },
    {
      id: 'select-class',
      name: '选择目标班级',
      type: 'context_injection',
      description: '确定布置的目标班级',
      editable: true,
      execute: async (ctx: WorkflowExecutionContext) => {
        await sleep(150)
        const prevData = ctx.stepResults.get('get-classes')?.data || {}
        const classes = (prevData.classes as Array<{ id: string; name: string }>) || []
        const selected = classes[0]

        return {
          stepId: 'select-class',
          status: 'completed',
          data: { selectedClass: selected },
          summary: `目标班级: ${selected?.name || ctx.className}`,
          duration: 0,
        }
      },
    },
    {
      id: 'set-schedule',
      name: '设置时间与规则',
      type: 'context_injection',
      description: '设置开始时间、截止时间和成绩公布方式',
      editable: true,
      execute: async () => {
        await sleep(150)
        return {
          stepId: 'set-schedule',
          status: 'completed',
          data: {
            startTime: '立即开始',
            endTime: '次日 20:00',
            scoreRule: 'show_after_due',
            scoreRuleLabel: '截止后公布',
          },
          summary: '立即开始 · 截止次日20:00 · 截止后公布成绩',
          duration: 0,
        }
      },
    },
    {
      id: 'publish',
      name: '发布作业',
      type: 'assignment_action',
      description: '确认并发布',
      editable: false,
      execute: async (ctx: WorkflowExecutionContext) => {
        await sleep(300)
        const classData = ctx.stepResults.get('select-class')?.data || {}
        const scheduleData = ctx.stepResults.get('set-schedule')?.data || {}
        const className = (classData.selectedClass as { name: string })?.name || ctx.className
        const scoreRule = (scheduleData.scoreRuleLabel as string) || '截止后公布'
        const endTime = (scheduleData.endTime as string) || '次日 20:00'

        const exerciseTitle = String(ctx.stepResults.get('last_exercise_title') || '') || '词汇默写练习'

        const result = publishAssignment({
          title: exerciseTitle,
          className,
          content: `${exerciseTitle} — ${className}`,
          dueDate: endTime,
          scoreRule,
        })

        return {
          stepId: 'publish',
          status: 'completed',
          data: {
            outputType: 'assignment',
            output: {
              type: 'cards' as const,
              title: `作业已发布`,
              summary: `${exerciseTitle} → ${className}`,
              items: [
                { label: '练习', value: exerciseTitle },
                { label: '班级', value: className },
                { label: '截止时间', value: endTime },
                { label: '成绩公布', value: scoreRule },
                { label: '状态', value: '✅ 已发布' },
              ],
              metadata: {
                '作业ID': result.id,
                '发布时间': new Date(result.publishedAt).toLocaleString(),
              },
            },
            suggestions: [
              '学生将在首页看到新作业通知',
              '可在「练习报告」中查看完成情况',
              '截止后可查看成绩统计',
            ],
          },
          summary: `已发布: ${exerciseTitle} → ${className}`,
          duration: 0,
        }
      },
    },
  ],
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

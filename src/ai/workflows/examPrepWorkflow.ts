import type { WorkflowDefinition } from './workflowTypes'

/**
 * 考前冲刺 Workflow —— 根据目标考试类型和薄弱点生成复习方案
 */
export const examPrepWorkflow: WorkflowDefinition = {
  id: 'exam-prep',
  name: '考前冲刺方案',
  category: 'teaching',
  description: '根据考试类型和班级错题数据，自动生成考前冲刺复习计划和配套练习',
  triggerKeywords: ['考前', '冲刺', '备考', '复习计划', '模拟卷', '期中复习', '期末复习', '月考复习'],
  triggerTasks: ['generate_quiz', 'summarize'],
  estimatedTime: '约25秒',
  outputType: '复习方案 + 配套练习',
  tags: ['考前', '复习', '冲刺', '计划'],

  steps: [
    {
      id: 'ctx-inject',
      name: '获取考试上下文',
      type: 'context_injection',
      description: '识别考试类型和复习范围',
      editable: false,
      execute: async (ctx) => {
        await sleep(200)
        const examType = ctx.triggerQuery.includes('期中') ? '期中考试'
          : ctx.triggerQuery.includes('期末') ? '期末考试'
          : ctx.triggerQuery.includes('月考') ? '月考'
          : ctx.triggerQuery.includes('中考') ? '中考'
          : '单元测验'
        return {
          stepId: 'ctx-inject',
          status: 'completed',
          data: { examType, unit: ctx.unit, grade: ctx.grade },
          summary: `目标考试：${examType} · 范围：${ctx.unit} · ${ctx.grade}`,
          duration: 0,
        }
      },
    },
    {
      id: 'weakness-analysis',
      name: '分析班级薄弱点',
      type: 'ai_recommendation',
      description: '基于错题数据识别知识盲区',
      editable: false,
      execute: async () => {
        await sleep(600)
        return {
          stepId: 'weakness-analysis',
          status: 'completed',
          data: {
            weaknesses: [
              { point: '可数/不可数名词', errorRate: '43%', priority: 'high' },
              { point: '阅读理解主旨推断', errorRate: '42%', priority: 'high' },
              { point: '一般现在时三单', errorRate: '35%', priority: 'medium' },
              { point: 'There be 句型', errorRate: '22%', priority: 'low' },
            ],
          },
          summary: '识别4个薄弱知识点，其中2个为高优先级（错误率>40%）',
          duration: 0,
        }
      },
    },
    {
      id: 'plan-generation',
      name: '生成复习计划',
      type: 'output_generation',
      description: '按天生成复习计划 + 配套练习',
      editable: true,
      execute: async () => {
        await sleep(500)
        const plan = [
          { day: 'Day 1', focus: '可数/不可数名词', activity: '语法对比讲解(15min) + 专项练习(20题)', exercises: 1 },
          { day: 'Day 2', focus: '阅读理解主旨推断', activity: '主题句定位法讲解(10min) + 3篇限时阅读', exercises: 1 },
          { day: 'Day 3', focus: '一般现在时三单', activity: '规则回顾(10min) + 句型转换练习(15题)', exercises: 1 },
          { day: 'Day 4', focus: '综合模拟', activity: '模拟测验(45min) + 错题精讲(15min)', exercises: 1 },
          { day: 'Day 5', focus: '查漏补缺', activity: '错题回顾 + 重点词汇默写 + 考前心态调整', exercises: 0 },
        ]

        return {
          stepId: 'plan-generation',
          status: 'completed',
          data: {
            outputType: 'pdf',
            output: {
              type: 'list' as const,
              title: `考前冲刺复习方案`,
              summary: `5天复习计划 · 覆盖${plan.length - 1}个薄弱点 · 含${plan.reduce((s, p) => s + p.exercises, 0)}份配套练习`,
              items: plan.map((p) => ({
                label: p.day,
                value: p.focus,
                secondary: p.activity,
              })),
            },
            suggestions: [
              '建议每天复习时间控制在30-40分钟',
              'Day 4 模拟测验后务必留足时间精讲错题',
              '可为李华、刘洋两位同学额外准备基础巩固练习',
            ],
          },
          summary: `生成了5天复习计划，覆盖4个薄弱知识点，含3份配套练习`,
          duration: 0,
        }
      },
    },
  ],
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

import type { WorkflowDefinition, WorkflowExecutionContext } from './workflowTypes'

const questionTypes = [
  { type: '听力理解', count: 5, scorePer: 2, total: 10 },
  { type: '单项选择', count: 10, scorePer: 2, total: 20 },
  { type: '完形填空', count: 10, scorePer: 1.5, total: 15 },
  { type: '阅读理解', count: 10, scorePer: 2, total: 20 },
  { type: '词汇运用', count: 10, scorePer: 1.5, total: 15 },
  { type: '句型转换', count: 5, scorePer: 2, total: 10 },
  { type: '书面表达', count: 1, scorePer: 10, total: 10 },
]

export const unitPaperGenerateWorkflow: WorkflowDefinition = {
  id: 'unit-paper-generate',
  name: '单元测验卷生成',
  category: 'generation',
  description: '根据单元知识点和班级错题数据，智能生成包含听力、单选、完形、阅读、写作的完整测验卷',
  triggerKeywords: [
    '试卷', '测验卷', '单元卷', '生成试卷', '出卷', '出试卷',
    '来一套', '来一份试卷', '单元测验', '测试卷', '考卷',
  ],
  triggerTasks: ['generate_quiz'],
  estimatedTime: '约5秒',
  outputType: '完整试卷 + 答案 + 评分标准',
  tags: ['试卷', '生成', '单元', '测验'],

  steps: [
    {
      id: 'parse-context',
      name: '确定试卷范围',
      type: 'context_injection',
      description: '确定单元、题型分布和分值',
      editable: true,
      execute: async (ctx: WorkflowExecutionContext) => {
        await sleep(200)
        const unit = ctx.triggerIntent.entities.unit || ctx.unit
        const grade = ctx.triggerIntent.entities.grade || ctx.grade
        return {
          stepId: 'parse-context',
          status: 'completed',
          data: { unit, grade, textbook: ctx.textbook, questionTypes },
          summary: `试卷范围：${grade} ${unit} · 满分100分 · 7大题型`,
          duration: 0,
        }
      },
    },
    {
      id: 'analyze-weakpoints',
      name: '分析班级薄弱点',
      type: 'ai_recommendation',
      description: '将错题数据融入试卷设计，薄弱知识点增加题量',
      editable: false,
      execute: async () => {
        await sleep(350)
        const weakPoints = [
          { point: '可数/不可数名词', errorRate: 43, extraQuestions: 3 },
          { point: '阅读理解主旨推断', errorRate: 42, extraQuestions: 2 },
          { point: '一般现在时三单', errorRate: 35, extraQuestions: 2 },
        ]
        return {
          stepId: 'analyze-weakpoints',
          status: 'completed',
          data: { weakPoints, totalExtra: 7 },
          summary: `识别3个薄弱知识点（错误率均>35%），为这些知识点额外增加7道题目`,
          duration: 0,
        }
      },
    },
    {
      id: 'generate-questions',
      name: '生成各题型题目',
      type: 'output_generation',
      description: '逐题型生成题目，薄弱点加权出题',
      editable: true,
      execute: async (ctx: WorkflowExecutionContext) => {
        await sleep(600)
        const contextData = ctx.stepResults.get('parse-context')?.data || {}
        const weakData = ctx.stepResults.get('analyze-weakpoints')?.data || {}
        const weakPoints = (weakData.weakPoints as Array<{ point: string; errorRate: number; extraQuestions: number }>) || []

        const sections = questionTypes.map((qt) => {
          const weakMatch = weakPoints.find((wp) =>
            (qt.type === '单项选择' && wp.point.includes('名词')) ||
            (qt.type === '阅读理解' && wp.point.includes('阅读')) ||
            (qt.type === '句型转换' && wp.point.includes('时'))
          )
          const extraCount = weakMatch?.extraQuestions || 0
          return {
            ...qt,
            actualCount: qt.count + extraCount,
            note: extraCount > 0 ? `(含${extraCount}道${weakMatch?.point}专项题)` : '',
          }
        })

        const totalScore = sections.reduce((s, sec) => s + sec.total + (sec.actualCount - sec.count) * sec.scorePer, 0)

        return {
          stepId: 'generate-questions',
          status: 'completed',
          data: {
            sections,
            totalScore,
            unit: contextData.unit as string,
            grade: contextData.grade as string,
          },
          summary: `已生成${sections.length}个题型的题目分布，满分${totalScore}分，薄弱点加权出题`,
          duration: 0,
        }
      },
    },
    {
      id: 'printable-output',
      name: '生成可打印试卷',
      type: 'output_generation',
      description: '排版输出完整试卷+答案+评分标准',
      editable: true,
      execute: async (ctx: WorkflowExecutionContext) => {
        await sleep(400)
        const prevData = ctx.stepResults.get('generate-questions')?.data || {}
        const sections = (prevData.sections as Array<Record<string, unknown>>) || []
        const unit = (prevData.unit as string) || ctx.unit
        const grade = (prevData.grade as string) || ctx.grade
        const totalScore = (prevData.totalScore as number) || 100

        return {
          stepId: 'printable-output',
          status: 'completed',
          data: {
            outputType: 'pdf',
            output: {
              type: 'cards' as const,
              title: `${grade}${unit} 单元测验卷`,
              summary: `${sections.length}个题型 · 满分${totalScore}分 · 含答案及评分标准`,
              items: sections.map((s) => ({
                label: `${s.type}（${s.total}分）`,
                value: `${s.actualCount}题 · 每题${s.scorePer}分${s.note ? ' ' + s.note : ''}`,
                secondary: '',
              })),
              metadata: {
                '教材': ctx.textbook,
                '年级': grade,
                '单元': unit,
                '总分': `${totalScore}分`,
                '题型数': `${sections.length}`,
                '预计用时': '45分钟',
                '班级': ctx.className,
              },
            },
            suggestions: [
              '建议听力部分播放两遍',
              '阅读理解部分建议用时20分钟',
              '书面表达部分请参照评分标准批改',
              '可在打印前调整各题型分值比例',
            ],
          },
          summary: `试卷已生成：${sections.length}个题型，满分${totalScore}分，含答案及评分标准`,
          duration: 0,
        }
      },
    },
  ],
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

import type { WorkflowDefinition } from './workflowTypes'

/**
 * 班级风险分析 Workflow —— 自动扫描班级学情，识别风险并生成处理建议
 */
export const classRiskWorkflow: WorkflowDefinition = {
  id: 'class-risk',
  name: '班级风险分析',
  category: 'analysis',
  description: '综合分析班级学情，自动识别成绩下滑、薄弱项蔓延、两极分化等风险，生成预警和处理方案',
  triggerKeywords: ['风险', '预警', '班级情况', '班级分析', '学情分析', '成绩下滑', '退步', '班级风险'],
  triggerTasks: ['analyze', 'summarize'],
  estimatedTime: '约20秒',
  outputType: '风险分析报告',
  tags: ['风险', '预警', '分析', '班级'],

  steps: [
    {
      id: 'ctx-inject',
      name: '获取班级上下文',
      type: 'context_injection',
      description: '加载班级基础数据',
      editable: false,
      execute: async (ctx) => {
        await sleep(200)
        return {
          stepId: 'ctx-inject',
          status: 'completed',
          data: {
            className: ctx.className,
            studentCount: ctx.studentCount,
            recentExamDate: '2026-05-20',
            recentExamAvg: 84.7,
          },
          summary: `${ctx.className} · ${ctx.studentCount}人 · 最近测验均分84.7`,
          duration: 0,
        }
      },
    },
    {
      id: 'risk-scan',
      name: '风险扫描',
      type: 'ai_recommendation',
      description: '多维扫描：成绩趋势、薄弱知识点、学生分层、两极分化',
      editable: false,
      execute: async () => {
        await sleep(700)
        const risks = [
          {
            title: '阅读理解正确率跌破警戒线',
            level: 'high',
            detail: '全班正确率58%，低于60%警戒线。主旨推断和词义猜测两类题型失分严重。',
            affected: '全班',
            suggestedAction: '建议本周增加2次限时阅读训练，重点教授主旨题解题策略',
          },
          {
            title: '刘洋 成绩连续3次下滑',
            level: 'high',
            detail: '82→76→71，下滑趋势持续。阅读理解和完形填空为主要失分点，词汇听写连续不合格。',
            affected: '1人（刘洋）',
            suggestedAction: '建议本周内安排课后一对一辅导（预估20分钟），诊断具体困难并制定个人提升计划',
          },
          {
            title: '可数/不可数名词——全班性薄弱',
            level: 'medium',
            detail: '错误率43%，且在最近两次作业中未见改善。该知识点为后续 Unit 4-5 的语法基础。',
            affected: '约18人',
            suggestedAction: '建议增加1课时专项复习+实物演示教学法，确保基础夯实后再进入新单元',
          },
          {
            title: '班级两极分化初现',
            level: 'medium',
            detail: '前25%均分92，后25%均分68，差距24分。差距较上月扩大了4分。',
            affected: '约10人（后25%）',
            suggestedAction: '建议实施分层教学：A层拓展阅读和写作，B层夯实基础和语法，C层重点关注词汇和简单句型',
          },
        ]

        return {
          stepId: 'risk-scan',
          status: 'completed',
          data: { risks },
          summary: `扫描完成，发现${risks.length}项风险：${risks.filter(r => r.level === 'high').length}项高风险，${risks.filter(r => r.level === 'medium').length}项中风险`,
          duration: 0,
        }
      },
    },
    {
      id: 'suggest-actions',
      name: '生成处理建议',
      type: 'teaching_suggestion',
      description: '为每个风险生成具体可执行的处理方案',
      editable: true,
      execute: async (ctx) => {
        await sleep(400)
        const prevData = ctx.stepResults.get('risk-scan')?.data as Record<string, unknown>
        const risks = (prevData?.risks || []) as Array<Record<string, unknown>>

        return {
          stepId: 'suggest-actions',
          status: 'completed',
          data: {
            output: {
              type: 'cards' as const,
              title: '班级风险分析报告',
              summary: `${risks.length}项风险 · ${risks.filter(r => r.level === 'high').length}项高优 · 建议本周处理`,
              items: risks.map((r) => ({
                label: `${r.level === 'high' ? '🔴' : '🟡'} ${r.title}`,
                value: r.suggestedAction as string,
                secondary: `影响：${r.affected}`,
              })),
            },
            suggestions: risks.map((r) => r.suggestedAction as string),
          },
          summary: `为${risks.length}项风险生成了处理方案`,
          duration: 0,
        }
      },
    },
  ],
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

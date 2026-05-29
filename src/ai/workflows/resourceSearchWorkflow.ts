/**
 * Resource Search Workflow
 *
 * 输入: "查同步资源" / "Unit3 同步练习"
 * 输出: 按类型分组的资源列表：课文、词汇、听力、视频、时文阅读
 */

import type { WorkflowDefinition } from './workflowTypes'

export const resourceSearchWorkflow: WorkflowDefinition = {
  id: 'resource-search',
  name: '资源搜索',
  category: 'resource',
  description: '按教材单元搜索同步资源：课文、词汇、听力、视频、时文阅读',
  triggerKeywords: ['同步资源', '查资源', '课文资源', '课件', '教材资源', '同步练习', '资源推荐', '资源搜索'],
  triggerTasks: ['recommend'],
  estimatedTime: '约1秒',
  outputType: '资源列表',
  tags: ['资源', '搜索', '同步'],

  steps: [
    {
      id: 'parse-request',
      name: '解析资源需求',
      type: 'context_injection',
      description: '确定教材、单元和资源类型',
      editable: false,
      execute: async (ctx) => {
        await sleep(100)
        const unit = ctx.triggerIntent.entities.unit || ctx.unit
        return {
          stepId: 'parse-request',
          status: 'completed',
          data: { unit, textbook: ctx.textbook, grade: ctx.grade },
          summary: `搜索 ${ctx.textbook} · ${unit} 同步资源`,
          duration: 0,
        }
      },
    },
    {
      id: 'fetch-resources',
      name: '获取同步资源',
      type: 'resource_fetching',
      description: '按类型获取资源',
      editable: false,
      execute: async (ctx) => {
        await sleep(300)
        const ctx_data = ctx.stepResults.get('parse-request')?.data || {}
        const unit = (ctx_data.unit as string) || 'Unit 3'

        const resourceGroups = [
          {
            type: '同步课文',
            icon: 'book',
            items: [
              { title: `${unit} 课文朗读与讲解`, format: '视频+课件', duration: '15分钟', hasPreview: true },
              { title: `${unit} 重点句型解析`, format: '课件PPT', duration: '—', hasPreview: true },
            ],
          },
          {
            type: '同步词汇',
            icon: 'vocab',
            items: [
              { title: `${unit} 词汇表（含音标+例句）`, format: 'PDF/打印', duration: '—', hasPreview: true },
              { title: `${unit} 词汇闪卡`, format: '在线互动', duration: '5分钟', hasPreview: true },
            ],
          },
          {
            type: '同步听力',
            icon: 'listen',
            items: [
              { title: `${unit} 单词朗读（英音+美音）`, format: 'MP3', duration: '2:30', hasPreview: true },
              { title: `${unit} 课文听力`, format: 'MP3', duration: '4:15', hasPreview: true },
            ],
          },
          {
            type: '主题视频',
            icon: 'video',
            items: [
              { title: `Food and Drinks 主题短片`, format: 'MP4', duration: '3:20', hasPreview: true },
            ],
          },
          {
            type: '时文阅读',
            icon: 'reading',
            items: [
              { title: 'Food Around the World', format: '阅读+5题', duration: '8分钟', hasPreview: true },
              { title: 'How to Stay Healthy', format: '阅读+5题', duration: '8分钟', hasPreview: true },
            ],
          },
        ]

        return {
          stepId: 'fetch-resources',
          status: 'completed',
          data: { resourceGroups, totalResources: resourceGroups.reduce((s, g) => s + g.items.length, 0) },
          summary: `找到5类共${resourceGroups.reduce((s, g) => s + g.items.length, 0)}个同步资源`,
          duration: 0,
        }
      },
    },
    {
      id: 'generate-output',
      name: '生成资源列表',
      type: 'output_generation',
      description: '输出分组资源',
      editable: true,
      execute: async (ctx) => {
        await sleep(150)
        const prev = ctx.stepResults.get('fetch-resources')?.data || {}
        const groups = (prev.resourceGroups as Array<{ type: string; items: Array<{ title: string; format: string; duration: string }> }>) || []

        return {
          stepId: 'generate-output',
          status: 'completed',
          data: {
            outputType: 'list',
            output: {
              type: 'list' as const,
              title: `${ctx.unit} 同步资源`,
              summary: `共找到${groups.reduce((s, g) => s + g.items.length, 0)}个资源，按类型分组`,
              items: groups.flatMap((g) =>
                g.items.map((item) => ({
                  label: `[${g.type}]`,
                  value: item.title,
                  secondary: `${item.format} · ${item.duration}`,
                }))
              ),
              metadata: {
                '教材': ctx.textbook,
                '单元': ctx.unit,
                '资源类型': groups.map((g) => g.type).join('、'),
                '总数': `${groups.reduce((s, g) => s + g.items.length, 0)}个`,
              },
            },
            resourceGroups: groups,
            suggestions: [
              '所有资源均支持在线预览和一键布置',
              '点击资源旁的"布置"按钮可将对应练习下发给学生',
              '视频和听力资源支持课堂投屏播放',
            ],
          },
          summary: `已找到${groups.reduce((s, g) => s + g.items.length, 0)}个同步资源，可按类型预览和布置`,
          duration: 0,
        }
      },
    },
  ],
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)) }

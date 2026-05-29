/**
 * Listening & Speaking Recommendation Workflow
 *
 * 输入: "找一个听说训练" / "有什么听力素材"
 * 输出: 听力/听说素材推荐列表，区分广东听说考试模式
 */

import type { WorkflowDefinition, WorkflowExecutionContext } from './workflowTypes'
import { getListeningSpeakingData, getExamPrepMaterials } from '../mock/business/listeningSpeakingMock'
import type { ListeningSpeakingItem } from '../mock/business/listeningSpeakingMock'

export const listeningRecommendWorkflow: WorkflowDefinition = {
  id: 'listening-recommend',
  name: '听力/听说推荐',
  category: 'resource',
  description: '根据当前单元和班级听力水平，智能推荐听力/听说素材，支持广东听说考试专项',
  triggerKeywords: ['听力', '听说', '口语', '跟读', '配音', '听力素材', '听力材料', '推荐听力', '听力推荐', '找听力', '听说训练', '听力练习', '听说练习', '人机对话', '模仿朗读', '故事复述', '角色扮演'],
  triggerTasks: ['recommend', 'recommend_listening'],
  estimatedTime: '约2秒',
  outputType: '素材推荐列表',
  tags: ['听力', '听说', '推荐', '素材'],

  steps: [
    {
      id: 'parse-context',
      name: '解析听力/听说需求',
      type: 'context_injection',
      description: '识别当前单元、地区模式和训练类型',
      editable: false,
      execute: async (ctx: WorkflowExecutionContext) => {
        await sleep(150)
        const unit = ctx.triggerIntent.entities.unit || ctx.unit
        const isGuangdong = ctx.region === 'guangdong' || ctx.triggerQuery.includes('广东') || ctx.triggerQuery.includes('听说')
        const isSpeaking = ctx.triggerQuery.includes('口语') || ctx.triggerQuery.includes('跟读') || ctx.triggerQuery.includes('配音') || ctx.triggerQuery.includes('听说')
        const regionMode = isGuangdong || isSpeaking ? 'listening_speaking' : 'listening'

        return {
          stepId: 'parse-context',
          status: 'completed',
          data: { unit, regionMode, className: ctx.className, grade: ctx.grade, isSpeaking },
          summary: `${isSpeaking ? '听说' : '听力'}需求 · ${unit} · ${isGuangdong ? '广东模式' : '通用模式'}`,
          duration: 0,
        }
      },
    },
    {
      id: 'analyze-level',
      name: '分析班级听力水平',
      type: 'ai_recommendation',
      description: '基于班级数据推荐合适难度',
      editable: false,
      execute: async () => {
        await sleep(200)
        return {
          stepId: 'analyze-level',
          status: 'completed',
          data: {
            classAvgScore: 78,
            weakPoints: ['数字信息捕捉', '主旨概括', '语音语调'],
            recommendedLevel: '基础+进阶混合',
          },
          summary: '班级听力均分78，弱项：数字信息、主旨概括、语音语调 → 推荐基础+进阶混合',
          duration: 0,
        }
      },
    },
    {
      id: 'match-materials',
      name: '匹配听力/听说素材',
      type: 'resource_fetching',
      description: '从素材库筛选最佳匹配',
      editable: true,
      execute: async (ctx: WorkflowExecutionContext) => {
        await sleep(300)
        const contextData = ctx.stepResults.get('parse-context')?.data || {}
        const regionMode = (contextData.regionMode as string) || 'listening'
        const isSpeaking = (contextData.isSpeaking as boolean) || false

        let materials: ListeningSpeakingItem[]

        if (isSpeaking) {
          materials = getExamPrepMaterials()
        } else {
          materials = getListeningSpeakingData(regionMode)
        }

        // Prioritize by matching weak points
        const levelData = ctx.stepResults.get('analyze-level')?.data || {}
        const weakPoints = (levelData.weakPoints as string[]) || []
        const sorted = [...materials].sort((a, b) => {
          const aMatch = weakPoints.some((wp) => a.skillFocus.some((sf) => sf.includes(wp) || wp.includes(sf))) ? 1 : 0
          const bMatch = weakPoints.some((wp) => b.skillFocus.some((sf) => sf.includes(wp) || wp.includes(sf))) ? 1 : 0
          return bMatch - aMatch
        })

        return {
          stepId: 'match-materials',
          status: 'completed',
          data: { materials: sorted, totalMatched: sorted.length, regionMode },
          summary: `匹配到${sorted.length}段${isSpeaking ? '听说' : '听力'}素材，已按班级弱项排序`,
          duration: 0,
        }
      },
    },
    {
      id: 'generate-output',
      name: '生成推荐结果',
      type: 'output_generation',
      description: '输出素材列表和配套训练建议',
      editable: true,
      execute: async (ctx: WorkflowExecutionContext) => {
        await sleep(200)
        const prevData = ctx.stepResults.get('match-materials')?.data || {}
        const materials = (prevData.materials as ListeningSpeakingItem[]) || []
        const contextData = ctx.stepResults.get('parse-context')?.data || {}
        const isSpeaking = (contextData.isSpeaking as boolean) || false

        const top3 = materials.slice(0, 3)
        const modeLabel = isSpeaking ? '听说训练' : '听力训练'

        return {
          stepId: 'generate-output',
          status: 'completed',
          data: {
            outputType: 'list',
            output: {
              type: 'list' as const,
              title: `${ctx.unit} ${modeLabel}素材推荐`,
              summary: `共推荐${materials.length}段素材 · ${isSpeaking ? '含广东听说考试专项' : '已按班级弱项排序'}`,
              items: materials.map((m) => ({
                label: `${m.type === 'exam_practice' ? '【考试】' : ''}${m.type === 'culture' ? '【拓展】' : ''}${m.title}`,
                value: `${m.duration} · ${m.difficulty === 'basic' ? '基础' : m.difficulty === 'medium' ? '中等' : '进阶'} · ${m.skillFocus.slice(0, 2).join('、')}`,
                secondary: m.aiReason,
              })),
              metadata: {
                '素材总数': `${materials.length}段`,
                '训练模式': isSpeaking ? '听说（含口语）' : '听力',
                '推荐难度': '基础+进阶混合',
                '班级弱项': '数字信息、主旨概括',
              },
            },
            topRecommendations: top3.map((m) => ({
              id: m.id,
              title: m.title,
              type: m.type,
              duration: m.duration,
              difficulty: m.difficulty,
            })),
            suggestions: [
              isSpeaking ? '广东听说考试临近，建议每周2次模拟训练' : '建议先播放「数字信息专项」针对性训练弱项',
              top3[0] ? `首推：《${top3[0].title}》(${top3[0].duration}) — ${top3[0].aiReason}` : '',
              '每段素材均可生成配套练习题，点击"布置训练"下发',
              '课堂使用建议：课前5分钟播放，配合快速问答',
            ].filter(Boolean),
          },
          summary: `已推荐${materials.length}段${modeLabel}素材，首推《${top3[0]?.title || 'N/A'}》`,
          duration: 0,
        }
      },
    },
  ],
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

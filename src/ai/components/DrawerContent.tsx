import { Lightbulb, BookOpen, Play, Send, Plus, Check } from 'lucide-react'
import { useAIStore } from '../store'
import type { InsightItem, RecommendationItem, RiskItem } from '../store'
import { WorkflowTimeline, WorkflowResultPanel, WorkflowActionBar } from './workflow'

function InsightBody({ data }: { data: InsightItem }) {
  return (
    <div className="space-y-5">
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">数据分析</h4>
        <p className="text-sm text-slate-700 leading-relaxed">{data.detail}</p>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">教学建议</h4>
        <p className="text-sm text-slate-700 leading-relaxed">{data.suggestion}</p>
      </div>
      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
        <Play size={14} />
        {data.actionLabel}
      </button>
    </div>
  )
}

function RecommendationBody({ data }: { data: RecommendationItem }) {
  const addToBasket = useAIStore((s) => s.addToBasket)
  const practiceBasket = useAIStore((s) => s.practiceBasket)
  const inBasket = practiceBasket.some((i) => 'id' in i && i.id === data.id)

  return (
    <div className="space-y-5">
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">推荐原因</h4>
        <p className="text-sm text-slate-700 leading-relaxed">{data.reason}</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-50 rounded-lg p-3 text-center">
          <p className="text-[10px] text-slate-400 mb-1">类型</p>
          <p className="text-sm font-semibold text-slate-700">
            {data.type === 'exercise' ? '练习' : data.type === 'material' ? '素材' : data.type === 'lesson' ? '课件' : '作业'}
          </p>
        </div>
        <div className="bg-slate-50 rounded-lg p-3 text-center">
          <p className="text-[10px] text-slate-400 mb-1">难度</p>
          <p className="text-sm font-semibold text-slate-700">
            {data.difficulty === 'basic' ? '基础' : data.difficulty === 'medium' ? '进阶' : '拔高'}
          </p>
        </div>
        <div className="bg-slate-50 rounded-lg p-3 text-center">
          <p className="text-[10px] text-slate-400 mb-1">预计耗时</p>
          <p className="text-sm font-semibold text-slate-700">{data.estimatedTime}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => addToBasket(data)}
          disabled={inBasket}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            inBasket
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {inBasket ? (
            <>
              <Check size={14} /> 已加入篮子
            </>
          ) : (
            <>
              <Plus size={14} /> 加入练习篮子
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function RiskBody({ data }: { data: RiskItem }) {
  return (
    <div className="space-y-5">
      {data.studentName && (
        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-600 text-sm font-bold">
            {data.studentName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{data.studentName}</p>
            <p className="text-xs text-slate-400">七年级(3)班</p>
          </div>
        </div>
      )}
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">风险说明</h4>
        <p className="text-sm text-slate-700 leading-relaxed">{data.description}</p>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">建议动作</h4>
        <p className="text-sm text-slate-700 leading-relaxed">{data.suggestedAction}</p>
      </div>
      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 transition-colors">
        <Send size={14} />
        一键布置跟进任务
      </button>
    </div>
  )
}

function WorkflowBody() {
  const workflowResult = useAIStore((s) => s.workflowResult)
  const workflowStepIndex = useAIStore((s) => s.workflowStepIndex)
  const workflowRunning = useAIStore((s) => s.workflowRunning)
  const drawerContent = useAIStore((s) => s.drawerContent)
  const stepNames = drawerContent?.workflowStepNames || []

  if (!workflowResult) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <p className="text-sm text-slate-400">Workflow 执行中...</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <WorkflowTimeline
        result={workflowResult}
        currentStepIndex={workflowStepIndex}
        stepNames={stepNames}
        isRunning={workflowRunning}
      />
      {workflowResult.status === 'completed' && (
        <>
          <div className="border-t border-slate-100" />
          <WorkflowResultPanel result={workflowResult} />
          <WorkflowActionBar result={workflowResult} />
        </>
      )}
    </div>
  )
}

export default function DrawerContent() {
  const drawerContent = useAIStore((s) => s.drawerContent)

  // Workflow type — special rendering
  if (drawerContent?.type === 'workflow') {
    return (
      <div className="flex-1 overflow-y-auto p-5">
        <WorkflowBody />
      </div>
    )
  }

  if (!drawerContent?.cardData) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <p className="text-sm text-slate-400">暂无详情</p>
      </div>
    )
  }

  const { cardData, type } = drawerContent

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5">
      {/* Tags */}
      {'tags' in cardData && cardData.tags && (
        <div className="flex flex-wrap gap-1.5">
          {(cardData.tags as string[]).map((tag: string) => (
            <span key={tag} className="inline-block px-2.5 py-0.5 rounded bg-slate-100 text-[11px] text-slate-500">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Body by type */}
      {type === 'insight' && <InsightBody data={cardData as InsightItem} />}
      {type === 'recommendation' && <RecommendationBody data={cardData as RecommendationItem} />}
      {(type === 'analysis' || type === 'suggestion') && <RiskBody data={cardData as RiskItem} />}

      {/* Footer */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <Lightbulb size={12} className="text-indigo-400" />
          <span>小天AI · 基于</span>
          <BookOpen size={12} />
          <span>人教版 Unit 3 及班级学情数据</span>
        </div>
      </div>
    </div>
  )
}

import { Clock, ChevronRight, Play, Zap } from 'lucide-react'
import type { AIActionResult } from '../../search/types'
import { useAIStore } from '../../store'

const taskLabel: Record<string, string> = {
  generate_quiz: '出题', correct_essay: '批改', analyze: '分析',
  recommend: '推荐', summarize: '总结', generate_dictation: '默写',
  generate_exercise: '生成练习',
}

const taskColor: Record<string, string> = {
  generate_quiz: 'bg-purple-50 text-purple-600',
  correct_essay: 'bg-orange-50 text-orange-600',
  analyze: 'bg-blue-50 text-blue-600',
  recommend: 'bg-emerald-50 text-emerald-600',
  summarize: 'bg-cyan-50 text-cyan-600',
  generate_dictation: 'bg-pink-50 text-pink-600',
  generate_exercise: 'bg-indigo-50 text-indigo-600',
}

export default function AIActionResultCard({ action }: { action: AIActionResult }) {
  const openDrawer = useAIStore((s) => s.openDrawer)

  const handleClick = () => {
    openDrawer({
      type: 'ai-chat',
      title: action.title,
      cardData: {
        id: action.id,
        title: action.title,
        riskLevel: 'low',
        description: action.description,
        suggestedAction: `预计${action.estimatedTime}完成。输出格式：${action.outputType}。`,
        tags: action.tags,
      },
    })
  }

  return (
    <button
      onClick={handleClick}
      className="w-full text-left bg-white border border-indigo-200 rounded-xl p-4 hover:shadow-md hover:border-indigo-400 transition-all group bg-gradient-to-r from-indigo-50/30 to-white"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 shrink-0">
            <Zap size={13} />
          </div>
          <h4 className="text-sm font-semibold text-slate-800 truncate">{action.title}</h4>
        </div>
        <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-400 transition-colors shrink-0" />
      </div>

      <p className="text-xs text-slate-500 leading-relaxed mb-3 ml-9">{action.description}</p>

      <div className="flex items-center justify-between ml-9">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${taskColor[action.task] || 'bg-slate-100 text-slate-500'}`}>
            {taskLabel[action.task] || action.task}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-slate-400">
            <Clock size={10} /> {action.estimatedTime}
          </span>
          <span className="text-[10px] text-slate-400">→ {action.outputType}</span>
        </div>
        <span className="flex items-center gap-1 text-[10px] text-indigo-500 font-medium">
          <Play size={10} /> 执行
        </span>
      </div>
    </button>
  )
}

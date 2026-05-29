import { Send, Download, RefreshCw, Plus } from 'lucide-react'
import type { WorkflowUIRresult } from '../../workflows/workflowTypes'
import { useAIStore } from '../../store'

interface Props {
  result: WorkflowUIRresult
  onAdjust?: () => void
  onRerun?: () => void
}

export default function WorkflowActionBar({ result, onRerun }: Props) {
  const addToBasket = useAIStore((s) => s.addToBasket)

  const handleAddToBasket = () => {
    addToBasket({
      id: result.workflowId,
      title: result.output.title,
      reason: `Workflow「${result.workflowName}」生成`,
      type: 'material',
      tags: ['workflow', result.category],
      difficulty: 'medium',
      estimatedTime: '',
    })
  }

  return (
    <div className="flex items-center gap-2 pt-2">
      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
        <Send size={14} />
        一键布置
      </button>
      <button className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
        <Download size={14} />
        下载
      </button>
      <button
        onClick={handleAddToBasket}
        className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
      >
        <Plus size={14} />
        加入篮子
      </button>
      {onRerun && (
        <button
          onClick={onRerun}
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <RefreshCw size={14} />
        </button>
      )}
    </div>
  )
}

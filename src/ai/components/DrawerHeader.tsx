import { X, BookOpen } from 'lucide-react'
import { useAIStore } from '../store'

const typeLabel: Record<string, string> = {
  insight: 'AI 洞察',
  recommendation: 'AI 推荐',
  analysis: '学情分析',
  suggestion: '教学建议',
  homework: '作业预览',
  'ai-chat': 'AI 对话',
}

export default function DrawerHeader() {
  const drawerContent = useAIStore((s) => s.drawerContent)
  const teacherContext = useAIStore((s) => s.teacherContext)
  const closeDrawer = useAIStore((s) => s.closeDrawer)

  return (
    <div className="shrink-0 border-b border-slate-200 px-5 py-4">
      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-block px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-[11px] font-medium">
          {drawerContent ? typeLabel[drawerContent.type] : ''}
        </span>
        <button
          onClick={closeDrawer}
          className="flex items-center justify-center w-7 h-7 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Title */}
      <h2 className="text-base font-semibold text-slate-800 mb-2">
        {drawerContent?.title || ''}
      </h2>

      {/* Context */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <BookOpen size={12} />
        <span>{teacherContext.textbook}</span>
        <span>·</span>
        <span>{teacherContext.unit}</span>
        <span>·</span>
        <span>{teacherContext.className}</span>
      </div>
    </div>
  )
}

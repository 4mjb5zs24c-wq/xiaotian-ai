import { CheckSquare, FileText, Zap, Mic, BookOpen, X, Sparkles } from 'lucide-react'

interface Props {
  selectedWordCount: number; selectedStudentCount: number
  onClear: () => void; onMockAction: (action: string) => void; onReviewPlan: () => void
}

const ACTIONS = [
  { icon: <FileText size={14} />, label: '默写' },
  { icon: <Zap size={14} />, label: '课后PK' },
  { icon: <Mic size={14} />, label: '课后领读' },
  { icon: <BookOpen size={14} />, label: '组卷' },
  { icon: <FileText size={14} />, label: '讲词' },
]

export default function SelectedActionBar({
  selectedWordCount, selectedStudentCount, onClear, onMockAction, onReviewPlan,
}: Props) {
  if (selectedWordCount === 0 && selectedStudentCount === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
      bg-white/95 backdrop-blur-md rounded-2xl
      border border-slate-200/60
      shadow-[0_8px_40px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.02)]
      px-5 py-3.5 flex items-center gap-4 flex-wrap">

      {/* Selection count */}
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
          <CheckSquare size={14} className="text-blue-500" />
        </div>
        <span className="font-semibold">
          {[
            selectedWordCount > 0 && `${selectedWordCount} 个错词/语块`,
            selectedStudentCount > 0 && `${selectedStudentCount} 名学生`,
          ].filter(Boolean).join(' · ')}
        </span>
        <button
          onClick={onClear}
          className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-slate-200" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        {ACTIONS.map(({ icon, label }) => (
          <button
            key={label}
            onClick={() => onMockAction(label)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium
              text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200
              hover:border-slate-300 transition-all duration-200"
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-slate-200" />

      {/* Primary CTA */}
      <button
        onClick={onReviewPlan}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold
          bg-gradient-to-r from-blue-500 to-blue-600 text-white
          hover:from-blue-600 hover:to-blue-700
          shadow-sm shadow-blue-200 transition-all duration-200"
      >
        <Sparkles size={14} />
        词汇复习方案
      </button>
    </div>
  )
}

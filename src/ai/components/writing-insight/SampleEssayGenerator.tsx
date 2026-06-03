import { X, Copy, BookmarkCheck, Edit3, Star } from 'lucide-react'
import type { GeneratedSample } from '../../insights/writingInsightTypes'
import { SAMPLE_LEVEL_META } from '../../insights/writingInsightTypes'

interface Props {
  samples: GeneratedSample[]
  onClose: () => void
  onMarkAsReference: (sample: GeneratedSample) => void
  onCopy: (sample: GeneratedSample) => void
}

export default function SampleEssayGenerator({ samples, onClose, onMarkAsReference, onCopy }: Props) {
  return (
    <div className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl shadow-blue-900/10 w-[720px] max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-6 py-4 border-b border-slate-100 rounded-t-2xl flex items-center justify-between z-10">
          <div>
            <h3 className="text-base font-bold text-slate-800">AI 范文生成</h3>
            <p className="text-xs text-slate-400 mt-0.5">基于当前写作问题生成 3 篇不同层次范文</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 text-[13px] text-slate-600 leading-relaxed">
            根据当前班级的写作薄弱点（结构不清、语言准确性弱、格式规范问题），小天生成了 3 篇不同层次的范文，分别适合不同水平的学生参考。请根据实际教学需要选择使用。
          </div>

          {samples.map(sample => {
            const meta = SAMPLE_LEVEL_META[sample.level]
            return (
              <div key={sample.id} className={`border rounded-xl overflow-hidden ${meta.className.replace('bg-', 'border-').replace('text-', 'border-').split(' ')[0]} border`}>
                {/* Sample header */}
                <div className={`flex items-center justify-between px-4 py-3 ${meta.className.split(' ')[0]}`}>
                  <div className="flex items-center gap-2.5">
                    <Star size={14} className={meta.className.split(' ')[1]} />
                    <span className={`text-sm font-bold ${meta.className.split(' ')[1]}`}>{meta.label}</span>
                    <span className="text-[11px] opacity-60">{sample.title}</span>
                  </div>
                  <span className="text-[11px] opacity-60">适合：{sample.suitableFor}</span>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="bg-slate-50/70 rounded-lg p-4">
                    <pre className="text-[13px] text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">{sample.content}</pre>
                  </div>

                  {/* Highlights */}
                  <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-3">
                    <p className="text-[11px] font-semibold text-amber-600 uppercase tracking-wide mb-1">亮点说明</p>
                    <p className="text-[13px] text-slate-600 leading-relaxed">{sample.highlights}</p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <button onClick={() => onCopy(sample)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg transition-colors">
                      <Copy size={12} /> 复制
                    </button>
                    {sample.editable && (
                      <button
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg transition-colors">
                        <Edit3 size={12} /> 编辑
                      </button>
                    )}
                    <button onClick={() => onMarkAsReference(sample)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-500 hover:text-amber-600 hover:bg-amber-50 px-2.5 py-1.5 rounded-lg transition-colors">
                      <BookmarkCheck size={12} /> 作为范文参考
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

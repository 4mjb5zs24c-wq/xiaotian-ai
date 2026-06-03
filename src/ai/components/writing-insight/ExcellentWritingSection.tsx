import { useState } from 'react'
import { Star, FileText, Image, BookmarkCheck } from 'lucide-react'
import type { ExcellentWriting } from '../../insights/writingInsightTypes'
import { WRITING_TYPE_LABELS } from '../../insights/writingInsightTypes'

interface Props {
  writings: ExcellentWriting[]
  onViewFullEssay: (id: string) => void
  onViewAnswerSheet: (url: string) => void
  onMarkAsReference: (item: ExcellentWriting) => void
}

export default function ExcellentWritingSection({ writings, onViewFullEssay, onViewAnswerSheet, onMarkAsReference }: Props) {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? writings : writings.slice(0, 3)
  const hasMore = writings.length > 3

  return (
    <section className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-base font-semibold text-slate-800">优秀作文 / 优秀学生</h3>
        <span className="text-xs text-slate-400">{writings.length} 篇</span>
      </div>

      <div className="space-y-3">
        {visible.map(ew => (
          <div key={ew.id} className="border border-slate-100 rounded-xl p-4 space-y-3 hover:border-slate-200 transition-colors">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                  <Star size={14} className="text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-800">{ew.studentName}</span>
                    <span className="text-xs text-slate-400">· {ew.essayTitle}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-medium px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600">
                      {ew.score}分 · {ew.level}
                    </span>
                    <span className="text-[11px] text-slate-400">{WRITING_TYPE_LABELS[ew.writingType]}</span>
                    <span className="text-[11px] text-slate-400">· {ew.taskName}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-3">
              <p className="text-[11px] font-semibold text-amber-600 uppercase tracking-wide mb-1">优秀点</p>
              <p className="text-[13px] text-slate-600 leading-relaxed">{ew.highlights}</p>
            </div>

            {/* Excerpt */}
            <div className="bg-slate-50/70 border border-slate-100 rounded-lg p-3">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1">精彩片段</p>
              <p className="text-[13px] text-slate-600 leading-relaxed italic whitespace-pre-line">"{ew.excerpt}"</p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
              <button onClick={() => onViewFullEssay(ew.fullEssayId)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-500 hover:text-blue-600 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg transition-colors">
                <FileText size={12} /> 查看完整作文
              </button>
              <button onClick={() => onViewAnswerSheet(ew.answerSheetImageUrl)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg transition-colors">
                <Image size={12} /> 查看答题卡原图
              </button>
              <button onClick={() => onMarkAsReference(ew)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-500 hover:text-amber-600 hover:bg-amber-50 px-2.5 py-1.5 rounded-lg transition-colors">
                <BookmarkCheck size={12} /> 作为范文参考
              </button>
            </div>
          </div>
        ))}

        {hasMore && (
          <button onClick={() => setShowAll(!showAll)}
            className="w-full py-2.5 text-center text-sm font-medium text-blue-500 hover:text-blue-600
              border border-dashed border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200">
            {showAll ? '收起' : `查看全部 ${writings.length} 篇`}
          </button>
        )}
      </div>
    </section>
  )
}

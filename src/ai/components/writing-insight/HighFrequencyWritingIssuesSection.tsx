import { useState } from 'react'
import { FileText, Image } from 'lucide-react'
import type { HighFrequencyIssueGroup, WritingIssueItem } from '../../insights/writingInsightTypes'
import { PROBLEM_TYPE_META } from '../../insights/writingInsightTypes'

interface Props {
  issueGroups: HighFrequencyIssueGroup[]
  onViewFullEssay: (item: WritingIssueItem) => void
  onViewAnswerSheet: (item: WritingIssueItem) => void
}

export default function HighFrequencyWritingIssuesSection({ issueGroups, onViewFullEssay, onViewAnswerSheet }: Props) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-5">
      <div className="flex items-center gap-2">
        <h3 className="text-base font-semibold text-slate-800">高频写作问题 / 典型片段</h3>
        <span className="text-xs text-slate-400">{issueGroups.reduce((s, g) => s + g.items.length, 0)} 条片段</span>
      </div>

      {issueGroups.map((group) => {
        const meta = PROBLEM_TYPE_META[group.problemType]
        const [showAll, setShowAll] = useState(false)
        const visible = showAll ? group.items : group.items.slice(0, 3)
        const hasMore = group.items.length > 3

        return (
          <div key={group.problemType} className="border border-slate-100 rounded-xl overflow-hidden">
            {/* Group header */}
            <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-50/70 border-b border-slate-100">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.borderColor }} />
              <span className="text-sm font-semibold text-slate-700">{meta.label}</span>
              <span className="text-xs text-slate-400">({group.items.length} 条片段)</span>
            </div>

            {/* Items */}
            <div className="p-4 space-y-3">
              {visible.map(item => (
                <div key={item.id} className="border border-slate-100 rounded-xl p-4 space-y-3 hover:border-slate-200 transition-colors">
                  {/* Student + Source */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-800">{item.studentName}</span>
                      <span className="text-xs text-slate-400">· {item.essayTitle}</span>
                      <span className="text-xs text-slate-400">（{item.score}分）</span>
                    </div>
                  </div>

                  {/* Original text */}
                  <div className="bg-red-50/50 border border-red-100 rounded-lg p-3">
                    <p className="text-[11px] font-semibold text-red-400 uppercase tracking-wide mb-1">学生原句</p>
                    <p className="text-[13px] text-slate-700 leading-relaxed italic">"{item.originalText}"</p>
                  </div>

                  {/* Explanation + Suggestion */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold text-amber-500 uppercase tracking-wide">问题说明</p>
                      <p className="text-[13px] text-slate-600 leading-relaxed">{item.issueExplanation}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold text-emerald-500 uppercase tracking-wide">修改建议</p>
                      <p className="text-[13px] text-slate-600 leading-relaxed">{item.revisionSuggestion}</p>
                    </div>
                  </div>

                  {/* Improved example */}
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-3">
                    <p className="text-[11px] font-semibold text-emerald-500 uppercase tracking-wide mb-1">优化示例</p>
                    <p className="text-[13px] text-slate-700 leading-relaxed italic">"{item.improvedExample}"</p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                    <button
                      onClick={() => onViewFullEssay(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-500 hover:text-blue-600 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg transition-colors"
                    >
                      <FileText size={12} /> 查看完整作文
                    </button>
                    <button
                      onClick={() => onViewAnswerSheet(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg transition-colors"
                    >
                      <Image size={12} /> 查看答题卡原图
                    </button>
                  </div>
                </div>
              ))}

              {hasMore && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="w-full py-2.5 text-center text-sm font-medium text-blue-500 hover:text-blue-600
                    border border-dashed border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/50
                    transition-all duration-200"
                >
                  {showAll ? '收起' : `查看全部 ${group.items.length} 条片段`}
                </button>
              )}
            </div>
          </div>
        )
      })}
    </section>
  )
}


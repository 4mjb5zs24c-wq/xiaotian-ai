import React from 'react'
import { CheckCircle, ArrowRight, Search } from 'lucide-react'
import type { GeneratedAssignment } from '../../search-new/types'

interface SuccessFeedbackCardProps {
  assignments: GeneratedAssignment[]
  onViewAssignments: () => void
  onContinueSearch: () => void
}

const SuccessFeedbackCard: React.FC<SuccessFeedbackCardProps> = ({
  assignments,
  onViewAssignments,
  onContinueSearch,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 space-y-4">
      {/* Success Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
          <CheckCircle size={20} className="text-emerald-500" />
        </div>
        <div>
          <h4 className="text-[15px] font-semibold text-slate-800">
            已成功布置 {assignments.length} 条作业
          </h4>
          <p className="text-[13px] text-slate-500 mt-0.5">
            学生将在截止时间前完成并提交
          </p>
        </div>
      </div>

      {/* Assignment List */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {assignments.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-100"
          >
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-slate-700 truncate">{a.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {a.usageLabel} · {a.contentCount}个内容 · {a.className}
              </p>
            </div>
            <span className="text-xs text-slate-400 shrink-0 ml-2">截止：{a.deadline}</span>
          </div>
        ))}
      </div>

      {/* Summary Info */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-slate-500 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
        <span>布置班级：{assignments[0]?.className || '—'}</span>
        <span>截止时间：{assignments[0]?.deadline || '—'}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
        <button
          onClick={onViewAssignments}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-semibold
            bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200 transition-all duration-200"
        >
          <span>查看作业</span>
          <ArrowRight size={14} />
        </button>
        <button
          onClick={onContinueSearch}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[13px] font-medium
            border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50
            transition-all duration-200"
        >
          <Search size={14} />
          <span>继续找资源</span>
        </button>
      </div>
    </div>
  )
}

export default SuccessFeedbackCard

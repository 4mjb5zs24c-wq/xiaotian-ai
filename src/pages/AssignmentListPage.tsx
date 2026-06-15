import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { FileText, Filter, Sparkles } from 'lucide-react'
import ReviewPlanAssignmentCard from '../ai/components/vocabulary-insight/ReviewPlanAssignmentCard'
import { MOCK_REVIEW_PLAN_ASSIGNMENTS } from '../ai/insights/mockReviewPlanAssignments'
import type { ReviewPlanDayTask } from '../ai/insights/reviewPlanAssignmentTypes'

type FilterTab = 'all' | 'review_plan' | 'homework' | 'exam' | 'listening' | 'writing'

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'review_plan', label: '词汇复习计划' },
  { key: 'homework', label: '普通作业' },
  { key: 'exam', label: '试卷' },
  { key: 'listening', label: '听力' },
  { key: 'writing', label: '写作' },
]

export default function AssignmentListPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const highlightPlanId = searchParams.get('highlight')
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all')

  // Auto-expand the plan from publish flow
  const autoExpandId = highlightPlanId || undefined

  const handleViewReport = (dayTask: ReviewPlanDayTask) => {
    if (dayTask.reportUrl) {
      navigate(dayTask.reportUrl)
    }
  }

  return (
    <div className="flex justify-center px-6">
      <div className="flex-1 w-full py-5 space-y-5 max-w-[1400px]">
        {/* Header */}
        <div>
          <h2 className="text-lg font-bold text-slate-800">作业列表</h2>
          <p className="text-xs text-slate-400 mt-0.5">管理已发布的作业与词汇复习计划</p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter size={13} className="text-slate-400 shrink-0" />
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all
                ${activeFilter === tab.key
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-300 hover:text-blue-500'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Review plan cards */}
        {(activeFilter === 'all' || activeFilter === 'review_plan') && (
          <div className="space-y-4">
            {MOCK_REVIEW_PLAN_ASSIGNMENTS.length === 0 ? (
              <div className="text-center py-16 text-xs text-slate-400">
                <FileText size={28} className="mx-auto mb-2 text-slate-300" />
                <p>暂无词汇复习计划</p>
                <p className="mt-1">从词汇洞察页生成并发布复习方案后，将在此展示</p>
              </div>
            ) : (
              MOCK_REVIEW_PLAN_ASSIGNMENTS.map(collection => (
                <ReviewPlanAssignmentCard
                  key={collection.id}
                  collection={collection}
                  defaultExpanded={collection.id === autoExpandId}
                  onViewReport={handleViewReport}
                />
              ))
            )}
          </div>
        )}

        {/* Placeholder: non-review-plan filters show empty states */}
        {activeFilter !== 'all' && activeFilter !== 'review_plan' && (
          <div className="text-center py-16 text-xs text-slate-400">
            <Sparkles size={28} className="mx-auto mb-2 text-slate-300" />
            <p>当前仅 demo 展示「词汇复习计划」类型</p>
            <p className="mt-1">普通作业、试卷、听力、写作等将在后续版本接入真实数据</p>
          </div>
        )}
      </div>
    </div>
  )
}

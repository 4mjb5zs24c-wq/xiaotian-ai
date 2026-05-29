/**
 * InsightCard — 首页 AI 洞察卡片
 *
 * 展示: 风险等级 + 标题 + 简短依据 + 查看分析按钮
 */

import { AlertTriangle, ChevronRight, Sparkles } from 'lucide-react'
import type { InsightItem } from '../insights/insightTypes'

interface Props {
  insight: InsightItem
  onClick: (insight: InsightItem) => void
}

export default function InsightCard({ insight, onClick }: Props) {
  const isHigh = insight.riskLevel === 'high'
  const isLow = insight.riskLevel === 'low'
  const isExam = insight.module === 'exam_reminder'

  return (
    <button
      onClick={() => onClick(insight)}
      className="w-full text-left p-3 rounded-lg border transition-colors group hover:shadow-sm"
      style={{
        borderColor: isHigh ? '#fecaca' : isLow ? '#e2e8f0' : '#fde68a',
        backgroundColor: isHigh ? '#fef2f2' : isLow ? '#f8fafc' : '#fffbeb',
      }}
    >
      <div className="flex items-start gap-2.5">
        {/* Icon */}
        {isExam ? (
          <Sparkles size={14} className="text-blue-500 shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle
            size={14}
            className={`shrink-0 mt-0.5 ${isHigh ? 'text-red-500' : isLow ? 'text-slate-400' : 'text-amber-500'}`}
          />
        )}

        <div className="min-w-0 flex-1">
          {/* Risk badge + title */}
          <div className="flex items-center gap-1.5 mb-0.5">
            {!isLow && (
              <span
                className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                style={{
                  color: isHigh ? '#dc2626' : '#d97706',
                  backgroundColor: isHigh ? '#fee2e2' : '#fef3c7',
                }}
              >
                {isHigh ? '需关注' : isExam ? '考前提醒' : '建议关注'}
              </span>
            )}
            {isLow && (
              <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                轻提示
              </span>
            )}
            <p className="text-[12px] font-medium text-slate-800 truncate">
              {insight.title}
            </p>
          </div>

          {/* Evidence summary */}
          <p className="text-[11px] text-slate-500 line-clamp-1">
            {insight.evidence.summary}
          </p>

          {/* Actions hint + view analysis */}
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px] text-slate-400">
              {insight.actions.length} 个推荐操作
            </span>
            <span className="text-[11px] text-blue-500 group-hover:underline flex items-center gap-0.5">
              查看分析
              <ChevronRight size={10} />
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}

import React from 'react'
import { Eye, Send, FolderPlus, BookOpen, Check } from 'lucide-react'
import type { ResourceItem } from '../../search-new/types'

interface ResourceCardProps {
  item: ResourceItem
  onPreview: (item: ResourceItem) => void
  onAssign: (item: ResourceItem) => void
  onAddToPaperBasket: (item: ResourceItem) => void
  onAddToLessonPrep: (item: ResourceItem) => void
  isInPaperBasket?: boolean
}

const difficultyLabel: Record<string, string> = {
  basic: '基础',
  medium: '中等',
  advanced: '较难',
}

const difficultyStyle: Record<string, string> = {
  basic: 'text-emerald-600 bg-emerald-50',
  medium: 'text-amber-600 bg-amber-50',
  advanced: 'text-red-500 bg-red-50',
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  item,
  onPreview,
  onAssign,
  onAddToPaperBasket,
  onAddToLessonPrep,
  isInPaperBasket = false,
}) => {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-4 hover:border-slate-200 hover:shadow-sm transition-all duration-200">
      {/* Title + Tags */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <h4 className="text-[15px] font-semibold text-slate-800 leading-snug">{item.title}</h4>
        <div className="flex items-center gap-1 shrink-0">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-500 font-medium border border-blue-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-slate-500 mb-2.5">
        {item.questionCount != null && <span>题量：{item.questionCount}题</span>}
        {item.duration && <span>预计用时：{item.duration}</span>}
        <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-md ${difficultyStyle[item.difficulty]}`}>
          {difficultyLabel[item.difficulty]}
        </span>
        <span>{item.grade}</span>
        {item.source && <span className="text-slate-400">{item.source}</span>}
      </div>

      {/* Recommend Reason */}
      {item.recommendReason && (
        <div className="mb-3 p-3 rounded-xl bg-blue-50/30 border border-blue-100/30">
          <p className="text-[12px] text-slate-500 leading-relaxed">推荐理由：{item.recommendReason}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {item.canPreview && (
          <button
            onClick={() => onPreview(item)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium
              text-slate-600 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50
              transition-all duration-200"
          >
            <Eye size={13} />
            预览
          </button>
        )}
        {item.canAssign && (
          <button
            onClick={() => onAssign(item)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px] font-semibold
              bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200
              transition-all duration-200"
          >
            <Send size={13} />
            布置
          </button>
        )}
        {item.canAddToPaperBasket && (
          <button
            onClick={() => onAddToPaperBasket(item)}
            disabled={isInPaperBasket}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200
              ${isInPaperBasket
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default'
                : 'text-slate-600 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600'
              }`}
          >
            {isInPaperBasket ? (
              <>
                <Check size={13} />
                已加入
              </>
            ) : (
              <>
                <FolderPlus size={13} />
                加入试卷篮
              </>
            )}
          </button>
        )}
        {item.isLessonPrepResource && item.canAddToLessonPrep && (
          <button
            onClick={() => onAddToLessonPrep(item)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium
              text-slate-600 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50
              transition-all duration-200"
          >
            <BookOpen size={13} />
            加入备课
          </button>
        )}
      </div>
    </div>
  )
}

export default ResourceCard

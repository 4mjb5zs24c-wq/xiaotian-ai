import { FileText, Clock, ChevronRight, Plus, BookOpen, Tag } from 'lucide-react'
import type { ResourceResult } from '../../search/types'
import { useAIStore } from '../../store'

const typeLabel: Record<string, string> = {
  listening: '听力', speaking: '听说', reading: '阅读', current_news: '时文',
  dubbing: '配音', video: '视频', vocabulary: '词汇', writing: '写作',
  grammar: '语法', courseware: '课件', exercise: '练习卷', exam_paper: '试卷',
}

const formatColors: Record<string, string> = {
  'MP3': 'bg-blue-50 text-blue-600', 'MP4': 'bg-purple-50 text-purple-600',
  'PDF': 'bg-red-50 text-red-600', 'PPT': 'bg-orange-50 text-orange-600',
  'MP3+PDF': 'bg-indigo-50 text-indigo-600', 'MP3+练习': 'bg-cyan-50 text-cyan-600',
  'PDF脚本': 'bg-amber-50 text-amber-600', 'MP4+软件': 'bg-pink-50 text-pink-600',
  'PDF+答案': 'bg-emerald-50 text-emerald-600', 'MP3+软件': 'bg-violet-50 text-violet-600',
}

const difficultyLabel = { basic: '基础', medium: '进阶', advanced: '拔高' }
const difficultyColor = {
  basic: 'bg-emerald-50 text-emerald-600',
  medium: 'bg-amber-50 text-amber-600',
  advanced: 'bg-red-50 text-red-600',
}

export default function ResourceResultCard({ resource }: { resource: ResourceResult }) {
  const openDrawer = useAIStore((s) => s.openDrawer)
  const addToBasket = useAIStore((s) => s.addToBasket)

  const handleClick = () => {
    openDrawer({
      type: 'recommendation',
      title: resource.title,
      cardData: {
        id: resource.id,
        title: resource.title,
        reason: resource.aiReason,
        type: 'material',
        tags: resource.tags,
        difficulty: resource.difficulty,
        estimatedTime: resource.duration || resource.size || '',
      },
    })
  }

  return (
    <button
      onClick={handleClick}
      className="w-full text-left bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-indigo-200 transition-all group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <FileText size={15} className="text-indigo-500 shrink-0" />
          <h4 className="text-sm font-semibold text-slate-800 truncate">{resource.title}</h4>
        </div>
        <ChevronRight size={14} className="text-slate-300 group-hover:text-indigo-400 transition-colors shrink-0" />
      </div>

      {/* Description */}
      <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
        {resource.description}
      </p>

      {/* Tags row */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500">
          {typeLabel[resource.type] || resource.type}
        </span>
        {resource.duration && (
          <span className="flex items-center gap-1 text-[10px] text-slate-400">
            <Clock size={10} /> {resource.duration}
          </span>
        )}
        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${difficultyColor[resource.difficulty]}`}>
          {difficultyLabel[resource.difficulty]}
        </span>
        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${formatColors[resource.format] || 'bg-slate-50 text-slate-500'}`}>
          {resource.format}
        </span>
      </div>

      {/* Context & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-[10px] text-slate-400">
          <BookOpen size={10} />
          <span>{resource.grade}</span>
          {resource.unit !== '-' && (
            <>
              <span>·</span>
              <span>{resource.unit}</span>
            </>
          )}
          {resource.matchesContext && (
            <span className="text-emerald-500 ml-1">
              <Tag size={10} className="inline" /> 匹配当前
            </span>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); addToBasket({ id: resource.id, title: resource.title, reason: resource.aiReason, type: 'material', tags: resource.tags, difficulty: resource.difficulty, estimatedTime: resource.duration || '' }) }}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-medium hover:bg-indigo-100 transition-colors"
        >
          <Plus size={10} /> 加入篮子
        </button>
      </div>
    </button>
  )
}

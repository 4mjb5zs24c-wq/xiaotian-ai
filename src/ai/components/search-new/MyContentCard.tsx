import React from 'react'
import { ChevronRight, Headphones, FileText, BookOpen, MoreHorizontal } from 'lucide-react'
import type { ResourceItem } from '../../search-new/types'

interface MyContentCardProps {
  item: ResourceItem
  /** Query determines which action is primary */
  query: string
  /** Callback when any action is clicked */
  onAction: (item: ResourceItem, action: string) => void
}

/**
 * Compact card for "my" personal content (词表/答题卡/试卷).
 *
 * NOT the full config page — just a summary card with quick actions.
 * Uses the same 2-col grid layout as ResourceCard.
 */
const MyContentCard: React.FC<MyContentCardProps> = ({ item, query, onAction }) => {
  const q = query.trim()

  // Determine quick actions based on item type and query
  const actions = getActions(item, q)

  return (
    <div className="bg-white border border-slate-100 rounded-xl p-4 hover:border-slate-200 hover:shadow-sm transition-all duration-200">
      {/* Title + Tags */}
      <div className="flex items-start justify-between gap-3 mb-2">
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
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-slate-500 mb-3">
        {item.questionCount != null && <span>词条：{item.questionCount}个</span>}
        {item.duration && <span>预计用时：{item.duration}</span>}
        <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-md ${
          item.difficulty === 'basic' ? 'text-emerald-600 bg-emerald-50' :
          item.difficulty === 'advanced' ? 'text-red-500 bg-red-50' :
          'text-amber-600 bg-amber-50'
        }`}>
          {item.difficulty === 'basic' ? '基础' : item.difficulty === 'advanced' ? '较难' : '中等'}
        </span>
        <span>{item.grade}</span>
        {item.source && <span className="text-slate-400">{item.source}</span>}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {actions.map((action) => (
          <button
            key={action.key}
            onClick={() => onAction(item, action.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
              action.isPrimary
                ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200'
                : 'text-slate-600 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50'
            }`}
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
}

interface QuickAction {
  key: string
  label: string
  icon: React.ReactNode
  isPrimary: boolean
}

function getActions(item: ResourceItem, query: string): QuickAction[] {
  const isAnswerCard = item.tags.some((t) => t === '答题卡')
  const isPaper = item.tags.some((t) => t === '试卷')

  if (isAnswerCard) {
    return [
      { key: 'assign', label: '布置', icon: <FileText size={13} />, isPrimary: true },
      { key: 'download', label: '下载', icon: <ChevronRight size={13} />, isPrimary: false },
      { key: 'more', label: '更多', icon: <MoreHorizontal size={13} />, isPrimary: false },
    ]
  }

  if (isPaper) {
    return [
      { key: 'preview', label: '预览', icon: <BookOpen size={13} />, isPrimary: false },
      { key: 'assign', label: '去布置', icon: <FileText size={13} />, isPrimary: true },
      { key: 'detail', label: '查看', icon: <ChevronRight size={13} />, isPrimary: false },
    ]
  }

  // Word list — primary button changes based on query
  const isDictation = /听写|听默|听词/.test(query)
  const isDefault = /默写|默/.test(query)

  if (isDictation) {
    return [
      { key: 'listen_dictation', label: '听默写', icon: <Headphones size={13} />, isPrimary: true },
      { key: 'assign_dictation', label: '布置默写练习', icon: <FileText size={13} />, isPrimary: false },
      { key: 'oral_reading', label: '布置跟读背诵', icon: <BookOpen size={13} />, isPrimary: false },
      { key: 'more', label: '更多', icon: <MoreHorizontal size={13} />, isPrimary: false },
    ]
  }

  if (isDefault) {
    return [
      { key: 'assign_dictation', label: '布置默写练习', icon: <FileText size={13} />, isPrimary: true },
      { key: 'listen_dictation', label: '听默写', icon: <Headphones size={13} />, isPrimary: false },
      { key: 'oral_reading', label: '布置跟读背诵', icon: <BookOpen size={13} />, isPrimary: false },
      { key: 'more', label: '更多', icon: <MoreHorizontal size={13} />, isPrimary: false },
    ]
  }

  // Default: 词汇/单词/词表
  return [
    { key: 'assign_dictation', label: '布置默写练习', icon: <FileText size={13} />, isPrimary: true },
    { key: 'listen_dictation', label: '听默写', icon: <Headphones size={13} />, isPrimary: false },
    { key: 'oral_reading', label: '布置跟读背诵', icon: <BookOpen size={13} />, isPrimary: false },
    { key: 'detail', label: '查看', icon: <ChevronRight size={13} />, isPrimary: false },
  ]
}

export default MyContentCard

/** Check if a group contains "my" personal content items */
export function isMyContentGroup(groupId: string): boolean {
  return groupId === 'my_wordlists' || groupId === 'my_answer_cards' || groupId === 'my_papers'
}

/** Get a "view all" link label for a my-content group */
export function getMyContentViewAllLabel(groupId: string): string | null {
  if (groupId === 'my_wordlists') return '查看我的词表'
  if (groupId === 'my_answer_cards') return '查看我的答题卡'
  if (groupId === 'my_papers') return '查看我的试卷'
  return null
}

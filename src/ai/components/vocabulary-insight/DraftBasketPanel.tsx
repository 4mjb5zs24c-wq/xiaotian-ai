import { useState, useEffect } from 'react'
import { X, Trash2, FileText, ChevronDown, ChevronRight } from 'lucide-react'
import type { VocabDraftItem } from '../../../ai/store'

const MAIN_TYPE_STYLES: Record<string, string> = {
  '不会写': 'bg-orange-50 text-orange-600',
  '读不准': 'bg-red-50 text-red-600',
  '生词': 'bg-blue-50 text-blue-600',
  '不会用': 'bg-sky-50 text-sky-600',
}

interface Props {
  items: VocabDraftItem[]
  className: string
  daysUntilExpiry: number
  onClose: () => void
  onRemove: (wordId: string) => void
  onClear: () => void
  onGeneratePlan: (selectedWordIds: string[]) => void
}

export default function DraftBasketPanel({
  items, className, daysUntilExpiry,
  onClose, onRemove, onClear, onGeneratePlan,
}: Props) {
  // Default select all items when panel opens
  const [expandedWords, setExpandedWords] = useState<Set<string>>(new Set())
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(items.map(i => i.wordId)))

  // Sync: remove deleted items from selectedIds
  useEffect(() => {
    const itemIds = new Set(items.map(i => i.wordId))
    setSelectedIds(prev => {
      const next = new Set(prev)
      for (const id of prev) {
        if (!itemIds.has(id)) next.delete(id)
      }
      return next
    })
  }, [items])

  const allSelected = items.length > 0 && selectedIds.size === items.length

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(items.map(i => i.wordId)))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next })
  }

  const toggleExpand = (id: string) => {
    setExpandedWords(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next })
  }

  const handleBatchRemove = () => {
    if (selectedIds.size === 0) return
    selectedIds.forEach(id => onRemove(id))
    setSelectedIds(new Set())
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl shadow-slate-900/10 w-[560px] max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-base font-bold text-slate-800">复习草稿篮</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {className} · {items.length} 个词 · 还将保留 {daysUntilExpiry} 天
              {daysUntilExpiry <= 1 && <span className="text-amber-500 ml-1">（明天将自动清空）</span>}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={17} />
          </button>
        </div>

        {/* Select All bar */}
        {items.length > 0 && (
          <div className="px-5 py-2 border-b border-slate-50 bg-slate-50/50 flex items-center gap-2 shrink-0">
            <button onClick={toggleSelectAll}
              className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors
                ${allSelected ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}>
              {allSelected && <span className="text-white text-[9px] leading-none">✓</span>}
            </button>
            <span className="text-xs text-slate-600 font-medium cursor-pointer select-none" onClick={toggleSelectAll}>全选</span>
            <span className="text-[11px] text-slate-400">{selectedIds.size}/{items.length} 个词已选</span>
          </div>
        )}

        {/* Word list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
          {items.length === 0 ? (
            <div className="text-center py-12 text-xs text-slate-400">
              <p>草稿篮为空</p>
              <p className="mt-1">从高频错词、重点关注词或学生错词中加入词汇</p>
            </div>
          ) : (
            items.map(item => {
              const isExpanded = expandedWords.has(item.wordId)
              const isSelected = selectedIds.has(item.wordId)
              return (
                <div key={item.wordId} className={`border rounded-xl overflow-hidden transition-all
                  ${isSelected ? 'border-blue-300 bg-blue-50/30' : 'border-slate-100 hover:border-slate-200'}`}>
                  <div className="flex items-center gap-2 px-3.5 py-2.5">
                    {/* Select checkbox */}
                    <button onClick={() => toggleSelect(item.wordId)}
                      className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center shrink-0 transition-colors
                        ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}>
                      {isSelected && <span className="text-white text-[8px] leading-none">✓</span>}
                    </button>

                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => toggleExpand(item.wordId)}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-800">{item.wordText}</span>
                        <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${MAIN_TYPE_STYLES[item.mainType] || 'bg-slate-50 text-slate-500'}`}>
                          {item.mainType}
                        </span>
                        <span className="text-[10px] text-slate-400">{item.affectedStudentCount}人</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        {item.sourceTags.map(tag => (
                          <span key={tag} className="text-[9px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{tag}</span>
                        ))}
                        <span className="text-[9px] text-slate-300">
                          {new Date(item.addedAt).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    <button onClick={() => onRemove(item.wordId)} className="p-1 text-slate-300 hover:text-red-500 transition-colors shrink-0">
                      <Trash2 size={13} />
                    </button>

                    <button onClick={() => toggleExpand(item.wordId)} className="text-slate-400 hover:text-slate-600 shrink-0">
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="px-4 py-2.5 border-t border-blue-100 bg-blue-50/20 space-y-1 text-xs text-slate-500">
                      <p>错因：{item.mainType}</p>
                      <p>影响学生：{item.affectedStudentCount} 人</p>
                      {item.errorRate != null ? <p>错误率：{item.errorRate}%</p> : item.scoreRate != null ? <p>错误率：{100 - item.scoreRate}%</p> : null}
                      <p>加入时间：{new Date(item.addedAt).toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              {selectedIds.size > 0 && (
                <button onClick={handleBatchRemove} className="text-xs text-red-500 hover:text-red-600 font-medium">
                  删除已选（{selectedIds.size}）
                </button>
              )}
              <button onClick={onClear} className="text-xs text-slate-400 hover:text-red-500 transition-colors">清空全部</button>
            </div>
            <button
              onClick={() => onGeneratePlan(Array.from(selectedIds))}
              disabled={selectedIds.size === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all
                ${selectedIds.size > 0
                  ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
            >
              <FileText size={13} />
              {selectedIds.size === 0 ? '请选择要生成方案的词' : `用已选 ${selectedIds.size} 个词生成方案`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

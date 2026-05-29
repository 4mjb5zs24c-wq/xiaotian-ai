/**
 * ResourceRecommendationPanel — 在 Drawer 内展示推荐资源
 *
 * Supports: select/deselect, remove resource, preview question details.
 * V1: mock resources. Real resource data comes in P2.
 */

import { useState } from 'react'
import { Sparkles, ShoppingBasket, Send, Eye, ChevronRight, Trash2, RotateCcw } from 'lucide-react'
import { useAIStore } from '../store'
import type { RecommendedResource } from '../resources/resourceTypes'
import { hasActiveContent } from '../resources/resourceTypes'
import { getMockRecommendedResources } from '../insights/mockRecommendedResources'

interface Props {
  actionLabel: string
  query: string
  actionId: string
  insightTitle?: string
  onPreview: (resource: RecommendedResource) => void
  onAssign: (resources: RecommendedResource[]) => void
  onBack?: () => void
}

export default function ResourceRecommendationPanel({ actionLabel, query, onPreview, onAssign, onBack }: Props) {
  const [resources, setResources] = useState<RecommendedResource[]>(() => getMockRecommendedResources(query))
  const [toast, setToast] = useState<string | null>(null)
  const addToBasket = useAIStore((s) => s.addToBasket)

  const showT = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2000) }

  const toggle = (id: string) => {
    setResources((prev) => prev.map((r) =>
      r.resourceId === id ? { ...r, selected: !r.selected } : r
    ))
  }

  const removeResource = (id: string) => {
    setResources((prev) => prev.map((r) =>
      r.resourceId === id ? { ...r, removed: true, selected: false } : r
    ))
  }

  const restoreResource = (id: string) => {
    setResources((prev) => prev.map((r) =>
      r.resourceId === id ? { ...r, removed: false } : r
    ))
  }

  const visibleResources = resources.filter((r) => !r.removed)
  const removedResources = resources.filter((r) => r.removed)
  const selectedCount = resources.filter((r) => r.selected && !r.removed).length

  const handleAddSelectedToBasket = () => {
    const selected = resources.filter((r) => r.selected && !r.removed)
    if (selected.length === 0) {
      showT('当前没有可加入练习篮的内容')
      return
    }
    selected.forEach((r) => {
      const exists = useAIStore.getState().practiceBasket.some((i) => 'id' in i && i.id === r.resourceId)
      if (!exists) {
        addToBasket({
          id: r.resourceId,
          title: r.title,
          reason: r.reason,
          type: 'material',
          tags: r.tags,
          difficulty: r.difficulty as 'basic' | 'medium' | 'advanced',
          estimatedTime: r.estimatedTime,
        })
      }
    })
    setResources((prev) => prev.map((r) => r.selected ? { ...r, selected: false } : r))
    showT('已加入练习篮')
  }

  const handleAssignSelected = () => {
    const selected = resources.filter((r) => r.selected && !r.removed)
    if (selected.length === 0) {
      showT('请至少选择 1 个资源')
      return
    }
    if (!selected.every(hasActiveContent)) {
      showT('部分资源无可布置内容，请检查资源详情')
      return
    }
    onAssign(selected)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Header */}
        <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={16} className="text-blue-500" />
            <h3 className="text-sm font-semibold text-slate-800">{actionLabel}</h3>
          </div>
          <p className="text-[11px] text-slate-500">
            基于当前洞察为你推荐以下资源
          </p>
        </div>

        {/* Active resource list */}
        {visibleResources.length > 0 && (
          <div>
            <h4 className="text-[12px] font-semibold text-slate-700 mb-2">推荐资源</h4>
            <div className="space-y-2">
              {visibleResources.map((r) => (
                <div
                  key={r.resourceId}
                  className={`p-3 rounded-xl border transition-colors ${
                    r.selected
                      ? 'border-blue-300 bg-blue-50/30'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggle(r.resourceId)}
                      className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                        r.selected ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                      }`}
                    >
                      {r.selected && <span className="text-white text-[10px]">✓</span>}
                    </button>
                    {/* Content */}
                    <button
                      onClick={() => onPreview(r)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-slate-700 truncate">{r.title}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded shrink-0">{r.type}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mb-1">{r.reason}</p>
                      <div className="flex items-center gap-3 text-[10px] text-slate-400">
                        <span>{r.difficulty}</span>
                        <span>{r.estimatedTime}</span>
                        <span>{r.questions.length} 题 · {r.totalScore} 分</span>
                      </div>
                    </button>
                    {/* Actions */}
                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); onPreview(r) }}
                        className="p-1.5 rounded-md text-slate-300 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                        title="预览详情"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeResource(r.resourceId) }}
                        className="p-1.5 rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="移除"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Removed resources */}
        {removedResources.length > 0 && (
          <div>
            <h4 className="text-[11px] font-medium text-slate-400 mb-2">已移除的资源 ({removedResources.length})</h4>
            <div className="space-y-1">
              {removedResources.map((r) => (
                <div key={r.resourceId} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50/50 border border-slate-100">
                  <span className="text-[10px] text-slate-300 line-through flex-1">{r.title}</span>
                  <button
                    onClick={() => restoreResource(r.resourceId)}
                    className="flex items-center gap-1 text-[10px] text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    <RotateCcw size={11} />
                    恢复
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {visibleResources.length === 0 && removedResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-slate-400">暂无推荐资源</p>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="shrink-0 bg-slate-800 text-white text-[11px] text-center py-2 px-4 mx-6 rounded-lg mb-1">
          {toast}
        </div>
      )}

      {/* Bottom bar */}
      <div className="shrink-0 border-t border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50">
              <ChevronRight size={14} className="rotate-180" />
              返回
            </button>
          )}
          <span className="text-[11px] text-slate-400">
            已选 {selectedCount} 个资源
          </span>
          <button
            onClick={handleAddSelectedToBasket}
            disabled={selectedCount === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ShoppingBasket size={14} />
            加入练习篮
          </button>
          <button
            onClick={handleAssignSelected}
            disabled={selectedCount === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors ml-auto"
          >
            <Send size={14} />
            布置给学生
          </button>
        </div>
      </div>
    </div>
  )
}

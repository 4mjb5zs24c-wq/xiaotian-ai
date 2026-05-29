/**
 * ResourceDetailPreviewPanel — Drawer 内资源详情预览
 *
 * Shows questions within a recommended resource.
 * Supports: view question details, remove/restore questions.
 * V1: mock data.
 */

import { useState } from 'react'
import { ChevronRight, Trash2, RotateCcw, Send, ShoppingBasket } from 'lucide-react'
import type { RecommendedResource } from '../resources/resourceTypes'
import { getActiveQuestions, getActiveScore, getActiveCount, removeQuestion, restoreQuestion, hasActiveContent } from '../resources/resourceTypes'
import { useAIStore } from '../store'

interface Props {
  resource: RecommendedResource
  onBack: () => void
  onAssign: (resource: RecommendedResource) => void
}

export default function ResourceDetailPreviewPanel({ resource: initialResource, onBack, onAssign }: Props) {
  const [resource, setResource] = useState<RecommendedResource>(initialResource)
  const [expandedQ, setExpandedQ] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const addToBasket = useAIStore((s) => s.addToBasket)

  const activeQs = getActiveQuestions(resource)
  const activeScore = getActiveScore(resource)
  const activeCount = getActiveCount(resource)
  const totalQs = resource.questions.length
  const removedCount = totalQs - activeCount

  const showT = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2000) }

  const handleRemoveQ = (qId: string) => {
    setResource((prev) => removeQuestion(prev, qId))
  }

  const handleRestoreQ = (qId: string) => {
    setResource((prev) => restoreQuestion(prev, qId))
  }

  const handleAddToBasket = () => {
    if (!hasActiveContent(resource)) {
      showT('当前没有可加入练习篮的内容')
      return
    }
    const exists = useAIStore.getState().practiceBasket.some((i) => 'id' in i && i.id === resource.resourceId)
    if (exists) {
      showT('该内容已在练习篮中')
      return
    }
    addToBasket({
      id: resource.resourceId,
      title: resource.title,
      reason: resource.reason,
      type: 'material',
      tags: resource.tags,
      difficulty: resource.difficulty as 'basic' | 'medium' | 'advanced',
      estimatedTime: resource.estimatedTime,
    })
    showT('已加入练习篮')
  }

  const handleAssign = () => {
    if (!hasActiveContent(resource)) {
      showT('当前没有可布置的内容，请至少保留 1 道题')
      return
    }
    onAssign(resource)
  }

  const toggleExpand = (qId: string) => {
    setExpandedQ((prev) => (prev === qId ? null : qId))
  }

  const removedQs = resource.questions.filter((q) => q.removed)

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Header */}
        <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-slate-800 mb-1">{resource.title}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">{resource.type}</span>
            <span className="text-[10px] text-slate-400">{resource.difficulty}</span>
            <span className="text-[10px] text-slate-400">{resource.estimatedTime}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">{resource.reason}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-[11px] text-slate-500 bg-slate-50 rounded-xl px-4 py-2.5">
          <span>共 <b className="text-slate-700">{totalQs}</b> 题</span>
          <span>已保留 <b className="text-emerald-600">{activeCount}</b> 题</span>
          {removedCount > 0 && <span>已删除 <b className="text-red-500">{removedCount}</b> 题</span>}
          <span className="ml-auto">总分 <b className="text-slate-700">{activeScore}</b> 分</span>
        </div>

        {/* Active questions */}
        {activeQs.length > 0 && (
          <div>
            <h4 className="text-[12px] font-semibold text-slate-700 mb-2">题目详情</h4>
            <div className="space-y-2">
              {activeQs.map((q, idx) => {
                const expanded = expandedQ === q.questionId
                return (
                  <div key={q.questionId} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleExpand(q.questionId)}
                      className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-[10px] text-slate-400 w-5">{idx + 1}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded shrink-0">{q.questionType}</span>
                      <span className="text-[12px] text-slate-700 truncate flex-1">{q.stem.substring(0, 60)}{q.stem.length > 60 ? '...' : ''}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-slate-400">{q.score}分</span>
                        <span className={`text-[9px] px-1 py-0.5 rounded ${
                          q.difficulty === 'basic' ? 'bg-emerald-50 text-emerald-600' :
                          q.difficulty === 'advanced' ? 'bg-red-50 text-red-500' :
                          'bg-amber-50 text-amber-600'
                        }`}>
                          {q.difficulty === 'basic' ? '基础' : q.difficulty === 'advanced' ? '提高' : '中等'}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRemoveQ(q.questionId) }}
                          className="p-1 rounded text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </button>
                    {expanded && (
                      <div className="px-4 pb-3 space-y-2 border-t border-slate-100 pt-2">
                        <p className="text-[11px] text-slate-700">{q.stem}</p>
                        {q.options && (
                          <div className="flex flex-wrap gap-2">
                            {q.options.map((o, i) => (
                              <span key={i} className="text-[10px] bg-slate-50 text-slate-600 px-2 py-1 rounded">{o}</span>
                            ))}
                          </div>
                        )}
                        <div className="bg-emerald-50/50 rounded-lg p-2">
                          <span className="text-[10px] text-emerald-600 font-medium">答案: {q.answer}</span>
                        </div>
                        <div className="bg-blue-50/30 rounded-lg p-2">
                          <span className="text-[10px] text-blue-600">解析: {q.analysis}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Removed questions (collapsed, restorable) */}
        {removedQs.length > 0 && (
          <div>
            <h4 className="text-[11px] font-medium text-slate-400 mb-2">已删除的题目 ({removedQs.length})</h4>
            <div className="space-y-1">
              {removedQs.map((q) => (
                <div key={q.questionId} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50/50 border border-slate-100">
                  <span className="text-[10px] text-slate-300 line-through flex-1">{q.questionType} — {q.stem.substring(0, 30)}...</span>
                  <button
                    onClick={() => handleRestoreQ(q.questionId)}
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

        {/* Empty state */}
        {activeQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-slate-400">所有题目已删除</p>
            <p className="text-[11px] text-slate-300 mt-1">请至少恢复 1 道题后再布置</p>
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
          <button onClick={onBack} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50">
            <ChevronRight size={14} className="rotate-180" />
            返回资源列表
          </button>
          <button
            onClick={handleAddToBasket}
            disabled={!hasActiveContent(resource)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ShoppingBasket size={14} />
            加入练习篮
          </button>
          <button
            onClick={handleAssign}
            disabled={!hasActiveContent(resource)}
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

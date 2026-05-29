/**
 * Human Review Panel —— 人工审核面板
 *
 * 当 Agent 请求人工介入时，此面板从右侧滑出。
 * 老师可以：approve / reject / edit / select / retry
 *
 * 通过 humanEventBus 的 subscribeToRequests 监听新请求。
 */

import { useState, useEffect, useCallback } from 'react'
import { X, Check, XCircle, Edit3, SkipForward, AlertTriangle, User } from 'lucide-react'
import {
  getPendingRequests,
  resolveInteraction,
  subscribeToRequests,
  cancelRequest,
} from '../../human/humanEventBus'
import type { HumanInteractionRequest, HumanInteractionResponse } from '../../human/types'

export default function HumanReviewPanel() {
  const [request, setRequest] = useState<HumanInteractionRequest | null>(null)
  const [comment, setComment] = useState('')
  const [visible, setVisible] = useState(false)

  // Subscribe to new requests
  useEffect(() => {
    const unsub = subscribeToRequests(
      (req) => {
        setRequest(req)
        setVisible(true)
        setComment('')
      },
      (_id) => {
        setVisible(false)
        setRequest(null)
      },
    )
    // Check for existing pending requests on mount
    const existing = getPendingRequests()
    if (existing.length > 0) {
      setRequest(existing[0])
      setVisible(true)
    }
    return unsub
  }, [])

  const respond = useCallback(
    (action: HumanInteractionResponse['action'], selectedOption?: string) => {
      if (!request) return
      resolveInteraction(request.id, {
        action,
        selectedOption,
        comment: comment || undefined,
      })
      setVisible(false)
      setRequest(null)
      setComment('')
    },
    [request, comment],
  )

  const handleCancel = useCallback(() => {
    if (!request) return
    cancelRequest(request.id)
    setVisible(false)
    setRequest(null)
  }, [request])

  if (!visible || !request) return null

  const isConfirm = request.type === 'confirm'
  const isSelect = request.type === 'select'
  const hasOptions = request.options && request.options.length > 0

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/20" onClick={handleCancel} />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-[420px] max-w-[100vw] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right">
        {/* Header */}
        <div className="shrink-0 border-b border-slate-200 px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-100">
                <User size={14} className="text-amber-600" />
              </div>
              <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                {request.required ? '需要确认' : '建议确认'}
              </span>
            </div>
            <button onClick={handleCancel} className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          </div>
          <h2 className="text-base font-semibold text-slate-800 mb-1">{request.title}</h2>
          <p className="text-xs text-slate-500">{request.description}</p>
          <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
            <AlertTriangle size={10} />
            <span>AI 建议确认后继续 · {request.sourceAgent}</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Payload preview */}
          {request.payload != null && (
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                AI 生成内容
              </h4>
              <div className="bg-slate-50 rounded-lg p-3 max-h-48 overflow-y-auto">
                <pre className="text-xs text-slate-600 font-mono whitespace-pre-wrap">
                  {JSON.stringify(request.payload as Record<string, unknown>, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Options for select type */}
          {isSelect && hasOptions && (
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                可选方案
              </h4>
              <div className="space-y-2">
                {request.options!.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => respond('select', opt.id)}
                    className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors group"
                  >
                    <p className="text-sm font-medium text-slate-700 group-hover:text-indigo-700">
                      {opt.label}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{opt.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isConfirm && hasOptions && (
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                操作选项
              </h4>
              <div className="space-y-2">
                {request.options!.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => respond(opt.id === 'approve' ? 'approve' : 'select', opt.id)}
                    className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    <p className="text-sm font-medium text-slate-700">{opt.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{opt.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Teacher comment */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              备注（可选）
            </h4>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="给 AI 的反馈，例如：这些词太简单了..."
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-700 placeholder-slate-400 outline-none focus:border-indigo-400 resize-none h-20"
            />
          </div>
        </div>

        {/* Action bar */}
        <div className="shrink-0 border-t border-slate-200 px-5 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => respond('approve')}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <Check size={14} />
              确认通过
            </button>
            <button
              onClick={() => respond('reject')}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
            >
              <XCircle size={14} />
              拒绝
            </button>
            <button
              onClick={() => respond('edit')}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-200 text-slate-500 text-sm hover:bg-slate-50 transition-colors"
            >
              <Edit3 size={14} />
            </button>
            <button
              onClick={() => respond('skip')}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-200 text-slate-400 text-sm hover:bg-slate-50 transition-colors"
            >
              <SkipForward size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

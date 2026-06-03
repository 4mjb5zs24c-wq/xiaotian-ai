import React, { useState } from 'react'
import { Trash2, Edit3, Check, X, Settings, Send } from 'lucide-react'
import type { AssignmentDraft, AssignmentSettings } from '../../search-new/types'

interface AssignmentConfirmPanelProps {
  assignments: AssignmentDraft[]
  onConfirm: (assignments: AssignmentDraft[], settings: AssignmentSettings) => void
  onCancel: () => void
  onEditAssignment: (id: string, newTitle: string) => void
  onDeleteAssignment: (id: string) => void
}

const defaultSettings: AssignmentSettings = {
  className: '初一 1 班',
  publishTarget: '全班',
  startTime: '',
  deadline: '',
  scorePublish: 'after_deadline',
  allowLateSubmission: false,
}

const AssignmentConfirmPanel: React.FC<AssignmentConfirmPanelProps> = ({
  assignments,
  onConfirm,
  onCancel,
  onEditAssignment,
  onDeleteAssignment,
}) => {
  const [settings, setSettings] = useState<AssignmentSettings>(defaultSettings)
  const [singleSettings, setSingleSettings] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')

  const handleStartEdit = (a: AssignmentDraft) => {
    setEditingId(a.id)
    setEditTitle(a.title)
  }

  const handleSaveEdit = () => {
    if (editingId && editTitle.trim()) {
      onEditAssignment(editingId, editTitle.trim())
    }
    setEditingId(null)
  }

  const handleConfirm = () => {
    if (assignments.length === 0) return
    const finalSettings = {
      ...settings,
      deadline: settings.deadline || '明天 23:59',
    }
    onConfirm(assignments, finalSettings)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-[15px] font-semibold text-slate-800">
          待发布作业（{assignments.length}条）
        </h4>
      </div>

      {/* Assignment List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {assignments.map((a) => (
          <div
            key={a.id}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-100"
          >
            {editingId === a.id ? (
              <div className="flex-1 flex items-center gap-1.5">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                  className="flex-1 px-3 py-1.5 text-[13px] border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
                  autoFocus
                />
                <button onClick={handleSaveEdit} className="p-1 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors">
                  <Check size={14} />
                </button>
                <button onClick={() => setEditingId(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <span
                className="flex-1 text-[13px] text-slate-700 truncate cursor-pointer hover:text-blue-500 transition-colors"
                onClick={() => handleStartEdit(a)}
              >
                {a.title}
              </span>
            )}

            <span className="text-xs text-slate-400 shrink-0">
              {a.nodeName && <span className="mr-1">{a.nodeName}</span>}
              <span>{a.usageLabel}</span>
              <span className="mx-1">·</span>
              <span>{a.contentCount}个内容</span>
            </span>

            {editingId !== a.id && (
              <div className="flex items-center gap-0.5 shrink-0">
                <button
                  onClick={() => handleStartEdit(a)}
                  className="p-1 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit3 size={14} />
                </button>
                <button
                  onClick={() => onDeleteAssignment(a.id)}
                  className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="border border-slate-200 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Settings size={14} className="text-slate-400" />
          <h5 className="text-sm font-semibold text-slate-700">布置设置</h5>
          <span className="text-xs text-slate-400">（默认统一应用到全部作业）</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="班级" value={settings.className} onChange={(v) => setSettings({ ...settings, className: v })} />
          <Field label="发布对象" value={settings.publishTarget} onChange={(v) => setSettings({ ...settings, publishTarget: v })} />
          <Field label="开始时间" value={settings.startTime} onChange={(v) => setSettings({ ...settings, startTime: v })} placeholder="立即开始" />
          <Field label="截止时间" value={settings.deadline} onChange={(v) => setSettings({ ...settings, deadline: v })} placeholder="明天 23:59" />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-slate-600">成绩公布：</span>
            <select
              value={settings.scorePublish}
              onChange={(e) => setSettings({ ...settings, scorePublish: e.target.value as any })}
              className="text-[13px] border border-slate-200 rounded-lg px-3 py-1.5 bg-white"
            >
              <option value="after_deadline">截止后公布</option>
              <option value="immediate">立即公布</option>
              <option value="never">不公布</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-[13px] text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.allowLateSubmission}
              onChange={(e) => setSettings({ ...settings, allowLateSubmission: e.target.checked })}
              className="rounded"
            />
            允许补交
          </label>
        </div>

        <label className="flex items-center gap-2 text-[13px] text-blue-500 cursor-pointer hover:text-blue-600">
          <input
            type="checkbox"
            checked={singleSettings}
            onChange={(e) => setSingleSettings(e.target.checked)}
            className="rounded"
          />
          为每条作业单独设置
        </label>

        {singleSettings && (
          <p className="text-xs text-slate-400 italic">
            单独设置功能即将推出，当前仍使用统一设置。
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-[13px] font-medium
            border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50
            transition-all duration-200"
        >
          取消
        </button>
        <button
          onClick={handleConfirm}
          disabled={assignments.length === 0}
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold
            bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-200
            disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none disabled:cursor-not-allowed
            transition-all duration-200"
        >
          <Send size={14} />
          确认布置
        </button>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[13px] text-slate-500 shrink-0 w-14">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-1.5 text-[13px] border border-slate-200 rounded-lg
          focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100
          placeholder-slate-400 transition-all"
      />
    </div>
  )
}

export default AssignmentConfirmPanel

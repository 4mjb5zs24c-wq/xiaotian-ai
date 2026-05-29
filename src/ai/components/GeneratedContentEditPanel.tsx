/**
 * GeneratedContentEditPanel — 编辑 AI 生成的内容
 *
 * Supports editing: vocab lists, writing review points, speaking/exam configs.
 * V1 is mock — edits are in-memory only.
 */

import { useState } from 'react'
import { Save, Trash2, X } from 'lucide-react'
import type { GeneratedContent, ContentItem } from '../insights/generatedContentTypes'

interface Props {
  content: GeneratedContent
  onSave: (updated: GeneratedContent) => void
  onCancel: () => void
}

export default function GeneratedContentEditPanel({ content, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(content.title)
  const [items, setItems] = useState<ContentItem[]>([...content.items])
  const [difficulty, setDifficulty] = useState(content.difficulty)
  const [estimatedTime, setEstimatedTime] = useState(content.estimatedTime)
  const [score, setScore] = useState(content.score)

  const isVocab = content.type === 'wrong_word_practice' || content.type === 'vocab_practice'
  const isWriting = content.type === 'writing_review' || content.type === 'writing_revision'
  const isSpeaking = content.type === 'speaking_practice' || content.type === 'listening_practice'
  const isExam = content.type === 'exam_mock' || content.type === 'special_practice'

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const handleToggleItem = (id: string) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, selected: !i.selected } : i))
  }

  const handleSave = () => {
    const updated: GeneratedContent = {
      ...content,
      title,
      items,
      difficulty,
      estimatedTime,
      score,
      status: 'edited',
    }
    onSave(updated)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <h3 className="text-sm font-semibold text-slate-700">编辑内容</h3>

        {/* Title */}
        <div>
          <label className="text-[11px] text-slate-500 mb-1 block">名称</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-blue-300 outline-none"
          />
        </div>

        {/* Items */}
        <div>
          <label className="text-[11px] text-slate-500 mb-1 block">
            {isVocab ? '词表' : isWriting ? '讲评 / 修改要点' : isExam ? '题目配置' : '内容项'}
          </label>
          <div className="space-y-1.5">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                {/* Checkbox for selectable items */}
                {isWriting && (
                  <input
                    type="checkbox"
                    checked={item.selected !== false}
                    onChange={() => handleToggleItem(item.id)}
                    className="w-4 h-4 text-blue-500 rounded"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-slate-700 truncate block">{item.label}</span>
                  {item.sublabel && (
                    <span className="text-[10px] text-slate-400">{item.sublabel}</span>
                  )}
                </div>
                {item.meta && (
                  <span className="text-[10px] text-slate-400 shrink-0">{item.meta}</span>
                )}
                {item.editable !== false && (
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1 rounded text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {isVocab && (
            <p className="text-[10px] text-slate-400 mt-1">可点击删除图标移除词汇，后续版本将支持添加新词。</p>
          )}
        </div>

        {/* Difficulty */}
        {isExam && (
          <div>
            <label className="text-[11px] text-slate-500 mb-1 block">难度</label>
            <div className="flex gap-2">
              {(['basic', 'medium', 'advanced'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-3 py-1.5 text-[12px] rounded-lg border transition-colors ${
                    difficulty === d
                      ? 'border-blue-300 bg-blue-50 text-blue-600'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {d === 'basic' ? '基础' : d === 'medium' ? '中等' : '提高'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Estimated Time */}
        <div>
          <label className="text-[11px] text-slate-500 mb-1 block">预计用时</label>
          <input
            type="text"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-blue-300 outline-none"
          />
        </div>

        {/* Score (for exam types) */}
        {isExam && (
          <div>
            <label className="text-[11px] text-slate-500 mb-1 block">分值</label>
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              className="w-32 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-blue-300 outline-none"
            />
          </div>
        )}

        {/* Speaking: material selection */}
        {isSpeaking && (
          <div>
            <label className="text-[11px] text-slate-500 mb-1 block">训练素材</label>
            <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:border-blue-300 outline-none bg-white">
              <option>Unit 3 — Food and Drinks 话题听说</option>
              <option>期末综合听说训练</option>
              <option>广东听说专项（角色扮演）</option>
            </select>
          </div>
        )}
      </div>

      {/* Bottom action bar */}
      <div className="shrink-0 border-t border-slate-200 bg-white px-6 py-4 flex items-center gap-3">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
        >
          <X size={14} />
          取消
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors ml-auto"
        >
          <Save size={14} />
          保存
        </button>
      </div>
    </div>
  )
}

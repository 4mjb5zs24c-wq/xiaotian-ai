/**
 * GeneratedContentPanel — 展示 AI 推荐动作生成的内容
 *
 * Displays generated content from insight actions.
 * Supports: preview, edit, add to basket, assign.
 */

import { Clock, Edit3, ShoppingBasket, Send, Sparkles } from 'lucide-react'
import type { GeneratedContent } from '../insights/generatedContentTypes'

interface Props {
  content: GeneratedContent
  onEdit: () => void
  onAddToBasket: () => void
  onAssign: () => void
}

// ── Labels ────────────────────────────────────────────────

const TYPE_LABELS: Record<string, string> = {
  wrong_word_practice: '错词强化',
  writing_review: '作文讲评',
  model_essay: '范文推荐',
  writing_revision: '二次修改',
  exam_mock: '模拟卷',
  special_practice: '专项训练',
  vocab_practice: '词汇练习',
  speaking_practice: '听说训练',
  listening_practice: '听力训练',
}

const DIFFICULTY_LABELS: Record<string, string> = {
  basic: '基础',
  medium: '中等',
  advanced: '提高',
}

// ── Main Component ────────────────────────────────────────

export default function GeneratedContentPanel({ content, onEdit, onAddToBasket, onAssign }: Props) {
  const typeLabel = TYPE_LABELS[content.type] || content.type

  return (
    <div className="flex flex-col h-full">
      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Header */}
        <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-blue-500" />
            <h3 className="text-base font-semibold text-slate-800">{content.title}</h3>
            {content.status === 'edited' && (
              <span className="text-[10px] bg-emerald-100 text-emerald-600 px-1.5 py-0.5 rounded">已更新</span>
            )}
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span className="bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">{typeLabel}</span>
            {content.difficulty && (
              <span>{DIFFICULTY_LABELS[content.difficulty] || content.difficulty}难度</span>
            )}
            {content.estimatedTime && (
              <span className="flex items-center gap-1"><Clock size={11} /> {content.estimatedTime}</span>
            )}
            {content.score > 0 && <span>满分 {content.score} 分</span>}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">内容摘要</h4>
          <p className="text-sm text-slate-600 leading-relaxed">{content.summary}</p>
        </div>

        {/* Items */}
        {content.items.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              {content.type === 'wrong_word_practice' ? '词表' :
               content.type === 'exam_mock' ? '题型配置' :
               content.type === 'writing_review' ? '讲评要点' :
               content.type === 'writing_revision' ? '修改要求' :
               content.type === 'special_practice' ? '训练模块' : '内容列表'}
            </h4>
            <div className="space-y-1.5">
              {content.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div>
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    {item.sublabel && (
                      <span className="text-[11px] text-slate-500 ml-2">{item.sublabel}</span>
                    )}
                  </div>
                  {item.meta && (
                    <span className="text-[11px] text-slate-400">{item.meta}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Extra details by type */}
        {content.extra && content.type === 'exam_mock' && (
          <MockDetail extra={content.extra} />
        )}
        {content.extra && content.type === 'writing_review' && (
          <WritingReviewDetail extra={content.extra} />
        )}
        {content.extra && content.type === 'model_essay' && (
          <ModelEssayDetail extra={content.extra} />
        )}
        {content.extra && content.type === 'wrong_word_practice' && (
          <VocabDetail extra={content.extra} />
        )}
      </div>

      {/* Bottom action bar */}
      <div className="shrink-0 border-t border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          {content.editable && (
            <button
              onClick={onEdit}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              <Edit3 size={14} />
              编辑
            </button>
          )}
          {content.basketable && (
            <button
              onClick={onAddToBasket}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              <ShoppingBasket size={14} />
              加入练习篮
            </button>
          )}
          {content.assignable && (
            <button
              onClick={onAssign}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors ml-auto"
            >
              <Send size={14} />
              布置给学生
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Type-specific detail sub-components ────────────────────

function MockDetail({ extra }: { extra: Record<string, unknown> }) {
  const config = extra.questionConfig as Array<{ type: string; count: number; score: number }> | undefined
  if (!config) return null
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <h4 className="text-sm font-semibold text-slate-700 mb-2">题型配置</h4>
      <div className="grid grid-cols-2 gap-2">
        {config.map((q, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-50">
            <span className="text-[12px] text-slate-600">{q.type}</span>
            <span className="text-[11px] text-slate-400">{q.count}题 / {q.score}分</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function WritingReviewDetail({ extra }: { extra: Record<string, unknown> }) {
  const issues = extra.commonIssues as string[] | undefined
  const points = extra.reviewPoints as string[] | undefined
  return (
    <div className="space-y-3">
      {issues && (
        <div className="bg-red-50/30 border border-red-100 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-red-700 mb-2">共性问题</h4>
          <div className="flex flex-wrap gap-1.5">
            {issues.map((issue, i) => (
              <span key={i} className="text-[11px] bg-red-100 text-red-600 px-2 py-0.5 rounded">{issue}</span>
            ))}
          </div>
        </div>
      )}
      {points && (
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">讲评重点</h4>
          <div className="space-y-1">
            {points.map((p, i) => (
              <p key={i} className="text-[12px] text-slate-600">{p}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ModelEssayDetail({ extra }: { extra: Record<string, unknown> }) {
  const highlights = extra.highlights as string[] | undefined
  const structures = extra.reusableStructures as string[] | undefined
  const excerpt = extra.essayExcerpt as string | undefined
  return (
    <div className="space-y-3">
      {highlights && (
        <div className="bg-emerald-50/30 border border-emerald-100 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-emerald-700 mb-2">亮点表达</h4>
          <div className="flex flex-wrap gap-1.5">
            {highlights.map((h, i) => (
              <span key={i} className="text-[11px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded">{h}</span>
            ))}
          </div>
        </div>
      )}
      {structures && (
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">可借鉴句型</h4>
          <div className="space-y-1">
            {structures.map((s, i) => (
              <p key={i} className="text-[12px] text-slate-600 font-mono">{s}</p>
            ))}
          </div>
        </div>
      )}
      {excerpt && (
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">范文摘要</h4>
          <pre className="text-[12px] text-slate-600 leading-relaxed whitespace-pre-wrap font-sans">{excerpt}</pre>
        </div>
      )}
    </div>
  )
}

function VocabDetail({ extra }: { extra: Record<string, unknown> }) {
  const types = extra.questionTypes as string[] | undefined
  const total = extra.totalQuestions as number | undefined
  if (!types) return null
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <h4 className="text-sm font-semibold text-slate-700 mb-2">推荐题型</h4>
      <div className="flex items-center gap-2 flex-wrap">
        {types.map((t, i) => (
          <span key={i} className="text-[11px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{t}</span>
        ))}
        {total && <span className="text-[11px] text-slate-400">共 {total} 题</span>}
      </div>
    </div>
  )
}

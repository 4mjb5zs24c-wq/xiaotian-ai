/**
 * AISearchResultRenderer — Unified result rendering for all intent types
 *
 * Used by: AISearchPage, AIAssistantDrawer
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles, Send, Edit3, BookOpen, Play, PenLine,
  FileCheck, Grid3X3, FileText, Search,
} from 'lucide-react'
import type { AISearchResult } from '../controller/aiTaskController'
import { handleResourceAction } from '../controller/resourceActionController'
import type { ResourceAction, ActionContext } from '../controller/resourceActionController'
import type { PanelState } from '../controller/panelState'

// ── Props ──────────────────────────────────────────────

interface Props {
  result: AISearchResult
  context: ActionContext
  onPanelChange: (state: PanelState) => void
  isLoading?: boolean
}

// ── Main Renderer ─────────────────────────────────────

export default function AISearchResultRenderer({ result, context, onPanelChange, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          <span className="text-sm text-slate-500">AI 正在处理...</span>
        </div>
      </div>
    )
  }

  // ── Always prefer the unified intent-based layout when searchResponse is available ──
  // (searchResponse is now always populated by runAISearch for all intent types)
  if (result.searchResponse) {
    return <SearchResultView result={result} context={context} onPanelChange={onPanelChange} />
  }

  // ── Legacy workflow-only results (no searchResponse available) ──
  if (result.resultType === 'workflow' && result.workflowResult) {
    return <WorkflowResultView result={result} context={context} onPanelChange={onPanelChange} />
  }

  // ── Ambiguous ──
  return <AmbiguousView query={result.query} context={context} onPanelChange={onPanelChange} />
}

// ═══════════════════════════════════════════════════════
// WORKFLOW RESULT VIEW
// ═══════════════════════════════════════════════════════

function WorkflowResultView({ result, context, onPanelChange }: Props) {
  const wf = result.workflowResult!
  const wfId = result.workflowId

  const doAction = (action: ResourceAction) => {
    const r = handleResourceAction(action, {
      id: wfId,
      title: wf.output.title,
      description: wf.output.summary,
      type: result.label,
      difficulty: 'medium',
      estimatedTime: '',
      grade: context.grade,
      unit: context.unit,
      tags: [result.intentId],
    }, context)
    if (r.panelType) {
      onPanelChange({
        type: r.panelType,
        data: {
          previewData: r.previewData,
          assignmentData: r.assignmentData,
        },
      })
    }
  }

  return (
    <div className="space-y-5">
      {/* Intent badge */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{result.label}</span>
        <span className="text-[11px] text-slate-400">{wf.workflowName} · {wf.steps.length} 步骤</span>
      </div>

      {/* Output header */}
      <div className="bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={14} className="text-blue-500" />
          <h3 className="text-sm font-semibold text-slate-800">{wf.output.title}</h3>
        </div>
        <p className="text-xs text-slate-600">{wf.output.summary}</p>
      </div>

      {/* Per-workflow output */}
      {renderWorkflowOutput(wfId, wf)}

      {/* Suggestions */}
      {wf.suggestions.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">AI 建议</h4>
          <div className="space-y-1">
            {wf.suggestions.filter(s => !s.includes('Agent') && !s.includes('Tool') && !s.includes('Provider')).map((s, i) => (
              <p key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                <span className="text-blue-400 shrink-0">●</span>{s}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Metadata */}
      {wf.output.metadata && (
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(wf.output.metadata).slice(0, 6).map(([k, v]) => (
            <div key={k} className="bg-slate-50 rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] text-slate-400">{k}</p>
              <p className="text-[11px] font-semibold text-slate-700">{v}</p>
            </div>
          ))}
        </div>
      )}

      {/* Action buttons — primary button always first */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
        {getWorkflowActions(wfId).map((btn, i) => {
          const isPrimary = btn.action === 'assign' || btn.action === 'card_create'
          const isSecondary = btn.action === 'preview' || btn.action === 'edit'
          return (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); doAction(btn.action) }}
              className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-[12px] font-medium transition-colors ${
                isPrimary
                  ? 'flex-1 bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                  : isSecondary
                  ? 'border border-blue-200 text-blue-600 hover:bg-blue-50'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {btn.icon}{btn.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Workflow action config ──

interface WfActionBtn { label: string; action: ResourceAction; icon?: React.ReactNode }

function getWorkflowActions(wfId: string): WfActionBtn[] {
  const map: Record<string, WfActionBtn[]> = {
    'vocab-dictation': [{ label: '布置给学生', action: 'assign', icon: <Send size={14} /> }, { label: '去制卡', action: 'card_create' }, { label: '加入练习篮', action: 'add_to_basket' }],
    'reading-practice': [{ label: '预览题目', action: 'preview', icon: <BookOpen size={14} /> }, { label: '加入练习篮', action: 'add_to_basket' }, { label: '布置给学生', action: 'assign' }],
    'listening-recommend': [{ label: '预览素材', action: 'preview', icon: <Play size={14} /> }, { label: '布置训练', action: 'assign' }, { label: '加入练习篮', action: 'add_to_basket' }],
    'writing-analysis': [{ label: '查看作文', action: 'preview', icon: <PenLine size={14} /> }, { label: '生成强化练习', action: 'edit' }, { label: '布置写作训练', action: 'assign' }],
    'unit-paper-generate': [{ label: '预览试卷', action: 'preview', icon: <FileCheck size={14} /> }, { label: '修改设置', action: 'edit' }, { label: '布置给学生', action: 'assign' }],
    'assignment': [{ label: '查看详情', action: 'preview', icon: <CheckIcon /> }],
    'learning-report-analysis': [{ label: '查看详细报告', action: 'preview', icon: <FileText size={14} /> }, { label: '布置强化练习', action: 'assign' }],
    'wrong-word-analysis': [{ label: '生成听写强化', action: 'assign', icon: <Edit3 size={14} /> }, { label: '查看错词详情', action: 'preview' }],
    'wrong-question-analysis': [{ label: '生成专项练习', action: 'assign', icon: <FileCheck size={14} /> }, { label: '查看错题详情', action: 'preview' }],
    'resource-search': [{ label: '查看全部资源', action: 'preview', icon: <BookOpen size={14} /> }, { label: '加入练习篮', action: 'add_to_basket' }],
    'card-creation': [{ label: '去制卡', action: 'card_create', icon: <Grid3X3 size={14} /> }, { label: '调整配置', action: 'edit' }],
  }
  return map[wfId] || [{ label: '布置给学生', action: 'assign', icon: <Send size={14} /> }, { label: '加入练习篮', action: 'add_to_basket' }]
}

function CheckIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg> }

// ── Per-workflow output rendering ──

function renderWorkflowOutput(wfId: string, wf: NonNullable<AISearchResult['workflowResult']>) {
  const items = wf.output.items || []

  if (wfId === 'vocab-dictation' && items.length > 0) {
    return (
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-[11px]">
          <thead className="bg-slate-50">
            <tr><th className="text-left px-3 py-2 text-slate-500 font-medium">#</th><th className="text-left px-3 py-2 text-slate-500 font-medium">提示</th><th className="text-left px-3 py-2 text-slate-500 font-medium">答案</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.slice(0, 10).map((item, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="px-3 py-2 text-slate-400">{i + 1}</td>
                <td className="px-3 py-2 text-slate-700 font-medium">{item.value}</td>
                <td className="px-3 py-2 text-slate-500">{item.secondary?.replace('答案：', '').split('  ')[0] || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if ((wfId === 'listening-recommend' || wfId === 'resource-search') && items.length > 0) {
    return (
      <div className="space-y-2">
        <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{wfId === 'listening-recommend' ? '推荐素材' : '匹配资源'}</h4>
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-4 py-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 text-purple-500 shrink-0"><Play size={14} /></div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-700 truncate">{item.value}</p>
              <p className="text-[11px] text-slate-500">{item.label}</p>
              {item.secondary && <p className="text-[10px] text-slate-400 mt-0.5">{item.secondary}</p>}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (items.length > 0) {
    return (
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-2.5">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-slate-400">{item.label}</span>
              <p className="text-sm text-slate-700 truncate">{item.value}</p>
              {item.secondary && <p className="text-[10px] text-slate-400">{item.secondary}</p>}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return null
}

// ═══════════════════════════════════════════════════════
// SEARCH RESULT VIEW
// ═══════════════════════════════════════════════════════

function SearchResultView({ result, context, onPanelChange }: Props) {
  const sr = result.searchResponse!
  const [showAllResources, setShowAllResources] = useState(false)
  const navigate = useNavigate()
  const query = result.query

  const doResourceAction = (action: ResourceAction, item: { title: string; description: string; type?: string; id?: string }) => {
    const r = handleResourceAction(action, {
      id: item.id || `res-${Date.now()}`, title: item.title, description: item.description,
      type: item.type, grade: context.grade, unit: context.unit,
    }, context)
    if (r.panelType) {
      onPanelChange({ type: r.panelType, data: { previewData: r.previewData, assignmentData: r.assignmentData } })
    }
  }

  const resources = sr.resources || []
  const aiActions = sr.aiActions || []
  const resourceTypes = [...new Set(resources.map((r) => r.type).filter(Boolean))]
  const resourceTypeLabels: Record<string, string> = {
    vocabulary: '同步词汇', listening: '同步听力', speaking: '口语听说',
    reading: '同步课文', current_news: '时文阅读', dubbing: '趣味配音',
    video: '主题视频', writing: '写作', grammar: '语法',
    courseware: '课件', exercise: '练习卷', exam_paper: '试卷',
  }
  const visibleResources = showAllResources ? resources : resources.slice(0, 5)
  const hasMoreResources = resources.length > 5

  const isWord = /^[a-zA-Z]+(?:[\s'-][a-zA-Z]+){0,4}$/.test(query.trim()) && query.trim().length <= 40 && !/(生成|布置|分析|练习|试题|找|查看|来一|推荐|学生|班级|错词|错题|作文|听力|口语|阅读|时文|视频|同步|专项|情况|资源)/.test(query.trim())
  const isLearning = /(看一下|看看|练习情况|练得怎么样|完成情况|学情|最近练习)/.test(query)
  const isWrong = /(错词|错题|哪些.*错|错误率|高频错)/.test(query)
  const isGen = /(生成|出.*题|出.*道|帮我.*写|帮我.*做|默写|听写).*/.test(query)
  const verb = isLearning ? '看' : isWrong ? '查' : isGen ? '要' : '找'

  // Section helpers
  const SectionTitle = ({ color, title }: { color: string; title: string }) => {
    const c = color === 'blue' ? 'bg-blue-400' : color === 'emerald' ? 'bg-emerald-400' : color === 'amber' ? 'bg-amber-400' : 'bg-red-400'
    return <div className="flex items-center gap-2 mb-1.5"><span className={`w-1 h-3.5 rounded-full ${c}`} /><h3 className="text-[11px] font-semibold text-slate-700">{title}</h3></div>
  }

  const MetricRow = ({ items }: { items: { label: string; value: string; sub?: string; alert?: boolean }[] }) => (
    <div className={`grid gap-1.5 ${items.length <= 3 ? 'grid-cols-' + items.length : 'grid-cols-4'}`}>
      {items.map((m, i) => (
        <div key={i} className={`rounded-lg px-2.5 py-2 text-center ${m.alert ? 'bg-red-50 border border-red-100' : 'bg-[#f7f9fc]'}`}>
          <p className={`text-[14px] font-bold ${m.alert ? 'text-red-500' : 'text-[#4b9fe8]'}`}>{m.value}</p>
          <p className="text-[9px] text-[#8aabcc]">{m.label}</p>
          {m.sub && <p className="text-[8px] text-red-400">{m.sub}</p>}
        </div>
      ))}
    </div>
  )

  const ActionGrid = ({ actions }: { actions: { label: string; desc: string; onClick: () => void }[] }) => (
    <div className="grid grid-cols-2 gap-1.5">
      {actions.map((a, i) => (
        <button key={i} onClick={a.onClick} className="text-left p-2 rounded-lg border border-blue-200 bg-blue-50/30 hover:bg-blue-50 hover:border-blue-300 transition-colors">
          <p className="text-[11px] font-medium text-slate-800 line-clamp-1">{a.label}</p>
          <p className="text-[9px] text-slate-400 line-clamp-1">{a.desc}</p>
        </button>
      ))}
    </div>
  )

  const CompactResourceItem = ({ r }: { r: typeof resources[0] }) => (
    <div className="flex items-center gap-2.5 py-2 border-b border-[#f0f4f8] last:border-b-0">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 shrink-0"><BookOpen size={14} /></div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-slate-700 truncate">{r.title}</p>
        <p className="text-[9px] text-slate-400 line-clamp-1">{r.description}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button onClick={() => doResourceAction('preview', { title: r.title, description: r.description, type: r.type, id: r.id })} className="text-[10px] text-slate-500 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors whitespace-nowrap">预览</button>
        <button onClick={() => alert('已加入练习篮')} className="text-[10px] text-[#4b9fe8] hover:bg-[#eaf2fb] px-2 py-1 rounded transition-colors whitespace-nowrap">加入</button>
        <button onClick={() => doResourceAction('assign', { title: r.title, description: r.description, type: r.type, id: r.id })} className="text-[10px] text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded font-medium transition-colors whitespace-nowrap">布置</button>
      </div>
    </div>
  )

  const wordMatch = query.match(/[a-zA-Z]+(?:\s+[a-zA-Z]+){0,2}/)
  const extractedWord = wordMatch ? wordMatch[0] : query
  const wordData: Record<string, { pos: string; def: string; uk: string; us: string; source: string }> = {
    apple: { pos: 'n.', def: '[C]苹果', uk: '[ˈæpl]', us: '[ˈæpl]', source: '人教七上U6' },
    restaurant: { pos: 'n.', def: '[C]餐馆；餐厅', uk: '[ˈrestrɒnt]', us: '[ˈrestərɑːnt]', source: '人教七下U10' },
    wednesday: { pos: 'n.', def: '[C/U]星期三', uk: '[ˈwenzdeɪ]', us: '[ˈwenzdeɪ]', source: '人教七上U9' },
    delicious: { pos: 'adj.', def: '美味的；可口的', uk: '[dɪˈlɪʃəs]', us: '[dɪˈlɪʃəs]', source: '人教七上U6' },
  }
  const wd = wordData[extractedWord.toLowerCase()] || { pos: '—', def: '暂无本地释义', uk: `[/${extractedWord}/]`, us: `[/${extractedWord}/]`, source: '课标词库' }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-6 h-6 rounded bg-blue-500"><Sparkles size={12} className="text-white" /></div>
        <span className="text-[13px] font-semibold text-slate-700">小天理解你在{verb}：</span>
        <span className="text-[13px] font-bold text-[#4b9fe8]">{query}</span>
      </div>

      {/* ═══════ WORD ═══════ */}
      {isWord && (
        <>
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 rounded-xl p-4">
            <SectionTitle color="blue" title="单词讲解" />
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[22px] font-bold text-slate-800">{extractedWord}</span>
              <span className="text-[9px] font-medium text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-full">课标词</span>
              <span className="text-[9px] font-medium text-cyan-600 bg-cyan-100 px-1.5 py-0.5 rounded-full">初中/高中</span>
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold text-blue-500 bg-blue-100 px-1.5 py-0.5 rounded">{wd.pos}</span>
              <span className="text-[14px] text-slate-700 font-medium">{wd.def}</span>
            </div>
            <p className="text-[10px] text-slate-400 mb-2">词汇来源：课标词库 · {wd.source}</p>
            <button onClick={() => navigate(`/word-teaching/${encodeURIComponent(extractedWord.toLowerCase())}`)}
              className="inline-flex items-center gap-1.5 px-4 h-8 rounded-full bg-[#4b9fe8] text-white text-[11px] font-medium hover:bg-[#3a8fd8] transition-colors whitespace-nowrap">
              打开讲词页
            </button>
          </div>

          <div className="bg-white border border-[#e8eef4] rounded-xl p-4">
            <SectionTitle color="emerald" title="相关资源" />
            <p className="text-[10px] text-[#8aabcc] mb-2">基于当前教学上下文：{context.textbook} · {context.unit}</p>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="bg-[#f7f9fc] rounded-lg px-3 py-2 text-center">
                <p className="text-[9px] text-[#8aabcc]">共找到</p>
                <p className="text-[15px] font-bold text-[#4b9fe8]">{resources.length} 个</p>
              </div>
              <div className="bg-[#f7f9fc] rounded-lg px-3 py-2 text-center">
                <p className="text-[9px] text-[#8aabcc]">资源类型</p>
                <p className="text-[15px] font-bold text-[#3a4f66]">{resourceTypes.length} 种</p>
              </div>
            </div>
            {resources.slice(0, 3).map((r, i) => <CompactResourceItem key={i} r={r} />)}
          </div>

          {aiActions.length > 0 && (
            <div>
              <SectionTitle color="blue" title="小天可以帮你" />
              <ActionGrid actions={aiActions.map((a) => ({
                label: a.title, desc: a.description,
                onClick: () => {
                  if (a.task === 'teach_word') navigate(`/word-teaching/${encodeURIComponent(extractedWord.toLowerCase())}`)
                  else if (a.task === 'generate_dictation' || a.task === 'generate_quiz') alert('小天正在生成内容')
                  else alert('小天正在为你处理「' + a.title + '」')
                },
              }))} />
            </div>
          )}
        </>
      )}

      {/* ═══════ LEARNING ═══════ */}
      {isLearning && !isWord && (
        <>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
            <SectionTitle color="amber" title="学情结论" />
            <p className="text-[11px] text-slate-700 leading-relaxed mb-2">
              {context.className || '七年级(3)班'} 学情分析报告：近两周完成率由 89% 降至 82%，正确率由 76% 降至 68%，主要问题集中在<span className="text-red-500 font-medium">词汇拼写</span>和<span className="text-red-500 font-medium">阅读理解</span>。
            </p>
            <MetricRow items={[
              { label: '完成率', value: '82%', sub: '↓7%' },
              { label: '正确率', value: '68%', sub: '↓8%' },
              { label: '词汇拼写', value: '62%', alert: true },
              { label: '阅读理解', value: '58%', alert: true },
            ]} />
          </div>

          <div>
            <SectionTitle color="red" title="问题定位" />
            <div className="space-y-1">
              {['词汇拼写正确率 62%，呈下降趋势，需关注。', '阅读理解正确率 58%，低于班级平均，需安排专项训练。', '完成率下降主要集中在周末布置的练习。'].map((p, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[10px] text-slate-600">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-500 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span><span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle color="blue" title="小天可以帮你" />
            <ActionGrid actions={[
              { label: '生成错词重练', desc: '自动筛选高频错词生成练习', onClick: () => alert('小天正在生成错词重练练习') },
              { label: '推荐阅读理解专项', desc: '匹配当前单元阅读训练', onClick: () => alert('已为你推荐阅读理解专项训练') },
              { label: '一键催交未完成学生', desc: '向未完成学生发送提醒', onClick: () => alert('已发送催交提醒') },
              { label: '查看学生明细', desc: '查看每位学生的练习数据', onClick: () => alert('学生明细功能将在后续版本接入') },
            ]} />
          </div>

          <div>
            <SectionTitle color="emerald" title="相关练习" />
            <div className="space-y-1">
              {[
                { title: 'Unit 3 词汇听写', meta: '32/43人 · 正确率68%', status: '已结束' },
                { title: '冲刺训练（四十一）', meta: '1/1人 · 得分7.5/50', status: '已结束' },
                { title: '个性化词汇练习', meta: '2/43人', status: '进行中' },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 border-b border-[#f0f4f8] last:border-b-0">
                  <FileText size={12} className="text-[#8aabcc] shrink-0" />
                  <span className="text-[10px] text-slate-600 flex-1 truncate">{p.title}</span>
                  <span className="text-[9px] text-[#8aabcc] whitespace-nowrap">{p.meta}</span>
                  <button onClick={() => alert('已打开「' + p.title + '」报告')} className="text-[9px] text-[#4b9fe8] hover:underline whitespace-nowrap">查看报告</button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ═══════ WRONG WORD ═══════ */}
      {isWrong && !isLearning && !isWord && (
        <>
          <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-4">
            <SectionTitle color="red" title="问题结论" />
            <p className="text-[11px] text-slate-700 leading-relaxed mb-2">本周首次进入错词本的词占比达到<span className="text-red-500 font-medium"> 32%</span>，assist、directly、outline 等词错误率较高。</p>
            <MetricRow items={[
              { label: '首次错词占比', value: '32%' }, { label: '错词总数', value: '23 个' },
              { label: '涉及学生', value: '8 人' }, { label: '高错误率词', value: '5 个' },
            ]} />
          </div>
          <div>
            <SectionTitle color="red" title="高风险词" />
            <div className="flex items-center gap-1.5 flex-wrap">
              {['assist', 'directly', 'outline', 'title', 'absorb'].map((w) => (
                <span key={w} className="text-[10px] font-medium text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full whitespace-nowrap">{w} 100%</span>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle color="blue" title="小天可以帮你" />
            <ActionGrid actions={[
              { label: '生成默写练习', desc: '基于高频错词自动出题', onClick: () => alert('小天正在生成默写练习') },
              { label: '布置听写', desc: '将错词推送给学生听写', onClick: () => alert('已打开布置确认') },
              { label: '导出错词', desc: '导出错词列表PDF/Excel', onClick: () => alert('导出功能将在后续版本接入') },
              { label: '查看学生', desc: '查看错词学生明细', onClick: () => alert('学生明细功能将在后续版本接入') },
            ]} />
          </div>
        </>
      )}

      {/* ═══════ GENERATE ═══════ */}
      {isGen && !isWord && !isLearning && !isWrong && (
        <>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-4">
            <SectionTitle color="blue" title="任务理解" />
            <p className="text-[11px] text-slate-700 leading-relaxed mb-2">小天理解你要生成：<span className="text-[#4b9fe8] font-medium">{query}</span></p>
            <p className="text-[10px] text-slate-500">基于当前教学上下文：{context.textbook} · {context.unit}</p>
          </div>
          <div>
            <SectionTitle color="blue" title="小天可以帮你" />
            <ActionGrid actions={[
              { label: '确认布置', desc: '布置该练习给学生', onClick: () => alert('已打开布置确认面板') },
              { label: '加入练习篮', desc: '暂存练习篮稍后布置', onClick: () => alert('已加入练习篮') },
              { label: '调整内容', desc: '修改题目内容或分值', onClick: () => alert('编辑功能将在后续版本接入') },
              { label: '重新生成', desc: '按新参数重新生成', onClick: () => alert('小天正在重新生成') },
            ]} />
          </div>
        </>
      )}

      {/* ═══════ DEFAULT RESOURCE SEARCH ═══════ */}
      {!isWord && !isLearning && !isWrong && !isGen && (
        <>
          <div className="bg-white rounded-xl border border-[#e8eef4] p-4">
            <SectionTitle color="emerald" title="资源摘要" />
            <p className="text-[10px] text-[#8aabcc] mb-2">当前上下文：{context.textbook} · {context.unit} — Food and Drinks</p>
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              <div className="bg-[#f7f9fc] rounded-lg px-3 py-2 text-center">
                <p className="text-[9px] text-[#8aabcc]">共找到</p>
                <p className="text-[15px] font-bold text-[#4b9fe8]">{resources.length} 个</p>
              </div>
              <div className="bg-[#f7f9fc] rounded-lg px-3 py-2 text-center">
                <p className="text-[9px] text-[#8aabcc]">资源类型</p>
                <p className="text-[15px] font-bold text-[#3a4f66]">{resourceTypes.length} 种</p>
              </div>
              <div className="bg-[#f7f9fc] rounded-lg px-3 py-2 text-center">
                <p className="text-[9px] text-[#8aabcc]">推荐</p>
                <p className="text-[15px] font-bold text-[#3a4f66]">{Math.min(resources.length, 5)} 条</p>
              </div>
            </div>
            {resourceTypes.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap mb-2">
                {resourceTypes.slice(0, 7).map((t) => (
                  <span key={t} className="text-[9px] text-[#4b9fe8] bg-[#eaf2fb] px-2 py-0.5 rounded-full whitespace-nowrap">{resourceTypeLabels[t] || t}</span>
                ))}
              </div>
            )}
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-2 mb-2">
              <div className="flex items-start gap-1.5">
                <Sparkles size={11} className="text-blue-400 shrink-0 mt-0.5" />
                <div className="text-[10px] text-[#6b8aaa] space-y-0.5">
                  <p>· 匹配当前单元 {context.unit} — Food and Drinks</p>
                  <p>· 覆盖多种资源类型和教学场景</p>
                  <p>· 适合课堂练习与课后巩固</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={() => setShowAllResources(true)} className="inline-flex items-center gap-1 px-3.5 h-7 rounded-full bg-[#4b9fe8] text-white text-[11px] font-medium hover:bg-[#3a8fd8] transition-colors whitespace-nowrap">查看全部资源</button>
              <button onClick={() => alert('已加入练习篮')} className="inline-flex items-center gap-1 px-3.5 h-7 rounded-full border border-[#b8d4f0] text-[11px] text-[#4b9fe8] hover:bg-[#eaf2fb] transition-colors whitespace-nowrap">加入练习篮</button>
              <button onClick={() => onPanelChange({ type: 'assignmentConfirm', data: { assignmentData: { title: `布置推荐资源（${resources.length} 项）`, summary: resources.slice(0, 3).map((r) => r.title).join('；') + ' 等', className: context.className || '初一1班', dueDate: '', scoreRule: 'show_after_due', answerMode: 'online', totalScore: 100, notifyMethod: 'app' } } })} className="inline-flex items-center gap-1 px-3.5 h-7 rounded-full border border-[#b8d4f0] text-[11px] text-[#4b9fe8] hover:bg-[#eaf2fb] transition-colors whitespace-nowrap">一键布置</button>
            </div>
          </div>

          {aiActions.length > 0 && (
            <div>
              <SectionTitle color="blue" title="小天可以帮你" />
              <ActionGrid actions={aiActions.slice(0, 4).map((a) => ({
                label: a.title, desc: a.description,
                onClick: () => {
                  if (a.task === 'teach_word') navigate(`/word-teaching/${encodeURIComponent(extractedWord.toLowerCase())}`)
                  else if (a.task === 'generate_dictation' || a.task === 'generate_quiz' || a.task === 'generate_exercise') alert('小天正在生成内容')
                  else alert('小天正在为你处理「' + a.title + '」')
                },
              }))} />
            </div>
          )}

          <div>
            <SectionTitle color="emerald" title={`推荐资源（共 ${resources.length} 个）`} />
            <div className="border border-[#e8eef4] rounded-lg overflow-hidden divide-y divide-[#f0f4f8]">
              {visibleResources.map((r, i) => <CompactResourceItem key={i} r={r} />)}
            </div>
            {hasMoreResources && !showAllResources && (
              <button onClick={() => setShowAllResources(true)} className="mt-2 w-full text-center text-[11px] text-[#4b9fe8] hover:text-[#3a8fd8] font-medium py-1.5 rounded-lg bg-blue-50/50 hover:bg-blue-50 transition-colors">
                展开全部 {resources.length} 条资源
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// AMBIGUOUS VIEW
// ═══════════════════════════════════════════════════════

function AmbiguousView({ context, onPanelChange }: { query: string; context: ActionContext; onPanelChange: Props['onPanelChange'] }) {
  const suggestions = [
    { label: '查同步资源', desc: '按教材单元查找课文、词汇、听力资源', query: '查同步资源', icon: Search, color: 'text-emerald-600 bg-emerald-50' },
    { label: '生成听写', desc: '快速生成当前单元词汇默写练习', query: '生成 Unit3 词汇默写', icon: Edit3, color: 'text-blue-600 bg-blue-50' },
    { label: '阅读训练', desc: '推荐一篇适合当前单元的阅读理解', query: '来一篇 Unit3 阅读理解', icon: BookOpen, color: 'text-purple-600 bg-purple-50' },
    { label: '学情分析', desc: '查看班级练习完成率与正确率趋势', query: '看一下练习情况', icon: FileText, color: 'text-orange-600 bg-orange-50' },
  ]

  return (
    <div className="text-center py-8">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 mx-auto mb-4">
        <Sparkles size={26} className="text-blue-400" />
      </div>
      <h3 className="text-base font-semibold text-slate-700 mb-1">不太确定你想做什么</h3>
      <p className="text-[12px] text-slate-400 mb-8">小天没有完全理解你的意图，试试下面的操作</p>
      <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
        {suggestions.map((s) => (
          <button
            key={s.label}
            onClick={() => {
              const r = handleResourceAction('preview', { id: `sug-${Date.now()}`, title: s.query, description: s.desc }, context)
              onPanelChange({ type: 'resourcePreview', data: { previewData: r.previewData } })
            }}
            className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 text-left hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${s.color} shrink-0 group-hover:scale-105 transition-transform`}>
              <s.icon size={16} />
            </div>
            <div>
              <p className="text-[13px] font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{s.label}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{s.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

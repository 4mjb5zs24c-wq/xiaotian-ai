/**
 * AIAssistantDrawer — 右侧操作浮窗（Panel-Only）
 *
 * 只承载以下面板:
 *   - resourcePreview    资源预览
 *   - assignmentConfirm  布置确认
 *   - basket             练习篮
 *   - cardCreation       制卡确认
 *   - wordListEdit       词表编辑
 *   - insightDetail        洞察分析详情
 *   - generatedContent      生成内容预览
 *   - generatedContentEdit  生成内容编辑
 *   - resourceRecommendation 资源推荐
 *   - resourceDetailPreview  资源详情预览
 *
 * 不承载: 搜索首页 / 搜索结果 / workflow执行 / 近期搜索 / 大家都在搜
 *         这些功能已迁移到 /ai-search (SearchPage)
 */

import { useState, useEffect } from 'react'
import {
  X, Sparkles, ArrowLeft, Check, Send, BookOpen,
  Edit3, Grid3X3, AlertTriangle, EyeOff, Clock, CheckCircle2,
  Volume2, FileText, Plus, ChevronRight,
} from 'lucide-react'
import { useAIStore } from '../store'
import type { AISearchResult } from '../controller/aiTaskController'
import { publishAssignment } from '../mock/business/assignmentMock'
import type { PreviewPanelData, AssignmentFormData } from '../controller/panelState'
import { DEFAULT_ASSIGNMENT_FORM } from '../controller/panelState'
import type { InsightItem } from '../insights/insightTypes'
import type { TeachingInsight, ProblemItem } from '../insights/teachingInsightTypes'
import { generateTeachingInsight, priorityLabel, priorityBadgeColor } from '../insights/teachingInsightGenerator'
import type { GeneratedContent } from '../insights/generatedContentTypes'
import { setInsightStatus } from '../insights/insightStatus'
import { handleInsightAction, markInsightViewed, markInsightIgnored, markInsightRemindLater, markInsightResolved } from '../insights/insightActionController'
import { getInsightStatus, STATUS_LABELS, type InsightStatus } from '../insights/insightStatus'
import GeneratedContentPanel from './GeneratedContentPanel'
import GeneratedContentEditPanel from './GeneratedContentEditPanel'
import ResourceRecommendationPanel from './ResourceRecommendationPanel'
import ResourceDetailPreviewPanel from './ResourceDetailPreviewPanel'
import type { RecommendedResource } from '../resources/resourceTypes'
import { SearchResultView, PaperBasketBadge } from './search-new'
import type { ResourceItem, FunctionEntry, AssignmentDraft, AssignmentSettings, QuickEntry, PaperBasketItem, GeneratedAssignment } from '../search-new/types'
import { mockOpenPreview, mockOpenAssignDialog, mockAddToLessonPrep, mockOpenFunction } from '../search-new/searchEngine'
import { matchNewSearch } from '../search-new/searchEngine'
import AssignmentConfirmPanelNew from './search-new/AssignmentConfirmPanel'
import SuccessFeedbackCardNew from './search-new/SuccessFeedbackCard'

// ── Types ──────────────────────────────────────────────

// ── Main Component ────────────────────────────────────

export default function AIAssistantDrawer() {
  const panel = useAIStore((s) => s.aiDrawerPanel)
  const panelData = useAIStore((s) => s.aiDrawerPanelData)
  const setPanel = useAIStore((s) => s.setAIDrawerPanel)
  const teacherContext = useAIStore((s) => s.teacherContext)
  const paperBasketCount = useAIStore((s) => s.paperBasket.length)

  // Panel history stack: push current panel before opening a sub-panel
  const [panelStack, setPanelStack] = useState<Array<{ type: string; data: Record<string, unknown> | null }>>([])
  const [assignForm, setAssignForm] = useState<AssignmentFormData | null>(null)
  const [assignSuccess, setAssignSuccess] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const open = panel !== null

  // Esc to close
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setPanelStack([]); setPanel(null) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, setPanel])

  // Initialize form when entering assignmentConfirm
  useEffect(() => {
    if (panel === 'assignmentConfirm') {
      const data = panelData?.assignmentData as AssignmentFormData | undefined
      setAssignForm(data || {
        title: (panelData?.title as string) || '',
        summary: (panelData?.summary as string) || '',
        className: teacherContext.className,
        ...DEFAULT_ASSIGNMENT_FORM,
      } as AssignmentFormData)
      setAssignSuccess(false)
    }
  }, [panel, panelData, teacherContext.className])

  // Track panel changes: when opening a new panel from within the drawer, save current
  const openSubPanel = (type: string, data?: Record<string, unknown>) => {
    if (panel) {
      setPanelStack((prev) => [...prev, { type: panel, data: panelData }])
    }
    setPanel(type, data)
  }

  const handleClose = () => { setPanelStack([]); setPanel(null) }

  const goBackPanel = () => {
    if (panel === 'assignmentConfirm' && assignSuccess) {
      // After successful assignment, close
      setPanelStack([])
      setPanel(null)
    } else if (panelStack.length > 0) {
      const prev = panelStack[panelStack.length - 1]
      setPanelStack((s) => s.slice(0, -1))
      setPanel(prev.type, prev.data || undefined)
    } else {
      setPanel(null)
    }
  }

  const handleBack = () => goBackPanel()

  const handleConfirmAssign = () => {
    if (!assignForm) return
    publishAssignment({
      title: assignForm.title,
      className: assignForm.className,
      content: assignForm.summary,
      dueDate: assignForm.dueDate,
      scoreRule: assignForm.scoreRule === 'show_after_due' ? '截止后公布' : assignForm.scoreRule === 'show_immediately' ? '立即公布' : '不公布',
    })
    // Update insight status if assignment came from generated content
    const formData = assignForm as AssignmentFormData & { sourceInsightId?: string; generatedContentId?: string }
    if (formData.sourceInsightId) {
      setInsightStatus(formData.sourceInsightId, 'assigned')
    }
    setAssignSuccess(true)
  }

  const getHeaderTitle = () => {
    switch (panel) {
      case 'resourcePreview': return '资源预览'
      case 'assignmentConfirm': return assignSuccess ? '布置成功' : '布置确认'
      case 'basket': return `练习篮（${useAIStore.getState().practiceBasket.length}）`
      case 'cardCreation': return '制卡确认'
      case 'wordListEdit': return '词表编辑'
      case 'insightDetail': return 'AI 洞察详情'
      case 'wrongWordStudents': return '错词学生列表'
      case 'modelEssayPreview': return '范文预览'
      case 'generatedContent': return '生成内容预览'
      case 'generatedContentEdit': return '编辑内容'
      case 'resourceRecommendation': return '推荐资源'
      case 'resourceDetailPreview': return '资源详情'
      case 'searchResult': return '搜索结果'
      case 'wrongWordReviewPlan': return '自定义错词复习规划'
      case 'practiceStageInsight': return '阶段练习洞察'
      case 'vocabStageInsight': return '词汇掌握洞察'
      case 'listeningStageInsight': return '听说能力洞察'
      case 'writingStageInsight': return '写作表现洞察'
      case 'searchResultNew': return 'AI 搜索结果'
      case 'assignmentConfirmNew': return '待发布作业确认'
      case 'assignmentSuccess': return '布置成功'
      default: return ''
    }
  }

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm" onClick={handleClose} />
      <div className="fixed inset-y-0 right-0 z-[101] w-[60vw] max-w-[840px] min-w-[480px] bg-white shadow-2xl shadow-slate-900/10 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="shrink-0 border-b border-slate-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <ArrowLeft size={17} />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm shadow-blue-200">
                    <Sparkles size={13} className="text-white" />
                  </div>
                  <h2 className="text-[15px] font-bold text-slate-800">小天助手</h2>
                </div>
                {getHeaderTitle() && (
                  <p className="text-[11px] text-slate-400 mt-0.5 ml-9">{getHeaderTitle()}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PaperBasketBadge
                count={paperBasketCount}
                onClick={() => openSubPanel('basket')}
              />
              <button onClick={handleClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <X size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {panel === 'resourcePreview' && (
            <PreviewView
              data={(panelData?.previewData as PreviewPanelData) || { title: '', type: '', grade: '', unit: '', difficulty: '', estimatedTime: '', summary: '', aiReason: '' }}
              onAddToBasket={() => {
                const d = panelData?.previewData as PreviewPanelData | undefined
                if (d) useAIStore.getState().addToBasket({ id: `pv-${Date.now()}`, title: d.title, reason: d.aiReason, type: 'material', tags: [d.type], difficulty: (d.difficulty as 'basic'|'medium'|'advanced') || 'medium', estimatedTime: d.estimatedTime })
              }}
              onAssign={() => {
                const d = panelData?.previewData as PreviewPanelData | undefined
                openSubPanel('assignmentConfirm', { assignmentData: { title: d?.title || '', summary: d?.summary || '', className: teacherContext.className, ...DEFAULT_ASSIGNMENT_FORM } as AssignmentFormData })
              }}
            />
          )}
          {panel === 'assignmentConfirm' && assignForm && (
            <AssignmentConfirmView form={assignForm} onChange={setAssignForm} onConfirm={handleConfirmAssign} onCancel={goBackPanel} success={assignSuccess} />
          )}
          {panel === 'basket' && (
            <BasketView
              onAssign={(item) => {
                openSubPanel('assignmentConfirm', { assignmentData: { title: item.title, summary: item.reason || '', className: teacherContext.className, ...DEFAULT_ASSIGNMENT_FORM } as AssignmentFormData })
              }}
            />
          )}
          {panel === 'cardCreation' && (
            <CardCreationView data={panelData || {}} />
          )}
          {panel === 'wordListEdit' && (
            <WordListEditView data={panelData || {}} />
          )}
          {panel === 'insightDetail' && (
            <InsightDetailView
              insight={panelData?.insight as InsightItem | undefined}
              onAction={(action) => {
                const insight = panelData?.insight as InsightItem | undefined
                if (!insight) return
                const instruction = handleInsightAction(action, insight, {
                  source: 'insight_action',
                  className: teacherContext.className,
                })
                switch (instruction.type) {
                  case 'navigate':
                    setPanel(null)
                    window.location.href = instruction.url!
                    break
                  case 'open_panel':
                    openSubPanel(instruction.panel!, instruction.panelData)
                    break
                  case 'show_toast':
                    showToast(instruction.toastMessage!)
                    break
                }
              }}
              onStatusChange={(status) => {
                const insight = panelData?.insight as InsightItem | undefined
                if (!insight) return
                if (status === 'ignored') { markInsightIgnored(insight.insightId); showToast('已忽略该洞察') }
                if (status === 'remind_later') { markInsightRemindLater(insight.insightId); showToast('已设置稍后提醒') }
                if (status === 'resolved') { markInsightResolved(insight.insightId); showToast('已标记为已处理') }
              }}
              currentStatus={(() => {
                const insight = panelData?.insight as InsightItem | undefined
                return insight ? getInsightStatus(insight.insightId) : 'unread'
              })()}
              onOpenReviewPlan={() => openSubPanel('wrongWordReviewPlan', { insight: panelData?.insight })}
            />
          )}
          {panel === 'wrongWordReviewPlan' && (
            <WrongWordReviewPlanView
              insight={panelData?.insight as InsightItem | undefined}
              onBack={() => goBackPanel()}
              onSave={() => showToast('已保存错词复习规划')}
              onSaveAndAssign={() => openSubPanel('assignmentConfirm', {
                assignmentData: {
                  title: 'Unit3 课标词错词复习规划',
                  summary: '错词回滚混合练习，15词/次，每周一三五推送',
                  className: teacherContext.className,
                  dueDate: '',
                  scoreRule: 'show_after_due',
                  answerMode: 'online',
                  totalScore: 100,
                  notifyMethod: 'app',
                },
              })}
            />
          )}
          {panel === 'wrongWordStudents' && (
            <WrongWordStudentsView data={panelData || {}} />
          )}
          {panel === 'practiceStageInsight' && (() => {
            const insight = (panelData?.insight as TeachingInsight | undefined) || generateTeachingInsight('practiceStage')
            return <PracticeStageInsightView insight={insight} onSubPanel={openSubPanel} showToast={showToast} scrollTo={(panelData?.scrollTo as string) || undefined} />
          })()}
          {panel === 'vocabStageInsight' && (() => {
            const insight = (panelData?.insight as TeachingInsight | undefined) || generateTeachingInsight('vocabulary')
            return <VocabStageInsightView insight={insight} onSubPanel={openSubPanel} showToast={showToast} />
          })()}
          {panel === 'listeningStageInsight' && (() => {
            const insight = (panelData?.insight as TeachingInsight | undefined) || generateTeachingInsight('listeningSpeaking')
            return <ListeningStageInsightView insight={insight} onSubPanel={openSubPanel} showToast={showToast} />
          })()}
          {panel === 'writingStageInsight' && (() => {
            const insight = (panelData?.insight as TeachingInsight | undefined) || generateTeachingInsight('writing')
            return <WritingStageInsightView insight={insight} onSubPanel={openSubPanel} showToast={showToast} />
          })()}
          {panel === 'modelEssayPreview' && (
            <ModelEssayPreviewView data={panelData || {}} />
          )}
          {panel === 'generatedContent' && (() => {
            const gc = panelData?.generatedContent as GeneratedContent | undefined
            if (!gc) return <div className="p-6 text-center py-20"><p className="text-sm text-slate-400">内容数据不可用</p></div>
            return (
              <GeneratedContentPanel
                content={gc}
                onEdit={() => {
                  openSubPanel('generatedContentEdit', { generatedContent: gc })
                }}
                onAddToBasket={() => {
                  const exists = useAIStore.getState().practiceBasket.some(
                    (i) => 'id' in i && i.id === gc.contentId,
                  )
                  if (exists) {
                    showToast('该内容已在练习篮中')
                    return
                  }
                  useAIStore.getState().addToBasket({
                    id: gc.contentId,
                    title: gc.title,
                    reason: `AI 洞察推荐 · ${gc.type}`,
                    type: 'exercise' as const,
                    tags: [gc.type],
                    difficulty: gc.difficulty,
                    estimatedTime: gc.estimatedTime,
                  } as import('../store').RecommendationItem)
                  setInsightStatus(gc.sourceInsightId, 'added_to_basket')
                  showToast('已加入练习篮')
                }}
                onAssign={() => {
                  openSubPanel('assignmentConfirm', {
                    assignmentData: {
                      title: gc.title,
                      summary: gc.summary,
                      className: teacherContext.className,
                      estimatedTime: gc.estimatedTime,
                      score: gc.score,
                      contentType: gc.type,
                      fromGeneratedContent: true,
                      generatedContentId: gc.contentId,
                      sourceInsightId: gc.sourceInsightId,
                      ...DEFAULT_ASSIGNMENT_FORM,
                    } as AssignmentFormData,
                  })
                }}
              />
            )
          })()}
          {panel === 'generatedContentEdit' && (() => {
            const gc = panelData?.generatedContent as GeneratedContent | undefined
            if (!gc) return <div className="p-6 text-center py-20"><p className="text-sm text-slate-400">内容数据不可用</p></div>
            return (
              <GeneratedContentEditPanel
                content={gc}
                onSave={(updated) => {
                  // Replace the content in panelData and go back
                  setPanelStack((prev) => prev.slice(0, -1))
                  useAIStore.getState().setAIDrawerPanel('generatedContent', { generatedContent: updated })
                  showToast('已更新')
                }}
                onCancel={() => {
                  goBackPanel()
                }}
              />
            )
          })()}
          {panel === 'resourceRecommendation' && (() => {
            const pd = panelData || {}
            const insight = pd.insight as InsightItem | undefined
            return (
              <ResourceRecommendationPanel
                actionLabel={(pd.actionLabel as string) || '推荐资源'}
                query={(pd.query as string) || ''}
                actionId={(pd.actionId as string) || ''}
                insightTitle={insight?.title}
                onBack={() => goBackPanel()}
                onPreview={(resource) => {
                  openSubPanel('resourceDetailPreview', { resource })
                }}
                onAssign={(resources) => {
                  openSubPanel('assignmentConfirm', {
                    assignmentData: {
                      title: `布置 ${resources.length} 个资源`,
                      summary: resources.map((r) => r.title).join('；'),
                      className: teacherContext.className,
                      ...DEFAULT_ASSIGNMENT_FORM,
                    } as AssignmentFormData,
                  })
                }}
              />
            )
          })()}
          {panel === 'resourceDetailPreview' && (() => {
            const resource = panelData?.resource as RecommendedResource | undefined
            if (!resource) return <div className="p-6 text-center py-20"><p className="text-sm text-slate-400">资源数据不可用</p></div>
            return (
              <ResourceDetailPreviewPanel
                resource={resource}
                onBack={() => goBackPanel()}
                onAssign={(r) => {
                  openSubPanel('assignmentConfirm', {
                    assignmentData: {
                      title: r.title,
                      summary: `保留 ${r.questions.filter((q) => !q.removed).length}/${r.questions.length} 题 · 共 ${r.questions.filter((q) => !q.removed).reduce((s, q) => s + q.score, 0)} 分`,
                      className: teacherContext.className,
                      estimatedTime: r.estimatedTime,
                      ...DEFAULT_ASSIGNMENT_FORM,
                    } as AssignmentFormData,
                  })
                }}
              />
            )
          })()}
          {panel === 'searchResult' && (() => {
            const result = panelData?.searchResult as AISearchResult | undefined
            const query = (panelData?.query as string) || ''
            if (!result) return <div className="p-6 text-center py-20"><p className="text-sm text-slate-400">搜索结果不可用</p></div>
            return (
              <SearchResultPanel
                result={result}
                query={query}
                context={{ className: teacherContext.className, textbook: teacherContext.textbook, unit: teacherContext.unit, grade: teacherContext.grade }}
                onNavigate={(path) => { setPanel(null); window.location.href = path }}
                showToast={showToast}
              />
            )
          })()}

          {/* ── New Search V2 Panels ── */}
          {panel === 'searchResultNew' && (() => {
            const result = useAIStore.getState().newSearchResult
            if (!result) return <div className="p-6 text-center py-20"><p className="text-sm text-slate-400">搜索结果不可用</p></div>
            return (
              <div className="p-4">
                <SearchResultView
                  result={result}
                  paperBasket={useAIStore.getState().paperBasket}
                  onPreview={(item: ResourceItem) => showToast(mockOpenPreview(item).message)}
                  onAssign={(item: ResourceItem) => {
                    const mockResult = mockOpenAssignDialog(item)
                    showToast(mockResult.message)
                  }}
                  onAddToPaperBasket={(item: ResourceItem) => {
                    const basketItem: PaperBasketItem = {
                      id: `pb-${item.id}-${Date.now()}`,
                      resourceId: item.id,
                      title: item.title,
                      type: item.type,
                      addedAt: Date.now(),
                    }
                    useAIStore.getState().addToPaperBasket(basketItem)
                  }}
                  onAddToLessonPrep={(item: ResourceItem) => showToast(mockAddToLessonPrep(item).message)}
                  onOpenFunction={(entry: FunctionEntry) => showToast(mockOpenFunction(entry).message)}
                  onGenerateAssignments={(assignments: AssignmentDraft[]) => {
                    useAIStore.getState().setPendingAssignments(assignments)
                    openSubPanel('assignmentConfirmNew', { assignments })
                  }}
                  onQuickEntry={(entry: QuickEntry) => {
                    const ctx = {
                      textbook: teacherContext.textbook,
                      unit: teacherContext.unit,
                      grade: teacherContext.grade,
                      className: teacherContext.className,
                      studentCount: teacherContext.studentCount,
                    }
                    const newResult = matchNewSearch(entry.searchQuery, ctx)
                    useAIStore.getState().setNewSearchResult(newResult)
                  }}
                />
              </div>
            )
          })()}

          {panel === 'assignmentConfirmNew' && (() => {
            const assignments = useAIStore.getState().pendingAssignments
            return (
              <div className="p-4">
                <AssignmentConfirmPanelNew
                  assignments={assignments}
                  onConfirm={(finalAssignments: AssignmentDraft[], settings: AssignmentSettings) => {
                    // Generate success feedback data
                    const generated: GeneratedAssignment[] = finalAssignments.map((a) => ({
                      id: a.id,
                      title: a.title,
                      nodeName: a.nodeName,
                      usageType: a.usageType,
                      usageLabel: a.usageLabel,
                      contentCount: a.contentCount,
                      className: settings.className,
                      deadline: settings.deadline || '明天 23:59',
                    }))
                    useAIStore.getState().clearPendingAssignments()
                    openSubPanel('assignmentSuccess', { generated, settings })
                  }}
                  onCancel={goBackPanel}
                  onEditAssignment={(id: string, newTitle: string) => {
                    const updated = assignments.map((a) =>
                      a.id === id ? { ...a, title: newTitle } : a
                    )
                    useAIStore.getState().setPendingAssignments(updated)
                  }}
                  onDeleteAssignment={(id: string) => {
                    const updated = assignments.filter((a) => a.id !== id)
                    useAIStore.getState().setPendingAssignments(updated)
                    if (updated.length === 0) goBackPanel()
                  }}
                />
              </div>
            )
          })()}

          {panel === 'assignmentSuccess' && (() => {
            const generated = panelData?.generated as GeneratedAssignment[] | undefined
            if (!generated || generated.length === 0) return null
            return (
              <div className="p-4">
                <SuccessFeedbackCardNew
                  assignments={generated}
                  onViewAssignments={() => {
                    setPanel(null)
                    window.location.href = '/practice-reports'
                  }}
                  onContinueSearch={() => {
                    goBackPanel()
                    if (panelStack.length === 0) {
                      setPanel('searchResultNew')
                    }
                  }}
                />
              </div>
            )
          })()}
        </div>
      </div>
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] bg-slate-800 text-white text-sm px-5 py-2.5 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-200">
          {toast}
        </div>
      )}
    </>
  )
}

// ═══════════════════════════════════════════════════════
// PREVIEW VIEW
// ═══════════════════════════════════════════════════════

function PreviewView({ data, onAddToBasket, onAssign }: {
  data: PreviewPanelData; onAddToBasket: () => void; onAssign: () => void
}) {
  return (
    <div className="p-6 space-y-5">
      <div className="bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-1"><BookOpen size={14} className="text-blue-500" /><h3 className="text-sm font-semibold text-slate-800">{data.title}</h3></div>
        <p className="text-xs text-slate-600">{data.aiReason}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[['资源类型', data.type], ['适用年级', data.grade], ['单元', data.unit], ['难度', data.difficulty === 'basic' ? '基础' : data.difficulty === 'medium' ? '中等' : '进阶'], ['预计用时', data.estimatedTime]].map(([l, v]) => (
          <div key={l} className="bg-slate-50 rounded-lg px-3 py-2"><p className="text-[10px] text-slate-400">{l}</p><p className="text-[12px] font-medium text-slate-700">{v || '—'}</p></div>
        ))}
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-4">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">内容摘要</h4>
        <p className="text-sm text-slate-600 leading-relaxed">{data.summary}</p>
      </div>
      {data.sampleContent && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">示例内容</h4>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{data.sampleContent}</p>
        </div>
      )}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
        <button onClick={onAddToBasket} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">加入练习篮</button>
        <button onClick={onAssign} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"><Send size={14} />布置给学生</button>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// ASSIGNMENT CONFIRM VIEW
// ═══════════════════════════════════════════════════════

function AssignmentConfirmView({ form, onChange, onConfirm, onCancel, success }: {
  form: AssignmentFormData; onChange: (f: AssignmentFormData) => void; onConfirm: () => void; onCancel: () => void; success: boolean
}) {
  if (success) {
    return (
      <div className="p-6 space-y-5">
        <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mx-auto mb-3"><Check size={24} className="text-emerald-600" /></div>
          <h3 className="text-base font-semibold text-slate-800 mb-1">布置成功</h3>
          <p className="text-sm text-slate-500">{form.title} 已成功布置给 {form.className}</p>
          <div className="mt-4 space-y-2 text-left max-w-sm mx-auto">
            {[['练习', form.title], ['班级', form.className], ['截止时间', form.dueDate], ['成绩公布', form.scoreRule === 'show_after_due' ? '截止后公布' : form.scoreRule === 'show_immediately' ? '立即公布' : '不公布'], ['作答方式', form.answerMode === 'online' ? '在线作答' : '纸质作答'], ['满分', `${form.totalScore}分`]].map(([l, v]) => (
              <div key={l} className="flex items-center justify-between"><span className="text-[11px] text-slate-500">{l}</span><span className="text-[12px] font-medium text-slate-700">{v}</span></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-5">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-2">
        <Sparkles size={14} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-[12px] text-blue-700">小天已根据当前班级和练习类型为你预填布置设置，你可以修改后再发布。</p>
      </div>
      <div className="space-y-4">
        <Field label="练习名称"><input value={form.title} onChange={e => onChange({...form, title: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:border-blue-300 outline-none" /></Field>
        <Field label="练习内容摘要"><input value={form.summary} onChange={e => onChange({...form, summary: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:border-blue-300 outline-none" /></Field>
        <Field label="布置对象"><input value={form.className} onChange={e => onChange({...form, className: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:border-blue-300 outline-none" /></Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="截止时间"><input value={form.dueDate} onChange={e => onChange({...form, dueDate: e.target.value})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:border-blue-300 outline-none" /></Field>
          <Field label="满分"><input type="number" value={form.totalScore} onChange={e => onChange({...form, totalScore: Number(e.target.value)})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:border-blue-300 outline-none" /></Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="成绩公布方式"><select value={form.scoreRule} onChange={e => onChange({...form, scoreRule: e.target.value as AssignmentFormData['scoreRule']})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:border-blue-300 outline-none"><option value="show_after_due">截止后公布</option><option value="show_immediately">立即公布</option><option value="hide">不公布</option></select></Field>
          <Field label="作答方式"><select value={form.answerMode} onChange={e => onChange({...form, answerMode: e.target.value as AssignmentFormData['answerMode']})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:border-blue-300 outline-none"><option value="online">在线作答</option><option value="paper">纸质作答</option></select></Field>
        </div>
        <Field label="提醒方式"><select value={form.notifyMethod} onChange={e => onChange({...form, notifyMethod: e.target.value as AssignmentFormData['notifyMethod']})} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:border-blue-300 outline-none"><option value="app">App通知</option><option value="sms">短信通知</option><option value="none">不提醒</option></select></Field>
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button onClick={onCancel} className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">取消</button>
        <button onClick={onConfirm} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"><Check size={14} />确认布置</button>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="text-[11px] font-medium text-slate-500 mb-1 block">{label}</label>{children}</div>
}

// ═══════════════════════════════════════════════════════
// BASKET VIEW
// ═══════════════════════════════════════════════════════

function BasketView({ onAssign }: { onAssign: (item: { id: string; title: string; reason: string }) => void }) {
  const practiceBasket = useAIStore((s) => s.practiceBasket)
  const paperBasket = useAIStore((s) => s.paperBasket)
  const removeFromPracticeBasket = useAIStore((s) => s.removeFromBasket)
  const removeFromPaperBasket = useAIStore((s) => s.removeFromPaperBasket)

  // Merge both baskets into a unified view
  const mergedItems = [
    ...practiceBasket.map(item => ({
      id: 'id' in item ? String(item.id) : '',
      title: 'title' in item ? String(item.title) : '',
      reason: 'reason' in item ? String(item.reason) : '',
      difficulty: 'difficulty' in item ? String(item.difficulty) : '',
      tags: 'tags' in item ? (item.tags as string[]) : [],
      source: 'practice' as const,
    })),
    ...paperBasket.map(item => ({
      id: item.id,
      title: item.title,
      reason: '',
      difficulty: '',
      tags: [item.type],
      source: 'paper' as const,
    })),
  ]

  if (mergedItems.length === 0) {
    return (
      <div className="p-6 text-center py-20">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mx-auto mb-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-slate-300"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        </div>
        <p className="text-sm text-slate-400">练习篮为空</p>
        <p className="text-[11px] text-slate-300 mt-1">从搜索结果或资源中添加练习内容</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-4">
      <div className="text-[11px] text-slate-400">共 {mergedItems.length} 项</div>
      <div className="space-y-2">
        {mergedItems.map((item) => {
          const { id, title, reason, difficulty, tags, source } = item
          return (
            <div key={`${source}-${id}`} className="bg-white border border-slate-200 rounded-lg px-4 py-3">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800">{title}</p>
                  {reason && <p className="text-[11px] text-slate-400 mt-0.5">{reason}</p>}
                  <div className="flex items-center gap-2 mt-1.5">
                    {difficulty && <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{difficulty === 'basic' ? '基础' : difficulty === 'medium' ? '中等' : '进阶'}</span>}
                    {tags.slice(0, 2).map((t) => <span key={t} className="text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded">{t}</span>)}
                    {source === 'paper' && <span className="text-[10px] text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded">试卷篮</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-3">
                  <button onClick={() => onAssign({ id, title, reason })} className="text-[11px] text-blue-500 hover:text-blue-600 font-medium px-2 py-1">布置</button>
                  <button onClick={() => source === 'paper' ? removeFromPaperBasket(id) : removeFromPracticeBasket(id)} className="text-[11px] text-slate-400 hover:text-red-500 font-medium px-2 py-1">删除</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// CARD CREATION VIEW
// ═══════════════════════════════════════════════════════

function CardCreationView({ data }: { data: Record<string, unknown> }) {
  const title = (data.title as string) || '词汇练习卡'
  return (
    <div className="p-6 space-y-5">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-1"><Grid3X3 size={14} className="text-purple-500" /><h3 className="text-sm font-semibold text-slate-800">{title}</h3></div>
        <p className="text-xs text-slate-600">答题卡已按标准格式生成，可直接打印或在线发布</p>
      </div>
      <div className="space-y-2">
        {[['答题卡类型', title], ['纸型', 'A4 竖版'], ['题量', '20 题'], ['满分', '100 分'], ['作答方式', '在线作答 / 纸质打印']].map(([l, v]) => (
          <div key={l} className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-2.5"><span className="text-[11px] text-slate-500">{l}</span><span className="text-sm font-medium text-slate-700">{v}</span></div>
        ))}
      </div>
      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"><Grid3X3 size={14} />去制卡</button>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// WORD LIST EDIT VIEW
// ═══════════════════════════════════════════════════════

function WordListEditView({ data }: { data: Record<string, unknown> }) {
  const title = (data.title as string) || '词表编辑'
  return (
    <div className="p-6 space-y-5">
      <div className="bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-1"><Edit3 size={14} className="text-blue-500" /><h3 className="text-sm font-semibold text-slate-800">{title}</h3></div>
        <p className="text-xs text-slate-600">可在此调整默写范围、添加或移除词汇</p>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
        <p className="text-sm text-slate-400">词表编辑功能将在后续版本中提供</p>
        <p className="text-[11px] text-slate-300 mt-1">当前可使用 AI 搜索页重新生成词表</p>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// INSIGHT DETAIL VIEW
// ═══════════════════════════════════════════════════════

function InsightDetailView({ insight, onAction, onStatusChange, currentStatus, onOpenReviewPlan }: {
  insight: InsightItem | undefined
  onAction: (action: InsightItem['actions'][number]) => void
  onStatusChange: (status: InsightStatus) => void
  currentStatus: InsightStatus
  onOpenReviewPlan?: () => void
}) {
  // Mark as viewed on mount
  useEffect(() => {
    if (insight) markInsightViewed(insight.insightId)
  }, [insight?.insightId])

  if (!insight) {
    return (
      <div className="p-6 text-center py-20">
        <p className="text-sm text-slate-400">洞察数据不可用</p>
      </div>
    )
  }

  const isHigh = insight.riskLevel === 'high'
  const riskLabel = isHigh ? '需关注' : insight.riskLevel === 'medium' ? '建议关注' : '一般关注'
  const riskGradient = isHigh
    ? 'from-red-50 to-rose-50 border-red-200'
    : insight.riskLevel === 'medium'
      ? 'from-amber-50 to-yellow-50 border-amber-200'
      : 'from-blue-50 to-sky-50 border-blue-200'
  const riskIconColor = isHigh ? 'text-red-500' : insight.riskLevel === 'medium' ? 'text-amber-500' : 'text-blue-500'

  // Split analysis into structured points
  // Detect vocabulary-related insight (for review plan action)
  const isVocabInsight = /(词|拼写|听写|默写|发音|读音|词汇|vocab|Unit\d)/i.test(
    insight.title + insight.analysis + insight.suggestion
  )

  const analysisPoints = insight.analysis
    .split(/[。；;]/)
    .filter((s) => s.trim().length > 0)
    .slice(0, 3)

  // Split suggestion into numbered items
  const suggestionItems = insight.suggestion
    .split(/[。；;]|\d[)）]/)
    .filter((s) => s.trim().length > 3)
    .slice(0, 3)

  return (
    <div className="p-5 space-y-4">
      {/* ── 1. Risk Summary Card ── */}
      <div className={`p-4 rounded-xl border bg-gradient-to-br ${riskGradient}`}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
              isHigh ? 'bg-red-100 text-red-600' :
              insight.riskLevel === 'medium' ? 'bg-amber-100 text-amber-600' :
              'bg-blue-100 text-blue-600'
            }`}>{riskLabel}</span>
            {currentStatus !== 'unread' && (
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                currentStatus === 'resolved' ? 'text-emerald-600 bg-emerald-50' :
                currentStatus === 'ignored' ? 'text-slate-500 bg-slate-100' :
                'text-blue-600 bg-blue-50'
              }`}>{STATUS_LABELS[currentStatus]}</span>
            )}
          </div>
          {/* Status action buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => onStatusChange('ignored')}
              className={`inline-flex items-center gap-1 px-2.5 h-7 rounded-lg border text-[11px] transition-colors whitespace-nowrap flex-shrink-0 ${
                currentStatus === 'ignored'
                  ? 'border-slate-300 bg-slate-100 text-slate-500'
                  : 'border-slate-200 bg-white/60 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <EyeOff size={11} />忽略
            </button>
            <button
              onClick={() => onStatusChange('remind_later')}
              className={`inline-flex items-center gap-1 px-2.5 h-7 rounded-lg border text-[11px] transition-colors whitespace-nowrap flex-shrink-0 ${
                currentStatus === 'remind_later'
                  ? 'border-amber-300 bg-amber-50 text-amber-600'
                  : 'border-slate-200 bg-white/60 text-slate-500 hover:bg-amber-50 hover:text-amber-600'
              }`}
            >
              <Clock size={11} />稍后提醒
            </button>
            <button
              onClick={() => onStatusChange('resolved')}
              className={`inline-flex items-center gap-1 px-2.5 h-7 rounded-lg border text-[11px] transition-colors whitespace-nowrap flex-shrink-0 ${
                currentStatus === 'resolved'
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-600'
                  : 'border-slate-200 bg-white/60 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              <CheckCircle2 size={11} />标记为已处理
            </button>
          </div>
        </div>
        <h3 className="text-[14px] font-bold text-slate-800 mb-1.5">{insight.title}</h3>
        {insight.scope && (
          <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-2">
            <span>{insight.scope.className}</span>
            {insight.scope.unit && <span>· {insight.scope.unit}</span>}
            {insight.scope.period && <span>· {insight.scope.period}</span>}
          </div>
        )}
        {/* 小天结论 */}
        <div className="mt-2 pt-2 border-t border-black/5">
          <div className="flex items-start gap-1.5">
            <Sparkles size={12} className={`${riskIconColor} shrink-0 mt-0.5`} />
            <p className="text-[11px] text-slate-600 leading-relaxed">
              <span className="font-medium text-slate-700">小天结论：</span>
              {insight.evidence.summary}
            </p>
          </div>
        </div>
      </div>

      {/* ── 2. Key Metrics ── */}
      {insight.evidence.details.length > 0 && (
        <div>
          <h4 className="text-[12px] font-semibold text-slate-600 mb-1.5 flex items-center gap-2">
            <span className="w-1 h-3.5 rounded-full bg-slate-400" />
            关键数据
          </h4>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-1.5">
            {insight.evidence.details.map((d, i) => (
              <div key={i} className="bg-white rounded-lg border border-[#eef2f6] px-2.5 py-2">
                <p className="text-[9px] text-[#8aabcc] truncate">{d.label}</p>
                <div className="flex items-baseline gap-0.5 mt-0.5">
                  <span className={`text-[14px] font-bold ${
                    d.trend === 'down' ? 'text-red-500' :
                    d.trend === 'up' ? 'text-emerald-500' :
                    'text-[#3a4f66]'
                  }`}>
                    {d.value}
                  </span>
                  {d.trend === 'down' && <span className="text-[10px] text-red-400">↓</span>}
                  {d.trend === 'up' && <span className="text-[10px] text-emerald-400">↑</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. Teaching Judgement ── */}
      <div>
        <h4 className="text-[12px] font-semibold text-slate-600 mb-2 flex items-center gap-2">
          <span className="w-1 h-3.5 rounded-full bg-amber-400" />
          教研判断
        </h4>
        <div className="bg-white rounded-xl border border-[#eef2f6] p-3 space-y-2">
          {analysisPoints.length > 0 ? (
            analysisPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#f0f4f8] text-[10px] text-[#6b8aaa] font-medium flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-[11px] text-[#4a6b8a] leading-relaxed">{point}。</p>
              </div>
            ))
          ) : (
            <p className="text-[11px] text-[#4a6b8a] leading-relaxed">{insight.analysis}</p>
          )}
        </div>
      </div>

      {/* ── 4. Teaching Suggestions ── */}
      <div>
        <h4 className="text-[12px] font-semibold text-slate-600 mb-2 flex items-center gap-2">
          <span className="w-1 h-3.5 rounded-full bg-blue-400" />
          教学建议
        </h4>
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl border border-blue-100 p-3 space-y-2">
          {suggestionItems.length > 0 ? (
            suggestionItems.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[#4b9fe8] text-[11px] font-medium shrink-0">{i + 1}.</span>
                <p className="text-[11px] text-slate-600 leading-relaxed">{item}。</p>
              </div>
            ))
          ) : (
            <p className="text-[11px] text-slate-600 leading-relaxed">{insight.suggestion}</p>
          )}
        </div>
      </div>

      {/* Sample info note */}
      {insight.sampleInfo.isSampleTooSmall && (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
          <p className="text-[11px] text-slate-500">当前参与人数较少，建议结合后续练习数据继续观察。</p>
        </div>
      )}

      {/* ── 5. 小天可以帮你 ── */}
      {(insight.actions.length > 0 || isVocabInsight) && (
        <div>
          <h4 className="text-[12px] font-semibold text-slate-600 mb-1.5 flex items-center gap-2">
            <span className="w-1 h-3.5 rounded-full bg-[#4b9fe8]" />
            小天可以帮你
          </h4>

          {/* ── Custom wrong word review plan (vocab insights only, prominent) ── */}
          {isVocabInsight && onOpenReviewPlan && (
            <button
              onClick={onOpenReviewPlan}
              className="w-full text-left mb-2 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-sky-50 border-2 border-blue-300 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500 text-white shrink-0 mt-0.5">
                  <BookOpen size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <p className="text-[12px] font-bold text-[#3a4f66]">自定义错词复习规划</p>
                    <span className="text-[8px] font-medium text-white bg-blue-500 px-1.5 py-0.5 rounded-full shrink-0">推荐</span>
                  </div>
                  <p className="text-[10px] text-[#6b8aaa] line-clamp-1">按错误率、复习周期和学生范围，自动回滚错词并生成复习任务。</p>
                </div>
                <span className="inline-flex items-center gap-1 px-3 h-7 rounded-full bg-blue-500 text-white text-[10px] font-medium group-hover:bg-blue-600 transition-colors whitespace-nowrap flex-shrink-0 self-center">
                  去设置 <ChevronRight size={10} />
                </span>
              </div>
            </button>
          )}

          <div className="grid grid-cols-3 gap-1.5">
            {insight.actions.map((a, i) => {
              const typeLabel = a.type === 'alert' ? '立即处理' :
                a.type === 'navigate' ? '生成内容' :
                a.requiresConfirm ? '需确认' : '查看详情'
              const typeStyle = a.type === 'alert'
                ? 'bg-amber-50 text-amber-600'
                : a.type === 'navigate'
                  ? 'bg-blue-50 text-blue-600'
                  : a.requiresConfirm
                    ? 'bg-purple-50 text-purple-600'
                    : 'bg-slate-100 text-slate-500'
              return (
                <button
                  key={i}
                  onClick={() => onAction(a)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-[#eef2f6] hover:border-[#b8d4f0] hover:shadow-sm transition-all group text-center"
                >
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-500 shrink-0">
                    <Sparkles size={12} />
                  </div>
                  <p className="text-[11px] font-medium text-slate-700 leading-tight line-clamp-2">{a.label}</p>
                  <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded ${typeStyle}`}>{typeLabel}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Metadata footer */}
      <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-2">
        数据更新时间：{insight.createdAt}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// MOCK PANELS (V1 — data is fake)
// ═══════════════════════════════════════════════════════

// ── Wrong Word Review Plan ───────────────────────────────

function WrongWordReviewPlanView({ insight, onBack, onSave, onSaveAndAssign }: {
  insight: InsightItem | undefined
  onBack: () => void
  onSave: () => void
  onSaveAndAssign: () => void
}) {
  const [errorRate, setErrorRate] = useState('≥30%')
  const [rollbackDays, setRollbackDays] = useState('7')
  const [rollbackTimes, setRollbackTimes] = useState('3')
  const [masteryRule, setMasteryRule] = useState('2')
  const [studentRange, setStudentRange] = useState('error_only')
  const [practiceForm, setPracticeForm] = useState('mixed')
  const [questionCount, setQuestionCount] = useState('15')
  const [pushSchedule, setPushSchedule] = useState('mon_wed_fri')
  const [deadline, setDeadline] = useState('next_day_22')

  const insightTitle = insight?.title || '词汇洞察'
  const mockWordCount = 23
  const mockStudentCount = 8

  const DropdownRow = ({ label, value, options, onChange }: { label: string; value: string; options: { key: string; label: string }[]; onChange: (v: string) => void }) => (
    <div className="flex items-center justify-between py-2 border-b border-[#f0f4f8] last:border-b-0">
      <span className="text-[11px] text-[#4a6b8a]">{label}</span>
      <div className="flex items-center gap-1">
        {options.map((o) => (
          <button key={o.key} onClick={() => onChange(o.key)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors whitespace-nowrap ${
              value === o.key ? 'bg-[#eaf2fb] text-[#4b9fe8]' : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'
            }`}
          >{o.label}</button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="p-5 space-y-4">
      {/* Subtitle */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-center">
        <p className="text-[11px] text-slate-600">基于「{insightTitle}」为你生成复习规则</p>
      </div>

      {/* ── Part 1: Review Targets ── */}
      <div>
        <h3 className="text-[12px] font-semibold text-slate-700 mb-2 flex items-center gap-2">
          <span className="w-1 h-3.5 rounded-full bg-blue-400" />复习对象
        </h3>
        <div className="bg-white border border-[#e8eef4] rounded-xl overflow-hidden">
          <DropdownRow label="错词来源" value="current" options={[
            { key: 'current', label: '当前洞察错词' }, { key: 'week', label: '本周新增错词' },
            { key: 'two_week', label: '近两周高频错词' }, { key: 'all', label: '全部班级错词' },
          ]} onChange={() => {}} />
          <DropdownRow label="学生范围" value={studentRange} options={[
            { key: 'all', label: '全班' }, { key: 'error_only', label: '仅错误学生' },
            { key: 'group', label: '指定分组' }, { key: 'specific', label: '指定学生' },
          ]} onChange={setStudentRange} />
          <div className="flex items-center justify-between py-2 px-0 border-b border-[#f0f4f8] last:border-b-0">
            <span className="text-[11px] text-[#4a6b8a] pl-0">错词类型</span>
            <div className="flex items-center gap-1 flex-wrap">
              {[{ k: 'new_word', l: '生词' }, { k: 'pronounce', l: '读不准' }, { k: 'spell', l: '不会写' }, { k: 'usage', l: '不会用' }].map((t) => (
                <label key={t.k} className="flex items-center gap-1 text-[10px] text-[#4a6b8a] cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#4b9fe8] w-3 h-3" />{t.l}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Part 2: Rollback Rules ── */}
      <div>
        <h3 className="text-[12px] font-semibold text-slate-700 mb-2 flex items-center gap-2">
          <span className="w-1 h-3.5 rounded-full bg-amber-400" />回滚规则
        </h3>
        <div className="bg-white border border-[#e8eef4] rounded-xl overflow-hidden">
          <DropdownRow label="错误率阈值" value={errorRate} options={[
            { key: '≥30%', label: '≥30%' }, { key: '≥50%', label: '≥50%' },
            { key: '≥80%', label: '≥80%' }, { key: 'custom', label: '自定义' },
          ]} onChange={setErrorRate} />
          <DropdownRow label="回滚周期" value={rollbackDays} options={[
            { key: '3', label: '3天后' }, { key: '7', label: '7天后' },
            { key: '14', label: '14天后' }, { key: 'custom', label: '自定义天数' },
          ]} onChange={setRollbackDays} />
          <DropdownRow label="回滚次数" value={rollbackTimes} options={[
            { key: '1', label: '1次' }, { key: '2', label: '2次' },
            { key: '3', label: '3次' }, { key: 'until', label: '直到掌握' },
          ]} onChange={setRollbackTimes} />
          <DropdownRow label="掌握判定" value={masteryRule} options={[
            { key: '1', label: '连续1次正确' }, { key: '2', label: '连续2次正确' }, { key: '3', label: '连续3次正确' },
          ]} onChange={setMasteryRule} />
        </div>
      </div>

      {/* ── Part 3: Task Settings ── */}
      <div>
        <h3 className="text-[12px] font-semibold text-slate-700 mb-2 flex items-center gap-2">
          <span className="w-1 h-3.5 rounded-full bg-emerald-400" />复习任务设置
        </h3>
        <div className="bg-white border border-[#e8eef4] rounded-xl overflow-hidden">
          <DropdownRow label="练习形式" value={practiceForm} options={[
            { key: 'dictation', label: '听写' }, { key: 'write', label: '默写' },
            { key: 'read', label: '跟读' }, { key: 'meaning', label: '词义选择' },
            { key: 'sentence', label: '例句填空' }, { key: 'mixed', label: '混合练习' },
          ]} onChange={setPracticeForm} />
          <DropdownRow label="每次题量" value={questionCount} options={[
            { key: '10', label: '10词' }, { key: '15', label: '15词' },
            { key: '20', label: '20词' }, { key: 'custom', label: '自定义' },
          ]} onChange={setQuestionCount} />
          <DropdownRow label="推送时间" value={pushSchedule} options={[
            { key: 'daily', label: '每天' }, { key: 'mon_wed_fri', label: '每周一三五' },
            { key: 'tue_thu', label: '每周二四' }, { key: 'custom', label: '自定义' },
          ]} onChange={setPushSchedule} />
          <DropdownRow label="截止时间" value={deadline} options={[
            { key: 'today_22', label: '当天22:00' }, { key: 'next_day_22', label: '次日22:00' }, { key: 'custom', label: '自定义' },
          ]} onChange={setDeadline} />
        </div>
      </div>

      {/* ── Part 4: Plan Preview ── */}
      <div className="bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 rounded-xl p-4">
        <h3 className="text-[12px] font-semibold text-slate-700 mb-2 flex items-center gap-2">
          <span className="w-1 h-3.5 rounded-full bg-[#4b9fe8]" />规划预览
        </h3>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { l: '预计纳入错词', v: `${mockWordCount} 个` },
            { l: '涉及学生', v: `${mockStudentCount} 人` },
            { l: '复习周期', v: `${rollbackDays} 天` },
            { l: '预计生成', v: `${rollbackTimes} 次复习任务` },
          ].map((m, i) => (
            <div key={i} className="bg-white/80 rounded-lg px-3 py-2 text-center">
              <p className="text-[9px] text-[#8aabcc]">{m.l}</p>
              <p className="text-[12px] font-bold text-[#4b9fe8]">{m.v}</p>
            </div>
          ))}
        </div>
        <div className="bg-white/80 rounded-lg p-3 space-y-1.5">
          <p className="text-[10px] font-medium text-[#3a4f66]">复习安排：</p>
          <div className="space-y-1">
            <p className="text-[10px] text-[#6b8aaa]">第 1 次：Unit3 高频错词听写，15 词</p>
            <p className="text-[10px] text-[#6b8aaa]">第 2 次：错词回滚混合练习，15 词</p>
            <p className="text-[10px] text-[#6b8aaa]">第 3 次：未掌握词专项重练，按学生个性化推送</p>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex items-center gap-2 pt-1">
        <button onClick={onBack} className="flex-1 inline-flex items-center justify-center h-9 rounded-full border border-[#d0dce8] text-[12px] text-[#6b8aaa] hover:bg-[#f4f7fa] transition-colors whitespace-nowrap">取消</button>
        <button onClick={onSave} className="flex-1 inline-flex items-center justify-center h-9 rounded-full border border-[#b8d4f0] text-[12px] text-[#4b9fe8] hover:bg-[#eaf2fb] transition-colors whitespace-nowrap">保存规划</button>
        <button onClick={onSaveAndAssign} className="flex-1 inline-flex items-center justify-center h-9 rounded-full bg-[#4b9fe8] text-white text-[12px] font-medium hover:bg-[#3a8fd8] transition-colors whitespace-nowrap">保存并布置</button>
      </div>
    </div>
  )
}

// ── Practice Stage Insight View ──────────────────────────

function PracticeStageInsightView({ insight, onSubPanel, showToast, scrollTo }: {
  insight: TeachingInsight
  onSubPanel: (type: string, data?: Record<string, unknown>) => void
  showToast: (msg: string) => void
  scrollTo?: string
}) {
  const [timeRange, setTimeRange] = useState('two_weeks')
  const [scope, setScope] = useState('all')
  const [studentRange, setStudentRange] = useState('all')

  useEffect(() => {
    if (scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(scrollTo)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 150)
    }
  }, [scrollTo])

  const prioBadge = priorityBadgeColor(insight.priority)
  const prioLabel = priorityLabel(insight.priority)
  const comparisonItems = insight.referenceComparison?.horizontal?.items || []
  const radarDims = insight.radarDimensions || []
  const problems = insight.problemDiagnosis?.items || []
  const segments = insight.studentSegments || []

  // Color helpers for lollipop gap chart
  function gapDotColor(gap: number) { return gap > 10 ? 'bg-red-500' : gap >= 5 ? 'bg-amber-500' : 'bg-blue-400' }
  function gapLineColor(gap: number) { return gap > 10 ? 'bg-red-300' : gap >= 5 ? 'bg-amber-300' : 'bg-blue-200' }
  function gapTextColor(gap: number) { return gap > 10 ? 'text-red-500' : gap >= 5 ? 'text-amber-500' : 'text-slate-500' }

  // Segment color map
  const segStyle: Record<string, { bg: string; text: string; border: string }> = {
    blue:    { bg: 'bg-blue-50/60',    text: 'text-blue-500',    border: 'border-blue-100' },
    emerald: { bg: 'bg-emerald-50/60', text: 'text-emerald-500', border: 'border-emerald-100' },
    red:     { bg: 'bg-red-50/60',     text: 'text-red-500',     border: 'border-red-100' },
    amber:   { bg: 'bg-amber-50/60',   text: 'text-amber-500',   border: 'border-amber-100' },
  }

  // Dynamic trend chart data
  const trendPeriods = insight.trendAnalysis?.periods || []
  const trendChart = trendPeriods.length === 5 ? {
    crPoints: trendPeriods.map((p, i) => ({
      x: [48, 121, 194, 267, 340][i],
      y: Math.round(110 - (p.completionRate || 80) * 0.9),
      v: `${p.completionRate}%`,
    })),
    arPoints: trendPeriods.map((p, i) => ({
      x: [48, 121, 194, 267, 340][i],
      y: Math.round(110 - (p.accuracyRate || 70) * 0.9),
      v: `${p.accuracyRate}%`,
    })),
    xLabels: trendPeriods.map(p => p.label),
  } : null

  // Radar chart helpers (dynamic)
  const radarN = radarDims.length || 6
  function radarXY(r: number, i: number): [number, number] {
    const angle = (-Math.PI / 2) + (2 * Math.PI * i) / radarN
    return [90 + Math.cos(angle) * r * 75, 90 + Math.sin(angle) * r * 75]
  }
  function radarPoints(r: number): string {
    return radarDims.map((_, i) => radarXY(r, i).join(',')).join(' ')
  }
  const avgR = radarDims.reduce((sum, d) => sum + d.avg, 0) / (radarDims.length * 100) || 0.78
  const oursR = radarDims.reduce((sum, d) => sum + d.ours, 0) / (radarDims.length * 100) || 0.72

  return (
    <div className="p-5 space-y-3">
      <RangeSelectors {...{ timeRange, setTimeRange, scope, setScope, studentRange, setStudentRange }} />

      {/* ── Stage Conclusion ── */}
      <div id="sec-conclusion" className="bg-white border border-[#e8eef5] rounded-xl p-3 border-l-[3px] border-l-[#4b9fe8]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${prioBadge}`}>{prioLabel}</span>
          <span className="text-[12px] font-bold text-[#1f2d3d]">{insight.title}</span>
        </div>
        <p className="text-[10px] text-[#3a4a5e] leading-relaxed">{insight.conclusion}</p>
      </div>

      {/* ── Key Metrics ── */}
      <div id="sec-keydata">
        <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">关键数据</h3>
        <div className="grid grid-cols-3 gap-1.5">
          {insight.keyMetrics.map((m, i) => (
            <div key={i} className={`rounded-lg px-2.5 py-2 text-center bg-white border ${m.alert ? 'border-red-200 bg-red-50/30' : 'border-[#e8eef5]'}`}>
              <p className={`text-[14px] font-bold ${m.alert ? 'text-red-500' : m.trend === 'down' ? 'text-amber-600' : m.trend === 'up' ? 'text-emerald-600' : 'text-[#3a4f66]'}`}>{m.value}</p>
              <p className="text-[9px] text-[#6b8aaa]">{m.label}</p>
              {m.sub && <p className={`text-[8px] ${m.alert ? 'text-red-400' : m.trend === 'down' ? 'text-amber-400' : 'text-slate-400'}`}>{m.sub}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ── Stage Trend — SVG dual-line chart ── */}
      {trendChart && (
        <div id="sec-trend">
          <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">阶段变化趋势</h3>
          <div className="bg-white border border-[#e8eef4] rounded-xl p-3">
            <svg viewBox="0 0 340 140" className="w-full h-[160px]">
              {[20,50,80,110].map((y,i) => (
                <line key={i} x1="36" y1={y} x2="340" y2={y} stroke="#eef2f6" strokeWidth="0.5" />
              ))}
              {[100,80,60,40].map((v,i) => (
                <text key={i} x="32" y={[23,53,83,113][i]} textAnchor="end" fill="#b0c8de" fontSize="8">{v}%</text>
              ))}
              <polyline points={trendChart.crPoints.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#4b9fe8" strokeWidth="1.8" />
              {trendChart.crPoints.map((p,i) => (
                <g key={'cr'+i}>
                  <circle cx={p.x} cy={p.y} r="3" fill="#fff" stroke="#4b9fe8" strokeWidth="1.8" />
                  {i === trendChart.crPoints.length - 1 && <text x={p.x-12} y={p.y-6} fill="#4b9fe8" fontSize="9" fontWeight="bold">{p.v}</text>}
                </g>
              ))}
              <polyline points={trendChart.arPoints.map(p => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#64748b" strokeWidth="1.8" strokeDasharray="4,2" />
              {trendChart.arPoints.map((p,i) => (
                <g key={'ar'+i}>
                  <circle cx={p.x} cy={p.y} r="3" fill="#fff" stroke="#64748b" strokeWidth="1.8" />
                  {i === trendChart.arPoints.length - 1 && <text x={p.x-12} y={p.y-6} fill="#64748b" fontSize="9" fontWeight="bold">{p.v}</text>}
                </g>
              ))}
              {trendChart.xLabels.map((l,i) => (
                <text key={i} x={[48,121,194,267,340][i]} y="98" textAnchor="middle" fill="#b0c8de" fontSize="8">{l}</text>
              ))}
              <line x1="48" y1="118" x2="68" y2="118" stroke="#4b9fe8" strokeWidth="1.8" />
              <circle cx="58" cy="118" r="2.5" fill="#fff" stroke="#4b9fe8" strokeWidth="1" />
              <text x="74" y="121" fill="#4b9fe8" fontSize="9">完成率</text>
              <line x1="130" y1="118" x2="150" y2="118" stroke="#64748b" strokeWidth="1.8" strokeDasharray="4,2" />
              <circle cx="140" cy="118" r="2.5" fill="#fff" stroke="#64748b" strokeWidth="1" />
              <text x="156" y="121" fill="#64748b" fontSize="9">正确率</text>
            </svg>
            <p className="text-[9px] text-slate-400 mt-1 leading-relaxed">{insight.trendAnalysis?.summary || ''}</p>
          </div>
        </div>
      )}

      {/* ── Reference Comparison — gap lollipop chart ── */}
      {comparisonItems.length > 0 && (
        <div id="sec-comparison">
          <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">{insight.referenceComparison?.horizontal?.title || '班级参照对比'}</h3>
          <div className="bg-white border border-[#e8eef4] rounded-xl p-3 space-y-2.5">
            {comparisonItems.map((row, i) => {
              const ours = typeof row.ours === 'number' ? row.ours : parseFloat(String(row.ours))
              const ref = typeof row.reference === 'number' ? row.reference : parseFloat(String(row.reference))
              const gap = ref - ours
              const leftPct = (Math.min(ours, ref) / 100) * 180
              const rightPct = (Math.abs(gap) / 100) * 180
              return (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <span className="w-14 text-[#6b8aaa] shrink-0 text-right">{row.label}</span>
                  <div className="flex-1 flex items-center h-6 relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full h-[3px] rounded-full bg-[#eef2f6]" />
                    </div>
                    <div className="absolute flex items-center gap-1" style={{ left: `${Math.max(4, leftPct - 12)}px` }}>
                      <span className="text-[#3a4f66] font-bold text-[10px]">{ours}{typeof row.ours === 'string' && row.ours.includes('%') ? '' : '%'}</span>
                      <span className={`w-2.5 h-2.5 rounded-full ${gapDotColor(gap)} ring-2 ring-white shrink-0`} />
                    </div>
                    {gap > 0 && (
                      <div className={`absolute h-1 ${gapLineColor(gap)}`}
                        style={{ left: `${leftPct + 6}px`, width: `${Math.max(8, rightPct - 10)}px` }} />
                    )}
                    <div className="absolute flex items-center gap-1" style={{ left: `${Math.min(205, leftPct + rightPct - 4)}px` }}>
                      <span className="w-2 h-2 rounded-full bg-slate-300 ring-2 ring-white shrink-0" />
                      <span className="text-[#8aabcc] text-[10px]">{ref}{typeof row.reference === 'string' && row.reference.includes('%') ? '' : '%'}</span>
                    </div>
                  </div>
                  <span className={`text-[9px] shrink-0 w-[70px] ${gapTextColor(gap)}`}>
                    {gap > 0 ? `低 ${gap} 个百分点` : `高 ${Math.abs(gap)} 个百分点`}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Radar Chart ── */}
      {radarDims.length >= 3 && (
        <div id="sec-radar">
          <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">能力短板分析</h3>
          <div className="bg-white border border-[#e8eef4] rounded-xl p-3">
            <div className="flex items-start gap-2">
              <svg viewBox="0 0 180 180" className="w-[140px] h-[140px] shrink-0">
                {[0.3,0.5,0.7,0.9].map((r,i) => (
                  <polygon key={i} points={radarPoints(r)} fill="none" stroke="#eef2f6" strokeWidth="0.5" />
                ))}
                {radarDims.map((_,i) => {
                  const [x,y] = radarXY(1.0, i)
                  return <line key={i} x1="90" y1="90" x2={x} y2={y} stroke="#eef2f6" strokeWidth="0.5" />
                })}
                <polygon points={radarPoints(oursR)} fill="#4b9fe8" fillOpacity="0.12" stroke="#4b9fe8" strokeWidth="1.2" />
                <polygon points={radarPoints(avgR)} fill="none" stroke="#c0d4e8" strokeWidth="1" strokeDasharray="3,2" />
                {radarDims.map((d,i) => {
                  const [x,y] = radarXY(d.ours/100, i)
                  const color = d.ours < 60 ? '#f87171' : d.ours < 70 ? '#f59e0b' : d.ours >= 85 ? '#34d399' : '#4b9fe8'
                  return <circle key={i} cx={x} cy={y} r="3.5" fill="#fff" stroke={color} strokeWidth="2" />
                })}
                {radarDims.map((d,i) => {
                  const [x,y] = radarXY(1.15, i)
                  return <text key={i} x={x} y={y} textAnchor="middle" fill="#6b8aaa" fontSize="8">{d.label}</text>
                })}
              </svg>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-1.5 text-[9px]"><span className="w-2.5 h-2.5 rounded-full bg-[#4b9fe8]/20 border border-[#4b9fe8]" /><span className="text-[#6b8aaa]">本班</span><span className="w-2.5 h-px bg-[#c0d4e8]" /><span className="text-[#b0c8de]">... 年级</span></div>
                {radarDims.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[10px]">
                    <span className="w-12 text-[#6b8aaa] truncate shrink-0">{d.label}</span>
                    <span className={`font-semibold ${d.ours < 60 ? 'text-red-500' : d.ours < 70 ? 'text-amber-500' : d.ours >= 85 ? 'text-emerald-500' : 'text-blue-500'}`}>{d.ours}%</span>
                    <span className="text-[#c0d4e8] text-[8px]">{d.avg}%</span>
                    {d.ours < 60 && <span className="text-[8px] text-red-400 font-medium">短板</span>}
                    {d.ours >= 60 && d.ours < 70 && <span className="text-[8px] text-amber-400">偏弱</span>}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-[9px] text-slate-400 mt-2 leading-relaxed">主要短板集中在{radarDims.filter(d => d.ours < 70).map(d => d.label).join('和') || '各项能力'}，均低于年级平均。</p>
          </div>
        </div>
      )}

      {/* ── Problems ── */}
      {problems.length > 0 && (
        <div id="sec-problems">
          <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">{insight.problemDiagnosis?.title || '问题集中点'}</h3>
          <div className="space-y-1.5">
            {problems.map((p: ProblemItem) => (
              <div key={p.rank} className="bg-white rounded-lg border p-2.5 flex items-start gap-2.5 border-[#e8eef5]">
                <span className={`w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${p.severe ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}`}>{p.rank}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-slate-800">{p.title}</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">数据：{p.data}</p>
                  <p className="text-[9px] text-slate-400">影响：{p.impact}</p>
                </div>
                {p.actionLabel && (
                  <button onClick={() => showToast(`小天正在处理：${p.actionLabel}`)} className="text-[9px] text-[#4b9fe8] hover:underline whitespace-nowrap shrink-0 font-medium self-center">{p.actionLabel}</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Student Segments — 2x2 quadrant ── */}
      {segments.length === 4 && (
        <div id="sec-students">
          <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">学生分层情况</h3>
          <div className="bg-white border border-[#e8eef4] rounded-xl p-3">
            <div className="grid grid-cols-2 gap-0.5 mb-2">
              {segments.map((seg, i) => {
                const s = segStyle[seg.color] || segStyle.blue
                return (
                  <div key={i} className={`${s.bg} p-2.5 border ${s.border} ${i === 0 ? 'rounded-tl-xl' : i === 1 ? 'rounded-tr-xl' : i === 2 ? 'rounded-bl-xl' : 'rounded-br-xl'}`}>
                    <p className={`text-[9px] ${s.text} font-medium`}>{seg.label}</p>
                    <p className={`text-[18px] font-bold ${s.text}`}>{seg.count}<span className="text-[10px] font-normal">人</span></p>
                    <p className={`text-[8px] ${s.text}/70 leading-relaxed`}>{seg.description}</p>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center justify-between text-[8px] text-[#b0c8de] px-1">
              <span>← 低完成率</span>
              <span>完成率 →</span>
              <span className="ml-4">← 低正确率</span>
              <span>正确率 →</span>
            </div>
            <p className="text-[9px] text-slate-400 mt-2 leading-relaxed">{segments.find(s => s.color === 'red')?.count || 0} 名学生需重点关注；{segments.find(s => s.color === 'emerald')?.count || 0} 名学生可适当布置挑战性练习。</p>
            <button onClick={() => showToast('学生明细功能将在后续版本接入')} className="text-[9px] text-[#4b9fe8] hover:underline font-medium mt-1">查看学生明细 →</button>
          </div>
        </div>
      )}

      {/* ── Actions ── */}
      <div id="sec-actions">
        <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">小天可以帮你</h3>
        <div className="grid grid-cols-2 gap-1.5">
          {insight.recommendedActions.map((a, i) => (
            <button key={i} onClick={() => {
              if (a.onClickKey === 'custom_review_plan') onSubPanel('wrongWordReviewPlan', {})
              else if (a.onClickKey === 'tiered_assignment') onSubPanel('assignmentConfirm', { assignmentData: { title: '分层练习', summary: '基于学生分层布置', className: '初一1班', dueDate: '', scoreRule: 'show_after_due', answerMode: 'online', totalScore: 100, notifyMethod: 'app' } })
              else showToast(`小天正在处理：${a.label}`)
            }}
              className={`text-left p-2 rounded-lg border transition-colors bg-white hover:shadow-sm ${a.primary ? 'border-[#4b9fe8]/30 hover:border-[#4b9fe8]' : 'border-[#e8eef5] hover:border-[#b8d4f0]'}`}
            >
              <div className="flex items-center gap-1 mb-0.5">
                <p className="text-[10px] font-semibold text-slate-800">{a.label}</p>
                {a.primary && <span className="text-[7px] font-medium text-white bg-blue-500 px-1 py-0.5 rounded-full shrink-0">推荐</span>}
                {a.confirm && <span className="text-[7px] font-medium text-amber-600 bg-amber-100 px-1 py-0.5 rounded-full shrink-0">需确认</span>}
              </div>
              <p className="text-[8px] text-slate-400 line-clamp-1">{a.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Related Items ── */}
      {insight.relatedItems && insight.relatedItems.length > 0 && (
        <div id="sec-related">
          <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">相关练习</h3>
          <div className="border border-[#e8eef4] rounded-lg overflow-hidden divide-y divide-[#f0f4f8]">
            {insight.relatedItems.map((p, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white">
                <FileText size={12} className="text-[#8aabcc] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium text-slate-700 truncate">{p.title}</p>
                  <div className="flex items-center gap-2 text-[9px] text-[#8aabcc]">
                    <span>{p.meta}</span>
                    {p.issue && <><span>·</span><span className="text-red-400">{p.issue}</span></>}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {p.actions.map((act, j) => (
                    <button key={j} onClick={() => showToast(`已打开「${p.title}」${act}`)}
                      className="text-[9px] text-[#4b9fe8] hover:underline whitespace-nowrap">{act}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Shared helpers for specialized stage insight views ───

function ChipFilter({ options, value, onChange }: { options: { key: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {options.map((o) => (
        <button key={o.key} onClick={() => onChange(o.key)}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors whitespace-nowrap ${value === o.key ? 'bg-[#eaf2fb] text-[#4b9fe8]' : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'}`}
        >{o.label}</button>
      ))}
    </div>
  )
}

function StageMetricRow({ items }: { items: { label: string; value: string; sub?: string; alert?: boolean }[] }) {
  const valColor = (sub?: string, alert?: boolean) => {
    if (alert) return 'text-red-500'
    if (sub?.startsWith('↓')) return 'text-amber-500'
    if (sub?.startsWith('↑')) return 'text-emerald-500'
    return 'text-[#3a4a5e]'
  }
  const cols = items.length % 3 === 0 ? 'grid-cols-3' : items.length <= 6 ? 'grid-cols-3' : 'grid-cols-3'
  return (
    <div className={`grid ${cols} gap-1.5`}>
      {items.map((m, i) => (
        <div key={i} className={`rounded-lg px-2.5 py-2 text-center bg-white border ${m.alert ? 'border-red-200 bg-red-50/30' : 'border-[#e8eef5]'}`}>
          <p className={`text-[14px] font-bold ${valColor(m.sub, m.alert)}`}>{m.value}</p>
          <p className="text-[9px] text-[#7a8ba0]">{m.label}</p>
          {m.sub && <p className={`text-[8px] mt-0.5 ${valColor(m.sub, m.alert)}`}>{m.sub}</p>}
        </div>
      ))}
    </div>
  )
}

function RangeSelectors({ timeRange, setTimeRange, scope, setScope, studentRange, setStudentRange }: {
  timeRange: string; setTimeRange: (v: string) => void
  scope: string; setScope: (v: string) => void
  studentRange: string; setStudentRange: (v: string) => void
}) {
  return (
    <div className="flex items-center gap-4 flex-wrap mb-1">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-[#8aabcc] shrink-0">时间：</span>
        <ChipFilter options={[
          { key: '7d', label: '近7天' }, { key: 'two_weeks', label: '近两周' },
          { key: 'month', label: '近一月' }, { key: 'semester', label: '本学期' },
        ]} value={timeRange} onChange={setTimeRange} />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-[#8aabcc] shrink-0">范围：</span>
        <ChipFilter options={[
          { key: 'all', label: '全部' }, { key: 'type', label: '按类型' }, { key: 'unit', label: '按单元' },
        ]} value={scope} onChange={setScope} />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-[#8aabcc] shrink-0">学生：</span>
        <ChipFilter options={[
          { key: 'all', label: '全班' }, { key: 'unfinished', label: '未完成' },
          { key: 'low_score', label: '正确率低' }, { key: 'group', label: '指定分组' },
        ]} value={studentRange} onChange={setStudentRange} />
      </div>
    </div>
  )
}

// ── Vocab Stage Insight View ─────────────────────────────

function VocabStageInsightView({ insight, onSubPanel, showToast }: {
  insight: TeachingInsight
  onSubPanel: (type: string, data?: Record<string, unknown>) => void
  showToast: (msg: string) => void
}) {
  const [timeRange, setTimeRange] = useState('two_weeks')
  const [scope, setScope] = useState('all')
  const [studentRange, setStudentRange] = useState('all')

  const prioBadge = priorityBadgeColor(insight.priority)
  const prioLabel = priorityLabel(insight.priority)

  return (
    <div className="p-5 space-y-3">
      <RangeSelectors {...{ timeRange, setTimeRange, scope, setScope, studentRange, setStudentRange }} />

      {/* Stage Conclusion */}
      <div className="bg-white border border-[#e8eef5] rounded-xl p-3 border-l-[3px] border-l-[#4b9fe8]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${prioBadge}`}>{prioLabel}</span>
          <span className="text-[12px] font-bold text-[#1f2d3d]">{insight.title}</span>
        </div>
        <p className="text-[10px] text-[#3a4a5e] leading-relaxed">{insight.conclusion}</p>
      </div>

      {/* Key Metrics */}
      <div>
        <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">关键数据</h3>
        <StageMetricRow items={insight.keyMetrics.map(m => ({ label: m.label, value: m.value, sub: m.sub, alert: m.alert }))} />
      </div>

      {/* Error Type Breakdown */}
      {insight.errorTypes && insight.errorTypes.length > 0 && (
        <div>
          <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">错词分型</h3>
          <div className="grid grid-cols-2 gap-1.5">
            {insight.errorTypes.map((et, i) => (
              <div key={i} className={`rounded-lg bg-white border border-[#e8eef5] px-3 py-2 border-l-[3px] ${et.borderColor}`}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] font-bold text-[#1f2d3d]">{et.type}</span>
                  <span className="text-[12px] font-bold text-[#3a4a5e]">{et.count} 词</span>
                </div>
                <p className="text-[9px] text-[#7a8ba0] truncate">{et.words}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* High freq wrong words */}
      {insight.highFreqItems && insight.highFreqItems.length > 0 && (
        <div>
          <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">高频错词 Top {insight.highFreqItems.length}</h3>
          <div className="bg-white border border-[#e8eef4] rounded-xl p-3 space-y-1.5">
            {insight.highFreqItems.map((w, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px]">
                <span className="w-20 font-medium text-slate-700 shrink-0">{w.name}</span>
                <div className="flex-1 h-1.5 bg-[#f0f4f8] rounded-full overflow-hidden">
                  <div className="h-full bg-[#4b9fe8] rounded-full" style={{ width: w.bar + '%' }} />
                </div>
                <span className="w-10 text-right text-[#3a4a5e] font-semibold">{w.rate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vertical Comparison */}
      {insight.referenceComparison?.vertical && (
        <div>
          <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">{insight.referenceComparison.vertical.title}</h3>
          <div className="bg-white border border-[#e8eef4] rounded-xl p-3 space-y-1.5">
            {insight.referenceComparison.vertical.items.map((row, i) => {
              const afterVal = typeof row.ours === 'string' ? row.ours : String(row.ours)
              const beforeVal = typeof row.reference === 'string' ? row.reference : String(row.reference)
              const afterNum = parseFloat(afterVal)
              const beforeNum = parseFloat(beforeVal)
              const diff = afterNum - beforeNum
              const diffStr = diff > 0 ? `↑${diff}` : diff < 0 ? `↓${Math.abs(diff)}` : '—'
              const barWidth = Math.min(100, Math.max(0, afterNum))
              return (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <span className="w-16 text-[#8aabcc] shrink-0">{row.label}</span>
                  <span className="text-[#8aabcc]">{beforeVal}</span>
                  <div className="flex-1 h-1.5 bg-[#eef2f6] rounded-full overflow-hidden"><div className="h-full bg-[#4b9fe8] rounded-full" style={{ width: barWidth + '%' }} /></div>
                  <span className={row.alert ? 'text-red-500 font-semibold' : 'text-[#3a4a5e]'}>{afterVal}</span>
                  <span className={row.alert ? 'text-red-500' : diff < 0 ? 'text-amber-500' : 'text-emerald-500'}>{diffStr}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Horizontal Comparison */}
      {insight.referenceComparison?.horizontal && (
        <div>
          <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">{insight.referenceComparison.horizontal.title}</h3>
          <div className="bg-white border border-[#e8eef4] rounded-xl p-3 space-y-1.5">
            {insight.referenceComparison.horizontal.items.map((row, i) => {
              const oursVal = typeof row.ours === 'string' ? parseInt(row.ours) : row.ours
              const refVal = typeof row.reference === 'string' ? parseInt(row.reference) : row.reference
              const gap = refVal - oursVal
              const gapCls = gap > 10 ? 'text-red-500' : gap >= 5 ? 'text-amber-500' : 'text-[#7a8ba0]'
              return (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <span className="w-16 text-[#7a8ba0] shrink-0">{row.label}</span>
                  <span className="text-[#3a4a5e] font-medium">{typeof row.ours === 'string' ? row.ours : `${row.ours}%`}</span>
                  <span className="text-[#c0d4e8]">vs</span>
                  <span className="text-[#7a8ba0]">{typeof row.reference === 'string' ? row.reference : `${row.reference}%`}</span>
                  <span className={`${gapCls} text-[9px]`}>低于年级 {gap} 个百分点</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div>
        <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">小天可以帮你</h3>
        <div className="grid grid-cols-2 gap-1.5">
          {insight.recommendedActions.map((a, i) => (
            <button key={i} onClick={() => {
              if (a.onClickKey === 'custom_review_plan') onSubPanel('wrongWordReviewPlan', {})
              else if (a.onClickKey === 'tiered_vocab_assignment') onSubPanel('assignmentConfirm', { assignmentData: { title: '分层词汇练习', summary: '按学生水平布置词汇', className: '初一1班', dueDate: '', scoreRule: 'show_after_due', answerMode: 'online', totalScore: 100, notifyMethod: 'app' } })
              else showToast(`小天正在处理：${a.label}`)
            }}
              className={`text-left p-2 rounded-lg border transition-colors bg-white hover:shadow-sm ${a.primary ? 'border-[#4b9fe8]/30 hover:border-[#4b9fe8]' : 'border-[#e8eef5] hover:border-[#b8d4f0]'}`}
            >
              <div className="flex items-center gap-1 mb-0.5">
                <p className="text-[10px] font-semibold text-slate-800">{a.label}</p>
                {a.primary && <span className="text-[7px] font-medium text-white bg-blue-500 px-1 py-0.5 rounded-full shrink-0">推荐</span>}
                {a.confirm && <span className="text-[7px] font-medium text-amber-600 bg-amber-100 px-1 py-0.5 rounded-full shrink-0">需确认</span>}
              </div>
              <p className="text-[8px] text-slate-400 line-clamp-1">{a.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Listening/Speaking Stage Insight View ─────────────────

function ListeningStageInsightView({ insight, showToast }: {
  insight: TeachingInsight
  onSubPanel: (type: string, data?: Record<string, unknown>) => void
  showToast: (msg: string) => void
}) {
  const [timeRange, setTimeRange] = useState('month')
  const [scope, setScope] = useState('all')
  const [studentRange, setStudentRange] = useState('all')

  const prioBadge = priorityBadgeColor(insight.priority)
  const prioLabel = priorityLabel(insight.priority)

  return (
    <div className="p-5 space-y-3">
      <RangeSelectors {...{ timeRange, setTimeRange, scope, setScope, studentRange, setStudentRange }} />

      <div className="bg-white border border-[#e8eef5] rounded-xl p-3 border-l-[3px] border-l-[#4b9fe8]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${prioBadge}`}>{prioLabel}</span>
          <span className="text-[12px] font-bold text-[#1f2d3d]">{insight.title}</span>
        </div>
        <p className="text-[10px] text-[#3a4a5e] leading-relaxed">{insight.conclusion}</p>
      </div>

      <StageMetricRow items={insight.keyMetrics.map(m => ({ label: m.label, value: m.value, sub: m.sub, alert: m.alert }))} />

      {/* Problem breakdown */}
      {insight.problemDiagnosis && (
        <div>
          <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">听力/听说问题分型</h3>
          <div className="bg-white border border-[#e8eef4] rounded-xl p-3 space-y-1">
            {insight.problemDiagnosis.items.map((p, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${p.severe ? 'bg-red-100 text-red-500' : 'bg-amber-100 text-amber-500'}`}>{i + 1}</span>
                <span className="text-[10px] text-slate-600">{p.data}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vertical Comparison */}
      {insight.referenceComparison?.vertical && (
        <div>
          <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">{insight.referenceComparison.vertical.title}</h3>
          <div className="bg-white border border-[#e8eef4] rounded-xl p-3 space-y-1.5">
            {insight.referenceComparison.vertical.items.map((row, i) => {
              const afterVal = typeof row.ours === 'string' ? row.ours : String(row.ours)
              const beforeVal = typeof row.reference === 'string' ? row.reference : String(row.reference)
              const afterNum = parseFloat(afterVal)
              const barWidth = Math.min(100, Math.max(0, afterNum))
              return (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <span className="w-16 text-[#8aabcc] shrink-0">{row.label}</span>
                  <span className="text-[#8aabcc]">{beforeVal}</span>
                  <div className="flex-1 h-1.5 bg-[#eef2f6] rounded-full overflow-hidden"><div className="h-full bg-[#4b9fe8] rounded-full" style={{ width: barWidth + '%' }} /></div>
                  <span className={row.alert ? 'text-red-500 font-semibold' : 'text-[#3a4a5e]'}>{afterVal}</span>
                  <span className={row.alert ? 'text-red-500' : 'text-amber-500'}>↓{row.gap}{typeof row.ours === 'string' && row.ours.includes('%') ? '%' : ''}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Horizontal Comparison */}
      {insight.referenceComparison?.horizontal && (
        <div>
          <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">{insight.referenceComparison.horizontal.title}</h3>
          <div className="bg-white border border-[#e8eef4] rounded-xl p-3 space-y-1.5">
            {insight.referenceComparison.horizontal.items.map((row, i) => {
              const oursVal = typeof row.ours === 'string' ? parseInt(row.ours) : row.ours
              const refVal = typeof row.reference === 'string' ? parseInt(row.reference) : row.reference
              const gap = refVal - oursVal
              const gapCls = gap > 10 ? 'text-red-500' : gap >= 5 ? 'text-amber-500' : 'text-[#7a8ba0]'
              return (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <span className="w-16 text-[#7a8ba0] shrink-0">{row.label}</span>
                  <span className="text-[#3a4a5e] font-medium">{typeof row.ours === 'string' ? row.ours : `${row.ours}%`}</span>
                  <span className="text-[#c0d4e8]">vs</span>
                  <span className="text-[#7a8ba0]">{typeof row.reference === 'string' ? row.reference : `${row.reference}%`}</span>
                  <span className={`${gapCls} text-[9px]`}>低于年级 {gap} 个百分点</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div>
        <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">小天可以帮你</h3>
        <div className="grid grid-cols-2 gap-1.5">
          {insight.recommendedActions.map((a, i) => (
            <button key={i} onClick={() => showToast(`小天正在处理：${a.label}`)}
              className={`text-left p-2 rounded-lg border transition-colors bg-white hover:shadow-sm ${a.primary ? 'border-[#4b9fe8]/30 hover:border-[#4b9fe8]' : 'border-[#e8eef5] hover:border-[#b8d4f0]'}`}
            >
              <div className="flex items-center gap-1 mb-0.5">
                <p className="text-[10px] font-semibold text-slate-800">{a.label}</p>
                {a.primary && <span className="text-[7px] font-medium text-white bg-blue-500 px-1 py-0.5 rounded-full shrink-0">推荐</span>}
                {a.confirm && <span className="text-[7px] font-medium text-amber-600 bg-amber-100 px-1 py-0.5 rounded-full shrink-0">需确认</span>}
              </div>
              <p className="text-[8px] text-slate-400 line-clamp-1">{a.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Writing Stage Insight View ────────────────────────────

function WritingStageInsightView({ insight, onSubPanel, showToast }: {
  insight: TeachingInsight
  onSubPanel: (type: string, data?: Record<string, unknown>) => void
  showToast: (msg: string) => void
}) {
  const [timeRange, setTimeRange] = useState('month')
  const [scope, setScope] = useState('all')
  const [studentRange, setStudentRange] = useState('all')

  const prioBadge = priorityBadgeColor(insight.priority)
  const prioLabel = priorityLabel(insight.priority)

  return (
    <div className="p-5 space-y-3">
      <RangeSelectors {...{ timeRange, setTimeRange, scope, setScope, studentRange, setStudentRange }} />

      <div className="bg-white border border-[#e8eef5] rounded-xl p-3 border-l-[3px] border-l-[#4b9fe8]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${prioBadge}`}>{prioLabel}</span>
          <span className="text-[12px] font-bold text-[#1f2d3d]">{insight.title}</span>
        </div>
        <p className="text-[10px] text-[#3a4a5e] leading-relaxed">{insight.conclusion}</p>
      </div>

      <StageMetricRow items={insight.keyMetrics.map(m => ({ label: m.label, value: m.value, sub: m.sub, alert: m.alert }))} />

      {/* Problem breakdown */}
      {insight.problemDiagnosis && (
        <div>
          <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">写作问题分型</h3>
          <div className="bg-white border border-[#e8eef4] rounded-xl p-3 space-y-1">
            {insight.problemDiagnosis.items.map((p, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${p.severe ? 'bg-red-100 text-red-500' : 'bg-amber-100 text-amber-500'}`}>{i + 1}</span>
                <span className="text-[10px] text-slate-600">{p.data}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vertical Comparison */}
      {insight.referenceComparison?.vertical && (
        <div>
          <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">{insight.referenceComparison.vertical.title}</h3>
          <div className="bg-white border border-[#e8eef4] rounded-xl p-3 space-y-1.5">
            {insight.referenceComparison.vertical.items.map((row, i) => {
              const afterVal = typeof row.ours === 'string' ? row.ours : String(row.ours)
              const beforeVal = typeof row.reference === 'string' ? row.reference : String(row.reference)
              const afterNum = parseFloat(afterVal)
              const barWidth = Math.min(100, Math.max(0, afterNum))
              const diff = afterNum - parseFloat(beforeVal)
              const diffStr = diff > 0 ? `↑${diff}` : diff < 0 ? `↓${Math.abs(diff)}` : '—'
              return (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <span className="w-16 text-[#8aabcc] shrink-0">{row.label}</span>
                  <span className="text-[#8aabcc]">{beforeVal}</span>
                  <div className="flex-1 h-1.5 bg-[#eef2f6] rounded-full overflow-hidden"><div className="h-full bg-[#4b9fe8] rounded-full" style={{ width: barWidth + '%' }} /></div>
                  <span className={row.alert ? 'text-red-500 font-semibold' : 'text-[#3a4a5e]'}>{afterVal}</span>
                  <span className={row.alert ? 'text-red-500' : row.oursBetter ? 'text-emerald-500' : 'text-amber-500'}>{diffStr}{row.oursBetter ? '' : typeof row.ours === 'string' && row.ours.includes('%') ? '' : ''}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Horizontal Comparison */}
      {insight.referenceComparison?.horizontal && (
        <div>
          <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">{insight.referenceComparison.horizontal.title}</h3>
          <div className="bg-white border border-[#e8eef4] rounded-xl p-3 space-y-1.5">
            {insight.referenceComparison.horizontal.items.map((row, i) => {
              const oursVal = typeof row.ours === 'string' ? parseInt(row.ours) : row.ours
              const refVal = typeof row.reference === 'string' ? parseInt(row.reference) : row.reference
              const gap = row.oursBetter ? oursVal - refVal : refVal - oursVal
              return (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <span className="w-16 text-[#7a8ba0] shrink-0">{row.label}</span>
                  <span className="text-[#3a4a5e] font-medium">{typeof row.ours === 'string' ? row.ours : `${row.ours}%`}</span>
                  <span className="text-[#c0d4e8]">vs</span>
                  <span className="text-[#7a8ba0]">{typeof row.reference === 'string' ? row.reference : `${row.reference}%`}</span>
                  <span className={`text-[9px] ${row.oursBetter ? 'text-emerald-500' : row.alert ? 'text-red-500' : 'text-amber-500'}`}>
                    {row.oursBetter ? `高于年级 ${gap} ${typeof row.ours === 'string' && row.ours.includes('词') ? '词' : '个百分点'}` : `低于年级 ${gap} 个百分点`}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div>
        <h3 className="text-[11px] font-semibold text-slate-700 mb-1.5">小天可以帮你</h3>
        <div className="grid grid-cols-2 gap-1.5">
          {insight.recommendedActions.map((a, i) => (
            <button key={i} onClick={() => {
              if (a.onClickKey === 'tiered_writing_assignment') onSubPanel('assignmentConfirm', { assignmentData: { title: '分层写作任务', summary: '按学生水平布置写作', className: '初一1班', dueDate: '', scoreRule: 'show_after_due', answerMode: 'online', totalScore: 100, notifyMethod: 'app' } })
              else showToast(`小天正在处理：${a.label}`)
            }}
              className={`text-left p-2 rounded-lg border transition-colors bg-white hover:shadow-sm ${a.primary ? 'border-[#4b9fe8]/30 hover:border-[#4b9fe8]' : 'border-[#e8eef5] hover:border-[#b8d4f0]'}`}
            >
              <div className="flex items-center gap-1 mb-0.5">
                <p className="text-[10px] font-semibold text-slate-800">{a.label}</p>
                {a.primary && <span className="text-[7px] font-medium text-white bg-blue-500 px-1 py-0.5 rounded-full shrink-0">推荐</span>}
                {a.confirm && <span className="text-[7px] font-medium text-amber-600 bg-amber-100 px-1 py-0.5 rounded-full shrink-0">需确认</span>}
              </div>
              <p className="text-[8px] text-slate-400 line-clamp-1">{a.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Wrong Word Students ──────────────────────────────────

function WrongWordStudentsView({ data }: { data: Record<string, unknown> }) {
  const mockStudents = [
    { name: '张小明', wrongWords: ['restaurant', 'Wednesday', 'delicious'], rate: '60%' },
    { name: '李华', wrongWords: ['favorite', 'healthy'], rate: '40%' },
    { name: '王芳', wrongWords: ['restaurant', 'delicious'], rate: '40%' },
    { name: '陈强', wrongWords: ['Wednesday', 'healthy'], rate: '40%' },
    { name: '刘洋', wrongWords: ['restaurant'], rate: '20%' },
  ]

  return (
    <div className="p-6 space-y-4">
      <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={16} className="text-amber-500" />
          <h3 className="text-sm font-semibold text-slate-800">错词学生列表</h3>
        </div>
        <p className="text-[11px] text-slate-500">
          以下 5 名学生存在{(data?.totalWrong as string) || '5'}个高频错词。数据基于最近2次词汇练习。
        </p>
      </div>
      <div className="space-y-2">
        {mockStudents.map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-slate-700">{s.name}</span>
              <div className="flex gap-1 mt-1">
                {s.wrongWords.map((w, j) => (
                  <span key={j} className="text-[10px] bg-red-50 text-red-500 px-1.5 py-0.5 rounded">{w}</span>
                ))}
              </div>
            </div>
            <span className="text-[11px] text-slate-500">错误率 {s.rate}</span>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-400 text-center">此为 mock 数据，后续将接入真实学生数据</p>
    </div>
  )
}

// ── Model Essay Preview ──────────────────────────────────

function ModelEssayPreviewView({ data }: { data: Record<string, unknown> }) {
  const insight = data?.insight as InsightItem | undefined
  const topic = insight?.evidence?.details?.find(() => true)?.label || 'My Favorite Food'
  const mockEssay = `My favorite food is dumplings. They are a traditional Chinese food and my grandmother makes the best dumplings in the world.

Every weekend, my family sits together to make dumplings. The wrappers are made from flour and water, and the filling usually includes pork, cabbage, and some special seasonings. My job is to wrap them — I try to make each one look like a small boat.

When the dumplings are boiling in the pot, the delicious smell fills the entire kitchen. I always feel happy when I see them floating to the surface, which means they are ready to eat.

I love dumplings not only because they taste great, but also because making them brings my family together. It is a warm tradition that I hope to pass on to my children someday.`

  return (
    <div className="p-6 space-y-4">
      <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={16} className="text-blue-500" />
          <h3 className="text-sm font-semibold text-slate-800">范文预览 — {topic}</h3>
        </div>
        <p className="text-[11px] text-slate-500">以下范文由系统推荐，参考了班级高分作文的共同特征。</p>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] text-slate-400">推荐范文</span>
          <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded">预估得分 92</span>
        </div>
        <pre className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">{mockEssay}</pre>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => {
            useAIStore.getState().addToBasket({ id: `essay-${Date.now()}`, title: `范文: ${topic}`, reason: 'AI 洞察推荐', type: 'material', tags: ['范文', '写作'], difficulty: 'medium', estimatedTime: '5分钟' })
            alert('已加入练习篮')
          }}
          className="flex-1 px-4 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-100 transition-colors"
        >
          加入练习篮
        </button>
        <button className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
          布置该范文
        </button>
      </div>
      <p className="text-[10px] text-slate-400 text-center">此为 mock 数据，后续将接入真实范文推荐</p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// SEARCH RESULT PANEL (for drawer)
// ═══════════════════════════════════════════════════════

// ── Intent detection ──

function isWordQuery(q: string): boolean {
  const trimmed = q.trim()
  if (!trimmed) return false
  const hasInstr = /(生成|布置|分析|练习|试题|找|查看|来一|推荐|学生|班级|错词|错题|作文|听力|口语|阅读|时文|视频|同步|专项|情况|资源)/.test(trimmed)
  if (hasInstr) return false
  return /^[a-zA-Z]+(?:[\s'-][a-zA-Z]+){0,4}$/.test(trimmed) && trimmed.length <= 40
}

function isLearningStatusQuery(q: string): boolean {
  return /(看一下|看看|练习情况|练得怎么样|完成情况|学情|最近练习)/.test(q)
}

function isWrongWordQuery(q: string): boolean {
  return /(错词|错题|哪些.*错|错误率|高频错)/.test(q)
}

function isGenerateTaskQuery(q: string): boolean {
  return /(生成|出.*题|出.*道|帮我.*写|帮我.*做|默写|听写).*/.test(q)
}

// ── Shared components ──

function IntentHeader({ query, verb }: { query: string; verb: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-6 h-6 rounded bg-blue-500"><Sparkles size={12} className="text-white" /></div>
      <span className="text-[12px] font-semibold text-slate-700">小天理解你在{verb}：</span>
      <span className="text-[12px] font-bold text-[#4b9fe8]">{query}</span>
    </div>
  )
}

function SectionTitle({ color, title }: { color: string; title: string }) {
  const c = color === 'blue' ? 'bg-blue-400' : color === 'emerald' ? 'bg-emerald-400' : color === 'amber' ? 'bg-amber-400' : 'bg-red-400'
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span className={`w-1 h-3.5 rounded-full ${c}`} />
      <h3 className="text-[11px] font-semibold text-slate-700">{title}</h3>
    </div>
  )
}

function MetricRow({ items }: { items: { label: string; value: string; sub?: string; alert?: boolean }[] }) {
  return (
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
}

function ActionGrid({ actions }: { actions: { label: string; desc: string; onClick: () => void }[] }) {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {actions.map((a, i) => (
        <button key={i} onClick={a.onClick}
          className="text-left p-2 rounded-lg border border-blue-200 bg-blue-50/30 hover:bg-blue-50 hover:border-blue-300 transition-colors"
        >
          <p className="text-[11px] font-medium text-slate-800 line-clamp-1">{a.label}</p>
          <p className="text-[9px] text-slate-400 line-clamp-1">{a.desc}</p>
        </button>
      ))}
    </div>
  )
}

function CompactResourceItem({ r, onAssign, onPreview, onBasket }: {
  r: { title: string; type: string; duration?: string; difficulty: string; description: string }
  onAssign: () => void; onPreview: () => void; onBasket: () => void
}) {
  return (
    <div className="flex items-center gap-2.5 py-2 border-b border-[#f0f4f8] last:border-b-0">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 shrink-0"><BookOpen size={14} /></div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-slate-700 truncate">{r.title}</p>
        <p className="text-[9px] text-slate-400 line-clamp-1">{r.description}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button onClick={onPreview} className="text-[10px] text-slate-500 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors whitespace-nowrap">预览</button>
        <button onClick={onBasket} className="text-[10px] text-[#4b9fe8] hover:bg-[#eaf2fb] px-2 py-1 rounded transition-colors whitespace-nowrap">加入</button>
        <button onClick={onAssign} className="text-[10px] text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded font-medium transition-colors whitespace-nowrap">布置</button>
      </div>
    </div>
  )
}

// ── Main panel ──

function SearchResultPanel({
  result, query, context, onNavigate, showToast,
}: {
  result: AISearchResult
  query: string
  context: { className: string; textbook: string; unit: string; grade: string }
  onNavigate: (path: string) => void
  showToast: (msg: string) => void
}) {
  const sr = result.searchResponse
  const resources = sr?.resources || []
  const aiActions = sr?.aiActions || []
  const resourceTypes = [...new Set(resources.map((r) => r.type).filter(Boolean))]
  const resourceTypeLabels: Record<string, string> = {
    vocabulary: '同步词汇', listening: '同步听力', speaking: '口语听说',
    reading: '同步课文', current_news: '时文阅读', dubbing: '趣味配音',
    video: '主题视频', writing: '写作', grammar: '语法',
    courseware: '课件', exercise: '练习卷', exam_paper: '试卷',
  }

  const wordMatch = query.match(/[a-zA-Z]+(?:\s+[a-zA-Z]+){0,2}/)
  const extractedWord = wordMatch ? wordMatch[0] : query
  const wordData: Record<string, { pos: string; def: string; uk: string; us: string; source: string }> = {
    apple: { pos: 'n.', def: '[C]苹果', uk: '[ˈæpl]', us: '[ˈæpl]', source: '人教七上U6' },
    restaurant: { pos: 'n.', def: '[C]餐馆；餐厅', uk: '[ˈrestrɒnt]', us: '[ˈrestərɑːnt]', source: '人教七下U10' },
    wednesday: { pos: 'n.', def: '[C/U]星期三', uk: '[ˈwenzdeɪ]', us: '[ˈwenzdeɪ]', source: '人教七上U9' },
    delicious: { pos: 'adj.', def: '美味的；可口的', uk: '[dɪˈlɪʃəs]', us: '[dɪˈlɪʃəs]', source: '人教七上U6' },
  }
  const wd = wordData[extractedWord.toLowerCase()] || { pos: '—', def: '暂无本地释义', uk: `[/${extractedWord}/]`, us: `[/${extractedWord}/]`, source: '课标词库' }

  const isWord = isWordQuery(query)
  const isLearning = isLearningStatusQuery(query)
  const isWrong = isWrongWordQuery(query)
  const isGen = isGenerateTaskQuery(query)

  // ── Common header verb ──
  const verb = isLearning ? '看' : isWrong ? '查' : isGen ? '要' : '找'

  return (
    <div className="p-4 space-y-3">
      {/* ── Header ── */}
      <IntentHeader query={query} verb={verb} />

      {/* ═══════════════════════ WORD ═══════════════════════ */}
      {isWord && (
        <>
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 rounded-xl p-3">
            <SectionTitle color="blue" title="单词讲解" />
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[20px] font-bold text-slate-800">{extractedWord}</span>
              <span className="text-[8px] font-medium text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-full">课标词</span>
              <span className="text-[8px] font-medium text-cyan-600 bg-cyan-100 px-1.5 py-0.5 rounded-full">初中/高中</span>
            </div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[9px] font-bold text-blue-500 bg-blue-100 px-1.5 py-0.5 rounded">{wd.pos}</span>
              <span className="text-[13px] text-slate-700 font-medium">{wd.def}</span>
            </div>
            <div className="flex items-center gap-3 mb-2 text-[10px] text-slate-500">
              <button onClick={() => showToast(`播放英式发音：${extractedWord}`)} className="flex items-center gap-1 hover:text-blue-600">
                <span className="text-[9px] font-bold text-blue-500 bg-blue-100 px-1 py-0.5 rounded">英</span>{wd.uk}<Volume2 size={10} />
              </button>
              <button onClick={() => showToast(`播放美式发音：${extractedWord}`)} className="flex items-center gap-1 hover:text-blue-600">
                <span className="text-[9px] font-bold text-blue-400 bg-blue-100 px-1 py-0.5 rounded">美</span>{wd.us}<Volume2 size={10} />
              </button>
            </div>
            <p className="text-[9px] text-slate-400 mb-2">词汇来源：课标词库 · {wd.source}</p>
            <button onClick={() => onNavigate(`/word-teaching/${encodeURIComponent(extractedWord.toLowerCase())}`)}
              className="inline-flex items-center gap-1 px-3.5 h-7 rounded-full bg-[#4b9fe8] text-white text-[11px] font-medium hover:bg-[#3a8fd8] transition-colors whitespace-nowrap">
              打开讲词页
            </button>
          </div>

          {/* Resources summary */}
          <div className="bg-white border border-[#e8eef4] rounded-xl p-3">
            <SectionTitle color="emerald" title="相关资源" />
            <p className="text-[9px] text-[#8aabcc] mb-1.5">基于当前教学上下文：{context.textbook} · {context.unit}</p>
            <div className="grid grid-cols-2 gap-1.5 mb-2">
              <MetricRow items={[{ label: '共找到', value: String(resources.length) + ' 个' }, { label: '资源类型', value: String(resourceTypes.length) + ' 种' }]} />
            </div>
            {resources.slice(0, 3).map((r, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 border-b border-[#f0f4f8] last:border-b-0">
                <BookOpen size={13} className="text-[#8aabcc] shrink-0" />
                <span className="text-[10px] text-slate-600 truncate">{r.title}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <button onClick={() => onNavigate('/ai-search?query=' + encodeURIComponent(query) + '&autoRun=1')}
                className="inline-flex items-center gap-1 px-3 h-6.5 rounded-full border border-[#b8d4f0] text-[10px] text-[#4b9fe8] hover:bg-[#eaf2fb] transition-colors whitespace-nowrap">查看全部资源</button>
              <button onClick={() => showToast('已加入练习篮')}
                className="inline-flex items-center gap-1 px-3 h-6.5 rounded-full border border-[#b8d4f0] text-[10px] text-[#4b9fe8] hover:bg-[#eaf2fb] transition-colors whitespace-nowrap"><Plus size={10} />加入练习篮</button>
            </div>
          </div>

          {/* 小天可以帮你 */}
          {aiActions.length > 0 && (
            <div>
              <SectionTitle color="blue" title="小天可以帮你" />
              <ActionGrid actions={aiActions.map((a) => ({
                label: a.title, desc: a.description,
                onClick: () => {
                  if (a.task === 'teach_word') onNavigate(`/word-teaching/${encodeURIComponent(extractedWord.toLowerCase())}`)
                  else if (a.task === 'generate_dictation' || a.task === 'generate_quiz') showToast('小天正在生成内容，真实接口接入后可自动完成')
                  else showToast('小天正在为你处理「' + a.title + '」')
                },
              }))} />
            </div>
          )}
        </>
      )}

      {/* ═══════════════════════ LEARNING STATUS ═══════════ */}
      {isLearning && (
        <>
          {/* Conclusion */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3">
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

          {/* Problems */}
          <div>
            <SectionTitle color="red" title="问题定位" />
            <div className="space-y-1">
              {[
                '词汇拼写正确率 62%，呈下降趋势，需关注。',
                '阅读理解正确率 58%，低于班级平均，需安排专项训练。',
                '完成率下降主要集中在周末布置的练习。',
              ].map((p, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[10px] text-slate-600">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-500 text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 小天可以帮你 */}
          <div>
            <SectionTitle color="blue" title="小天可以帮你" />
            <ActionGrid actions={[
              { label: '生成错词重练', desc: '自动筛选高频错词生成练习', onClick: () => showToast('小天正在生成错词重练练习') },
              { label: '推荐阅读理解专项', desc: '匹配当前单元阅读训练', onClick: () => showToast('已为你推荐阅读理解专项训练') },
              { label: '一键催交未完成学生', desc: '向未完成学生发送提醒', onClick: () => showToast('已发送催交提醒') },
              { label: '查看学生明细', desc: '查看每位学生的练习数据', onClick: () => showToast('学生明细功能将在后续版本接入') },
            ]} />
          </div>

          {/* Practice detail */}
          <div>
            <SectionTitle color="emerald" title="相关练习" />
            <div className="space-y-1">
              {[
                { title: 'Unit 3 词汇听写', done: 32, total: 43, rate: '68%', status: '已结束' },
                { title: '冲刺训练（四十一）', done: 1, total: 1, score: '7.5/50', status: '已结束' },
                { title: '个性化词汇练习', done: 2, total: 43, status: '进行中' },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 border-b border-[#f0f4f8] last:border-b-0">
                  <FileText size={12} className="text-[#8aabcc] shrink-0" />
                  <span className="text-[10px] text-slate-600 flex-1 truncate">{p.title}</span>
                  <span className="text-[9px] text-[#8aabcc] whitespace-nowrap">{'done' in p ? `${p.done}/${p.total}人` : ''}</span>
                  <span className="text-[9px] text-[#8aabcc] whitespace-nowrap">{p.status}</span>
                  <button onClick={() => showToast('已打开「' + p.title + '」报告')} className="text-[9px] text-[#4b9fe8] hover:underline whitespace-nowrap">查看报告</button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════════ WRONG WORD ═══════════════ */}
      {isWrong && (
        <>
          <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-3">
            <SectionTitle color="red" title="问题结论" />
            <p className="text-[11px] text-slate-700 leading-relaxed mb-2">本周首次进入错词本的词占比达到<span className="text-red-500 font-medium"> 32%</span>，assist、directly、outline 等词错误率较高。</p>
            <MetricRow items={[
              { label: '首次错词占比', value: '32%' },
              { label: '错词总数', value: '23 个' },
              { label: '涉及学生', value: '8 人' },
              { label: '高错误率词', value: '5 个' },
            ]} />
          </div>

          {/* High risk words */}
          <div>
            <SectionTitle color="red" title="高风险词" />
            <div className="flex items-center gap-1.5 flex-wrap">
              {['assist', 'directly', 'outline', 'title', 'absorb'].map((w) => (
                <span key={w} className="text-[10px] font-medium text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full whitespace-nowrap">{w} 100%</span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <SectionTitle color="blue" title="小天可以帮你" />
            <ActionGrid actions={[
              { label: '生成默写练习', desc: '基于高频错词自动出题', onClick: () => showToast('小天正在生成默写练习') },
              { label: '布置听写', desc: '将错词推送给学生听写', onClick: () => showToast('已打开布置确认') },
              { label: '导出错词', desc: '导出错词列表PDF/Excel', onClick: () => showToast('导出功能将在后续版本接入') },
              { label: '查看学生', desc: '查看错词学生明细', onClick: () => showToast('学生明细功能将在后续版本接入') },
            ]} />
          </div>

          {/* Word list */}
          <div>
            <SectionTitle color="emerald" title="错词明细" />
            <div className="space-y-0.5">
              {['assist', 'directly', 'outline', 'title', 'absorb'].map((w, i) => (
                <div key={i} className="flex items-center gap-2 py-1 border-b border-dashed border-[#f0f4f8] last:border-b-0">
                  <span className="text-[10px] font-medium text-slate-700">{w}</span>
                  <span className="text-[9px] text-red-500">错误率 100%</span>
                  <span className="text-[9px] text-[#8aabcc] ml-auto">来源 Unit 3 测验</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════════ GENERATE TASK ═══════════════ */}
      {isGen && (
        <>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-3">
            <SectionTitle color="blue" title="任务理解" />
            <p className="text-[11px] text-slate-700 leading-relaxed mb-2">小天理解你要生成：<span className="text-[#4b9fe8] font-medium">{query}</span></p>
            <p className="text-[10px] text-slate-500">基于当前教学上下文：{context.textbook} · {context.unit}</p>
          </div>

          <div className="bg-white border border-[#e8eef4] rounded-xl p-3">
            <SectionTitle color="emerald" title="生成预览" />
            <div className="space-y-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2 py-1 border-b border-dashed border-[#f0f4f8] last:border-b-0">
                  <span className="text-[9px] text-[#8aabcc] w-5">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[10px] text-slate-500">题目 {i + 1} 预览占位</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle color="blue" title="小天可以帮你" />
            <ActionGrid actions={[
              { label: '确认布置', desc: '布置该练习给学生', onClick: () => showToast('已打开布置确认面板') },
              { label: '加入练习篮', desc: '暂存练习篮稍后布置', onClick: () => showToast('已加入练习篮') },
              { label: '调整内容', desc: '修改题目内容或分值', onClick: () => showToast('编辑功能将在后续版本接入') },
              { label: '重新生成', desc: '按新参数重新生成', onClick: () => showToast('小天正在重新生成') },
            ]} />
          </div>
        </>
      )}

      {/* ═══════════════════════ RESOURCE SEARCH (default) ═══════════ */}
      {!isWord && !isLearning && !isWrong && !isGen && (
        <>
          {/* Summary + recommendation */}
          <div className="bg-white rounded-xl border border-[#e8eef4] p-3">
            <SectionTitle color="emerald" title="资源摘要" />
            <p className="text-[9px] text-[#8aabcc] mb-1.5">当前上下文：{context.textbook} · {context.unit} — Food and Drinks</p>
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              <MetricRow items={[
                { label: '共找到', value: String(resources.length) + ' 个' },
                { label: '资源类型', value: String(resourceTypes.length) + ' 种' },
                { label: '推荐', value: String(Math.min(resources.length, 5)) + ' 条' },
              ]} />
            </div>
            {resourceTypes.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap mb-2">
                {resourceTypes.slice(0, 7).map((t) => (
                  <span key={t} className="text-[8px] text-[#4b9fe8] bg-[#eaf2fb] px-1.5 py-0.5 rounded-full whitespace-nowrap">{resourceTypeLabels[t] || t}</span>
                ))}
              </div>
            )}
            {/* Recommendation reason */}
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
            {/* Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={() => onNavigate('/ai-search?query=' + encodeURIComponent(query) + '&autoRun=1')}
                className="inline-flex items-center gap-1 px-3 h-6.5 rounded-full bg-[#4b9fe8] text-white text-[10px] font-medium hover:bg-[#3a8fd8] transition-colors whitespace-nowrap">查看全部资源</button>
              <button onClick={() => showToast('已加入练习篮')}
                className="inline-flex items-center gap-1 px-3 h-6.5 rounded-full border border-[#b8d4f0] text-[10px] text-[#4b9fe8] hover:bg-[#eaf2fb] transition-colors whitespace-nowrap"><Plus size={10} />加入练习篮</button>
              <button onClick={() => showToast('已打开布置确认面板')}
                className="inline-flex items-center gap-1 px-3 h-6.5 rounded-full border border-[#b8d4f0] text-[10px] text-[#4b9fe8] hover:bg-[#eaf2fb] transition-colors whitespace-nowrap">一键布置推荐资源</button>
            </div>
          </div>

          {/* 小天可以帮你 */}
          {aiActions.length > 0 && (
            <div>
              <SectionTitle color="blue" title="小天可以帮你" />
              <ActionGrid actions={aiActions.slice(0, 4).map((a) => ({
                label: a.title, desc: a.description,
                onClick: () => {
                  if (a.task === 'teach_word') onNavigate(`/word-teaching/${encodeURIComponent(extractedWord.toLowerCase())}`)
                  else if (a.task === 'generate_dictation' || a.task === 'generate_quiz' || a.task === 'generate_exercise') showToast('小天正在生成内容')
                  else showToast('小天正在为你处理「' + a.title + '」')
                },
              }))} />
            </div>
          )}

          {/* Resource list */}
          {resources.length > 0 && (
            <div>
              <SectionTitle color="emerald" title={`推荐资源（共 ${resources.length} 个）`} />
              <div className="border border-[#e8eef4] rounded-lg overflow-hidden divide-y divide-[#f0f4f8]">
                {resources.slice(0, 5).map((r, i) => (
                  <CompactResourceItem key={i}
                    r={{ title: r.title, type: r.type, difficulty: r.difficulty, description: `${r.difficulty === 'basic' ? '基础' : r.difficulty === 'medium' ? '中等' : '进阶'} · ${resourceTypeLabels[r.type] || r.type}${r.duration ? ' · ' + r.duration : ''}` }}
                    onPreview={() => showToast('已打开「' + r.title + '」预览')}
                    onBasket={() => showToast('已加入练习篮')}
                    onAssign={() => showToast('已打开布置确认')}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

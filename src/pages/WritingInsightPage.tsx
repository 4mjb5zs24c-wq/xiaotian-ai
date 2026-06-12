import { useState, useRef, useMemo } from 'react'
import type { WritingInsightData, TimeRange } from '../ai/insights/writingInsightTypes'
import { REAL_DATA_MAP, AVAILABLE_CLASSES } from '../ai/insights/realDataMulti'
import {
  mockOpenFullEssay,
  mockOpenAnswerSheet,
  markAsReferenceEssay,
} from '../ai/insights/mockWritingInsight'
import {
  WritingInsightHeader,
  WritingAISummaryCard,
  WritingCoreMetricCards,
  WritingProblemTypeSection,
  HighFrequencyWritingIssuesSection,
  WeakWritingStudentsSection,
  ExcellentWritingSection,
  WritingInterventionRecordSection,
  SampleEssayGenerator,
  RecommendedWritingResourcesSection,
} from '../ai/components/writing-insight'
import type { WritingIssueItem, ExcellentWriting, GeneratedSample, RecommendedWritingResource } from '../ai/insights/writingInsightTypes'
import type { PaperBasketItem } from '../ai/search-new/types'
import { useAIStore } from '../ai/store'
import InsightSideNav from '../ai/components/InsightSideNav'
import { ChevronDown } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'writing-summary', label: 'AI 诊断总结' },
  { id: 'writing-metrics', label: '核心指标' },
  { id: 'writing-problem-types', label: '问题类型分布' },
  { id: 'writing-high-freq', label: '高频写作问题' },
  { id: 'writing-weak-students', label: '薄弱学生' },
  { id: 'writing-excellent', label: '优秀作文' },
  { id: 'writing-resources', label: '推荐写作资源' },
  { id: 'writing-intervention', label: '干预记录' },
]

const DEFAULT_CLASS = AVAILABLE_CLASSES[0]

export default function WritingInsightPage() {
  const [selectedClass, setSelectedClass] = useState<string>(DEFAULT_CLASS)

  const currentData: WritingInsightData = useMemo(
    () => REAL_DATA_MAP[selectedClass]?.writing ?? REAL_DATA_MAP[DEFAULT_CLASS].writing,
    [selectedClass],
  )

  const [timeRange, setTimeRange] = useState<TimeRange>('7d')
  const [showSampleGenerator, setShowSampleGenerator] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  // Paper basket
  const paperBasket = useAIStore((s) => s.paperBasket)
  const addToPaperBasket = useAIStore((s) => s.addToPaperBasket)

  const weakStudentsRef = useRef<HTMLDivElement>(null)
  const excellentRef = useRef<HTMLDivElement>(null)
  const resourcesRef = useRef<HTMLDivElement>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range)
    // Time range change is cosmetic — data doesn't change
  }

  // Full essay view
  const handleViewFullEssay = (idOrItem: string | WritingIssueItem) => {
    const id = typeof idOrItem === 'string' ? idOrItem : idOrItem.fullEssayId
    const result = mockOpenFullEssay(id)
    showToast(result.message)
  }

  // Answer sheet view
  const handleViewAnswerSheet = (urlOrItem: string | WritingIssueItem) => {
    const url = typeof urlOrItem === 'string' ? urlOrItem : urlOrItem.answerSheetImageUrl
    const result = mockOpenAnswerSheet(url)
    showToast(result.message)
  }

  // Mark as reference
  const handleMarkAsReference = (item: ExcellentWriting | GeneratedSample) => {
    const result = markAsReferenceEssay({ id: item.id, studentName: 'studentName' in item ? item.studentName : (item as GeneratedSample).title })
    showToast(result.message)
  }

  // Copy sample
  const handleCopySample = (_sample: GeneratedSample) => {
    showToast('范文已复制到剪贴板')
  }

  // Resource actions
  const handlePreviewResource = (r: RecommendedWritingResource) => {
    showToast(`已打开资源预览：${r.title}`)
  }

  const handleAssignResource = (r: RecommendedWritingResource) => {
    showToast(`已打开布置对话框：${r.title}`)
  }

  const handleAddToPaperBasket = (r: RecommendedWritingResource) => {
    const basketItem: PaperBasketItem = {
      id: `pb-wr-${r.id}-${Date.now()}`,
      resourceId: r.id,
      title: r.title,
      type: 'writing_practice',
      addedAt: Date.now(),
    }
    addToPaperBasket(basketItem)
  }

  const isInBasket = (r: RecommendedWritingResource) => paperBasket.some(pb => pb.resourceId === r.id)

  return (
    <div className="flex justify-center px-6">
      <InsightSideNav items={NAV_ITEMS} />
      <div className="flex-1 w-full py-5 space-y-4 max-w-[1600px]">
        {/* ── Class Switcher ── */}
        <div className="flex items-center justify-between">
          <WritingInsightHeader
            timeRange={timeRange}
            onTimeRangeChange={handleTimeRangeChange}
            className={currentData.className}
            updatedAt={currentData.updatedAt}
          />
          <div className="relative group">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-xl pl-3.5 pr-9 py-2 text-sm font-semibold text-slate-700
                hover:border-blue-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100
                cursor-pointer transition-all duration-200"
            >
              {AVAILABLE_CLASSES.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div id="writing-summary">
          <WritingAISummaryCard
            summary={currentData.summary}
            mainProblemTypes={currentData.problemTypes.slice(0, 3).map(p => p.label)}
            affectedStudentCount={currentData.metrics.weakStudentCount}
            onRecommendResources={() => resourcesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            onGenerateSamples={() => setShowSampleGenerator(true)}
          />
        </div>

        <div id="writing-metrics">
          <WritingCoreMetricCards
            metrics={currentData.metrics}
            onWeakStudentsClick={() => weakStudentsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            onExcellentClick={() => excellentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          />
        </div>

        <div id="writing-problem-types">
          <WritingProblemTypeSection problemTypes={currentData.problemTypes} />
        </div>

        <div id="writing-high-freq">
          <HighFrequencyWritingIssuesSection
            issueGroups={currentData.highFrequencyIssues}
            onViewFullEssay={handleViewFullEssay}
            onViewAnswerSheet={handleViewAnswerSheet}
          />
        </div>

        <div id="writing-weak-students" ref={weakStudentsRef}>
          <WeakWritingStudentsSection
            students={currentData.weakStudents}
            onViewFullEssay={handleViewFullEssay}
            onViewAnswerSheet={handleViewAnswerSheet}
          />
        </div>

        <div id="writing-excellent" ref={excellentRef}>
          <ExcellentWritingSection
            writings={currentData.excellentWritings}
            onViewFullEssay={handleViewFullEssay}
            onViewAnswerSheet={handleViewAnswerSheet}
            onMarkAsReference={handleMarkAsReference}
          />
        </div>

        <div id="writing-resources" ref={resourcesRef}>
          <RecommendedWritingResourcesSection
            resources={currentData.recommendedResources}
            onPreview={handlePreviewResource}
            onAssign={handleAssignResource}
            onAddToPaperBasket={handleAddToPaperBasket}
            isInBasket={isInBasket}
          />
        </div>

        <div id="writing-intervention">
          <WritingInterventionRecordSection records={[]} />
        </div>

        {showSampleGenerator && (
          <SampleEssayGenerator
            samples={currentData.generatedSamples}
            onClose={() => setShowSampleGenerator(false)}
            onMarkAsReference={handleMarkAsReference}
            onCopy={handleCopySample}
          />
        )}

        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] bg-slate-800 text-white text-sm px-5 py-2.5 rounded-xl shadow-lg">
            {toast}
          </div>
        )}
      </div>
    </div>
  )
}

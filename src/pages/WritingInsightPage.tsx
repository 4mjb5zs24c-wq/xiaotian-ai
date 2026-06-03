import { useState, useRef } from 'react'
import type { WritingInsightData, TimeRange } from '../ai/insights/writingInsightTypes'
import { MOCK_WRITING_INSIGHT, MOCK_WRITING_INTERVENTION_RECORDS } from '../ai/insights/mockWritingInsight'
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

export default function WritingInsightPage() {
  const [data, setData] = useState<WritingInsightData>(MOCK_WRITING_INSIGHT)
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
    setData({ ...data, timeRange: range })
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
        <WritingInsightHeader
          timeRange={timeRange}
          onTimeRangeChange={handleTimeRangeChange}
          className={data.className}
          updatedAt={data.updatedAt}
        />

        <div id="writing-summary">
          <WritingAISummaryCard
            summary={data.summary}
            mainProblemTypes={data.problemTypes.slice(0, 3).map(p => p.label)}
            affectedStudentCount={data.metrics.weakStudentCount}
            onRecommendResources={() => resourcesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            onGenerateSamples={() => setShowSampleGenerator(true)}
          />
        </div>

        <div id="writing-metrics">
          <WritingCoreMetricCards
            metrics={data.metrics}
            onWeakStudentsClick={() => weakStudentsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            onExcellentClick={() => excellentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          />
        </div>

        <div id="writing-problem-types">
          <WritingProblemTypeSection problemTypes={data.problemTypes} />
        </div>

        <div id="writing-high-freq">
          <HighFrequencyWritingIssuesSection
            issueGroups={data.highFrequencyIssues}
            onViewFullEssay={handleViewFullEssay}
            onViewAnswerSheet={handleViewAnswerSheet}
          />
        </div>

        <div id="writing-weak-students" ref={weakStudentsRef}>
          <WeakWritingStudentsSection
            students={data.weakStudents}
            onViewFullEssay={handleViewFullEssay}
            onViewAnswerSheet={handleViewAnswerSheet}
          />
        </div>

        <div id="writing-excellent" ref={excellentRef}>
          <ExcellentWritingSection
            writings={data.excellentWritings}
            onViewFullEssay={handleViewFullEssay}
            onViewAnswerSheet={handleViewAnswerSheet}
            onMarkAsReference={handleMarkAsReference}
          />
        </div>

        <div id="writing-resources" ref={resourcesRef}>
          <RecommendedWritingResourcesSection
            resources={data.recommendedResources}
            onPreview={handlePreviewResource}
            onAssign={handleAssignResource}
            onAddToPaperBasket={handleAddToPaperBasket}
            isInBasket={isInBasket}
          />
        </div>

        <div id="writing-intervention">
          <WritingInterventionRecordSection records={MOCK_WRITING_INTERVENTION_RECORDS} />
        </div>

        {showSampleGenerator && (
          <SampleEssayGenerator
            samples={data.generatedSamples}
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

import { useState, useRef } from 'react'
import type { VocabularyInsightData, TimeRange, VocabularyErrorType } from '../ai/insights/vocabularyInsightTypes'
import { MOCK_VOCABULARY_INSIGHT, MOCK_INTERVENTION_RECORDS } from '../ai/insights/mockVocabularyInsight'
import { filterVocabularyItems } from '../ai/insights/vocabularyDataFilter'
import VocabularyInsightHeader from '../ai/components/vocabulary-insight/VocabularyInsightHeader'
import AISummaryCard from '../ai/components/vocabulary-insight/AISummaryCard'
import CoreMetricCards from '../ai/components/vocabulary-insight/CoreMetricCards'
import ErrorTypeInsightSection from '../ai/components/vocabulary-insight/ErrorTypeInsightSection'
import FrequentWeakWordsSection from '../ai/components/vocabulary-insight/FrequentWeakWordsSection'
import StudentInsightSection from '../ai/components/vocabulary-insight/StudentInsightSection'
import SelectedActionBar from '../ai/components/vocabulary-insight/SelectedActionBar'
import InterventionRecordSection from '../ai/components/vocabulary-insight/InterventionRecordSection'
import ReviewPlanWizard from '../ai/components/vocabulary-insight/ReviewPlanWizard'
import InsightSideNav from '../ai/components/InsightSideNav'

const NAV_ITEMS = [
  { id: 'vocab-summary', label: 'AI 诊断总结' },
  { id: 'vocab-metrics', label: '核心指标' },
  { id: 'vocab-error-types', label: '错误类型分布' },
  { id: 'vocab-weak-words', label: '高频错词 / 语块' },
  { id: 'vocab-students', label: '学生洞察' },
  { id: 'vocab-intervention', label: '干预记录' },
]

export default function VocabularyInsightPage() {
  const [data, setData] = useState<VocabularyInsightData>(MOCK_VOCABULARY_INSIGHT)
  const [timeRange, setTimeRange] = useState<TimeRange>('7d')
  const [selectedErrorType, setSelectedErrorType] = useState<VocabularyErrorType | null>(null)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [expandedWordId, setExpandedWordId] = useState<string | null>(null)
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null)
  const [showAllWords, setShowAllWords] = useState(false)
  const [showAllWeakStudents, setShowAllWeakStudents] = useState(false)
  const [showReviewPlan, setShowReviewPlan] = useState(false)

  const filteredWeakWords = filterVocabularyItems(data.weakWords)
  const displayWords = selectedErrorType
    ? filteredWeakWords.filter(w => w.mainErrorType === selectedErrorType)
    : filteredWeakWords

  const wordsSectionRef = useRef<HTMLDivElement>(null)
  const studentsSectionRef = useRef<HTMLDivElement>(null)

  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range)
    setData({ ...data, timeRange: range })
  }

  const handleErrorTypeClick = (type: VocabularyErrorType) => {
    setSelectedErrorType(prev => prev === type ? null : type)
  }

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleStudentSelection = (_id: string) => {}

  const selectAllFiltered = () => setSelectedItems(new Set(displayWords.map(w => w.id)))
  const clearSelection = () => setSelectedItems(new Set())

  const handleOpenReviewPlan = () => setShowReviewPlan(true)

  const handleMockAction = (action: string) => {
    const msgs: Record<string, string> = {
      '默写': '已打开教师端现有默写功能',
      '课后PK': '已打开教师端课后PK功能',
      '课后领读': '已打开教师端课后领读功能',
      '组卷': '已打开教师端组卷功能',
      '讲词': '已打开教师端讲词页面',
      '听写': '已打开教师端听写功能',
    }
    alert(msgs[action] || `已打开：${action}`)
  }

  return (
    <div className="flex justify-center px-6">
      <InsightSideNav items={NAV_ITEMS} />
      <div className="flex-1 w-full py-5 space-y-4 max-w-[1600px]">
        <VocabularyInsightHeader
          timeRange={timeRange}
          onTimeRangeChange={handleTimeRangeChange}
          className={data.className}
          updatedAt={data.updatedAt}
        />

        <div id="vocab-summary">
          <AISummaryCard
            summary={data.summary}
            onReviewPlan={handleOpenReviewPlan}
            onMockAction={handleMockAction}
          />
        </div>

        <div id="vocab-metrics">
          <CoreMetricCards
            metrics={data.metrics}
            onWeakWordsClick={() => wordsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            onWeakStudentsClick={() => {
              studentsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          />
        </div>

        <div id="vocab-error-types">
          <ErrorTypeInsightSection errorTypes={data.errorTypes} />
        </div>

        <div id="vocab-weak-words" ref={wordsSectionRef}>
          <FrequentWeakWordsSection
            words={displayWords}
            allWords={filteredWeakWords}
            selectedIds={selectedItems}
            selectedErrorType={selectedErrorType}
            showAll={showAllWords}
            expandedWordId={expandedWordId}
            errorTypes={data.errorTypes.map(et => ({ type: et.type, label: et.label }))}
            onToggleShowAll={() => setShowAllWords(!showAllWords)}
            onToggleWord={toggleItemSelection}
            onSelectAll={selectAllFiltered}
            onClearSelection={() => setSelectedItems(new Set())}
            onExpandWord={id => setExpandedWordId(expandedWordId === id ? null : id)}
            onErrorTypeFilter={handleErrorTypeClick}
            onMockAction={handleMockAction}
            onReviewPlan={handleOpenReviewPlan}
          />
        </div>

        <div id="vocab-students" ref={studentsSectionRef}>
          <StudentInsightSection
            weakStudents={data.weakStudents}
            goodStudents={data.goodStudents}
            selectedIds={new Set()}
            showAllWeak={showAllWeakStudents}
            expandedStudentId={expandedStudentId}
            onToggleShowAllWeak={() => setShowAllWeakStudents(!showAllWeakStudents)}
            onToggleStudent={toggleStudentSelection}
            onExpandStudent={id => setExpandedStudentId(expandedStudentId === id ? null : id)}
            onMockAction={handleMockAction}
            onReviewPlan={handleOpenReviewPlan}
          />
        </div>

        <div id="vocab-intervention">
          <InterventionRecordSection records={MOCK_INTERVENTION_RECORDS} />
        </div>

        <SelectedActionBar
          selectedWordCount={selectedItems.size}
          selectedStudentCount={0}
          onClear={clearSelection}
          onMockAction={handleMockAction}
          onReviewPlan={handleOpenReviewPlan}
        />

        {showReviewPlan && (
          <ReviewPlanWizard onClose={() => setShowReviewPlan(false)} />
        )}
      </div>
    </div>
  )
}

import { HashRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import WrongWordPage from './pages/WrongWordPage'
import WrongQuestionPage from './pages/WrongQuestionPage'
import ReportPage from './pages/ReportPage'
import PracticeReportPage from './pages/PracticeReportPage'
import WritingPage from './pages/WritingPage'
import ListeningPage from './pages/ListeningPage'
import ResourcePage from './pages/ResourcePage'
import SearchPage from './pages/SearchPage'
import SyncTeachingPage from './pages/SyncTeachingPage'
import ExamReviewPage from './pages/ExamReviewPage'
import WritingPracticePage from './pages/WritingPracticePage'
import VocabularyPkPage from './pages/VocabularyPkPage'
import AssignSyncPage from './pages/AssignSyncPage'
import AssignSpecialPage from './pages/AssignSpecialPage'
import AssignMockPage from './pages/AssignMockPage'
import AssignDubbingPage from './pages/AssignDubbingPage'
import AssignVideoPage from './pages/AssignVideoPage'
import AssignAfterClassPkPage from './pages/AssignAfterClassPkPage'
import AssignPaperCardPage from './pages/AssignPaperCardPage'
import AssignCustomReviewPage from './pages/AssignCustomReviewPage'
import AssignReadingPage from './pages/AssignReadingPage'
import ManualComposePage from './pages/ManualComposePage'
import WordTeachingPage from './pages/WordTeachingPage'
import VocabularyInsightPage from './pages/VocabularyInsightPage'
import WritingInsightPage from './pages/WritingInsightPage'
import StageVocabPlanPage from './pages/StageVocabPlanPage'
import VocabPlanReportPage from './pages/VocabPlanReportPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="wrong-words" element={<WrongWordPage />} />
          <Route path="wrong-questions" element={<WrongQuestionPage />} />
          <Route path="reports" element={<ReportPage />} />
          <Route path="practice-reports" element={<PracticeReportPage />} />
          <Route path="writing" element={<WritingPage />} />
          <Route path="listening" element={<ListeningPage />} />
          <Route path="resources" element={<ResourcePage />} />
          <Route path="sync-teaching" element={<SyncTeachingPage />} />
          <Route path="exam-review" element={<ExamReviewPage />} />
          <Route path="writing-practice" element={<WritingPracticePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="ai-search" element={<SearchPage />} />
          <Route path="manual-compose" element={<ManualComposePage />} />
          <Route path="vocabulary-insight" element={<VocabularyInsightPage />} />
          <Route path="writing-insight" element={<WritingInsightPage />} />
          <Route path="stage-vocab-plan" element={<StageVocabPlanPage />} />
          <Route path="vocab-plan-report/:planId" element={<VocabPlanReportPage />} />
        </Route>
        {/* Immersive pages — no sidebar */}
        <Route path="vocabulary-pk" element={<VocabularyPkPage />} />
        <Route path="assign-sync" element={<AssignSyncPage />} />
        <Route path="assign-special" element={<AssignSpecialPage />} />
        <Route path="assign-mock" element={<AssignMockPage />} />
        <Route path="assign-dubbing" element={<AssignDubbingPage />} />
        <Route path="assign-video" element={<AssignVideoPage />} />
        <Route path="assign-after-class-pk" element={<AssignAfterClassPkPage />} />
        <Route path="assign-paper-card" element={<AssignPaperCardPage />} />
        <Route path="assign-custom-review" element={<AssignCustomReviewPage />} />
        <Route path="assign-reading" element={<AssignReadingPage />} />
        <Route path="word-teaching/:word" element={<WordTeachingPage />} />
      </Routes>
    </HashRouter>
  )
}

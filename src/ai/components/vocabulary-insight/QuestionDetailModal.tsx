import { X, FileText, User, Clock, Hash, Users } from 'lucide-react'

/**
 * 查看原题弹窗 — 复用平台已有样式
 * 展示学生在该词上的原始作答题目
 */

interface QuestionDetail {
  id: string
  /** 题目内容 */
  content: string
  /** 题型 */
  questionType: string
  /** 练习名称 */
  exerciseName: string
  /** 学生作答 */
  studentAnswer: string
  /** 正确答案 */
  correctAnswer: string
  /** 解析 */
  analysis?: string
}

interface Props {
  open: boolean
  onClose: () => void
  word: string
  studentName: string
  date: string
  errorLabel: string
  question: QuestionDetail
  /** 该词总错误次数 */
  errorCount?: number
  /** 受该词影响的学生总数 */
  affectedStudentCount?: number
}

const MOCK_QUESTION_LIBRARY: Record<string, QuestionDetail[]> = {
  'inspire': [
    {
      id: 'q-001',
      content: 'The teacher tried to ______ her students to think creatively.\nA. inspire  B. require  C. acquire  D. admire',
      questionType: '听取信息题（组合）',
      exerciseName: '冲刺训练（十二）',
      studentAnswer: 'C. acquire',
      correctAnswer: 'A. inspire',
      analysis: 'inspire 意为"激励、鼓舞"，符合句意"老师试图激励学生创造性思考"。require 意为"要求"，acquire 意为"获得"，admire 意为"钦佩"。',
    },
    {
      id: 'q-002',
      content: '听对话，选出说话人正在描述的词：\n\n(音频内容：Someone who makes you want to do something creative or positive.)',
      questionType: '听取信息题（组合）',
      exerciseName: '单元检测（Unit 3）',
      studentAnswer: 'inspier',
      correctAnswer: 'inspire',
    },
  ],
  'restaurant': [
    {
      id: 'q-003',
      content: 'They had dinner at a French ______ last night.\nA. restaurant  B. hotel  C. hospital  D. bookstore',
      questionType: '词义选择',
      exerciseName: '阶段检测（十一）',
      studentAnswer: 'B. hotel',
      correctAnswer: 'A. restaurant',
      analysis: 'restaurant 是"餐厅"，与 dinner（晚餐）最匹配。hotel 是"酒店"。',
    },
  ],
  'delicious': [
    {
      id: 'q-004',
      content: '听对话，选出描述食物口感的正确词：\n\n(音频内容：This cake tastes very good and I want more.)',
      questionType: '听取信息题（组合）',
      exerciseName: '单元检测（Unit 3）',
      studentAnswer: 'delisious',
      correctAnswer: 'delicious',
      analysis: 'delicious 意为"美味的"。注意拼写：d-e-l-i-c-i-o-u-s，学生常将第二个 i 写成其他字母。',
    },
  ],
  'efficiency': [
    {
      id: 'q-005',
      content: 'Improving work ______ is an important goal for the company.\nA. efficiency  B. effect  C. effort  D. evidence',
      questionType: '词义选择',
      exerciseName: '阶段检测（十）',
      studentAnswer: 'efficency',
      correctAnswer: 'efficiency',
      analysis: 'efficiency 意为"效率"，注意拼写：e-f-f-i-c-i-e-n-c-y。effort 意为"努力"。',
    },
  ],
  _default: [
    {
      id: 'q-default',
      content: 'Please complete the sentence with the correct word:\nThe main ______ of this book is about friendship.',
      questionType: '单词填空',
      exerciseName: '课堂练习（Unit 3）',
      studentAnswer: '(未作答)',
      correctAnswer: 'theme',
      analysis: 'theme 意为"主题"。此题为课内语篇填空练习。',
    },
  ],
}

export default function QuestionDetailModal({ open, onClose, word, studentName, date, errorLabel, question, errorCount, affectedStudentCount }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[220] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[560px] max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-5 py-4 border-b border-[#f0f4f8] flex items-start justify-between rounded-t-2xl">
          <div>
            <h3 className="text-sm font-bold text-slate-800">原题详情</h3>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 flex-wrap">
              <span>{word}</span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-0.5"><User size={9} />{studentName}</span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-0.5"><Clock size={9} />日期：{date}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors shrink-0">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Meta row */}
          <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap">
            <span className="px-2 py-0.5 rounded border border-slate-200 text-slate-500">{errorLabel}</span>
            <span className="flex items-center gap-1"><FileText size={9} />{question.exerciseName}</span>
            <span>{question.questionType}</span>
            {errorCount != null && (
              <>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1"><Hash size={9} />错误次数：{errorCount} 次</span>
              </>
            )}
            {affectedStudentCount != null && (
              <>
                <span className="text-slate-300">|</span>
                <span className="flex items-center gap-1"><Users size={9} />受影响学生：{affectedStudentCount} 人</span>
              </>
            )}
          </div>

          {/* Question */}
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">原题内容</p>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <pre className="text-[12px] text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                {question.content}
              </pre>
            </div>
          </div>

          {/* Student answer */}
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">学生作答</p>
            <div className="bg-red-50 rounded-lg px-4 py-2.5 border border-red-100">
              <span className="text-[13px] font-medium text-red-500">{question.studentAnswer}</span>
            </div>
          </div>

          {/* Correct answer */}
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">正确答案</p>
            <div className="bg-emerald-50 rounded-lg px-4 py-2.5 border border-emerald-100">
              <span className="text-[13px] font-medium text-emerald-600">{question.correctAnswer}</span>
            </div>
          </div>

          {/* Analysis */}
          {question.analysis && (
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">解析</p>
              <div className="bg-blue-50 rounded-lg px-4 py-2.5 border border-blue-100">
                <p className="text-[12px] text-slate-600 leading-relaxed">{question.analysis}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/** Get mock question detail for a given word */
export function getMockQuestionDetail(wordText: string): { question: QuestionDetail; errorLabel: string } {
  const questions = MOCK_QUESTION_LIBRARY[wordText] || MOCK_QUESTION_LIBRARY._default
  const q = questions[0] // Use first available question
  return {
    question: q,
    errorLabel: wordText === 'inspire' ? '读不准' : wordText === 'restaurant' ? '读不准' : wordText === 'delicious' ? '读不准' : wordText === 'efficiency' ? '不会写' : '不会写',
  }
}

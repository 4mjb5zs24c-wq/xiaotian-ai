import SpecializedInsightEntry from '../ai/components/SpecializedInsightEntry'

const mockEssays = [
  {
    id: 1,
    student: '张小明',
    title: 'My School Day',
    status: '已批改',
    score: 78,
    date: '2026-05-25',
    snippet: 'I get up at 6:30. Then I go to school by bus. My favorite subject is English because it is interesting...',
    issues: [
      { type: '语法', text: 'because it is interesting → 建议用 finds it interesting', color: 'red' },
      { type: '拼写', text: 'favorite → favourite (英式拼写不一致)', color: 'orange' },
      { type: '表达', text: '句式单一，建议合并短句，使用连接词', color: 'blue' },
    ],
  },
  {
    id: 2,
    student: '李华',
    title: 'My School Day',
    status: '已批改',
    score: 65,
    date: '2026-05-25',
    snippet: 'I go to school every day. I have many class. I like play basketball after school...',
    issues: [
      { type: '语法', text: 'many class → many classes（名词单复数）', color: 'red' },
      { type: '语法', text: 'like play → like playing / like to play', color: 'red' },
      { type: '搭配', text: 'have class → have classes / attend classes', color: 'yellow' },
    ],
  },
  {
    id: 3,
    student: '王小红',
    title: 'My Weekend',
    status: '待批改',
    score: null,
    date: '2026-05-26',
    snippet: 'On weekend, I usually go to the park with my family. We have picnic and play games...',
    issues: [],
  },
  {
    id: 4,
    student: '赵明',
    title: 'My Weekend',
    status: '待批改',
    score: null,
    date: '2026-05-26',
    snippet: 'Last weekend I went to the zoo with my friends. We saw many animals...',
    issues: [],
  },
]

const typeLabel: Record<string, string> = {
  '语法': 'bg-red-50 text-red-600',
  '拼写': 'bg-orange-50 text-orange-600',
  '表达': 'bg-blue-50 text-blue-600',
  '搭配': 'bg-yellow-50 text-yellow-600',
}

export default function WritingPage() {
  return (
    <div className="space-y-6">
      {/* Specialized Insight Entry */}
      <SpecializedInsightEntry type="writing" />

      {/* Essay list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockEssays.map((essay) => (
          <div
            key={essay.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Card header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-slate-800">
                  {essay.title}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {essay.student} · {essay.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {essay.status === '已批改' ? (
                  <>
                    <span className="text-lg font-bold text-slate-800">
                      {essay.score}
                    </span>
                    <span className="text-xs text-slate-400">分</span>
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-600">
                      已批改
                    </span>
                  </>
                ) : (
                  <button className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700">
                    开始批改
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="px-5 py-4">
              <p className="text-sm text-slate-600 line-clamp-3">
                {essay.snippet}
              </p>
            </div>

            {/* Issues */}
            {essay.issues.length > 0 && (
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
                <div className="flex flex-wrap gap-2">
                  {essay.issues.map((issue, i) => (
                    <div
                      key={i}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${typeLabel[issue.type] || 'bg-slate-100 text-slate-500'}`}
                      title={issue.text}
                    >
                      <span className="text-[10px] opacity-70">{issue.type}</span>
                      <span className="max-w-[160px] truncate">{issue.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Upload area */}
      <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer">
        <div className="text-slate-400 mb-2">
          <svg className="mx-auto mb-3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className="text-sm text-slate-500">拖拽或点击上传学生作文</p>
          <p className="text-xs text-slate-400 mt-1">支持图片（JPG/PNG）和文本（DOC/PDF）</p>
        </div>
      </div>
    </div>
  )
}

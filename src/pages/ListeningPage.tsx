import SpecializedInsightEntry from '../ai/components/SpecializedInsightEntry'

const mockMaterials = [
  { id: 1, title: 'Unit 3 单词朗读', type: '单词', duration: '2:30', unit: 'Unit 3', level: '基础' },
  { id: 2, title: 'Food and Drinks 对话', type: '对话', duration: '4:15', unit: 'Unit 3', level: '基础' },
  { id: 3, title: 'At the Restaurant', type: '场景', duration: '3:45', unit: 'Unit 3', level: '进阶' },
  { id: 4, title: 'Food Culture in the UK', type: '文化', duration: '5:20', unit: 'Unit 3', level: '进阶' },
  { id: 5, title: 'BBC Learning: Ordering Food', type: '视频', duration: '6:10', unit: 'Unit 3', level: '拓展' },
  { id: 6, title: 'The History of Pizza', type: '阅读+音频', duration: '4:50', unit: 'Unit 3', level: '拓展' },
]

const typeStyles: Record<string, string> = {
  '单词': 'bg-blue-50 text-blue-600',
  '对话': 'bg-purple-50 text-purple-600',
  '场景': 'bg-emerald-50 text-emerald-600',
  '文化': 'bg-amber-50 text-amber-600',
  '视频': 'bg-pink-50 text-pink-600',
  '阅读+音频': 'bg-teal-50 text-teal-600',
}

export default function ListeningPage() {
  return (
    <div className="space-y-6">
      {/* Specialized Insight Entry */}
      <SpecializedInsightEntry type="listeningSpeaking" />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {['全部', '单词', '对话', '场景', '文化', '视频'].map((f) => (
          <button
            key={f}
            className="text-xs px-3 py-1.5 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            {f}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-slate-400">当前单元：</span>
          <select className="text-xs border border-slate-200 rounded-md px-2 py-1.5 text-slate-700 outline-none focus:border-indigo-400">
            <option>Unit 3 — Food and Drinks</option>
            <option>Unit 2 — My Family</option>
            <option>Unit 4 — Animals</option>
          </select>
        </div>
      </div>

      {/* Material cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockMaterials.map((m) => (
          <div
            key={m.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Cover area */}
            <div className="h-24 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/80 shadow-sm cursor-pointer hover:bg-white transition-colors">
                <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor" className="text-indigo-600 ml-0.5">
                  <path d="M0 0L16 9L0 18V0Z" />
                </svg>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${typeStyles[m.type] || 'bg-slate-100 text-slate-500'}`}>
                  {m.type}
                </span>
                <span className="text-[10px] text-slate-400">{m.level}</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-800 mb-1">{m.title}</h4>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{m.unit} · {m.duration}</span>
                <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                  打开
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Generate section */}
      <div className="bg-white border border-indigo-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <span className="text-base">✨</span>
          生成定制听力材料
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="输入主题或关键词，例如：餐厅点餐对话"
            className="flex-1 text-sm border border-slate-200 rounded-lg px-4 py-2.5 text-slate-700 placeholder-slate-400 outline-none focus:border-indigo-400"
          />
          <button className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shrink-0">
            生成
          </button>
        </div>
      </div>
    </div>
  )
}

import { useNavigate, useLocation } from 'react-router-dom'

const TAB_CONFIG = [
  { key: 'sync', label: '同步', path: '/assign-sync' },
  { key: 'special', label: '专项', path: '/assign-special' },
  { key: 'mock', label: '模拟', path: '/assign-mock' },
  { key: 'dubbing', label: '趣味配音', path: '/assign-dubbing' },
  { key: 'reading', label: '时文阅读', path: '/assign-reading' },
  { key: 'video', label: '主题视频', path: '/assign-video' },
  { key: 'after-class-pk', label: '课后PK', path: '/assign-after-class-pk' },
  { key: 'paper-card', label: '试卷/答题卡', path: '/assign-paper-card' },
  { key: 'custom-review', label: '自定义批改', path: '/assign-custom-review' },
]

const IMPLEMENTED = new Set(['sync', 'special', 'mock', 'dubbing', 'reading', 'video', 'after-class-pk', 'paper-card', 'custom-review'])

const PATH_TO_KEY: Record<string, string> = {
  '/assign-sync': 'sync',
  '/assign-special': 'special',
  '/assign-mock': 'mock',
  '/assign-dubbing': 'dubbing',
  '/assign-reading': 'reading',
  '/assign-video': 'video',
  '/assign-after-class-pk': 'after-class-pk',
  '/assign-paper-card': 'paper-card',
  '/assign-custom-review': 'custom-review',
}

export default function AssignPracticeTabs() {
  const navigate = useNavigate()
  const location = useLocation()
  const activeKey = PATH_TO_KEY[location.pathname] || 'sync'

  const handleTabClick = (tab: (typeof TAB_CONFIG)[number]) => {
    if (tab.key === activeKey) return
    if (IMPLEMENTED.has(tab.key)) {
      navigate(tab.path)
    } else {
      alert(`「${tab.label}」页面将在后续版本中接入`)
    }
  }

  return (
    <div className="shrink-0 bg-white border-b border-[#e4ecf3] px-8">
      <div className="flex items-center gap-6 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {TAB_CONFIG.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabClick(tab)}
            className={`relative py-3 text-[13px] font-semibold whitespace-nowrap transition-colors ${
              activeKey === tab.key ? 'text-[#4b9fe8]' : 'text-[#6b8aaa] hover:text-[#3a4f66]'
            }`}
          >
            {tab.label}
            {activeKey === tab.key && (
              <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#4b9fe8] rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

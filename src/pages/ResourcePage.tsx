import { useState } from 'react'
import {
  ChevronRight, Search, FolderPlus, Pencil, Trash2, FolderOpen,
  ChevronDown, Calendar, Play, ChevronLeft, BookOpen,
} from 'lucide-react'

// ── Types ──────────────────────────────────────────────

interface PrepItem {
  id: string
  sourceType: string
  sourceLabel: string
  title: string
  updatedAt: string
  isFolder: boolean
  folderCount?: number
  expanded?: boolean
  children?: PrepItem[]
  canEdit: boolean
  canDelete: boolean
  canTeach: boolean
}

// ── Source tag colors ──────────────────────────────────

const sourceColors: Record<string, { bg: string; text: string }> = {
  '配音达人': { bg: '#e6f7f0', text: '#1a9e6e' },
  '探发现': { bg: '#e6f0fb', text: '#3a7fd8' },
  '时文阅读': { bg: '#fde8ec', text: '#d94a6a' },
  '同步教学词汇': { bg: '#fef3e5', text: '#d98a3a' },
  '班级错词本': { bg: '#e6f5ee', text: '#2ea86e' },
}

function getSourceColor(type: string) {
  return sourceColors[type] || { bg: '#f0f4f8', text: '#5a7a9a' }
}

// ── Mock Data ──────────────────────────────────────────

const mockPrepItems: PrepItem[] = [
  { id: 'p01', sourceType: '配音达人', sourceLabel: '配音达人', title: '08/17 16:29 好汉不是当年勇', updatedAt: '2025-08-17 16:29:14', isFolder: false, canEdit: true, canDelete: true, canTeach: true },
  { id: 'p02', sourceType: '配音达人', sourceLabel: '配音达人', title: '08/17 17:25 人生就像一盒巧克力', updatedAt: '2025-08-17 17:25:13', isFolder: false, canEdit: true, canDelete: true, canTeach: true },
  { id: 'p03', sourceType: '配音达人', sourceLabel: '配音达人', title: '08/17 17:25 人生就像一盒巧克力', updatedAt: '2025-08-17 17:25:13', isFolder: false, canEdit: true, canDelete: true, canTeach: true },
  { id: 'p04', sourceType: '探发现', sourceLabel: '探发现', title: '07/03 13:54 泰山', updatedAt: '2025-07-03 13:54:57', isFolder: false, canEdit: true, canDelete: true, canTeach: true },
  {
    id: 'folder-01', sourceType: '', sourceLabel: '', title: '高三5班', updatedAt: '', isFolder: true, folderCount: 3, expanded: false,
    canEdit: false, canDelete: false, canTeach: false,
    children: [
      { id: 'p05', sourceType: '配音达人', sourceLabel: '配音达人', title: '10-13 18:26 好汉不是当年勇（Unit5·影视）', updatedAt: '2025-10-13 18:26:33', isFolder: false, canEdit: true, canDelete: true, canTeach: true },
      { id: 'p06', sourceType: '时文阅读', sourceLabel: '时文阅读', title: '科学家发现1.55亿年前"消失的"大陆', updatedAt: '2025-06-22 11:29:48', isFolder: false, canEdit: true, canDelete: true, canTeach: true },
      { id: 'p07', sourceType: '同步教学词汇', sourceLabel: '同步教学词汇', title: '05.24 15:18 听默写', updatedAt: '2025-05-24 15:18:32', isFolder: false, canEdit: true, canDelete: true, canTeach: true },
    ],
  },
  { id: 'p08', sourceType: '同步教学词汇', sourceLabel: '同步教学词汇', title: '10.09 09:48 领读', updatedAt: '2025-10-09 09:48:22', isFolder: false, canEdit: true, canDelete: true, canTeach: true },
  { id: 'p09', sourceType: '班级错词本', sourceLabel: '班级错词本', title: '03-18 14:36 听写', updatedAt: '2025-03-18 14:36:11', isFolder: false, canEdit: true, canDelete: true, canTeach: true },
  { id: 'p10', sourceType: '配音达人', sourceLabel: '配音达人', title: '09/12 12:13 "年"的来历（一）', updatedAt: '2025-09-12 12:13:44', isFolder: false, canEdit: true, canDelete: true, canTeach: true },
  { id: 'p11', sourceType: '配音达人', sourceLabel: '配音达人', title: '09/12 12:13 立春，二十四节气之首', updatedAt: '2025-09-12 12:13:44', isFolder: false, canEdit: true, canDelete: true, canTeach: true },
]

// ── Helpers ────────────────────────────────────────────

function flatItems(items: PrepItem[]): PrepItem[] {
  const result: PrepItem[] = []
  for (const item of items) {
    result.push(item)
    if (item.isFolder && item.expanded && item.children) {
      result.push(...item.children)
    }
  }
  return result
}

// ── Main Component ─────────────────────────────────────

export default function ResourcePage() {
  const [items, setItems] = useState<PrepItem[]>(mockPrepItems)
  const [searchQuery, setSearchQuery] = useState('')
  const [sourceFilter, setSourceFilter] = useState('全部')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const toggleFolder = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, expanded: !item.expanded }
        }
        return item
      }),
    )
  }

  const handleNewFolder = () => {
    alert('新建文件夹功能将在后续版本中接入')
  }

  const handleEdit = (id: string) => {
    alert(`编辑备课项 ${id}`)
  }

  const handleDelete = (id: string) => {
    const confirmed = window.confirm('确定要删除该备课项吗？')
    if (confirmed) {
      alert(`已删除备课项 ${id}`)
    }
  }

  const handleTeach = () => {
    alert(`上课功能将在后续版本中接入`)
  }

  const flatDisplay = flatItems(items)
  const totalCount = flatDisplay.length
  const filteredDisplay = flatDisplay.filter((item) => {
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="h-full flex flex-col min-h-0">
      {/* ── White Content Container ── */}
      <div className="flex flex-col flex-1 min-h-0 bg-white rounded-2xl border border-[#e8eef4] shadow-sm overflow-hidden">

        {/* ── Top: Breadcrumb + Title ── */}
        <div className="shrink-0 px-6 pt-5 pb-3">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-[11px] mb-2">
            <span className="text-[#8aabcc]">首页</span>
            <ChevronRight size={11} className="text-[#c0d4e8]" />
            <span className="text-[#3a4f66] font-semibold">我的备课</span>
          </div>

          {/* Title row */}
          <div className="flex items-baseline gap-3">
            <h2 className="text-[15px] font-semibold text-[#3a4f66]">
              我的备课列表（{totalCount}）
            </h2>
            <span className="text-[11px] text-[#8aabcc]">点击拖动位置</span>
          </div>
        </div>

        {/* ── Filter Bar ── */}
        <div className="shrink-0 px-6 pb-3 flex items-center justify-between gap-4 flex-wrap">
          {/* Left filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Source type */}
            <button
              onClick={() => {
                const opts = ['全部', '配音达人', '探发现', '时文阅读', '同步教学词汇', '班级错词本']
                const idx = opts.indexOf(sourceFilter)
                setSourceFilter(opts[(idx + 1) % opts.length])
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f4f7fa] border border-[#e4ecf3] text-[11px] text-[#4a6b8a] hover:border-[#b8d4f0] transition-colors"
            >
              来源类型
              <span className="text-[#3a4f66] font-medium">{sourceFilter}</span>
              <ChevronDown size={10} className="text-[#8aabcc]" />
            </button>

            {/* Join prep time label */}
            <span className="text-[11px] text-[#4a6b8a] font-medium">加入备课时间</span>

            {/* Date from */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#f4f7fa] border border-[#e4ecf3] text-[11px]">
              <Calendar size={11} className="text-[#8aabcc]" />
              <input
                type="text"
                placeholder="开始日期"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-[80px] bg-transparent text-[#3a4f66] placeholder-[#c0d4e8] outline-none text-[11px]"
              />
            </div>
            <span className="text-[10px] text-[#b8cde0]">至</span>
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#f4f7fa] border border-[#e4ecf3] text-[11px]">
              <Calendar size={11} className="text-[#8aabcc]" />
              <input
                type="text"
                placeholder="结束日期"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-[80px] bg-transparent text-[#3a4f66] placeholder-[#c0d4e8] outline-none text-[11px]"
              />
            </div>
          </div>

          {/* Right: search + new folder */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f4f7fa] border border-[#e4ecf3] focus-within:border-[#b8d4f0] transition-colors min-w-[200px]">
              <Search size={12} className="text-[#b0c8de] shrink-0" />
              <input
                type="text"
                placeholder="请输入备课名称"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-[11px] text-[#3a4f66] placeholder-[#c0d4e8] outline-none"
              />
            </div>
            <button
              onClick={handleNewFolder}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#4b9fe8] text-white text-[11px] font-medium rounded-lg hover:bg-[#3a8fd8] transition-colors shadow-sm whitespace-nowrap"
            >
              <FolderPlus size={13} />
              新建文件夹
            </button>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="shrink-0 border-t border-[#f0f4f8]" />

        {/* ── Prep List ── */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {filteredDisplay.map((item) => {
            if (item.isFolder) {
              return (
                <div key={item.id}>
                  <button
                    onClick={() => toggleFolder(item.id)}
                    className="w-full flex items-center px-6 py-3 hover:bg-[#fafbfc] transition-colors border-b border-[#f4f7fa]"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FolderOpen size={18} className="text-[#e8a83a] shrink-0" />
                      <span className="text-[13px] font-medium text-[#3a4f66]">{item.title}</span>
                      <span className="text-[11px] text-[#8aabcc]">[{item.folderCount}个]</span>
                    </div>
                    <span className="text-[11px] text-[#4b9fe8] font-medium shrink-0">
                      {item.expanded ? '收起' : '展开'}
                    </span>
                  </button>
                </div>
              )
            }

            const colors = getSourceColor(item.sourceType)
            const isChild = item.id.startsWith('p0') && ['p05', 'p06', 'p07'].includes(item.id)

            return (
              <div
                key={item.id}
                className={`flex items-center px-6 py-3 hover:bg-[#fafbfc] transition-colors border-b border-[#f4f7fa] ${
                  isChild ? 'pl-12' : ''
                }`}
              >
                {/* Source tag */}
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md shrink-0 mr-3"
                  style={{ backgroundColor: colors.bg, color: colors.text }}
                >
                  {item.sourceLabel}
                </span>

                {/* Title */}
                <span className="flex-1 text-[12px] text-[#3a4f66] font-medium truncate min-w-0">
                  {item.title}
                </span>

                {/* Edit icon */}
                {item.canEdit && (
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="p-1 text-[#b8cde0] hover:text-[#4b9fe8] transition-colors shrink-0 mx-1"
                  >
                    <Pencil size={13} />
                  </button>
                )}

                {/* Update time */}
                <span className="text-[11px] text-[#8aabcc] shrink-0 mx-3 w-[140px] text-right">
                  {item.updatedAt}
                </span>

                {/* Delete icon */}
                {item.canDelete && (
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 text-[#b8cde0] hover:text-red-500 transition-colors shrink-0 mx-1"
                  >
                    <Trash2 size={13} />
                  </button>
                )}

                {/* Teach button */}
                {item.canTeach && (
                  <button
                    onClick={() => handleTeach()}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#4b9fe8] text-white text-[11px] font-medium rounded-full hover:bg-[#3a8fd8] transition-colors shrink-0 ml-2"
                  >
                    <Play size={10} />
                    上课
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Right Floating Button ── */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-20">
        <button className="flex flex-col items-center gap-0.5 px-2 py-3 bg-[#4b9fe8] text-white text-[10px] rounded-lg hover:bg-[#3a8fd8] transition-colors shadow-md writing-vertical">
          <BookOpen size={14} />
          <span style={{ writingMode: 'vertical-rl' }}>我的备课</span>
        </button>
        <button className="p-1 bg-white border border-[#e4ecf3] rounded-full text-[#8aabcc] hover:text-[#4a6b8a] shadow-sm transition-colors">
          <ChevronLeft size={12} />
        </button>
      </div>
    </div>
  )
}

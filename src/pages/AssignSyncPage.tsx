import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronDown, ShoppingBag, BookOpen, Plus, X } from 'lucide-react'
import AssignPracticeTabs from '../components/AssignPracticeTabs'

// ── Types ──────────────────────────────────────────────

interface VocabItem {
  id: string
  text: string
  selected: boolean
}

interface TopicData {
  topicId: string
  topicName: string
  curriculumWords: VocabItem[]
  nonCurriculumWords: VocabItem[]
  chunks: VocabItem[]
}

interface UnitData {
  unitId: string
  unitName: string
  expanded: boolean
  topics: TopicData[]
}

interface ExerciseType {
  id: string
  name: string
}

// ── Mock Data ──────────────────────────────────────────

const mockCurriculumWords = ['good', 'morning', 'I', 'am', 'welcome', 'to', 'China', 'thank', 'you', 'the', 'hello', 'are', 'yes', 'no', 'not', 'nice', 'meet', 'too', 'hi', 'Mr.', 'see', 'mom', 'this', 'is', 'my', 'teacher', 'how', 'do', 'dad', 'Miss', 'Ms.', 'afternoon', 'goodbye', 'bye', 'fine', 'and', 'OK', 'here'].map((w, i) => ({ id: `cw-${i}`, text: w, selected: false }))

const mockNonCurriculumWords = ['USA', 'UK', 'oh', 'thanks'].map((w, i) => ({ id: `ncw-${i}`, text: w, selected: false }))

const mockChunks = ['a fine day', 'a nice girl', 'Fine, thanks.', 'Good afternoon!', 'Good evening!', 'Good morning!', 'Good night!', 'How are you?', 'How do you do?', 'Nice to meet you, too.', 'Nice to meet you.', 'Nice to see you, too.', 'nice to see you.', 'Thank you', 'Thanks a lot', 'This is my mom', 'Welcome to China'].map((c, i) => ({ id: `ch-${i}`, text: c, selected: false }))

const initialUnits: UnitData[] = [
  {
    unitId: 'u1', unitName: 'Unit 1', expanded: true,
    topics: [
      { topicId: 't1', topicName: 'Topic 1', curriculumWords: mockCurriculumWords, nonCurriculumWords: mockNonCurriculumWords, chunks: mockChunks },
    ],
  },
]

const exerciseTypes: ExerciseType[] = [
  { id: 'oral', name: '口语跟读' },
  { id: 'en-cn', name: '看英选中' },
  { id: 'dict', name: '单词默写' },
  { id: 'cn-en', name: '看中选英' },
  { id: 'listen-dict', name: '单词听写' },
  { id: 'listen-word', name: '听音识词' },
]

const grades = ['七年级上册', '七年级下册', '八年级上册', '八年级下册', '九年级上册', '九年级下册']
const types = ['同步课文', '同步词汇', '同步视频', '同步练习', '题型示例']

// ── Main Component ─────────────────────────────────────

export default function AssignSyncPage() {
  const navigate = useNavigate()
  const [activeGrade, setActiveGrade] = useState('七年级上册')
  const [activeType, setActiveType] = useState('同步词汇')
  const [units, setUnits] = useState(initialUnits)
  const [draftCount, setDraftCount] = useState(0)
  const [draftVisible, setDraftVisible] = useState(false)

  const toggleUnit = (uid: string) => {
    setUnits((prev) => prev.map((u) => (u.unitId === uid ? { ...u, expanded: !u.expanded } : u)))
  }

  const toggleItem = (uid: string, tid: string, group: 'curriculumWords' | 'nonCurriculumWords' | 'chunks', itemId: string) => {
    setUnits((prev) =>
      prev.map((u) =>
        u.unitId === uid
          ? {
              ...u,
              topics: u.topics.map((t) =>
                t.topicId === tid
                  ? { ...t, [group]: (t[group] as VocabItem[]).map((item) => (item.id === itemId ? { ...item, selected: !item.selected } : item)) }
                  : t,
              ),
            }
          : u,
      ),
    )
  }

  const selectAll = (uid: string, tid: string, group: 'curriculumWords' | 'nonCurriculumWords' | 'chunks') => {
    setUnits((prev) =>
      prev.map((u) =>
        u.unitId === uid
          ? {
              ...u,
              topics: u.topics.map((t) =>
                t.topicId === tid
                  ? { ...t, [group]: (t[group] as VocabItem[]).map((item) => ({ ...item, selected: true })) }
                  : t,
              ),
            }
          : u,
      ),
    )
  }

  const deselectAll = (uid: string, tid: string, group: 'curriculumWords' | 'nonCurriculumWords' | 'chunks') => {
    setUnits((prev) =>
      prev.map((u) =>
        u.unitId === uid
          ? {
              ...u,
              topics: u.topics.map((t) =>
                t.topicId === tid
                  ? { ...t, [group]: (t[group] as VocabItem[]).map((item) => ({ ...item, selected: false })) }
                  : t,
              ),
            }
          : u,
      ),
    )
  }

  const handleAdd = (_exName: string) => {
    setDraftCount((c) => c + 1)
    setDraftVisible(true)
  }

  const handleAddUnit = () => {
    setDraftCount((c) => c + 5)
    setDraftVisible(true)
    alert('本单元内容已加入草稿')
  }

  const unit = units[0]
  const topic = unit.topics[0]

  const getSelectedCount = (group: 'curriculumWords' | 'nonCurriculumWords' | 'chunks') =>
    (topic[group] as VocabItem[]).filter((i) => i.selected).length
  const getTotalCount = (group: 'curriculumWords' | 'nonCurriculumWords' | 'chunks') =>
    (topic[group] as VocabItem[]).length

  const groupLabels: Record<string, string> = {
    curriculumWords: '课标词汇',
    nonCurriculumWords: '非课标词汇',
    chunks: '语块',
  }

  return (
    <div className="fixed inset-0 z-[400] bg-gradient-to-br from-[#e8f4f8] to-[#e8f0f5] flex flex-col overflow-hidden">
      {/* ── Top Tabs ── */}
      <AssignPracticeTabs />

      {/* ── Filter Row ── */}
      <div className="shrink-0 bg-white/80 px-8 py-2.5 space-y-2 border-b border-[#f0f4f8]">
        {/* Grade */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8aabcc] shrink-0">年级</span>
          {grades.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGrade(g)}
              className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                activeGrade === g ? 'bg-[#eaf2fb] text-[#4b9fe8]' : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        {/* Type */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8aabcc] shrink-0">类型</span>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                activeType === t ? 'bg-[#eaf2fb] text-[#4b9fe8]' : 'text-[#6b8aaa] hover:bg-[#f4f7fa]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 flex min-h-0 px-8 py-3">
        {/* Left: Unit/Topic Content */}
        <div className="flex-1 min-w-0 overflow-y-auto pr-4">
          {/* Unit 1 header */}
          <button
            onClick={() => toggleUnit('u1')}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-[#eaf2fb] text-[12px] font-semibold text-[#3a4f66] mb-2"
          >
            <ChevronRight size={12} className={`text-[#8aabcc] transition-transform ${unit.expanded ? 'rotate-90' : ''}`} />
            {unit.unitName}
          </button>

          {unit.expanded && (
            <>
              {/* Topic 1 header */}
              <div className="flex items-center justify-between ml-2 mb-2 px-3 py-1.5 rounded-lg bg-[#f4f7fa]">
                <span className="text-[11px] font-semibold text-[#4a6b8a]">{topic.topicName}</span>
                <button
                  onClick={handleAddUnit}
                  className="inline-flex items-center gap-1 px-3 h-7 rounded-full border border-[#b8d4f0] text-[11px] text-[#4b9fe8] hover:bg-[#eaf2fb] transition-colors whitespace-nowrap flex-shrink-0"
                >
                  添加本单元 <ChevronDown size={10} />
                </button>
              </div>

              {/* Vocab groups */}
              <div className="ml-3 space-y-3">
                {(['curriculumWords', 'nonCurriculumWords', 'chunks'] as const).map((group) => {
                  const items = topic[group] as VocabItem[]
                  const selected = getSelectedCount(group)
                  const total = getTotalCount(group)
                  return (
                    <div key={group}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <label className="flex items-center gap-1.5 text-[11px] text-[#4a6b8a] cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={selected === total && total > 0}
                            onChange={() => (selected === total ? deselectAll('u1', 't1', group) : selectAll('u1', 't1', group))}
                            className="accent-[#4b9fe8] w-3.5 h-3.5"
                          />
                          全选
                        </label>
                        <span className="text-[10px] text-[#8aabcc]">
                          {groupLabels[group]}（已选{selected}/{total}）
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => toggleItem('u1', 't1', group, item.id)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                              item.selected
                                ? 'bg-[#eaf2fb] text-[#4b9fe8] border border-[#4b9fe8]'
                                : 'bg-white text-[#4a6b8a] border border-[#e8eef4] hover:border-[#b8d4f0]'
                            }`}
                          >
                            {item.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>

        {/* Right: Draft hint + Test Basket */}
        <div className="shrink-0 flex flex-col items-end gap-3 ml-3">
          {/* Draft hint */}
          {draftVisible && (
            <div className="flex items-center gap-2 bg-[#f0eefc] border border-[#d8d0f0] rounded-lg px-3 py-2 text-[11px] text-[#6b5aaa]">
              <span>{draftCount}道题目已加入到草稿中</span>
              <button onClick={() => setDraftVisible(false)} className="text-[#a090c8] hover:text-[#6b5aaa]">
                <X size={12} />
              </button>
            </div>
          )}

          {/* Test Basket */}
          <button
            onClick={() => alert(`试卷篮中有 ${draftCount} 道题目`)}
            className="relative flex flex-col items-center gap-0.5 px-3 py-3 bg-white border border-[#e4ecf3] rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <ShoppingBag size={18} className="text-[#4b9fe8]" />
            <span className="text-[10px] text-[#6b8aaa]">试卷篮</span>
            {draftCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                {draftCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Bottom Add Bar ── */}
      <div className="shrink-0 bg-white border-t border-[#e4ecf3] px-8 py-3">
        <div className="grid grid-cols-6 gap-3">
          {exerciseTypes.map((ex) => (
            <div key={ex.id} className="bg-[#f7f9fc] rounded-xl border border-[#e8eef4] p-3 text-center">
              <p className="text-[12px] font-medium text-[#3a4f66] mb-2">{ex.name}</p>
              <button
                onClick={() => handleAdd(ex.name)}
                className="inline-flex items-center justify-center gap-0.5 h-7 px-3 rounded-full bg-white border border-[#b8d4f0] text-[#4b9fe8] text-[11px] font-medium hover:bg-[#eaf2fb] transition-colors whitespace-nowrap flex-shrink-0"
              >
                <Plus size={11} />添加
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Return ── */}
      <button
        onClick={() => navigate('/')}
        className="fixed left-4 bottom-6 inline-flex items-center gap-1.5 px-5 h-12 rounded-full bg-[#3194ff] text-white text-[13px] font-medium hover:bg-[#2a84e8] transition-colors whitespace-nowrap shadow-lg z-30"
      >
        <ChevronRight size={14} className="rotate-180" />返回
      </button>

      {/* ── Right Floating ── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
        <button
          onClick={() => navigate('/resources')}
          className="flex flex-col items-center gap-0.5 px-2 py-3 bg-[#4b9fe8] text-white text-[10px] rounded-lg hover:bg-[#3a8fd8] transition-colors shadow-md"
        >
          <BookOpen size={14} />
          <span style={{ writingMode: 'vertical-rl' }}>我的备课</span>
        </button>
        <button className="p-1 bg-white border border-[#e4ecf3] rounded-full text-[#8aabcc] hover:text-[#4a6b8a] shadow-sm transition-colors">
          <ChevronRight size={12} className="rotate-180" />
        </button>
      </div>
    </div>
  )
}

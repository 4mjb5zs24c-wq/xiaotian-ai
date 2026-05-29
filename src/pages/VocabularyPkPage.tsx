import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, BookOpen, ChevronRight, Zap, Swords, Puzzle, Grid3X3, AlertTriangle, Clock } from 'lucide-react'
import SpecializedInsightEntry from '../ai/components/SpecializedInsightEntry'

// ── PK Mode Types ──────────────────────────────────────

interface PkMode {
  label: string
  modes: string[]
}

const pkModules: PkMode[] = [
  {
    label: '单词PK',
    modes: ['看中选英', '听音识词', '看英选中'],
  },
  {
    label: '拼词PK',
    modes: ['看中拼英', '听音拼词'],
  },
  {
    label: '语用PK',
    modes: ['拼语块', '语境选词', '一词多义'],
  },
  {
    label: '综合练习',
    modes: ['混合PK', '单元小测'],
  },
]

const moduleIcons = [Swords, Puzzle, Zap, Grid3X3]
const moduleGradients = [
  'from-[#4b7cf0] to-[#6b9af8]',
  'from-[#3dbfc4] to-[#5dd8dc]',
  'from-[#8b5cf0] to-[#a87df5]',
  'from-[#f08c3a] to-[#f5b06e]',
]

// ── Main Component ─────────────────────────────────────

export default function VocabularyPkPage() {
  const navigate = useNavigate()
  const [competitionMode, setCompetitionMode] = useState<Record<number, boolean>>({
    0: false,
    1: false,
  })

  const toggleCompetition = (idx: number) => {
    setCompetitionMode((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  const handleModeClick = (moduleLabel: string, mode: string) => {
    alert(`已选择「${moduleLabel} - ${mode}」，后续将进入词汇范围选择`)
  }

  return (
    <div className="fixed inset-0 z-[400] bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#162850] flex flex-col overflow-hidden">
      {/* Geometric decorations */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#1a3a6a]/30 to-transparent rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#0d2d5a]/40 to-transparent rounded-tr-full pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-blue-400/30 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-cyan-400/30 pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/5 w-1 h-1 rounded-full bg-purple-400/20 pointer-events-none" />

      {/* ── Top Title Area ── */}
      <div className="shrink-0 flex flex-col items-center pt-10 pb-6 relative">
        {/* Decorative slanted blocks beside title */}
        <div className="absolute left-[15%] top-12 w-16 h-1 bg-gradient-to-r from-blue-400/50 to-transparent rounded-full -rotate-12" />
        <div className="absolute right-[15%] top-12 w-16 h-1 bg-gradient-to-l from-blue-400/50 to-transparent rounded-full rotate-12" />
        <div className="absolute left-[18%] top-14 w-8 h-0.5 bg-gradient-to-r from-cyan-400/40 to-transparent rounded-full -rotate-12" />
        <div className="absolute right-[18%] top-14 w-8 h-0.5 bg-gradient-to-l from-cyan-400/40 to-transparent rounded-full rotate-12" />

        {/* PK badge */}
        <div className="mb-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#4b9fe8]/20 to-[#6bc0f8]/20 border border-[#4b9fe8]/30">
          <Zap size={12} className="text-yellow-400" />
          <span className="text-[10px] font-bold text-yellow-400 tracking-wider">PK</span>
        </div>

        {/* Main title */}
        <h1 className="text-[32px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-300 drop-shadow-lg">
          趣味学词
        </h1>
        <p className="text-[12px] text-blue-300/70 mt-0.5">轻松解决学词烦恼</p>
      </div>

      {/* ── Insight Banner ── */}
      <div className="shrink-0 px-10 pb-3">
        <SpecializedInsightEntry type="vocabulary" />
      </div>

      {/* ── Four PK Module Cards ── */}
      <div className="flex-1 flex items-center justify-center px-10 pb-8">
        <div className="grid grid-cols-4 gap-5 w-full max-w-[1100px]">
          {pkModules.map((mod, mi) => {
            const Icon = moduleIcons[mi]
            return (
              <div
                key={mod.label}
                className="relative rounded-2xl bg-gradient-to-b from-[#162850]/90 to-[#0f1f3d]/90 border border-[#2a4a7a]/50 p-5 flex flex-col hover:border-[#4b9fe8]/60 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <div className={`flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${moduleGradients[mi]}`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="text-[14px] font-bold text-white">{mod.label}</span>
                </div>

                {/* Mode buttons */}
                <div className="space-y-2 flex-1">
                  {mod.modes.map((mode) => (
                    <button
                      key={mode}
                      onClick={() => handleModeClick(mod.label, mode)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#1e3a62] to-[#223f6a] hover:from-[#264a78] hover:to-[#2a5280] text-[12px] font-medium text-blue-100 hover:text-white border border-[#2a4a7a]/40 hover:border-[#4b9fe8]/50 transition-all shadow-sm"
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                {/* Competition mode toggle (for word PK and spell PK) */}
                {(mi === 0 || mi === 1) && (
                  <div className="mt-3 pt-3 border-t border-[#2a4a7a]/30 flex items-center justify-between">
                    <span className="text-[10px] text-blue-300/60">比赛模式</span>
                    <button
                      onClick={() => toggleCompetition(mi)}
                      className={`relative w-9 h-5 rounded-full transition-colors ${
                        competitionMode[mi] ? 'bg-[#4b9fe8]' : 'bg-[#2a4a7a]/60'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                          competitionMode[mi] ? 'left-[18px]' : 'left-[1px]'
                        }`}
                      />
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Bottom Entry Buttons ── */}
      <div className="shrink-0 flex items-center justify-center gap-4 pb-6 relative">
        <button
          onClick={() => alert('高频错词练习将在接入真实数据后启用')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1e3a62]/80 border border-[#4b9fe8]/40 text-[12px] text-blue-200 hover:bg-[#264a78] hover:border-[#4b9fe8]/60 transition-all"
        >
          <AlertTriangle size={13} className="text-amber-400" />
          高频错词
        </button>
        <button
          onClick={() => alert('比赛记录将在接入真实数据后启用')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1e3a62]/80 border border-[#4b9fe8]/40 text-[12px] text-blue-200 hover:bg-[#264a78] hover:border-[#4b9fe8]/60 transition-all"
        >
          <Clock size={13} className="text-cyan-400" />
          比赛记录
        </button>
      </div>

      {/* ── Close Button (bottom-left) ── */}
      <button
        onClick={() => navigate('/')}
        className="absolute left-6 bottom-6 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/70 hover:text-white transition-all"
      >
        <X size={20} />
      </button>

      {/* ── Right Floating Buttons ── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
        <button
          onClick={() => navigate('/resources')}
          className="flex flex-col items-center gap-0.5 px-2 py-3 bg-[#4b9fe8]/80 text-white text-[10px] rounded-lg hover:bg-[#4b9fe8] transition-colors shadow-md"
        >
          <BookOpen size={14} />
          <span style={{ writingMode: 'vertical-rl' }}>我的备课</span>
        </button>
        <button className="p-1 bg-white/10 border border-white/20 rounded-full text-white/50 hover:text-white/80 transition-colors">
          <ChevronRight size={12} className="rotate-180" />
        </button>
      </div>
    </div>
  )
}

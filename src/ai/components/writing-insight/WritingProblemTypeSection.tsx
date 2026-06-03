import { useState } from 'react'
import { Users, Lightbulb } from 'lucide-react'
import type { ProblemTypeItem } from '../../insights/writingInsightTypes'

interface Props { problemTypes: ProblemTypeItem[] }

export default function WritingProblemTypeSection({ problemTypes }: Props) {
  const sorted = [...problemTypes].sort((a, b) => b.percent - a.percent)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const top3 = sorted.slice(0, 3)

  return (
    <section className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-5">
      <div className="flex items-center gap-2">
        <h3 className="text-base font-semibold text-slate-800">写作问题类型分布</h3>
        <span className="text-xs text-slate-400">7 类问题 · {problemTypes.reduce((s, e) => s + e.affectedStudentCount, 0)} 人次</span>
      </div>

      {/* TOP3 */}
      <div className="grid grid-cols-3 gap-3">
        {top3.map((pt, idx) => (
          <div
            key={pt.id}
            onMouseEnter={() => setHoveredId(pt.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`relative bg-white rounded-xl border p-4 transition-all duration-300 cursor-default
              ${hoveredId === pt.id ? 'shadow-md scale-[1.03] z-10' : 'hover:shadow-sm'}`}
            style={{ borderColor: hoveredId === pt.id ? pt.borderColor : '#e2e8f0' }}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold text-white"
                style={{ backgroundColor: pt.borderColor }}>
                {idx + 1}
              </span>
              <span className="text-sm font-semibold text-slate-700">{pt.label}</span>
            </div>
            <p className="text-[34px] font-black tracking-tight leading-none" style={{ color: pt.borderColor }}>
              {pt.percent}<span className="text-lg font-medium opacity-60">%</span>
            </p>
            <div className="flex items-center gap-1.5 text-[13px] text-slate-500 mt-1.5">
              <Users size={13} className="text-slate-400" />
              <span>{pt.affectedStudentCount} 人受影响</span>
            </div>
            <p className="text-xs text-slate-400 mt-1.5 truncate">{pt.typicalPerformance}</p>
          </div>
        ))}
      </div>

      {/* ── J Format: Staircase Cumulative Flow ── */}
      <div className="bg-slate-50/70 rounded-xl border border-slate-100 p-5 space-y-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">错误类型占比</p>

        {/* Thin bar with hover tooltips */}
        <div className="relative">
          <div className="relative h-5 rounded-full overflow-hidden bg-slate-200/50 flex">
            {sorted.map((pt) => {
              const isHovered = hoveredId === pt.id
              return (
                <div
                  key={pt.id}
                  onMouseEnter={() => setHoveredId(pt.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="h-full transition-all duration-300 cursor-pointer relative min-w-[2%] first:rounded-l-full last:rounded-r-full"
                  style={{
                    width: `${pt.percent}%`,
                    backgroundColor: isHovered ? pt.borderColor : `${pt.borderColor}CC`,
                    opacity: hoveredId && hoveredId !== pt.id ? 0.4 : 1,
                    transform: isHovered ? 'scaleY(1.5)' : 'scaleY(1)',
                    zIndex: isHovered ? 10 : 1,
                  }}
                >
                  {pt.percent >= 8 && (
                    <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow-sm transition-opacity duration-200
                      ${hoveredId && hoveredId !== pt.id ? 'opacity-0' : 'opacity-100'}`}>
                      {pt.percent}%
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Floating tooltip */}
          {hoveredId && (() => {
            const pt = sorted.find(e => e.id === hoveredId)!
            const i = sorted.findIndex(e => e.id === hoveredId)
            const cumBefore = sorted.slice(0, i).reduce((s, e) => s + e.percent, 0)
            const pos = cumBefore + pt.percent / 2
            const clampedPercent = Math.min(95, Math.max(5, pos))
            return (
              <div
                className="absolute bottom-full mb-3 z-30 pointer-events-none transition-all duration-200"
                style={{ left: `${clampedPercent}%`, transform: 'translateX(-50%)' }}
              >
                <div className="bg-slate-800 text-white rounded-xl px-4 py-3 shadow-xl whitespace-nowrap">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: pt.borderColor }} />
                    <span className="text-xs font-semibold">{pt.label}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-white/80">占比 <strong className="text-white">{pt.percent}%</strong></span>
                    <span className="text-white/80">· 影响 <strong className="text-white">{pt.affectedStudentCount} 人</strong></span>
                  </div>
                  <p className="text-[11px] text-white/60 mt-1.5 leading-relaxed max-w-[280px] whitespace-normal">{pt.aiReason}</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
                    border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-800" />
                </div>
              </div>
            )
          })()}
        </div>

        {/* Bottom labels */}
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {sorted.map((pt) => (
            <div
              key={pt.id}
              onMouseEnter={() => setHoveredId(pt.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`flex items-center gap-2 cursor-pointer transition-all duration-200 px-2 py-1 rounded-lg
                ${hoveredId === pt.id ? 'bg-white shadow-sm' : ''}`}
            >
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: pt.borderColor }} />
              <span className="text-xs text-slate-600">{pt.label}</span>
              <span className="text-xs font-bold" style={{ color: pt.borderColor }}>{pt.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Analysis */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-0.5">AI 归因分析</p>
        {problemTypes.map(pt => (
          <div key={pt.id} className="bg-white rounded-xl p-4 border border-slate-100">
            <div className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: pt.borderColor }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-700">{pt.label}</span>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="font-semibold text-slate-600">{pt.percent}%</span>
                    <span className="flex items-center gap-1"><Users size={11} /> {pt.affectedStudentCount} 人</span>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <Lightbulb size={13} className="text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[13px] text-slate-500 leading-relaxed">{pt.aiReason}</p>
                </div>
                {pt.recommendedActions.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[10px] text-slate-400">推荐动作：</span>
                    {pt.recommendedActions.map(a => (
                      <span key={a} className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-500 border border-blue-100">{a}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

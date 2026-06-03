import { useState } from 'react'
import { Users, Lightbulb } from 'lucide-react'
import type { ErrorTypeItem } from '../../insights/vocabularyInsightTypes'

interface Props {
  errorTypes: ErrorTypeItem[]
}

export default function ErrorTypeInsightSection({ errorTypes }: Props) {
  const sorted = [...errorTypes].sort((a, b) => b.percent - a.percent)
  const [hoveredType, setHoveredType] = useState<string | null>(null)
  const top3 = sorted.slice(0, 3)

  return (
    <section className="bg-white rounded-2xl border border-slate-200/60 p-5 space-y-5">
      {/* Section title */}
      <div className="flex items-center gap-2">
        <h3 className="text-base font-semibold text-slate-800">错误类型分布</h3>
        <span className="text-xs text-slate-400">7 类错误 · {errorTypes.reduce((s, e) => s + e.affectedStudentCount, 0)} 人次</span>
      </div>

      {/* TOP3 Cards — compact row */}
      <div className="grid grid-cols-3 gap-3">
        {top3.map((et, idx) => (
          <div
            key={et.type}
            onMouseEnter={() => setHoveredType(et.type)}
            onMouseLeave={() => setHoveredType(null)}
            className={`relative bg-white rounded-xl border p-4 transition-all duration-300 cursor-default
              ${hoveredType === et.type ? 'shadow-md scale-[1.03] z-10' : 'hover:shadow-sm'}`}
            style={{ borderColor: hoveredType === et.type ? et.borderColor : '#e2e8f0' }}
          >
            {/* Rank badge */}
            <div className="flex items-center gap-2 mb-2.5">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold text-white"
                style={{ backgroundColor: et.borderColor }}>
                {idx + 1}
              </span>
              <span className="text-sm font-semibold text-slate-700">{et.label}</span>
            </div>
            <p className="text-[34px] font-black tracking-tight leading-none" style={{ color: et.borderColor }}>
              {et.percent}<span className="text-lg font-medium opacity-60">%</span>
            </p>
            <div className="flex items-center gap-1.5 text-[13px] text-slate-500 mt-1.5">
              <Users size={13} className="text-slate-400" />
              <span>{et.affectedStudentCount} 人受影响</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── J Format: Staircase Cumulative Flow ── */}
      <div className="bg-slate-50/70 rounded-xl border border-slate-100 p-5 space-y-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">错误类型占比</p>

        {/* Thin bar with hover tooltips */}
        <div className="relative">
          <div className="relative h-5 rounded-full overflow-hidden bg-slate-200/50 flex">
            {sorted.map((et) => {
              const isHovered = hoveredType === et.type
              return (
                <div
                  key={et.type}
                  onMouseEnter={() => setHoveredType(et.type)}
                  onMouseLeave={() => setHoveredType(null)}
                  className="h-full transition-all duration-300 cursor-pointer relative min-w-[2%] first:rounded-l-full last:rounded-r-full"
                  style={{
                    width: `${et.percent}%`,
                    backgroundColor: isHovered ? et.borderColor : `${et.borderColor}CC`,
                    opacity: hoveredType && hoveredType !== et.type ? 0.4 : 1,
                    transform: isHovered ? 'scaleY(1.5)' : 'scaleY(1)',
                    zIndex: isHovered ? 10 : 1,
                  }}
                >
                  {et.percent >= 8 && (
                    <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow-sm transition-opacity duration-200
                      ${hoveredType && hoveredType !== et.type ? 'opacity-0' : 'opacity-100'}`}>
                      {et.percent}%
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Floating tooltip */}
          {hoveredType && (() => {
            const et = sorted.find(e => e.type === hoveredType)!
            const i = sorted.findIndex(e => e.type === hoveredType)
            const cumBefore = sorted.slice(0, i).reduce((s, e) => s + e.percent, 0)
            const pos = cumBefore + et.percent / 2
            // Clamp tooltip position to avoid edge overflow
            const clampedPercent = Math.min(95, Math.max(5, pos))
            return (
              <div
                className="absolute bottom-full mb-3 z-30 pointer-events-none transition-all duration-200"
                style={{ left: `${clampedPercent}%`, transform: 'translateX(-50%)' }}
              >
                <div className="bg-slate-800 text-white rounded-xl px-4 py-3 shadow-xl whitespace-nowrap">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: et.borderColor }} />
                    <span className="text-xs font-semibold">{et.label}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-white/80">占比 <strong className="text-white">{et.percent}%</strong></span>
                    <span className="text-white/80">· 影响 <strong className="text-white">{et.affectedStudentCount} 人</strong></span>
                  </div>
                  <p className="text-[11px] text-white/60 mt-1.5 leading-relaxed max-w-[280px] whitespace-normal">{et.aiReason}</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
                    border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-800" />
                </div>
              </div>
            )
          })()}
        </div>

        {/* Bottom labels */}
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {sorted.map((et) => (
            <div
              key={et.type}
              onMouseEnter={() => setHoveredType(et.type)}
              onMouseLeave={() => setHoveredType(null)}
              className={`flex items-center gap-2 cursor-pointer transition-all duration-200 px-2 py-1 rounded-lg
                ${hoveredType === et.type ? 'bg-white shadow-sm' : ''}`}
            >
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: et.borderColor }} />
              <span className="text-xs text-slate-600">{et.label}</span>
              <span className="text-xs font-bold" style={{ color: et.borderColor }}>{et.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Analysis per Type */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-0.5">AI 归因分析</p>
        {errorTypes.map(et => (
          <div
            key={et.type}
            className="bg-white rounded-xl p-4 border border-slate-100
              transition-all duration-200 hover:border-slate-200 hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: et.borderColor }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-700">{et.label}</span>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="font-semibold text-slate-600">{et.percent}%</span>
                    <span className="flex items-center gap-1">
                      <Users size={11} /> {et.affectedStudentCount} 人
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <Lightbulb size={13} className="text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-[13px] text-slate-500 leading-relaxed">{et.aiReason}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

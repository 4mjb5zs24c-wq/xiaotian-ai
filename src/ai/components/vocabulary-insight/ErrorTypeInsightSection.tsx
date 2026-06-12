import { useState } from 'react'
import { Users, Lightbulb } from 'lucide-react'
import type { ErrorTypeItem } from '../../insights/vocabularyInsightTypes'

interface Props { errorTypes: ErrorTypeItem[] }

export default function ErrorTypeInsightSection({ errorTypes }: Props) {
  const sorted = [...errorTypes].sort((a, b) => b.percent - a.percent)
  const [hoveredType, setHoveredType] = useState<string | null>(null)
  const defaultHovered = sorted[0]?.type

  return (
    <section className="bg-white rounded-2xl border border-[#e8eef4] shadow-sm p-5">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-semibold text-slate-800">错误类型分布</h3>
        <span className="text-xs text-slate-400">{errorTypes.length} 类错误</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left 70%: bar + rows */}
        <div className="lg:w-[70%] space-y-2.5">
          <div className="relative h-3 rounded-full overflow-hidden bg-slate-100 flex">
            {sorted.map(et => (
              <div key={et.type}
                onMouseEnter={() => setHoveredType(et.type)}
                onMouseLeave={() => setHoveredType(null)}
                className="h-full transition-all duration-200 cursor-pointer"
                style={{ width: `${et.percent}%`, backgroundColor: (hoveredType || defaultHovered) === et.type ? et.borderColor : `${et.borderColor}88` }}
              />
            ))}
          </div>

          <div className="space-y-0.5">
            {sorted.map(et => {
              const isActive = (hoveredType || defaultHovered) === et.type
              return (
                <div key={et.type}
                  onMouseEnter={() => setHoveredType(et.type)}
                  onMouseLeave={() => setHoveredType(null)}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-md cursor-pointer transition-all text-xs
                    ${isActive ? 'bg-slate-50' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: et.borderColor }} />
                    <span className={`font-medium ${isActive ? 'text-slate-800' : 'text-slate-600'}`}>{et.label}</span>
                    {et.desc && <span className="text-[10px] text-slate-400 truncate max-w-[260px] hidden sm:inline">{et.desc}</span>}
                  </div>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="font-bold" style={{ color: et.borderColor }}>{et.percent}%</span>
                    <span className="text-slate-400 flex items-center gap-0.5"><Users size={9} />{et.affectedStudentCount}人</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right 30%: AI analysis */}
        <div className="lg:w-[30%]">
          {(() => {
            const et = sorted.find(e => e.type === (hoveredType || defaultHovered)) || sorted[0]
            if (!et) return null
            return (
              <div className="bg-blue-50/40 rounded-xl p-3.5 border border-blue-100/50 h-full">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Lightbulb size={12} className="text-amber-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">{et.label}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{et.aiReason}</p>
                {et.exampleWords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {et.exampleWords.slice(0, 4).map(w => (
                      <span key={w} className="text-[10px] text-slate-500 bg-white rounded px-1.5 py-0.5 border border-slate-200">{w}</span>
                    ))}
                  </div>
                )}
              </div>
            )
          })()}
        </div>
      </div>
    </section>
  )
}

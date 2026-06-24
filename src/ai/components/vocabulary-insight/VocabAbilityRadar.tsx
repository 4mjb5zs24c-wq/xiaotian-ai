import { useMemo } from 'react'
import { ABILITY_DIMENSION_META } from '../../insights/vocabularyAbilityTypes'
import type { VocabAbilityDimension } from '../../insights/vocabularyAbilityTypes'

interface Props {
  scores: Record<VocabAbilityDimension, number>
  className?: string
  compact?: boolean
}

const DIMENSIONS: VocabAbilityDimension[] = ['recognition', 'contextual_understanding', 'expression', 'learning_strategy']

/**
 * 词汇能力维度雷达图
 * 4 个固定维度，SVG 绘制
 */
export default function VocabAbilityRadar({ scores, className, compact }: Props) {
  const CENTER = compact ? 68 : 120
  const RADIUS = compact ? 48 : 90
  const LEVELS = compact ? 4 : 4
  const FONT_SCALE = compact ? 0.85 : 1
  const SVG_SIZE = compact ? 175 : CENTER * 2
  const PAD = compact ? 22 : 0

  const points = useMemo(() => {
    return DIMENSIONS.map((dim, i) => {
      const angle = (Math.PI * 2 * i) / DIMENSIONS.length - Math.PI / 2
      const score = scores[dim] ?? 0
      const r = (score / 100) * RADIUS
      return {
        x: CENTER + r * Math.cos(angle),
        y: CENTER + r * Math.sin(angle),
        score,
        angle,
        dim,
      }
    })
  }, [scores])

  // Generate level rings and axis lines
  const levelRings = useMemo(() => {
    return Array.from({ length: LEVELS }, (_, i) => {
      const r = (RADIUS / LEVELS) * (i + 1)
      return { r, label: Math.round((100 / LEVELS) * (i + 1)) }
    })
  }, [])

  const axisLines = useMemo(() => {
    return DIMENSIONS.map((_, i) => {
      const angle = (Math.PI * 2 * i) / DIMENSIONS.length - Math.PI / 2
      return {
        x2: CENTER + RADIUS * Math.cos(angle),
        y2: CENTER + RADIUS * Math.sin(angle),
      }
    })
  }, [])

  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <div className={compact ? `flex flex-col items-center ${className ?? ''}` : `bg-white rounded-xl border border-[#e8eef4] p-5 ${className ?? ''}`}>
      {!compact && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-4 rounded-full bg-blue-500" />
          <h3 className="text-sm font-semibold text-slate-700">词汇能力维度</h3>
        </div>
      )}

      {/* SVG Radar */}
      <div className="flex justify-center">
        <svg width={SVG_SIZE} height={SVG_SIZE} viewBox={`${-PAD} ${-PAD} ${CENTER * 2 + PAD * 2} ${CENTER * 2 + PAD * 2}`}>
          {/* Level rings */}
          {levelRings.map(({ r }) => (
            <circle
              key={r}
              cx={CENTER}
              cy={CENTER}
              r={r}
              fill="none"
              stroke="#e8eef4"
              strokeWidth={0.5}
            />
          ))}

          {/* Axis lines */}
          {axisLines.map((line, i) => (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={line.x2}
              y2={line.y2}
              stroke="#e8eef4"
              strokeWidth={0.5}
            />
          ))}

          {/* Data polygon */}
          <polygon
            points={polygonPoints}
            fill="rgba(59, 130, 246, 0.15)"
            stroke="#3b82f6"
            strokeWidth={1.5 * FONT_SCALE}
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={3.5 * FONT_SCALE}
              fill="#3b82f6"
              stroke="white"
              strokeWidth={1.5 * FONT_SCALE}
            />
          ))}

          {/* Dimension labels */}
          {DIMENSIONS.map((dim, i) => {
            const angle = (Math.PI * 2 * i) / DIMENSIONS.length - Math.PI / 2
            const meta = ABILITY_DIMENSION_META[dim]
            const labelR = RADIUS + (compact ? 24 : 28)
            const lx = CENTER + labelR * Math.cos(angle)
            const ly = CENTER + labelR * Math.sin(angle)
            const score = scores[dim] ?? 0

            return (
              <g key={dim}>
                {/* Score inside radar */}
                <text
                  x={points[i].x}
                  y={points[i].y - (compact ? 8 : 10)}
                  textAnchor="middle"
                  style={{ fontSize: compact ? '9px' : '10px', fontWeight: 'bold' }}
                  fill={meta.available ? '#3b82f6' : '#94a3b8'}
                >
                  {score}
                </text>
                {/* Label outside — short names only */}
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: compact ? '10px' : '11px', fontWeight: 'medium', fill: meta.available ? '#475569' : '#94a3b8' }}
                >
                  {meta.shortLabel}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      {/* Dimension legend — full mode */}
      {!compact && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {DIMENSIONS.map(dim => {
            const meta = ABILITY_DIMENSION_META[dim]
            const score = scores[dim] ?? 0
            return (
              <div key={dim} className="flex items-center gap-2 text-[11px]">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: meta.available ? meta.color : '#cbd5e1' }}
                />
                <span className="text-slate-500">{meta.label}</span>
                <span className={`font-semibold ml-auto ${meta.available ? 'text-slate-700' : 'text-slate-400'}`}>
                  {score}
                </span>
                {!meta.available && (
                  <span className="text-[9px] text-slate-400 bg-slate-100 px-1 rounded">待完善</span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

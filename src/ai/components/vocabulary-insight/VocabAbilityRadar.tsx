import { useMemo, useState, useEffect } from 'react'
import { ABILITY_DIMENSION_META } from '../../insights/vocabularyAbilityTypes'
import type { VocabAbilityDimension } from '../../insights/vocabularyAbilityTypes'

interface Props {
  scores: Record<VocabAbilityDimension, number>
  /** 方案前得分，传入后启用对比模式：同图展示 before/after 双多边形 */
  beforeScores?: Record<VocabAbilityDimension, number>
  /** 自定义标题，默认「词汇能力维度」；对比模式默认「词汇能力变化」 */
  title?: string
  className?: string
  compact?: boolean
}

const DIMENSIONS: VocabAbilityDimension[] = ['recognition', 'contextual_understanding', 'expression', 'learning_strategy']

/**
 * 词汇能力维度雷达图
 * 4 个固定维度，SVG 绘制
 *
 * 支持两种模式：
 * - 单数据模式：仅传入 scores，展示当前能力得分
 * - 对比模式：同时传入 beforeScores + scores，同图展示方案前/后双多边形
 */
export default function VocabAbilityRadar({ scores, beforeScores, title, className, compact }: Props) {
  const isComparison = beforeScores != null
  const [animProgress, setAnimProgress] = useState(isComparison ? 0 : 1)

  useEffect(() => {
    if (!isComparison) { setAnimProgress(1); return }
    const start = performance.now()
    const duration = 800
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setAnimProgress(p)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isComparison])

  // Easing: ease-out cubic
  const easedProgress = 1 - Math.pow(1 - animProgress, 3)

  const CENTER = compact ? 68 : 120
  const RADIUS = compact ? 48 : 90
  const LEVELS = compact ? 4 : 4
  const FONT_SCALE = compact ? 0.85 : 1
  const SVG_SIZE = compact ? 175 : CENTER * 2
  const PAD = compact ? 22 : 0

  const afterPoints = useMemo(() => {
    return DIMENSIONS.map((dim, i) => {
      const angle = (Math.PI * 2 * i) / DIMENSIONS.length - Math.PI / 2
      const score = scores[dim] ?? 0
      const r = (score / 100) * RADIUS
      return { x: CENTER + r * Math.cos(angle), y: CENTER + r * Math.sin(angle), score, angle, dim }
    })
  }, [scores, CENTER, RADIUS])

  // Before points (only in comparison mode)
  const beforePoints = useMemo(() => {
    if (!beforeScores) return null
    return DIMENSIONS.map((dim, i) => {
      const angle = (Math.PI * 2 * i) / DIMENSIONS.length - Math.PI / 2
      const score = beforeScores[dim] ?? 0
      const r = (score / 100) * RADIUS
      return { x: CENTER + r * Math.cos(angle), y: CENTER + r * Math.sin(angle), score, angle, dim }
    })
  }, [beforeScores, CENTER, RADIUS])

  // Animated after points (interpolated from before to after)
  const animatedAfterPoints = useMemo(() => {
    if (!isComparison || !beforePoints) return afterPoints
    if (animProgress >= 1) return afterPoints
    return DIMENSIONS.map((dim, i) => {
      const angle = (Math.PI * 2 * i) / DIMENSIONS.length - Math.PI / 2
      const beforeScore = beforePoints[i].score
      const afterScore = afterPoints[i].score
      const currentScore = beforeScore + (afterScore - beforeScore) * easedProgress
      const r = (currentScore / 100) * RADIUS
      return { x: CENTER + r * Math.cos(angle), y: CENTER + r * Math.sin(angle), score: afterScore, angle, dim }
    })
  }, [isComparison, beforePoints, afterPoints, animProgress, easedProgress, CENTER, RADIUS])

  const levelRings = useMemo(() => {
    return Array.from({ length: LEVELS }, (_, i) => {
      const r = (RADIUS / LEVELS) * (i + 1)
      return { r, label: Math.round((100 / LEVELS) * (i + 1)) }
    })
  }, [RADIUS, LEVELS])

  const axisLines = useMemo(() => {
    return DIMENSIONS.map((_, i) => {
      const angle = (Math.PI * 2 * i) / DIMENSIONS.length - Math.PI / 2
      return {
        x2: CENTER + RADIUS * Math.cos(angle),
        y2: CENTER + RADIUS * Math.sin(angle),
      }
    })
  }, [CENTER, RADIUS])

  const afterPolygonPoints = (isComparison ? animatedAfterPoints : afterPoints)
    .map(p => `${p.x},${p.y}`).join(' ')
  const beforePolygonPoints = beforePoints?.map(p => `${p.x},${p.y}`).join(' ') ?? ''

  // Delta values for comparison mode
  const deltas = useMemo(() => {
    if (!beforeScores) return null
    return DIMENSIONS.map(dim => ({
      dim,
      before: beforeScores[dim] ?? 0,
      after: scores[dim] ?? 0,
      delta: (scores[dim] ?? 0) - (beforeScores[dim] ?? 0),
    }))
  }, [beforeScores, scores])

  const maxDelta = deltas
    ? Math.max(...deltas.map(d => d.delta))
    : 0
  const minDelta = deltas
    ? Math.min(...deltas.map(d => d.delta))
    : 0

  const defaultTitle = isComparison ? '词汇能力变化' : '词汇能力维度'
  const displayTitle = title ?? defaultTitle

  return (
    <div className={compact ? `flex flex-col items-center ${className ?? ''}` : `bg-white rounded-xl border border-[#e8eef4] p-5 ${className ?? ''}`}>
      {!compact && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-4 rounded-full bg-blue-500" />
          <h3 className="text-sm font-semibold text-slate-700">{displayTitle}</h3>
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

          {/* Before polygon (comparison mode only) */}
          {isComparison && beforePolygonPoints && (
            <polygon
              points={beforePolygonPoints}
              fill="rgba(148, 163, 184, 0.08)"
              stroke="#94a3b8"
              strokeWidth={1.5 * FONT_SCALE}
              strokeDasharray="5,3"
              strokeLinejoin="round"
            />
          )}

          {/* Before data points */}
          {isComparison && beforePoints && beforePoints.map((p, i) => (
            <circle
              key={`b-${i}`}
              cx={p.x}
              cy={p.y}
              r={3 * FONT_SCALE}
              fill="white"
              stroke="#94a3b8"
              strokeWidth={1.5 * FONT_SCALE}
            />
          ))}

          {/* After polygon */}
          <polygon
            points={afterPolygonPoints}
            fill="rgba(59, 130, 246, 0.15)"
            stroke="#3b82f6"
            strokeWidth={1.5 * FONT_SCALE}
            strokeLinejoin="round"
          />

          {/* After data points */}
          {afterPoints.map((p, i) => (
            <circle
              key={`a-${i}`}
              cx={isComparison ? animatedAfterPoints[i].x : p.x}
              cy={isComparison ? animatedAfterPoints[i].y : p.y}
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

            // In comparison mode, show "before → after" score text near the point
            if (isComparison && !compact && deltas) {
              const d = deltas[i]
              const displayPoint = animatedAfterPoints[i]
              const tx = displayPoint.x
              const ty = displayPoint.y - (compact ? 8 : 12)

              return (
                <g key={dim}>
                  {/* Score: before → after */}
                  <text
                    x={tx}
                    y={ty}
                    textAnchor="middle"
                    style={{ fontSize: compact ? '9px' : '10px', fontWeight: 'bold' }}
                    fill={meta.available ? '#3b82f6' : '#94a3b8'}
                  >
                    {d.before} → {d.after}
                  </text>
                  {/* Delta */}
                  <text
                    x={tx}
                    y={ty + (compact ? 10 : 13)}
                    textAnchor="middle"
                    style={{ fontSize: compact ? '8px' : '9px', fontWeight: 'bold' }}
                    fill={d.delta > 0 ? '#059669' : d.delta < 0 ? '#ef4444' : '#94a3b8'}
                  >
                    {d.delta > 0 ? `+${d.delta}pp` : d.delta < 0 ? `${d.delta}pp` : '持平'}
                  </text>
                  {/* Axis label */}
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
            }

            // Non-comparison mode: show single score
            return (
              <g key={dim}>
                <text
                  x={afterPoints[i].x}
                  y={afterPoints[i].y - (compact ? 8 : 10)}
                  textAnchor="middle"
                  style={{ fontSize: compact ? '9px' : '10px', fontWeight: 'bold' }}
                  fill={meta.available ? '#3b82f6' : '#94a3b8'}
                >
                  {afterPoints[i].score}
                </text>
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

      {/* Legend — full mode */}
      {!compact && (
        <div className="mt-4">
          {/* Comparison mode: delta summary row */}
          {isComparison && deltas && (
            <div className="flex items-center gap-3 mb-3 text-[10px] flex-wrap">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0 border-t-2 border-dashed border-slate-300" />
                <span className="text-slate-400">方案前</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-0 border-t-2 border-blue-500" />
                <span className="text-slate-400">方案后</span>
              </div>
              {deltas.filter(d => d.delta === maxDelta && d.delta > 0).map(d => (
                <span key={d.dim} className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                  主要提升：{ABILITY_DIMENSION_META[d.dim].label} +{d.delta}pp
                </span>
              ))}
              {deltas.filter(d => d.delta === minDelta && d.delta <= 0).map(d => (
                <span key={d.dim} className="text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-medium">
                  待关注：{ABILITY_DIMENSION_META[d.dim].label}
                </span>
              ))}
            </div>
          )}

          {/* Dimension list */}
          <div className="grid grid-cols-2 gap-2">
            {DIMENSIONS.map(dim => {
              const meta = ABILITY_DIMENSION_META[dim]
              const score = scores[dim] ?? 0
              const delta = deltas?.find(d => d.dim === dim)
              return (
                <div key={dim} className="flex items-center gap-2 text-[11px]">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: meta.available ? meta.color : '#cbd5e1' }}
                  />
                  <span className="text-slate-500">{meta.label}</span>
                  {isComparison && delta ? (
                    <span className="font-semibold ml-auto text-slate-700">
                      {delta.before} → {delta.after}
                      <span className={`ml-1 ${delta.delta > 0 ? 'text-emerald-600' : delta.delta < 0 ? 'text-red-500' : 'text-slate-400'}`}>
                        ({delta.delta > 0 ? '+' : ''}{delta.delta}pp)
                      </span>
                    </span>
                  ) : (
                    <span className={`font-semibold ml-auto ${meta.available ? 'text-slate-700' : 'text-slate-400'}`}>
                      {score}
                    </span>
                  )}
                  {!meta.available && (
                    <span className="text-[9px] text-slate-400 bg-slate-100 px-1 rounded">待完善</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

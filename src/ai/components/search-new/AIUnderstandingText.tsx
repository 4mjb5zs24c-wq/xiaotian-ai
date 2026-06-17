import React from 'react'

interface AIUnderstandingTextProps {
  text: string
}

/**
 * V1.1 AI 理解文案 — shown at the top of search results.
 *
 * Lightweight, text-focused card. Uses a tiny accent dot
 * instead of a large duplicate icon to avoid visual noise.
 */
const AIUnderstandingText: React.FC<AIUnderstandingTextProps> = ({ text }) => {
  const lines = text.split('\n').filter(Boolean)

  return (
    <div className="flex items-start gap-2.5 px-4 py-3 bg-blue-50/40 border border-blue-100/30 rounded-xl">
      {/* Tiny accent dot — not a duplicate of the search bar icon */}
      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />

      {/* Text */}
      <div className="min-w-0">
        {lines.map((line, i) => (
          <p
            key={i}
            className={`text-[13px] leading-relaxed ${
              i === 0 ? 'text-slate-700 font-medium' : 'text-slate-500'
            }`}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

export default AIUnderstandingText

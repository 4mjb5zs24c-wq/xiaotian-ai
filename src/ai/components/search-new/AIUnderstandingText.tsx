import React from 'react'

interface AIUnderstandingTextProps {
  text: string
}

/**
 * V1.1 AI 理解文案 — lightweight single-line note at top of results.
 * Compressed height so it doesn't push content below the fold.
 */
const AIUnderstandingText: React.FC<AIUnderstandingTextProps> = ({ text }) => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50/40 border border-blue-100/30 rounded-lg">
      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
      <p className="text-[12px] text-slate-600 leading-snug">{text}</p>
    </div>
  )
}

export default AIUnderstandingText

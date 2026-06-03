import React from 'react'
import { FileText } from 'lucide-react'

interface PaperBasketBadgeProps {
  count: number
  onClick: () => void
}

const PaperBasketBadge: React.FC<PaperBasketBadgeProps> = ({ count, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
        bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600
        transition-all duration-200"
    >
      <FileText size={13} />
      <span>试卷篮</span>
      {count > 0 && (
        <span className="text-[11px] font-semibold bg-blue-500 text-white px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
          {count}
        </span>
      )}
    </button>
  )
}

export default PaperBasketBadge

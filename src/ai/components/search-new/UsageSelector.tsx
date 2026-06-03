import React from 'react'
import { Check, AlertCircle } from 'lucide-react'
import type { UsageOption } from '../../search-new/types'
import { VOCAB_USAGES, TEXT_USAGES } from '../../search-new/types'

interface UsageSelectorProps {
  type: 'vocab' | 'text'
  selected: string[]
  onChange: (selected: string[]) => void
}

const UsageSelector: React.FC<UsageSelectorProps> = ({ type, selected, onChange }) => {
  const options: UsageOption[] = type === 'vocab' ? VOCAB_USAGES : TEXT_USAGES

  const toggle = (id: string) => {
    const opt = options.find((o) => o.id === id)
    if (!opt?.available) return
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id))
    } else {
      onChange([...selected, id])
    }
  }

  return (
    <div className="space-y-2">
      <h5 className="text-[13px] font-semibold text-slate-700">选择练习形式（可多选）</h5>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.id)
          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              disabled={!opt.available}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200
                ${!opt.available
                  ? 'bg-slate-50 text-slate-300 border border-slate-200 cursor-not-allowed'
                  : isSelected
                    ? 'bg-blue-500 text-white border border-blue-500 shadow-sm shadow-blue-200'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
                }`}
            >
              {isSelected && <Check size={13} />}
              <span>{opt.label}</span>
              {!opt.available && opt.unavailableReason && (
                <span className="flex items-center gap-0.5 text-xs text-slate-300">
                  <AlertCircle size={10} />
                  {opt.unavailableReason}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default UsageSelector

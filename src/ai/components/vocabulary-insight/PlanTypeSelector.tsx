import { Clock, CheckCircle2 } from 'lucide-react'

export type PlanType = 'weekly_consolidation' | 'two_day_consolidation'

export const PLAN_TYPE_META: Record<PlanType, {
  label: string
  subtitle: string
  desc: string
  suitableFor: string
  defaultEndDays: number
  color: string
  bgColor: string
  borderColor: string
}> = {
  weekly_consolidation: {
    label: '一周巩固方案',
    subtitle: '2 份练习｜一周内完成',
    desc: '适合阶段复习、单元巩固等常规复习场景',
    suitableFor: '适合阶段复习、单元巩固等常规复习场景',
    defaultEndDays: 7,
    color: '#3b82f6',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  two_day_consolidation: {
    label: '两日巩固方案',
    subtitle: '2 份练习｜两天内完成',
    desc: '适合短时间内完成词汇复习或集中巩固',
    suitableFor: '适合短时间内完成词汇复习或集中巩固',
    defaultEndDays: 2,
    color: '#8b5cf6',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
}

interface Props {
  selected: PlanType | null
  onSelect: (type: PlanType) => void
}

export default function PlanTypeSelector({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {(Object.entries(PLAN_TYPE_META) as [PlanType, typeof PLAN_TYPE_META['weekly_consolidation']][]).map(([key, meta]) => {
        const isSelected = selected === key
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200
              ${isSelected
                ? `${meta.borderColor} bg-white shadow-md`
                : 'border-[#e8eef4] bg-white hover:border-slate-300 hover:shadow-sm'}`}
          >
            {isSelected && (
              <div className="absolute top-3 right-3">
                <CheckCircle2 size={18} style={{ color: meta.color }} />
              </div>
            )}
            <h3 className="text-[14px] font-bold text-slate-800 mb-1">{meta.label}</h3>
            <p className="text-[12px] font-medium text-slate-500 mb-2">{meta.subtitle}</p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <Clock size={11} />
              <span>{meta.suitableFor}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

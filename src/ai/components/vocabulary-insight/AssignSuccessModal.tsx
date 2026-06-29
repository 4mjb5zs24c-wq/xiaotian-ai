/**
 * AI 词汇洞察 — 布置成功独立弹窗（P0-15）
 *
 * 适用范围：
 *   1. 词汇提升方案布置成功
 *   2. 阶段词汇能力提升方案布置成功
 *   3. 多份练习一次性布置成功
 *   4. 重新生成后的方案布置成功
 *
 * 规则：
 *   - 布置成功后展示独立成功弹窗，覆盖当前页面展示
 *   - 老师关闭后回到当前方案页面，不自动跳走
 *   - 不在方案卡片下面展示成功提示
 */
import { X, CheckCircle2, FileText, Users, Clock, BookOpen } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  planName: string
  exerciseCount: number
  className: string
  publishDates: string[]
  deadlineDates: string[]
  allowLateSubmit?: boolean
  allowRetest?: boolean
  supportPaper?: boolean
  paperDefault?: boolean
}

export default function AssignSuccessModal({
  open,
  onClose,
  planName,
  exerciseCount,
  className,
  publishDates,
  deadlineDates,
  allowLateSubmit = true,
  allowRetest = true,
  supportPaper = false,
  paperDefault = false,
}: Props) {
  if (!open) return null

  const firstPublish = publishDates[0] || '—'
  const lastDeadline = deadlineDates[deadlineDates.length - 1] || '—'

  return (
    <div className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[480px] overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-50 px-6 py-4 flex items-start justify-between border-b border-emerald-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <CheckCircle2 size={18} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-emerald-800">布置成功</h2>
              <p className="text-[11px] text-emerald-600">方案已成功布置给全班学生</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-400 hover:text-emerald-600 transition-colors shrink-0">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* 方案名称 */}
          <div className="flex items-start gap-3">
            <BookOpen size={14} className="text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wide">方案名称</p>
              <p className="text-[13px] font-semibold text-slate-800">{planName}</p>
            </div>
          </div>

          {/* 练习数量 + 班级 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <FileText size={14} className="text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">已布置练习</p>
                <p className="text-[13px] font-semibold text-slate-800">{exerciseCount} 份练习</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Users size={14} className="text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">布置班级</p>
                <p className="text-[13px] font-semibold text-slate-800">{className}</p>
              </div>
            </div>
          </div>

          {/* 发布时间 + 截止时间 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Clock size={14} className="text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">发布时间</p>
                <p className="text-[13px] font-semibold text-slate-800">{firstPublish}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock size={14} className="text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">截止时间</p>
                <p className="text-[13px] font-semibold text-slate-800">{lastDeadline}</p>
              </div>
            </div>
          </div>

          {/* 设置项 */}
          <div className="bg-slate-50 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">允许补做</span>
              <span className={`font-medium ${allowLateSubmit ? 'text-emerald-600' : 'text-slate-400'}`}>
                {allowLateSubmit ? '是' : '否'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">允许重新测验</span>
              <span className={`font-medium ${allowRetest ? 'text-emerald-600' : 'text-slate-400'}`}>
                {allowRetest ? '是' : '否'}
              </span>
            </div>
            {supportPaper && (
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">包含纸质练习</span>
                <span className={`font-medium ${paperDefault ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {paperDefault ? '是' : '否'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
          <button onClick={onClose}
            className="px-6 py-2 rounded-lg text-[12px] font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-sm"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

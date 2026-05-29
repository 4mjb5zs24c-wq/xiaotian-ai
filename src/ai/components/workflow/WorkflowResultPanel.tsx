import { FileText } from 'lucide-react'
import type { WorkflowUIRresult } from '../../workflows/workflowTypes'

interface Props {
  result: WorkflowUIRresult
}

export default function WorkflowResultPanel({ result }: Props) {
  const { output } = result

  return (
    <div className="space-y-4">
      {/* Result header */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <FileText size={15} className="text-indigo-500" />
          <h4 className="text-sm font-semibold text-slate-800">{output.title}</h4>
        </div>
        <p className="text-xs text-slate-600">{output.summary}</p>
      </div>

      {/* Output items */}
      {output.items && output.items.length > 0 && (
        <div className="space-y-2">
          {output.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] text-slate-400 font-medium">{item.label}</span>
                </div>
                <p className="text-sm text-slate-700 truncate">{item.value}</p>
                {item.secondary && (
                  <p className="text-[10px] text-slate-400 mt-0.5">{item.secondary}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Metadata */}
      {output.metadata && Object.keys(output.metadata).length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(output.metadata).map(([key, val]) => (
            <div key={key} className="bg-slate-50 rounded-lg px-3 py-2">
              <p className="text-[10px] text-slate-400">{key}</p>
              <p className="text-xs font-medium text-slate-700">{val}</p>
            </div>
          ))}
        </div>
      )}

      {/* Suggestions */}
      {result.suggestions.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            AI 建议
          </h4>
          <div className="space-y-2">
            {result.suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                <span className="text-indigo-400 mt-0.5">●</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

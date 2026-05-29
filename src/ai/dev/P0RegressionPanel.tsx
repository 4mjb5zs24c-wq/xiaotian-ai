/**
 * P0 Regression Panel — 开发态验收面板
 *
 * 仅在 development 模式下显示。
 * 教师端正式界面不展示此面板。
 *
 * 功能:
 *   - 运行 P0 自检
 *   - 展示通过/失败结果
 *   - 展示失败原因和修复文件
 *   - 支持复制验收结果
 */

import { useState } from 'react'
import { Check, X, Copy, Play, ChevronDown, ChevronUp } from 'lucide-react'
import { runP0RegressionSelfCheck } from '../tests/runP0RegressionSelfCheck'
import type { RegressionReport } from '../tests/runP0RegressionSelfCheck'

// Only render in development
const isDev = import.meta.env.DEV

export default function P0RegressionPanel() {
  if (!isDev) return null

  const [report, setReport] = useState<RegressionReport | null>(null)
  const [expanded, setExpanded] = useState(true)
  const [copied, setCopied] = useState(false)

  const handleRun = () => {
    const r = runP0RegressionSelfCheck()
    setReport(r)
  }

  const handleCopy = () => {
    if (!report) return
    const text = report.lines.join('\n')
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="fixed bottom-4 right-4 z-[200] w-80 bg-white border border-slate-300 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-100 hover:bg-slate-200 transition-colors"
      >
        <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          P0 验收面板 (Dev)
        </span>
        {expanded ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronUp size={14} className="text-slate-400" />}
      </button>

      {expanded && (
        <div className="p-3 space-y-3">
          {/* Run button */}
          <button
            onClick={handleRun}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 transition-colors"
          >
            <Play size={13} />运行 P0 回归自检
          </button>

          {/* Results */}
          {report && (
            <>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">
                  通过 <span className="text-emerald-600 font-semibold">{report.passed}</span> / {report.total}
                </span>
                <span className="text-slate-500">
                  失败 <span className={report.failed > 0 ? 'text-red-500 font-semibold' : 'text-slate-400'}>{report.failed}</span>
                </span>
                <span className={`text-[10px] font-semibold ${report.failed === 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {Math.round(report.passed / report.total * 100)}%
                </span>
              </div>

              {/* Pass/fail detail */}
              <div className="max-h-48 overflow-y-auto space-y-0.5 text-[10px]">
                {report.lines
                  .filter((l) => l.includes('✅') || l.includes('❌'))
                  .map((line, i) => (
                    <div key={i} className={`flex items-start gap-1 ${line.includes('❌') ? 'text-red-600' : 'text-slate-500'}`}>
                      <span className="shrink-0 mt-0.5">{line.includes('✅') ? <Check size={10} className="text-emerald-500" /> : <X size={10} className="text-red-500" />}</span>
                      <span>{line.replace(/^\s*[✅❌]\s*/, '')}</span>
                    </div>
                  ))}
              </div>

              {/* Failed items fix files */}
              {report.failedItems.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                  <p className="text-[10px] font-semibold text-red-600 mb-1">需修复:</p>
                  {report.failedItems.map((f, i) => (
                    <p key={i} className="text-[10px] text-red-500">
                      {f.fixFile}: {f.desc}
                    </p>
                  ))}
                </div>
              )}

              {/* Copy button */}
              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 text-[11px] text-slate-500 hover:bg-slate-50 transition-colors"
              >
                {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                {copied ? '已复制' : '复制验收结果'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

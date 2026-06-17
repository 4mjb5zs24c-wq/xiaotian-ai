import React, { useState, useEffect, useRef } from 'react'
import { Sparkles } from 'lucide-react'
import type { LoadingStep } from '../../search-new/types'

interface AISearchLoadingProps {
  steps: LoadingStep[]
  onComplete: () => void
}

/**
 * V1.1 AI 思考感 Loading — three-step animated loading.
 *
 * Replaces the generic "searching..." indicator with a
 * step-by-step AI thinking sequence that feels intelligent
 * but stays professional for teacher-facing UI.
 */
const AISearchLoading: React.FC<AISearchLoadingProps> = ({ steps, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [visible, setVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (steps.length === 0) {
      onComplete()
      return
    }

    let stepIndex = 0
    let totalDelay = 0

    const advance = () => {
      if (stepIndex < steps.length) {
        setCurrentStep(stepIndex)
        const delay = steps[stepIndex].duration
        totalDelay += delay
        stepIndex++
        timerRef.current = setTimeout(advance, delay)
      } else {
        // All steps shown — brief hold then complete
        timerRef.current = setTimeout(() => {
          setVisible(false)
          // Small delay for fade-out before completing
          setTimeout(onComplete, 150)
        }, 200)
      }
    }

    // Start immediately
    advance()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [steps, onComplete])

  if (!visible) return null

  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-5">
      {/* Animated icon */}
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-200/40">
          <Sparkles size={22} className="text-white animate-pulse" />
        </div>
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-2xl bg-blue-400/20 animate-ping" style={{ animationDuration: '2s' }} />
      </div>

      {/* Step text */}
      <div className="space-y-2 w-full max-w-sm">
        {steps.map((step, i) => {
          const isCurrent = i === currentStep
          const isPast = i < currentStep
          return (
            <div
              key={i}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                isCurrent
                  ? 'bg-blue-50 border border-blue-100'
                  : isPast
                    ? 'opacity-50'
                    : 'opacity-0 translate-y-1'
              }`}
            >
              {/* Step indicator */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold transition-colors duration-300 ${
                  isPast
                    ? 'bg-green-400 text-white'
                    : isCurrent
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-200 text-slate-400'
                }`}
              >
                {isPast ? '✓' : i + 1}
              </div>

              {/* Step text */}
              <span
                className={`text-[13px] transition-colors duration-300 ${
                  isCurrent
                    ? 'text-slate-700 font-medium'
                    : 'text-slate-400'
                }`}
              >
                {step.text}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AISearchLoading

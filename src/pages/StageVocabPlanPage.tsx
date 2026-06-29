import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import StageVocabPlanModal from '../ai/components/vocabulary-insight/StageVocabPlanModal'

/**
 * StageVocabPlanPage — full page shell.
 * Primary entry is now the modal via HomePage;
 * this page is kept as a fallback / direct-link target.
 */
export default function StageVocabPlanPage() {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center px-6">
      <div className="flex-1 w-full py-5 space-y-5 max-w-[880px]">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">阶段词汇复习方案</h1>
            <p className="text-xs text-slate-400">适用于期中、期末、高三一轮等复习场景，按年级与复习范围生成阶段词汇复习方案。</p>
          </div>
        </div>
        <StageVocabPlanModal open onClose={() => navigate(-1)} />
      </div>
    </div>
  )
}

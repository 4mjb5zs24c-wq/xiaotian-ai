import { useNavigate } from 'react-router-dom'
import { PenLine, Download, BookOpen, Edit3, ChevronRight, FileText } from 'lucide-react'
import SpecializedInsightEntry from '../ai/components/SpecializedInsightEntry'

export default function WritingPracticePage() {
  const navigate = useNavigate()

  const handleToast = (msg: string) => alert(msg)

  return (
    <div className="h-full flex flex-col min-h-0">
      {/* White Content Container */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl border border-[#e8eef4] shadow-sm overflow-hidden relative">

        {/* ── Top Bar: Title + Download Button ── */}
        <div className="shrink-0 flex items-center justify-between px-6 pt-5 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50">
              <PenLine size={16} className="text-[#4b9fe8]" />
            </div>
            <h1 className="text-[16px] font-bold text-[#3a4f66]">作文练习</h1>
          </div>
          <button
            onClick={() => handleToast('通用答题卡下载将在真实接口接入后启用')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#eaf2fb] text-[#4b9fe8] text-[12px] font-medium hover:bg-[#d6e6f7] transition-colors"
          >
            <Download size={13} />
            下载通用答题卡
          </button>
        </div>

        {/* ── Writing Insight ── */}
        <div className="shrink-0 px-6 pb-3">
          <SpecializedInsightEntry type="writing" />
        </div>

        {/* ── Two Entry Cards ── */}
        <div className="shrink-0 px-6 pb-5">
          <div className="grid grid-cols-2 gap-4">
            {/* 教材同步练习 */}
            <button
              onClick={() => handleToast('请选择教材单元后生成同步作文练习')}
              className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-br from-[#eaf2fb] to-[#dce8f5] border border-[#c8ddf0] hover:border-[#4b9fe8] hover:shadow-md transition-all group"
            >
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen size={20} className="text-[#4b9fe8]" />
                  <span className="text-[14px] font-bold text-[#3a4f66]">教材同步练习</span>
                </div>
                <p className="text-[11px] text-[#6b8aaa] mt-1">基于教材单元主题生成同步作文题</p>
              </div>
              <ChevronRight size={18} className="text-[#b8cde0] group-hover:text-[#4b9fe8] transition-colors" />
            </button>

            {/* 自定义出题 */}
            <button
              onClick={() => handleToast('请输入作文主题、字数和评分要求')}
              className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-br from-[#f0f4fa] to-[#e4ecf5] border border-[#c8ddf0] hover:border-[#4b9fe8] hover:shadow-md transition-all group"
            >
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1">
                  <Edit3 size={20} className="text-[#5bb878]" />
                  <span className="text-[14px] font-bold text-[#3a4f66]">自定义出题</span>
                </div>
                <p className="text-[11px] text-[#6b8aaa] mt-1">自定义作文主题、字数和评分要求</p>
              </div>
              <ChevronRight size={18} className="text-[#b8cde0] group-hover:text-[#5bb878] transition-colors" />
            </button>
          </div>
        </div>

        {/* ── 学情统计 Section ── */}
        <div className="shrink-0 px-6 pb-3">
          <div className="flex items-center gap-2">
            <FileText size={14} className="text-[#4b9fe8]" />
            <h3 className="text-[13px] font-semibold text-[#3a4f66]">学情统计</h3>
          </div>
        </div>

        {/* ── Empty State ── */}
        <div className="flex-1 flex flex-col items-center justify-center pb-16">
          {/* Illustration placeholder */}
          <div className="w-40 h-32 mb-5 relative">
            {/* Simple desk/board illustration */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-2 rounded-full bg-[#e4ecf3]" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-20 rounded-xl bg-[#f4f7fa] border border-[#e4ecf3] flex items-center justify-center">
              <div className="text-center">
                <PenLine size={28} className="text-[#c0d4e8] mx-auto mb-1" />
                <div className="w-12 h-1 bg-[#e4ecf3] rounded-full mx-auto" />
                <div className="w-8 h-1 bg-[#eef2f6] rounded-full mx-auto mt-0.5" />
              </div>
            </div>
            {/* Sparkle accent */}
            <div className="absolute top-0 right-8 w-6 h-6 rounded-full bg-[#eaf2fb] flex items-center justify-center">
              <span className="text-[10px]">✨</span>
            </div>
          </div>

          <p className="text-[13px] text-[#8aabcc] font-medium">
            本班级没有提交作业，请完成一次作业后，再查看
          </p>
        </div>
      </div>

      {/* ── Right Floating Buttons ── */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-20">
        <button className="flex flex-col items-center gap-0.5 px-2 py-3 bg-[#4b9fe8] text-white text-[10px] rounded-lg hover:bg-[#3a8fd8] transition-colors shadow-md">
          <BookOpen size={14} />
          <span style={{ writingMode: 'vertical-rl' }}>我的备课</span>
        </button>
        <button className="p-1 bg-white border border-[#e4ecf3] rounded-full text-[#8aabcc] hover:text-[#4a6b8a] shadow-sm transition-colors">
          <ChevronRight size={12} className="rotate-180" />
        </button>
      </div>

      {/* ── Return Button ── */}
      <button
        onClick={() => navigate('/')}
        className="fixed left-[165px] bottom-6 flex items-center gap-1 text-[11px] text-[#8aabcc] hover:text-[#4a6b8a] transition-colors z-20"
      >
        <ChevronRight size={11} className="rotate-180" />返回
      </button>
    </div>
  )
}

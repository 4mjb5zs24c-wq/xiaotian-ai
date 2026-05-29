import { Sparkles, ChevronRight } from 'lucide-react'
import { useAIStore } from '../store'
import { generateTeachingInsight } from '../insights/teachingInsightGenerator'
import type { TeachingInsightType } from '../insights/teachingInsightTypes'

export interface InsightMetric {
  label: string
  value: string
  trend?: string
  level: 'danger' | 'warning' | 'normal' | 'positive'
}

export type InsightEntryType =
  | 'vocabulary'
  | 'vocabulary-student'
  | 'listeningSpeaking'
  | 'writing'
  | 'practiceStage'

interface Props {
  type: InsightEntryType
}

// ── Config per type (summary display only — detail data from generateTeachingInsight) ──

interface EntryConfig {
  title: string
  summary: string
  metrics: InsightMetric[]
  panel: string
  insightType: TeachingInsightType
}

function metricColor(level: InsightMetric['level']) {
  switch (level) {
    case 'danger': return 'text-red-500 bg-red-50'
    case 'warning': return 'text-amber-500 bg-amber-50'
    case 'normal': return 'text-blue-500 bg-blue-50'
    case 'positive': return 'text-emerald-500 bg-emerald-50'
  }
}

function getConfig(type: InsightEntryType): EntryConfig {
  switch (type) {
    case 'vocabulary':
      return {
        title: '词汇掌握洞察',
        summary: '近两周新增错词 23 个，重复错词 8 个，词汇拼写正确率 62% 需关注',
        metrics: [
          { label: '新增错词', value: '23', trend: '+8', level: 'warning' },
          { label: '重复错词', value: '8', trend: '+3', level: 'warning' },
          { label: '听写正确率', value: '62%', trend: '-12%', level: 'danger' },
          { label: '已掌握词', value: '156', trend: '+21', level: 'positive' },
        ],
        panel: 'vocabStageInsight',
        insightType: 'vocabulary',
      }
    case 'vocabulary-student':
      return {
        title: '词汇掌握洞察',
        summary: '班级累计错词 3,189 词，学生平均已练习 45 词，仍有 8 名学生未开始练习',
        metrics: [
          { label: '累计错词', value: '3,189', level: 'normal' },
          { label: '已练习错词', value: '45', level: 'normal' },
          { label: '已掌握词', value: '12', trend: '+3', level: 'positive' },
          { label: '反复错词', value: '8', trend: '+2', level: 'danger' },
          { label: '需关注学生', value: '8人', level: 'warning' },
        ],
        panel: 'vocabStageInsight',
        insightType: 'vocabulary',
      }
    case 'listeningSpeaking':
      return {
        title: '听说能力洞察',
        summary: '数字信息识别正确率 58%，较上月下降 12%，细节题正确率 71%',
        metrics: [
          { label: '听力练习次数', value: '24', level: 'normal' },
          { label: '平均得分率', value: '68%', trend: '-12%', level: 'danger' },
          { label: '细节题正确率', value: '71%', level: 'normal' },
          { label: '数字识别', value: '58%', trend: '-12%', level: 'danger' },
          { label: '独白理解', value: '65%', level: 'warning' },
          { label: '听说完成率', value: '78%', level: 'normal' },
        ],
        panel: 'listeningStageInsight',
        insightType: 'listeningSpeaking',
      }
    case 'writing':
      return {
        title: '写作表现洞察',
        summary: '句式多样性 58%，语法准确性 62%，需安排句式升级训练',
        metrics: [
          { label: '写作练习次数', value: '12', level: 'normal' },
          { label: '平均得分率', value: '65%', level: 'warning' },
          { label: '提交率', value: '85%', level: 'normal' },
          { label: '平均字数', value: '87', level: 'normal' },
          { label: '句式多样性', value: '58%', level: 'danger' },
          { label: '语法准确性', value: '62%', level: 'warning' },
        ],
        panel: 'writingStageInsight',
        insightType: 'writing',
      }
    case 'practiceStage':
      return {
        title: '阶段练习洞察',
        summary: '近两周 8 份练习，完成率 82%，较前两周下降 7 个百分点',
        metrics: [
          { label: '完成率', value: '82%', trend: '↓7%', level: 'warning' },
          { label: '词汇拼写', value: '62%', trend: '需关注', level: 'danger' },
          { label: '学生关注', value: '8人', level: 'warning' },
        ],
        panel: 'practiceStageInsight',
        insightType: 'practiceStage',
      }
  }
}

// ── Component ────────────────────────────────────────────

export default function SpecializedInsightEntry({ type }: Props) {
  const setPanel = useAIStore((s) => s.setAIDrawerPanel)
  const config = getConfig(type)

  const handleClick = () => {
    const insight = generateTeachingInsight(config.insightType)
    setPanel(config.panel, { insight } as Record<string, unknown>)
  }

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 hover:border-blue-300 hover:shadow-sm transition-all group"
    >
      <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500 shrink-0">
        <Sparkles size={14} className="text-white" />
      </div>
      <span className="text-[11px] font-bold text-[#3a4f66] shrink-0">{config.title}</span>
      <span className="text-[#d0dce8] text-[10px] shrink-0">·</span>
      <span className="text-[10px] text-slate-600 truncate">{config.summary}</span>
      <div className="flex items-center gap-2 ml-auto shrink-0">
        {config.metrics.slice(0, 4).map((m, i) => (
          <span
            key={i}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] ${metricColor(m.level)}`}
          >
            <span className="opacity-70">{m.label}</span>
            <span className="font-bold">{m.value}</span>
            {m.trend && <span className="text-[9px] opacity-70">{m.trend}</span>}
          </span>
        ))}
        <span className="text-[11px] text-[#4b9fe8] group-hover:translate-x-0.5 transition-transform font-medium whitespace-nowrap">
          查看分析 <ChevronRight size={10} className="inline" />
        </span>
      </div>
    </button>
  )
}

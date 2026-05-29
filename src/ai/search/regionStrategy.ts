import type { Region, RegionConfig } from './types'

const regionConfigs: Record<Region, RegionConfig> = {
  default: {
    region: 'default',
    label: '通用',
    listeningWeight: 0.35,
    speakingWeight: 0.15,
    readingWeight: 0.50,
    priorityResourceTypes: ['listening', 'reading', 'vocabulary'],
  },
  guangdong: {
    region: 'guangdong',
    label: '广东',
    listeningWeight: 0.25,
    speakingWeight: 0.45,
    readingWeight: 0.30,
    // 广东中考含听说考试，口语权重高
    priorityResourceTypes: ['speaking', 'listening', 'reading'],
  },
  jiangsu: {
    region: 'jiangsu',
    label: '江苏',
    listeningWeight: 0.30,
    speakingWeight: 0.25,
    readingWeight: 0.45,
    // 江苏人机对话考试
    priorityResourceTypes: ['speaking', 'listening', 'reading'],
  },
  zhejiang: {
    region: 'zhejiang',
    label: '浙江',
    listeningWeight: 0.35,
    speakingWeight: 0.20,
    readingWeight: 0.45,
    priorityResourceTypes: ['listening', 'reading', 'vocabulary'],
  },
  beijing: {
    region: 'beijing',
    label: '北京',
    listeningWeight: 0.30,
    speakingWeight: 0.30,
    readingWeight: 0.40,
    priorityResourceTypes: ['speaking', 'listening', 'reading'],
  },
  shanghai: {
    region: 'shanghai',
    label: '上海',
    listeningWeight: 0.30,
    speakingWeight: 0.30,
    readingWeight: 0.40,
    priorityResourceTypes: ['speaking', 'listening', 'reading'],
  },
}

/**
 * Get the region strategy for a given region.
 * Falls back to 'default' for unknown regions.
 */
export function getRegionConfig(region: Region): RegionConfig {
  return regionConfigs[region] || regionConfigs.default
}

/**
 * Given a region, determine the preferred resource type order.
 * e.g. Guangdong returns speaking first, most others return listening first.
 */
export function getPriorityResourceTypes(region: Region): string[] {
  const cfg = getRegionConfig(region)
  return cfg.priorityResourceTypes
}

/**
 * Get a human-readable explanation of the region strategy.
 */
export function getRegionExplanation(region: Region): string {
  const cfg = getRegionConfig(region)
  const priority = cfg.priorityResourceTypes.map(typeLabel).join('、')
  return `${cfg.label}地区：优先匹配${priority}类资源`
}

function typeLabel(t: string): string {
  const map: Record<string, string> = {
    listening: '听力',
    speaking: '听说/口语',
    reading: '阅读',
    vocabulary: '词汇',
    writing: '写作',
    grammar: '语法',
    courseware: '课件',
    video: '视频',
    current_news: '时文',
    dubbing: '配音',
    exercise: '练习卷',
    exam_paper: '试卷',
  }
  return map[t] || t
}

# 各地区中高考英语听力/听说规则配置

> 版本: v1.0 | 日期: 2026-05-27
> 用途: AI 听力/听说洞察的地区适配
> 状态: 部分已确认，部分待补充

---

## 说明

本文档记录各地区中高考英语听力/听说考试规则，用于：
1. 听力/听说洞察的推荐逻辑
2. 资源推荐的地区适配
3. 考前训练提醒的题型匹配

**可信度标记**:
- ✅ 已确认: 有官方来源
- ⚠️ 待确认: 有非官方来源但需验证
- ❌ 待补充: 无可靠来源，需人工补充

---

## 配置结构

```json
{
  "region": "地区名称",
  "stage": "中考 / 高考",
  "testsListening": true/false,
  "testsSpeaking": true/false,
  "hasHumanMachineDialogue": true/false,
  "examMode": "听力 / 听说 / 听说+人机对话",
  "totalScore": "分值",
  "questionTypes": [],
  "skillDimensions": [],
  "recommendedTraining": [],
  "source": "官方来源URL",
  "lastUpdated": "YYYY-MM-DD",
  "confidence": "确认 / 待确认 / 待补充",
  "notes": "备注"
}
```

---

## 广东

### 中考

| 字段 | 值 |
|------|-----|
| region | 广东 |
| stage | 中考 |
| testsListening | true（过渡期保留笔试听力） |
| testsSpeaking | true |
| hasHumanMachineDialogue | true |
| examMode | 听说 / 人机对话 |
| totalScore | 30分（2027年起正式计入总分，2025-2026年为等级制过渡期） |
| confidence | ✅ 已确认 |

**题型结构**:

| 大题 | 题型 | 题量 | 分值 | 能力维度 |
|------|------|:--:|:--:|------|
| 一、模仿朗读 | 朗读短文 | 1题 | 6分 | 语音准确度、流利度、语调 |
| 二、信息获取-听对话 | 听对话选答案 | 6题 | 9分 | 细节捕捉、信息提取 |
| 二、信息获取-听独白 | 听独白回答问题 | 4题 | 6分 | 主旨理解、细节记忆 |
| 三、信息转述 | 短文转述 | 1题 | 6分 | 信息整合、语言组织 |
| 三、询问 | 根据中文提示翻译问句 | 2题 | 3分 | 语法准确度、问句结构 |

**skillDimensions**: ["模仿朗读", "信息获取", "信息转述", "询问能力", "语音准确度", "流利度"]

**recommendedTraining**: ["听说专项", "听说模拟", "跟读训练", "信息转述训练", "询问训练"]

**常见扣分雷区**:
- "吞音"和"加音"（如复数漏读 /s/）
- 关键词堆砌（"关键词沙拉"）
- 时态和人称不统一
- 疑问词错用或语序不当
- 尾音不到位
- n/l 不分（粤语方言区）
- 节奏不当（无意群停顿）

**source**: 广东省教育考试院通知；中山市2025年中考英语听说考试指引
**lastUpdated**: 2025-05

### 高考

| 字段 | 值 |
|------|-----|
| region | 广东 |
| stage | 高考 |
| testsListening | false（听说考试替代听力） |
| testsSpeaking | true |
| hasHumanMachineDialogue | true |
| examMode | 听说 / 人机对话 |
| totalScore | 15分（计入高考总分） |
| confidence | ✅ 已确认 |

**题型结构**:

| 部分 | 题型 | 分值 | 能力维度 |
|------|------|:--:|------|
| Part A | 模仿朗读 | 5分 | 语音、语调、流利度 |
| Part B | 角色扮演（三问五答） | 4分 | 获取信息、提问、回答 |
| Part C | 故事复述 | 6分 | 信息抓取、语言组织、连贯表达 |

**skillDimensions**: ["模仿朗读", "角色扮演", "故事复述", "信息转述", "语言组织"]

**recommendedTraining**: ["听说专项", "听说模拟", "故事复述训练", "角色扮演训练"]

**source**: 广东省教育考试院
**lastUpdated**: 2025-05

---

## 北京

### 中考

| 字段 | 值 |
|------|-----|
| region | 北京 |
| stage | 中考 |
| testsListening | false（机考替代） |
| testsSpeaking | true |
| hasHumanMachineDialogue | true |
| examMode | 听说 / 人机对话 |
| totalScore | 40分 |
| confidence | ⚠️ 待确认（需官方来源验证） |

**题型结构** (待确认):

| 部分 | 题型 | 能力维度 |
|------|------|------|
| 听后选择 | 听对话/独白选答案 | 细节捕捉、主旨理解 |
| 听后回答 | 口头回答问题 | 信息提取、口语表达 |
| 听后记录并转述 | 填表+转述 | 信息整合、语言组织 |
| 朗读短文 | 朗读 | 语音、语调、流利度 |

**skillDimensions**: ["听后选择", "听后回答", "信息转述", "模仿朗读"] (待确认)

**recommendedTraining**: ["听说专项", "听说模拟", "跟读训练"] (待确认)

**source**: 待补充官方来源
**lastUpdated**: 待补充

### 高考

| 字段 | 值 |
|------|-----|
| region | 北京 |
| stage | 高考 |
| testsListening | true |
| testsSpeaking | false（部分专业需要口语加试） |
| hasHumanMachineDialogue | false |
| examMode | 听力（笔试） |
| totalScore | 30分 |
| confidence | ⚠️ 待确认 |

**source**: 待补充官方来源
**lastUpdated**: 待补充

---

## 江苏

| 字段 | 中考 | 高考 |
|------|:--:|:--:|
| region | 江苏 | 江苏 |
| testsListening | true | true |
| testsSpeaking | true（人机对话） | false（部分专业需要） |
| examMode | 听力+听说/人机对话 | 听力（笔试） |
| totalScore | 待补充 | 30分 |
| confidence | ⚠️ 待确认 | ⚠️ 待确认 |

**中考听说** (待确认):
- 江苏中考英语听力口语自动化考试（人机对话）
- 包含：听力选择 + 口语（朗读、回答问题、话题简述）

**source**: 待补充官方来源（江苏省教育考试院）
**lastUpdated**: 待补充

---

## 浙江

| 字段 | 中考 | 高考 |
|------|:--:|:--:|
| region | 浙江 | 浙江 |
| testsListening | true | true |
| testsSpeaking | false | false |
| examMode | 听力（笔试） | 听力（笔试） |
| confidence | ⚠️ 待确认 | ⚠️ 待确认 |

**source**: 待补充官方来源（浙江省教育考试院）
**lastUpdated**: 待补充

---

## 上海

| 字段 | 中考 | 高考 |
|------|:--:|:--:|
| region | 上海 | 上海 |
| testsListening | true | true |
| testsSpeaking | true（听说测试） | true（口语测试） |
| examMode | 听力+听说 | 听力+口语 |
| confidence | ⚠️ 待确认 | ⚠️ 待确认 |

**source**: 待补充官方来源（上海市教育考试院）
**lastUpdated**: 待补充

---

## 待补充地区

以下地区需要人工补充（优先级按用户覆盖范围排序）:

- [ ] 山东 — 中考/高考
- [ ] 河南 — 中考/高考
- [ ] 四川 — 中考/高考
- [ ] 湖北 — 中考/高考
- [ ] 湖南 — 中考/高考
- [ ] 福建 — 中考/高考
- [ ] 安徽 — 中考/高考
- [ ] 河北 — 中考/高考
- [ ] 陕西 — 中考/高考
- [ ] 辽宁 — 中考/高考
- [ ] 重庆 — 中考
- [ ] 天津 — 中考/高考

---

## 使用规则

1. 听力/听说洞察优先使用已确认的配置
2. 待确认配置在洞察中标注"建议参考"而非"必须执行"
3. 待补充地区在洞察中不区分听力/听说，仅基于老师实际练习数据推荐
4. 每年考试季前需检查并更新配置

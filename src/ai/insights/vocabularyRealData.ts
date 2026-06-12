import type { VocabularyInsightData } from "./vocabularyInsightTypes";

export const VOCABULARY_REAL_DATA: VocabularyInsightData = {
  "classId": "class-2023级R6班",
  "className": "2023级R6班",
  "unitId": "real-data",
  "unitName": "平台真实数据（错误记录）",
  "timeRange": "30d",
  "updatedAt": "2026-06-11 11:05",
  "summary": "基于 2023级R6班 共 37 名学生的 1111 条词汇错误记录，共涉及 727 个不同词汇。平台错因标注均为「不会写」（拼写错误类），高频错词 50 个，薄弱学生 27 人。建议重点加强默写和拼写训练。",
  "metrics": {
    "practicedWordCount": 727,
    "weakWordCount": 50,
    "weakStudentCount": 27,
    "mainWeakType": "拼不对 / 默写错误"
  },
  "errorTypes": [
    {
      "type": "spelling",
      "label": "拼不对 / 默写错误",
      "percent": 100,
      "affectedStudentCount": 36,
      "exampleWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students"
      ],
      "aiReason": "平台词汇错因数据仅标注'不会写'，归类为拼写错误。37名学生中有1111次拼写错误记录。",
      "recommendedActions": [
        "默写",
        "词汇复习规划",
        "组卷"
      ],
      "borderColor": "#f0a060",
      "bgColor": "#fef8f0"
    },
    {
      "type": "contextual_usage",
      "label": "不会用 / 语境应用弱",
      "percent": 0,
      "affectedStudentCount": 0,
      "exampleWords": [],
      "aiReason": "当前数据中未单独标记语境应用类型错误，建议平台补充错因分类。",
      "recommendedActions": [
        "组卷",
        "讲词"
      ],
      "borderColor": "#4b9fe8",
      "bgColor": "#f0f6fc"
    }
  ],
  "weakWords": [
    {
      "id": "ww-000",
      "text": "AI/artificial intelligence",
      "itemType": "word",
      "scoreRate": 10.0,
      "errorRate": 90.0,
      "affectedStudentCount": 9,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在9名学生中出现16次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 99
    },
    {
      "id": "ww-001",
      "text": "truly",
      "itemType": "word",
      "scoreRate": 15.6,
      "errorRate": 84.4,
      "affectedStudentCount": 11,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在11名学生中出现15次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 94
    },
    {
      "id": "ww-002",
      "text": "technology",
      "itemType": "word",
      "scoreRate": 26.9,
      "errorRate": 73.1,
      "affectedStudentCount": 9,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在9名学生中出现13次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 86
    },
    {
      "id": "ww-003",
      "text": "writing",
      "itemType": "word",
      "scoreRate": 26.9,
      "errorRate": 73.1,
      "affectedStudentCount": 7,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在7名学生中出现13次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 86
    },
    {
      "id": "ww-004",
      "text": "students",
      "itemType": "word",
      "scoreRate": 55.0,
      "errorRate": 45.0,
      "affectedStudentCount": 7,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在7名学生中出现8次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 64
    },
    {
      "id": "ww-005",
      "text": "exhibition",
      "itemType": "word",
      "scoreRate": 55.0,
      "errorRate": 45.0,
      "affectedStudentCount": 3,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在3名学生中出现8次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 64
    },
    {
      "id": "ww-006",
      "text": "recommend",
      "itemType": "word",
      "scoreRate": 55.0,
      "errorRate": 45.0,
      "affectedStudentCount": 7,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在7名学生中出现8次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 64
    },
    {
      "id": "ww-007",
      "text": "video",
      "itemType": "word",
      "scoreRate": 60.6,
      "errorRate": 39.4,
      "affectedStudentCount": 7,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在7名学生中出现7次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 60
    },
    {
      "id": "ww-008",
      "text": "strengthen",
      "itemType": "word",
      "scoreRate": 66.2,
      "errorRate": 33.8,
      "affectedStudentCount": 5,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在5名学生中出现6次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 55
    },
    {
      "id": "ww-009",
      "text": "resilience",
      "itemType": "word",
      "scoreRate": 66.2,
      "errorRate": 33.8,
      "affectedStudentCount": 5,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在5名学生中出现6次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 55
    },
    {
      "id": "ww-010",
      "text": "cultural",
      "itemType": "word",
      "scoreRate": 66.2,
      "errorRate": 33.8,
      "affectedStudentCount": 6,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在6名学生中出现6次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 55
    },
    {
      "id": "ww-011",
      "text": "corridor",
      "itemType": "word",
      "scoreRate": 66.2,
      "errorRate": 33.8,
      "affectedStudentCount": 5,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在5名学生中出现6次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 55
    },
    {
      "id": "ww-012",
      "text": "definitely",
      "itemType": "word",
      "scoreRate": 66.2,
      "errorRate": 33.8,
      "affectedStudentCount": 3,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在3名学生中出现6次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 55
    },
    {
      "id": "ww-013",
      "text": "broaden",
      "itemType": "word",
      "scoreRate": 71.9,
      "errorRate": 28.1,
      "affectedStudentCount": 5,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在5名学生中出现5次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 51
    },
    {
      "id": "ww-014",
      "text": "opportunity",
      "itemType": "word",
      "scoreRate": 71.9,
      "errorRate": 28.1,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现5次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 51
    },
    {
      "id": "ww-015",
      "text": "activity",
      "itemType": "word",
      "scoreRate": 71.9,
      "errorRate": 28.1,
      "affectedStudentCount": 3,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在3名学生中出现5次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 51
    },
    {
      "id": "ww-016",
      "text": "technologies",
      "itemType": "word",
      "scoreRate": 71.9,
      "errorRate": 28.1,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现5次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 51
    },
    {
      "id": "ww-017",
      "text": "the",
      "itemType": "word",
      "scoreRate": 71.9,
      "errorRate": 28.1,
      "affectedStudentCount": 5,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在5名学生中出现5次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 51
    },
    {
      "id": "ww-018",
      "text": "lives",
      "itemType": "word",
      "scoreRate": 71.9,
      "errorRate": 28.1,
      "affectedStudentCount": 3,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在3名学生中出现5次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 51
    },
    {
      "id": "ww-019",
      "text": "Beijing",
      "itemType": "word",
      "scoreRate": 71.9,
      "errorRate": 28.1,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现5次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 51
    },
    {
      "id": "ww-020",
      "text": "efficiency",
      "itemType": "word",
      "scoreRate": 71.9,
      "errorRate": 28.1,
      "affectedStudentCount": 5,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在5名学生中出现5次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 51
    },
    {
      "id": "ww-021",
      "text": "assistant",
      "itemType": "word",
      "scoreRate": 71.9,
      "errorRate": 28.1,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现5次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 51
    },
    {
      "id": "ww-022",
      "text": "criticise",
      "itemType": "word",
      "scoreRate": 71.9,
      "errorRate": 28.1,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现5次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 51
    },
    {
      "id": "ww-023",
      "text": "understanding",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 3,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在3名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-024",
      "text": "solve",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 3,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在3名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-025",
      "text": "create",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-026",
      "text": "homework",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 3,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在3名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-027",
      "text": "process",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-028",
      "text": "benefits",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-029",
      "text": "participate",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-030",
      "text": "improvement",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-031",
      "text": "equip",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 2,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在2名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-032",
      "text": "undoubtedly",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 2,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在2名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-033",
      "text": "horizon",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-034",
      "text": "thinking",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 3,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在3名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-035",
      "text": "assistance",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-036",
      "text": "interested",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-037",
      "text": "responsibility",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-038",
      "text": "sustainable",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-039",
      "text": "essential",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-040",
      "text": "suggestions",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-041",
      "text": "showcase",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 3,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在3名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-042",
      "text": "outsource",
      "itemType": "word",
      "scoreRate": 77.5,
      "errorRate": 22.5,
      "affectedStudentCount": 4,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在4名学生中出现4次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 47
    },
    {
      "id": "ww-043",
      "text": "thoughts",
      "itemType": "word",
      "scoreRate": 83.1,
      "errorRate": 16.9,
      "affectedStudentCount": 1,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在1名学生中出现3次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 42
    },
    {
      "id": "ww-044",
      "text": "involves",
      "itemType": "word",
      "scoreRate": 83.1,
      "errorRate": 16.9,
      "affectedStudentCount": 3,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在3名学生中出现3次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 42
    },
    {
      "id": "ww-045",
      "text": "continuously",
      "itemType": "word",
      "scoreRate": 83.1,
      "errorRate": 16.9,
      "affectedStudentCount": 2,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在2名学生中出现3次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 42
    },
    {
      "id": "ww-046",
      "text": "failure",
      "itemType": "word",
      "scoreRate": 83.1,
      "errorRate": 16.9,
      "affectedStudentCount": 3,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在3名学生中出现3次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 42
    },
    {
      "id": "ww-047",
      "text": "analyse/analyze",
      "itemType": "word",
      "scoreRate": 83.1,
      "errorRate": 16.9,
      "affectedStudentCount": 2,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在2名学生中出现3次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 42
    },
    {
      "id": "ww-048",
      "text": "enrich",
      "itemType": "word",
      "scoreRate": 83.1,
      "errorRate": 16.9,
      "affectedStudentCount": 3,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在3名学生中出现3次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 42
    },
    {
      "id": "ww-049",
      "text": "reply",
      "itemType": "word",
      "scoreRate": 83.1,
      "errorRate": 16.9,
      "affectedStudentCount": 3,
      "mainErrorType": "spelling",
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        }
      ],
      "typicalMistakes": [],
      "sourceTasks": [
        "平台词汇练习"
      ],
      "aiReason": "该词在3名学生中出现3次拼写错误，高频错词。",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "priorityScore": 42
    }
  ],
  "weakStudents": [
    {
      "id": "24754416",
      "name": "吴姗珊",
      "scoreRate": 79.8,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共20次拼写错误，涉及17个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 21,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24754425",
      "name": "张若晗",
      "scoreRate": 79.8,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共20次拼写错误，涉及20个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 21,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24754411",
      "name": "王砚泽",
      "scoreRate": 78.8,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共21次拼写错误，涉及20个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 22,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24754424",
      "name": "张嘉怡",
      "scoreRate": 76.7,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共23次拼写错误，涉及20个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 24,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24754400",
      "name": "刘嘉来",
      "scoreRate": 75.7,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共24次拼写错误，涉及21个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 25,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24754419",
      "name": "杨小墨",
      "scoreRate": 72.7,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共27次拼写错误，涉及27个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 28,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24754417",
      "name": "肖宇轩",
      "scoreRate": 72.7,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共27次拼写错误，涉及24个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 28,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24754399",
      "name": "刘家宁",
      "scoreRate": 71.7,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共28次拼写错误，涉及27个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 29,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24754426",
      "name": "赵世琪",
      "scoreRate": 71.7,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共28次拼写错误，涉及26个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 29,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24754422",
      "name": "叶谦诚",
      "scoreRate": 70.7,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共29次拼写错误，涉及28个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 30,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24747550",
      "name": "陈宸安",
      "scoreRate": 69.7,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共30次拼写错误，涉及28个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 31,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24747561",
      "name": "李铭宸",
      "scoreRate": 68.7,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共31次拼写错误，涉及29个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 32,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24754403",
      "name": "吕威廷",
      "scoreRate": 67.6,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共32次拼写错误，涉及29个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 33,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24754427",
      "name": "赵依诺",
      "scoreRate": 64.6,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共35次拼写错误，涉及33个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 36,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24754418",
      "name": "邢宗英",
      "scoreRate": 64.6,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共35次拼写错误，涉及33个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 36,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24747555",
      "name": "范绮琪",
      "scoreRate": 63.6,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共36次拼写错误，涉及33个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 37,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24747556",
      "name": "高晨曦",
      "scoreRate": 62.6,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共37次拼写错误，涉及34个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 38,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24747557",
      "name": "高睿泽",
      "scoreRate": 62.6,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共37次拼写错误，涉及36个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 38,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24747563",
      "name": "李宗霖",
      "scoreRate": 60.6,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共39次拼写错误，涉及38个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 40,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    },
    {
      "id": "24747553",
      "name": "陈宇泰",
      "scoreRate": 59.6,
      "weakWords": [
        "AI/artificial intelligence",
        "truly",
        "technology",
        "writing",
        "students",
        "exhibition",
        "recommend",
        "video"
      ],
      "mainErrorTypes": [
        "拼不对"
      ],
      "typicalContext": "共40次拼写错误，涉及37个词。",
      "recentTrend": "stable",
      "recommendedActions": [
        "默写",
        "词汇复习规划"
      ],
      "weaknessPriorityScore": 41,
      "errorTypeDistribution": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100
        },
        {
          "type": "contextual_usage",
          "label": "不会用 / 语境应用弱",
          "percent": 0
        }
      ],
      "weakWordDetails": []
    }
  ],
  "goodStudents": [
    {
      "id": "24754405",
      "name": "任一铭",
      "scoreRate": 96.0,
      "masteredCount": 3,
      "highlight": "词汇错误较少，仅4次",
      "stability": "stable"
    },
    {
      "id": "24754414",
      "name": "温馨然",
      "scoreRate": 93.9,
      "masteredCount": 6,
      "highlight": "词汇错误较少，仅6次",
      "stability": "stable"
    },
    {
      "id": "24747558",
      "name": "郝一帆",
      "scoreRate": 93.9,
      "masteredCount": 6,
      "highlight": "词汇错误较少，仅6次",
      "stability": "stable"
    },
    {
      "id": "24754413",
      "name": "王紫瑄",
      "scoreRate": 89.9,
      "masteredCount": 10,
      "highlight": "词汇错误较少，仅10次",
      "stability": "stable"
    },
    {
      "id": "19477103",
      "name": "王予曈",
      "scoreRate": 86.9,
      "masteredCount": 13,
      "highlight": "词汇错误较少，仅13次",
      "stability": "stable"
    },
    {
      "id": "24747551",
      "name": "陈品而",
      "scoreRate": 85.8,
      "masteredCount": 14,
      "highlight": "词汇错误较少，仅14次",
      "stability": "stable"
    },
    {
      "id": "24754412",
      "name": "王一人",
      "scoreRate": 84.8,
      "masteredCount": 15,
      "highlight": "词汇错误较少，仅15次",
      "stability": "stable"
    },
    {
      "id": "24747559",
      "name": "金桐",
      "scoreRate": 81.8,
      "masteredCount": 18,
      "highlight": "词汇错误较少，仅18次",
      "stability": "stable"
    },
    {
      "id": "24754410",
      "name": "王睿佳",
      "scoreRate": 81.8,
      "masteredCount": 15,
      "highlight": "词汇错误较少，仅18次",
      "stability": "stable"
    }
  ],
  "interventionRecords": []
};

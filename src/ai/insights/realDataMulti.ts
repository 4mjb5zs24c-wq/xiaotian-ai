/**
 * 多班级真实数据 — 自动生成 2026-06-11 11:30
 * 班级: 2023级A18班, 2023级A14班, 2023级A11班, 2023级R5班, 2023级A17班
 */
import type { VocabularyInsightData } from './vocabularyInsightTypes'
import type { WritingInsightData } from './writingInsightTypes'

export const AVAILABLE_CLASSES = ["2023级A18班", "2023级A14班", "2023级A11班", "2023级R5班", "2023级A17班"]

type ClassDataMap = Record<string, { vocabulary: VocabularyInsightData; writing: WritingInsightData }>

export const REAL_DATA_MAP: ClassDataMap = {
  "2023级A18班": {
    "vocabulary": {
      "classId": "class-2023级A18班",
      "className": "2023级A18班",
      "unitId": "real-data",
      "unitName": "平台真实数据",
      "timeRange": "30d",
      "updatedAt": "2026-06-11 11:30",
      "summary": "2023级A18班 共 41 名学生，2117 条词汇错误记录，涉及 1247 个词。薄弱学生 27 人，建议重点加强默写和拼写训练。",
      "metrics": {
        "practicedWordCount": 1247,
        "weakWordCount": 50,
        "weakStudentCount": 27,
        "mainWeakType": "拼不对 / 默写错误"
      },
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100,
          "affectedStudentCount": 41,
          "exampleWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance"
          ],
          "aiReason": "平台数据错因均为'不会写'，归类为拼写错误。2023级A18班共2117条拼写错误记录。",
          "recommendedActions": [
            "默写",
            "词汇复习规划",
            "组卷"
          ],
          "borderColor": "#f0a060",
          "bgColor": "#fef8f0"
        }
      ],
      "weakWords": [
        {
          "id": "ww-000",
          "text": "AI/artificial intelligence",
          "itemType": "word",
          "scoreRate": 10.0,
          "errorRate": 90.0,
          "affectedStudentCount": 15,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754520",
              "studentName": "杨哲铭",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "A",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "Al",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747692",
              "studentName": "臧桂为",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "I",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "Al",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内容包括：1. 活动",
              "studentAnswer": "Al",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在15名学生中出现34次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 99
        },
        {
          "id": "ww-001",
          "text": "laborer/labourer",
          "itemType": "word",
          "scoreRate": 33.8,
          "errorRate": 66.2,
          "affectedStudentCount": 14,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747661",
              "studentName": "李家宇",
              "questionContext": "假设你是红星中学高三学生李华。你校英文报正在举办以“Labor Shaped Me”为主题的征文活动。请你写一篇短文投稿，内容包括：\t1. 你的劳动经历；2. 该经历对你的影响。",
              "studentAnswer": "laborors",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754567",
              "studentName": "薛宇伦",
              "questionContext": "",
              "studentAnswer": "labors",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747681",
              "studentName": "王羿祯",
              "questionContext": "",
              "studentAnswer": "labors",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747681",
              "studentName": "王羿祯",
              "questionContext": "",
              "studentAnswer": "labors",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747661",
              "studentName": "李家宇",
              "questionContext": "",
              "studentAnswer": "labor",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在14名学生中出现25次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 80
        },
        {
          "id": "ww-002",
          "text": "Beijing",
          "itemType": "word",
          "scoreRate": 52.4,
          "errorRate": 47.6,
          "affectedStudentCount": 9,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754585",
              "studentName": "陈乐瑶",
              "questionContext": "",
              "studentAnswer": "Bejing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754564",
              "studentName": "徐嘉禾",
              "questionContext": "假定你是红星中学的李华，你的外国好友 Jim 计划今年暑假来北京进行一次“中国日常生活体验之旅”，他发来邮件请你为他设计一天的体验行程，要求行程能体现真实的中国日常文化。请你写一封回信，内容包括： \t",
              "studentAnswer": "seijing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747676",
              "studentName": "万卓坤",
              "questionContext": "假定你是红星中学的李华，你的外国好友 Jim 计划今年暑假来北京进行一次“中国日常生活体验之旅”，他发来邮件请你为他设计一天的体验行程，要求行程能体现真实的中国日常文化。请你写一封回信，内容包括： \t",
              "studentAnswer": "Be jing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "Bejing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754564",
              "studentName": "徐嘉禾",
              "questionContext": "",
              "studentAnswer": "lejing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在9名学生中出现18次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 66
        },
        {
          "id": "ww-003",
          "text": "efficiency",
          "itemType": "word",
          "scoreRate": 57.6,
          "errorRate": 42.4,
          "affectedStudentCount": 10,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "",
              "studentAnswer": "effiency",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "",
              "studentAnswer": "effeciency",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754530",
              "studentName": "周犇",
              "questionContext": "",
              "studentAnswer": "efficiencsy",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754536",
              "studentName": "陈思卓",
              "questionContext": "",
              "studentAnswer": "eficiency",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "How can you put the “protege effect” into practice?",
              "studentAnswer": "effeciency",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在10名学生中出现16次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 62
        },
        {
          "id": "ww-004",
          "text": "perseverance",
          "itemType": "word",
          "scoreRate": 60.3,
          "errorRate": 39.7,
          "affectedStudentCount": 10,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747681",
              "studentName": "王羿祯",
              "questionContext": "",
              "studentAnswer": "perservance",
              "correctAnswer": "perseverance",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747687",
              "studentName": "徐珺仪",
              "questionContext": "",
              "studentAnswer": "preseverence",
              "correctAnswer": "perseverance",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747651",
              "studentName": "戴明玥",
              "questionContext": "",
              "studentAnswer": "preserverance",
              "correctAnswer": "perseverance",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754564",
              "studentName": "徐嘉禾",
              "questionContext": "",
              "studentAnswer": "perseverence",
              "correctAnswer": "perseverance",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747687",
              "studentName": "徐珺仪",
              "questionContext": "",
              "studentAnswer": "perserverence",
              "correctAnswer": "perseverance",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在10名学生中出现15次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 60
        },
        {
          "id": "ww-005",
          "text": "technology",
          "itemType": "word",
          "scoreRate": 65.6,
          "errorRate": 34.4,
          "affectedStudentCount": 11,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747701",
              "studentName": "支晗升",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "techonolgy",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "technodogy",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747667",
              "studentName": "刘泽尧",
              "questionContext": "假设你是红星中学高三学生李华。你的外国好友Jim即将参加主题为“Skills Needed for a Sustainable Future”的联合国青年论坛(UN Youth Forum)，为此发来",
              "studentAnswer": "technologre",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754564",
              "studentName": "徐嘉禾",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "techndogy",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754528",
              "studentName": "张继扬",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "technolgy",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在11名学生中出现13次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 56
        },
        {
          "id": "ww-006",
          "text": "technologies",
          "itemType": "word",
          "scoreRate": 65.6,
          "errorRate": 34.4,
          "affectedStudentCount": 7,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754520",
              "studentName": "杨哲铭",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "techologyes",
              "correctAnswer": "technologies",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747679",
              "studentName": "王烁铭",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "technologig",
              "correctAnswer": "technologies",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754536",
              "studentName": "陈思卓",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "techndlogies",
              "correctAnswer": "technologies",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754520",
              "studentName": "杨哲铭",
              "questionContext": "假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内容包括：1. 活动",
              "studentAnswer": "echologyes",
              "correctAnswer": "technologies",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "假设你是红星中学高三学生李华。你的外国好友Jim即将参加主题为“Skills Needed for a Sustainable Future”的联合国青年论坛(UN Youth Forum)，为此发来",
              "studentAnswer": "technoagies",
              "correctAnswer": "technologies",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在7名学生中出现13次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 56
        },
        {
          "id": "ww-007",
          "text": "sustainable",
          "itemType": "word",
          "scoreRate": 68.2,
          "errorRate": 31.8,
          "affectedStudentCount": 8,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747623",
              "studentName": "林润时",
              "questionContext": "",
              "studentAnswer": "sustaiable",
              "correctAnswer": "sustainable",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754520",
              "studentName": "杨哲铭",
              "questionContext": "假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内容包括：1. 活动",
              "studentAnswer": "sustanable",
              "correctAnswer": "sustainable",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754528",
              "studentName": "张继扬",
              "questionContext": "假定你是红星中学的李华，你的外国朋友Jim告知你，他所在的校园文化俱乐部“世界之窗”下一期活动计划开展“中国人的日常智慧”（Wisdom in Chinese Daily Routines） 主题分享",
              "studentAnswer": "sustainabe",
              "correctAnswer": "sustainable",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "假设你是红星中学高三学生李华。你的外国好友Jim即将参加主题为“Skills Needed for a Sustainable Future”的联合国青年论坛(UN Youth Forum)，为此发来",
              "studentAnswer": "sutunable",
              "correctAnswer": "sustainable",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747692",
              "studentName": "臧桂为",
              "questionContext": "假设你是红星中学高三学生李华。你的外国好友Jim即将参加主题为“Skills Needed for a Sustainable Future”的联合国青年论坛(UN Youth Forum)，为此发来",
              "studentAnswer": "m sue stainable",
              "correctAnswer": "sustainable",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在8名学生中出现12次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 54
        },
        {
          "id": "ww-008",
          "text": "resilience",
          "itemType": "word",
          "scoreRate": 70.9,
          "errorRate": 29.1,
          "affectedStudentCount": 9,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754522",
              "studentName": "袁嘉锴",
              "questionContext": "",
              "studentAnswer": "reslience",
              "correctAnswer": "resilience",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747681",
              "studentName": "王羿祯",
              "questionContext": "",
              "studentAnswer": "reciliance",
              "correctAnswer": "resilience",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747681",
              "studentName": "王羿祯",
              "questionContext": "",
              "studentAnswer": "resiliance",
              "correctAnswer": "resilience",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754530",
              "studentName": "周犇",
              "questionContext": "",
              "studentAnswer": "resiliene",
              "correctAnswer": "resilience",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747646",
              "studentName": "宗畹青",
              "questionContext": "",
              "studentAnswer": "resilence",
              "correctAnswer": "resilience",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在9名学生中出现11次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 52
        },
        {
          "id": "ww-009",
          "text": "strengthen",
          "itemType": "word",
          "scoreRate": 73.5,
          "errorRate": 26.5,
          "affectedStudentCount": 9,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754536",
              "studentName": "陈思卓",
              "questionContext": "",
              "studentAnswer": "strenthens",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754564",
              "studentName": "徐嘉禾",
              "questionContext": "",
              "studentAnswer": "strenghthern",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754568",
              "studentName": "闫光泰",
              "questionContext": "",
              "studentAnswer": "strenghthened",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "",
              "studentAnswer": "strengtheding",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754522",
              "studentName": "袁嘉锴",
              "questionContext": "",
              "studentAnswer": "streythen",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在9名学生中出现10次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 50
        },
        {
          "id": "ww-010",
          "text": "horizon",
          "itemType": "word",
          "scoreRate": 73.5,
          "errorRate": 26.5,
          "affectedStudentCount": 6,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754530",
              "studentName": "周犇",
              "questionContext": "",
              "studentAnswer": "horizens",
              "correctAnswer": "horizon",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754530",
              "studentName": "周犇",
              "questionContext": "What can help you see the world anew?  提出能帮助你以新的视角看待世界的事物或方法描述这些事物或方法如何改变你的认知或体验",
              "studentAnswer": "horrizons",
              "correctAnswer": "horizon",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754524",
              "studentName": "张贝宁",
              "questionContext": "What can help you see the world anew?  提出能帮助你以新的视角看待世界的事物或方法描述这些事物或方法如何改变你的认知或体验",
              "studentAnswer": "horizen",
              "correctAnswer": "horizon",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747692",
              "studentName": "臧桂为",
              "questionContext": "What can help you see the world anew?  提出能帮助你以新的视角看待世界的事物或方法描述这些事物或方法如何改变你的认知或体验",
              "studentAnswer": "horizen",
              "correctAnswer": "horizon",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747687",
              "studentName": "徐珺仪",
              "questionContext": "What can help you see the world anew?  提出能帮助你以新的视角看待世界的事物或方法描述这些事物或方法如何改变你的认知或体验",
              "studentAnswer": "horizens",
              "correctAnswer": "horizon",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现10次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 50
        },
        {
          "id": "ww-011",
          "text": "difficulty",
          "itemType": "word",
          "scoreRate": 76.2,
          "errorRate": 23.8,
          "affectedStudentCount": 6,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747681",
              "studentName": "王羿祯",
              "questionContext": "",
              "studentAnswer": "difficlties",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754522",
              "studentName": "袁嘉锴",
              "questionContext": "",
              "studentAnswer": "ifficurlties",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754522",
              "studentName": "袁嘉锴",
              "questionContext": "",
              "studentAnswer": "diffimlties",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754596",
              "studentName": "林子悦",
              "questionContext": "",
              "studentAnswer": "difficultfies",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747679",
              "studentName": "王烁铭",
              "questionContext": "",
              "studentAnswer": "affrcuties",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现9次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 48
        },
        {
          "id": "ww-012",
          "text": "thrilled",
          "itemType": "word",
          "scoreRate": 76.2,
          "errorRate": 23.8,
          "affectedStudentCount": 6,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754536",
              "studentName": "陈思卓",
              "questionContext": "",
              "studentAnswer": "thriled",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754543",
              "studentName": "何昊晏",
              "questionContext": "",
              "studentAnswer": "thiled",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754585",
              "studentName": "陈乐瑶",
              "questionContext": "",
              "studentAnswer": "thilled",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754536",
              "studentName": "陈思卓",
              "questionContext": "假定你是红星中学的李华，你的外国好友 Jim 计划今年暑假来北京进行一次“中国日常生活体验之旅”，他发来邮件请你为他设计一天的体验行程，要求行程能体现真实的中国日常文化。请你写一封回信，内容包括： \t",
              "studentAnswer": "thriled",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754543",
              "studentName": "何昊晏",
              "questionContext": "",
              "studentAnswer": "thilled",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现9次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 48
        },
        {
          "id": "ww-013",
          "text": "focus",
          "itemType": "word",
          "scoreRate": 76.2,
          "errorRate": 23.8,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754530",
              "studentName": "周犇",
              "questionContext": "",
              "studentAnswer": "focuss",
              "correctAnswer": "focus",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "What can you do to help build a blame-free culture in daily life?",
              "studentAnswer": "facus",
              "correctAnswer": "focus",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747646",
              "studentName": "宗畹青",
              "questionContext": "What can you do to help build a blame-free culture in daily life?",
              "studentAnswer": "fo us",
              "correctAnswer": "focus",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "faws",
              "correctAnswer": "focus",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "foocus",
              "correctAnswer": "focus",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现9次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 48
        },
        {
          "id": "ww-014",
          "text": "understanding",
          "itemType": "word",
          "scoreRate": 78.8,
          "errorRate": 21.2,
          "affectedStudentCount": 7,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754536",
              "studentName": "陈思卓",
              "questionContext": "",
              "studentAnswer": "understandiy",
              "correctAnswer": "understanding",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747644",
              "studentName": "张继元",
              "questionContext": "假设你是红星中学高三学生李华。你校英文报正在举办以“Labor Shaped Me”为主题的征文活动。请你写一篇短文投稿，内容包括：\t1. 你的劳动经历；2. 该经历对你的影响。",
              "studentAnswer": "understaunding",
              "correctAnswer": "understanding",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747692",
              "studentName": "臧桂为",
              "questionContext": "How can you put the “protege effect” into practice?",
              "studentAnswer": "undestanding",
              "correctAnswer": "understanding",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754536",
              "studentName": "陈思卓",
              "questionContext": "How can you put the “protege effect” into practice?",
              "studentAnswer": "understaning",
              "correctAnswer": "understanding",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754520",
              "studentName": "杨哲铭",
              "questionContext": "How can you put the “protege effect” into practice?",
              "studentAnswer": "undested",
              "correctAnswer": "understanding",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在7名学生中出现8次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 46
        },
        {
          "id": "ww-015",
          "text": "modern",
          "itemType": "word",
          "scoreRate": 78.8,
          "errorRate": 21.2,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "假设你是红星中学高三学生李华。你们学校上周开展了主题为 “运动邂逅青春” 的活动。你的外国好友 Jim 来信就此询问。请你用英文给他回复，内容包括：活动情况；你的感受。注意：1. 词数 100 左右；",
              "studentAnswer": "morden",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "假设你是红星中学高三学生李华。你校英语社团正在举办以“Becoming a Better Self”为主题的征文活动。请你用英文写一篇短文投稿，内容包括： 1. 你的理解； 2. 你的做法。 注意： ",
              "studentAnswer": "morden",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "假定你是红星中学的李华，你的外国好友 Jim 计划今年暑假来北京进行一次“中国日常生活体验之旅”，他发来邮件请你为他设计一天的体验行程，要求行程能体现真实的中国日常文化。请你写一封回信，内容包括： \t",
              "studentAnswer": "mortern",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "How would you design your community as Ryan Johnson did to make it a better place to live in?(In abo",
              "studentAnswer": "morden",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754522",
              "studentName": "袁嘉锴",
              "questionContext": "",
              "studentAnswer": "mordern",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现8次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 46
        },
        {
          "id": "ww-016",
          "text": "into",
          "itemType": "word",
          "scoreRate": 78.8,
          "errorRate": 21.2,
          "affectedStudentCount": 6,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754520",
              "studentName": "杨哲铭",
              "questionContext": "",
              "studentAnswer": "in to",
              "correctAnswer": "into",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "假定你是红星中学的李华，你的外国好友 Jim 计划今年暑假来北京进行一次“中国日常生活体验之旅”，他发来邮件请你为他设计一天的体验行程，要求行程能体现真实的中国日常文化。请你写一封回信，内容包括： \t",
              "studentAnswer": "ito",
              "correctAnswer": "into",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747680",
              "studentName": "王一陶",
              "questionContext": "假定你是红星中学的李华，你的外国好友 Jim 计划今年暑假来北京进行一次“中国日常生活体验之旅”，他发来邮件请你为他设计一天的体验行程，要求行程能体现真实的中国日常文化。请你写一封回信，内容包括： \t",
              "studentAnswer": "intlutong",
              "correctAnswer": "into",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754585",
              "studentName": "陈乐瑶",
              "questionContext": "What can help you see the world anew?  提出能帮助你以新的视角看待世界的事物或方法描述这些事物或方法如何改变你的认知或体验",
              "studentAnswer": "in to",
              "correctAnswer": "into",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754520",
              "studentName": "杨哲铭",
              "questionContext": ".Use an example to show how you can overcome Arrival Fallacy in your daily life.",
              "studentAnswer": "int the",
              "correctAnswer": "into",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现8次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 46
        },
        {
          "id": "ww-017",
          "text": "writing",
          "itemType": "word",
          "scoreRate": 78.8,
          "errorRate": 21.2,
          "affectedStudentCount": 7,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "假定你是红星中学的李华，你的外国好友 Jim 计划今年暑假来北京进行一次“中国日常生活体验之旅”，他发来邮件请你为他设计一天的体验行程，要求行程能体现真实的中国日常文化。请你写一封回信，内容包括： \t",
              "studentAnswer": "uniting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "假定你是红星中学的李华，你的外国好友 Jim 计划今年暑假来北京进行一次“中国日常生活体验之旅”，他发来邮件请你为他设计一天的体验行程，要求行程能体现真实的中国日常文化。请你写一封回信，内容包括： \t",
              "studentAnswer": "writting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754543",
              "studentName": "何昊晏",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "writting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747677",
              "studentName": "王海尘",
              "questionContext": "",
              "studentAnswer": "writting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "",
              "studentAnswer": "writting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在7名学生中出现8次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 46
        },
        {
          "id": "ww-018",
          "text": "experience",
          "itemType": "word",
          "scoreRate": 81.5,
          "errorRate": 18.5,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754522",
              "studentName": "袁嘉锴",
              "questionContext": "",
              "studentAnswer": "experitence",
              "correctAnswer": "experience",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747676",
              "studentName": "万卓坤",
              "questionContext": "",
              "studentAnswer": "experince",
              "correctAnswer": "experience",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "",
              "studentAnswer": "expericeing",
              "correctAnswer": "experience",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "",
              "studentAnswer": "experiene",
              "correctAnswer": "experience",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747672",
              "studentName": "曲奕霏",
              "questionContext": "假定你是红星中学的李华，你的外国好友 Jim 计划今年暑假来北京进行一次“中国日常生活体验之旅”，他发来邮件请你为他设计一天的体验行程，要求行程能体现真实的中国日常文化。请你写一封回信，内容包括： \t",
              "studentAnswer": "experiene",
              "correctAnswer": "experience",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现7次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 44
        },
        {
          "id": "ww-019",
          "text": "forward",
          "itemType": "word",
          "scoreRate": 81.5,
          "errorRate": 18.5,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754559",
              "studentName": "王宽",
              "questionContext": "",
              "studentAnswer": "foward",
              "correctAnswer": "forward",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754564",
              "studentName": "徐嘉禾",
              "questionContext": "",
              "studentAnswer": "foward",
              "correctAnswer": "forward",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754524",
              "studentName": "张贝宁",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "foward",
              "correctAnswer": "forward",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754564",
              "studentName": "徐嘉禾",
              "questionContext": "",
              "studentAnswer": "foward",
              "correctAnswer": "forward",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754559",
              "studentName": "王宽",
              "questionContext": "",
              "studentAnswer": "foward",
              "correctAnswer": "forward",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现7次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 44
        },
        {
          "id": "ww-020",
          "text": "truly",
          "itemType": "word",
          "scoreRate": 81.5,
          "errorRate": 18.5,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754584",
              "studentName": "朱奕宁",
              "questionContext": "",
              "studentAnswer": "truelly",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747646",
              "studentName": "宗畹青",
              "questionContext": "How can you put the “protege effect” into practice?",
              "studentAnswer": "truely",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747623",
              "studentName": "林润时",
              "questionContext": "假设你是红星中学高三学生李华。你的外国好友Jim即将参加主题为“Skills Needed for a Sustainable Future”的联合国青年论坛(UN Youth Forum)，为此发来",
              "studentAnswer": "tuly",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "",
              "studentAnswer": "turly",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747680",
              "studentName": "王一陶",
              "questionContext": "",
              "studentAnswer": "trully",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现7次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 44
        },
        {
          "id": "ww-021",
          "text": "and",
          "itemType": "word",
          "scoreRate": 84.1,
          "errorRate": 15.9,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747623",
              "studentName": "林润时",
              "questionContext": "",
              "studentAnswer": ", mat alkso",
              "correctAnswer": "and",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754567",
              "studentName": "薛宇伦",
              "questionContext": "",
              "studentAnswer": "sar nt",
              "correctAnswer": "and",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747637",
              "studentName": "王栎强",
              "questionContext": "",
              "studentAnswer": "andd",
              "correctAnswer": "and",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747679",
              "studentName": "王烁铭",
              "questionContext": "As a student, what do you think of online cheating?",
              "studentAnswer": "cheat ty exams",
              "correctAnswer": "and",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754564",
              "studentName": "徐嘉禾",
              "questionContext": "假定你是红星中学的李华，你的外国朋友Jim告知你，他所在的校园文化俱乐部“世界之窗”下一期活动计划开展“中国人的日常智慧”（Wisdom in Chinese Daily Routines） 主题分享",
              "studentAnswer": "aind",
              "correctAnswer": "and",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        },
        {
          "id": "ww-022",
          "text": "activity",
          "itemType": "word",
          "scoreRate": 84.1,
          "errorRate": 15.9,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754522",
              "studentName": "袁嘉锴",
              "questionContext": "",
              "studentAnswer": "acities",
              "correctAnswer": "activity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754536",
              "studentName": "陈思卓",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "activithy",
              "correctAnswer": "activity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747680",
              "studentName": "王一陶",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "adtuity",
              "correctAnswer": "activity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "",
              "studentAnswer": "acivity",
              "correctAnswer": "activity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754596",
              "studentName": "林子悦",
              "questionContext": "",
              "studentAnswer": "acfint",
              "correctAnswer": "activity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        },
        {
          "id": "ww-023",
          "text": "greeting",
          "itemType": "word",
          "scoreRate": 84.1,
          "errorRate": 15.9,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754568",
              "studentName": "闫光泰",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "greatings",
              "correctAnswer": "greeting",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754548",
              "studentName": "刘灏铭",
              "questionContext": "假设你是红星中学高三学生李华。你的外国好友Jim即将参加主题为“Skills Needed for a Sustainable Future”的联合国青年论坛(UN Youth Forum)，为此发来",
              "studentAnswer": "greettings",
              "correctAnswer": "greeting",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747665",
              "studentName": "李昀宸",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "greatings",
              "correctAnswer": "greeting",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747665",
              "studentName": "李昀宸",
              "questionContext": "",
              "studentAnswer": "greatings",
              "correctAnswer": "greeting",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "",
              "studentAnswer": "gretings",
              "correctAnswer": "greeting",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        },
        {
          "id": "ww-024",
          "text": "creativity",
          "itemType": "word",
          "scoreRate": 84.1,
          "errorRate": 15.9,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754543",
              "studentName": "何昊晏",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "creavity",
              "correctAnswer": "creativity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754520",
              "studentName": "杨哲铭",
              "questionContext": "",
              "studentAnswer": "creativi",
              "correctAnswer": "creativity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754596",
              "studentName": "林子悦",
              "questionContext": "",
              "studentAnswer": "ureativity",
              "correctAnswer": "creativity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747623",
              "studentName": "林润时",
              "questionContext": "",
              "studentAnswer": "creativitly",
              "correctAnswer": "creativity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754543",
              "studentName": "何昊晏",
              "questionContext": "",
              "studentAnswer": "creavity",
              "correctAnswer": "creativity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        },
        {
          "id": "ww-025",
          "text": "algorithm",
          "itemType": "word",
          "scoreRate": 84.1,
          "errorRate": 15.9,
          "affectedStudentCount": 6,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754585",
              "studentName": "陈乐瑶",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "argithrm",
              "correctAnswer": "algorithm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754522",
              "studentName": "袁嘉锴",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "algorithoms",
              "correctAnswer": "algorithm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747665",
              "studentName": "李昀宸",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "algrithems",
              "correctAnswer": "algorithm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754528",
              "studentName": "张继扬",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "algorithims",
              "correctAnswer": "algorithm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747683",
              "studentName": "王振安",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "algorithmus",
              "correctAnswer": "algorithm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        },
        {
          "id": "ww-026",
          "text": "model",
          "itemType": "word",
          "scoreRate": 84.1,
          "errorRate": 15.9,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "modle",
              "correctAnswer": "model",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "modles.",
              "correctAnswer": "model",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754536",
              "studentName": "陈思卓",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "modle",
              "correctAnswer": "model",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "modle",
              "correctAnswer": "model",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754584",
              "studentName": "朱奕宁",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "modle",
              "correctAnswer": "model",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        },
        {
          "id": "ww-027",
          "text": "video",
          "itemType": "word",
          "scoreRate": 84.1,
          "errorRate": 15.9,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754584",
              "studentName": "朱奕宁",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "vidio",
              "correctAnswer": "video",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内容包括：1. 活动",
              "studentAnswer": "tides",
              "correctAnswer": "video",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "",
              "studentAnswer": "vedio",
              "correctAnswer": "video",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754530",
              "studentName": "周犇",
              "questionContext": "",
              "studentAnswer": "ideo",
              "correctAnswer": "video",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754564",
              "studentName": "徐嘉禾",
              "questionContext": "",
              "studentAnswer": "vedio",
              "correctAnswer": "video",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        },
        {
          "id": "ww-028",
          "text": "thinking",
          "itemType": "word",
          "scoreRate": 84.1,
          "errorRate": 15.9,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754596",
              "studentName": "林子悦",
              "questionContext": "How can “ Aspera” lead you to “Astra” ? (In about 40 words)",
              "studentAnswer": "thinkig",
              "correctAnswer": "thinking",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "",
              "studentAnswer": "thingking",
              "correctAnswer": "thinking",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747672",
              "studentName": "曲奕霏",
              "questionContext": "",
              "studentAnswer": "thinkin",
              "correctAnswer": "thinking",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "",
              "studentAnswer": "thingking",
              "correctAnswer": "thinking",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747676",
              "studentName": "万卓坤",
              "questionContext": "",
              "studentAnswer": "thinky",
              "correctAnswer": "thinking",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        },
        {
          "id": "ww-029",
          "text": "more",
          "itemType": "word",
          "scoreRate": 84.1,
          "errorRate": 15.9,
          "affectedStudentCount": 6,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754585",
              "studentName": "陈乐瑶",
              "questionContext": "假设你是红星中学高三学生李华。你的外国好友Jim即将参加主题为“Skills Needed for a Sustainable Future”的联合国青年论坛(UN Youth Forum)，为此发来",
              "studentAnswer": "wore",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754568",
              "studentName": "闫光泰",
              "questionContext": "",
              "studentAnswer": "wore",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754564",
              "studentName": "徐嘉禾",
              "questionContext": "",
              "studentAnswer": "moe",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747665",
              "studentName": "李昀宸",
              "questionContext": "",
              "studentAnswer": "morve",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754520",
              "studentName": "杨哲铭",
              "questionContext": "",
              "studentAnswer": "move",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        },
        {
          "id": "ww-030",
          "text": "environmental",
          "itemType": "word",
          "scoreRate": 84.1,
          "errorRate": 15.9,
          "affectedStudentCount": 6,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754585",
              "studentName": "陈乐瑶",
              "questionContext": "",
              "studentAnswer": "enviromental",
              "correctAnswer": "environmental",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754530",
              "studentName": "周犇",
              "questionContext": "",
              "studentAnswer": "environmetal",
              "correctAnswer": "environmental",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747672",
              "studentName": "曲奕霏",
              "questionContext": "",
              "studentAnswer": "enviralmental",
              "correctAnswer": "environmental",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747637",
              "studentName": "王栎强",
              "questionContext": "",
              "studentAnswer": "enviromental",
              "correctAnswer": "environmental",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754548",
              "studentName": "刘灏铭",
              "questionContext": "",
              "studentAnswer": "environmenital",
              "correctAnswer": "environmental",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        },
        {
          "id": "ww-031",
          "text": "success",
          "itemType": "word",
          "scoreRate": 86.8,
          "errorRate": 13.2,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754522",
              "studentName": "袁嘉锴",
              "questionContext": "",
              "studentAnswer": "sucess",
              "correctAnswer": "success",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "",
              "studentAnswer": "sucess",
              "correctAnswer": "success",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747623",
              "studentName": "林润时",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "sucess",
              "correctAnswer": "success",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754543",
              "studentName": "何昊晏",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "suces",
              "correctAnswer": "success",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": ".Use an example to show how you can overcome Arrival Fallacy in your daily life.",
              "studentAnswer": "sucess",
              "correctAnswer": "success",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 40
        },
        {
          "id": "ww-032",
          "text": "cooperation",
          "itemType": "word",
          "scoreRate": 86.8,
          "errorRate": 13.2,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "",
              "studentAnswer": "coperation",
              "correctAnswer": "cooperation",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "",
              "studentAnswer": "caoperatmn",
              "correctAnswer": "cooperation",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747646",
              "studentName": "宗畹青",
              "questionContext": "",
              "studentAnswer": "toorperation",
              "correctAnswer": "cooperation",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754522",
              "studentName": "袁嘉锴",
              "questionContext": "",
              "studentAnswer": "coperation",
              "correctAnswer": "cooperation",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747646",
              "studentName": "宗畹青",
              "questionContext": "",
              "studentAnswer": "coorparation",
              "correctAnswer": "cooperation",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 40
        },
        {
          "id": "ww-033",
          "text": "neighborhood/neighbourhood",
          "itemType": "word",
          "scoreRate": 86.8,
          "errorRate": 13.2,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754543",
              "studentName": "何昊晏",
              "questionContext": "",
              "studentAnswer": "neighbor",
              "correctAnswer": "neighborhood/neighbourhood",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754550",
              "studentName": "南熙",
              "questionContext": "",
              "studentAnswer": "neighbourhod",
              "correctAnswer": "neighborhood/neighbourhood",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "假定你是红星中学的李华，你的外国朋友Jim告知你，他所在的校园文化俱乐部“世界之窗”下一期活动计划开展“中国人的日常智慧”（Wisdom in Chinese Daily Routines） 主题分享",
              "studentAnswer": "neigborhood",
              "correctAnswer": "neighborhood/neighbourhood",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "假定你是红星中学的李华，你的外国朋友Jim告知你，他所在的校园文化俱乐部“世界之窗”下一期活动计划开展“中国人的日常智慧”（Wisdom in Chinese Daily Routines） 主题分享",
              "studentAnswer": "neiborhood",
              "correctAnswer": "neighborhood/neighbourhood",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "假定你是红星中学的李华，你的外国朋友Jim告知你，他所在的校园文化俱乐部“世界之窗”下一期活动计划开展“中国人的日常智慧”（Wisdom in Chinese Daily Routines） 主题分享",
              "studentAnswer": "neiborhood",
              "correctAnswer": "neighborhood/neighbourhood",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 40
        },
        {
          "id": "ww-034",
          "text": "the",
          "itemType": "word",
          "scoreRate": 86.8,
          "errorRate": 13.2,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754559",
              "studentName": "王宽",
              "questionContext": "",
              "studentAnswer": "wet he",
              "correctAnswer": "the",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754564",
              "studentName": "徐嘉禾",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "te",
              "correctAnswer": "the",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747637",
              "studentName": "王栎强",
              "questionContext": "",
              "studentAnswer": "thiu",
              "correctAnswer": "the",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754584",
              "studentName": "朱奕宁",
              "questionContext": "",
              "studentAnswer": "theban",
              "correctAnswer": "the",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747637",
              "studentName": "王栎强",
              "questionContext": "",
              "studentAnswer": "othe",
              "correctAnswer": "the",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 40
        },
        {
          "id": "ww-035",
          "text": "interested",
          "itemType": "word",
          "scoreRate": 86.8,
          "errorRate": 13.2,
          "affectedStudentCount": 1,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "假设你是红星中学高三学生李华。你们学校上周开展了主题为 “运动邂逅青春” 的活动。你的外国好友 Jim 来信就此询问。请你用英文给他回复，内容包括：活动情况；你的感受。注意：1. 词数 100 左右；",
              "studentAnswer": "insterested",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "假设你是红星中学高三学生李华。你校英语社团正在举办以“Becoming a Better Self”为主题的征文活动。请你用英文写一篇短文投稿，内容包括： 1. 你的理解； 2. 你的做法。 注意： ",
              "studentAnswer": "insterested",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "",
              "studentAnswer": "instreasted",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "intrested",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "How would you design your community as Ryan Johnson did to make it a better place to live in?(In abo",
              "studentAnswer": "insterested",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在1名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 40
        },
        {
          "id": "ww-036",
          "text": "skills",
          "itemType": "word",
          "scoreRate": 86.8,
          "errorRate": 13.2,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754536",
              "studentName": "陈思卓",
              "questionContext": "",
              "studentAnswer": "shills",
              "correctAnswer": "skills",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754528",
              "studentName": "张继扬",
              "questionContext": "How can “ Aspera” lead you to “Astra” ? (In about 40 words)",
              "studentAnswer": "skils",
              "correctAnswer": "skills",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747661",
              "studentName": "李家宇",
              "questionContext": "假设你是红星中学高三学生李华。你的外国好友Jim即将参加主题为“Skills Needed for a Sustainable Future”的联合国青年论坛(UN Youth Forum)，为此发来",
              "studentAnswer": "shills",
              "correctAnswer": "skills",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754536",
              "studentName": "陈思卓",
              "questionContext": "",
              "studentAnswer": "shills",
              "correctAnswer": "skills",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747680",
              "studentName": "王一陶",
              "questionContext": "",
              "studentAnswer": "still",
              "correctAnswer": "skills",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 40
        },
        {
          "id": "ww-037",
          "text": "morning",
          "itemType": "word",
          "scoreRate": 86.8,
          "errorRate": 13.2,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "",
              "studentAnswer": "moring",
              "correctAnswer": "morning",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747692",
              "studentName": "臧桂为",
              "questionContext": "假定你是红星中学的李华，你的外国好友 Jim 计划今年暑假来北京进行一次“中国日常生活体验之旅”，他发来邮件请你为他设计一天的体验行程，要求行程能体现真实的中国日常文化。请你写一封回信，内容包括： \t",
              "studentAnswer": "mooning",
              "correctAnswer": "morning",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747665",
              "studentName": "李昀宸",
              "questionContext": "假定你是红星中学的李华，你的外国好友 Jim 计划今年暑假来北京进行一次“中国日常生活体验之旅”，他发来邮件请你为他设计一天的体验行程，要求行程能体现真实的中国日常文化。请你写一封回信，内容包括： \t",
              "studentAnswer": "mooning",
              "correctAnswer": "morning",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "假定你是红星中学的李华，你的外国朋友Jim告知你，他所在的校园文化俱乐部“世界之窗”下一期活动计划开展“中国人的日常智慧”（Wisdom in Chinese Daily Routines） 主题分享",
              "studentAnswer": "manning",
              "correctAnswer": "morning",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754548",
              "studentName": "刘灏铭",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "mooning",
              "correctAnswer": "morning",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 40
        },
        {
          "id": "ww-038",
          "text": "like",
          "itemType": "word",
          "scoreRate": 86.8,
          "errorRate": 13.2,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754596",
              "studentName": "林子悦",
              "questionContext": "",
              "studentAnswer": "liice",
              "correctAnswer": "like",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754568",
              "studentName": "闫光泰",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "tile",
              "correctAnswer": "like",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "",
              "studentAnswer": "dke",
              "correctAnswer": "like",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754596",
              "studentName": "林子悦",
              "questionContext": "",
              "studentAnswer": "likce",
              "correctAnswer": "like",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754596",
              "studentName": "林子悦",
              "questionContext": "",
              "studentAnswer": "lilce",
              "correctAnswer": "like",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 40
        },
        {
          "id": "ww-039",
          "text": "sense",
          "itemType": "word",
          "scoreRate": 86.8,
          "errorRate": 13.2,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747644",
              "studentName": "张继元",
              "questionContext": "",
              "studentAnswer": "fsense",
              "correctAnswer": "sense",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": ".Use an example to show how you can overcome Arrival Fallacy in your daily life.",
              "studentAnswer": "senste",
              "correctAnswer": "sense",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754568",
              "studentName": "闫光泰",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "sons",
              "correctAnswer": "sense",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754564",
              "studentName": "徐嘉禾",
              "questionContext": "",
              "studentAnswer": "stuse",
              "correctAnswer": "sense",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754548",
              "studentName": "刘灏铭",
              "questionContext": "",
              "studentAnswer": "sonse",
              "correctAnswer": "sense",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 40
        },
        {
          "id": "ww-040",
          "text": "skill",
          "itemType": "word",
          "scoreRate": 86.8,
          "errorRate": 13.2,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747661",
              "studentName": "李家宇",
              "questionContext": "假设你是红星中学高三学生李华。你校英文报正在举办以“Labor Shaped Me”为主题的征文活动。请你写一篇短文投稿，内容包括：\t1. 你的劳动经历；2. 该经历对你的影响。",
              "studentAnswer": "shall",
              "correctAnswer": "skill",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "假设你是红星中学高三学生李华。你的外国好友Jim即将参加主题为“Skills Needed for a Sustainable Future”的联合国青年论坛(UN Youth Forum)，为此发来",
              "studentAnswer": "skaill",
              "correctAnswer": "skill",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747649",
              "studentName": "陈卓远",
              "questionContext": "",
              "studentAnswer": "sill",
              "correctAnswer": "skill",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754550",
              "studentName": "南熙",
              "questionContext": "",
              "studentAnswer": "shill",
              "correctAnswer": "skill",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747687",
              "studentName": "徐珺仪",
              "questionContext": "",
              "studentAnswer": "skil",
              "correctAnswer": "skill",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 40
        },
        {
          "id": "ww-041",
          "text": "foundation",
          "itemType": "word",
          "scoreRate": 86.8,
          "errorRate": 13.2,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754536",
              "studentName": "陈思卓",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "oundaltion",
              "correctAnswer": "foundation",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747623",
              "studentName": "林润时",
              "questionContext": "假设你是红星中学高三学生李华。你的外国好友Jim即将参加主题为“Skills Needed for a Sustainable Future”的联合国青年论坛(UN Youth Forum)，为此发来",
              "studentAnswer": "fundation",
              "correctAnswer": "foundation",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754559",
              "studentName": "王宽",
              "questionContext": "",
              "studentAnswer": "fountation",
              "correctAnswer": "foundation",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754517",
              "studentName": "吴昊然",
              "questionContext": "",
              "studentAnswer": "furdation",
              "correctAnswer": "foundation",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "",
              "studentAnswer": "fundation",
              "correctAnswer": "foundation",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 40
        },
        {
          "id": "ww-042",
          "text": "spirit",
          "itemType": "word",
          "scoreRate": 86.8,
          "errorRate": 13.2,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "sprit",
              "correctAnswer": "spirit",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747672",
              "studentName": "曲奕霏",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "spin't",
              "correctAnswer": "spirit",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "sprit",
              "correctAnswer": "spirit",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747679",
              "studentName": "王烁铭",
              "questionContext": "",
              "studentAnswer": "hy",
              "correctAnswer": "spirit",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747644",
              "studentName": "张继元",
              "questionContext": "",
              "studentAnswer": "sprit",
              "correctAnswer": "spirit",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 40
        },
        {
          "id": "ww-043",
          "text": "technological",
          "itemType": "word",
          "scoreRate": 86.8,
          "errorRate": 13.2,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747672",
              "studentName": "曲奕霏",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "technolopical",
              "correctAnswer": "technological",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754550",
              "studentName": "南熙",
              "questionContext": "假设你是红星中学高三学生李华。你参加了 APEC 中国年组委会举办的“中国力量·大家说”国际交流活动，介绍了一位代表中国精神的榜样人物，你的英国好友 Jim 对此很感兴趣。请你用英文给他发邮件，内容包",
              "studentAnswer": "techndlgial",
              "correctAnswer": "technological",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754585",
              "studentName": "陈乐瑶",
              "questionContext": "假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内容包括：1. 活动",
              "studentAnswer": "techenroalting",
              "correctAnswer": "technological",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "",
              "studentAnswer": "technolgical",
              "correctAnswer": "technological",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747672",
              "studentName": "曲奕霏",
              "questionContext": "",
              "studentAnswer": "technoligical",
              "correctAnswer": "technological",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 40
        },
        {
          "id": "ww-044",
          "text": "3D",
          "itemType": "word",
          "scoreRate": 86.8,
          "errorRate": 13.2,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754550",
              "studentName": "南熙",
              "questionContext": ".Use an example to show how you can overcome Arrival Fallacy in your daily life.",
              "studentAnswer": "30",
              "correctAnswer": "3D",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754550",
              "studentName": "南熙",
              "questionContext": ".Use an example to show how you can overcome Arrival Fallacy in your daily life.",
              "studentAnswer": "36",
              "correctAnswer": "3D",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754530",
              "studentName": "周犇",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "3P",
              "correctAnswer": "3D",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754520",
              "studentName": "杨哲铭",
              "questionContext": "",
              "studentAnswer": "30",
              "correctAnswer": "3D",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747687",
              "studentName": "徐珺仪",
              "questionContext": "",
              "studentAnswer": "30",
              "correctAnswer": "3D",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 40
        },
        {
          "id": "ww-045",
          "text": "mathematics",
          "itemType": "word",
          "scoreRate": 86.8,
          "errorRate": 13.2,
          "affectedStudentCount": 1,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747695",
              "studentName": "张恪宁",
              "questionContext": "",
              "studentAnswer": "math",
              "correctAnswer": "mathematics",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747695",
              "studentName": "张恪宁",
              "questionContext": "",
              "studentAnswer": "math",
              "correctAnswer": "mathematics",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747695",
              "studentName": "张恪宁",
              "questionContext": "",
              "studentAnswer": "math",
              "correctAnswer": "mathematics",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747695",
              "studentName": "张恪宁",
              "questionContext": "",
              "studentAnswer": "math",
              "correctAnswer": "mathematics",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747695",
              "studentName": "张恪宁",
              "questionContext": "",
              "studentAnswer": "math",
              "correctAnswer": "mathematics",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在1名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 40
        },
        {
          "id": "ww-046",
          "text": "assistants",
          "itemType": "word",
          "scoreRate": 86.8,
          "errorRate": 13.2,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747637",
              "studentName": "王栎强",
              "questionContext": "",
              "studentAnswer": "assitants",
              "correctAnswer": "assistants",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754585",
              "studentName": "陈乐瑶",
              "questionContext": "",
              "studentAnswer": "asisstarats",
              "correctAnswer": "assistants",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747692",
              "studentName": "臧桂为",
              "questionContext": "",
              "studentAnswer": "assistances",
              "correctAnswer": "assistants",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747692",
              "studentName": "臧桂为",
              "questionContext": "",
              "studentAnswer": "assistances",
              "correctAnswer": "assistants",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "",
              "studentAnswer": "assistents",
              "correctAnswer": "assistants",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 40
        },
        {
          "id": "ww-047",
          "text": "grammar",
          "itemType": "word",
          "scoreRate": 86.8,
          "errorRate": 13.2,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754536",
              "studentName": "陈思卓",
              "questionContext": "",
              "studentAnswer": "gramma",
              "correctAnswer": "grammar",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747637",
              "studentName": "王栎强",
              "questionContext": "",
              "studentAnswer": "gramma",
              "correctAnswer": "grammar",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "questionContext": "",
              "studentAnswer": "grammer",
              "correctAnswer": "grammar",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754546",
              "studentName": "李思堂",
              "questionContext": "",
              "studentAnswer": "grammer",
              "correctAnswer": "grammar",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754530",
              "studentName": "周犇",
              "questionContext": "",
              "studentAnswer": "grammer",
              "correctAnswer": "grammar",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 40
        },
        {
          "id": "ww-048",
          "text": "brainstorm",
          "itemType": "word",
          "scoreRate": 89.4,
          "errorRate": 10.6,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754528",
              "studentName": "张继扬",
              "questionContext": "",
              "studentAnswer": "do brain storm",
              "correctAnswer": "brainstorm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754524",
              "studentName": "张贝宁",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "brainsterming",
              "correctAnswer": "brainstorm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754520",
              "studentName": "杨哲铭",
              "questionContext": "",
              "studentAnswer": "branstorming",
              "correctAnswer": "brainstorm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747680",
              "studentName": "王一陶",
              "questionContext": "",
              "studentAnswer": "brainstor",
              "correctAnswer": "brainstorm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 38
        },
        {
          "id": "ww-049",
          "text": "convenient",
          "itemType": "word",
          "scoreRate": 89.4,
          "errorRate": 10.6,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747646",
              "studentName": "宗畹青",
              "questionContext": "",
              "studentAnswer": "conveniente",
              "correctAnswer": "convenient",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754585",
              "studentName": "陈乐瑶",
              "questionContext": "",
              "studentAnswer": "conenient",
              "correctAnswer": "convenient",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747692",
              "studentName": "臧桂为",
              "questionContext": "",
              "studentAnswer": "convefiulfilabld?",
              "correctAnswer": "convenient",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754585",
              "studentName": "陈乐瑶",
              "questionContext": "",
              "studentAnswer": "convinient",
              "correctAnswer": "convenient",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 38
        }
      ],
      "weakStudents": [
        {
          "id": "24754548",
          "name": "刘灏铭",
          "scoreRate": 79.6,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共38次拼写错误，涉及36个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747667",
          "name": "刘泽尧",
          "scoreRate": 79.1,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共39次拼写错误，涉及36个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747681",
          "name": "王羿祯",
          "scoreRate": 79.1,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共39次拼写错误，涉及34个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754559",
          "name": "王宽",
          "scoreRate": 78.6,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
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
          "weaknessPriorityScore": 22,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754528",
          "name": "张继扬",
          "scoreRate": 78.6,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共40次拼写错误，涉及38个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747646",
          "name": "宗畹青",
          "scoreRate": 78.6,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共40次拼写错误，涉及38个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747692",
          "name": "臧桂为",
          "scoreRate": 78.0,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共41次拼写错误，涉及36个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747672",
          "name": "曲奕霏",
          "scoreRate": 75.4,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共46次拼写错误，涉及43个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747677",
          "name": "王海尘",
          "scoreRate": 74.3,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共48次拼写错误，涉及45个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 26,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747644",
          "name": "张继元",
          "scoreRate": 73.8,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共49次拼写错误，涉及45个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 27,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747665",
          "name": "李昀宸",
          "scoreRate": 71.6,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共53次拼写错误，涉及51个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754543",
          "name": "何昊晏",
          "scoreRate": 71.1,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共54次拼写错误，涉及44个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754522",
          "name": "袁嘉锴",
          "scoreRate": 70.0,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共56次拼写错误，涉及53个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754568",
          "name": "闫光泰",
          "scoreRate": 65.2,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共65次拼写错误，涉及60个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 35,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754564",
          "name": "徐嘉禾",
          "scoreRate": 64.1,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共67次拼写错误，涉及52个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747637",
          "name": "王栎强",
          "scoreRate": 62.5,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共70次拼写错误，涉及66个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747623",
          "name": "林润时",
          "scoreRate": 62.5,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共70次拼写错误，涉及64个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754530",
          "name": "周犇",
          "scoreRate": 61.4,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共72次拼写错误，涉及69个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 39,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754585",
          "name": "陈乐瑶",
          "scoreRate": 60.9,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共73次拼写错误，涉及67个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754596",
          "name": "林子悦",
          "scoreRate": 59.8,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "Beijing",
            "efficiency",
            "perseverance",
            "technology",
            "technologies",
            "sustainable"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共75次拼写错误，涉及72个词。",
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
            }
          ],
          "weakWordDetails": []
        }
      ],
      "goodStudents": [
        {
          "id": "24747651",
          "name": "戴明玥",
          "scoreRate": 99.5,
          "masteredCount": 1,
          "highlight": "词汇拼写错误较少，仅1次",
          "stability": "stable"
        },
        {
          "id": "24747649",
          "name": "陈卓远",
          "scoreRate": 97.3,
          "masteredCount": 5,
          "highlight": "词汇拼写错误较少，仅5次",
          "stability": "stable"
        },
        {
          "id": "24754590",
          "name": "郭嘉谢",
          "scoreRate": 94.6,
          "masteredCount": 10,
          "highlight": "词汇拼写错误较少，仅10次",
          "stability": "stable"
        },
        {
          "id": "24747701",
          "name": "支晗升",
          "scoreRate": 93.6,
          "masteredCount": 11,
          "highlight": "词汇拼写错误较少，仅12次",
          "stability": "stable"
        },
        {
          "id": "24747683",
          "name": "王振安",
          "scoreRate": 89.8,
          "masteredCount": 19,
          "highlight": "词汇拼写错误较少，仅19次",
          "stability": "stable"
        },
        {
          "id": "24747695",
          "name": "张恪宁",
          "scoreRate": 88.8,
          "masteredCount": 17,
          "highlight": "词汇拼写错误较少，仅21次",
          "stability": "stable"
        },
        {
          "id": "24754534",
          "name": "陈汉铭",
          "scoreRate": 86.1,
          "masteredCount": 23,
          "highlight": "词汇拼写错误较少，仅26次",
          "stability": "stable"
        },
        {
          "id": "24747687",
          "name": "徐珺仪",
          "scoreRate": 86.1,
          "masteredCount": 23,
          "highlight": "词汇拼写错误较少，仅26次",
          "stability": "stable"
        },
        {
          "id": "24747679",
          "name": "王烁铭",
          "scoreRate": 85.0,
          "masteredCount": 26,
          "highlight": "词汇拼写错误较少，仅28次",
          "stability": "stable"
        },
        {
          "id": "24747676",
          "name": "万卓坤",
          "scoreRate": 83.9,
          "masteredCount": 30,
          "highlight": "词汇拼写错误较少，仅30次",
          "stability": "stable"
        }
      ],
      "interventionRecords": []
    },
    "writing": {
      "classId": "class-2023级A18班",
      "className": "2023级A18班",
      "unitId": "real-data",
      "unitName": "平台真实数据",
      "timeRange": "30d",
      "updatedAt": "2026-06-11 11:30",
      "summary": "2023级A18班 共 41 名学生，9308 条应用文批改记录，平均 68.1 分。主要问题「词汇表达弱 / 用词单一」(46.7%)，薄弱学生 2 人。",
      "metrics": {
        "averageScore": 68.1,
        "averageLevel": "B",
        "reviewedEssayCount": 9308,
        "mainProblemType": "词汇表达弱 / 用词单一",
        "weakStudentCount": 2,
        "excellentEssayCount": 10
      },
      "problemTypes": [
        {
          "id": "pt-vocabulary_weak",
          "type": "vocabulary_weak",
          "label": "词汇表达弱 / 用词单一",
          "borderColor": "#8e7cc3",
          "bgColor": "#f6f0fc",
          "percent": 46.7,
          "affectedStudentCount": 41,
          "typicalPerformance": "(4347/9308)",
          "aiReason": "共4347次，占比46.7%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "Therefore, on the cold morning, I got up early and my face was covered in sweat ",
            "For me, \"Labor creates value\" is no longer a cold motto anymore; it means we can",
            "Though the process of identifying various waste and guiding smart system was cha"
          ]
        },
        {
          "id": "pt-language_accuracy",
          "type": "language_accuracy",
          "label": "语言准确性弱 / 语法错误多",
          "borderColor": "#7b9cd6",
          "bgColor": "#f0f4fc",
          "percent": 40.6,
          "affectedStudentCount": 41,
          "typicalPerformance": "(3775/9308)",
          "aiReason": "共3775次，占比40.6%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "For me, \"Labor creates value\" is no longer a cold motto anymore; it means we can",
            "For me, \"Labor creates value\" is no longer a cold motto anymore; it means we can",
            "My first task was picking up garbage along streets and sorting them into differe"
          ]
        },
        {
          "id": "pt-structure_unclear",
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "borderColor": "#f0a060",
          "bgColor": "#fef8f0",
          "percent": 6.9,
          "affectedStudentCount": 40,
          "typicalPerformance": "(645/9308)",
          "aiReason": "共645次，占比6.9%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "My fellow0 and I to work on.",
            "My fellow0 and I to work on.",
            "After that, I r volunteers r used the recyclable bottles we had just collected a"
          ]
        },
        {
          "id": "pt-format_issue",
          "type": "format_issue",
          "label": "格式规范问题 / 应用文格式",
          "borderColor": "#9ab3cc",
          "bgColor": "#f5f7fa",
          "percent": 5.8,
          "affectedStudentCount": 41,
          "typicalPerformance": "(541/9308)",
          "aiReason": "共541次，占比5.8%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "After that.",
            "The other volunteers and I used the recyclable bottles and containers we had col",
            "Not only did I notice my green ingenuity but I also realized that the true meani"
          ]
        }
      ],
      "highFrequencyIssues": [
        {
          "problemType": "vocabulary_weak",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24747646",
              "studentName": "宗畹青",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "Therefore, on the cold morning, I got up early and my face was covered in sweat and my army were shaking after cleaning all the ice in the doorway.",
              "issueExplanation": "用词错误：用词错误",
              "revisionSuggestion": "建议把 and my army 换成  , and my arms ",
              "improvedExample": "Therefore, on the cold morning, I got up early, and my face was covered in sweat, and my arms were shaking after cleaning all the ice in the doorway.",
              "score": 72.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24747646",
              "studentName": "宗畹青",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "For me, \"Labor creates value\" is no longer a cold motto anymore; it means we can help others, contribute to the society and make the world better through our own hands, which is how labor can benefit ",
              "issueExplanation": "表达错误：表达冗余",
              "revisionSuggestion": "建议删除  anymore ",
              "improvedExample": "For me, \"Labor creates value\" is no longer a cold motto; it means we can help others, contribute to society, and make the world better through our own hands, which is how labor can benefit me.",
              "score": 72.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24754559",
              "studentName": "王宽",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "Though the process of identifying various waste and guiding smart system was challenging, the appreciation from an elderly woman ignited my determination to work on.",
              "issueExplanation": "用词错误：用词错误",
              "revisionSuggestion": "建议把 work 换成  carry ",
              "improvedExample": "Though the process of identifying various wastes and guiding the smart system was challenging, the appreciation from an elderly woman ignited my determination to carry on.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24754559",
              "studentName": "王宽",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "I have become a more resilient and responsible person during this event.",
              "issueExplanation": "用词错误：用词错误",
              "revisionSuggestion": "建议把 during this event 换成  through this experience ",
              "improvedExample": "I have become a more resilient and responsible person through this experience.",
              "score": 70.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24754528",
              "studentName": "张继扬",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "Labour shapes us in many ways; it not only fosters our responsibility for community, but also builds our character, leading to a more devoting and caring person.",
              "issueExplanation": "用词错误：用词错误",
              "revisionSuggestion": "建议把 devoting 换成  devoted ",
              "improvedExample": "Labour shapes us in many ways; it not only fosters our responsibility for the community, but also builds our character, leading to a more devoted and caring person.",
              "score": 69.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24754528",
              "studentName": "张继扬",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "My experience was volunteering at a local elorely institution.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 elorely 换成  elderly ",
              "improvedExample": "My experience was volunteering at a local elderly institution.",
              "score": 69.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24754528",
              "studentName": "张继扬",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "My job was to sweep the floor, watering flowers, helping in the kitchen, and bathing the elders.",
              "issueExplanation": "固定搭配错误：固定搭配错误",
              "revisionSuggestion": "建议把 bathing 换成  bathe ",
              "improvedExample": "My job was to sweep the floor, water flowers, help in the kitchen, and bathe the elders.",
              "score": 69.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24754528",
              "studentName": "张继扬",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "I suddenly realized that my labour-no matter how hard it seemed really makes a difference in others 'lives; it's worth it.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把   换成  - ",
              "improvedExample": "I suddenly realized that my labour-no matter how hard it seemed-really makes a difference in others' lives; it's worth it.",
              "score": 69.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24754528",
              "studentName": "张继扬",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "I finished that day, tiring yet uplifting.",
              "issueExplanation": "用词错误：分词形容词错误",
              "revisionSuggestion": "建议把 tiring 换成  tired ",
              "improvedExample": "I finished that day, tired yet uplifted.",
              "score": 69.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24754528",
              "studentName": "张继扬",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "I finished that day, tiring yet uplifting.",
              "issueExplanation": "用词错误：用词错误",
              "revisionSuggestion": "建议把 uplifting 换成  uplifted ",
              "improvedExample": "I finished that day, tired yet uplifted.",
              "score": 69.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        },
        {
          "problemType": "language_accuracy",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24747646",
              "studentName": "宗畹青",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "For me, \"Labor creates value\" is no longer a cold motto anymore; it means we can help others, contribute to the society and make the world better through our own hands, which is how labor can benefit ",
              "issueExplanation": "词法错误：冠词错误",
              "revisionSuggestion": "建议把 the society 换成  society, ",
              "improvedExample": "For me, \"Labor creates value\" is no longer a cold motto; it means we can help others, contribute to society, and make the world better through our own hands, which is how labor can benefit me.",
              "score": 72.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24747646",
              "studentName": "宗畹青",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "For me, \"Labor creates value\" is no longer a cold motto anymore; it means we can help others, contribute to the society and make the world better through our own hands, which is how labor can benefit ",
              "issueExplanation": "词法错误：代词错误",
              "revisionSuggestion": "建议把 myself 换成  me ",
              "improvedExample": "For me, \"Labor creates value\" is no longer a cold motto; it means we can help others, contribute to society, and make the world better through our own hands, which is how labor can benefit me.",
              "score": 72.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24754559",
              "studentName": "王宽",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "My first task was picking up garbage along streets and sorting them into different categories with the help of AI-powered machine.",
              "issueExplanation": "词法错误：冠词错误",
              "revisionSuggestion": "建议在 streets 之前插入 the",
              "improvedExample": "My first task was picking up garbage along the streets and sorting it into different categories with the help of an AI-powered machine.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24754559",
              "studentName": "王宽",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "My first task was picking up garbage along streets and sorting them into different categories with the help of AI-powered machine.",
              "issueExplanation": "词法错误：代词错误",
              "revisionSuggestion": "建议把 them 换成  it ",
              "improvedExample": "My first task was picking up garbage along the streets and sorting it into different categories with the help of an AI-powered machine.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24754559",
              "studentName": "王宽",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "My first task was picking up garbage along streets and sorting them into different categories with the help of AI-powered machine.",
              "issueExplanation": "词法错误：冠词错误",
              "revisionSuggestion": "建议在 AI 之前插入 an",
              "improvedExample": "My first task was picking up garbage along the streets and sorting it into different categories with the help of an AI-powered machine.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24754559",
              "studentName": "王宽",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "Though the process of identifying various waste and guiding smart system was challenging, the appreciation from an elderly woman ignited my determination to work on.",
              "issueExplanation": "单复数错误：单复数错误",
              "revisionSuggestion": "建议把 waste 换成  wastes ",
              "improvedExample": "Though the process of identifying various wastes and guiding the smart system was challenging, the appreciation from an elderly woman ignited my determination to carry on.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24754559",
              "studentName": "王宽",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "Though the process of identifying various waste and guiding smart system was challenging, the appreciation from an elderly woman ignited my determination to work on.",
              "issueExplanation": "词法错误：冠词错误",
              "revisionSuggestion": "建议在 smart 之前插入 the",
              "improvedExample": "Though the process of identifying various wastes and guiding the smart system was challenging, the appreciation from an elderly woman ignited my determination to carry on.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24754559",
              "studentName": "王宽",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "Not only did I notice my green ingenuity but I also realized that the true meaning of labor lies in contributing to the broader fate of community.",
              "issueExplanation": "词法错误：冠词错误",
              "revisionSuggestion": "建议在 community 之前插入 the",
              "improvedExample": "Not only did I notice my green ingenuity, but I also realized that the true meaning of labor lies in contributing to the broader fate of the community.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24754559",
              "studentName": "王宽",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "I have became a more resilient and responsible person during this event.",
              "issueExplanation": "时态错误：时态错误",
              "revisionSuggestion": "建议把 became 换成  become ",
              "improvedExample": "I have become a more resilient and responsible person during this event.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24754559",
              "studentName": "王宽",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "My first task was picking up garbage along streets and sorting them into different categories with the help of AI-powered machine.",
              "issueExplanation": "词法错误：冠词错误",
              "revisionSuggestion": "建议在 streets 之前插入 the",
              "improvedExample": "My first task was picking up garbage along the streets and sorting it into different categories with the help of an AI-powered machine.",
              "score": 70.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        },
        {
          "problemType": "structure_unclear",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24754559",
              "studentName": "王宽",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "My fellow0 and I to work on.",
              "issueExplanation": "句子结构错误：句子成分残缺",
              "revisionSuggestion": "建议把 fellow0 换成  fellow volunteers ",
              "improvedExample": "My fellow volunteers and I worked on it.",
              "score": 70.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24754559",
              "studentName": "王宽",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "My fellow0 and I to work on.",
              "issueExplanation": "句子结构错误：句子成分残缺",
              "revisionSuggestion": "建议把 to work on 换成  worked on it ",
              "improvedExample": "My fellow volunteers and I worked on it.",
              "score": 70.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24754559",
              "studentName": "王宽",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "After that, I r volunteers r used the recyclable bottles we had just collected and containers to grow flowers, turning a vacant community corner into a vibrant public garden.",
              "issueExplanation": "句子结构错误：语序错误",
              "revisionSuggestion": "建议把 we had just collected and containers 换成  and containers we had just collected ",
              "improvedExample": "After that, my fellow volunteers and I used the recyclable bottles and containers we had just collected to grow flowers, turning a vacant community corner into a vibrant public garden.",
              "score": 70.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24754528",
              "studentName": "张继扬",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "My job was to sweep the floor, watering flowers, helping in the kitchen, and bathing the elders.",
              "issueExplanation": "句子结构错误：并列结构错误",
              "revisionSuggestion": "建议把 watering 换成  water ",
              "improvedExample": "My job was to sweep the floor, water flowers, help in the kitchen, and bathe the elders.",
              "score": 69.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24754528",
              "studentName": "张继扬",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "My job was to sweep the floor, watering flowers, helping in the kitchen, and bathing the elders.",
              "issueExplanation": "句子结构错误：误用非谓语动词作谓语",
              "revisionSuggestion": "建议把 helping 换成  help ",
              "improvedExample": "My job was to sweep the floor, water flowers, help in the kitchen, and bathe the elders.",
              "score": 69.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24754528",
              "studentName": "张继扬",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "This experience not only strengthened my e resolution to devote to my community, but also taught me that: Every labour counts.",
              "issueExplanation": "句子结构错误：句子成分残缺",
              "revisionSuggestion": "建议在 to 之前插入 myself",
              "improvedExample": "This experience not only strengthened my resolution to devote myself to my community, but also taught me that every labour counts.",
              "score": 69.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24747672",
              "studentName": "曲奕霏",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "It was an amazing feeling to see how my labor was turned into real results on the dinner table when stirring the pot and smelling the fresh vegetables I had picked that morning.",
              "issueExplanation": "句子结构错误：误用非谓语动词作谓语",
              "revisionSuggestion": "建议把 stirring the pot and smelling 换成  I stirred the pot and smelled ",
              "improvedExample": "It was an amazing feeling to see how my labor was turned into real results on the dinner table when I stirred the pot and smelled the fresh vegetables I had picked that morning.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24747672",
              "studentName": "曲奕霏",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "During this event, I learned to transplant seedlings from indoors to outdoors, The task required patience-each tiny root had to be placed carefully in the soil without breaking.",
              "issueExplanation": "句子结构错误：错误使用逗号连接两个完整句子",
              "revisionSuggestion": "建议把 , 换成  . ",
              "improvedExample": "During this event, I learned to transplant seedlings from indoors to outdoors. The task required patience-each tiny root had to be placed carefully in the soil without breaking.",
              "score": 87.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "It not only has made me stronger and healthier, but also has taught me that worth and happiness came from sweat and dedication.",
              "issueExplanation": "句子结构错误：语序错误",
              "revisionSuggestion": "建议把 not only has 换成  has not only ",
              "improvedExample": "It has not only made me stronger and healthier, but also has taught me that worth and happiness come from sweat and dedication.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24747661",
              "studentName": "李家宇",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "It made me struggling when I was attaching threads between different parts of during my first attempt.",
              "issueExplanation": "句子结构错误：宾语补足语错误",
              "revisionSuggestion": "建议把 struggling 换成  struggle ",
              "improvedExample": "It made me struggle when I was attaching threads between different parts during my first attempt.",
              "score": 52.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        },
        {
          "problemType": "format_issue",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24754559",
              "studentName": "王宽",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "After that.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议把 . 换成  , ",
              "improvedExample": "After that,",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24754559",
              "studentName": "王宽",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "The other volunteers and I used the recyclable bottles and containers we had collected to grow flowers, turning a vacant Community corner into a vibrant public garden.",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 Community 换成  community ",
              "improvedExample": "The other volunteers and I used the recyclable bottles and containers we had collected to grow flowers, turning a vacant community corner into a vibrant public garden.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24754559",
              "studentName": "王宽",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "Not only did I notice my green ingenuity but I also realized that the true meaning of labor lies in contributing to the broader fate of community.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议在 but 之前插入 ,",
              "improvedExample": "Not only did I notice my green ingenuity, but I also realized that the true meaning of labor lies in contributing to the broader fate of the community.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24754559",
              "studentName": "王宽",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "For me, the first experience that springs to mind is participating in the \"Green Neighborhood program.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议在 Neighborhood 之后插入 \"",
              "improvedExample": "For me, the first experience that springs to mind is participating in the \"Green Neighborhood\" program.",
              "score": 70.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24747672",
              "studentName": "曲奕霏",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "During this event, I learned to transplant seedlings from indoors to out dooms,",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议把 , 换成  . ",
              "improvedExample": "During this event, I learned to transplant seedlings from indoors to outdoors.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "For me, \"Labor creates value is no longer merely a cold motto in the textbook. anymore, it means we can help others, contribute to society, and make the world a better place through our own hands.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议在 value 之后插入 \"",
              "improvedExample": "For me, \"Labor creates value\" is no longer merely a cold motto in the textbook. Anymore, it means we can help others, contribute to society, and make the world a better place through our own hands.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24754532",
              "studentName": "曹煜堃",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "For me, \"Labor creates value is no longer merely a cold motto in the textbook. anymore, it means we can help others, contribute to society, and make the world a better place through our own hands.",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 anymore 换成  Anymore ",
              "improvedExample": "For me, \"Labor creates value\" is no longer merely a cold motto in the textbook. Anymore, it means we can help others, contribute to society, and make the world a better place through our own hands.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24754524",
              "studentName": "张贝宁",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "Now when I tutor classmates, I remember the burning in my calves.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议在 when 之前插入 ,",
              "improvedExample": "Now, when I tutor classmates, I remember the burning in my calves.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24747692",
              "studentName": "臧桂为",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "My most unforgettable labor experience was doing voluntary work as a guide at the national museum.",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 national museum 换成  National Museum ",
              "improvedExample": "My most unforgettable labor experience was doing voluntary work as a guide at the National Museum.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24747623",
              "studentName": "林润时",
              "essayTitle": "Labor Shaped Me",
              "taskName": "Labor Shaped Me",
              "writingType": "practical",
              "originalText": "I caught myself, checked the bag-sealed, warm-and continued delvering, without hesitation.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议删除 , ",
              "improvedExample": "I caught myself, checked the bag-sealed, warm-and continued delivering without hesitation.",
              "score": 64.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        }
      ],
      "weakStudents": [
        {
          "id": "24747649",
          "name": "陈卓远",
          "averageScore": 49.8,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "格式规范问题 / 应用文格式"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 42.6
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 42.6
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 8.5
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 6.4
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 58.11215,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 58.11215,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 58.11215,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 58.11215,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 58.11215,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24754517",
          "name": "吴昊然",
          "averageScore": 57.3,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "格式规范问题 / 应用文格式"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 64.4
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 23.6
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 7.3
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 4.7
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 81.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 81.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 81.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 81.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 81.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        }
      ],
      "excellentWritings": [
        {
          "id": "ew-754584",
          "studentId": "24754584",
          "studentName": "朱奕宁",
          "essayTitle": "Skills for Sustainable Future",
          "taskName": "Skills for Sustainable Future",
          "writingType": "practical",
          "score": 90.0,
          "level": "A",
          "highlights": "得分90.0分，含佳句",
          "excerpt": "{Greetings Jim,\\n\\nI'm glad to hear that you're participating in the UN Youth Forum with the theme \\\"Skills Needed for a Sustainable Future.\\\" I'm writing to reply to your questions about the content of your speech.\\n\\nI believe the most important skill needed for a sustainable future is adaptation: accepting uncertainty and continuous change with an open mind, and adapting positively to fast-paced development through constant learning. Given that the world is undergoing a technological revoluti",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747692",
          "studentId": "24747692",
          "studentName": "臧桂为",
          "essayTitle": "Skills for Sustainable Future",
          "taskName": "Skills for Sustainable Future",
          "writingType": "practical",
          "score": 90.0,
          "level": "A",
          "highlights": "得分90.0分，含佳句",
          "excerpt": "{Warm greetings! I'm glad to know that you're going to participate in the UN Youth Forum on \\\"Skills Needed for a Sustainable Future.\\\" I'm writing to reply to your questions about the speech content and to share my ideas.\\n\\nI believe AI literacy the ability to use artificial intelligence effectively is crucial. AI can analyze vast datasets to optimize renewable energy distribution, predict extreme weather patterns for better disaster preparedness, and design efficient recycling systems. For ex",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747672",
          "studentId": "24747672",
          "studentName": "曲奕霏",
          "essayTitle": "Skills for Sustainable Future",
          "taskName": "Skills for Sustainable Future",
          "writingType": "practical",
          "score": 90.0,
          "level": "A",
          "highlights": "得分90.0分，含佳句",
          "excerpt": "{I'm thrilled to know that you're taking part in the UN Youth Forum on \\\"Skills Needed for a Sustainable Future.\\\" I'm writing to reply to your questions about the speech content.\\n\\nInnovative thinking is essential for a sustainable future. Innovation drives new technologies that protect and improve the environment. We teenagers need to cultivate creativity to solve pressing problems such as reducing carbon emissions and combating climate change. By developing this capacity, we can adapt to and",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754522",
          "studentId": "24754522",
          "studentName": "袁嘉锴",
          "essayTitle": "Skills for Sustainable Future",
          "taskName": "Skills for Sustainable Future",
          "writingType": "practical",
          "score": 90.0,
          "level": "A",
          "highlights": "得分90.0分，含佳句",
          "excerpt": "{I'm glad to hear that you'll take part in the \\\"Skills Needed for a Sustainable Future\\\" UN Youth Forum. I'm writing to reply to your questions about the content of your speech.\\n\\nI believe innovative integration the ability to combine advanced tools with real-world challenges is the most essential skill for a sustainable future. For instance, while AI excels at solving academic problems, we can apply it more ambitiously: designing AI-powered robots that dive into oceans to detect and remove p",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747623",
          "studentId": "24747623",
          "studentName": "林润时",
          "essayTitle": "中国人的日常智慧",
          "taskName": "中国人的日常智慧",
          "writingType": "practical",
          "score": 90.0,
          "level": "A",
          "highlights": "得分90.0分，含佳句",
          "excerpt": "{I'm thrilled that your club is planning to share the \\\"Wisdom in Chinese Daily Routines.\\\" As you requested, here are my suggestions.\\n\\nTo start with, I would like to introduce the Chinese people's application of \\\"Jie Qi.\\\" Serving as signs of seasonal changes, \\\"Jie Qi\\\" has been widely used in agricultural production and daily cuisine. For example, when the day of \\\"Qing Ming\\\" arrives, farmers begin sowing seeds. And when \\\"Da Shu,\\\" meaning \\\"the Great Heat,\\\" comes, people prefer dishes ",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747679",
          "studentId": "24747679",
          "studentName": "王烁铭",
          "essayTitle": "海淀一模-未来已来",
          "taskName": "海淀一模-未来已来",
          "writingType": "practical",
          "score": 90.0,
          "level": "A",
          "highlights": "得分90.0分",
          "excerpt": "{I'm writing to invite you to our school's upcoming tech festival with the theme \\\"The Future is Here.\\\" The event will be held in the school hall on April 14th, from 9 a.m. to 5 p.m., lasting eight hours.\\n\\nThe festival will start with a fascinating lecture delivered by distinguished AI experts, who will share the latest breakthroughs and discuss the future applications of AI in our daily lives. After the lecture, there will be an impressive exhibition of intelligent robots and high-tech inven",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754590",
          "studentId": "24754590",
          "studentName": "郭嘉谢",
          "essayTitle": "海淀一模-未来已来",
          "taskName": "海淀一模-未来已来",
          "writingType": "practical",
          "score": 90.0,
          "level": "A",
          "highlights": "得分90.0分，含佳句",
          "excerpt": "{How's everything going? I'm writing to invite you to our school's technology festival \\\"The Future is Here\\\".\\n\\nThe festival will be held at the school auditorium on March 29th, from 9 am to 12 pm in the morning, and from 3 pm to 5 pm in the afternoon.\\n\\nThe event will feature two parts. In the morning, there will be \\\"Future in Robots\\\", where robots designed by students will be displayed. Among them will be agricultural robots monitoring soil moisture and temperature, medical robots testing",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754546",
          "studentId": "24754546",
          "studentName": "李思堂",
          "essayTitle": "Skills for Sustainable Future",
          "taskName": "Skills for Sustainable Future",
          "writingType": "practical",
          "score": 89.979294,
          "level": "A",
          "highlights": "得分89.979294分，含佳句",
          "excerpt": "{Dear Jim,\\n\\nI'm glad to hear that you're joining the UN Youth Forum themed \\\"Skills Needed for a Sustainable Future.\\\" I'm writing to reply to your questions about the speech content.\\n\\nFirst and foremost, the ability to communicate and collaborate effectively across cultures is what I consider most important. As the world grows ever more interconnected, we cannot build a sustainable future without mutual understanding and cooperation. Effective dialogue across different cultures helps bridge",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747687",
          "studentId": "24747687",
          "studentName": "徐珺仪",
          "essayTitle": "Skills for Sustainable Future",
          "taskName": "Skills for Sustainable Future",
          "writingType": "practical",
          "score": 89.89311,
          "level": "A",
          "highlights": "得分89.89311分，含佳句",
          "excerpt": "{Greetings Jim,\\n\\nIt's great to know that you're participating in the UN Youth Forum themed \\\"Skills Needed for a Sustainable Future\\\". I'm writing to share my opinions with you in response to your questions about the speech content.\\n\\nI think the No.1 skill needed is \\\"creativity\\\". It refers to the skill of creating breakthroughs from \\\"0\\\" to \\\"1\\\" and finding new ideas from a sketch. In a world where resources are limited, creativity enables us to dig out the maximum values of ordinary thi",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754567",
          "studentId": "24754567",
          "studentName": "薛宇伦",
          "essayTitle": "Skills for Sustainable Future",
          "taskName": "Skills for Sustainable Future",
          "writingType": "practical",
          "score": 89.58972,
          "level": "A",
          "highlights": "得分89.58972分，含佳句",
          "excerpt": "{I'm so thrilled to hear that you're going to participate in the UN Youth Forum on \\\"Skills Needed for a Sustainable Future.\\\" I'd like to share my thoughts with you in reply to your questions about the speech.\\n\\nWhat I regard as most essential is AI-assisted systems thinking. By using AI to analyze household and community resource flows, we can identify inefficiencies and promote the lifelong ability to work efficiently. This skill helps us understand complex problems and find innovative solut",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        }
      ],
      "recommendedResources": [
        {
          "id": "res-w-1",
          "title": "应用文写作模板训练",
          "resourceType": "writing_practice",
          "tags": [
            "写作",
            "应用文"
          ],
          "difficulty": "medium",
          "grade": "高二",
          "recommendReason": "针对词汇表达弱 / 用词单一设计",
          "canPreview": true,
          "canAssign": true,
          "canAddToPaperBasket": true
        }
      ],
      "generatedSamples": [
        {
          "id": "gs-1",
          "level": "basic",
          "title": "基础版 — 朱奕宁的作文",
          "content": "{I once thought that finishing a short running challenge would make me completely happy. For example, when I decided to run for two days, I set up a small reward for myself, like a new key chain. This reward helped me feel more satisfied and reminded me to keep going. By doing this, I avoided falling into the Arrival Fallacy, which is expecting happiness only after reaching a goal. Now, I focus more on enjoying the process and feel more motivated and content every day.}",
          "highlights": "得分49.04298分 | 适合基础薄弱学生参考基本结构",
          "suitableFor": "20分以下",
          "editable": true
        },
        {
          "id": "gs-2",
          "level": "improved",
          "title": "提升版 — 李家宇的作文",
          "content": "{Hi Jim,\\n\\nThanks for asking about the \\\"Most Respected Worker\\\" exhibition held at our school. I'm excited to tell you about it. The exhibition includes various art forms such as photography, painting, and handmade crafts. These works show the hard work and dedication of different workers in our society.\\n\\nI was really touched by the exhibition. The photos and paintings captured the spirit and effort of the workers, and the handmade crafts added a special personal touch. It made me appreciate their contributions even more and inspired me to work hard in my own life.\\n\\nLooking forward to hearing your thoughts!\\n\\nBest,\\nLi Hua}",
          "highlights": "得分67.0分 | 展示中等水平如何组织内容和句式",
          "suitableFor": "20-25分",
          "editable": true
        },
        {
          "id": "gs-3",
          "level": "excellent",
          "title": "优秀版 — 朱奕宁的作文",
          "content": "{Greetings Jim,\\n\\nI'm glad to hear that you're participating in the UN Youth Forum with the theme \\\"Skills Needed for a Sustainable Future.\\\" I'm writing to reply to your questions about the content of your speech.\\n\\nI believe the most important skill needed for a sustainable future is adaptation: accepting uncertainty and continuous change with an open mind, and adapting positively to fast-paced development through constant learning. Given that the world is undergoing a technological revolution, the \\\"hard skills\\\" we used to rely on are gradually being replaced by technologies like AI. Hence, \\\"soft skills\\\" like adaptation can prepare us for the world's evolving needs and help guarantee a sustainable future.\\n\\nCritical thinking skills are another essential ability. It means being rational and cool-headed when facing news and comments, and identifying their credibility with structured mindsets. Since we are living in a world where the internet contains a large amount of false information and potentially illegal uses of AI, we require this skill to build a more ethical and healthier digital environment.\\n\\nI hope my ideas can spark your inspiration. Best of luck at the forum!\\n\\nLi Hua}",
          "highlights": "得分90.0分，含佳句 | 展示高分作文的表达水平",
          "suitableFor": "25+分",
          "editable": true
        }
      ],
      "interventionRecords": []
    }
  },
  "2023级A14班": {
    "vocabulary": {
      "classId": "class-2023级A14班",
      "className": "2023级A14班",
      "unitId": "real-data",
      "unitName": "平台真实数据",
      "timeRange": "30d",
      "updatedAt": "2026-06-11 11:30",
      "summary": "2023级A14班 共 40 名学生，1573 条词汇错误记录，涉及 993 个词。薄弱学生 3 人，建议重点加强默写和拼写训练。",
      "metrics": {
        "practicedWordCount": 993,
        "weakWordCount": 50,
        "weakStudentCount": 3,
        "mainWeakType": "拼不对 / 默写错误"
      },
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100,
          "affectedStudentCount": 39,
          "exampleWords": [
            "AI/artificial intelligence",
            "Beijing",
            "technology",
            "writing",
            "laborer/labourer"
          ],
          "aiReason": "平台数据错因均为'不会写'，归类为拼写错误。2023级A14班共1573条拼写错误记录。",
          "recommendedActions": [
            "默写",
            "词汇复习规划",
            "组卷"
          ],
          "borderColor": "#f0a060",
          "bgColor": "#fef8f0"
        }
      ],
      "weakWords": [
        {
          "id": "ww-000",
          "text": "AI/artificial intelligence",
          "itemType": "word",
          "scoreRate": 10.0,
          "errorRate": 90.0,
          "affectedStudentCount": 13,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747762",
              "studentName": "贺世雄",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "Al",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "A",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754612",
              "studentName": "王天翊",
              "questionContext": "",
              "studentAnswer": "Al",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754637",
              "studentName": "周歆然",
              "questionContext": "",
              "studentAnswer": "At",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754623",
              "studentName": "姚顺心",
              "questionContext": "",
              "studentAnswer": "al",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在13名学生中出现20次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 99
        },
        {
          "id": "ww-001",
          "text": "Beijing",
          "itemType": "word",
          "scoreRate": 32.5,
          "errorRate": 67.5,
          "affectedStudentCount": 10,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "Being",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "Besing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754606",
              "studentName": "申雅欣",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "Beiy ing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754601",
              "studentName": "刘胜昔",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "Bejing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "Bering",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在10名学生中出现15次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 81
        },
        {
          "id": "ww-002",
          "text": "technology",
          "itemType": "word",
          "scoreRate": 37.0,
          "errorRate": 63.0,
          "affectedStudentCount": 8,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754612",
              "studentName": "王天翊",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "tecknoloogy",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754612",
              "studentName": "王天翊",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "teclnology",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754610",
              "studentName": "王明中",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "techningy",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": ", techology",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "technenlogy",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在8名学生中出现14次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 78
        },
        {
          "id": "ww-003",
          "text": "writing",
          "itemType": "word",
          "scoreRate": 41.5,
          "errorRate": 58.5,
          "affectedStudentCount": 8,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754612",
              "studentName": "王天翊",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "writting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "",
              "studentAnswer": "wirting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747759",
              "studentName": "董翔宇",
              "questionContext": "",
              "studentAnswer": "writng",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "",
              "studentAnswer": "writting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754600",
              "studentName": "李知真",
              "questionContext": "",
              "studentAnswer": "witing",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在8名学生中出现13次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 74
        },
        {
          "id": "ww-004",
          "text": "laborer/labourer",
          "itemType": "word",
          "scoreRate": 41.5,
          "errorRate": 58.5,
          "affectedStudentCount": 7,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754621",
              "studentName": "杨天梓",
              "questionContext": "",
              "studentAnswer": "laborators",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747762",
              "studentName": "贺世雄",
              "questionContext": "",
              "studentAnswer": "wlaborers",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "18564246",
              "studentName": "王弈茗",
              "questionContext": "",
              "studentAnswer": "labours",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754621",
              "studentName": "杨天梓",
              "questionContext": "",
              "studentAnswer": "laborators",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754621",
              "studentName": "杨天梓",
              "questionContext": "",
              "studentAnswer": "laborators",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在7名学生中出现13次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 74
        },
        {
          "id": "ww-005",
          "text": "activity",
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
          "typicalMistakes": [
            {
              "studentId": "24754638",
              "studentName": "周子祺",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "acitivity",
              "correctAnswer": "activity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747758",
              "studentName": "董颢宁",
              "questionContext": "",
              "studentAnswer": "cetivity",
              "correctAnswer": "activity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "",
              "studentAnswer": "actiity",
              "correctAnswer": "activity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "",
              "studentAnswer": "acthity",
              "correctAnswer": "activity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "",
              "studentAnswer": "actireity",
              "correctAnswer": "activity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现10次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 64
        },
        {
          "id": "ww-006",
          "text": "truly",
          "itemType": "word",
          "scoreRate": 59.5,
          "errorRate": 40.5,
          "affectedStudentCount": 8,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754600",
              "studentName": "李知真",
              "questionContext": "",
              "studentAnswer": "truely",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "trly",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754606",
              "studentName": "申雅欣",
              "questionContext": "",
              "studentAnswer": "truely",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754631",
              "studentName": "张思妥",
              "questionContext": "",
              "studentAnswer": "truely",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754610",
              "studentName": "王明中",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "truely",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在8名学生中出现9次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 61
        },
        {
          "id": "ww-007",
          "text": "responsibility",
          "itemType": "word",
          "scoreRate": 64.0,
          "errorRate": 36.0,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "假设你是红星中学高三学生李华。你校英语社团正在举办以“Becoming a Better Self”为主题的征文活动。请你用英文写一篇短文投稿，内容包括： 1. 你的理解； 2. 你的做法。 注意： ",
              "studentAnswer": "regausibiliter",
              "correctAnswer": "responsibility",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754626",
              "studentName": "袁梓萌",
              "questionContext": "假设你是红星中学高三学生李华。你校英语社团正在举办以“Becoming a Better Self”为主题的征文活动。请你用英文写一篇短文投稿，内容包括： 1. 你的理解； 2. 你的做法。 注意： ",
              "studentAnswer": "responsebility",
              "correctAnswer": "responsibility",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "repmnsibility",
              "correctAnswer": "responsibility",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "respenililities",
              "correctAnswer": "responsibility",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "How can “ Aspera” lead you to “Astra” ? (In about 40 words)",
              "studentAnswer": "rapoublity",
              "correctAnswer": "responsibility",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现8次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 57
        },
        {
          "id": "ww-008",
          "text": "interested",
          "itemType": "word",
          "scoreRate": 64.0,
          "errorRate": 36.0,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "inforethed",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754631",
              "studentName": "张思妥",
              "questionContext": "",
              "studentAnswer": "intrested",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754631",
              "studentName": "张思妥",
              "questionContext": "",
              "studentAnswer": "intersted",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "intereted",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754630",
              "studentName": "张若滢",
              "questionContext": "",
              "studentAnswer": "intrested",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现8次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 57
        },
        {
          "id": "ww-009",
          "text": "skills",
          "itemType": "word",
          "scoreRate": 64.0,
          "errorRate": 36.0,
          "affectedStudentCount": 6,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747758",
              "studentName": "董颢宁",
              "questionContext": "",
              "studentAnswer": "shills",
              "correctAnswer": "skills",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754612",
              "studentName": "王天翊",
              "questionContext": "",
              "studentAnswer": "sklls",
              "correctAnswer": "skills",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754612",
              "studentName": "王天翊",
              "questionContext": "",
              "studentAnswer": "stills",
              "correctAnswer": "skills",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754612",
              "studentName": "王天翊",
              "questionContext": "",
              "studentAnswer": "tkills",
              "correctAnswer": "skills",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754607",
              "studentName": "史翰明",
              "questionContext": "",
              "studentAnswer": "skill-",
              "correctAnswer": "skills",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现8次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 57
        },
        {
          "id": "ww-010",
          "text": "exhibition",
          "itemType": "word",
          "scoreRate": 64.0,
          "errorRate": 36.0,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "",
              "studentAnswer": "exbition",
              "correctAnswer": "exhibition",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "esxibitio.",
              "correctAnswer": "exhibition",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "",
              "studentAnswer": "exibition",
              "correctAnswer": "exhibition",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754612",
              "studentName": "王天翊",
              "questionContext": "",
              "studentAnswer": "exbition",
              "correctAnswer": "exhibition",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754621",
              "studentName": "杨天梓",
              "questionContext": "",
              "studentAnswer": "exhibion",
              "correctAnswer": "exhibition",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现8次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 57
        },
        {
          "id": "ww-011",
          "text": "also",
          "itemType": "word",
          "scoreRate": 68.5,
          "errorRate": 31.5,
          "affectedStudentCount": 6,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "",
              "studentAnswer": "alto",
              "correctAnswer": "also",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754609",
              "studentName": "王宝淳",
              "questionContext": "",
              "studentAnswer": "aalso",
              "correctAnswer": "also",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754634",
              "studentName": "张子俏",
              "questionContext": "",
              "studentAnswer": "als",
              "correctAnswer": "also",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "",
              "studentAnswer": "all o",
              "correctAnswer": "also",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754619",
              "studentName": "闫宇成",
              "questionContext": "How can “ Aspera” lead you to “Astra” ? (In about 40 words)",
              "studentAnswer": "ako",
              "correctAnswer": "also",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现7次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 54
        },
        {
          "id": "ww-012",
          "text": "efficiency",
          "itemType": "word",
          "scoreRate": 68.5,
          "errorRate": 31.5,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754630",
              "studentName": "张若滢",
              "questionContext": "",
              "studentAnswer": "effeiciency",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "18564246",
              "studentName": "王弈茗",
              "questionContext": "",
              "studentAnswer": "efficientgy.",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754609",
              "studentName": "王宝淳",
              "questionContext": "",
              "studentAnswer": "effecienc",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754619",
              "studentName": "闫宇成",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "effeciency",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754630",
              "studentName": "张若滢",
              "questionContext": "",
              "studentAnswer": "effciency",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现7次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 54
        },
        {
          "id": "ww-013",
          "text": "horizon",
          "itemType": "word",
          "scoreRate": 68.5,
          "errorRate": 31.5,
          "affectedStudentCount": 6,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747763",
              "studentName": "黄海欣",
              "questionContext": "",
              "studentAnswer": "horizone",
              "correctAnswer": "horizon",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "",
              "studentAnswer": "honzen",
              "correctAnswer": "horizon",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754631",
              "studentName": "张思妥",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "horizens",
              "correctAnswer": "horizon",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "",
              "studentAnswer": "horion",
              "correctAnswer": "horizon",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747759",
              "studentName": "董翔宇",
              "questionContext": "",
              "studentAnswer": "hor",
              "correctAnswer": "horizon",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现7次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 54
        },
        {
          "id": "ww-014",
          "text": "environment",
          "itemType": "word",
          "scoreRate": 68.5,
          "errorRate": 31.5,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754634",
              "studentName": "张子俏",
              "questionContext": "",
              "studentAnswer": "enviromer",
              "correctAnswer": "environment",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "How would you design your community as Ryan Johnson did to make it a better place to live in?(In abo",
              "studentAnswer": "enviroment",
              "correctAnswer": "environment",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754608",
              "studentName": "汪思齐",
              "questionContext": "",
              "studentAnswer": "envirment",
              "correctAnswer": "environment",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "",
              "studentAnswer": "enviroment",
              "correctAnswer": "environment",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747756",
              "studentName": "陈安祺",
              "questionContext": "",
              "studentAnswer": "enviornment",
              "correctAnswer": "environment",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现7次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 54
        },
        {
          "id": "ww-015",
          "text": "lives",
          "itemType": "word",
          "scoreRate": 68.5,
          "errorRate": 31.5,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754625",
              "studentName": "郁玲珑",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "lifes",
              "correctAnswer": "lives",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754600",
              "studentName": "李知真",
              "questionContext": "",
              "studentAnswer": "lifes",
              "correctAnswer": "lives",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754606",
              "studentName": "申雅欣",
              "questionContext": "",
              "studentAnswer": "tiEesnolig",
              "correctAnswer": "lives",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754612",
              "studentName": "王天翊",
              "questionContext": "",
              "studentAnswer": "lifes",
              "correctAnswer": "lives",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754631",
              "studentName": "张思妥",
              "questionContext": "",
              "studentAnswer": "lifes",
              "correctAnswer": "lives",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现7次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 54
        },
        {
          "id": "ww-016",
          "text": "buildings",
          "itemType": "word",
          "scoreRate": 73.0,
          "errorRate": 27.0,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754630",
              "studentName": "张若滢",
              "questionContext": "",
              "studentAnswer": "building,",
              "correctAnswer": "buildings",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "buldings",
              "correctAnswer": "buildings",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747762",
              "studentName": "贺世雄",
              "questionContext": "",
              "studentAnswer": "building,",
              "correctAnswer": "buildings",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "",
              "studentAnswer": "buldings",
              "correctAnswer": "buildings",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754599",
              "studentName": "李思玥",
              "questionContext": "",
              "studentAnswer": "al uildings",
              "correctAnswer": "buildings",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 50
        },
        {
          "id": "ww-017",
          "text": "broaden",
          "itemType": "word",
          "scoreRate": 73.0,
          "errorRate": 27.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754612",
              "studentName": "王天翊",
              "questionContext": "假设你是红星中学高三学生李华。你校英语社团正在举办以“Becoming a Better Self”为主题的征文活动。请你用英文写一篇短文投稿，内容包括： 1. 你的理解； 2. 你的做法。 注意： ",
              "studentAnswer": "boandetr",
              "correctAnswer": "broaden",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "",
              "studentAnswer": "broad",
              "correctAnswer": "broaden",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754606",
              "studentName": "申雅欣",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "broadened",
              "correctAnswer": "broaden",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "",
              "studentAnswer": "broadn",
              "correctAnswer": "broaden",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "",
              "studentAnswer": "broadous",
              "correctAnswer": "broaden",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 50
        },
        {
          "id": "ww-018",
          "text": "your",
          "itemType": "word",
          "scoreRate": 73.0,
          "errorRate": 27.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "yur",
              "correctAnswer": "your",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "",
              "studentAnswer": "you,",
              "correctAnswer": "your",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "yrar",
              "correctAnswer": "your",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "yrar",
              "correctAnswer": "your",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754630",
              "studentName": "张若滢",
              "questionContext": "",
              "studentAnswer": "yor",
              "correctAnswer": "your",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 50
        },
        {
          "id": "ww-019",
          "text": "gallery",
          "itemType": "word",
          "scoreRate": 73.0,
          "errorRate": 27.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754623",
              "studentName": "姚顺心",
              "questionContext": "",
              "studentAnswer": "galary",
              "correctAnswer": "gallery",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "",
              "studentAnswer": "galary",
              "correctAnswer": "gallery",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "",
              "studentAnswer": "galary",
              "correctAnswer": "gallery",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754604",
              "studentName": "屈楷博",
              "questionContext": "",
              "studentAnswer": "gallary",
              "correctAnswer": "gallery",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "",
              "studentAnswer": "galary",
              "correctAnswer": "gallery",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 50
        },
        {
          "id": "ww-020",
          "text": "criticise",
          "itemType": "word",
          "scoreRate": 73.0,
          "errorRate": 27.0,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747762",
              "studentName": "贺世雄",
              "questionContext": "",
              "studentAnswer": "critisized",
              "correctAnswer": "criticise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747760",
              "studentName": "董彦德",
              "questionContext": "",
              "studentAnswer": "crilisized",
              "correctAnswer": "criticise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754600",
              "studentName": "李知真",
              "questionContext": "",
              "studentAnswer": "critisized",
              "correctAnswer": "criticise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754600",
              "studentName": "李知真",
              "questionContext": "",
              "studentAnswer": "critisized",
              "correctAnswer": "criticise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754623",
              "studentName": "姚顺心",
              "questionContext": "",
              "studentAnswer": "critisized",
              "correctAnswer": "criticise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 50
        },
        {
          "id": "ww-021",
          "text": "community",
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
          "typicalMistakes": [
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "commnity",
              "correctAnswer": "community",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "18564246",
              "studentName": "王弈茗",
              "questionContext": "",
              "studentAnswer": "communit",
              "correctAnswer": "community",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747760",
              "studentName": "董彦德",
              "questionContext": "",
              "studentAnswer": "commmunity",
              "correctAnswer": "community",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "ammmity",
              "correctAnswer": "community",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "假设你是红星中学高三学生李华。你校英语社团正在举办以“Becoming a Better Self”为主题的征文活动。请你用英文写一篇短文投稿，内容包括： 1. 你的理解； 2. 你的做法。 注意： ",
              "studentAnswer": "amossity",
              "correctAnswer": "community",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-022",
          "text": "college",
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
          "typicalMistakes": [
            {
              "studentId": "24754622",
              "studentName": "杨泽宇",
              "questionContext": "",
              "studentAnswer": "collage",
              "correctAnswer": "college",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754623",
              "studentName": "姚顺心",
              "questionContext": "",
              "studentAnswer": "collage",
              "correctAnswer": "college",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754631",
              "studentName": "张思妥",
              "questionContext": "",
              "studentAnswer": "collge",
              "correctAnswer": "college",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754625",
              "studentName": "郁玲珑",
              "questionContext": "",
              "studentAnswer": "collage",
              "correctAnswer": "college",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754625",
              "studentName": "郁玲珑",
              "questionContext": "",
              "studentAnswer": "collage",
              "correctAnswer": "college",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-023",
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
          "typicalMistakes": [
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "假设你是红星中学高三学生李华。你校英语社团正在举办以“Becoming a Better Self”为主题的征文活动。请你用英文写一篇短文投稿，内容包括： 1. 你的理解； 2. 你的做法。 注意： ",
              "studentAnswer": "purlicipate",
              "correctAnswer": "participate",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "partipate",
              "correctAnswer": "participate",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747759",
              "studentName": "董翔宇",
              "questionContext": "",
              "studentAnswer": "particpate",
              "correctAnswer": "participate",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754637",
              "studentName": "周歆然",
              "questionContext": "",
              "studentAnswer": "participte",
              "correctAnswer": "participate",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754638",
              "studentName": "周子祺",
              "questionContext": "",
              "studentAnswer": "participanting",
              "correctAnswer": "participate",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-024",
          "text": "activities",
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
          "typicalMistakes": [
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "",
              "studentAnswer": "acthaites",
              "correctAnswer": "activities",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754624",
              "studentName": "叶广涵",
              "questionContext": "",
              "studentAnswer": "activites",
              "correctAnswer": "activities",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754606",
              "studentName": "申雅欣",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "activiy",
              "correctAnswer": "activities",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "acthity",
              "correctAnswer": "activities",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754625",
              "studentName": "郁玲珑",
              "questionContext": "",
              "studentAnswer": "activies",
              "correctAnswer": "activities",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-025",
          "text": "forward",
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
          "typicalMistakes": [
            {
              "studentId": "24754610",
              "studentName": "王明中",
              "questionContext": "",
              "studentAnswer": "foward",
              "correctAnswer": "forward",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754602",
              "studentName": "刘欣褀",
              "questionContext": "",
              "studentAnswer": "foward",
              "correctAnswer": "forward",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754602",
              "studentName": "刘欣褀",
              "questionContext": "",
              "studentAnswer": "foward",
              "correctAnswer": "forward",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "forwad",
              "correctAnswer": "forward",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754602",
              "studentName": "刘欣褀",
              "questionContext": "",
              "studentAnswer": "foward",
              "correctAnswer": "forward",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-026",
          "text": "students",
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
          "typicalMistakes": [
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "studatr",
              "correctAnswer": "students",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754637",
              "studentName": "周歆然",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "student,",
              "correctAnswer": "students",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754631",
              "studentName": "张思妥",
              "questionContext": "",
              "studentAnswer": "studeals",
              "correctAnswer": "students",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "shndarts",
              "correctAnswer": "students",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "",
              "studentAnswer": "staudents",
              "correctAnswer": "students",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-027",
          "text": "better",
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
          "typicalMistakes": [
            {
              "studentId": "24747760",
              "studentName": "董彦德",
              "questionContext": "",
              "studentAnswer": "wetter",
              "correctAnswer": "better",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "brter",
              "correctAnswer": "better",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754630",
              "studentName": "张若滢",
              "questionContext": "",
              "studentAnswer": "bette",
              "correctAnswer": "better",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "letter",
              "correctAnswer": "better",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754634",
              "studentName": "张子俏",
              "questionContext": "",
              "studentAnswer": "betiter",
              "correctAnswer": "better",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-028",
          "text": "pedestrian",
          "itemType": "word",
          "scoreRate": 77.5,
          "errorRate": 22.5,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754600",
              "studentName": "李知真",
              "questionContext": "How would you design your community as Ryan Johnson did to make it a better place to live in?(In abo",
              "studentAnswer": "pedestrain",
              "correctAnswer": "pedestrian",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754638",
              "studentName": "周子祺",
              "questionContext": "How would you design your community as Ryan Johnson did to make it a better place to live in?(In abo",
              "studentAnswer": "pertesterian",
              "correctAnswer": "pedestrian",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754623",
              "studentName": "姚顺心",
              "questionContext": "How would you design your community as Ryan Johnson did to make it a better place to live in?(In abo",
              "studentAnswer": "pedestrain",
              "correctAnswer": "pedestrian",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754612",
              "studentName": "王天翊",
              "questionContext": "How would you design your community as Ryan Johnson did to make it a better place to live in?(In abo",
              "studentAnswer": "pedes train",
              "correctAnswer": "pedestrian",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754624",
              "studentName": "叶广涵",
              "questionContext": "How would you design your community as Ryan Johnson did to make it a better place to live in?(In abo",
              "studentAnswer": "pedestrain",
              "correctAnswer": "pedestrian",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-029",
          "text": "development",
          "itemType": "word",
          "scoreRate": 77.5,
          "errorRate": 22.5,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747765",
              "studentName": "李佳晴",
              "questionContext": "",
              "studentAnswer": "deieopment",
              "correctAnswer": "development",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754610",
              "studentName": "王明中",
              "questionContext": "",
              "studentAnswer": "develpment",
              "correctAnswer": "development",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754634",
              "studentName": "张子俏",
              "questionContext": "",
              "studentAnswer": "developmeint",
              "correctAnswer": "development",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747759",
              "studentName": "董翔宇",
              "questionContext": "",
              "studentAnswer": "\"developmen",
              "correctAnswer": "development",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754631",
              "studentName": "张思妥",
              "questionContext": "",
              "studentAnswer": "developement",
              "correctAnswer": "development",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-030",
          "text": "modern",
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
          "typicalMistakes": [
            {
              "studentId": "24754619",
              "studentName": "闫宇成",
              "questionContext": "",
              "studentAnswer": "mordern",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754619",
              "studentName": "闫宇成",
              "questionContext": "",
              "studentAnswer": "mordern",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "",
              "studentAnswer": "morden",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754600",
              "studentName": "李知真",
              "questionContext": "",
              "studentAnswer": "morden",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754600",
              "studentName": "李知真",
              "questionContext": "",
              "studentAnswer": "morden",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-031",
          "text": "everybody/everyone",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "",
              "studentAnswer": "evayone",
              "correctAnswer": "everybody/everyone",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "everyoine",
              "correctAnswer": "everybody/everyone",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754610",
              "studentName": "王明中",
              "questionContext": "",
              "studentAnswer": "every one",
              "correctAnswer": "everybody/everyone",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "eumgone",
              "correctAnswer": "everybody/everyone",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-032",
          "text": "complex",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754606",
              "studentName": "申雅欣",
              "questionContext": "",
              "studentAnswer": "complexedl,",
              "correctAnswer": "complex",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754621",
              "studentName": "杨天梓",
              "questionContext": "",
              "studentAnswer": "compler",
              "correctAnswer": "complex",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754600",
              "studentName": "李知真",
              "questionContext": "",
              "studentAnswer": "complexe",
              "correctAnswer": "complex",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747764",
              "studentName": "金楚迪",
              "questionContext": "",
              "studentAnswer": "complexe",
              "correctAnswer": "complex",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-033",
          "text": "physical",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754609",
              "studentName": "王宝淳",
              "questionContext": "",
              "studentAnswer": "physic",
              "correctAnswer": "physical",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754624",
              "studentName": "叶广涵",
              "questionContext": "",
              "studentAnswer": "phsically",
              "correctAnswer": "physical",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754637",
              "studentName": "周歆然",
              "questionContext": "",
              "studentAnswer": "phyical",
              "correctAnswer": "physical",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747758",
              "studentName": "董颢宁",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "physial",
              "correctAnswer": "physical",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-034",
          "text": "make",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "wake",
              "correctAnswer": "make",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747762",
              "studentName": "贺世雄",
              "questionContext": "",
              "studentAnswer": "snake",
              "correctAnswer": "make",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747763",
              "studentName": "黄海欣",
              "questionContext": "",
              "studentAnswer": "take",
              "correctAnswer": "make",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754612",
              "studentName": "王天翊",
              "questionContext": "",
              "studentAnswer": "mnake",
              "correctAnswer": "make",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-035",
          "text": "enthusiasm",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 1,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "enthusaim",
              "correctAnswer": "enthusiasm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "ethutisom",
              "correctAnswer": "enthusiasm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "How can “ Aspera” lead you to “Astra” ? (In about 40 words)",
              "studentAnswer": "exthusiaim",
              "correctAnswer": "enthusiasm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "athiwiash",
              "correctAnswer": "enthusiasm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在1名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-036",
          "text": "strengthen",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754602",
              "studentName": "刘欣褀",
              "questionContext": "",
              "studentAnswer": "strenghtened",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754612",
              "studentName": "王天翊",
              "questionContext": "假设你是红星中学高三学生李华。你校英语社团正在举办以“Becoming a Better Self”为主题的征文活动。请你用英文写一篇短文投稿，内容包括： 1. 你的理解； 2. 你的做法。 注意： ",
              "studentAnswer": "strenghtheus",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754637",
              "studentName": "周歆然",
              "questionContext": "",
              "studentAnswer": "strenthen",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754630",
              "studentName": "张若滢",
              "questionContext": "",
              "studentAnswer": "strengtheing",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-037",
          "text": "bicycle",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 2,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "",
              "studentAnswer": "bluycle",
              "correctAnswer": "bicycle",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "How would you design your community as Ryan Johnson did to make it a better place to live in?(In abo",
              "studentAnswer": "biycle",
              "correctAnswer": "bicycle",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "How would you design your community as Ryan Johnson did to make it a better place to live in?(In abo",
              "studentAnswer": "bigcles",
              "correctAnswer": "bicycle",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747760",
              "studentName": "董彦德",
              "questionContext": "",
              "studentAnswer": "byicle",
              "correctAnswer": "bicycle",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在2名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-038",
          "text": "knowledge",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747756",
              "studentName": "陈安祺",
              "questionContext": "",
              "studentAnswer": "konwledge",
              "correctAnswer": "knowledge",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "hledge",
              "correctAnswer": "knowledge",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754627",
              "studentName": "张定璁",
              "questionContext": "",
              "studentAnswer": "knownledge",
              "correctAnswer": "knowledge",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "kouhledge",
              "correctAnswer": "knowledge",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-039",
          "text": "around",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754624",
              "studentName": "叶广涵",
              "questionContext": "假设你是红星中学高三学生李华。你校英语社团正在举办以“Becoming a Better Self”为主题的征文活动。请你用英文写一篇短文投稿，内容包括： 1. 你的理解； 2. 你的做法。 注意： ",
              "studentAnswer": "aroud",
              "correctAnswer": "around",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754626",
              "studentName": "袁梓萌",
              "questionContext": "假设你是红星中学高三学生李华。你校英语社团正在举办以“Becoming a Better Self”为主题的征文活动。请你用英文写一篇短文投稿，内容包括： 1. 你的理解； 2. 你的做法。 注意： ",
              "studentAnswer": "aroud",
              "correctAnswer": "around",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754624",
              "studentName": "叶广涵",
              "questionContext": "",
              "studentAnswer": "aroud",
              "correctAnswer": "around",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "arand",
              "correctAnswer": "around",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-040",
          "text": "people",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747754",
              "studentName": "白奕堃",
              "questionContext": "假设你是红星中学高三学生李华。你校英语社团正在举办以“Becoming a Better Self”为主题的征文活动。请你用英文写一篇短文投稿，内容包括： 1. 你的理解； 2. 你的做法。 注意： ",
              "studentAnswer": "peopl",
              "correctAnswer": "people",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "perple",
              "correctAnswer": "people",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "",
              "studentAnswer": "poople",
              "correctAnswer": "people",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "paple",
              "correctAnswer": "people",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-041",
          "text": "includes",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 2,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "假设你是红星中学高三学生李华。你校英语社团正在举办以“Becoming a Better Self”为主题的征文活动。请你用英文写一篇短文投稿，内容包括： 1. 你的理解； 2. 你的做法。 注意： ",
              "studentAnswer": "incudes",
              "correctAnswer": "includes",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "",
              "studentAnswer": "incudes",
              "correctAnswer": "includes",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "idudes",
              "correctAnswer": "includes",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "",
              "studentAnswer": "incudes",
              "correctAnswer": "includes",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在2名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-042",
          "text": "symbolize/symbolise",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "sybolizes",
              "correctAnswer": "symbolize/symbolise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754626",
              "studentName": "袁梓萌",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "symblizes",
              "correctAnswer": "symbolize/symbolise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754623",
              "studentName": "姚顺心",
              "questionContext": "",
              "studentAnswer": "symboliing",
              "correctAnswer": "symbolize/symbolise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754610",
              "studentName": "王明中",
              "questionContext": "",
              "studentAnswer": "symbolie",
              "correctAnswer": "symbolize/symbolise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-043",
          "text": "culture",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747759",
              "studentName": "董翔宇",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "cultur",
              "correctAnswer": "culture",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "cultore",
              "correctAnswer": "culture",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754606",
              "studentName": "申雅欣",
              "questionContext": "",
              "studentAnswer": "cultus",
              "correctAnswer": "culture",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754610",
              "studentName": "王明中",
              "questionContext": "",
              "studentAnswer": "cultme",
              "correctAnswer": "culture",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-044",
          "text": "share",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754631",
              "studentName": "张思妥",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "shame",
              "correctAnswer": "share",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "shore",
              "correctAnswer": "share",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "shanese",
              "correctAnswer": "share",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "",
              "studentAnswer": "shore",
              "correctAnswer": "share",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-045",
          "text": "colour/color",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754600",
              "studentName": "李知真",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "colour!",
              "correctAnswer": "colour/color",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "coloar",
              "correctAnswer": "colour/color",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754625",
              "studentName": "郁玲珑",
              "questionContext": "",
              "studentAnswer": "colur",
              "correctAnswer": "colour/color",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754615",
              "studentName": "徐匡达",
              "questionContext": "",
              "studentAnswer": "clor",
              "correctAnswer": "colour/color",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-046",
          "text": "thrilled",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754621",
              "studentName": "杨天梓",
              "questionContext": "",
              "studentAnswer": "thriled",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754629",
              "studentName": "张俏兮",
              "questionContext": "",
              "studentAnswer": "thilled",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754638",
              "studentName": "周子祺",
              "questionContext": "",
              "studentAnswer": "thrived",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754623",
              "studentName": "姚顺心",
              "questionContext": "",
              "studentAnswer": "trilled",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-047",
          "text": "more",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747760",
              "studentName": "董彦德",
              "questionContext": "",
              "studentAnswer": "wore",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747762",
              "studentName": "贺世雄",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "moore",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754637",
              "studentName": "周歆然",
              "questionContext": "",
              "studentAnswer": "mere",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754612",
              "studentName": "王天翊",
              "questionContext": "",
              "studentAnswer": "wore",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-048",
          "text": "great",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754632",
              "studentName": "张以恒",
              "questionContext": "",
              "studentAnswer": "greet",
              "correctAnswer": "great",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754623",
              "studentName": "姚顺心",
              "questionContext": "",
              "studentAnswer": "greate",
              "correctAnswer": "great",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747758",
              "studentName": "董颢宁",
              "questionContext": "",
              "studentAnswer": "greet",
              "correctAnswer": "great",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747764",
              "studentName": "金楚迪",
              "questionContext": "",
              "studentAnswer": "grant",
              "correctAnswer": "great",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        },
        {
          "id": "ww-049",
          "text": "making",
          "itemType": "word",
          "scoreRate": 82.0,
          "errorRate": 18.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754601",
              "studentName": "刘胜昔",
              "questionContext": "",
              "studentAnswer": "mak",
              "correctAnswer": "making",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747765",
              "studentName": "李佳晴",
              "questionContext": "",
              "studentAnswer": "paying",
              "correctAnswer": "making",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747765",
              "studentName": "李佳晴",
              "questionContext": "",
              "studentAnswer": "paying",
              "correctAnswer": "making",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754620",
              "studentName": "晏梓榕",
              "questionContext": "",
              "studentAnswer": "molding",
              "correctAnswer": "making",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 43
        }
      ],
      "weakStudents": [
        {
          "id": "24754620",
          "name": "晏梓榕",
          "scoreRate": 77.1,
          "weakWords": [
            "AI/artificial intelligence",
            "Beijing",
            "technology",
            "writing",
            "laborer/labourer",
            "activity",
            "truly",
            "responsibility"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共95次拼写错误，涉及77个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 23,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754629",
          "name": "张俏兮",
          "scoreRate": 74.9,
          "weakWords": [
            "AI/artificial intelligence",
            "Beijing",
            "technology",
            "writing",
            "laborer/labourer",
            "activity",
            "truly",
            "responsibility"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共104次拼写错误，涉及82个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 26,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754615",
          "name": "徐匡达",
          "scoreRate": 10.0,
          "weakWords": [
            "AI/artificial intelligence",
            "Beijing",
            "technology",
            "writing",
            "laborer/labourer",
            "activity",
            "truly",
            "responsibility"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共373次拼写错误，涉及318个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 90,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        }
      ],
      "goodStudents": [
        {
          "id": "24754627",
          "name": "张定璁",
          "scoreRate": 98.3,
          "masteredCount": 6,
          "highlight": "词汇拼写错误较少，仅7次",
          "stability": "stable"
        },
        {
          "id": "24754622",
          "name": "杨泽宇",
          "scoreRate": 97.8,
          "masteredCount": 9,
          "highlight": "词汇拼写错误较少，仅9次",
          "stability": "stable"
        },
        {
          "id": "24754602",
          "name": "刘欣褀",
          "scoreRate": 97.8,
          "masteredCount": 7,
          "highlight": "词汇拼写错误较少，仅9次",
          "stability": "stable"
        },
        {
          "id": "24754617",
          "name": "许家恺",
          "scoreRate": 97.8,
          "masteredCount": 8,
          "highlight": "词汇拼写错误较少，仅9次",
          "stability": "stable"
        },
        {
          "id": "24754632",
          "name": "张以恒",
          "scoreRate": 97.3,
          "masteredCount": 11,
          "highlight": "词汇拼写错误较少，仅11次",
          "stability": "stable"
        },
        {
          "id": "24754609",
          "name": "王宝淳",
          "scoreRate": 97.1,
          "masteredCount": 12,
          "highlight": "词汇拼写错误较少，仅12次",
          "stability": "stable"
        },
        {
          "id": "24754601",
          "name": "刘胜昔",
          "scoreRate": 96.9,
          "masteredCount": 12,
          "highlight": "词汇拼写错误较少，仅13次",
          "stability": "stable"
        },
        {
          "id": "18564246",
          "name": "王弈茗",
          "scoreRate": 96.6,
          "masteredCount": 12,
          "highlight": "词汇拼写错误较少，仅14次",
          "stability": "stable"
        },
        {
          "id": "24747764",
          "name": "金楚迪",
          "scoreRate": 96.6,
          "masteredCount": 13,
          "highlight": "词汇拼写错误较少，仅14次",
          "stability": "stable"
        },
        {
          "id": "24754621",
          "name": "杨天梓",
          "scoreRate": 95.9,
          "masteredCount": 14,
          "highlight": "词汇拼写错误较少，仅17次",
          "stability": "stable"
        }
      ],
      "interventionRecords": []
    },
    "writing": {
      "classId": "class-2023级A14班",
      "className": "2023级A14班",
      "unitId": "real-data",
      "unitName": "平台真实数据",
      "timeRange": "30d",
      "updatedAt": "2026-06-11 11:30",
      "summary": "2023级A14班 共 39 名学生，6979 条应用文批改记录，平均 60.8 分。主要问题「词汇表达弱 / 用词单一」(46.7%)，薄弱学生 10 人。",
      "metrics": {
        "averageScore": 60.8,
        "averageLevel": "B",
        "reviewedEssayCount": 6979,
        "mainProblemType": "词汇表达弱 / 用词单一",
        "weakStudentCount": 10,
        "excellentEssayCount": 10
      },
      "problemTypes": [
        {
          "id": "pt-vocabulary_weak",
          "type": "vocabulary_weak",
          "label": "词汇表达弱 / 用词单一",
          "borderColor": "#8e7cc3",
          "bgColor": "#f6f0fc",
          "percent": 46.7,
          "affectedStudentCount": 39,
          "typicalPerformance": "(3262/6979)",
          "aiReason": "共3262次，占比46.7%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "By doing so, I can not only understand international trends, but also gain insig",
            "Additionally, I will actively take pare in various volunteer activities and part",
            "I'm honored to contribute to the article gathering campaign teemed \"Becoming a B"
          ]
        },
        {
          "id": "pt-language_accuracy",
          "type": "language_accuracy",
          "label": "语言准确性弱 / 语法错误多",
          "borderColor": "#7b9cd6",
          "bgColor": "#f0f4fc",
          "percent": 42.3,
          "affectedStudentCount": 39,
          "typicalPerformance": "(2953/6979)",
          "aiReason": "共2953次，占比42.3%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "I in excited to share my thoughts on the school's event \"Becoming a Better Self.",
            "In my opinion, becoming a better self means the process of broadening our horizo",
            "Additionally, I will actively take pare in various volunteer activities and part"
          ]
        },
        {
          "id": "pt-structure_unclear",
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "borderColor": "#f0a060",
          "bgColor": "#fef8f0",
          "percent": 7.2,
          "affectedStudentCount": 38,
          "typicalPerformance": "(504/6979)",
          "aiReason": "共504次，占比7.2%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "To me, it not only as physical health, but also means mental strength.",
            "I think a healthy body is highly related to a better self because it is the most",
            "Greetings! Glad to know you're interested in our school activity and I'm happy t"
          ]
        },
        {
          "id": "pt-format_issue",
          "type": "format_issue",
          "label": "格式规范问题 / 应用文格式",
          "borderColor": "#9ab3cc",
          "bgColor": "#f5f7fa",
          "percent": 3.7,
          "affectedStudentCount": 37,
          "typicalPerformance": "(260/6979)",
          "aiReason": "共260次，占比3.7%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "This involves actively expanding my knowledge and skills, while linking my own d",
            "I will also try my best to help the people aroud me, by volunteering regularly i",
            "I'd like to share my thoughts about \"Becoming a Better Self."
          ]
        }
      ],
      "highFrequencyIssues": [
        {
          "problemType": "vocabulary_weak",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24754604",
              "studentName": "屈楷博",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "By doing so, I can not only understand international trends, but also gain insights from different perspectives, learning from both contemporary and past scholars, which helps expland my vision.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 expland 换成  expand ",
              "improvedExample": "By doing so, I can not only understand international trends, but also gain insights from different perspectives, learning from both contemporary and past scholars, which helps expand my vision.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24754604",
              "studentName": "屈楷博",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "Additionally, I will actively take pare in various volunteer activities and participate in social works in our community during my leisure time.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 pare 换成  part ",
              "improvedExample": "Additionally, I will actively take part in various volunteer activities and participate in social work in our community during my leisure time.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24747760",
              "studentName": "董彦德",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "I'm honored to contribute to the article gathering campaign teemed \"Becoming a Better Self,\" and I can't wast to share my insights to you.",
              "issueExplanation": "用词错误：用词错误",
              "revisionSuggestion": "建议把 teemed 换成  titled ",
              "improvedExample": "I'm honored to contribute to the article gathering campaign titled \"Becoming a Better Self,\" and I can't wait to share my insights with you.",
              "score": 76.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24747760",
              "studentName": "董彦德",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "I'm honored to contribute to the article gathering campaign teemed \"Becoming a Better Self,\" and I can't wast to share my insights to you.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 wast 换成  wait ",
              "improvedExample": "I'm honored to contribute to the article gathering campaign titled \"Becoming a Better Self,\" and I can't wait to share my insights with you.",
              "score": 76.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24747760",
              "studentName": "董彦德",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "In my appreciation, \"becoming a better self\" means becoming a well-rouunded person, which consists of two parts: a rational brain and an empathetic heart.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 rouunded 换成  rounded ",
              "improvedExample": "In my appreciation, \"becoming a better self\" means becoming a well-rounded person, which consists of two parts: a rational brain and an empathetic heart.",
              "score": 76.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24747760",
              "studentName": "董彦德",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "To nuture an empathetic heart, I constantly participate in volunteer work.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 nuture 换成  nurture ",
              "improvedExample": "To nurture an empathetic heart, I constantly participate in volunteer work.",
              "score": 76.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24747756",
              "studentName": "陈安祺",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "To me, it not only as physical health, but also means mental strength.",
              "issueExplanation": "表达错误：表达冗余",
              "revisionSuggestion": "建议删除  means ",
              "improvedExample": "To me, it not only means physical health, but also mental strength.",
              "score": 73.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24747756",
              "studentName": "陈安祺",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "To develop my physical health, I can spend thirty minutes to do some aerobic sports every day, which can help me to resist the anxious and tension from school and academic.",
              "issueExplanation": "固定搭配错误：固定搭配错误",
              "revisionSuggestion": "建议把 to do 换成  doing ",
              "improvedExample": "To develop my physical health, I can spend thirty minutes doing some aerobic sports every day, which can help me to resist the anxiety and tension from school and academics.",
              "score": 73.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24747756",
              "studentName": "陈安祺",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "To increase my mental strength, I read classical books to gain the guidance of life and read specialized scientific articles to cultivate a clearer mind.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 the guidance of 换成  guidance in ",
              "improvedExample": "To increase my mental strength, I read classical books to gain guidance in life and read specialized scientific articles to cultivate a clearer mind.",
              "score": 73.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24747756",
              "studentName": "陈安祺",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "These can give me the ability to think in multiple concepts and build a stable inner world for me.",
              "issueExplanation": "用词错误：用词错误",
              "revisionSuggestion": "建议把 concepts 换成  ways ",
              "improvedExample": "These can give me the ability to think in multiple ways and build a stable inner world for me.",
              "score": 73.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        },
        {
          "problemType": "language_accuracy",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24754619",
              "studentName": "闫宇成",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "I in excited to share my thoughts on the school's event \"Becoming a Better Self.\"",
              "issueExplanation": "非谓语动词错误：动词不定式错误",
              "revisionSuggestion": "建议把 in 换成  am ",
              "improvedExample": "I am excited to share my thoughts on the school's event \"Becoming a Better Self.\"",
              "score": 72.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24754604",
              "studentName": "屈楷博",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "In my opinion, becoming a better self means the process of broadening our horizon and forming the right core values.",
              "issueExplanation": "单复数错误：单复数错误",
              "revisionSuggestion": "建议把 horizon 换成  horizons ",
              "improvedExample": "In my opinion, becoming a better self means the process of broadening our horizons and forming the right core values.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24754604",
              "studentName": "屈楷博",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "Additionally, I will actively take pare in various volunteer activities and participate in social works in our community during my leisure time.",
              "issueExplanation": "单复数错误：单复数错误",
              "revisionSuggestion": "建议把 works 换成  work ",
              "improvedExample": "Additionally, I will actively take part in various volunteer activities and participate in social work in our community during my leisure time.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24754604",
              "studentName": "屈楷博",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "This can help my balance stress and relaxation while experiencing deep and lasting happiness, which reflects the true value of helping others.",
              "issueExplanation": "词法错误：代词错误",
              "revisionSuggestion": "建议把 my 换成  me ",
              "improvedExample": "This can help me balance stress and relaxation while experiencing deep and lasting happiness, which reflects the true value of helping others.",
              "score": 81.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24747760",
              "studentName": "董彦德",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "I'm honored to contribute to the article gathering campaign teemed \"Becoming a Better Self,\" and I can't wast to share my insights to you.",
              "issueExplanation": "词法错误：介词错误",
              "revisionSuggestion": "建议把 to 换成  with ",
              "improvedExample": "I'm honored to contribute to the article gathering campaign titled \"Becoming a Better Self,\" and I can't wait to share my insights with you.",
              "score": 76.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24747760",
              "studentName": "董彦德",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "In a community project called \"Digital Tutoring\", I provided one-on-one instruction on smart devices or seniors.",
              "issueExplanation": "词法错误：介词错误",
              "revisionSuggestion": "建议把 or 换成  for ",
              "improvedExample": "In a community project called \"Digital Tutoring\", I provided one-on-one instruction on smart devices for seniors.",
              "score": 76.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24754625",
              "studentName": "郁玲珑",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "To translate this into action, I will explore subjects beyond the classroom, using online resources and joining discussion groups that challenge my thinking, which would broaden my mind and nurture my",
              "issueExplanation": "时态错误：时态错误",
              "revisionSuggestion": "建议把 would 换成  will ",
              "improvedExample": "To translate this into action, I will explore subjects beyond the classroom, using online resources and joining discussion groups that challenge my thinking, which will broaden my mind and nurture my ",
              "score": 84.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24754625",
              "studentName": "郁玲珑",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "In a community project called \"Digital Tutoring\", I provide one-on-one instructions on smart devices for seniors.",
              "issueExplanation": "单复数错误：单复数错误",
              "revisionSuggestion": "建议把 instructions 换成  instruction ",
              "improvedExample": "In a community project called \"Digital Tutoring\", I provide one-on-one instruction on smart devices for seniors.",
              "score": 84.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24747756",
              "studentName": "陈安祺",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "To develop my physical health, I can spend thirty minutes to do some aerobic sports every day, which can help me to resist the anxious and tension from school and academic.",
              "issueExplanation": "词性误用：词性误用",
              "revisionSuggestion": "建议把 anxious 换成  anxiety ",
              "improvedExample": "To develop my physical health, I can spend thirty minutes doing some aerobic sports every day, which can help me to resist the anxiety and tension from school and academics.",
              "score": 73.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24747756",
              "studentName": "陈安祺",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "I think a healthy body is highly related to a better self because it is the most important foundation that enables us to realize our life ideals and pave the way to reach it.",
              "issueExplanation": "词法错误：代词错误",
              "revisionSuggestion": "建议把 it 换成  them ",
              "improvedExample": "I think a healthy body is highly related to a better self because it is the most important foundation that enables us to realize our life ideals and paves the way to reach them.",
              "score": 73.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        },
        {
          "problemType": "structure_unclear",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24747756",
              "studentName": "陈安祺",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "To me, it not only as physical health, but also means mental strength.",
              "issueExplanation": "句子结构错误：句子成分残缺",
              "revisionSuggestion": "建议把 as 换成  means ",
              "improvedExample": "To me, it not only means physical health, but also mental strength.",
              "score": 73.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24747756",
              "studentName": "陈安祺",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "I think a healthy body is highly related to a better self because it is the most important foundation that enables us to realize our life ideals and pave the way to reach it.",
              "issueExplanation": "句子结构错误：并列结构错误",
              "revisionSuggestion": "建议把 pave 换成  paves ",
              "improvedExample": "I think a healthy body is highly related to a better self because it is the most important foundation that enables us to realize our life ideals and paves the way to reach them.",
              "score": 73.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24754601",
              "studentName": "刘胜昔",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "Greetings! Glad to know you're interested in our school activity and I'm happy to share my understanding of \"Becoming a Better Self\".",
              "issueExplanation": "句子结构错误：句子成分残缺",
              "revisionSuggestion": "建议把 Glad 换成  I am glad ",
              "improvedExample": "Greetings! I am glad to know you're interested in our school activity and I'm happy to share my understanding of \"Becoming a Better Self\".",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24754601",
              "studentName": "刘胜昔",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "To achieve this, I could take part in aerobic sports regularly, which boosts my stamina, relieves my tension, and makes me healthier, paving the way toward better self-development.",
              "issueExplanation": "句子结构错误：双谓语错误",
              "revisionSuggestion": "建议删除  could ",
              "improvedExample": "To achieve this, I take part in aerobic sports regularly, which boosts my stamina, relieves my tension, and makes me healthier, paving the way toward better self-development.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24754601",
              "studentName": "刘胜昔",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "10 achieve this, I may read classical books to gain some guidance for life and read specialized scientific articles to cultivate a clearer mind, grasping the mental qualities of a better self.",
              "issueExplanation": "句子结构错误：双谓语错误",
              "revisionSuggestion": "建议删除  may ",
              "improvedExample": "To achieve this, I read classical books to gain some guidance for life and read specialized scientific articles to cultivate a clearer mind, grasping the mental qualities of a better self.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24754629",
              "studentName": "张俏兮",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "In order to become a better self, there one many ways I can do.",
              "issueExplanation": "句子结构错误：There be句型错误",
              "revisionSuggestion": "建议把 one 换成  are ",
              "improvedExample": "In order to become a better self, there are many ways I can do.",
              "score": 75.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24754626",
              "studentName": "袁梓萌",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "\"To me, becoming a better self\" not only means personal growth, but also means the sense of social responsebility, This involves expanding my knowledge and skills, while engaging with the sociaty and ",
              "issueExplanation": "句子结构错误：错误使用逗号连接两个完整句子",
              "revisionSuggestion": "建议把 , 换成  . ",
              "improvedExample": "\"To me, becoming a better self\" not only means personal growth, but also means the sense of social responsibility. This involves expanding my knowledge and skills, while engaging with society and cont",
              "score": 69.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24754626",
              "studentName": "袁梓萌",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "\"To me, becoming a better self\" not only means personal growth, but also means the sense of social responsebility, This involves expanding my knowledge and skills, while engaging with the sociaty and ",
              "issueExplanation": "句子结构错误：并列结构错误",
              "revisionSuggestion": "建议把 contribute 换成  contributing ",
              "improvedExample": "\"To me, becoming a better self\" not only means personal growth, but also means the sense of social responsibility. This involves expanding my knowledge and skills, while engaging with society and cont",
              "score": 69.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24754626",
              "studentName": "袁梓萌",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "I will also try my best to help the people aroud me, by volunteering regularly in the community and visiting elderly to provides accompany which strengthen my connection to the social and making pract",
              "issueExplanation": "句子结构错误：并列结构错误",
              "revisionSuggestion": "建议把 making 换成  makes ",
              "improvedExample": "I will also try my best to help the people around me by volunteering regularly in the community and visiting the elderly to provide company, which strengthens my connection to society and makes practi",
              "score": 69.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24754634",
              "studentName": "张子俏",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "By chatting with the elderly, I can learn rich experience from them, then developing my personal understanding of life.",
              "issueExplanation": "句子结构错误：错误使用逗号连接两个完整句子",
              "revisionSuggestion": "建议在 then 之前插入 and",
              "improvedExample": "By chatting with the elderly, I can learn rich experience from them, and then develop my personal understanding of life.",
              "score": 72.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        },
        {
          "problemType": "format_issue",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24754625",
              "studentName": "郁玲珑",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "This involves actively expanding my knowledge and skills, while linking my own development to the broader fate of society.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议删除  , ",
              "improvedExample": "This involves actively expanding my knowledge and skills while linking my own development to the broader fate of society.",
              "score": 84.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24754626",
              "studentName": "袁梓萌",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "I will also try my best to help the people aroud me, by volunteering regularly in the community and visiting elderly to provides accompany which strengthen my connection to the social and making pract",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议删除  , ",
              "improvedExample": "I will also try my best to help the people around me by volunteering regularly in the community and visiting the elderly to provide company, which strengthens my connection to society and makes practi",
              "score": 69.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24747754",
              "studentName": "白奕堃",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "I'd like to share my thoughts about \"Becoming a Better Self.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议在 . 之后插入 \"",
              "improvedExample": "I'd like to share my thoughts about \"Becoming a Better Self.\"",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24754615",
              "studentName": "徐匡达",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "In the path to matmity, we all more r less be ampoed will the amerpt Beter see'.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议删除  ' ",
              "improvedExample": "In the path to maturity, we all more or less be armed with the attempt Better see.",
              "score": 43.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24754615",
              "studentName": "徐匡达",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "The criteria of better \"and the noverest towards our final, bjedives have long bear the are argument about growth.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议删除  \" ",
              "improvedExample": "The criteria of better and the movement towards our final objectives have long been the argument about growth.",
              "score": 43.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24754615",
              "studentName": "徐匡达",
              "essayTitle": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "taskName": "丰台区2025~2026学年度第一学期期末练习-大作文",
              "writingType": "practical",
              "originalText": "the only to cloider regausibiliter ad the master of all reikace.",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 the 换成  The ",
              "improvedExample": "The only to consider responsibility and the master of all reliance.",
              "score": 43.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24754632",
              "studentName": "张以恒",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测-大作文",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测-大作文",
              "writingType": "practical",
              "originalText": "The track was filled with youthful energy cheers and sweat.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议把 cheers 换成  , cheers, ",
              "improvedExample": "The track was filled with youthful energy, cheers, and sweat.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24754615",
              "studentName": "徐匡达",
              "essayTitle": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
              "taskName": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
              "writingType": "practical",
              "originalText": "For the \"The colour of a city\" competition, I char Beijing and described its colour as ruby.",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 colour of a city 换成  Colour of a City ",
              "improvedExample": "For the \"The Colour of a City\" competition, I chose Beijing and described its colour as ruby.",
              "score": 70.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24754615",
              "studentName": "徐匡达",
              "essayTitle": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
              "taskName": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
              "writingType": "practical",
              "originalText": "The iconic red walls of the Torbildlen city act as a bridge between the past and present, showing how Being honors its thousud-year heritage while embracing a modern era.",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 city 换成  City ",
              "improvedExample": "The iconic red walls of the Forbidden City act as a bridge between the past and present, showing how Beijing honors its thousand-year heritage while embracing a modern era.",
              "score": 70.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24754615",
              "studentName": "徐匡达",
              "essayTitle": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
              "taskName": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
              "writingType": "practical",
              "originalText": "Finally, ruby embodies natinal pride through Beijing's unique achievement as a \"Dual Olympic City.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议在 . 之后插入 \"",
              "improvedExample": "Finally, ruby embodies national pride through Beijing's unique achievement as a \"Dual Olympic City.\"",
              "score": 70.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        }
      ],
      "weakStudents": [
        {
          "id": "24754610",
          "name": "王明中",
          "averageScore": 40.2,
          "level": "D",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 78.8
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 13.3
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 4.4
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 3.5
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 10.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 10.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 10.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 10.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 10.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24754615",
          "name": "徐匡达",
          "averageScore": 43.5,
          "level": "D",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 75.9
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 16.4
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 5.6
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 2.1
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747760",
          "name": "董彦德",
          "averageScore": 49.2,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 45.8
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 41.5
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 9.0
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 3.7
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 76.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 76.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 76.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 76.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 76.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24754612",
          "name": "王天翊",
          "averageScore": 50.0,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 51.7
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 33.5
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 10.2
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 4.7
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 70.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 70.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 70.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 70.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 70.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24754606",
          "name": "申雅欣",
          "averageScore": 51.5,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 50.0
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 37.5
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 7.7
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 4.8
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 75.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747756",
          "name": "陈安祺",
          "averageScore": 55.9,
          "level": "C",
          "mainProblemTypes": [
            "语言准确性弱 / 语法错误多",
            "词汇表达弱 / 用词单一",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 51.7
            },
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 35.3
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 8.6
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 4.3
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 73.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 73.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 73.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 73.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 73.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24754622",
          "name": "杨泽宇",
          "averageScore": 56.2,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "格式规范问题 / 应用文格式"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 46.3
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 43.9
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 4.9
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 4.9
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 61.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 61.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 61.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 61.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 61.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24754631",
          "name": "张思妥",
          "averageScore": 56.9,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 51.0
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 29.8
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 10.1
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 9.1
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 73.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 73.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 73.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 73.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 73.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24754620",
          "name": "晏梓榕",
          "averageScore": 57.3,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 54.1
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 37.8
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 4.4
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 3.7
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 75.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24754629",
          "name": "张俏兮",
          "averageScore": 58.6,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 51.2
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 40.8
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 4.5
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 3.6
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 75.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        }
      ],
      "excellentWritings": [
        {
          "id": "ew-754604",
          "studentId": "24754604",
          "studentName": "屈楷博",
          "essayTitle": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
          "taskName": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
          "writingType": "practical",
          "score": 90.0,
          "level": "A",
          "highlights": "得分90.0分，含佳句",
          "excerpt": "{Dear Jim,\\n\\nI'm glad to hear that you are interested in my essay for the competition, \\\"The Color of A City.\\\" Let me share more details with you.\\n\\nI chose Beijing and green as its representative color. Green symbolizes the city's efforts in environmental protection and sustainable development, which are important parts of Beijing's modern image. My reasons are as follows. Firstly, Beijing has promoted the use of shared bikes and expanded its bus and subway networks. These measures have grea",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754608",
          "studentId": "24754608",
          "studentName": "汪思齐",
          "essayTitle": "4月29日 英语测练",
          "taskName": "4月29日 英语测练",
          "writingType": "practical",
          "score": 87.639145,
          "level": "A",
          "highlights": "得分87.639145分，含佳句",
          "excerpt": "{Subject: Advice on Choosing a Major in the Age of AI\\n\\nDear Jim,\\n\\nI am glad to hear from you. I understand that you are confused about choosing a major because of the changes in employment caused by the rise of artificial intelligence. You asked me for some advice, and I would suggest that you consider Human-Computer Interaction.\\n\\nMy first reason is that this major sits at the crossroads of computer science, design, psychology, and ethics. With AI changing the job market, people who can no",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747758",
          "studentId": "24747758",
          "studentName": "董颢宁",
          "essayTitle": "东城区2025-2026学年度第一学期期末统一检测-大作文",
          "taskName": "东城区2025-2026学年度第一学期期末统一检测-大作文",
          "writingType": "practical",
          "score": 87.0,
          "level": "A",
          "highlights": "得分87.0分，含佳句",
          "excerpt": "{Dear Jim,\\nI'm delighted to receive your last letter asking about our school's recent activity themed \\\"Sports Encounter Youth.\\\" Let me tell you more details about it.\\nDuring the activity, our school organized a series of events, including running, rope jumping, and even swimming. Participants were enthusiastic to join, no matter their age or athletic ability. Races between students and school staff members brought us much laughter. We cheered loudly and supported our teammates throughout the",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754619",
          "studentId": "24754619",
          "studentName": "闫宇成",
          "essayTitle": "东城区2025-2026学年度第一学期期末统一检测-大作文",
          "taskName": "东城区2025-2026学年度第一学期期末统一检测-大作文",
          "writingType": "practical",
          "score": 87.0,
          "level": "A",
          "highlights": "得分87.0分，含佳句",
          "excerpt": "{Dear Jim,\\n\\nI'm honored to hear that you're interested in our school's \\\"Sports Encounter Youth\\\" activity. Let me tell you some details.\\n\\nThe event, aimed at stimulating students' enthusiasm for exercise, was held by the school's sports club in the gym last Monday afternoon. There were multiple exercises featuring a variety of athletic activities tailored to different fitness levels and interests. Students could choose from aerobic exercises like long-distance running or jumping rope to boo",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754625",
          "studentId": "24754625",
          "studentName": "郁玲珑",
          "essayTitle": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
          "taskName": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
          "writingType": "practical",
          "score": 87.0,
          "level": "A",
          "highlights": "得分87.0分，含佳句",
          "excerpt": "{Dear Jim,\\n\\nIt's great to hear from you! For the \\\"The Color of a City\\\" competition, I chose Beijing and described its color as red.\\n\\nFirst, red symbolizes Beijing's status as the political heart of the nation. Beyond mere decoration, it represents authority and dignity. From the grand architecture of Tiananmen Square to the national flags, red reflects the city's leading role in our country's journey forward.\\n\\nMoreover, the color represents the inheritance of civilization. The iconic red",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747765",
          "studentId": "24747765",
          "studentName": "李佳晴",
          "essayTitle": "4月22日 英语测练",
          "taskName": "4月22日 英语测练",
          "writingType": "practical",
          "score": 85.60803,
          "level": "A",
          "highlights": "得分85.60803分，含佳句",
          "excerpt": "{Dear Jim,\\n\\nI am writing to reply to your email about the speech content for the UN Youth Forum themed \\\"Skills Needed for a Sustainable Future.\\\" I would like to share my thoughts with you.\\n\\nFirstly, I think the ability to apply green living methods in our daily life is very important for teenagers. For example, we should try to take public transport when commuting. A sustainable future depends on everyone's effort to live greener. By developing the skill of living a greener lifestyle, ever",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747759",
          "studentId": "24747759",
          "studentName": "董翔宇",
          "essayTitle": "5月21日 英语测练",
          "taskName": "5月21日 英语测练",
          "writingType": "practical",
          "score": 85.15221,
          "level": "A",
          "highlights": "得分85.15221分，含佳句",
          "excerpt": "{Dear Jim,\\n\\nI'm sorry to hear that you were criticized by your teacher for using AI tools to complete your essay. I understand how frustrating this must be. However, as a senior student, I think it is better not to rely on AI for writing assignments.\\n\\nFirst of all, as a senior student, it is your responsibility to finish the essays assigned by your teacher on your own. Writing essays helps you find your weaknesses, such as lacking evidence, and allows your teacher to give you precise feedbac",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754607",
          "studentId": "24754607",
          "studentName": "史翰明",
          "essayTitle": "5月21日 英语测练",
          "taskName": "5月21日 英语测练",
          "writingType": "practical",
          "score": 85.07004,
          "level": "A",
          "highlights": "得分85.07004分，含佳句",
          "excerpt": "{I'm sorry to hear that you were criticized because you completed your writing homework by using AI tools. Don't be stuck. AI is not something uncontrollable if you use its functions properly.\\n\\nIn my perspective, using AI to collect writing resources or ask for writing suggestions is not a big deal. Rather, it can enhance your learning efficiency and help you broaden your horizon. However, if you use AI to generate the whole passage without personal reflections, you need to step out of your co",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754624",
          "studentId": "24754624",
          "studentName": "叶广涵",
          "essayTitle": "4月29日 英语测练",
          "taskName": "4月29日 英语测练",
          "writingType": "practical",
          "score": 84.97818,
          "level": "A",
          "highlights": "得分84.97818分",
          "excerpt": "{Subject: Advice on Choosing a Major\\n\\nDear Jim,\\n\\nI hope this email finds you well. I know you are feeling confused about choosing a major because of the changes in employment caused by the rise of artificial intelligence, and you asked me for some advice.\\n\\nI strongly recommend that you choose law as your major. Since you are passionate about justice, law is a good fit for you. With the rise of AI, many new legal challenges are appearing, such as privacy issues and ethical problems. Society",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754607",
          "studentId": "24754607",
          "studentName": "史翰明",
          "essayTitle": "4月22日 英语测练",
          "taskName": "4月22日 英语测练",
          "writingType": "practical",
          "score": 84.865685,
          "level": "A",
          "highlights": "得分84.865685分",
          "excerpt": "{Dear Jim,\\n\\nI'm glad you're participating in the UN Youth Forum titled \\\"Skills Needed for a Sustainable Future.\\\" I am writing to reply to your question about the skills needed for your speech at the forum. In my opinion, two important skills are recycling skills and long-term thinking skills.\\n\\nRecycling skills are essential because they help reduce waste by turning old items into useful ones. This supports the \\\"3R\\\" principle (Reduce, Reuse, Recycle) and helps save materials and energy th",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        }
      ],
      "recommendedResources": [
        {
          "id": "res-w-1",
          "title": "应用文写作模板训练",
          "resourceType": "writing_practice",
          "tags": [
            "写作",
            "应用文"
          ],
          "difficulty": "medium",
          "grade": "高二",
          "recommendReason": "针对词汇表达弱 / 用词单一设计",
          "canPreview": true,
          "canAssign": true,
          "canAddToPaperBasket": true
        }
      ],
      "generatedSamples": [
        {
          "id": "gs-1",
          "level": "basic",
          "title": "基础版 — 徐匡达的作文",
          "content": "{Hi Jim,\\n\\nThanks for your interest in the \\\"Painting China with Intelligence\\\" event I took part in. I'd like to share my work with you.\\n\\nI created a digital painting titled \\\"Ancient Wisdom Meets Modern Wings.\\\" Using an AI painting tool, I combined traditional Chinese landscape elements, like misty worn forests and pavilions, with modern high-speed trains and AI towers. The idea is to show how technology helps protect our cultural heritage while building a smarter future.\\n\\nTaking part in this activity was truly eye-opening. I felt excited to see how creativity and technology can work hand in hand. It also deepened my pride in our culture and inspired me to learn more about both art and science. I now believe even a small idea can thrive when powered by technology and passion.\\n\\nWhat's your opinion? I'm looking forward to hearing your thoughts!\\n\\nBest regards,\\nLi Hua}",
          "highlights": "得分49.969917分 | 适合基础薄弱学生参考基本结构",
          "suitableFor": "20分以下",
          "editable": true
        },
        {
          "id": "gs-2",
          "level": "improved",
          "title": "提升版 — 黄海欣的作文",
          "content": "{Becoming a Better Self\\n\\nTo me, becoming a better self means improving both physically and mentally. Physically, it requires having a stronger, fitter, and healthier body. Mentally, it means growing and becoming more mature.\\n\\nTo become physically better, I will develop the habit of exercising regularly. I used to be lazy and unwilling to do sports, but from now on, I will keep jogging every morning. I will also try to find a sport that interests me and stick to it.\\n\\nTo become mentally better, I will try to be more responsible, which is a sign of maturity. Since I have just become an adult, it is time to take on my own duties. I will handle my tasks by myself and help my parents with some family chores.\\n\\nBy doing these things, I believe I can become a better version of myself.}",
          "highlights": "得分67.0分 | 展示中等水平如何组织内容和句式",
          "suitableFor": "20-25分",
          "editable": true
        },
        {
          "id": "gs-3",
          "level": "excellent",
          "title": "优秀版 — 屈楷博的作文",
          "content": "{Dear Jim,\\n\\nI'm glad to hear that you are interested in my essay for the competition, \\\"The Color of A City.\\\" Let me share more details with you.\\n\\nI chose Beijing and green as its representative color. Green symbolizes the city's efforts in environmental protection and sustainable development, which are important parts of Beijing's modern image. My reasons are as follows. Firstly, Beijing has promoted the use of shared bikes and expanded its bus and subway networks. These measures have greatly improved public transportation, encouraging people to use eco-friendly travel options instead of private cars, which helps reduce air pollution. Secondly, the city has increased its green spaces and water areas. This not only enhances the environment in the city center but also helps lower greenhouse gas emissions through the natural process of plants absorbing carbon dioxide. Green reflects both the visible changes in the cityscape and the growing awareness of environmental protection among its residents.\\n\\nWhat do you think about my essay? Feel free to write back and share your thoughts.\\n\\nYours,\\nLi Hua}",
          "highlights": "得分90.0分，含佳句 | 展示高分作文的表达水平",
          "suitableFor": "25+分",
          "editable": true
        }
      ],
      "interventionRecords": []
    }
  },
  "2023级A11班": {
    "vocabulary": {
      "classId": "class-2023级A11班",
      "className": "2023级A11班",
      "unitId": "real-data",
      "unitName": "平台真实数据",
      "timeRange": "30d",
      "updatedAt": "2026-06-11 11:30",
      "summary": "2023级A11班 共 39 名学生，1354 条词汇错误记录，涉及 949 个词。薄弱学生 30 人，建议重点加强默写和拼写训练。",
      "metrics": {
        "practicedWordCount": 949,
        "weakWordCount": 50,
        "weakStudentCount": 30,
        "mainWeakType": "拼不对 / 默写错误"
      },
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100,
          "affectedStudentCount": 37,
          "exampleWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing"
          ],
          "aiReason": "平台数据错因均为'不会写'，归类为拼写错误。2023级A11班共1354条拼写错误记录。",
          "recommendedActions": [
            "默写",
            "词汇复习规划",
            "组卷"
          ],
          "borderColor": "#f0a060",
          "bgColor": "#fef8f0"
        }
      ],
      "weakWords": [
        {
          "id": "ww-000",
          "text": "AI/artificial intelligence",
          "itemType": "word",
          "scoreRate": 10.0,
          "errorRate": 90.0,
          "affectedStudentCount": 14,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754533",
              "studentName": "曾林越",
              "questionContext": "",
              "studentAnswer": "ki",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754544",
              "studentName": "黄唯",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "\" AI",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754555",
              "studentName": "宋昊宸",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "Al",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754535",
              "studentName": "陈可悦",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "Al",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754562",
              "studentName": "王雨阳",
              "questionContext": "",
              "studentAnswer": "the A",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在14名学生中出现18次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 99
        },
        {
          "id": "ww-001",
          "text": "laborer/labourer",
          "itemType": "word",
          "scoreRate": 30.0,
          "errorRate": 70.0,
          "affectedStudentCount": 8,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754555",
              "studentName": "宋昊宸",
              "questionContext": "",
              "studentAnswer": "labors",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754573",
              "studentName": "杨惟翰",
              "questionContext": "",
              "studentAnswer": "labourors",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754572",
              "studentName": "杨婉桐",
              "questionContext": "",
              "studentAnswer": "labars",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754535",
              "studentName": "陈可悦",
              "questionContext": "",
              "studentAnswer": "labors",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754571",
              "studentName": "杨润禾",
              "questionContext": "",
              "studentAnswer": "labors",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在8名学生中出现14次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 83
        },
        {
          "id": "ww-002",
          "text": "activities",
          "itemType": "word",
          "scoreRate": 50.0,
          "errorRate": 50.0,
          "affectedStudentCount": 9,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754571",
              "studentName": "杨润禾",
              "questionContext": "",
              "studentAnswer": "actiuties",
              "correctAnswer": "activities",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754539",
              "studentName": "翟子萱",
              "questionContext": "",
              "studentAnswer": "autivities",
              "correctAnswer": "activities",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754551",
              "studentName": "欧阳燧",
              "questionContext": "",
              "studentAnswer": "activies",
              "correctAnswer": "activities",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754540",
              "studentName": "高东辰",
              "questionContext": "假定你是红星中学的李华，你的外国朋友 Jim 告知你，他所在的校园文化俱乐部“世界之窗”，下一期活动计划开展“中国人的日常智慧”Wisdom in Chinese Daily Routines 主题分",
              "studentAnswer": "activites",
              "correctAnswer": "activities",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754545",
              "studentName": "黄致渊",
              "questionContext": "假定你是红星中学的李华，你的外国朋友 Jim 告知你，他所在的校园文化俱乐部“世界之窗”，下一期活动计划开展“中国人的日常智慧”Wisdom in Chinese Daily Routines 主题分",
              "studentAnswer": "activits",
              "correctAnswer": "activities",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在9名学生中出现10次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 68
        },
        {
          "id": "ww-003",
          "text": "technology",
          "itemType": "word",
          "scoreRate": 55.0,
          "errorRate": 45.0,
          "affectedStudentCount": 9,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754572",
              "studentName": "杨婉桐",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "tecmology",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754540",
              "studentName": "高东辰",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "technalsys",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754533",
              "studentName": "曾林越",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "tecnologiy",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754557",
              "studentName": "孙诗贻",
              "questionContext": "",
              "studentAnswer": "technoleg",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754579",
              "studentName": "张亦弛",
              "questionContext": "",
              "studentAnswer": "technoplogy",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在9名学生中出现9次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 64
        },
        {
          "id": "ww-004",
          "text": "writing",
          "itemType": "word",
          "scoreRate": 60.0,
          "errorRate": 40.0,
          "affectedStudentCount": 7,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754571",
              "studentName": "杨润禾",
              "questionContext": "",
              "studentAnswer": "wilthny",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754552",
              "studentName": "邱天",
              "questionContext": "",
              "studentAnswer": "writting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754577",
              "studentName": "袁在文",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "writting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754552",
              "studentName": "邱天",
              "questionContext": "",
              "studentAnswer": "writting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754561",
              "studentName": "王翊然",
              "questionContext": "",
              "studentAnswer": "witing",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在7名学生中出现8次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 60
        },
        {
          "id": "ww-005",
          "text": "3D",
          "itemType": "word",
          "scoreRate": 60.0,
          "errorRate": 40.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754540",
              "studentName": "高东辰",
              "questionContext": "",
              "studentAnswer": "30",
              "correctAnswer": "3D",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754540",
              "studentName": "高东辰",
              "questionContext": "",
              "studentAnswer": "34 30",
              "correctAnswer": "3D",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754565",
              "studentName": "徐一丁",
              "questionContext": "",
              "studentAnswer": "a 30",
              "correctAnswer": "3D",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754565",
              "studentName": "徐一丁",
              "questionContext": "",
              "studentAnswer": "30",
              "correctAnswer": "3D",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754552",
              "studentName": "邱天",
              "questionContext": "",
              "studentAnswer": "30",
              "correctAnswer": "3D",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现8次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 60
        },
        {
          "id": "ww-006",
          "text": "perseverance",
          "itemType": "word",
          "scoreRate": 65.0,
          "errorRate": 35.0,
          "affectedStudentCount": 6,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754540",
              "studentName": "高东辰",
              "questionContext": "",
              "studentAnswer": "perseversnce",
              "correctAnswer": "perseverance",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754540",
              "studentName": "高东辰",
              "questionContext": "",
              "studentAnswer": "perseveance",
              "correctAnswer": "perseverance",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754580",
              "studentName": "张亦萱",
              "questionContext": "",
              "studentAnswer": "perseverana",
              "correctAnswer": "perseverance",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754545",
              "studentName": "黄致渊",
              "questionContext": "",
              "studentAnswer": "preseverance",
              "correctAnswer": "perseverance",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754558",
              "studentName": "童雨歆",
              "questionContext": "",
              "studentAnswer": "perseverence",
              "correctAnswer": "perseverance",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现7次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 56
        },
        {
          "id": "ww-007",
          "text": "and",
          "itemType": "word",
          "scoreRate": 70.0,
          "errorRate": 30.0,
          "affectedStudentCount": 6,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754560",
              "studentName": "王明辉",
              "questionContext": "",
              "studentAnswer": "aund",
              "correctAnswer": "and",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754577",
              "studentName": "袁在文",
              "questionContext": "",
              "studentAnswer": "Yand",
              "correctAnswer": "and",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754540",
              "studentName": "高东辰",
              "questionContext": "",
              "studentAnswer": "snd it",
              "correctAnswer": "and",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754570",
              "studentName": "杨恩琪",
              "questionContext": "",
              "studentAnswer": "am \"",
              "correctAnswer": "and",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754571",
              "studentName": "杨润禾",
              "questionContext": "",
              "studentAnswer": "ande",
              "correctAnswer": "and",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 53
        },
        {
          "id": "ww-008",
          "text": "more",
          "itemType": "word",
          "scoreRate": 70.0,
          "errorRate": 30.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754583",
              "studentName": "赵子墨",
              "questionContext": "",
              "studentAnswer": "wore",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754556",
              "studentName": "宋奇峰",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "wore",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754556",
              "studentName": "宋奇峰",
              "questionContext": "",
              "studentAnswer": "wore",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754551",
              "studentName": "欧阳燧",
              "questionContext": "",
              "studentAnswer": "mon",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754583",
              "studentName": "赵子墨",
              "questionContext": "",
              "studentAnswer": "mow",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 53
        },
        {
          "id": "ww-009",
          "text": "sustainable",
          "itemType": "word",
          "scoreRate": 70.0,
          "errorRate": 30.0,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754533",
              "studentName": "曾林越",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "substainable",
              "correctAnswer": "sustainable",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754545",
              "studentName": "黄致渊",
              "questionContext": "",
              "studentAnswer": "sustaine",
              "correctAnswer": "sustainable",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754540",
              "studentName": "高东辰",
              "questionContext": "",
              "studentAnswer": "sustsinsble",
              "correctAnswer": "sustainable",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754565",
              "studentName": "徐一丁",
              "questionContext": "",
              "studentAnswer": "sustainalle",
              "correctAnswer": "sustainable",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754540",
              "studentName": "高东辰",
              "questionContext": "",
              "studentAnswer": "sustsinable",
              "correctAnswer": "sustainable",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 53
        },
        {
          "id": "ww-010",
          "text": "development",
          "itemType": "word",
          "scoreRate": 70.0,
          "errorRate": 30.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754533",
              "studentName": "曾林越",
              "questionContext": "",
              "studentAnswer": "developsent",
              "correctAnswer": "development",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754558",
              "studentName": "童雨歆",
              "questionContext": "",
              "studentAnswer": "developmene",
              "correctAnswer": "development",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754558",
              "studentName": "童雨歆",
              "questionContext": "",
              "studentAnswer": "developmene",
              "correctAnswer": "development",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754576",
              "studentName": "袁青杨",
              "questionContext": "",
              "studentAnswer": "deveplopwent",
              "correctAnswer": "development",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754549",
              "studentName": "柳明彤",
              "questionContext": "",
              "studentAnswer": "developmen",
              "correctAnswer": "development",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 53
        },
        {
          "id": "ww-011",
          "text": "Beijing",
          "itemType": "word",
          "scoreRate": 70.0,
          "errorRate": 30.0,
          "affectedStudentCount": 6,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754544",
              "studentName": "黄唯",
              "questionContext": "",
              "studentAnswer": "Bejing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754542",
              "studentName": "郭晨曦",
              "questionContext": "",
              "studentAnswer": "Bejing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754570",
              "studentName": "杨恩琪",
              "questionContext": "",
              "studentAnswer": "Bejing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754581",
              "studentName": "张梓轩",
              "questionContext": "",
              "studentAnswer": "Bejing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754571",
              "studentName": "杨润禾",
              "questionContext": "",
              "studentAnswer": "Belting",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 53
        },
        {
          "id": "ww-012",
          "text": "two",
          "itemType": "word",
          "scoreRate": 75.0,
          "errorRate": 25.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754539",
              "studentName": "翟子萱",
              "questionContext": "",
              "studentAnswer": "too",
              "correctAnswer": "two",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754533",
              "studentName": "曾林越",
              "questionContext": "假定你是红星中学的李华，你的外国朋友 Jim 告知你，他所在的校园文化俱乐部“世界之窗”，下一期活动计划开展“中国人的日常智慧”Wisdom in Chinese Daily Routines 主题分",
              "studentAnswer": "twro",
              "correctAnswer": "two",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754576",
              "studentName": "袁青杨",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "too",
              "correctAnswer": "two",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754558",
              "studentName": "童雨歆",
              "questionContext": "",
              "studentAnswer": "ewo",
              "correctAnswer": "two",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754558",
              "studentName": "童雨歆",
              "questionContext": "",
              "studentAnswer": "wo",
              "correctAnswer": "two",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 49
        },
        {
          "id": "ww-013",
          "text": "with",
          "itemType": "word",
          "scoreRate": 75.0,
          "errorRate": 25.0,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754558",
              "studentName": "童雨歆",
              "questionContext": "",
              "studentAnswer": "ith",
              "correctAnswer": "with",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754542",
              "studentName": "郭晨曦",
              "questionContext": "",
              "studentAnswer": "wih",
              "correctAnswer": "with",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754562",
              "studentName": "王雨阳",
              "questionContext": "",
              "studentAnswer": "wth",
              "correctAnswer": "with",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754576",
              "studentName": "袁青杨",
              "questionContext": "",
              "studentAnswer": "ith",
              "correctAnswer": "with",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754560",
              "studentName": "王明辉",
              "questionContext": "",
              "studentAnswer": "ewith",
              "correctAnswer": "with",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 49
        },
        {
          "id": "ww-014",
          "text": "technologies",
          "itemType": "word",
          "scoreRate": 75.0,
          "errorRate": 25.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754576",
              "studentName": "袁青杨",
              "questionContext": "",
              "studentAnswer": "technolgles",
              "correctAnswer": "technologies",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754556",
              "studentName": "宋奇峰",
              "questionContext": "",
              "studentAnswer": "technolagios",
              "correctAnswer": "technologies",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754547",
              "studentName": "梁紫书",
              "questionContext": "",
              "studentAnswer": "technologes",
              "correctAnswer": "technologies",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754561",
              "studentName": "王翊然",
              "questionContext": "",
              "studentAnswer": "technologys",
              "correctAnswer": "technologies",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754576",
              "studentName": "袁青杨",
              "questionContext": "",
              "studentAnswer": "technoleg' es",
              "correctAnswer": "technologies",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 49
        },
        {
          "id": "ww-015",
          "text": "collaboration",
          "itemType": "word",
          "scoreRate": 75.0,
          "errorRate": 25.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754549",
              "studentName": "柳明彤",
              "questionContext": "",
              "studentAnswer": "collabration",
              "correctAnswer": "collaboration",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754565",
              "studentName": "徐一丁",
              "questionContext": "",
              "studentAnswer": "collaborating",
              "correctAnswer": "collaboration",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754545",
              "studentName": "黄致渊",
              "questionContext": "",
              "studentAnswer": "collaborating",
              "correctAnswer": "collaboration",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754569",
              "studentName": "杨承杰",
              "questionContext": "",
              "studentAnswer": "collaboation",
              "correctAnswer": "collaboration",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754569",
              "studentName": "杨承杰",
              "questionContext": "",
              "studentAnswer": "collabortion",
              "correctAnswer": "collaboration",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 49
        },
        {
          "id": "ww-016",
          "text": "ideas",
          "itemType": "word",
          "scoreRate": 75.0,
          "errorRate": 25.0,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754562",
              "studentName": "王雨阳",
              "questionContext": "",
              "studentAnswer": "deas",
              "correctAnswer": "ideas",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754547",
              "studentName": "梁紫书",
              "questionContext": "",
              "studentAnswer": "ieas",
              "correctAnswer": "ideas",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754540",
              "studentName": "高东辰",
              "questionContext": "",
              "studentAnswer": "idess",
              "correctAnswer": "ideas",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754544",
              "studentName": "黄唯",
              "questionContext": "",
              "studentAnswer": "idleas",
              "correctAnswer": "ideas",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754576",
              "studentName": "袁青杨",
              "questionContext": "",
              "studentAnswer": "ieus",
              "correctAnswer": "ideas",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 49
        },
        {
          "id": "ww-017",
          "text": "bin",
          "itemType": "word",
          "scoreRate": 75.0,
          "errorRate": 25.0,
          "affectedStudentCount": 1,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754574",
              "studentName": "杨晓正",
              "questionContext": "",
              "studentAnswer": "bens",
              "correctAnswer": "bin",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754574",
              "studentName": "杨晓正",
              "questionContext": "",
              "studentAnswer": "ben",
              "correctAnswer": "bin",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754574",
              "studentName": "杨晓正",
              "questionContext": "",
              "studentAnswer": "beus",
              "correctAnswer": "bin",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754574",
              "studentName": "杨晓正",
              "questionContext": "",
              "studentAnswer": "bens",
              "correctAnswer": "bin",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754574",
              "studentName": "杨晓正",
              "questionContext": "",
              "studentAnswer": "bens",
              "correctAnswer": "bin",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在1名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 49
        },
        {
          "id": "ww-018",
          "text": "different",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754547",
              "studentName": "梁紫书",
              "questionContext": "",
              "studentAnswer": "differnt",
              "correctAnswer": "different",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754565",
              "studentName": "徐一丁",
              "questionContext": "",
              "studentAnswer": "diffrent",
              "correctAnswer": "different",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754566",
              "studentName": "许晨辉",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "differen",
              "correctAnswer": "different",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754565",
              "studentName": "徐一丁",
              "questionContext": "",
              "studentAnswer": "diffrent",
              "correctAnswer": "different",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-019",
          "text": "communication",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754571",
              "studentName": "杨润禾",
              "questionContext": "",
              "studentAnswer": "commuiatlun",
              "correctAnswer": "communication",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754535",
              "studentName": "陈可悦",
              "questionContext": "",
              "studentAnswer": "communicatio",
              "correctAnswer": "communication",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754562",
              "studentName": "王雨阳",
              "questionContext": "",
              "studentAnswer": "aumunication",
              "correctAnswer": "communication",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754565",
              "studentName": "徐一丁",
              "questionContext": "",
              "studentAnswer": "communicating",
              "correctAnswer": "communication",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-020",
          "text": "environment",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754583",
              "studentName": "赵子墨",
              "questionContext": "",
              "studentAnswer": "enviconment",
              "correctAnswer": "environment",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754583",
              "studentName": "赵子墨",
              "questionContext": "",
              "studentAnswer": "enviroumert",
              "correctAnswer": "environment",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754556",
              "studentName": "宋奇峰",
              "questionContext": "",
              "studentAnswer": "enviroment",
              "correctAnswer": "environment",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754544",
              "studentName": "黄唯",
              "questionContext": "",
              "studentAnswer": "enviroment",
              "correctAnswer": "environment",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-021",
          "text": "modern",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754565",
              "studentName": "徐一丁",
              "questionContext": "",
              "studentAnswer": "mordern",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754545",
              "studentName": "黄致渊",
              "questionContext": "假定你是红星中学的李华，你的外国朋友 Jim 告知你，他所在的校园文化俱乐部“世界之窗”，下一期活动计划开展“中国人的日常智慧”Wisdom in Chinese Daily Routines 主题分",
              "studentAnswer": "mroden",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754539",
              "studentName": "翟子萱",
              "questionContext": "",
              "studentAnswer": "mordern",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754579",
              "studentName": "张亦弛",
              "questionContext": "",
              "studentAnswer": "morden",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-022",
          "text": "contribute",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754572",
              "studentName": "杨婉桐",
              "questionContext": "",
              "studentAnswer": "contributce",
              "correctAnswer": "contribute",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754565",
              "studentName": "徐一丁",
              "questionContext": "",
              "studentAnswer": "contrinting",
              "correctAnswer": "contribute",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754541",
              "studentName": "高子涵",
              "questionContext": "",
              "studentAnswer": "contributiy",
              "correctAnswer": "contribute",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754555",
              "studentName": "宋昊宸",
              "questionContext": "假设你是红星中学高三学生李华。你校英语社团正在举办以“Becoming a Better Self”为主题的征文活动。请你用英文写一篇短文投稿，内容包括： 1. 你的理解； 2. 你的做法。 注意： ",
              "studentAnswer": "contriibute",
              "correctAnswer": "contribute",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-023",
          "text": "ourselves",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754535",
              "studentName": "陈可悦",
              "questionContext": "",
              "studentAnswer": "ourselvs",
              "correctAnswer": "ourselves",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754579",
              "studentName": "张亦弛",
              "questionContext": "",
              "studentAnswer": "ourselve",
              "correctAnswer": "ourselves",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754562",
              "studentName": "王雨阳",
              "questionContext": "假设你是红星中学高三学生李华。你校英语社团正在举办以“Becoming a Better Self”为主题的征文活动。请你用英文写一篇短文投稿，内容包括： 1. 你的理解； 2. 你的做法。 注意： ",
              "studentAnswer": "urstwf",
              "correctAnswer": "ourselves",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754557",
              "studentName": "孙诗贻",
              "questionContext": "",
              "studentAnswer": "our ownselves",
              "correctAnswer": "ourselves",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-024",
          "text": "experience",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754577",
              "studentName": "袁在文",
              "questionContext": "",
              "studentAnswer": "experiencel",
              "correctAnswer": "experience",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754565",
              "studentName": "徐一丁",
              "questionContext": "",
              "studentAnswer": "experine",
              "correctAnswer": "experience",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754535",
              "studentName": "陈可悦",
              "questionContext": "",
              "studentAnswer": "experence",
              "correctAnswer": "experience",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754533",
              "studentName": "曾林越",
              "questionContext": "",
              "studentAnswer": "experiene",
              "correctAnswer": "experience",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-025",
          "text": "difficulty",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754565",
              "studentName": "徐一丁",
              "questionContext": "",
              "studentAnswer": "idifficulties\",",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754533",
              "studentName": "曾林越",
              "questionContext": "",
              "studentAnswer": "dlifficulties",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754576",
              "studentName": "袁青杨",
              "questionContext": "",
              "studentAnswer": "dificultes",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754580",
              "studentName": "张亦萱",
              "questionContext": "",
              "studentAnswer": "duffimltles",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-026",
          "text": "always",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754579",
              "studentName": "张亦弛",
              "questionContext": "",
              "studentAnswer": "alway",
              "correctAnswer": "always",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754574",
              "studentName": "杨晓正",
              "questionContext": "",
              "studentAnswer": "alwayps",
              "correctAnswer": "always",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754544",
              "studentName": "黄唯",
              "questionContext": "",
              "studentAnswer": "alway",
              "correctAnswer": "always",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754544",
              "studentName": "黄唯",
              "questionContext": "",
              "studentAnswer": "yalways",
              "correctAnswer": "always",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-027",
          "text": "interested",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754561",
              "studentName": "王翊然",
              "questionContext": "",
              "studentAnswer": "intersted",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754571",
              "studentName": "杨润禾",
              "questionContext": "",
              "studentAnswer": "mtererted",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754535",
              "studentName": "陈可悦",
              "questionContext": "",
              "studentAnswer": "insterested",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754571",
              "studentName": "杨润禾",
              "questionContext": "",
              "studentAnswer": "Interelted",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-028",
          "text": "horizon",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754558",
              "studentName": "童雨歆",
              "questionContext": "",
              "studentAnswer": "horizen",
              "correctAnswer": "horizon",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754555",
              "studentName": "宋昊宸",
              "questionContext": "",
              "studentAnswer": "horizen",
              "correctAnswer": "horizon",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754576",
              "studentName": "袁青杨",
              "questionContext": "假设你是红星中学高三学生李华。你校英语社团正在举办以“Becoming a Better Self”为主题的征文活动。请你用英文写一篇短文投稿，内容包括： 1. 你的理解； 2. 你的做法。 注意： ",
              "studentAnswer": "horizens",
              "correctAnswer": "horizon",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754542",
              "studentName": "郭晨曦",
              "questionContext": "",
              "studentAnswer": "horizens",
              "correctAnswer": "horizon",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-029",
          "text": "sense",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 2,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754571",
              "studentName": "杨润禾",
              "questionContext": "",
              "studentAnswer": "sence",
              "correctAnswer": "sense",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754571",
              "studentName": "杨润禾",
              "questionContext": "",
              "studentAnswer": "sence",
              "correctAnswer": "sense",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754577",
              "studentName": "袁在文",
              "questionContext": "",
              "studentAnswer": "sence",
              "correctAnswer": "sense",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754571",
              "studentName": "杨润禾",
              "questionContext": "",
              "studentAnswer": "senie",
              "correctAnswer": "sense",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在2名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-030",
          "text": "pursuit",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754552",
              "studentName": "邱天",
              "questionContext": "",
              "studentAnswer": "persue",
              "correctAnswer": "pursuit",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754552",
              "studentName": "邱天",
              "questionContext": "",
              "studentAnswer": "persue",
              "correctAnswer": "pursuit",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754558",
              "studentName": "童雨歆",
              "questionContext": "",
              "studentAnswer": "pursuing",
              "correctAnswer": "pursuit",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754579",
              "studentName": "张亦弛",
              "questionContext": "假设你是红星中学高三学生李华。你校英语社团正在举办以“Becoming a Better Self”为主题的征文活动。请你用英文写一篇短文投稿，内容包括： 1. 你的理解； 2. 你的做法。 注意： ",
              "studentAnswer": "persuit",
              "correctAnswer": "pursuit",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-031",
          "text": "also",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754573",
              "studentName": "杨惟翰",
              "questionContext": "假定你是红星中学的李华，你的外国朋友 Jim 告知你，他所在的校园文化俱乐部“世界之窗”，下一期活动计划开展“中国人的日常智慧”Wisdom in Chinese Daily Routines 主题分",
              "studentAnswer": "al o",
              "correctAnswer": "also",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754557",
              "studentName": "孙诗贻",
              "questionContext": "",
              "studentAnswer": "alse",
              "correctAnswer": "also",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754533",
              "studentName": "曾林越",
              "questionContext": "",
              "studentAnswer": "alkso",
              "correctAnswer": "also",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754571",
              "studentName": "杨润禾",
              "questionContext": "",
              "studentAnswer": "al o",
              "correctAnswer": "also",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-032",
          "text": "task",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754533",
              "studentName": "曾林越",
              "questionContext": "假定你是红星中学的李华，你的外国朋友 Jim 告知你，他所在的校园文化俱乐部“世界之窗”，下一期活动计划开展“中国人的日常智慧”Wisdom in Chinese Daily Routines 主题分",
              "studentAnswer": "tasl",
              "correctAnswer": "task",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754579",
              "studentName": "张亦弛",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "tanks,",
              "correctAnswer": "task",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754572",
              "studentName": "杨婉桐",
              "questionContext": "",
              "studentAnswer": "be tai as",
              "correctAnswer": "task",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754541",
              "studentName": "高子涵",
              "questionContext": "",
              "studentAnswer": "taski",
              "correctAnswer": "task",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-033",
          "text": "information",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754574",
              "studentName": "杨晓正",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "miformation,",
              "correctAnswer": "information",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754566",
              "studentName": "许晨辉",
              "questionContext": "",
              "studentAnswer": "informationn",
              "correctAnswer": "information",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754570",
              "studentName": "杨恩琪",
              "questionContext": "",
              "studentAnswer": "informattion",
              "correctAnswer": "information",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754562",
              "studentName": "王雨阳",
              "questionContext": "",
              "studentAnswer": "informathu",
              "correctAnswer": "information",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-034",
          "text": "share",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754576",
              "studentName": "袁青杨",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "shave",
              "correctAnswer": "share",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754540",
              "studentName": "高东辰",
              "questionContext": "",
              "studentAnswer": "shore",
              "correctAnswer": "share",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754540",
              "studentName": "高东辰",
              "questionContext": "",
              "studentAnswer": "shore",
              "correctAnswer": "share",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754556",
              "studentName": "宋奇峰",
              "questionContext": "",
              "studentAnswer": "shore",
              "correctAnswer": "share",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-035",
          "text": "think",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754562",
              "studentName": "王雨阳",
              "questionContext": "",
              "studentAnswer": "thank",
              "correctAnswer": "think",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754540",
              "studentName": "高东辰",
              "questionContext": "",
              "studentAnswer": "thin",
              "correctAnswer": "think",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754580",
              "studentName": "张亦萱",
              "questionContext": "",
              "studentAnswer": "thmh",
              "correctAnswer": "think",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754562",
              "studentName": "王雨阳",
              "questionContext": "",
              "studentAnswer": "thale",
              "correctAnswer": "think",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-036",
          "text": "technological",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754577",
              "studentName": "袁在文",
              "questionContext": "",
              "studentAnswer": "tecnological",
              "correctAnswer": "technological",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754577",
              "studentName": "袁在文",
              "questionContext": "",
              "studentAnswer": "tecnological",
              "correctAnswer": "technological",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754579",
              "studentName": "张亦弛",
              "questionContext": "",
              "studentAnswer": "technolopical",
              "correctAnswer": "technological",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754547",
              "studentName": "梁紫书",
              "questionContext": "",
              "studentAnswer": "technolgical",
              "correctAnswer": "technological",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-037",
          "text": "society",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754571",
              "studentName": "杨润禾",
              "questionContext": "",
              "studentAnswer": "suclety",
              "correctAnswer": "society",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754573",
              "studentName": "杨惟翰",
              "questionContext": "",
              "studentAnswer": "iety",
              "correctAnswer": "society",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754562",
              "studentName": "王雨阳",
              "questionContext": "",
              "studentAnswer": "ciety",
              "correctAnswer": "society",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754537",
              "studentName": "陈彦融",
              "questionContext": "",
              "studentAnswer": "the societ",
              "correctAnswer": "society",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-038",
          "text": "life",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754569",
              "studentName": "杨承杰",
              "questionContext": "",
              "studentAnswer": "lite",
              "correctAnswer": "life",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754574",
              "studentName": "杨晓正",
              "questionContext": "",
              "studentAnswer": "lie",
              "correctAnswer": "life",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754555",
              "studentName": "宋昊宸",
              "questionContext": "",
              "studentAnswer": "tif lives",
              "correctAnswer": "life",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754549",
              "studentName": "柳明彤",
              "questionContext": "",
              "studentAnswer": "if lives",
              "correctAnswer": "life",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-039",
          "text": "tools",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754572",
              "studentName": "杨婉桐",
              "questionContext": "",
              "studentAnswer": "toos",
              "correctAnswer": "tools",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754563",
              "studentName": "王臻易",
              "questionContext": "",
              "studentAnswer": "tols",
              "correctAnswer": "tools",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754544",
              "studentName": "黄唯",
              "questionContext": "",
              "studentAnswer": "took",
              "correctAnswer": "tools",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754576",
              "studentName": "袁青杨",
              "questionContext": "",
              "studentAnswer": "toos",
              "correctAnswer": "tools",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-040",
          "text": "criticise",
          "itemType": "word",
          "scoreRate": 80.0,
          "errorRate": 20.0,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754569",
              "studentName": "杨承杰",
              "questionContext": "",
              "studentAnswer": "critized",
              "correctAnswer": "criticise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754558",
              "studentName": "童雨歆",
              "questionContext": "",
              "studentAnswer": "criticive",
              "correctAnswer": "criticise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754580",
              "studentName": "张亦萱",
              "questionContext": "",
              "studentAnswer": "critculzed",
              "correctAnswer": "criticise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754551",
              "studentName": "欧阳燧",
              "questionContext": "",
              "studentAnswer": "critisized",
              "correctAnswer": "criticise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 45
        },
        {
          "id": "ww-041",
          "text": "consistent",
          "itemType": "word",
          "scoreRate": 85.0,
          "errorRate": 15.0,
          "affectedStudentCount": 2,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754537",
              "studentName": "陈彦融",
              "questionContext": "",
              "studentAnswer": "consisting",
              "correctAnswer": "consistent",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754576",
              "studentName": "袁青杨",
              "questionContext": "",
              "studentAnswer": "consistant",
              "correctAnswer": "consistent",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754576",
              "studentName": "袁青杨",
              "questionContext": "假设你是红星中学高三学生李华。你校英语社团正在举办以“Becoming a Better Self”为主题的征文活动。请你用英文写一篇短文投稿，内容包括： 1. 你的理解； 2. 你的做法。 注意： ",
              "studentAnswer": "conistent",
              "correctAnswer": "consistent",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在2名学生中出现3次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 41
        },
        {
          "id": "ww-042",
          "text": "toward/towards",
          "itemType": "word",
          "scoreRate": 85.0,
          "errorRate": 15.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754565",
              "studentName": "徐一丁",
              "questionContext": "",
              "studentAnswer": "towwrds",
              "correctAnswer": "toward/towards",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754572",
              "studentName": "杨婉桐",
              "questionContext": "",
              "studentAnswer": "towap",
              "correctAnswer": "toward/towards",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754581",
              "studentName": "张梓轩",
              "questionContext": "",
              "studentAnswer": "towardsing",
              "correctAnswer": "toward/towards",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现3次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 41
        },
        {
          "id": "ww-043",
          "text": "process",
          "itemType": "word",
          "scoreRate": 85.0,
          "errorRate": 15.0,
          "affectedStudentCount": 2,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754563",
              "studentName": "王臻易",
              "questionContext": "",
              "studentAnswer": "progress",
              "correctAnswer": "process",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754571",
              "studentName": "杨润禾",
              "questionContext": "",
              "studentAnswer": "pruess",
              "correctAnswer": "process",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754571",
              "studentName": "杨润禾",
              "questionContext": "",
              "studentAnswer": "pruless",
              "correctAnswer": "process",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在2名学生中出现3次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 41
        },
        {
          "id": "ww-044",
          "text": "problems",
          "itemType": "word",
          "scoreRate": 85.0,
          "errorRate": 15.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754576",
              "studentName": "袁青杨",
              "questionContext": "",
              "studentAnswer": "poblems",
              "correctAnswer": "problems",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754545",
              "studentName": "黄致渊",
              "questionContext": "",
              "studentAnswer": "promblems",
              "correctAnswer": "problems",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754570",
              "studentName": "杨恩琪",
              "questionContext": "",
              "studentAnswer": "problemsy",
              "correctAnswer": "problems",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现3次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 41
        },
        {
          "id": "ww-045",
          "text": "area",
          "itemType": "word",
          "scoreRate": 85.0,
          "errorRate": 15.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754545",
              "studentName": "黄致渊",
              "questionContext": "",
              "studentAnswer": "are",
              "correctAnswer": "area",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754577",
              "studentName": "袁在文",
              "questionContext": "",
              "studentAnswer": "Alera",
              "correctAnswer": "area",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754583",
              "studentName": "赵子墨",
              "questionContext": "",
              "studentAnswer": "Alera",
              "correctAnswer": "area",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现3次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 41
        },
        {
          "id": "ww-046",
          "text": "convenience",
          "itemType": "word",
          "scoreRate": 85.0,
          "errorRate": 15.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754571",
              "studentName": "杨润禾",
              "questionContext": "",
              "studentAnswer": "convingent",
              "correctAnswer": "convenience",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754561",
              "studentName": "王翊然",
              "questionContext": "",
              "studentAnswer": "convinience",
              "correctAnswer": "convenience",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754576",
              "studentName": "袁青杨",
              "questionContext": "",
              "studentAnswer": "comenience",
              "correctAnswer": "convenience",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现3次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 41
        },
        {
          "id": "ww-047",
          "text": "strengthen",
          "itemType": "word",
          "scoreRate": 85.0,
          "errorRate": 15.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754560",
              "studentName": "王明辉",
              "questionContext": "",
              "studentAnswer": "strengthend",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754547",
              "studentName": "梁紫书",
              "questionContext": "",
              "studentAnswer": "strenghthen",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754579",
              "studentName": "张亦弛",
              "questionContext": "",
              "studentAnswer": "strenghthen",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现3次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 41
        },
        {
          "id": "ww-048",
          "text": "respect",
          "itemType": "word",
          "scoreRate": 85.0,
          "errorRate": 15.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754558",
              "studentName": "童雨歆",
              "questionContext": "",
              "studentAnswer": "espect",
              "correctAnswer": "respect",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754566",
              "studentName": "许晨辉",
              "questionContext": "",
              "studentAnswer": "respectness",
              "correctAnswer": "respect",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754542",
              "studentName": "郭晨曦",
              "questionContext": "",
              "studentAnswer": "respection",
              "correctAnswer": "respect",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现3次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 41
        },
        {
          "id": "ww-049",
          "text": "world",
          "itemType": "word",
          "scoreRate": 85.0,
          "errorRate": 15.0,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754560",
              "studentName": "王明辉",
              "questionContext": "",
              "studentAnswer": "worldl",
              "correctAnswer": "world",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754576",
              "studentName": "袁青杨",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "word",
              "correctAnswer": "world",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754580",
              "studentName": "张亦萱",
              "questionContext": "",
              "studentAnswer": "would",
              "correctAnswer": "world",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现3次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 41
        }
      ],
      "weakStudents": [
        {
          "id": "24754577",
          "name": "袁在文",
          "scoreRate": 78.2,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共22次拼写错误，涉及21个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754551",
          "name": "欧阳燧",
          "scoreRate": 78.2,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共22次拼写错误，涉及21个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754535",
          "name": "陈可悦",
          "scoreRate": 77.3,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共23次拼写错误，涉及22个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 23,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754563",
          "name": "王臻易",
          "scoreRate": 77.3,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共23次拼写错误，涉及22个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 23,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754573",
          "name": "杨惟翰",
          "scoreRate": 77.3,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共23次拼写错误，涉及23个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 23,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754552",
          "name": "邱天",
          "scoreRate": 77.3,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
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
          "weaknessPriorityScore": 23,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754572",
          "name": "杨婉桐",
          "scoreRate": 76.3,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共24次拼写错误，涉及23个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754569",
          "name": "杨承杰",
          "scoreRate": 75.3,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共25次拼写错误，涉及24个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754557",
          "name": "孙诗贻",
          "scoreRate": 74.3,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共26次拼写错误，涉及26个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 26,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754537",
          "name": "陈彦融",
          "scoreRate": 72.3,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共28次拼写错误，涉及28个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754544",
          "name": "黄唯",
          "scoreRate": 70.3,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
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
          "weaknessPriorityScore": 30,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754556",
          "name": "宋奇峰",
          "scoreRate": 68.4,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共32次拼写错误，涉及30个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754580",
          "name": "张亦萱",
          "scoreRate": 67.4,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共33次拼写错误，涉及33个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754570",
          "name": "杨恩琪",
          "scoreRate": 66.4,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共34次拼写错误，涉及34个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 34,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754560",
          "name": "王明辉",
          "scoreRate": 65.4,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共35次拼写错误，涉及35个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 35,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754562",
          "name": "王雨阳",
          "scoreRate": 63.4,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
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
          "weaknessPriorityScore": 37,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754583",
          "name": "赵子墨",
          "scoreRate": 63.4,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
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
          "weaknessPriorityScore": 37,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754561",
          "name": "王翊然",
          "scoreRate": 63.4,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共37次拼写错误，涉及37个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754541",
          "name": "高子涵",
          "scoreRate": 63.4,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
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
          "weaknessPriorityScore": 37,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754574",
          "name": "杨晓正",
          "scoreRate": 59.5,
          "weakWords": [
            "AI/artificial intelligence",
            "laborer/labourer",
            "activities",
            "technology",
            "writing",
            "3D",
            "perseverance",
            "and"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共41次拼写错误，涉及36个词。",
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
            }
          ],
          "weakWordDetails": []
        }
      ],
      "goodStudents": [
        {
          "id": "24754554",
          "name": "尚恒宇",
          "scoreRate": 98.0,
          "masteredCount": 2,
          "highlight": "词汇拼写错误较少，仅2次",
          "stability": "stable"
        },
        {
          "id": "24754581",
          "name": "张梓轩",
          "scoreRate": 90.1,
          "masteredCount": 10,
          "highlight": "词汇拼写错误较少，仅10次",
          "stability": "stable"
        },
        {
          "id": "24754578",
          "name": "张继朗",
          "scoreRate": 86.2,
          "masteredCount": 14,
          "highlight": "词汇拼写错误较少，仅14次",
          "stability": "stable"
        },
        {
          "id": "24754566",
          "name": "许晨辉",
          "scoreRate": 84.2,
          "masteredCount": 15,
          "highlight": "词汇拼写错误较少，仅16次",
          "stability": "stable"
        },
        {
          "id": "24754542",
          "name": "郭晨曦",
          "scoreRate": 82.2,
          "masteredCount": 18,
          "highlight": "词汇拼写错误较少，仅18次",
          "stability": "stable"
        },
        {
          "id": "24754549",
          "name": "柳明彤",
          "scoreRate": 82.2,
          "masteredCount": 18,
          "highlight": "词汇拼写错误较少，仅18次",
          "stability": "stable"
        },
        {
          "id": "24754539",
          "name": "翟子萱",
          "scoreRate": 81.2,
          "masteredCount": 18,
          "highlight": "词汇拼写错误较少，仅19次",
          "stability": "stable"
        }
      ],
      "interventionRecords": []
    },
    "writing": {
      "classId": "class-2023级A11班",
      "className": "2023级A11班",
      "unitId": "real-data",
      "unitName": "平台真实数据",
      "timeRange": "30d",
      "updatedAt": "2026-06-11 11:30",
      "summary": "2023级A11班 共 37 名学生，6447 条应用文批改记录，平均 66.3 分。主要问题「词汇表达弱 / 用词单一」(45.9%)，薄弱学生 3 人。",
      "metrics": {
        "averageScore": 66.3,
        "averageLevel": "B",
        "reviewedEssayCount": 6447,
        "mainProblemType": "词汇表达弱 / 用词单一",
        "weakStudentCount": 3,
        "excellentEssayCount": 10
      },
      "problemTypes": [
        {
          "id": "pt-vocabulary_weak",
          "type": "vocabulary_weak",
          "label": "词汇表达弱 / 用词单一",
          "borderColor": "#8e7cc3",
          "bgColor": "#f6f0fc",
          "percent": 45.9,
          "affectedStudentCount": 37,
          "typicalPerformance": "(2956/6447)",
          "aiReason": "共2956次，占比45.9%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "Information Technology is the basis of almost all modern institutions, including",
            "Choosing it not only perfectly fit your habit of coding, but also provide you a ",
            "Choosing it can help turning environmental challenges into opportunities, like d"
          ]
        },
        {
          "id": "pt-language_accuracy",
          "type": "language_accuracy",
          "label": "语言准确性弱 / 语法错误多",
          "borderColor": "#7b9cd6",
          "bgColor": "#f0f4fc",
          "percent": 41.5,
          "affectedStudentCount": 37,
          "typicalPerformance": "(2673/6447)",
          "aiReason": "共2673次，占比41.5%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "I'm delighted to hear that you're applying for the university.",
            "As the AI rises, here are some of my suggestions.",
            "Choosing it not only perfectly fit your habit of coding, but also provide you a "
          ]
        },
        {
          "id": "pt-structure_unclear",
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "borderColor": "#f0a060",
          "bgColor": "#fef8f0",
          "percent": 8.1,
          "affectedStudentCount": 36,
          "typicalPerformance": "(519/6447)",
          "aiReason": "共519次，占比8.1%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "the one who truly understand human The one who succeed in the future must be e r",
            "With the rising of AI technology, it's true that some careers may be replaced an",
            "You may question whether math works toward the trend of the new era as a basic s"
          ]
        },
        {
          "id": "pt-format_issue",
          "type": "format_issue",
          "label": "格式规范问题 / 应用文格式",
          "borderColor": "#9ab3cc",
          "bgColor": "#f5f7fa",
          "percent": 4.6,
          "affectedStudentCount": 37,
          "typicalPerformance": "(299/6447)",
          "aiReason": "共299次，占比4.6%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "Given that you're good at coding, why not choose information technology as your ",
            "the one who truly understand human The one who succeed in the future must be e r",
            "first, Math is a fundamental subject that lay the ground for almost every scienc"
          ]
        }
      ],
      "highFrequencyIssues": [
        {
          "problemType": "vocabulary_weak",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24754566",
              "studentName": "许晨辉",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Information Technology is the basis of almost all modern institutions, including the rising Al.",
              "issueExplanation": "用词错误：用词错误",
              "revisionSuggestion": "建议把 Al 换成  AI ",
              "improvedExample": "Information Technology is the basis of almost all modern institutions, including the rising AI.",
              "score": 73.47744,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24754566",
              "studentName": "许晨辉",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Choosing it not only perfectly fit your habit of coding, but also provide you a big chance to catch up the AI era, making it easier for job choosing.",
              "issueExplanation": "固定搭配错误：固定搭配错误",
              "revisionSuggestion": "建议在 the 之前插入 with",
              "improvedExample": "Choosing it not only perfectly fits your habit of coding, but also provides you a big chance to catch up with the AI era, making it easier to choose a job.",
              "score": 73.47744,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24754566",
              "studentName": "许晨辉",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Choosing it can help turning environmental challenges into opportunities, like discovering new clean powers and finding new ways to enhance the use rate of the power, not only protect the world, but a",
              "issueExplanation": "固定搭配错误：固定搭配错误",
              "revisionSuggestion": "建议把 turning 换成  turn ",
              "improvedExample": "Choosing it can help turn environmental challenges into opportunities, like discovering new clean energy sources and finding new ways to enhance the utilization rate of power, not only protecting the ",
              "score": 73.47744,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24754566",
              "studentName": "许晨辉",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Choosing it can help turning environmental challenges into opportunities, like discovering new clean powers and finding new ways to enhance the use rate of the power, not only protect the world, but a",
              "issueExplanation": "用词错误：用词错误",
              "revisionSuggestion": "建议把 powers 换成  energy sources ",
              "improvedExample": "Choosing it can help turn environmental challenges into opportunities, like discovering new clean energy sources and finding new ways to enhance the utilization rate of power, not only protecting the ",
              "score": 73.47744,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24754578",
              "studentName": "张继朗",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Studying literaoture is quiet a wise choice.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 literaoture 换成  literature ",
              "improvedExample": "Studying literature is quite a wise choice.",
              "score": 78.134094,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24754578",
              "studentName": "张继朗",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Studying literaoture is quiet a wise choice.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 quiet 换成  quite ",
              "improvedExample": "Studying literature is quite a wise choice.",
              "score": 78.134094,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24754569",
              "studentName": "杨承杰",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Greetings! I've recently heard that you are puzzled about whatth changes can the AI bring in different ocupations.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 whatth changes can the AI 换成  what changes AI can ",
              "improvedExample": "Greetings! I've recently heard that you are puzzled about what changes AI can bring in different occupations.",
              "score": 69.95602,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24754569",
              "studentName": "杨承杰",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Greetings! I've recently heard that you are puzzled about whatth changes can the AI bring in different ocupations.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 ocupations 换成  occupations ",
              "improvedExample": "Greetings! I've recently heard that you are puzzled about what changes AI can bring in different occupations.",
              "score": 69.95602,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24754569",
              "studentName": "杨承杰",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "I strongly suggest you to choose to study technoligical innovative major which contains new materials, cutting-edged phsical theory or even arititicial intelligence.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 technoligical 换成  a technological ",
              "improvedExample": "I strongly suggest you choose to study a technological innovative major which contains new materials, cutting-edge physical theory, or even artificial intelligence.",
              "score": 69.95602,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24754569",
              "studentName": "杨承杰",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "I strongly suggest you to choose to study technoligical innovative major which contains new materials, cutting-edged phsical theory or even arititicial intelligence.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 edged phsical 换成  edge physical ",
              "improvedExample": "I strongly suggest you choose to study a technological innovative major which contains new materials, cutting-edge physical theory, or even artificial intelligence.",
              "score": 69.95602,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        },
        {
          "problemType": "language_accuracy",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24754566",
              "studentName": "许晨辉",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "I'm delighted to hear that you're applying for the university.",
              "issueExplanation": "词法错误：冠词错误",
              "revisionSuggestion": "建议删除  the ",
              "improvedExample": "I'm delighted to hear that you're applying for university.",
              "score": 73.47744,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24754566",
              "studentName": "许晨辉",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "As the AI rises, here are some of my suggestions.",
              "issueExplanation": "词法错误：冠词错误",
              "revisionSuggestion": "建议删除  the ",
              "improvedExample": "As AI rises, here are some of my suggestions.",
              "score": 73.47744,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24754566",
              "studentName": "许晨辉",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Choosing it not only perfectly fit your habit of coding, but also provide you a big chance to catch up the AI era, making it easier for job choosing.",
              "issueExplanation": "主谓一致错误：主谓一致错误",
              "revisionSuggestion": "建议把 fit 换成  fits ",
              "improvedExample": "Choosing it not only perfectly fits your habit of coding, but also provides you a big chance to catch up with the AI era, making it easier to choose a job.",
              "score": 73.47744,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24754566",
              "studentName": "许晨辉",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Choosing it not only perfectly fit your habit of coding, but also provide you a big chance to catch up the AI era, making it easier for job choosing.",
              "issueExplanation": "主谓一致错误：主谓一致错误",
              "revisionSuggestion": "建议把 provide 换成  provides ",
              "improvedExample": "Choosing it not only perfectly fits your habit of coding, but also provides you a big chance to catch up with the AI era, making it easier to choose a job.",
              "score": 73.47744,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24754566",
              "studentName": "许晨辉",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Choosing it not only perfectly fit your habit of coding, but also provide you a big chance to catch up the AI era, making it easier for job choosing.",
              "issueExplanation": "非谓语动词错误：动词不定式错误",
              "revisionSuggestion": "建议把 for job choosing 换成  to choose a job ",
              "improvedExample": "Choosing it not only perfectly fits your habit of coding, but also provides you a big chance to catch up with the AI era, making it easier to choose a job.",
              "score": 73.47744,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24754566",
              "studentName": "许晨辉",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Additionally, no matter how rapidly the job choosing change, the environmental issues are still there.",
              "issueExplanation": "词法错误：冠词错误",
              "revisionSuggestion": "建议删除  the ",
              "improvedExample": "Additionally, no matter how rapidly job choices change, environmental issues are still there.",
              "score": 73.47744,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24754566",
              "studentName": "许晨辉",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Additionally, no matter how rapidly the job choosing change, the environmental issues are still there.",
              "issueExplanation": "词性误用：词性误用",
              "revisionSuggestion": "建议把 choosing 换成  choices ",
              "improvedExample": "Additionally, no matter how rapidly job choices change, environmental issues are still there.",
              "score": 73.47744,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24754566",
              "studentName": "许晨辉",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Additionally, no matter how rapidly the job choosing change, the environmental issues are still there.",
              "issueExplanation": "词法错误：冠词错误",
              "revisionSuggestion": "建议删除  the ",
              "improvedExample": "Additionally, no matter how rapidly job choices change, environmental issues are still there.",
              "score": 73.47744,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24754566",
              "studentName": "许晨辉",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "So the major of environment protecting is also a choice.",
              "issueExplanation": "词性误用：词性误用",
              "revisionSuggestion": "建议把 environment protecting 换成  environmental protection ",
              "improvedExample": "So the major of environmental protection is also a choice.",
              "score": 73.47744,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24754566",
              "studentName": "许晨辉",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Every time we use AI, data centers consume huge amount of electricity.",
              "issueExplanation": "词法错误：冠词错误",
              "revisionSuggestion": "建议在 huge 之前插入 a",
              "improvedExample": "Every time we use AI, data centers consume a huge amount of electricity.",
              "score": 73.47744,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        },
        {
          "problemType": "structure_unclear",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24754578",
              "studentName": "张继朗",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "the one who truly understand human The one who succeed in the future must be e ru",
              "issueExplanation": "句子结构错误：句子成分残缺",
              "revisionSuggestion": "建议把 The one who succeed in the future must be e ru 换成  and the one who succeeds in the future must be erudite. ",
              "improvedExample": "The one who truly understands humans and the one who succeeds in the future must be erudite.",
              "score": 78.134094,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24754581",
              "studentName": "张梓轩",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "With the rising of AI technology, it's true that some careers may be replaced and disappeared.",
              "issueExplanation": "句子结构错误：并列结构错误",
              "revisionSuggestion": "建议把 disappeared 换成  disappear ",
              "improvedExample": "With the rise of AI technology, it's true that some careers may be replaced and disappear.",
              "score": 80.232124,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24754563",
              "studentName": "王臻易",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "You may question whether math works toward the trend of the new era as a basic subject, and whether the occupation option is clear.",
              "issueExplanation": "句子结构错误：并列结构错误",
              "revisionSuggestion": "建议把 occupation option is 换成  occupational options are ",
              "improvedExample": "You may question whether math works toward the trend of the new era as a basic subject, and whether the occupational options are clear.",
              "score": 83.289314,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24754562",
              "studentName": "王雨阳",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "I recommend you the computer programing subject Frouths subject, you can learn how to code numbers, improve the coupulation of computers and designing apps to benefits people's life.",
              "issueExplanation": "句子结构错误：错误使用逗号连接两个完整句子",
              "revisionSuggestion": "建议把 , you 换成  . You ",
              "improvedExample": "I recommend the computer programming subject, Fourth subject. You can learn how to code, improve the computation of computers, and design apps to benefit people's lives.",
              "score": 62.427505,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24754562",
              "studentName": "王雨阳",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "I recommend you the computer programing subject Frouths subject, you can learn how to code numbers, improve the coupulation of computers and designing apps to benefits people's life.",
              "issueExplanation": "句子结构错误：并列结构错误",
              "revisionSuggestion": "建议把 and designing 换成  , and design ",
              "improvedExample": "I recommend the computer programming subject, Fourth subject. You can learn how to code, improve the computation of computers, and design apps to benefit people's lives.",
              "score": 62.427505,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24754547",
              "studentName": "梁紫书",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "The incoporated subject using AI as gnassistaint for another subject's study.",
              "issueExplanation": "句子结构错误：误用非谓语动词作谓语",
              "revisionSuggestion": "建议把 subject using 换成  subjects use ",
              "improvedExample": "The incorporated subjects use AI as assistants for another subject's study.",
              "score": 42.990322,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24754558",
              "studentName": "童雨歆",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "There're my primary thought for your reference.",
              "issueExplanation": "句子结构错误：句子成分残缺",
              "revisionSuggestion": "建议把 thought 换成  thoughts ",
              "improvedExample": "Here are my primary thoughts for your reference.",
              "score": 70.00435,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24754558",
              "studentName": "童雨歆",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Above all, it's just my personal perspective, I sicerely hope you could find your suitable expertise and keep chasing ar dream!",
              "issueExplanation": "句子结构错误：错误使用逗号连接两个完整句子",
              "revisionSuggestion": "建议把 , 换成  . ",
              "improvedExample": "Above all, it's just my personal perspective. I sincerely hope you could find your suitable major and keep chasing your dream!",
              "score": 70.00435,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24754544",
              "studentName": "黄唯",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Greetings! It's common to feel doubts when facing major decision with the here are which be helpful rise of AI, and my suggestions may for you.",
              "issueExplanation": "句子结构错误：双谓语错误",
              "revisionSuggestion": "建议删除  here are which be helpful ",
              "improvedExample": "Greetings! It's common to feel doubts when facing a major decision with the rise of AI, and here are some suggestions which may be helpful for you.",
              "score": 61.938335,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24754544",
              "studentName": "黄唯",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Greetings! It's common to feel doubts when facing major decision with the here are which be helpful rise of AI, and my suggestions may for you.",
              "issueExplanation": "句子结构错误：句子成分残缺",
              "revisionSuggestion": "建议把 my 换成  here are some ",
              "improvedExample": "Greetings! It's common to feel doubts when facing a major decision with the rise of AI, and here are some suggestions which may be helpful for you.",
              "score": 61.938335,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        },
        {
          "problemType": "format_issue",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24754566",
              "studentName": "许晨辉",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Given that you're good at coding, why not choose information technology as your major?",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 information technology 换成  Information Technology ",
              "improvedExample": "Given that you're good at coding, why not choose Information Technology as your major?",
              "score": 73.47744,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24754578",
              "studentName": "张继朗",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "the one who truly understand human The one who succeed in the future must be e ru",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 the 换成  The ",
              "improvedExample": "The one who truly understands humans and the one who succeeds in the future must be erudite.",
              "score": 78.134094,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24754535",
              "studentName": "陈可悦",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "first, Math is a fundamental subject that lay the ground for almost every science and technology, so the requirement for Math professionals will keep increasing and won't be replaced.",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 first 换成  First ",
              "improvedExample": "First, Math is a fundamental subject that lays the ground for almost every science and technology, so the requirement for Math professionals will keep increasing and won't be replaced.",
              "score": 83.83934,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24754535",
              "studentName": "陈可悦",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "What's more, studying Math can improve your logical and critical thinking abilities profoundly, which are exactly key abilities needed in the future and can be expanded to other fields:",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议把 : 换成  . ",
              "improvedExample": "What's more, studying Math can improve your logical and critical thinking abilities profoundly, which are exactly the key abilities needed in the future and can be expanded to other fields.",
              "score": 83.83934,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24754574",
              "studentName": "杨晓正",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Also, studying Psychology reinforces your ability of properly interacting no matter with patients or with customers, so you can apply your intellectual ability in various fields.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议把 interacting 换成  , ",
              "improvedExample": "Also, studying Psychology reinforces your ability to interact properly, no matter with patients or customers, so you can apply your intellectual ability in various fields.",
              "score": 77.10708,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24754565",
              "studentName": "徐一丁",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "programming r might not suit.",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 programming r might not suit 换成  Programming might not suit you ",
              "improvedExample": "Programming might not suit you.",
              "score": 76.14919,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24754570",
              "studentName": "杨恩琪",
              "essayTitle": "4月29日 英语测练",
              "taskName": "4月29日 英语测练",
              "writingType": "practical",
              "originalText": "Last time you referred to your concerns and confusion about the impact AI has on job opportunities.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议在 you 之前插入 ,",
              "improvedExample": "Last time, you referred to your concerns and confusion about the impact AI has on job opportunities.",
              "score": 77.95075,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24754558",
              "studentName": "童雨歆",
              "essayTitle": "北师大实验中学高三一模冲刺练习",
              "taskName": "北师大实验中学高三一模冲刺练习",
              "writingType": "practical",
              "originalText": "I'm thrilled to tell you The BPAFFc will initiate a nterational video video collection event focusing on \"New technology and New life.\"",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 The BPAFFc 换成  the BPAFFC ",
              "improvedExample": "I'm thrilled to tell you the BPAFFC will initiate an international video collection event focusing on \"New Technology and New Life.\"",
              "score": 64.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24754558",
              "studentName": "童雨歆",
              "essayTitle": "北师大实验中学高三一模冲刺练习",
              "taskName": "北师大实验中学高三一模冲刺练习",
              "writingType": "practical",
              "originalText": "I'm thrilled to tell you The BPAFFc will initiate a nterational video video collection event focusing on \"New technology and New life.\"",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 technology 换成  Technology ",
              "improvedExample": "I'm thrilled to tell you the BPAFFC will initiate an international video collection event focusing on \"New Technology and New Life.\"",
              "score": 64.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24754558",
              "studentName": "童雨歆",
              "essayTitle": "北师大实验中学高三一模冲刺练习",
              "taskName": "北师大实验中学高三一模冲刺练习",
              "writingType": "practical",
              "originalText": "I'm thrilled to tell you The BPAFFc will initiate a nterational video video collection event focusing on \"New technology and New life.\"",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 life 换成  Life ",
              "improvedExample": "I'm thrilled to tell you the BPAFFC will initiate an international video collection event focusing on \"New Technology and New Life.\"",
              "score": 64.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        }
      ],
      "weakStudents": [
        {
          "id": "24754571",
          "name": "杨润禾",
          "averageScore": 51.9,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 60.4
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 27.5
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 8.2
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 3.8
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 75.34931,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.34931,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.34931,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.34931,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.34931,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24754547",
          "name": "梁紫书",
          "averageScore": 53.3,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 58.2
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 30.2
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 6.5
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 5.1
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 42.990322,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 42.990322,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 42.990322,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 42.990322,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 42.990322,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24754540",
          "name": "高东辰",
          "averageScore": 54.9,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 52.0
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 41.1
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 4.6
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 2.3
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 59.45359,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 59.45359,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 59.45359,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 59.45359,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 59.45359,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        }
      ],
      "excellentWritings": [
        {
          "id": "ew-754542",
          "studentId": "24754542",
          "studentName": "郭晨曦",
          "essayTitle": "丰台区2025～2026学年度第一学期期末练习 重练",
          "taskName": "丰台区2025～2026学年度第一学期期末练习 重练",
          "writingType": "practical",
          "score": 90.0,
          "level": "A",
          "highlights": "得分90.0分，含佳句",
          "excerpt": "{Becoming a Better Self\\nI'm writing to contribute to the \\\"Becoming a Better Self\\\" activity. I'd like to share my understanding and practice about the theme.\\nIn my opinion, \\\"becoming a better self\\\" means becoming a well-rounded person, which consists of two parts: a rational brain and a healthy body.\\nTo become a better self, I read philosophy books and study science papers every day. By delving into these works, I not only acquire ample knowledge but also fuel my curiosity and improve crit",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754539",
          "studentId": "24754539",
          "studentName": "翟子萱",
          "essayTitle": "【开学摸底】中国人的日常智慧",
          "taskName": "【开学摸底】中国人的日常智慧",
          "writingType": "practical",
          "score": 87.0,
          "level": "A",
          "highlights": "得分87.0分，含佳句",
          "excerpt": "{I'm glad to know your club is going to hold a sharing activity on the theme of \\\"Wisdom in Chinese Daily Routines.\\\" Here are two representative cases.\\n\\nFirst, there is a well-known saying in China: \\\"Take a hundred steps after a meal, and you'll live to ninety-nine.\\\" This reflects the common habit of taking a walk after meals. In the afternoon, you can see people of all ages walking in schools, around office buildings, and in parks. This practice helps digestion and promotes health, showing",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754551",
          "studentId": "24754551",
          "studentName": "欧阳燧",
          "essayTitle": "4月22日 英语测练",
          "taskName": "4月22日 英语测练",
          "writingType": "practical",
          "score": 86.96486,
          "level": "A",
          "highlights": "得分86.96486分",
          "excerpt": "{Dear Jim,\\n\\nI am delighted to hear that you are going to participate in the UN Youth Forum entitled \\\"Skills Needed for a Sustainable Future,\\\" and I'd like to share my ideas in reply to your consultation about the speech content.\\n\\nFrom my perspective, one of the crucial skills needed for a sustainable future is critical thinking. AI technology is playing an increasingly important role in our lives, but it sometimes provides false information that can mislead us. Therefore, critical thinking",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754563",
          "studentId": "24754563",
          "studentName": "王臻易",
          "essayTitle": "5月21日 英语测练",
          "taskName": "5月21日 英语测练",
          "writingType": "practical",
          "score": 85.476295,
          "level": "A",
          "highlights": "得分85.476295分",
          "excerpt": "{Dear Jim,\\n\\nI'm sorry to hear that you were criticized for using AI tools in your writing homework, and it's normal to feel upset. In my opinion, relying entirely on AI to finish your homework is inappropriate because it means you miss the chance to think deeply and improve your own writing skills.\\n\\nHowever, I suggest you use AI tools in a smart way. For example, you can learn some elegant phrases or interesting examples from AI to enrich your essays, which can broaden your knowledge and hel",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754573",
          "studentId": "24754573",
          "studentName": "杨惟翰",
          "essayTitle": "丰台区2025～2026学年度第一学期期末练习 重练",
          "taskName": "丰台区2025～2026学年度第一学期期末练习 重练",
          "writingType": "practical",
          "score": 85.0,
          "level": "A",
          "highlights": "得分85.0分，含佳句",
          "excerpt": "{Becoming a Better Self\\nWhen it comes to \\\"becoming a better self,\\\" my understanding goes beyond higher scores or a longer list of achievements. To me, it's an inward journey toward self-discovery. It's about understanding my genuine interests, facing my weaknesses, and knowing what I really want in life. This self-awareness is the foundation of real growth.\\nTo walk this path, I've started two simple practices. First, I keep a reflective journal. Every weekend, I write down one thing I did we",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754542",
          "studentId": "24754542",
          "studentName": "郭晨曦",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "score": 84.51757,
          "level": "A",
          "highlights": "得分84.51757分",
          "excerpt": "{Warm greetings! I'm writing to reply to your questions about my participation in the \\\"Painting China with Intelligence\\\" technology-enabled original works contest. I'd like to share more details with you.\\n\\nMy artwork has two parts. On one side, I drew the scene of Shougang Park, showing Olympic venues transformed from old steel mills and newly built public green spaces where children play and elderly residents exercise. This part reflects China's efforts toward a sustainable future and its g",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754542",
          "studentId": "24754542",
          "studentName": "郭晨曦",
          "essayTitle": "4月29日 英语测练",
          "taskName": "4月29日 英语测练",
          "writingType": "practical",
          "score": 84.298004,
          "level": "A",
          "highlights": "得分84.298004分",
          "excerpt": "{Dear Jim,\\n\\nI understand that you are confused about choosing a major because of the changes in employment caused by the rise of artificial intelligence. I am glad to give you some advice.\\n\\nI recommend that you choose law as your major. With the popularity of AI, moral and legal issues caused by its use have become common. Studying law will help you gain relevant knowledge to solve these social problems and contribute to a fair society. It will also prepare you to become a professional lawye",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754541",
          "studentId": "24754541",
          "studentName": "高子涵",
          "essayTitle": "丰台区2025～2026学年度第一学期期末练习 重练",
          "taskName": "丰台区2025～2026学年度第一学期期末练习 重练",
          "writingType": "practical",
          "score": 84.0,
          "level": "A",
          "highlights": "得分84.0分",
          "excerpt": "{Becoming a Better Self\\nBecoming a better self is important for each of us. Here are my understanding and practice.\\nTo me, becoming a better self means owning a rational mind, which is closely related to my academic performance. In addition, in a fast-paced world pressured by external standards, we tend to neglect our mental health. That's why I think it is vital to include self-care as a part of becoming a better self.\\nTo develop a rational mind, I not only actively interact with my teachers",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754572",
          "studentId": "24754572",
          "studentName": "杨婉桐",
          "essayTitle": "丰台区2025～2026学年度第一学期期末练习 重练",
          "taskName": "丰台区2025～2026学年度第一学期期末练习 重练",
          "writingType": "practical",
          "score": 84.0,
          "level": "A",
          "highlights": "得分84.0分，含佳句",
          "excerpt": "{Becoming a Better Self\\nLife is a process of going upstairs little by little. So becoming a better self is a core task in our way to growing up. Becoming a better version of ourselves doesn't mean winning awards or outperforming others, as everyone grows at their own pace and our true goal is to improve upon our past selves. Therefore, we need to concentrate on our own progress and strive to maximize it.\\n\\nHere are some ways that I use in my life to become a better self. First, I regularly ref",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754560",
          "studentId": "24754560",
          "studentName": "王明辉",
          "essayTitle": "丰台区2025～2026学年度第一学期期末练习 重练",
          "taskName": "丰台区2025～2026学年度第一学期期末练习 重练",
          "writingType": "practical",
          "score": 84.0,
          "level": "A",
          "highlights": "得分84.0分",
          "excerpt": "{Becoming a Better Self\\n\\nI'm glad to share my view on Becoming a Better Self. To me, it not only means personal excellence but also includes a sense of social responsibility.\\n\\nTo become a well-rounded person, I make efforts to facilitate my academic growth and improve my mental and physical health. By tackling tasks in learning, I gain ample knowledge and build resilience and perseverance, which represent inner strength. Physical activities help me stay physically and mentally balanced, allo",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        }
      ],
      "recommendedResources": [
        {
          "id": "res-w-1",
          "title": "应用文写作模板训练",
          "resourceType": "writing_practice",
          "tags": [
            "写作",
            "应用文"
          ],
          "difficulty": "medium",
          "grade": "高二",
          "recommendReason": "针对词汇表达弱 / 用词单一设计",
          "canPreview": true,
          "canAssign": true,
          "canAddToPaperBasket": true
        }
      ],
      "generatedSamples": [
        {
          "id": "gs-1",
          "level": "basic",
          "title": "基础版 — 高东辰的作文",
          "content": "{Greetings! Hearing about your interest in our school's \\\"Most Respected Laborer\\\" exhibition, I'm more than happy to tell you about it.\\n\\nThere were various works in the show, including photography, paintings, and handmade crafts. Some photos focused on small scenes in our daily life. For example, I saw a picture showing an old cleaner bending his body to sweep dust on the wall, with sunlight gently touching his shoulders. It was so warm and touching. Additionally, there were some bright paintings and handicrafts, such as a painting of a security guard standing behind the school gate and a painting about volunteers working hard in the sun.\\n\\nThese works impressed me most. I learned that many people are working hard for us beyond our attention. Fortunately, there are still grateful hearts among us; they respect and record the laborers, working hard to pass warmth to a larger group of people.\\n\\nWhat do you think about it? I'm looking forward to your reply.}",
          "highlights": "得分49.0分 | 适合基础薄弱学生参考基本结构",
          "suitableFor": "20分以下",
          "editable": true
        },
        {
          "id": "gs-2",
          "level": "improved",
          "title": "提升版 — 梁紫书的作文",
          "content": "{Dear Jim,\\n\\nI am excited to tell you that BPAFFC is going to hold an international short video collection activity with the theme \\\"New Technology, New Life.\\\" I want to invite you to join me in creating a video together.\\n\\nThis activity is for international youth to show how new technology changes our lives. Since we live in different places, your participation will provide a different perspective and make our video more interesting. The video should express our opinions and experiences about technology.\\n\\nI have some initial ideas. AI is becoming very popular worldwide and is changing our lives. We can shoot how we use AI in our daily learning, how it answers our personal questions, and helps us understand knowledge better. Also, new technology is widely used in cities. I suggest we film some high-tech places in your city and mine, showing how technology makes life easier. This fits well with the theme.\\n\\nWhat do you think? Let's discuss and plan how to share the work and make the video together. I look forward to your reply.\\n\\nBest wishes,\\nLi Hua}",
          "highlights": "得分67.0分 | 展示中等水平如何组织内容和句式",
          "suitableFor": "20-25分",
          "editable": true
        },
        {
          "id": "gs-3",
          "level": "excellent",
          "title": "优秀版 — 郭晨曦的作文",
          "content": "{Becoming a Better Self\\nI'm writing to contribute to the \\\"Becoming a Better Self\\\" activity. I'd like to share my understanding and practice about the theme.\\nIn my opinion, \\\"becoming a better self\\\" means becoming a well-rounded person, which consists of two parts: a rational brain and a healthy body.\\nTo become a better self, I read philosophy books and study science papers every day. By delving into these works, I not only acquire ample knowledge but also fuel my curiosity and improve critical thinking, shaping a rational mind. Besides, I insist on jogging every day to build a strong body. Having good health is highly related to becoming a better self because your body is the only tangible carrier of yourself and your life.\\nI believe becoming a better self is a lifelong pursuit, and I will keep striving to be the best version of myself.}",
          "highlights": "得分90.0分，含佳句 | 展示高分作文的表达水平",
          "suitableFor": "25+分",
          "editable": true
        }
      ],
      "interventionRecords": []
    }
  },
  "2023级R5班": {
    "vocabulary": {
      "classId": "class-2023级R5班",
      "className": "2023级R5班",
      "unitId": "real-data",
      "unitName": "平台真实数据",
      "timeRange": "30d",
      "updatedAt": "2026-06-11 11:30",
      "summary": "2023级R5班 共 38 名学生，1329 条词汇错误记录，涉及 819 个词。薄弱学生 14 人，建议重点加强默写和拼写训练。",
      "metrics": {
        "practicedWordCount": 819,
        "weakWordCount": 50,
        "weakStudentCount": 14,
        "mainWeakType": "拼不对 / 默写错误"
      },
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100,
          "affectedStudentCount": 34,
          "exampleWords": [
            "truly",
            "solve",
            "writing",
            "laborer/labourer",
            "technology"
          ],
          "aiReason": "平台数据错因均为'不会写'，归类为拼写错误。2023级R5班共1329条拼写错误记录。",
          "recommendedActions": [
            "默写",
            "词汇复习规划",
            "组卷"
          ],
          "borderColor": "#f0a060",
          "bgColor": "#fef8f0"
        }
      ],
      "weakWords": [
        {
          "id": "ww-000",
          "text": "truly",
          "itemType": "word",
          "scoreRate": 10.0,
          "errorRate": 90.0,
          "affectedStudentCount": 13,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747540",
              "studentName": "张湑",
              "questionContext": "",
              "studentAnswer": "truely",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747505",
              "studentName": "崔健坤",
              "questionContext": "",
              "studentAnswer": "truely",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747543",
              "studentName": "赵玉琪",
              "questionContext": "",
              "studentAnswer": "truely",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747501",
              "studentName": "白恩齐",
              "questionContext": "",
              "studentAnswer": "truely",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747503",
              "studentName": "蔡欣怡",
              "questionContext": "",
              "studentAnswer": "truely",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在13名学生中出现16次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 99
        },
        {
          "id": "ww-001",
          "text": "solve",
          "itemType": "word",
          "scoreRate": 26.9,
          "errorRate": 73.1,
          "affectedStudentCount": 8,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "",
              "studentAnswer": "saving",
              "correctAnswer": "solve",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747502",
              "studentName": "白昀凡",
              "questionContext": "",
              "studentAnswer": "sorling",
              "correctAnswer": "solve",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747536",
              "studentName": "杨依诺",
              "questionContext": "",
              "studentAnswer": "sadving",
              "correctAnswer": "solve",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "",
              "studentAnswer": "soling",
              "correctAnswer": "solve",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747540",
              "studentName": "张湑",
              "questionContext": "",
              "studentAnswer": "solkve",
              "correctAnswer": "solve",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在8名学生中出现13次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 86
        },
        {
          "id": "ww-002",
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
          "typicalMistakes": [
            {
              "studentId": "24747505",
              "studentName": "崔健坤",
              "questionContext": "",
              "studentAnswer": "writting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "writting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "writting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747536",
              "studentName": "杨依诺",
              "questionContext": "",
              "studentAnswer": "writting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747531",
              "studentName": "魏梓洲",
              "questionContext": "",
              "studentAnswer": "writting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在7名学生中出现13次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 86
        },
        {
          "id": "ww-003",
          "text": "laborer/labourer",
          "itemType": "word",
          "scoreRate": 32.5,
          "errorRate": 67.5,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747513",
              "studentName": "李韵然",
              "questionContext": "",
              "studentAnswer": "labors",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747540",
              "studentName": "张湑",
              "questionContext": "",
              "studentAnswer": "labors",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747513",
              "studentName": "李韵然",
              "questionContext": "",
              "studentAnswer": "labors",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747540",
              "studentName": "张湑",
              "questionContext": "",
              "studentAnswer": "labors",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747544",
              "studentName": "郑乐言",
              "questionContext": "",
              "studentAnswer": "laboror",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现12次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 81
        },
        {
          "id": "ww-004",
          "text": "technology",
          "itemType": "word",
          "scoreRate": 38.1,
          "errorRate": 61.9,
          "affectedStudentCount": 8,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747545",
              "studentName": "周泽睿",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "technoloy",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747501",
              "studentName": "白恩齐",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "techndl ogy",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "teshnology",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747531",
              "studentName": "魏梓洲",
              "questionContext": "",
              "studentAnswer": "technoluy",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747537",
              "studentName": "张偲怡",
              "questionContext": "",
              "studentAnswer": "techology",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在8名学生中出现11次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 77
        },
        {
          "id": "ww-005",
          "text": "environmental",
          "itemType": "word",
          "scoreRate": 43.8,
          "errorRate": 56.2,
          "affectedStudentCount": 6,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "environmratal",
              "correctAnswer": "environmental",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747545",
              "studentName": "周泽睿",
              "questionContext": "",
              "studentAnswer": "environmenty",
              "correctAnswer": "environmental",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "onvironncueadl",
              "correctAnswer": "environmental",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747540",
              "studentName": "张湑",
              "questionContext": "",
              "studentAnswer": "enviromental",
              "correctAnswer": "environmental",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747537",
              "studentName": "张偲怡",
              "questionContext": "",
              "studentAnswer": "environmenta",
              "correctAnswer": "environmental",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现10次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 73
        },
        {
          "id": "ww-006",
          "text": "skills",
          "itemType": "word",
          "scoreRate": 43.8,
          "errorRate": 56.2,
          "affectedStudentCount": 7,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "",
              "studentAnswer": "slalls",
              "correctAnswer": "skills",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "shill",
              "correctAnswer": "skills",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "",
              "studentAnswer": "sloills",
              "correctAnswer": "skills",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "",
              "studentAnswer": "slills",
              "correctAnswer": "skills",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747504",
              "studentName": "陈佳静",
              "questionContext": "",
              "studentAnswer": "skill,",
              "correctAnswer": "skills",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在7名学生中出现10次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 73
        },
        {
          "id": "ww-007",
          "text": "technologies",
          "itemType": "word",
          "scoreRate": 49.4,
          "errorRate": 50.6,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "technolges",
              "correctAnswer": "technologies",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "technlogies",
              "correctAnswer": "technologies",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "teshnologies",
              "correctAnswer": "technologies",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747536",
              "studentName": "杨依诺",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "tednologies",
              "correctAnswer": "technologies",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747536",
              "studentName": "杨依诺",
              "questionContext": "",
              "studentAnswer": "technolgies",
              "correctAnswer": "technologies",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现9次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 68
        },
        {
          "id": "ww-008",
          "text": "Beijing",
          "itemType": "word",
          "scoreRate": 49.4,
          "errorRate": 50.6,
          "affectedStudentCount": 6,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "Beiiy",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747538",
              "studentName": "张浩然",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "Beijlise",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "Beily",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747510",
              "studentName": "蒋逸晗",
              "questionContext": "",
              "studentAnswer": "Berjing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747517",
              "studentName": "刘琨奕",
              "questionContext": "",
              "studentAnswer": "Beising",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现9次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 68
        },
        {
          "id": "ww-009",
          "text": "more",
          "itemType": "word",
          "scoreRate": 55.0,
          "errorRate": 45.0,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "mere",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747503",
              "studentName": "蔡欣怡",
              "questionContext": "",
              "studentAnswer": "mon",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "wove",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "wove",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747524",
              "studentName": "王晨希",
              "questionContext": "",
              "studentAnswer": "wore",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现8次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 64
        },
        {
          "id": "ww-010",
          "text": "environment",
          "itemType": "word",
          "scoreRate": 60.6,
          "errorRate": 39.4,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747536",
              "studentName": "杨依诺",
              "questionContext": "",
              "studentAnswer": "enviroment",
              "correctAnswer": "environment",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747530",
              "studentName": "王梓瑶",
              "questionContext": "",
              "studentAnswer": "enviroment",
              "correctAnswer": "environment",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747504",
              "studentName": "陈佳静",
              "questionContext": "",
              "studentAnswer": "enviroinment",
              "correctAnswer": "environment",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747540",
              "studentName": "张湑",
              "questionContext": "",
              "studentAnswer": "enviroment",
              "correctAnswer": "environment",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747536",
              "studentName": "杨依诺",
              "questionContext": "",
              "studentAnswer": "enironment",
              "correctAnswer": "environment",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现7次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 60
        },
        {
          "id": "ww-011",
          "text": "interested",
          "itemType": "word",
          "scoreRate": 60.6,
          "errorRate": 39.4,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747512",
              "studentName": "李宇泽",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "intrested",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747530",
              "studentName": "王梓瑶",
              "questionContext": "",
              "studentAnswer": "intersted",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "",
              "studentAnswer": "intrested",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747512",
              "studentName": "李宇泽",
              "questionContext": "",
              "studentAnswer": "intrested",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "",
              "studentAnswer": "intersted",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现7次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 60
        },
        {
          "id": "ww-012",
          "text": "sustainable",
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
          "typicalMistakes": [
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "wwrtabulle",
              "correctAnswer": "sustainable",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747513",
              "studentName": "李韵然",
              "questionContext": "",
              "studentAnswer": "sustanable",
              "correctAnswer": "sustainable",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "",
              "studentAnswer": "sustimable",
              "correctAnswer": "sustainable",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747536",
              "studentName": "杨依诺",
              "questionContext": "",
              "studentAnswer": "susginale",
              "correctAnswer": "sustainable",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747505",
              "studentName": "崔健坤",
              "questionContext": "",
              "studentAnswer": "Justainable",
              "correctAnswer": "sustainable",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在7名学生中出现7次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 60
        },
        {
          "id": "ww-013",
          "text": "AI/artificial intelligence",
          "itemType": "word",
          "scoreRate": 60.6,
          "errorRate": 39.4,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747501",
              "studentName": "白恩齐",
              "questionContext": "",
              "studentAnswer": "Al",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747524",
              "studentName": "王晨希",
              "questionContext": "",
              "studentAnswer": "Al is",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747501",
              "studentName": "白恩齐",
              "questionContext": "",
              "studentAnswer": "An",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747510",
              "studentName": "蒋逸晗",
              "questionContext": "",
              "studentAnswer": "A",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747503",
              "studentName": "蔡欣怡",
              "questionContext": "",
              "studentAnswer": "Al-",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现7次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 60
        },
        {
          "id": "ww-014",
          "text": "exhibition",
          "itemType": "word",
          "scoreRate": 60.6,
          "errorRate": 39.4,
          "affectedStudentCount": 6,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747502",
              "studentName": "白昀凡",
              "questionContext": "",
              "studentAnswer": "exibition",
              "correctAnswer": "exhibition",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "exlib tion",
              "correctAnswer": "exhibition",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747508",
              "studentName": "贺云舒",
              "questionContext": "",
              "studentAnswer": "exhibiton",
              "correctAnswer": "exhibition",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747517",
              "studentName": "刘琨奕",
              "questionContext": "",
              "studentAnswer": "exbition",
              "correctAnswer": "exhibition",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "exhisiton.",
              "correctAnswer": "exhibition",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现7次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 60
        },
        {
          "id": "ww-015",
          "text": "problem",
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
          "typicalMistakes": [
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "",
              "studentAnswer": "publem",
              "correctAnswer": "problem",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747522",
              "studentName": "尚子欣",
              "questionContext": "Apart from what is mentioned in the passage, what else contributes to problem-solving? (In about 40 ",
              "studentAnswer": "poblem",
              "correctAnswer": "problem",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747502",
              "studentName": "白昀凡",
              "questionContext": "Apart from what is mentioned in the passage, what else contributes to problem-solving? (In about 40 ",
              "studentAnswer": "problen",
              "correctAnswer": "problem",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "Apart from what is mentioned in the passage, what else contributes to problem-solving? (In about 40 ",
              "studentAnswer": "prollent",
              "correctAnswer": "problem",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747536",
              "studentName": "杨依诺",
              "questionContext": "",
              "studentAnswer": "prodem",
              "correctAnswer": "problem",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 55
        },
        {
          "id": "ww-016",
          "text": "perspective",
          "itemType": "word",
          "scoreRate": 66.2,
          "errorRate": 33.8,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747509",
              "studentName": "姜纾雯",
              "questionContext": "",
              "studentAnswer": "perspections",
              "correctAnswer": "perspective",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747545",
              "studentName": "周泽睿",
              "questionContext": "",
              "studentAnswer": "perspertive",
              "correctAnswer": "perspective",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747531",
              "studentName": "魏梓洲",
              "questionContext": "",
              "studentAnswer": "prespectives",
              "correctAnswer": "perspective",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747531",
              "studentName": "魏梓洲",
              "questionContext": "",
              "studentAnswer": "perspectiwes",
              "correctAnswer": "perspective",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747531",
              "studentName": "魏梓洲",
              "questionContext": "",
              "studentAnswer": "prespective",
              "correctAnswer": "perspective",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 55
        },
        {
          "id": "ww-017",
          "text": "difficulty",
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
          "typicalMistakes": [
            {
              "studentId": "24747545",
              "studentName": "周泽睿",
              "questionContext": "",
              "studentAnswer": "difficuties",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747530",
              "studentName": "王梓瑶",
              "questionContext": "",
              "studentAnswer": "dificulties",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "",
              "studentAnswer": "diffculties",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747502",
              "studentName": "白昀凡",
              "questionContext": "Apart from what is mentioned in the passage, what else contributes to problem-solving? (In about 40 ",
              "studentAnswer": "difficultes",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747512",
              "studentName": "李宇泽",
              "questionContext": "",
              "studentAnswer": "difficuly we",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 55
        },
        {
          "id": "ww-018",
          "text": "exercise",
          "itemType": "word",
          "scoreRate": 66.2,
          "errorRate": 33.8,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747543",
              "studentName": "赵玉琪",
              "questionContext": "",
              "studentAnswer": "excerise",
              "correctAnswer": "exercise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747536",
              "studentName": "杨依诺",
              "questionContext": "",
              "studentAnswer": "exerise",
              "correctAnswer": "exercise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747509",
              "studentName": "姜纾雯",
              "questionContext": "",
              "studentAnswer": "excercise",
              "correctAnswer": "exercise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "",
              "studentAnswer": "exenise,",
              "correctAnswer": "exercise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747536",
              "studentName": "杨依诺",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "everise",
              "correctAnswer": "exercise",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 55
        },
        {
          "id": "ww-019",
          "text": "process",
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
          "typicalMistakes": [
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "",
              "studentAnswer": "progress",
              "correctAnswer": "process",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "Apart from what is mentioned in the passage, what else contributes to problem-solving? (In about 40 ",
              "studentAnswer": "precess",
              "correctAnswer": "process",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747531",
              "studentName": "魏梓洲",
              "questionContext": "",
              "studentAnswer": "proccess",
              "correctAnswer": "process",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747502",
              "studentName": "白昀凡",
              "questionContext": "",
              "studentAnswer": "porocess",
              "correctAnswer": "process",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747532",
              "studentName": "吴若葭",
              "questionContext": "",
              "studentAnswer": "progress",
              "correctAnswer": "process",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 55
        },
        {
          "id": "ww-020",
          "text": "artwork",
          "itemType": "word",
          "scoreRate": 66.2,
          "errorRate": 33.8,
          "affectedStudentCount": 4,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747545",
              "studentName": "周泽睿",
              "questionContext": "",
              "studentAnswer": "art work",
              "correctAnswer": "artwork",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747545",
              "studentName": "周泽睿",
              "questionContext": "",
              "studentAnswer": "art work",
              "correctAnswer": "artwork",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747530",
              "studentName": "王梓瑶",
              "questionContext": "",
              "studentAnswer": "are work",
              "correctAnswer": "artwork",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747545",
              "studentName": "周泽睿",
              "questionContext": "",
              "studentAnswer": "art work",
              "correctAnswer": "artwork",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747531",
              "studentName": "魏梓洲",
              "questionContext": "",
              "studentAnswer": "artwrk",
              "correctAnswer": "artwork",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 55
        },
        {
          "id": "ww-021",
          "text": "cooperation",
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
          "typicalMistakes": [
            {
              "studentId": "24747504",
              "studentName": "陈佳静",
              "questionContext": "",
              "studentAnswer": "auperation",
              "correctAnswer": "cooperation",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747519",
              "studentName": "卢子萌",
              "questionContext": "",
              "studentAnswer": "coopration",
              "correctAnswer": "cooperation",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747508",
              "studentName": "贺云舒",
              "questionContext": "",
              "studentAnswer": "cooporation",
              "correctAnswer": "cooperation",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "coojeration",
              "correctAnswer": "cooperation",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747538",
              "studentName": "张浩然",
              "questionContext": "",
              "studentAnswer": "coopration",
              "correctAnswer": "cooperation",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-022",
          "text": "critical",
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
          "typicalMistakes": [
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "",
              "studentAnswer": "citical",
              "correctAnswer": "critical",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "",
              "studentAnswer": "citical",
              "correctAnswer": "critical",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747503",
              "studentName": "蔡欣怡",
              "questionContext": "",
              "studentAnswer": "\"ritical",
              "correctAnswer": "critical",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747527",
              "studentName": "王彦苏",
              "questionContext": "",
              "studentAnswer": "oritical",
              "correctAnswer": "critical",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747509",
              "studentName": "姜纾雯",
              "questionContext": "",
              "studentAnswer": "critcal",
              "correctAnswer": "critical",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-023",
          "text": "life",
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
          "typicalMistakes": [
            {
              "studentId": "24747540",
              "studentName": "张湑",
              "questionContext": "",
              "studentAnswer": "lites",
              "correctAnswer": "life",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "",
              "studentAnswer": "ife",
              "correctAnswer": "life",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "lift",
              "correctAnswer": "life",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "Hfe",
              "correctAnswer": "life",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747533",
              "studentName": "杨鲁宁",
              "questionContext": "",
              "studentAnswer": "lite",
              "correctAnswer": "life",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-024",
          "text": "community",
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
          "typicalMistakes": [
            {
              "studentId": "24747505",
              "studentName": "崔健坤",
              "questionContext": "",
              "studentAnswer": "commuity",
              "correctAnswer": "community",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747537",
              "studentName": "张偲怡",
              "questionContext": "",
              "studentAnswer": "comerunity",
              "correctAnswer": "community",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747540",
              "studentName": "张湑",
              "questionContext": "",
              "studentAnswer": "commuunity,",
              "correctAnswer": "community",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "com unity",
              "correctAnswer": "community",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747505",
              "studentName": "崔健坤",
              "questionContext": "假设你是红星中学高三学生李华。你的外国好友Jim即将参加主题为“Skills Needed for a Sustainable Future”的联合国青年论坛（UN Youth Forum），为此发来",
              "studentAnswer": "commuity",
              "correctAnswer": "community",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-025",
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
          "typicalMistakes": [
            {
              "studentId": "24747503",
              "studentName": "蔡欣怡",
              "questionContext": "",
              "studentAnswer": "thu",
              "correctAnswer": "the",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747502",
              "studentName": "白昀凡",
              "questionContext": "",
              "studentAnswer": "tue",
              "correctAnswer": "the",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747510",
              "studentName": "蒋逸晗",
              "questionContext": "",
              "studentAnswer": "te",
              "correctAnswer": "the",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "tue",
              "correctAnswer": "the",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747504",
              "studentName": "陈佳静",
              "questionContext": "",
              "studentAnswer": "te",
              "correctAnswer": "the",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-026",
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
          "typicalMistakes": [
            {
              "studentId": "24747531",
              "studentName": "魏梓洲",
              "questionContext": "",
              "studentAnswer": "efficlincy",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747522",
              "studentName": "尚子欣",
              "questionContext": "",
              "studentAnswer": "efficenty",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747543",
              "studentName": "赵玉琪",
              "questionContext": "",
              "studentAnswer": "efficieny",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747546",
              "studentName": "朱一迪",
              "questionContext": "",
              "studentAnswer": "eficiency",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "",
              "studentAnswer": "effiemy",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-027",
          "text": "green",
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
          "typicalMistakes": [
            {
              "studentId": "24747505",
              "studentName": "崔健坤",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "gree",
              "correctAnswer": "green",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "27906857",
              "studentName": "陈录妍",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "greenful",
              "correctAnswer": "green",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "geen",
              "correctAnswer": "green",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747530",
              "studentName": "王梓瑶",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "greer-",
              "correctAnswer": "green",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "27906857",
              "studentName": "陈录妍",
              "questionContext": "",
              "studentAnswer": "greenful",
              "correctAnswer": "green",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-028",
          "text": "strengthen",
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
          "typicalMistakes": [
            {
              "studentId": "24747532",
              "studentName": "吴若葭",
              "questionContext": "",
              "studentAnswer": "sthrengthen",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747527",
              "studentName": "王彦苏",
              "questionContext": "",
              "studentAnswer": "strenthen",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747543",
              "studentName": "赵玉琪",
              "questionContext": "",
              "studentAnswer": "strenghthen",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747502",
              "studentName": "白昀凡",
              "questionContext": "",
              "studentAnswer": "strenghten",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747517",
              "studentName": "刘琨奕",
              "questionContext": "",
              "studentAnswer": "strenghthen",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-029",
          "text": "your",
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
          "typicalMistakes": [
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "",
              "studentAnswer": "yar",
              "correctAnswer": "your",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747510",
              "studentName": "蒋逸晗",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "yur",
              "correctAnswer": "your",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747510",
              "studentName": "蒋逸晗",
              "questionContext": "",
              "studentAnswer": "yur",
              "correctAnswer": "your",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "",
              "studentAnswer": "sar",
              "correctAnswer": "your",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747536",
              "studentName": "杨依诺",
              "questionContext": "",
              "studentAnswer": "yur",
              "correctAnswer": "your",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-030",
          "text": "different",
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
          "typicalMistakes": [
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "Apart from what is mentioned in the passage, what else contributes to problem-solving? (In about 40 ",
              "studentAnswer": "diferent",
              "correctAnswer": "different",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "differenc",
              "correctAnswer": "different",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747513",
              "studentName": "李韵然",
              "questionContext": "",
              "studentAnswer": "dfferent",
              "correctAnswer": "different",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747513",
              "studentName": "李韵然",
              "questionContext": "",
              "studentAnswer": "differut",
              "correctAnswer": "different",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747509",
              "studentName": "姜纾雯",
              "questionContext": "",
              "studentAnswer": "deffere",
              "correctAnswer": "different",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-031",
          "text": "article",
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
          "typicalMistakes": [
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "",
              "studentAnswer": "artical",
              "correctAnswer": "article",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747530",
              "studentName": "王梓瑶",
              "questionContext": "",
              "studentAnswer": "artical",
              "correctAnswer": "article",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "",
              "studentAnswer": "artical",
              "correctAnswer": "article",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "",
              "studentAnswer": "cuticle",
              "correctAnswer": "article",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "",
              "studentAnswer": "artical",
              "correctAnswer": "article",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-032",
          "text": "challenges",
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
          "typicalMistakes": [
            {
              "studentId": "24747540",
              "studentName": "张湑",
              "questionContext": "",
              "studentAnswer": "hallenges",
              "correctAnswer": "challenges",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747540",
              "studentName": "张湑",
              "questionContext": "",
              "studentAnswer": "challen",
              "correctAnswer": "challenges",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747509",
              "studentName": "姜纾雯",
              "questionContext": "",
              "studentAnswer": "challang",
              "correctAnswer": "challenges",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747517",
              "studentName": "刘琨奕",
              "questionContext": "Apart from what is mentioned in the passage, what else contributes to problem-solving? (In about 40 ",
              "studentAnswer": "challages",
              "correctAnswer": "challenges",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-033",
          "text": "share",
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
          "typicalMistakes": [
            {
              "studentId": "24747540",
              "studentName": "张湑",
              "questionContext": "",
              "studentAnswer": "shore",
              "correctAnswer": "share",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747545",
              "studentName": "周泽睿",
              "questionContext": "",
              "studentAnswer": "shore",
              "correctAnswer": "share",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "",
              "studentAnswer": "slave",
              "correctAnswer": "share",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "slave",
              "correctAnswer": "share",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-034",
          "text": "perseverance",
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
          "typicalMistakes": [
            {
              "studentId": "24747501",
              "studentName": "白恩齐",
              "questionContext": "",
              "studentAnswer": "perseverence",
              "correctAnswer": "perseverance",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747501",
              "studentName": "白恩齐",
              "questionContext": "",
              "studentAnswer": "perseverence",
              "correctAnswer": "perseverance",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747547",
              "studentName": "庄田",
              "questionContext": "",
              "studentAnswer": "preserverea",
              "correctAnswer": "perseverance",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747501",
              "studentName": "白恩齐",
              "questionContext": "Apart from what is mentioned in the passage, what else contributes to problem-solving? (In about 40 ",
              "studentAnswer": "perseverence",
              "correctAnswer": "perseverance",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在2名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-035",
          "text": "improving",
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
          "typicalMistakes": [
            {
              "studentId": "24747533",
              "studentName": "杨鲁宁",
              "questionContext": "",
              "studentAnswer": "i h oeing",
              "correctAnswer": "improving",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747536",
              "studentName": "杨依诺",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "improing",
              "correctAnswer": "improving",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747506",
              "studentName": "邓一畅",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "improvin",
              "correctAnswer": "improving",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "假设你是红星中学高三学生李华。你的外国好友Jim即将参加主题为“Skills Needed for a Sustainable Future”的联合国青年论坛（UN Youth Forum），为此发来",
              "studentAnswer": ", mprving",
              "correctAnswer": "improving",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-036",
          "text": "you",
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
          "typicalMistakes": [
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "",
              "studentAnswer": "yu",
              "correctAnswer": "you",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747522",
              "studentName": "尚子欣",
              "questionContext": "",
              "studentAnswer": "y You",
              "correctAnswer": "you",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747544",
              "studentName": "郑乐言",
              "questionContext": "",
              "studentAnswer": "youe",
              "correctAnswer": "you",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747531",
              "studentName": "魏梓洲",
              "questionContext": "",
              "studentAnswer": "yout",
              "correctAnswer": "you",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-037",
          "text": "also",
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
          "typicalMistakes": [
            {
              "studentId": "24747545",
              "studentName": "周泽睿",
              "questionContext": "",
              "studentAnswer": "ako",
              "correctAnswer": "also",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747540",
              "studentName": "张湑",
              "questionContext": "（人大附中作文题）假设你是红星中学高三学生李华，北京友协（BPAFFC）即将举行主题为“新科技·新生活”国际青少年短视频征集活动，请你给你的英国好友 Jim 写一封电子邮件，邀请他和你共同创作，邮件内",
              "studentAnswer": "aux",
              "correctAnswer": "also",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747536",
              "studentName": "杨依诺",
              "questionContext": "假设你是红星中学高三学生李华。你的外国好友Jim即将参加主题为“Skills Needed for a Sustainable Future”的联合国青年论坛（UN Youth Forum），为此发来",
              "studentAnswer": "a so",
              "correctAnswer": "also",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747537",
              "studentName": "张偲怡",
              "questionContext": "",
              "studentAnswer": "aslo",
              "correctAnswer": "also",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-038",
          "text": "promote",
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
          "typicalMistakes": [
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "",
              "studentAnswer": "promthea",
              "correctAnswer": "promote",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "",
              "studentAnswer": "promste",
              "correctAnswer": "promote",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "pm mote",
              "correctAnswer": "promote",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "",
              "studentAnswer": "promte",
              "correctAnswer": "promote",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在2名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-039",
          "text": "grammar",
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
          "typicalMistakes": [
            {
              "studentId": "24747505",
              "studentName": "崔健坤",
              "questionContext": "",
              "studentAnswer": "graymar",
              "correctAnswer": "grammar",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "",
              "studentAnswer": "grammer",
              "correctAnswer": "grammar",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747540",
              "studentName": "张湑",
              "questionContext": "",
              "studentAnswer": "gramar",
              "correctAnswer": "grammar",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747524",
              "studentName": "王晨希",
              "questionContext": "",
              "studentAnswer": "grammer",
              "correctAnswer": "grammar",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-040",
          "text": "traditional",
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
          "typicalMistakes": [
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "traditinal",
              "correctAnswer": "traditional",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747510",
              "studentName": "蒋逸晗",
              "questionContext": "",
              "studentAnswer": "traditiual",
              "correctAnswer": "traditional",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747527",
              "studentName": "王彦苏",
              "questionContext": "",
              "studentAnswer": "trational",
              "correctAnswer": "traditional",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747531",
              "studentName": "魏梓洲",
              "questionContext": "",
              "studentAnswer": "traditiol",
              "correctAnswer": "traditional",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-041",
          "text": "modern",
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
          "typicalMistakes": [
            {
              "studentId": "24747531",
              "studentName": "魏梓洲",
              "questionContext": "假设你是红星中学高三学生李华。你参加了题为“描绘城市色彩”( The Color of A City )的英语征文活动，你的外国好友Jim对你的征文内容很感兴趣，发来邮件询问。请你用英文给他回复，内容",
              "studentAnswer": "mordern",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747505",
              "studentName": "崔健坤",
              "questionContext": "",
              "studentAnswer": "morden",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747524",
              "studentName": "王晨希",
              "questionContext": "",
              "studentAnswer": "worden",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "",
              "studentAnswer": "mordern",
              "correctAnswer": "modern",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-042",
          "text": "thrilled",
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
          "typicalMistakes": [
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "thrlled",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "",
              "studentAnswer": "thilled",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "",
              "studentAnswer": "thilled",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747504",
              "studentName": "陈佳静",
              "questionContext": "",
              "studentAnswer": "thrill",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-043",
          "text": "better",
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
          "typicalMistakes": [
            {
              "studentId": "24747510",
              "studentName": "蒋逸晗",
              "questionContext": "",
              "studentAnswer": "bottr",
              "correctAnswer": "better",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "",
              "studentAnswer": "beter",
              "correctAnswer": "better",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747540",
              "studentName": "张湑",
              "questionContext": "",
              "studentAnswer": "-Beters",
              "correctAnswer": "better",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747533",
              "studentName": "杨鲁宁",
              "questionContext": "",
              "studentAnswer": "6 (ver",
              "correctAnswer": "better",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-044",
          "text": "knowledge",
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
          "typicalMistakes": [
            {
              "studentId": "24747545",
              "studentName": "周泽睿",
              "questionContext": "",
              "studentAnswer": "knowledg",
              "correctAnswer": "knowledge",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747504",
              "studentName": "陈佳静",
              "questionContext": "",
              "studentAnswer": "knowleadge",
              "correctAnswer": "knowledge",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747509",
              "studentName": "姜纾雯",
              "questionContext": "",
              "studentAnswer": "knowlea",
              "correctAnswer": "knowledge",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747510",
              "studentName": "蒋逸晗",
              "questionContext": "假设你是红星中学高三学生李华。你的外国好友Jim即将参加主题为“Skills Needed for a Sustainable Future”的联合国青年论坛（UN Youth Forum），为此发来",
              "studentAnswer": "knowege",
              "correctAnswer": "knowledge",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-045",
          "text": "glad",
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
          "typicalMistakes": [
            {
              "studentId": "24747512",
              "studentName": "李宇泽",
              "questionContext": "",
              "studentAnswer": "glat",
              "correctAnswer": "glad",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747520",
              "studentName": "吕正泽",
              "questionContext": "",
              "studentAnswer": "dad",
              "correctAnswer": "glad",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747536",
              "studentName": "杨依诺",
              "questionContext": "",
              "studentAnswer": "dad",
              "correctAnswer": "glad",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747527",
              "studentName": "王彦苏",
              "questionContext": "",
              "studentAnswer": "ad",
              "correctAnswer": "glad",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-046",
          "text": "detail",
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
          "typicalMistakes": [
            {
              "studentId": "24747502",
              "studentName": "白昀凡",
              "questionContext": "",
              "studentAnswer": "detials",
              "correctAnswer": "detail",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747517",
              "studentName": "刘琨奕",
              "questionContext": "",
              "studentAnswer": "deta' l s",
              "correctAnswer": "detail",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747502",
              "studentName": "白昀凡",
              "questionContext": "",
              "studentAnswer": "detials",
              "correctAnswer": "detail",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747531",
              "studentName": "魏梓洲",
              "questionContext": "",
              "studentAnswer": "detauls",
              "correctAnswer": "detail",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-047",
          "text": "cooperating",
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
          "typicalMistakes": [
            {
              "studentId": "24747536",
              "studentName": "杨依诺",
              "questionContext": "",
              "studentAnswer": "cooporating",
              "correctAnswer": "cooperating",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747504",
              "studentName": "陈佳静",
              "questionContext": "Apart from what is mentioned in the passage, what else contributes to problem-solving? (In about 40 ",
              "studentAnswer": "comperating",
              "correctAnswer": "cooperating",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747536",
              "studentName": "杨依诺",
              "questionContext": "",
              "studentAnswer": "cooporating",
              "correctAnswer": "cooperating",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747504",
              "studentName": "陈佳静",
              "questionContext": "",
              "studentAnswer": "coperate",
              "correctAnswer": "cooperating",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在2名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-048",
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
          "typicalMistakes": [
            {
              "studentId": "24747536",
              "studentName": "杨依诺",
              "questionContext": "",
              "studentAnswer": "suggetions",
              "correctAnswer": "suggestions",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747525",
              "studentName": "王婧涵",
              "questionContext": "",
              "studentAnswer": "suggestims",
              "correctAnswer": "suggestions",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747517",
              "studentName": "刘琨奕",
              "questionContext": "",
              "studentAnswer": "suggestious",
              "correctAnswer": "suggestions",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747540",
              "studentName": "张湑",
              "questionContext": "",
              "studentAnswer": "suggention",
              "correctAnswer": "suggestions",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-049",
          "text": "responsibility",
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
          "typicalMistakes": [
            {
              "studentId": "24747509",
              "studentName": "姜纾雯",
              "questionContext": "",
              "studentAnswer": "respostbility",
              "correctAnswer": "responsibility",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "vesponsibilites",
              "correctAnswer": "responsibility",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747507",
              "studentName": "范家瑜",
              "questionContext": "",
              "studentAnswer": "resinsisilny",
              "correctAnswer": "responsibility",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747522",
              "studentName": "尚子欣",
              "questionContext": "",
              "studentAnswer": "responsiblity",
              "correctAnswer": "responsibility",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        }
      ],
      "weakStudents": [
        {
          "id": "24747538",
          "name": "张浩然",
          "scoreRate": 79.2,
          "weakWords": [
            "truly",
            "solve",
            "writing",
            "laborer/labourer",
            "technology",
            "environmental",
            "skills",
            "technologies"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共34次拼写错误，涉及32个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747504",
          "name": "陈佳静",
          "scoreRate": 78.0,
          "weakWords": [
            "truly",
            "solve",
            "writing",
            "laborer/labourer",
            "technology",
            "environmental",
            "skills",
            "technologies"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共36次拼写错误，涉及34个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747513",
          "name": "李韵然",
          "scoreRate": 74.3,
          "weakWords": [
            "truly",
            "solve",
            "writing",
            "laborer/labourer",
            "technology",
            "environmental",
            "skills",
            "technologies"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共42次拼写错误，涉及38个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 26,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747501",
          "name": "白恩齐",
          "scoreRate": 73.1,
          "weakWords": [
            "truly",
            "solve",
            "writing",
            "laborer/labourer",
            "technology",
            "environmental",
            "skills",
            "technologies"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共44次拼写错误，涉及39个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 27,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747502",
          "name": "白昀凡",
          "scoreRate": 72.4,
          "weakWords": [
            "truly",
            "solve",
            "writing",
            "laborer/labourer",
            "technology",
            "environmental",
            "skills",
            "technologies"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共45次拼写错误，涉及40个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747531",
          "name": "魏梓洲",
          "scoreRate": 64.5,
          "weakWords": [
            "truly",
            "solve",
            "writing",
            "laborer/labourer",
            "technology",
            "environmental",
            "skills",
            "technologies"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共58次拼写错误，涉及55个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747505",
          "name": "崔健坤",
          "scoreRate": 63.3,
          "weakWords": [
            "truly",
            "solve",
            "writing",
            "laborer/labourer",
            "technology",
            "environmental",
            "skills",
            "technologies"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共60次拼写错误，涉及55个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747522",
          "name": "尚子欣",
          "scoreRate": 63.3,
          "weakWords": [
            "truly",
            "solve",
            "writing",
            "laborer/labourer",
            "technology",
            "environmental",
            "skills",
            "technologies"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共60次拼写错误，涉及60个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747540",
          "name": "张湑",
          "scoreRate": 62.0,
          "weakWords": [
            "truly",
            "solve",
            "writing",
            "laborer/labourer",
            "technology",
            "environmental",
            "skills",
            "technologies"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共62次拼写错误，涉及54个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747510",
          "name": "蒋逸晗",
          "scoreRate": 57.8,
          "weakWords": [
            "truly",
            "solve",
            "writing",
            "laborer/labourer",
            "technology",
            "environmental",
            "skills",
            "technologies"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共69次拼写错误，涉及66个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 43,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747525",
          "name": "王婧涵",
          "scoreRate": 55.3,
          "weakWords": [
            "truly",
            "solve",
            "writing",
            "laborer/labourer",
            "technology",
            "environmental",
            "skills",
            "technologies"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共73次拼写错误，涉及63个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 45,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747520",
          "name": "吕正泽",
          "scoreRate": 49.2,
          "weakWords": [
            "truly",
            "solve",
            "writing",
            "laborer/labourer",
            "technology",
            "environmental",
            "skills",
            "technologies"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共83次拼写错误，涉及74个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 51,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747536",
          "name": "杨依诺",
          "scoreRate": 38.2,
          "weakWords": [
            "truly",
            "solve",
            "writing",
            "laborer/labourer",
            "technology",
            "environmental",
            "skills",
            "technologies"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共101次拼写错误，涉及86个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 62,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747507",
          "name": "范家瑜",
          "scoreRate": 10.0,
          "weakWords": [
            "truly",
            "solve",
            "writing",
            "laborer/labourer",
            "technology",
            "environmental",
            "skills",
            "technologies"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共147次拼写错误，涉及128个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 90,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        }
      ],
      "goodStudents": [
        {
          "id": "24747534",
          "name": "杨明涵",
          "scoreRate": 96.9,
          "masteredCount": 5,
          "highlight": "词汇拼写错误较少，仅5次",
          "stability": "stable"
        },
        {
          "id": "27906857",
          "name": "陈录妍",
          "scoreRate": 94.5,
          "masteredCount": 7,
          "highlight": "词汇拼写错误较少，仅9次",
          "stability": "stable"
        },
        {
          "id": "24747544",
          "name": "郑乐言",
          "scoreRate": 93.9,
          "masteredCount": 7,
          "highlight": "词汇拼写错误较少，仅10次",
          "stability": "stable"
        },
        {
          "id": "24747512",
          "name": "李宇泽",
          "scoreRate": 92.0,
          "masteredCount": 12,
          "highlight": "词汇拼写错误较少，仅13次",
          "stability": "stable"
        },
        {
          "id": "24747508",
          "name": "贺云舒",
          "scoreRate": 91.4,
          "masteredCount": 14,
          "highlight": "词汇拼写错误较少，仅14次",
          "stability": "stable"
        },
        {
          "id": "24747530",
          "name": "王梓瑶",
          "scoreRate": 90.2,
          "masteredCount": 16,
          "highlight": "词汇拼写错误较少，仅16次",
          "stability": "stable"
        },
        {
          "id": "24747506",
          "name": "邓一畅",
          "scoreRate": 90.2,
          "masteredCount": 16,
          "highlight": "词汇拼写错误较少，仅16次",
          "stability": "stable"
        },
        {
          "id": "24747547",
          "name": "庄田",
          "scoreRate": 89.6,
          "masteredCount": 17,
          "highlight": "词汇拼写错误较少，仅17次",
          "stability": "stable"
        },
        {
          "id": "24747527",
          "name": "王彦苏",
          "scoreRate": 86.5,
          "masteredCount": 21,
          "highlight": "词汇拼写错误较少，仅22次",
          "stability": "stable"
        },
        {
          "id": "24747503",
          "name": "蔡欣怡",
          "scoreRate": 86.5,
          "masteredCount": 22,
          "highlight": "词汇拼写错误较少，仅22次",
          "stability": "stable"
        }
      ],
      "interventionRecords": []
    },
    "writing": {
      "classId": "class-2023级R5班",
      "className": "2023级R5班",
      "unitId": "real-data",
      "unitName": "平台真实数据",
      "timeRange": "30d",
      "updatedAt": "2026-06-11 11:30",
      "summary": "2023级R5班 共 34 名学生，6271 条应用文批改记录，平均 59.6 分。主要问题「词汇表达弱 / 用词单一」(45.4%)，薄弱学生 14 人。",
      "metrics": {
        "averageScore": 59.6,
        "averageLevel": "C",
        "reviewedEssayCount": 6271,
        "mainProblemType": "词汇表达弱 / 用词单一",
        "weakStudentCount": 14,
        "excellentEssayCount": 10
      },
      "problemTypes": [
        {
          "id": "pt-vocabulary_weak",
          "type": "vocabulary_weak",
          "label": "词汇表达弱 / 用词单一",
          "borderColor": "#8e7cc3",
          "bgColor": "#f6f0fc",
          "percent": 45.4,
          "affectedStudentCount": 34,
          "typicalPerformance": "(2846/6271)",
          "aiReason": "共2846次，占比45.4%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "Greetings! I'm delighted to hear that you're interested in our school's activity",
            "The first part, all the school students participated in the formal sports meetin",
            "Everyone who made it to the podium received a well-designed medal to reward thei"
          ]
        },
        {
          "id": "pt-language_accuracy",
          "type": "language_accuracy",
          "label": "语言准确性弱 / 语法错误多",
          "borderColor": "#7b9cd6",
          "bgColor": "#f0f4fc",
          "percent": 41.7,
          "affectedStudentCount": 34,
          "typicalPerformance": "(2612/6271)",
          "aiReason": "共2612次，占比41.7%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "The first part, all the school students participated in the formal sports meetin",
            "The first part, all the school students participated in the formal sports meetin",
            "The whole activity made m hausted but contented."
          ]
        },
        {
          "id": "pt-structure_unclear",
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "borderColor": "#f0a060",
          "bgColor": "#fef8f0",
          "percent": 8.4,
          "affectedStudentCount": 34,
          "typicalPerformance": "(525/6271)",
          "aiReason": "共525次，占比8.4%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "The whole activity made m hausted but contented.",
            "5-Do you have any activity similar?",
            "We should never let our attempt stays in fantasy, but to actually make it into r"
          ]
        },
        {
          "id": "pt-format_issue",
          "type": "format_issue",
          "label": "格式规范问题 / 应用文格式",
          "borderColor": "#9ab3cc",
          "bgColor": "#f5f7fa",
          "percent": 4.6,
          "affectedStudentCount": 34,
          "typicalPerformance": "(288/6271)",
          "aiReason": "共288次，占比4.6%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "During the first day, we stayed in our campus to play longy-rope jumping which i",
            "Through the process of discussion people can share their thoughts and discuss to",
            "Also it can be a process of cooperation, helping tue problem-solving more effect"
          ]
        }
      ],
      "highFrequencyIssues": [
        {
          "problemType": "vocabulary_weak",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "Greetings! I'm delighted to hear that you're interested in our school's activity \"When sports meet youth held last week.",
              "issueExplanation": "用词错误：用词错误",
              "revisionSuggestion": "建议把 sports meet youth 换成  Sports Meet Youth\" ",
              "improvedExample": "Greetings! I'm delighted to hear that you're interested in our school's activity \"When Sports Meet Youth\" held last week.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "The first part, all the school students participated in the formal sports meeting, competing for the champions of 5 traditional sports like sprints and high jumping.",
              "issueExplanation": "用词错误：用词错误",
              "revisionSuggestion": "建议把 champions 换成  championship ",
              "improvedExample": "In the first part, all the school students participated in the formal sports meeting, competing for the championship of 5 traditional sports like sprints and high jump.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "Everyone who made it to the podium received a well-designed medal to reward their strength and preserverea",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 preserverea 换成  perseverance. ",
              "improvedExample": "Everyone who made it to the podium received a well-designed medal to reward their strength and perseverance.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "After the sports meeting, we were led to the experience section to try some sports that differ to our daily exercise.",
              "issueExplanation": "固定搭配错误：固定搭配错误",
              "revisionSuggestion": "建议把 to 换成  from ",
              "improvedExample": "After the sports meeting, we were led to the experience section to try some sports that differ from our daily exercise.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "The whole activity made m hausted but contented.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 hausted 换成  exhausted ",
              "improvedExample": "The whole activity made me exhausted but content.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "Although I failed to obtain a medal in sprint, I experienced the feeling to be all in for the game and devoted to my goal.",
              "issueExplanation": "用词错误：用词错误",
              "revisionSuggestion": "建议把 sprint 换成  sprinting ",
              "improvedExample": "Although I failed to obtain a medal in sprinting, I experienced the feeling of being all in for the game and devoted to my goal.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "5-Do you have any activity similar?",
              "issueExplanation": "表达错误：表达冗余",
              "revisionSuggestion": "建议删除  5- ",
              "improvedExample": "Do you have any similar activities?",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "It's vital to actively taking actions in order to solve problems.",
              "issueExplanation": "用词错误：用词错误",
              "revisionSuggestion": "建议把 taking 换成  take ",
              "improvedExample": "It's vital to actively take actions in order to solve problems.",
              "score": 63.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "Though it's important to analyze the problems in our minds, putting your efforts into real life actions is the only way to test whether your assumption is effective or not.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把   换成  - ",
              "improvedExample": "Though it's important to analyze the problems in our minds, putting your efforts into real-life actions is the only way to test whether your assumption is effective or not.",
              "score": 63.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "We should never let our attempt stays in fantasy, but to actually make it into reality without the fear of making mistakes.",
              "issueExplanation": "表达错误：表达冗余",
              "revisionSuggestion": "建议删除  to ",
              "improvedExample": "We should never let our attempt stay in fantasy, but actually make it into reality without the fear of making mistakes.",
              "score": 63.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        },
        {
          "problemType": "language_accuracy",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "The first part, all the school students participated in the formal sports meeting, competing for the champions of 5 traditional sports like sprints and high jumping.",
              "issueExplanation": "词法错误：介词错误",
              "revisionSuggestion": "建议把 The 换成  In the ",
              "improvedExample": "In the first part, all the school students participated in the formal sports meeting, competing for the championship of 5 traditional sports like sprints and high jump.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "The first part, all the school students participated in the formal sports meeting, competing for the champions of 5 traditional sports like sprints and high jumping.",
              "issueExplanation": "词性误用：词性误用",
              "revisionSuggestion": "建议把 jumping 换成  jump ",
              "improvedExample": "In the first part, all the school students participated in the formal sports meeting, competing for the championship of 5 traditional sports like sprints and high jump.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "The whole activity made m hausted but contented.",
              "issueExplanation": "词性误用：词性误用",
              "revisionSuggestion": "建议把 contented 换成  content ",
              "improvedExample": "The whole activity made me exhausted but content.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "Although I failed to obtain a medal in sprint, I experienced the feeling to be all in for the game and devoted to my goal.",
              "issueExplanation": "非谓语动词错误：动名词错误",
              "revisionSuggestion": "建议把 to be 换成  of being ",
              "improvedExample": "Although I failed to obtain a medal in sprinting, I experienced the feeling of being all in for the game and devoted to my goal.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "Additionally, I tried to play tennis for the first time, but it has become my new passion these days.",
              "issueExplanation": "非谓语动词错误：动名词错误",
              "revisionSuggestion": "建议把 to play 换成  playing ",
              "improvedExample": "Additionally, I tried playing tennis for the first time, and it has become my new passion these days.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "Additionally, I tried to play tennis for the first time, but it has become my new passion these days.",
              "issueExplanation": "词法错误：连词错误",
              "revisionSuggestion": "建议把 but 换成  and ",
              "improvedExample": "Additionally, I tried playing tennis for the first time, and it has become my new passion these days.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24747517",
              "studentName": "刘琨奕",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "I'm so thrilled to hear that you are interest in our \"Sport Meet Youth\" event.",
              "issueExplanation": "词性误用：词性误用",
              "revisionSuggestion": "建议把 interest 换成  interested ",
              "improvedExample": "I'm so thrilled to hear that you are interested in our \"Sport Meet Youth\" event.",
              "score": 13.333334,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24747545",
              "studentName": "周泽睿",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "It included basketball shooting challenge, 3V3 football match, and so on.",
              "issueExplanation": "词法错误：冠词错误",
              "revisionSuggestion": "建议在 basketball 之前插入 a",
              "improvedExample": "It included a basketball shooting challenge, a 3v3 football match, and so on.",
              "score": 58.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24747545",
              "studentName": "周泽睿",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "It included basketball shooting challenge, 3V3 football match, and so on.",
              "issueExplanation": "词法错误：冠词错误",
              "revisionSuggestion": "建议把 3V3 换成  a 3v3 ",
              "improvedExample": "It included a basketball shooting challenge, a 3v3 football match, and so on.",
              "score": 58.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24747545",
              "studentName": "周泽睿",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "The games weren't big, but bring a lot of happiness and laughters arosed our playground.",
              "issueExplanation": "单复数错误：单复数错误",
              "revisionSuggestion": "建议把 laughters 换成  laughter ",
              "improvedExample": "The games weren't big, but brought a lot of happiness and laughter across our playground.",
              "score": 58.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        },
        {
          "problemType": "structure_unclear",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "The whole activity made m hausted but contented.",
              "issueExplanation": "句子结构错误：宾语错误",
              "revisionSuggestion": "建议把 m 换成  me ",
              "improvedExample": "The whole activity made me exhausted but content.",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "5-Do you have any activity similar?",
              "issueExplanation": "句子结构错误：语序错误",
              "revisionSuggestion": "建议把 activity similar 换成  similar activities ",
              "improvedExample": "Do you have any similar activities?",
              "score": 78.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24747547",
              "studentName": "庄田",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "We should never let our attempt stays in fantasy, but to actually make it into reality without the fear of making mistakes.",
              "issueExplanation": "句子结构错误：宾语补足语错误",
              "revisionSuggestion": "建议把 stays 换成  stay ",
              "improvedExample": "We should never let our attempt stay in fantasy, but actually make it into reality without the fear of making mistakes.",
              "score": 63.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24747545",
              "studentName": "周泽睿",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "The games weren't big, but bring a lot of happiness and laughters arosed our playground.",
              "issueExplanation": "句子结构错误：并列结构错误",
              "revisionSuggestion": "建议把 bring 换成  brought ",
              "improvedExample": "The games weren't big, but brought a lot of happiness and laughter across our playground.",
              "score": 58.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24747545",
              "studentName": "周泽睿",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "In the end, the school invited an expert in sport field and hold a QQ A session.",
              "issueExplanation": "句子结构错误：并列结构错误",
              "revisionSuggestion": "建议把 hold 换成  held ",
              "improvedExample": "In the end, the school invited an expert in the sports field and held a Q&A session.",
              "score": 58.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24747545",
              "studentName": "周泽睿",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "The whole event isn't long, but offered me with unforgettable moments during the games.",
              "issueExplanation": "句子结构错误：并列结构错误",
              "revisionSuggestion": "建议把 is 换成  was ",
              "improvedExample": "The whole event wasn't long, but offered me unforgettable moments during the games.",
              "score": 58.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24747505",
              "studentName": "崔健坤",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "However, the ture story is they had observed bird for years and did many times experiments, and finally reach the goal after several falure trying, that's the real problem-solving characters.",
              "issueExplanation": "句子结构错误：并列结构错误",
              "revisionSuggestion": "建议把 reach 换成  reached ",
              "improvedExample": "However, the true story is that they have observed birds for years and have done many experiments, and finally reached the goal after several failures, which shows the real problem-solving character.",
              "score": 7.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24747534",
              "studentName": "杨明涵",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "This event helps us to relieve the stress of academic challenges, left a joyful memory of our campus life, which benefits me a lot.",
              "issueExplanation": "句子结构错误：错误使用逗号连接两个完整句子",
              "revisionSuggestion": "建议把 , 换成  and ",
              "improvedExample": "This event helped us to relieve the stress of academic challenges and left a joyful memory of our campus life, which benefits me a lot.",
              "score": 64.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24747534",
              "studentName": "杨明涵",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "It also stimulates inspirations of people and give everyone the opportunity to show their talent.",
              "issueExplanation": "句子结构错误：并列结构错误",
              "revisionSuggestion": "建议把 give 换成  gives ",
              "improvedExample": "It also stimulates inspirations of people and gives everyone the opportunity to show their talent.",
              "score": 42.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24747510",
              "studentName": "蒋逸晗",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "I'm thrilled to hear that you're interested in our school's \"Sports me come across youth and let me share ome details.",
              "issueExplanation": "句子结构错误：宾语补足语错误",
              "revisionSuggestion": "建议把 me come across youth and let me share ome 换成  meet youth\" and let me share some ",
              "improvedExample": "I'm thrilled to hear that you're interested in our school's \"Sports meet youth\" and let me share some details.",
              "score": 55.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        },
        {
          "problemType": "format_issue",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24747505",
              "studentName": "崔健坤",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "During the first day, we stayed in our campus to play longy-rope jumping which involved all 5 classmates.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议在 which 之前插入 ,",
              "improvedExample": "During the first day, we stayed on our campus to play long rope jumping, which involved all 5 classmates.",
              "score": 49.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24747510",
              "studentName": "蒋逸晗",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "Through the process of discussion people can share their thoughts and discuss togetter, we can get different angles of a same problem, which extends our mindset.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议在 people 之前插入 ,",
              "improvedExample": "Through the process of discussion, people can share their thoughts and discuss together; we can get different angles of the same problem, which extends our mindset.",
              "score": 34.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24747510",
              "studentName": "蒋逸晗",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "Also it can be a process of cooperation, helping tue problem-solving more effective.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议在 it 之前插入 ,",
              "improvedExample": "Also, it can be a process of cooperation, helping the problem-solving become more effective.",
              "score": 34.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24747512",
              "studentName": "李宇泽",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "Such as I chose the 'running 1 km' so I need to run 2km everyda",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议在 so 之前插入 ,",
              "improvedExample": "For example, I chose 'running 1 km', so I need to run 2 km every day.",
              "score": 43.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24747543",
              "studentName": "赵玉琪",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "I'm delighted to hear that you are interested in the \"sports encounter Youth\" activity held in our school last week.",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 sports encounter 换成  Sports Encounter ",
              "improvedExample": "I'm delighted to hear that you are interested in the \"Sports Encounter Youth\" activity held in our school last week.",
              "score": 72.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24747543",
              "studentName": "赵玉琪",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "On Monday 5 and Wednesday, our school held all kinds of sports competition, including basketball, badminton, etc.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议把 5 换成  , Wednesday, ",
              "improvedExample": "On Monday, Wednesday, and Friday, our school held all kinds of sports competitions, including basketball, badminton, etc.",
              "score": 72.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24747520",
              "studentName": "吕正泽",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "I' thuihed to hear that you are interested in \"Exercises meet youth\" end I'm glad to g offer you some details.",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 youth 换成  Youth ",
              "improvedExample": "I'm thrilled to hear that you are interested in \"Exercises meet Youth\" and I'm glad to offer you some details.",
              "score": 43.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24747520",
              "studentName": "吕正泽",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "Besides, Cooperation is also helps because we can gather our views end discuss to make problem-soling more effiency.",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 Cooperation 换成  cooperation ",
              "improvedExample": "Besides, cooperation also helps because we can gather our views and discuss to make problem-solving more efficient.",
              "score": 19.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24747507",
              "studentName": "范家瑜",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "Here are some sit-atoms, last week, we held diverse eyes indludy trek races, 5 badunton watches, and greg run goes.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议把 , 换成  : ",
              "improvedExample": "Here are some situations: last week, we held diverse events including track races, 5 badminton matches, and group run games.",
              "score": 43.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24747509",
              "studentName": "姜纾雯",
              "essayTitle": "东城区2025-2026学年度第一学期期末统一检测",
              "taskName": "东城区2025-2026学年度第一学期期末统一检测",
              "writingType": "practical",
              "originalText": "0 Through this event, I ave gained a deep insight into excercise, it is not only a perfect way to build a strong body by boost muscles, but also a way to relieve mental stress.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议删除  0 ",
              "improvedExample": "Through this event, I have gained a deep insight into exercise; it is not only a perfect way to build a strong body by boosting muscles, but also a way to relieve mental stress.",
              "score": 61.0,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        }
      ],
      "weakStudents": [
        {
          "id": "24747507",
          "name": "范家瑜",
          "averageScore": 43.4,
          "level": "D",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 76.8
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 16.8
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 5.2
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 1.2
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747502",
          "name": "白昀凡",
          "averageScore": 44.1,
          "level": "D",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 42.5
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 42.5
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 9.8
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 5.2
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 34.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 34.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 34.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 34.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 34.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747520",
          "name": "吕正泽",
          "averageScore": 47.0,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 55.6
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 32.1
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 6.6
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 5.6
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747525",
          "name": "王婧涵",
          "averageScore": 49.0,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 55.3
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 33.2
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 8.3
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 3.2
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 7.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 7.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 7.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 7.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 7.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747512",
          "name": "李宇泽",
          "averageScore": 50.4,
          "level": "C",
          "mainProblemTypes": [
            "语言准确性弱 / 语法错误多",
            "词汇表达弱 / 用词单一",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 52.4
            },
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 30.4
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 13.2
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 4.0
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747505",
          "name": "崔健坤",
          "averageScore": 51.6,
          "level": "C",
          "mainProblemTypes": [
            "语言准确性弱 / 语法错误多",
            "词汇表达弱 / 用词单一",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 46.6
            },
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 39.5
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 7.1
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 6.8
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 7.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 7.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 7.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 7.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 7.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747538",
          "name": "张浩然",
          "averageScore": 53.7,
          "level": "C",
          "mainProblemTypes": [
            "语言准确性弱 / 语法错误多",
            "词汇表达弱 / 用词单一",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 46.4
            },
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 35.9
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 9.9
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 7.7
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 74.21071,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 74.21071,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 74.21071,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 74.21071,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 74.21071,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747519",
          "name": "卢子萌",
          "averageScore": 55.4,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 46.0
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 41.0
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 10.0
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 3.0
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 49.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 49.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 49.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 49.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 49.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747527",
          "name": "王彦苏",
          "averageScore": 56.5,
          "level": "C",
          "mainProblemTypes": [
            "语言准确性弱 / 语法错误多",
            "词汇表达弱 / 用词单一",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 52.3
            },
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 38.9
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 4.7
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 4.0
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 46.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 46.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 46.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 46.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 46.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747504",
          "name": "陈佳静",
          "averageScore": 56.9,
          "level": "C",
          "mainProblemTypes": [
            "语言准确性弱 / 语法错误多",
            "词汇表达弱 / 用词单一",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 50.4
            },
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 39.7
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 7.0
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 2.9
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 45.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 45.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 45.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 45.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 45.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747531",
          "name": "魏梓洲",
          "averageScore": 57.1,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 52.5
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 35.1
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 7.9
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 4.5
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 16.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 16.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 16.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 16.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 16.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747540",
          "name": "张湑",
          "averageScore": 58.2,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 51.4
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 37.5
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 6.3
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 4.7
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 28.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 28.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 28.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 28.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 28.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747533",
          "name": "杨鲁宁",
          "averageScore": 58.6,
          "level": "C",
          "mainProblemTypes": [
            "语言准确性弱 / 语法错误多",
            "词汇表达弱 / 用词单一",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 49.8
            },
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 38.9
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 8.1
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 3.3
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 43.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747517",
          "name": "刘琨奕",
          "averageScore": 59.4,
          "level": "C",
          "mainProblemTypes": [
            "语言准确性弱 / 语法错误多",
            "词汇表达弱 / 用词单一",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 48.6
            },
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 40.8
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 5.6
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 4.9
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 13.333334,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 13.333334,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 13.333334,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 31.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 31.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        }
      ],
      "excellentWritings": [
        {
          "id": "ew-747537",
          "studentId": "24747537",
          "studentName": "张偲怡",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "score": 88.68975,
          "level": "A",
          "highlights": "得分88.68975分",
          "excerpt": "{Dear Jim,\\n\\nThank you for your letter and your interest in the \\\"Painting China with Intelligence\\\" technology-enabled original works contest. I'm excited to tell you about my project.\\n\\nMy original work is a digital animation created using AI painting and motion design tools. I combined traditional Chinese ink-wash aesthetics with advanced technology to bring new life to a timeless icon. Using generative AI, I recreated celestial figures like the Dunhuang Flying Apsaras, who dance gracefully",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747524",
          "studentId": "24747524",
          "studentName": "王晨希",
          "essayTitle": "4月22日 英语测练-作文",
          "taskName": "4月22日 英语测练-作文",
          "writingType": "practical",
          "score": 87.79199,
          "level": "A",
          "highlights": "得分87.79199分，含佳句",
          "excerpt": "{Dear Jim,\\n\\nI'm writing to reply to your question about the speech content for the UN Youth Forum themed \\\"Skills Needed for a Sustainable Future.\\\" I'm glad to share my thoughts with you.\\n\\nTo build a sustainable future, I believe two sets of skills are very important. First, technological innovation is the backbone of progress. Cutting-edge research allows us to tackle pressing challenges from climate change to public health. Second, empathy and compassion are also essential to ensure that ",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747503",
          "studentId": "24747503",
          "studentName": "蔡欣怡",
          "essayTitle": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
          "taskName": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
          "writingType": "practical",
          "score": 87.0,
          "level": "A",
          "highlights": "得分87.0分，含佳句",
          "excerpt": "{Dear Jim,\\n\\nI'm glad to share with you my insight on \\\"The Color of A City\\\". When it comes to my choice of the color of a city, green Beijing pops into my mind without any doubt.\\n\\nFirst and foremost, numerous trees planted along the roads represent Beijing's vibrant green appearance. Walking into this city, you will be greeted by its lush greenery. More urban parks are emerging, breathing a steady stream of green life into this bustling city and embodying the city's commitment to ecological",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747537",
          "studentId": "24747537",
          "studentName": "张偲怡",
          "essayTitle": "4月29日 英语测练",
          "taskName": "4月29日 英语测练",
          "writingType": "practical",
          "score": 85.37534,
          "level": "A",
          "highlights": "得分85.37534分",
          "excerpt": "{Subject: Advice on Choosing a Major\\n\\nDear Jim,\\n\\nI heard that you are struggling with choosing a major because of the changes in employment caused by the rise of artificial intelligence. I'd like to offer you some suggestions.\\n\\nFrom my perspective, Smart Environment is a good choice. It is an interdisciplinary field that uses big data and AI to tackle environmental challenges while requiring global cooperation. I believe this path will help you build a meaningful career that serves both th",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747544",
          "studentId": "24747544",
          "studentName": "郑乐言",
          "essayTitle": "4月22日 英语测练",
          "taskName": "4月22日 英语测练",
          "writingType": "practical",
          "score": 85.12253,
          "level": "A",
          "highlights": "得分85.12253分，含佳句",
          "excerpt": "{Hi Jim,\\n\\nThanks for your email asking about the skills needed for the \\\"Skills Needed for a Sustainable Future\\\" forum. I'm happy to share my thoughts with you.\\n\\nI believe that creativity and lifelong learning are very important skills for a sustainable future. We live in a constantly changing world, so being creative helps us find new ways to solve problems like global warming. For example, instead of just following the \\\"three-Rs\\\" principle, we can upcycle used items or invent more effic",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-906857",
          "studentId": "27906857",
          "studentName": "陈录妍",
          "essayTitle": "4月29日 英语测练",
          "taskName": "4月29日 英语测练",
          "writingType": "practical",
          "score": 85.0967,
          "level": "A",
          "highlights": "得分85.0967分，含佳句",
          "excerpt": "{Subject: Advice on Choosing a Major\\n\\nDear Jim,\\n\\nI'm glad to hear from you and understand that you feel confused about choosing a major because of the changes AI is bringing to employment. Since you asked for my advice, I'd like to share my thoughts.\\n\\nI strongly recommend you choose law as your major. With the rise of AI, many new legal challenges are appearing, such as privacy issues, intellectual property disputes, and ethical problems. Society desperately needs sharp legal minds who und",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747524",
          "studentId": "24747524",
          "studentName": "王晨希",
          "essayTitle": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
          "taskName": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
          "writingType": "practical",
          "score": 85.0,
          "level": "A",
          "highlights": "得分85.0分，含佳句",
          "excerpt": "{Dear Jim,\\n\\nI'm thrilled to hear you're interested in my article for The Color of a City. It's my great pleasure to share my idea with you.\\n\\nThe city I want to write about is Beijing, and its representative color is red. Red perfectly blends Beijing's profound traditional culture and vibrant modern energy. When wandering in the ancient Hutongs, I'm always struck by the classic red walls and gates, along with locals in elegant red Hanfu. These scenes carry the city's long history and unique c",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747534",
          "studentId": "24747534",
          "studentName": "杨明涵",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "score": 84.02716,
          "level": "A",
          "highlights": "得分84.02716分，含佳句",
          "excerpt": "{Dear Jim,\\n\\nThank you for your letter and your interest in my participation in the \\\"Painting China with Intelligence\\\" technology-driven original works contest. I am happy to share with you some details about my project.\\n\\nMy work is a short video created with the help of AI, showing the transformations of China over thousands of years. It highlights how technology is deeply integrated into our daily lives, with AI quietly becoming a part of everyday experiences. The video presents a seamles",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747534",
          "studentId": "24747534",
          "studentName": "杨明涵",
          "essayTitle": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
          "taskName": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
          "writingType": "practical",
          "score": 84.0,
          "level": "A",
          "highlights": "得分84.0分，含佳句",
          "excerpt": "{Dear Jim,\\n\\nI'm more than delighted to hear you're interested in my essay \\\"The Color of a City.\\\" Born and raised in Beijing, I feel a deep sense of belonging to this city. So I chose Beijing and its vibrant green color as the theme.\\n\\nAs the capital of China, Beijing has made great efforts to tackle environmental issues and build a greener city. With the support of the government, more and more urban parks have been established recently, bringing a gush of green into this vibrant city. Furt",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747544",
          "studentId": "24747544",
          "studentName": "郑乐言",
          "essayTitle": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
          "taskName": "北京朝阳2025~2026学年度第一学期期末质量检测-大作文",
          "writingType": "practical",
          "score": 84.0,
          "level": "A",
          "highlights": "得分84.0分，含佳句",
          "excerpt": "{Dear Jim,\\n\\nHow lovely to know you're interested in my essay \\\"The Color of A City,\\\" and I'd love to tell you more about it.\\n\\nI chose Brisbane, a city that lies on the coast of Australia. I featured it through the lens of green.\\n\\nBrisbane wears green like its second skin. Its rivers are flanked by verdant riverfront parks, while rainforests on the outskirts hold lush ferns and broad-leafed plants. This green isn't just visual; it's the feeling of fresh sea breezes carrying the scent of gr",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        }
      ],
      "recommendedResources": [
        {
          "id": "res-w-1",
          "title": "应用文写作模板训练",
          "resourceType": "writing_practice",
          "tags": [
            "写作",
            "应用文"
          ],
          "difficulty": "medium",
          "grade": "高二",
          "recommendReason": "针对词汇表达弱 / 用词单一设计",
          "canPreview": true,
          "canAssign": true,
          "canAddToPaperBasket": true
        }
      ],
      "generatedSamples": [
        {
          "id": "gs-1",
          "level": "basic",
          "title": "基础版 — 吕正泽的作文",
          "content": "{Subject: Advice on Choosing a Major\\n\\nDear Jim,\\n\\nI hope this email finds you well. I understand that you are confused about choosing a major because of the changes in employment caused by the rise of artificial intelligence. I would like to offer you some advice.\\n\\nI really recommend you choose Environmental Science as your major. It is an interdisciplinary field that uses big data and AI to tackle environmental challenges and requires global cooperation.\\n\\nThere are several reasons for this choice. First, it helps develop data literacy and environmental responsibility, which are important skills for promoting green consumption and sustainable development. Second, it fosters cross-cultural empathy, as understanding people from different cultural backgrounds is essential in this field.\\n\\nWhat are your thoughts? I look forward to your reply.\\n\\nBest regards,\\nLi Hua}",
          "highlights": "得分49.671837分 | 适合基础薄弱学生参考基本结构",
          "suitableFor": "20分以下",
          "editable": true
        },
        {
          "id": "gs-2",
          "level": "improved",
          "title": "提升版 — 王梓瑶的作文",
          "content": "{Greetings! I'm glad to hear that you're going to participate in the UN Youth Forum. As the theme is \\\"Skills Needed for a Sustainable Future,\\\" here are my ideas.\\n\\nI think critical thinking is an important skill because it can help us consider things from both sides. For example, when we talk about sustainable development, it's not only important to develop the economy and build a stronger country, but also to pay attention to the environment and use green resources. Besides, speaking skills are also needed in order to express what we're thinking and make people understand and support us.\\n\\nI hope these skills can help you prepare for your speech. What do you think of my ideas? Looking forward to your reply.}",
          "highlights": "得分65.745544分 | 展示中等水平如何组织内容和句式",
          "suitableFor": "20-25分",
          "editable": true
        },
        {
          "id": "gs-3",
          "level": "excellent",
          "title": "优秀版 — 张偲怡的作文",
          "content": "{Dear Jim,\\n\\nThank you for your letter and your interest in the \\\"Painting China with Intelligence\\\" technology-enabled original works contest. I'm excited to tell you about my project.\\n\\nMy original work is a digital animation created using AI painting and motion design tools. I combined traditional Chinese ink-wash aesthetics with advanced technology to bring new life to a timeless icon. Using generative AI, I recreated celestial figures like the Dunhuang Flying Apsaras, who dance gracefully with flowing silk ribbons against a soft, starry background.\\n\\nParticipating in this contest was a rewarding experience. I realized that technology is not only about coding but also a powerful bridge connecting the past and the present. Seeing these traditional figures come alive in a new form filled me with pride in our culture, and I hope to share more of our heritage with the world through such innovative ways.\\n\\nLooking forward to hearing from you soon!\\n\\nBest wishes,\\nLi Hua}",
          "highlights": "得分88.68975分 | 展示高分作文的表达水平",
          "suitableFor": "25+分",
          "editable": true
        }
      ],
      "interventionRecords": []
    }
  },
  "2023级A17班": {
    "vocabulary": {
      "classId": "class-2023级A17班",
      "className": "2023级A17班",
      "unitId": "real-data",
      "unitName": "平台真实数据",
      "timeRange": "30d",
      "updatedAt": "2026-06-11 11:30",
      "summary": "2023级A17班 共 38 名学生，1129 条词汇错误记录，涉及 723 个词。薄弱学生 21 人，建议重点加强默写和拼写训练。",
      "metrics": {
        "practicedWordCount": 723,
        "weakWordCount": 50,
        "weakStudentCount": 21,
        "mainWeakType": "拼不对 / 默写错误"
      },
      "errorTypes": [
        {
          "type": "spelling",
          "label": "拼不对 / 默写错误",
          "percent": 100,
          "affectedStudentCount": 35,
          "exampleWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing"
          ],
          "aiReason": "平台数据错因均为'不会写'，归类为拼写错误。2023级A17班共1129条拼写错误记录。",
          "recommendedActions": [
            "默写",
            "词汇复习规划",
            "组卷"
          ],
          "borderColor": "#f0a060",
          "bgColor": "#fef8f0"
        }
      ],
      "weakWords": [
        {
          "id": "ww-000",
          "text": "laborer/labourer",
          "itemType": "word",
          "scoreRate": 10.0,
          "errorRate": 90.0,
          "affectedStudentCount": 7,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754423",
              "studentName": "于博然",
              "questionContext": "",
              "studentAnswer": "labors",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754454",
              "studentName": "师若棋",
              "questionContext": "",
              "studentAnswer": "Labors",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "questionContext": "",
              "studentAnswer": "labor",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "labours",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "questionContext": "",
              "studentAnswer": "labors",
              "correctAnswer": "laborer/labourer",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在7名学生中出现16次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 99
        },
        {
          "id": "ww-001",
          "text": "AI/artificial intelligence",
          "itemType": "word",
          "scoreRate": 15.6,
          "errorRate": 84.4,
          "affectedStudentCount": 10,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754421",
              "studentName": "杨梓涵",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "Al",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754402",
              "studentName": "吕曈夏",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "I",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754423",
              "studentName": "于博然",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "Al",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754421",
              "studentName": "杨梓涵",
              "questionContext": "",
              "studentAnswer": "Al",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754435",
              "studentName": "黄泽平",
              "questionContext": "",
              "studentAnswer": "Al",
              "correctAnswer": "AI/artificial intelligence",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在10名学生中出现15次拼写错误。",
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
          "scoreRate": 21.2,
          "errorRate": 78.8,
          "affectedStudentCount": 10,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747528",
              "studentName": "王语含",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "technolgy",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "teehnigne",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747582",
              "studentName": "徐若芊",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "technolog",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "tecnology",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "technokyy",
              "correctAnswer": "technology",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在10名学生中出现14次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 90
        },
        {
          "id": "ww-003",
          "text": "writing",
          "itemType": "word",
          "scoreRate": 38.1,
          "errorRate": 61.9,
          "affectedStudentCount": 9,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754401",
              "studentName": "刘盈杉",
              "questionContext": "",
              "studentAnswer": "writting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747526",
              "studentName": "王铭泽",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "wrriting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747516",
              "studentName": "刘冠临",
              "questionContext": "",
              "studentAnswer": "writting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747588",
              "studentName": "张博悦",
              "questionContext": "",
              "studentAnswer": "writting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754458",
              "studentName": "王李嘉瑞",
              "questionContext": "",
              "studentAnswer": "woriting",
              "correctAnswer": "writing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在9名学生中出现11次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 77
        },
        {
          "id": "ww-004",
          "text": "Beijing",
          "itemType": "word",
          "scoreRate": 43.8,
          "errorRate": 56.2,
          "affectedStudentCount": 8,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24747564",
              "studentName": "梁馨元",
              "questionContext": "",
              "studentAnswer": "Bejing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "Beijoing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754429",
              "studentName": "禚奕辰",
              "questionContext": "",
              "studentAnswer": "iseijing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754429",
              "studentName": "禚奕辰",
              "questionContext": "",
              "studentAnswer": "E aijing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754462",
              "studentName": "吴骁航",
              "questionContext": "",
              "studentAnswer": "BeiTing",
              "correctAnswer": "Beijing",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在8名学生中出现10次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 73
        },
        {
          "id": "ww-005",
          "text": "efficiency",
          "itemType": "word",
          "scoreRate": 60.6,
          "errorRate": 39.4,
          "affectedStudentCount": 6,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754423",
              "studentName": "于博然",
              "questionContext": "",
              "studentAnswer": "the effeciency",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747528",
              "studentName": "王语含",
              "questionContext": "",
              "studentAnswer": "efficieng",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "efficieency",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "effiency",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747541",
              "studentName": "赵朔羲",
              "questionContext": "",
              "studentAnswer": "effeciency",
              "correctAnswer": "efficiency",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现7次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 60
        },
        {
          "id": "ww-006",
          "text": "your",
          "itemType": "word",
          "scoreRate": 60.6,
          "errorRate": 39.4,
          "affectedStudentCount": 3,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "yar",
              "correctAnswer": "your",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747593",
              "studentName": "朱浩尘",
              "questionContext": "",
              "studentAnswer": "ou",
              "correctAnswer": "your",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "gyour",
              "correctAnswer": "your",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "yar",
              "correctAnswer": "your",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "yor",
              "correctAnswer": "your",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现7次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 60
        },
        {
          "id": "ww-007",
          "text": "school",
          "itemType": "word",
          "scoreRate": 60.6,
          "errorRate": 39.4,
          "affectedStudentCount": 5,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "schol",
              "correctAnswer": "school",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "schol",
              "correctAnswer": "school",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747541",
              "studentName": "赵朔羲",
              "questionContext": "",
              "studentAnswer": "schol",
              "correctAnswer": "school",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754429",
              "studentName": "禚奕辰",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "schoo",
              "correctAnswer": "school",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "schol",
              "correctAnswer": "school",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现7次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 60
        },
        {
          "id": "ww-008",
          "text": "you",
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
          "typicalMistakes": [
            {
              "studentId": "24747526",
              "studentName": "王铭泽",
              "questionContext": "",
              "studentAnswer": "syou",
              "correctAnswer": "you",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "yous",
              "correctAnswer": "you",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754431",
              "studentName": "高嘉成",
              "questionContext": "",
              "studentAnswer": "yo to",
              "correctAnswer": "you",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747582",
              "studentName": "徐若芊",
              "questionContext": "",
              "studentAnswer": "yor",
              "correctAnswer": "you",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747528",
              "studentName": "王语含",
              "questionContext": "",
              "studentAnswer": "gon",
              "correctAnswer": "you",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 55
        },
        {
          "id": "ww-009",
          "text": "share",
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
          "typicalMistakes": [
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "shore",
              "correctAnswer": "share",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747521",
              "studentName": "马欣然",
              "questionContext": "",
              "studentAnswer": "shere",
              "correctAnswer": "share",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754443",
              "studentName": "李卓宣",
              "questionContext": "",
              "studentAnswer": "shore",
              "correctAnswer": "share",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747518",
              "studentName": "刘芮希",
              "questionContext": "",
              "studentAnswer": "char",
              "correctAnswer": "share",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "spare",
              "correctAnswer": "share",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 55
        },
        {
          "id": "ww-010",
          "text": "life",
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
          "typicalMistakes": [
            {
              "studentId": "24747528",
              "studentName": "王语含",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "ife",
              "correctAnswer": "life",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747564",
              "studentName": "梁馨元",
              "questionContext": "",
              "studentAnswer": "lif",
              "correctAnswer": "life",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754401",
              "studentName": "刘盈杉",
              "questionContext": "",
              "studentAnswer": "lifer",
              "correctAnswer": "life",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754421",
              "studentName": "杨梓涵",
              "questionContext": "",
              "studentAnswer": "afe",
              "correctAnswer": "life",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747541",
              "studentName": "赵朔羲",
              "questionContext": "",
              "studentAnswer": "elife",
              "correctAnswer": "life",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在6名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 55
        },
        {
          "id": "ww-011",
          "text": "future",
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
          "typicalMistakes": [
            {
              "studentId": "24754458",
              "studentName": "王李嘉瑞",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "uture",
              "correctAnswer": "future",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "fonture",
              "correctAnswer": "future",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754494",
              "studentName": "李彦君",
              "questionContext": "",
              "studentAnswer": "fusture",
              "correctAnswer": "future",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747541",
              "studentName": "赵朔羲",
              "questionContext": "",
              "studentAnswer": "futer",
              "correctAnswer": "future",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "ffuture",
              "correctAnswer": "future",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现6次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 55
        },
        {
          "id": "ww-012",
          "text": "difficulty",
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
          "typicalMistakes": [
            {
              "studentId": "24747593",
              "studentName": "朱浩尘",
              "questionContext": "",
              "studentAnswer": "diddiculties",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754401",
              "studentName": "刘盈杉",
              "questionContext": "",
              "studentAnswer": "difficultis",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754408",
              "studentName": "滕易朴",
              "questionContext": "",
              "studentAnswer": "diffialty",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747593",
              "studentName": "朱浩尘",
              "questionContext": "",
              "studentAnswer": "diffculties",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "diicalties",
              "correctAnswer": "difficulty",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-013",
          "text": "more",
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
          "typicalMistakes": [
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "mere",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "mere",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "questionContext": "",
              "studentAnswer": "moore",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747528",
              "studentName": "王语含",
              "questionContext": "",
              "studentAnswer": "re",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "mere",
              "correctAnswer": "more",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-014",
          "text": "including",
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
          "typicalMistakes": [
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "inchuding",
              "correctAnswer": "including",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747586",
              "studentName": "杨昀翰",
              "questionContext": "",
              "studentAnswer": "inceuling",
              "correctAnswer": "including",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747548",
              "studentName": "庄颜",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "includy",
              "correctAnswer": "including",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "includingg",
              "correctAnswer": "including",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "induding",
              "correctAnswer": "including",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-015",
          "text": "thrilled",
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
          "typicalMistakes": [
            {
              "studentId": "24754421",
              "studentName": "杨梓涵",
              "questionContext": "",
              "studentAnswer": "thilled",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747541",
              "studentName": "赵朔羲",
              "questionContext": "",
              "studentAnswer": "thriled",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754458",
              "studentName": "王李嘉瑞",
              "questionContext": "",
              "studentAnswer": "thriled",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "thirlled",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747569",
              "studentName": "潘好",
              "questionContext": "",
              "studentAnswer": "trilled",
              "correctAnswer": "thrilled",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-016",
          "text": "activity",
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
          "typicalMistakes": [
            {
              "studentId": "24747526",
              "studentName": "王铭泽",
              "questionContext": "",
              "studentAnswer": "activily",
              "correctAnswer": "activity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747521",
              "studentName": "马欣然",
              "questionContext": "",
              "studentAnswer": "all ity",
              "correctAnswer": "activity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747526",
              "studentName": "王铭泽",
              "questionContext": "",
              "studentAnswer": "adivity was",
              "correctAnswer": "activity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747516",
              "studentName": "刘冠临",
              "questionContext": "",
              "studentAnswer": "actiity. s",
              "correctAnswer": "activity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754458",
              "studentName": "王李嘉瑞",
              "questionContext": "",
              "studentAnswer": "activety",
              "correctAnswer": "activity",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-017",
          "text": "looking",
          "itemType": "word",
          "scoreRate": 71.9,
          "errorRate": 28.1,
          "affectedStudentCount": 1,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "lucking",
              "correctAnswer": "looking",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "lackny",
              "correctAnswer": "looking",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "lacksy",
              "correctAnswer": "looking",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "lacking",
              "correctAnswer": "looking",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "lckiny",
              "correctAnswer": "looking",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在1名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-018",
          "text": "detail",
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
          "typicalMistakes": [
            {
              "studentId": "24747564",
              "studentName": "梁馨元",
              "questionContext": "",
              "studentAnswer": "detials",
              "correctAnswer": "detail",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754423",
              "studentName": "于博然",
              "questionContext": "",
              "studentAnswer": "deterls",
              "correctAnswer": "detail",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747564",
              "studentName": "梁馨元",
              "questionContext": "",
              "studentAnswer": "detials",
              "correctAnswer": "detail",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754494",
              "studentName": "李彦君",
              "questionContext": "",
              "studentAnswer": "ditails",
              "correctAnswer": "detail",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747564",
              "studentName": "梁馨元",
              "questionContext": "",
              "studentAnswer": "detials",
              "correctAnswer": "detail",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-019",
          "text": "enthusiasm",
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
          "typicalMistakes": [
            {
              "studentId": "24754462",
              "studentName": "吴骁航",
              "questionContext": "",
              "studentAnswer": "onthusiasim",
              "correctAnswer": "enthusiasm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754494",
              "studentName": "李彦君",
              "questionContext": "",
              "studentAnswer": "enthusias tion",
              "correctAnswer": "enthusiasm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754421",
              "studentName": "杨梓涵",
              "questionContext": "",
              "studentAnswer": "entluusiasm",
              "correctAnswer": "enthusiasm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754494",
              "studentName": "李彦君",
              "questionContext": "",
              "studentAnswer": "euthusiasim",
              "correctAnswer": "enthusiasm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754494",
              "studentName": "李彦君",
              "questionContext": "",
              "studentAnswer": "enthuiasim",
              "correctAnswer": "enthusiasm",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-020",
          "text": "truly",
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
          "typicalMistakes": [
            {
              "studentId": "24747588",
              "studentName": "张博悦",
              "questionContext": "",
              "studentAnswer": "truely",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "questionContext": "",
              "studentAnswer": "truely",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754458",
              "studentName": "王李嘉瑞",
              "questionContext": "",
              "studentAnswer": "truely",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "truely",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "questionContext": "",
              "studentAnswer": "tray",
              "correctAnswer": "truly",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-021",
          "text": "self",
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
          "typicalMistakes": [
            {
              "studentId": "24747529",
              "studentName": "王子墨",
              "questionContext": "",
              "studentAnswer": "selfl",
              "correctAnswer": "self",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754402",
              "studentName": "吕曈夏",
              "questionContext": "",
              "studentAnswer": "seft",
              "correctAnswer": "self",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754429",
              "studentName": "禚奕辰",
              "questionContext": "",
              "studentAnswer": "syt",
              "correctAnswer": "self",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747586",
              "studentName": "杨昀翰",
              "questionContext": "",
              "studentAnswer": "wolf",
              "correctAnswer": "self",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "selfn",
              "correctAnswer": "self",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-022",
          "text": "chose",
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
          "typicalMistakes": [
            {
              "studentId": "24754443",
              "studentName": "李卓宣",
              "questionContext": "",
              "studentAnswer": "choce",
              "correctAnswer": "chose",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747564",
              "studentName": "梁馨元",
              "questionContext": "",
              "studentAnswer": "choosed",
              "correctAnswer": "chose",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "questionContext": "",
              "studentAnswer": "choosed",
              "correctAnswer": "chose",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747541",
              "studentName": "赵朔羲",
              "questionContext": "",
              "studentAnswer": "choosed",
              "correctAnswer": "chose",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747560",
              "studentName": "柯奕铭",
              "questionContext": "",
              "studentAnswer": "choosed",
              "correctAnswer": "chose",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在5名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-023",
          "text": "reading",
          "itemType": "word",
          "scoreRate": 71.9,
          "errorRate": 28.1,
          "affectedStudentCount": 2,
          "mainErrorType": "spelling",
          "errorTypes": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "typicalMistakes": [
            {
              "studentId": "24754462",
              "studentName": "吴骁航",
              "questionContext": "",
              "studentAnswer": "readin",
              "correctAnswer": "reading",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747548",
              "studentName": "庄颜",
              "questionContext": "",
              "studentAnswer": "readly",
              "correctAnswer": "reading",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747548",
              "studentName": "庄颜",
              "questionContext": "",
              "studentAnswer": "readny",
              "correctAnswer": "reading",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747548",
              "studentName": "庄颜",
              "questionContext": "",
              "studentAnswer": "readin",
              "correctAnswer": "reading",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747548",
              "studentName": "庄颜",
              "questionContext": "",
              "studentAnswer": "readin",
              "correctAnswer": "reading",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在2名学生中出现5次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 51
        },
        {
          "id": "ww-024",
          "text": "studying",
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
          "typicalMistakes": [
            {
              "studentId": "24754443",
              "studentName": "李卓宣",
              "questionContext": "",
              "studentAnswer": "studyling",
              "correctAnswer": "studying",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754408",
              "studentName": "滕易朴",
              "questionContext": "",
              "studentAnswer": "studing",
              "correctAnswer": "studying",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747548",
              "studentName": "庄颜",
              "questionContext": "",
              "studentAnswer": "studing",
              "correctAnswer": "studying",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754462",
              "studentName": "吴骁航",
              "questionContext": "",
              "studentAnswer": "studing",
              "correctAnswer": "studying",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-025",
          "text": "strengthen",
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
          "typicalMistakes": [
            {
              "studentId": "24747564",
              "studentName": "梁馨元",
              "questionContext": "",
              "studentAnswer": "strenghthen",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747562",
              "studentName": "李禹辰",
              "questionContext": "",
              "studentAnswer": "strenthen",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747521",
              "studentName": "马欣然",
              "questionContext": "",
              "studentAnswer": "strenghes",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "strengtening",
              "correctAnswer": "strengthen",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-026",
          "text": "overcome",
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
          "typicalMistakes": [
            {
              "studentId": "24747588",
              "studentName": "张博悦",
              "questionContext": "",
              "studentAnswer": "overana",
              "correctAnswer": "overcome",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754462",
              "studentName": "吴骁航",
              "questionContext": "",
              "studentAnswer": "overlome the",
              "correctAnswer": "overcome",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754429",
              "studentName": "禚奕辰",
              "questionContext": "",
              "studentAnswer": "ovewr",
              "correctAnswer": "overcome",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754429",
              "studentName": "禚奕辰",
              "questionContext": "",
              "studentAnswer": "overome",
              "correctAnswer": "overcome",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-027",
          "text": "thoughts",
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
          "typicalMistakes": [
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "thouhts",
              "correctAnswer": "thoughts",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747593",
              "studentName": "朱浩尘",
              "questionContext": "",
              "studentAnswer": "15-thought",
              "correctAnswer": "thoughts",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "questionContext": "",
              "studentAnswer": "thagh's",
              "correctAnswer": "thoughts",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754429",
              "studentName": "禚奕辰",
              "questionContext": "",
              "studentAnswer": "thoughtu1",
              "correctAnswer": "thoughts",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-028",
          "text": "divided",
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
          "typicalMistakes": [
            {
              "studentId": "24747582",
              "studentName": "徐若芊",
              "questionContext": "",
              "studentAnswer": "decided",
              "correctAnswer": "divided",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747562",
              "studentName": "李禹辰",
              "questionContext": "",
              "studentAnswer": "devided",
              "correctAnswer": "divided",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747521",
              "studentName": "马欣然",
              "questionContext": "",
              "studentAnswer": "decided",
              "correctAnswer": "divided",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "devided",
              "correctAnswer": "divided",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-029",
          "text": "delighted",
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
          "typicalMistakes": [
            {
              "studentId": "24754429",
              "studentName": "禚奕辰",
              "questionContext": "",
              "studentAnswer": "delight",
              "correctAnswer": "delighted",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754429",
              "studentName": "禚奕辰",
              "questionContext": "",
              "studentAnswer": "dcighted",
              "correctAnswer": "delighted",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754429",
              "studentName": "禚奕辰",
              "questionContext": "",
              "studentAnswer": "delight",
              "correctAnswer": "delighted",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747560",
              "studentName": "柯奕铭",
              "questionContext": "",
              "studentAnswer": "deligted",
              "correctAnswer": "delighted",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在2名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-030",
          "text": "better",
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
          "typicalMistakes": [
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "Bette",
              "correctAnswer": "better",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747548",
              "studentName": "庄颜",
              "questionContext": "",
              "studentAnswer": "letter",
              "correctAnswer": "better",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747588",
              "studentName": "张博悦",
              "questionContext": "",
              "studentAnswer": "moreort",
              "correctAnswer": "better",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747521",
              "studentName": "马欣然",
              "questionContext": "",
              "studentAnswer": "metter",
              "correctAnswer": "better",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-031",
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
          "typicalMistakes": [
            {
              "studentId": "24754402",
              "studentName": "吕曈夏",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "showase",
              "correctAnswer": "showcase",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754421",
              "studentName": "杨梓涵",
              "questionContext": "",
              "studentAnswer": "strowcase",
              "correctAnswer": "showcase",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754402",
              "studentName": "吕曈夏",
              "questionContext": "",
              "studentAnswer": "showcale",
              "correctAnswer": "showcase",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "shwwases",
              "correctAnswer": "showcase",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-032",
          "text": "choose",
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
          "typicalMistakes": [
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "chose",
              "correctAnswer": "choose",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747528",
              "studentName": "王语含",
              "questionContext": "",
              "studentAnswer": "chossing",
              "correctAnswer": "choose",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "to shoose",
              "correctAnswer": "choose",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754458",
              "studentName": "王李嘉瑞",
              "questionContext": "",
              "studentAnswer": "hoose",
              "correctAnswer": "choose",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-033",
          "text": "promote",
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
          "typicalMistakes": [
            {
              "studentId": "24747582",
              "studentName": "徐若芊",
              "questionContext": "",
              "studentAnswer": "prompt",
              "correctAnswer": "promote",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754423",
              "studentName": "于博然",
              "questionContext": "",
              "studentAnswer": "prompt",
              "correctAnswer": "promote",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754443",
              "studentName": "李卓宣",
              "questionContext": "",
              "studentAnswer": "prompt",
              "correctAnswer": "promote",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747548",
              "studentName": "庄颜",
              "questionContext": "",
              "studentAnswer": "promotioor",
              "correctAnswer": "promote",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-034",
          "text": "develop",
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
          "typicalMistakes": [
            {
              "studentId": "24754454",
              "studentName": "师若棋",
              "questionContext": "",
              "studentAnswer": "develp",
              "correctAnswer": "develop",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747560",
              "studentName": "柯奕铭",
              "questionContext": "",
              "studentAnswer": "developp",
              "correctAnswer": "develop",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754421",
              "studentName": "杨梓涵",
              "questionContext": "",
              "studentAnswer": "devolop",
              "correctAnswer": "develop",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754431",
              "studentName": "高嘉成",
              "questionContext": "",
              "studentAnswer": "develope",
              "correctAnswer": "develop",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-035",
          "text": "beautiful",
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
          "typicalMistakes": [
            {
              "studentId": "24747564",
              "studentName": "梁馨元",
              "questionContext": "",
              "studentAnswer": "beatu tiful",
              "correctAnswer": "beautiful",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "beatiful",
              "correctAnswer": "beautiful",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754462",
              "studentName": "吴骁航",
              "questionContext": "",
              "studentAnswer": "beatiful",
              "correctAnswer": "beautiful",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747528",
              "studentName": "王语含",
              "questionContext": "",
              "studentAnswer": "grantful",
              "correctAnswer": "beautiful",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在4名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-036",
          "text": "daily",
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
          "typicalMistakes": [
            {
              "studentId": "24747548",
              "studentName": "庄颜",
              "questionContext": "",
              "studentAnswer": "daliy",
              "correctAnswer": "daily",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747548",
              "studentName": "庄颜",
              "questionContext": "",
              "studentAnswer": "daliy",
              "correctAnswer": "daily",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754423",
              "studentName": "于博然",
              "questionContext": "",
              "studentAnswer": "deilly",
              "correctAnswer": "daily",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747569",
              "studentName": "潘好",
              "questionContext": "",
              "studentAnswer": "decily",
              "correctAnswer": "daily",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-037",
          "text": "video",
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
          "typicalMistakes": [
            {
              "studentId": "24747541",
              "studentName": "赵朔羲",
              "questionContext": "",
              "studentAnswer": "vedio",
              "correctAnswer": "video",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747528",
              "studentName": "王语含",
              "questionContext": "",
              "studentAnswer": "wide",
              "correctAnswer": "video",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747593",
              "studentName": "朱浩尘",
              "questionContext": "",
              "studentAnswer": "vide.",
              "correctAnswer": "video",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747541",
              "studentName": "赵朔羲",
              "questionContext": "",
              "studentAnswer": "vedio",
              "correctAnswer": "video",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-038",
          "text": "forward",
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
          "typicalMistakes": [
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "forard",
              "correctAnswer": "forward",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "for ward",
              "correctAnswer": "forward",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "fruad",
              "correctAnswer": "forward",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754421",
              "studentName": "杨梓涵",
              "questionContext": "",
              "studentAnswer": "forword",
              "correctAnswer": "forward",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在2名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-039",
          "text": "contribute",
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
          "typicalMistakes": [
            {
              "studentId": "24747588",
              "studentName": "张博悦",
              "questionContext": "",
              "studentAnswer": "conutributed",
              "correctAnswer": "contribute",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747588",
              "studentName": "张博悦",
              "questionContext": "",
              "studentAnswer": "ontributed",
              "correctAnswer": "contribute",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754462",
              "studentName": "吴骁航",
              "questionContext": "",
              "studentAnswer": "contributin",
              "correctAnswer": "contribute",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "ontributing",
              "correctAnswer": "contribute",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-040",
          "text": "interested",
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
          "typicalMistakes": [
            {
              "studentId": "24754402",
              "studentName": "吕曈夏",
              "questionContext": "",
              "studentAnswer": "intoresta",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747526",
              "studentName": "王铭泽",
              "questionContext": "",
              "studentAnswer": "interesled",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754402",
              "studentName": "吕曈夏",
              "questionContext": "",
              "studentAnswer": "interesta",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "intersted",
              "correctAnswer": "interested",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-041",
          "text": "exhibition",
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
          "typicalMistakes": [
            {
              "studentId": "24747526",
              "studentName": "王铭泽",
              "questionContext": "",
              "studentAnswer": "exibition",
              "correctAnswer": "exhibition",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747548",
              "studentName": "庄颜",
              "questionContext": "",
              "studentAnswer": "exhibion",
              "correctAnswer": "exhibition",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747526",
              "studentName": "王铭泽",
              "questionContext": "",
              "studentAnswer": "exibition",
              "correctAnswer": "exhibition",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754458",
              "studentName": "王李嘉瑞",
              "questionContext": "",
              "studentAnswer": "exhibibiton",
              "correctAnswer": "exhibition",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现4次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 47
        },
        {
          "id": "ww-042",
          "text": "problem",
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
          "typicalMistakes": [
            {
              "studentId": "24747593",
              "studentName": "朱浩尘",
              "questionContext": "",
              "studentAnswer": "the proile",
              "correctAnswer": "problem",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "problom",
              "correctAnswer": "problem",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747588",
              "studentName": "张博悦",
              "questionContext": "",
              "studentAnswer": "robleay",
              "correctAnswer": "problem",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现3次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        },
        {
          "id": "ww-043",
          "text": "solution",
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
          "typicalMistakes": [
            {
              "studentId": "24754423",
              "studentName": "于博然",
              "questionContext": "",
              "studentAnswer": "sollution",
              "correctAnswer": "solution",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "",
              "studentAnswer": "soutions a lot",
              "correctAnswer": "solution",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754460",
              "studentName": "王乔楚",
              "questionContext": "",
              "studentAnswer": "soluton",
              "correctAnswer": "solution",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现3次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        },
        {
          "id": "ww-044",
          "text": "solve",
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
          "typicalMistakes": [
            {
              "studentId": "24754401",
              "studentName": "刘盈杉",
              "questionContext": "",
              "studentAnswer": "soving",
              "correctAnswer": "solve",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754462",
              "studentName": "吴骁航",
              "questionContext": "",
              "studentAnswer": "soving,",
              "correctAnswer": "solve",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747521",
              "studentName": "马欣然",
              "questionContext": "",
              "studentAnswer": "soving",
              "correctAnswer": "solve",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现3次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        },
        {
          "id": "ww-045",
          "text": "different",
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
          "typicalMistakes": [
            {
              "studentId": "24754494",
              "studentName": "李彦君",
              "questionContext": "",
              "studentAnswer": "difecent",
              "correctAnswer": "different",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754494",
              "studentName": "李彦君",
              "questionContext": "",
              "studentAnswer": "diferent",
              "correctAnswer": "different",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "questionContext": "假设你是红星中学高三学生李华。你学校即将举办 “未来已来”（The Future is Here）的科技节活动。你打算邀请你的国际部好友 Jim 参加。请你给他写一封邮件，内容包括：1.  活动安排（",
              "studentAnswer": "difherent",
              "correctAnswer": "different",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在2名学生中出现3次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        },
        {
          "id": "ww-046",
          "text": "create",
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
          "typicalMistakes": [
            {
              "studentId": "24747548",
              "studentName": "庄颜",
              "questionContext": "",
              "studentAnswer": "creat",
              "correctAnswer": "create",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747576",
              "studentName": "王梓木",
              "questionContext": "",
              "studentAnswer": "great",
              "correctAnswer": "create",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747564",
              "studentName": "梁馨元",
              "questionContext": "",
              "studentAnswer": "creat",
              "correctAnswer": "create",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现3次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        },
        {
          "id": "ww-047",
          "text": "residents",
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
          "typicalMistakes": [
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "visidents",
              "correctAnswer": "residents",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "Risidents",
              "correctAnswer": "residents",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747588",
              "studentName": "张博悦",
              "questionContext": "",
              "studentAnswer": "presideants",
              "correctAnswer": "residents",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在2名学生中出现3次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        },
        {
          "id": "ww-048",
          "text": "environmental",
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
          "typicalMistakes": [
            {
              "studentId": "24747521",
              "studentName": "马欣然",
              "questionContext": "",
              "studentAnswer": "the enviromental",
              "correctAnswer": "environmental",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747552",
              "studentName": "陈孝校",
              "questionContext": "",
              "studentAnswer": "environmene",
              "correctAnswer": "environmental",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24747582",
              "studentName": "徐若芊",
              "questionContext": "",
              "studentAnswer": "enviromental",
              "correctAnswer": "environmental",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现3次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        },
        {
          "id": "ww-049",
          "text": "and",
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
          "typicalMistakes": [
            {
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "questionContext": "",
              "studentAnswer": "athat",
              "correctAnswer": "and",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754429",
              "studentName": "禚奕辰",
              "questionContext": "",
              "studentAnswer": "areo,",
              "correctAnswer": "and",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            },
            {
              "studentId": "24754443",
              "studentName": "李卓宣",
              "questionContext": "",
              "studentAnswer": "anch",
              "correctAnswer": "and",
              "errorType": "spelling",
              "sourceTaskName": "平台词汇练习",
              "sourceTime": ""
            }
          ],
          "sourceTasks": [
            "平台词汇练习"
          ],
          "aiReason": "该词在3名学生中出现3次拼写错误。",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "priorityScore": 42
        }
      ],
      "weakStudents": [
        {
          "id": "24754429",
          "name": "禚奕辰",
          "scoreRate": 78.5,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共27次拼写错误，涉及23个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747576",
          "name": "王梓木",
          "scoreRate": 78.5,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
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
          "weaknessPriorityScore": 22,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754402",
          "name": "吕曈夏",
          "scoreRate": 77.7,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共28次拼写错误，涉及24个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 23,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754401",
          "name": "刘盈杉",
          "scoreRate": 76.9,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共29次拼写错误，涉及27个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747526",
          "name": "王铭泽",
          "scoreRate": 76.1,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
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
          "weaknessPriorityScore": 24,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754421",
          "name": "杨梓涵",
          "scoreRate": 73.7,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共33次拼写错误，涉及30个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 27,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747588",
          "name": "张博悦",
          "scoreRate": 72.9,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共34次拼写错误，涉及32个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747593",
          "name": "朱浩尘",
          "scoreRate": 72.1,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
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
          "weaknessPriorityScore": 28,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747528",
          "name": "王语含",
          "scoreRate": 72.1,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
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
          "weaknessPriorityScore": 28,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747541",
          "name": "赵朔羲",
          "scoreRate": 71.3,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共36次拼写错误，涉及34个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754435",
          "name": "黄泽平",
          "scoreRate": 70.5,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
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
          "weaknessPriorityScore": 30,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747564",
          "name": "梁馨元",
          "scoreRate": 69.7,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共38次拼写错误，涉及34个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754470",
          "name": "张瀚夫",
          "scoreRate": 68.1,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共40次拼写错误，涉及34个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754494",
          "name": "李彦君",
          "scoreRate": 65.0,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共44次拼写错误，涉及40个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 35,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754443",
          "name": "李卓宣",
          "scoreRate": 65.0,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共44次拼写错误，涉及42个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 35,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754462",
          "name": "吴骁航",
          "scoreRate": 64.2,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共45次拼写错误，涉及43个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747548",
          "name": "庄颜",
          "scoreRate": 63.4,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共46次拼写错误，涉及41个词。",
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
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24754423",
          "name": "于博然",
          "scoreRate": 61.8,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共48次拼写错误，涉及47个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 39,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747521",
          "name": "马欣然",
          "scoreRate": 48.2,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共65次拼写错误，涉及61个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 52,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        },
        {
          "id": "24747552",
          "name": "陈孝校",
          "scoreRate": 41.9,
          "weakWords": [
            "laborer/labourer",
            "AI/artificial intelligence",
            "technology",
            "writing",
            "Beijing",
            "efficiency",
            "your",
            "school"
          ],
          "mainErrorTypes": [
            "拼不对"
          ],
          "typicalContext": "共73次拼写错误，涉及62个词。",
          "recentTrend": "stable",
          "recommendedActions": [
            "默写",
            "词汇复习规划"
          ],
          "weaknessPriorityScore": 59,
          "errorTypeDistribution": [
            {
              "type": "spelling",
              "label": "拼不对 / 默写错误",
              "percent": 100
            }
          ],
          "weakWordDetails": []
        }
      ],
      "goodStudents": [
        {
          "id": "24747529",
          "name": "王子墨",
          "scoreRate": 94.4,
          "masteredCount": 7,
          "highlight": "词汇拼写错误较少，仅7次",
          "stability": "stable"
        },
        {
          "id": "24747569",
          "name": "潘好",
          "scoreRate": 90.4,
          "masteredCount": 12,
          "highlight": "词汇拼写错误较少，仅12次",
          "stability": "stable"
        },
        {
          "id": "24747518",
          "name": "刘芮希",
          "scoreRate": 89.6,
          "masteredCount": 12,
          "highlight": "词汇拼写错误较少，仅13次",
          "stability": "stable"
        },
        {
          "id": "24747560",
          "name": "柯奕铭",
          "scoreRate": 89.6,
          "masteredCount": 12,
          "highlight": "词汇拼写错误较少，仅13次",
          "stability": "stable"
        },
        {
          "id": "24754454",
          "name": "师若棋",
          "scoreRate": 88.8,
          "masteredCount": 14,
          "highlight": "词汇拼写错误较少，仅14次",
          "stability": "stable"
        },
        {
          "id": "24754428",
          "name": "周恩昊",
          "scoreRate": 88.8,
          "masteredCount": 14,
          "highlight": "词汇拼写错误较少，仅14次",
          "stability": "stable"
        },
        {
          "id": "24754431",
          "name": "高嘉成",
          "scoreRate": 88.8,
          "masteredCount": 14,
          "highlight": "词汇拼写错误较少，仅14次",
          "stability": "stable"
        },
        {
          "id": "24747582",
          "name": "徐若芊",
          "scoreRate": 88.1,
          "masteredCount": 15,
          "highlight": "词汇拼写错误较少，仅15次",
          "stability": "stable"
        },
        {
          "id": "24747586",
          "name": "杨昀翰",
          "scoreRate": 87.3,
          "masteredCount": 15,
          "highlight": "词汇拼写错误较少，仅16次",
          "stability": "stable"
        },
        {
          "id": "24747562",
          "name": "李禹辰",
          "scoreRate": 86.5,
          "masteredCount": 17,
          "highlight": "词汇拼写错误较少，仅17次",
          "stability": "stable"
        }
      ],
      "interventionRecords": []
    },
    "writing": {
      "classId": "class-2023级A17班",
      "className": "2023级A17班",
      "unitId": "real-data",
      "unitName": "平台真实数据",
      "timeRange": "30d",
      "updatedAt": "2026-06-11 11:30",
      "summary": "2023级A17班 共 35 名学生，5549 条应用文批改记录，平均 56.5 分。主要问题「词汇表达弱 / 用词单一」(45.5%)，薄弱学生 25 人。",
      "metrics": {
        "averageScore": 56.5,
        "averageLevel": "C",
        "reviewedEssayCount": 5549,
        "mainProblemType": "词汇表达弱 / 用词单一",
        "weakStudentCount": 25,
        "excellentEssayCount": 10
      },
      "problemTypes": [
        {
          "id": "pt-vocabulary_weak",
          "type": "vocabulary_weak",
          "label": "词汇表达弱 / 用词单一",
          "borderColor": "#8e7cc3",
          "bgColor": "#f6f0fc",
          "percent": 45.5,
          "affectedStudentCount": 35,
          "typicalPerformance": "(2525/5549)",
          "aiReason": "共2525次，占比45.5%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "Greetings! Knowing that you are interested in the technlong powered activity the",
            "Greetings! Knowing that you are interested in the technlong powered activity the",
            "I filmed a docmentary-style movie to show how AI-powered smart apps inflhuence c"
          ]
        },
        {
          "id": "pt-language_accuracy",
          "type": "language_accuracy",
          "label": "语言准确性弱 / 语法错误多",
          "borderColor": "#7b9cd6",
          "bgColor": "#f0f4fc",
          "percent": 41.3,
          "affectedStudentCount": 35,
          "typicalPerformance": "(2294/5549)",
          "aiReason": "共2294次，占比41.3%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "Athugh there are plenty of difficulties emerging in the process, I've not only g",
            "Greetings! I'm glad to know that you are interested about the activity whose the",
            "Greetings! I'm glad to know that you are interested about the activity whose the"
          ]
        },
        {
          "id": "pt-structure_unclear",
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "borderColor": "#f0a060",
          "bgColor": "#fef8f0",
          "percent": 8.2,
          "affectedStudentCount": 35,
          "typicalPerformance": "(456/5549)",
          "aiReason": "共456次，占比8.2%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "Greetings! Knowing that you are interested in the technlong powered activity the",
            "'ve gained a lot during this meaningful activity.",
            "Through this activity, I have acknowledged the high speed of Chinese technology "
          ]
        },
        {
          "id": "pt-format_issue",
          "type": "format_issue",
          "label": "格式规范问题 / 应用文格式",
          "borderColor": "#9ab3cc",
          "bgColor": "#f5f7fa",
          "percent": 4.9,
          "affectedStudentCount": 33,
          "typicalPerformance": "(274/5549)",
          "aiReason": "共274次，占比4.9%。",
          "recommendedActions": [
            "推荐写作练习",
            "范文生成"
          ],
          "examples": [
            "Greeting! Learning that you are interested in my experience of \"Technologe Smart",
            "My work is named \"Digital intelligent health system\" consisting of two parts: \" ",
            "Besides, It provide recommendation of food and drinks, cutting back on sugary an"
          ]
        }
      ],
      "highFrequencyIssues": [
        {
          "problemType": "vocabulary_weak",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Greetings! Knowing that you are interested in the technlong powered activity themed \"Intelligent China,\" want to share my workant with you.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 technlong  换成  technology- ",
              "improvedExample": "Greetings! Knowing that you are interested in the technology-powered activity themed \"Intelligent China,\" I want to share my work with you.",
              "score": 65.148,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Greetings! Knowing that you are interested in the technlong powered activity themed \"Intelligent China,\" want to share my workant with you.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 workant 换成  work ",
              "improvedExample": "Greetings! Knowing that you are interested in the technology-powered activity themed \"Intelligent China,\" I want to share my work with you.",
              "score": 65.148,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "I filmed a docmentary-style movie to show how AI-powered smart apps inflhuence common people's lives in China.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 docmentary 换成  documentary ",
              "improvedExample": "I filmed a documentary-style movie to show how AI-powered smart apps influence common people's lives in China.",
              "score": 65.148,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "I filmed a docmentary-style movie to show how AI-powered smart apps inflhuence common people's lives in China.",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 inflhuence 换成  influence ",
              "improvedExample": "I filmed a documentary-style movie to show how AI-powered smart apps influence common people's lives in China.",
              "score": 65.148,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "In the movie, I filled an elderly resident who uses a smart watch to monitor her heart-rates and alrt her to irregdarities, which shwwases the efficiency and convenience that AI-powered apps bring to ",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 filled 换成  filmed ",
              "improvedExample": "In the movie, I filmed an elderly resident who uses a smart watch to monitor her heart rates and alert her to irregularities, which showcases the efficiency and convenience that AI-powered apps bring ",
              "score": 65.148,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "In the movie, I filled an elderly resident who uses a smart watch to monitor her heart-rates and alrt her to irregdarities, which shwwases the efficiency and convenience that AI-powered apps bring to ",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议删除  - ",
              "improvedExample": "In the movie, I filmed an elderly resident who uses a smart watch to monitor her heart rates and alert her to irregularities, which showcases the efficiency and convenience that AI-powered apps bring ",
              "score": 65.148,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "In the movie, I filled an elderly resident who uses a smart watch to monitor her heart-rates and alrt her to irregdarities, which shwwases the efficiency and convenience that AI-powered apps bring to ",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 alrt 换成  alert ",
              "improvedExample": "In the movie, I filmed an elderly resident who uses a smart watch to monitor her heart rates and alert her to irregularities, which showcases the efficiency and convenience that AI-powered apps bring ",
              "score": 65.148,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "In the movie, I filled an elderly resident who uses a smart watch to monitor her heart-rates and alrt her to irregdarities, which shwwases the efficiency and convenience that AI-powered apps bring to ",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 irregdarities 换成  irregularities ",
              "improvedExample": "In the movie, I filmed an elderly resident who uses a smart watch to monitor her heart rates and alert her to irregularities, which showcases the efficiency and convenience that AI-powered apps bring ",
              "score": 65.148,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "In the movie, I filled an elderly resident who uses a smart watch to monitor her heart-rates and alrt her to irregdarities, which shwwases the efficiency and convenience that AI-powered apps bring to ",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 shwwases 换成  showcases ",
              "improvedExample": "In the movie, I filmed an elderly resident who uses a smart watch to monitor her heart rates and alert her to irregularities, which showcases the efficiency and convenience that AI-powered apps bring ",
              "score": 65.148,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Athugh there are plenty of difficulties emerging in the process, I've not only gained a deep incinght into how tecnlyy powered chinese peode's lives, but also realized that technology should be used t",
              "issueExplanation": "拼写错误：拼写错误",
              "revisionSuggestion": "建议把 Athugh 换成  Although ",
              "improvedExample": "Although there are plenty of difficulties emerging in the process, I've not only gained a deep insight into how technology-powered Chinese people's lives are affected, but also realized that technolog",
              "score": 65.148,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        },
        {
          "problemType": "language_accuracy",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Athugh there are plenty of difficulties emerging in the process, I've not only gained a deep incinght into how tecnlyy powered chinese peode's lives, but also realized that technology should be used t",
              "issueExplanation": "语态错误：语态错误",
              "revisionSuggestion": "建议把 tecnlyy powered chinese peode's lives 换成  technology-powered Chinese people's lives are affected ",
              "improvedExample": "Although there are plenty of difficulties emerging in the process, I've not only gained a deep insight into how technology-powered Chinese people's lives are affected, but also realized that technolog",
              "score": 65.148,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Greetings! I'm glad to know that you are interested about the activity whose theme is \"smart drawing China.\"",
              "issueExplanation": "词法错误：介词错误",
              "revisionSuggestion": "建议把 about 换成  in ",
              "improvedExample": "Greetings! I'm glad to know that you are interested in the activity whose theme is \"Smart Drawing China.\"",
              "score": 56.745926,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Greetings! I'm glad to know that you are interested about the activity whose theme is \"smart drawing China.\"",
              "issueExplanation": "词性误用：词性误用",
              "revisionSuggestion": "建议把 smart drawing 换成  Smart Drawing ",
              "improvedExample": "Greetings! I'm glad to know that you are interested in the activity whose theme is \"Smart Drawing China.\"",
              "score": 56.745926,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Let me share the detail wil you.",
              "issueExplanation": "单复数错误：单复数错误",
              "revisionSuggestion": "建议把 detail 换成  details ",
              "improvedExample": "Let me share the details with you.",
              "score": 56.745926,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "This work shows chinese great progress in technology during the past Po decades, which embodies the Chinese's spirit of countinuly innorating.",
              "issueExplanation": "词性误用：词性误用",
              "revisionSuggestion": "建议把 chinese 换成  China's ",
              "improvedExample": "This work shows China's great progress in technology during the past two decades, which embodies the Chinese spirit of continually innovating.",
              "score": 56.745926,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "This activity makes me gained a lot.",
              "issueExplanation": "时态错误：时态错误",
              "revisionSuggestion": "建议把 makes me gained 换成  has made me gain ",
              "improvedExample": "This activity has made me gain a lot.",
              "score": 56.745926,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Through this activity, I have acknowledged the high speed of Chinese technology development as well as boost my confidence of China speed.",
              "issueExplanation": "词性误用：词性误用",
              "revisionSuggestion": "建议把 technology 换成  technological ",
              "improvedExample": "Through this activity, I have acknowledged the high speed of Chinese technological development as well as boosted my confidence in China's speed.",
              "score": 56.745926,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Through this activity, I have acknowledged the high speed of Chinese technology development as well as boost my confidence of China speed.",
              "issueExplanation": "词法错误：介词错误",
              "revisionSuggestion": "建议把 of 换成  in ",
              "improvedExample": "Through this activity, I have acknowledged the high speed of Chinese technological development as well as boosted my confidence in China's speed.",
              "score": 56.745926,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Through this activity, I have acknowledged the high speed of Chinese technology development as well as boost my confidence of China speed.",
              "issueExplanation": "所属关系错误：所属关系错误",
              "revisionSuggestion": "建议在 speed 之前插入 's",
              "improvedExample": "Through this activity, I have acknowledged the high speed of Chinese technological development as well as boosted my confidence in China's speed.",
              "score": 56.745926,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "I have also been more proud of China, wanting to spread this confident to world by this work.",
              "issueExplanation": "比较级最高级错误：形容词比较级错误",
              "revisionSuggestion": "建议把 more proud 换成  prouder ",
              "improvedExample": "I have also been prouder of China, wanting to spread this confidence to the world through this work.",
              "score": 56.745926,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        },
        {
          "problemType": "structure_unclear",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Greetings! Knowing that you are interested in the technlong powered activity themed \"Intelligent China,\" want to share my workant with you.",
              "issueExplanation": "句子结构错误：句子成分残缺",
              "revisionSuggestion": "建议在 want 之前插入 I",
              "improvedExample": "Greetings! Knowing that you are interested in the technology-powered activity themed \"Intelligent China,\" I want to share my work with you.",
              "score": 65.148,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24754452",
              "studentName": "秦宇昂",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "'ve gained a lot during this meaningful activity.",
              "issueExplanation": "句子结构错误：句子成分残缺",
              "revisionSuggestion": "建议把 've 换成  I've ",
              "improvedExample": "I've gained a lot during this meaningful activity.",
              "score": 65.148,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24754470",
              "studentName": "张瀚夫",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Through this activity, I have acknowledged the high speed of Chinese technology development as well as boost my confidence of China speed.",
              "issueExplanation": "句子结构错误：并列结构错误",
              "revisionSuggestion": "建议把 boost 换成  boosted ",
              "improvedExample": "Through this activity, I have acknowledged the high speed of Chinese technological development as well as boosted my confidence in China's speed.",
              "score": 56.745926,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24754460",
              "studentName": "王乔楚",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "What do you think of it? Awaiting your response,",
              "issueExplanation": "句子结构错误：句子成分残缺",
              "revisionSuggestion": "建议把 Awaiting your response, 换成  I am awaiting your response. ",
              "improvedExample": "What do you think of it? I am awaiting your response.",
              "score": 79.41972,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24747588",
              "studentName": "张博悦",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "I used to think AI would truly draw under my requests, but surprised, AI not only increased simple items, but added people in my surprised, AI devoted to construct China who are Maoze Dong, Zheuen Lai",
              "issueExplanation": "句子结构错误：句子成分残缺",
              "revisionSuggestion": "建议把 surprised 换成  to my surprise ",
              "improvedExample": "I used to think AI would truly draw according to my requests, but to my surprise, AI not only added simple items but also added people. To my surprise, AI devoted itself to constructing China by inclu",
              "score": 64.47647,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24747588",
              "studentName": "张博悦",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Please feel free to discuss with me.",
              "issueExplanation": "句子结构错误：句子成分残缺",
              "revisionSuggestion": "建议在 with 之前插入 it",
              "improvedExample": "Please feel free to discuss it with me.",
              "score": 64.47647,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24747569",
              "studentName": "潘好",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "It's convenient to gain more knowledge about Chinese traditional culture at home.",
              "issueExplanation": "句子结构错误：语序错误",
              "revisionSuggestion": "建议把 Chinese traditional 换成  traditional Chinese ",
              "improvedExample": "It's convenient to gain more knowledge about traditional Chinese culture at home.",
              "score": 67.31937,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24754428",
              "studentName": "周恩昊",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "In the bottom, you can see AI-powered robots guiding passengers, helping seniors to reach the correct platform.",
              "issueExplanation": "句子结构错误：错误使用逗号连接两个完整句子",
              "revisionSuggestion": "建议把 , 换成  and ",
              "improvedExample": "At the bottom, you can see AI-powered robots guiding passengers and helping seniors to reach the correct platform.",
              "score": 74.33613,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24747560",
              "studentName": "柯奕铭",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "I used to think China's technology follows foreign, but through my notice on the robots used in daily life such as these running robots in maratiban I realized that China can share and lead the techno",
              "issueExplanation": "句子结构错误：句子成分残缺",
              "revisionSuggestion": "建议在 , 之前插入 countries",
              "improvedExample": "I used to think China's technology follows foreign countries, but through my observation of the robots used in daily life, such as these running robots in marathons, I realize that China can share and",
              "score": 52.089485,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24747560",
              "studentName": "柯奕铭",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "I used to think China's technology follows foreign, but through my notice on the robots used in daily life such as these running robots in maratiban I realized that China can share and lead the techno",
              "issueExplanation": "句子结构错误：并列结构错误",
              "revisionSuggestion": "建议把 realized 换成  realize ",
              "improvedExample": "I used to think China's technology follows foreign countries, but through my observation of the robots used in daily life, such as these running robots in marathons, I realize that China can share and",
              "score": 52.089485,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        },
        {
          "problemType": "format_issue",
          "items": [
            {
              "id": "wi-000",
              "studentId": "24754494",
              "studentName": "李彦君",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Greeting! Learning that you are interested in my experience of \"Technologe Smartly. Write the Picture of China,\", infoodnce to I would event called. like to fronnce my works you.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议把 . 换成  : ",
              "improvedExample": "Greeting! Learning that you are interested in my experience of \"Technology Smartly: Write the Picture of China,\" I would like to introduce my works to you by participating in this event.",
              "score": 60.545082,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-001",
              "studentId": "24754423",
              "studentName": "于博然",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "My work is named \"Digital intelligent health system\" consisting of two parts: \" \" Maintaining Sports\" and \"Smart diet\" For sports, it allows students to choose different activities, from football to s",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 intelligent health system 换成  Intelligent Health System, ",
              "improvedExample": "My work is named \"Digital Intelligent Health System,\" consisting of two parts: \"Maintaining Sports\" and \"Smart Diet.\" For sports, it allows students to choose different activities, from football to sh",
              "score": 62.186523,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-002",
              "studentId": "24754423",
              "studentName": "于博然",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Besides, It provide recommendation of food and drinks, cutting back on sugary and snacks a, with detailed nutrition labels of each foods..",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议把 .. 换成  . ",
              "improvedExample": "Besides, it provides recommendations of food and drinks, cutting back on sugary snacks, with detailed nutrition labels of each food.",
              "score": 62.186523,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-003",
              "studentId": "24747569",
              "studentName": "潘好",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "I developed an App which includes my drawings about Chinese famous attractions, such as the Forbidden City and the Great Wall.",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 App 换成  app ",
              "improvedExample": "I developed an app which includes my drawings of famous Chinese attractions, such as the Forbidden City and the Great Wall.",
              "score": 67.31937,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-004",
              "studentId": "24754428",
              "studentName": "周恩昊",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Beside the screen, each platform is signed red, yellow or green, which means how long the line is, effectively reduces unnecessary waste of time on waiting.",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议在 or 之前插入 ,",
              "improvedExample": "Beside the screen, each platform is marked red, yellow, or green, which indicates how long the line is and effectively reduces unnecessary waste of time waiting.",
              "score": 74.33613,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-005",
              "studentId": "24747560",
              "studentName": "柯奕铭",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Feeling deligted that you are interested in my engagement of \"Lainting China tech-intelligent collection event, I'm writing this letter to share some details.",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 tech 换成  Tech ",
              "improvedExample": "Feeling delighted that you are interested in my engagement in the \"Painting China Tech-Intelligent Collection\" event, I'm writing this letter to share some details.",
              "score": 52.089485,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-006",
              "studentId": "24747560",
              "studentName": "柯奕铭",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "Feeling deligted that you are interested in my engagement of \"Lainting China tech-intelligent collection event, I'm writing this letter to share some details.",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 intelligent collection 换成  Intelligent Collection\" ",
              "improvedExample": "Feeling delighted that you are interested in my engagement in the \"Painting China Tech-Intelligent Collection\" event, I'm writing this letter to share some details.",
              "score": 52.089485,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-007",
              "studentId": "24747560",
              "studentName": "柯奕铭",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "I used to think China's technology follows foreign, but through my notice on the robots used in daily life such as these running robots in maratiban I realized that China can share and lead the techno",
              "issueExplanation": "标点与格式错误：标点错误",
              "revisionSuggestion": "建议在 such 之前插入 ,",
              "improvedExample": "I used to think China's technology follows foreign countries, but through my observation of the robots used in daily life, such as these running robots in marathons, I realize that China can share and",
              "score": 52.089485,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-008",
              "studentId": "24754458",
              "studentName": "王李嘉瑞",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "the family move with an ly moe a point, actively showing Chinese traditional acltun and I learned that AI works best when combined with cultural preserving.",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 the 换成  The ",
              "improvedExample": "The family moves with an lively mood and a point, actively showing Chinese traditional culture, and I learned that AI works best when combined with cultural preservation.",
              "score": 58.18612,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            },
            {
              "id": "wi-009",
              "studentId": "24747593",
              "studentName": "朱浩尘",
              "essayTitle": "5月23日 英语测练",
              "taskName": "5月23日 英语测练",
              "writingType": "practical",
              "originalText": "This image's most special seature is that it is not a stable picture, but a combination of 12 pictures t which shows the sights of Boring Jin Dynasty to the present day, and gradually it can change th",
              "issueExplanation": "标点与格式错误：大小写错误",
              "revisionSuggestion": "建议把 of Boring 换成  from the boring ",
              "improvedExample": "This image's most special feature is that it is not a stable picture, but a combination of 12 pictures which show the sights from the boring Jin Dynasty to the present day, and gradually it can change",
              "score": 73.60586,
              "answerSheetImageUrl": "",
              "fullEssayId": ""
            }
          ]
        }
      ],
      "weakStudents": [
        {
          "id": "24747529",
          "name": "王子墨",
          "averageScore": 33.0,
          "level": "D",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 48.1
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 33.3
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 18.5
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 16.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 16.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 16.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 16.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 16.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747586",
          "name": "杨昀翰",
          "averageScore": 36.1,
          "level": "D",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 61.9
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 26.2
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 9.5
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 2.4
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 7.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 7.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 7.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 7.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 7.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747552",
          "name": "陈孝校",
          "averageScore": 45.5,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 49.6
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 39.7
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 7.8
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 3.0
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 41.56842,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 41.56842,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 41.56842,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 41.56842,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 41.56842,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747521",
          "name": "马欣然",
          "averageScore": 47.5,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 50.2
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 39.2
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 8.4
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 2.3
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 16.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 16.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 16.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 16.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 16.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747541",
          "name": "赵朔羲",
          "averageScore": 50.7,
          "level": "C",
          "mainProblemTypes": [
            "语言准确性弱 / 语法错误多",
            "词汇表达弱 / 用词单一",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 44.7
            },
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 44.3
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 8.2
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 2.7
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 52.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 52.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 52.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 52.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 52.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747576",
          "name": "王梓木",
          "averageScore": 50.7,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "格式规范问题 / 应用文格式"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 55.2
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 34.3
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 7.6
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 2.9
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 55.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 55.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 55.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 55.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 55.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24754408",
          "name": "滕易朴",
          "averageScore": 52.6,
          "level": "C",
          "mainProblemTypes": [
            "语言准确性弱 / 语法错误多",
            "词汇表达弱 / 用词单一",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 42.7
            },
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 41.3
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 9.3
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 6.7
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 19.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 19.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 19.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 19.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 19.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747582",
          "name": "徐若芊",
          "averageScore": 53.3,
          "level": "C",
          "mainProblemTypes": [
            "语言准确性弱 / 语法错误多",
            "词汇表达弱 / 用词单一",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 46.3
            },
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 32.9
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 10.7
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 10.1
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 58.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 58.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 58.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 58.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 58.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24754494",
          "name": "李彦君",
          "averageScore": 54.1,
          "level": "C",
          "mainProblemTypes": [
            "语言准确性弱 / 语法错误多",
            "词汇表达弱 / 用词单一",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 43.5
            },
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 40.7
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 11.7
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 4.2
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 60.545082,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 60.545082,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 60.545082,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 60.545082,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 60.545082,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24754462",
          "name": "吴骁航",
          "averageScore": 54.5,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "格式规范问题 / 应用文格式"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 51.7
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 39.7
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 5.2
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 3.4
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 75.5017,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.5017,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.5017,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.5017,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 75.5017,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747528",
          "name": "王语含",
          "averageScore": 54.7,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 45.6
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 38.2
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 11.1
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 5.1
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 61.507874,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 61.507874,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 61.507874,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 61.507874,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 61.507874,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747526",
          "name": "王铭泽",
          "averageScore": 55.1,
          "level": "C",
          "mainProblemTypes": [
            "语言准确性弱 / 语法错误多",
            "词汇表达弱 / 用词单一",
            "格式规范问题 / 应用文格式"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 47.4
            },
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 41.4
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 5.6
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 5.6
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 61.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 61.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 61.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 61.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 61.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24754452",
          "name": "秦宇昂",
          "averageScore": 55.4,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "格式规范问题 / 应用文格式"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 66.1
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 28.1
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 4.1
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 1.7
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 65.148,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 65.148,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 65.148,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 65.148,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 65.148,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24747593",
          "name": "朱浩尘",
          "averageScore": 55.9,
          "level": "C",
          "mainProblemTypes": [
            "语言准确性弱 / 语法错误多",
            "词汇表达弱 / 用词单一",
            "结构不清 / 段落组织弱"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 41.7
            },
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 39.1
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 11.5
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 7.7
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 73.60586,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 73.60586,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 73.60586,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 73.60586,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 73.60586,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        },
        {
          "id": "24754454",
          "name": "师若棋",
          "averageScore": 56.0,
          "level": "C",
          "mainProblemTypes": [
            "词汇表达弱 / 用词单一",
            "语言准确性弱 / 语法错误多",
            "格式规范问题 / 应用文格式"
          ],
          "typicalSentence": "",
          "relatedTasks": [],
          "scoreTrend": "stable",
          "problemDistribution": [
            {
              "type": "vocabulary_weak",
              "label": "词汇表达弱 / 用词单一",
              "percent": 54.8
            },
            {
              "type": "language_accuracy",
              "label": "语言准确性弱 / 语法错误多",
              "percent": 35.7
            },
            {
              "type": "format_issue",
              "label": "格式规范问题 / 应用文格式",
              "percent": 4.8
            },
            {
              "type": "structure_unclear",
              "label": "结构不清 / 段落组织弱",
              "percent": 4.8
            }
          ],
          "answerSheetImageUrl": "",
          "fullEssayIds": [],
          "recentScores": [
            {
              "taskName": "写作任务",
              "score": 1.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 1.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 1.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 1.0,
              "date": ""
            },
            {
              "taskName": "写作任务",
              "score": 1.0,
              "date": ""
            }
          ],
          "revisionSuggestions": [
            "加强语法基础",
            "积累词汇"
          ]
        }
      ],
      "excellentWritings": [
        {
          "id": "ew-747518",
          "studentId": "24747518",
          "studentName": "刘芮希",
          "essayTitle": "海淀一模-未来已来",
          "taskName": "海淀一模-未来已来",
          "writingType": "practical",
          "score": 90.0,
          "level": "A",
          "highlights": "得分90.0分，含佳句",
          "excerpt": "{I'm delighted to invite you to our school's upcoming \\\"The Future is Here\\\" tech festival, which will be held next Friday from 2 p.m. to 5 p.m. in the school auditorium.\\n\\nThe event will feature a series of exciting activities. First, we will have a keynote speech by a tech expert on cutting-edge technologies like AI and smart cities. Then, there will be a student innovation exhibition, where you can see our homemade tech projects, such as AI-assisted learning tools and smart home devices. Fin",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747518",
          "studentId": "24747518",
          "studentName": "刘芮希",
          "essayTitle": "4月29日 英语测练",
          "taskName": "4月29日 英语测练",
          "writingType": "practical",
          "score": 90.0,
          "level": "A",
          "highlights": "得分90.0分，含佳句",
          "excerpt": "{Subject: Advice on Choosing a Major Amid AI Development\\n\\nDear Jim,\\n\\nI'm sorry to hear you're confused about choosing a major amid AI's growing influence. You asked me for advice, so I'm writing to share my thoughts with you.\\n\\nAI is reshaping the job market. It replaces routine, repetitive jobs and creates new, human-centered roles that demand creativity and adaptability. Given these changes, I recommend you choose computer science with a focus on AI technology. First, this major lets you ",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747518",
          "studentId": "24747518",
          "studentName": "刘芮希",
          "essayTitle": "0331测练",
          "taskName": "0331测练",
          "writingType": "practical",
          "score": 87.0,
          "level": "A",
          "highlights": "得分87.0分",
          "excerpt": "{I'm delighted to hear that you're interested in the art exhibition themed \\\"The Most Respected Workers\\\" held in our school recently. I'd like to tell you more about it.\\nThe exhibition showcased a diverse range of student works, including vivid photographs capturing the daily efforts of cleaners, delivery workers, and teachers; moving paintings of people working hard; and beautiful handmade crafts. Every piece showed our true respect for ordinary workers.\\nWandering through the exhibition, I w",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747518",
          "studentId": "24747518",
          "studentName": "刘芮希",
          "essayTitle": "4月22日 英语测练",
          "taskName": "4月22日 英语测练",
          "writingType": "practical",
          "score": 85.14768,
          "level": "A",
          "highlights": "得分85.14768分，含佳句",
          "excerpt": "{Dear Jim,\\n\\nI'm writing to reply to your question about the speech content for the UN Youth Forum on \\\"Skills Needed for a Sustainable Future.\\\" I'd like to share my thoughts with you.\\n\\nFirst and foremost, collaborative skills are essential. Global challenges like climate change are too complex for one person to solve alone. Working with others allows us to share strengths, exchange ideas, and create practical solutions that benefit the whole world.\\n\\nBesides, adaptability is another key sk",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747518",
          "studentId": "24747518",
          "studentName": "刘芮希",
          "essayTitle": "5月21日 英语测练",
          "taskName": "5月21日 英语测练",
          "writingType": "practical",
          "score": 82.68094,
          "level": "A",
          "highlights": "得分82.68094分，含佳句",
          "excerpt": "{Dear Jim,\\n\\nI'm sorry to hear about your recent experience, and I'd like to share my thoughts about AI and study with you. Overusing AI for assignments weakens critical thinking and independent learning. Take English essay writing for example: we should never outsource our core ideas to AI. Instead, we can first develop our own arguments, then use AI to polish wording or refine grammar. Rather than seeking direct answers, we can use AI to explain confusing points or offer alternative perspecti",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754421",
          "studentId": "24754421",
          "studentName": "杨梓涵",
          "essayTitle": "4月22日 英语测练",
          "taskName": "4月22日 英语测练",
          "writingType": "practical",
          "score": 82.3685,
          "level": "A",
          "highlights": "得分82.3685分",
          "excerpt": "{Dear Jim,\\n\\nI'm writing to reply to your question about the speech content for the UN Youth Forum themed \\\"Skills Needed for a Sustainable Future.\\\" Here are my thoughts.\\n\\nI believe that a creative mindset is an important skill for a sustainable future. Creativity helps us come up with new ideas and solutions that can push society forward in a sustainable way. It also shows how unique we are compared to AI and medicine. Besides creativity, teamwork and cooperation are essential skills becaus",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754421",
          "studentId": "24754421",
          "studentName": "杨梓涵",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "score": 81.36445,
          "level": "A",
          "highlights": "得分81.36445分，含佳句",
          "excerpt": "{Dear Jim,\\n\\nThank you for your letter and your interest in the \\\"Painting China with Intelligence\\\" technology-powered original work collection. I am happy to share with you my project and my feelings about this activity.\\n\\nMy original work is a design of a smart charging station for electric vehicles (EVs). Since EVs represent the future of green transportation with their long range and advanced charging technology, it is important to develop a smart charging station or even a system to supp",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-754421",
          "studentId": "24754421",
          "studentName": "杨梓涵",
          "essayTitle": "丰台区2025～2026学年度第一学期期末练习",
          "taskName": "丰台区2025～2026学年度第一学期期末练习",
          "writingType": "practical",
          "score": 81.0,
          "level": "A",
          "highlights": "得分81.0分",
          "excerpt": "{Becoming a Better Self\\nTo me, \\\"becoming a better self\\\" means achieving balanced growth in three important areas: academic, physical, and mental development. We cannot truly become better unless we improve ourselves in all these aspects.\\nTo achieve this, I focus on finding my own pace and methods in studying to improve my academic efficiency. At the same time, I make sure to exercise every day to keep my body and mind energetic and healthy. Lastly, having a strong mindset is essential to fac",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747562",
          "studentId": "24747562",
          "studentName": "李禹辰",
          "essayTitle": "5月21日 英语测练",
          "taskName": "5月21日 英语测练",
          "writingType": "practical",
          "score": 79.97051,
          "level": "B",
          "highlights": "得分79.97051分，含佳句",
          "excerpt": "{Dear Jim,\\n\\nI am writing to reply to your question about being criticized for using AI tools to complete your writing assignment. I understand your feelings and would like to share my thoughts.\\n\\nIn my opinion, using AI tools is understandable since we live in an AI age, and many students use them to help finish their work. However, relying too much on AI can weaken our ability to learn independently. Therefore, I suggest you use AI as a thinking partner rather than a tool to provide direct a",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        },
        {
          "id": "ew-747516",
          "studentId": "24747516",
          "studentName": "刘冠临",
          "essayTitle": "5月28日 英语测练",
          "taskName": "5月28日 英语测练",
          "writingType": "practical",
          "score": 79.78299,
          "level": "B",
          "highlights": "得分79.78299分，含佳句",
          "excerpt": "{Dear Jim,\\n\\nThank you for your letter and your interest in the activities our school's student union organized during World Reading Day. I'm happy to share the details with you.\\n\\nDuring World Reading Day, our student union arranged a 15-minute silent reading activity in the library. At a fixed time every day, students come into the reading room, put down their phones, and read quietly for 15 minutes without talking or discussing. At first, some people felt it was a bit awkward, but as they k",
          "fullEssayId": "",
          "answerSheetImageUrl": ""
        }
      ],
      "recommendedResources": [
        {
          "id": "res-w-1",
          "title": "应用文写作模板训练",
          "resourceType": "writing_practice",
          "tags": [
            "写作",
            "应用文"
          ],
          "difficulty": "medium",
          "grade": "高二",
          "recommendReason": "针对词汇表达弱 / 用词单一设计",
          "canPreview": true,
          "canAssign": true,
          "canAddToPaperBasket": true
        }
      ],
      "generatedSamples": [
        {
          "id": "gs-1",
          "level": "basic",
          "title": "基础版 — 赵朔羲的作文",
          "content": "{Dear Jim,\\n\\nI am writing to reply to your inquiry about the activities organized by our school during World Reading Day. I am glad to share the details with you.\\n\\nThe event was divided into two parts. Offline, I designed a wandering Bookshelf in a corner of the library. Everyone could bring a book they love to the Bookshelf and take one they haven't read. When taking a book, you could leave a small note inside. This created a silent conversation between readers who borrowed the same book. Online, there was a 21-Day Reading Check-in. We created a reading group to encourage members to read books every day during the activity, helping us develop good reading habits.\\n\\nDuring this event, I realized the significance of reading and was inspired to keep up my reading habit because of the atmosphere created by these activities. I clearly felt the beauty of reading.\\n\\nDo you like this event? If you want to know more, please write to me again.\\n\\nBest wishes,\\nLi Hua}",
          "highlights": "得分49.961216分 | 适合基础薄弱学生参考基本结构",
          "suitableFor": "20分以下",
          "editable": true
        },
        {
          "id": "gs-2",
          "level": "improved",
          "title": "提升版 — 王语含的作文",
          "content": "{Subject: Suggestions for Your Speech at the UN Youth Forum\\n\\nDear Jim,\\n\\nI'm thrilled to hear that you are going to take part in the UN Youth Forum named \\\"Skills Needed for a Sustainable Future.\\\" It is an honor to give you some initial ideas and suggestions. \\n\\nFocusing on the core concept of a sustainable future, as the tight connections between countries increase, we face many common challenges, such as global warming. In this context, communication skills are essential for cross-cultural communication. We need to cultivate fluent English and correct vocabulary to bridge the gap between different cultures. Moreover, living in the AI era, as teenagers, we should develop creativity, which is the unique skill that humans have apart from AI. In this way, more technologies will be invented and used in greener ways.\\n\\nWhat are your ideas? If you have any questions, please let me know.\\n\\nBest wishes,\\nLi Hua}",
          "highlights": "得分63.387802分 | 展示中等水平如何组织内容和句式",
          "suitableFor": "20-25分",
          "editable": true
        },
        {
          "id": "gs-3",
          "level": "excellent",
          "title": "优秀版 — 刘芮希的作文",
          "content": "{I'm delighted to invite you to our school's upcoming \\\"The Future is Here\\\" tech festival, which will be held next Friday from 2 p.m. to 5 p.m. in the school auditorium.\\n\\nThe event will feature a series of exciting activities. First, we will have a keynote speech by a tech expert on cutting-edge technologies like AI and smart cities. Then, there will be a student innovation exhibition, where you can see our homemade tech projects, such as AI-assisted learning tools and smart home devices. Finally, we'll hold a hands-on workshop, allowing you to experience UK technology and interact with the latest products.\\n\\nI know you have a great passion for technology, so this event is perfect for you. It will not only broaden your horizons but also give you a chance to communicate with like-minded students. I hope you can join us! I'm looking forward to your reply.}",
          "highlights": "得分90.0分，含佳句 | 展示高分作文的表达水平",
          "suitableFor": "25+分",
          "editable": true
        }
      ],
      "interventionRecords": []
    }
  }
}

import type { WritingInsightData } from "./writingInsightTypes";

export const WRITING_REAL_DATA: WritingInsightData = {
  "classId": "class-2023级R6班",
  "className": "2023级R6班",
  "unitId": "real-data",
  "unitName": "平台真实数据",
  "timeRange": "30d",
  "updatedAt": "2026-06-11 11:05",
  "summary": "基于 2023级R6班 共 36 名学生的 5010 条作文批改数据，全部为应用文，平均得分 60.8 分。主要问题为「词汇表达弱 / 用词单一」（占比45.4%），其次为「语言准确性弱 / 语法错误多」。薄弱学生（平均分<60）13 人。",
  "metrics": {
    "averageScore": 60.8,
    "averageLevel": "B",
    "reviewedEssayCount": 5010,
    "mainProblemType": "词汇表达弱 / 用词单一",
    "weakStudentCount": 13,
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
      "affectedStudentCount": 36,
      "typicalPerformance": "(2277/5010)",
      "aiReason": "从5010条写作记录中分析，「词汇表达弱 / 用词单一」共出现2277次，占比45.4%，是2023级R6班写作中最突出的问题。",
      "recommendedActions": [
        "推荐写作练习",
        "范文生成"
      ],
      "examples": [
        "I applied 30 techs and animation creating techs to my paintings of my school sce",
        "Emponered by 30 techs, mrygialimtings were transformed into 30 models, providing",
        "Emponered by 30 techs, mrygialimtings were transformed into 30 models, providing"
      ]
    },
    {
      "id": "pt-language_accuracy",
      "type": "language_accuracy",
      "label": "语言准确性弱 / 语法错误多",
      "borderColor": "#7b9cd6",
      "bgColor": "#f0f4fc",
      "percent": 41.9,
      "affectedStudentCount": 35,
      "typicalPerformance": "(2098/5010)",
      "aiReason": "从5010条写作记录中分析，「语言准确性弱 / 语法错误多」共出现2098次，占比41.9%，是2023级R6班写作中最突出的问题。",
      "recommendedActions": [
        "推荐写作练习",
        "范文生成"
      ],
      "examples": [
        "I applied 30 techs and animation creating techs to my paintings of my school sce",
        "For instance, the winter painting demonstrated a fascinating scenery that the wh",
        "For instance, the winter painting demonstrated a fascinating scenery that the wh"
      ]
    },
    {
      "id": "pt-structure_unclear",
      "type": "structure_unclear",
      "label": "结构不清 / 段落组织弱",
      "borderColor": "#f0a060",
      "bgColor": "#fef8f0",
      "percent": 7.7,
      "affectedStudentCount": 34,
      "typicalPerformance": "(385/5010)",
      "aiReason": "从5010条写作记录中分析，「结构不清 / 段落组织弱」共出现385次，占比7.7%，是2023级R6班写作中最突出的问题。",
      "recommendedActions": [
        "推荐写作练习",
        "范文生成"
      ],
      "examples": [
        "The film also showcast that advanced eletronical vehicles reduce carbon emission",
        "While preparing the vedio, I not only shocked with how cutting-edge technology i",
        "What do you think about this activity? Await your reply."
      ]
    },
    {
      "id": "pt-format_issue",
      "type": "format_issue",
      "label": "格式规范问题 / 应用文格式",
      "borderColor": "#9ab3cc",
      "bgColor": "#f5f7fa",
      "percent": 5.0,
      "affectedStudentCount": 35,
      "typicalPerformance": "(250/5010)",
      "aiReason": "从5010条写作记录中分析，「格式规范问题 / 应用文格式」共出现250次，占比5.0%，是2023级R6班写作中最突出的问题。",
      "recommendedActions": [
        "推荐写作练习",
        "范文生成"
      ],
      "examples": [
        "Greetings! Knowing your keen interest in the event themed \"Chinese Tech-empowere",
        "I'm thrilled to hear about your interest in my participation in the \"Intelligenc",
        "Among them were security guards in night shifts watching at school gates, delive"
      ]
    }
  ],
  "highFrequencyIssues": [
    {
      "problemType": "vocabulary_weak",
      "items": [
        {
          "id": "wi-000",
          "studentId": "24754400",
          "studentName": "刘嘉来",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "I applied 30 techs and animation creating techs to my paintings of my school scenes for each seasons.",
          "issueExplanation": "拼写错误：拼写错误",
          "revisionSuggestion": "建议把   换成  - ",
          "improvedExample": "I applied 30 techs and animation-creating techs to my paintings of my school scenes for each season.",
          "score": 78.66475,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-001",
          "studentId": "24754400",
          "studentName": "刘嘉来",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Emponered by 30 techs, mrygialimtings were transformed into 30 models, providing a more vivid appreciating experience.",
          "issueExplanation": "拼写错误：拼写错误",
          "revisionSuggestion": "建议把 Emponered 换成  Empowered ",
          "improvedExample": "Empowered by 30 techs, my original paintings were transformed into 30 models, providing a more vivid appreciating experience.",
          "score": 78.66475,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-002",
          "studentId": "24754400",
          "studentName": "刘嘉来",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Emponered by 30 techs, mrygialimtings were transformed into 30 models, providing a more vivid appreciating experience.",
          "issueExplanation": "拼写错误：拼写错误",
          "revisionSuggestion": "建议把 mrygialimtings 换成  my original paintings ",
          "improvedExample": "Empowered by 30 techs, my original paintings were transformed into 30 models, providing a more vivid appreciating experience.",
          "score": 78.66475,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-003",
          "studentId": "24754400",
          "studentName": "刘嘉来",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Besides, the animation creating techs allowed my artworks to move visually.",
          "issueExplanation": "拼写错误：拼写错误",
          "revisionSuggestion": "建议把   换成  - ",
          "improvedExample": "Besides, the animation-creating techs allowed my artworks to move visually.",
          "score": 78.66475,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-004",
          "studentId": "24754400",
          "studentName": "刘嘉来",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "For instance, the winter painting demonstrated a fascinating scenery that the white snow fell down softly and quietly, which created the soul for my artworks.",
          "issueExplanation": "拼写错误：拼写错误",
          "revisionSuggestion": "建议把 scenery 换成  scene ",
          "improvedExample": "For instance, the winter painting demonstrated a fascinating scene in which the white snow fell down softly and quietly, which created the soul of my artworks.",
          "score": 78.66475,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-005",
          "studentId": "24754400",
          "studentName": "刘嘉来",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Feeling satisfied and inspired, I realise how important techs mean motiviting mean to art paintings nowadays.",
          "issueExplanation": "拼写错误：拼写错误",
          "revisionSuggestion": "建议把 mean motiviting mean 换成  are as motivating means ",
          "improvedExample": "Feeling satisfied and inspired, I realise how important techs are as motivating means to art paintings nowadays.",
          "score": 78.66475,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-006",
          "studentId": "24747561",
          "studentName": "李铭宸",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Then an istanding AI-powered tool gathered them in one picture perifectly",
          "issueExplanation": "拼写错误：拼写错误",
          "revisionSuggestion": "建议把 istanding 换成  outstanding ",
          "improvedExample": "Then an outstanding AI-powered tool gathered them in one picture perfectly.",
          "score": 83.47629,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-007",
          "studentId": "24747561",
          "studentName": "李铭宸",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Then an istanding AI-powered tool gathered them in one picture perifectly",
          "issueExplanation": "拼写错误：拼写错误",
          "revisionSuggestion": "建议把 perifectly 换成  perfectly. ",
          "improvedExample": "Then an outstanding AI-powered tool gathered them in one picture perfectly.",
          "score": 83.47629,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-008",
          "studentId": "24754404",
          "studentName": "齐韵如",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "My design is a short cartoon film made by Al tools and my innovation.",
          "issueExplanation": "拼写错误：拼写错误",
          "revisionSuggestion": "建议把 Al 换成  AI ",
          "improvedExample": "My design is a short cartoon film made by AI tools and my innovation.",
          "score": 65.038055,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-009",
          "studentId": "24754404",
          "studentName": "齐韵如",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "In the film, I showed how technology leads our life more smart and convenient.",
          "issueExplanation": "用词错误：用词错误",
          "revisionSuggestion": "建议把 leads 换成  makes ",
          "improvedExample": "In the film, I showed how technology makes our life smarter and more convenient.",
          "score": 65.038055,
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
          "studentId": "24754400",
          "studentName": "刘嘉来",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "I applied 30 techs and animation creating techs to my paintings of my school scenes for each seasons.",
          "issueExplanation": "单复数错误：单复数错误",
          "revisionSuggestion": "建议把 seasons 换成  season ",
          "improvedExample": "I applied 30 techs and animation-creating techs to my paintings of my school scenes for each season.",
          "score": 78.66475,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-001",
          "studentId": "24754400",
          "studentName": "刘嘉来",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "For instance, the winter painting demonstrated a fascinating scenery that the white snow fell down softly and quietly, which created the soul for my artworks.",
          "issueExplanation": "词法错误：介词错误",
          "revisionSuggestion": "建议把 that 换成  in which ",
          "improvedExample": "For instance, the winter painting demonstrated a fascinating scene in which the white snow fell down softly and quietly, which created the soul of my artworks.",
          "score": 78.66475,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-002",
          "studentId": "24754400",
          "studentName": "刘嘉来",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "For instance, the winter painting demonstrated a fascinating scenery that the white snow fell down softly and quietly, which created the soul for my artworks.",
          "issueExplanation": "词法错误：介词错误",
          "revisionSuggestion": "建议把 for 换成  of ",
          "improvedExample": "For instance, the winter painting demonstrated a fascinating scene in which the white snow fell down softly and quietly, which created the soul of my artworks.",
          "score": 78.66475,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-003",
          "studentId": "24754400",
          "studentName": "刘嘉来",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "The activity is so that it fuels me to combine high techs with my own art paintings, inspiring me to try to create in a new way.",
          "issueExplanation": "词法错误：连词错误",
          "revisionSuggestion": "建议把 so 换成  such ",
          "improvedExample": "The activity is such that it fuels me to combine high techs with my own art paintings, inspiring me to try to create in a new way.",
          "score": 78.66475,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-004",
          "studentId": "24747561",
          "studentName": "李铭宸",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "My work is an AI-generated picture featured numerous workers in China.",
          "issueExplanation": "非谓语动词错误：分词错误",
          "revisionSuggestion": "建议把 featured 换成  featuring ",
          "improvedExample": "My work is an AI-generated picture featuring numerous workers in China.",
          "score": 83.47629,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-005",
          "studentId": "24747561",
          "studentName": "李铭宸",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Among them were security guards in night shifts watching at school gates, delivery riders, braving wind and rain on the street, and janitors cleaning the pavement with bright smiles on their faces.",
          "issueExplanation": "词法错误：介词错误",
          "revisionSuggestion": "建议把 in 换成  on ",
          "improvedExample": "Among them were security guards on night shifts watching school gates, delivery riders braving wind and rain on the street, and janitors cleaning the pavement with bright smiles on their faces.",
          "score": 83.47629,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-006",
          "studentId": "24747561",
          "studentName": "李铭宸",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Among them were security guards in night shifts watching at school gates, delivery riders, braving wind and rain on the street, and janitors cleaning the pavement with bright smiles on their faces.",
          "issueExplanation": "词法错误：介词错误",
          "revisionSuggestion": "建议删除  at ",
          "improvedExample": "Among them were security guards on night shifts watching school gates, delivery riders braving wind and rain on the street, and janitors cleaning the pavement with bright smiles on their faces.",
          "score": 83.47629,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-007",
          "studentId": "24747561",
          "studentName": "李铭宸",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Moreover, I learnt that behind our comfortable urban lives stand countless unsung heroes whose contribution makes a difference.",
          "issueExplanation": "单复数错误：单复数错误",
          "revisionSuggestion": "建议把 contribution 换成  contributions ",
          "improvedExample": "Moreover, I learnt that behind our comfortable urban lives stand countless unsung heroes whose contributions make a difference.",
          "score": 83.47629,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-008",
          "studentId": "24747561",
          "studentName": "李铭宸",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Moreover, I learnt that behind our comfortable urban lives stand countless unsung heroes whose contribution makes a difference.",
          "issueExplanation": "主谓一致错误：主谓一致错误",
          "revisionSuggestion": "建议把 makes 换成  make ",
          "improvedExample": "Moreover, I learnt that behind our comfortable urban lives stand countless unsung heroes whose contributions make a difference.",
          "score": 83.47629,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-009",
          "studentId": "24754404",
          "studentName": "齐韵如",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Greetings! I'm glad to hear that you are interested about the collection titled \"Tech draws China\" I have attended.",
          "issueExplanation": "词法错误：介词错误",
          "revisionSuggestion": "建议把 about 换成  in ",
          "improvedExample": "Greetings! I'm glad to hear that you are interested in the collection titled \"Tech draws China\" I have attended.",
          "score": 65.038055,
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
          "studentId": "24754404",
          "studentName": "齐韵如",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "The film also showcast that advanced eletronical vehicles reduce carbon emission, seamless e-pay system improve cashing efficiency.",
          "issueExplanation": "句子结构错误：错误使用逗号连接两个完整句子",
          "revisionSuggestion": "建议在 seamless 之前插入 and the",
          "improvedExample": "The film also showcases that advanced electronic vehicles reduce carbon emissions, and the seamless e-pay system improves cashing efficiency.",
          "score": 65.038055,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-001",
          "studentId": "24754404",
          "studentName": "齐韵如",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "While preparing the vedio, I not only shocked with how cutting-edge technology improve our lives but also notice the deep value in Chinese culture behind the high-tech, like friendship to brosaden vis",
          "issueExplanation": "句子结构错误：并列结构错误",
          "revisionSuggestion": "建议把 notice 换成  noticed ",
          "improvedExample": "While preparing the video, I was not only shocked by how cutting-edge technology improves our lives but also noticed the deep value in Chinese culture behind the high-tech, like friendship to broaden ",
          "score": 65.038055,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-002",
          "studentId": "24747553",
          "studentName": "陈宇泰",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "What do you think about this activity? Await your reply.",
          "issueExplanation": "句子结构错误：句子成分残缺",
          "revisionSuggestion": "建议把 Await 换成  I await ",
          "improvedExample": "What do you think about this activity? I await your reply.",
          "score": 74.530846,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-003",
          "studentId": "24747563",
          "studentName": "李宗霖",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "My practice is called \"The real heros\", it is an AI-generated painting showing a worker and a scientist walking side-by-side under the bright sun.",
          "issueExplanation": "句子结构错误：错误使用逗号连接两个完整句子",
          "revisionSuggestion": "建议把 , 换成  ; ",
          "improvedExample": "My work is called \"The Real Heroes\"; it is an AI-generated painting showing a worker and a scientist walking side by side under the bright sun.",
          "score": 68.74437,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-004",
          "studentId": "24747563",
          "studentName": "李宗霖",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Seeing other practices like AI-designed 30 paintings, I was shocked and amazed by how technology can empower our creativity in arts.",
          "issueExplanation": "句子结构错误：语序错误",
          "revisionSuggestion": "建议把 AI-designed 30 换成  30 AI-designed ",
          "improvedExample": "Seeing other works like 30 AI-designed paintings, I was shocked and amazed by how technology can empower our creativity in art.",
          "score": 68.74437,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-005",
          "studentId": "24747563",
          "studentName": "李宗霖",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "It enabled everyone the ability to turn their art creativity into real masterpiece.",
          "issueExplanation": "句子结构错误：句子成分残缺",
          "revisionSuggestion": "建议在 the 之前插入 to have",
          "improvedExample": "It enables everyone to have the ability to turn their artistic creativity into real masterpieces.",
          "score": 68.74437,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-006",
          "studentId": "24747563",
          "studentName": "李宗霖",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Hope my sharing could fulfill your interest! Wish you for the best!",
          "issueExplanation": "句子结构错误：句子成分残缺",
          "revisionSuggestion": "建议把 Wish you for 换成  I wish you all ",
          "improvedExample": "I hope my sharing can fulfill your interest! I wish you all the best!",
          "score": 68.74437,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-007",
          "studentId": "24754417",
          "studentName": "肖宇轩",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "My work is a classroom which is setted in2030, with lots of students and something new.",
          "issueExplanation": "句子结构错误：句子成分残缺",
          "revisionSuggestion": "建议把 in2030 换成  in 2030 ",
          "improvedExample": "My work is a classroom which is set in 2030, with lots of students and something new.",
          "score": 69.469185,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-008",
          "studentId": "24754406",
          "studentName": "孙培伦",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "What this activity brings me is more than a brilliant artwork itself, I yaindeeply insight of that nowadays.",
          "issueExplanation": "句子结构错误：错误使用逗号连接两个完整句子",
          "revisionSuggestion": "建议把 , 换成  ; ",
          "improvedExample": "What this activity brings me is more than a brilliant artwork itself; I gain deep insight into that nowadays.",
          "score": 53.0131,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-009",
          "studentId": "24747555",
          "studentName": "范绮琪",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Let me share some details with all.",
          "issueExplanation": "句子结构错误：句子成分残缺",
          "revisionSuggestion": "建议在 all 之前插入 you",
          "improvedExample": "Let me share some details with you all.",
          "score": 72.46334,
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
          "studentId": "24754400",
          "studentName": "刘嘉来",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Greetings! Knowing your keen interest in the event themed \"Chinese Tech-empowered paintings\", I'm glad to share my own experience including my artwork and feelings.",
          "issueExplanation": "标点与格式错误：标点错误",
          "revisionSuggestion": "建议在 including 之前插入 ,",
          "improvedExample": "Greetings! Knowing your keen interest in the event themed \"Chinese Tech-empowered paintings\", I'm glad to share my own experience, including my artwork and feelings.",
          "score": 78.66475,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-001",
          "studentId": "24747561",
          "studentName": "李铭宸",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "I'm thrilled to hear about your interest in my participation in the \"Intelligence. Paints China\" event.",
          "issueExplanation": "标点与格式错误：标点错误",
          "revisionSuggestion": "建议删除  . ",
          "improvedExample": "I'm thrilled to hear about your interest in my participation in the \"Intelligence Paints China\" event.",
          "score": 83.47629,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-002",
          "studentId": "24747561",
          "studentName": "李铭宸",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Among them were security guards in night shifts watching at school gates, delivery riders, braving wind and rain on the street, and janitors cleaning the pavement with bright smiles on their faces.",
          "issueExplanation": "标点与格式错误：标点错误",
          "revisionSuggestion": "建议删除  , ",
          "improvedExample": "Among them were security guards on night shifts watching school gates, delivery riders braving wind and rain on the street, and janitors cleaning the pavement with bright smiles on their faces.",
          "score": 83.47629,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-003",
          "studentId": "24754417",
          "studentName": "肖宇轩",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "I'm delighted that you are interested in my entry about the Technology-powered works activity themed with \"Tec-Painting of China.\"",
          "issueExplanation": "标点与格式错误：大小写错误",
          "revisionSuggestion": "建议把 Technology 换成  technology ",
          "improvedExample": "I'm delighted that you are interested in my entry about the technology-powered works activity themed \"Tec-Painting of China.\"",
          "score": 69.469185,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-004",
          "studentId": "24754417",
          "studentName": "肖宇轩",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "During the experience, I found it immersive like a scientific and novel tour in the coming future.",
          "issueExplanation": "标点与格式错误：标点错误",
          "revisionSuggestion": "建议在 like 之前插入 ,",
          "improvedExample": "During the experience, I found it immersive, like a scientific and novel tour of the coming future.",
          "score": 69.469185,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-005",
          "studentId": "24754406",
          "studentName": "孙培伦",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Guided by AI tedeique I seized to dedicate one of Wu Men under an rising Sun, coloring the goben wall and carved pillows via high-tech and AI-powere painting devices.",
          "issueExplanation": "标点与格式错误：大小写错误",
          "revisionSuggestion": "建议把 Sun 换成  sun ",
          "improvedExample": "Guided by AI technique, I chose to depict one of Wu Men under a rising sun, coloring the golden wall and carved pillars via high-tech and AI-powered painting devices.",
          "score": 53.0131,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-006",
          "studentId": "24747551",
          "studentName": "陈品而",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Citizens can check the map with an App, enabling them to make more specific outdoor plans.",
          "issueExplanation": "标点与格式错误：大小写错误",
          "revisionSuggestion": "建议把 App 换成  app ",
          "improvedExample": "Citizens can check the map with an app, enabling them to make more specific outdoor plans.",
          "score": 78.35223,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-007",
          "studentId": "24754418",
          "studentName": "邢宗英",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "Dear Jim",
          "issueExplanation": "标点与格式错误：标点错误",
          "revisionSuggestion": "建议在 Jim 之后插入 ,",
          "improvedExample": "Dear Jim,",
          "score": 53.751537,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-008",
          "studentId": "24754415",
          "studentName": "吴灵姝",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "My picture is focusing on a senior, who lies in an empty room, showing his loneless.",
          "issueExplanation": "标点与格式错误：标点错误",
          "revisionSuggestion": "建议删除  , ",
          "improvedExample": "My picture focuses on a senior who lies in an empty room, showing his loneliness.",
          "score": 64.85008,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        },
        {
          "id": "wi-009",
          "studentId": "24754416",
          "studentName": "吴姗珊",
          "essayTitle": "5月23日 英语测练",
          "taskName": "5月23日 英语测练",
          "writingType": "practical",
          "originalText": "And it wears \"clothes\" a suit of Zhong Shan Glotnes painted with fire golden stars.",
          "issueExplanation": "标点与格式错误：标点错误",
          "revisionSuggestion": "建议在 \" 之前插入 ,",
          "improvedExample": "And it wears \"clothes,\" a suit of Zhongshan clothes painted with fiery golden stars.",
          "score": 51.245087,
          "answerSheetImageUrl": "",
          "fullEssayId": ""
        }
      ]
    }
  ],
  "weakStudents": [
    {
      "id": "24754414",
      "name": "温馨然",
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
          "percent": 51.6
        },
        {
          "type": "language_accuracy",
          "label": "语言准确性弱 / 语法错误多",
          "percent": 38.7
        },
        {
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "percent": 6.5
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
          "taskName": "平台写作任务",
          "score": 52.068996,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 52.068996,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 52.068996,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 52.068996,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 52.068996,
          "date": ""
        }
      ],
      "revisionSuggestions": [
        "加强语法基础训练",
        "增加词汇积累和同义替换"
      ]
    },
    {
      "id": "24754425",
      "name": "张若晗",
      "averageScore": 47.6,
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
          "percent": 52.2
        },
        {
          "type": "vocabulary_weak",
          "label": "词汇表达弱 / 用词单一",
          "percent": 43.5
        },
        {
          "type": "format_issue",
          "label": "格式规范问题 / 应用文格式",
          "percent": 2.2
        },
        {
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "percent": 2.2
        }
      ],
      "answerSheetImageUrl": "",
      "fullEssayIds": [],
      "recentScores": [
        {
          "taskName": "平台写作任务",
          "score": 58.0,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 58.0,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 58.0,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 58.0,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 58.0,
          "date": ""
        }
      ],
      "revisionSuggestions": [
        "加强语法基础训练",
        "增加词汇积累和同义替换"
      ]
    },
    {
      "id": "24754420",
      "name": "杨雨薇",
      "averageScore": 50.0,
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
          "percent": 59.6
        },
        {
          "type": "language_accuracy",
          "label": "语言准确性弱 / 语法错误多",
          "percent": 31.4
        },
        {
          "type": "format_issue",
          "label": "格式规范问题 / 应用文格式",
          "percent": 6.7
        },
        {
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "percent": 2.4
        }
      ],
      "answerSheetImageUrl": "",
      "fullEssayIds": [],
      "recentScores": [
        {
          "taskName": "平台写作任务",
          "score": 52.358154,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 52.358154,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 52.358154,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 52.358154,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 52.358154,
          "date": ""
        }
      ],
      "revisionSuggestions": [
        "加强语法基础训练",
        "增加词汇积累和同义替换"
      ]
    },
    {
      "id": "24747556",
      "name": "高晨曦",
      "averageScore": 52.4,
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
          "percent": 42.7
        },
        {
          "type": "vocabulary_weak",
          "label": "词汇表达弱 / 用词单一",
          "percent": 41.1
        },
        {
          "type": "format_issue",
          "label": "格式规范问题 / 应用文格式",
          "percent": 8.3
        },
        {
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "percent": 7.8
        }
      ],
      "answerSheetImageUrl": "",
      "fullEssayIds": [],
      "recentScores": [
        {
          "taskName": "平台写作任务",
          "score": 51.857483,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 51.857483,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 51.857483,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 51.857483,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 51.857483,
          "date": ""
        }
      ],
      "revisionSuggestions": [
        "加强语法基础训练",
        "增加词汇积累和同义替换"
      ]
    },
    {
      "id": "24754407",
      "name": "孙雅瑄",
      "averageScore": 53.4,
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
          "percent": 47.1
        },
        {
          "type": "language_accuracy",
          "label": "语言准确性弱 / 语法错误多",
          "percent": 41.3
        },
        {
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "percent": 8.7
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
          "taskName": "平台写作任务",
          "score": 54.867935,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 54.867935,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 54.867935,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 54.867935,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 54.867935,
          "date": ""
        }
      ],
      "revisionSuggestions": [
        "加强语法基础训练",
        "增加词汇积累和同义替换"
      ]
    },
    {
      "id": "24754427",
      "name": "赵依诺",
      "averageScore": 54.4,
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
          "percent": 44.0
        },
        {
          "type": "vocabulary_weak",
          "label": "词汇表达弱 / 用词单一",
          "percent": 44.0
        },
        {
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "percent": 7.2
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
          "taskName": "平台写作任务",
          "score": 58.83043,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 58.83043,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 58.83043,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 58.83043,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 58.83043,
          "date": ""
        }
      ],
      "revisionSuggestions": [
        "加强语法基础训练",
        "增加词汇积累和同义替换"
      ]
    },
    {
      "id": "24747554",
      "name": "丁君达",
      "averageScore": 55.6,
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
          "percent": 61.6
        },
        {
          "type": "language_accuracy",
          "label": "语言准确性弱 / 语法错误多",
          "percent": 26.2
        },
        {
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "percent": 9.3
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
          "taskName": "平台写作任务",
          "score": 83.97655,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 83.97655,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 83.97655,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 83.97655,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 83.97655,
          "date": ""
        }
      ],
      "revisionSuggestions": [
        "加强语法基础训练",
        "增加词汇积累和同义替换"
      ]
    },
    {
      "id": "24754406",
      "name": "孙培伦",
      "averageScore": 55.7,
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
          "percent": 58.6
        },
        {
          "type": "language_accuracy",
          "label": "语言准确性弱 / 语法错误多",
          "percent": 32.8
        },
        {
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "percent": 4.6
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
          "taskName": "平台写作任务",
          "score": 53.0131,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 53.0131,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 53.0131,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 53.0131,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 53.0131,
          "date": ""
        }
      ],
      "revisionSuggestions": [
        "加强语法基础训练",
        "增加词汇积累和同义替换"
      ]
    },
    {
      "id": "24747557",
      "name": "高睿泽",
      "averageScore": 57.9,
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
          "percent": 63.9
        },
        {
          "type": "language_accuracy",
          "label": "语言准确性弱 / 语法错误多",
          "percent": 25.8
        },
        {
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "percent": 7.2
        },
        {
          "type": "format_issue",
          "label": "格式规范问题 / 应用文格式",
          "percent": 3.1
        }
      ],
      "answerSheetImageUrl": "",
      "fullEssayIds": [],
      "recentScores": [
        {
          "taskName": "平台写作任务",
          "score": 75.166985,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 75.166985,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 75.166985,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 75.166985,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 75.166985,
          "date": ""
        }
      ],
      "revisionSuggestions": [
        "加强语法基础训练",
        "增加词汇积累和同义替换"
      ]
    },
    {
      "id": "24754403",
      "name": "吕威廷",
      "averageScore": 58.5,
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
          "percent": 52.2
        },
        {
          "type": "vocabulary_weak",
          "label": "词汇表达弱 / 用词单一",
          "percent": 39.8
        },
        {
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "percent": 5.6
        },
        {
          "type": "format_issue",
          "label": "格式规范问题 / 应用文格式",
          "percent": 2.5
        }
      ],
      "answerSheetImageUrl": "",
      "fullEssayIds": [],
      "recentScores": [
        {
          "taskName": "平台写作任务",
          "score": 67.04544,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 67.04544,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 67.04544,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 67.04544,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 67.04544,
          "date": ""
        }
      ],
      "revisionSuggestions": [
        "加强语法基础训练",
        "增加词汇积累和同义替换"
      ]
    },
    {
      "id": "24754404",
      "name": "齐韵如",
      "averageScore": 59.0,
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
          "percent": 48.3
        },
        {
          "type": "vocabulary_weak",
          "label": "词汇表达弱 / 用词单一",
          "percent": 40.3
        },
        {
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "percent": 7.1
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
          "taskName": "平台写作任务",
          "score": 65.038055,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 65.038055,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 65.038055,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 65.038055,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 65.038055,
          "date": ""
        }
      ],
      "revisionSuggestions": [
        "加强语法基础训练",
        "增加词汇积累和同义替换"
      ]
    },
    {
      "id": "24754418",
      "name": "邢宗英",
      "averageScore": 59.1,
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
          "percent": 45.4
        },
        {
          "type": "language_accuracy",
          "label": "语言准确性弱 / 语法错误多",
          "percent": 37.7
        },
        {
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "percent": 10.9
        },
        {
          "type": "format_issue",
          "label": "格式规范问题 / 应用文格式",
          "percent": 6.0
        }
      ],
      "answerSheetImageUrl": "",
      "fullEssayIds": [],
      "recentScores": [
        {
          "taskName": "平台写作任务",
          "score": 53.751537,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 53.751537,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 53.751537,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 53.751537,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 53.751537,
          "date": ""
        }
      ],
      "revisionSuggestions": [
        "加强语法基础训练",
        "增加词汇积累和同义替换"
      ]
    },
    {
      "id": "24754399",
      "name": "刘家宁",
      "averageScore": 59.7,
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
          "percent": 42.1
        },
        {
          "type": "structure_unclear",
          "label": "结构不清 / 段落组织弱",
          "percent": 10.5
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
          "taskName": "平台写作任务",
          "score": 52.02959,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 52.02959,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 52.02959,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 52.02959,
          "date": ""
        },
        {
          "taskName": "平台写作任务",
          "score": 52.02959,
          "date": ""
        }
      ],
      "revisionSuggestions": [
        "加强语法基础训练",
        "增加词汇积累和同义替换"
      ]
    }
  ],
  "excellentWritings": [
    {
      "id": "ew-747561",
      "studentId": "24747561",
      "studentName": "李铭宸",
      "essayTitle": "5月23日 英语测练",
      "taskName": "5月23日 英语测练",
      "writingType": "practical",
      "score": 83.47629,
      "level": "A",
      "highlights": "得分83.47629分",
      "excerpt": "I'm thrilled to hear about your interest in my participation in the \"Intelligence. Paints China\" event.",
      "fullEssayId": "",
      "answerSheetImageUrl": ""
    },
    {
      "id": "ew-747561",
      "studentId": "24747561",
      "studentName": "李铭宸",
      "essayTitle": "5月23日 英语测练",
      "taskName": "5月23日 英语测练",
      "writingType": "practical",
      "score": 83.47629,
      "level": "A",
      "highlights": "得分83.47629分",
      "excerpt": "My work is an AI-generated picture featured numerous workers in China.",
      "fullEssayId": "",
      "answerSheetImageUrl": ""
    },
    {
      "id": "ew-747561",
      "studentId": "24747561",
      "studentName": "李铭宸",
      "essayTitle": "5月23日 英语测练",
      "taskName": "5月23日 英语测练",
      "writingType": "practical",
      "score": 83.47629,
      "level": "A",
      "highlights": "得分83.47629分",
      "excerpt": "Among them were security guards in night shifts watching at school gates, delivery riders, braving wind and rain on the street, and janitors cleaning the pavement with bright smiles on their faces.",
      "fullEssayId": "",
      "answerSheetImageUrl": ""
    },
    {
      "id": "ew-747561",
      "studentId": "24747561",
      "studentName": "李铭宸",
      "essayTitle": "5月23日 英语测练",
      "taskName": "5月23日 英语测练",
      "writingType": "practical",
      "score": 83.47629,
      "level": "A",
      "highlights": "得分83.47629分",
      "excerpt": "Among them were security guards in night shifts watching at school gates, delivery riders, braving wind and rain on the street, and janitors cleaning the pavement with bright smiles on their faces.",
      "fullEssayId": "",
      "answerSheetImageUrl": ""
    },
    {
      "id": "ew-747561",
      "studentId": "24747561",
      "studentName": "李铭宸",
      "essayTitle": "5月23日 英语测练",
      "taskName": "5月23日 英语测练",
      "writingType": "practical",
      "score": 83.47629,
      "level": "A",
      "highlights": "得分83.47629分",
      "excerpt": "Among them were security guards in night shifts watching at school gates, delivery riders, braving wind and rain on the street, and janitors cleaning the pavement with bright smiles on their faces.",
      "fullEssayId": "",
      "answerSheetImageUrl": ""
    },
    {
      "id": "ew-747561",
      "studentId": "24747561",
      "studentName": "李铭宸",
      "essayTitle": "5月23日 英语测练",
      "taskName": "5月23日 英语测练",
      "writingType": "practical",
      "score": 83.47629,
      "level": "A",
      "highlights": "得分83.47629分",
      "excerpt": "Then an istanding AI-powered tool gathered them in one picture perifectly",
      "fullEssayId": "",
      "answerSheetImageUrl": ""
    },
    {
      "id": "ew-747561",
      "studentId": "24747561",
      "studentName": "李铭宸",
      "essayTitle": "5月23日 英语测练",
      "taskName": "5月23日 英语测练",
      "writingType": "practical",
      "score": 83.47629,
      "level": "A",
      "highlights": "得分83.47629分",
      "excerpt": "Then an istanding AI-powered tool gathered them in one picture perifectly",
      "fullEssayId": "",
      "answerSheetImageUrl": ""
    },
    {
      "id": "ew-747561",
      "studentId": "24747561",
      "studentName": "李铭宸",
      "essayTitle": "5月23日 英语测练",
      "taskName": "5月23日 英语测练",
      "writingType": "practical",
      "score": 83.47629,
      "level": "A",
      "highlights": "得分83.47629分",
      "excerpt": "Moreover, I learnt that behind our comfortable urban lives stand countless unsung heroes whose contribution makes a difference.",
      "fullEssayId": "",
      "answerSheetImageUrl": ""
    },
    {
      "id": "ew-747561",
      "studentId": "24747561",
      "studentName": "李铭宸",
      "essayTitle": "5月23日 英语测练",
      "taskName": "5月23日 英语测练",
      "writingType": "practical",
      "score": 83.47629,
      "level": "A",
      "highlights": "得分83.47629分",
      "excerpt": "Moreover, I learnt that behind our comfortable urban lives stand countless unsung heroes whose contribution makes a difference.",
      "fullEssayId": "",
      "answerSheetImageUrl": ""
    },
    {
      "id": "ew-754426",
      "studentId": "24754426",
      "studentName": "赵世琪",
      "essayTitle": "5月23日 英语测练",
      "taskName": "5月23日 英语测练",
      "writingType": "practical",
      "score": 82.85587,
      "level": "A",
      "highlights": "得分82.85587分",
      "excerpt": "I'm glad to hear that you are interested in \"Chinese Wisdom\" activity.",
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
      "recommendReason": "针对词汇表达弱 / 用词单一问题设计",
      "canPreview": true,
      "canAssign": true,
      "canAddToPaperBasket": true
    },
    {
      "id": "res-w-2",
      "title": "英语语法精讲精练",
      "resourceType": "grammar_practice",
      "tags": [
        "语法",
        "写作"
      ],
      "difficulty": "medium",
      "grade": "高二",
      "recommendReason": "针对语言准确性弱问题设计",
      "canPreview": true,
      "canAssign": true,
      "canAddToPaperBasket": true
    }
  ],
  "generatedSamples": [
    {
      "id": "gs-1",
      "level": "basic",
      "title": "基础版范文",
      "content": "根据2023级R6班平均分60.8的写作水平，生成语法简单、词汇基础的应用文范文。",
      "highlights": "基础句式，规范格式",
      "suitableFor": "20分以下"
    },
    {
      "id": "gs-2",
      "level": "improved",
      "title": "提升版范文",
      "content": "展示如何减少词汇表达弱 / 用词单一错误，提升表达。",
      "highlights": "句式多样，表达准确",
      "suitableFor": "20-25分"
    },
    {
      "id": "gs-3",
      "level": "excellent",
      "title": "优秀版范文",
      "content": "基于平台高分作文的写作风格优化，展示地道表达和高级句式。",
      "highlights": "逻辑清晰，语言地道",
      "suitableFor": "25+分"
    }
  ],
  "interventionRecords": []
};

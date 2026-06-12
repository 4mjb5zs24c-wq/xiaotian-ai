#!/usr/bin/env python3
"""
将真实平台数据转换为 AI 洞察所需的 JSON 格式。
用法: python3 convert_real_data.py [2023级R6班]
"""

import openpyxl, os, json, sys
from collections import Counter, defaultdict
from datetime import datetime

DATA_DIR = os.path.expanduser("~/Desktop/data")
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(SCRIPT_DIR, "..", "data-templates", "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

TARGET_CLASS = sys.argv[1] if len(sys.argv) > 1 else "2023级R6班"

# ══════════════════════════════════════════════════════════════
# Phase 1: Load common data
# ══════════════════════════════════════════════════════════════

print(f"目标班级: {TARGET_CLASS}")

# 1.1 Student → Class mapping
uid_to_class = {}
uid_to_name = {}
class_students = set()
wb = openpyxl.load_workbook(os.path.join(DATA_DIR, "学生教学班.xlsx"), read_only=True, data_only=True)
ws = wb["Result 1"]
for i, row in enumerate(ws.iter_rows(values_only=True)):
    if i == 0: continue
    uid = str(row[0])
    name = str(row[2]) if row[2] else ""
    cls_name = row[8]
    uid_to_name[uid] = name
    if cls_name:
        uid_to_class[uid] = cls_name
        if cls_name == TARGET_CLASS:
            class_students.add(uid)
wb.close()
print(f"  {TARGET_CLASS} 学生数: {len(class_students)}")

# ══════════════════════════════════════════════════════════════
# Phase 2: Vocabulary Insight — error-only data
# ══════════════════════════════════════════════════════════════

print("\n=== 词汇数据 ===")
wb = openpyxl.load_workbook(os.path.join(DATA_DIR, "词汇作答_已修复11.xlsx"), read_only=True, data_only=True)
ws = wb["Result 1"]

word_errors = Counter()    # word → error count
word_students = defaultdict(set)
student_errors = Counter()  # uid → error count
student_words = defaultdict(set)
total_vocab = 0

for i, row in enumerate(ws.iter_rows(values_only=True)):
    if i == 0: continue
    uid = str(row[0])
    if uid not in class_students:
        continue
    w = str(row[3]).strip() if row[3] else ""
    if not w or len(w) <= 1:
        continue
    total_vocab += 1
    word_errors[w] += 1
    word_students[w].add(uid)
    student_errors[uid] += 1
    student_words[uid].add(w)
wb.close()

# Sort words by error count descending (most errors = weakest)
top_words = word_errors.most_common(50)
total_student_errors = sum(student_errors.values())
max_word_errors = top_words[0][1] if top_words else 1

print(f"  词汇错误总数: {total_vocab}")
print(f"  不同词汇数: {len(word_errors)}")
print(f"  Top 5 错词: {[(w, c) for w, c in top_words[:5]]}")

# Pseudo scoreRate: normalized to 0-100, worst words get lowest score
# scoreRate = 100 - (error_count / max_error_count) * 100, clamped to [5, 95]
def pseudo_score(count, max_count):
    if max_count == 0: return 100
    return max(5, round(100 - (count / max_count) * 90, 1))

# Build weak words
weak_words = []
for i, (word, count) in enumerate(top_words):
    srate = pseudo_score(count, max_word_errors)
    weak_words.append({
        "id": f"ww-{i:03d}",
        "text": word,
        "itemType": "word",
        "scoreRate": srate,
        "errorRate": round(100 - srate, 1),
        "affectedStudentCount": len(word_students[word]),
        "mainErrorType": "spelling",
        "errorTypes": [{"type": "spelling", "label": "拼不对 / 默写错误", "percent": 100}],
        "typicalMistakes": [],
        "sourceTasks": ["平台词汇练习"],
        "aiReason": f"该词在{len(word_students[word])}名学生中出现{count}次拼写错误，高频错词。",
        "recommendedActions": ["默写", "词汇复习规划"],
        "priorityScore": min(99, 30 + int(count / max_word_errors * 69)),
    })

# Build student data
max_student_errors = max(student_errors.values()) if student_errors else 1
all_students_vocab = []
for uid in class_students:
    err_count = student_errors.get(uid, 0)
    srate = pseudo_score(err_count, max_student_errors)
    name = uid_to_name.get(uid, f"学生{uid[-4:]}")
    all_students_vocab.append({
        "id": uid,
        "name": name,
        "scoreRate": srate,
        "errorCount": err_count,
        "wordCount": len(student_words.get(uid, set())),
    })

all_students_vocab.sort(key=lambda x: x["scoreRate"], reverse=True)

# Split: >=80 pseudo = good, < 80 = weak
good_vocab_students = [s for s in all_students_vocab if s["scoreRate"] >= 80 and s["errorCount"] > 0]
weak_vocab_students = [s for s in all_students_vocab if s["scoreRate"] < 80 and s["errorCount"] > 0]

# Error type: only "不会写" → spelling
error_types_vocab = [
    {
        "type": "spelling",
        "label": "拼不对 / 默写错误",
        "percent": 100,
        "affectedStudentCount": len([s for s in all_students_vocab if s["errorCount"] > 0]),
        "exampleWords": [w for w, _ in top_words[:5]],
        "aiReason": f"平台词汇错因数据仅标注'不会写'，归类为拼写错误。{len(class_students)}名学生中有{total_vocab}次拼写错误记录。",
        "recommendedActions": ["默写", "词汇复习规划", "组卷"],
        "borderColor": "#f0a060",
        "bgColor": "#fef8f0",
    },
    {
        "type": "contextual_usage",
        "label": "不会用 / 语境应用弱",
        "percent": 0,  # No data but included for completeness
        "affectedStudentCount": 0,
        "exampleWords": [],
        "aiReason": "当前数据中未单独标记语境应用类型错误，建议平台补充错因分类。",
        "recommendedActions": ["组卷", "讲词"],
        "borderColor": "#4b9fe8",
        "bgColor": "#f0f6fc",
    },
]

print(f"  较好学生: {len(good_vocab_students)} 人")
print(f"  薄弱学生: {len(weak_vocab_students)} 人")

# Build VocabularyInsightData
vocab_insight = {
    "classId": f"class-{TARGET_CLASS.replace(' ', '-')}",
    "className": TARGET_CLASS,
    "unitId": "real-data",
    "unitName": "平台真实数据（错误记录）",
    "timeRange": "30d",
    "updatedAt": datetime.now().strftime("%Y-%m-%d %H:%M"),
    "summary": f"基于 {TARGET_CLASS} 共 {len(class_students)} 名学生的 {total_vocab} 条词汇错误记录，"
               f"共涉及 {len(word_errors)} 个不同词汇。"
               f"平台错因标注均为「不会写」（拼写错误类），高频错词 {len(weak_words)} 个，"
               f"薄弱学生 {len(weak_vocab_students)} 人。"
               f"建议重点加强默写和拼写训练。",
    "metrics": {
        "practicedWordCount": len(word_errors),
        "weakWordCount": len(weak_words),
        "weakStudentCount": len(weak_vocab_students),
        "mainWeakType": "拼不对 / 默写错误",
    },
    "errorTypes": error_types_vocab,
    "weakWords": weak_words,
    "weakStudents": [
        {
            "id": s["id"],
            "name": s["name"],
            "scoreRate": s["scoreRate"],
            "weakWords": [w for w, _ in top_words[:8]],
            "mainErrorTypes": ["拼不对"],
            "typicalContext": f"共{s['errorCount']}次拼写错误，涉及{s['wordCount']}个词。",
            "recentTrend": "stable",
            "recommendedActions": ["默写", "词汇复习规划"],
            "weaknessPriorityScore": min(99, 100 - int(s["scoreRate"])),
            "errorTypeDistribution": [{"type": et["type"], "label": et["label"], "percent": et["percent"]} for et in error_types_vocab],
            "weakWordDetails": [],
        }
        for s in weak_vocab_students[:20]
    ],
    "goodStudents": [
        {
            "id": s["id"],
            "name": s["name"],
            "scoreRate": s["scoreRate"],
            "masteredCount": s["wordCount"],
            "highlight": f"词汇错误较少，仅{s['errorCount']}次",
            "stability": "stable",
        }
        for s in good_vocab_students[:10]
    ],
    "interventionRecords": [],
}

vocab_path = os.path.join(OUTPUT_DIR, "vocabulary_real_data.json")
with open(vocab_path, "w", encoding="utf-8") as f:
    json.dump(vocab_insight, f, ensure_ascii=False, indent=2)
print(f"\n✅ 词汇洞察: {vocab_path}")

# ══════════════════════════════════════════════════════════════
# Phase 3: Writing Insight
# ══════════════════════════════════════════════════════════════

print("\n=== 写作数据 ===")
wb = openpyxl.load_workbook(os.path.join(DATA_DIR, "作文_new.xlsx"), read_only=True, data_only=True)
ws = wb["Result 1"]

WRITING_ERROR_MAP = {
    "词法错误": "language_accuracy", "时态错误": "language_accuracy",
    "拼写错误": "vocabulary_weak", "从句错误": "language_accuracy",
    "非谓语动词错误": "language_accuracy", "标点与格式错误": "format_issue",
    "单复数错误": "language_accuracy", "表达错误": "vocabulary_weak",
    "句子结构错误": "structure_unclear", "用词错误": "vocabulary_weak",
    "主谓一致错误": "language_accuracy", "固定搭配错误": "vocabulary_weak",
    "其他错误": "vocabulary_weak", "词性误用": "language_accuracy",
    "情态动词错误": "language_accuracy", "所属关系错误": "language_accuracy",
    "虚拟语气错误": "language_accuracy", "语态错误": "language_accuracy",
    "基本句式结构错误": "structure_unclear", "特殊句式错误": "language_accuracy",
    "比较级最高级错误": "language_accuracy", "易混淆用法错误": "vocabulary_weak",
}

PROBLEM_META = {
    "language_accuracy": {"label": "语言准确性弱 / 语法错误多", "borderColor": "#7b9cd6", "bgColor": "#f0f4fc"},
    "vocabulary_weak": {"label": "词汇表达弱 / 用词单一", "borderColor": "#8e7cc3", "bgColor": "#f6f0fc"},
    "structure_unclear": {"label": "结构不清 / 段落组织弱", "borderColor": "#f0a060", "bgColor": "#fef8f0"},
    "format_issue": {"label": "格式规范问题 / 应用文格式", "borderColor": "#9ab3cc", "bgColor": "#f5f7fa"},
}

writing_records = []
writing_students_set = set()
scores_all = []
problem_counts = Counter()
problem_students = defaultdict(set)
problem_examples = defaultdict(list)
highlights = []

for i, row in enumerate(ws.iter_rows(values_only=True)):
    if i == 0: continue
    uid = str(row[2])
    if uid not in class_students:
        continue
    score = float(row[8]) if row[8] else 0
    cat = str(row[9]) if row[9] else ""
    mapped = WRITING_ERROR_MAP.get(cat)

    r = {
        "uid": uid,
        "student_name": str(row[4]) if row[4] else "",
        "task_name": str(row[5]) if row[5] else "",
        "date": str(row[6])[:10] if row[6] else "",
        "writing_type": str(row[7]) if row[7] else "应用文",
        "score": score,
        "error_category": cat,
        "error_detail": str(row[10]) if row[10] else "",
        "suggestion": str(row[11]) if row[11] else "",
        "original_text": str(row[12])[:200] if row[12] else "",
        "improved_text": str(row[13])[:200] if row[13] else "",
        "has_highlight": row[14] == True or str(row[14]).strip() == "True",
    }
    writing_records.append(r)
    writing_students_set.add(uid)
    scores_all.append(score)

    if mapped:
        problem_counts[mapped] += 1
        problem_students[mapped].add(uid)
        if len(problem_examples[mapped]) < 5:
            problem_examples[mapped].append(r["original_text"][:80])

wb.close()

avg_score = round(sum(scores_all) / len(scores_all), 1) if scores_all else 0
total_problems = sum(problem_counts.values())

print(f"  写作记录数: {len(writing_records)}")
print(f"  写作学生数: {len(writing_students_set)}")
print(f"  平均得分: {avg_score}")
print(f"  问题总数: {total_problems}")

# Build problem types
writing_problems = []
for pt, count in problem_counts.most_common():
    meta = PROBLEM_META.get(pt, {"label": pt, "borderColor": "#9ab3cc", "bgColor": "#f5f7fa"})
    writing_problems.append({
        "id": f"pt-{pt}",
        "type": pt,
        "label": meta["label"],
        "borderColor": meta["borderColor"],
        "bgColor": meta["bgColor"],
        "percent": round(count / total_problems * 100, 1),
        "affectedStudentCount": len(problem_students[pt]),
        "typicalPerformance": f"({count}/{total_problems})",
        "aiReason": f"从{len(writing_records)}条写作记录中分析，「{meta['label']}」共出现{count}次，占比{round(count/total_problems*100, 1)}%，是{TARGET_CLASS}写作中最突出的问题。",
        "recommendedActions": ["推荐写作练习", "范文生成"],
        "examples": problem_examples.get(pt, [])[:3],
    })

# Build student writing stats
writing_student_stats = defaultdict(lambda: {"scores": [], "errors": Counter()})
for r in writing_records:
    uid = r["uid"]
    writing_student_stats[uid]["scores"].append(r["score"])
    mapped = WRITING_ERROR_MAP.get(r["error_category"])
    if mapped:
        writing_student_stats[uid]["errors"][mapped] += 1

max_student_score = max(scores_all) if scores_all else 100

weak_writing_students_list = []
good_writing_students_list = []
for uid, stats in writing_student_stats.items():
    avg_s = round(sum(stats["scores"]) / len(stats["scores"]), 1)
    name = uid_to_name.get(uid, f"学生{uid[-4:]}")
    main_problems = [PROBLEM_META.get(e, {}).get("label", e) for e, _ in stats["errors"].most_common(3)]
    entry = {
        "id": uid,
        "name": name,
        "averageScore": avg_s,
        "level": "A" if avg_s >= 75 else "B" if avg_s >= 60 else "C" if avg_s >= 45 else "D",
        "mainProblemTypes": main_problems,
        "typicalSentence": "",
        "relatedTasks": [],
        "scoreTrend": "stable",
        "problemDistribution": [
            {"type": e, "label": PROBLEM_META.get(e, {}).get("label", e), "percent": round(c / sum(stats["errors"].values()) * 100, 1) if sum(stats["errors"].values()) > 0 else 0}
            for e, c in stats["errors"].most_common(5)
        ],
        "answerSheetImageUrl": "",
        "fullEssayIds": [],
        "recentScores": [{"taskName": "平台写作任务", "score": s, "date": ""} for s in stats["scores"][:5]],
        "revisionSuggestions": ["加强语法基础训练", "增加词汇积累和同义替换"] if avg_s < 60 else ["巩固已有能力", "挑战高分表达"],
    }
    if avg_s < 60:
        weak_writing_students_list.append(entry)
    elif avg_s >= 75:
        good_writing_students_list.append(entry)

weak_writing_students_list.sort(key=lambda x: x["averageScore"])
good_writing_students_list.sort(key=lambda x: x["averageScore"], reverse=True)

# Excellent writings
excellent_writings_list = []
for r in writing_records:
    if r["score"] >= 80 and r["has_highlight"]:
        excellent_writings_list.append({
            "id": f"ew-{r['uid'][-6:]}",
            "studentId": r["uid"],
            "studentName": r["student_name"],
            "essayTitle": r["task_name"],
            "taskName": r["task_name"],
            "writingType": "practical",
            "score": r["score"],
            "level": "A",
            "highlights": f"得分{r['score']}分",
            "excerpt": r["original_text"][:300],
            "fullEssayId": "",
            "answerSheetImageUrl": "",
        })
        if len(excellent_writings_list) >= 10:
            break

# High frequency issues by problem type
issue_groups = []
for pt, _ in problem_counts.most_common(4):
    items = []
    count = 0
    for r in writing_records:
        if WRITING_ERROR_MAP.get(r["error_category"]) == pt:
            items.append({
                "id": f"wi-{count:03d}",
                "studentId": r["uid"],
                "studentName": r["student_name"],
                "essayTitle": r["task_name"],
                "taskName": r["task_name"],
                "writingType": "practical",
                "originalText": r["original_text"][:200],
                "issueExplanation": f"{r['error_category']}：{r['error_detail']}",
                "revisionSuggestion": r["suggestion"],
                "improvedExample": r["improved_text"][:200],
                "score": r["score"],
                "answerSheetImageUrl": "",
                "fullEssayId": "",
            })
            count += 1
            if count >= 10:
                break
    if items:
        issue_groups.append({"problemType": pt, "items": items})

# Build WritingInsightData
writing_insight = {
    "classId": f"class-{TARGET_CLASS.replace(' ', '-')}",
    "className": TARGET_CLASS,
    "unitId": "real-data",
    "unitName": "平台真实数据",
    "timeRange": "30d",
    "updatedAt": datetime.now().strftime("%Y-%m-%d %H:%M"),
    "summary": f"基于 {TARGET_CLASS} 共 {len(writing_students_set)} 名学生的 {len(writing_records)} 条作文批改数据，"
               f"全部为应用文，平均得分 {avg_score} 分。"
               f"主要问题为「{writing_problems[0]['label'] if writing_problems else '语言准确性弱'}」（占比{writing_problems[0]['percent'] if writing_problems else 0}%），"
               f"其次为「{writing_problems[1]['label'] if len(writing_problems) > 1 else '词汇表达弱'}」。"
               f"薄弱学生（平均分<60）{len(weak_writing_students_list)} 人。",
    "metrics": {
        "averageScore": avg_score,
        "averageLevel": "B" if avg_score >= 60 else "C",
        "reviewedEssayCount": len(writing_records),
        "mainProblemType": writing_problems[0]["label"] if writing_problems else "",
        "weakStudentCount": len(weak_writing_students_list),
        "excellentEssayCount": len(excellent_writings_list),
    },
    "problemTypes": writing_problems,
    "highFrequencyIssues": issue_groups,
    "weakStudents": weak_writing_students_list[:15],
    "excellentWritings": excellent_writings_list,
    "recommendedResources": [
        {
            "id": "res-w-1", "title": "应用文写作模板训练",
            "resourceType": "writing_practice", "tags": ["写作", "应用文"],
            "difficulty": "medium", "grade": "高二",
            "recommendReason": f"针对{writing_problems[0]['label']}问题设计", "canPreview": True, "canAssign": True, "canAddToPaperBasket": True,
        },
        {
            "id": "res-w-2", "title": "英语语法精讲精练",
            "resourceType": "grammar_practice", "tags": ["语法", "写作"],
            "difficulty": "medium", "grade": "高二",
            "recommendReason": "针对语言准确性弱问题设计", "canPreview": True, "canAssign": True, "canAddToPaperBasket": True,
        },
    ],
    "generatedSamples": [
        {
            "id": "gs-1", "level": "basic", "title": "基础版范文",
            "content": f"根据{TARGET_CLASS}平均分{avg_score}的写作水平，生成语法简单、词汇基础的应用文范文。",
            "highlights": "基础句式，规范格式", "suitableFor": "20分以下",
        },
        {
            "id": "gs-2", "level": "improved", "title": "提升版范文",
            "content": f"展示如何减少{writing_problems[0]['label'] if writing_problems else '常见'}错误，提升表达。",
            "highlights": "句式多样，表达准确", "suitableFor": "20-25分",
        },
        {
            "id": "gs-3", "level": "excellent", "title": "优秀版范文",
            "content": f"基于平台高分作文的写作风格优化，展示地道表达和高级句式。",
            "highlights": "逻辑清晰，语言地道", "suitableFor": "25+分",
        },
    ],
    "interventionRecords": [],
}

writing_path = os.path.join(OUTPUT_DIR, "writing_real_data.json")
with open(writing_path, "w", encoding="utf-8") as f:
    json.dump(writing_insight, f, ensure_ascii=False, indent=2)
print(f"\n✅ 写作洞察: {writing_path}")

# ══════════════════════════════════════════════════════════════
# Summary
# ══════════════════════════════════════════════════════════════
print(f"\n{'='*60}")
print(f"转换完成 | {TARGET_CLASS} | {len(class_students)}名学生")
print(f"  词汇: {total_vocab}条错误 / {len(word_errors)}个词 / {len(weak_vocab_students)}薄弱")
print(f"  写作: {len(writing_records)}条 / {len(writing_students_set)}人 / 均分{avg_score}")
print(f"  输出: {OUTPUT_DIR}")

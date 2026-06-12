#!/usr/bin/env python3
"""
批量生成多个班级的真实数据，导出为 TypeScript 模块。
用法: python3 convert_multi.py
"""

import openpyxl, os, json
from collections import Counter, defaultdict
from datetime import datetime

DATA_DIR = os.path.expanduser("~/Desktop/data")
OUT_TS = "src/ai/insights/realDataMulti.ts"

# ── 1. Load mappings ──────────────────────────────────────

print("加载数据...")
uid_to_class = {}
uid_to_name = {}
class_students_map = defaultdict(set)

wb = openpyxl.load_workbook(os.path.join(DATA_DIR, "学生教学班.xlsx"), read_only=True, data_only=True)
ws = wb["Result 1"]
for i, row in enumerate(ws.iter_rows(values_only=True)):
    if i == 0: continue
    uid = str(row[0])
    name = str(row[2]) if row[2] else ""
    cls = row[8]
    uid_to_name[uid] = name
    if cls:
        uid_to_class[uid] = cls
        class_students_map[cls].add(uid)
wb.close()

# ── 2. Load all vocab data into memory ────────────────────

print("加载词汇数据...")
vocab_all = []  # { uid, name, word, question, answer, qid }
wb = openpyxl.load_workbook(os.path.join(DATA_DIR, "词汇作答_已修复11.xlsx"), read_only=True, data_only=True)
ws = wb["Result 1"]
for i, row in enumerate(ws.iter_rows(values_only=True)):
    if i == 0: continue
    uid = str(row[0])
    cls = uid_to_class.get(uid)
    if not cls:
        continue
    w = str(row[3]).strip() if row[3] else ""
    if not w or len(w) <= 1:
        continue
    vocab_all.append({
        "uid": uid,
        "name": str(row[2]) if row[2] else uid_to_name.get(uid, ""),
        "word": w,
        "question": str(row[4])[:120] if row[4] else "",
        "answer": str(row[5]).strip() if row[5] else "",
        "qid": str(row[6]) if row[6] else "",
    })
wb.close()
print(f"  总词汇记录: {len(vocab_all)}")

# ── 3. Load all writing data into memory ──────────────────

print("加载写作数据...")
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

writing_all = []
wb = openpyxl.load_workbook(os.path.join(DATA_DIR, "作文_new.xlsx"), read_only=True, data_only=True)
ws = wb["Result 1"]
for i, row in enumerate(ws.iter_rows(values_only=True)):
    if i == 0: continue
    uid = str(row[2])
    cls = uid_to_class.get(uid)
    if not cls:
        continue
    score = float(row[8]) if row[8] else 0
    cat = str(row[9]) if row[9] else ""
    writing_all.append({
        "uid": uid,
        "name": str(row[4]) if row[4] else uid_to_name.get(uid, ""),
        "class": cls,
        "task_name": str(row[5])[:80] if row[5] else "",
        "date": str(row[6])[:10] if row[6] else "",
        "writing_type": str(row[7]) if row[7] else "应用文",
        "score": score,
        "error_category": cat,
        "error_detail": str(row[10]) if row[10] else "",
        "suggestion": str(row[11]) if row[11] else "",
        "original_text": str(row[12])[:200] if row[12] else "",
        "improved_text": str(row[13])[:200] if row[13] else "",
        "has_highlight": row[14] == True or str(row[14]).strip() == "True",
        "essay": str(row[15]).strip() if row[15] else "",  # 个性化范文
        "problem_type": WRITING_ERROR_MAP.get(cat),
    })
wb.close()
print(f"  总写作记录: {len(writing_all)}")

# ── 4. Build targets: top 3 classes ───────────────────────

# Pick classes with both vocab and writing data
both_classes = []
for cls, students in class_students_map.items():
    vc = sum(1 for r in vocab_all if uid_to_class.get(r["uid"]) == cls)
    wc = sum(1 for r in writing_all if r["class"] == cls)
    if vc >= 100 and wc >= 500:
        both_classes.append((cls, len(students), vc, wc))

both_classes.sort(key=lambda x: x[3], reverse=True)
TARGETS = [c[0] for c in both_classes[:5]]  # Top 5 classes
print(f"\n目标班级: {TARGETS}")

# ── 5. Generate per class ─────────────────────────────────

ALL_DATA = {}

for TARGET_CLASS in TARGETS:
    students = class_students_map[TARGET_CLASS]
    print(f"\n{'='*50}\n{TARGET_CLASS}: {len(students)}人")

    # ── Vocab ──
    class_vocab = [r for r in vocab_all if uid_to_class.get(r["uid"]) == TARGET_CLASS]
    word_errors = Counter()
    word_students = defaultdict(set)
    word_details = defaultdict(list)  # word → [{studentName, answer, question}]

    for r in class_vocab:
        w = r["word"]
        word_errors[w] += 1
        word_students[w].add(r["uid"])
        word_details[w].append({
            "studentId": r["uid"],
            "studentName": r["name"],
            "questionContext": r["question"][:100],
            "studentAnswer": r["answer"],
            "correctAnswer": r["word"],
            "errorType": "spelling",
            "sourceTaskName": "平台词汇练习",
            "sourceTime": "",
        })

    top_words = word_errors.most_common(50)
    max_we = top_words[0][1] if top_words else 1

    student_errors = Counter()
    student_words = defaultdict(set)
    for r in class_vocab:
        student_errors[r["uid"]] += 1
        student_words[r["uid"]].add(r["word"])

    def pseudo_score(count, max_count):
        if max_count == 0: return 100
        return max(5, round(100 - (count / max_count) * 90, 1))

    # Weak words with student detail
    weak_words = []
    for i, (word, count) in enumerate(top_words):
        srate = pseudo_score(count, max_we)
        details = word_details[word][:5]  # Up to 5 student examples
        weak_words.append({
            "id": f"ww-{i:03d}",
            "text": word,
            "itemType": "word",
            "scoreRate": srate,
            "errorRate": round(100 - srate, 1),
            "affectedStudentCount": len(word_students[word]),
            "mainErrorType": "spelling",
            "errorTypes": [{"type": "spelling", "label": "拼不对 / 默写错误", "percent": 100}],
            "typicalMistakes": details,
            "sourceTasks": ["平台词汇练习"],
            "aiReason": f"该词在{len(word_students[word])}名学生中出现{count}次拼写错误。",
            "recommendedActions": ["默写", "词汇复习规划"],
            "priorityScore": min(99, 30 + int(count / max_we * 69)),
        })

    # Error types
    error_types_vocab = [
        {
            "type": "spelling",
            "label": "拼不对 / 默写错误",
            "percent": 100,
            "affectedStudentCount": len([uid for uid in students if student_errors.get(uid, 0) > 0]),
            "exampleWords": [w for w, _ in top_words[:5]],
            "aiReason": f"平台数据错因均为'不会写'，归类为拼写错误。{TARGET_CLASS}共{len(class_vocab)}条拼写错误记录。",
            "recommendedActions": ["默写", "词汇复习规划", "组卷"],
            "borderColor": "#f0a060",
            "bgColor": "#fef8f0",
        },
    ]

    # Students
    max_se = max(student_errors.values()) if student_errors else 1
    all_stu = []
    for uid in students:
        err_count = student_errors.get(uid, 0)
        srate = pseudo_score(err_count, max_se)
        name = uid_to_name.get(uid, f"学生{uid[-4:]}")
        all_stu.append({
            "id": uid, "name": name, "scoreRate": srate,
            "errorCount": err_count,
            "wordCount": len(student_words.get(uid, set())),
        })
    all_stu.sort(key=lambda x: x["scoreRate"], reverse=True)

    good_v = [s for s in all_stu if s["scoreRate"] >= 80 and s["errorCount"] > 0]
    weak_v = [s for s in all_stu if s["scoreRate"] < 80 and s["errorCount"] > 0]

    vocab_data = {
        "classId": f"class-{TARGET_CLASS.replace(' ', '-')}",
        "className": TARGET_CLASS,
        "unitId": "real-data",
        "unitName": "平台真实数据",
        "timeRange": "30d",
        "updatedAt": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "summary": f"{TARGET_CLASS} 共 {len(students)} 名学生，{len(class_vocab)} 条词汇错误记录，涉及 {len(word_errors)} 个词。薄弱学生 {len(weak_v)} 人，建议重点加强默写和拼写训练。",
        "metrics": {
            "practicedWordCount": len(word_errors),
            "weakWordCount": len(weak_words),
            "weakStudentCount": len(weak_v),
            "mainWeakType": "拼不对 / 默写错误",
        },
        "errorTypes": error_types_vocab,
        "weakWords": weak_words,
        "weakStudents": [
            {
                "id": s["id"], "name": s["name"], "scoreRate": s["scoreRate"],
                "weakWords": [w for w, _ in top_words[:8]],
                "mainErrorTypes": ["拼不对"],
                "typicalContext": f"共{s['errorCount']}次拼写错误，涉及{s['wordCount']}个词。",
                "recentTrend": "stable",
                "recommendedActions": ["默写", "词汇复习规划"],
                "weaknessPriorityScore": min(99, 100 - int(s["scoreRate"])),
                "errorTypeDistribution": [{"type": "spelling", "label": "拼不对 / 默写错误", "percent": 100}],
                "weakWordDetails": [],
            }
            for s in weak_v[:20]
        ],
        "goodStudents": [
            {
                "id": s["id"], "name": s["name"], "scoreRate": s["scoreRate"],
                "masteredCount": s["wordCount"],
                "highlight": f"词汇拼写错误较少，仅{s['errorCount']}次",
                "stability": "stable",
            }
            for s in good_v[:10]
        ],
        "interventionRecords": [],
    }

    # ── Writing ──
    class_writing = [r for r in writing_all if r["class"] == TARGET_CLASS]
    writing_students_set = set(r["uid"] for r in class_writing)
    scores_all = [r["score"] for r in class_writing]
    avg_score = round(sum(scores_all) / len(scores_all), 1) if scores_all else 0

    problem_counts = Counter()
    problem_students = defaultdict(set)
    problem_examples = defaultdict(list)
    for r in class_writing:
        pt = r["problem_type"]
        if pt:
            problem_counts[pt] += 1
            problem_students[pt].add(r["uid"])
            if len(problem_examples[pt]) < 5:
                problem_examples[pt].append(r["original_text"][:80])

    total_problems = sum(problem_counts.values())

    writing_problems = []
    for pt, count in problem_counts.most_common():
        meta = PROBLEM_META.get(pt, {"label": pt, "borderColor": "#9ab3cc", "bgColor": "#f5f7fa"})
        pct = round(count / total_problems * 100, 1) if total_problems > 0 else 0
        writing_problems.append({
            "id": f"pt-{pt}", "type": pt, "label": meta["label"],
            "borderColor": meta["borderColor"], "bgColor": meta["bgColor"],
            "percent": pct,
            "affectedStudentCount": len(problem_students[pt]),
            "typicalPerformance": f"({count}/{total_problems})",
            "aiReason": f"共{count}次，占比{pct}%。",
            "recommendedActions": ["推荐写作练习", "范文生成"],
            "examples": problem_examples.get(pt, [])[:3],
        })

    # Writing student stats
    wss = defaultdict(lambda: {"scores": [], "errors": Counter()})
    for r in class_writing:
        wss[r["uid"]]["scores"].append(r["score"])
        pt = r["problem_type"]
        if pt: wss[r["uid"]]["errors"][pt] += 1

    weak_w = []
    good_w = []
    for uid, stats in wss.items():
        avg_s = round(sum(stats["scores"]) / len(stats["scores"]), 1)
        name = uid_to_name.get(uid, f"学生{uid[-4:]}")
        main_problems = [PROBLEM_META.get(e, {}).get("label", e) for e, _ in stats["errors"].most_common(3)]
        entry = {
            "id": uid, "name": name, "averageScore": avg_s,
            "level": "A" if avg_s >= 75 else "B" if avg_s >= 60 else "C" if avg_s >= 45 else "D",
            "mainProblemTypes": main_problems,
            "typicalSentence": "",
            "relatedTasks": [],
            "scoreTrend": "stable",
            "problemDistribution": [
                {"type": e, "label": PROBLEM_META.get(e, {}).get("label", e),
                 "percent": round(c / sum(stats["errors"].values()) * 100, 1) if sum(stats["errors"].values()) > 0 else 0}
                for e, c in stats["errors"].most_common(5)
            ],
            "answerSheetImageUrl": "", "fullEssayIds": [],
            "recentScores": [{"taskName": "写作任务", "score": s, "date": ""} for s in stats["scores"][:5]],
            "revisionSuggestions": ["加强语法基础", "积累词汇"] if avg_s < 60 else ["巩固能力", "挑战高分表达"],
        }
        if avg_s < 60: weak_w.append(entry)
        elif avg_s >= 75: good_w.append(entry)

    weak_w.sort(key=lambda x: x["averageScore"])
    good_w.sort(key=lambda x: x["averageScore"], reverse=True)

    # ── Collect unique essays (dedup by uid+task_name) ──
    essay_seen = set()
    unique_essays = []
    for r in class_writing:
        key = (r["uid"], r["task_name"])
        if key not in essay_seen and r["essay"] and len(r["essay"]) > 50:
            essay_seen.add(key)
            unique_essays.append(r)
    unique_essays.sort(key=lambda x: x["score"], reverse=True)

    # Excellent writings — use real essay excerpts
    excellent = []
    for r in unique_essays:
        if r["score"] >= 75:
            excellent.append({
                "id": f"ew-{r['uid'][-6:]}", "studentId": r["uid"],
                "studentName": r["name"], "essayTitle": r["task_name"],
                "taskName": r["task_name"], "writingType": "practical",
                "score": r["score"], "level": "A" if r["score"] >= 80 else "B",
                "highlights": f"得分{r['score']}分{'，含佳句' if r['has_highlight'] else ''}",
                "excerpt": r["essay"][:500],
                "fullEssayId": "", "answerSheetImageUrl": "",
            })
        if len(excellent) >= 10: break

    # Generated samples — real essays at 3 score levels
    low_essays = [r for r in unique_essays if r["score"] < 50]
    mid_essays = [r for r in unique_essays if 50 <= r["score"] < 75]
    high_essays = [r for r in unique_essays if r["score"] >= 75]

    generated_samples = []
    if low_essays:
        r = low_essays[0]
        generated_samples.append({
            "id": "gs-1", "level": "basic", "title": f"基础版 — {r['name']}的作文",
            "content": r["essay"],
            "highlights": f"得分{r['score']}分 | 适合基础薄弱学生参考基本结构",
            "suitableFor": "20分以下", "editable": True,
        })
    if mid_essays:
        r = mid_essays[len(mid_essays)//2]  # middle of the pack
        generated_samples.append({
            "id": "gs-2", "level": "improved", "title": f"提升版 — {r['name']}的作文",
            "content": r["essay"],
            "highlights": f"得分{r['score']}分 | 展示中等水平如何组织内容和句式",
            "suitableFor": "20-25分", "editable": True,
        })
    if high_essays:
        r = high_essays[0]
        generated_samples.append({
            "id": "gs-3", "level": "excellent", "title": f"优秀版 — {r['name']}的作文",
            "content": r["essay"],
            "highlights": f"得分{r['score']}分{'，含佳句' if r['has_highlight'] else ''} | 展示高分作文的表达水平",
            "suitableFor": "25+分", "editable": True,
        })

    # If not enough real essays, pad with placeholders
    while len(generated_samples) < 3:
        i = len(generated_samples)
        levels = ["basic", "improved", "excellent"]
        generated_samples.append({
            "id": f"gs-{i+1}", "level": levels[i], "title": f"范文示例",
            "content": f"暂无足够数据生成该级别范文。",
            "highlights": "请增加更多写作数据", "suitableFor": "—",
        })

    # Issue groups
    issue_groups = []
    for pt, _ in problem_counts.most_common(4):
        items = []
        count = 0
        for r in class_writing:
            if r["problem_type"] == pt:
                items.append({
                    "id": f"wi-{count:03d}", "studentId": r["uid"],
                    "studentName": r["name"], "essayTitle": r["task_name"],
                    "taskName": r["task_name"], "writingType": "practical",
                    "originalText": r["original_text"][:200],
                    "issueExplanation": f"{r['error_category']}：{r['error_detail']}",
                    "revisionSuggestion": r["suggestion"],
                    "improvedExample": r["improved_text"][:200],
                    "score": r["score"],
                    "answerSheetImageUrl": "", "fullEssayId": "",
                })
                count += 1
                if count >= 10: break
        if items: issue_groups.append({"problemType": pt, "items": items})

    writing_data = {
        "classId": f"class-{TARGET_CLASS.replace(' ', '-')}",
        "className": TARGET_CLASS,
        "unitId": "real-data",
        "unitName": "平台真实数据",
        "timeRange": "30d",
        "updatedAt": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "summary": f"{TARGET_CLASS} 共 {len(writing_students_set)} 名学生，{len(class_writing)} 条应用文批改记录，平均 {avg_score} 分。"
                   f"主要问题「{writing_problems[0]['label']}」({writing_problems[0]['percent']}%)，薄弱学生 {len(weak_w)} 人。",
        "metrics": {
            "averageScore": avg_score,
            "averageLevel": "B" if avg_score >= 60 else "C",
            "reviewedEssayCount": len(class_writing),
            "mainProblemType": writing_problems[0]["label"] if writing_problems else "",
            "weakStudentCount": len(weak_w),
            "excellentEssayCount": len(excellent),
        },
        "problemTypes": writing_problems,
        "highFrequencyIssues": issue_groups,
        "weakStudents": weak_w[:15],
        "excellentWritings": excellent,
        "recommendedResources": [
            {"id": "res-w-1", "title": "应用文写作模板训练", "resourceType": "writing_practice",
             "tags": ["写作", "应用文"], "difficulty": "medium", "grade": "高二",
             "recommendReason": f"针对{writing_problems[0]['label']}设计", "canPreview": True, "canAssign": True, "canAddToPaperBasket": True},
        ],
        "generatedSamples": generated_samples,
        "interventionRecords": [],
    }

    ALL_DATA[TARGET_CLASS] = {"vocabulary": vocab_data, "writing": writing_data}
    print(f"  词汇: {len(weak_words)} 错词 / {len(weak_v)} 薄弱")
    print(f"  写作: 均分{avg_score} / {len(weak_w)} 薄弱")

# ── 6. Write TypeScript ───────────────────────────────────

class_list = list(ALL_DATA.keys())
ts = f"""/**
 * 多班级真实数据 — 自动生成 {datetime.now().strftime('%Y-%m-%d %H:%M')}
 * 班级: {', '.join(class_list)}
 */
import type {{ VocabularyInsightData }} from './vocabularyInsightTypes'
import type {{ WritingInsightData }} from './writingInsightTypes'

export const AVAILABLE_CLASSES = {json.dumps(class_list, ensure_ascii=False)}

type ClassDataMap = Record<string, {{ vocabulary: VocabularyInsightData; writing: WritingInsightData }}>

export const REAL_DATA_MAP: ClassDataMap = """

# Write data map
data_map = {}
for cls in class_list:
    data_map[cls] = ALL_DATA[cls]

ts += json.dumps(data_map, ensure_ascii=False, indent=2) + "\n"

with open(OUT_TS, "w", encoding="utf-8") as f:
    f.write(ts)

# Also write JSON outputs
out_dir = "data-templates/output"
for cls in class_list:
    for dtype in ["vocabulary", "writing"]:
        path = os.path.join(out_dir, f"{cls}_{dtype}.json")
        with open(path, "w", encoding="utf-8") as f:
            json.dump(ALL_DATA[cls][dtype], f, ensure_ascii=False, indent=2)

print(f"\n{'='*60}")
print(f"✅ 生成完成: {OUT_TS}")
print(f"   班级: {class_list}")
print(f"   每个班级数据: data-templates/output/")

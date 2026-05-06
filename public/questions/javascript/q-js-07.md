---
id: q-js-07
title: "async/await 與例外處理"
level: ["Junior"]
tags: ["JavaScript", "async", "error-handling"]
template_group: ["JavaScript-Core", "Interview-Mixed"]
question_type: "coding"
interview_type: "coding"
estimated_time: 15
objective: "以 JavaScript 完成「async/await 與例外處理」的可執行解法，並說明複雜度與邊界。"
constraints: ["請使用原生 JavaScript，不依賴第三方函式庫", "需說明時間與空間複雜度", "需處理至少 2 個邊界案例"]
expected_output: ["解題思路與關鍵假設", "JavaScript 程式碼（可執行）", "複雜度分析與測試案例"]
scoring_criteria: ["是否準確理解題目邊界", "是否有結構化推理與清楚溝通", "是否兼顧工程取捨（效能/維護/安全）", "驗證策略是否可執行"]
starter_code: "function solve(input) {\n  // TODO: implement for async/await 與例外處理\n  return null;\n}"
version: 1
status: active
---

## 背景情境
你正在面試情境中處理「async/await 與例外處理」相關任務。請先明確問題邊界與假設，不要直接給結論。

## 任務說明
1. 先拆解問題與核心風險。
2. 提出可執行方案（coding 題請附可運行程式碼）。
3. 說明驗證方式、失敗處置與可能回滾策略。

## 常見誤區
- 只給結論，不交代推理過程
- 未處理邊界條件或異常情境
- 沒有驗證與可觀測性設計

## 延伸追問
- 若資料量/流量提升 10 倍，你會怎麼調整？
- 若改成多人協作，如何降低維護風險？

---
id: q-js-97
title: "模擬面試：Bug 追查流程"
level: ["Senior"]
tags: ["JavaScript", "debug", "process"]
template_group: ["JavaScript-Core", "Interview-Mixed"]
question_type: "triage"
interview_type: "triage"
estimated_time: 25
objective: "針對「模擬面試：Bug 追查流程」進行問題定位、優先級排序與處置決策。"
constraints: ["先給 30 分鐘內的止血方案", "明確列出風險與回滾點", "說明如何驗證修復有效"]
expected_output: ["問題判斷與根因假設", "優先級與處置順序", "短中長期修復方案"]
scoring_criteria: ["是否準確理解題目邊界", "是否有結構化推理與清楚溝通", "是否兼顧工程取捨（效能/維護/安全）", "驗證策略是否可執行"]
starter_code: ""
version: 1
status: active
---

## 背景情境
你正在面試情境中處理「模擬面試：Bug 追查流程」相關任務。請先明確問題邊界與假設，不要直接給結論。

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

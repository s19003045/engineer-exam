# 軟體工程師面試平台 MVP 規格（差異化優化版）

## 0. 文件目的
本文件定義「前端優先（Frontend-only）」的面試平台 MVP，採用「題庫選題 + AI 面試評估」雙軌整合策略：保留原本題庫與選題效率，同時建立可評估「AI 時代工程能力」的面試系統。目標是在不引入後端的前提下，先建立可交付、可驗證、可擴展的產品骨幹與差異化能力。

## 1. 產品定位與差異化主張

### 1.1 定位
- 類別：工程面試平台。
- 差異化：評估候選人「如何與 AI 協作做工程決策」，而非只看最終答案。

### 1.2 產品主張（Value Proposition）
- 保留傳統題庫與快速選題體驗，降低導入門檻與教育成本。
- 我們評估的是「決策品質 + 驗證能力 + 風險意識」。
- 不反 AI，而是量化候選人使用 AI 的能力成熟度。
- 提供可回放的解題歷程，讓面試官看見思考演進，而非僅看結果。

### 1.3 整合原則
- 題庫、樣板、選題流程維持為第一入口（面試官最熟悉的工作方式）。
- AI 面試系統疊加在作答與審閱階段，不破壞既有出卷流程。
- 任何 AI 相關欄位都不取代原本答案內容，而是作為加分與風險判讀訊號。

## 2. 產品目標與成功指標

### 2.1 產品目標
- 讓面試官在 10 分鐘內完成組卷並送出。
- 讓候選人在單一頁面完成作答、決策紀錄、AI 協作證據提交。
- 讓 HR 或面試官能以標準化檔案回收並審閱。

### 2.2 MVP 成功指標（驗收門檻）
- 組卷時間中位數 <= 10 分鐘。
- 交卷成功率 >= 95%。
- 重整後資料遺失率 <= 1%。
- 面試官可讀性滿意度 >= 4/5（內部試用）。
- 80% 以上答卷包含完整「決策證據卡」與時間線紀錄。

## 3. 使用者角色與核心任務

### 3.1 角色
- 面試官：選題、設定職級、審閱決策證據與評分。
- 候選人：解題、記錄 AI 協作與取捨、提交答卷。
- HR/招募協調者：發送作答指引、回收答卷、追蹤是否完成。

### 3.2 核心任務（JTBD）
- 面試官：我需要快速組出符合職級、可評估真實能力的考卷。
- 候選人：我需要在不中斷環境完成作答並清楚呈現思考。
- HR：我需要用一致格式回收答卷並降低遺漏。

## 4. 版本範圍與優先順序

### 4.1 MVP v1（必做）
- 題庫瀏覽、搜尋、標籤篩選、樣板載入。
- 組卷與題序調整、PDF 匯出。
- 作答內容 localStorage 自動儲存。
- 交卷封裝檔輸出（ZIP + 命名規範）。
- 決策證據卡（每題必填）。
- 1 題真實情境 triage 題（每份考卷固定包含）。
- 解題時間線 JSON 匯出。
- 題目可標記是否啟用 AI 評估欄位（相容傳統題與 AI 題）。

### 4.2 v1.5（應做）
- Monaco Editor 作答區。
- 職級化 Rubric（Junior / Senior / Lead）。
- 交卷前完整性檢查（必填欄位、檔案完整）。

### 4.3 v2（可做）
- 題目變體與抽題策略。
- 半自動評分輔助。
- 後端 submission API 與審閱儀表板。

## 5. 資料架構（Markdown 知識庫）

### 5.1 儲存策略
- 題庫存放：`/public/questions/` 或 `/src/content/`。
- Markdown + YAML Frontmatter 維護，透過 Git 版控。

### 5.2 建置策略
- Build Time 掃描 Markdown，生成 `metadata.json`。
- 以 `gray-matter` 解析欄位，前端載入後執行搜尋與過濾。

### 5.3 Frontmatter 建議欄位
```markdown
---
id: q-sys-001
title: "設計高併發訂單系統"
level: ["Senior", "Lead"]
tags: ["System Design", "Database", "Message Queue"]
template_group: ["Backend-Core", "Architecture-Review"]
question_type: "design" # design | coding | triage
estimated_time: 20
rubric_profile: "senior_system"
version: 1
status: active
---
```

## 6. 功能模組定義

### 模組 A：題庫與樣板管理
- 提供職級化樣板（Junior 基礎、Senior 系統、Lead 決策）。
- 支援關鍵字、標籤、職級、題型篩選。
- 每份考卷預設至少 1 題 triage 題。
- 支援「傳統題模式 / AI 評估模式 / 混合模式」三種組卷策略。

### 模組 B：組卷與輸出
- 支援拖曳排序與作答時間建議。
- 輸出模式：紙本白板題、數位存檔。
- 輸出內容：題目、作答區、決策證據卡、評分 Rubric、時間線摘要。

### 模組 C：AI 協作作答環境
- 雙欄布局：左題目右作答（v1 可先文字區，v1.5 上 Monaco）。
- 事件追蹤：紀錄輸入、修改、Prompt Log 更新、切題時間。
- 本地快取：每 5 秒或欄位變更即寫入 localStorage。
- 相容純傳統題作答：未啟用 AI 評估欄位的題目僅要求標準答案內容。

### 模組 D：整合式面試流程編排
- Flow 1（面試官）：選樣板 -> 選題 -> 設定每題模式（傳統/AI/混合）-> 發卷。
- Flow 2（候選人）：閱讀題目 -> 作答 ->（若啟用）填寫決策證據卡 -> 交卷。
- Flow 3（審閱者）：先看答案正確性，再看 AI 協作與決策品質訊號。

## 7. 決策證據卡（Differentiation Core）
每題必填以下欄位：
- 問題假設（Assumptions）
- 候選方案比較（Options & Trade-offs）
- 風險與失敗模式（Risks）
- 驗證策略（Validation）
- 為何採用此方案（Decision Rationale）

用途：
- 避免只交最終答案。
- 讓面試官可評估候選人的判斷品質與工程成熟度。

## 8. 真實情境 Triage 題

### 8.1 題型定義
- 輸入可為：PR 片段、錯誤 log、事故摘要、簡化架構圖。
- 任務：定位問題、排序處理優先級、提出修復與回滾策略。

### 8.2 評估重點
- 問題拆解能力。
- 風險控管與可觀測性意識。
- 跨角色溝通（對 PM、SRE、QA 的說明能力）。

## 9. 評分框架（多路徑正解）

### 9.1 Rubric 維度
- 正確性（Correctness）
- 可維運性（Maintainability）
- 可觀測性（Observability）
- 成本與效能意識（Cost/Performance）
- AI 協作成熟度（AI Collaboration Maturity）

### 9.2 職級差異
- Junior：實作完整度、基礎除錯、基本驗證。
- Senior：方案取捨、風險覆蓋、系統性驗證。
- Lead：決策治理、跨團隊影響、長期演進策略。

### 9.3 混合評分建議（保留傳統題）
- 傳統題（未啟用 AI）：答案品質 100%。
- AI 題（啟用 AI）：答案品質 60% + 決策證據 25% + AI 協作成熟度 15%。
- 混合卷：由面試官在發卷時設定每題權重，系統輸出加權總分摘要。

## 10. 可回放能力（Replay）

### 10.1 匯出內容
- `timeline.json`：時間戳、事件類型、欄位變更摘要。
- `answers.md` 或 `answers.txt`：最終作答內容。
- `decision-cards.json`：每題決策證據。

### 10.2 審閱價值
- 面試官可查看候選人何時改策略、何時修正錯誤。
- 輔助辨識「複製貼上」與「自主推理」的差異。

## 11. 交卷最後一哩路（無後端）

### 11.1 交卷方案
- 前端產生 `submission.zip`，包含：
  - `paper.pdf`
  - `answers.*`
  - `decision-cards.json`
  - `timeline.json`
  - `checksums.txt`（SHA-256）
- 檔名規範：`{jobId}_{candidateId}_{timestamp}.zip`。

### 11.2 流程控管
- 明示「未自動上傳，需手動上傳」。
- 交卷 checklist：已匯出、已上傳、已確認。
- 失敗備援：若 ZIP 失敗，至少可匯出 JSON 包。

## 12. 非功能需求（NFR）
- 效能：首屏（不含 Monaco）<= 2.5 秒。
- 相容：Chrome/Edge 最新兩個主版本。
- 穩定：重整不遺失已儲存內容。
- 可維護：新增題目不需改程式碼。
- 可追溯：交卷檔必含時間線與校驗檔。

## 13. 風險與對策
- 題庫前端暴露：以抽題、變體、輪替降低背題效益。
- 人工上傳流程遺漏：強制交卷確認步驟。
- 評分一致性不足：導入職級化 Rubric 與範例答案框架。

## 14. 技術選型
- 狀態管理：Zustand。
- UI：Tailwind CSS + shadcn/ui。
- Markdown：gray-matter + react-markdown + remark-gfm。
- 編輯器：Monaco Editor（v1.5 導入，lazy load）。
- PDF：@react-pdf/renderer。

## 15. 驗收清單（Release Checklist）
- 可快速由樣板產生題組並調整題序。
- 每份考卷包含至少 1 題 triage 題。
- 傳統題與 AI 題可在同一份考卷共存並正常匯出。
- 每題可填寫並匯出決策證據卡。
- 可匯出含時間線與校驗資訊的交卷封裝檔。
- 面試官可據 Rubric 完成審閱。

## 16. 後續擴展路線
- Phase 2：後端接收 API、身份驗證、上傳追蹤。
- Phase 3：評分協作流與面試官註記共享。
- Phase 4：匿名化行為資料分析與企業專屬 benchmark。


## Theme
- UI theme specification is defined in docs/theme.md for implementation consistency.

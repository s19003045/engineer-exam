# 平台完整化排程（Execution Schedule）

## 目標
在 6 週內完成「可出卷、可作答、可交卷、可審閱」的 JavaScript 面試平台正式版。

## 里程碑

### Week 1：題庫與出卷穩定化
- 完成 Markdown 題庫讀取與 frontmatter 驗證
- 完成樣板載入、篩選、選題、排序
- 驗收：面試官可在 10 分鐘內完成組卷

### Week 2：作答區與自動儲存
- 完成候選人作答流程（傳統題 + AI 題）
- 完成決策證據卡必填檢查
- 完成 autosave/recover
- 驗收：重整不丟資料，缺欄位不得交卷

### Week 3：交卷封裝與檔案回收
- 生成 `paper.pdf`、`answers.*`、`decision-cards.json`、`timeline.json`、`checksums.txt`
- 完成 zip 封裝與命名規則
- 驗收：交卷包可由審閱端完整開啟

### Week 4：審閱與評分
- 完成 reviewer workspace
- 完成職級化 rubric（Junior/Senior/Lead）
- 完成加權總分與註記
- 驗收：審閱者可在單頁完成評分與回放

### Week 5：品質與效能
- 補齊 unit/integration/e2e
- 補齊關鍵 UX empty/error state
- 補齊效能指標（首屏、主要互動）
- 驗收：測試穩定通過，build 可重現

### Week 6：UAT 與上線準備
- 內部 mock interview UAT
- 修正 blocker 與高優先問題
- 凍結版號，準備部署與操作手冊
- 驗收：符合 `quickstart.md` 全流程

## 角色分工建議
- PM：需求控管、驗收標準、排程追蹤
- Frontend：流程與 UI 實作
- Interview Ops：題庫維護與 rubric 調整
- QA：e2e 場景與回歸測試

## 風險與預案
- 題庫品質不一致：加入 schema 驗證與 pre-commit 檢查
- 交卷格式破碎：以 contract test 鎖定 artifact 結構
- 評分分歧：先定義職級 rubric 再開跑 UAT

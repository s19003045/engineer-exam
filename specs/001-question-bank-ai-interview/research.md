# Research: 題庫選題與 AI 面試整合

## Decision 1: 交卷模式採「本地封裝檔 + 人工上傳」
- Decision: 交卷產出標準化封裝（答案、決策證據、時間線、校驗資訊），由候選人手動上傳至指定管道。
- Rationale: 在無後端條件下可立即上線，流程可閉環且便於稽核。
- Alternatives considered:
  - 直接 email 寄送內容：格式不一致、追蹤困難。
  - 即時後端上傳：超出 MVP 與目前架構。

## Decision 2: 混合題型同卷共存，題目級別啟用 AI 評估欄位
- Decision: 每題可設定傳統題/AI 題/混合模式，交卷檢查依題型切換必填規則。
- Rationale: 保留既有題庫價值，降低導入阻力，同時逐步加入 AI 評估訊號。
- Alternatives considered:
  - 全卷強制 AI 欄位：對傳統面試流程衝擊過大。
  - 全卷禁用 AI：無法形成差異化能力。

## Decision 3: 決策證據卡採固定五欄結構
- Decision: 假設、方案比較、風險、驗證、決策理由為 AI 題標準欄位。
- Rationale: 提升評分一致性與可比較性，減少自由文本噪音。
- Alternatives considered:
  - 開放式自由填寫：資料品質不一致。
  - 僅保留 Prompt Log：無法反映決策品質。

## Decision 4: 回放資料採事件流摘要（timeline）
- Decision: 記錄切題、內容變更、決策卡更新、交卷檢查等高價值事件。
- Rationale: 控制資料量並保留審閱關鍵脈絡。
- Alternatives considered:
  - 完整鍵擊紀錄：資料過大且隱私風險升高。
  - 不做回放：失去差異化審閱能力。

## Decision 5: triage 題作為每份考卷至少一題的硬性規則
- Decision: 考卷預設至少包含一題真實情境題，檢驗判斷與溝通能力。
- Rationale: 補足傳統 coding 題對真實工作能力的盲點。
- Alternatives considered:
  - 完全可選：容易被忽略，降低產品辨識度。
  - 全部 triage：不符合多數面試官既有習慣。

## Decision 6: 憲章 gate 處理
- Decision: 在 constitution 尚未具體化前，以「spec 一致性 + scope 控制 + 產物完整性」作為代理 gate。
- Rationale: 避免流程卡死，同時維持 planning 品質。
- Alternatives considered:
  - 暫停規劃等待憲章：阻斷交付。
  - 忽略 gate：缺乏最基本治理。

## Resolved Clarifications
- Technical Context 中無 `NEEDS CLARIFICATION` 殘留項。
- 交卷、混合題型、回放粒度、triage 必要性均已定案。

# Theme 設計：Signal Desk（工程面試平台）

## 1) Theme 核心概念
- 定位：`專業審閱台`，強調「決策證據」與「可回放分析」。
- 調性：冷靜、可信、密度高，但不壓迫。
- 關鍵字：`Evidence-first`、`Operational`、`Structured`.

## 2) 色彩系統（Light 為主）

### Brand / Semantic
- `--brand-900: #0F1A24`（深藍石墨，主品牌）
- `--brand-700: #1D3347`
- `--brand-500: #2B5A7A`
- `--accent-cyan: #0EA5A8`（資料與互動）
- `--accent-amber: #F59E0B`（提醒、待確認）
- `--success: #15803D`
- `--danger: #B91C1C`

### Neutral
- `--bg: #F6F8FA`
- `--surface: #FFFFFF`
- `--surface-2: #EEF2F6`
- `--border: #D6DEE6`
- `--text: #0B1320`
- `--text-muted: #526173`

### AI / Review 專用語意色
- `--ai-assisted: #0C7489`（AI 協作內容）
- `--human-decision: #1D4ED8`（人類判斷）
- `--risk-flag: #C2410C`（風險提示）
- `--replay-event: #334155`（時間線事件）

## 3) 字體與排版
- UI 字體：`IBM Plex Sans TC`, `Noto Sans TC`, sans-serif
- 程式碼字體：`JetBrains Mono`, monospace
- 標題比例：
  - H1: 32/40, 700
  - H2: 24/32, 650
  - H3: 20/28, 600
- 內文：
  - Body M: 16/24
  - Body S: 14/22
  - Caption: 12/18

## 4) 元件風格規範
- Radius：`10px`（卡片），`8px`（輸入框/按鈕）
- 邊框：`1px solid var(--border)`
- 卡片陰影：`0 1px 2px rgba(15, 23, 42, 0.06), 0 8px 24px rgba(15, 23, 42, 0.06)`
- Focus ring：`0 0 0 3px rgba(14, 165, 168, 0.28)`

### Button
- Primary：`brand-700` 背景 + 白字，hover 到 `brand-500`
- Secondary：白底 + `brand-700` 字 + `border`
- Danger：`danger` 背景 + 白字

### Inputs / Forms
- 背景 `surface`
- 錯誤狀態：邊框 `danger` + 輔助字 `danger`
- AI 決策卡欄位標題前加 `accent-cyan` 左邊線，提高辨識

### Panels
- 題目面板：`surface`
- 作答面板：`surface`
- Prompt/決策紀錄面板：`surface-2`（與主作答區分層）
- Replay 時間線：深淺交錯條帶，強化事件節點

## 5) 頁面套用建議

### A. 題庫與選題頁
- 左側篩選固定為 `surface-2`
- 題目卡片用 `brand-900` 細標題 + `text-muted` metadata
- 被選取題目用 `accent-cyan` 邊框高亮

### B. 候選人作答頁
- 採雙欄：左題目（40%）右作答（60%）
- AI 題目顯示 `AI` pill（`ai-assisted`）
- 傳統題目顯示 `Classic` pill（`human-decision`）

### C. 審閱頁
- 上方固定 summary bar（總分、風險項、時間線事件數）
- 中間三欄：答案 / 決策證據 / replay
- 高風險片段以 `risk-flag` 輕底色標註

## 6) 動效與互動節奏
- 動效時間：`160ms`（hover/focus），`220ms`（panel 展開）
- Easing：`cubic-bezier(0.2, 0.8, 0.2, 1)`
- 僅保留必要動效：排序拖曳、面板切換、儲存成功提示

## 7) CSS Token 範本（可直接落地）
```css
:root {
  --brand-900: #0F1A24;
  --brand-700: #1D3347;
  --brand-500: #2B5A7A;
  --accent-cyan: #0EA5A8;
  --accent-amber: #F59E0B;
  --success: #15803D;
  --danger: #B91C1C;

  --bg: #F6F8FA;
  --surface: #FFFFFF;
  --surface-2: #EEF2F6;
  --border: #D6DEE6;
  --text: #0B1320;
  --text-muted: #526173;

  --ai-assisted: #0C7489;
  --human-decision: #1D4ED8;
  --risk-flag: #C2410C;
  --replay-event: #334155;
}
```

## 8) 驗收標準（Theme）
- 不使用預設紫色系，不使用預設系統字體當主字體。
- 題庫頁、作答頁、審閱頁三者視覺語言一致，但層級明確。
- AI 協作元素（決策卡、時間線、風險）可在 3 秒內被辨識。

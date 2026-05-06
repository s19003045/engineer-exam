# Question Schema (JavaScript)

每一題 Markdown 建議使用以下 Frontmatter：

- `id`: 題目唯一 ID（例：`q-js-01`）
- `title`: 題目標題
- `level`: `Junior | Senior | Lead`（陣列）
- `tags`: 題目標籤（陣列）
- `question_type`: `coding | design | triage`
- `interview_type`: 自訂細分類型（例：`debug`, `review`, `refactor`）
- `estimated_time`: 建議作答分鐘
- `objective`: 一句話目標
- `constraints`: 限制條件（陣列）
- `expected_output`: 交付格式（陣列）
- `scoring_criteria`: 評分重點（陣列）
- `starter_code`: 起始程式碼（建議 coding 題提供）
- `status`: `active | inactive`
- `version`: 題目版本

## 內容區塊建議
1. 背景情境
2. 任務說明
3. 作答步驟
4. 常見誤區
5. 延伸追問

## 品質最低標準
- 題幹至少 180 字
- 至少 2 個明確限制
- 至少 3 個評分重點
- coding 題提供 starter code 或函式簽名

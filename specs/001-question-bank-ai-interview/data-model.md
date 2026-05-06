# Data Model: 題庫選題與 AI 面試整合

## 1. Question
- Description: 題庫中的最小題目單位。
- Fields:
  - id (string, unique, required)
  - title (string, required)
  - content (markdown text, required)
  - level (enum[]: Junior/Senior/Lead, required)
  - tags (string[], optional)
  - questionType (enum: design/coding/triage, required)
  - estimatedTimeMin (number > 0, required)
  - status (enum: active/inactive, required)
  - version (integer >= 1, required)
- Validation Rules:
  - `id` 不可重複。
  - triage 題 `questionType` 必須為 `triage`。

## 2. Paper
- Description: 一份可發送給候選人的考卷。
- Fields:
  - paperId (string, unique, required)
  - title (string, required)
  - roleLevel (enum: Junior/Senior/Lead, required)
  - selectedQuestions (PaperQuestion[], min 1)
  - createdAt (datetime, required)
- Validation Rules:
  - 至少包含 1 題。
  - 至少包含 1 題 triage 題。

## 3. PaperQuestion
- Description: 題目在某份考卷中的實例設定。
- Fields:
  - questionId (string, required)
  - orderIndex (integer >= 0, required)
  - mode (enum: traditional/ai/mixed, required)
  - weight (number > 0, required)
- Validation Rules:
  - 同一 `paperId` 下 `orderIndex` 不可重複。
  - 權重總和必須大於 0。

## 4. DecisionEvidenceCard
- Description: AI 題對應的結構化決策證據。
- Fields:
  - questionId (string, required)
  - assumptions (text, required for ai/mixed)
  - optionsAndTradeoffs (text, required for ai/mixed)
  - risks (text, required for ai/mixed)
  - validationPlan (text, required for ai/mixed)
  - rationale (text, required for ai/mixed)
- Validation Rules:
  - 僅在 `mode=ai|mixed` 時強制必填。
  - 所有欄位不可為空白字串。

## 5. AnswerSubmission
- Description: 候選人交卷主體。
- Fields:
  - submissionId (string, unique, required)
  - paperId (string, required)
  - candidateId (string, required)
  - answers (map<questionId, text>, required)
  - decisionCards (DecisionEvidenceCard[], conditional)
  - timelineEvents (TimelineEvent[], required)
  - submittedAt (datetime, required)
- Validation Rules:
  - 所有題目皆需有答案內容。
  - ai/mixed 題需有對應決策卡。

## 6. TimelineEvent
- Description: 可回放的作答事件。
- Fields:
  - timestamp (datetime, required)
  - eventType (enum: question_switched/answer_updated/card_updated/validation_failed/submitted, required)
  - questionId (string, optional)
  - summary (string, required)
- Validation Rules:
  - `submitted` 事件最多一筆。
  - 事件需依時間遞增。

## 7. EvaluationResult
- Description: 面試官/審閱者評分結果。
- Fields:
  - submissionId (string, required)
  - perQuestionScore (map<questionId, number>, required)
  - rubricScores (map<string, number>, optional)
  - weightedTotal (number, required)
  - reviewerNote (text, optional)
- Validation Rules:
  - 分數範圍為 0-100。
  - 加權總分需可由題目分數與權重推導。

## Relationships
- Paper 1..* PaperQuestion
- Question 1..* PaperQuestion
- Paper 1..* AnswerSubmission
- AnswerSubmission 0..* DecisionEvidenceCard
- AnswerSubmission 1..* TimelineEvent
- AnswerSubmission 0..1 EvaluationResult

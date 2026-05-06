# Contract: Interview Workflow Contract

## Purpose
定義題庫選題與 AI 面試整合流程中的資料交換與互動契約，供後續任務拆分與測試使用。

## 1) Paper Assembly Contract
- Trigger: 面試官完成選題並建立考卷。
- Input:
  - `paperTitle`
  - `roleLevel`
  - `selectedQuestions[]` with `questionId`, `orderIndex`, `mode`, `weight`
- Rules:
  - `selectedQuestions.length >= 1`
  - must include at least one `questionType=triage`
  - each question must have valid `mode`
- Output:
  - `paperId`
  - normalized question ordering
  - validation result

## 2) Candidate Save/Resume Contract
- Trigger: 候選人編輯答案或決策卡。
- Input:
  - `paperId`
  - `questionId`
  - answer content updates
  - decision card updates (if mode is ai/mixed)
- Rules:
  - autosave on change and interval
  - latest snapshot overwrites previous snapshot for same paper/candidate
- Output:
  - persisted local snapshot
  - latest save timestamp

## 3) Submission Validation Contract
- Trigger: 候選人按下交卷。
- Validation Rules:
  - every question has non-empty answer
  - ai/mixed questions have complete decision evidence fields
  - timeline has at least one work event and one submit event
- Output:
  - pass: submission package generation allowed
  - fail: list of missing fields/errors

## 4) Submission Package Contract
- Output Package:
  - `paper.pdf`
  - `answers.(md|txt)`
  - `decision-cards.json`
  - `timeline.json`
  - `checksums.txt`
- Filename Rule:
  - `{jobId}_{candidateId}_{timestamp}.zip`
- Integrity:
  - checksum file must include all packaged artifacts

## 5) Evaluation Contract
- Input:
  - submission package artifacts
  - paper question modes and weights
- Rules:
  - traditional-only question: score from answer quality
  - ai/mixed question: score includes decision evidence and AI collaboration maturity
- Output:
  - per-question scores
  - weighted total
  - reviewer notes

# Implementation Plan: 題庫選題與 AI 面試整合

**Branch**: `001-question-bank-ai-interview` | **Date**: 2026-05-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-question-bank-ai-interview/spec.md`

## Summary

本功能保留既有題庫與選題流程，新增 AI 面試評估能力（決策證據卡、triage 題、回放時間線與混合評分）。
實作策略採前端優先：以本地資料與標準化交卷封裝為核心，先完成完整流程閉環，再擴展後端收件與審閱平台。

## Technical Context

**Language/Version**: TypeScript (ES2022)  
**Primary Dependencies**: React + Vite, Zustand, react-markdown, gray-matter, @react-pdf/renderer, dnd-kit  
**Storage**: Browser localStorage + static Markdown content files  
**Testing**: Vitest + React Testing Library + Playwright (critical journey)  
**Target Platform**: Desktop web browsers (Chrome/Edge latest two major versions)
**Project Type**: frontend web application  
**Performance Goals**: 首屏（不含重型編輯器）< 2.5 秒；組卷操作回應 < 200ms（本地資料量 1k 題內）  
**Constraints**: 無後端；需支援中斷恢復；同卷可混合傳統題與 AI 題；交卷需可離線匯出  
**Scale/Scope**: 1 組織內部使用；題庫規模 200-1,000 題；單場面試考卷 5-12 題

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

目前 `.specify/memory/constitution.md` 為模板占位內容，未定義可執行條款或強制 gate；本計畫以「不違反既有 spec 與流程完整性」作為替代檢查基準。

Pre-Phase 0 Gate 結果：PASS（無明確憲章阻擋條件）。
Post-Phase 1 再檢查結果：PASS。
- 需求可追溯到 spec（FR/SC）。
- 無新增超出 scope 的實作義務。
- 產物可直接銜接 `/speckit.tasks`。

檢查項目：
- 需求可追溯到 spec（FR/SC）。
- 無新增超出 scope 的實作義務。
- 產物可直接銜接 `/speckit.tasks`。

## Project Structure

### Documentation (this feature)

```text
specs/001-question-bank-ai-interview/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── interview-workflow-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
docs/
└── init-spec.md

specs/
└── 001-question-bank-ai-interview/
    ├── spec.md
    ├── plan.md
    ├── research.md
    ├── data-model.md
    ├── quickstart.md
    └── contracts/
```

**Structure Decision**: 採「文件先行」規劃結構。當前 repository 尚未有正式應用程式碼目錄，先在 `specs/001-question-bank-ai-interview/` 完成設計產物，後續由 `/speckit.tasks` 輸出實作任務並建立實際前端專案結構。本次 implementation 會先建立 `src/`、`tests/` 基礎骨架（對應 tasks Phase 1），再逐步落地功能。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

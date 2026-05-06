# Tasks: 題庫選題與 AI 面試整合

**Input**: Design documents from `/specs/001-question-bank-ai-interview/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: 包含關鍵流程測試任務（Vitest + React Testing Library + Playwright）。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Web frontend project at repository root using `src/` and `tests/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and base structure for implementation

- [X] T001 Create frontend folder structure in `src/app`, `src/features`, `src/components`, `src/stores`, `src/lib`, `src/types`, `tests/unit`, `tests/integration`, `tests/e2e`
- [X] T002 Initialize project dependencies and scripts in `package.json` for React, Vite, Zustand, react-markdown, gray-matter, @react-pdf/renderer, dnd-kit, Vitest, Playwright
- [X] T003 [P] Add TypeScript and Vite base configuration in `tsconfig.json`, `vite.config.ts`
- [X] T004 [P] Add testing configuration in `vitest.config.ts`, `playwright.config.ts`, `tests/setup.ts`
- [X] T005 [P] Create base app shell and routing entry in `src/main.tsx`, `src/app/App.tsx`, `src/app/routes.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core shared domain and infrastructure that blocks all user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Define core domain types from data model in `src/types/domain.ts`
- [X] T007 Implement question content/frontmatter parser in `src/lib/content/loadQuestions.ts`
- [X] T008 [P] Implement global Zustand store skeleton in `src/stores/interviewStore.ts`
- [X] T009 [P] Implement autosave and restore utilities for localStorage in `src/lib/persistence/autosave.ts`
- [X] T010 Implement shared validation engine for submission rules in `src/lib/validation/submissionValidation.ts`
- [X] T011 [P] Implement timeline event collector utilities in `src/lib/timeline/timelineTracker.ts`
- [X] T012 [P] Build shared scoring utility (weights + rubric dimensions) in `src/lib/scoring/scoreCalculator.ts`
- [X] T013 Implement shared ZIP package builder and checksum utility in `src/lib/submission/packageBuilder.ts`
- [X] T014 Create shared UI layout primitives (two-column, section panels, form blocks) in `src/components/layout/`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - 快速組卷與發卷 (Priority: P1) 🎯 MVP

**Goal**: 面試官可從題庫快速搜尋篩選、選題、排序並設定題目模式完成發卷

**Independent Test**: 面試官可獨立完成樣板載入、選題、題序調整與發卷，不需候選人作答功能

### Tests for User Story 1

- [X] T015 [P] [US1] Add unit tests for question filtering and template selection in `tests/unit/questionFilters.test.ts`
- [X] T016 [P] [US1] Add integration test for paper assembly flow in `tests/integration/paperAssemblyFlow.test.tsx`

### Implementation for User Story 1

- [X] T017 [P] [US1] Implement question repository and query helpers in `src/features/question-bank/questionRepository.ts`
- [X] T018 [P] [US1] Implement template definitions and loader in `src/features/paper-builder/templateCatalog.ts`
- [X] T019 [US1] Build question explorer UI (search/tag/level/type filters) in `src/features/question-bank/QuestionExplorer.tsx`
- [X] T020 [US1] Build selected-paper panel with add/remove actions in `src/features/paper-builder/SelectedQuestionsPanel.tsx`
- [X] T021 [US1] Implement drag-and-drop ordering for selected questions in `src/features/paper-builder/QuestionOrderDnD.tsx`
- [X] T022 [US1] Implement per-question mode selector (traditional/ai/mixed) in `src/features/paper-builder/QuestionModeSelector.tsx`
- [X] T023 [US1] Implement triage-question requirement check and warnings in `src/features/paper-builder/paperRules.ts`
- [X] T024 [US1] Implement paper creation and launch action in `src/features/paper-builder/createPaper.ts`

**Checkpoint**: User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - 候選人完成混合作答 (Priority: P2)

**Goal**: 候選人可完成傳統題與 AI 題作答、填寫決策證據卡、通過檢查並輸出交卷封裝

**Independent Test**: 候選人可在單一考卷完成答案與決策卡，重整可恢復，並成功產生 submission 檔

### Tests for User Story 2

- [X] T025 [P] [US2] Add unit tests for decision-card validation and required-field rules in `tests/unit/decisionCardValidation.test.ts`
- [X] T026 [P] [US2] Add integration test for autosave/restore behavior in `tests/integration/autosaveRestore.test.tsx`
- [X] T027 [P] [US2] Add integration test for submission validation and package generation in `tests/integration/submissionValidationAndExport.test.tsx`

### Implementation for User Story 2

- [X] T028 [P] [US2] Build candidate exam workspace container in `src/features/candidate-workspace/CandidateWorkspace.tsx`
- [X] T029 [P] [US2] Implement answer editor and question navigation in `src/features/candidate-workspace/AnswerEditor.tsx`
- [X] T030 [US2] Implement decision evidence card form in `src/features/candidate-workspace/DecisionEvidenceCardForm.tsx`
- [X] T031 [US2] Implement triage response template and helpers in `src/features/candidate-workspace/TriageAnswerGuide.tsx`
- [X] T032 [US2] Wire autosave + restore into workspace lifecycle in `src/features/candidate-workspace/useWorkspacePersistence.ts`
- [X] T033 [US2] Implement pre-submit completeness checks and inline error prompts in `src/features/submission/SubmissionChecklist.tsx`
- [X] T034 [US2] Implement paper PDF generator for submission artifact in `src/features/submission/generatePaperPdf.ts`
- [X] T035 [US2] Implement submission ZIP export flow and filename rules in `src/features/submission/exportSubmission.ts`
- [X] T036 [US2] Record timeline events for answer/card/update/submit actions in `src/features/candidate-workspace/useTimelineTracking.ts`
- [X] T037 [P] [US2] Add integration test for PDF artifact presence in `tests/integration/submissionPdfArtifact.test.tsx`

**Checkpoint**: User Stories 1 and 2 both work independently

---

## Phase 5: User Story 3 - 審閱者依證據評估 (Priority: P3)

**Goal**: 審閱者可查看答案、決策證據、時間線並輸出加權評分結果

**Independent Test**: 使用已產生 submission 檔，審閱者可完成分項評分與總分輸出

### Tests for User Story 3

- [X] T038 [P] [US3] Add unit tests for weighted scoring calculations in `tests/unit/weightedScoring.test.ts`
- [X] T039 [P] [US3] Add integration test for reviewer scoring workflow in `tests/integration/reviewerWorkflow.test.tsx`

### Implementation for User Story 3

- [X] T040 [P] [US3] Implement submission artifact reader utilities in `src/features/reviewer/submissionReader.ts`
- [X] T041 [P] [US3] Build timeline replay viewer in `src/features/reviewer/TimelineReplayPanel.tsx`
- [X] T042 [US3] Build answer and decision-card review panels in `src/features/reviewer/ReviewPanels.tsx`
- [X] T043 [US3] Implement role-level scoring profiles (Junior/Senior/Lead) in `src/features/reviewer/roleRubricProfiles.ts`
- [X] T044 [US3] Enforce role-level weighting in `src/lib/scoring/scoreCalculator.ts`
- [X] T045 [P] [US3] Add unit tests for role-level scoring rules in `tests/unit/roleRubricProfiles.test.ts`
- [X] T046 [US3] Implement rubric scoring form (traditional + AI dimensions) in `src/features/reviewer/RubricScoreForm.tsx`
- [X] T047 [US3] Implement weighted score summary and export in `src/features/reviewer/ScoreSummary.tsx`
- [X] T048 [US3] Implement reviewer page composition and flow in `src/features/reviewer/ReviewerWorkspace.tsx`

**Checkpoint**: All user stories independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improve quality across all user stories

- [X] T049 [P] Add contract conformance tests for paper assembly/submission/evaluation in `tests/contract/interviewWorkflowContract.test.ts`
- [X] T050 Improve error and empty states in `src/features/paper-builder/SelectedQuestionsPanel.tsx`
- [X] T051 Improve error and empty states in `src/features/candidate-workspace/CandidateWorkspace.tsx`
- [X] T052 Improve error and empty states in `src/features/reviewer/ReviewerWorkspace.tsx`
- [X] T053 [P] Add performance instrumentation for page load and key actions in `src/lib/metrics/performanceMetrics.ts`
- [X] T054 [P] Update product and implementation docs in `docs/init-spec.md` and `specs/001-question-bank-ai-interview/quickstart.md`
- [X] T055 Execute end-to-end quickstart validation scenarios in `tests/e2e/quickstart-flow.spec.ts`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all user stories
- **Phase 3 (US1)**: Depends on Phase 2
- **Phase 4 (US2)**: Depends on Phase 2 and uses outputs from US1 paper creation flow
- **Phase 5 (US3)**: Depends on Phase 2 and uses submission artifacts from US2
- **Phase 6 (Polish)**: Depends on all target user stories

### User Story Dependencies

- **US1 (P1)**: Starts after foundational phase; MVP story
- **US2 (P2)**: Starts after foundational phase; operationally depends on paper payload shape from US1
- **US3 (P3)**: Starts after foundational phase; operationally depends on submission artifact shape from US2

### Within Each User Story

- Test tasks first
- Domain/state helpers before UI wiring
- Validation before export/submit/review finalization
- Story checkpoint must pass before moving to next release gate

### Parallel Opportunities

- Setup tasks `T003-T005` can run in parallel
- Foundational tasks `T008, T009, T011, T012` can run in parallel
- US1 tasks `T017, T018, T019` can run in parallel before integration
- US2 tasks `T028, T029` and tests `T025-T027` can run in parallel
- US3 tasks `T040, T041` and tests `T038-T039` can run in parallel
- Polish tasks `T049, T053, T054` can run in parallel

---

## Parallel Example: User Story 1

```bash
Task: "T015 [US1] question filter unit tests in tests/unit/questionFilters.test.ts"
Task: "T016 [US1] paper assembly integration test in tests/integration/paperAssemblyFlow.test.tsx"
Task: "T017 [US1] question repository in src/features/question-bank/questionRepository.ts"
Task: "T018 [US1] template catalog in src/features/paper-builder/templateCatalog.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 Setup
2. Complete Phase 2 Foundational
3. Complete Phase 3 User Story 1
4. Validate US1 independently (selection, ordering, mode assignment, triage rule)
5. Demo/deploy MVP workflow for interviewer side

### Incremental Delivery

1. Add US1 to establish paper generation flow
2. Add US2 to complete candidate authoring + submission package loop
3. Add US3 to complete reviewer scoring and replay loop
4. Finish with Phase 6 polish and contract/e2e verification

### Parallel Team Strategy

1. Team A handles shared foundation (`T006-T014`)
2. Team B starts US1 once foundation lands
3. Team C prepares US2 tests and workspace scaffolding
4. Team D prepares US3 review artifacts and scoring UI after US2 artifact contract stabilizes

---

## Notes

- 所有任務皆符合 `- [X] Txxx [P?] [US?] 描述 + 檔案路徑` 格式。
- 任務按故事獨立可測原則設計，可逐故事驗收。
- 每個 phase 結束建議跑對應測試再進下一 phase。


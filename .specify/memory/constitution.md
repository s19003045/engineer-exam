# Engineer Exam Constitution

## Core Principles

### I. Requirement Traceability (MUST)
Every Functional Requirement (FR) in `spec.md` MUST map to at least one executable task in `tasks.md`.
No implementation work may start if any FR has zero task coverage.

### II. Story Independence (MUST)
Each user story MUST be independently implementable and testable.
Tasks MUST be organized by user story and include an explicit independent test checkpoint.

### III. Test Baseline (MUST)
Every feature MUST include:
- Unit tests for core business logic
- Integration tests for primary user flows
- At least one end-to-end validation for release readiness

### IV. Scope Discipline (MUST)
Implementation MUST stay within scope defined by `spec.md` and `plan.md`.
Out-of-scope additions require explicit spec/plan update before coding.

### V. Quality Gate Before Implement (MUST)
Before `/speckit.implement`, the latest artifacts MUST pass:
- No CRITICAL consistency issues in `/speckit.analyze`
- No unresolved `NEEDS CLARIFICATION` markers
- Plan, spec, and tasks are mutually consistent

## Additional Constraints

- Primary target is desktop web execution for internal interview workflow.
- Frontend-only mode is allowed for MVP, but submission integrity and reviewability must be preserved.

## Workflow and Review

- `/speckit.specify` -> `/speckit.plan` -> `/speckit.tasks` -> `/speckit.analyze` is the default gated flow.
- If constitution conflicts are found, artifacts must be updated; constitution must not be silently bypassed.

## Governance

This constitution supersedes local planning conventions when conflicts occur.
Amendments require explicit update in this file and regeneration/revalidation of affected artifacts.

**Version**: 1.0.0 | **Ratified**: 2026-05-06 | **Last Amended**: 2026-05-06

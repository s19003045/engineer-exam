import type { DecisionEvidenceCard, PaperQuestion, TimelineEvent } from "../../types/domain";

export interface SubmissionValidationInput {
  selectedQuestions: PaperQuestion[];
  answers: Record<string, string>;
  decisionCards: Record<string, DecisionEvidenceCard | undefined>;
  timelineEvents: TimelineEvent[];
}

export function validateSubmission(input: SubmissionValidationInput): string[] {
  const errors: string[] = [];
  for (const q of input.selectedQuestions) {
    if (!input.answers[q.questionId]?.trim()) errors.push(`Missing answer: ${q.questionId}`);
    if (q.mode === "ai" || q.mode === "mixed") {
      const c = input.decisionCards[q.questionId];
      if (!c) {
        errors.push(`Missing decision card: ${q.questionId}`);
      } else {
        const required = [c.assumptions, c.optionsAndTradeoffs, c.risks, c.validationPlan, c.rationale];
        if (required.some((v) => !v?.trim())) errors.push(`Incomplete decision card: ${q.questionId}`);
      }
    }
  }
  if (!input.timelineEvents.length) errors.push("Missing timeline events");
  return errors;
}

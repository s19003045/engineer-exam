import type { Question } from "../../types/domain";

export function hasAtLeastOneTriage(questions: Question[]): boolean {
  return questions.some((q) => q.questionType === "triage");
}

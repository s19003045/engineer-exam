import type { Paper, PaperQuestion } from "../../types/domain";

export function createPaper(title: string, roleLevel: Paper["roleLevel"], selectedQuestions: PaperQuestion[]): Paper {
  return {
    paperId: `paper-${Date.now()}`,
    title,
    roleLevel,
    selectedQuestions,
    createdAt: new Date().toISOString(),
  };
}

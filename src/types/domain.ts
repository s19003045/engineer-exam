export type RoleLevel = "Junior" | "Senior" | "Lead";
export type QuestionType = "design" | "coding" | "triage";
export type QuestionMode = "traditional" | "ai" | "mixed";

export interface Question {
  id: string;
  title: string;
  content: string;
  level: RoleLevel[];
  tags: string[];
  questionType: QuestionType;
  interviewType?: string;
  estimatedTimeMin: number;
  status: "active" | "inactive";
  version: number;
  objective?: string;
  constraints?: string[];
  expectedOutput?: string[];
  scoringCriteria?: string[];
  starterCode?: string;
}

export interface PaperQuestion {
  questionId: string;
  orderIndex: number;
  mode: QuestionMode;
  weight: number;
}

export interface Paper {
  paperId: string;
  title: string;
  roleLevel: RoleLevel;
  selectedQuestions: PaperQuestion[];
  createdAt: string;
}

export interface DecisionEvidenceCard {
  questionId: string;
  assumptions: string;
  optionsAndTradeoffs: string;
  risks: string;
  validationPlan: string;
  rationale: string;
}

export interface TimelineEvent {
  timestamp: string;
  eventType: "question_switched" | "answer_updated" | "card_updated" | "validation_failed" | "submitted";
  questionId?: string;
  summary: string;
}

export interface AnswerSubmission {
  submissionId: string;
  paperId: string;
  candidateId: string;
  answers: Record<string, string>;
  decisionCards: Record<string, DecisionEvidenceCard>;
  timelineEvents: TimelineEvent[];
  submittedAt: string;
}

export interface SubmissionArtifact {
  filename: string;
  files: Record<string, Uint8Array>;
}

export interface QuestionScore {
  questionId: string;
  traditionalScore: number;
  aiScore: number;
  weight: number;
}

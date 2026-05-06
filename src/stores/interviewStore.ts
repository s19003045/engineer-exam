import { create } from "zustand";
import type {
  AnswerSubmission,
  DecisionEvidenceCard,
  Paper,
  PaperQuestion,
  Question,
  QuestionMode,
  QuestionScore,
  SubmissionArtifact,
  TimelineEvent,
} from "../types/domain";

interface InterviewState {
  questions: Question[];
  selectedQuestionIds: string[];
  questionModes: Record<string, QuestionMode>;
  currentPaper?: Paper;
  currentQuestionId?: string;
  answers: Record<string, string>;
  decisionCards: Record<string, DecisionEvidenceCard>;
  timelineEvents: TimelineEvent[];
  lastSubmission?: AnswerSubmission;
  lastArtifact?: SubmissionArtifact;
  reviewerScores: Record<string, QuestionScore>;

  setQuestions: (questions: Question[]) => void;
  loadTemplateByTags: (requiredTags: string[]) => void;
  toggleQuestion: (questionId: string) => void;
  moveQuestion: (questionId: string, direction: -1 | 1) => void;
  setQuestionMode: (questionId: string, mode: QuestionMode) => void;
  createPaper: (title: string, roleLevel: Paper["roleLevel"]) => void;
  setCurrentQuestion: (questionId: string) => void;
  setAnswer: (questionId: string, value: string) => void;
  setDecisionCard: (questionId: string, card: DecisionEvidenceCard) => void;
  pushTimeline: (event: TimelineEvent) => void;
  setSubmissionResult: (submission: AnswerSubmission, artifact: SubmissionArtifact) => void;
  setReviewerScore: (score: QuestionScore) => void;
  resetFlow: () => void;
}

function buildPaperQuestions(ids: string[], modes: Record<string, QuestionMode>): PaperQuestion[] {
  return ids.map((id, idx) => ({
    questionId: id,
    orderIndex: idx,
    mode: modes[id] ?? "traditional",
    weight: 1,
  }));
}

export const useInterviewStore = create<InterviewState>((set, get) => ({
  questions: [],
  selectedQuestionIds: [],
  questionModes: {},
  answers: {},
  decisionCards: {},
  timelineEvents: [],
  reviewerScores: {},

  setQuestions: (questions) => set({ questions }),

  loadTemplateByTags: (requiredTags) =>
    set((state) => {
      const selected = state.questions
        .filter((q) => requiredTags.every((tag) => q.tags.includes(tag)))
        .slice(0, 8)
        .map((q) => q.id);
      return { selectedQuestionIds: selected };
    }),

  toggleQuestion: (questionId) =>
    set((state) => {
      const exists = state.selectedQuestionIds.includes(questionId);
      return {
        selectedQuestionIds: exists
          ? state.selectedQuestionIds.filter((id) => id !== questionId)
          : [...state.selectedQuestionIds, questionId],
      };
    }),

  moveQuestion: (questionId, direction) =>
    set((state) => {
      const idx = state.selectedQuestionIds.indexOf(questionId);
      if (idx < 0) return {};
      const target = idx + direction;
      if (target < 0 || target >= state.selectedQuestionIds.length) return {};
      const next = [...state.selectedQuestionIds];
      [next[idx], next[target]] = [next[target], next[idx]];
      return { selectedQuestionIds: next };
    }),

  setQuestionMode: (questionId, mode) =>
    set((state) => ({ questionModes: { ...state.questionModes, [questionId]: mode } })),

  createPaper: (title, roleLevel) => {
    const state = get();
    const paper: Paper = {
      paperId: `paper-${Date.now()}`,
      title,
      roleLevel,
      selectedQuestions: buildPaperQuestions(state.selectedQuestionIds, state.questionModes),
      createdAt: new Date().toISOString(),
    };
    set({
      currentPaper: paper,
      currentQuestionId: paper.selectedQuestions[0]?.questionId,
      answers: {},
      decisionCards: {},
      timelineEvents: [],
      reviewerScores: {},
      lastSubmission: undefined,
      lastArtifact: undefined,
    });
  },

  setCurrentQuestion: (questionId) => set({ currentQuestionId: questionId }),

  setAnswer: (questionId, value) => set((state) => ({ answers: { ...state.answers, [questionId]: value } })),

  setDecisionCard: (questionId, card) =>
    set((state) => ({ decisionCards: { ...state.decisionCards, [questionId]: card } })),

  pushTimeline: (event) => set((state) => ({ timelineEvents: [...state.timelineEvents, event] })),

  setSubmissionResult: (submission, artifact) => set({ lastSubmission: submission, lastArtifact: artifact }),

  setReviewerScore: (score) =>
    set((state) => ({ reviewerScores: { ...state.reviewerScores, [score.questionId]: score } })),

  resetFlow: () =>
    set({
      selectedQuestionIds: [],
      questionModes: {},
      currentPaper: undefined,
      currentQuestionId: undefined,
      answers: {},
      decisionCards: {},
      timelineEvents: [],
      lastSubmission: undefined,
      lastArtifact: undefined,
      reviewerScores: {},
    }),
}));

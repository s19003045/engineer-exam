import React, { useMemo } from "react";
import { useInterviewStore } from "../../stores/interviewStore";
import type { AnswerSubmission, DecisionEvidenceCard } from "../../types/domain";
import { DecisionEvidenceCardForm } from "./DecisionEvidenceCardForm";
import { TriageAnswerGuide } from "./TriageAnswerGuide";
import { createTimelineEvent } from "../../lib/timeline/timelineTracker";
import { validateSubmission } from "../../lib/validation/submissionValidation";
import { SubmissionChecklist } from "../submission/SubmissionChecklist";
import { exportSubmission } from "../submission/exportSubmission";
import { getLastSavedAt, persistWorkspace } from "./useWorkspacePersistence";

function emptyCard(questionId: string): DecisionEvidenceCard {
  return { questionId, assumptions: "", optionsAndTradeoffs: "", risks: "", validationPlan: "", rationale: "" };
}

export function CandidateWorkspace(): JSX.Element {
  const paper = useInterviewStore((s) => s.currentPaper);
  const questions = useInterviewStore((s) => s.questions);
  const currentQuestionId = useInterviewStore((s) => s.currentQuestionId);
  const setCurrentQuestion = useInterviewStore((s) => s.setCurrentQuestion);
  const answers = useInterviewStore((s) => s.answers);
  const setAnswer = useInterviewStore((s) => s.setAnswer);
  const cards = useInterviewStore((s) => s.decisionCards);
  const setCard = useInterviewStore((s) => s.setDecisionCard);
  const timeline = useInterviewStore((s) => s.timelineEvents);
  const pushTimeline = useInterviewStore((s) => s.pushTimeline);
  const setSubmissionResult = useInterviewStore((s) => s.setSubmissionResult);
  const lastSavedAt = getLastSavedAt();

  if (!paper) return <div className="muted">No active paper found. Please create a paper in Builder.</div>;

  const current = questions.find((q) => q.id === currentQuestionId) ?? questions.find((q) => q.id === paper.selectedQuestions[0]?.questionId);
  if (!current) return <div className="muted">Paper has no question data loaded.</div>;

  const mode = paper.selectedQuestions.find((q) => q.questionId === current.id)?.mode ?? "traditional";
  const showCard = mode === "ai" || mode === "mixed";
  const card = cards[current.id] ?? emptyCard(current.id);

  const errors = useMemo(() => validateSubmission({ selectedQuestions: paper.selectedQuestions, answers, decisionCards: cards, timelineEvents: timeline }), [paper.selectedQuestions, answers, cards, timeline]);

  const handleSubmit = () => {
    const submission: AnswerSubmission = {
      submissionId: `sub-${Date.now()}`,
      paperId: paper.paperId,
      candidateId: "candidate-demo",
      answers,
      decisionCards: cards,
      timelineEvents: [...timeline, createTimelineEvent("submitted", "Submission completed")],
      submittedAt: new Date().toISOString(),
    };
    const artifact = exportSubmission({ paper, questions, submission });
    setSubmissionResult(submission, artifact);
    pushTimeline(createTimelineEvent("submitted", "Submitted package downloaded"));
    alert(`Submission exported: ${artifact.filename}`);
  };

  return (
    <div>
      <h2>Candidate Workspace</h2>
      <p className="muted">Paper: {paper.title} · {paper.roleLevel} · {paper.selectedQuestions.length} questions</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        {paper.selectedQuestions.map((pq, i) => (
          <button className="btn" key={pq.questionId} onClick={() => { setCurrentQuestion(pq.questionId); pushTimeline(createTimelineEvent("question_switched", `Switch to ${pq.questionId}`, pq.questionId)); }}>
            Q{i + 1}
          </button>
        ))}
      </div>
      <div className="card">
        <h3 style={{ marginTop: 0 }}>{current.title}</h3>
        <span className={`badge ${mode}`}>{mode}</span>
        {current.objective && (
          <div style={{ marginTop: 8 }}>
            <strong>Objective</strong>
            <p style={{ margin: "4px 0 0" }}>{current.objective}</p>
          </div>
        )}
        {current.constraints && current.constraints.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <strong>Constraints</strong>
            <ul style={{ margin: "4px 0 0" }}>
              {current.constraints.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        )}
        {current.expectedOutput && current.expectedOutput.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <strong>Expected Output</strong>
            <ul style={{ margin: "4px 0 0" }}>
              {current.expectedOutput.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        )}
        {current.scoringCriteria && current.scoringCriteria.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <strong>Scoring Criteria</strong>
            <ul style={{ margin: "4px 0 0" }}>
              {current.scoringCriteria.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        )}
        {current.starterCode && (
          <div style={{ marginTop: 8 }}>
            <strong>Starter Code</strong>
            <pre style={{ background: "#0f1a24", color: "#fff", padding: 8, borderRadius: 8, overflowX: "auto" }}>
              <code>{current.starterCode}</code>
            </pre>
          </div>
        )}
        {current.questionType === "triage" && <div style={{ marginTop: 8 }}><TriageAnswerGuide /></div>}
        <textarea
          className="textarea"
          value={answers[current.id] ?? ""}
          onChange={(e) => {
            setAnswer(current.id, e.target.value);
            persistWorkspace({ paperId: paper.paperId, answers: { ...answers, [current.id]: e.target.value }, decisionCards: cards });
            pushTimeline(createTimelineEvent("answer_updated", `Answer updated: ${current.id}`, current.id));
          }}
          placeholder="Write your answer here..."
          style={{ marginTop: 8 }}
        />
      </div>
      {showCard && <div style={{ marginTop: 10 }}><DecisionEvidenceCardForm value={card} onChange={(next) => { setCard(current.id, next); persistWorkspace({ paperId: paper.paperId, answers, decisionCards: { ...cards, [current.id]: next } }); pushTimeline(createTimelineEvent("card_updated", `Decision card updated: ${current.id}`, current.id)); }} /></div>}
      <div style={{ marginTop: 12 }}><SubmissionChecklist errors={errors} /></div>
      <p className="muted" style={{ marginTop: 8 }}>Last autosave: {lastSavedAt ? new Date(lastSavedAt).toLocaleString() : "N/A"}</p>
      <button className="btn primary" disabled={errors.length > 0} style={{ marginTop: 8 }} onClick={handleSubmit}>Export Submission ZIP</button>
    </div>
  );
}

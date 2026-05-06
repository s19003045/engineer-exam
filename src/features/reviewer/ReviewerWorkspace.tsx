import React from "react";
import { useInterviewStore } from "../../stores/interviewStore";
import { ReviewPanels } from "./ReviewPanels";
import { RubricScoreForm } from "./RubricScoreForm";
import { ScoreSummary } from "./ScoreSummary";
import { TimelineReplayPanel } from "./TimelineReplayPanel";

export function ReviewerWorkspace(): JSX.Element {
  const submission = useInterviewStore((s) => s.lastSubmission);
  if (!submission) return <div className="muted">No submission loaded. Complete candidate submission first.</div>;

  return (
    <div>
      <h2>Reviewer Workspace</h2>
      <p className="muted">Submission: {submission.submissionId} · {submission.submittedAt}</p>
      <div className="grid-2">
        <section className="panel"><ReviewPanels /></section>
        <section className="panel"><TimelineReplayPanel /></section>
      </div>
      <div className="grid-2" style={{ marginTop: 12 }}>
        <section className="panel"><RubricScoreForm /></section>
        <section className="panel"><ScoreSummary /></section>
      </div>
    </div>
  );
}

import React from "react";
import { useInterviewStore } from "../../stores/interviewStore";

export function ReviewPanels(): JSX.Element {
  const submission = useInterviewStore((s) => s.lastSubmission);
  if (!submission) return <div className="muted">No submission loaded.</div>;

  return (
    <div>
      <h4>Answers</h4>
      {Object.entries(submission.answers).map(([qid, ans]) => (
        <div key={qid} className="card" style={{ marginBottom: 8 }}>
          <strong>{qid}</strong>
          <pre style={{ whiteSpace: "pre-wrap", marginBottom: 0 }}>{ans}</pre>
        </div>
      ))}
    </div>
  );
}

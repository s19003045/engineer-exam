import React from "react";
import { useInterviewStore } from "../../stores/interviewStore";
import { roleRubricProfiles } from "./roleRubricProfiles";

export function RubricScoreForm(): JSX.Element {
  const paper = useInterviewStore((s) => s.currentPaper);
  const setScore = useInterviewStore((s) => s.setReviewerScore);
  const scores = useInterviewStore((s) => s.reviewerScores);
  if (!paper) return <div>No paper loaded.</div>;
  const profile = roleRubricProfiles[paper.roleLevel];

  return (
    <div>
      <h4>Rubric Scoring ({paper.roleLevel})</h4>
      <small>correctness {profile.correctness}, maintainability {profile.maintainability}, aiMaturity {profile.aiMaturity}</small>
      {paper.selectedQuestions.map((pq) => {
        const cur = scores[pq.questionId] ?? { questionId: pq.questionId, traditionalScore: 0, aiScore: 0, weight: pq.weight };
        return (
          <div key={pq.questionId} style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: 8, marginTop: 8 }}>
            <strong>{pq.questionId}</strong>
            <input
              type="number"
              min={0}
              max={100}
              value={cur.traditionalScore}
              onChange={(e) => setScore({ ...cur, traditionalScore: Number(e.target.value) })}
            />
            <input
              type="number"
              min={0}
              max={100}
              value={cur.aiScore}
              onChange={(e) => setScore({ ...cur, aiScore: Number(e.target.value) })}
            />
          </div>
        );
      })}
    </div>
  );
}

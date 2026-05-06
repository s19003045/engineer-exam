import React, { useMemo } from "react";
import { useInterviewStore } from "../../stores/interviewStore";
import { applyRoleProfile, calcWeightedTotal } from "../../lib/scoring/scoreCalculator";

export function ScoreSummary(): JSX.Element {
  const paper = useInterviewStore((s) => s.currentPaper);
  const scores = useInterviewStore((s) => s.reviewerScores);

  const total = useMemo(() => {
    if (!paper) return 0;
    const arr = paper.selectedQuestions.map((pq) => {
      const s = scores[pq.questionId] ?? { traditionalScore: 0, aiScore: 0, weight: pq.weight };
      return {
        questionScore: applyRoleProfile(paper.roleLevel, s.traditionalScore, s.aiScore),
        weight: pq.weight,
      };
    });
    return calcWeightedTotal(arr);
  }, [paper, scores]);

  const exportJson = () => {
    if (!paper) return;
    const payload = {
      paperId: paper.paperId,
      roleLevel: paper.roleLevel,
      scores,
      totalScore: Number(total.toFixed(2)),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `review-score-${paper.paperId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ border: "1px solid #d6dee6", padding: 10, borderRadius: 8 }}>
      <h4>Score Summary</h4>
      <div>Total Score: {total.toFixed(2)}</div>
      <button className="btn" style={{ marginTop: 8 }} onClick={exportJson}>Export Score JSON</button>
    </div>
  );
}

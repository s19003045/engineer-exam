import React, { useMemo, useState } from "react";
import { useInterviewStore } from "../../stores/interviewStore";
import { queryQuestions } from "./questionRepository";

export function QuestionExplorer(): JSX.Element {
  const questions = useInterviewStore((s) => s.questions);
  const selected = useInterviewStore((s) => s.selectedQuestionIds);
  const toggle = useInterviewStore((s) => s.toggleQuestion);
  const [keyword, setKeyword] = useState("");

  const results = useMemo(() => queryQuestions(questions, { keyword }), [questions, keyword]);

  return (
    <div>
      <h2>Question Explorer</h2>
      <input className="input" placeholder="Search by keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <div className="list" style={{ marginTop: 10 }}>
        {results.map((q) => {
          const on = selected.includes(q.id);
          return (
            <div key={q.id} className={`row ${on ? "on" : ""}`}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <strong>{q.title}</strong>
                <button className="btn" onClick={() => toggle(q.id)}>{on ? "Remove" : "Add"}</button>
              </div>
              <small className="muted">{q.id} · {q.questionType} · {q.level.join(", ")}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}

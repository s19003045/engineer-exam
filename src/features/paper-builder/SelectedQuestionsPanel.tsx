import React, { useState } from "react";
import { useInterviewStore } from "../../stores/interviewStore";
import { QuestionModeSelector } from "./QuestionModeSelector";
import { templateCatalog } from "./templateCatalog";
import { AppSelect } from "../../components/form/AppSelect";

export function SelectedQuestionsPanel({ onPaperCreated }: { onPaperCreated?: () => void }): JSX.Element {
  const selected = useInterviewStore((s) => s.selectedQuestionIds);
  const questions = useInterviewStore((s) => s.questions);
  const modes = useInterviewStore((s) => s.questionModes);
  const setMode = useInterviewStore((s) => s.setQuestionMode);
  const move = useInterviewStore((s) => s.moveQuestion);
  const createPaper = useInterviewStore((s) => s.createPaper);
  const currentPaper = useInterviewStore((s) => s.currentPaper);
  const loadTemplateByTags = useInterviewStore((s) => s.loadTemplateByTags);
  const [title, setTitle] = useState("JavaScript Interview Paper");
  const [role, setRole] = useState<"Junior" | "Senior" | "Lead">("Senior");

  const selectedQuestions = selected.map((id) => questions.find((q) => q.id === id)).filter(Boolean);

  if (!selectedQuestions.length) {
    return <div className="muted">No questions selected yet. Add items from the question explorer.</div>;
  }

  return (
    <div>
      <h2>Selected Questions</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        {templateCatalog.map((tpl) => (
          <button key={tpl.id} className="btn" onClick={() => loadTemplateByTags(tpl.requiredTags)}>
            Load: {tpl.title}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {selectedQuestions.map((q, idx) => (
          <div key={q!.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <strong>{idx + 1}. {q!.title}</strong>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="btn" onClick={() => move(q!.id, -1)}>↑</button>
                <button className="btn" onClick={() => move(q!.id, 1)}>↓</button>
              </div>
            </div>
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <QuestionModeSelector mode={modes[q!.id] ?? "traditional"} onChange={(m) => setMode(q!.id, m)} />
              <span className={`badge ${modes[q!.id] ?? "traditional"}`}>{modes[q!.id] ?? "traditional"}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="kv" style={{ marginTop: 12 }}>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
        <AppSelect
          value={role}
          onChange={(v) => setRole(v)}
          ariaLabel="Interview role level"
          options={[
            { value: "Junior", label: "Junior" },
            { value: "Senior", label: "Senior" },
            { value: "Lead", label: "Lead" },
          ]}
        />
        <button
          className="btn primary"
          onClick={() => {
            createPaper(title, role);
            onPaperCreated?.();
          }}
        >
          Create Paper
        </button>
      </div>
      {currentPaper && (
        <p className="muted" style={{ marginTop: 10 }}>
          Paper created: <strong>{currentPaper.title}</strong> ({currentPaper.selectedQuestions.length} questions)
        </p>
      )}
    </div>
  );
}

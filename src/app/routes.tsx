import React, { useEffect, useState } from "react";
import { loadQuestions } from "../lib/content/loadQuestions";
import { useInterviewStore } from "../stores/interviewStore";
import { QuestionExplorer } from "../features/question-bank/QuestionExplorer";
import { SelectedQuestionsPanel } from "../features/paper-builder/SelectedQuestionsPanel";
import { CandidateWorkspace } from "../features/candidate-workspace/CandidateWorkspace";
import { ReviewerWorkspace } from "../features/reviewer/ReviewerWorkspace";

type Tab = "builder" | "candidate" | "reviewer";

export function AppRoutes(): JSX.Element {
  const [tab, setTab] = useState<Tab>("builder");
  const setQuestions = useInterviewStore((s) => s.setQuestions);
  const questions = useInterviewStore((s) => s.questions);
  const paper = useInterviewStore((s) => s.currentPaper);
  const submission = useInterviewStore((s) => s.lastSubmission);

  useEffect(() => {
    loadQuestions().then(setQuestions).catch(() => setQuestions([]));
  }, [setQuestions]);

  return (
    <main className="page">
      <section className="hero">
        <h1>Signal Desk · Engineer Interview Platform</h1>
        <p>
          題庫數量 <strong>{questions.length}</strong> 題 · 流程：出卷 → 作答 → 審閱
        </p>
        <div className="tabbar">
          <button className={`tabbtn ${tab === "builder" ? "active" : ""}`} onClick={() => setTab("builder")}>1) Builder</button>
          <button className={`tabbtn ${tab === "candidate" ? "active" : ""}`} onClick={() => setTab("candidate")} disabled={!paper}>2) Candidate</button>
          <button className={`tabbtn ${tab === "reviewer" ? "active" : ""}`} onClick={() => setTab("reviewer")} disabled={!submission}>3) Reviewer</button>
        </div>
      </section>

      {tab === "builder" && (
        <div className="grid-2">
          <section className="panel"><QuestionExplorer /></section>
          <section className="panel"><SelectedQuestionsPanel onPaperCreated={() => setTab("candidate")} /></section>
        </div>
      )}

      {tab === "candidate" && <section className="panel"><CandidateWorkspace /></section>}
      {tab === "reviewer" && <section className="panel"><ReviewerWorkspace /></section>}
    </main>
  );
}

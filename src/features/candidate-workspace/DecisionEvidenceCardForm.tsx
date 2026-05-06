import React from "react";
import type { DecisionEvidenceCard } from "../../types/domain";

export function DecisionEvidenceCardForm({
  value,
  onChange,
}: {
  value: DecisionEvidenceCard;
  onChange: (next: DecisionEvidenceCard) => void;
}): JSX.Element {
  const update = (k: keyof DecisionEvidenceCard, v: string) => onChange({ ...value, [k]: v });
  return (
    <div style={{ border: "1px solid #d6dee6", borderRadius: 8, padding: 10, background: "#eef2f6" }}>
      <h4>Decision Evidence Card</h4>
      <textarea placeholder="Assumptions" value={value.assumptions} onChange={(e) => update("assumptions", e.target.value)} style={{ width: "100%", minHeight: 60 }} />
      <textarea placeholder="Options & Tradeoffs" value={value.optionsAndTradeoffs} onChange={(e) => update("optionsAndTradeoffs", e.target.value)} style={{ width: "100%", minHeight: 60 }} />
      <textarea placeholder="Risks" value={value.risks} onChange={(e) => update("risks", e.target.value)} style={{ width: "100%", minHeight: 60 }} />
      <textarea placeholder="Validation Plan" value={value.validationPlan} onChange={(e) => update("validationPlan", e.target.value)} style={{ width: "100%", minHeight: 60 }} />
      <textarea placeholder="Decision Rationale" value={value.rationale} onChange={(e) => update("rationale", e.target.value)} style={{ width: "100%", minHeight: 60 }} />
    </div>
  );
}

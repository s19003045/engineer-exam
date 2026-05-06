import React from "react";

export function TriageAnswerGuide(): JSX.Element {
  return (
    <div style={{ border: "1px dashed #c2410c", borderRadius: 8, padding: 8 }}>
      <strong>Triage guide:</strong>
      <ol>
        <li>Identify issue quickly</li>
        <li>Prioritize mitigation</li>
        <li>Propose fix + rollback</li>
      </ol>
    </div>
  );
}

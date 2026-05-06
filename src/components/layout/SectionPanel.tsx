import React from "react";

export function SectionPanel({ title, children }: { title: string; children: React.ReactNode }): JSX.Element {
  return (
    <div style={{ border: "1px solid #d6dee6", borderRadius: 10, padding: 16, background: "#fff" }}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

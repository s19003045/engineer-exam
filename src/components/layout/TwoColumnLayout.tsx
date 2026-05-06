import React from "react";

export function TwoColumnLayout({ left, right }: { left: React.ReactNode; right: React.ReactNode }): JSX.Element {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "40% 60%", gap: 16 }}>
      <section>{left}</section>
      <section>{right}</section>
    </div>
  );
}

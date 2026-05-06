import React from "react";
import type { QuestionMode } from "../../types/domain";
import { AppSelect } from "../../components/form/AppSelect";

export function QuestionModeSelector({
  mode,
  onChange,
}: {
  mode: QuestionMode;
  onChange: (mode: QuestionMode) => void;
}): JSX.Element {
  return (
    <AppSelect
      value={mode}
      onChange={onChange}
      ariaLabel="Question mode"
      options={[
        { value: "traditional", label: "Traditional" },
        { value: "ai", label: "AI Assisted" },
        { value: "mixed", label: "Mixed" },
      ]}
    />
  );
}

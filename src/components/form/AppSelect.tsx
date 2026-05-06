import React from "react";

export interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface AppSelectProps<T extends string> {
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  ariaLabel: string;
  disabled?: boolean;
}

export function AppSelect<T extends string>({ value, options, onChange, ariaLabel, disabled = false }: AppSelectProps<T>): JSX.Element {
  return (
    <div className="select-wrap">
      <select
        className="select"
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        aria-label={ariaLabel}
        disabled={disabled}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="select-caret" aria-hidden>
        ▾
      </span>
    </div>
  );
}

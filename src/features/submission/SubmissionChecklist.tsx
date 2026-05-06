import React from "react";

export function SubmissionChecklist({ errors }: { errors: string[] }): JSX.Element {
  if (!errors.length) return <div style={{ color: "#15803D" }}>Ready to submit</div>;
  return (
    <div style={{ color: "#b91c1c" }}>
      <strong>Submission blocked:</strong>
      <ul>
        {errors.map((e) => <li key={e}>{e}</li>)}
      </ul>
    </div>
  );
}

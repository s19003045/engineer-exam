import React from "react";
import { useInterviewStore } from "../../stores/interviewStore";

export function TimelineReplayPanel(): JSX.Element {
  const timeline = useInterviewStore((s) => s.lastSubmission?.timelineEvents ?? []);
  return (
    <div>
      <h4>Timeline Replay</h4>
      <ul>
        {timeline.map((e, idx) => (
          <li key={`${e.timestamp}-${idx}`}>
            {e.timestamp} · {e.eventType} · {e.summary}
          </li>
        ))}
      </ul>
    </div>
  );
}

import type { TimelineEvent } from "../../types/domain";
import { createTimelineEvent } from "../../lib/timeline/timelineTracker";

export function trackEvent(events: TimelineEvent[], type: TimelineEvent["eventType"], summary: string, questionId?: string): TimelineEvent[] {
  return [...events, createTimelineEvent(type, summary, questionId)];
}

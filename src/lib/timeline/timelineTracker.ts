import type { TimelineEvent } from "../../types/domain";

export function createTimelineEvent(eventType: TimelineEvent["eventType"], summary: string, questionId?: string): TimelineEvent {
  return { eventType, summary, questionId, timestamp: new Date().toISOString() };
}

export interface MetricEvent {
  name: string;
  durationMs: number;
}

export function reportMetric(event: MetricEvent): void {
  console.info("metric", event.name, event.durationMs);
}

export function readSubmissionArtifact(raw: string): unknown {
  return JSON.parse(raw);
}

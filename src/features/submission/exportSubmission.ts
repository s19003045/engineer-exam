import { strToU8 } from "fflate";
import { generatePaperPdfBytes } from "./generatePaperPdf";
import { buildSubmissionPackage, downloadBytes } from "../../lib/submission/packageBuilder";
import type { AnswerSubmission, Paper, Question, SubmissionArtifact } from "../../types/domain";

export interface ExportInput {
  paper: Paper;
  questions: Question[];
  submission: AnswerSubmission;
}

export function buildArtifactFiles(input: ExportInput): Record<string, Uint8Array> {
  const { paper, questions, submission } = input;
  const answersText = Object.entries(submission.answers)
    .map(([qid, ans], idx) => `${idx + 1}. ${qid}\n${ans}\n`)
    .join("\n");

  return {
    "paper.pdf": generatePaperPdfBytes(paper, questions),
    "answers.txt": strToU8(answersText),
    "decision-cards.json": strToU8(JSON.stringify(submission.decisionCards, null, 2)),
    "timeline.json": strToU8(JSON.stringify(submission.timelineEvents, null, 2)),
  };
}

export function exportSubmission(input: ExportInput): SubmissionArtifact {
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const zipName = `${input.paper.paperId}_${input.submission.candidateId}_${ts}.zip`;
  const files = buildArtifactFiles(input);
  const artifact = buildSubmissionPackage(files, zipName);
  downloadBytes(zipName, artifact.files[zipName], "application/zip");
  return artifact;
}

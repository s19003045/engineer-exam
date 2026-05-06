import type { Paper, Question } from "../../types/domain";

function escapePdfText(input: string): string {
  return input.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

export function generatePaperPdfBytes(paper: Paper, questions: Question[]): Uint8Array {
  const lines = [
    `Paper: ${paper.title}`,
    `Role: ${paper.roleLevel}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    ...paper.selectedQuestions.flatMap((pq, idx) => {
      const q = questions.find((x) => x.id === pq.questionId);
      return [
        `${idx + 1}. ${q?.title ?? pq.questionId}`,
        `Type: ${q?.questionType ?? "unknown"} / Mode: ${pq.mode}`,
        "",
      ];
    }),
  ];

  const textCommands = lines
    .map((line, i) => `${14} ${780 - i * 18} Td (${escapePdfText(line.slice(0, 120))}) Tj`)
    .join("\n");
  const stream = `BT\n/F1 12 Tf\n${textCommands}\nET`;

  const objects = [
    "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
    "2 0 obj << /Type /Pages /Count 1 /Kids [3 0 R] >> endobj",
    "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj",
    `4 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj`,
    "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((obj) => {
    offsets.push(pdf.length);
    pdf += `${obj}\n`;
  });
  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new TextEncoder().encode(pdf);
}

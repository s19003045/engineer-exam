import type { Question } from "../../types/domain";

export function parseQuestionMarkdown(raw: string): Question {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  let data: Record<string, unknown> = {};
  let content = raw;

  if (lines[0]?.trim() === "---") {
    const endIdx = lines.findIndex((line, idx) => idx > 0 && line.trim() === "---");
    if (endIdx > 0) {
      const fmLines = lines.slice(1, endIdx);
      content = lines.slice(endIdx + 1).join("\n");
      data = parseFrontmatterLines(fmLines);
    }
  }

  return {
    id: String(data.id ?? ""),
    title: String(data.title ?? ""),
    content,
    level: (data.level ?? []) as Question["level"],
    tags: (data.tags ?? []) as string[],
    questionType: (data.question_type ?? "coding") as Question["questionType"],
    interviewType: String(data.interview_type ?? ""),
    estimatedTimeMin: Number(data.estimated_time ?? 0),
    status: (data.status ?? "active") as Question["status"],
    version: Number(data.version ?? 1),
    objective: typeof data.objective === "string" ? data.objective : undefined,
    constraints: Array.isArray(data.constraints) ? (data.constraints as string[]) : [],
    expectedOutput: Array.isArray(data.expected_output) ? (data.expected_output as string[]) : [],
    scoringCriteria: Array.isArray(data.scoring_criteria) ? (data.scoring_criteria as string[]) : [],
    starterCode: typeof data.starter_code === "string" ? data.starter_code : undefined,
  };
}

function parseFrontmatterLines(lines: string[]): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const line of lines) {
    const idx = line.indexOf(":");
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim();
    const valueRaw = line.slice(idx + 1).trim();
    data[key] = parseYamlLikeValue(valueRaw);
  }
  return data;
}

function parseYamlLikeValue(raw: string): unknown {
  if (raw.startsWith("[") && raw.endsWith("]")) {
    const inner = raw.slice(1, -1).trim();
    if (!inner) return [];
    return inner
      .split(",")
      .map((x) => x.trim().replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1"));
  }
  if ((raw.startsWith("\"") && raw.endsWith("\"")) || (raw.startsWith("'") && raw.endsWith("'"))) {
    return raw.slice(1, -1);
  }
  if (/^-?\d+(\.\d+)?$/.test(raw)) return Number(raw);
  if (raw === "true") return true;
  if (raw === "false") return false;
  return raw;
}

export async function loadQuestions(): Promise<Question[]> {
  const indexResp = await fetch("/questions/index.json");
  if (!indexResp.ok) {
    return [];
  }
  const records = (await indexResp.json()) as Array<{ path: string }>;
  const questions = await Promise.all(
    records.map(async (record) => {
      const resp = await fetch(record.path);
      if (!resp.ok) return null;
      return parseQuestionMarkdown(await resp.text());
    }),
  );
  return questions.filter((q): q is Question => q !== null);
}

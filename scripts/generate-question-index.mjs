import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const questionsRoot = path.join(root, "public", "questions");
const outFile = path.join(questionsRoot, "index.json");

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    if (entry.isFile() && entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

const files = fs.existsSync(questionsRoot) ? walk(questionsRoot) : [];
const items = files.map((file) => {
  const raw = fs.readFileSync(file, "utf8");
  const { data } = matter(raw);
  const rel = path.relative(path.join(root, "public"), file).replaceAll("\\", "/");
  return {
    id: String(data.id ?? ""),
    title: String(data.title ?? ""),
    level: Array.isArray(data.level) ? data.level : [],
    tags: Array.isArray(data.tags) ? data.tags : [],
    question_type: String(data.question_type ?? "coding"),
    interview_type: String(data.interview_type ?? "coding"),
    estimated_time: Number(data.estimated_time ?? 0),
    status: String(data.status ?? "active"),
    version: Number(data.version ?? 1),
    path: `/${rel}`,
  };
}).filter((x) => x.id);

items.sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(outFile, JSON.stringify(items, null, 2), "utf8");
console.log(`Generated ${items.length} records -> ${outFile}`);

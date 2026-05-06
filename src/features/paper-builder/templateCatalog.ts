export interface TemplateDef {
  id: string;
  title: string;
  requiredTags: string[];
}

export const templateCatalog: TemplateDef[] = [
  { id: "js-fundamentals", title: "JS Fundamentals", requiredTags: ["fundamentals"] },
  { id: "js-async", title: "JS Async", requiredTags: ["async"] },
  { id: "js-system-design", title: "JS System Design", requiredTags: ["system-design"] },
  { id: "js-ai-collab", title: "JS AI Collaboration", requiredTags: ["ai-collaboration"] },
];

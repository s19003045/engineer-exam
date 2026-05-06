import type { Question } from "../../types/domain";

export interface QuestionQuery {
  keyword?: string;
  tags?: string[];
}

export function queryQuestions(questions: Question[], query: QuestionQuery): Question[] {
  return questions.filter((q) => {
    const keywordOk = !query.keyword || q.title.includes(query.keyword) || q.content.includes(query.keyword);
    const tagsOk = !query.tags?.length || query.tags.every((t) => q.tags.includes(t));
    return keywordOk && tagsOk;
  });
}

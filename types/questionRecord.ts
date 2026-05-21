import { Question } from "@/schemas/questionsSchema";
import { QuestionSummary } from "@/schemas/questionSummarySchema";

export type QuestionRecord = {
  question: Question;
  exchanges: {
    answer: string;
    feedback: string;
  }[];
  summary: QuestionSummary | null;
};

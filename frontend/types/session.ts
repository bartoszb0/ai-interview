import { QuestionRecord } from "./questionRecord";

export type SessionSummary = {
  id: string;
  jobTitle: string;
  jobSeniority: "junior" | "mid" | "senior";
  overallScore: number;
  createdAt: string;
};

export type Session = {
  id: string;
  jobTitle: string;
  jobDescription: string;
  jobSeniority: string;
  questionRecords: QuestionRecord[];
  overallScore: number;
  whatWentWell: string[];
  areasForImprovement: string[];
  createdAt: string;
};

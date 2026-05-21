import { Evaluation } from "@/schemas/evaluateSchema";
import { QuestionSummary } from "@/schemas/questionSummarySchema";
import { Question } from "@/schemas/questionsSchema";
import { QuestionRecord } from "@/types/questionRecord";
import { create } from "zustand";

type InterviewStore = {
  jobDescription: {
    description: string;
    seniority: string;
  };
  questionRecords: QuestionRecord[];
  currentQuestionIndex: number;
  feedback: Evaluation | null;
  interviewComplete: boolean;

  setJobDescription: ({
    description,
    seniority,
  }: {
    description: string;
    seniority: string;
  }) => void;
  initQuestionRecords: (questions: Question[]) => void;
  addExchange: (answer: string, feedback: string) => void;
  finalizeQuestion: (summary: QuestionSummary) => void;
  nextQuestion: () => void;
  setFeedback: (feedback: Evaluation) => void;
  setInterviewComplete: () => void;
  reset: () => void;
};

export const useInterviewStore = create<InterviewStore>((set) => ({
  jobDescription: {
    description: "",
    seniority: "",
  },
  questionRecords: [],
  currentQuestionIndex: 0,
  feedback: null,
  interviewComplete: false,

  setJobDescription: ({ description, seniority }) =>
    set({ jobDescription: { description, seniority } }),

  initQuestionRecords: (questions) =>
    set({
      questionRecords: questions.map((question) => ({
        question,
        exchanges: [],
        summary: null,
      })),
    }),

  addExchange: (answer, feedback) =>
    set((state) => ({
      questionRecords: state.questionRecords.map((record, i) =>
        i === state.currentQuestionIndex
          ? {
              ...record,
              exchanges: [...record.exchanges, { answer, feedback }],
            }
          : record,
      ),
    })),

  finalizeQuestion: (summary) =>
    set((state) => ({
      questionRecords: state.questionRecords.map((record, i) =>
        i === state.currentQuestionIndex ? { ...record, summary } : record,
      ),
    })),

  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
    })),

  setFeedback: (feedback) => set({ feedback }),
  setInterviewComplete: () => set({ interviewComplete: true }),

  reset: () =>
    set({
      jobDescription: { description: "", seniority: "" },
      questionRecords: [],
      currentQuestionIndex: 0,
      feedback: null,
      interviewComplete: false,
    }),
}));

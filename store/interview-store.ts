import { Evaluation } from "@/app/api/evaluate-answer/route";
import { Question } from "@/app/api/generate-questions/route";
import { ModelMessage } from "ai";
import { create } from "zustand";

type InterviewStore = {
  jobDescription: {
    description: string;
    seniority: string;
  };
  questions: Question[];
  currentQuestionIndex: number;
  messages: ModelMessage[];
  feedback: Evaluation | null;
  interviewComplete: boolean;
  followupCount: number;

  setJobDescription: ({
    description,
    seniority,
  }: {
    description: string;
    seniority: string;
  }) => void;
  setQuestions: (questions: Question[]) => void;
  nextQuestion: () => void;
  addMessages: (messages: ModelMessage[]) => void;
  setFeedback: (feedback: Evaluation) => void;
  setInterviewComplete: () => void;
  increaseFollowup: () => void;
  reset: () => void;
};

export const useInterviewStore = create<InterviewStore>((set) => ({
  jobDescription: {
    description: "",
    seniority: "",
  },
  feedback: null,
  questions: [],
  currentQuestionIndex: 0,
  messages: [],
  interviewComplete: false,
  followupCount: 0,

  setJobDescription: ({
    description,
    seniority,
  }: {
    description: string;
    seniority: string;
  }) => set({ jobDescription: { description, seniority } }),
  setQuestions: (questions) => set({ questions }),
  setFeedback: (feedback) => set({ feedback }),
  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
      followupCount: 0,
    })),
  addMessages: (messages) =>
    set((state) => ({ messages: [...state.messages, ...messages] })),
  setInterviewComplete: () => set({ interviewComplete: true }),
  increaseFollowup: () =>
    set((state) => ({ followupCount: state.followupCount + 1 })),
  reset: () =>
    set({
      jobDescription: {
        description: "",
        seniority: "",
      },
      feedback: null,
      questions: [],
      currentQuestionIndex: 0,
      messages: [],
      followupCount: 0,
      interviewComplete: false,
    }),
}));

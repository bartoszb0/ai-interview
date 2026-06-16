"use client";

import { useInterviewStore } from "@/store/interview-store";

export default function AiQuestion() {
  const feedback = useInterviewStore((state) => state.feedback);
  const questionRecords = useInterviewStore((state) => state.questionRecords);
  const currentQuestionIndex = useInterviewStore(
    (state) => state.currentQuestionIndex,
  );

  const question = questionRecords[currentQuestionIndex].question.text;
  const muteQuestion = feedback?.decision === "follow_up";

  return (
    <div className="flex gap-3 animate-question-in mt-6">
      <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
        <span className="text-[10px] font-bold text-primary">AI</span>
      </div>
      <div className="flex-1 bg-card border border-border rounded-2xl rounded-tl-sm px-5 py-4">
        <p
          className={`text-base leading-relaxed transition-colors duration-300 ${muteQuestion ? "text-muted-foreground/30" : "text-foreground"}`}
        >
          {question}
        </p>
      </div>
    </div>
  );
}

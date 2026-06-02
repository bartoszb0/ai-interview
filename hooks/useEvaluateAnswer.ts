import { useInterviewStore } from "@/store/interview-store";
import { ModelMessage } from "ai";
import { useState } from "react";

export function useEvaluateAnswer(
  answer: string,
  setAnswer: (text: string) => void,
  reset: () => void,
) {
  const questionRecords = useInterviewStore((state) => state.questionRecords);
  const currentQuestionIndex = useInterviewStore(
    (state) => state.currentQuestionIndex,
  );
  const nextQuestion = useInterviewStore((state) => state.nextQuestion);
  const setFeedback = useInterviewStore((state) => state.setFeedback);
  const setInterviewComplete = useInterviewStore(
    (state) => state.setInterviewComplete,
  );
  const addExchange = useInterviewStore((state) => state.addExchange);
  const finalizeQuestion = useInterviewStore((state) => state.finalizeQuestion);
  const jobDescription = useInterviewStore((state) => state.jobDescription);

  const [isEvaluating, setIsEvaluating] = useState(false);

  const evaluateAnswer = async () => {
    setIsEvaluating(true);
    reset();

    const currentRecord = questionRecords[currentQuestionIndex];
    const followupCount = currentRecord.exchanges.length;
    const isLastFollowup = followupCount >= 2;

    const contextMessages: ModelMessage[] = [
      ...currentRecord.exchanges.flatMap((e) => [
        { role: "user" as const, content: e.answer },
        { role: "assistant" as const, content: e.feedback },
      ]),
      { role: "user" as const, content: answer },
    ];

    const response = await fetch("/api/evaluate-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: contextMessages,
        question: currentRecord.question.text,
        seniority: jobDescription.seniority,
        followupCount,
      }),
    });

    if (!response.ok) {
      setIsEvaluating(false);
      return;
    }

    const data = await response.json();

    addExchange(answer, data.feedback);

    if (data.decision === "follow_up" && !isLastFollowup) {
      // stay on current question
    } else {
      if (data.questionSummary) {
        finalizeQuestion(data.questionSummary);
      }
      const nextIndex = currentQuestionIndex + 1;
      nextQuestion();
      if (!questionRecords[nextIndex]) {
        setInterviewComplete();
      }
    }

    setFeedback(data);
    setAnswer("");
    setIsEvaluating(false);
  };

  return { evaluateAnswer, isEvaluating };
}

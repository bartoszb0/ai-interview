import { useInterviewStore } from "@/store/interview-store";
import { useState } from "react";

export function useEvaluateAnswer(
  answer: string,
  setAnswer: (text: string) => void,
  reset: () => void,
) {
  const messages = useInterviewStore((state) => state.messages);
  const addMessages = useInterviewStore((state) => state.addMessages);
  const questions = useInterviewStore((state) => state.questions);
  const currentQuestionIndex = useInterviewStore(
    (state) => state.currentQuestionIndex,
  );
  const nextQuestion = useInterviewStore((state) => state.nextQuestion);
  const setFeedback = useInterviewStore((state) => state.setFeedback);
  const setInterviewComplete = useInterviewStore(
    (state) => state.setInterviewComplete,
  );
  const jobDescription = useInterviewStore((state) => state.jobDescription);
  const followupCount = useInterviewStore((state) => state.followupCount);
  const increaseFollowup = useInterviewStore((state) => state.increaseFollowup);

  const [isEvaluating, setIsEvaluating] = useState(false);

  const evaluateAnswer = async () => {
    setIsEvaluating(true);
    reset();

    const updatedMessages = [
      ...messages,
      { role: "user" as const, content: answer },
    ];
    addMessages([{ role: "user", content: answer }]);

    const response = await fetch("/api/evaluate-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: updatedMessages,
        question: questions[currentQuestionIndex],
        seniority: jobDescription.seniority,
        followupCount,
      }),
    });

    if (!response.ok) {
      setIsEvaluating(false);
      return;
    }

    const data = await response.json();

    addMessages([{ role: "assistant", content: data.feedback }]);

    if (data.decision === "follow_up") {
      increaseFollowup();
    } else if (data.decision === "next_question") {
      const nextIndex = currentQuestionIndex + 1;
      nextQuestion();
      if (questions[nextIndex]) {
        addMessages([
          { role: "assistant", content: questions[nextIndex].text },
        ]);
      } else {
        setInterviewComplete();
      }
    }

    setFeedback(data);
    setAnswer("");
    setIsEvaluating(false);
  };

  return { evaluateAnswer, isEvaluating };
}

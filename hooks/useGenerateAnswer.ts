import { useInterviewStore } from "@/store/interview-store";
import { useState } from "react";

export function useGenerateAnswer(setAnswer: (text: string) => void) {
  const questionRecords = useInterviewStore((state) => state.questionRecords);
  const currentQuestionIndex = useInterviewStore(
    (state) => state.currentQuestionIndex,
  );

  const question = questionRecords[currentQuestionIndex].question.text;

  const [isGenerating, setIsGenerating] = useState(false);

  const generateAnswerAI = async () => {
    setIsGenerating(true);
    const response = await fetch("/api/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: question,
      }),
    });

    if (!response.ok) {
      setIsGenerating(false);
      return;
    }

    const text = await response.json();
    setAnswer(text);
    setIsGenerating(false);
  };

  return { generateAnswerAI, isGenerating };
}

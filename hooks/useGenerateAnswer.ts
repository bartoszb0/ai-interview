import { useInterviewStore } from "@/store/interview-store";
import { useState } from "react";

export function useGenerateAnswer(setAnswer: (text: string) => void) {
  const messages = useInterviewStore((state) => state.messages);

  const [isGenerating, setIsGenerating] = useState(false);

  const generateAnswerAI = async () => {
    setIsGenerating(true);
    const response = await fetch("/api/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: messages.at(-1)?.content }),
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

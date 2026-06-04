import { useInterviewStore } from "@/store/interview-store";
import { useState } from "react";
import { toast } from "sonner";

export function useGenerateAnswer(setAnswer: (text: string) => void) {
  const questionRecords = useInterviewStore((state) => state.questionRecords);
  const currentQuestionIndex = useInterviewStore(
    (state) => state.currentQuestionIndex,
  );

  const [isGenerating, setIsGenerating] = useState(false);

  const generateAnswerAI = async () => {
    setIsGenerating(true);
    try {
      const question = questionRecords[currentQuestionIndex].question.text;

      const response = await fetch("/api/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("Rate limit hit, try again in a moment");
        } else {
          toast.error("Failed to generate answer");
        }
        return;
      }

      const text = await response.json();
      setAnswer(text);
    } catch {
      toast.error("Network error");
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateAnswerAI, isGenerating };
}

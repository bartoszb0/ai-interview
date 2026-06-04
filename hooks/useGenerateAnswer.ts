import { notifyModelFallback } from "@/lib/notify-model-fallback";
import { handleResponseError } from "@/lib/response-errors";
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
        handleResponseError(response, "Failed to generate answer");
        return;
      }

      notifyModelFallback(response);

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

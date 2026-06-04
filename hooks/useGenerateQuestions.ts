import { handleResponseError } from "@/lib/response-errors";
import { useInterviewStore } from "@/store/interview-store";
import { useState } from "react";
import { toast } from "sonner";

export function useGenerateQuestions(jobDescription: string) {
  const initQuestionRecords = useInterviewStore(
    (state) => state.initQuestionRecords,
  );

  const [isGenerating, setIsGenerating] = useState(false);

  const generateQuestions = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      });

      if (!response.ok) {
        handleResponseError(response, "Failed to generate questions");
        return;
      }

      const data = await response.json();
      initQuestionRecords(data);
    } catch {
      toast.error("Network error");
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateQuestions, isGenerating };
}

import { useInterviewStore } from "@/store/interview-store";
import { useState } from "react";

export function useGenerateQuestions(jobDescription: string) {
  const initQuestionRecords = useInterviewStore(
    (state) => state.initQuestionRecords,
  );

  const [isGenerating, setIsGenerating] = useState(false);

  const generateQuestions = async () => {
    setIsGenerating(true);
    const response = await fetch("/api/generate-questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobDescription }),
    });

    if (!response.ok) {
      setIsGenerating(false);
      return;
    }

    const data = await response.json();
    initQuestionRecords(data);
    setIsGenerating(false);
  };

  return { generateQuestions, isGenerating };
}

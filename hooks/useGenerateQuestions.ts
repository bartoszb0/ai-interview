import { useInterviewStore } from "@/store/interview-store";
import { useState } from "react";

export function useGenerateQuestions(jobDescription: string) {
  const setQuestions = useInterviewStore((state) => state.setQuestions);
  const addMessages = useInterviewStore((state) => state.addMessages);

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
    setQuestions(data);
    addMessages([{ role: "assistant", content: data[0].text }]);
    setIsGenerating(false);
  };

  return { generateQuestions, isGenerating };
}

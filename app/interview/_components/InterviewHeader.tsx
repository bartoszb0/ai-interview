"use client";

import { Button } from "@/components/ui/button";
import { useInterviewStore } from "@/store/interview-store";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InterviewHeader() {
  const router = useRouter();

  const questions = useInterviewStore((state) => state.questionRecords);
  const currentQuestionIndex = useInterviewStore(
    (state) => state.currentQuestionIndex,
  );
  const jobDescription = useInterviewStore((state) => state.jobDescription);
  const reset = useInterviewStore((state) => state.reset);

  const progress = (currentQuestionIndex / questions.length) * 100;
  const label = jobDescription.seniority
    ? `${jobDescription.seniority} Interview`
    : "AI Interview";

  const cancelInterview = () => {
    reset();
    router.push("/interview");
  };

  return (
    <div className="fixed top-0 inset-x-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-4">
        <span className="text-sm font-medium text-foreground shrink-0 capitalize">
          {label}
        </span>
        <div className="flex-1 flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-mono text-muted-foreground shrink-0">
            {currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>
        <Button size="icon" variant="ghost" onClick={cancelInterview}>
          <X className="shrink-0 text-muted-foreground hover:text-foreground" />
        </Button>
      </div>
    </div>
  );
}

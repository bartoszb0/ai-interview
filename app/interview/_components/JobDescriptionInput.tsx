"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGenerateQuestions } from "@/hooks/useGenerateQuestions";
import { useInterviewStore } from "@/store/interview-store";
import SamplesBtns from "./SamplesBtns";

export default function JobDescriptionInput() {
  const jobDescription = useInterviewStore((state) => state.jobDescription);
  const setJobDescription = useInterviewStore(
    (state) => state.setJobDescription,
  );

  const { generateQuestions, isGenerating } = useGenerateQuestions(
    jobDescription.description,
  );

  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
      <div className="absolute inset-0 border border-border/30 rounded-2xl pointer-events-none" />

      <div className="relative px-6 py-5 flex flex-col gap-4">
        <p className="text-sm font-mono text-primary/70 uppercase tracking-widest">
          Job description
        </p>

        <Textarea
          rows={14}
          placeholder="Paste the job description here..."
          value={jobDescription.description}
          onChange={(e) =>
            setJobDescription({
              description: e.target.value,
              seniority: jobDescription.seniority,
            })
          }
          disabled={isGenerating}
          className="bg-transparent border-border focus-visible:border-primary/50 focus-visible:ring-primary/20 resize-none placeholder:text-muted-foreground/40 text-foreground/80 [field-sizing:normal]"
        />

        <div className="flex items-center justify-between gap-4">
          <SamplesBtns />

          <Button
            onClick={generateQuestions}
            isLoading={isGenerating}
            disabled={!jobDescription.description.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground border-0"
          >
            Generate Questions
          </Button>
        </div>
      </div>
    </div>
  );
}

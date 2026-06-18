"use client";

import { Button } from "@/components/ui/button";
import { saveSession } from "@/lib/api/sessions";
import { Summary } from "@/schemas/summarySchema";
import { useInterviewStore } from "@/store/interview-store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type SaveSessionBtnProps = {
  summary: Summary;
};

export default function SaveSessionBtn({ summary }: SaveSessionBtnProps) {
  const questionRecords = useInterviewStore((state) => state.questionRecords);
  const jobDescription = useInterviewStore((state) => state.jobDescription);
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionSaved, setSessionSaved] = useState(false);

  const router = useRouter();

  const onSave = () => {
    const save = async () => {
      setIsLoading(true);
      try {
        const res = await saveSession({
          jobTitle: summary.jobTitle,
          jobDescription: jobDescription.description,
          jobSeniority: jobDescription.seniority,
          questionRecords: questionRecords,
          overallScore: summary.overallScore,
          whatWentWell: summary.whatWentWell,
          areasForImprovement: summary.areasForImprovement,
        });

        toast.success("Session saved", {
          action: {
            label: "View it here",
            onClick: () => router.push("/sessions"),
          },
        });
      } catch (err) {
        console.error(err);
        toast.error("Couldn't save session");
      } finally {
        setIsLoading(false);
        setSessionSaved(true);
      }
    };
    save();
  };

  return (
    <Button
      className="w-full"
      onClick={onSave}
      disabled={isLoading || isSessionSaved}
    >
      {isLoading
        ? "Saving session"
        : isSessionSaved
          ? "Session saved"
          : "Save session"}
    </Button>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Summary } from "@/schemas/summarySchema";
import { useAuthStore } from "@/store/auth-store";
import { useInterviewStore } from "@/store/interview-store";
import { Loader2, Target, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import HighlightCard from "./HighlightCard";
import QuestionBreakdownItem from "./QuestionBreakdownItem";
import SaveSessionBtn from "./SaveSessionBtn";
import ScoreGauge from "./ScoreGauge";

export default function SummaryScreen() {
  const questionRecords = useInterviewStore((state) => state.questionRecords);
  const reset = useInterviewStore((state) => state.reset);
  const [isSummarizing, setIsSummarizing] = useState(true);
  const [summary, setSummary] = useState<Summary>();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch("/api/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ questionRecords }),
        });
        if (!response.ok) return;
        const data = await response.json();
        setSummary(data);
      } finally {
        setIsSummarizing(false);
      }
    };
    fetchSummary();
  }, []);

  if (isSummarizing) {
    return (
      <div className="flex flex-col items-center gap-3 py-16">
        <Loader2 className="animate-spin text-primary/50 w-6 h-6" />
        <p className="text-sm font-mono text-primary/50 uppercase tracking-widest">
          Generating your debrief...
        </p>
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="flex flex-col gap-6 sm:gap-8 py-6 sm:py-8 animate-in fade-in duration-500">
      <ScoreGauge score={summary.overallScore} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <HighlightCard
          variant="positive"
          icon={TrendingUp}
          title="What went well"
          items={summary.whatWentWell}
        />
        <HighlightCard
          variant="warning"
          icon={Target}
          title="Improve on"
          items={summary.areasForImprovement}
        />
      </div>

      <div className="border-t border-border pt-6 sm:pt-8 flex flex-col gap-4">
        <p className="text-sm font-mono text-muted-foreground/60 uppercase tracking-widest">
          Question breakdown
        </p>
        <div className="flex flex-col gap-3">
          {questionRecords.map((record, index) => (
            <QuestionBreakdownItem key={index} record={record} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {!isAuthLoading && isAuthenticated && (
          <SaveSessionBtn summary={summary} />
        )}

        <Button
          onClick={reset}
          variant="outline"
          className="w-full border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 bg-transparent"
        >
          Start new interview
        </Button>
      </div>
    </div>
  );
}

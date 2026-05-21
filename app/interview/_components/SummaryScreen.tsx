"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Summary } from "@/schemas/summarySchema";
import { useInterviewStore } from "@/store/interview-store";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function SummaryScreen() {
  const questionRecords = useInterviewStore((state) => state.questionRecords);
  const reset = useInterviewStore((state) => state.reset);
  const [isSummarizing, setIsSummarizing] = useState(true);
  const [summary, setSummary] = useState<Summary>();

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
    <div className="flex flex-col gap-8 py-8">
      {/* Score */}
      <div className="text-center flex flex-col gap-2">
        <p className="text-sm font-mono text-primary/70 uppercase tracking-widest">
          Overall score
        </p>
        <p className="text-7xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {summary.overallScore}%
        </p>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-chart-1/10 via-transparent to-chart-1/5 pointer-events-none" />
          <div className="absolute inset-0 border border-chart-1/20 rounded-2xl pointer-events-none" />
          <div className="relative px-6 py-5 flex flex-col gap-3">
            <p className="text-sm font-mono text-chart-1/70 uppercase tracking-widest">
              What went well
            </p>
            <ul className="flex flex-col gap-2">
              {summary.whatWentWell.map((item, i) => (
                <li key={i} className="text-sm text-foreground/60 flex gap-2">
                  <span className="text-chart-1/50 shrink-0">–</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-chart-3/10 via-transparent to-chart-3/5 pointer-events-none" />
          <div className="absolute inset-0 border border-chart-3/20 rounded-2xl pointer-events-none" />
          <div className="relative px-6 py-5 flex flex-col gap-3">
            <p className="text-sm font-mono text-chart-3/70 uppercase tracking-widest">
              Improve on
            </p>
            <ul className="flex flex-col gap-2">
              {summary.areasForImprovement.map((item, i) => (
                <li key={i} className="text-sm text-foreground/60 flex gap-2">
                  <span className="text-chart-3/50 shrink-0">–</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-8 flex flex-col gap-4">
        <p className="text-sm font-mono text-muted-foreground/60 uppercase tracking-widest">
          Question breakdown
        </p>
        <Accordion
          type="multiple"
          defaultValue={questionRecords.map((_, i) => String(i))}
          className="bg-muted/40 rounded-2xl border border-border/30 overflow-hidden"
        >
          {questionRecords.map((record, index) => {
            const qs = record.summary;
            if (!qs) return null;

            const scoreColor =
              qs.score >= 4
                ? "text-chart-1"
                : qs.score >= 3
                  ? "text-chart-3"
                  : "text-destructive";

            return (
              <AccordionItem
                key={index}
                value={String(index)}
                className="border-border/30 px-6"
              >
                <AccordionTrigger className="hover:no-underline gap-4 py-4">
                  <p className="flex-1 min-w-0 text-sm font-medium text-foreground/80 leading-relaxed text-left">
                    {record.question.text}
                  </p>
                  <span
                    className={`text-sm font-mono font-bold shrink-0 ${scoreColor}`}
                  >
                    {qs.score}/5
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="flex flex-col gap-4 pt-1">
                    {record.exchanges.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
                          Conversation
                        </span>
                        {record.exchanges.map((exchange, i) => (
                          <div key={i} className="flex flex-col gap-2">
                            <p className="text-sm text-foreground/60 italic leading-relaxed">
                              &ldquo;{exchange.answer}&rdquo;
                            </p>
                            <p className="text-sm text-muted-foreground/60 pl-3 border-l border-border/50 leading-relaxed">
                              {exchange.feedback}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="border-t border-border/20" />
                    {qs.correct.length > 0 && (
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-mono text-chart-1/60 uppercase tracking-widest">
                          Correct
                        </span>
                        {qs.correct.map((item, i) => (
                          <p
                            key={i}
                            className="text-sm text-foreground/60 flex gap-2"
                          >
                            <span className="text-chart-1/50 shrink-0">✓</span>
                            {item}
                          </p>
                        ))}
                      </div>
                    )}
                    {qs.gaps.length > 0 && (
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-mono text-destructive/60 uppercase tracking-widest">
                          Gaps
                        </span>
                        {qs.gaps.map((item, i) => (
                          <p
                            key={i}
                            className="text-sm text-foreground/60 flex gap-2"
                          >
                            <span className="text-destructive/50 shrink-0">
                              ✗
                            </span>
                            {item}
                          </p>
                        ))}
                      </div>
                    )}
                    {qs.improvements.length > 0 && (
                      <div className="flex flex-col gap-1.5">
                        <span className="text-xs font-mono text-chart-3/60 uppercase tracking-widest">
                          Could improve
                        </span>
                        {qs.improvements.map((item, i) => (
                          <p
                            key={i}
                            className="text-sm text-foreground/60 flex gap-2"
                          >
                            <span className="text-chart-3/50 shrink-0">△</span>
                            {item}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <Button
        onClick={reset}
        variant="outline"
        className="w-full border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 bg-transparent"
      >
        Start new interview
      </Button>
    </div>
  );
}

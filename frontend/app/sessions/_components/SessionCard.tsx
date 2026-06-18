"use client";

import { Badge } from "@/components/ui/badge";
import { SessionSummary } from "@/types/session";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";

function scoreColor(score: number) {
  if (score >= 70) return "text-chart-1";
  if (score >= 40) return "text-chart-3";
  return "text-destructive";
}

export default function SessionCard({ session }: { session: SessionSummary }) {
  return (
    <Link
      href={`/sessions/${session.id}`}
      className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card p-4 transition-colors hover:border-primary/30 hover:bg-accent/50"
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <span
          className={`text-lg font-bold tabular-nums ${scoreColor(session.overallScore)}`}
        >
          {session.overallScore}
        </span>
      </div>

      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <span className="font-medium truncate">{session.jobTitle}</span>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className="text-xs capitalize px-1.5 py-0">
            {session.jobSeniority}
          </Badge>
          <span className="flex items-center gap-1">
            <Calendar className="size-3" />
            {new Date(session.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      <ChevronRight className="size-4 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

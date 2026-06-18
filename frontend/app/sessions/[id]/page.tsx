"use client";

import HighlightCard from "@/app/interview/_components/HighlightCard";
import QuestionBreakdownItem from "@/app/interview/_components/QuestionBreakdownItem";
import ScoreGauge from "@/app/interview/_components/ScoreGauge";
import { Skeleton } from "@/components/ui/skeleton";
import { getSession } from "@/lib/api/sessions";
import { Session } from "@/types/session";
import { Target, TrendingUp } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

export default function SessionDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession(id)
      .then(setSession)
      .catch(() => toast.error("Failed to load session"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <p className="text-muted-foreground text-sm">Session not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <Link
          href="/sessions"
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          ← Back to sessions
        </Link>
        <h1 className="text-2xl font-semibold">{session.jobTitle}</h1>
        <p className="text-sm text-muted-foreground capitalize">
          {session.jobSeniority} ·{" "}
          {new Date(session.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>

      <ScoreGauge score={session.overallScore} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <HighlightCard
          variant="positive"
          icon={TrendingUp}
          title="What went well"
          items={session.whatWentWell}
        />
        <HighlightCard
          variant="warning"
          icon={Target}
          title="Improve on"
          items={session.areasForImprovement}
        />
      </div>

      <div className="border-t border-border pt-6 flex flex-col gap-4">
        <p className="text-sm font-mono text-muted-foreground/60 uppercase tracking-widest">
          Question breakdown
        </p>
        <div className="flex flex-col gap-3">
          {session.questionRecords.map((record, i) => (
            <QuestionBreakdownItem key={i} record={record} />
          ))}
        </div>
      </div>
    </div>
  );
}

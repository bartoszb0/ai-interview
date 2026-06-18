"use client";

import InterviewBtn from "@/components/common/InterviewBtn";
import { listSessions } from "@/lib/api/sessions";
import { SessionSummary } from "@/types/session";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProfileBtn from "../../components/common/ProfileBtn";
import EmptyState from "./_components/EmptyState";
import SessionCard from "./_components/SessionCard";
import SessionListSkeleton from "./_components/SessionListSkeleton";

export default function Sessions() {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listSessions()
      .then(setSessions)
      .catch(() => toast.error("Failed to load sessions"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-semibold">Past sessions</h1>
        <div className="flex gap-2 shrink-0">
          <InterviewBtn />
          <ProfileBtn />
        </div>
      </div>

      {loading ? (
        <SessionListSkeleton />
      ) : sessions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-3">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
}

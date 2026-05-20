"use client";

import { useInterviewStore } from "@/store/interview-store";

export default function FollowupQuestion() {
  const feedback = useInterviewStore((state) => state.feedback);
  if (!feedback) return null;

  return (
    <div className="ml-11 pl-4 border-l-2 border-primary/30">
      <p className="text-sm leading-relaxed">{feedback.feedback}</p>
    </div>
  );
}

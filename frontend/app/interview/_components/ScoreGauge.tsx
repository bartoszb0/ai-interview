"use client";
import { useEffect, useState } from "react";

const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function scoreColor(score: number, max: number) {
  const ratio = score / max;
  if (ratio >= 0.7) return "var(--chart-1)";
  if (ratio >= 0.4) return "var(--chart-3)";
  return "var(--destructive)";
}

function verdict(score: number) {
  if (score >= 85) return "Exceptional";
  if (score >= 70) return "Strong";
  if (score >= 55) return "Solid";
  if (score >= 40) return "Developing";
  return "Needs work";
}

export default function ScoreGauge({ score }: { score: number }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const color = scoreColor(score, 100);
  const progress = revealed ? score : 0;
  const dashOffset = CIRCUMFERENCE * (1 - progress / 100);

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-mono text-primary/70 uppercase tracking-widest">
        Overall score
      </p>
      <div className="relative h-44 w-44">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160" aria-hidden>
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            fill="none"
            strokeWidth="10"
            className="stroke-border/40"
          />
          <circle
            cx="80"
            cy="80"
            r={RADIUS}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            style={{
              stroke: color,
              strokeDasharray: CIRCUMFERENCE,
              strokeDashoffset: dashOffset,
              transition: "stroke-dashoffset 1s ease-out",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-5xl font-bold tabular-nums"
            style={{ color }}
          >
            {score}
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            {verdict(score)}
          </span>
        </div>
      </div>
    </div>
  );
}

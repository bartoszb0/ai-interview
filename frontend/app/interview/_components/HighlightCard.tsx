import type { LucideIcon } from "lucide-react";

const variants = {
  positive: {
    gradient: "from-chart-1/10 via-transparent to-chart-1/5",
    border: "border-chart-1/20",
    title: "text-chart-1/70",
    bullet: "text-chart-1/50",
  },
  warning: {
    gradient: "from-chart-3/10 via-transparent to-chart-3/5",
    border: "border-chart-3/20",
    title: "text-chart-3/70",
    bullet: "text-chart-3/50",
  },
} as const;

export default function HighlightCard({
  variant,
  icon: Icon,
  title,
  items,
}: {
  variant: keyof typeof variants;
  icon: LucideIcon;
  title: string;
  items: string[];
}) {
  const v = variants[variant];

  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${v.gradient} pointer-events-none`}
      />
      <div
        className={`absolute inset-0 border ${v.border} rounded-2xl pointer-events-none`}
      />
      <div className="relative px-5 sm:px-6 py-5 flex flex-col gap-3">
        <p
          className={`flex items-center gap-2 text-sm font-mono ${v.title} uppercase tracking-widest`}
        >
          <Icon className="h-3.5 w-3.5 shrink-0" />
          {title}
        </p>
        <ul className="flex flex-col gap-2">
          {items.map((item, i) => (
            <li key={i} className="text-sm text-foreground/60 flex gap-2">
              <span className={`${v.bullet} shrink-0`}>–</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

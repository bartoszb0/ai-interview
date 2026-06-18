import { Skeleton } from "@/components/ui/skeleton";

export default function SessionListSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-xl border border-border/50 p-4"
        >
          <Skeleton className="size-12 rounded-lg" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}

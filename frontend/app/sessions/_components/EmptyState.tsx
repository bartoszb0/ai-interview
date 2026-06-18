import { ClipboardList } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-muted-foreground">
      <ClipboardList className="size-10 opacity-40" />
      <p className="text-sm">No sessions yet.</p>
      <p className="text-xs">Complete an interview to see your history here.</p>
    </div>
  );
}

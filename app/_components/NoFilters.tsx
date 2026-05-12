import { SlidersHorizontal } from "lucide-react";

export default function NoFiltersSelected() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-28 text-center">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-muted">
        <SlidersHorizontal className="w-6 h-6 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-base font-medium text-foreground">No filters selected</p>
        <p className="text-sm text-muted-foreground">
          Pick a seniority level and a tech stack to browse job listings.
        </p>
      </div>
    </div>
  );
}

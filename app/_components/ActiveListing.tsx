"use client";

import { Button } from "@/components/ui/button";
import { useActiveListingStore } from "@/store/active-listing-store";

export default function ActiveListing() {
  const activeListing = useActiveListingStore((state) => state.activeListing);
  const reset = useActiveListingStore((state) => state.reset);

  return (
    <div
      className={`shrink-0 overflow-hidden transition-all duration-300 ${
        activeListing ? "w-96 opacity-100 ml-6" : "w-0 opacity-0"
      }`}
    >
      {activeListing && (
        <div className="flex flex-col gap-4 w-96">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">{activeListing.companyName}</span>
            <Button size="sm" variant="ghost" onClick={reset}>Close</Button>
          </div>
          <div
            className="prose prose-sm prose-invert max-w-none text-muted-foreground overflow-y-auto max-h-[80vh]"
            dangerouslySetInnerHTML={{ __html: activeListing.description }}
          />
        </div>
      )}
    </div>
  );
}

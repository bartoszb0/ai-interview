"use client";

import { Button } from "@/components/ui/button";
import { useActiveListingStore } from "@/store/active-listing-store";

export default function ActiveListing() {
  const activeListing = useActiveListingStore((state) => state.activeListing);
  const reset = useActiveListingStore((state) => state.reset);

  return (
    <>
      {/* Desktop sticky side panel */}
      <div
        className={`hidden lg:block shrink-0 sticky top-6 self-start transition-all duration-300 ${
          activeListing
            ? "w-96 opacity-100 ml-6"
            : "w-0 opacity-0 pointer-events-none"
        }`}
      >
        {activeListing && (
          <div className="flex flex-col gap-4 w-96 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-minimal">
            <div className="flex items-cente sticky justify-between">
              <span className="font-semibold text-foreground">
                {activeListing.companyName}
              </span>
              <Button size="sm" variant="ghost" onClick={reset}>
                Close
              </Button>
            </div>
            <div
              className="prose prose-sm prose-invert max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: activeListing.description }}
            />
            <Button size="lg">Start AI Interview</Button>
          </div>
        )}
      </div>

      {/* Mobile backdrop */}
      {activeListing && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={reset}
        />
      )}

      {/* Mobile bottom sheet */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ${
          activeListing ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {activeListing && (
          <div className="bg-card rounded-t-2xl border-t border-border max-h-[75vh] flex flex-col">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            <div className="flex items-center justify-between px-6 py-3">
              <span className="font-semibold text-foreground">
                {activeListing.companyName}
              </span>
              <Button size="sm" variant="ghost" onClick={reset}>
                Close
              </Button>
            </div>
            <div
              className="overflow-y-auto px-6 pb-6 prose prose-sm prose-invert max-w-none text-muted-foreground scrollbar-minimal"
              dangerouslySetInnerHTML={{ __html: activeListing.description }}
            />
            <Button size="lg">Start AI Interview</Button>
          </div>
        )}
      </div>
    </>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { useActiveListingStore } from "@/store/active-listing-store";
import { useInterviewStore } from "@/store/interview-store";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ActiveListing() {
  const activeListing = useActiveListingStore((state) => state.activeListing);
  const resetActiveListing = useActiveListingStore(
    (state) => state.resetActiveListing,
  );
  const setJobDescription = useInterviewStore(
    (state) => state.setJobDescription,
  );
  const resetInterview = useInterviewStore((state) => state.reset);
  const router = useRouter();

  const startInterview = () => {
    resetInterview();
    setJobDescription(activeListing?.description || "");
    router.push("/interview");
  };

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
          <div className="flex flex-col w-96 max-h-[calc(100vh-14rem)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">
                  {activeListing.companyName}
                </span>
                <Link
                  href={activeListing.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  View the full listing
                </Link>
              </div>
              <Button size="lg" variant="ghost" onClick={resetActiveListing}>
                <X />
              </Button>
            </div>
            <div
              className="flex-1 overflow-y-auto scrollbar-minimal prose prose-sm prose-invert max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: activeListing.description }}
            />
            <Button onClick={startInterview} size="lg" className="mt-4">
              Start AI Interview
            </Button>
          </div>
        )}
      </div>

      {/* Mobile backdrop */}
      {activeListing && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40"
          onClick={resetActiveListing}
        />
      )}

      {/* Mobile bottom sheet */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ${
          activeListing ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {activeListing && (
          <div className="bg-card rounded-t-2xl border-t border-border max-h-[70vh] flex flex-col">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>
            <div className="flex items-center justify-between px-6 py-3">
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">
                  {activeListing.companyName}
                </span>
                <Link
                  href={activeListing.applicationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  View the full listing
                </Link>
              </div>
              <Button variant="ghost" onClick={resetActiveListing}>
                <X />
              </Button>
            </div>
            <div
              className="flex-1 overflow-y-auto px-6 scrollbar-minimal prose prose-sm prose-invert max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: activeListing.description }}
            />
            <Button
              onClick={startInterview}
              size="lg"
              className="mx-6 mb-6 mt-4 bg-primary"
            >
              Start AI Interview
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

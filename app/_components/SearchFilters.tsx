"use client";

import { Button } from "@/components/ui/button";
import { useActiveListingStore } from "@/store/active-listing-store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reset = useActiveListingStore((state) => state.reset);

  function handleLevelChange(level: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("level", level);
    router.push(`?${params.toString()}`);
  }

  function handleStackChange(stack: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("stack", stack);
    router.push(`?${params.toString()}`);
  }

  useEffect(() => {
    reset();
  }, [searchParams]);

  return (
    <div className="flex w-full bg-secondary pb-10 mb-2">
      <div>
        {["entry", "mid", "senior"].map((level) => (
          <Button
            key={level}
            onClick={() => handleLevelChange(level)}
            style={{
              fontWeight:
                searchParams.get("level") === level ? "bold" : "normal",
            }}
          >
            {level}
          </Button>
        ))}
      </div>
      <div>
        {["frontend", "backend", "fullstack"].map((stack) => (
          <Button
            key={stack}
            onClick={() => handleStackChange(stack)}
            style={{
              fontWeight:
                searchParams.get("stack") === stack ? "bold" : "normal",
            }}
          >
            {stack}
          </Button>
        ))}
      </div>
    </div>
  );
}

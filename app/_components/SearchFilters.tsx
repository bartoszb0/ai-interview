"use client";

import { Button } from "@/components/ui/button";
import { useActiveListingStore } from "@/store/active-listing-store";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reset = useActiveListingStore((state) => state.reset);

  function navigate(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    params.set("page", "1");
    reset();
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex w-full bg-secondary pb-10 mb-2">
      <div>
        {["junior", "mid", "senior"].map((level) => (
          <Button
            key={level}
            onClick={() => navigate("level", level)}
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
            onClick={() => navigate("stack", stack)}
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

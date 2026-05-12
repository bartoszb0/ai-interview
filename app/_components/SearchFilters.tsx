"use client";

import { Button } from "@/components/ui/button";
import { SENIORITY } from "@/constants/seniority";
import { STACK } from "@/constants/stack";
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
    <div className="flex w-full bg-secondary justify-between">
      <div className="flex gap-2">
        {SENIORITY.map((level) => (
          <Button
            key={level}
            variant={searchParams.get("level") === level ? "default" : "ghost"}
            onClick={() => navigate("level", level)}
            className="capitalize"
          >
            {level}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        {STACK.map((stack) => (
          <Button
            key={stack}
            variant={searchParams.get("stack") === stack ? "default" : "ghost"}
            onClick={() => navigate("stack", stack)}
            className="capitalize"
          >
            {stack}
          </Button>
        ))}
      </div>
    </div>
  );
}

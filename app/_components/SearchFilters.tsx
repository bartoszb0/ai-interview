"use client";

import { Button } from "@/components/ui/button";
import { ROLE } from "@/constants/role";
import { SENIORITY } from "@/constants/seniority";
import { useActiveListingStore } from "@/store/active-listing-store";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetActiveListing = useActiveListingStore(
    (state) => state.resetActiveListing,
  );

  function navigate(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    params.set("page", "1");
    resetActiveListing();
    router.push(`?${params.toString()}`);
  }

  return (
    <div>
      <div className="flex gap-2 justify-center">
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
      <div className="flex gap-2 justify-center">
        {ROLE.map((role) => (
          <Button
            key={role}
            variant={searchParams.get("role") === role ? "default" : "ghost"}
            onClick={() => navigate("role", role)}
            className="capitalize"
          >
            {role}
          </Button>
        ))}
      </div>
    </div>
  );
}

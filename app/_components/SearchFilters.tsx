"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRY } from "@/constants/country";
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
    if (value === "__clear__") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set("page", "1");
    resetActiveListing();
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 items-center justify-center">
      <Select
        value={searchParams.get("level") ?? ""}
        onValueChange={(value) => navigate("level", value)}
      >
        <SelectTrigger className="w-[140px] rounded-none capitalize">
          <SelectValue placeholder="Seniority" />
        </SelectTrigger>
        <SelectContent className="rounded-none">
          <SelectGroup>
            {SENIORITY.map((level) => (
              <SelectItem key={level} value={level} className="capitalize">
                {level}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get("role") ?? ""}
        onValueChange={(value) => navigate("role", value)}
      >
        <SelectTrigger className="w-[140px] rounded-none capitalize">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent className="rounded-none">
          <SelectGroup>
            {ROLE.map((role) => (
              <SelectItem key={role} value={role} className="capitalize">
                {role}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get("country") ?? ""}
        onValueChange={(value) => navigate("country", value)}
      >
        <SelectTrigger className="w-[160px] rounded-none">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent className="rounded-none">
          <SelectGroup>
            <SelectItem value="__clear__">All</SelectItem>
            {COUNTRY.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

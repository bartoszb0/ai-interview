"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SORT } from "@/constants/sort";
import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelect({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }

  return (
    <Select
      disabled={disabled}
      value={searchParams.get("sort") ?? "relevant"}
      onValueChange={handleSort}
    >
      <SelectTrigger className="w-[160px] ">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-none">
        <SelectGroup>
          {SORT.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

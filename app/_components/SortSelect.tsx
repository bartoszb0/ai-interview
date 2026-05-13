"use client";

import { Button } from "@/components/ui/button";
import { ArrowDownWideNarrow } from "lucide-react";

export default function SortSelect() {
  return (
    <Button variant="ghost">
      <ArrowDownWideNarrow /> Sort{" "}
    </Button>
  );
}

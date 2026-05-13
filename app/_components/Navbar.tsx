import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import SearchFilters from "./SearchFilters";

export default function Navbar() {
  return (
    <div className="flex bg-secondary w-full p-3">
      <div className="max-w-5xl w-full mx-auto flex justify-between">
        <SearchFilters />
        <Button className="rounded-sm w-[200px]" size="lg" asChild>
          <Link href="/interview">
            <Sparkles /> Custom AI Interview
          </Link>
        </Button>
      </div>
    </div>
  );
}

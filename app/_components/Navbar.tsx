import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import ProfileBtn from "./ProfileBtn";
import SearchFilters from "./SearchFilters";

export default function Navbar() {
  return (
    <div className="flex bg-secondary w-full p-3">
      <div className="max-w-5xl w-full mx-auto flex justify-between">
        <SearchFilters />
        <div className="flex items-center gap-2">
          <Button className="rounded-sm w-[200px]" size="lg" asChild>
            <Link href="/interview">
              <Sparkles /> Custom AI Interview
            </Link>
          </Button>
          <ProfileBtn />
        </div>
      </div>
    </div>
  );
}

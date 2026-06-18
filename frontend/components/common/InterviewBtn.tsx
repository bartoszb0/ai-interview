import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function InterviewBtn() {
  return (
    <Button className="rounded-sm w-[200px]" size="lg" asChild>
      <Link href="/interview">
        <Sparkles /> Custom AI Interview
      </Link>
    </Button>
  );
}

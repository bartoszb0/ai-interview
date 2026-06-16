import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BrowseJobsBtn() {
  return (
    <div className="flex justify-center mt-10">
      <Button asChild variant="link">
        <Link href={"/"}>Browse jobs here</Link>
      </Button>
    </div>
  );
}

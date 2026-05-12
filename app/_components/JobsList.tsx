import { Job } from "@/types/job";
import ActiveListing from "./ActiveListing";
import JobListing from "./JobListing";
import PaginationControls from "./PaginationControls";

type JobsListProps = {
  level: string;
  stack: string;
  page: number;
};

export default async function JobsList({ level, stack, page }: JobsListProps) {
  const params = new URLSearchParams();
  const seniorityMap: Record<string, string> = {
    junior: "Entry-level",
    mid: "Mid-level",
    senior: "Senior",
  };
  if (level) params.set("seniority", seniorityMap[level] ?? level);
  if (stack) params.set("q", stack);
  params.set("page", String(Math.max(page, 1)));

  const res = await fetch(
    `https://himalayas.app/jobs/api/search?${params.toString()}`,
  );
  const data = await res.json();

  const totalPages = Math.ceil(data.totalCount / data.limit);

  if (page > totalPages) {
    params.set("page", String(totalPages));
    const retryRes = await fetch(
      `https://himalayas.app/jobs/api/search?${params.toString()}`,
    );
    const retryData = await retryRes.json();
    data.jobs = retryData.jobs;
  }

  const safePage = Math.min(Math.max(page, 1), totalPages);

  return (
    <div className="mt-6">
      <div className="flex flex-col text-center mb-8">
        <span className="text-4xl font-bold">Job Listings</span>
        <span className="text-md">Found {data.totalCount} jobs</span>
      </div>
      <div className="flex">
        <div className="flex flex-col flex-1 gap-4 min-w-0">
          {data.jobs.map((job: Job) => (
            <JobListing key={job.guid} job={job} />
          ))}
        </div>
        <ActiveListing />
      </div>
      <PaginationControls
        currentPage={safePage}
        totalPages={totalPages}
        level={level}
        stack={stack}
      />
    </div>
  );
}

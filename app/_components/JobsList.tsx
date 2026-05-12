import { fetchJobs } from "@/lib/api";
import { Job } from "@/types/job";
import { JobsResponse } from "@/types/jobResponse";
import { redirect } from "next/navigation";
import ActiveListing from "./ActiveListing";
import JobListing from "./JobListing";
import PaginationControls from "./PaginationControls";

type JobsListProps = {
  level: string;
  stack: string;
  page: number;
};

export default async function JobsList({ level, stack, page }: JobsListProps) {
  let data: JobsResponse;

  try {
    data = await fetchJobs(level, stack, page);
  } catch {
    return (
      <div className="mt-6 text-center text-muted-foreground">
        Failed to load job listings. Please try again.
      </div>
    );
  }

  const totalPages = Math.ceil(data.totalCount / data.limit);
  const safePage = Math.min(Math.max(page, 1), totalPages);

  if (page !== safePage) {
    redirect(`?level=${level}&stack=${stack}&page=${safePage}`);
  }

  return (
    <div className="mt-6">
      <div className="flex flex-col text-center mb-8">
        <span className="text-4xl font-bold">Job Listings</span>
        <span className="text-md">Found {data.totalCount} jobs</span>
      </div>
      <div className="flex items-start">
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

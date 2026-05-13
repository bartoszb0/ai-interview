import { fetchJobs } from "@/lib/api";
import { Job } from "@/types/job";
import { JobsResponse } from "@/types/jobResponse";
import { redirect } from "next/navigation";
import ActiveListing from "./ActiveListing";
import JobListing from "./JobListing";
import ListingsHeader from "./ListingsHeader";
import PaginationControls from "./PaginationControls";

type JobsListProps = {
  seniority: string;
  role: string;
  page: number;
  country: string;
};

export default async function JobsList({
  seniority,
  role,
  page,
  country,
}: JobsListProps) {
  let data: JobsResponse;

  try {
    data = await fetchJobs(seniority, role, page, country);
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
    const params = new URLSearchParams({
      seniority,
      role,
      page: String(safePage),
    });
    if (country) params.set("country", country);
    redirect(`?${params.toString()}`);
  }

  return (
    <div className="mt-6">
      <ListingsHeader totalCount={data.totalCount} />
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
        seniority={seniority}
        role={role}
      />
    </div>
  );
}

import { Suspense } from "react";
import JobListSkeleton from "./_components/JobListSkeleton";
import JobsList from "./_components/JobsList";
import NoFiltersSelected from "./_components/NoFilters";
import SearchFilters from "./_components/SearchFilters";

type PageProps = {
  searchParams: Promise<{ level: string; role: string; page?: string }>;
};

export default async function Home({ searchParams }: PageProps) {
  const { level, role, page } = await searchParams;
  const currentPage = Number(page) || 1;

  return (
    <div className="flex flex-col items-center">
      <SearchFilters />
      <div className="w-full max-w-6xl px-12">
        {level && role ? (
          <Suspense
            fallback={<JobListSkeleton />}
            key={`${level}-${role}-${currentPage}`}
          >
            <JobsList level={level} role={role} page={currentPage} />
          </Suspense>
        ) : (
          <NoFiltersSelected />
        )}
      </div>
    </div>
  );
}

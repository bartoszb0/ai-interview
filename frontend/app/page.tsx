import { COUNTRY } from "@/constants/country";
import { ROLE } from "@/constants/role";
import { SENIORITY } from "@/constants/seniority";
import { SORT } from "@/constants/sort";
import { Suspense } from "react";
import JobListSkeleton from "./_components/JobListSkeleton";
import JobsList from "./_components/JobsList";
import Navbar from "./_components/Navbar";
import NoFiltersSelected from "./_components/NoFilters";

type PageProps = {
  searchParams: Promise<{
    seniority?: string;
    role?: string;
    page?: string;
    country?: string;
    sort?: string;
  }>;
};

export default async function Home({ searchParams }: PageProps) {
  const { seniority, role, page, country, sort } = await searchParams;
  const currentPage = Number(page) || 1;

  const safeSeniority =
    seniority && SENIORITY.includes(seniority) ? seniority : "";
  const safeRole = role && ROLE.includes(role) ? role : "";
  const safeCountry =
    country && COUNTRY.some((c) => c.value === country) ? country : "";
  const safeSort =
    sort && SORT.some((s) => s.value === sort) ? sort : "relevant";

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="w-full max-w-6xl px-12">
        {safeSeniority && safeRole ? (
          <Suspense
            fallback={<JobListSkeleton />}
            key={`${safeSeniority}-${safeRole}-${currentPage}-${safeCountry}-${safeSort}`}
          >
            <JobsList
              seniority={safeSeniority}
              role={safeRole}
              page={currentPage}
              country={safeCountry}
              sort={safeSort}
            />
          </Suspense>
        ) : (
          <NoFiltersSelected />
        )}
      </div>
    </div>
  );
}

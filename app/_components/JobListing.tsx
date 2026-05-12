"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useActiveListingStore } from "@/store/active-listing-store";
import { Job } from "@/types/job";
import { Building2 } from "lucide-react";
import Image from "next/image";

type JobListingProps = {
  job: Job;
};

export default function JobListing({ job }: JobListingProps) {
  const isActive = useActiveListingStore(
    (state) => state.activeListing?.guid === job.guid,
  );
  const setActiveListing = useActiveListingStore(
    (state) => state.setActiveListing,
  );

  return (
    <>
      <Card
        className={`px-6 py-4 min-h-24 md:px-8 md:py-0 md:h-28 cursor-pointer transition-all hover:ring-primary/50 hover:shadow-[0_0_20px_color-mix(in_oklch,var(--primary)_15%,transparent)] ${isActive ? "ring-primary shadow-[0_0_20px_color-mix(in_oklch,var(--primary)_15%,transparent)]" : ""}`}
        onClick={() => setActiveListing(job)}
      >
        <div className="flex gap-4 items-center md:gap-6 md:h-full">
          <div className="flex shrink-0 items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-lg bg-muted overflow-hidden">
            {job.companyLogo ? (
              <Image
                src={job.companyLogo}
                alt={`${job.companyName}-logo`}
                width={128}
                height={128}
                className="object-contain w-full h-full"
              />
            ) : (
              <Building2 className="w-7 h-7 text-muted-foreground" />
            )}
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-foreground leading-snug line-clamp-2 md:text-lg md:line-clamp-none">
              {job.title}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2 md:flex-nowrap md:gap-4">
              <Badge
                variant={
                  job.minSalary && job.maxSalary ? "default" : "destructive"
                }
              >
                {job.minSalary && job.maxSalary
                  ? `${job.minSalary} - ${job.maxSalary} ${job.currency}`
                  : job.minSalary
                    ? `From ${job.minSalary} ${job.currency}`
                    : job.maxSalary
                      ? `Up to ${job.maxSalary} ${job.currency}`
                      : "Salary not disclosed"}
              </Badge>
              <span>{job.companyName}</span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

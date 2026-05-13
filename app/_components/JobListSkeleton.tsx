"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import SortSelect from "./SortSelect";

function FlickeringCount() {
  const [count, setCount] = useState(
    () => Math.floor(Math.random() * 900) + 100,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(Math.floor(Math.random() * 900) + 100);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-md text-muted-foreground">
      Found <span className="text-primary">{count}</span> jobs
    </span>
  );
}

function JobListingSkeletonItem() {
  return (
    <Card className="px-8 h-28">
      <div className="flex h-full gap-6 items-center">
        <Skeleton className=" w-16 h-16 rounded-lg" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-5 w-2/3" />
          <div className="flex gap-3">
            <Skeleton className="h-4 w-24 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function JobListSkeleton() {
  return (
    <div className="mt-6">
      <div className="flex flex-col mx-4 mb-1">
        <span className="text-4xl font-bold">Job Listings</span>
        <div className="flex flex-row justify-between items-center gap-1 mb-1">
          <FlickeringCount />
          <SortSelect disabled={true} />
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col flex-1 gap-4 min-w-0">
          {Array.from({ length: 19 }).map((_, i) => (
            <JobListingSkeletonItem key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

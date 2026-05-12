import { SENIORITY_MAP } from "@/constants/seniorityMap";
import { JobsResponse } from "@/types/jobResponse";

export async function fetchJobs(
  level: string,
  role: string,
  page: number,
): Promise<JobsResponse> {
  const params = new URLSearchParams();
  if (level) params.set("seniority", SENIORITY_MAP[level] ?? level);
  if (role) params.set("q", role);
  params.set("page", String(Math.max(page, 1)));

  const res = await fetch(
    `https://himalayas.app/jobs/api/search?${params.toString()}`,
  );

  if (!res.ok) throw new Error(`API error: ${res.status}`);

  return res.json();
}

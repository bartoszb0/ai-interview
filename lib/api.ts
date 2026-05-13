import { SENIORITY_MAP } from "@/constants/seniorityMap";
import { JobsResponse } from "@/types/jobResponse";

export async function fetchJobs(
  seniority: string,
  role: string,
  page: number,
  country: string,
): Promise<JobsResponse> {
  const params = new URLSearchParams();
  if (seniority) params.set("seniority", SENIORITY_MAP[seniority] ?? seniority);
  if (role) params.set("q", role);
  if (country) params.set("country", country);

  params.set("page", String(Math.max(page, 1)));

  const res = await fetch(
    `https://himalayas.app/jobs/api/search?${params.toString()}`,
  );

  if (!res.ok) throw new Error(`API error: ${res.status}`);

  return res.json();
}

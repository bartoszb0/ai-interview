import { Job } from "./job";

export type JobsResponse = {
  jobs: Job[];
  totalCount: number;
  limit: number;
};

import { JobType } from "./jobs.types";

export interface IGetAllJobsResponse {
  data: JobType[];
  success: boolean;
}

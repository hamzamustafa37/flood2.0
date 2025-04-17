import { ICommonResponse } from "../commonTypes";
import { JobType } from "./JobsInterface";

export interface IGetAllJobsResponse {
  data: JobType[];
  success: boolean;
}

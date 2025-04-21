import { AxiosError, type AxiosResponse } from "axios";
import { apiRoutes } from "@/utils/api.route";

import { api } from "@/utils/axios";
import { IGetAllJobsResponse } from "@/utils/types/responseInterface";
import { errorMessages, msgResponse } from "@/utils";

export const getJobs = async (
  page: number = 1,
  limit: number = 10
): Promise<IGetAllJobsResponse> => {
  try {
    const response = await api.request({
      method: "get",
      url: `${apiRoutes.jobs.name}${apiRoutes.jobs.readWithUsers}?withUsers=true`,
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    } else {
      throw new Error(errorMessages.errorOccurred);
    }
  }
};

export const getJobDetails = async (
  id: string
): Promise<IGetAllJobsResponse> => {
  try {
    const response = await api.request({
      method: "get",
      url: `${apiRoutes.jobs.name}${apiRoutes.jobs.read}/${id}`,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    } else {
      throw new Error(errorMessages.errorOccurred);
    }
  }
};

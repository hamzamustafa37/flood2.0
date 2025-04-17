import { AxiosError, type AxiosResponse } from "axios";
import { apiRoutes } from "@/utils/api.route";
import {
  // type IRebuttal,
  type IResponse,
} from "@/utils/commonTypes";
import { api } from "@/utils/axios";
import { IGetAllJobsResponse } from "@/utils/types/responseInterface";
// import { msgResponse } from "@/utils/messagesType";

export const getJobs = async (
  page: number = 1,
  limit: number = 10
): Promise<IGetAllJobsResponse> => {
  try {
    const response = await api.request({
      method: "get",
      url: `${apiRoutes.jobs.name}${apiRoutes.jobs.read}`,
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
      throw new Error("An unknown error occurred");
    }
  }
};

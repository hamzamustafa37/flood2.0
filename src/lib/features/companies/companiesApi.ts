import { AxiosError, type AxiosResponse } from "axios";
import { apiRoutes } from "@/utils/api.route";

import { api } from "@/utils/axios";
import { errorMessages, msgResponse } from "@/utils";
import { IGetAllCompanies } from "@/utils/types/responseInterface";

export const getCompanies = async (
  page: number = 1,
  limit: number = 10
): Promise<IGetAllCompanies> => {
  try {
    const response = await api.request({
      method: "get",
      url: `${apiRoutes.company.name}${apiRoutes.company.read}`,
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

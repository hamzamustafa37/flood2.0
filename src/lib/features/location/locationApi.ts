import { AxiosError, type AxiosResponse } from "axios";
import { apiRoutes } from "@/utils/api.route";

import { api } from "@/utils/axios";
import { errorMessages, msgResponse } from "@/utils";
import { IGetCompaniesLocations } from "@/utils/types/responseInterface";

export const getLocations = async (
  page: number = 1,
  limit: number = 10
): Promise<IGetCompaniesLocations> => {
  try {
    const response = await api.request({
      method: "get",
      url: `${apiRoutes.locations.name}${apiRoutes.locations.read}`,
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

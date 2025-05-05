import { AxiosError, type AxiosResponse } from "axios";
import { apiRoutes } from "@/utils/api.route";

import { api } from "@/utils/axios";
import { errorMessages, msgResponse } from "@/utils";
import { IGetAllInventories } from "@/utils/types/responseInterface";

export const getInventories = async (
  page: number = 1,
  limit: number = 10
): Promise<IGetAllInventories> => {
  try {
    const response = await api.request({
      method: "get",
      url: `${apiRoutes.inventory.name}${apiRoutes.inventory.read}`,
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

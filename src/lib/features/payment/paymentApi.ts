import { AxiosError } from "axios";
import { apiRoutes } from "@/utils/api.route";

import { api } from "@/utils/axios";
import { errorMessages } from "@/utils";
import { IGetCompaniesLocations } from "@/utils/types/responseInterface";

export const getAllPayment = async (
  page: number = 1,
  limit: number = 10
): Promise<IGetCompaniesLocations> => {
  try {
    const response = await api.request({
      method: "get",
      url: `${apiRoutes.payment.name}${apiRoutes.payment.read}`,
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

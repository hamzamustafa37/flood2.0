import { AxiosError } from "axios";
import { apiRoutes } from "@/utils/api.route";

import { api } from "@/utils/axios";
import { errorMessages, msgResponse } from "@/utils";
import { IGetAllAppointments } from "@/utils/types/responseInterface";

export const getAppointments = async (
  date: string
): Promise<IGetAllAppointments> => {
  try {
    const response = await api.request({
      method: "get",
      url: `${apiRoutes.appointments.name}${apiRoutes.appointments.read}?date=${date}`,
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

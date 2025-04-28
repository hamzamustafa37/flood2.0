import { api, errorMessages } from "@/utils";
import { apiRoutes } from "@/utils/api.route";
import { IGetAllUsers } from "@/utils/types";
import { AxiosError } from "axios";

export const getUsers = async (
  page: number = 1,
  limit: number = 10
): Promise<IGetAllUsers> => {
  try {
    const response = await api.request({
      method: "get",
      url: `${apiRoutes.users.name}${apiRoutes.users.read}`,
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

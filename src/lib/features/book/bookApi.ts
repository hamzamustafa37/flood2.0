import {
  api,
  apiRoutes,
  IBooking,
  // type ICardsResponse,
  type ICardResponse,
} from "@/utils";
import { msgResponse } from "@/utils/messagesType";
import { AxiosError, type AxiosResponse } from "axios";

export const addBookings = async (
  payload: IBooking
): Promise<{ data: ICardResponse } | { error: string }> => {
  try {
    const response: AxiosResponse<ICardResponse> = await api.request({
      method: "post",
      url: `${apiRoutes.card.name}${apiRoutes.card.create}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },

      data: payload,
    });
    return response;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err?.response?.data?.data as string);
    } else {
      throw new Error(msgResponse.unKnowError);
    }
  }
};

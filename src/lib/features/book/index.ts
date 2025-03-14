import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ApiActions, IBooking } from "@/utils";
import { endLoading, startLoading } from "../global";
import { type AppThunk } from "@/lib/store";
import { msgResponse, PopUpMessage } from "@/utils/messagesType";
import { errorPopup, successPopUps } from "@/app/components/common";
import { type AxiosError } from "axios";
import { addBookings } from "./bookApi";

export interface IBookingSlice {
  bookingsData: IBooking[];
}

const initialState: IBookingSlice = {
  bookingsData: [],
};

export const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addNewBooking: (state, action: PayloadAction<IBooking>) => {
      state.bookingsData.push(action.payload);
    },
  },
  selectors: {
    bookingsData: (store) => store.bookingsData,
  },
});
export const { bookingsData } = bookingSlice.selectors;
export const { addNewBooking } = bookingSlice.actions;
export default bookingSlice.reducer;

export const _addNewBooking =
  (payload: IBooking, callBack?: () => void): AppThunk =>
  (dispatch) => {
    dispatch(startLoading({ key: ApiActions.ADD_BOOKING }));
    addBookings(payload)
      .then((response: { data: any } | { error: string }) => {
        if ("data" in response) {
          if (
            response.data.meta.status === 200 ||
            response.data.meta.status === 201
          ) {
            dispatch(addNewBooking(response.data.data));
            successPopUps(msgResponse.cardAdded);
          }
        } else {
          errorPopup(response.error);
        }

        if (callBack) {
          callBack();
        }

        dispatch(endLoading({ key: ApiActions.ADD_CARD }));
      })
      .catch((err) => {
        dispatch(endLoading({ key: ApiActions.ADD_BOOKING }));
        errorPopup(err?.message as string);
      });
  };

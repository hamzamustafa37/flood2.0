import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ApiActions } from "@/utils";
import { AppThunk } from "@/lib/store";
import { endLoading, startLoading } from "../global";
import { AxiosError } from "axios";
import { errorPopup } from "@/app/components/common";
import { IAppointment } from "@/utils/types/appointment.types";
import { getAppointments } from "./appointmentApi";

export interface IAppointmentSlice {
  appointments: Array<IAppointment>;
}

const initialState: IAppointmentSlice = {
  appointments: [],
};

export const appointmentSlice = createSlice({
  name: "Appointments",
  initialState,
  reducers: {
    setAppointments: (state, action: PayloadAction<Array<IAppointment>>) => {
      state.appointments = action.payload;
    },
  },
  selectors: {
    allAppointment: (store) => store.appointments,
  },
});

export const { allAppointment } = appointmentSlice.selectors;
export const { setAppointments } = appointmentSlice.actions;
export default appointmentSlice.reducer;

export const _getAllAppointments =
  (date: string): AppThunk =>
  (dispatch) => {
    dispatch(startLoading({ key: ApiActions.GET_APPOINTMENTS }));
    getAppointments(date)
      .then((response) => {
        dispatch(setAppointments(response?.data));
        console.log(response);
        dispatch(endLoading({ key: ApiActions.GET_APPOINTMENTS }));
      })
      .catch((err) => {
        const error = err as AxiosError;
        dispatch(endLoading({ key: ApiActions.GET_APPOINTMENTS }));
        errorPopup(error.message);
      });
  };

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ApiActions } from "@/utils";
import { AppThunk } from "@/lib/store";
import { endLoading, startLoading } from "../global";
import { AxiosError } from "axios";
import { errorPopup } from "@/app/components/common";
import { getLocations } from "./locationApi";
import { ICompanyLocation } from "@/utils/types";

export interface ILocationSlice {
  locations: Array<ICompanyLocation>;
}

const initialState: ILocationSlice = {
  locations: [],
};

export const locationSlice = createSlice({
  name: "Location",
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Array<ICompanyLocation>>) => {
      state.locations = action.payload;
    },
  },
  selectors: {
    allLocations: (store) => store.locations,
  },
});

export const { allLocations } = locationSlice.selectors;
export const { setLocations } = locationSlice.actions;
export default locationSlice.reducer;

export const _getLocations = (): AppThunk => (dispatch) => {
  dispatch(startLoading({ key: ApiActions.GET_LOCATIONS }));
  getLocations()
    .then((response) => {
      dispatch(setLocations(response?.data));
      dispatch(endLoading({ key: ApiActions.GET_LOCATIONS }));
    })
    .catch((err) => {
      const error = err as AxiosError;
      dispatch(endLoading({ key: ApiActions.GET_LOCATIONS }));
      errorPopup(error.message);
    });
};

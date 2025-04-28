import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ApiActions } from "@/utils";
import { AppThunk } from "@/lib/store";
import { endLoading, startLoading } from "../global";
import { AxiosError } from "axios";
import { errorPopup } from "@/app/components/common";
import { getCompanies } from "./companiesApi";

export interface ICompanySlice {
  companies: Array<ICompany>;
}

const initialState: ICompanySlice = {
  companies: [],
};

export const companySlice = createSlice({
  name: "Company",
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<Array<ICompany>>) => {
      state.companies = action.payload;
    },
  },
  selectors: {
    allCompanies: (store) => store.companies,
  },
});

export const { allCompanies } = companySlice.selectors;
export const { setCompanies } = companySlice.actions;
export default companySlice.reducer;

export const _getCompanies = (): AppThunk => (dispatch) => {
  dispatch(startLoading({ key: ApiActions.GET_COMPANIES }));
  getCompanies()
    .then((response) => {
      dispatch(setCompanies(response?.data));
      dispatch(endLoading({ key: ApiActions.GET_COMPANIES }));
    })
    .catch((err) => {
      const error = err as AxiosError;
      dispatch(endLoading({ key: ApiActions.GET_COMPANIES }));
      errorPopup(error.message);
    });
};

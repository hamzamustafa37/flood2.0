import { createAppSlice } from "@/lib/createAppSlice";
import {
  ApiActions1,
  type ApiActions,
  type PayloadActionLoading,
} from "@/utils";

import type { PayloadAction } from "@reduxjs/toolkit";

type ILoadingState = Record<ApiActions | ApiActions1, boolean>;
export interface IGlobalSlice {
  loading: Partial<ILoadingState>;
  selectedMicroPhoneId: string;
}

const initialState: IGlobalSlice = {
  loading: {},
  selectedMicroPhoneId: "",
};

export const globalSlice = createAppSlice({
  name: "global",
  initialState,
  reducers: (create) => ({
    startLoading: create.reducer(
      (state, action: PayloadAction<PayloadActionLoading>) => {
        const { key } = action.payload;
        state.loading = {
          ...state.loading,
          [key]: true,
        };
      }
    ),
    endLoading: create.reducer(
      (state, action: PayloadAction<PayloadActionLoading>) => {
        const { key } = action.payload;
        state.loading = {
          ...state.loading,
          [key]: false,
        };
      }
    ),
  }),
  selectors: {
    loading: (global) => global.loading,
    selectedMicroPhoneId: (global) => global.selectedMicroPhoneId,
  },
});

export const { loading, selectedMicroPhoneId } = globalSlice.selectors;
export const { startLoading, endLoading } = globalSlice.actions;

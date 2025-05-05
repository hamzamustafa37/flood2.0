import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ApiActions } from "@/utils";
import { AppThunk } from "@/lib/store";
import { endLoading, startLoading } from "../global";
import { AxiosError } from "axios";
import { errorPopup } from "@/app/components/common";
import { IInventory } from "@/utils/types";
import { getInventories } from "./inventoryApi";

export interface IInventories {
  Inventories: Array<IInventory>;
}

const initialState: IInventories = {
  Inventories: [],
};

export const InventoriesSlice = createSlice({
  name: "Inventories",
  initialState,
  reducers: {
    setInventories: (state, action: PayloadAction<Array<IInventory>>) => {
      state.Inventories = action.payload;
    },
  },
  selectors: {
    allInventories: (store) => store.Inventories,
  },
});

export const { allInventories } = InventoriesSlice.selectors;
export const { setInventories } = InventoriesSlice.actions;
export default InventoriesSlice.reducer;

export const _getAllInventory = (): AppThunk => (dispatch) => {
  dispatch(startLoading({ key: ApiActions.GET_INVENTORIES }));
  getInventories()
    .then((response) => {
      dispatch(setInventories(response?.data));
      dispatch(endLoading({ key: ApiActions.GET_INVENTORIES }));
    })
    .catch((err) => {
      const error = err as AxiosError;
      dispatch(endLoading({ key: ApiActions.GET_INVENTORIES }));
      errorPopup(error.message);
    });
};

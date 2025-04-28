import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/utils/types";
import { AppThunk } from "@/lib/store";
import { ApiActions } from "@/utils";
import { endLoading, startLoading } from "../global";
import { getUsers } from "./userApi";
import { AxiosError } from "axios";
import { errorPopup } from "@/app/components/common";

export interface IUserSlice {
  allUsers: Array<IUser>;
}

const initialState: IUserSlice = {
  allUsers: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<Array<IUser>>) => {
      state.allUsers = action.payload;
    },
  },
  selectors: {
    userData: (store) => store.allUsers,
  },
});

export const { userData } = userSlice.selectors;
export const { setUsers } = userSlice.actions;
export default userSlice.reducer;

export const _getUsers =
  (page: number = 1, limit: number = 10): AppThunk =>
  (dispatch) => {
    dispatch(startLoading({ key: ApiActions.GET_USERS }));
    getUsers(page, limit)
      .then((response) => {
        dispatch(setUsers(response.data.users));
        dispatch(endLoading({ key: ApiActions.GET_USERS }));
      })
      .catch((err) => {
        const error = err as AxiosError;
        dispatch(endLoading({ key: ApiActions.GET_USERS }));
        errorPopup(error.message);
      });
  };

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  googleLink,
  loginWithEmail,
  signupContractor,
  verifyEmail,
} from "./auth.api";
import { AppThunk } from "@/lib/store";
import { deleteCookie, setCookie } from "cookies-next";

import {
  IGoogleLoginResponse,
  IGoogleUserData,
} from "@/utils/types/auth.types";
import { endLoading, startLoading } from "../global";
import { ApiActions, ISignInResponse, msgResponse, showError } from "@/utils";
import { errorPopup, successPopUps } from "@/app/components/common";
import axios, { AxiosError } from "axios";

// const initialState: IAuthSlice = {
//   userToBeRegister: {},
//   userToBeSignIn: {
//     email: "",
//     password: "",
//   },
//   user: {
//     imgUrl: "",
//     fullName: "",
//     email: "",
//     country: "",
//     state: "",
//   },
// };

// export const authSlice = createAppSlice({
//   name: "auth",
//   initialState,
//   reducers: (create) => ({
//     updateUserToBeRegister: create.reducer(
//       (state, action: PayloadAction<PayloadActionUserToBeRegister>) => {
//         const { key, value } = action.payload;
//         state.userToBeRegister = {
//           ...state.userToBeRegister,
//           [key]: value,
//         };
//       }
//     ),
//     updateUserToBeSignIn: create.reducer(
//       (state, action: PayloadAction<PayloadActionUserToBeSignIn>) => {
//         const { key, value } = action.payload;
//         state.userToBeSignIn = {
//           ...state.userToBeSignIn,
//           [key]: value,
//         };
//       }
//     ),
//     userProfile: create.reducer(
//       (state, action: PayloadAction<PayloadActionUserProfile>) => {
//         state.user = {
//           ...state.user,
//           ...action.payload,
//         };
//       }
//     ),
//   }),
//   selectors: {
//     userToBeRegistered: (auth) => auth.userToBeRegister,
//     user: (auth) => auth.user,
//   },
// });

// export const { userToBeRegistered, user } = authSlice.selectors;
// export const { updateUserToBeRegister, updateUserToBeSignIn, userProfile } =
//   authSlice.actions;

export const _googleLogin =
  (router: AppRouterInstance, pathName: string): AppThunk =>
  async (dispatch) => {
    try {
      const res = await googleLink();

      console.log("Response from Google Link:", res);
      if (res?.status === 200 && res.data?.user) {
        setCookie("user", res.data.user.name);
        setCookie("email", res.data.user.email);

        router.push(pathName);
      } else {
        console.error("Google Link failed:", res);
      }
    } catch (error) {
      console.error("Error during Google login thunk:", error);
    }
  };
export const _verifyEmail =
  (
    router: AppRouterInstance,
    pathName: string,
    oobCode: string,
    uid: string
  ): AppThunk =>
  async (dispatch) => {
    dispatch(startLoading({ key: ApiActions.VERIFY_EMAIL }));
    try {
      const res: any = await verifyEmail(oobCode, uid);
      console.log("Response from Google User Info:", res);
      if (res.message) {
        successPopUps(res.message);
        router.push(pathName);
      } else {
        dispatch(endLoading({ key: ApiActions.VERIFY_EMAIL }));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showError(error.response?.data?.error as string);
        console.error("Error during Google user info thunk:", error);
      }
      dispatch(endLoading({ key: ApiActions.VERIFY_EMAIL }));
      showError(error);
    }
  };
export const _signupContractor =
  (
    router: AppRouterInstance,
    pathName: string,
    userInfo: IGoogleUserData
  ): AppThunk =>
  async () => {
    try {
      const res = await signupContractor(userInfo);
      console.log("Response from Google Link:00000", res);
      router.push(pathName);
    } catch (error: any) {
      if (error.status === 500) {
        console.log("Server error during signup with Google:", error);
      }
      console.error("Error during signup with Google:", error);
    }
  };

//   };
export const _signIn =
  (email: string, password: string, callBack: () => void): AppThunk =>
  (dispatch) => {
    dispatch(startLoading({ key: ApiActions.SIGN_IN }));
    loginWithEmail(email, password)
      .then((res: ISignInResponse) => {
        console.log(res, "the res");
        if (res?.data?.token) {
          setCookie("user", res.data.user.email);
          setCookie("token", res.data.token);
          dispatch(endLoading({ key: ApiActions.SIGN_IN }));
          successPopUps(msgResponse.signInSuccess);
          setTimeout(() => {
            // dispatch(userProfile(res.data.data.user));
            // dispatch(
            //   updateUserToBeSignIn({
            //     key: "password",
            //     value: "",
            //   })
            // );
            deleteCookie("email");

            if (callBack) {
              console.log("Calling callback function after sign in");
              callBack();
            }
          }, 1000);
        }
      })

      .catch((err) => {
        dispatch(endLoading({ key: ApiActions.SIGN_IN }));
        const message = err?.message || "Something went wrong during sign in.";
        alert(message);
        errorPopup(message);
      });
  };

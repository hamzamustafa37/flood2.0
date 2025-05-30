// import { ApiActions1 } from "./../../../utils";
// import { createAppSlice } from "@/lib/createAppSlice";
// import { type AppThunk } from "@/lib/store";
// import type {
//   ISignInResponse,
//   ISocialProviderData,
//   IUpdatePassword,
//   IUpdatePasswordResponse,
//   IUser,
//   IUserSignIn,
//   IUserToBeRegister,
// } from "@/utils/commonTypes";
// import {
//   type PayloadActionUserToBeSignIn,
//   type PayloadActionUserToBeRegister,
//   type PayloadActionUserProfile,
// } from "@/utils/payload-action.types";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import {
//   deactivateUser,
//   forgotPassword,
//   getCurrentUser,
//   resendOtp,
//   resetPassword,
//   signIn,
//   signUpUser,
//   socialProvider,
//   updatePassword,
//   updateProfilePicture,
//   updateUserInfo,
//   verifyOtp,
// } from "./auth.api";
// import { endLoading, startLoading } from "../global";
// import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
// import { showError } from "@/utils";
// import { errorPopup, successPopUps } from "@/app/components/common";
// import { setCookie, deleteCookie } from "cookies-next";
// import { msgResponse } from "@/utils/messagesType";
// // import { signOut } from 'next-auth/react';
// export interface IAuthSlice {
//   userToBeRegister: Partial<IUserToBeRegister>;
//   userToBeSignIn: IUserSignIn;
//   user: IUser;
// }

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { googleLink, signupContractor, UserInfoViaGoogle } from "./auth.api";
import { AppThunk } from "@/lib/store";
import { setCookie } from "cookies-next";
import {
  IGoogleLoginResponse,
  IGoogleUserData,
} from "@/utils/types/auth.types";

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

export const _signupContractor =
  (
    router: AppRouterInstance,
    pathName: string,
    userInfo: IGoogleUserData
  ): AppThunk =>
  async () => {
    try {
      const res = await signupContractor(userInfo);
      console.log("Response from Google Link:", res);
      router.push(pathName);
    } catch (error: any) {
      if (error.status === 500) {
        console.log("Server error during signup with Google:", error);
      }
      console.error("Error during signup with Google:", error);
    }
  };

// export const _signUp =
//   (router: AppRouterInstance, pathName: string): AppThunk =>
//   (dispatch, getState) => {
//     dispatch(startLoading({ key: ApiActions.USER_CREATION }));
//     const user = userToBeRegistered(getState());
//     signUpUser(user as IUserToBeRegister)
//       .then((res) => {
//         if (res.data.meta.status === 200 || res.data.meta.status === 201) {
//           successPopUps(msgResponse.verifyEmail);
//         }
//         dispatch(endLoading({ key: ApiActions1.USER_CREATION }));
//         setCookie("email", user?.email ?? "");
//         router.push(pathName);
//       })
//       .catch((err) => {
//         dispatch(endLoading({ key: ApiActions1.USER_CREATION }));
//         showError(err);
//       });
//   };
// export const _socialProvider =
//   (
//     userInfo: ISocialProviderData,
//     router: AppRouterInstance,
//     pathName: string
//   ): AppThunk =>
//   (dispatch) => {
//     dispatch(startLoading({ key: ApiActions1.SOCIAL_LOGIN_GOOGLE }));
//     socialProvider(userInfo)
//       .then((res) => {
//         if (res.data.meta.status === 200 || res.data.meta.status === 201) {
//           setTimeout(() => {
//             setCookie("user", JSON.stringify(res.data.data.user));
//             setCookie("token", res.data.data.accessToken);
//             dispatch(userProfile(res.data.data.user));
//             dispatch(
//               updateUserToBeSignIn({
//                 key: "password",
//                 value: "",
//               })
//             );

//             successPopUps(msgResponse.signInSuccess);
//             deleteCookie("email");
//             deleteCookie("otp");
//             router.push(pathName);
//           }, 1000);
//         }
//       })
//       .catch((err) => {
//         showError(err);
//       })
//       .finally(() => {
//         dispatch(endLoading({ key: ApiActions1.SOCIAL_LOGIN_GOOGLE }));
//       });
//   };
// export const _verifyOtp =
//   (
//     router: AppRouterInstance,
//     pathName: string,
//     email: string,
//     otp: string
//   ): AppThunk =>
//   (dispatch) => {
//     dispatch(startLoading({ key: ApiActions1.VERIFY_OTP }));
//     verifyOtp(email, otp)
//       .then((res) => {
//         if (res.data.meta.status === 200 || res.data.meta.status === 201) {
//           successPopUps(msgResponse.otpVerified);
//           dispatch(endLoading({ key: ApiActions1.VERIFY_OTP }));
//           setCookie("otp", otp ?? "");
//           router.push(pathName);
//         }
//       })
//       .catch((err) => {
//         dispatch(endLoading({ key: ApiActions1.VERIFY_OTP }));
//         showError(err);
//       });
//   };

// export const _resendOtp =
//   (email: string): AppThunk =>
//   (dispatch) => {
//     dispatch(startLoading({ key: ApiActions1.RESEND_OTP }));
//     resendOtp(email ?? email)
//       .then((res) => {
//         if (res.data.meta.status === 200 || res.data.meta.status === 201) {
//           successPopUps(res.data.meta.message);
//           dispatch(endLoading({ key: ApiActions1.RESEND_OTP }));
//         }
//       })
//       .catch((err) => {
//         dispatch(endLoading({ key: ApiActions1.RESEND_OTP }));
//         showError(err);
//       });
//   };
// export const _signIn =
//   (
//     router: AppRouterInstance,
//     pathName: string,
//     email: string,
//     password: string
//   ): AppThunk =>
//   (dispatch) => {
//     dispatch(startLoading({ key: ApiActions1.SIGN_IN }));
//     signIn(email, password)
//       .then((res: { data: ISignInResponse }) => {
//         setCookie("user", JSON.stringify(res.data.data.user));
//         setCookie("token", res.data.data.accessToken);
//         dispatch(endLoading({ key: ApiActions1.SIGN_IN }));
//         successPopUps(msgResponse.signInSuccess);
//         setTimeout(() => {
//           dispatch(userProfile(res.data.data.user));
//           dispatch(
//             updateUserToBeSignIn({
//               key: "password",
//               value: "",
//             })
//           );
//           deleteCookie("email");
//           deleteCookie("otp");
//           router.push(pathName);
//         }, 1000);
//       })
//       .catch((err) => {
//         dispatch(endLoading({ key: ApiActions1.SIGN_IN }));
//         showError(err);
//       });
//   };

// export const _getCurrentUser =
//   (callBack?: (user: IUser) => void): AppThunk =>
//   (dispatch) => {
//     dispatch(startLoading({ key: ApiActions1.GET_CURRENT_USER }));
//     getCurrentUser()
//       .then((user) => {
//         setCookie("user", JSON.stringify(user));
//         dispatch(userProfile(user));
//         dispatch(
//           endLoading({
//             key: ApiActions1.GET_CURRENT_USER,
//           })
//         );
//         if (callBack) {
//           callBack(user);
//         }
//       })
//       .catch((err) => {
//         dispatch(endLoading({ key: ApiActions1.GET_CURRENT_USER }));
//         showError(err);
//       });
//   };
// export const _forgotPassword =
//   (router: AppRouterInstance, pathName: string, email: string): AppThunk =>
//   (dispatch) => {
//     dispatch(startLoading({ key: ApiActions1.FORGOT_PASSWORD }));
//     forgotPassword(email)
//       .then((): void => {
//         dispatch(endLoading({ key: ApiActions1.FORGOT_PASSWORD }));
//         successPopUps(msgResponse.forgotPasswordMail);
//         deleteCookie("email");
//         setCookie("email", email);
//         router.push(pathName);
//       })
//       .catch((err) => {
//         dispatch(endLoading({ key: ApiActions1.FORGOT_PASSWORD }));
//         showError(err);
//       });
//   };

// export const _resetPassword =
//   (
//     router: AppRouterInstance,
//     pathName: string,
//     email: string,
//     otp: string,
//     password: string
//   ): AppThunk =>
//   (dispatch) => {
//     dispatch(startLoading({ key: ApiActions1.RESET_PASSWORD }));
//     resetPassword(email, otp, password)
//       .then((): void => {
//         dispatch(endLoading({ key: ApiActions1.RESET_PASSWORD }));
//         successPopUps(msgResponse.passwordChanged);
//         router.push(pathName);
//       })
//       .catch((err) => {
//         dispatch(endLoading({ key: ApiActions1.RESET_PASSWORD }));
//         showError(err);
//       });
//   };
// export const _editUser =
//   (user: Partial<IUser>, callBack?: () => void): AppThunk =>
//   (dispatch) => {
//     dispatch(startLoading({ key: ApiActions1.UPDATE_USER }));
//     updateUserInfo(user)
//       .then((res) => {
//         dispatch(userProfile({ ...user, ...res.data }));
//         dispatch(endLoading({ key: ApiActions1.UPDATE_USER }));
//         if (callBack) {
//           callBack();
//         }
//       })
//       .catch((err) => {
//         dispatch(endLoading({ key: ApiActions1.UPDATE_USER }));
//         showError(err);
//       });
//   };
// export const _editProfilePicture =
//   (formData: FormData): AppThunk =>
//   (dispatch) => {
//     dispatch(startLoading({ key: ApiActions1.UPDATE_USER }));
//     updateProfilePicture(formData)
//       .then((res) => {
//         dispatch(userProfile(res.data));
//         dispatch(endLoading({ key: ApiActions1.UPDATE_USER }));
//       })
//       .catch((err) => {
//         dispatch(endLoading({ key: ApiActions1.UPDATE_USER }));
//         showError(err);
//       });
//   };

// export const _updatePassword =
//   (data: IUpdatePassword, callBack?: () => void): AppThunk =>
//   (dispatch) => {
//     dispatch(startLoading({ key: ApiActions1.UPDATE_PASSWORD }));
//     updatePassword(data)
//       .then((res: IUpdatePasswordResponse) => {
//         dispatch(endLoading({ key: ApiActions1.UPDATE_PASSWORD }));
//         successPopUps(res?.meta?.message);
//         if (callBack) {
//           callBack();
//         }
//       })
//       .catch((err) => {
//         dispatch(endLoading({ key: ApiActions1.UPDATE_PASSWORD }));
//         errorPopup(err?.message as string);
//       });
//   };
// export const _deactivateUser =
//   (callBack?: () => void): AppThunk =>
//   (dispatch) => {
//     dispatch(startLoading({ key: ApiActions1.DEACTIVATE_USER }));
//     deactivateUser()
//       .then(() => {
//         dispatch(endLoading({ key: ApiActions1.DEACTIVATE_USER }));
//         if (callBack) {
//           callBack();
//         }
//       })
//       .catch((err) => {
//         dispatch(endLoading({ key: ApiActions1.DEACTIVATE_USER }));
//         errorPopup(err?.message as string);
//       });
//   };
// export const _logout = (callBack?: () => void): void => {
//   deleteCookie("user");
//   deleteCookie("token");
//   location.reload();
//   if (callBack) {
//     callBack();
//   }
// };

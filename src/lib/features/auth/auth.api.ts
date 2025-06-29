import { apiRoutes } from "@/utils/api.routes1";
import axios, { AxiosError, type AxiosResponse } from "axios";
import {
  type IResendOtpResponse,
  type IEmailOtpVerify,
  type IUserResponseToBeRegister,
  type IUserToBeRegister,
  type ISignInResponse,
  type IResetPasswordResponse,
  type IUserOld,
  type IUserResponse,
  type IUpdatePassword,
  type ISocialProviderData,
} from "@/utils/commonTypes";
import { api, getBaseUrl } from "@/utils";
import { errorPopup } from "@/app/components/common";
import { handleError } from "@/utils/helpers/errorHandler";
import { msgResponse } from "@/utils/messagesType";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@firebase";
import { IErrorResponse } from "@/utils/types/error.types";
import { setCookie } from "cookies-next";
import {
  IGoogleLoginResponse,
  IGoogleUserData,
} from "@/utils/types/auth.types";
import { message } from "antd";

export const UserInfoViaGoogle = async (): Promise<
  IGoogleUserData | undefined
> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();

    if (token) {
      setCookie("token", token);
    }
    return {
      token,
      uid: user.uid,
      phone: user.phoneNumber,
      email: user.email ?? "",
      name: user.displayName ?? "",
    };
  } catch (error) {
    return undefined;
  }
};
export const googleLink = async (): Promise<
  AxiosResponse<IGoogleLoginResponse["data"]> | undefined
> => {
  try {
    const userData = await UserInfoViaGoogle();
    if (!userData) {
      throw new Error("User data not available.");
    }
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${getBaseUrl()}/api${apiRoutes.auth.name}${apiRoutes.auth.googleLogin}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    const res = await axios.request<IGoogleLoginResponse["data"]>(config);
    return res;
  } catch (error) {
    console.error("Google sign-in failed:", error);
  }
};

export const signupContractor = async (
  user: IGoogleUserData
): Promise<{ data: IUserResponseToBeRegister }> =>
  await new Promise((resolve, reject) => {
    const data = JSON.stringify(user);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${getBaseUrl()}/api${apiRoutes.auth.name}${apiRoutes.auth.signup.name}${apiRoutes.auth.signup.contractor}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data,
    };
    axios
      .request(config)
      .then((response) => {
        resolve({ data: response.data });
      })
      .catch((error: AxiosError) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.data) {
            const errorData = error.response.data as IErrorResponse;
            if (errorData.error) {
              errorPopup(errorData.error);
            } else {
              errorPopup("An unexpected error occurred");
            }
          }
        }
        reject(error);
      });
  });

export const signUpUser = async (
  user: IUserToBeRegister
): Promise<{ data: IUserResponseToBeRegister }> =>
  await new Promise((resolve, reject) => {
    const data = JSON.stringify(user);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${getBaseUrl()}${apiRoutes.auth.name}${apiRoutes.auth.create}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data,
    };
    axios
      .request(config)
      .then((response) => {
        resolve({ data: response.data });
      })
      .catch((error) => {
        reject(error);
      });
  });

export const verifyEmail = async (
  oobCode: string,
  uid: string
): Promise<{ data: any }> => {
  return await new Promise((resolve, reject) => {
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${getBaseUrl()}/api${apiRoutes.auth.name}${apiRoutes.auth.verifyEmail}?ooCode=${oobCode}&uid=${uid}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    axios
      .request(config)
      .then((response) => {
        resolve({ data: response.data });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const resendOtp = async (
  email: string
): Promise<{ data: IResendOtpResponse }> =>
  await new Promise((resolve, reject) => {
    const data = JSON.stringify({
      email,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${getBaseUrl()}${apiRoutes.auth.name}${apiRoutes.auth.resentOtp}`,
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      data,
    };
    axios
      .request(config)
      .then((response) => {
        resolve({ data: response.data });
      })
      .catch((error) => {
        reject(error);
      });
  });
export const signIn = async (
  email: string,
  password: string
): Promise<{ data: ISignInResponse }> =>
  await new Promise((resolve, reject) => {
    const data = JSON.stringify({
      email,
      password,
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${getBaseUrl()}${apiRoutes.auth.name}${apiRoutes.auth.login}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data,
    };
    axios
      .request(config)
      .then((response) => {
        resolve({ data: response.data });
      })
      .catch((error) => {
        reject(error);
      });
  });

export const loginWithEmail = async (
  email: string,
  password: string
): Promise<ISignInResponse> => {
  try {
    const data = { email, password };

    const config = {
      method: "post",
      url: `${getBaseUrl()}/api${apiRoutes.auth.name}${apiRoutes.auth.login}`,
      data,
    };

    const response = await axios.request<ISignInResponse>(config);
    console.log("Response from loginWithEmail:", response);
    return {
      data: {
        token: response?.data?.data.token,
        refreshToken: response?.data?.data.refreshToken,
        user: {
          email: response?.data?.data?.user.email,
          name: response?.data?.data.user.name,
        },
      },
      meta: {
        status: 200,
        message: "login successfully",
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.meta?.message ||
        "Invalid credentials";

      throw new Error(message);
    }

    throw new Error(msgResponse.unKnowError || "Unknown error occurred");
  }
};

export const forgotPassword = async (email: string): Promise<boolean | Error> =>
  await new Promise<boolean | Error>((resolve, reject) => {
    const data = JSON.stringify({
      email,
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${getBaseUrl()}${apiRoutes.auth.name}${apiRoutes.auth.forgotPassword}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data,
    };
    axios
      .request(config)
      .then((response) => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
export const getCurrentUser = async (): Promise<IUserOld> =>
  await new Promise<IUserOld>((resolve, reject) => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiRoutes.person.name}${apiRoutes.auth.me}`,
    };
    api
      .request(config)
      .then((response) => {
        resolve(response.data.data as IUserOld);
      })
      .catch((error) => {
        reject(error);
      });
  });
// eslint-disable-next-line prettier/prettier
export const updateUserInfo = async (
  data: Partial<IUserOld>
): Promise<IUserResponse> => {
  try {
    const response: AxiosResponse<IUserResponse> = await api.request({
      method: "patch",
      url: `${apiRoutes.person.name}${apiRoutes.person.update}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
export const updateProfilePicture = async (
  formData: FormData
): Promise<IUserResponse> => {
  try {
    const response: AxiosResponse<IUserResponse> = await api.request({
      method: "patch",
      maxBodyLength: Infinity,
      url: `${apiRoutes.person.name}${apiRoutes.person.updateProfilePicture}`,
      headers: {
        accept: "multipart/form-data",
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
export const resetPassword = async (
  email: string,
  otpCode: string,
  password: string
): Promise<{ data: IResetPasswordResponse }> =>
  await new Promise((resolve, reject) => {
    const data = JSON.stringify({
      email,
      otpCode,
      password,
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${getBaseUrl()}${apiRoutes.auth.name}${apiRoutes.auth.resetPassword}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data,
    };
    axios
      .request(config)
      .then((response) => {
        resolve({ data: response.data });
      })
      .catch((error) => {
        reject(error);
      });
  });

export const updatePassword = async (
  data: Partial<IUpdatePassword>
): Promise<IUserResponse> =>
  await api
    .request({
      method: "post",
      url: `${apiRoutes.person.name}${apiRoutes.person.updatePassword}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    })
    .then(async (response: AxiosResponse<IUserResponse>) => {
      if (
        response.data.meta.status === 200 ||
        response.data.meta.status === 201
      ) {
        return response.data;
      } else {
        return await Promise.reject(
          new Error(`Unexpected status code: ${response.data.meta.status}`)
        );
      }
    })
    .catch(async (error: IUserResponse) => await handleError(error));

export const deactivateUser = async (): Promise<IUserResponse> => {
  try {
    const response: AxiosResponse<IUserResponse> = await api.request({
      method: "delete",
      url: `${apiRoutes.person.name}${apiRoutes.person.delete}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.data as string);
    } else {
      throw new Error(msgResponse.unKnowError);
    }
  }
};

export const socialProvider = async (
  userInfo: ISocialProviderData
): Promise<{ data: ISignInResponse }> => {
  try {
    const response = await axios.request({
      method: "post",
      url: `${getBaseUrl()}${apiRoutes.auth.name}${apiRoutes.auth.socialAuth}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: userInfo,
    });

    return { data: response.data };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message || "An error occurred");
    } else {
      throw new Error(msgResponse.unKnowError);
    }
  }
};

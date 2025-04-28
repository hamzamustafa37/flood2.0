import { apiRoutes } from "@/utils/api.routes1";
import axios, { AxiosError, type AxiosResponse } from "axios";
import {
  type IResendOtpResponse,
  type IEmailOtpVerify,
  type IUserResponseToBeRegister,
  type IUserToBeRegister,
  type ISignInResponse,
  type IResetPasswordResponse,
  type IUser,
  type IUserResponse,
  type IUpdatePassword,
  type ISocialProviderData,
} from "@/utils/commonTypes";
import { api, getBaseUrl } from "@/utils";
import { errorPopup } from "@/app/components/common";
import { handleError } from "@/utils/helpers/errorHandler";
import { msgResponse } from "@/utils/messagesType";

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

export const verifyOtp = async (
  email: string,
  otpCode: string
): Promise<{ data: IEmailOtpVerify }> =>
  await new Promise((resolve, reject) => {
    const data = JSON.stringify({
      email,
      otpCode,
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${getBaseUrl()}${apiRoutes.auth.name}${apiRoutes.auth.otp}`,
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
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.meta?.message?.message;
          if (typeof message === "string") {
            errorPopup(message);
          } else {
            errorPopup("An unexpected error occurred");
          }
        }
        reject(error);
      });
  });

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
export const getCurrentUser = async (): Promise<IUser> =>
  await new Promise<IUser>((resolve, reject) => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiRoutes.person.name}${apiRoutes.auth.me}`,
    };
    api
      .request(config)
      .then((response) => {
        resolve(response.data.data as IUser);
      })
      .catch((error) => {
        reject(error);
      });
  });
// eslint-disable-next-line prettier/prettier
export const updateUserInfo = async (
  data: Partial<IUser>
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

import { errorPopup } from "@/app/components/common";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
// import { signOut } from 'next-auth/react';
import { appRoute } from "./constants";
import { msgResponse } from "./messagesType";

const axiosInterface = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
});
// Request interceptor
axiosInterface.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token !== "") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    const msg = error.response.data.message;
    if (Array.isArray(msg)) {
      errorPopup(msg[0] as string);
    } else if (
      ![
        "un-authorized!",
        "unauthorized!",
        "un-authorized",
        "unauthorized",
      ].includes(msg as string)
    ) {
      errorPopup(msg as string);
    }
    throw error;
  }
);
// Response interceptor
axiosInterface.interceptors.response.use(
  (response) => response,
  (error: any) => {
    const msg = error.response.statusText;
    const message = msg?.toLowerCase() as string;

    if (
      error.status === 401 &&
      [
        "un-authorized!",
        "unauthorized!",
        "un-authorized",
        "unauthorized",
      ].includes(message) &&
      getCookie("token") !== ""
    ) {
      // await signOut({ redirect: false });
      errorPopup(msgResponse.sessionExpire);
      deleteCookie("token");
      deleteCookie("user");
      setTimeout(() => {
        window.location.href = appRoute.default;
      }, 2000);
    }
    throw error;
  }
);

export const api = axiosInterface;

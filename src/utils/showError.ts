import { errorPopup } from "@/app/components/common";

export const getNextRoute = (current: string, nextRoute: string): string =>
  // const lang = current.split('/')[1];
  // return `/${lang}${nextRoute}`;
  `${nextRoute}`;

export const getBaseUrl = (): string => process.env.NEXT_PUBLIC_BASE_URL ?? "";

export const showError = (error: any): void => {
  const msg = error?.response?.data?.meta?.message;
  if (Array.isArray(msg)) {
    errorPopup(msg[0] as string);
  } else if (msg) {
    errorPopup(msg as string);
  }
};

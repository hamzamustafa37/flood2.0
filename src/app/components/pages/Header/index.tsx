import { Button } from "@/app/components/common";
import { ButtonType } from "@/utils/commonTypes";
import { appRoute } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Header = (): React.ReactElement => {
  return (
    <header className="bg-blueThemeColor shadow-md">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/">
            <Image
              width={142}
              height={52}
              alt="logo"
              src="/images/logo.svg"
              className="cursor-pointer"
            />
          </Link>

          {/* Right side (desktop only) */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              href="tel:8334240044"
              className="flex items-center text-white hover:text-gray-300"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 0C6.71625 0 0 6.71625 0 15C0 23.2838 6.71625 30 15 30C23.2838 30 30 23.2838 30 15C30 6.71625 23.2838 0 15 0ZM19.3062 22.2837C14.7013 24.3888 7.555 10.4963 12.0563 8.14875L13.3725 7.5L15.555 11.7613L14.2525 12.4025C12.8838 13.1362 15.7337 18.7025 17.1337 18.0238L18.4237 17.3925L20.6238 21.6388L19.3062 22.2837Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span className="ml-2 text-lg font-semibold">(833) 424-0044</span>
            </Link>

            <Link href={appRoute.book}>
              <Button
                className="!px-5 !py-2.5 text-[12px] w-[107px] font-bold h-[42px] !bg-[var(--color-secondary)] !text-[var(--color-text-dark)]"
                type={ButtonType.Button}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

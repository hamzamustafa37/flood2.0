"use client";
import { Button, MenuIcon, SvgIcon } from "@/app/components/common";
import { ButtonType } from "@/utils/commonTypes";
import { appRoute, imagesPath } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Header: React.FC = (): React.ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = (): void => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  React.useEffect(() => {
    const handleResize = (): void => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="bg-[var(--color-background)] shadow-md">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between pt-3">
          <ul
            className={`lg:flex justify-between gap-4 lg:gap-5 py-2 lg:static absolute z-20 bg-white lg:bg-transparent w-full lg:w-auto left-0 lg:left-auto transition-all duration-300 ease-in-out transform
              lg:max-h-full lg:opacity-100 lg:visible lg:flex-row flex-col items-center lg:mt-0 mt-8`}
          >
            <li className="font-medium hover:text-[var(--color-accent)] xl:text-base text-xs py-1 lg:py-0">
              <Link href="/">
                <Image
                  width={142}
                  height={52}
                  alt="logo"
                  src="../images/logo.svg"
                />
              </Link>
            </li>
          </ul>

          <div className="py-2 items-center gap-5 hidden lg:flex">
            <Link
              href=""
              className="flex items-center text-[var(--color-text-light)]"
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
                  fill="var(--color-text-light)"
                ></path>
              </svg>
              <span className="ml-2 text-lg text-[var(--color-text)] hover:text-gray-400 font-semibold">
                (833) 424-0044
              </span>
            </Link>
            <Link href={appRoute.book}>
              <Button
                className="!px-5 !py-2.5 xl:text-[12px] w-[107px] font-bold h-[42px] !bg-[var(--color-secondary)] !text-[var(--color-text-dark)]"
                type={ButtonType.Button}
                onClick={() => {}}
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

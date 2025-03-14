import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-[var(--color-background)] py-5">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-wrap justify-between">
        <div>
          <ul>
            <li>
              <Image
                src="../images/logo.svg"
                width={142}
                height={52}
                alt="logo"
              />
            </li>
            <li className="flex gap-3 mt-5">
              <a className=" cursor-pointer">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 0C6.71625 0 0 6.71625 0 15C0 23.2838 6.71625 30 15 30C23.2838 30 30 23.2838 30 15C30 6.71625 23.2838 0 15 0ZM18.75 10H17.0625C16.39 10 16.25 10.2762 16.25 10.9725V12.5H18.75L18.4888 15H16.25V23.75H12.5V15H10V12.5H12.5V9.615C12.5 7.40375 13.6638 6.25 16.2863 6.25H18.75V10Z"
                    fill="#3388BB"
                  ></path>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/thefloodteam/">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 0C6.71625 0 0 6.71625 0 15C0 23.2838 6.71625 30 15 30C23.2838 30 30 23.2838 30 15C30 6.71625 23.2838 0 15 0ZM12.5 20H10V12.5H12.5V20ZM11.25 11.3863C10.4913 11.3863 9.875 10.7662 9.875 10C9.875 9.235 10.49 8.61375 11.25 8.61375C12.01 8.61375 12.625 9.235 12.625 10C12.625 10.7662 12.0087 11.3863 11.25 11.3863ZM21.25 20H18.7525V16.4237C18.7525 14.0725 16.25 14.2712 16.25 16.4237V20H13.75V12.5H16.25V13.8663C17.34 11.8463 21.25 11.6962 21.25 15.8012V20Z"
                    fill="#3388BB"
                  ></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/thefloodteam/">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5363 7.8775C17.6138 7.835 17.3363 7.8275 15 7.8275C12.6637 7.8275 12.3875 7.83625 11.465 7.8775C9.09125 7.98625 7.98625 9.11 7.8775 11.465C7.83625 12.3875 7.82625 12.6637 7.82625 15C7.82625 17.3363 7.83625 17.6125 7.8775 18.5363C7.98625 20.885 9.08625 22.015 11.465 22.1237C12.3862 22.165 12.6637 22.175 15 22.175C17.3375 22.175 17.6138 22.1662 18.5363 22.1237C20.91 22.0162 22.0138 20.8888 22.1237 18.5363C22.165 17.6138 22.1737 17.3363 22.1737 15C22.1737 12.6637 22.165 12.3875 22.1237 11.465C22.0138 9.11125 20.9075 7.98625 18.5363 7.8775ZM15 19.4937C12.5188 19.4937 10.5062 17.4825 10.5062 15C10.5062 12.5188 12.5188 10.5075 15 10.5075C17.4813 10.5075 19.4937 12.5188 19.4937 15C19.4937 17.4813 17.4813 19.4937 15 19.4937ZM19.6713 11.38C19.0913 11.38 18.6213 10.91 18.6213 10.33C18.6213 9.75 19.0913 9.28 19.6713 9.28C20.2513 9.28 20.7212 9.75 20.7212 10.33C20.7212 10.9087 20.2513 11.38 19.6713 11.38ZM17.9163 15C17.9163 16.6112 16.61 17.9163 15 17.9163C13.39 17.9163 12.0837 16.6112 12.0837 15C12.0837 13.3888 13.39 12.0837 15 12.0837C16.61 12.0837 17.9163 13.3888 17.9163 15ZM15 0C6.71625 0 0 6.71625 0 15C0 23.2838 6.71625 30 15 30C23.2838 30 30 23.2838 30 15C30 6.71625 23.2838 0 15 0ZM23.6975 18.6075C23.5538 21.7887 21.7825 23.5513 18.6087 23.6975C17.675 23.74 17.3762 23.75 15 23.75C12.6237 23.75 12.3263 23.74 11.3925 23.6975C8.2125 23.5513 6.44875 21.7862 6.3025 18.6075C6.26 17.675 6.25 17.3762 6.25 15C6.25 12.6237 6.26 12.3263 6.3025 11.3925C6.44875 8.2125 8.21375 6.44875 11.3925 6.30375C12.3263 6.26 12.6237 6.25 15 6.25C17.3762 6.25 17.675 6.26 18.6087 6.30375C21.79 6.45 23.555 8.21875 23.6975 11.3925C23.74 12.3263 23.75 12.6237 23.75 15C23.75 17.3762 23.74 17.675 23.6975 18.6075Z"
                    fill="#3388BB"
                  ></path>
                </svg>
              </a>
              <a href="https://www.youtube.com/c/Thefloodteam">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 0C6.71625 0 0 6.71625 0 15C0 23.2838 6.71625 30 15 30C23.2838 30 30 23.2838 30 15C30 6.71625 23.2838 0 15 0ZM20.5513 21.115C17.9237 21.295 12.0712 21.295 9.4475 21.115C6.6025 20.92 6.27125 19.5275 6.25 15C6.27125 10.4637 6.60625 9.08 9.4475 8.885C12.0712 8.705 17.925 8.705 20.5513 8.885C23.3975 9.08 23.7275 10.4725 23.75 15C23.7275 19.5362 23.3937 20.92 20.5513 21.115ZM12.5 12.0725L18.6462 14.995L12.5 17.9275V12.0725Z"
                    fill="#3388BB"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-[#3CA6DD] font-semibold text-lg">
            Opportunities
          </h5>
          <ul className="flex gap-4   flex-col">
            <li>
              <Link href="#">
                <span className="text-sm text-[var(--color-text)] hover:text-gray-400  font-medium">
                  Join us
                </span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <span className="text-sm font-medium text-[var(--color-text)] hover:text-gray-400 ">
                  Investors
                </span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <span className="text-sm font-medium text-[var(--color-text)] hover:text-gray-400">
                  Franchise With Us
                </span>
              </Link>
            </li>
          </ul>
        </div>
        {/* 2nd level */}
        <div>
          <h5 className="text-[#3CA6DD] font-semibold text-lg">Services</h5>
          <ul className="flex gap-4   flex-col">
            <li>
              <Link href="#">
                <span className="text-sm text-[var(--color-text)] hover:text-gray-400  font-medium">
                  Water Damage Repair
                </span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <span className="text-sm font-medium text-[var(--color-text)] hover:text-gray-400 ">
                  Basement Flooding
                </span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <span className="text-sm font-medium text-[var(--color-text)] hover:text-gray-400">
                  Sewage Backup
                </span>
              </Link>
            </li>
          </ul>
        </div>
        {/* 3rd */}
        <div>
          <h5 className="text-[#3CA6DD] font-semibold text-lg">Company</h5>
          <ul className="flex gap-4   flex-col">
            <li>
              <Link href="#">
                <span className="text-sm text-[var(--color-text)] hover:text-gray-400  font-medium">
                  About Us
                </span>
              </Link>
            </li>
            <li>
              <Link href="#">
                <span className="text-sm font-medium text-[var(--color-text)] hover:text-gray-400 ">
                  Contact Us
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex justify-between w-full py-5 text-[var(--color-text)] hover:text-gray-400">
          <div className="text-[13px] font-medium">
            © 2024 The Flood Team. All right reserved.
          </div>
          <div className="flex gap-4">
            <Link href="#">
              <span className="text-[13px] font-medium text-[var(--color-text)] hover:text-gray-400 cursor-pointer">
                Privacy Policy
              </span>
            </Link>
            <Link href="#">
              <span className="text-[13px] font-medium text-[var(--color-text)] hover:text-gray-400 cursor-pointer">
                Terms of Use
              </span>
            </Link>
          </div>
        </div>
      </div>
      ;
    </footer>
  );
};

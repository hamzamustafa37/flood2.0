"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { imagesPath } from "@/utils/constants";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const PrivateHeader: React.FC = () => {
  const [themeName, setThemeName] = useState("companyA");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setThemeName(storedTheme);
    }
  }, []);

  const changeTheme = () => {
    const newTheme = themeName === "companyA" ? "companyB" : "companyA";
    setThemeName(newTheme);
    localStorage.setItem("theme", newTheme);
    window.location.reload();
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[var(--color-background)] shadow-md">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center text-center lg:flex ms-2 pb-0">
          <h1
            className="text-center mt-3 text-2xl"
            style={{ color: "var(--color-text)" }}
          >
            Flood Team
          </h1>
        </div>

        <div className="items-center lg:flex">
          <Input
            placeholder="Search"
            className="rounded-full w-[400px] bg-[var(--color-background)] text-[var(--color-text)]"
            prefix={<SearchOutlined style={{ color: "var(--color-text)" }} />}
          />
        </div>

        {/* Icons */}
        <div className="items-center lg:flex">
          <div className="flex">
            <Image
              src={imagesPath.darkNLights}
              alt="logo"
              width={40}
              height={40}
              className="mx-2"
              onClick={changeTheme}
            />
            <Image
              src={imagesPath.alertIcon}
              alt="alert"
              width={25}
              height={25}
              className="mx-2"
            />
            <Image
              src={imagesPath.menuToggle}
              alt="menu"
              width={25}
              height={25}
              className="mx-2"
            />
            <Image
              src={imagesPath.avatar}
              alt="avatar"
              width={40}
              height={40}
              className="mx-2 rounded-full border-2 border-[var(--color-primary)]"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

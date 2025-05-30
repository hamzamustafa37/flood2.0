"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { imagesPath } from "@/utils/constants";
import { Input, Badge, Dropdown, Menu, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FiMenu } from "react-icons/fi";
import { hasCookie, deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface ICHeaderProps {
  onToggle: () => void;
  onMobileToggle: () => void;
}

export const CHeader: React.FC<ICHeaderProps> = ({ onToggle }) => {
  const router = useRouter();
  const [themeName, setThemeName] = useState("companyA");
  const username = getCookie("user"); // Example: if you store it in cookies

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

  const handleLogout = () => {
    deleteCookie("user");
    deleteCookie("token");
    message.success("Logged out successfully");
    router.push("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="username" disabled>
        Signed in as <strong>{username || "User"}</strong>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="flex items-center justify-between p-3 md:p-4">
        <div className="md:hidden">
          <button onClick={onToggle} className="p-1">
            <FiMenu size={28} />
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <h1
            className="text-xl md:text-2xl font-bold"
            style={{ color: "var(--color-text)" }}
          >
            Flood Team
          </h1>
        </div>

        <div className="hidden md:flex items-center flex-1 justify-center px-4">
          <Input
            placeholder="Search"
            className="rounded-full w-full max-w-md bg-[var(--color-background)] text-[var(--color-text)]"
            prefix={<SearchOutlined style={{ color: "var(--color-text)" }} />}
          />
        </div>

        <div className="flex items-center space-x-3">
          <Image
            src={imagesPath.darkNLights}
            alt="toggle-theme"
            width={36}
            height={36}
            className="cursor-pointer"
            onClick={changeTheme}
          />
          <Badge count={3} size="small">
            <Image
              src={imagesPath.alertIcon}
              alt="alerts"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </Badge>
          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <Image
              src={imagesPath.avatar}
              alt="avatar"
              width={36}
              height={36}
              className="rounded-full border-2 border-[var(--color-primary)] cursor-pointer"
            />
          </Dropdown>
        </div>
      </div>

      <div className="px-3 pb-2 md:hidden">
        <Input
          placeholder="Search"
          className="rounded-full w-full bg-[var(--color-background)] text-[var(--color-text)]"
          prefix={<SearchOutlined style={{ color: "var(--color-text)" }} />}
        />
      </div>
    </header>
  );
};

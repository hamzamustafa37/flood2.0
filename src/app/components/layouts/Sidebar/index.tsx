"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/app/hooks";
import { getBaseUrl } from "@/utils";
import { sideBarMenu } from "@/utils/helpers/sidebarOption";
import { FiMenu, FiX } from "react-icons/fi";

interface ISidebar {
  readonly isToggled: boolean;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<ISidebar> = ({
  isToggled,
  collapsed,
  setCollapsed,
}) => {
  const { currentUser } = useCurrentUser();
  const pathname = usePathname();
  const [profileImage, setProfileImage] = React.useState<string>("");

  React.useEffect(() => {
    if (!currentUser?.imgUrl) {
      setProfileImage("/images/avatar.svg");
    } else if (currentUser.imgUrl.startsWith("https:")) {
      setProfileImage(currentUser.imgUrl);
    } else {
      setProfileImage(`${getBaseUrl()}/${currentUser.imgUrl}`);
    }
  }, [currentUser?.imgUrl]);

  return (
    <aside
      className={`fixed left-0 top-[70px] bg-[var(--color-background)] ${
        collapsed ? "w-[80px]" : "w-[268px]"
      } h-[calc(100vh-70px)] z-20 py-6 px-4 border-r border-[#d9d9d9] transition-all duration-300 ${
        isToggled ? "block" : "hidden md:block"
      }`}
    >
      {collapsed ? (
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="bg-gray-200 p-1 rounded"
          >
            <FiMenu size={20} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="bg-gray-200 p-1 rounded"
        >
          <FiX size={20} />
        </button>
      )}
      <div className="h-full overflow-y-auto">
        <ul className="space-y-2">
          {sideBarMenu.map((menu) => (
            <div key={menu.group}>
              {!collapsed && (
                <p className="text-xs text-[var(--color-text)] uppercase mt-4 px-2">
                  {menu.group}
                </p>
              )}
              {menu.option.map((item) => (
                <li key={item.title}>
                  <Link
                    className={`flex items-center text-[var(--color-text)] text-sm rounded-lg px-2 py-2 m-2 transition-colors ${
                      pathname === item.link
                        ? "bg-lightGray text-white"
                        : "hover:bg-lightGray hover:text-white"
                    }`}
                    href={item.link}
                  >
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={25}
                      height={25}
                    />
                    {!collapsed && <span className="ms-3">{item.title}</span>}
                  </Link>
                </li>
              ))}
            </div>
          ))}
        </ul>
      </div>
    </aside>
  );
};

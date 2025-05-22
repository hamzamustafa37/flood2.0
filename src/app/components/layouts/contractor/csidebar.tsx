"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// import { useCurrentUser } from "@/app/hooks";
import { getBaseUrl } from "@/utils";
import {
  contractorSideBarMenu,
  sideBarMenu,
} from "@/utils/helpers/sidebarOption";
import { FiMenu, FiX } from "react-icons/fi";
import { Tag } from "antd";

interface ISidebar {
  readonly collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CSidebar: React.FC<ISidebar> = ({
  collapsed,
  setCollapsed,
  mobileSidebarOpen,
  setMobileSidebarOpen,
}) => {
  // const { currentUser } = useCurrentUser();
  const pathname = usePathname();
  // const [profileImage, setProfileImage] = React.useState<string>("");

  // React.useEffect(() => {
  //   if (!currentUser?.imgUrl) {
  //     setProfileImage("/images/avatar.svg");
  //   } else if (currentUser.imgUrl.startsWith("https:")) {
  //     setProfileImage(currentUser.imgUrl);
  //   } else {
  //     setProfileImage(`${getBaseUrl()}/${currentUser.imgUrl}`);
  //   }
  // }, [currentUser?.imgUrl]);

  React.useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [mobileSidebarOpen]);

  return (
    <>
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside
        className={`h-screen overflow-y-scroll fixed top-0 left-0 bg-white z-30 pb-6 pl-4 border-r border-[#d9d9d9]
          transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] 
          ${collapsed ? "w-[80px]" : "w-[268px]"}
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:block min-h-screen`}
        style={{ zIndex: 200 }}
      >
        <div
          className={`hidden justify-center ${!collapsed && "md:justify-end"} mb-4`}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="bg-gray-200 p-1 rounded"
          >
            {collapsed ? <FiMenu size={20} /> : <FiX size={20} />}
          </button>
        </div>

        <div className="">
          <ul className="space-y-2 my-4">
            {contractorSideBarMenu.map((menu) => (
              <div key={menu.group}>
                {menu.option.map((item) => (
                  <li key={item.title} className="my-1 mr-2">
                    {item.active ? (
                      <Link
                        className={`flex items-center text-center text-[var(--color-text)] text-sm rounded-lg px-3 py-2 transition-colors ${
                          pathname === item.link
                            ? "bg-selectedGray text-white"
                            : "hover:bg-selectedGray hover:text-blueThemeColor"
                        }`}
                        href={item.link}
                      >
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={25}
                          height={25}
                          style={{ opacity: item.active ? 1 : 0.4 }}
                        />
                        {!collapsed && (
                          <span className=" text-center ms-3">
                            {item.title}
                          </span>
                        )}
                        {item?.tag && !collapsed && (
                          <Tag className="ms-2" color="volcano">
                            {item?.tag}
                          </Tag>
                        )}
                      </Link>
                    ) : (
                      <div
                        className="flex items-center text-center text-gray-400 text-sm rounded-lg px-2 py-2 cursor-not-allowed opacity-50"
                        title="Disabled"
                      >
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={25}
                          height={25}
                          style={{ opacity: 0.4 }}
                        />
                        {!collapsed && (
                          <span className=" text-center ms-3">
                            {item.title}
                          </span>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

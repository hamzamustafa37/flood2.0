"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// import { useCurrentUser } from "@/app/hooks";
import { getBaseUrl } from "@/utils";
import { sideBarMenu } from "@/utils/helpers/sidebarOption";
import { FiMenu, FiX } from "react-icons/fi";

interface ISidebar {
  readonly collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<ISidebar> = ({
  collapsed,
  setCollapsed,
  mobileSidebarOpen,
  setMobileSidebarOpen,
}) => {
  // const { currentUser } = useCurrentUser();
  const pathname = usePathname();
  const [profileImage, setProfileImage] = React.useState<string>("");

  // React.useEffect(() => {
  //   if (!currentUser?.imgUrl) {
  //     setProfileImage("/images/avatar.svg");
  //   } else if (currentUser.imgUrl.startsWith("https:")) {
  //     setProfileImage(currentUser.imgUrl);
  //   } else {
  //     setProfileImage(`${getBaseUrl()}/${currentUser.imgUrl}`);
  //   }
  // }, [currentUser?.imgUrl]);

  // Close sidebar on mobile route change
  React.useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileSidebarOpen]);
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 bg-[var(--color-background)] h-full z-30 pb-6 px-4 border-r border-[#d9d9d9]
    overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
    ${collapsed ? "w-[80px]" : "w-[268px]"}
    ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 md:static md:block`}
      >
        {/* Collapse toggle (only md+) */}
        <div
          className={`"hidden  flex justify-center ${!collapsed && "md:justify-end"} mb-4"`}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="bg-gray-200 p-1 rounded"
          >
            {collapsed ? <FiMenu size={20} /> : <FiX size={20} />}
          </button>
        </div>

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
    </>
  );
};

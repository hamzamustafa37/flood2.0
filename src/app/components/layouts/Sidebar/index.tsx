"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { appRoute } from "@/utils/constants";
import { useCurrentUser } from "@/app/hooks";
import { loading } from "@/lib/features/global";
import { getBaseUrl } from "@/utils";
import { sideBarMenu } from "@/utils/helpers/sidebarOption";

interface ISidebar {
  readonly isToggled: boolean;
}

export const Sidebar: React.FC<ISidebar> = ({ isToggled }) => {
  // const _loading = useSelector(loading);
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
      className={`fixed left-0 top-[70px] bg-[var(--color-background)] w-[268px] h-[calc(100vh-70px)] z-20 py-6 px-6 border-r border-[#d9d9d9] transition-all ${
        isToggled ? "block" : "hidden md:block"
      }`}
    >
      <div className="h-full overflow-y-auto ">
        <ul className="space-y-2">
          {sideBarMenu.map((menu) => (
            <div key={menu.group}>
              <p className="text-xs text-[var(--color-text)] hover:text-gray-400-500 uppercase mt-4">
                {menu.group}
              </p>
              {menu.option.map((item) => (
                <li key={item.title}>
                  <Link
                    className={`flex items-center text-[var(--color-text)] hover:text-gray-400 text-sm rounded-lg px-2 py-2 m-2 ${
                      pathname === item.link
                        ? "bg-white border-linkBorder"
                        : "border-bgSidebar"
                    }`}
                    href={item.link}
                  >
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={15}
                      height={18}
                    />
                    <span className="ms-3">{item.title}</span>
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

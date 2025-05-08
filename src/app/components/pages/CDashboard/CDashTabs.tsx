import { cDashboardTab } from "@/utils";
import { Tag } from "antd";
import Image from "next/image";
import React from "react";

const CDashTabs = () => {
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-2">
      {cDashboardTab.map((tab, index) => {
        return (
          <div
            className=" bg-[var(--color-tilesColor)] border border-[#E3E6ED] rounded-md"
            key={index}
          >
            <div className="py-3 px-6">
              <div className="flex items-center justify-start py-4">
                <Image src={tab.icon} alt="icon" height={35} width={35} />

                <div className="mx-2">
                  <p className="text-textMuted mb-0 text-sm">{tab.strapLine}</p>
                </div>
              </div>
              <div className="flex items-center justify-start">
                <p className="m-0 text-2xl text-primaryBlue font-semibold">
                  {tab.value}
                </p>
                <div className="mx-2">
                  {" "}
                  <p className="text-[var(--color-text)] m-0 text-sm">
                    {tab.title}
                  </p>
                </div>
                <div className="mx-2">
                  {tab.tag !== "" && <Tag color="green">{tab.tag}</Tag>}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CDashTabs;

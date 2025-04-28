import { imagesPath } from "@/utils";
import { Tag } from "antd";
import Image from "next/image";
import React from "react";

const UserInfoTabs = () => {
  const theme = "light";

  const tilesData = [
    {
      icon: imagesPath.userGroup,
      title: "Total Users",
      description: "All-time users",
      count: "254",
      tag: "",
      color: "#3874FF",
    },
    {
      icon: imagesPath.user,
      title: "Total Users",
      description: "Active User",
      count: "187",
      tag: "",
      color: "#3874FF",
    },
    {
      icon: imagesPath.userAlert,
      title: "Pro Members",
      description: "Highlighted Role",
      count: "18",
      color: "#3874FF",
    },
    {
      icon: imagesPath.userBuilding,
      title: "Companies Associated",
      description: "Distinct companies",
      count: "12",
      color: "#3874FF",
    },
    {
      icon: imagesPath.userLocation,
      title: "Locations Covered",
      description: "Based on “Primary Locations” field",
      count: "18",
      color: "#3874FF",
    },
  ];

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-4">
      {tilesData.map((tile, index) => (
        <div
          key={index}
          className={`${
            theme === "light"
              ? "bg-white border-[#E3E6ED]"
              : "bg-black border-black"
          } border-2 rounded-md`}
        >
          <div className="py-4 px-6">
            <div className="flex items-center py-3">
              <Image src={tile.icon} alt="icon" height={35} width={35} />
              <div className="ml-3">
                <p className="text-gray-500 text-sm m-0">{tile.description}</p>
              </div>
            </div>

            <div className="flex items-center">
              <h2
                className="m-0 font-bold"
                style={{ color: tile.color, fontSize: "32px" }}
              >
                {tile.count}
              </h2>
              <div className="ml-2">
                <p
                  className="text-gray-800 text-base font-medium m-0"
                  style={{ fontSize: "20px" }}
                >
                  {tile.title}
                </p>
              </div>
              {tile.tag && (
                <div className="ml-3">
                  <Tag
                    color="green"
                    style={{ fontSize: "12px", padding: "2px 6px" }}
                  >
                    {tile.tag}
                  </Tag>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserInfoTabs;

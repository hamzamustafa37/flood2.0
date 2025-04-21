import { imagesPath } from "@/utils";
import { Tag } from "antd";
import Image from "next/image";
import React from "react";

const CollectionInfoTabs = () => {
  const tilesData = [
    {
      icon: imagesPath.totalJobs,
      title: "Total Jobs",
      description: "Total number of collection jobs.",
      count: "325",
      tag: "",
      color: "#3874FF",
    },
    {
      icon: imagesPath.totalBills,
      title: "Total Billed",
      description: "Total number of collection jobs",
      count: `$1,250,000`,
      tag: "",
      color: "#3874FF",
    },
    {
      icon: imagesPath.totalCollected,
      title: "Total Collected",
      description: "Amount successfully collected",
      count: "$870,000",
      tag: "56%",
      color: "#25B003",
    },
    {
      icon: imagesPath.totalOutstanding,
      title: "Total Outstanding",
      description: "Pending dues across all jobs",
      count: "$380,000",
      tag: "",
      color: "#3874FF",
    },
  ];
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-2">
      {tilesData.map((tile, index) => {
        return (
          <div className=" bg-[var(--color-tilesColor)] rounded-md" key={index}>
            <div className="py-3 px-6">
              <div className="flex items-center justify-start py-4">
                <Image src={tile.icon} alt="icon" height={35} width={35} />

                <div className="mx-2">
                  <p className="text-[var(--color-text)] mb-0 text-sm">
                    {tile.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-start">
                <p
                  style={{ color: tile.color }}
                  className="m-0 text-2xl font-semibold"
                >
                  {tile.count}
                </p>
                <div className="mx-2">
                  {" "}
                  <p className="text-[var(--color-text)] m-0 text-sm">
                    {tile.title}
                  </p>
                </div>
                <div className="mx-2">
                  {tile.tag !== "" && <Tag color="green">{tile.tag}</Tag>}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CollectionInfoTabs;

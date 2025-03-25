import { imagesPath } from "@/utils";
import Image from "next/image";
import React from "react";
import CampaignsTable from "./CampaignsTable";

const AllCampaigns = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="">
          <h3 className="text-2xl" style={{ color: "var(--color-text)" }}>
            Campaigns
          </h3>
          <p className="text-md text-textMuted">
            Manage and track your marketing campaigns effortlessly. View
            campaign details, performance, and settings at a glance.
          </p>
        </div>
        <div className=" flex items-center">
          <Image
            src={imagesPath.plusIcon}
            height={40}
            width={40}
            alt={"add icon"}
          />
        </div>
      </div>
      <CampaignsTable />
    </div>
  );
};
export default AllCampaigns;

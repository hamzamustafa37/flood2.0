import { imagesPath } from "@/utils";
import Image from "next/image";
import React from "react";
import CampaignsTable from "./CampaignsTable";
import TablePageHeader from "../../common/TablePage/TablePageHeader";

const AllCampaigns = () => {
  return (
    <div className="p-4">
      <TablePageHeader
        heading="Campaigns"
        strapLine=" Manage and track your marketing campaigns effortlessly. View
                        campaign details, performance, and settings at a glance."
      />
      <div className="p-4">
        <CampaignsTable />
      </div>
    </div>
  );
};
export default AllCampaigns;

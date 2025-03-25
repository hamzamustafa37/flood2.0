import { imagesPath } from "@/utils";
import Image from "next/image";
import React from "react";
import CampaignsTable from "./CampaignsTable";
import TablePageHeader from "../../common/TablePage/TablePageHeader";

const AllInventories = () => {
  return (
    <div className="p-4">
      <TablePageHeader
        heading="Inventory Modules"
        strapLine=" Manage and track your marketing campaigns effortlessly. View
                        campaign details, performance, and settings at a glance."
      />

      <CampaignsTable />
    </div>
  );
};
export default AllInventories;

"use client";
import React from "react";
import CampaignsTable from "./CampaignsTable";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import AddCampaignModal from "./addCampaign";

const AllCampaigns = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-4">
      <TablePageHeader
        heading="Campaigns"
        strapLine=" Manage and track your marketing campaigns effortlessly. View
                        campaign details, performance, and settings at a glance."
        enableModal={true}
        isOpen={open}
        setIsOpen={setOpen}
      />
      <div className="p-4">
        <CampaignsTable />
      </div>
      <AddCampaignModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};
export default AllCampaigns;

"use client";
import React from "react";
import CampaignsTable from "./CampaignsTable";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import LocationModal from "./locationModal";

const AllLocations = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-4">
      <TablePageHeader
        heading="Location Management"
        strapLine=" Manage and track your marketing campaigns effortlessly. View
                        campaign details, performance, and settings at a glance."
        isOpen={open}
        setIsOpen={setOpen}
        enableModal={true}
      />

      <div className="pt-4">
        {" "}
        <CampaignsTable />
      </div>
      <LocationModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};
export default AllLocations;

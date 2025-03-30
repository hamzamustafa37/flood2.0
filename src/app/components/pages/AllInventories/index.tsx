"use client";
import { imagesPath } from "@/utils";
import Image from "next/image";
import React from "react";
import CampaignsTable from "./CampaignsTable";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import InventoryModal from "./addInventoryModal";

const AllInventories = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-4">
      <TablePageHeader
        heading={"Inventory Modules"}
        strapLine={
          " Manage and track your marketing campaigns effortlessly. View campaign details, performance, and settings at a glance."
        }
        isOpen={open}
        setIsOpen={setOpen}
        enableModal={true}
      />
      <div className="py-3">
        <CampaignsTable />
      </div>
      <InventoryModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};
export default AllInventories;

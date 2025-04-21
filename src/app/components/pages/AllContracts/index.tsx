"use client";
import React from "react";
import TablePageHeader from "@/app/components/common/TablePage/TablePageHeader";
import ContractTable from "./ContractTable";

const AllContracts = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-4">
      <TablePageHeader
        heading={"Contract"}
        strapLine={
          "Manage and track your marketing campaigns effortlessly. View campaign details, performance, and settings at a glance."
        }
        isOpen={open}
        setIsOpen={setOpen}
        enableModal={true}
      />
      <div className="p-4">
        <ContractTable />
      </div>
    </div>
  );
};
export default AllContracts;

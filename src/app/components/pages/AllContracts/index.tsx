import React from "react";
import CompaniesTable from "./CompaniesTable";
import TablePageHeader from "@/app/components/common/TablePage/TablePageHeader";

const AllContracts = () => {
  return (
    <div className="p-4">
      <TablePageHeader
        heading={"Contract"}
        strapLine={
          "Manage and track your marketing campaigns effortlessly. View campaign details, performance, and settings at a glance."
        }
      />
      <div className="p-4">
        <CompaniesTable />
      </div>
    </div>
  );
};
export default AllContracts;

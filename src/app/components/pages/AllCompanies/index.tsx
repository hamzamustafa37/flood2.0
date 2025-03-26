import { imagesPath } from "@/utils";
import Image from "next/image";
import React from "react";
import CompaniesTable from "./CompaniesTable";
import TablePageHeader from "../../common/TablePage/TablePageHeader";

const AllCompanies = () => {
  return (
    <div className="p-4">
      <TablePageHeader
        heading="Companies"
        strapLine=" Manage and track your marketing campaigns effortlessly. View
            campaign details, performance, and settings at a glance."
      />
      <div className="p-4">
        <CompaniesTable />
      </div>
    </div>
  );
};
export default AllCompanies;

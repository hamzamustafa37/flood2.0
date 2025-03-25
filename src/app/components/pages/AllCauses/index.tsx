import { imagesPath } from "@/utils";
import Image from "next/image";
import React from "react";
import CausesTable from "./CausesTable";
import TablePageHeader from "../../common/TablePage/TablePageHeader";

const AllCauses = () => {
  return (
    <div className="p-4">
      <TablePageHeader
        heading="Causes Management"
        strapLine=" Manage and track your marketing campaigns effortlessly. View
                  campaign details, performance, and settings at a glance."
      />

      <CausesTable />
    </div>
  );
};
export default AllCauses;

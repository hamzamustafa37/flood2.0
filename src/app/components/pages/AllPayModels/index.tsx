import React from "react";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import PayModelsTable from "./PayTable";

const AllPayModelsOverview = () => {
  return (
    <div className="p-4">
      <TablePageHeader
        heading="Pay Models Overview"
        strapLine="Manage structured payment models for accurate payroll and expense distribution."
      />
      <div className="p-4">
        <PayModelsTable />
      </div>
    </div>
  );
};
export default AllPayModelsOverview;

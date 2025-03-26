import React from "react";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import PayModelsTable from "./PayablesTable";

const AllPayable = () => {
  return (
    <div className="p-4">
      <TablePageHeader
        heading="Payable Overview"
        strapLine="Manage structured payment models for accurate payroll and expense distribution."
      />
      <PayModelsTable />
    </div>
  );
};
export default AllPayable;

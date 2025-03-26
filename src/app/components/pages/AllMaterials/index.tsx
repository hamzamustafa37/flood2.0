import React from "react";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import MaterialTable from "./MaterialTable";

const AllMaterials = () => {
  return (
    <div className="p-4">
      <TablePageHeader
        heading="Materials Management"
        strapLine="Keep track of materials, their properties, and restoration potential for better resource planning."
      />
      <div className="p-4">
        <MaterialTable />
      </div>
    </div>
  );
};
export default AllMaterials;

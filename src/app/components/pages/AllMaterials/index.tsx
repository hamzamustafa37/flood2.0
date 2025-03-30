"use client";
import React from "react";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import MaterialTable from "./MaterialTable";
import AddMaterialModal from "./addMaterialModal";

const AllMaterials = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-4">
      <TablePageHeader
        heading="Materials Management"
        strapLine="Keep track of materials, their properties, and restoration potential for better resource planning."
        enableModal={true}
        isOpen={open}
        setIsOpen={setOpen}
      />
      <div className="p-4">
        <MaterialTable />
      </div>
      <AddMaterialModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};
export default AllMaterials;

"use client";
import React from "react";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import PayModelsTable from "./PayablesTable";
import AddPayableModal from "./addPayableModal";

const AllPayable = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-4">
      <TablePageHeader
        heading="Payable Overview"
        strapLine="Manage structured payment models for accurate payroll and expense distribution."
        enableModal={true}
        isOpen={open}
        setIsOpen={setOpen}
      />
      <div>
        <PayModelsTable />
      </div>
      <AddPayableModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};
export default AllPayable;

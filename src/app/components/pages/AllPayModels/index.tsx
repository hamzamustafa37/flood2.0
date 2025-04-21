"use client";
import React from "react";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import PayModelsTable from "./PayTable";
import AddPayModal from "./addPaymodal";

const AllPayModelsOverview = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-4">
      <TablePageHeader
        heading="Pay Models Overview"
        strapLine="Manage structured payment models for accurate payroll and expense distribution."
        enableModal={true}
        isOpen={open}
        setIsOpen={setOpen}
      />
      <div className="p-4">
        <PayModelsTable />
      </div>
      <AddPayModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};
export default AllPayModelsOverview;

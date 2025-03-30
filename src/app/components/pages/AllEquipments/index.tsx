"use client";

import React from "react";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import EquipmentTable from "./EquipmentTable";
import EquipmentAddModal from "./AddEquipment";

const AllEquipmentTable = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-4">
      <TablePageHeader
        heading={"Equipments"}
        strapLine={
          "Manage and track your marketing campaigns effortlessly. View campaign details, performance, and settings at a glance."
        }
        enableModal={true}
        isOpen={open}
        setIsOpen={setOpen}
      />
      <div className="py-4">
        <EquipmentTable />
      </div>
      <EquipmentAddModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};
export default AllEquipmentTable;

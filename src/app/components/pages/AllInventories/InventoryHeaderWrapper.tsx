"use client";
import React from "react";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import InventoryModal from "./addInventoryModal";
import { useAppDispatch } from "@/lib/hooks";
import { _getAllInventory } from "@/lib/features/inventory";

const InventoryHeaderWrapper = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(_getAllInventory());
  }, []);

  return (
    <>
      {" "}
      <TablePageHeader
        heading={"Inventory Modules"}
        strapLine={
          " Manage and track your marketing campaigns effortlessly. View campaign details, performance, and settings at a glance."
        }
        isOpen={open}
        setIsOpen={setOpen}
        enableModal={true}
      />
      <InventoryModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};
export default InventoryHeaderWrapper;

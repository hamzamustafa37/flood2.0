"use client";
import React from "react";

import InventoryTable from "./InventoryTable";
import InventoryHeaderWrapper from "./InventoryHeaderWrapper";
import { useAppSelector } from "@/lib/hooks";
import { loading } from "@/lib/features/global";
import { Spin } from "antd";

const AllInventories = () => {
  const _loading = useAppSelector(loading);
  return (
    <div className="p-4">
      <InventoryHeaderWrapper />
      <div className="py-3">
        {_loading.GET_INVENTORIES ? (
          <div className="flex justify-center items-center">
            <Spin />
          </div>
        ) : (
          <InventoryTable />
        )}
      </div>
    </div>
  );
};
export default AllInventories;

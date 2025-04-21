import React from "react";
import type { Metadata, NextPage } from "next";
import AllInventories from "@/app/components/pages/AllInventories";

const InventoryModules: NextPage = () => <AllInventories />;

export const metadata: Metadata = {
  title: "Flood - Inventory Modules",
};

export default InventoryModules;

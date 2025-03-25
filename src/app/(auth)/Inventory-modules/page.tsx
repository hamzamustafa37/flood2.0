import React from "react";
import type { Metadata, NextPage } from "next";
import AllCampaigns from "@/app/components/pages/AllCampaigns";

const InventoryModules: NextPage = () => <AllCampaigns />;

export const metadata: Metadata = {
  title: "Flood - Inventory Modules",
};

export default InventoryModules;

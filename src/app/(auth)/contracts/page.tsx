import React from "react";
import type { Metadata, NextPage } from "next";
import AllCampaigns from "@/app/components/pages/AllCampaigns";

const Contracts: NextPage = () => <AllCampaigns />;

export const metadata: Metadata = {
  title: "Flood - Contracts",
};

export default Contracts;

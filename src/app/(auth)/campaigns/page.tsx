import React from "react";
import type { Metadata, NextPage } from "next";
import AllCampaigns from "@/app/components/pages/AllCampaigns";

const Campaigns: NextPage = () => <AllCampaigns />;

export const metadata: Metadata = {
  title: "Flood - Campaigns",
};

export default Campaigns;

import React from "react";
import type { Metadata, NextPage } from "next";
import AllCampaigns from "@/app/components/pages/AllCampaigns";

const Causes: NextPage = () => <AllCampaigns />;

export const metadata: Metadata = {
  title: "Flood - Causes",
};

export default Causes;

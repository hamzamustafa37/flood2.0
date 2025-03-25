import React from "react";
import type { Metadata, NextPage } from "next";
import AllCampaigns from "@/app/components/pages/AllCampaigns";

const Dots: NextPage = () => <AllCampaigns />;

export const metadata: Metadata = {
  title: "Flood - Causes",
};

export default Dots;

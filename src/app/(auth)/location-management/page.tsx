import React from "react";
import type { Metadata, NextPage } from "next";
import AllCampaigns from "@/app/components/pages/AllCampaigns";

const LocationManagement: NextPage = () => <AllCampaigns />;

export const metadata: Metadata = {
  title: "Flood - Location Management",
};

export default LocationManagement;

import React from "react";
import type { Metadata, NextPage } from "next";
import ContractorDashboard from "@/app/components/pages/CDashboard";

const CDashboard: NextPage = () => <ContractorDashboard />;

export const metadata: Metadata = {
  title: "Flood - Contractor-Dashboard",
};

export default CDashboard;

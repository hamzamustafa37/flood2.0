import React from "react";
import type { Metadata, NextPage } from "next";
import AllPayModelsOverview from "@/app/components/pages/AllPayModels";

const PayModelsOverview: NextPage = () => <AllPayModelsOverview />;

export const metadata: Metadata = {
  title: "Flood - Pay Models Overview",
};

export default PayModelsOverview;

import React from "react";
import type { Metadata, NextPage } from "next";
import AllContracts from "@/app/components/pages/AllContracts";

const Contracts: NextPage = () => <AllContracts />;

export const metadata: Metadata = {
  title: "Flood - Contracts",
};

export default Contracts;

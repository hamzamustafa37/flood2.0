import React from "react";
import type { Metadata, NextPage } from "next";
import AllPayable from "@/app/components/pages/AllPayables";

const Payable: NextPage = () => <AllPayable />;

export const metadata: Metadata = {
  title: "Flood - Payable",
};

export default Payable;

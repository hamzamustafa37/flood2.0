import React from "react";
import type { Metadata, NextPage } from "next";
import CService from "@/app/components/pages/CService";

const ContractorService: NextPage = () => <CService />;

export const metadata: Metadata = {
  title: "Flood - Contractor-Service",
};

export default ContractorService;

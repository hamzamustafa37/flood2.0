import ContractorSettings from "@/app/components/pages/ContractorSettings";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Flood - Contractor-Service",
};

const ContractorSettingsPage: React.FC = () => {
  return <ContractorSettings />;
};

export default ContractorSettingsPage;

import React from "react";
import type { Metadata, NextPage } from "next";
import ContractorTeam from "@/app/components/pages/ContractorTeam";

const CTeams: NextPage = () => <ContractorTeam />;

export const metadata: Metadata = {
  title: "Flood - Contractor-Teams",
};

export default CTeams;

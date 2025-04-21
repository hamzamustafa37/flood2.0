import React from "react";
import type { Metadata, NextPage } from "next";
import AllCompanies from "@/app/components/pages/AllCompanies";

const Companies: NextPage = () => <AllCompanies />;

export const metadata: Metadata = {
  title: "Flood - Companies",
};

export default Companies;

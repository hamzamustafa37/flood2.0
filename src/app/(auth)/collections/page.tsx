import React from "react";
import type { Metadata, NextPage } from "next";
import AllCompanies from "@/app/components/pages/AllCompanies";
import CollectionData from "@/app/components/pages/Collections";

const Collections: NextPage = () => <CollectionData />;

export const metadata: Metadata = {
  title: "Flood - Collections",
};

export default Collections;

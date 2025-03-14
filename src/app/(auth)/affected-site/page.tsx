import React from "react";
import type { Metadata, NextPage } from "next";
import { AffectedSites } from "@/app/components/pages/AffectedSites";

const Site: NextPage = () => <AffectedSites />;

export const metadata: Metadata = {
  title: "Flood - Affected-Sites",
};

export default Site;

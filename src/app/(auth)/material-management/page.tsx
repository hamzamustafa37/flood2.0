import React from "react";
import type { Metadata, NextPage } from "next";
import AllMaterials from "@/app/components/pages/AllMaterials";

const MaterialManagement: NextPage = () => <AllMaterials />;

export const metadata: Metadata = {
  title: "Flood - Material Management",
};

export default MaterialManagement;

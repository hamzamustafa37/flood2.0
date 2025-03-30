import React from "react";
import type { Metadata, NextPage } from "next";
import AllEquipmentTable from "@/app/components/pages/AllEquipments";

const Equipment: NextPage = () => <AllEquipmentTable />;

export const metadata: Metadata = {
  title: "Flood - Equipment",
};

export default Equipment;

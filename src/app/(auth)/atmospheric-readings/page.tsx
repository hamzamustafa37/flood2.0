import React from "react";
import type { Metadata, NextPage } from "next";
import AtmosphericReadings from "@/app/components/pages/AtmosphericReadings";

const atmosphericReadings: NextPage = () => <AtmosphericReadings />;

export const metadata: Metadata = {
  title: "Flood - atmosphericReadings",
};

export default atmosphericReadings;

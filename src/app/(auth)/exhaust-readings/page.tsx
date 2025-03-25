import React from "react";
import type { Metadata, NextPage } from "next";
import AllExhaustReadings from "@/app/components/pages/AllExhaustReadings";

const ExhaustReadings: NextPage = () => <AllExhaustReadings />;

export const metadata: Metadata = {
  title: "Flood - Contracts",
};

export default ExhaustReadings;

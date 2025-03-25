import React from "react";
import type { Metadata, NextPage } from "next";
import AllLocations from "@/app/components/pages/AllLocations";

const LocationManagement: NextPage = () => <AllLocations />;

export const metadata: Metadata = {
  title: "Flood - Location Management",
};

export default LocationManagement;

"use client";
import { imagesPath } from "@/utils";
import Image from "next/image";
import React from "react";
import AtmosphereTable from "./atmospherTable";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
const AtmosphericReadings = () => {
  return (
    <div className="p-4">
      <TablePageHeader
        heading="Atmospheric Readings"
        strapLine="Monitor real-time temperature, humidity, and air pressure readings. Sync automatically or enter data manually for accurate tracking."
      />
      <div className="p-4">
        <AtmosphereTable />
      </div>
    </div>
  );
};

export default AtmosphericReadings;

"use client";
import { imagesPath } from "@/utils";
import Image from "next/image";
import React from "react";
import AtmosphereTable from "./atmospherTable";
const AtmosphericReadings = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-4">
        <div className="">
          <h3 className="text-2xl" style={{ color: "var(--color-text)" }}>
            Atmospheric Readings
          </h3>
          <p className="text-md text-textMuted">
            Monitor real-time temperature, humidity, and air pressure readings.
            Sync automatically or enter data manually for accurate tracking.
          </p>
        </div>
        <div className=" flex items-center">
          <Image
            src={imagesPath.plusIcon}
            height={40}
            width={40}
            alt={"add icon"}
          />
        </div>
      </div>
      <AtmosphereTable />
    </div>
  );
};

export default AtmosphericReadings;

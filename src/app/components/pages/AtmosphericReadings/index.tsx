"use client";
import React, { useState } from "react";
import AtmosphereTable from "./atmospherTable";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import AddAtmosphericReadingModal from "./addAtmosphereModal";
const AtmosphericReadings = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4">
      <TablePageHeader
        heading="Atmospheric Readings"
        strapLine="Monitor real-time temperature, humidity, and air pressure readings. Sync automatically or enter data manually for accurate tracking."
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        enableModal={true}
      />
      <div className="p-4">
        <AtmosphereTable />
      </div>
      <AddAtmosphericReadingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default AtmosphericReadings;

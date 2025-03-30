"use client";
import React from "react";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import RecordExhaustReadingModal from "./addExhaustModal";
import ExhaustReading from "./ExhaustReadingTable";

const AllExhaustReadings = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-4">
      <TablePageHeader
        heading={"Exhaust Readings"}
        strapLine={
          "Manage and track your marketing campaigns effortlessly. View campaign details, performance, and settings at a glance."
        }
        isOpen={open}
        setIsOpen={setOpen}
      />
      <div className="p-4">
        <ExhaustReading />
      </div>
      <RecordExhaustReadingModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};
export default AllExhaustReadings;

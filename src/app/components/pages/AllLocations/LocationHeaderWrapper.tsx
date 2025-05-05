"use client";
import React from "react";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import LocationModal from "./locationModal";
import { useAppDispatch } from "@/lib/hooks";
import { _getLocations } from "@/lib/features/location";
const LocationHeaderWrapper = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  dispatch(_getLocations());
  return (
    <>
      <TablePageHeader
        heading="Location Management"
        strapLine=" Manage and track your marketing campaigns effortlessly. View
                    campaign details, performance, and settings at a glance."
        isOpen={open}
        setIsOpen={setOpen}
        enableModal={true}
      />
      <LocationModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};
export default LocationHeaderWrapper;

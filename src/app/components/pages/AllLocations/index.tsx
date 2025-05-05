"use client";
import React from "react";
import LocationHeaderWrapper from "./LocationHeaderWrapper";
import LocationTable from "./LocationTable";
import { useAppSelector } from "@/lib/hooks";
import { loading } from "@/lib/features/global";
import { Spin } from "antd";

const AllLocations = () => {
  const _loading = useAppSelector(loading);
  return (
    <div className="p-4">
      <LocationHeaderWrapper />
      <div className="pt-4">
        {_loading.GET_LOCATIONS ? (
          <LocationTable />
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Spin />
          </div>
        )}
      </div>
    </div>
  );
};
export default AllLocations;

"use client";
import React from "react";
import CompaniesTable from "./CompaniesTable";
import CompaniesWrapper from "./companiesWrapper";
import { loading } from "@/lib/features/global";
import { useAppSelector } from "@/lib/hooks";
import { Spin } from "antd";

const AllCompanies = () => {
  const _loading = useAppSelector(loading);

  return (
    <div className="p-4">
      <CompaniesWrapper />
      <div className="p-4">
        {_loading.GET_COMPANIES ? (
          <div className="p-4 flex justify-center items-center">
            <Spin />
          </div>
        ) : (
          <CompaniesTable />
        )}
      </div>
    </div>
  );
};
export default AllCompanies;

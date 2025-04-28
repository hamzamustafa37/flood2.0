"use client";
import React from "react";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import AddCompanyModal from "./addCompany";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { _getCompanies, allCompanies } from "@/lib/features/companies";
export default function CompaniesWrapper() {
  const [open, setIsOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const companies = useAppSelector(allCompanies);

  React.useEffect(() => {
    if (companies.length > 0) return;
    dispatch(_getCompanies());
  }, []);

  return (
    <>
      <TablePageHeader
        heading={"Companies"}
        strapLine={
          " Manage and track your marketing campaigns effortlessly. View campaign details, performance, and settings at a glance."
        }
        isOpen={open}
        setIsOpen={setIsOpen}
        enableModal={true}
      />
      <AddCompanyModal isOpen={open} onClose={() => setIsOpen(false)} />
    </>
  );
}

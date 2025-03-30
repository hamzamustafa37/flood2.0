"use client";
import React from "react";
import CompaniesTable from "./CompaniesTable";
import TablePageHeader from "../../common/TablePage/TablePageHeader";
import AddCompanyModal from "./addCompany";

const AllCompanies = () => {
  const [open, setIsOpen] = React.useState(false);
  return (
    <div className="p-4">
      <TablePageHeader
        heading={"Companies"}
        strapLine={
          " Manage and track your marketing campaigns effortlessly. View campaign details, performance, and settings at a glance."
        }
        isOpen={open}
        setIsOpen={setIsOpen}
        enableModal={true}
      />
      <div className="p-4">
        <CompaniesTable />
      </div>
      <AddCompanyModal isOpen={open} onClose={() => setIsOpen(false)} />
    </div>
  );
};
export default AllCompanies;

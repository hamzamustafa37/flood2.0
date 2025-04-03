"use client";
import React from "react";
import { Input } from "../../common";
import { InputType } from "@/utils";
import JobTable from "./jobTable";
import TablePageHeader from "../../common/TablePage/TablePageHeader";

export const AllJobs: React.FC = () => {
  const [activeOption, setActiveOption] = React.useState("All");

  enum IOptions {
    All = "All",
    Book = "Book",
    Cancelled = "Cancelled",
    Evaluate = "Evaluate",
    Billing = "Billing",
  }

  const handleOption = (option: string) => {
    setActiveOption(option);
  };

  const jobCounts: Record<IOptions, number> = {
    [IOptions.All]: 32,
    [IOptions.Book]: 18,
    [IOptions.Cancelled]: 2,
    [IOptions.Evaluate]: 14,
    [IOptions.Billing]: 2,
  };

  return (
    <>
      <TablePageHeader
        heading="Jobs Overview"
        strapLine="Manage and track all your scheduled, in-progress, and completed jobs in one place."
        enableModal={false}
      />

      <div className="p-4">
        <div className="border-b border-borderLight grid grid-cols-1 md:grid-cols-2 items-center gap-4 mt-5">
          <div className="mt-3 overflow-x-auto">
            <ul className="flex space-x-4 m-0 p-0 whitespace-nowrap">
              {Object.values(IOptions).map((option) => (
                <li
                  key={option}
                  onClick={() => handleOption(option)}
                  className={`cursor-pointer ${
                    activeOption === option
                      ? "text-primaryBlue font-medium"
                      : "text-grayText"
                  } text-sm`}
                >
                  {option}{" "}
                  <span className="text-grayText">({jobCounts[option]})</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end mt-3 w-full">
            <Input
              className="w-full md:w-[70%] mb-2"
              type={InputType.Text}
              placeholder="Search"
            />
          </div>
        </div>
        <JobTable />
      </div>
    </>
  );
};

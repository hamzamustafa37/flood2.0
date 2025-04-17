"use client";
import React from "react";
import { Input } from "../../common";
import { InputType } from "@/utils";
import JobTable from "./jobTable";
import { useAppDispatch } from "@/lib/hooks";
import { _getJobs, allJobsData } from "@/lib/features/job";
import { useSelector } from "react-redux";

export const AllJobs: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activeOption, setActiveOption] = React.useState("All");

  const _allJobs = useSelector(allJobsData);

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
  React.useEffect(() => {
    dispatch(_getJobs(1, 10));
  }, []);

  console.log(_allJobs, "The all jobs data");
  return (
    <div className="p-4">
      <div className="border-b-2 border-borderLight p-4">
        <h2 className="text-4xl">Jobs Overview</h2>
        <p className="text-grayText">
          Manage and track all your scheduled, in-progress, and completed jobs
          in one place.
        </p>
      </div>

      <div className="border-b border-borderLight grid grid-cols-2 items-center mt-5 cursor-pointer">
        <div className="mt-3">
          <ul className="flex space-x-4 m-0 p-0">
            {Object.values(IOptions).map((option) => (
              <li
                key={option}
                onClick={() => handleOption(option)}
                className={
                  activeOption === option
                    ? "text-primaryBlue text-sm"
                    : "text-grayText text-sm"
                }
              >
                {option}{" "}
                <span className="text-grayText">({_allJobs[option]})</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end mt-3">
          <Input
            className="w-[70%] mb-2"
            type={InputType.Text}
            placeholder="Search"
          />
        </div>
      </div>
      <JobTable />
    </div>
  );
};

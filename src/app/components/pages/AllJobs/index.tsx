"use client";
import React from "react";
import { Input } from "../../common";
import { InputType } from "@/utils";
import JobTable from "./jobTable";
import { useAppDispatch } from "@/lib/hooks";
import { _getJobs, allJobsData } from "@/lib/features/job";
import { useSelector } from "react-redux";
import { loading } from "@/lib/features/global";
import { Spin } from "antd";

export const AllJobs: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activeOption, setActiveOption] = React.useState("All");
  const _allJobs = useSelector(allJobsData);
  const _loading = useSelector(loading);

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
    if (_allJobs.length > 0) return;
    dispatch(_getJobs(1, 10));
  }, []);

  return (
    <div className="p-4">
      <div className="border-b-2 border-borderLight p-4">
        <h2 className="text-2xl md:text-4xl">Jobs Overview</h2>
        <p className="text-sm md:text-base text-grayText">
          Manage and track all your scheduled, in-progress, and completed jobs
          in one place.
        </p>
      </div>

      {_loading?.GET_JOBS ? (
        <div className="mt-5 flex justify-center items-center">
          <Spin />
        </div>
      ) : (
        <>
          <div className="border-b border-borderLight mt-5 cursor-pointer grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            <div>
              <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                {Object.values(IOptions).map((option) => (
                  <li
                    key={option}
                    onClick={() => handleOption(option)}
                    className={`cursor-pointer ${
                      activeOption === option
                        ? "text-primaryBlue"
                        : "text-grayText"
                    }`}
                  >
                    {option}{" "}
                    <span className="text-grayText">({jobCounts[option]})</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full md:w-auto flex items-center justify-end">
              <Input
                className="w-full md:w-[70%] mb-2"
                type={InputType.Text}
                placeholder="Search"
              />
            </div>
          </div>
          <JobTable />
        </>
      )}
    </div>
  );
};

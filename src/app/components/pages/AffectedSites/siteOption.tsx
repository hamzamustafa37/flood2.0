import { JobData } from "@/lib/features/job";
import React from "react";
import { useSelector } from "react-redux";
const floors = ["Basement", "First Floor"];

interface ISiteOption {
  selectedFloor: string;
  setSelectedFloor: (floor: string) => void;
}
const SiteOption = ({ selectedFloor, setSelectedFloor }: ISiteOption) => {
  const _jobs = useSelector(JobData);

  console.log(_jobs);
  return (
    <div>
      <div className="title">
        <h3 className="text-lg font-semibold">Sites</h3>
      </div>
      <div className="mt-2 space-y-2 text-gray-700">
        {_jobs.site.map((site, index) => (
          <div
            key={index}
            className={`border-b border-[#CBD0DD] py-3 cursor-pointer pl-2 font-medium transition ${
              selectedFloor === site && "text-blue-600"
            }`}
            onClick={() => setSelectedFloor(site)}
          >
            {site}
          </div>
        ))}
      </div>
      <div className=" pb-3">
        <button className="mt-4 text-sm text-blue-500 hover:underline">
          + Add Site
        </button>
      </div>
    </div>
  );
};

export default SiteOption;

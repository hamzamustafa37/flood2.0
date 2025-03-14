import React from "react";
const floors = ["Basement", "First Floor"];

interface ISiteOption {
  selectedFloor: string;
  setSelectedFloor: (floor: string) => void;
}

const SiteOption = ({ selectedFloor, setSelectedFloor }: ISiteOption) => {
  return (
    <div>
      <div className="title border-b border-[#CBD0DD]">
        <h3 className="text-lg font-semibold">Sites</h3>
      </div>
      <div className="mt-2 space-y-2 text-gray-700">
        {floors.map((floor) => (
          <div
            key={floor}
            className={`border-b border-[#CBD0DD] py-3 cursor-pointer pl-2 font-medium transition ${
              selectedFloor === floor
                ? " text-blue-600"
                : "border-transparent hover:border-gray-400"
            }`}
            onClick={() => setSelectedFloor(floor)}
          >
            {floor}
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

import React from "react";
import { Tabs, TabsProps } from "antd";
import HolidaySettings from "./hourlySettings";
import WeeklyHours from "./weeklySettings";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Weekly Hours`,
    children: <WeeklyHours />,
  },
  {
    key: "2",
    label: `Holiday Settings`,
    children: <HolidaySettings />,
  },
];

const ContractorSettings: React.FC = () => {
  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-6">Contractor Settings</h1>
      <div className="bg-white rounded-lg shadow-md p-4">
        <Tabs type="card" items={items} />
      </div>
    </div>
  );
};

export default ContractorSettings;

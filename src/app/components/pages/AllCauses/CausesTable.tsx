"use client";
import { Table, Dropdown, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EllipsisOutlined } from "@ant-design/icons";
import React from "react";

interface CauseData {
  key: string;
  causeName: string;
  category: string;
  coverageType: string;
  lastUpdated: string;
  coverageCriteria: string;
}

const causesData: Array<CauseData> = [
  {
    key: "1",
    causeName: "Water Damage",
    category: "Plumbing",
    coverageType: "Partial Coverage",
    lastUpdated: "03-Mar-2025",
    coverageCriteria: "1",
  },
  {
    key: "2",
    causeName: "Fire Damage",
    category: "Accidental",
    coverageType: "Full Coverage",
    lastUpdated: "02-Mar-2025",
    coverageCriteria: "2",
  },
  {
    key: "3",
    causeName: "Mold Infestation",
    category: "Environmental",
    coverageType: "Partial Coverage",
    lastUpdated: "01-Mar-2025",
    coverageCriteria: "3",
  },
  {
    key: "4",
    causeName: "Sewer Backup",
    category: "Plumbing",
    coverageType: "Full Coverage",
    lastUpdated: "28-Feb-2025",
    coverageCriteria: "1",
  },
  {
    key: "5",
    causeName: "Storm Impact",
    category: "Natural Disaster",
    coverageType: "Partial Coverage",
    lastUpdated: "27-Feb-2025",
    coverageCriteria: "2",
  },
  {
    key: "6",
    causeName: "Roof Collapse",
    category: "Structural",
    coverageType: "Full Coverage",
    lastUpdated: "25-Feb-2025",
    coverageCriteria: "-",
  },
  {
    key: "7",
    causeName: "Earthquake Damage",
    category: "Natural Disaster",
    coverageType: "Partial Coverage",
    lastUpdated: "24-Feb-2025",
    coverageCriteria: "2",
  },
  {
    key: "8",
    causeName: "Electrical Fire",
    category: "Electrical",
    coverageType: "Full Coverage",
    lastUpdated: "23-Feb-2025",
    coverageCriteria: "2",
  },
  {
    key: "9",
    causeName: "Vandalism",
    category: "Accidental",
    coverageType: "Partial Coverage",
    lastUpdated: "22-Feb-2025",
    coverageCriteria: "1",
  },
  {
    key: "10",
    causeName: "Flooding",
    category: "Environmental",
    coverageType: "Full Coverage",
    lastUpdated: "21-Feb-2025",
    coverageCriteria: "3",
  },
];

const columns: ColumnsType<CauseData> = [
  {
    title: "CAUSE NAME",
    dataIndex: "causeName",
    render: (text) => (
      <a className="text-blue-600 hover:underline cursor-pointer">{text}</a>
    ),
  },
  {
    title: "CATEGORY",
    dataIndex: "category",
  },
  {
    title: "COVERAGE TYPE",
    dataIndex: "coverageType",
  },
  {
    title: "LAST UPDATED",
    dataIndex: "lastUpdated",
  },
  {
    title: "COVERAGE CRITERIA",
    dataIndex: "coverageCriteria",
  },
  {
    title: "",
    key: "action",
    render: () => (
      <Dropdown
        menu={{
          items: [
            { key: "1", label: "Edit" },
            { key: "2", label: "Delete" },
          ],
        }}
        trigger={["click"]}
      >
        <Button icon={<EllipsisOutlined />} />
      </Dropdown>
    ),
  },
];

const CausesTable: React.FC = () => {
  return (
    <Table
      dataSource={causesData}
      columns={columns}
      pagination={false}
      rowKey="key"
      className="causes-table"
    />
  );
};

export default CausesTable;

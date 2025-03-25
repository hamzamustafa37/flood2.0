"use client";
import { Table, Badge, Dropdown, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { EllipsisOutlined } from "@ant-design/icons";

interface CampaignData {
  key: string;
  campaignName: string;
  phoneNumber: string;
  googleTagId: string;
  jobType: string;
  location: string;
  payModel: string;
  status: "ACTIVE" | "PAUSED";
  createdOn: string;
}

const dataSource: Array<CampaignData> = [
  {
    key: "1",
    campaignName: "Spring Cleanup",
    phoneNumber: "(312) 555-0123",
    googleTagId: "GTM-123456",
    jobType: "Water Cleanup",
    location: "Chicago, IL",
    payModel: "Fixed",
    status: "ACTIVE",
    createdOn: "01/15/2024",
  },
  {
    key: "2",
    campaignName: "Emergency Flood",
    phoneNumber: "(917) 555-7890",
    googleTagId: "GTM-654321",
    jobType: "Sewer Cleanup",
    location: "New York, NY",
    payModel: "Pay-per-Job",
    status: "ACTIVE",
    createdOn: "02/01/2024",
  },
];

const columns: ColumnsType<CampaignData> = [
  {
    title: "CAMPAIGN NAME",
    dataIndex: "campaignName",
    render: (text) => (
      <a className="text-blue-600 hover:underline cursor-pointer">{text}</a>
    ),
  },
  {
    title: "PHONE NUMBER",
    dataIndex: "phoneNumber",
  },
  {
    title: "GOOGLE TAG ID",
    dataIndex: "googleTagId",
  },
  {
    title: "JOB TYPES",
    dataIndex: "jobType",
  },
  {
    title: "LOCATIONS",
    dataIndex: "location",
  },
  {
    title: "PAY MODEL",
    dataIndex: "payModel",
  },
  {
    title: "STATUS",
    dataIndex: "status",
    render: (status: "ACTIVE" | "PAUSED") => (
      <span
        className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
          status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {status}
      </span>
    ),
  },

  {
    title: "CREATED ON",
    dataIndex: "createdOn",
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

const CampaignsTable: React.FC = () => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      scroll={{ x: "max-content" }}
      rowKey="key"
      className="custom-table"
    />
  );
};

export default CampaignsTable;

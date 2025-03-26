"use client";
import React, { useState } from "react";
import { Table, Tabs, Tag, Input, Dropdown, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";

interface CompanyData {
  key: string;
  name: string;
  type: string;
  phone: string;
  email: string;
  locations: string;
  status: "Active" | "Inactive";
  websiteUpdate: string;
}

const data: Array<CompanyData> = [
  {
    key: "1",
    name: "ABC Constructions",
    type: "Contractor",
    phone: "(123) 456-7890",
    email: "abc@company.com",
    locations: "2 Locations",
    status: "Active",
    websiteUpdate: "2 days ago",
  },
  {
    key: "2",
    name: "XYZ Plumbing",
    type: "Service Provider",
    phone: "(987) 654-3210",
    email: "xyz@plumbing.com",
    locations: "1 Location",
    status: "Active",
    websiteUpdate: "5 days ago",
  },
  {
    key: "3",
    name: "Green Energy Ltd.",
    type: "Renewable Energy",
    phone: "(555) 234-5678",
    email: "contact@green.com",
    locations: "3 Locations",
    status: "Active",
    websiteUpdate: "1 week ago",
  },
  {
    key: "4",
    name: "Skyline Interiors",
    type: "Design Firm",
    phone: "(111) 222-3333",
    email: "info@skyline.com",
    locations: "5 Locations",
    status: "Active",
    websiteUpdate: "3 days ago",
  },
  {
    key: "5",
    name: "SecureTech",
    type: "Security Services",
    phone: "(444) 666-7777",
    email: "admin@secure.com",
    locations: "1 Location",
    status: "Inactive",
    websiteUpdate: "1 day ago",
  },
  {
    key: "6",
    name: "Fusion Electric",
    type: "Electrical",
    phone: "(222) 333-4444",
    email: "support@fusion.com",
    locations: "2 Locations",
    status: "Active",
    websiteUpdate: "2 days ago",
  },
  {
    key: "7",
    name: "Metro Builders",
    type: "Construction",
    phone: "(888) 999-0000",
    email: "contact@metro.com",
    locations: "1 Location",
    status: "Inactive",
    websiteUpdate: "5 days ago",
  },
  {
    key: "8",
    name: "Horizon HVAC",
    type: "HVAC Services",
    phone: "(666) 555-4444",
    email: "service@horizon.com",
    locations: "3 Locations",
    status: "Active",
    websiteUpdate: "1 week ago",
  },
  {
    key: "9",
    name: "Evergreen Landscaping",
    type: "Landscaping",
    phone: "(777) 888-9999",
    email: "hello@evergreen.com",
    locations: "5 Locations",
    status: "Active",
    websiteUpdate: "3 days ago",
  },
  {
    key: "10",
    name: "Rapid Movers",
    type: "Moving Services",
    phone: "(321) 654-0987",
    email: "info@rapidmovers.com",
    locations: "1 Location",
    status: "Active",
    websiteUpdate: "1 day ago",
  },
];

const columns = [
  {
    title: "COMPANY NAME",
    dataIndex: "name",
    render: (text: string) => (
      <a className="text-blue-600 hover:underline cursor-pointer">{text}</a>
    ),
  },
  {
    title: "TYPE",
    dataIndex: "type",
  },
  {
    title: "PHONE NUMBER",
    dataIndex: "phone",
  },
  {
    title: "EMAIL ADDRESS",
    dataIndex: "email",
  },
  {
    title: "LOCATIONS",
    dataIndex: "locations",
  },
  {
    title: "STATUS",
    dataIndex: "status",
    render: (status: string) => (
      <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
    ),
  },

  {
    title: "WEBSITE",
    dataIndex: "websiteUpdate",
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

const CompaniesTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredData = data.filter((company) => {
    const matchesTab =
      activeTab === "all"
        ? true
        : activeTab === "active"
          ? company.status === "Active"
          : company.status === "Inactive";

    const matchesSearch = company.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const items: TabsProps["items"] = [
    {
      key: "all",
      label: `All (${data.length})`,
      children: null,
    },
    {
      key: "active",
      label: `Active (${data.filter((d) => d.status === "Active").length})`,
      children: null,
    },
    {
      key: "inactive",
      label: `Inactive (${data.filter((d) => d.status === "Inactive").length})`,
      children: null,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center ">
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          items={items}
        />
        <Input.Search
          placeholder="Search project"
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 250 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        rowKey="key"
        className="companies-table"
      />
    </div>
  );
};

export default CompaniesTable;

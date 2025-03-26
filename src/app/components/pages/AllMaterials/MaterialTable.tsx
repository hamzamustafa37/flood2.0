"use client";
import { Table, Dropdown, Button, Input, Select, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";

interface MaterialData {
  key: string;
  name: string;
  group: string;
  evapPotential: string;
  services: string;
  restorability: string;
  category: string;
  stockStatus: string;
  lastUpdated: string;
  status: "HIGH" | "MEDIUM" | "LOW";
}

const dataSource: Array<MaterialData> = [
  {
    key: "1",
    name: "Drywall",
    group: "Structural",
    evapPotential: "High",
    services: "Water Damage",
    restorability: "Cat. One",
    category: "Cat. One",
    stockStatus: "In Stock",
    lastUpdated: "02/25/2025",
    status: "HIGH",
  },
  {
    key: "2",
    name: "Hardwood",
    group: "Flooring",
    evapPotential: "Medium",
    services: "Fire Damage",
    restorability: "Cat. Two",
    category: "Cat. Two",
    stockStatus: "Low Stock",
    lastUpdated: "02/20/2025",
    status: "HIGH",
  },
  {
    key: "3",
    name: "Insulation",
    group: "Thermal",
    evapPotential: "High",
    services: "Mold Remediation",
    restorability: "Cat. One",
    category: "Cat. One",
    stockStatus: "Out of Stock",
    lastUpdated: "02/18/2025",
    status: "MEDIUM",
  },
  {
    key: "4",
    name: "Plywood",
    group: "Structural",
    evapPotential: "Low",
    services: "General Repair",
    restorability: "Cat. Three",
    category: "Cat. Three",
    stockStatus: "Available",
    lastUpdated: "02/22/2025",
    status: "HIGH",
  },
];

const columns: ColumnsType<MaterialData> = [
  { title: "NAME", dataIndex: "name" },
  { title: "GROUP", dataIndex: "group" },
  { title: "EVAP. POTENTIAL", dataIndex: "evapPotential" },
  { title: "SERVICES", dataIndex: "services" },
  { title: "RESTORABILITY", dataIndex: "restorability" },
  { title: "CATEGORY", dataIndex: "category" },
  { title: "STOCK STATUS", dataIndex: "stockStatus" },
  { title: "LAST UPDATED", dataIndex: "lastUpdated" },
  {
    title: "STATUS",
    dataIndex: "status",
    render: (status: string) => (
      <Tag
        color={
          status === "HIGH" ? "green" : status === "MEDIUM" ? "blue" : "red"
        }
      >
        {status}
      </Tag>
    ),
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

const MaterialTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>(
    undefined
  );

  const filteredData = dataSource.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (!filterStatus || item.status === filterStatus)
  );

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <Input
          size="large"
          placeholder="Search material"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <Select
          size="large"
          placeholder="Filter by status"
          allowClear
          style={{ width: 200 }}
          value={filterStatus}
          onChange={(value) => setFilterStatus(value)}
          options={[
            { value: "HIGH", label: "High" },
            { value: "MEDIUM", label: "Medium" },
            { value: "LOW", label: "Low" },
          ]}
        />
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
        rowKey="key"
        className="custom-table"
      />
    </div>
  );
};

export default MaterialTable;

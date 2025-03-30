"use client";
import React, { useState } from "react";
import { Table, Tabs, Tag, Input, Dropdown, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";
import { imagesPath } from "@/utils";
import Image from "next/image";

interface EquipmentData {
  key: string;
  name: string;
  group: string;
  type: string;
  servicesLinked: string[];
  status: "Active" | "Inactive" | "Requires Monitoring";
  lastUpdated: string;
}

const data: Array<EquipmentData> = [
  {
    key: "1",
    name: "Excavator 320D",
    group: "Heavy Machinery",
    type: "Excavator",
    servicesLinked: ["Administrative", "Air Mover"],
    status: "Active",
    lastUpdated: "2 days ago",
  },
  {
    key: "2",
    name: "Air Compressor",
    group: "Tools & Equip",
    type: "Compressor",
    servicesLinked: ["Administrative", "Air Mover"],
    status: "Active",
    lastUpdated: "5 days ago",
  },
  {
    key: "3",
    name: "Concrete Mixer",
    group: "Construction",
    type: "Mixer",
    servicesLinked: ["Administrative", "Air Mover"],
    status: "Active",
    lastUpdated: "1 week ago",
  },
  {
    key: "4",
    name: "Welding Machine",
    group: "Tools & Equip",
    type: "Welding",
    servicesLinked: ["Administrative", "Air Mover"],
    status: "Active",
    lastUpdated: "3 days ago",
  },
  {
    key: "5",
    name: "Power Generator",
    group: "Energy Systems",
    type: "Generator",
    servicesLinked: ["Administrative", "Air Mover"],
    status: "Active",
    lastUpdated: "1 day ago",
  },
];

const columns = [
  {
    title: "EQUIPMENT NAME",
    dataIndex: "name",
    render: (text: string) => (
      <div className="flex items-center gap-2">
        <Image
          src={imagesPath.equipmentIcon}
          height={50}
          width={50}
          alt="eq-icon"
        />
        <a className="text-blue-600 hover:underline cursor-pointer">{text}</a>
      </div>
    ),
  },
  {
    title: "GROUP",
    dataIndex: "group",
  },
  {
    title: "TYPE",
    dataIndex: "type",
  },
  {
    title: "SERVICES LINKED",
    dataIndex: "servicesLinked",
    render: (services: string[]) => (
      <div className="flex gap-2">
        {services.map((service, index) => (
          <Tag key={index} color={index === 0 ? "blue" : "cyan"}>
            {service}
          </Tag>
        ))}
      </div>
    ),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    render: (status: string) => (
      <Tag
        color={
          status === "Active"
            ? "green"
            : status === "Inactive"
              ? "red"
              : "orange"
        }
      >
        {status.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "REQUIRES MONITORING",
    dataIndex: "lastUpdated",
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

const EquipmentTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter data based on tab and search
  const filteredData = data.filter((equipment) => {
    const matchesTab =
      activeTab === "all"
        ? true
        : activeTab === "active"
          ? equipment.status === "Active"
          : activeTab === "inactive"
            ? equipment.status === "Inactive"
            : equipment.status === "Requires Monitoring";

    const matchesSearch = equipment.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  // Tab items
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
    {
      key: "requiresMonitoring",
      label: `Requires Monitoring (${data.filter((d) => d.status === "Requires Monitoring").length})`,
      children: null,
    },
  ];

  return (
    <div className="">
      {/* Tabs and Search Bar */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          items={items}
        />
        <Input.Search
          placeholder="Search project"
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "300px" }}
          className="h-[45px]"
        />
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        rowKey="key"
        scroll={{ x: "max-content" }}
        className="equipment-table"
        bordered
      />
    </div>
  );
};

export default EquipmentTable;

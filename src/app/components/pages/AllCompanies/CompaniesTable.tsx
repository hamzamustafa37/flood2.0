"use client";
import React, { useState, useMemo } from "react";
import { Table, Tabs, Tag, Input, Dropdown, Button } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";
import { useAppSelector } from "@/lib/hooks";
import { allCompanies } from "@/lib/features/companies";

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

  const companies = useAppSelector(allCompanies);

  const formattedData: Array<CompanyData> = useMemo(() => {
    return companies.map((company: any, index: number) => ({
      key: company.id || `${index}`,
      name: company.name,
      type: company.type || "—",
      phone: company.phone || "—",
      email: company.email || "—",
      locations: `${company.locations?.length || 0} Location${
        company.locations?.length > 1 ? "s" : ""
      }`,
      status: "Active",
      websiteUpdate: "N/A",
    }));
  }, [companies]);

  const filteredData = useMemo(() => {
    return formattedData.filter((company) => {
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
  }, [formattedData, activeTab, search]);

  const items: TabsProps["items"] = [
    {
      key: "all",
      label: `All (${formattedData.length})`,
      children: null,
    },
    {
      key: "active",
      label: `Active (${formattedData.filter((d) => d.status === "Active").length})`,
      children: null,
    },
    {
      key: "inactive",
      label: `Inactive (${formattedData.filter((d) => d.status === "Inactive").length})`,
      children: null,
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          items={items}
        />
        <Input.Search
          placeholder="Search company"
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 250 }}
          className="h-[45px]"
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        rowKey="key"
        scroll={{ x: true }}
        className="companies-table"
      />
    </div>
  );
};

export default CompaniesTable;

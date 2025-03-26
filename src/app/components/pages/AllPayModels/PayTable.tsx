"use client";
import { Table, Dropdown, Button, Input, Select, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { ReactNode, useState } from "react";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";

interface PayModelData {
  key: string;
  name: string;
  payType: string;
  payMethod: string;
  rolesAssigned: string;
  percentageSplit: string;
  totalExpenses: string;
  status: "ACTIVE" | "PENDING";
}

const payModelsData: Array<PayModelData> = [
  {
    key: "1",
    name: "Standard Pay",
    payType: "Hourly",
    payMethod: "Bank Transfer",
    rolesAssigned: "Supervisor, Worker",
    percentageSplit: "70% - 30%",
    totalExpenses: "$5,000",
    status: "ACTIVE",
  },
  {
    key: "2",
    name: "Fixed Salary",
    payType: "Monthly",
    payMethod: "Direct Deposit",
    rolesAssigned: "Manager, Assistant",
    percentageSplit: "80% - 20%",
    totalExpenses: "$12,000",
    status: "ACTIVE",
  },
  {
    key: "3",
    name: "Commission-Based",
    payType: "Per Task",
    payMethod: "Cash",
    rolesAssigned: "Salesperson",
    percentageSplit: "90% - 10%",
    totalExpenses: "$3,000",
    status: "PENDING",
  },
  {
    key: "4",
    name: "Mixed Model",
    payType: "Weekly",
    payMethod: "PayPal",
    rolesAssigned: "Lead, Worker",
    percentageSplit: "60% - 40%",
    totalExpenses: "$7,500",
    status: "ACTIVE",
  },
  {
    key: "5",
    name: "Bonus Structure",
    payType: "Performance",
    payMethod: "Check",
    rolesAssigned: "Employee",
    percentageSplit: "100%",
    totalExpenses: "$2,000",
    status: "ACTIVE",
  },
];

const columns: ColumnsType<PayModelData> = [
  {
    title: "PAY MODEL NAME",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "PAY TYPE",
    dataIndex: "payType",
    sorter: (a, b) => a.payType.localeCompare(b.payType),
  },
  {
    title: "PAY METHOD",
    dataIndex: "payMethod",
    sorter: (a, b) => a.payMethod.localeCompare(b.payMethod),
  },
  {
    title: "ROLES ASSIGNED",
    dataIndex: "rolesAssigned",
    sorter: (a, b) => a.rolesAssigned.localeCompare(b.rolesAssigned),
  },
  {
    title: "PERCENTAGE SPLIT",
    dataIndex: "percentageSplit",
    sorter: (a, b) => a.percentageSplit.localeCompare(b.percentageSplit),
  },
  {
    title: "TOTAL EXPENSES",
    dataIndex: "totalExpenses",
    sorter: (a, b) =>
      parseFloat(a.totalExpenses.replace(/[$,]/g, "")) -
      parseFloat(b.totalExpenses.replace(/[$,]/g, "")),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    sorter: (a, b) => a.status.localeCompare(b.status),
    render: (status: string): ReactNode => {
      return (
        <Tag color={status === "ACTIVE" ? "green" : "volcano"}>{status}</Tag>
      );
    },
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

const PayModelsTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | undefined>(
    undefined
  );

  const filteredData = payModelsData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (!filterStatus || item.status === filterStatus)
  );

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <Input
          size="large"
          placeholder="Search Pay Model"
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
            { value: "ACTIVE", label: "Active" },
            { value: "PENDING", label: "Pending" },
          ]}
        />
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
        rowKey="key"
      />
    </div>
  );
};

export default PayModelsTable;

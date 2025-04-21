"use client";

import { Table, Tag, Input } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useState } from "react";

const { Search } = Input;

interface Job {
  key: string;
  jobId: string;
  jobTitle: string;
  location: string;
  serviceType: string;
  status: "PAID" | "PARTIAL" | "OVERDUE";
  totalAmount: number;
  outstanding: number;
  paymentModel: string;
  lastPaymentDate: string;
}

const statusColors: Record<Job["status"], string> = {
  PAID: "green",
  PARTIAL: "blue",
  OVERDUE: "red",
};

const data: Array<Job> = [
  {
    key: "1",
    jobId: "#00123",
    jobTitle: "Basement Water Cleanup",
    location: "Houston",
    serviceType: "Water Clean-up & Drying",
    status: "PAID",
    totalAmount: 5000,
    outstanding: 0,
    paymentModel: "Fixed",
    lastPaymentDate: "Feb 20, 2024",
  },
  {
    key: "2",
    jobId: "#00122",
    jobTitle: "Main Floor Mold Removal",
    location: "Chicago",
    serviceType: "Sewer Clean-up",
    status: "PARTIAL",
    totalAmount: 2500,
    outstanding: 1200,
    paymentModel: "Milestone",
    lastPaymentDate: "Jan 10, 2024",
  },
  {
    key: "3",
    jobId: "#00121",
    jobTitle: "Sewer Backup Repair",
    location: "Southern Illinois",
    serviceType: "Mold Remediation",
    status: "PARTIAL",
    totalAmount: 4000,
    outstanding: 2000,
    paymentModel: "Fixed",
    lastPaymentDate: "Feb 5, 2024",
  },
  {
    key: "4",
    jobId: "#00120",
    jobTitle: "Kitchen Water Damage",
    location: "Maryland",
    serviceType: "Box Out / Contents",
    status: "OVERDUE",
    totalAmount: 3800,
    outstanding: 3800,
    paymentModel: "Hourly",
    lastPaymentDate: "Dec 15, 2023",
  },
  {
    key: "5",
    jobId: "#00119",
    jobTitle: "Full House Restoration",
    location: "Chicago",
    serviceType: "Drain Cleaning",
    status: "PARTIAL",
    totalAmount: 6500,
    outstanding: 3500,
    paymentModel: "Milestone",
    lastPaymentDate: "Feb 10, 2024",
  },
];

const JobTable: React.FC = () => {
  const [filteredData, setFilteredData] = useState<Array<Job>>(data);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [searchText, setSearchText] = useState<string>("");
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "ALL") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((job) => job.status === filter));
    }
  };

  const handleSearch = (value: string) => {
    const filtered = data.filter(
      (job) =>
        job.jobTitle.toLowerCase().includes(value.toLowerCase()) ||
        job.location.toLowerCase().includes(value.toLowerCase()) ||
        job.serviceType.toLowerCase().includes(value.toLowerCase()) ||
        job.jobId.includes(value)
    );
    setFilteredData(filtered);
  };

  const columns: ColumnsType<Job> = [
    {
      title: "Job ID",
      dataIndex: "jobId",
      key: "jobId",
      sorter: (a: Job, b: Job) => a.jobId.localeCompare(b.jobId),
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
      render: (text: string) => (
        <span className="text-blue-600 cursor-pointer font-medium">{text}</span>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      filters: data.map((item) => ({
        text: item.location,
        value: item.location,
      })),
      onFilter: (value, record) => record.location === value,
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Paid", value: "PAID" },
        { text: "Partial", value: "PARTIAL" },
        { text: "Overdue", value: "OVERDUE" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: Job["status"]) => (
        <Tag color={statusColors[status]}>{status}</Tag>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      sorter: (a, b) => a.totalAmount - b.totalAmount,
      render: (amount: number) => `$${amount.toLocaleString()}`,
    },
    {
      title: "Outstanding",
      dataIndex: "outstanding",
      key: "outstanding",
      sorter: (a, b) => a.outstanding - b.outstanding,
      render: (amount: number) => (
        <span className="text-red-500 font-medium">
          ${amount.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Payment Model",
      dataIndex: "paymentModel",
      key: "paymentModel",
    },
    {
      title: "Last Payment Date",
      dataIndex: "lastPaymentDate",
      key: "lastPaymentDate",
    },
  ];

  return (
    <div className="p-4">
      {/* Filters Section */}
      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[]">
        {/* Filters */}
        <div className="flex gap-4">
          {[
            { label: "All", value: "ALL" },
            { label: "Paid", value: "PAID" },
            { label: "Partial", value: "PARTIAL" },
            { label: "Overdue", value: "OVERDUE" },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => handleFilterChange(filter.value)}
              className={`text-sm font-medium ${
                activeFilter === filter.value
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <Search
          placeholder="Search job"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-64"
        />
      </div>

      {/* Table Section */}
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

export default JobTable;

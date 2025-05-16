"use client";
import React, { useState, useMemo } from "react";
import { Button } from "../../common";
import { ButtonVariant, imagesPath } from "@/utils";
import Image from "next/image";
import ContractorTabs from "../../common/ContractorTabs";
import { Table, Tag, Checkbox, Space, Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  CheckOutlined,
  DeleteOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Option } = Select;

interface Contractor {
  key: string;
  contractor: string;
  email: string;
  mobile: string;
  zip: string;
  jobs: number;
  status: "AVAILABLE" | "ON_JOB" | "OFFLINE";
  emergencyReady: boolean;
}

const data: Array<Contractor> = [
  {
    key: "1",
    contractor: "Mike Johnson",
    email: "floodteam@email.com",
    mobile: "(312) 555-1023",
    zip: "90210",
    jobs: 4,
    status: "AVAILABLE",
    emergencyReady: true,
  },
  {
    key: "2",
    contractor: "Sarah Lee",
    email: "moldremoval@email.com",
    mobile: "(415) 555-2045",
    zip: "90014",
    jobs: 2,
    status: "ON_JOB",
    emergencyReady: true,
  },
  {
    key: "3",
    contractor: "Tony Rivera",
    email: "emergrepair@email.com",
    mobile: "(713) 555-3098",
    zip: "90013",
    jobs: 0,
    status: "OFFLINE",
    emergencyReady: false,
  },
  {
    key: "4",
    contractor: "Adeel Malik",
    email: "biohazard@email.com",
    mobile: "(646) 555-4567",
    zip: "90630",
    jobs: 1,
    status: "AVAILABLE",
    emergencyReady: true,
  },
];

const statusColors: Record<string, string> = {
  AVAILABLE: "green",
  ON_JOB: "orange",
  OFFLINE: "red",
};

const ContractorTeam = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZip, setSelectedZip] = useState<string | undefined>();
  const [selectedJobs, setSelectedJobs] = useState<number | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  // Dropdown Options
  const zipOptions = Array.from(new Set(data.map((d) => d.zip)));
  const jobOptions = Array.from(new Set(data.map((d) => d.jobs)));
  const statusOptions = ["AVAILABLE", "ON_JOB", "OFFLINE"];

  // Filtered data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesName = item.contractor
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesZip = selectedZip ? item.zip === selectedZip : true;
      const matchesJobs =
        selectedJobs !== undefined ? item.jobs === selectedJobs : true;
      const matchesStatus = selectedStatus
        ? item.status === selectedStatus
        : true;

      return matchesName && matchesZip && matchesJobs && matchesStatus;
    });
  }, [searchTerm, selectedZip, selectedJobs, selectedStatus]);

  const columns: ColumnsType<Contractor> = [
    {
      title: "CONTRACTOR",
      dataIndex: "contractor",
      key: "contractor",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "MOBILE NUMBER",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "ZIP CODES",
      dataIndex: "zip",
      key: "zip",
    },
    {
      title: "OPEN JOBS",
      dataIndex: "jobs",
      key: "jobs",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status: keyof typeof statusColors) => (
        <Tag className="rounded-lg" color={statusColors[status]}>
          {status}
        </Tag>
      ),
    },
    {
      title: "EMERGENCY READY",
      dataIndex: "emergencyReady",
      key: "emergencyReady",
      render: (ready: boolean) => <Checkbox checked={ready} />,
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button variant={ButtonVariant.Light}>
            <CheckOutlined />
          </Button>
          <Button variant={ButtonVariant.Light}>
            <DeleteOutlined />
          </Button>
          <Button variant={ButtonVariant.Light}>
            <MoreOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const tabsData = [
    {
      strapLine: "All active team members in the system",
      title: "Total Contractors",
      value: "28",
      icon: imagesPath.totalJobs,
      tag: "",
    },
    {
      strapLine: "Logged in or accepted at least one job",
      title: "Active Todays",
      value: "9",
      icon: imagesPath.spark,
      tag: "",
    },
    {
      strapLine: "Available and willing to take urgent jobs",
      title: "Active Todays",
      value: "9",
      icon: imagesPath.timerTab,
      tag: "",
    },
    {
      strapLine: "Based on last 30 completed job",
      title: "Active Todays",
      value: "9",
      icon: imagesPath.remarksTab,
      tag: "",
    },
    {
      strapLine: "Unique ZIP codes currently covered",
      title: "Coverage ZIPs",
      value: "34",
      icon: imagesPath.zipLocation,
      tag: "",
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-wrap justify-between">
        <div>
          <h1 className="m-0 text-4xl font-normal">
            Contractor TeamBoard & Availability Tracker
          </h1>
          <p className="mt-2 text-light">
            Live visibility into contractor activity, skill coverage, job loads,
            performance, and emergency readiness to ensure quick and effective
            job assignments.
          </p>
        </div>
        <div className="flex items-center h-full">
          <Button
            className="flex h-[70px] items-center"
            variant={ButtonVariant.ThemeColor}
          >
            <Image
              src={imagesPath.briefCaseWhite}
              alt="bag-pack-icon m-2"
              height={80}
              width={24}
            />
            <span className="ms-2">Add New</span>
          </Button>
        </div>
      </div>

      <ContractorTabs tabOption={tabsData} />

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <Input
          placeholder="Search by contractor name"
          prefix={<SearchOutlined />}
          style={{ maxWidth: 250 }}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          className="py-3"
        />

        <Select
          placeholder="Filter by ZIP"
          allowClear
          style={{ width: 160 }}
          value={selectedZip}
          onChange={(value) => setSelectedZip(value)}
        >
          {zipOptions.map((zip) => (
            <Option key={zip} value={zip}>
              {zip}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Filter by Open Jobs"
          allowClear
          style={{ width: 180 }}
          value={selectedJobs}
          onChange={(value) => setSelectedJobs(Number(value))}
        >
          {jobOptions.map((jobs) => (
            <Option key={jobs} value={jobs}>
              {jobs}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Filter by Status"
          allowClear
          style={{ width: 160 }}
          value={selectedStatus}
          onChange={(value) => setSelectedStatus(value)}
        >
          {statusOptions.map((status) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>
      </div>

      <Table columns={columns} dataSource={filteredData} pagination={false} />
    </div>
  );
};

export default ContractorTeam;

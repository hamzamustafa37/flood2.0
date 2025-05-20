"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Button } from "../../common";
import { ButtonVariant, imagesPath, tabsData } from "@/utils";
import ContractorTabs from "../../common/ContractorTabs";
import { Table, Tag, Checkbox, Space, Input, Select } from "antd";
import { getTeamsPagination } from "@/lib/features/team";
import { ITeamMember, ITeamResponse } from "@/utils/types/teams.type";
import { ColumnsType } from "antd/es/table";
import {
  CheckOutlined,
  DeleteOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Image from "next/image";

const { Option } = Select;

const statusColors = {
  Active: "green",
  Inactive: "red",
  Disabled: "gray",
};

const ContractorTeam = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZip, setSelectedZip] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState<Array<ITeamMember>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const zipOptions = Array.from(new Set(listData.flatMap((d) => d.zipCodes)));

  const statusOptions = ["Active", "Inactive", "Disabled"];

  const filteredData = useMemo(() => {
    return listData.filter((item) => {
      const nameMatch = item.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const zipMatch = selectedZip ? item.zipCodes.includes(selectedZip) : true;

      let status: "Active" | "Inactive" | "Disabled" = "Active";
      if (item.isDisable) status = "Disabled";
      else if (!item.available) status = "Inactive";

      const statusMatch = selectedStatus ? status === selectedStatus : true;

      return nameMatch && zipMatch && statusMatch;
    });
  }, [listData, searchTerm, selectedZip, selectedStatus]);

  const columns: ColumnsType<ITeamMember> = [
    {
      title: "CONTRACTOR",
      dataIndex: "name",
      key: "contractor",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "MOBILE NUMBER",
      dataIndex: "mobileNumber",
      key: "mobile",
    },
    {
      title: "ZIP CODES",
      dataIndex: "zipCodes",
      key: "zip",
      render: (zips: string[]) => zips.join(", "),
    },
    {
      title: "OPEN JOBS",
      key: "jobs",
      render: () => 0,
    },
    {
      title: "STATUS",
      key: "status",
      render: (_: any, record: ITeamMember) => {
        let status: keyof typeof statusColors = "Active";
        if (record.isDisable) status = "Disabled";
        else if (!record.available) status = "Inactive";
        return (
          <Tag className="rounded-xl" color={statusColors[status]}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "EMERGENCY READY",
      key: "emergencyReady",
      render: (_: any, record: ITeamMember) => (
        <Checkbox checked={record.waterDamage || record.plumbing} disabled />
      ),
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button variant={ButtonVariant.Primary}>
            <CheckOutlined />
          </Button>
          <Button variant={ButtonVariant.Primary}>
            <DeleteOutlined />
          </Button>
          <Button variant={ButtonVariant.Primary}>
            <MoreOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async (page = 1) => {
      setLoading(true);
      try {
        const response: ITeamResponse = await getTeamsPagination(page);
        setListData(response.teams);
        setTotalPages(response.totalPages);
        setCurrentPage(response.currentPage);
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(currentPage);
  }, [currentPage]);
  // const tabsData = [
  //   {
  //     icon: imagesPath.someIcon,        // Replace with your actual icon path
  //     strapLine: "Currently Active",
  //     value: filteredData.filter(item => !item.isDisable && item.available).length.toString(),
  //     title: "Active Contractors",
  //     tag: "",
  //   },
  //   {
  //     icon: imagesPath.someIcon,
  //     strapLine: "Currently Inactive",
  //     value: filteredData.filter(item => !item.isDisable && !item.available).length.toString(),
  //     title: "Inactive Contractors",
  //     tag: "",
  //   },
  //   {
  //     icon: imagesPath.someIcon,
  //     strapLine: "Currently Disabled",
  //     value: filteredData.filter(item => item.isDisable).length.toString(),
  //     title: "Disabled Contractors",
  //     tag: "",
  //   },
  //   {
  //     icon: imagesPath.someIcon,
  //     strapLine: "Total Count",
  //     value: filteredData.length.toString(),
  //     title: "Total Contractors",
  //     tag: "",
  //   },
  // ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-4">
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
      <div className="p-4">
        <ContractorTabs tabOption={tabsData} />

        <div className="flex flex-wrap py-2 gap-2 items-center">
          <Input
            placeholder="Search by name"
            prefix={<SearchOutlined />}
            className="py-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 200 }}
          />

          <Select
            placeholder="Filter by ZIP"
            allowClear
            style={{ width: 150 }}
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
            placeholder="Filter by Status"
            allowClear
            style={{ width: 150 }}
            value={selectedStatus}
            onChange={(value) => setSelectedStatus(value)}
          >
            {statusOptions.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
          <Button
            variant={ButtonVariant.Outline}
            className="py-2"
            onClick={() => {
              setSearchTerm("");
              setSelectedZip(undefined);
              setSelectedStatus(undefined);
            }}
          >
            Clear Filters
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            total: totalPages * 10,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </div>
    </div>
  );
};

export default ContractorTeam;

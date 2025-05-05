"use client";
import { allLocations } from "@/lib/features/location";
import { useAppSelector } from "@/lib/hooks";
import { ICompanyLocation } from "@/utils/types";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";

const LocationTable: React.FC = () => {
  const _allLocation = useAppSelector(allLocations);

  const columns: ColumnsType<ICompanyLocation> = [
    {
      title: "NAME",
      dataIndex: "name",
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
      title: "JOB TYPE",
      dataIndex: "jobType",
    },
    {
      title: "LOCATION",
      dataIndex: "location",
    },
    {
      title: "PAY MODEL",
      dataIndex: "payModel",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "CREATED ON",
      dataIndex: "createdOn",
    },
  ];

  return (
    <Table
      dataSource={_allLocation}
      columns={columns}
      pagination={false}
      scroll={{ x: "max-content" }}
      rowKey="key"
      className="custom-table"
    />
  );
};

export default LocationTable;

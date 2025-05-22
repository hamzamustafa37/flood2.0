"use client";
import { getServices } from "@/lib/features/services";
import { Table, Select, Space } from "antd";
import { Button } from "../../common";

import React from "react";
import ContractorTabs from "../../common/ContractorTabs";
import { Button as CustomButton } from "../../common";
import { ButtonVariant, imagesPath, tabsData } from "@/utils";
import Image from "next/image";
import type { ColumnsType } from "antd/es/table";
const { Option } = Select;

const CService = () => {
  const [listData, setListData] = React.useState<Array<any>>([]);
  const [filteredData, setFilteredData] = React.useState<Array<any>>([]);
  const [selectedBufferTime, setSelectedBufferTime] = React.useState<
    string | null
  >(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getServices();
      setListData(response);
      setFilteredData(response);
    } catch (err) {
      console.error("Failed to fetch services.", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleBufferTimeFilter = (value: string | null) => {
    setSelectedBufferTime(value);
    if (!value) {
      setFilteredData(listData);
    } else {
      setFilteredData(listData.filter((item) => item.bufferTime === value));
    }
  };

  const clearAllFilters = () => {
    setSelectedBufferTime(null);
    setFilteredData(listData);
  };

  // Get unique bufferTime values from data
  const bufferTimeOptions = Array.from(
    new Set(listData.map((item) => item.bufferTime))
  );

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "left",
    },
    {
      title: "Buffer Time",
      dataIndex: "bufferTime",
      key: "bufferTime",
      render: (text: string) => `${text}min`,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text: string) => `${text}min`,
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      render: (text: string) => `$${text}`,
    },
  ];

  return (
    <div className="flex flex-col gap-4 py-4 px-2 md:px-4  mb-2">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">
            Contractor TeamBoard & Availability Tracker
          </h1>
          <p className="text-sm md:text-base text-light">
            Live visibility into contractor activity, skill coverage, job loads,
            performance, and emergency readiness to ensure quick and effective
            job assignments.
          </p>
        </div>
        <div className="flex items-center justify-start md:justify-end">
          <Button
            className="flex h-[50px] md:h-[70px] items-center text-sm md:text-base"
            variant={ButtonVariant.ThemeColor}
          >
            <Image
              src={imagesPath.briefCaseWhite}
              alt="bag-pack-icon"
              height={80}
              width={24}
            />
            <span className="ms-2">Add New</span>
          </Button>
        </div>
      </div>

      {/* Filter dropdowns */}

      {/* Tabs and Table */}
      <div className="py-4 px-2 md:px-4 ">
        <ContractorTabs tabOption={tabsData} />
        <div className="flex flex-wrap py-2 gap-2 items-center">
          <Select
            placeholder="Filter by Buffer Time"
            style={{ width: 200 }}
            allowClear
            value={selectedBufferTime || undefined}
            onChange={handleBufferTimeFilter}
          >
            {bufferTimeOptions.map((time) => (
              <Option key={time} value={time}>
                {time} min
              </Option>
            ))}
          </Select>
          <CustomButton className="py-2" onClick={clearAllFilters}>
            Clear All
          </CustomButton>
        </div>
        <div className="w-full overflow-x-auto">
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default CService;

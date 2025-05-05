"use client";
import { Table, Dropdown, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/lib/hooks";
import { allInventories } from "@/lib/features/inventory";

interface InventoryItem {
  id: string;
  name: string;
  equipmentId?: string;
  locationId: string;
  createdAt?: { _seconds: number; _nanoseconds: number };
  updatedAt?: { _seconds: number; _nanoseconds: number };
}

const formatDate = (timestamp?: { _seconds: number; _nanoseconds: number }) => {
  if (!timestamp) return "N/A";
  const date = new Date(timestamp._seconds * 1000);
  return date.toLocaleDateString();
};

const InventoryTable: React.FC = () => {
  const inventories: Array<InventoryItem> = useAppSelector(allInventories);

  const dataSource = inventories.map((item) => ({
    key: item.id,
    name: item.name || "Unnamed",
    equipmentId: item.equipmentId || "N/A",
    locationId: item.locationId,
    createdAt: formatDate(item.createdAt),
    updatedAt: formatDate(item.updatedAt),
  }));

  const columns: ColumnsType<any> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Equipment ID",
      dataIndex: "equipmentId",
    },
    {
      title: "Location ID",
      dataIndex: "locationId",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
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

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      scroll={{ x: "max-content" }}
      rowKey="key"
    />
  );
};

export default InventoryTable;

"use client";
import React, { useState } from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import EditHolidayModal from "./editLeave";

interface Holiday {
  key: string;
  name: string;
  date: string;
}

const initialData: Array<Holiday> = [
  { key: "1", name: "New holiday", date: "2025-02-18" },
  { key: "2", name: "July4", date: "2025-07-04" },
];

const HolidayTable: React.FC = () => {
  const [data, setData] = useState<Array<Holiday>>(initialData);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = (record: Holiday) => {
    setIsEditMode(true);
    setSelectedHoliday(record);
    setEditModalVisible(true);
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setSelectedHoliday(null);
    setEditModalVisible(true);
  };

  const handleUpdate = (updated: { name: string; date: string }) => {
    if (isEditMode && selectedHoliday) {
      // Update existing holiday
      setData((prev) =>
        prev.map((item) =>
          item.key === selectedHoliday.key ? { ...item, ...updated } : item
        )
      );
    } else {
      // Add new holiday
      const newKey = Date.now().toString();
      setData((prev) => [...prev, { key: newKey, ...updated }]);
    }
    setEditModalVisible(false);
  };

  const handleDelete = (key: string) => {
    setData((prev) => prev.filter((item) => item.key !== key));
  };

  const columns = [
    {
      title: <span className="font-semibold text-gray-500">NAME</span>,
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span className="text-gray-700 font-medium">{text}</span>
      ),
    },
    {
      title: <span className="font-semibold text-gray-500">DATE</span>,
      dataIndex: "date",
      key: "date",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "",
      key: "actions",
      render: (_: any, record: Holiday) => (
        <div className="flex space-x-4 justify-end pr-4">
          <EditOutlined
            className="text-gray-500 cursor-pointer"
            onClick={() => handleEdit(record)}
          />
          <DeleteOutlined
            className="text-red-500 cursor-pointer"
            onClick={() => handleDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-end items-center mb-3">
        <Button
          type="default"
          icon={<PlusOutlined />}
          className="border-green-500 text-green-600"
          onClick={handleAdd}
        >
          Add Leave
        </Button>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        bordered={false}
        rowClassName={() => "border-b"}
      />

      <EditHolidayModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSubmit={handleUpdate}
        initialValues={selectedHoliday ?? { name: "", date: "" }}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default HolidayTable;

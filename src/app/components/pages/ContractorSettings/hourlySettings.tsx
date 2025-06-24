"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Spin } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import EditHolidayModal from "./editLeave";
import { deleteLeaveDay, getAllLeaveDays } from "@/lib/features/leave";

interface Holiday {
  key: string;
  name: string;
  date: string;
}

const HolidayTable: React.FC = () => {
  const [data, setData] = useState<Array<Holiday>>([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await getAllLeaveDays();
      const formattedData = response.map((item: any) => ({
        key: item.id,
        name: item.name,
        date: item.date,
      }));
      setData(formattedData);
    } catch (err) {
      console.error("Failed to fetch holidays:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleDelete = async (key: string) => {
    setDeletingId(key);
    try {
      await deleteLeaveDay(key);
      setData((prev) => prev.filter((item) => item.key !== key));
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeletingId(null);
    }
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
          {deletingId === record.key ? (
            <Spin size="small" />
          ) : (
            <DeleteOutlined
              className="text-red-500 cursor-pointer"
              onClick={() => handleDelete(record.key)}
            />
          )}
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
        onSuccess={() => {
          fetchData();
          setEditModalVisible(false);
          setSelectedHoliday(null);
        }}
        initialValues={selectedHoliday ?? { name: "", date: "" }}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default HolidayTable;

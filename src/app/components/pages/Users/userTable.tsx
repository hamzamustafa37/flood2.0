import React from "react";
import { Table, Tag, Input, Spin, Empty } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { _getUsers, userData } from "@/lib/features/users";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { IUser } from "@/utils/types";
import { loading } from "@/lib/features/global";

const columns: ColumnsType<IUser> = [
  {
    title: "NAME",
    key: "name",
    render: (record) => (
      <span>{`${record.firstName || ""} ${record.lastName || ""}`.trim()}</span>
    ),
    sorter: (a, b) => {
      const aName = `${a.firstName || ""} ${a.lastName || ""}`.trim();
      const bName = `${b.firstName || ""} ${b.lastName || ""}`.trim();
      return aName.localeCompare(bName);
    },
  },
  {
    title: "ROLE",
    dataIndex: "roleId",
    key: "roleId",
    sorter: (a, b) => (a.roleId || "").localeCompare(b.roleId || ""),
  },
  {
    title: "TYPE",
    dataIndex: "type",
    key: "type",
    sorter: (a, b) => (a.type || "").localeCompare(b.type || ""),
  },
  {
    title: "COMPANY",
    dataIndex: "company",
    key: "company",
    render: (text) => (
      <a href="#" style={{ color: "#722ed1" }}>
        {text}
      </a>
    ),
    sorter: (a, b) => a.company.localeCompare(b.company),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (status) =>
      status ? (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>{status}</Tag>
      ) : (
        "-"
      ),
    sorter: (a, b) => (a.status || "").localeCompare(b.status || ""),
  },
  {
    title: "LOCATION",
    key: "location",
    render: (record) => <span>{record.location?.id || "-"}</span>,
  },
  {
    key: "action",
    render: () => <span style={{ cursor: "pointer" }}>•••</span>,
  },
];

const UsersTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const _loading = useAppSelector(loading);
  const allUsersData = useAppSelector(userData);

  React.useEffect(() => {
    if (allUsersData.length > 0) return;
    dispatch(_getUsers());
  }, [dispatch]);

  console.log(allUsersData);
  return (
    <div style={{ background: "#f5f7fa", padding: 24, minHeight: "100vh" }}>
      <Input
        placeholder="Search"
        prefix={<SearchOutlined />}
        style={{ width: 300, marginBottom: 20 }}
      />

      {_loading.GET_USERS ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Spin size="large" tip="Loading users..." />
        </div>
      ) : allUsersData.length > 0 ? (
        <Table
          columns={columns}
          dataSource={allUsersData}
          pagination={false}
          bordered={false}
          rowKey="id"
        />
      ) : (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Empty description="No Users Found" imageStyle={{ height: 60 }} />
        </div>
      )}
    </div>
  );
};

export default UsersTable;

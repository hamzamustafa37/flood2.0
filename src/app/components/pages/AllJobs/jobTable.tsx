import React from "react";
import { Avatar, Space, Table, Tag, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ProgressBar } from "../../common";

const { Column } = Table;

interface Assignee {
  name: string;
  avatar?: string;
}

interface DataType {
  key: React.Key;
  jobTitle: string;
  assignees: Array<Assignee>;
  dateCreated: number;
  services: string;
  progress: number;
  status: string[];
  amount: number;
}

const data: Array<DataType> = [
  {
    key: "1",
    jobTitle: "Software Engineer",
    assignees: [
      {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=John",
      },
      {
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=Jane",
      },
      { name: "Ant User" },
    ],
    dateCreated: 1709059200000,
    services: "Web Development",
    progress: 20,
    status: ["Active"],
    amount: 2500,
  },
  {
    key: "2",
    jobTitle: "UI/UX Designer",
    assignees: [
      {
        name: "Alice Brown",
        avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=Alice",
      },
      {
        name: "Bob Martin",
        avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=Bob",
      },
    ],
    dateCreated: 1709059300000,
    services: "UI/UX Design",
    progress: 70,
    status: ["Completed"],
    amount: 1800,
  },
];

const JobTable: React.FC = () => (
  <div className="overflow-x-auto">
    <Table<DataType>
      dataSource={data}
      rowKey="key"
      scroll={{ x: "max-content" }}
      pagination={{ responsive: true }}
      style={{ backgroundColor: "transparent" }}
      components={{
        header: {
          row: (props: any) => (
            <tr {...props} style={{ backgroundColor: "transparent" }} />
          ),
          cell: (props: any) => (
            <th
              {...props}
              style={{
                backgroundColor: "transparent",
                borderBottom: "none",
                fontSize: "13px",
                color: "#6c757d",
              }}
            />
          ),
        },
      }}
    >
      <Column
        title="JOB TITLE"
        dataIndex="jobTitle"
        key="jobTitle"
        sorter={(a, b) => a.jobTitle.localeCompare(b.jobTitle)}
        render={(text) => <a className="text-primaryBlue">{text}</a>}
      />

      <Column
        title="ASSIGNEES"
        key="assignees"
        render={(_, record: DataType) => (
          <Avatar.Group>
            {record.assignees.map((assignee, index) => (
              <Tooltip key={index} title={assignee.name} placement="top">
                {assignee.avatar ? (
                  <Avatar src={assignee.avatar} />
                ) : (
                  <Avatar
                    style={{ backgroundColor: "#87d068" }}
                    icon={<UserOutlined />}
                  />
                )}
              </Tooltip>
            ))}
          </Avatar.Group>
        )}
      />

      <Column
        title="DATE CREATED"
        dataIndex="dateCreated"
        key="dateCreated"
        sorter={(a, b) => a.dateCreated - b.dateCreated}
        render={(date) =>
          new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(new Date(date))
        }
      />

      <Column title="SERVICES" dataIndex="services" key="services" />

      <Column
        title="PROGRESS"
        dataIndex="progress"
        key="progress"
        sorter={(a, b) => a.progress - b.progress}
        render={(progress) => <ProgressBar percent={progress} />}
      />

      <Column
        title="STATUS"
        dataIndex="status"
        key="status"
        render={(status: string[]) =>
          status.map((tag) => (
            <Tag
              color={
                tag === "Active"
                  ? "green"
                  : tag === "Completed"
                    ? "blue"
                    : "volcano"
              }
              key={tag}
            >
              {tag.toUpperCase()}
            </Tag>
          ))
        }
      />

      <Column
        title="AMOUNT"
        dataIndex="amount"
        key="amount"
        sorter={(a, b) => a.amount - b.amount}
      />

      <Column
        title="ACTION"
        key="action"
        render={() => (
          <Space size="middle">
            <a>...</a>
          </Space>
        )}
      />
    </Table>
  </div>
);

export default JobTable;

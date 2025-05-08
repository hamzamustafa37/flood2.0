"use client";
import { Table, Tag, Rate, Typography, Space, Tooltip } from "antd";
import { EditOutlined, LinkOutlined, MoreOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

interface Contractor {
  key: string;
  zip: string;
  name: string;
  jobs: number;
  response: string;
  status: "ACTIVE" | "ON JOB" | "OFFLINE";
  rating: number;
}

const data: Array<Contractor> = [
  {
    key: "1",
    zip: "90210, 90013",
    name: "Sara T",
    jobs: 3,
    response: "20m",
    status: "ACTIVE",
    rating: 4,
  },
  {
    key: "2",
    zip: "90011",
    name: "Mike J",
    jobs: 2,
    response: "30m",
    status: "ON JOB",
    rating: 4,
  },
  {
    key: "3",
    zip: "90212",
    name: "David M",
    jobs: 0,
    response: "N/A",
    status: "OFFLINE",
    rating: 4,
  },
];

const statusColorMap = {
  ACTIVE: "green",
  "ON JOB": "blue",
  OFFLINE: "red",
};

const CDashTable = () => {
  const columns = [
    {
      title: "ZIP COVERAGE",
      dataIndex: "zip",
      key: "zip",
      sorter: (a: Contractor, b: Contractor) => a.zip.localeCompare(b.zip),
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <Typography.Link href="#" style={{ color: "#2374e1" }}>
          {text}
        </Typography.Link>
      ),
      sorter: (a: Contractor, b: Contractor) => a.name.localeCompare(b.name),
    },
    {
      title: "JOBS ASSIGNED",
      dataIndex: "jobs",
      key: "jobs",
      sorter: (a: Contractor, b: Contractor) => a.jobs - b.jobs,
    },
    {
      title: "RESPONSE TIME",
      dataIndex: "response",
      key: "response",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status: Contractor["status"]) => (
        <Tag color={statusColorMap[status]}>{status}</Tag>
      ),
    },
    {
      title: "RATING",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <Rate disabled defaultValue={rating} style={{ fontSize: "16px" }} />
      ),
    },
    {
      key: "actions",
      render: () => (
        <Space size="middle">
          <Tooltip title="View Profile">
            <LinkOutlined style={{ color: "#2374e1", fontSize: 16 }} />
          </Tooltip>
          <Tooltip title="More">
            <MoreOutlined style={{ fontSize: 16 }} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="py-[24px]">
      <Title level={3}>Contractor Status Board</Title>
      <Text type="secondary">Live contractor availability and job stats</Text>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default CDashTable;

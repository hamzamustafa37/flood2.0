import React from "react";
import Link from "next/link";
import { Avatar, Space, Table, Tag, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ProgressBar } from "../../common";
import { useSelector } from "react-redux";
import { allJobsData } from "@/lib/features/job";
import { JobType } from "@/utils";

const { Column } = Table;

const JobTable: React.FC = () => {
  const _allJobs = useSelector(allJobsData);

  const dataSource = _allJobs?.map((job: JobType, index: number) => ({
    key: job.id || index,
    id: job.id,
    jobTitle: job.title,
    assignees: job.userIds || [],
    dateCreated: job.createdAt,
    services: job.primaryServiceType,
    progress: job.progressPercent,
    status: [job.status],
    amount: job.amountBilled,
  }));

  return (
    <Table
      dataSource={dataSource}
      style={{ backgroundColor: "transparent" }}
      rowKey="key"
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
        render={(text, record) => (
          <Link href={`/jobs/${record.id}`}>
            <span className="text-primaryBlue">{text}</span>
          </Link>
        )}
      />

      <Column
        title="ASSIGNEES"
        key="assignees"
        render={(_, record) => (
          <Avatar.Group>
            {record.assignees.map((assignee: any, index: number) => (
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
        sorter={(a, b) =>
          new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
        }
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
        render={(status: string[]) => (
          <>
            {status.map((tag) => (
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
            ))}
          </>
        )}
      />

      <Column
        title="AMOUNT"
        dataIndex="amount"
        key="amount"
        sorter={(a, b) => a.amount - b.amount}
        render={(value) => `$${value.toFixed(2)}`}
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
  );
};

export default JobTable;

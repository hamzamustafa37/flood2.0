import React from "react";
import { Table, Tag, Space } from "antd";

const { Column } = Table;

interface DataType {
  key: string;
  dateTime: string;
  temperature: string;
  humidity: string;
  airPressure: string;
  mode: string;
  lastSyncTime: string;
}

const data: Array<DataType> = [
  {
    key: "1",
    dateTime: "02/10/2025 10:30 AM",
    temperature: "72°F",
    humidity: "45%",
    airPressure: "1015 hPa",
    mode: "Sync",
    lastSyncTime: "10:30 AM",
  },
  {
    key: "2",
    dateTime: "02/10/2025 10:45 AM",
    temperature: "74°F",
    humidity: "47%",
    airPressure: "1016 hPa",
    mode: "Manual",
    lastSyncTime: "-",
  },
  {
    key: "3",
    dateTime: "02/10/2025 11:00 AM",
    temperature: "73°F",
    humidity: "50%",
    airPressure: "1014 hPa",
    mode: "Sync",
    lastSyncTime: "10:36 AM",
  },
  {
    key: "4",
    dateTime: "02/10/2025 11:15 AM",
    temperature: "75°F",
    humidity: "52%",
    airPressure: "1013 hPa",
    mode: "Sync",
    lastSyncTime: "10:09 AM",
  },
  {
    key: "5",
    dateTime: "02/10/2025 11:30 AM",
    temperature: "76°F",
    humidity: "53%",
    airPressure: "1012 hPa",
    mode: "Sync",
    lastSyncTime: "9:30 AM",
  },
  {
    key: "6",
    dateTime: "02/10/2025 11:45 AM",
    temperature: "77°F",
    humidity: "55%",
    airPressure: "1011 hPa",
    mode: "Manual",
    lastSyncTime: "-",
  },
  {
    key: "7",
    dateTime: "02/10/2025 12:00 PM",
    temperature: "78°F",
    humidity: "57%",
    airPressure: "1010 hPa",
    mode: "Manual",
    lastSyncTime: "-",
  },
  {
    key: "8",
    dateTime: "02/10/2025 12:15 PM",
    temperature: "79°F",
    humidity: "58%",
    airPressure: "1009 hPa",
    mode: "Manual",
    lastSyncTime: "-",
  },
  {
    key: "9",
    dateTime: "02/10/2025 12:30 PM",
    temperature: "80°F",
    humidity: "60%",
    airPressure: "1008 hPa",
    mode: "Sync",
    lastSyncTime: "10:30 AM",
  },
  {
    key: "10",
    dateTime: "02/10/2025 12:45 PM",
    temperature: "81°F",
    humidity: "62%",
    airPressure: "1007 hPa",
    mode: "Manual",
    lastSyncTime: "-",
  },
];

const AtmosphereTable: React.FC = () => (
  <Table<DataType> dataSource={data} pagination={false} rowKey="key">
    <Column title="DATE & TIME" dataIndex="dateTime" key="dateTime" />
    <Column
      title="TEMPERATURE (°F)"
      dataIndex="temperature"
      key="temperature"
    />
    <Column title="HUMIDITY (%)" dataIndex="humidity" key="humidity" />
    <Column
      title="AIR PRESSURE (HPA)"
      dataIndex="airPressure"
      key="airPressure"
    />
    <Column title="MODE" dataIndex="mode" key="mode" />
    <Column
      title="LAST SYNC TIME"
      dataIndex="lastSyncTime"
      key="lastSyncTime"
    />
    <Column
      title="MODE"
      key="modeTag"
      render={(_, record) => (
        <Tag color={record.mode === "Sync" ? "green" : "blue"}>
          {record.mode.toUpperCase()}
        </Tag>
      )}
    />
    <Column
      title=""
      key="action"
      render={() => (
        <Space>
          <a>...</a>
        </Space>
      )}
    />
  </Table>
);

export default AtmosphereTable;

"use client";
import { Card, Typography } from "antd";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import Image from "next/image";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const { Title, Text } = Typography;

const AvgResponseTime = () => {
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Target Time",
        data: [80, 90, 85, 88, 90, 85, 80, 88, 85, 89, 95],
        borderColor: "#91d5ff",
        borderDash: [5, 5],
      },
      {
        label: "Average Time",
        data: [40, 80, 58, 79, 67, 15, 58, 43, 25, 15, 78],
        borderColor: "#1890ff",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <>
      <Card style={{ height: "100%" }}>
        <Title level={5}>Average Response Time </Title>
        <Text type="secondary">
          Visual map showing job density & urgency across service areas
        </Text>
        <Image
          src="/backgrounds/chart.svg"
          alt="Heatmap"
          width={500}
          height={250}
          style={{ width: "100%", objectFit: "contain", marginTop: "1rem" }}
        />
      </Card>
    </>
    // <Card style={{ height: "100%" }}>
    //   {/* <Title level={5}>Avg Response Time vs Target</Title>
    //   <Line options={options} data={data} /> */}
    // </Card>
  );
};

export default AvgResponseTime;

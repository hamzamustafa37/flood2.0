"use client";
import { Card, Typography } from "antd";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const { Title, Text } = Typography;

const JobsByDay = () => {
  const options: ChartOptions<"bar"> = {
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

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = {
    labels,
    datasets: [
      {
        label: "Scheduled",
        data: [10, 12, 9, 14, 8, 6, 4],
        backgroundColor: "#1890ff",
      },
      {
        label: "Emergency",
        data: [3, 2, 4, 1, 5, 7, 6],
        backgroundColor: "#ff4d4f",
      },
    ],
  };

  return (
    <Card style={{ height: "100%", minHeight: 300 }}>
      <Title level={5}>Jobs by Day</Title>
      <Text type="secondary">(Scheduled vs Emergency)</Text>
      <div style={{ height: 250 }}>
        <Bar options={options} data={data} />
      </div>
    </Card>
  );
};

export default JobsByDay;

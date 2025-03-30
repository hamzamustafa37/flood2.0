import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

// Register chart elements
Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const initialData = {
  labels: [
    "Mar 1, 2025",
    "Mar 8, 2025",
    "Mar 15, 2025",
    "Mar 22, 2025",
    "Mar 31, 2025",
  ],
  datasets: [
    {
      label: "Collected",
      data: [2000, 2500, 1500, 3000, 2200],
      borderColor: "#2563eb",
      backgroundColor: "rgba(37, 99, 235, 0.1)",
      pointBorderColor: "#2563eb",
      pointBackgroundColor: "#fff",
      pointRadius: 5, // Increased point size
      pointHoverRadius: 10,
      borderWidth: 3,
      tension: 0.1,
      fill: true,
    },
    {
      label: "Outstanding",
      data: [1000, 2000, 2500, 1800, 2000],
      borderColor: "#93C5FD",
      backgroundColor: "rgba(147, 197, 253, 0.1)",
      pointBorderColor: "#93C5FD",
      pointBackgroundColor: "#fff",
      pointRadius: 5, // Increased point size
      pointHoverRadius: 10,
      borderWidth: 2,
      tension: 0.1,
      fill: true,
    },
  ],
};

// Explicitly define the type for lineOptions
const lineOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false, // Ensures the chart fills the container
  scales: {
    y: {
      min: 0,
      max: 4000,
      ticks: {
        stepSize: 500, // Include .5k values
        callback: (value) => {
          const num = Number(value);
          return num === 0 ? "0" : `${num / 1000}k`;
        },
        font: {
          size: 16, // Increased font size for y-axis ticks
        },
      },
      grid: {
        color: "rgba(0,0,0,0.1)", // Lighter grid lines
        lineWidth: 1,
      },
    },
    x: {
      ticks: {
        font: {
          size: 16, // Increased font size for x-axis ticks
        },
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
      align: "end",
      labels: {
        font: {
          size: 18, // Increased font size for legend
        },
        padding: 15,
        boxWidth: 25, // Slightly larger legend boxes
      },
    },
    tooltip: {
      backgroundColor: "#1E293B",
      titleFont: { size: 16 }, // Increased font size for tooltip title
      bodyFont: { size: 14 }, // Increased font size for tooltip body
      padding: 12,
      cornerRadius: 8,
    },
  },
};

const LineChart = () => {
  // State for date range picker
  const [startDate, setStartDate] = useState<Date>(new Date("2025-03-01"));
  const [endDate, setEndDate] = useState<Date>(new Date("2025-03-31"));

  return (
    <div className="w-full p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Monthly Collection Trends
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Tracks total invoices, collected amounts, and outstanding balances
            over the past 12 months.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => {
              if (date) setStartDate(date);
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[500px] p-6">
        {" "}
        {/* Increased height */}
        <Line data={initialData} options={lineOptions} />
      </div>
    </div>
  );
};

export default LineChart;

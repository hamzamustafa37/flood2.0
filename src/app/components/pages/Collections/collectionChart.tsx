"use client";
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import DoughnutChart from "./collectionDoughnut";
import LineChart from "./collectionLine";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const CollectionChart = () => {
  const doughnutData = {
    labels: ["Paid", "Partial Payment", "Overdue"],
    datasets: [
      {
        data: [70, 15, 15],
        backgroundColor: ["#72E355", "#FFD699", "#C45446"],
        hoverOffset: 5,
      },
    ],
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DoughnutChart />

        <div className="mt-4 w-full">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default CollectionChart;

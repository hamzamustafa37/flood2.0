import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Paid", "Partial Payment", "Overdue"],
  datasets: [
    {
      data: [70, 15, 15],
      backgroundColor: ["#70E000", "#FFDD94", "#C43D3D"],
      hoverBackgroundColor: ["#5AB700", "#FDCB72", "#B13030"],
    },
  ],
};

const centerTextPlugin = {
  id: "centerText",
  beforeDraw: (chart: any) => {
    const { width, height, ctx } = chart;
    ctx.restore();
    const fontSize = (height / 150).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = "middle";

    const text = "70.39%";
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;

    ctx.fillStyle = "#374151";
    ctx.fillText(text, textX, textY);

    ctx.save();
  },
};

const DoughnutChart = () => {
  return (
    <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-4 p-4  items-center">
      <div>
        <div className="pb-2">
          <h2 className="text-2xl font-semibold">Payment Status Breakdown</h2>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p>Issues Type</p>
          <p className="text-sm">Total count: 257</p>
        </div>
        <hr className="mb-2 border-gray-300" />

        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <p className="m-0">Paid</p>
          </div>
          <p>70%</p>
        </div>

        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            <p className="m-0">Partial Payment</p>
          </div>
          <p>15%</p>
        </div>

        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <p className="m-0">Overdue</p>
          </div>
          <p>15%</p>
        </div>
      </div>
      <div className="flex justify-center">
        <Doughnut
          data={data}
          options={{
            cutout: "50%",
            plugins: {
              legend: { display: false },
            },
          }}
          plugins={[centerTextPlugin]}
        />
      </div>
    </div>
  );
};

export default DoughnutChart;

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { Transaction } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  monthlyTransactions: Transaction[];
}
const BarChart = ({ monthlyTransactions }: BarChartProps) => {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      // legend: {
      //   position: 'top' as const,
      // },
      title: {
        display: true,
        text: "日別収支",
      },
    },
  };
  // グラフ化するデータの準備
  const dailyBalances = calculateDailyBalances(monthlyTransactions);

  const dateLabels = Object.keys(dailyBalances);
  const expenseData = dateLabels.map((day) => dailyBalances[day].expense);
  const incomeData = dateLabels.map((day) => dailyBalances[day].income);

  const labels = [
    "2024-04-10",
    "2024-04-11",
    "2024-04-12",
    "2024-04-13",
    "2024-04-14",
    "2024-04-15",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "支出",
        data: [100, 200, 300, 400, 500, 600],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "収入",
        data: [100, 200, 300, 400, 500, 600],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;

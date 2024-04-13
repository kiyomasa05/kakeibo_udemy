import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { Transaction } from "../types";
import { useTheme } from "@mui/material";

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
  const theme = useTheme();
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

  const dateLabels = Object.keys(dailyBalances).sort();
  const expenseData = dateLabels.map((day) => dailyBalances[day].expense);
  const incomeData = dateLabels.map((day) => dailyBalances[day].income);

  const data: ChartData<"bar"> = {
    labels: dateLabels,
    datasets: [
      {
        label: "支出",
        data: expenseData,
        backgroundColor: theme.palette.expenseColor.light,
      },
      {
        label: "収入",
        data: incomeData,
        backgroundColor: theme.palette.incomeColor.light,
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;

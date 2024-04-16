import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, MenuItem, TextField } from "@mui/material";
import {
  ExpenseCategory,
  IncomeCategory,
  Transaction,
  TransactionType,
} from "../types";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryChartProps {
  monthlyTransactions: Transaction[];
}
const CategoryChart = ({ monthlyTransactions }: CategoryChartProps) => {
  // 収支タイプ選択のステート
  const [selectedType, setSelectedType] = useState<TransactionType>("expense");
  // 収支タイプの変更
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedType(e.target.value as TransactionType);
  };

  // カテゴリごとの合計を計算する
  const categorySums = monthlyTransactions
    // filterで収入、支出ごとに計算する
    .filter((transaction) => transaction.type === selectedType)
    .reduce<Record<IncomeCategory | ExpenseCategory, number>>(
      // このようなオブジェクトを返す {"食費":2000,"日用品":2000,"医療費":undifined}
      (acc, transaction) => {
        // NaNにならないように初期化する
        if (!acc[transaction.category]) {
          acc[transaction.category] = 0;
        }
        acc[transaction.category] += transaction.amount;
        return acc;
      },
      {} as Record<IncomeCategory | ExpenseCategory, number>
    );
  console.log(categorySums);

  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Box>
      <TextField
        label="収支の種類"
        select
        fullWidth
        value={selectedType}
        onChange={handleChange}
      >
        <MenuItem value={"income"}>収入</MenuItem>
        <MenuItem value={"expense"}>支出</MenuItem>
      </TextField>
      <Pie data={data} />
    </Box>
  );
};

export default CategoryChart;

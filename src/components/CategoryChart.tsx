import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import {
  Box,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ExpenseCategory,
  IncomeCategory,
  Transaction,
  TransactionType,
} from "../types";
import { useAppContext } from "../context/AppContext";
import useMonthlyTransactions from "../hooks/useMonthlyTransactions";

ChartJS.register(ArcElement, Tooltip, Legend);

// interface CategoryChartProps {
//   monthlyTransactions: Transaction[];
//   isLoading: boolean;
// }
const CategoryChart = () =>
  // {
  // monthlyTransactions,
  // isLoading,
  // }: CategoryChartProps
  {
    const { isLoading } = useAppContext();
    const monthlyTransactions = useMonthlyTransactions();
    const theme = useTheme();
    // 収支タイプ選択のステート
    const [selectedType, setSelectedType] =
      useState<TransactionType>("expense");
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

    const categoryLabels = Object.keys(categorySums) as (
      | IncomeCategory
      | ExpenseCategory
    )[];
    const categoryValues = Object.values(categorySums);

    const options = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {},
    };

    const incomeCategoryColor: Record<IncomeCategory, string> = {
      給与: theme.palette.incomeCategoryColor.給与,
      副収入: theme.palette.incomeCategoryColor.副収入,
    };
    const expenseCategoryColor: Record<ExpenseCategory, string> = {
      食費: theme.palette.expenseCategoryColor.食費,
      日用品: theme.palette.expenseCategoryColor.日用品,
      住居費: theme.palette.expenseCategoryColor.住居費,
      娯楽: theme.palette.expenseCategoryColor.娯楽,
      医療費: theme.palette.expenseCategoryColor.医療費,
      子供: theme.palette.expenseCategoryColor.子供,
      外食: theme.palette.expenseCategoryColor.外食,
      自己投資: theme.palette.expenseCategoryColor.自己投資,
      その他: theme.palette.expenseCategoryColor.その他,
    };

    const getCategoryColor = (
      category: IncomeCategory | ExpenseCategory
    ): string => {
      if (selectedType === "income") {
        return incomeCategoryColor[category as IncomeCategory];
      } else {
        return expenseCategoryColor[category as ExpenseCategory];
      }
    };

    const data: ChartData<"pie"> = {
      labels: categoryLabels,
      datasets: [
        {
          data: categoryValues,
          backgroundColor: categoryLabels.map((category) =>
            getCategoryColor(category)
          ),
          borderColor: categoryLabels.map((category) =>
            getCategoryColor(category)
          ),
          borderWidth: 1,
        },
      ],
    };
    return (
      <>
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
        <Box
          sx={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : monthlyTransactions.length > 0 ? (
            <Pie data={data} options={options} />
          ) : (
            <Typography>データがありません</Typography>
          )}
        </Box>
      </>
    );
  };

export default CategoryChart;

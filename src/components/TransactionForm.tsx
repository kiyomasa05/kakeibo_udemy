import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close"; // 閉じるボタン用のアイコン
import FastfoodIcon from "@mui/icons-material/Fastfood"; //食事アイコン
import { Controller, useForm } from "react-hook-form";
import { ExpenseCategory, IncomeCategory } from "../types";
import AlarmIcon from "@mui/icons-material/Alarm";
import HomeIcon from "@mui/icons-material/Home";
import HailIcon from "@mui/icons-material/Hail";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import HelpIcon from "@mui/icons-material/Help";
import AddCardIcon from "@mui/icons-material/AddCard";
import SavingsIcon from "@mui/icons-material/Savings";

interface TransactionFormProps {
  onCloseForm: () => void;
  isEntryDrawerOpen: boolean;
  currentDay: string;
}
type IncomeExpense = "income" | "expense";

interface CategoryItem {
  label: IncomeCategory | ExpenseCategory;
  icon: JSX.Element;
}

const TransactionForm = ({
  onCloseForm,
  isEntryDrawerOpen,
  currentDay,
}: TransactionFormProps) => {
  const formWidth = 320;

  const expenseCategories: CategoryItem[] = [
    { label: "食費", icon: <FastfoodIcon fontSize="small" /> },
    { label: "日用品", icon: <AlarmIcon fontSize="small" /> },
    { label: "住居費", icon: <HomeIcon fontSize="small" /> },
    { label: "娯楽", icon: <HailIcon fontSize="small" /> },
    { label: "医療費", icon: <MedicalInformationIcon fontSize="small" /> },
    { label: "子供", icon: <BabyChangingStationIcon fontSize="small" /> },
    { label: "外食", icon: <RestaurantIcon fontSize="small" /> },
    { label: "自己投資", icon: <LocalLibraryIcon fontSize="small" /> },
    { label: "その他", icon: <HelpIcon fontSize="small" /> },
  ];
  const IncomeCategories: CategoryItem[] = [
    { label: "給与", icon: <AddCardIcon fontSize="small" /> },
    { label: "副収入", icon: <SavingsIcon fontSize="small" /> },
  ];

  const { control, setValue, watch } = useForm({
    // 初期値の指定 componentのnameの値を指定
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    },
  });
  // hook-foomの収支の値を切り替える
  const incomeExpenseToggle = (type: IncomeExpense) => {
    setValue("type", type);
  };
  // 監視する対象を指定し、色を変える
  const currentType = watch("type");

  // 日付を選択すると値を変える
  useEffect(() => {
    setValue("date", currentDay);
  }, [currentDay]);
  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDrawerOpen ? formWidth : "-2%", // フォームの位置を調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2, // 内部の余白
        boxSizing: "border-box", // ボーダーとパディングをwidthに含める
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        {/* 閉じるボタン */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {/* フォーム要素 */}
      <Box component={"form"}>
        <Stack spacing={2}>
          {/* 収支切り替えボタン */}
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ButtonGroup fullWidth>
                <Button
                  variant={field.value === "expense" ? "contained" : "outlined"}
                  color="error"
                  onClick={() => incomeExpenseToggle("expense")}
                >
                  支出
                </Button>
                <Button
                  onClick={() => incomeExpenseToggle("income")}
                  color={"primary"}
                  variant={field.value === "income" ? "contained" : "outlined"}
                >
                  収入
                </Button>
              </ButtonGroup>
            )}
          />

          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="日付"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />

          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField {...field} id="カテゴリ" label="カテゴリ" select>
                <MenuItem value={"食費"}>
                  <ListItemIcon>
                    <FastfoodIcon />
                  </ListItemIcon>
                  食費
                </MenuItem>
              </TextField>
            )}
          />

          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="金額" type="number" />
            )}
          />

          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="内容" type="text" />
            )}
          />

          {/* 保存ボタン */}
          <Button
            type="submit"
            variant="contained"
            color={currentType === "income" ? "primary" : "error"}
            fullWidth
          >
            保存
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
export default TransactionForm;

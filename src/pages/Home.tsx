import { Box } from "@mui/material";
import React, { useState } from "react";
import MonthlySummary from "../components/MonthlySummary";
import Calendar from "../components/Calendar";
import TransactionMenu from "../components/TransactionMenu";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "../types";
import { Today } from "@mui/icons-material";
import { format } from "date-fns";

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}
const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
  const today = format(new Date(), "yyyy-mm-dd");
  const [currentDay, setCurrentDay] = useState(today);
  // 月のデータから選択した日の取引データだけ取得する
  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });
  
  return (
    <Box sx={{ display: "flex" }}>
      {/* 左側 */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
        />
      </Box>
      {/* 右側 */}
      <Box>
        <TransactionMenu />
        {process.env.REACT_APP_FIRE_BASE_MESSAGING_SENDER_ID}
        <TransactionForm />
      </Box>
    </Box>
  );
};

export default Home;

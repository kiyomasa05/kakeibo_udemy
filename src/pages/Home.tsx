import { Box } from "@mui/material";
import React from "react";
import MonthlySummary from "../components/MonthlySummary";
import Calendar from "../components/Calendar";
import TransactionMenu from "../components/TransactionMenu";
import TransactionForm from "../components/TransactionForm";
import { Transaction } from "../types";

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}
const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
  
  return (
    <Box sx={{ display: "flex" }}>
      {/* 左側 */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
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

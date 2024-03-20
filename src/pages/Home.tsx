import { Box } from "@mui/material";
import React from "react";
import MonthlySummary from "../components/MonthlySummary";
import Calendar from "../components/Calendar";
import TransactionMenu from "../components/TransactionMenu";
import TransactionForm from "../components/TransactionForm";

const Home = () => {
  return (
    <Box sx={{display:"flex"}}>
      {/* 左側 */}
      <Box sx={{flexGrow:1}}>
        <MonthlySummary />
        <Calendar />
      </Box>
      {/* 右側 */}
      <Box>
        <TransactionMenu/>
        <TransactionForm />
      </Box>
    </Box>
  );
};

export default Home;

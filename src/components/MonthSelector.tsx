import { Box, Button } from "@mui/material";
import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ja } from "date-fns/locale";
import { addMonths } from "date-fns";

interface MonthSelectorProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const MonthSelector = ({ currentMonth,setCurrentMonth }: MonthSelectorProps) => {
  const handlePreviusMonth = () => {
    const previusMonth = addMonths(currentMonth, -1)
    setCurrentMonth(previusMonth);
  }

  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    setCurrentMonth(nextMonth);
  };
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ja}
      dateFormats={{ year: "yyyy年", month: "MM月" }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button
          onClick={handlePreviusMonth}
          color={"error"}
          variant="contained"
        >
          先月
        </Button>
        <DatePicker
          value={currentMonth}
          label="年月を選択"
          sx={{ mx: 2, background: "white" }}
          views={["year", "month"]}
          format="yyyy/MM"
          slotProps={{
            toolbar: {
              toolbarFormat: "yyyy年MM月",
            },
          }}
        />
        <Button
          onClick={handleNextMonth}
          color={"primary"}
          variant="contained"
        >
          次月
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default MonthSelector;

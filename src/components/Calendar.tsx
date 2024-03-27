import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import { DatesSetArg, EventContentArg } from "@fullcalendar/core";
import "../calendar.css";
import { Balance, CalenderContent, Transaction } from "../types";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { formatCurrency } from "../utils/formatting";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useTheme } from "@mui/material";

interface CalendarProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
}

const Calendar = ({
  monthlyTransactions,
  setCurrentMonth,
  setCurrentDay,
  currentDay,
}: CalendarProps) => {

  const theme = useTheme()
  const backgroundEvent = {
    start: currentDay,
    display: "background",
    backgroundColor: theme.palette.incomeColor.light,
  };
  // Calenderの中の要素とスタイル
  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className="money" id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    );
  };

  const dailyBalances = calculateDailyBalances(monthlyTransactions);

  // FullCalender用のイベントを生成する関数
  const createCalenderEvents = (
    dailyBalances: Record<string, Balance>
  ): CalenderContent[] => {
    // 配列のkeyのみを取得し、それぞれ動的な値を返却する
    return Object.keys(dailyBalances).map((date) => {
      // keyを指定し、分割代入すれば動的に値を取得できる
      const { income, expense, balance } = dailyBalances[date];
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      };
    });
  };
  const calenderEvents = createCalenderEvents(dailyBalances);
  const handleDateSet = (datesetInfo: DatesSetArg) => {
    setCurrentMonth(datesetInfo.view.currentStart);
  };
  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
  };
  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={[...calenderEvents, backgroundEvent]}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
    />
  );
};

export default Calendar;

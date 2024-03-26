import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import { DatesSetArg, EventContentArg } from "@fullcalendar/core";
import "../calendar.css";
import { Balance, CalenderContent, Transaction } from "../types";
import { calculateDailyBalances } from "../utils/financeCalculations";
import { formatCurrency } from "../utils/formatting";
interface CalendarProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Calendar = ({ monthlyTransactions, setCurrentMonth }: CalendarProps) => {
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
    setCurrentMonth(datesetInfo.view.currentStart)
  };
  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={calenderEvents}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
    />
  );
};

export default Calendar;
